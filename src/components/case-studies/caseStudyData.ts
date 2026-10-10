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
  dateISO: string
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
    dateISO: '2026-06-02',
    readTime: '7 min read',
    featured: true,
    metric: '38% cost saving',
  },
  {
    slug: 'exhaust-system',
    title: "Should Costing for Exhaust System: Titanium vs Stainless Steel",
    excerpt:
      "A should-cost comparison of titanium and stainless steel for a high-performance automotive exhaust assembly at 300 units a year in the UK identified a £1.3m annual saving.",
    industry: 'Automotive',
    location: 'Stuttgart, Germany',
    coordinates: [9.18, 48.78],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'May 28, 2026',
    dateISO: '2026-05-28',
    readTime: '6 min read',
    metric: "£1.3m / yr saving",
  },
  {
    slug: 'hgv-chassis',
    title: "HGV Chassis Ladder Frame: India vs Northern Europe Rail Cost",
    excerpt:
      "Northern Europe vs India cost comparison across 74 BOM line items for an electric HGV chassis ladder frame, identifying a 38% reduction in manufacturing cost for rails produced in India.",
    industry: 'Automotive',
    location: 'Detroit, USA',
    coordinates: [-83.04, 42.33],
    author: { name: 'Singaravelan S.', role: 'Co-founder & CEO', avatar: '/assets/infographics/logo/sinigi.png' },
    date: 'May 20, 2026',
    dateISO: '2026-05-20',
    readTime: '8 min read',
    metric: "38% rail cost reduction",
  },
  {
    slug: 'dc-dc-converter',
    title: 'Aerospace DC-DC Converter: VAVE Analysis Saves 22% per Unit',
    excerpt:
      "Full teardown, component-level should costing and 13 VAVE ideas for an electric two-wheeler OEM's DC-DC converter, including a 39% body cost reduction and a 28% PCBA cost reduction.",
    industry: 'Aerospace',
    location: 'Tokyo, Japan',
    coordinates: [139.69, 35.68],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'May 12, 2026',
    dateISO: '2026-05-12',
    readTime: '6 min read',
    metric: '22% unit cost down',
  },
  {
    slug: 'electronics-teardown',
    title: "Electronics & PCB Should-Cost Teardown: Radar Sensor, EV BTMS and Wire Harness",
    excerpt:
      "Component-level teardown, bare PCB benchmarking, PCBA should costing and wire harness costing across a radar sensor and an EV BTMS, with a lower-cost PCB technology found at $8.07 against $19.89.",
    industry: 'Electronics',
    location: 'Singapore',
    coordinates: [103.99, 1.36],
    author: { name: 'Singaravelan S.', role: 'Co-founder & CEO', avatar: '/assets/infographics/logo/sinigi.png' },
    date: 'April 30, 2026',
    dateISO: '2026-04-30',
    readTime: '5 min read',
    metric: "PCB $19.89 → $8.07",
  },
  {
    slug: 'hgv-cab-strategy',
    title: "HGV CAB Structure Strategy: Six Manufacturing Approaches Benchmarked",
    excerpt:
      "Six CAB structure solutions for a hydrogen HGV manufacturer benchmarked on tooling investment, piece cost, mass and safety status, from prototype to 4,000 units a year.",
    industry: 'Automotive',
    location: 'São Paulo, Brazil',
    coordinates: [-46.47, -23.43],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'April 18, 2026',
    dateISO: '2026-04-18',
    readTime: '7 min read',
    metric: "6 solutions benchmarked",
  },
  {
    slug: 'rear-view-mirror',
    title: "Rear View Mirror BOM Should-Cost: Five Processes, $0.96 per Unit",
    excerpt:
      "Full BOM should-cost for a five-part rear view mirror assembly across five manufacturing processes - injection moulding, hot forging, cold forming, compression moulding and laser cutting - at 150,000 units a year in India.",
    industry: 'Automotive',
    location: 'Mumbai, India',
    coordinates: [72.87, 19.09],
    author: { name: 'Singaravelan S.', role: 'Co-founder & CEO', avatar: '/assets/infographics/logo/sinigi.png' },
    date: 'April 5, 2026',
    dateISO: '2026-04-05',
    readTime: '5 min read',
    metric: "$0.96 per unit",
  },
  {
    slug: 'rear-axle-should-cost',
    title: "LCV Rear Axle Should-Cost: $244 per Unit Assembly",
    excerpt:
      "Full assembly should-cost for a 2-tonne LCV rear drive axle - 51.2 kg, 40,000 units a year, India manufacturing - with the drive head / carrier assembly at 46% as the primary cost driver.",
    industry: 'Automotive',
    location: 'London, UK',
    coordinates: [-0.13, 51.51],
    author: { name: 'Abushan', role: 'Co-founder & CTO', avatar: '/assets/infographics/logo/abushan.png' },
    date: 'March 22, 2026',
    dateISO: '2026-03-22',
    readTime: '6 min read',
    metric: "$244 / unit",
  },
]
