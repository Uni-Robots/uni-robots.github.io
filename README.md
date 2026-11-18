# Uni-Robots

Site institucional da equipe UniRobot.

> **Migração para Astro em andamento** (branch `astro-migration`). O site atual, em HTML puro, está em `legacy/` até a migração terminar. A linha de base de performance e as ferramentas de medição estão em `migration/`.

## Desenvolvimento

Requisito: Node.js ≥ 22.23.4.

```bash
npm install       # instala as dependências
npm run dev       # servidor local em http://localhost:4321
npm run build     # gera o site estático em dist/
npm run preview   # serve o dist/ localmente
```

## Estrutura (Astro)
- `src/pages/` — uma página `.astro` por URL (`equipe.astro` → `equipe.html`)
- `src/styles/` — CSS global (`main.css`, `responsive.css`)
- `src/assets/` — imagens otimizadas no build (logo, imagens das páginas)
- `src/content/team/`, `src/content/sponsors/` — fotos dos membros e logos dos patrocinadores
- `public/` — arquivos copiados sem alteração (favicon)

## Site legado (`legacy/`)
- `index.html`, `sobre.html`, `projetos.html`, `equipe.html`, `patrocinadores.html`, `redes.html`, `contato.html`
- `css/` — estilos | `js/main.js` — dados da equipe/projetos e interações
- `assets/images/team/` — fotos dos membros (nomes sem acento/espaco)

### Como editar a equipe (enquanto a migração não termina)
Edite o array `teamMembers` em `legacy/js/main.js` e coloque a foto (800x800 .webp) em `legacy/assets/images/team/`.
