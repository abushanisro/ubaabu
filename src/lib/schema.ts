/**
 * Stable JSON-LD entity ids (SEO audit Nov 2026, issue #12).
 * Organization and WebSite are declared in full once (on the homepage) and referenced
 * everywhere else by @id. SoftwareApplication is only emitted on product pages.
 */
import { OG_IMAGE } from '@/lib/seo'
import { AUTHORS } from '@/lib/authors'

export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const SOFTWARE_ID = `${SITE_URL}/#software`

/** Reference to the Organization node (use as publisher / provider / worksFor). */
export const orgRef = { '@id': ORG_ID, '@type': 'Organization', name: 'Emithran', url: SITE_URL } as const

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Emithran',
  legalName: 'Emithran Technologies Pvt. Ltd.',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/infographics/logo/logo-black.png`, width: 180, height: 45 },
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description:
    'Manufacturing intelligence platform for aerospace, defence, space and precision manufacturing OEMs: should-cost analysis, BOM management and supplier intelligence. Headquartered in Bangalore, India.',
  foundingDate: '2023',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: '11-50' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '126, RNS Plaza, Electronic City Phase 2',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'sales', url: `${SITE_URL}/contact`, availableLanguage: ['English', 'German'] },
    { '@type': 'ContactPoint', contactType: 'technical support', url: `${SITE_URL}/contact` },
  ],
  // Founders with corroborating profiles (Nov 2026 audit finding 04: entity graph).
  founder: AUTHORS.map((a) => ({
    '@type': 'Person',
    '@id': `${SITE_URL}/authors/${a.slug}#person`,
    name: a.name,
    jobTitle: a.jobTitle,
    url: `${SITE_URL}/authors/${a.slug}`,
    sameAs: [a.linkedin],
  })),
  // Add third-party profiles here as they go live (Crunchbase, G2, Capterra, YouTube, Wikidata).
  sameAs: ['https://www.linkedin.com/company/emithran/', 'https://x.com/emithran_ai'],
  knowsAbout: [
    'Manufacturing Intelligence', 'Should Cost Analysis', 'BOM Management', 'Defence Manufacturing',
    'Aerospace Manufacturing', 'Space Manufacturing', 'Cost Engineering', 'Supplier Intelligence', 'VAVE Analysis',
  ],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Germany' },
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Emithran',
  url: SITE_URL,
  inLanguage: ['en', 'de'],
  publisher: { '@id': ORG_ID },
}

/** Product-page SoftwareApplication. No offers/ratings: add them only when real. */
export function softwareSchema(opts: { name?: string; url?: string; description?: string; featureList?: string[] } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': opts.url ? `${opts.url}#software` : SOFTWARE_ID,
    name: opts.name ?? 'Emithran Manufacturing Intelligence Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: opts.url ?? SITE_URL,
    description:
      opts.description ??
      'Manufacturing intelligence platform with BOM management, should-cost analysis, supplier radar, VAVE studio, quality guard, launch tracking and shipment visibility for defence, aerospace and space manufacturers.',
    featureList: opts.featureList ?? ['BOM Intelligence', 'Should-Cost Analysis', 'Supplier Radar', 'VAVE Studio', 'Quality Guard', 'Launch Tracker', 'Shipment Hub'],
    provider: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  }
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) }
}
