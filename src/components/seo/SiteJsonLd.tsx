'use client'

import { usePathname } from 'next/navigation'
import { SEO_LANDING_PAGES } from './seoRoadmapData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

const LANDING_PAGE_SLUGS = new Set(SEO_LANDING_PAGES.map((page) => page.slug))

// Standalone root-level pages that declare their own BreadcrumbList schema.
const STANDALONE_BREADCRUMB_SLUGS = new Set([
  'emithran-vs-apriori',
  'emithran-vs-costimator',
  'state-of-manufacturing-cost-intelligence-2026',
])

function labelFromSegment(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function SiteJsonLd() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  // Glossary terms, blog posts, SEO landing pages, German landing pages, and a
  // few standalone pages render their own, more accurate BreadcrumbList
  // schema — skip the generic one here to avoid duplicate structured data.
  const hasOwnBreadcrumb =
    (segments[0] === 'glossary' && segments.length > 1) ||
    (segments[0] === 'blog' && segments.length > 1) ||
    (segments[0] === 'de' && segments.length > 1) ||
    (segments.length === 1 && (LANDING_PAGE_SLUGS.has(segments[0]) || STANDALONE_BREADCRUMB_SLUGS.has(segments[0])))

  if (hasOwnBreadcrumb) return null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        return {
          '@type': 'ListItem',
          position: index + 2,
          name: labelFromSegment(segment),
          item: `${siteUrl}${path}`,
        }
      }),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}
