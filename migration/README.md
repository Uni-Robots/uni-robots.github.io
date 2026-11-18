# migration/

Ferramentas e linha de base da migração para Astro. **Esta pasta (e `legacy/`) será removida na Fase 7**, depois do deploy.

## Linha de base (site antigo, 2026-11-18)

- `baseline/weights.md` / `weights.json` — requisições e peso por página (7 páginas × desktop/mobile), servindo `legacy/` localmente, com a página rolada até o fim.
- `baseline/screens/` — screenshots full-page de cada página (animações congeladas) e do modal de patrocínio aberto, para comparar com o Astro.
- `baseline/lighthouse/summary.md` — Lighthouse mobile no site no ar (mediana de 3 execuções); JSONs completos ao lado.

`current/` (ignorada pelo git) guarda as medições de trabalho do site Astro.

## Ferramentas

Requerem Playwright instalado globalmente (`npm i -g playwright`, `npx playwright install chromium`).

| Script | O que faz |
|---|---|
| `measure.cjs <url> <pasta>` | Pesos/requisições + screenshots das 7 páginas |
| `compare.cjs [pastaA] [pastaB]` | Diferença pixel a pixel entre screenshots (padrão: `baseline` × `current`); salva `diff/*.png` do que passar do limite (`LIMIT=0.5` %, ajustável por variável de ambiente) |
| `functional.cjs [url]` | Teste funcional (20 checagens): link ativo, títulos, 25 cards da equipe, animação de entrada e hover, 6 projetos, easter egg, modal e formulários (Web3Forms interceptado, nenhum e-mail real sai). No site antigo, a checagem de hover falha de propósito: o JS antigo anulava o efeito |
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

Nenhuma. Todas foram removidas: renderização da equipe/projetos via JS e fotos em `public/` (Fase 3), Font Awesome via CDN (Fase 4), `legacy-main.js` e `public/assets/images/resenha.webp` (Fase 5).
