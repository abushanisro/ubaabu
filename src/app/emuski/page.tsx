import type { Metadata } from 'next'
import EmuskiPage from '@/components/emuski/EmuskiPage'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'EMUSKI - In-house NPD & Manufacturing Centre | Emithran',
  description:
    "EMUSKI is Emithran's in-house engineering and manufacturing arm - rapid prototyping, on-demand manufacturing, and engineering innovation behind Emithran's cost and supplier intelligence.",
  keywords: [
    'EMUSKI', 'EMUSKI manufacturing', 'NPD innovation centre India',
    'rapid prototyping India', 'on-demand manufacturing India', 'Emithran manufacturing plant',
  ],
  alternates: { canonical: '/emuski' },
  openGraph: {
    title: 'EMUSKI - In-house NPD & Manufacturing Centre',
    description: "Emithran's in-house engineering and manufacturing arm - rapid prototyping, on-demand manufacturing, and engineering innovation.",
    url: '/emuski', type: 'website', siteName: 'Emithran', locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@emithran',
    creator: '@emithran',
    title: 'EMUSKI - In-house NPD & Manufacturing Centre',
    description: "Emithran's in-house engineering and manufacturing arm, behind its cost and supplier intelligence platform.",
  },
}

const emuskiSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EMUSKI',
  description:
    "EMUSKI is Emithran's in-house NPD innovation centre and live manufacturing plant, providing rapid prototyping, on-demand manufacturing, and engineering innovation.",
  url: `${siteUrl}/emuski`,
  parentOrganization: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '126, RNS Plaza, Electronic City Phase 2',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Hosur',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  ],
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'sales', telephone: '+91-86670-88060', email: 'enquiries@emuski.com', areaServed: 'IN' },
  ],
  sameAs: ['https://www.emuski.com/'],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(emuskiSchema) }} />
      <EmuskiPage />
    </>
  )
}
