// Teste funcional: navegação, cards, modais, easter egg e formulários (Web3Forms interceptado — nenhum e-mail real é enviado).
// Uso: NODE_PATH="$(npm root -g)" node migration/functional.cjs [baseUrl]   (padrão http://localhost:4321)
const { chromium } = require('playwright');
const BASE = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
let failures = 0;
const check = (name, ok, extra = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'OK   ' : 'FALHA'} ${name}${extra ? ' — ' + extra : ''}`);
};
(async () => {
  const b = await chromium.launch();
  const errors = [];
  const ctx = await b.newContext();
  const posts = [];
  await ctx.route('https://api.web3forms.com/**', async route => {
    posts.push(route.request().postData() || '');
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true,"message":"ok"}' });
  });
  ctx.setDefaultTimeout(8000); ctx.setDefaultNavigationTimeout(15000);
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('dialog', d => d.accept());

  // Página → [título, link ativo no menu]. Início é o logo e Redes fica no rodapé: sem link ativo no menu.
  const pages = {
    index: ['Início', null], sobre: ['Sobre', 'Sobre'], projetos: ['Robôs', 'Robôs'], equipe: ['Equipe', 'Equipe'],
    patrocinadores: ['Patrocínio', 'Patrocínio'], redes: ['Redes Sociais', null], contato: ['Contato', 'Contato'],
  };
  for (const [slug, [title, label]] of Object.entries(pages)) {
    await page.goto(`${BASE}/${slug}.html`, { waitUntil: 'load' });
    const active = await page.locator('.nav-link.active').allTextContents();
    const current = await page.locator('[aria-current="page"]').count();
    const okActive = label ? active.length === 1 && active[0] === label && current === 1 : active.length === 0;
    check(`${slug}: título e menu`, okActive && (await page.title()) === `UniRobot - ${title}`, `${active.join(',') || 'nenhum ativo'} | ${await page.title()}`);
  }
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  check('/ (raiz): logo marcado como página atual', (await page.locator('.marca[aria-current="page"]').count()) === 1);

  // Acessibilidade: o primeiro Tab leva ao link "Pular para o conteúdo", que fica visível e leva ao <main>.
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => ({ cls: document.activeElement?.className, top: document.activeElement?.getBoundingClientRect().top }));
  await page.keyboard.press('Enter');
  const mainFocused = await page.evaluate(() => document.activeElement?.id === 'conteudo');
  check('pular para o conteúdo: primeiro Tab, visível, foca o <main>', skip.cls === 'pular' && skip.top >= 0 && mainFocused, JSON.stringify(skip));

  await page.goto(`${BASE}/equipe.html`, { waitUntil: 'load' });
  const members = await page.locator('.team-member').count();
  const broken = await page.evaluate(async () => { const imgs = [...document.querySelectorAll('.team-member img')]; imgs.forEach(i => { i.loading = 'eager'; }); await Promise.all(imgs.map(i => i.decode().catch(() => {}))); return imgs.filter(i => !i.naturalWidth || i.src.startsWith('data:')).map(i => i.alt); });
  check('equipe: 25 cards com foto', members === 25 && broken.length === 0, `${members} cards, sem foto: ${broken.join(', ') || 'nenhum'}`);

  await page.goto(`${BASE}/projetos.html`, { waitUntil: 'load' });
  check('projetos: 6 cards', (await page.locator('.project-card').count()) === 6);
  await page.locator('.sumo-project').first().click();
  await page.locator('#resenhaSim').click();
  const resenha = page.locator('#protocoloResenhaModal img');
  await resenha.waitFor();
  const rw = await resenha.evaluate(i => i.decode().then(() => i.naturalWidth).catch(() => 0));
  check('easter egg: Protocolo Resenha abre com imagem', rw > 0, `naturalWidth=${rw}`);
  await page.locator('#protocoloResenhaModal').click();
  check('easter egg: fecha ao clicar', !(await page.locator('#protocoloResenhaModal').isVisible()));
  // Pelo teclado: foco no card de sumô + Enter abre; Esc fecha e devolve o foco ao card.
  await page.locator('.sumo-project').first().focus();
  await page.keyboard.press('Enter');
  const kbOpen = await page.locator('#resenhaConfirm').isVisible();
  await page.keyboard.press('Escape');
  const kbBack = await page.evaluate(() => document.activeElement?.classList.contains('sumo-project'));
  check('easter egg: abre com Enter e fecha com Esc', kbOpen && kbBack && !(await page.locator('#resenhaConfirm').isVisible()));

  await page.goto(`${BASE}/patrocinadores.html`, { waitUntil: 'load' });
  const modal = page.locator('#sponsorModal');
  await page.locator('#openSponsorModalBtn').click();
  const open1 = await modal.isVisible();
  await page.keyboard.press('Escape');
  const closedEsc = !(await modal.isVisible());
  await page.locator('#openSponsorModalBtn').click();
  await page.locator('.sponsor-modal-close').click();
  check('patrocínio: modal abre, fecha com Esc e com ×', open1 && closedEsc && !(await modal.isVisible()));
  await page.locator('#openSponsorModalBtn').click();
  await page.fill('#sponsor_name', 'Teste'); await page.fill('#sponsor_email', 'teste@example.com');
  await page.selectOption('#sponsor_tier', 'Ouro'); await page.fill('#sponsor_message', 'msg'); await page.check('#sponsor_terms');
  await page.locator('.btn-sponsor-submit').click();
  await page.waitForTimeout(500);
  check('patrocínio: form envia para Web3Forms', posts.some(p => p.includes('94497f20') && p.includes('Ouro')));

  await page.goto(`${BASE}/contato.html`, { waitUntil: 'load' });
  await page.fill('#name', 'Teste'); await page.fill('#email', 'teste@example.com'); await page.fill('#subject', 'Assunto'); await page.fill('#message', 'msg');
  await page.locator('#contactForm button[type=submit]').click();
  await page.waitForTimeout(500);
  check('contato: form envia para Web3Forms', posts.some(p => p.includes('4593f6f1') && p.includes('Assunto')));
  await page.fill('#newsletterForm input', 'news@example.com');
  await page.locator('#newsletterForm button').click();
  await page.waitForTimeout(500);
  const newsStatus = await page.locator('#newsletterForm [role="status"]').textContent();
  check('newsletter: envia e mostra confirmação', posts.some(p => p.includes('news@example.com')) && /Inscrição feita/.test(newsStatus), newsStatus);
  const contactStatus = await page.locator('#contactForm [role="status"]').textContent();
  check('contato: mostra confirmação no formulário', /Mensagem enviada/.test(contactStatus), contactStatus);

  const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await m.goto(`${BASE}/index.html`, { waitUntil: 'load' });
  await m.locator('.hamburger').click();
  const opened = await m.locator('.nav-menu.active').count();
  const expanded = await m.getAttribute('.hamburger', 'aria-expanded');
  await m.locator('.hamburger').click();
  check('mobile: menu abre e fecha, com aria-expanded', opened === 1 && expanded === 'true' && (await m.locator('.nav-menu.active').count()) === 0 && (await m.getAttribute('.hamburger', 'aria-expanded')) === 'false');

  check('sem erros de JS no console', errors.length === 0, errors.join(' | '));
  await b.close();
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
