import Link from 'next/link'

export const metadata = {
  title: 'Rear View Mirror Assembly — BOM Should Cost | Emithran Case Study',
  description: 'Full BOM should cost analysis for a rear view mirror assembly across 5 manufacturing processes — injection moulding, hot forging, cold forming, compression moulding and laser cutting.',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">{children}</p>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

const parts = [
  {
    no: 1,
    name: 'Mirror Cover',
    partNo: 'RVMSA2CP1',
    process: 'Injection Moulding',
    material: 9.19,
    process_cost: 1.30,
    overhead: 1.32,
    total: 11.81,
    matGrade: 'PP + 20% GF',
    weight: '75 g',
    tonnage: '95 Ton',
    cycleTime: '25.3 s',
    cavities: 2,
    dominantDriver: 'Material',
    driverPct: 78,
  },
  {
    no: 2,
    name: 'Mirror Arm',
    partNo: 'RVMSA1CP1',
    process: 'Hot Forging + CNC + Bending',
    material: 8.04,
    process_cost: 19.25,
    overhead: 3.03,
    total: 30.32,
    matGrade: 'Steel Grade 1080',
    weight: '112 g',
    tonnage: '10 Ton Press',
    cycleTime: '~240 s (all ops)',
    cavities: null,
    dominantDriver: 'Process',
    driverPct: 63,
  },
  {
    no: 3,
    name: 'M10 Mirror Adapter',
    partNo: 'RVMSA1CP4',
    process: 'Cold Forming + CNC Turning',
    material: 5.35,
    process_cost: 15.45,
    overhead: 2.29,
    total: 23.09,
    matGrade: 'Steel Grade 1080',
    weight: '56 g',
    tonnage: '—',
    cycleTime: '91 s (turning)',
    cavities: null,
    dominantDriver: 'Process',
    driverPct: 67,
  },
  {
    no: 4,
    name: 'Rubber Boot',
    partNo: 'RVMSA1CP2',
    process: 'Compression Moulding',
    material: 3.67,
    process_cost: 0.57,
    overhead: 0.53,
    total: 4.78,
    matGrade: 'EPDM Shore 40D',
    weight: '16 g',
    tonnage: '30 Ton',
    cycleTime: '41 s',
    cavities: 8,
    dominantDriver: 'Material',
    driverPct: 77,
  },
  {
    no: 5,
    name: 'Mirror Glass',
    partNo: 'RVMSA2CP3',
    process: 'CNC Laser Cutting',
    material: 5.62,
    process_cost: 3.54,
    overhead: 1.09,
    total: 10.25,
    matGrade: 'Silver Mirror Glass',
    weight: '54 g',
    tonnage: '—',
    cycleTime: '11.7 s',
    cavities: null,
    dominantDriver: 'Material',
    driverPct: 55,
  },
]

const totalAssembly = 80.25

export default function RearViewMirrorCaseStudy() {
  return (
    <main className="bg-[#f8fafb] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[480px] overflow-hidden">
        <img
          src="/assets/casestudy/case3.png"
          alt="Rear View Mirror Assembly"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12">
          <Link href="/#case-studies" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-colors w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>
          <h1 className="text-3xl md:text-[44px] font-bold leading-tight tracking-tight text-white max-w-[720px]">
            Rear View Mirror Assembly<br />— Full BOM Should Cost
          </h1>
          <p className="mt-3 text-[16px] text-white/65 max-w-[520px]">
            Automotive OEM · 5-part assembly · 1,50,000 units/year · India manufacturing
          </p>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-6 md:grid-cols-5 md:px-12">
          {[
            { label: 'Product',         value: 'Rear View Mirror Assy' },
            { label: 'Total Cost',      value: '₹80.25 / unit' },
            { label: 'Annual Volume',   value: '1,50,000 units' },
            { label: 'Parts Analysed',  value: '5 components' },
            { label: 'Region',          value: 'India (Ex Works)' },
          ].map(({ label, value }) => (
            <div key={label} className="py-5 md:py-6 first:pl-0 last:pr-0">
              <p className="text-[11px] uppercase tracking-widest text-[#94a3b8] font-semibold mb-1">{label}</p>
              <p className="text-[15px] font-bold text-[#0d1117]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 py-12 md:py-16 space-y-14">

        {/* ── Assembly Summary ── */}
        <section>
          <SectionLabel>Assembly Cost Breakdown</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0d1117] mb-8">5 parts · 5 processes · ₹80.25 total</h2>

          <div className="overflow-x-auto rounded-2xl border border-black/[0.07] bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#f8fafb]">
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Part</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Process</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Material (₹)</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Process (₹)</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">OH (₹)</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Total (₹)</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Share</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((p, i) => {
                  const share = ((p.total / totalAssembly) * 100).toFixed(0)
                  return (
                    <tr key={p.partNo} className={`border-b border-black/[0.04] ${i % 2 === 0 ? '' : 'bg-[#fafafa]'}`}>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#0d1117]">{p.name}</p>
                        <p className="text-[11px] text-[#94a3b8]">{p.partNo}</p>
                      </td>
                      <td className="px-5 py-4 text-[13px] text-[#334155]">{p.process}</td>
                      <td className="px-5 py-4 text-right font-mono text-[13px] text-[#334155]">{p.material.toFixed(2)}</td>
                      <td className="px-5 py-4 text-right font-mono text-[13px] text-[#334155]">{p.process_cost.toFixed(2)}</td>
                      <td className="px-5 py-4 text-right font-mono text-[13px] text-[#334155]">{p.overhead.toFixed(2)}</td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-[14px] text-[#0d1117]">₹{p.total.toFixed(2)}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="inline-block rounded-full bg-[#f0fdfa] px-2.5 py-0.5 text-[11px] font-semibold text-[#0d9488]">{share}%</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-[#f0fdfa]">
                  <td colSpan={5} className="px-5 py-4 font-bold text-[#0d1117]">Total Assembly Cost</td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-[15px] text-[#0d9488]">₹{totalAssembly.toFixed(2)}</td>
                  <td className="px-5 py-4 text-right font-bold text-[#0d9488]">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* ── Cost driver bars per part ── */}
        <section>
          <SectionLabel>Cost Driver — Per Part</SectionLabel>
          <h2 className="text-2xl font-bold text-[#0d1117] mb-8">Material vs Process vs Overhead</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {parts.map((p) => {
              const matPct  = (p.material      / p.total) * 100
              const procPct = (p.process_cost  / p.total) * 100
              const ohPct   = (p.overhead      / p.total) * 100
              return (
                <Card key={p.partNo}>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-[#0d1117]">{p.name}</p>
                      <p className="text-[12px] text-[#94a3b8]">{p.process}</p>
                    </div>
                    <p className="shrink-0 text-[18px] font-bold text-[#0d9488]">₹{p.total.toFixed(2)}</p>
                  </div>

                  {/* Stacked bar */}
                  <div className="mb-3 flex h-3 w-full overflow-hidden rounded-full">
                    <div style={{ width: `${matPct}%`, background: '#2dd4bf' }} className="transition-all" />
                    <div style={{ width: `${procPct}%`, background: '#0f766e' }} className="transition-all" />
                    <div style={{ width: `${ohPct}%`, background: '#ccfbf1' }} className="transition-all" />
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2dd4bf]" />Material {matPct.toFixed(0)}%</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#0f766e]" />Process {procPct.toFixed(0)}%</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#ccfbf1] border border-[#99f6e4]" />OH {ohPct.toFixed(0)}%</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-medium text-[#475569]">{p.matGrade}</span>
                    <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-medium text-[#475569]">{p.weight}</span>
                    {p.cavities && <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-medium text-[#475569]">{p.cavities} cavities</span>}
                    <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-medium text-[#475569]">CT {p.cycleTime}</span>
                  </div>
                </Card>
              )
            })}

            {/* Summary insight card */}
            <Card className="lg:col-span-1 flex flex-col justify-between" >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-3">Key Insight</p>
                <p className="text-[15px] font-bold text-[#0d1117] mb-2">Process cost dominates metal parts; material dominates moulded parts</p>
                <p className="text-[13px] text-[#64748b] leading-relaxed">
                  The Mirror Arm and Adapter together account for ₹53.41 — 67% of total assembly cost — driven by multi-step machining, induction heating, and heat treatment. Plastic and rubber components are material-cost-led at 77–78%.
                </p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f0fdfa] p-3 text-center">
                  <p className="text-[20px] font-bold text-[#0d9488]">67%</p>
                  <p className="text-[11px] text-[#0d9488]">Metal parts share</p>
                </div>
                <div className="rounded-xl bg-[#f8fafc] p-3 text-center">
                  <p className="text-[20px] font-bold text-[#334155]">₹80.25</p>
                  <p className="text-[11px] text-[#64748b]">Assembly total</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* ── Part deep-dives ── */}
        <section>
          <SectionLabel>Part-Level Process Deep Dive</SectionLabel>
          <h2 className="text-2xl font-bold text-[#0d1117] mb-8">Manufacturing process intelligence per component</h2>

          <div className="space-y-6">

            {/* Mirror Arm — most complex */}
            <Card>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">Most Complex Component</p>
                  <h3 className="text-[18px] font-bold text-[#0d1117]">Mirror Arm — 9 Manufacturing Operations</h3>
                  <p className="text-[13px] text-[#64748b] mt-1">Hot forging · CNC turning · Thread rolling · Bending · Age hardening · Phosphating · Powder coating</p>
                </div>
                <p className="text-[22px] font-bold text-[#0d9488]">₹30.32</p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 mb-5">
                {[
                  { op: 'XRF Analysis',    cost: '₹0.005', type: 'QC' },
                  { op: 'Bandsaw Cutting', cost: '₹0.32',  type: 'Cutting' },
                  { op: 'Induction Heating', cost: '₹5.43', type: 'Heating' },
                  { op: 'Hot Forging',     cost: '₹3.48',  type: 'Forming' },
                  { op: 'CNC Turning',     cost: '₹5.45',  type: 'Machining' },
                  { op: 'Bending',         cost: '₹0.65',  type: 'Forming' },
                  { op: 'Age Hardening',   cost: '₹2.61',  type: 'HT' },
                  { op: 'Phosphating',     cost: '₹0.52',  type: 'Finish' },
                  { op: 'Powder Coating',  cost: '₹0.79',  type: 'Finish' },
                ].map(({ op, cost, type }) => (
                  <div key={op} className="rounded-xl bg-[#f8fafb] border border-black/[0.05] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">{type}</p>
                    <p className="text-[12px] font-semibold text-[#334155]">{op}</p>
                    <p className="text-[14px] font-bold text-[#0d1117] mt-1">{cost}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-[#f0fdfa] p-4 text-[13px] text-[#0f766e]">
                <span className="font-bold">Key insight:</span> Induction heating (₹5.43) and CNC machining (₹5.45) together account for 57% of the Mirror Arm&apos;s process cost. Forging die tooling across 5-year programme: ₹22.5L.
              </div>
            </Card>

            {/* M10 Adapter */}
            <Card>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">Precision Turned Component</p>
                  <h3 className="text-[18px] font-bold text-[#0d1117]">M10 Mirror Adapter — Cold Forming + 5-Operation CNC</h3>
                  <p className="text-[13px] text-[#64748b] mt-1">Wire cold heading · Zone annealing · Turning · Grooving · Threading · Drilling · Tapping · Black oxide</p>
                </div>
                <p className="text-[22px] font-bold text-[#0d9488]">₹23.09</p>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/[0.06]">
                      <th className="py-2 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">CNC Operation</th>
                      <th className="py-2 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Details</th>
                      <th className="py-2 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Time (s)</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {[
                      ['Turning',   'Ø13.65 → 10.00, L=14 mm, 35 m/min', '17.86'],
                      ['Grooving',  'Ø13.65 → 13.15, L=1 mm',            '0.81'],
                      ['Threading', 'Ø10.00 → 8.50, L=13.7 mm, 20 m/min','19.05'],
                      ['Drilling',  'Ø8.50, Depth 30 mm, 35 m/min',       '14.13'],
                      ['Tapping',   'M10, Depth 30 mm, 25 m/min',         '18.99'],
                    ].map(([op, details, time]) => (
                      <tr key={op} className="border-b border-black/[0.04]">
                        <td className="py-2.5 font-semibold text-[#0d1117]">{op}</td>
                        <td className="py-2.5 text-[#64748b]">{details}</td>
                        <td className="py-2.5 text-right font-mono text-[#334155]">{time}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#f0fdfa]">
                      <td className="py-2.5 font-bold text-[#0d1117]" colSpan={2}>Total Cycle Time</td>
                      <td className="py-2.5 text-right font-mono font-bold text-[#0d9488]">90.84</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl bg-[#f0fdfa] p-4 text-[13px] text-[#0f766e]">
                <span className="font-bold">Key insight:</span> 68% material utilisation from wire coil — 32% becomes scrap. Black oxide finish adds ₹1.56 per part on 12,114 mm² surface area.
              </div>
            </Card>

            {/* Mirror Cover */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Card>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">Injection Moulded</p>
                <h3 className="text-[16px] font-bold text-[#0d1117] mb-1">Mirror Cover</h3>
                <p className="text-[13px] text-[#64748b] mb-4">PP+20% GF · 95 Ton · 2 cavities · 25.3 s cycle</p>
                <div className="space-y-2 text-[13px]">
                  {[
                    { label: 'Shot weight',        val: '150 g (75 g/part)' },
                    { label: 'Runner weight',       val: '4 g (cold runner)' },
                    { label: 'Cooling time',        val: '1.64 s' },
                    { label: 'Machine cost',        val: '₹0.42/part' },
                    { label: 'Yield cost (5% rej)', val: '₹0.39/part' },
                    { label: 'Mould cost',          val: '₹12.71L (H13 cavity)' },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                      <span className="text-[#64748b]">{label}</span>
                      <span className="font-semibold text-[#0d1117]">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-[#f0fdfa] p-3 text-[12px] text-[#0d9488] font-semibold">
                  Material cost = 78% of total — RM is the primary lever
                </div>
              </Card>

              <Card>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">Compression Moulded + Laser Cut</p>
                <h3 className="text-[16px] font-bold text-[#0d1117] mb-1">Rubber Boot + Mirror Glass</h3>
                <p className="text-[13px] text-[#64748b] mb-4">EPDM Shore 40D · Silver mirror glass · India</p>
                <div className="space-y-3">
                  <div className="rounded-xl border border-black/[0.06] p-3">
                    <p className="text-[12px] font-bold text-[#0d1117] mb-2">Rubber Boot — ₹4.78</p>
                    <div className="space-y-1 text-[12px]">
                      {[
                        { label: '8 cavities / shot', val: '30 Ton press' },
                        { label: 'Cycle time', val: '41 s' },
                        { label: 'Yield', val: '95%' },
                        { label: 'RM cost', val: '₹3.67 (77%)' },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-[#94a3b8]">{label}</span>
                          <span className="font-semibold text-[#334155]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-black/[0.06] p-3">
                    <p className="text-[12px] font-bold text-[#0d1117] mb-2">Mirror Glass — ₹10.25</p>
                    <div className="space-y-1 text-[12px]">
                      {[
                        { label: '196 parts/sheet', val: '72% utilisation' },
                        { label: 'Cutting length', val: '524 mm' },
                        { label: 'Laser speed', val: '3 m/min' },
                        { label: 'Cycle time', val: '11.7 s' },
                      ].map(({ label, val }) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-[#94a3b8]">{label}</span>
                          <span className="font-semibold text-[#334155]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ── Process diversity ── */}
        <section>
          <SectionLabel>Process Coverage</SectionLabel>
          <h2 className="text-2xl font-bold text-[#0d1117] mb-8">5 distinct manufacturing technologies in one assembly</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {[
              { process: 'Injection Moulding', part: 'Mirror Cover', icon: '⬡', highlight: 'PP+20% GF, 2-cavity cold runner, H13 tool' },
              { process: 'Hot Forging + CNC',  part: 'Mirror Arm',   icon: '⚒', highlight: '9 operations, induction heating, thread rolling' },
              { process: 'Cold Forming + CNC', part: 'M10 Adapter',  icon: '⚙', highlight: 'Wire heading, 5-op CNC, black oxide finish' },
              { process: 'Compression Moulding', part: 'Rubber Boot', icon: '◎', highlight: 'EPDM, 8-cavity, 41 s cycle, 30 Ton press' },
              { process: 'Laser Cutting',      part: 'Mirror Glass',  icon: '◈', highlight: 'Silver glass, 3 m/min, 196 parts/sheet' },
            ].map(({ process, part, icon, highlight }) => (
              <div key={process} className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm">
                <div className="mb-3 text-[28px]">{icon}</div>
                <p className="font-bold text-[#0d1117] text-[14px] mb-0.5">{process}</p>
                <p className="text-[11px] text-[#2dd4bf] font-semibold mb-2">{part}</p>
                <p className="text-[12px] text-[#64748b] leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Value additions ── */}
        <section className="rounded-2xl bg-[#0d1117] p-8 md:p-10">
          <SectionLabel>Emithran Analysis</SectionLabel>
          <h2 className="text-2xl font-bold text-white mb-6">What this should cost report enables</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: 'Process-Level Cost Visibility',
                body: 'Every operation — heating, forging, machining, plating — broken down to ₹/part. No supplier black-box pricing.',
              },
              {
                title: 'Material Grade Validation',
                body: 'PP+20%GF, EPDM Shore 40D, Silver Mirror Glass — density, price, scrap recovery and utilisation modelled for each grade.',
              },
              {
                title: 'Tooling ROI Clarity',
                body: '₹12.71L injection mould, ₹29.87L forging tooling programme — amortised against 5-year volume and shot life for accurate piece-price impact.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-white/10 p-5">
                <p className="font-bold text-white mb-2">{title}</p>
                <p className="text-[13px] text-white/55 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="text-center pt-4">
          <p className="text-[15px] text-[#64748b] mb-5">Want this level of should cost intelligence for your assembly?</p>
          <Link
            href="/contact?source=case-study-rear-view-mirror&cta=request-should-cost"
            className="inline-block rounded-full bg-[#0d1117] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-black transition-colors"
          >
            Request a Should Cost Analysis
          </Link>
        </div>

      </div>
    </main>
  )
}
