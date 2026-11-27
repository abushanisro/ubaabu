/**
 * Sitemap entries, generated from the content sources on every build
 * (SEO audit Nov 2026, issue #02). Split into three child sitemaps referenced
 * from the /sitemap.xml index:
 *   /sitemap-pages.xml    — product, landing, comparison, hub, author, case-study,
 *                           German pages and downloadable PDF templates
 *   /sitemap-blog.xml     — the blog index and every published post
 *   /sitemap-glossary.xml — the A–Z glossary and every expanded term page
 *
 * Only indexable, canonical URLs belong here: redirected, draft and noindex URLs
 * are left out on purpose. Dates are real content-change dates (see lastModified.ts),
 * never the build time, and are capped at "now" because a future <lastmod> is invalid.
 */
import { POSTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import { COMPARISON_PAGE_SLUGS, DE_PAGES, GLOSSARY_TERMS, SEO_LANDING_PAGES } from '@/components/seo/seoRoadmapData'
import { EXPANDED_GLOSSARY_SLUGS } from '@/components/seo/glossaryContent'
import { CASE_STUDIES } from '@/components/case-studies/caseStudyData'
import { PILLAR_COPY } from '@/components/seo/pillarCopy'
import { AUTHORS } from '@/lib/authors'
import { DOWNLOAD_FILES } from '@/lib/topics'
import { groupLastModified, latestDate, parseDisplayDate, routeLastModified as LM } from '@/lib/lastModified'

export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export interface SitemapEntry {
  path: string
  lastModified: Date
  changeFrequency: ChangeFreq
  priority: number
}

export const PUBLISHED_POSTS = POSTS.filter((post) => Boolean(BLOG_CONTENT[post.slug]))

function postDate(post: (typeof POSTS)[number]): Date {
  return parseDisplayDate(post.updated ?? post.date)
}

const e = (path: string, lastModified: Date, changeFrequency: ChangeFreq, priority: number): SitemapEntry => ({
  path,
  lastModified,
  changeFrequency,
  priority,
})

export function pageEntries(): SitemapEntry[] {
  const caseStudyDates = CASE_STUDIES.map((s) => new Date(s.dateISO))
  return [
    e('/', LM('/'), 'weekly', 1.0),
    e('/products', LM('/products'), 'monthly', 0.9),
    e('/solutions', LM('/solutions'), 'monthly', 0.8),
    e('/industries', LM('/industries'), 'monthly', 0.8),
    e('/pricing', LM('/pricing'), 'monthly', 0.8),
    e('/why-emithran', LM('/why-emithran'), 'monthly', 0.7),
    e('/expert-engineering-support', LM('/expert-engineering-support'), 'monthly', 0.8),
    e('/products/training', LM('/products/training'), 'monthly', 0.6),
    e('/api-integration', LM('/api-integration'), 'monthly', 0.6),
    e('/about', LM('/about'), 'monthly', 0.7),
    e('/about/partners', LM('/about/partners'), 'monthly', 0.6),
    e('/about/partners/become-a-partner', LM('/about/partners/become-a-partner'), 'monthly', 0.6),
    e('/about/partners/vendor-onboarding', LM('/about/partners/vendor-onboarding'), 'monthly', 0.6),
    e('/case-studies', latestDate(caseStudyDates, LM('/case-studies')), 'monthly', 0.8),
    e('/contact', LM('/contact'), 'monthly', 0.8),
    e('/request-demo', LM('/request-demo'), 'monthly', 0.9),
    e('/should-cost-analysis-software', LM('/should-cost-analysis-software'), 'monthly', 0.9),
    e('/bom-management-software', LM('/bom-management-software'), 'monthly', 0.9),
    e('/supplier-intelligence', LM('/supplier-intelligence'), 'monthly', 0.8),
    e('/defence-manufacturing', LM('/defence-manufacturing'), 'monthly', 0.8),
    e('/aerospace-cost-engineering', LM('/aerospace-cost-engineering'), 'monthly', 0.8),
    e('/state-of-manufacturing-cost-intelligence-2026', LM('/state-of-manufacturing-cost-intelligence-2026'), 'yearly', 0.8),
    e('/faq', LM('/faq'), 'monthly', 0.5),
    e('/privacy', LM('/privacy'), 'yearly', 0.3),
    e('/terms', LM('/terms'), 'yearly', 0.3),
    e('/cookies', LM('/cookies'), 'yearly', 0.2),
    e('/dpa', LM('/dpa'), 'yearly', 0.2),
    ...COMPARISON_PAGE_SLUGS.map((slug) => e(`/${slug}`, LM(`/${slug}`), 'monthly', 0.7)),
    ...SEO_LANDING_PAGES.map((p) => e(`/${p.slug}`, groupLastModified('@landing'), 'monthly', 0.8)),
    e('/topics', groupLastModified('@topics'), 'monthly', 0.7),
    ...PILLAR_COPY.map((p) => e(`/topics/${p.slug}`, groupLastModified('@topics'), 'weekly', 0.7)),
    ...AUTHORS.map((a) => e(`/authors/${a.slug}`, groupLastModified('@authors'), 'monthly', 0.5)),
    ...CASE_STUDIES.map((s) => e(`/case-studies/${s.slug}`, new Date(s.dateISO), 'monthly', 0.7)),
    e('/de', groupLastModified('@de'), 'monthly', 0.5),
    ...DE_PAGES.map((p) => e(`/de/${p.slug}`, groupLastModified('@de'), 'monthly', 0.5)),
    // Downloadable templates: only PDFs are listed (Nov 2026 audit, finding 08). Raw CSV/XLSX
    // files cannot be rendered as pages and are reached through /resource-centre instead.
    ...DOWNLOAD_FILES.filter((d) => d.href.endsWith('.pdf')).map((d) => e(d.href, LM('/resource-centre'), 'yearly', 0.4)),
  ]
}

export function blogEntries(): SitemapEntry[] {
  return [
    e('/blog', latestDate(PUBLISHED_POSTS.map(postDate), LM('/blog')), 'weekly', 0.7),
    ...PUBLISHED_POSTS.map((post) => e(`/blog/${post.slug}`, postDate(post), 'monthly', 0.8)),
  ]
}

export function glossaryEntries(): SitemapEntry[] {
  return [
    e('/glossary', groupLastModified('@glossary'), 'monthly', 0.7),
    ...GLOSSARY_TERMS.filter((t) => EXPANDED_GLOSSARY_SLUGS.has(t.slug)).map((t) =>
      e(`/glossary/${t.slug}`, groupLastModified('@glossary'), 'monthly', 0.6)
    ),
  ]
}

export const CHILD_SITEMAPS = [
  { path: '/sitemap-pages.xml', entries: pageEntries },
  { path: '/sitemap-blog.xml', entries: blogEntries },
  { path: '/sitemap-glossary.xml', entries: glossaryEntries },
]

/** Every URL in every child sitemap (used by the IndexNow script and tests). */
export function allSitemapPaths(): string[] {
  return CHILD_SITEMAPS.flatMap((s) => s.entries().map((x) => x.path))
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function capped(d: Date): Date {
  const now = new Date()
  return Number.isNaN(d.getTime()) ? now : d.getTime() > now.getTime() ? now : d
}

export function renderUrlset(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (x) =>
        `<url><loc>${xmlEscape(`${SITE_URL}${x.path === '/' ? '' : x.path}`)}</loc><lastmod>${capped(x.lastModified).toISOString()}</lastmod><changefreq>${x.changeFrequency}</changefreq><priority>${x.priority.toFixed(1)}</priority></url>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function renderIndex(): string {
  const items = CHILD_SITEMAPS.map((s) => {
    const latest = latestDate(s.entries().map((x) => capped(x.lastModified)), new Date())
    return `<sitemap><loc>${SITE_URL}${s.path}</loc><lastmod>${latest.toISOString()}</lastmod></sitemap>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
