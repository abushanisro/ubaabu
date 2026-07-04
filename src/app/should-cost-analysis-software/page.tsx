import Link from 'next/link'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export const metadata: Metadata = {
  title: 'Should-Cost Analysis Software - Emithran',
  description:
    'Should-cost analysis software for defence, aerospace, and precision manufacturing OEMs. Build bottom-up cost models, close supplier gaps, and negotiate with data — not gut feel.',
  keywords: [
    'should cost analysis software', 'should cost software India', 'manufacturing cost analysis tool',
    'should cost modelling platform', 'supplier negotiation software', 'cost engineering software',
    'BOM cost analysis', 'aPriori alternative India', 'manufacturing intelligence platform',
    'defence aerospace cost software', 'should cost tool',
  ],
  alternates: { canonical: '/should-cost-analysis-software' },
  openGraph: {
    title: 'Should-Cost Analysis Software — Emithran',
    description: 'Build bottom-up should-cost models for any manufacturing process. Used by defence, aerospace, and precision manufacturing OEMs in India.',
    url: '/should-cost-analysis-software',
    type: 'website',
  },
  twitter: {
    title: 'Should-Cost Analysis Software — Emithran',
    description: 'Should-cost modelling for defence, aerospace, and precision manufacturing OEMs in India.',
  },
}

const faqs = [
  {
    q: 'What is should-cost analysis software?',
    a: 'Should-cost analysis software builds a bottom-up estimate of what a part or assembly should cost to manufacture — based on materials, labour, machine cycle times, overheads, and supplier margin — rather than accepting a supplier\'s quoted price at face value. Emithran\'s platform does this automatically for machined, stamped, cast, and sheet metal components.',
  },
  {
    q: 'How accurate are Emithran\'s should-cost models?',
    a: 'Typical accuracy is within ±8% of actual manufacturing cost for standard machined, stamped, and cast components. Accuracy improves when you upload a CAD file or detailed drawing. Complex assemblies with multi-step processes are flagged explicitly when confidence is lower.',
  },
  {
    q: 'Which manufacturing processes does Emithran support?',
    a: 'Emithran currently supports CNC machining, stamping, die casting, investment casting, injection moulding, sheet metal fabrication, roll forming, welded assemblies, forging, and PCB/PCBA assembly. Additive manufacturing support is in active development.',
  },
  {
    q: 'Can I compare should-cost across multiple countries?',
    a: 'Yes. You can run a multi-geography cost comparison across India, Germany, UK, USA, China, Mexico, and Turkey in a single report. The output includes landed cost (DDP) with logistics and duty factored in — not just ex-works pricing.',
  },
  {
    q: 'How is Emithran different from aPriori or spreadsheet-based should-costing?',
    a: 'aPriori is a powerful tool built for large Western OEMs with significant IT infrastructure. Emithran is built for India\'s manufacturing context — local labour rates, Indian material pricing, and regional supplier data are native to the platform, not add-ons. Unlike spreadsheets, Emithran is collaborative, auditable, and connected to live commodity price feeds.',
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

const steps = [
  {
    n: '01',
    title: 'Upload or describe your part',
    body: 'Upload a CAD file, drawing, or enter a part description. Emithran identifies the part family, material, and manufacturing process automatically.',
  },
  {
    n: '02',
    title: 'Should-cost model runs automatically',
    body: 'The engine builds a bottom-up cost model using live material prices, regional labour rates, machine cycle time estimates, and overhead benchmarks for your selected manufacturing location.',
  },
  {
    n: '03',
    title: 'Negotiate with data, not gut feel',
    body: 'The platform generates a negotiation brief showing your should-cost versus the supplier quote, the gap, and a suggested target price — ready to share directly with your supplier.',
  },
]

const features = [
  {
    icon: '⚙',
    title: 'Process-Level Costing',
    body: 'Every manufacturing operation — heating, forming, machining, finishing — broken down to cost per part. No black-box estimates.',
  },
  {
    icon: '🌍',
    title: 'Multi-Geography Benchmarking',
    body: 'Compare ex-works costs across India, UK, Germany, China, and USA in one report. DDP logistics included.',
  },
  {
    icon: '📐',
    title: 'CAD & Drawing Analysis',
    body: 'Upload STEP, DXF, or PDF drawings. Emithran extracts geometry, material, and process from the file automatically.',
  },
  {
    icon: '🤝',
    title: 'Negotiation Briefs',
    body: 'Auto-generate supplier negotiation packs with should-cost vs. quote comparison and recommended target price.',
  },
  {
    icon: '📊',
    title: 'VAVE Integration',
    body: 'Link should-cost data to VAVE workflows. Identify over-engineered features and model cost impact of design changes.',
  },
  {
    icon: '🔒',
    title: 'Defence-Grade Security',
    body: 'ISO 27001-certified data centres in India. ITAR-compatible data isolation for sensitive programmes.',
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
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free pilot available' },
  featureList: features.map((f) => f.title),
}

const comparisonRows = [
  { criterion: 'Setup time',         emithran: 'Live in 5 days',       spreadsheets: 'Weeks of manual work', apriori: '3–6 month rollout' },
  { criterion: 'India pricing data', emithran: 'Native',               spreadsheets: 'Manual research',      apriori: 'Add-on / limited' },
  { criterion: 'Collaboration',      emithran: 'Multi-user, real-time', spreadsheets: 'Email attachments',   apriori: 'Enterprise license' },
  { criterion: 'Audit trail',        emithran: 'Full history',          spreadsheets: 'None',                 apriori: 'Yes' },
  { criterion: 'Process coverage',   emithran: '10+ processes',         spreadsheets: 'Manual formulas',      apriori: '30+ processes' },
  { criterion: 'Pricing model',      emithran: 'Outcome-based',         spreadsheets: 'Free (no support)',    apriori: 'Enterprise contract' },
]

export default function ShouldCostAnalysisSoftwarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <main style={{ background: '#fff', color: '#0f1b2d' }}>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-28 pb-20" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,148,136,0.08) 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[12px] font-semibold" style={{ background: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)' }}>
              Manufacturing Intelligence Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Should-Cost Analysis Software<br className="hidden md:block" />
              <span style={{ color: '#0d9488' }}> for Defence & Aerospace OEMs</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
              Emithran is should-cost analysis software that builds bottom-up cost models for any manufactured part or assembly. Identify supplier overcharges, close the gap between quote and should-cost, and negotiate with data — not gut feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-colors"
                style={{ background: '#0d9488', color: '#fff' }}
              >
                Request a Demo
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-colors"
                style={{ background: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)' }}
              >
                See Case Studies
              </Link>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: 'rgba(15,27,45,0.35)' }}>
              ±8% accuracy · 10+ manufacturing processes · India, UK, Germany, USA, China
            </p>
          </div>
        </section>

        {/* ── What is should-cost analysis ── */}
        <section className="py-20 max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>What is Should-Cost Analysis?</p>
              <h2 className="text-3xl font-bold tracking-tight mb-5">
                Stop accepting supplier quotes. Start knowing what parts actually cost.
              </h2>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'rgba(15,27,45,0.65)' }}>
                A <strong>should-cost model</strong> is a bottom-up estimate of what a part or assembly <em>should</em> cost to manufacture — based on material, labour, machine cycle time, overhead, and margin — rather than what your supplier quotes.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                Emithran's Should-Cost Engine pulls live commodity prices, regional labour rates, and machine benchmarks to generate a should-cost figure automatically — from a part description, CAD file, or engineering drawing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '±8%',    label: 'Typical model accuracy' },
                { stat: '5 days', label: 'Average time to go live' },
                { stat: '10+',    label: 'Manufacturing processes' },
                { stat: '20–30%', label: 'Improvement in RFQ win rate' },
              ].map(({ stat, label }) => (
                <div key={label} className="rounded-2xl p-5" style={{ border: '1px solid rgba(13,148,136,0.15)', background: 'rgba(13,148,136,0.03)' }}>
                  <p className="text-[32px] font-bold mb-1" style={{ color: '#0d9488' }}>{stat}</p>
                  <p className="text-[13px]" style={{ color: 'rgba(15,27,45,0.55)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-20" style={{ background: '#0f1b2d' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#2dd4bf' }}>How It Works</p>
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-white">
              From part description to negotiation brief in minutes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map(s => (
                <div key={s.n}>
                  <p className="text-[40px] font-black mb-4" style={{ color: 'rgba(45,212,191,0.2)' }}>{s.n}</p>
                  <h3 className="text-[17px] font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-20 max-w-5xl mx-auto px-6 lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>Platform Capabilities</p>
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            Everything you need to cost, benchmark, and negotiate
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#fafffe' }}>
                <p className="text-2xl mb-3">{f.icon}</p>
                <h3 className="text-[15px] font-bold mb-2">{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Case study callout ── */}
        <section className="py-16" style={{ background: 'rgba(13,148,136,0.04)', borderTop: '1px solid rgba(13,148,136,0.1)', borderBottom: '1px solid rgba(13,148,136,0.1)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#0d9488' }}>Case Study</p>
                <h2 className="text-2xl font-bold mb-4">38% landed cost saving on HGV chassis rails — India vs Belgium</h2>
                <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'rgba(15,27,45,0.65)' }}>
                  Emithran modelled should-cost for a hydrogen HGV chassis ladder frame — 74 BOM line items, 945 kg input weight — and identified that Indian roll forming delivers a 38% total landed cost saving versus Belgium manufacturing, including full DDP logistics to Scotland.
                </p>
                <Link
                  href="/case-studies/chassis-india-belgium"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold"
                  style={{ color: '#0d9488' }}
                >
                  Read the full case study →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: 'Assembly cost', v: '€5,248.81' },
                  { k: 'India DDP', v: '€538 / rail' },
                  { k: 'Belgium Ex Works', v: '€872 / rail' },
                  { k: 'Saving', v: '38%' },
                ].map(({ k, v }) => (
                  <div key={k} className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid rgba(13,148,136,0.15)' }}>
                    <p className="text-[11px] mb-1" style={{ color: 'rgba(15,27,45,0.4)' }}>{k}</p>
                    <p className="text-[18px] font-bold" style={{ color: '#0d9488' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-20 max-w-5xl mx-auto px-6 lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>How We Compare</p>
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            Emithran vs spreadsheets vs aPriori
          </h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
            <table className="w-full text-[14px]">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#f8fafb' }}>
                  <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.4)' }}>Criterion</th>
                  <th className="px-5 py-4 text-center text-[12px] font-bold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.04)' }}>Emithran</th>
                  <th className="px-5 py-4 text-center text-[11px] font-semibold" style={{ color: 'rgba(15,27,45,0.5)' }}>Spreadsheets</th>
                  <th className="px-5 py-4 text-center text-[11px] font-semibold" style={{ color: 'rgba(15,27,45,0.5)' }}>aPriori</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.criterion} style={{ borderBottom: i < comparisonRows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                    <td className="px-5 py-3.5 font-medium" style={{ color: 'rgba(15,27,45,0.7)' }}>{row.criterion}</td>
                    <td className="px-5 py-3.5 text-center font-semibold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.02)' }}>{row.emithran}</td>
                    <td className="px-5 py-3.5 text-center" style={{ color: 'rgba(15,27,45,0.5)' }}>{row.spreadsheets}</td>
                    <td className="px-5 py-3.5 text-center" style={{ color: 'rgba(15,27,45,0.5)' }}>{row.apriori}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20" style={{ background: '#f8fafb', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight mb-10">Common questions about should-cost software</h2>
            <div className="space-y-3">
              {faqs.map(f => (
                <details
                  key={f.q}
                  className="rounded-xl group"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}
                >
                  <summary
                    className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none text-[15px] font-semibold"
                    style={{ color: '#0f1b2d' }}
                  >
                    {f.q}
                    <span className="shrink-0 text-[#0d9488] text-lg leading-none">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20" style={{ background: '#0f1b2d' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5">
              Ready to know what your parts should cost?
            </h2>
            <p className="text-[16px] mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Book a 30-minute walkthrough with our engineering team. We'll show you how Emithran builds a should-cost model for one of your parts — live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-[15px] font-semibold"
                style={{ background: '#0d9488', color: '#fff' }}
              >
                Book a Live Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-[15px] font-semibold"
                style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)' }}
              >
                Talk to an Engineer
              </Link>
            </div>
            <p className="mt-6 text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Used by OEMs in defence, aerospace, and space manufacturing across India.
            </p>
          </div>
        </section>

      </main>
    </>
  )
}
