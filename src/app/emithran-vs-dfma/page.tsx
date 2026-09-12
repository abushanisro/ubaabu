import Link from 'next/link'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Emithran vs DFMA (Boothroyd Dewhurst): Software Comparison',
  description:
    'A side-by-side comparison of Emithran and DFMA software from Boothroyd Dewhurst for design for manufacture and assembly, should-costing, and supplier data — covering pricing model, deployment, and India presence.',
  keywords: [
    'DFMA alternative', 'DFMA alternative India', 'Emithran vs DFMA',
    'DFMA vs Emithran', 'Boothroyd Dewhurst alternative', 'design for manufacture and assembly software comparison',
  ],
  alternates: { canonical: '/emithran-vs-dfma' },
  openGraph: {
    title: 'Emithran vs DFMA (Boothroyd Dewhurst): Software Comparison',
    description: 'Design for manufacture and assembly, should-costing, and supplier data compared side by side for India-focused and global manufacturing teams.',
    url: '/emithran-vs-dfma',
    type: 'website',
    siteName: 'Emithran',
  },
}

const comparisonRows = [
  { criterion: 'Primary focus',        emithran: 'Should-cost, BOM, and supplier intelligence in one platform', dfma: 'Product simplification (DFA) and should-costing (DFM) desktop analysis' },
  { criterion: 'Deployment',            emithran: 'Cloud-native, multi-user from day one',                       dfma: 'Desktop software, floating or node-locked subscription licences' },
  { criterion: 'Pricing model',        emithran: 'Outcome-based, free pilot',                                  dfma: 'Subscription licence, typically annual with multi-year discounts' },
  { criterion: 'Setup time',           emithran: 'Live in 5 days',                                              dfma: 'Licence + training rollout, often weeks depending on team size' },
  { criterion: 'India-specific data',  emithran: 'Native labour rates, material pricing, and supplier base',    dfma: 'Global costing data across 20+ countries; India depth not a primary focus' },
  { criterion: 'Supplier intelligence',emithran: '72,000+ verified Indian suppliers built in',                  dfma: 'Not a core module — cost and design-simplification analysis is the focus' },
  { criterion: 'BOM management',       emithran: 'Native BOM Composer with validation and collaboration',       dfma: 'Part-count and structure analysis, not a standalone multi-level BOM system' },
  { criterion: 'Process coverage',     emithran: '10+ processes, expanding',                                    dfma: '25+ process-based cost models, a long-standing strength of the product' },
  { criterion: 'Best known for',       emithran: 'Connecting should-cost to BOM and live supplier qualification', dfma: 'Design for Assembly part-count reduction and multi-region should-cost analysis' },
  { criterion: 'Target customer',      emithran: 'India-based and India-linked defence, aerospace, space, and precision OEMs', dfma: 'Large global automotive, aerospace, medical device, and industrial manufacturers' },
]

const faqs = [
  {
    q: 'What is the main difference between Emithran and DFMA?',
    a: 'DFMA, from Boothroyd Dewhurst, is an established desktop software pairing Design for Assembly (part-count and structure simplification) with should-cost analysis across 25+ manufacturing processes and global cost data. Emithran is a cloud-native platform combining should-cost analysis with native BOM management and a 72,000+ supplier database, built specifically for India-linked manufacturing programmes with a faster rollout.',
  },
  {
    q: 'Is Emithran a good DFMA alternative for Indian manufacturers?',
    a: "Yes, particularly for teams that need India-specific labour rates, material pricing, and supplier data out of the box, plus supplier qualification and BOM management in the same system, rather than a standalone desktop costing and design-simplification tool.",
  },
  {
    q: 'Does DFMA cover more manufacturing processes than Emithran?',
    a: "Today, yes — DFMA's should-costing module covers 25+ process-based cost models built up over decades, reflecting its long history serving large global manufacturers. Emithran's process coverage is expanding, prioritised around the processes most used in defence, aerospace, space, and precision manufacturing supply chains.",
  },
  {
    q: 'Can I use Emithran alongside an existing DFMA deployment?',
    a: "Some teams do, typically using DFMA for design-stage part-count simplification and should-cost modelling, and Emithran for supplier intelligence, BOM management, and India-specific sourcing decisions. They are not mutually exclusive, though most teams choose one as their primary system of record for cost and sourcing data.",
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
    { '@type': 'ListItem', position: 2, name: 'Emithran vs DFMA', item: `${siteUrl}/emithran-vs-dfma` },
  ],
}

export default function EmithranVsDfmaPage() {
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
              Emithran vs DFMA
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
              DFMA, from Boothroyd Dewhurst, is an established desktop tool for design for assembly and should-cost
              analysis used by large global manufacturers. Emithran is a cloud-native should-cost, BOM, and supplier
              intelligence platform built specifically for India-linked defence, aerospace, space, and precision
              manufacturing programmes. Here is how they compare.
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
                    <th className="px-5 py-3.5 text-center font-semibold" style={{ color: 'rgba(15,27,45,0.7)' }}>DFMA</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.criterion} style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <td className="px-5 py-3.5 font-medium" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.criterion}</td>
                      <td className="px-5 py-3.5 text-center font-semibold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.02)' }}>{row.emithran}</td>
                      <td className="px-5 py-3.5 text-center" style={{ color: 'rgba(15,27,45,0.5)' }}>{row.dfma}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: 'rgba(15,27,45,0.45)' }}>
              Comparison based on publicly available information about DFMA as of 2026. Capabilities change over
              time — verify current details directly with Boothroyd Dewhurst for your specific evaluation.
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
                <li>Defence, aerospace, space, and precision manufacturing teams needing a fast pilot, not a licence and training rollout.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'rgba(15,27,45,0.7)' }}>Where DFMA fits best</h2>
              <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                <li>Large global OEMs with an existing desktop-software workflow and dedicated cost-engineering seats.</li>
                <li>Teams needing deep Design for Assembly part-count reduction alongside should-costing across 25+ processes.</li>
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
