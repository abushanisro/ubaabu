import type { Metadata } from 'next'
import ExpertEngineeringSupportPage from '@/components/expert-engineering-support/ExpertEngineeringSupportPage'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Expert Engineering Support - Costing Engineers for Your Team | Emithran',
  description:
    'Emithran connects end-to-end manufacturing intelligence - automating 3D CAD feature analysis, cycle times, should-cost models, zero-based costing, and supplier nomination across precision aerospace, defence, and automotive programs.',
  keywords: [
    'Expert Engineering Support',
    'manufacturing intelligence software',
    'zero based costing',
    'CAD feature analysis',
    'should cost analysis India',
    'supplier nomination precision manufacturing',
  ],
  alternates: { canonical: '/expert-engineering-support' },
  openGraph: {
    images: [{ url: '/assets/meta/emithran-og.jpg', width: 1200, height: 630, alt: 'Emithran - Manufacturing Intelligence Platform' }],
    title: 'Expert Engineering Support - Costing Engineers for Your Team | Emithran',
    description:
      'Emithran connects end-to-end manufacturing intelligence - automating 3D CAD feature analysis, cycle times, should-cost models, zero-based costing, and supplier nomination.',
    url: '/expert-engineering-support',
    type: 'website',
    siteName: 'Emithran',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@emithran',
    creator: '@emithran',
    title: 'Expert Engineering Support - Costing Engineers for Your Team | Emithran',
    description:
      'Automating 3D CAD feature analysis, cycle times, should-cost models, zero-based costing, and supplier nomination across precision manufacturing.',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Expert Engineering Support',
  serviceType: 'Manufacturing Intelligence & Cost Engineering',
  provider: {
    '@type': 'Organization',
    name: 'Emithran',
    url: siteUrl,
  },
  description:
    'End-to-end manufacturing intelligence platform for CAD feature analysis, zero-based costing, cycle time calculators, and supplier nomination across precision engineering programs.',
  url: `${siteUrl}/expert-engineering-support`,
  areaServed: ['IN', 'US', 'EU', 'Global'],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ExpertEngineeringSupportPage />
    </>
  )
}
