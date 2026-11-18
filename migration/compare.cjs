// Compara screenshots de duas medições (ex.: baseline × current) pixel a pixel.
// Uso: NODE_PATH="$(npm root -g)" node migration/compare.cjs [pastaA] [pastaB]
// Padrão: migration/baseline × migration/current. Gera <pastaB>/diff/*.png para o que passar de 0,5%.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [dirA = 'migration/baseline', dirB = 'migration/current'] = process.argv.slice(2);
const LIMIT = Number(process.env.LIMIT ?? 0.5); // % de pixels diferentes tolerada
const THRESHOLD = 48;   // diferença por canal (0–255) abaixo disso é ruído de JPEG

const shotsA = path.join(dirA, 'screens');
const shotsB = path.join(dirB, 'screens');
const diffDir = path.join(dirB, 'diff');

const dataUrl = f => 'data:image/jpeg;base64,' + fs.readFileSync(f).toString('base64');

(async () => {
    const files = fs.readdirSync(shotsA).filter(f => f.endsWith('.jpg')).sort();
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let failed = 0;

    for (const file of files) {
        const b = path.join(shotsB, file);
        if (!fs.existsSync(b)) {
            console.log(`${file.padEnd(30)} FALTANDO em ${shotsB}`);
            failed++;
            continue;
        }
        const r = await page.evaluate(async ({ a, b, threshold }) => {
            const load = src => new Promise((ok, err) => {
                const img = new Image();
                img.onload = () => ok(img);
                img.onerror = err;
                img.src = src;
            });
            const [ia, ib] = await Promise.all([load(a), load(b)]);
            const w = Math.max(ia.width, ib.width);
            const h = Math.max(ia.height, ib.height);
            const pixels = (img) => {
                const c = new OffscreenCanvas(w, h);
                const ctx = c.getContext('2d');
                ctx.fillStyle = '#f0f'; // área inexistente conta como diferença
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(img, 0, 0);
                return ctx.getImageData(0, 0, w, h).data;
            };
            const pa = pixels(ia), pb = pixels(ib);
            const out = new OffscreenCanvas(w, h);
            const octx = out.getContext('2d');
            const od = octx.createImageData(w, h);
            let diff = 0;
            for (let i = 0; i < pa.length; i += 4) {
                const d = Math.max(Math.abs(pa[i] - pb[i]), Math.abs(pa[i + 1] - pb[i + 1]), Math.abs(pa[i + 2] - pb[i + 2]));
                if (d > threshold) {
                    diff++;
                    od.data.set([255, 0, 0, 255], i);
                } else {
                    const g = (pa[i] + pa[i + 1] + pa[i + 2]) / 3 * 0.35 + 160; // fundo clareado
                    od.data.set([g, g, g, 255], i);
                }
            }
            octx.putImageData(od, 0, 0);
            const blob = await out.convertToBlob({ type: 'image/png' });
            const buf = new Uint8Array(await blob.arrayBuffer());
            let bin = '';
            for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
            return { pct: (diff / (w * h)) * 100, sizeA: [ia.width, ia.height], sizeB: [ib.width, ib.height], png: btoa(bin) };
        }, { a: dataUrl(path.join(shotsA, file)), b: dataUrl(b), threshold: THRESHOLD });

        const ok = r.pct <= LIMIT;
        if (!ok) {
            failed++;
            fs.mkdirSync(diffDir, { recursive: true });
            fs.writeFileSync(path.join(diffDir, file.replace(/\.jpg$/, '.png')), Buffer.from(r.png, 'base64'));
        }
        const sizes = r.sizeA.join('x') === r.sizeB.join('x') ? r.sizeA.join('x') : `${r.sizeA.join('x')} → ${r.sizeB.join('x')}`;
        console.log(`${file.padEnd(30)} ${r.pct.toFixed(2).padStart(6)}%  ${ok ? 'ok ' : 'DIF'}  ${sizes}`);
    }

    await browser.close();
    console.log(failed ? `\n${failed} screenshot(s) acima de ${LIMIT}% — ver ${diffDir}/` : `\nTodos dentro de ${LIMIT}%.`);
    process.exit(failed ? 1 : 0);
})().catch(err => { console.error(err); process.exit(1); });
