import Link from 'next/link'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Emithran vs Siemens Teamcenter: Cost Software Comparison',
  description:
    'A side-by-side comparison of Emithran and Siemens Teamcenter Product Cost Management — covering pricing model, deployment, implementation time, and supplier data for manufacturers.',
  keywords: [
    'Teamcenter alternative', 'Siemens Teamcenter alternative India', 'Emithran vs Teamcenter',
    'Teamcenter vs Emithran', 'Siemens Teamcenter Product Cost Management alternative',
    'product cost management software comparison',
  ],
  alternates: { canonical: '/emithran-vs-teamcenter' },
  openGraph: {
    title: 'Emithran vs Siemens Teamcenter: Cost Software Comparison',
    description: 'Product cost management, should-costing, and supplier data compared side by side for India-focused and global manufacturing teams.',
    url: '/emithran-vs-teamcenter',
    type: 'website',
    siteName: 'Emithran',
  },
}

const comparisonRows = [
  { criterion: 'Primary focus',        emithran: 'Should-cost, BOM, and supplier intelligence in one platform', teamcenter: 'Enterprise PLM suite with a Product Cost Management module' },
  { criterion: 'Deployment',           emithran: 'Cloud-native, multi-user from day one',                        teamcenter: 'Cloud (Teamcenter X SaaS) or on-premise, managed by enterprise IT' },
  { criterion: 'Pricing model',        emithran: 'Outcome-based, free pilot',                                    teamcenter: 'Enterprise licence + implementation, commonly $3M-$8M+ for full PLM rollouts' },
  { criterion: 'Setup time',           emithran: 'Live in 5 days',                                                teamcenter: 'Multi-month to multi-year enterprise PLM implementation' },
  { criterion: 'India-specific data',  emithran: 'Native labour rates, material pricing, and supplier base',      teamcenter: 'Global cost benchmark data; not India-specific by default' },
  { criterion: 'Supplier intelligence',emithran: '72,000+ verified Indian suppliers built in',                    teamcenter: 'Not a core module — cost management sits inside the broader PLM suite' },
  { criterion: 'BOM management',       emithran: 'Native BOM Composer with validation and collaboration',        teamcenter: 'Full enterprise PLM/BOM backbone — far broader than costing alone' },
  { criterion: 'Best known for',       emithran: 'Connecting should-cost to BOM and live supplier qualification', teamcenter: 'Enterprise-wide PLM, engineering data backbone, and bottom-up cost structures at scale' },
  { criterion: 'Target customer',      emithran: 'India-based and India-linked defence, aerospace, space, and precision OEMs', teamcenter: 'Large global enterprises already standardised on Siemens PLM/Teamcenter' },
]

const faqs = [
  {
    q: 'What is the main difference between Emithran and Siemens Teamcenter?',
    a: 'Teamcenter is a full enterprise PLM platform, with Product Cost Management as one module inside a much larger system used by large global manufacturers already standardised on Siemens software — implementations commonly run into the millions of dollars and many months. Emithran is a focused should-cost, BOM, and supplier intelligence platform built for India-linked manufacturing programmes, with a 5-day pilot and no enterprise PLM prerequisite.',
  },
  {
    q: 'Is Emithran a good Teamcenter alternative for Indian manufacturers?',
    a: 'For teams that need should-cost analysis, BOM management, and supplier intelligence without first standing up an enterprise PLM system, yes — particularly with India-specific labour rates, material pricing, and a 72,000+ supplier database built in. Teamcenter makes more sense for large enterprises that already run (or plan to run) their entire product lifecycle on Siemens PLM.',
  },
  {
    q: 'Does Teamcenter offer more than should-cost analysis?',
    a: 'Yes — Teamcenter is a full PLM suite covering CAD data management, engineering change, manufacturing planning, and more, with Product Cost Management as one part of that. Emithran is purpose-built around should-cost, BOM, and supplier intelligence rather than replacing an enterprise PLM backbone.',
  },
  {
    q: 'Can I use Emithran alongside an existing Teamcenter deployment?',
    a: 'Some teams do, typically keeping Teamcenter as the enterprise PLM/engineering data system of record and using Emithran for faster, India-specific should-cost modelling, supplier qualification, and sourcing decisions on top of it. They serve different layers of the workflow rather than competing head-to-head in every case.',
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
    { '@type': 'ListItem', position: 2, name: 'Emithran vs Siemens Teamcenter', item: `${siteUrl}/emithran-vs-teamcenter` },
  ],
}

export default function EmithranVsTeamcenterPage() {
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
              Emithran vs Siemens Teamcenter
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
              Siemens Teamcenter Product Cost Management is a costing module inside a large enterprise PLM suite,
              used by global manufacturers already standardised on Siemens software. Emithran is a focused
              should-cost, BOM, and supplier intelligence platform built specifically for India-linked defence,
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
                    <th className="px-5 py-3.5 text-center font-semibold" style={{ color: 'rgba(15,27,45,0.7)' }}>Siemens Teamcenter</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.criterion} style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <td className="px-5 py-3.5 font-medium" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.criterion}</td>
                      <td className="px-5 py-3.5 text-center font-semibold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.02)' }}>{row.emithran}</td>
                      <td className="px-5 py-3.5 text-center" style={{ color: 'rgba(15,27,45,0.5)' }}>{row.teamcenter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: 'rgba(15,27,45,0.45)' }}>
              Comparison based on publicly available information about Siemens Teamcenter as of 2026. Capabilities
              and pricing change over time — verify current details directly with Siemens for your specific evaluation.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#0d9488' }}>Where Emithran fits best</h2>
              <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                <li>Teams needing India-native labour, material, and supplier data without add-on configuration.</li>
                <li>Programmes that want should-cost, BOM management, and supplier intelligence in one connected system — not a module inside a much larger PLM rollout.</li>
                <li>Defence, aerospace, space, and precision manufacturing teams needing a fast pilot, not a multi-month or multi-year enterprise implementation.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'rgba(15,27,45,0.7)' }}>Where Siemens Teamcenter fits best</h2>
              <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                <li>Large global enterprises already standardised on Siemens PLM for CAD, engineering change, and manufacturing planning.</li>
                <li>Organisations with the budget and timeline for a multi-million-dollar, enterprise-wide PLM programme.</li>
                <li>Teams that need cost management deeply integrated into a single enterprise PLM system of record.</li>
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
