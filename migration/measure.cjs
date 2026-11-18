// Mede peso/requisições e tira screenshots das 7 páginas do site.
// Uso: NODE_PATH="$(npm root -g)" node migration/measure.cjs <baseUrl> <pastaSaida>
// Ex.: NODE_PATH="$(npm root -g)" node migration/measure.cjs http://localhost:8080 migration/baseline
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PAGES = ['index', 'sobre', 'projetos', 'equipe', 'patrocinadores', 'redes', 'contato'];
const VIEWPORTS = {
    desktop: { viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 },
    mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const [baseUrl, outDir] = process.argv.slice(2);
if (!baseUrl || !outDir) {
    console.error('Uso: node migration/measure.cjs <baseUrl> <pastaSaida>');
    process.exit(1);
}

const kb = n => Math.round(n / 1024);

function bucket(type, url) {
    if (type === 'image' || /\.(png|jpe?g|webp|avif|gif|svg)(\?|$)/i.test(url)) return 'image';
    if (type === 'stylesheet') return 'css';
    if (type === 'script') return 'js';
    if (type === 'font') return 'font';
    if (type === 'document') return 'html';
    return 'other';
}

// Rola até o fim em passos para disparar loading="lazy" e as animações de entrada.
async function scrollThrough(page) {
    await page.evaluate(async () => {
        const step = Math.round(window.innerHeight * 0.7);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 200));
        }
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(r => setTimeout(r, 400));
    });
    await page.waitForLoadState('networkidle').catch(() => {});
    // Imagens com decoding="async" podem sair em branco no screenshot sem isso.
    await page.evaluate(() => Promise.all([...document.images].map(img => img.decode().catch(() => {}))));
    await page.waitForTimeout(1000); // transição de 0.6s dos cards
}

async function measure(browser, name, vpName) {
    const context = await browser.newContext(VIEWPORTS[vpName]);
    const page = await context.newPage();
    const host = new URL(baseUrl).host;
    const totals = { requests: 0, bytes: 0, image: 0, css: 0, js: 0, font: 0, html: 0, other: 0 };
    const external = new Set();
    const pending = [];

    page.on('requestfinished', req => {
        pending.push((async () => {
            const sizes = await req.sizes().catch(() => null);
            const res = await req.response().catch(() => null);
            if (!sizes || !res) return;
            const bytes = sizes.responseBodySize + sizes.responseHeadersSize;
            totals.requests++;
            totals.bytes += bytes;
            totals[bucket(req.resourceType(), req.url())] += bytes;
            const reqHost = new URL(req.url()).host;
            if (reqHost && reqHost !== host) external.add(reqHost);
        })());
    });

    const url = `${baseUrl.replace(/\/$/, '')}/${name}.html`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await scrollThrough(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const shotDir = path.join(outDir, 'screens');
    fs.mkdirSync(shotDir, { recursive: true });
    await page.screenshot({
        path: path.join(shotDir, `${name}-${vpName}.jpg`),
        fullPage: true, type: 'jpeg', quality: 70,
        animations: 'disabled', // congela o carrossel de patrocinadores no estado inicial
    });

    // O modal de patrocínio fica fechado no screenshot da página; captura ele aberto à parte.
    if (name === 'patrocinadores') {
        await page.click('#openSponsorModalBtn');
        await page.waitForTimeout(800);
        await page.locator('.sponsor-modal-content').screenshot({
            path: path.join(shotDir, `patrocinadores-modal-${vpName}.jpg`),
            type: 'jpeg', quality: 70, animations: 'disabled',
        });
    }

    await Promise.all(pending);
    await context.close();
    return { page: name, viewport: vpName, ...totals, external: [...external].sort() };
}

(async () => {
    const browser = await chromium.launch();
    const results = [];
    for (const name of PAGES) {
        for (const vp of Object.keys(VIEWPORTS)) {
            const r = await measure(browser, name, vp);
            console.log(`${name.padEnd(15)} ${vp.padEnd(8)} ${String(r.requests).padStart(3)} req  ${String(kb(r.bytes)).padStart(6)} KB  (img ${kb(r.image)} KB)`);
            results.push(r);
        }
    }
    await browser.close();

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'weights.json'), JSON.stringify({ baseUrl, date: new Date().toISOString(), results }, null, 2) + '\n');

    const rows = results.map(r =>
        `| ${r.page} | ${r.viewport} | ${r.requests} | ${kb(r.bytes)} | ${kb(r.image)} | ${kb(r.css)} | ${kb(r.js)} | ${kb(r.font)} | ${r.external.join(', ') || '—'} |`);
    const md = [
        `# Pesos por página`,
        ``,
        `Fonte: \`${baseUrl}\` — ${new Date().toISOString().slice(0, 10)}. Valores em KB, cache vazio, página rolada até o fim (carrega imagens lazy).`,
        ``,
        `| Página | Viewport | Req. | Total | Imagens | CSS | JS | Fontes | Domínios externos |`,
        `|---|---|---:|---:|---:|---:|---:|---:|---|`,
        ...rows,
        ``,
    ].join('\n');
    fs.writeFileSync(path.join(outDir, 'weights.md'), md);
})().catch(err => { console.error(err); process.exit(1); });
