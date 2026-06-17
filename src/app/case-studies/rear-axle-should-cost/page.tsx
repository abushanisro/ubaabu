import CaseStudyShell, {
  SectionLabel, Card, DarkCard,
} from '@/components/case-studies/CaseStudyShell'

export const metadata = {
  alternates: { canonical: '/case-studies/rear-axle-should-cost' },
  title: '2T LCV Rear Drive Axle - Should Cost Analysis | Emithran Case Study',
  description: 'Full assembly should cost for a 2-tonne LCV rear drive axle - 51.2 kg, 40,000 units/year, India manufacturing. Drive Head / Carrier at 46% is the primary cost driver.',
}

const subAssemblies = [
  { name: 'Drive Head / Carrier Assy.', cost: 111.99, pct: 46, color: '#0d9488' },
  { name: 'Axle Housing',               cost:  48.40, pct: 20, color: '#2dd4bf' },
  { name: 'Half Shaft RH',              cost:  30.31, pct: 12, color: '#5eead4' },
  { name: 'Half Shaft LH',              cost:  30.31, pct: 12, color: '#99f6e4' },
  { name: 'Top-level Assembly & HW',    cost:  11.44, pct:  5, color: '#94a3b8' },
]

const driveHeadItems = [
  { name: 'Carrier Housing',         cost: 18.42, pct: 16, type: 'Casting & M/C' },
  { name: 'Bearing LM603049 (Ã—2)',   cost: 18.17, pct: 16, type: 'BOI' },
  { name: 'Ring Gear',               cost: 11.44, pct: 10, type: 'Forged & M/C' },
  { name: 'Drive Head Assy.',        cost: 10.83, pct: 10, type: 'Assembly' },
  { name: 'Bearing - Pinion Head',   cost:  9.21, pct:  8, type: 'BOI' },
  { name: 'Pinion Shaft Main Drive', cost:  7.49, pct:  7, type: 'Forged & M/C' },
  { name: 'Bearing - Pinion Tail',   cost:  5.60, pct:  5, type: 'BOI' },
  { name: 'Diff Cage Assy.',         cost:  4.68, pct:  4, type: 'Assembly' },
  { name: 'Cage - Diff Gears',       cost:  5.41, pct:  5, type: 'Casting & M/C' },
  { name: 'Side Gear 24T (Ã—2)',      cost:  4.52, pct:  4, type: 'Forged & M/C' },
  { name: 'Other (caps, HW, seals)', cost:  4.54, pct:  4, type: 'Various' },
]

const housingItems = [
  { name: 'Housing Formed Half (Ã—2)', cost: 22.17, pct: 47, type: 'Formed' },
  { name: 'End Flange (Ã—2)',          cost: 11.77, pct: 25, type: 'Casting & M/C' },
  { name: 'Axle Housing Assembly',    cost:  6.40, pct: 14, type: 'Assembly' },
  { name: 'Rear Cover',               cost:  2.51, pct:  5, type: 'Formed' },
  { name: 'Other (brackets, HW)',     cost:  3.42, pct:  7, type: 'Various' },
]

const halfShaftItems = [
  { name: 'Axle Half Shaft',          cost: 14.58, pct: 48, type: 'Forged & M/C' },
  { name: 'Taper Roller Bearing Set', cost:  7.39, pct: 24, type: 'BOI' },
  { name: 'Half Shaft Assembly',      cost:  3.25, pct: 11, type: 'Assembly' },
  { name: 'Bearing Housing',          cost:  1.94, pct:  6, type: 'Casting & M/C' },
  { name: 'Axle Shaft Assy.',         cost:  1.74, pct:  6, type: 'Assembly' },
  { name: 'Hardware & Seals',         cost:  1.15, pct:  4, type: 'Hardware / BOI' },
]

export default function RearAxleCaseStudy() {
  return (
    <CaseStudyShell
      slug="rear-axle-should-cost"
      industry="Automotive"
      date="March 22, 2026"
      readTime="7 min read"
      metric="$244 / unit LCV axle"
      title={<>2T LCV Rear Drive Axle<br className="hidden md:block" /> Should Cost Analysis</>}
      subtitle="Light commercial vehicle OEM Â· 51.2 kg assembly Â· 40,000 units/year Â· India manufacturing"
      image="/assets/casestudy/truck.png"
      imageAlt="LCV Rear Drive Axle"
      stats={[
        { label: 'Assembly Cost',  value: '$244 / unit' },
        { label: 'Annual Volume',  value: '40,000 units' },
        { label: 'Finish Weight',  value: '51.2 kg' },
        { label: 'Sub-Assemblies', value: '4 major' },
        { label: 'Region',         value: 'India' },
      ]}
      ctaTitle="Need should cost intelligence for your drivetrain or chassis assembly?"
      ctaBody="Emithran models every manufacturing operation from first principles - giving you component-level cost data to negotiate, design, and source smarter."
      ctaSource="case-study-rear-axle-should-cost"
    >

      {/* Row 1 - Assembly cost roll-up */}
      <div>
        <SectionLabel>Assembly Cost Roll-Up</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Drive Head / Carrier drives 46% of total cost</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="mb-5 text-[13px] font-semibold text-[#0f1b2d]">Cost share by sub-assembly</p>
            <div className="space-y-3">
              {subAssemblies.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex items-center justify-between text-[13px]">
                    <span className="font-medium text-[#334155]">{s.name}</span>
                    <span className="font-bold text-[#0f1b2d]">${s.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 rounded-full bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                    </div>
                    <span className="w-9 text-right text-[12px] font-semibold text-[#64748b]">{s.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
              <span className="font-bold text-[#0f1b2d]">Total Assembly</span>
              <span className="text-[18px] font-bold text-[#0d9488]">$244.36</span>
            </div>
          </Card>

          <Card>
            <p className="mb-5 text-[13px] font-semibold text-[#0f1b2d]">Assembly hierarchy</p>
            <div className="font-mono text-[12px] text-[#334155] space-y-1.5">
              {[
                { indent: 0, label: 'LCV Rear Drive Axle',              cost: '$244', bold: true  },
                { indent: 1, label: 'Axle Housing (weldment)',           cost: '$48',  bold: false },
                { indent: 2, label: 'Housing Formed Half Ã—2',            cost: '$22',  bold: false },
                { indent: 2, label: 'End Flange Ã—2 (cast+M/C)',         cost: '$12',  bold: false },
                { indent: 1, label: 'Drive Head / Carrier Assy.',        cost: '$112', bold: true  },
                { indent: 2, label: 'Differential Cage Assy.',           cost: '$47',  bold: false },
                { indent: 3, label: 'Ring Gear (forged)',                cost: '$11',  bold: false },
                { indent: 3, label: 'Side Gear 24T Ã—2',                 cost: '$5',   bold: false },
                { indent: 2, label: 'Carrier Housing & Pinion Assy.',    cost: '$48',  bold: false },
                { indent: 3, label: 'Carrier Housing (cast+M/C)',        cost: '$18',  bold: false },
                { indent: 3, label: 'Bearings LM603049 Ã—2',             cost: '$18',  bold: false },
                { indent: 1, label: 'Half Shaft RH Assy.',               cost: '$30',  bold: false },
                { indent: 2, label: 'Axle Half Shaft (forged)',          cost: '$15',  bold: false },
                { indent: 2, label: 'Taper Roller Bearing',             cost: '$7',   bold: false },
                { indent: 1, label: 'Half Shaft LH Assy.',              cost: '$30',  bold: false },
              ].map(({ indent, label, cost, bold }, i) => (
                <div key={i} className="flex items-start justify-between" style={{ paddingLeft: indent * 14 }}>
                  <span className={`flex items-center gap-1 ${bold ? 'font-bold text-[#0f1b2d]' : ''}`}>
                    {indent > 0 && <span className="text-[#cbd5e1]">{'â””â”€'}</span>}
                    {label}
                  </span>
                  <span className={`ml-2 shrink-0 ${bold ? 'font-bold text-[#0d9488]' : 'text-[#94a3b8]'}`}>{cost}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2 - Drive Head deep-dive */}
      <div>
        <SectionLabel>Primary Cost Driver - 46% of Axle</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Drive Head / Carrier Assembly - $112.00</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-x-auto rounded-2xl border border-black/[0.07] bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#f8fafb]">
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Component</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Type</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Cost ($)</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Share</th>
                </tr>
              </thead>
              <tbody>
                {driveHeadItems.map((item, i) => (
                  <tr key={item.name} className={`border-b border-black/[0.04] ${i % 2 !== 0 ? 'bg-[#fafafa]' : ''}`}>
                    <td className="px-5 py-3 font-medium text-[#0f1b2d]">{item.name}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        item.type === 'BOI'             ? 'bg-amber-50 text-amber-700' :
                        item.type.includes('Forged')    ? 'bg-blue-50 text-blue-700' :
                        item.type.includes('Casting')   ? 'bg-purple-50 text-purple-700' :
                        'bg-[#f1f5f9] text-[#475569]'
                      }`}>{item.type}</span>
                    </td>
                    <td className="px-5 py-3 text-right font-mono font-semibold text-[#0f1b2d]">${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                          <div className="h-full rounded-full bg-[#0d9488]" style={{ width: `${(item.pct / 16) * 100}%` }} />
                        </div>
                        <span className="w-7 text-[12px] font-semibold text-[#64748b]">{item.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#f0fdfa]">
                  <td colSpan={2} className="px-5 py-3.5 font-bold text-[#0f1b2d]">Total Drive Head / Carrier</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-[#0d9488]">$112.00</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#0d9488]">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="space-y-4">
            <Card>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-2">Dual Cost Leaders - 16% Each</p>
              <p className="font-bold text-[#0f1b2d] mb-1">Carrier Housing vs Bearings</p>
              <p className="text-[13px] text-[#64748b] leading-relaxed mb-4">
                Carrier Housing (cast + machined, 9.5 kg) and Bearing LM603049 pair are tied at $18.42 and $18.17 - together they drive 32% of drive head cost.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-[#f0fdfa] p-3 text-center">
                  <p className="text-[16px] font-bold text-[#0d9488]">$18.42</p>
                  <p className="text-[11px] text-[#0d9488]">Carrier Housing</p>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 text-center">
                  <p className="text-[16px] font-bold text-amber-700">$18.17</p>
                  <p className="text-[11px] text-amber-600">Bearings (BOI)</p>
                </div>
              </div>
            </Card>
            <Card>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-2">BOI Concentration</p>
              <p className="text-[13px] text-[#64748b] leading-relaxed">
                Bought-out items (bearings, oil seals) represent <span className="font-bold text-[#0f1b2d]">~29%</span> of Drive Head cost. Supplier benchmarking and multi-source qualification are the only levers available.
              </p>
            </Card>
            <Card>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-2">Forged Components</p>
              <p className="text-[13px] text-[#64748b] leading-relaxed">
                Ring Gear + Side Gears + Pinion Shaft = <span className="font-bold text-[#0f1b2d]">$23.45 (21%)</span>. All forged and CNC machined - gear hobbing and deburring are the dominant process cost drivers.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Row 3 - Axle Housing + Half Shaft */}
      <div>
        <SectionLabel>Sub-Assembly Breakdown</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Axle Housing & Half Shafts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-1">20% of Axle Cost</p>
            <h3 className="mb-1 text-[16px] font-bold text-[#0f1b2d]">Axle Housing - $48</h3>
            <p className="mb-4 text-[12px] text-[#64748b]">Weldment Â· 17.37 kg Â· 16 line items</p>
            <div className="space-y-2.5 mb-4">
              {housingItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="text-[#334155]">{item.name}</span>
                    <span className="font-semibold text-[#0f1b2d]">${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-full bg-[#0d9488]" style={{ width: `${item.pct * 2}%` }} />
                    </div>
                    <span className="w-7 text-right text-[11px] text-[#94a3b8]">{item.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-[#f0fdfa] p-3 text-[12px] text-[#0d9488]">
              <span className="font-bold">Housing Formed Half (Ã—2)</span> drives 47% of housing cost - deep drawn formed steel, key candidate for process optimisation.
            </div>
          </Card>

          <Card>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-1">12% Each Â· 24% Combined</p>
            <h3 className="mb-1 text-[16px] font-bold text-[#0f1b2d]">Half Shaft RH + LH - $60.62</h3>
            <p className="mb-4 text-[12px] text-[#64748b]">Mirror configuration Â· 9.52 kg each Â· Brake Plate = Customer Scope</p>
            <div className="space-y-2.5 mb-4">
              {halfShaftItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="text-[#334155]">{item.name}</span>
                    <span className="font-semibold text-[#0f1b2d]">${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-full bg-[#2dd4bf]" style={{ width: `${item.pct * 2}%` }} />
                    </div>
                    <span className="w-7 text-right text-[11px] text-[#94a3b8]">{item.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-[#f0fdfa] p-3 text-[12px] text-[#0d9488]">
              <span className="font-bold">Axle Half Shaft (forged + CNC)</span> at $14.58 = 48% of shaft assembly - forging die + multi-axis turning are the dominant cost steps.
            </div>
          </Card>
        </div>
      </div>

      {/* Row 4 - Material & Process Rates */}
      <div>
        <SectionLabel>Assumptions & Rates</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Material, machine & overhead basis</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <p className="mb-4 text-[12px] font-bold text-[#0f1b2d]">Key Material Grades</p>
            <div className="space-y-2 text-[12px]">
              {[
                { grade: '18CrNiMo7-6', use: 'Gear steels',      rate: '$0.88/kg' },
                { grade: 'ASTM A247-10',use: 'Castings (ingot)', rate: '$1.07/kg' },
                { grade: 'EN24',        use: 'Alloy steel rod',  rate: '$0.79/kg' },
                { grade: 'En353',       use: 'Alloy steel sheet',rate: '$0.89/kg' },
                { grade: 'IS2062',      use: 'Structural sheet', rate: '$0.76/kg' },
                { grade: 'C60E',        use: 'High carbon rod',  rate: '$0.67/kg' },
                { grade: 'Cast Steel',  use: 'Sand casting',     rate: '$0.71/kg' },
              ].map(({ grade, use, rate }) => (
                <div key={grade} className="flex items-start justify-between gap-2 border-b border-black/[0.04] pb-1.5">
                  <div>
                    <p className="font-semibold text-[#0f1b2d]">{grade}</p>
                    <p className="text-[11px] text-[#94a3b8]">{use}</p>
                  </div>
                  <span className="shrink-0 font-mono font-semibold text-[#334155]">{rate}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-4 text-[12px] font-bold text-[#0f1b2d]">Machine Hour Rates</p>
            <div className="space-y-2 text-[12px]">
              {[
                { machine: 'Roll Forging 7000T',     mhr: '$29/hr' },
                { machine: 'Melting / Heating Furnace', mhr: '$27/hr' },
                { machine: 'Forging - 1800T',         mhr: '$10/hr' },
                { machine: 'CNC Milling',             mhr: '$3/hr' },
                { machine: 'Gear Hobbing',            mhr: '$4/hr' },
                { machine: 'CNC Turning',             mhr: '$2/hr' },
                { machine: 'Forging - 800T',          mhr: '$5/hr' },
                { machine: 'Pipe/Rod Cutting',        mhr: '$1/hr' },
              ].map(({ machine, mhr }) => (
                <div key={machine} className="flex items-center justify-between border-b border-black/[0.04] pb-1.5">
                  <span className="text-[#334155]">{machine}</span>
                  <span className="font-mono font-semibold text-[#0f1b2d]">{mhr}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-4 text-[12px] font-bold text-[#0f1b2d]">Overhead Structure</p>
            <div className="space-y-2 text-[12px]">
              {[
                { item: 'Inbound Logistics',    rate: '2% of RM' },
                { item: 'Inventory Cost',        rate: '5% of RM' },
                { item: 'Material Handling',     rate: '3% of RM' },
                { item: 'Labour Overhead',       rate: '5% of Labour' },
                { item: 'Machine Overhead',      rate: '8% of Machine' },
                { item: 'Rejection / Misc.',     rate: '2% of RM + VA' },
                { item: 'R&D',                   rate: '2% of DMC' },
                { item: 'SG&A',                  rate: '1% of R&D + DMC' },
                { item: 'Profit',                rate: '7% of Total Cost' },
                { item: 'Outbound Logistics',    rate: '2% of Mfg. Cost' },
              ].map(({ item, rate }) => (
                <div key={item} className="flex items-center justify-between border-b border-black/[0.04] pb-1.5">
                  <span className="text-[#334155]">{item}</span>
                  <span className="font-mono font-semibold text-[#64748b]">{rate}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#94a3b8]">Excludes: packaging, brake/drum assembly, painting, lubricants</p>
          </Card>
        </div>
      </div>

      {/* Row 5 - Commodity split */}
      <div>
        <SectionLabel>Commodity Intelligence</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Manufacturing processes across the BOM</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { type: 'Forged & M/C',     examples: 'Ring gear, half shaft, pinion, side gears', count: 6 },
            { type: 'Casting & M/C',    examples: 'Carrier housing, bearing caps, end flanges, cage', count: 7 },
            { type: 'Formed / Weldment',examples: 'Housing halves, brackets, wrapping plates', count: 8 },
            { type: 'BOI (Bought Out)', examples: 'Taper bearings, oil seals, O-rings, bolts', count: 12 },
          ].map(({ type, examples, count }) => (
            <Card key={type}>
              <p className="font-bold text-[#0f1b2d] text-[13px] mb-1">{type}</p>
              <p className="text-[11px] text-[#0d9488] font-semibold mb-2">{count} line items</p>
              <p className="text-[11px] text-[#64748b] leading-relaxed">{examples}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Row 6 - Key Findings */}
      <DarkCard>
        <SectionLabel>Emithran Analysis</SectionLabel>
        <h2 className="mb-6 text-[22px] font-bold text-white">Key findings from this should cost</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Drive Head is the Leverage Point',
              body: 'At 46% of total axle cost, any optimisation in carrier housing casting yield, bearing sourcing strategy or gear hobbing efficiency delivers outsized savings at the assembly level.',
            },
            {
              title: 'BOI Pricing Controls ~18% of Axle',
              body: 'Bearings and seals are bought-out items. Their unit pricing is directly passed through - supplier benchmarking and multi-source qualification are the only levers available.',
            },
            {
              title: 'Forging is the Process Cost Engine',
              body: 'Ring gear, half shaft, pinion, and side gears are all forged + CNC machined. Roll forging at $29/hr and gear hobbing at $4/hr are the dominant process cost contributors.',
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
