import Link from 'next/link'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Emithran vs Costimator: Cost Estimating Software Comparison',
  description:
    'A side-by-side comparison of Emithran and Costimator for manufacturing cost estimating — covering pricing model, supplier intelligence, BOM management, and AI capabilities.',
  keywords: [
    'Costimator alternative', 'Emithran vs Costimator', 'Costimator vs Emithran',
    'manufacturing cost estimating software comparison', 'MTI Costimator alternative India',
  ],
  alternates: { canonical: '/emithran-vs-costimator' },
  openGraph: {
    title: 'Emithran vs Costimator: Cost Estimating Software Comparison',
    description: 'Manufacturing cost estimating, supplier intelligence, and BOM management compared side by side.',
    url: '/emithran-vs-costimator',
    type: 'website',
  },
}

const comparisonRows = [
  { criterion: 'Primary focus',         emithran: 'Should-cost, BOM, and supplier intelligence in one platform', costimator: 'Parametric cost estimating and quoting for machine shops' },
  { criterion: 'Deployment',            emithran: 'Cloud-native, multi-user from day one',                       costimator: 'Primarily desktop/on-premise, per-seat install' },
  { criterion: 'Pricing model',         emithran: 'Outcome-based, free pilot',                                   costimator: 'Per-seat license, typically annual or perpetual' },
  { criterion: 'India-specific data',   emithran: 'Native labour rates, material pricing, and supplier base',    costimator: 'Cost libraries oriented to US/Western shop rates' },
  { criterion: 'Supplier intelligence', emithran: '72,000+ verified Indian suppliers built in',                  costimator: 'Not a built-in module — estimating is the focus' },
  { criterion: 'BOM management',        emithran: 'Native BOM Composer with validation and collaboration',       costimator: 'Quote/part-level, not a standalone multi-level BOM system' },
  { criterion: 'Collaboration',         emithran: 'Real-time, multi-user, role-based, full audit trail',         costimator: 'Primarily single-user estimating workflow per seat' },
  { criterion: 'Process coverage',      emithran: '10+ processes, expanding, with should-cost negotiation briefs', costimator: 'Strong depth in machining, sheet metal, and fabrication estimating' },
  { criterion: 'Best known for',        emithran: 'Connecting should-cost to BOM and live supplier qualification', costimator: 'Fast, repeatable quoting for job-shop and contract manufacturing' },
]

const faqs = [
  {
    q: 'What is the main difference between Emithran and Costimator?',
    a: "Costimator is a long-standing parametric cost-estimating and quoting tool, widely used by machine shops and contract manufacturers for fast, repeatable quotes on machined and fabricated parts. Emithran is a broader manufacturing intelligence platform connecting should-cost modelling to BOM management and a 72,000+ supplier database, built specifically for India-linked defence, aerospace, space, and precision manufacturing programmes.",
  },
  {
    q: 'Is Emithran a good Costimator alternative for Indian manufacturers?',
    a: 'Yes, particularly for teams that need India-specific labour and material cost data, supplier qualification, and BOM-level collaboration in one system rather than a standalone desktop estimating tool.',
  },
  {
    q: 'Does Costimator have deeper machining cost estimates than Emithran?',
    a: 'Costimator has a long track record specifically in machining, sheet metal, and fabrication estimating for job shops, reflecting decades of focus in that niche. Emithran covers should-cost modelling for a broader process set but is not positioned as a dedicated job-shop quoting tool in the same way.',
  },
  {
    q: 'Can Emithran replace Costimator for a manufacturing OEM (not a job shop)?',
    a: 'For OEMs and programme teams that need should-cost modelling connected to BOM data and supplier qualification — rather than a standalone quoting tool for an individual machine shop — Emithran is typically a closer fit. Job shops focused purely on fast, repeatable quoting may still prefer a dedicated estimating tool like Costimator.',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Emithran vs Costimator', item: `${siteUrl}/emithran-vs-costimator` },
  ],
}

export default function EmithranVsCostimatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ background: '#fff', color: '#0f1b2d' }}>
        <section className="relative overflow-hidden pt-28 pb-16" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[12px] font-semibold" style={{ background: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)' }}>
              Comparison
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Emithran vs Costimator
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
              Costimator is a long-standing parametric estimating and quoting tool used by machine shops and
              contract manufacturers. Emithran is a should-cost, BOM, and supplier intelligence platform built for
              India-linked defence, aerospace, space, and precision manufacturing programmes. Here is how they compare.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">Feature-by-feature comparison</h2>
            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'rgba(13,148,136,0.05)' }}>
                    <th className="px-5 py-3.5 text-left font-semibold" style={{ color: 'rgba(15,27,45,0.7)' }}>Criterion</th>
                    <th className="px-5 py-3.5 text-center font-semibold" style={{ color: '#0d9488' }}>Emithran</th>
                    <th className="px-5 py-3.5 text-center font-semibold" style={{ color: 'rgba(15,27,45,0.7)' }}>Costimator</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.criterion} style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <td className="px-5 py-3.5 font-medium" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.criterion}</td>
                      <td className="px-5 py-3.5 text-center font-semibold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.02)' }}>{row.emithran}</td>
                      <td className="px-5 py-3.5 text-center" style={{ color: 'rgba(15,27,45,0.5)' }}>{row.costimator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: 'rgba(15,27,45,0.45)' }}>
              Comparison based on publicly available information about Costimator as of 2026. Capabilities change
              over time — verify current details directly with MTI Systems for your specific evaluation.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#0d9488' }}>Where Emithran fits best</h2>
              <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                <li>Programme teams that need should-cost connected to live BOM and supplier qualification data.</li>
                <li>Teams sourcing across India that need native local labour, material, and supplier data.</li>
                <li>Organisations wanting multi-user collaboration and audit trail, not a single-seat desktop tool.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'rgba(15,27,45,0.7)' }}>Where Costimator fits best</h2>
              <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                <li>Job shops and contract manufacturers needing fast, repeatable machining and fabrication quotes.</li>
                <li>Teams with an established desktop estimating workflow and US/Western shop rate libraries.</li>
                <li>Standalone quoting needs that don't require BOM management or supplier qualification.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10 text-center">Frequently asked questions</h2>
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

        <section className="py-16" style={{ background: 'rgba(13,148,136,0.04)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">See Emithran on your own BOMs</h2>
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
