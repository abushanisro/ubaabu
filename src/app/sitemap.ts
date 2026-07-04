import { MetadataRoute } from 'next'
import { POSTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import { DE_PAGES, GLOSSARY_TERMS, SEO_LANDING_PAGES } from '@/components/seo/seoRoadmapData'

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { url: `${BASE_URL}/products`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/solutions`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/industries`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/pricing`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/why-emithran`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about/partners`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about/partners/become-a-partner`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about/partners/vendor-onboarding`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: 'weekly', lastModified: now },
    { url: `${BASE_URL}/case-studies`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/request-demo`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/should-cost-analysis-software`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/bom-management-software`, priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/supplier-intelligence`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/defence-manufacturing`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/aerospace-cost-engineering`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/emithran-vs-apriori`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/emithran-vs-costimator`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/state-of-manufacturing-cost-intelligence-2026`, priority: 0.8, changeFrequency: 'yearly', lastModified: now },
    { url: `${BASE_URL}/faq`, priority: 0.5, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/glossary`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/de`, priority: 0.5, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
    { url: `${BASE_URL}/cookies`, priority: 0.2, changeFrequency: 'yearly', lastModified: now },
    { url: `${BASE_URL}/dpa`, priority: 0.2, changeFrequency: 'yearly', lastModified: now },
  ]

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((slug) => ({
    url: `${BASE_URL}/case-studies/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }))

  const blogPosts: MetadataRoute.Sitemap = POSTS.filter((post) => Boolean(BLOG_CONTENT[post.slug])).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }))

  const seoLandingPages: MetadataRoute.Sitemap = SEO_LANDING_PAGES.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }))

  const glossaryPages: MetadataRoute.Sitemap = GLOSSARY_TERMS.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    priority: 0.55,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }))

  const germanPages: MetadataRoute.Sitemap = DE_PAGES.map((page) => ({
    url: `${BASE_URL}/de/${page.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }))

  return [
    ...core,
    ...caseStudies,
    ...blogPosts,
    ...seoLandingPages,
    ...glossaryPages,
    ...germanPages,
  ]
}
