import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'

const modules = [
  { n: '01', title: 'ENGINEERING DATA',      desc: 'CAD, drawings, BOM structures, materials, tolerances. The single source of truth.' },
  { n: '02', title: 'COSTING ENGINE',        desc: 'Should-cost models with machine hour rates, tooling, scrap, packaging, logistics.' },
  { n: '03', title: 'PROCESS PLANNING',      desc: 'Manufacturing routes, raw material plans, operations, packaging and tooling assumptions.' },
  { n: '04', title: 'SUPPLIER INTELLIGENCE', desc: 'Capability mapping, RFQ analysis, quote comparison, weighted vendor nomination.' },
  { n: '05', title: 'PRODUCTION CONTROL',    desc: 'Lots, vendor assignments, route adherence, live programme status.' },
  { n: '06', title: 'QUALITY & COMPLIANCE',  desc: 'ISIR, FIA, PPAP workflows. Inspection records connected to parts and suppliers.' },
  { n: '07', title: 'DELIVERY MANAGEMENT',   desc: 'Packing, logistics, dispatch tracking, delivery confirmation.' },
  { n: '08', title: 'NATURAL LANGUAGE OPS',  desc: 'Ask questions in plain English. Get answers from your live manufacturing data.' },
]

const architecture = [
  { title: 'ON-PREMISE',    desc: 'Deployable inside your network. Air-gapped supported. Zero cloud dependency.' },
  { title: 'MOD-COMPLIANT', desc: 'Architecture designed for defence-grade data sovereignty and compliance.' },
  { title: 'INTEGRATIONS',  desc: 'Native connectors to leading PLM, ERP and engineering systems used in Indian OEMs.' },
  { title: 'EXTENSIBLE',    desc: 'Custom workflows, role-based access, programme-level configuration.' },
]

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="THE PLATFORM"
        title="One platform. Every manufacturing record."
        subtitle="Eight modules, one connected operating layer. Engineering data flows into costing, sourcing, production, quality and delivery — in one continuous record."
      />

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>EIGHT CORE MODULES</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-tight max-w-3xl mb-16">
            Built as a platform, not a stitched-together suite.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => (
              <div key={i} className="border border-border p-7 -ml-px -mt-px hover:bg-grey-600 transition-colors">
                <p className="font-mono text-[11px] text-grey-300 tracking-widest mb-3">{m.n}</p>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white mb-3 leading-tight">{m.title}</p>
                <p className="font-mono text-[12px] text-grey-200 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 lg:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>ARCHITECTURE</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-tight max-w-3xl mb-16">
            Defence-grade data sovereignty. Built for India.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 border border-border">
            {architecture.map((a, i) => (
              <div key={i} className="p-8 border-b lg:border-b-0 lg:border-r border-border last:border-r-0">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white mb-3">{a.title}</p>
                <p className="font-mono text-[13px] text-grey-200 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>DEPLOYMENT</SectionLabel>
          <h2 className="font-display text-white text-[32px] lg:text-[44px] leading-tight max-w-3xl mb-10">
            From kick-off to a live programme in 4–8 weeks.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              ['WEEK 1–2', 'Discovery, integrations, programme scoping'],
              ['WEEK 3–4', 'Engineering data ingestion, cost model setup'],
              ['WEEK 5–6', 'Supplier onboarding, process plan calibration'],
              ['WEEK 7–8', 'Live programme rollout, team training'],
            ].map((p, i) => (
              <div key={i} className="bg-[#080808] p-6">
                <p className="font-mono text-[10px] text-grey-300 tracking-widest mb-3">{p[0]}</p>
                <p className="font-mono text-[12px] text-grey-200 leading-relaxed">{p[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA title="Ready to evaluate the platform?" />
    </>
  )
}
