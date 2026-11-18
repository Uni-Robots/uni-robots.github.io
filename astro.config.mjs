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
    // Inter servida pelo próprio site. O arquivo é exatamente o que o Google Fonts entrega
    // (variável, subset latin, só estilo normal — o site não usa itálico); o provider
    // google() do Astro baixa outra versão da Inter, com métricas diferentes.
    // Licença: src/assets/fonts/OFL.txt
    fonts: [
        {
            provider: fontProviders.local(),
            name: 'Inter',
            cssVariable: '--font-inter',
            options: {
                variants: [
                    {
                        src: ['./src/assets/fonts/inter-latin-wght.woff2'],
                        weight: '300 800',
                        style: 'normal',
                    },
                ],
            },
        },
    ],
});
