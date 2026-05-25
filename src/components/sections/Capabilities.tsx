import { Cpu, DollarSign, Network, Factory, ShieldCheck, BarChart2 } from 'lucide-react'

const caps = [
  {
    icon: Cpu,
    name: 'CAD to Cost',
    desc: 'Upload drawings and BOMs to get instant manufacturability feedback and part-level cost estimates before sourcing begins.',
    c: 'from-sky-100 to-indigo-100',
  },
  {
    icon: DollarSign,
    name: 'Should Cost Analysis',
    desc: 'Build traceable should-cost models using raw material, machine hours, tooling, scrap, and logistics — the baseline for every negotiation.',
    c: 'from-green-100 to-emerald-100',
  },
  {
    icon: Network,
    name: 'Supplier Intelligence',
    desc: 'Evaluate vendors on cost, capability, and OTIF. Compare live quotes against your internal cost model and nominate with confidence.',
    c: 'from-amber-100 to-orange-100',
  },
  {
    icon: Factory,
    name: 'Production Tracking',
    desc: 'Manage production lots, process plans, and manufacturing routes across multiple tiers and supplier sites — live.',
    c: 'from-violet-100 to-fuchsia-100',
  },
  {
    icon: ShieldCheck,
    name: 'Quality & PPAP',
    desc: 'Connect CMM, inspection, and PPAP workflows to the same manufacturing record for end-to-end traceability and compliance.',
    c: 'from-cyan-100 to-sky-100',
  },
  {
    icon: BarChart2,
    name: 'Analytics & BI',
    desc: 'Live dashboards for programme cost, supplier performance, and delivery risk across every active project and BOM.',
    c: 'from-rose-100 to-pink-100',
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chip-light mb-4">Platform Capabilities</p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-[#062535] md:text-5xl">
              One platform for every step of the build.
            </h2>
          </div>
          <p className="max-w-md text-[#062535]/55 md:text-right">
            From a single CAD upload to delivered units — every stage shares the same data model,
            the same dashboards, and the same accountability chain.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <article
              key={c.name}
              className="group relative overflow-hidden rounded-2xl border border-black/6 bg-[#f8fafb] p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute inset-x-0 -top-24 h-48 bg-gradient-to-br ${c.c} opacity-60 blur-2xl transition group-hover:opacity-90`}
              />
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#080808] text-white">
                  <c.icon size={18} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#062535]">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#062535]/60">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#080808]/60">
                  Learn more →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
