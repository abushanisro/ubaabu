import type { CaseStudy } from '@/components/case-studies/caseStudyData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export function buildCaseStudyArticleJsonLd(study: CaseStudy, opts: { image: string }) {
  const url = `${siteUrl}/case-studies/${study.slug}`
  const [lng, lat] = study.coordinates

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.excerpt,
    image: `${siteUrl}${opts.image}`,
    datePublished: study.dateISO,
    dateModified: study.dateISO,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Person',
      name: study.author.name,
      jobTitle: study.author.role,
      worksFor: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Emithran',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/infographics/logo/logo-black.png`,
        width: 180,
        height: 45,
      },
    },
    contentLocation: {
      '@type': 'Place',
      name: study.location,
      geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
    },
    about: study.industry,
    keywords: study.industry,
  }
}
