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

  const labels = { index: 'Início', sobre: 'Sobre', projetos: 'Projetos', equipe: 'Equipe', patrocinadores: 'Patrocinadores', redes: 'Redes Sociais', contato: 'Contato' };
  for (const [slug, label] of Object.entries(labels)) {
    await page.goto(`${BASE}/${slug}.html`, { waitUntil: 'load' });
    const active = await page.locator('.nav-link.active').allTextContents();
    const title = await page.title();
    check(`${slug}: link ativo e título`, active.length === 1 && active[0] === label && title === `UniRobot - ${label}`, `${active} | ${title}`);
  }
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  check('/ (raiz): link ativo Início', (await page.locator('.nav-link.active').textContent()) === 'Início');

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
  check('easter egg: fecha ao clicar', (await page.locator('#protocoloResenhaModal').count()) === 0);

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
  check('newsletter: envia e mostra confirmação', posts.some(p => p.includes('news@example.com')) && (await page.getAttribute('#newsletterForm input', 'placeholder')).includes('Inscrito'));

  const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await m.goto(`${BASE}/index.html`, { waitUntil: 'load' });
  await m.locator('.hamburger').click();
  const opened = await m.locator('.nav-menu.active').count();
  await m.locator('.hamburger').click();
  check('mobile: menu hambúrguer abre e fecha', opened === 1 && (await m.locator('.nav-menu.active').count()) === 0);

  check('sem erros de JS no console', errors.length === 0, errors.join(' | '));
  await b.close();
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
