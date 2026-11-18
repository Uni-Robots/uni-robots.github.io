# migration/

Ferramentas e linha de base da migração para Astro. **Esta pasta (e `legacy/`) será removida na Fase 7**, depois do deploy.

## Linha de base (site antigo, 2026-11-18)

- `baseline/weights.md` / `weights.json` — requisições e peso por página (7 páginas × desktop/mobile), servindo `legacy/` localmente, com a página rolada até o fim.
- `baseline/screens/` — screenshots full-page de cada página (animações congeladas), para comparar com o Astro.
- `baseline/lighthouse/summary.md` — Lighthouse mobile no site no ar (mediana de 3 execuções); JSONs completos ao lado.

`current/` (ignorada pelo git) guarda as medições de trabalho do site Astro.

## Ferramentas

Requerem Playwright instalado globalmente (`npm i -g playwright`, `npx playwright install chromium`).

| Script | O que faz |
|---|---|
| `measure.cjs <url> <pasta>` | Pesos/requisições + screenshots das 7 páginas |
| `compare.cjs [pastaA] [pastaB]` | Diferença pixel a pixel entre screenshots (padrão: `baseline` × `current`); salva `diff/*.png` do que passar do limite (`LIMIT=0.5` %, ajustável por variável de ambiente) |
| `functional.cjs [url]` | Teste funcional: link ativo, títulos, 25 cards da equipe, 6 projetos, easter egg, modal e formulários (Web3Forms interceptado, nenhum e-mail real sai) |
| `lighthouse.sh <url> <pasta> [páginas]` | Lighthouse mobile, 3 execuções, guarda a mediana |

```bash
export NODE_PATH="$(npm root -g)"

# Site Astro
npm run build && npx astro preview --port 4321 &
node migration/measure.cjs http://localhost:4321 migration/current
node migration/compare.cjs
node migration/functional.cjs

# Site antigo (legacy/), se precisar refazer a baseline
python3 -m http.server 8731 --directory legacy &
node migration/measure.cjs http://127.0.0.1:8731 migration/baseline
```

## Pontes temporárias

Partes que existem só para o site Astro ficar idêntico ao antigo enquanto a migração não termina:

| O quê | Por quê | Sai na |
|---|---|---|
| `src/scripts/legacy-main.js` | JS antigo inteiro (renderiza equipe/projetos, modais, formulários, easter egg) | Fase 3 (dados) e Fase 5 (scripts) |
| `public/assets/images/team/`, `public/assets/images/resenha.webp` | O `legacy-main.js` busca essas imagens por URL em runtime | Fase 3 (fotos) e Fase 5 (resenha) |
| Imports de logo em `src/pages/patrocinadores.astro` | Patrocinadores ainda escritos à mão | Fase 3 |
| Font Awesome via CDN em `BaseLayout.astro` | Ícones | Fase 4 |
