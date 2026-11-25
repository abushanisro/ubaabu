import { renderIndex, xmlResponse } from '@/lib/sitemapEntries'

// Sitemap index -> /sitemap-pages.xml, /sitemap-blog.xml, /sitemap-glossary.xml (rebuilt on every deploy).
export const dynamic = 'force-static'

export function GET() {
  return xmlResponse(renderIndex())
}
