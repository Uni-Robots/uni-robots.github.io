/** Nome da página a partir da URL: "/", "/index.html" → "index"; "/equipe" ou "/equipe.html" → "equipe". */
export function pageSlug(url: URL): string {
    return url.pathname.split('/').pop()?.replace(/\.html$/, '') || 'index';
}

/**
 * Caminho canônico de uma página. As URLs públicas do site usam ".html" (links já compartilhados),
 * exceto a inicial, que é "/". Usado na tag canonical, no Open Graph e no sitemap.
 */
export function canonicalPath(slug: string): string {
    return slug === 'index' ? '/' : `/${slug}.html`;
}
