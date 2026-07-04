import Link from 'next/link'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Emithran vs aPriori: Should-Cost Software Comparison',
  description:
    'A side-by-side comparison of Emithran and aPriori for should-cost analysis, BOM intelligence, and supplier data — covering pricing model, India presence, AI capabilities, and modules.',
  keywords: [
    'aPriori alternative', 'aPriori alternative India', 'Emithran vs aPriori',
    'aPriori vs Emithran', 'should cost software comparison', 'manufacturing cost estimation software India',
  ],
  alternates: { canonical: '/emithran-vs-apriori' },
  openGraph: {
    title: 'Emithran vs aPriori: Should-Cost Software Comparison',
    description: 'Should-cost analysis, BOM intelligence, and supplier data compared side by side for India-focused and global manufacturing teams.',
    url: '/emithran-vs-apriori',
    type: 'website',
  },
}

const comparisonRows = [
  { criterion: 'Primary focus',        emithran: 'Should-cost, BOM, and supplier intelligence in one platform', apriori: 'Automated manufacturing cost estimation, often from CAD' },
  { criterion: 'Pricing model',        emithran: 'Outcome-based, free pilot',                                  apriori: 'Enterprise license, typically annual contract' },
  { criterion: 'Setup time',           emithran: 'Live in 5 days',                                              apriori: '3–6 month enterprise rollout' },
  { criterion: 'India-specific data',  emithran: 'Native labour rates, material pricing, and supplier base',    apriori: 'Primarily Western/global cost libraries; India data is limited' },
  { criterion: 'Supplier intelligence',emithran: '72,000+ verified Indian suppliers built in',                  apriori: 'Not a core module — cost modelling is the focus' },
  { criterion: 'BOM management',       emithran: 'Native BOM Composer with validation and collaboration',       apriori: 'BOM import for costing; not a standalone BOM system' },
  { criterion: 'Process coverage',     emithran: '10+ processes, expanding',                                    apriori: '30+ processes — broader for large global manufacturers' },
  { criterion: 'AI / automation',      emithran: 'AI-assisted should-cost from CAD, supplier matching, risk scoring', apriori: 'Automated cost feedback in CAD, design-for-cost guidance' },
  { criterion: 'Target customer',      emithran: 'India-based and India-linked defence, aerospace, space, and precision OEMs', apriori: 'Large global automotive, aerospace, and industrial OEMs' },
]

const faqs = [
  {
    q: 'What is the main difference between Emithran and aPriori?',
    a: 'aPriori is an established cost-estimation platform built primarily for large Western automotive, aerospace, and industrial OEMs, with deep automated CAD-based costing and broad process coverage. Emithran is built specifically for India-linked manufacturing programmes, combining should-cost analysis with native BOM management and a 72,000+ supplier database in one platform, with a faster, lower-overhead rollout.',
  },
  {
    q: 'Is Emithran a good aPriori alternative for Indian manufacturers?',
    a: "Yes, particularly for teams that need India-specific labour rates, material pricing, and supplier data out of the box rather than as an add-on. Emithran's outcome-based pricing and 5-day pilot setup are also typically faster to start than an enterprise aPriori rollout.",
  },
  {
    q: 'Does aPriori cover more manufacturing processes than Emithran?',
    a: "Today, yes — aPriori supports 30+ processes against Emithran's 10+, reflecting aPriori's longer history serving large global manufacturers. Emithran's process coverage is expanding, prioritised around the processes most used in defence, aerospace, space, and precision manufacturing supply chains.",
  },
  {
    q: 'Can I use Emithran alongside an existing aPriori deployment?',
    a: "Some teams do, typically using aPriori for design-stage automated costing and Emithran for supplier intelligence, BOM management, and India-specific sourcing decisions. They are not mutually exclusive, though most teams choose one as their primary should-cost system of record.",
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
    { '@type': 'ListItem', position: 2, name: 'Emithran vs aPriori', item: `${siteUrl}/emithran-vs-apriori` },
  ],
}

export default function EmithranVsAprioriPage() {
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
              Emithran vs aPriori
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
              aPriori is an established automated cost-estimation platform built for large Western OEMs. Emithran is
              a should-cost, BOM, and supplier intelligence platform built specifically for India-linked defence,
              aerospace, space, and precision manufacturing programmes. Here is how they compare.
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
                    <th className="px-5 py-3.5 text-center font-semibold" style={{ color: 'rgba(15,27,45,0.7)' }}>aPriori</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.criterion} style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <td className="px-5 py-3.5 font-medium" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.criterion}</td>
                      <td className="px-5 py-3.5 text-center font-semibold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.02)' }}>{row.emithran}</td>
                      <td className="px-5 py-3.5 text-center" style={{ color: 'rgba(15,27,45,0.5)' }}>{row.apriori}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: 'rgba(15,27,45,0.45)' }}>
              Comparison based on publicly available information about aPriori as of 2026. Capabilities change over
              time — verify current details directly with aPriori for your specific evaluation.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#0d9488' }}>Where Emithran fits best</h2>
              <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                <li>Teams needing India-native labour, material, and supplier data without add-on configuration.</li>
                <li>Programmes that want should-cost, BOM management, and supplier intelligence in one connected system.</li>
                <li>Defence, aerospace, space, and precision manufacturing teams needing a fast pilot, not a multi-month rollout.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'rgba(15,27,45,0.7)' }}>Where aPriori fits best</h2>
              <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                <li>Large global OEMs with existing enterprise IT infrastructure and budget for a long rollout.</li>
                <li>Teams needing automated CAD-based costing across a very broad process library (30+ processes).</li>
                <li>Organisations with limited India-specific sourcing requirements.</li>
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
