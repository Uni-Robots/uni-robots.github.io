// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
    site: 'https://uni-robots.github.io',
    // Gera equipe.html (e não equipe/index.html) para manter as URLs atuais do site.
    build: { format: 'file' },
    // Inter baixada no build e servida pelo próprio site (sem Google Fonts em runtime).
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Inter',
            cssVariable: '--font-inter',
            weights: ['300', '400', '500', '600', '700', '800'],
        },
    ],
});
