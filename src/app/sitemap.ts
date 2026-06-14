import { MetadataRoute } from 'next'
import { POSTS } from '@/components/blog/blogData'

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
    { url: BASE_URL,                                     priority: 1.0, changeFrequency: 'weekly',  lastModified: now },
    { url: `${BASE_URL}/products`,                       priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/solutions`,                      priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/industries`,                     priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/pricing`,                        priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/why-emithran`,                   priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about`,                          priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about/partners`,                 priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about/partners/become-a-partner`,priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/about/partners/vendor-onboarding`,priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/blog`,                           priority: 0.7, changeFrequency: 'weekly',  lastModified: now },
    { url: `${BASE_URL}/case-studies`,                   priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/contact`,                        priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/faq`,                            priority: 0.5, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE_URL}/privacy`,                        priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    { url: `${BASE_URL}/terms`,                          priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    { url: `${BASE_URL}/cookies`,                        priority: 0.2, changeFrequency: 'yearly',  lastModified: now },
    { url: `${BASE_URL}/dpa`,                            priority: 0.2, changeFrequency: 'yearly',  lastModified: now },
  ]

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((slug) => ({
    url: `${BASE_URL}/case-studies/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }))

  const blogPosts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }))

  return [...core, ...caseStudies, ...blogPosts]
}
