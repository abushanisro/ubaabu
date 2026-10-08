import { MetadataRoute } from 'next'
import { POSTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import { COMPARISON_PAGE_SLUGS, DE_PAGES, GLOSSARY_TERMS, SEO_LANDING_PAGES } from '@/components/seo/seoRoadmapData'
import { CASE_STUDIES as CASE_STUDY_DATA } from '@/components/case-studies/caseStudyData'
import { groupLastModified, latestDate, parseDisplayDate, routeLastModified } from '@/lib/lastModified'

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

const CASE_STUDIES = [
  'chassis-india-belgium',
  'dc-dc-converter',
  'electronics-teardown',
  'exhaust-system',
  'hgv-cab-strategy',
  'hgv-chassis',
  'rear-axle-should-cost',
  'rear-view-mirror',
]

// Publish dates of the individual blog posts / case studies drive the index-page lastmod.
const BLOG_DATES = POSTS.filter((post) => Boolean(BLOG_CONTENT[post.slug])).map((post) => parseDisplayDate(post.date))
const CASE_STUDY_DATES = CASE_STUDY_DATA.map((study) => new Date(study.dateISO))

function caseStudyDate(slug: string): Date {
  const study = CASE_STUDY_DATA.find((item) => item.slug === slug)
  return study ? new Date(study.dateISO) : routeLastModified('/case-studies')
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Some posts carry scheduled (future) publish dates. A future <lastmod> is invalid,
  // so every date is capped at the build time.
  const buildTime = new Date()
  const cap = (date: Date | string | undefined): Date | string | undefined =>
    date instanceof Date && date.getTime() > buildTime.getTime() ? buildTime : date
  // Real content-change dates only (see src/lib/lastModified.ts) — never the build time.
  const LM = routeLastModified

  const core: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly', lastModified: LM('/') },
    { url: `${BASE_URL}/products`, priority: 0.9, changeFrequency: 'monthly', lastModified: LM('/products') },
    { url: `${BASE_URL}/solutions`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/solutions') },
    { url: `${BASE_URL}/industries`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/industries') },
    { url: `${BASE_URL}/pricing`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/pricing') },
    { url: `${BASE_URL}/why-emithran`, priority: 0.7, changeFrequency: 'monthly', lastModified: LM('/why-emithran') },
    { url: `${BASE_URL}/expert-engineering-support`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/expert-engineering-support') },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: 'monthly', lastModified: LM('/about') },
    { url: `${BASE_URL}/about/partners`, priority: 0.6, changeFrequency: 'monthly', lastModified: LM('/about/partners') },
    { url: `${BASE_URL}/about/partners/become-a-partner`, priority: 0.6, changeFrequency: 'monthly', lastModified: LM('/about/partners/become-a-partner') },
    { url: `${BASE_URL}/about/partners/vendor-onboarding`, priority: 0.6, changeFrequency: 'monthly', lastModified: LM('/about/partners/vendor-onboarding') },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: 'weekly', lastModified: latestDate(BLOG_DATES, LM('/blog')) },
    { url: `${BASE_URL}/case-studies`, priority: 0.8, changeFrequency: 'monthly', lastModified: latestDate(CASE_STUDY_DATES, LM('/case-studies')) },
    { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/contact') },
    { url: `${BASE_URL}/request-demo`, priority: 0.9, changeFrequency: 'monthly', lastModified: LM('/request-demo') },
    { url: `${BASE_URL}/should-cost-analysis-software`, priority: 0.9, changeFrequency: 'monthly', lastModified: LM('/should-cost-analysis-software') },
    { url: `${BASE_URL}/bom-management-software`, priority: 0.9, changeFrequency: 'monthly', lastModified: LM('/bom-management-software') },
    { url: `${BASE_URL}/supplier-intelligence`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/supplier-intelligence') },
    { url: `${BASE_URL}/defence-manufacturing`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/defence-manufacturing') },
    { url: `${BASE_URL}/aerospace-cost-engineering`, priority: 0.8, changeFrequency: 'monthly', lastModified: LM('/aerospace-cost-engineering') },
    { url: `${BASE_URL}/state-of-manufacturing-cost-intelligence-2026`, priority: 0.8, changeFrequency: 'yearly', lastModified: LM('/state-of-manufacturing-cost-intelligence-2026') },
    { url: `${BASE_URL}/faq`, priority: 0.5, changeFrequency: 'monthly', lastModified: LM('/faq') },
    { url: `${BASE_URL}/glossary`, priority: 0.7, changeFrequency: 'monthly', lastModified: groupLastModified('@glossary') },
    { url: `${BASE_URL}/de`, priority: 0.5, changeFrequency: 'monthly', lastModified: groupLastModified('@de') },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: LM('/privacy') },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: LM('/terms') },
    { url: `${BASE_URL}/cookies`, priority: 0.2, changeFrequency: 'yearly', lastModified: LM('/cookies') },
    { url: `${BASE_URL}/dpa`, priority: 0.2, changeFrequency: 'yearly', lastModified: LM('/dpa') },
  ]

  const comparisonPages: MetadataRoute.Sitemap = COMPARISON_PAGE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: LM(`/${slug}`),
  }))

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((slug) => ({
    url: `${BASE_URL}/case-studies/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: caseStudyDate(slug),
  }))

  const blogPosts: MetadataRoute.Sitemap = POSTS.filter((post) => Boolean(BLOG_CONTENT[post.slug])).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: parseDisplayDate(post.date),
  }))

  const seoLandingPages: MetadataRoute.Sitemap = SEO_LANDING_PAGES.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: groupLastModified('@landing'),
  }))

  const glossaryPages: MetadataRoute.Sitemap = GLOSSARY_TERMS.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    priority: 0.55,
    changeFrequency: 'monthly' as const,
    lastModified: groupLastModified('@glossary'),
  }))

  const germanPages: MetadataRoute.Sitemap = DE_PAGES.map((page) => ({
    url: `${BASE_URL}/de/${page.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly' as const,
    lastModified: groupLastModified('@de'),
  }))

  return [
    ...core,
    ...comparisonPages,
    ...caseStudies,
    ...blogPosts,
    ...seoLandingPages,
    ...glossaryPages,
    ...germanPages,
  ].map((entry) => ({ ...entry, lastModified: cap(entry.lastModified) }))
}
