import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BOM Management Software - Emithran',
  description:
    'BOM management software for precision manufacturing OEMs. Validate, collaborate, and cost your bills of materials with AI-powered intelligence. Used in defence, aerospace, and space.',
  keywords: [
    'BOM management software', 'BOM management software India', 'bill of materials software',
    'BOM validation tool', 'BOM intelligence platform', 'manufacturing BOM management',
    'defence BOM software', 'aerospace BOM management', 'BOM collaboration tool',
    'ERP BOM integration', 'BOM cost analysis',
  ],
  alternates: { canonical: '/bom-management-software' },
  openGraph: {
    title: 'BOM Management Software — Emithran',
    description: 'Validate, collaborate, and cost your bills of materials with AI-powered intelligence. Built for defence, aerospace, and precision manufacturing OEMs in India.',
    url: '/bom-management-software',
    type: 'website',
  },
  twitter: {
    title: 'BOM Management Software — Emithran',
    description: 'BOM management for defence, aerospace, and precision manufacturing OEMs in India.',
  },
}

const faqs = [
  {
    q: 'What is BOM management software?',
    a: 'BOM (Bill of Materials) management software gives engineering, procurement, and supply chain teams a single system of record for every component in a product — part numbers, quantities, materials, specifications, costs, and supplier data. Emithran adds AI-powered validation, should-cost integration, and real-time collaboration on top of structured BOM data.',
  },
  {
    q: 'What file formats does BOM import support?',
    a: 'Emithran supports Excel (.xlsx, .xls), CSV, and direct ERP export formats from SAP (IDOC/CSV), Oracle, and Infor. We also accept STEP and IGES files for CAD-driven BOM extraction. If your format is not listed, contact our team — we have handled most proprietary ERP formats.',
  },
  {
    q: 'How does BOM validation work?',
    a: 'Our automated validation checks each line item against our parts database for correct part number format, specification consistency, unit of measure errors, duplicate entries, and supplier-part mismatches. Errors are flagged with severity levels and suggested corrections. Typical validation for a 500-part BOM completes in under 2 minutes.',
  },
  {
    q: 'Can multiple teams collaborate on the same BOM?',
    a: 'Yes. BOMs support multi-user collaboration with role-based permissions (viewer, editor, approver). All changes are tracked with a full audit log showing who made what change and when. You can leave comments on individual line items and assign review tasks to team members.',
  },
  {
    q: 'Does Emithran integrate with SAP or Oracle ERP?',
    a: 'Yes. Emithran integrates with SAP, Oracle, and Infor via API or pre-built data connectors. You can push BOM data from your ERP into Emithran for validation and cost analysis, and push approved BOMs back into your ERP — no re-keying required.',
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
    title: 'Import your BOM',
    body: 'Upload an Excel, CSV, or ERP export. Emithran parses and structures your BOM automatically, mapping part numbers, materials, quantities, and supplier references.',
  },
  {
    n: '02',
    title: 'Validate and enrich',
    body: 'AI validation flags errors, duplicates, and missing data in seconds. Enrich each line item with should-cost estimates, supplier intelligence, and quality scores.',
  },
  {
    n: '03',
    title: 'Collaborate and approve',
    body: 'Engineering, procurement, and quality teams work on the same BOM with role-based access. Full audit trail and approval workflows keep changes controlled.',
  },
]

const features = [
  {
    icon: '✅',
    title: 'Automated BOM Validation',
    body: 'Catch part number errors, unit of measure mismatches, duplicate entries, and specification inconsistencies in under 2 minutes for a 500-part BOM.',
  },
  {
    icon: '💰',
    title: 'Integrated Should-Cost',
    body: 'Every line item can be linked to a should-cost model. See what each component should cost to make — not just what you\'re currently paying.',
  },
  {
    icon: '👥',
    title: 'Multi-User Collaboration',
    body: 'Role-based permissions, line-item comments, task assignments, and a full change audit trail — so your entire team works on one version of truth.',
  },
  {
    icon: '🔗',
    title: 'ERP Integration',
    body: 'Two-way integration with SAP, Oracle, and Infor. Import BOMs from your ERP and push validated, costed BOMs back — with no re-keying.',
  },
  {
    icon: '📋',
    title: 'PPAP & Quality Tracking',
    body: 'Built-in PPAP tracker managing all 18 elements of a Production Part Approval Process submission — with document attachment and approval status.',
  },
  {
    icon: '📈',
    title: 'BOM Intelligence Reports',
    body: 'Cost roll-up by sub-assembly, cost driver analysis, obsolete part flagging, and supplier risk exposure — all derived from your live BOM data.',
  },
]

const comparisonRows = [
  { criterion: 'BOM validation',        emithran: 'AI-powered, < 2 min',  spreadsheets: 'Manual, error-prone',  erp: 'Rule-based only' },
  { criterion: 'Should-cost linking',   emithran: 'Native integration',    spreadsheets: 'Separate tool/manual', erp: 'Not available' },
  { criterion: 'Collaboration',         emithran: 'Real-time, role-based', spreadsheets: 'Email / shared drive', erp: 'Module-based' },
  { criterion: 'PPAP tracking',         emithran: 'Built-in, 18 elements', spreadsheets: 'Manual tracking',      erp: 'Separate QMS' },
  { criterion: 'Supplier intelligence', emithran: '2,400+ verified vendors',spreadsheets: 'None',                erp: 'Vendor master only' },
  { criterion: 'Setup time',            emithran: 'Live in 5 days',        spreadsheets: 'Immediate',            erp: '3–12 months' },
]

export default function BomManagementSoftwarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
              BOM Management Software<br className="hidden md:block" />
              <span style={{ color: '#0d9488' }}> for Precision Manufacturing</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
              Validate, cost, and collaborate on bills of materials with AI-powered intelligence. Built for India's defence, aerospace, and precision manufacturing OEMs — and the suppliers who serve them.
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
              99.4% BOM accuracy target · 2-minute validation · SAP, Oracle, Infor integration
            </p>
          </div>
        </section>

        {/* ── What is BOM management ── */}
        <section className="py-20 max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>Why BOM Management Matters</p>
              <h2 className="text-3xl font-bold tracking-tight mb-5">
                A 0.6% BOM error rate costs more than you think
              </h2>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'rgba(15,27,45,0.65)' }}>
                For a Tier-1 automotive supplier managing 50,000 active part numbers, a 0.6% error rate means 300 incorrect line items — each one a potential line-stop, re-work cost, or supplier dispute.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.65)' }}>
                Emithran's BOM Intelligence module validates every line item automatically, links each part to supplier intelligence and should-cost data, and gives your team a single version of truth — with full audit trail and approval workflows.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '99.4%',  label: 'BOM accuracy target' },
                { stat: '< 2min', label: 'Validation for 500-part BOM' },
                { stat: '18',     label: 'PPAP elements tracked' },
                { stat: '2,400+', label: 'Verified suppliers in network' },
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
              From raw BOM import to validated, costed, approved
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
            More than BOM storage — intelligence at every line item
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
                <h2 className="text-2xl font-bold mb-4">74-line BOM validated and costed for an HGV chassis assembly</h2>
                <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'rgba(15,27,45,0.65)' }}>
                  Emithran analysed a 74-line BOM for a hydrogen HGV chassis ladder frame — identifying 60 estimable lines, 42 child parts, and 8 sub-assemblies. The result was a component-level should-cost breakdown that enabled structured supplier negotiation and a 38% cost reduction on the primary chassis rails.
                </p>
                <Link
                  href="/case-studies/hgv-chassis"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold"
                  style={{ color: '#0d9488' }}
                >
                  Read the full case study →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: 'BOM line items', v: '74' },
                  { k: 'Child parts',    v: '42' },
                  { k: 'Sub-assemblies', v: '8' },
                  { k: 'Cost saving',    v: '38%' },
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
            Emithran vs spreadsheets vs ERP BOM modules
          </h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
            <table className="w-full text-[14px]">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#f8fafb' }}>
                  <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(15,27,45,0.4)' }}>Criterion</th>
                  <th className="px-5 py-4 text-center text-[12px] font-bold" style={{ color: '#0d9488', background: 'rgba(13,148,136,0.04)' }}>Emithran</th>
                  <th className="px-5 py-4 text-center text-[11px] font-semibold" style={{ color: 'rgba(15,27,45,0.5)' }}>Spreadsheets</th>
                  <th className="px-5 py-4 text-center text-[11px] font-semibold" style={{ color: 'rgba(15,27,45,0.5)' }}>ERP BOM Module</th>
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
            <h2 className="text-3xl font-bold tracking-tight mb-10">Common questions about BOM management software</h2>
            <div className="space-y-3">
              {faqs.map(f => (
                <details
                  key={f.q}
                  className="rounded-xl"
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
              See BOM Intelligence in action
            </h2>
            <p className="text-[16px] mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Book a 30-minute walkthrough with our engineering team. We'll import one of your BOMs live and show you what Emithran finds — errors, cost drivers, and supplier intelligence.
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
              Used by OEMs in defence, aerospace, and precision manufacturing across India.
            </p>
          </div>
        </section>

      </main>
    </>
  )
}
