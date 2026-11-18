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
- `src/layouts/BaseLayout.astro` — `<head>`, header e footer comuns a todas as páginas
- `src/components/` — header, footer, cards (membro, projeto), ícone e o easter egg; cada componente traz o próprio `<script>` quando precisa de JS
- `src/scripts/` — JS compartilhado: envio de formulários (`web3forms.ts`) e animação de entrada dos cards (`reveal.ts`)
- `src/content/` — **dados do site** (equipe, patrocinadores, projetos), validados no build por `src/content.config.ts`
- `src/styles/` — CSS global (`main.css`, `responsive.css`)
- `src/assets/` — imagens das páginas e a fonte Inter
- `src/icons/` — ícones SVG (Font Awesome Free 6.4.0), usados com `<Icon name="..." />`

## Como editar o conteúdo

Dá para fazer tudo pela interface do GitHub (Add file → Upload files / Create new file). Se algum dado estiver errado — foto que não existe, URL inválida, categoria escrita errado — o build falha e aponta o arquivo.

### Adicionar um membro
1. Coloque a foto em `src/content/team/`, com nome sem acento nem espaço (ex.: `maria-silva.webp`).
2. Crie `src/content/team/maria-silva.yaml` ao lado:
   ```yaml
   name: Maria Silva
   role: Membro de Programação
   category: programacao   # lideranca | gestores | programacao | eletronica | montagem | marketing
   order: 26               # posição na página (menor aparece primeiro)
   photo: ./maria-silva.webp
   linkedin: https://www.linkedin.com/in/...   # opcional
   github: https://github.com/...              # opcional
   ```
O número de membros na página Sobre é calculado sozinho. Para remover alguém, apague o `.yaml` e a foto.

### Adicionar um patrocinador
Logo em `src/content/sponsors/` e um `.yaml` ao lado:
```yaml
name: "Nome da Empresa"
alt: "Texto alternativo do logo"
logo: ./nome-da-empresa.png
description: "Uma frase sobre o patrocinador."
order: 8
```
Ele aparece no carrossel e nos cards automaticamente.

### Projetos
Edite `src/content/projects.json`. `icon` é o nome de um arquivo de `src/icons/` (sem `.svg`); `easterEgg: true` liga o "Protocolo Resenha" ao clicar no card.

### Imagens e ícones
- Fotos e logos podem ser enviados em qualquer tamanho (de preferência ≥ 400px): o build gera versões WebP redimensionadas para o tamanho em que aparecem.
- Para um ícone novo, baixe o SVG em [fontawesome.com/icons](https://fontawesome.com/search?o=r&m=free) (versão Free), salve em `src/icons/` e use `<Icon name="nome-do-arquivo" />`.

## Site legado (`legacy/`)
Cópia do site antigo em HTML puro, mantida só para comparação durante a migração; será removida no fim.
