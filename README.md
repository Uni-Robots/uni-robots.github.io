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
- `src/components/` — header, footer, arena da página inicial, ficha de robô, card de membro e o easter egg; cada componente traz o próprio `<style>` e, quando precisa, o próprio `<script>`
- `src/scripts/web3forms.ts` — envio dos formulários
- `src/content/` — **dados do site** (equipe, patrocinadores, robôs), validados no build por `src/content.config.ts`
- `src/styles/global.css` — tokens de cor e tipo, tipografia, botões e formulários
- `src/assets/` — logo, imagem do easter egg e as fontes (Pixelify Sans e Archivo, com as licenças OFL)
- `src/icons/` — só o spinner dos formulários (Font Awesome Free 6.4.0, CC BY 4.0)
- `public/` — arquivos copiados sem alteração (`robots.txt`)

## Identidade visual
Definida em `src/styles/global.css`:
- **Cores**: `--noite` (fundo), `--arena` (rodapé, campos), `--giz` (texto), `--neblina` (texto secundário), `--azul` (ações, links e foco), `--lilas` (detalhes), `--linha` (divisões) e `--contorno` (borda de campos e botões). Todas sólidas; o site não usa gradiente.
- **Tipo**: Pixelify Sans, que conversa com o pixel art do logo, só em títulos e nomes de robô, sempre em caixa normal. Archivo no resto.
- **Forma**: cantos retos; o canto "em degrau" fica só nos botões. Nada de emoji decorativo.
- **Movimento**: só a arena da página inicial se monta ao carregar (e não anima para quem pede menos movimento no sistema).
- Contraste: todos os pares de texto passam de 4,5:1; campos e botões, de 3:1.

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
Ele aparece na página Patrocínio automaticamente.

### Robôs
Edite `src/content/projects.json`. Cada robô tem `title`, `category` (modalidade, ex.: "Sumô mini"), `weight` e `mode` opcionais (ex.: "500 g", "Autônomo") e `order`. `easterEgg: true` liga o "Protocolo Resenha" ao clicar na ficha.

### Imagens
Fotos e logos podem ser enviados em qualquer tamanho (de preferência ≥ 512px): o build gera versões WebP redimensionadas para o tamanho em que aparecem. Fotos de membros aparecem quadradas (recortadas no centro).

### SEO e prévia de links
- Cada página define título e descrição no `<BaseLayout title="..." description="...">` (até ~160 caracteres; é o texto que aparece no Google e na prévia do link).
- A imagem de prévia (WhatsApp, LinkedIn etc.) é o logo sobre o fundo do site, gerada no build em 1200×630.
- O sitemap (`/sitemap-index.xml`) é gerado no build; `public/robots.txt` aponta para ele.

## Site legado (`legacy/`)
Cópia do site antigo em HTML puro, mantida só para comparação durante a migração; será removida no fim.
