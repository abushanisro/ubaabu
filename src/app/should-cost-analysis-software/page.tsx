import Link from 'next/link'
import type { Metadata } from 'next'
import { ogImages } from '@/lib/seo'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Should-Cost Analysis & Modeling Software for OEMs',
  description:
    'Should-cost analysis software and modeling tool for OEMs: build bottom-up part and BOM cost models, check supplier quotes and compare locations on landed cost.',
  keywords: [
    'should cost analysis software', 'should cost modeling software', 'should cost software India', 'manufacturing cost analysis tool',
    'should cost modelling platform', 'supplier negotiation software', 'cost engineering software',
    'BOM cost analysis', 'manufacturing intelligence platform',
    'defence aerospace cost software', 'should cost tool',
  ],
  alternates: {
    canonical: '/should-cost-analysis-software',
    languages: { en: '/should-cost-analysis-software', de: '/de/should-cost-analysis-software', 'x-default': '/should-cost-analysis-software' },
  },
  openGraph: {
    images: ogImages,
    title: 'Should-Cost Analysis & Modeling Software — Emithran',
    description: 'Build bottom-up should-cost models for parts and BOMs, check supplier quotes, and compare manufacturing locations on landed cost.',
    url: '/should-cost-analysis-software',
    type: 'website',
    siteName: 'Emithran',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@emithran',
    creator: '@emithran',
    title: 'Should-Cost Analysis & Modeling Software — Emithran',
    description: 'Bottom-up should-cost models for parts and BOMs, with supplier-quote benchmarking and landed-cost comparison.',
  },
}

const faqs = [
  {
    q: 'What is should-cost analysis software?',
    a: 'Should-cost analysis software builds a bottom-up estimate of what a part or assembly should cost to manufacture, from explicit cost assumptions rather than a supplier\'s quoted price, so you can compare the two. Emithran does this for individual parts and multi-level BOMs, with BOM management and supplier data on the same platform.',
  },
  {
    q: 'What is costing software, and where does Emithran fit?',
    a: 'Costing software is a broad term. It covers tools that estimate what a part will cost to make, tools that allocate overheads through activity-based costing, and tools that track project or job costs. Emithran is manufacturing costing software for part and BOM costing: it builds a bottom-up should-cost from material, process, labour and overhead, rolls it up through a multi-level BOM, and lets you compare the result with a supplier quote and across manufacturing locations.',
  },
  {
    q: 'What do I need to build a should-cost model?',
    a: 'A drawing, CAD file or detailed part description; the material and annual volume; and the manufacturing location you want to assume. A supplier quote is optional, but it lets the model show the gap between quote and should-cost. The more complete the drawing or CAD file, the more precise the estimate.',
  },
  {
    q: 'How accurate is a should-cost model?',
    a: 'Accuracy depends on how complete the inputs are (drawing, material, volume, location), how current the rates are, and how closely the assumed process route matches what the supplier actually runs. Treat a should-cost as an independent reference point, not a guaranteed price, and validate a pilot against quotes or actuals you already trust before relying on it in a negotiation.',
  },
  {
    q: 'Which manufacturing processes are supported?',
    a: 'Emithran currently supports CNC machining, stamping, casting (sand, die and investment), injection moulding, sheet metal fabrication, roll forming, welded assemblies and PCB assembly. Forging, extrusion and additive manufacturing are being added. If your parts depend on a process that is not listed, ask about it in the demo.',
  },
  {
    q: 'Can I compare manufacturing locations and landed cost?',
    a: 'Yes. You can run a multi-geography comparison across India, Germany, the UK, the USA, China, Mexico and Turkey in one report. The output includes delivered (DDP) cost with logistics and duty factored in, not just the ex-works price. Our chassis-rail case study, for example, sets a Belgian ex-works rail cost against an Indian roll-formed rail delivered to Scotland.',
  },
  {
    q: 'How do I use should-cost in a supplier negotiation?',
    a: 'Emithran generates a negotiation brief that shows your should-cost estimate beside the supplier\'s quote, the gap by cost element, and a suggested target price. Should-cost is an independent estimate, not a guaranteed price, so use the gap to start a conversation about the assumptions behind the quote, such as cycle time, yield and margin.',
  },
  {
    q: 'When is a spreadsheet enough, and when do I need should-cost software?',
    a: 'For a handful of parts, a well-maintained spreadsheet can be enough. Software starts to pay off when many people cost many parts, when rates and material prices need to stay current across locations, when you want costs rolled up through a BOM, or when you need to show a supplier and your own management exactly which assumptions drive the number.',
  },
  {
    q: 'How is Emithran different from enterprise costing tools?',
    a: 'Established enterprise costing tools are strong on broad process libraries and automated geometry-based costing. Emithran combines should-cost with BOM management and supplier intelligence on one platform, and ships with India-native labour, material and supplier data. Enterprise tools can offer broader process coverage today, so the fairest test is to cost the same parts in each tool.',
  },
  {
    q: 'How is my data handled, and is this suitable for defence programmes?',
    a: 'Data-handling and security terms are set out in Emithran\'s Privacy Policy and Data Processing Agreement. If your programme has specific confidentiality, export-control or ITAR requirements, raise them with the team before onboarding so they can be reviewed against your requirements.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const audiences = [
  {
    title: 'Cost engineers',
    body: 'Build documented, repeatable cost models from drawings or CAD, instead of maintaining a separate spreadsheet for every commodity and every author.',
  },
  {
    title: 'Procurement and sourcing teams',
    body: 'Check quotes against an independent estimate, set a target price before the RFQ closes, and negotiate from a cost breakdown the supplier can respond to.',
  },
  {
    title: 'Design and NPD teams',
    body: 'See which materials, features and processes drive cost while the design can still change, and carry the findings into VAVE work.',
    href: '/vave-software',
    hrefLabel: 'VAVE software',
  },
  {
    title: 'Programme and supply-chain leads',
    body: 'Compare manufacturing locations on landed cost and make make-vs-buy decisions with logistics, duty and tooling included.',
  },
]

const problems = [
  'Supplier quotes you cannot verify line by line',
  'No agreed target price before the RFQ goes out',
  'Location and material decisions made on ex-works price alone',
  'Cost knowledge locked in individual spreadsheets',
]

const steps = [
  {
    n: '01',
    title: 'Define the part and the basis',
    body: 'Start from a drawing, CAD file, BOM line or part description. Set the basis for the model: annual volume, batch size, shifts and manufacturing location.',
  },
  {
    n: '02',
    title: 'Lay out the process route',
    body: 'The model breaks the part into the operations it needs, for example cutting, forming, welding, machining, coating and inspection, each with a cycle time and a machine-hour rate.',
  },
  {
    n: '03',
    title: 'Cost every element',
    body: 'Every element is costed per part, rolled up through the BOM and ranked by share of total cost. The assumptions and rates behind each result are shown, so they can be reviewed and challenged.',
  },
  {
    n: '04',
    title: 'Compare and negotiate',
    body: 'Set the should-cost against the supplier quote, or run alternatives such as another material, process or location, including landed cost. Generate a negotiation brief with the gap and a suggested target price.',
  },
]

const examples = [
  {
    tag: 'Location decision',
    title: 'HGV chassis rails: India delivered vs Belgium ex-works',
    body: 'Hydrogen HGV ladder frame, 74 BOM line items, 1,312 units a year. The case study sets an ex-works rail cost in Belgium against an India roll-formed rail delivered duty-paid (DDP) to Scotland.',
    result: '€872 vs €538',
    resultNote: 'per rail: Belgium ex-works vs India delivered (DDP), 38% lower',
    caveat: 'Not a like-for-like comparison: the Belgian figure is ex-works and excludes freight and duty.',
    href: '/case-studies/chassis-india-belgium',
  },
  {
    tag: 'Material decision',
    title: 'Exhaust assembly: titanium vs stainless steel',
    body: 'The exhaust assembly was costed from first principles in titanium and in stainless steel, for UK manufacture at 300 units a year, with cost drivers and a supplier target cost for each component.',
    result: '£13,260 → £8,910',
    resultNote: 'per assembly, about £1.3m a year at 300 units',
    href: '/case-studies/exhaust-system',
  },
  {
    tag: 'Cost-driver analysis',
    title: 'LCV rear axle: where the cost sits',
    body: '51.2 kg axle assembly at 40,000 units a year, manufactured in India and costed through a four-sub-assembly BOM, down to casting, forging and machining operations.',
    result: '$244 per axle',
    resultNote: 'the drive head / carrier assembly is the largest cost driver, at 46% of the total',
    href: '/case-studies/rear-axle-should-cost',
  },
]

const BLEND = { '--blendBackground': '#2dd4bf', '--blendForeground': '#0f1b2d', '--blendIntersection': '#0d9488' } as React.CSSProperties

function DuotoneIcon({ id, bg, fg }: { id: string; bg: string; fg: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={BLEND}>
      <defs>
        <clipPath id={id}>
          <path fillRule="evenodd" clipRule="evenodd" d={bg} />
        </clipPath>
      </defs>
      <path fillRule="evenodd" clipRule="evenodd" d={bg} style={{ fill: 'var(--blendBackground)' }} />
      <path fillRule="evenodd" clipRule="evenodd" d={fg} style={{ fill: 'var(--blendForeground)' }} />
      <g clipPath={`url(#${id})`}>
        <path fillRule="evenodd" clipRule="evenodd" d={fg} style={{ fill: 'var(--blendIntersection)' }} />
      </g>
    </svg>
  )
}

const featureIcons = {
  // Operation bars with a gear
  process: {
    bg: 'M2 2h30a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM2 13h26a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2ZM2 24h18a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Z',
    fg: 'M37.12 24.73L39.88 25.31L39.88 28.69L37.12 29.27L36.05 31.85L37.6 34.21L35.21 36.6L32.85 35.05L30.27 36.12L29.69 38.88L26.31 38.88L25.73 36.12L23.15 35.05L20.79 36.6L18.4 34.21L19.95 31.85L18.88 29.27L16.12 28.69L16.12 25.31L18.88 24.73L19.95 22.15L18.4 19.79L20.79 17.4L23.15 18.95L25.73 17.88L26.31 15.12L29.69 15.12L30.27 17.88L32.85 18.95L35.21 17.4L37.6 19.79L36.05 22.15ZM32.2 27A4.2 4.2 0 1 0 23.8 27A4.2 4.2 0 1 0 32.2 27Z',
  },
  // Child parts connected up to a parent assembly
  bom: {
    bg: 'M19 12H21V20H36V27H34V22H21V27H19V22H6V27H4V20H19ZM3 27h4a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3ZM18 27h4a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3ZM33 27h4a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3Z',
    fg: 'M14 2h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Z',
  },
  // Globe with a location pin
  geography: {
    bg: 'M16 0a16 16 0 1 1 0 32a16 16 0 1 1 0-32ZM3 9.5h26V11H3ZM3 21h26v1.5H3ZM15.25 2.5h1.5v7h-1.5ZM15.25 11h1.5v10h-1.5ZM15.25 22.5h1.5v7h-1.5Z',
    fg: 'M29 12a9 9 0 0 1 9 9c0 6.5-9 18-9 18s-9-11.5-9-18a9 9 0 0 1 9-9ZM32.5 21a3.5 3.5 0 1 0-7 0a3.5 3.5 0 1 0 7 0Z',
  },
  // Drawing sheet with a set square
  drawing: {
    bg: 'M8 0h13l7 7v23a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4ZM9 10h12v2H9ZM9 16h14v2H9ZM9 22h8v2H9Z',
    fg: 'M38 16v22H16ZM35 25.2v9.8h-9.8Z',
  },
  // Two overlapping speech bubbles
  negotiation: {
    bg: 'M4 2h18a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H11l-7 6v-6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z',
    fg: 'M18 13h18a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4v6l-7-6H18a4 4 0 0 1-4-4V17a4 4 0 0 1 4-4ZM22.5 22a1.5 1.5 0 1 0-3 0a1.5 1.5 0 1 0 3 0ZM28.5 22a1.5 1.5 0 1 0-3 0a1.5 1.5 0 1 0 3 0ZM34.5 22a1.5 1.5 0 1 0-3 0a1.5 1.5 0 1 0 3 0Z',
  },
  // Branching arrows
  scenarios: {
    bg: 'M21 9.00006H17.5335C16.9094 9.00006 16.5583 8.28225 16.9415 7.78961L22.408 0.761224C22.7083 0.375164 23.2917 0.375165 23.592 0.761224L29.0585 7.78961C29.4417 8.28225 29.0906 9.00006 28.4665 9.00006H25V10C25 15.7102 21.0117 20.4888 15.6687 21.7022C17.7322 23.8573 19 26.7806 19 30V31.0001H22.4665C23.0906 31.0001 23.4417 31.7179 23.0585 32.2105L17.592 39.2389C17.2917 39.625 16.7083 39.625 16.408 39.2389L10.9415 32.2105C10.5583 31.7179 10.9094 31.0001 11.5335 31.0001H15V30C15 25.5817 11.4183 22 7 22H2C0.89543 22 0 21.1046 0 20C0 18.8954 0.89543 18 2 18H7H13C17.4183 18 21 14.4183 21 10V9.00006Z',
    fg: 'M31 18.0001V14.5336C31 13.9095 31.7178 13.5584 32.2105 13.9416L39.2388 19.4081C39.6249 19.7084 39.6249 20.2919 39.2388 20.5922L32.2105 26.0587C31.7178 26.4418 31 26.0908 31 25.4667V22.0001H1.99741C0.892845 22.0001 0 21.1047 0 20.0001C0 18.8956 0.892846 18.0001 1.99741 18.0001H31Z',
  },
}

const features = [
  {
    icon: featureIcons.process,
    title: 'Process-Level Costing',
    body: 'Costs are shown per operation rather than as one lump sum, so you can see which processes and which parts drive the price.',
  },
  {
    icon: featureIcons.bom,
    title: 'BOM Roll-Up and Cost Drivers',
    body: 'Costs roll up through multi-level BOMs so you can see which components and sub-assemblies carry the most cost, and focus negotiation effort there.',
    href: '/bom-management-software',
    hrefLabel: 'BOM management software',
  },
  {
    icon: featureIcons.geography,
    title: 'Multi-Geography and Landed Cost',
    body: 'Compare India, Germany, the UK, the USA, China, Mexico and Turkey. See delivered cost including packing, freight, duty and delivery, not just ex-works price.',
  },
  {
    icon: featureIcons.drawing,
    title: 'Drawing, CAD and BOM Input',
    body: 'Cost a single part from a drawing, CAD file or part description, or a whole assembly from its BOM.',
  },
  {
    icon: featureIcons.negotiation,
    title: 'Negotiation Briefs',
    body: 'Should-cost against the supplier quote, the gap by cost element, and a suggested target price, in a form you can share with the supplier.',
  },
  {
    icon: featureIcons.scenarios,
    title: 'Scenarios and VAVE',
    body: 'Compare materials, processes and sourcing options, such as titanium vs stainless steel or make vs buy, and link the findings to value analysis and value engineering.',
    href: '/vave-software',
    hrefLabel: 'VAVE software',
  },
]

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Emithran Should-Cost Analysis',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}/should-cost-analysis-software`,
  description: 'Should-cost analysis software that builds bottom-up manufacturing cost models from CAD files, drawings, or part descriptions for defence, aerospace, and precision manufacturing OEMs.',
  provider: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
  featureList: features.map((f) => f.title),
}

const comparisonRows = [
  {
    criterion: 'Best suited to',
    emithran: 'Teams that want should-cost, BOM and supplier data in one place, with India-native cost data',
    spreadsheets: 'A small number of parts, or one-off checks',
    enterprise: 'Large programmes that need very broad, highly automated geometry-based costing',
  },
  {
    criterion: 'Cost data',
    emithran: 'Labour rates, material prices and supplier base built in for India, plus multi-region comparison',
    spreadsheets: 'You research and maintain every rate yourself',
    enterprise: 'Typically broad global cost libraries; confirm coverage for your regions',
  },
  {
    criterion: 'Process coverage',
    emithran: 'CNC machining, stamping, casting, injection moulding, sheet metal, roll forming, welded assemblies, PCB assembly — expanding',
    spreadsheets: 'Whatever formulas you build',
    enterprise: 'Often broader process libraries than Emithran today',
  },
  {
    criterion: 'Consistency and audit',
    emithran: 'Common model structure; assumptions and rates shown with each result',
    spreadsheets: 'Varies by author; versions circulate by email',
    enterprise: 'Standardised model libraries',
  },
  {
    criterion: 'Connected to BOM and suppliers',
    emithran: 'Yes: BOM management and supplier intelligence on the same platform',
    spreadsheets: 'Manual copy and paste',
    enterprise: 'Varies by product',
  },
  {
    criterion: 'Getting started',
    emithran: 'Pilot on your own parts; scope and timeline agreed with the team',
    spreadsheets: 'Immediate, but every model is built by hand',
    enterprise: 'Scope and timeline vary; ask each vendor',
  },
  {
    criterion: 'Pricing model',
    emithran: 'Outcome-based packages, no per-seat fees',
    spreadsheets: 'No licence fee; costs internal time',
    enterprise: 'Typically a licence or enterprise contract',
  },
]

const guides = [
  { href: '/blog/what-is-should-cost-analysis', label: 'What is should-cost analysis?', note: 'Definition, components and when to use it' },
  { href: '/blog/how-to-do-should-cost-analysis', label: 'How to do a should-cost analysis', note: 'Step-by-step guide for manufacturers' },
  { href: '/blog/how-to-build-should-cost-model-excel-ai', label: 'Build a should-cost model in Excel', note: 'Spreadsheet approach and where AI helps' },
  { href: '/glossary/should-cost-analysis', label: 'Should-cost glossary entry', note: 'Short definition and related terms' },
]

export default function ShouldCostAnalysisSoftwarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <main style={{ background: '#fff', color: '#0f1b2d' }}>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-28 pb-10 md:pb-14" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,148,136,0.08) 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[12px] font-semibold" style={{ background: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)' }}>
              Manufacturing Intelligence Platform
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight mb-6 leading-tight">
              Should-Cost Analysis &amp; Modeling Software
              <span style={{ color: '#0d9488' }}> for Engineered Parts and Assemblies</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-9 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
              Emithran builds bottom-up should-cost models for parts and multi-level BOMs, so cost engineers and sourcing teams can check supplier quotes against an independent estimate, compare materials, processes and locations, and negotiate from evidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-colors"
                style={{ background: '#0d9488', color: '#fff' }}
              >
                Request a Demo
              </Link>
              <Link
                href="#worked-examples"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-colors"
                style={{ background: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)' }}
              >
                See Worked Examples
              </Link>
            </div>
            <p className="mt-6 text-[13px] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(15,27,45,0.5)' }}>
              Built for cost engineers, sourcing and procurement teams, and design leads at manufacturers in defence, aerospace, space and automotive programmes.
            </p>
          </div>
        </section>

        {/* ── What is should-cost analysis software ── */}
        <section className="py-10 md:py-14 max-w-5xl mx-auto px-6 lg:px-10" aria-labelledby="what-is-heading">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>What is should-cost analysis software?</p>
              <h2 id="what-is-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
                An independent, bottom-up estimate of what a part should cost
              </h2>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'rgba(15,27,45,0.65)' }}>
                Should-cost analysis, also called clean-sheet or zero-based costing, estimates what a part or assembly should cost to make, built up from its inputs rather than taken from a supplier&apos;s quote. <strong>Should-cost modeling software</strong> makes that estimate repeatable, documented and comparable across suppliers, materials and locations. Emithran works as costing software for the buyer&apos;s side of the table: it builds a part&apos;s cost up from material, process, labour and overhead so teams can check supplier quotes.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                Each element of an Emithran model is tied to an explicit assumption, so a supplier&apos;s quote can be compared with the model element by element, not just in total.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ border: '1px solid rgba(13,148,136,0.15)', background: 'rgba(13,148,136,0.03)' }}>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#0d9488' }}>What goes into a model</p>
              <p className="text-[13px] mb-5" style={{ color: 'rgba(15,27,45,0.55)' }}>Each element carries an assumption that can be reviewed.</p>
              <ul className="space-y-3.5">
                {[
                  { label: 'Raw material', note: 'Material weight and price' },
                  { label: 'Process cost', note: 'Cycle time × machine-hour rate, plus labour' },
                  { label: 'Tooling', note: 'Amortised over production volume' },
                  { label: 'Rejection allowance', note: 'A percentage for scrap and rejects' },
                  { label: 'Overheads', note: 'Machine and labour overheads' },
                  { label: 'SG&A and profit', note: 'Applied as stated percentages' },
                  { label: 'Delivered cost', note: 'Packing, freight, duty and delivery, when you need landed cost' },
                ].map(({ label, note }) => (
                  <li key={label} className="flex gap-3 text-[13px] leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#0d9488' }} />
                    <span><span className="font-semibold">{label}</span><span style={{ color: 'rgba(15,27,45,0.55)' }}> — {note}</span></span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.45)' }}>
                See these elements applied to real parts in the <Link href="#worked-examples" className="underline" style={{ color: '#0d9488' }}>worked examples</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── Who it is for ── */}
        <section className="py-10 md:py-14" style={{ background: '#f8fafb', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }} aria-labelledby="audience-heading">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>Who it is for</p>
            <h2 id="audience-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-10 max-w-3xl">
              Who uses should-cost software, and the problems it solves
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {audiences.map(a => (
                <div key={a.title} className="rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}>
                  <h3 className="text-[16px] font-bold mb-2">{a.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.62)' }}>{a.body}</p>
                  {a.href && (
                    <Link href={a.href} className="inline-block mt-3 text-[13px] font-semibold" style={{ color: '#0d9488' }}>{a.hrefLabel} →</Link>
                  )}
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-[15px] font-bold mb-3">Typical problems it addresses</h3>
                <ul className="space-y-2.5">
                  {problems.map(p => (
                    <li key={p} className="flex gap-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#0d9488' }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.62)' }}>
                The same workflow supports programmes in <Link href="/defence-manufacturing" className="font-semibold underline" style={{ color: '#0d9488' }}>defence manufacturing</Link> and <Link href="/aerospace-cost-engineering" className="font-semibold underline" style={{ color: '#0d9488' }}>aerospace cost engineering</Link>, where supplier qualification and documented cost evidence matter, as well as automotive and precision-engineering supply chains.
              </p>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-10 md:py-14" style={{ background: '#0f1b2d' }} aria-labelledby="how-heading">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#2dd4bf' }}>How It Works</p>
            <h2 id="how-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-10 md:mb-12 text-white max-w-3xl">
              How should-cost modeling works in Emithran
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map(s => (
                <div key={s.n}>
                  <p className="text-[36px] font-black mb-3" style={{ color: 'rgba(45,212,191,0.25)' }}>{s.n}</p>
                  <h3 className="text-[16px] font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[14px] leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Prefer to have engineers build the first models? Emithran&apos;s{' '}
              <Link href="/expert-engineering-support" className="font-semibold underline" style={{ color: '#2dd4bf' }}>Expert Engineering Support</Link>{' '}
              team covers product cost estimation, teardown and benchmarking, and sourcing support.
            </p>
          </div>
        </section>

        {/* ── Worked examples ── */}
        <section id="worked-examples" className="py-10 md:py-14 max-w-5xl mx-auto px-6 lg:px-10 scroll-mt-24" aria-labelledby="examples-heading">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>Worked examples</p>
          <h2 id="examples-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-4 max-w-3xl">
            Should-cost models applied to real programmes
          </h2>
          <p className="text-[15px] leading-relaxed mb-10 max-w-3xl" style={{ color: 'rgba(15,27,45,0.62)' }}>
            Three decisions where a bottom-up cost model gave the team something concrete to compare. Figures are taken from the linked case studies.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {examples.map(ex => (
              <div key={ex.title} className="rounded-2xl p-6 flex flex-col" style={{ border: '1px solid rgba(13,148,136,0.18)', background: 'rgba(13,148,136,0.03)' }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#0d9488' }}>{ex.tag}</p>
                <h3 className="text-[16px] font-bold mb-3 leading-snug">{ex.title}</h3>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(15,27,45,0.62)' }}>{ex.body}</p>
                <div className="mt-auto">
                  <p className="text-[24px] font-bold leading-tight" style={{ color: '#0d9488' }}>{ex.result}</p>
                  <p className="text-[12px] mb-4" style={{ color: 'rgba(15,27,45,0.5)' }}>{ex.resultNote}</p>
                  {ex.caveat && (
                    <p className="text-[12px] mb-4 leading-relaxed" style={{ color: 'rgba(15,27,45,0.62)' }}>{ex.caveat}</p>
                  )}
                  <Link href={ex.href} className="text-[13px] font-semibold" style={{ color: '#0d9488' }}>Read the case study →</Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[14px]">
            <Link href="/case-studies" className="font-semibold" style={{ color: '#0d9488' }}>Browse all case studies →</Link>
          </p>
        </section>

        {/* ── Capabilities ── */}
        <section className="py-10 md:py-14" style={{ background: '#f8fafb', borderTop: '1px solid rgba(0,0,0,0.06)' }} aria-labelledby="capabilities-heading">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>Platform Capabilities</p>
            <h2 id="capabilities-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-10 md:mb-12 max-w-3xl">
              What the should-cost engine covers
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={f.title} className="rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}>
                  <div className="mb-4"><DuotoneIcon id={`ShouldCostFeatureIcon-${i}`} {...f.icon} /></div>
                  <h3 className="text-[15px] font-bold mb-2">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>{f.body}</p>
                  {f.href && (
                    <Link href={f.href} className="inline-block mt-3 text-[13px] font-semibold" style={{ color: '#0d9488' }}>{f.hrefLabel} →</Link>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-8 text-[14px] leading-relaxed max-w-3xl" style={{ color: 'rgba(15,27,45,0.62)' }}>
              Should-cost is one module of the Emithran platform. It works alongside{' '}
              <Link href="/bom-management-software" className="font-semibold underline" style={{ color: '#0d9488' }}>BOM management</Link> and{' '}
              <Link href="/supplier-intelligence" className="font-semibold underline" style={{ color: '#0d9488' }}>supplier intelligence</Link>, so the cost model, the BOM and the supplier shortlist share the same data.
            </p>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-10 md:py-14 max-w-5xl mx-auto px-6 lg:px-10" aria-labelledby="compare-heading">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>How We Compare</p>
          <h2 id="compare-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-4 max-w-3xl">
            Emithran vs spreadsheets vs enterprise costing tools
          </h2>
          <p className="text-[15px] leading-relaxed mb-8 max-w-3xl" style={{ color: 'rgba(15,27,45,0.62)' }}>
            Each approach suits a different team. Where an enterprise tool has broader process coverage than Emithran, that is a real advantage, so the fairest test is to cost the same parts in each.
          </p>
          <p className="sm:hidden text-[12px] mb-2" style={{ color: 'rgba(15,27,45,0.45)' }}>Swipe sideways to compare all three.</p>
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
            <table className="w-full min-w-[720px] text-[14px]">
              <caption className="sr-only">Comparison of Emithran, spreadsheets and enterprise costing tools</caption>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#f8fafb' }}>
                  <th scope="col" className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.4)' }}>Criterion</th>
                  <th scope="col" className="px-5 py-4 text-left text-[12px] font-bold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.04)' }}>Emithran</th>
                  <th scope="col" className="px-5 py-4 text-left text-[12px] font-semibold" style={{ color: 'rgba(15,27,45,0.55)' }}>Spreadsheets</th>
                  <th scope="col" className="px-5 py-4 text-left text-[12px] font-semibold" style={{ color: 'rgba(15,27,45,0.55)' }}>Enterprise CAD-based tools</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.criterion} style={{ borderBottom: i < comparisonRows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                    <th scope="row" className="px-5 py-3.5 text-left align-top font-medium" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.criterion}</th>
                    <td className="px-5 py-3.5 align-top font-medium" style={{ color: '#0f1b2d', background: 'rgba(13,148,136,0.02)' }}>{row.emithran}</td>
                    <td className="px-5 py-3.5 align-top" style={{ color: 'rgba(15,27,45,0.6)' }}>{row.spreadsheets}</td>
                    <td className="px-5 py-3.5 align-top" style={{ color: 'rgba(15,27,45,0.6)' }}>{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[14px] leading-relaxed max-w-3xl" style={{ color: 'rgba(15,27,45,0.62)' }}>
            Evaluating options? Our <Link href="/blog/should-cost-analysis-software-comparison" className="font-semibold underline" style={{ color: '#0d9488' }}>should-cost software buyer&apos;s comparison</Link> covers what to look for. Pricing is outcome-based; see the <Link href="/pricing" className="font-semibold underline" style={{ color: '#0d9488' }}>pricing page</Link> for packages.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="py-10 md:py-14" style={{ background: '#f8fafb', borderTop: '1px solid rgba(0,0,0,0.06)' }} aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>FAQ</p>
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-8 md:mb-10">Common questions about should-cost software</h2>
            <div className="space-y-3">
              {faqs.map(f => (
                <details
                  key={f.q}
                  className="rounded-xl group"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 cursor-pointer list-none text-[15px] font-semibold"
                    style={{ color: '#0f1b2d' }}
                  >
                    {f.q}
                    <span className="shrink-0 text-[#0d9488] text-lg leading-none" aria-hidden="true">+</span>
                  </summary>
                  <p className="px-5 sm:px-6 pb-5 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Learn more ── */}
        <section className="py-10 md:py-12 max-w-5xl mx-auto px-6 lg:px-10" aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-xl md:text-2xl font-bold tracking-tight mb-6">Learn more about should-cost analysis</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map(g => (
              <Link
                key={g.href}
                href={g.href}
                className="rounded-2xl p-5 block transition-colors"
                style={{ border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}
              >
                <p className="text-[14px] font-bold mb-1.5" style={{ color: '#0d9488' }}>{g.label}</p>
                <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.55)' }}>{g.note}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-[14px] leading-relaxed max-w-3xl" style={{ color: 'rgba(15,27,45,0.62)' }}>
            For the wider discipline behind these models, see our <Link href="/cost-engineering-software" className="font-semibold underline" style={{ color: '#0d9488' }}>cost engineering software</Link> page.
          </p>
        </section>

        {/* ── CTA ── */}
        <section className="py-10 md:py-14" style={{ background: '#0f1b2d' }} aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
              See a should-cost model built on one of your parts
            </h2>
            <p className="text-[15px] sm:text-[16px] mb-9 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Book a 30-minute live walkthrough with Emithran&apos;s engineering team. Bring a drawing, a BOM line or a supplier quote you want to test, and we will show how the model is built and what it tells you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl text-[15px] font-semibold"
                style={{ background: '#0d9488', color: '#fff' }}
              >
                Book a Live Demo
              </Link>
              <Link
                href="/contact?source=should-cost-page&cta=talk-to-engineer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl text-[15px] font-semibold"
                style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)' }}
              >
                Talk to an Engineer
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
