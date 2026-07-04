import Link from 'next/link'
import type { Metadata } from 'next'
import PrintButton from './PrintButton'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'
const PUBLISHED = 'June 2026'

export const metadata: Metadata = {
  title: 'State of Manufacturing Cost Intelligence 2026 | Emithran',
  description:
    'Original research from completed should-cost and teardown engagements: landed-cost arbitrage between India and Europe, material substitution savings, component-level cost concentration, and PCBA cost benchmarking.',
  keywords: [
    'manufacturing cost report 2026', 'should cost analysis benchmarks',
    'India manufacturing cost data', 'manufacturing cost intelligence report',
    'landed cost India Europe', 'PCBA cost benchmark report',
  ],
  alternates: { canonical: '/state-of-manufacturing-cost-intelligence-2026' },
  openGraph: {
    title: 'State of Manufacturing Cost Intelligence 2026 | Emithran',
    description: 'Original research from completed should-cost and teardown engagements across automotive, electronics, and commercial vehicle programmes.',
    url: '/state-of-manufacturing-cost-intelligence-2026',
    type: 'article',
  },
}

const keyFindings = [
  { value: '38%', label: 'Lower total landed cost sourcing a chassis rail from India (DDP) vs Belgium (Ex Works)' },
  { value: '£1.3M', label: 'Annual saving identified by switching an exhaust system from titanium to stainless steel at 300 units/year' },
  { value: '46%', label: 'Of total axle cost concentrated in a single sub-assembly (the drive head) on a rear-axle teardown' },
  { value: '$11.82', label: 'Per-unit saving identified on a single PCB by sourcing an alternative laminate technology' },
  { value: '131kg', label: 'Mass saved on an HGV cab structure by modelling a steel-to-composite material switch' },
  { value: '−39%', label: 'Body cost reduction on a DC-DC converter after should-cost validated an inflated input-weight assumption' },
]

const faqs = [
  {
    q: 'What is this report based on?',
    a: 'This report aggregates findings from Emithran should-cost and teardown engagements across automotive, commercial vehicle, and electronics manufacturing programmes, each documented as a published case study with line-item cost breakdowns.',
  },
  {
    q: 'Is the India-vs-Europe landed cost gap consistent across all parts?',
    a: 'No — the gap depends heavily on process (e.g. roll forming saw a 77% process cost reduction in one engagement), material, and logistics route. The 38% figure reflects a specific chassis rail comparison; other parts and processes will show different gaps and should be should-cost modelled individually.',
  },
  {
    q: 'Why do bought-out items (BOI) matter so much in cost concentration?',
    a: 'Bought-out items such as bearings and seals are price pass-throughs from sub-suppliers, so a buyer has limited direct cost-engineering leverage over them. The main levers are supplier benchmarking and multi-source qualification, which is why BOI-heavy assemblies benefit disproportionately from supplier intelligence rather than process cost modelling alone.',
  },
  {
    q: 'Can these specific savings percentages be expected on any manufacturing programme?',
    a: 'No. Each figure in this report is specific to the part, process, material, volume, and region in its underlying engagement. They illustrate the scale of savings that should-cost analysis can surface, not a guaranteed outcome for a different programme.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'State of Manufacturing Cost Intelligence 2026',
  description: 'Original research from completed should-cost and teardown engagements across automotive, electronics, and commercial vehicle programmes.',
  datePublished: '2026-06-01',
  dateModified: '2026-06-01',
  author: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
  publisher: {
    '@type': 'Organization',
    name: 'Emithran',
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/infographics/logo/logo-black.png` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/state-of-manufacturing-cost-intelligence-2026` },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'State of Manufacturing Cost Intelligence 2026', item: `${siteUrl}/state-of-manufacturing-cost-intelligence-2026` },
  ],
}

export default function StateOfManufacturingCostIntelligencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ background: '#fff', color: '#0f1b2d' }} className="print:pt-0">
        <section className="relative overflow-hidden pt-28 pb-12 print:pt-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[12px] font-semibold print:hidden" style={{ background: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)' }}>
              Original Research · {PUBLISHED}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              State of Manufacturing Cost Intelligence 2026
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(15,27,45,0.6)' }}>
              What completed should-cost and teardown engagements actually found — landed-cost arbitrage between
              India and Europe, material substitution savings, component-level cost concentration, and PCBA cost
              benchmarking — drawn from Emithran&rsquo;s published case studies.
            </p>
            <PrintButton />
          </div>
        </section>

        <section className="py-14 lg:py-16" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <h2 className="text-xl font-bold tracking-tight mb-8 text-center">Key findings at a glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {keyFindings.map((f) => (
                <div key={f.label} className="rounded-xl border p-5 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <p className="text-[32px] font-bold tracking-tight" style={{ color: '#0d9488' }}>{f.value}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 max-w-3xl mx-auto px-6 lg:px-10" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Methodology</h2>
          <p className="leading-relaxed mb-3" style={{ color: 'rgba(15,27,45,0.65)' }}>
            This report draws exclusively from Emithran should-cost and teardown engagements that are documented as
            published case studies with full line-item cost breakdowns. No figure here is modelled or projected for
            this report — every number traces back to a specific part, process, material, volume, and region in an
            underlying engagement, each of which is linked below.
          </p>
          <p className="leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
            Findings span commercial vehicle structures, automotive electronics, and exhaust systems, sourced and
            costed across India, the UK, and continental Europe. Where a finding generalises beyond its specific
            engagement, that is noted explicitly; otherwise, treat each figure as a single data point illustrating
            what should-cost analysis can surface, not a benchmark to apply directly to a different part.
          </p>

          <h2 className="text-2xl font-bold tracking-tight mb-4 mt-12">Geography: India vs Europe landed cost</h2>
          <p className="leading-relaxed mb-3" style={{ color: 'rgba(15,27,45,0.65)' }}>
            On a chassis side-rail sourcing comparison, total landed cost from India (DDP, €538) came in 38% lower
            than Ex Works pricing from Belgium (€872) — even after fully modelling packing, local freight, sea
            freight, IHC/THC, insurance, import duty, and door delivery. The underlying process cost gap was even
            larger: roll forming in India proved 77% more cost-efficient than the equivalent Belgian fabrication
            route for the same rail profile. A separate HGV chassis ladder-frame programme found a comparable 38%
            manufacturing cost reduction for rails produced in India versus Northern Europe.
          </p>
          <p className="leading-relaxed">
            <Link href="/case-studies/chassis-india-belgium" className="font-semibold hover:underline" style={{ color: '#0d9488' }}>Chassis Should-Cost: India vs Belgium →</Link>
            {' · '}
            <Link href="/case-studies/hgv-chassis" className="font-semibold hover:underline" style={{ color: '#0d9488' }}>HGV Chassis Ladder Frame Should-Cost →</Link>
          </p>

          <h2 className="text-2xl font-bold tracking-tight mb-4 mt-12">Material substitution savings</h2>
          <p className="leading-relaxed mb-3" style={{ color: 'rgba(15,27,45,0.65)' }}>
            On an exhaust system programme, a should-cost comparison of titanium versus stainless steel identified
            a £1.3M annual saving across 300 units per year by switching materials — with target cost coverage
            established against every component in the assembly before the supplier conversation started. On a
            commercial vehicle cab structure, modelling a steel-to-composite switch quantified a 131kg mass saving
            (from 322kg to 191kg), mapped against an investment range from £0.85M (quoted) to £10.6M (initial
            costing) across six candidate solutions and a volume ramp from 11 prototype units to 4,034 units.
          </p>
          <p className="leading-relaxed">
            <Link href="/case-studies/exhaust-system" className="font-semibold hover:underline" style={{ color: '#0d9488' }}>Should Costing for Exhaust System →</Link>
            {' · '}
            <Link href="/case-studies/hgv-cab-strategy" className="font-semibold hover:underline" style={{ color: '#0d9488' }}>HGV Cab Should-Cost & Decision Matrix →</Link>
          </p>

          <h2 className="text-2xl font-bold tracking-tight mb-4 mt-12">Component-level cost concentration</h2>
          <p className="leading-relaxed mb-3" style={{ color: 'rgba(15,27,45,0.65)' }}>
            On a light commercial vehicle rear-axle teardown, 46% of total axle cost concentrated in a single
            sub-assembly — the drive head — making casting yield, bearing sourcing strategy, and gear hobbing
            efficiency the highest-leverage optimisation targets at the assembly level. Bought-out items (bearings,
            seals) controlled roughly 18% of total axle cost on a pure pass-through basis: because BOI pricing is
            set by sub-suppliers rather than the manufacturing process itself, supplier benchmarking and multi-source
            qualification are the only real cost levers available for that share of cost.
          </p>
          <p className="leading-relaxed">
            <Link href="/case-studies/rear-axle-should-cost" className="font-semibold hover:underline" style={{ color: '#0d9488' }}>LCV Rear Axle Should-Cost Analysis →</Link>
          </p>

          <h2 className="text-2xl font-bold tracking-tight mb-4 mt-12">Electronics and PCBA cost benchmarking</h2>
          <p className="leading-relaxed mb-3" style={{ color: 'rgba(15,27,45,0.65)' }}>
            An electronics teardown engagement identified an FR4 + PTFE glass-fibre laminate (11-layer, immersion
            tin) at $8.07 per unit versus $19.89 for a ceramic hybrid alternative meeting the same requirement — an
            $11.82 per-unit saving validated down to SEM/EDAX cross-sections at 1500× magnification, not estimated
            from datasheets. On a separate DC-DC converter teardown and VAVE engagement, should-cost analysis
            identified an inflated input-weight assumption in a supplier quote, driving a 39% body cost reduction
            once corrected; batch quantity optimisation from 500 to 6,000 units delivered a further 28% PCBA cost
            reduction, and dual-sourcing wire harness suppliers in Bangalore drove harness cost down 22%
            (from $1.17 to $0.92) through competitive bidding.
          </p>
          <p className="leading-relaxed">
            <Link href="/case-studies/electronics-teardown" className="font-semibold hover:underline" style={{ color: '#0d9488' }}>Electronics & PCB Should-Cost Teardown →</Link>
            {' · '}
            <Link href="/case-studies/dc-dc-converter" className="font-semibold hover:underline" style={{ color: '#0d9488' }}>DC-DC Converter Teardown & VAVE →</Link>
          </p>
        </section>

        <section className="py-14 lg:py-16 print:hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-bold tracking-tight mb-10 text-center">Frequently asked questions</h2>
            <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="text-base font-bold mb-2">{f.q}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 print:hidden" style={{ background: 'rgba(13,148,136,0.04)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Want a should-cost model for your own programme?</h2>
            <p className="mb-8" style={{ color: 'rgba(15,27,45,0.6)' }}>Most pilots start within a week, using your own parts and suppliers.</p>
            <Link href="/request-demo" className="inline-flex rounded-xl px-7 py-3.5 text-sm font-semibold text-white" style={{ background: '#0d9488' }}>
              Request a Demo
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
