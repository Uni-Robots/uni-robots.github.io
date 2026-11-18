# migration/

Ferramentas e linha de base da migração para Astro. **Esta pasta (e `legacy/`) será removida na Fase 7**, depois do deploy.

## Linha de base (site antigo, 2026-11-18)

- `baseline/weights.md` / `weights.json` — requisições e peso por página (7 páginas × desktop/mobile), servindo `legacy/` localmente, com a página rolada até o fim.
- `baseline/screens/` — screenshots full-page de cada página, para comparar visualmente com o Astro.
- `baseline/lighthouse/summary.md` — Lighthouse mobile no site no ar (mediana de 3 execuções); JSONs completos ao lado.

## Como medir de novo

Requer Playwright instalado globalmente (`npm i -g playwright`, `npx playwright install chromium`).

```bash
# Site antigo (legacy/)
python3 -m http.server 8731 --directory legacy &
NODE_PATH="$(npm root -g)" node migration/measure.cjs http://127.0.0.1:8731 migration/baseline

# Site Astro (depois de npm run build)
npx astro preview --port 4321 &
NODE_PATH="$(npm root -g)" node migration/measure.cjs http://localhost:4321 migration/after

# Lighthouse (mobile, 3 execuções, guarda a mediana)
migration/lighthouse.sh https://uni-robots.github.io migration/after/lighthouse index equipe
```
