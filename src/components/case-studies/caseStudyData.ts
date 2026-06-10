export type CaseStudyIndustry = 'All' | 'Automotive' | 'Aerospace' | 'Defence' | 'Electronics'

export interface CaseStudy {
  slug: string
  title: string
  excerpt: string
  industry: Exclude<CaseStudyIndustry, 'All'>
  location: string
  coordinates: [number, number]  // [lng, lat]
  author: { name: string; role: string; avatar?: string }
  date: string
  readTime: string
  featured?: boolean
  metric?: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'chassis-india-belgium',
    title: 'India vs Belgium: 38% Landed Cost Saving on HGV Chassis Rails',
    excerpt:
      'By benchmarking India roll forming against Belgium manufacturing, Emithran identified a 38% total landed cost advantage including full DDP logistics from Chennai to Scotland.',
    industry: 'Automotive',
    location: 'Chennai, India',
    coordinates: [80.27, 13.08],
    author: { name: 'Singaravelan S.', role: 'Co-founder & CEO', avatar: '/assets/infographics/logo/sinigi.png' },
    date: 'June 2, 2026',
    readTime: '7 min read',
    featured: true,
    metric: '38% cost saving',
  },
  {
    slug: 'exhaust-system',
    title: 'Should-Cost Deep Dive: Automotive Exhaust Assembly at Tier-1 Scale',
    excerpt:
      'A full should-cost model for a complex exhaust assembly revealed 19% procurement leakage and enabled a data-driven renegotiation with Tier-1 stamping suppliers in Stuttgart.',
    industry: 'Automotive',
    location: 'Stuttgart, Germany',
    coordinates: [9.18, 48.78],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'May 28, 2026',
    readTime: '6 min read',
    metric: '19% leakage found',
  },
  {
    slug: 'hgv-chassis',
    title: 'HGV Chassis Ladder Frame: BOM Costing Across 3 Geographies',
    excerpt:
      'Multi-geography cost benchmarking for a heavy goods vehicle chassis frame - comparing India, Germany, and Turkey fabrication costs with full landed cost visibility.',
    industry: 'Automotive',
    location: 'Detroit, USA',
    coordinates: [-83.04, 42.33],
    author: { name: 'Singaravelan S.', role: 'Co-founder & CEO', avatar: '/assets/infographics/logo/sinigi.png' },
    date: 'May 20, 2026',
    readTime: '8 min read',
    metric: '3-geography benchmark',
  },
  {
    slug: 'dc-dc-converter',
    title: 'Aerospace DC-DC Converter: VAVE Analysis Saves 22% per Unit',
    excerpt:
      'Value analysis of an aviation-grade DC-DC converter identified 14 substitution opportunities in passive components, delivering 22% unit cost reduction without changing form factor.',
    industry: 'Aerospace',
    location: 'Tokyo, Japan',
    coordinates: [139.69, 35.68],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'May 12, 2026',
    readTime: '6 min read',
    metric: '22% unit cost down',
  },
  {
    slug: 'electronics-teardown',
    title: 'Competitive Electronics Teardown: Reverse BOM for Defence Subsystem',
    excerpt:
      'A complete teardown and reverse BOM of a competing defence subsystem gave procurement intelligence that directly informed the sourcing strategy for the next generation program.',
    industry: 'Defence',
    location: 'Singapore',
    coordinates: [103.99, 1.36],
    author: { name: 'Singaravelan S.', role: 'Co-founder & CEO', avatar: '/assets/infographics/logo/sinigi.png' },
    date: 'April 30, 2026',
    readTime: '5 min read',
    metric: 'Full reverse BOM',
  },
  {
    slug: 'hgv-cab-strategy',
    title: 'HGV Cab Assembly: Make vs Buy Decision Across 6 Components',
    excerpt:
      'Structured make-vs-buy analysis using real supplier costs, logistics, and tooling amortisation to guide a £2M sourcing decision for a major South American OEM.',
    industry: 'Automotive',
    location: 'São Paulo, Brazil',
    coordinates: [-46.47, -23.43],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'April 18, 2026',
    readTime: '7 min read',
    metric: '£2M decision guided',
  },
  {
    slug: 'rear-view-mirror',
    title: 'Rear View Mirror Assembly: 94% BOM Accuracy in Under 48 Hours',
    excerpt:
      'Automated BOM extraction and validation for a 180-part rear view mirror assembly delivered 94% accuracy in 48 hours - replacing a 3-week manual costing exercise.',
    industry: 'Automotive',
    location: 'Mumbai, India',
    coordinates: [72.87, 19.09],
    author: { name: 'Singaravelan S.', role: 'Co-founder & CEO', avatar: '/assets/infographics/logo/sinigi.png' },
    date: 'April 5, 2026',
    readTime: '5 min read',
    metric: '94% BOM accuracy',
  },
  {
    slug: 'rear-axle-should-cost',
    title: 'Rear Axle Should-Cost: Breaking Down a £480 Casting-Machined Assembly',
    excerpt:
      'A granular should-cost analysis of a rear axle housing - from raw casting price to machining cycle time - identified a £68/unit overcharge from a Tier-1 supplier.',
    industry: 'Automotive',
    location: 'London, UK',
    coordinates: [-0.13, 51.51],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'March 22, 2026',
    readTime: '6 min read',
    metric: '£68/unit overcharge',
  },
]
