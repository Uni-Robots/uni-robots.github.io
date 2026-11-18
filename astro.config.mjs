// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { canonicalPath } from './src/lib/page.ts';

export default defineConfig({
    site: 'https://uni-robots.github.io',
    // Gera equipe.html (e não equipe/index.html) para manter as URLs atuais do site.
    build: { format: 'file' },
    integrations: [
        // O sitemap lista as URLs sem extensão; troca pelo caminho canônico (com .html).
        sitemap({
            serialize(item) {
                const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, '') || 'index';
                return { ...item, url: new URL(canonicalPath(slug), item.url).href };
            },
        }),
    ],
    // Fontes servidas pelo próprio site: arquivos variáveis do Google Fonts, subset latin.
    // Pixelify Sans só nos títulos (ecoa o pixel art do logo); Archivo no resto.
    // Licenças: src/assets/fonts/OFL-*.txt
    fonts: [
        {
            provider: fontProviders.local(),
            name: 'Pixelify Sans',
            cssVariable: '--font-pixel',
            fallbacks: ['monospace'],
            options: {
                variants: [{ src: ['./src/assets/fonts/pixelify-sans-latin-wght.woff2'], weight: '400 700', style: 'normal' }],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'Archivo',
            cssVariable: '--font-text',
            fallbacks: ['sans-serif'],
            options: {
                variants: [{ src: ['./src/assets/fonts/archivo-latin-wght.woff2'], weight: '400 800', style: 'normal' }],
            },
        },
    ],
});
