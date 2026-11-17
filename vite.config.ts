import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile } from './src/data/profile.ts'

function searchMetadata(site: string): Plugin {
  return {
    name: 'portfolio-search-metadata',
    transformIndexHtml: {
      handler: () => [
        { tag: 'meta', attrs: { property: 'og:image', content: `${site}/og-image.png` }, injectTo: 'head' },
        ...(site ? [
          { tag: 'link', attrs: { rel: 'canonical', href: `${site}/` }, injectTo: 'head' as const },
          { tag: 'meta', attrs: { property: 'og:url', content: `${site}/` }, injectTo: 'head' as const },
        ] : []),
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Person',
          name: profile.name, jobTitle: 'Football Referee',
          homeLocation: { '@type': 'Country', name: profile.country },
          knowsLanguage: ['Arabic', 'English', 'French'],
          ...(site ? { url: `${site}/` } : {}),
        }).replaceAll('<', '\\u003c'), injectTo: 'head' },
      ],
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}` })
      if (site) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site}/</loc></url></urlset>\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configured = env.VITE_SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  let site = ''
  if (configured) {
    const url = new URL(configured)
    if (url.protocol !== 'https:') throw new Error('VITE_SITE_URL must be an HTTPS production URL.')
    site = url.origin
  }
  return { plugins: [react(), tailwindcss(), searchMetadata(site)] }
})
