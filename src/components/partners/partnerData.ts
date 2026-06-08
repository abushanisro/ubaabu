export type PartnerType = 'System Integrators' | 'Technology Partners' | 'Industry Consultants' | 'Resellers'

export interface Partner {
  name: string
  type: PartnerType
  description: string
  logoSrc: string
  featured?: boolean
  quote?: string
  quoteName?: string
  quoteRole?: string
  caseStudySlug?: string
}

export const PARTNERS: Partner[] = [
  {
    name: 'Roland Berger',
    type: 'Industry Consultants',
    description: 'Strategy and operations advisory for Automotive & Aerospace OEMs across Europe and South Asia.',
    logoSrc: '/assets/trustedby/RolandBerger.png',
    featured: true,
    quote: 'Emithran cut our should-cost analysis cycle from 3 weeks to 2 days, enabling us to advise clients with real-time supplier intelligence.',
    quoteName: 'Dr. Klaus Fischer',
    quoteRole: 'Principal, Manufacturing Practice',
    caseStudySlug: 'chassis-india-belgium',
  },
  {
    name: 'Ashok Leyland',
    type: 'System Integrators',
    description: 'ERP & MES implementation partner for heavy vehicle manufacturing, integrating SAP with Emithran\'s cost intelligence layer.',
    logoSrc: '/assets/trustedby/ashokleyland.png',
  },
  {
    name: 'TATA Power',
    type: 'Technology Partners',
    description: 'API integration partner connecting Emithran\'s BOM validation engine with industrial IoT data streams.',
    logoSrc: '/assets/trustedby/TATAPower.png',
  },
  {
    name: 'Digantara',
    type: 'Technology Partners',
    description: 'Satellite manufacturing data connector — bridging space-grade component databases with Emithran\'s should-cost models.',
    logoSrc: '/assets/trustedby/digantara.png',
  },
  {
    name: 'Pixxel',
    type: 'Industry Consultants',
    description: 'Space-tech advisory partner helping Emithran\'s customers validate electronics BOM for launch-grade components.',
    logoSrc: '/assets/trustedby/Pixxel.png',
  },
  {
    name: 'Rainmaker',
    type: 'Resellers',
    description: 'GTM reseller across South Asia, managing regional licensing and onboarding for Emithran\'s SME manufacturing customers.',
    logoSrc: '/assets/trustedby/rainmaker.png',
  },
  {
    name: 'Tanbo',
    type: 'Resellers',
    description: 'Southeast Asia distribution partner, enabling Tier-2 suppliers to access Emithran\'s platform through a local channel.',
    logoSrc: '/assets/trustedby/Tanbo.png',
  },
  {
    name: 'Aadya',
    type: 'System Integrators',
    description: 'Defence-sector systems integrator, connecting Emithran with India\'s DPSUs for procurement cost benchmarking.',
    logoSrc: '/assets/trustedby/Aadya.png',
  },
]

export const FEATURED_PARTNER = PARTNERS.find(p => p.featured)!

export const ALL_LOGOS = PARTNERS.map(p => ({ name: p.name, logoSrc: p.logoSrc }))
