import CaseStudyShell, {
  SectionLabel, Card, DarkCard,
} from '@/components/case-studies/CaseStudyShell'

export const metadata = {
  title: 'Rear View Mirror BOM Should-Cost | Emithran',
  description: 'Full BOM should cost analysis for a rear view mirror assembly across 5 manufacturing processes - injection moulding, hot forging, cold forming, compression moulding and laser cutting.',
  alternates: { canonical: '/case-studies/rear-view-mirror' },
}

const parts = [
  {
    no: 1, name: 'Mirror Cover',    partNo: 'RVMSA2CP1',
    process: 'Injection Moulding',
    material: 0.1094, process_cost: 0.0155, overhead: 0.0157, total: 0.1406,
    matGrade: 'PP + 20% GF', weight: '75 g', tonnage: '95 Ton', cycleTime: '25.3 s', cavities: 2,
    dominantDriver: 'Material', driverPct: 78,
  },
  {
    no: 2, name: 'Mirror Arm',      partNo: 'RVMSA1CP1',
    process: 'Hot Forging + CNC + Bending',
    material: 0.0957, process_cost: 0.2292, overhead: 0.0361, total: 0.3610,
    matGrade: 'Steel Grade 1080', weight: '112 g', tonnage: '10 Ton Press', cycleTime: '~240 s (all ops)', cavities: null,
    dominantDriver: 'Process', driverPct: 63,
  },
  {
    no: 3, name: 'M10 Mirror Adapter', partNo: 'RVMSA1CP4',
    process: 'Cold Forming + CNC Turning',
    material: 0.0637, process_cost: 0.1839, overhead: 0.0273, total: 0.2749,
    matGrade: 'Steel Grade 1080', weight: '56 g', tonnage: '-', cycleTime: '91 s (turning)', cavities: null,
    dominantDriver: 'Process', driverPct: 67,
  },
  {
    no: 4, name: 'Rubber Boot',      partNo: 'RVMSA1CP2',
    process: 'Compression Moulding',
    material: 0.0437, process_cost: 0.0068, overhead: 0.0063, total: 0.0569,
    matGrade: 'EPDM Shore 40D', weight: '16 g', tonnage: '30 Ton', cycleTime: '41 s', cavities: 8,
    dominantDriver: 'Material', driverPct: 77,
  },
  {
    no: 5, name: 'Mirror Glass',     partNo: 'RVMSA2CP3',
    process: 'CNC Laser Cutting',
    material: 0.0669, process_cost: 0.0421, overhead: 0.0130, total: 0.1220,
    matGrade: 'Silver Mirror Glass', weight: '54 g', tonnage: '-', cycleTime: '11.7 s', cavities: null,
    dominantDriver: 'Material', driverPct: 55,
  },
]

const totalAssembly = 0.96

export default function RearViewMirrorCaseStudy() {
  return (
    <CaseStudyShell
      slug="rear-view-mirror"
      industry="Automotive"
      date="February 15, 2026"
      readTime="6 min read"
      metric="5 processes · $0.96 total"
      title={<>Rear View Mirror Assembly<br className="hidden md:block" /> Full BOM Should Cost</>}
      subtitle="Automotive OEM · 5-part assembly · 1,50,000 units/year · India manufacturing"
      image="/assets/casestudy/case3.png"
      imageAlt="Rear View Mirror Assembly"
      stats={[
        { label: 'Product',       value: 'Rear View Mirror Assy' },
        { label: 'Total Cost',    value: '$0.96 / unit' },
        { label: 'Annual Volume', value: '1,50,000 units' },
        { label: 'Parts Analysed',value: '5 components' },
        { label: 'Region',        value: 'India (Ex Works)' },
      ]}
      ctaTitle="Want this level of should cost intelligence for your assembly?"
      ctaBody="Emithran models every operation - material, process, overhead - giving you the cost data to negotiate, design, and source smarter."
      ctaSource="case-study-rear-view-mirror"
    >

      {/* Row 1 - Assembly Summary Table */}
      <div>
        <SectionLabel>Assembly Cost Breakdown</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">5 parts · 5 processes · $0.96 total</h2>
        <div className="overflow-x-auto rounded-2xl border border-black/[0.07] bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.06] bg-[#f8fafb]">
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Part</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Process</th>
                <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Material ($)</th>
                <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Process ($)</th>
                <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">OH ($)</th>
                <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Total ($)</th>
                <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Share</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p, i) => {
                const share = ((p.total / totalAssembly) * 100).toFixed(0)
                return (
                  <tr key={p.partNo} className={`border-b border-black/[0.04] ${i % 2 !== 0 ? 'bg-[#fafafa]' : ''}`}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#0f1b2d]">{p.name}</p>
                      <p className="text-[11px] text-[#94a3b8]">{p.partNo}</p>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#334155]">{p.process}</td>
                    <td className="px-5 py-4 text-right font-mono text-[13px] text-[#334155]">{p.material.toFixed(2)}</td>
                    <td className="px-5 py-4 text-right font-mono text-[13px] text-[#334155]">{p.process_cost.toFixed(2)}</td>
                    <td className="px-5 py-4 text-right font-mono text-[13px] text-[#334155]">{p.overhead.toFixed(2)}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-[14px] text-[#0f1b2d]">${p.total.toFixed(2)}</td>
                    <td className="px-5 py-4 text-right">
                      <span className="inline-block rounded-full bg-[#f0fdfa] px-2.5 py-0.5 text-[11px] font-semibold text-[#0d9488]">{share}%</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#f0fdfa]">
                <td colSpan={5} className="px-5 py-4 font-bold text-[#0f1b2d]">Total Assembly Cost</td>
                <td className="px-5 py-4 text-right font-mono font-bold text-[15px] text-[#0d9488]">${totalAssembly.toFixed(2)}</td>
                <td className="px-5 py-4 text-right font-bold text-[#0d9488]">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Row 2 - Cost driver bars per part */}
      <div>
        <SectionLabel>Cost Driver - Per Part</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Material vs Process vs Overhead</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {parts.map((p) => {
            const matPct  = (p.material      / p.total) * 100
            const procPct = (p.process_cost  / p.total) * 100
            const ohPct   = (p.overhead      / p.total) * 100
            return (
              <Card key={p.partNo}>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-[#0f1b2d]">{p.name}</p>
                    <p className="text-[12px] text-[#94a3b8]">{p.process}</p>
                  </div>
                  <p className="shrink-0 text-[18px] font-bold text-[#0d9488]">${p.total.toFixed(2)}</p>
                </div>
                <div className="mb-3 flex h-3 w-full overflow-hidden rounded-full">
                  <div style={{ width: `${matPct}%`,  background: '#0d9488' }} />
                  <div style={{ width: `${procPct}%`, background: '#0f766e' }} />
                  <div style={{ width: `${ohPct}%`,   background: '#ccfbf1' }} />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#0d9488]" />Material {matPct.toFixed(0)}%</span>
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

          <Card className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-3">Key Insight</p>
              <p className="text-[15px] font-bold text-[#0f1b2d] mb-2">Process cost dominates metal parts; material dominates moulded parts</p>
              <p className="text-[13px] text-[#64748b] leading-relaxed">
                The Mirror Arm and Adapter together account for $0.64 - 67% of total assembly cost - driven by multi-step machining, induction heating, and heat treatment. Plastic and rubber components are material-cost-led at 77–78%.
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f0fdfa] p-3 text-center">
                <p className="text-[20px] font-bold text-[#0d9488]">67%</p>
                <p className="text-[11px] text-[#0d9488]">Metal parts share</p>
              </div>
              <div className="rounded-xl bg-[#f8fafc] p-3 text-center">
                <p className="text-[20px] font-bold text-[#334155]">$0.96</p>
                <p className="text-[11px] text-[#64748b]">Assembly total</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 3 - Part deep-dives */}
      <div>
        <SectionLabel>Part-Level Process Deep Dive</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Manufacturing process intelligence per component</h2>
        <div className="space-y-6">

          {/* Mirror Arm */}
          <Card accent>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-1">Most Complex Component</p>
                <h3 className="text-[18px] font-bold text-[#0f1b2d]">Mirror Arm - 9 Manufacturing Operations</h3>
                <p className="text-[13px] text-[#64748b] mt-1">Hot forging · CNC turning · Thread rolling · Bending · Age hardening · Phosphating · Powder coating</p>
              </div>
              <p className="text-[22px] font-bold text-[#0d9488]">$0.36</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 mb-5">
              {[
                { op: 'XRF Analysis',     cost: '$0.005', type: 'QC' },
                { op: 'Bandsaw Cutting',  cost: '$0.004', type: 'Cutting' },
                { op: 'Induction Heating',cost: '$0.065', type: 'Heating' },
                { op: 'Hot Forging',      cost: '$0.042', type: 'Forming' },
                { op: 'CNC Turning',      cost: '$0.066', type: 'Machining' },
                { op: 'Bending',          cost: '$0.008', type: 'Forming' },
                { op: 'Age Hardening',    cost: '$0.031', type: 'HT' },
                { op: 'Phosphating',      cost: '$0.006', type: 'Finish' },
                { op: 'Powder Coating',   cost: '$0.010', type: 'Finish' },
              ].map(({ op, cost, type }) => (
                <div key={op} className="rounded-xl bg-[#f8fafb] border border-black/[0.05] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">{type}</p>
                  <p className="text-[12px] font-semibold text-[#334155]">{op}</p>
                  <p className="text-[14px] font-bold text-[#0f1b2d] mt-1">{cost}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-[#f0fdfa] p-4 text-[13px] text-[#0d9488]">
              <span className="font-bold">Key insight:</span> Induction heating ($0.065) and CNC machining ($0.065) together account for 57% of the Mirror Arm&apos;s process cost. Forging die tooling across 5-year programme: ~$26,800.
            </div>
          </Card>

          {/* M10 Adapter */}
          <Card accent>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-1">Precision Turned Component</p>
                <h3 className="text-[18px] font-bold text-[#0f1b2d]">M10 Mirror Adapter - Cold Forming + 5-Operation CNC</h3>
                <p className="text-[13px] text-[#64748b] mt-1">Wire cold heading · Zone annealing · Turning · Grooving · Threading · Drilling · Tapping · Black oxide</p>
              </div>
              <p className="text-[22px] font-bold text-[#0d9488]">$0.27</p>
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
                      <td className="py-2.5 font-semibold text-[#0f1b2d]">{op}</td>
                      <td className="py-2.5 text-[#64748b]">{details}</td>
                      <td className="py-2.5 text-right font-mono text-[#334155]">{time}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#f0fdfa]">
                    <td className="py-2.5 font-bold text-[#0f1b2d]" colSpan={2}>Total Cycle Time</td>
                    <td className="py-2.5 text-right font-mono font-bold text-[#0d9488]">90.84</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-[#f0fdfa] p-4 text-[13px] text-[#0d9488]">
              <span className="font-bold">Key insight:</span> 68% material utilisation from wire coil - 32% becomes scrap. Black oxide finish adds $0.019 per part on 12,114 mm² surface area.
            </div>
          </Card>

          {/* Mirror Cover + Rubber Boot + Mirror Glass */}
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-1">Injection Moulded</p>
              <h3 className="text-[16px] font-bold text-[#0f1b2d] mb-1">Mirror Cover</h3>
              <p className="text-[13px] text-[#64748b] mb-4">PP+20% GF · 95 Ton · 2 cavities · 25.3 s cycle</p>
              <div className="space-y-2 text-[13px]">
                {[
                  { label: 'Shot weight',        val: '150 g (75 g/part)' },
                  { label: 'Runner weight',       val: '4 g (cold runner)' },
                  { label: 'Cooling time',        val: '1.64 s' },
                  { label: 'Machine cost',        val: '$0.005/part' },
                  { label: 'Yield cost (5% rej)', val: '$0.005/part' },
                  { label: 'Mould cost',          val: '~$15,100 (H13 cavity)' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                    <span className="text-[#64748b]">{label}</span>
                    <span className="font-semibold text-[#0f1b2d]">{val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-[#f0fdfa] p-3 text-[12px] font-semibold text-[#0d9488]">
                Material cost = 78% of total - RM is the primary lever
              </div>
            </Card>

            <Card>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-1">Compression Moulded + Laser Cut</p>
              <h3 className="text-[16px] font-bold text-[#0f1b2d] mb-1">Rubber Boot + Mirror Glass</h3>
              <p className="text-[13px] text-[#64748b] mb-4">EPDM Shore 40D · Silver mirror glass · India</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-black/[0.06] p-3">
                  <p className="text-[12px] font-bold text-[#0f1b2d] mb-2">Rubber Boot - $0.058</p>
                  <div className="space-y-1 text-[12px]">
                    {[
                      { label: '8 cavities / shot', val: '30 Ton press' },
                      { label: 'Cycle time',         val: '41 s' },
                      { label: 'Yield',              val: '95%' },
                      { label: 'RM cost',            val: '$0.044 (77%)' },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-[#94a3b8]">{label}</span>
                        <span className="font-semibold text-[#334155]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-black/[0.06] p-3">
                  <p className="text-[12px] font-bold text-[#0f1b2d] mb-2">Mirror Glass - $0.12</p>
                  <div className="space-y-1 text-[12px]">
                    {[
                      { label: '196 parts/sheet', val: '72% utilisation' },
                      { label: 'Cutting length',  val: '524 mm' },
                      { label: 'Laser speed',     val: '3 m/min' },
                      { label: 'Cycle time',      val: '11.7 s' },
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
      </div>

      {/* Row 4 - Process Coverage */}
      <div>
        <SectionLabel>Process Coverage</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">5 distinct manufacturing technologies in one assembly</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {[
            { process: 'Injection Moulding',    part: 'Mirror Cover',  highlight: 'PP+20% GF, 2-cavity cold runner, H13 tool' },
            { process: 'Hot Forging + CNC',     part: 'Mirror Arm',    highlight: '9 operations, induction heating, thread rolling' },
            { process: 'Cold Forming + CNC',    part: 'M10 Adapter',   highlight: 'Wire heading, 5-op CNC, black oxide finish' },
            { process: 'Compression Moulding',  part: 'Rubber Boot',   highlight: 'EPDM, 8-cavity, 41 s cycle, 30 Ton press' },
            { process: 'Laser Cutting',         part: 'Mirror Glass',  highlight: 'Silver glass, 3 m/min, 196 parts/sheet' },
          ].map(({ process, part, highlight }) => (
            <div key={process} className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm">
              <p className="font-bold text-[#0f1b2d] text-[14px] mb-0.5">{process}</p>
              <p className="text-[11px] text-[#0d9488] font-semibold mb-2">{part}</p>
              <p className="text-[12px] text-[#64748b] leading-relaxed">{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Row 5 - Value additions */}
      <DarkCard>
        <SectionLabel>Emithran Analysis</SectionLabel>
        <h2 className="mb-6 text-[22px] font-bold text-white">What this should cost report enables</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Process-Level Cost Visibility',
              body: 'Every operation - heating, forging, machining, plating - broken down to $/part. No supplier black-box pricing.',
            },
            {
              title: 'Material Grade Validation',
              body: 'PP+20%GF, EPDM Shore 40D, Silver Mirror Glass - density, price, scrap recovery and utilisation modelled for each grade.',
            },
            {
              title: 'Tooling ROI Clarity',
              body: '~$15,100 injection mould, ~$35,600 forging tooling programme - amortised against 5-year volume and shot life for accurate piece-price impact.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-xl border border-white/10 p-5">
              <p className="font-bold text-white mb-2">{title}</p>
              <p className="text-[13px] text-white/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </DarkCard>

    </CaseStudyShell>
  )
}
