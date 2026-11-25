/**
 * Author profiles (SEO audit Nov 2026, issue #10 — E-E-A-T).
 *
 * Bios only use facts already published on the site (blog author bios, About page,
 * case-study bylines). Extend `background` / `credentials` with verified details
 * (education, previous employers, programmes) — never invent them.
 */
export interface AuthorProfile {
  slug: string
  /** Must match `post.author.name` in blogData. */
  name: string
  role: string
  jobTitle: string
  linkedin: string
  image: string
  summary: string
  background: string[]
  expertise: string[]
}

export const AUTHORS: AuthorProfile[] = [
  {
    slug: 'singaravelan-s',
    name: 'Singaravelan S.',
    role: 'CEO',
    jobTitle: 'Co-founder & CEO, Emithran',
    linkedin: 'https://www.linkedin.com/in/singaravelan-srinivasan-emuski/',
    image: '/assets/infographics/logo/sinigi.png',
    summary:
      'Singaravelan S. is the co-founder and CEO of Emithran. He has spent over fifteen years in cost engineering and supply chain strategy for automotive, aerospace and defence OEMs.',
    background: [
      'Over fifteen years in cost engineering and supply chain strategy for automotive, aerospace and defence OEMs.',
      'Founded Emithran to bring rigorous should-cost discipline to India’s most critical manufacturing programmes.',
      'Works with procurement and sourcing leaders across India’s precision manufacturing sector to bring cost intelligence into supplier negotiations.',
      'Author of Emithran’s published case studies on India vs Europe chassis-rail benchmarking, HGV ladder-frame costing and electronics should-cost teardowns.',
    ],
    expertise: ['Should-cost analysis', 'Cost engineering', 'Supply chain strategy', 'Strategic sourcing', 'Supplier negotiation'],
  },
  {
    slug: 'abushan',
    name: 'Abushan',
    role: 'CTO',
    jobTitle: 'Co-founder & CTO, Emithran',
    linkedin: 'https://www.linkedin.com/in/abushan/',
    image: '/assets/infographics/logo/abushan.png',
    summary:
      'Abushan is the co-founder and CTO of Emithran. He built the Should-Cost Engine and the supplier intelligence and risk-scoring systems that India’s defence, space and aerospace manufacturers use for sourcing decisions.',
    background: [
      'Built the Should-Cost Engine that powers cost modelling for Emithran’s defence, aerospace and space OEM customers.',
      'Has personally run should-cost analyses on parts ranging from injection-moulded plastic covers to 74-line chassis ladder-frame assemblies.',
      'Builds the supplier intelligence and risk-scoring systems behind Emithran’s Supplier Radar.',
      'Author of Emithran’s published case studies on titanium vs stainless exhaust costing, DC-DC converter VAVE and LCV rear-axle should-costing.',
    ],
    expertise: ['Should-cost modelling', 'Manufacturing process costing', 'Cost estimating methods', 'Supplier risk scoring', 'AI in manufacturing'],
  },
]

export function authorByName(name: string): AuthorProfile | undefined {
  return AUTHORS.find((a) => a.name === name)
}

export function authorBySlug(slug: string): AuthorProfile | undefined {
  return AUTHORS.find((a) => a.slug === slug)
}

export function authorPath(name: string): string {
  const a = authorByName(name)
  return a ? `/authors/${a.slug}` : '/about'
}
