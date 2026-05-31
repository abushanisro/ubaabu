import Link from 'next/link'

export const metadata = {
  title: '2T LCV Rear Drive Axle — Should Cost Analysis | Emithran Case Study',
  description: 'Full assembly should cost for a 2-tonne LCV rear drive axle — 51.2 kg, 40,000 units/year, India manufacturing. Drive Head / Carrier at 46% is the primary cost driver.',
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

const subAssemblies = [
  { name: 'Drive Head / Carrier Assy.',  cost: 9407.10, pct: 46, color: '#0f766e', lightColor: '#f0fdfa' },
  { name: 'Axle Housing',                cost: 4066.00, pct: 20, color: '#2dd4bf', lightColor: '#f0fdfa' },
  { name: 'Half Shaft RH',               cost: 2545.90, pct: 12, color: '#5eead4', lightColor: '#f0fdfa' },
  { name: 'Half Shaft LH',               cost: 2545.90, pct: 12, color: '#99f6e4', lightColor: '#f0fdfa' },
  { name: 'Top-level Assembly & HW',     cost:  961.30, pct:  5, color: '#ccfbf1', lightColor: '#f8fafb' },
]

const driveHeadItems = [
  { name: 'Carrier Housing',         cost: 1547.61, pct: 16, type: 'Casting & M/C' },
  { name: 'Bearing LM603049 (×2)',   cost: 1526.00, pct: 16, type: 'BOI' },
  { name: 'Ring Gear',               cost:  961.06, pct: 10, type: 'Forged & M/C' },
  { name: 'Drive Head Assy.',        cost:  910.00, pct: 10, type: 'Assembly' },
  { name: 'Bearing — Pinion Head',   cost:  774.00, pct:  8, type: 'BOI' },
  { name: 'Pinion Shaft Main Drive', cost:  629.55, pct:  7, type: 'Forged & M/C' },
  { name: 'Bearing — Pinion Tail',   cost:  470.00, pct:  5, type: 'BOI' },
  { name: 'Diff Cage Assy.',         cost:  392.93, pct:  4, type: 'Assembly' },
  { name: 'Cage — Diff Gears',       cost:  454.69, pct:  5, type: 'Casting & M/C' },
  { name: 'Side Gear 24T (×2)',      cost:  379.66, pct:  4, type: 'Forged & M/C' },
  { name: 'Other (caps, HW, seals)', cost:  381.60, pct:  4, type: 'Various' },
]

const housingItems = [
  { name: 'Housing Formed Half (×2)', cost: 1862.28, pct: 47, type: 'Formed' },
  { name: 'End Flange (×2)',          cost:  989.08, pct: 25, type: 'Casting & M/C' },
  { name: 'Axle Housing Assembly',    cost:  537.56, pct: 14, type: 'Assembly' },
  { name: 'Rear Cover',               cost:  210.52, pct:  5, type: 'Formed' },
  { name: 'Other (brackets, HW)',     cost:  287.06, pct:  7, type: 'Various' },
]

const halfShaftItems = [
  { name: 'Axle Half Shaft',          cost: 1225.02, pct: 48, type: 'Forged & M/C' },
  { name: 'Taper Roller Bearing Set', cost:  621.00, pct: 24, type: 'BOI' },
  { name: 'Half Shaft Assembly',      cost:  273.43, pct: 11, type: 'Assembly' },
  { name: 'Bearing Housing',          cost:  162.74, pct:  6, type: 'Casting & M/C' },
  { name: 'Axle Shaft Assy.',         cost:  146.34, pct:  6, type: 'Assembly' },
  { name: 'Hardware & Seals',         cost:   96.59, pct:  4, type: 'Hardware / BOI' },
]

export default function RearAxleCaseStudy() {
  return (
    <main className="bg-[#f8fafb] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[480px] overflow-hidden">
        <img
          src="/assets/casestudy/truck.png"
          alt="LCV Rear Drive Axle"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)' }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12">
          <Link href="/#case-studies" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-colors w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>
          <h1 className="text-3xl md:text-[44px] font-bold leading-tight tracking-tight text-white max-w-[720px]">
            2T LCV Rear Drive Axle<br />— Should Cost Analysis
          </h1>
          <p className="mt-3 text-[16px] text-white/65 max-w-[560px]">
            Light commercial vehicle OEM · 51.2 kg assembly · 40,000 units/year · India manufacturing
          </p>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-6 md:grid-cols-5 md:px-12">
          {[
            { label: 'Assembly Cost',   value: '₹20,526 / unit' },
            { label: 'Annual Volume',   value: '40,000 units' },
            { label: 'Finish Weight',   value: '51.2 kg' },
            { label: 'Sub-Assemblies',  value: '4 major' },
            { label: 'Region',          value: 'India' },
          ].map(({ label, value }) => (
            <div key={label} className="py-5 md:py-6">
              <p className="text-[11px] uppercase tracking-widest text-[#94a3b8] font-semibold mb-1">{label}</p>
              <p className="text-[15px] font-bold text-[#0d1117]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 py-12 md:py-16 space-y-14">

        {/* ── Assembly cost roll-up ── */}
        <section>
          <SectionLabel>Assembly Cost Roll-Up</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0d1117] mb-8">
            Drive Head / Carrier drives 46% of total cost
          </h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Bar chart */}
            <Card>
              <p className="text-[13px] font-semibold text-[#0d1117] mb-5">Cost share by sub-assembly</p>
              <div className="space-y-3">
                {subAssemblies.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1 flex items-center justify-between text-[13px]">
                      <span className="font-medium text-[#334155]">{s.name}</span>
                      <span className="font-bold text-[#0d1117]">₹{s.cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 rounded-full bg-black/[0.05] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                        />
                      </div>
                      <span className="w-9 text-right text-[12px] font-semibold text-[#64748b]">{s.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
                <span className="font-bold text-[#0d1117]">Total Assembly</span>
                <span className="text-[18px] font-bold text-[#0d9488]">₹20,526.20</span>
              </div>
            </Card>

            {/* Assembly structure tree */}
            <Card>
              <p className="text-[13px] font-semibold text-[#0d1117] mb-5">Assembly hierarchy</p>
              <div className="font-mono text-[12px] text-[#334155] space-y-1.5">
                {[
                  { indent: 0, label: 'LCV Rear Drive Axle', cost: '₹20,526', bold: true },
                  { indent: 1, label: 'Axle Housing (weldment)', cost: '₹4,066', bold: false },
                  { indent: 2, label: 'Housing Formed Half ×2', cost: '₹1,862', bold: false },
                  { indent: 2, label: 'End Flange ×2 (cast+M/C)', cost: '₹989', bold: false },
                  { indent: 1, label: 'Drive Head / Carrier Assy.', cost: '₹9,407', bold: true },
                  { indent: 2, label: 'Differential Cage Assy.', cost: '₹3,911', bold: false },
                  { indent: 3, label: 'Ring Gear (forged)', cost: '₹961', bold: false },
                  { indent: 3, label: 'Side Gear 24T ×2', cost: '₹380', bold: false },
                  { indent: 2, label: 'Carrier Housing & Pinion Assy.', cost: '₹4,066', bold: false },
                  { indent: 3, label: 'Carrier Housing (cast+M/C)', cost: '₹1,548', bold: false },
                  { indent: 3, label: 'Bearings LM603049 ×2', cost: '₹1,526', bold: false },
                  { indent: 1, label: 'Half Shaft RH Assy.', cost: '₹2,546', bold: false },
                  { indent: 2, label: 'Axle Half Shaft (forged)', cost: '₹1,225', bold: false },
                  { indent: 2, label: 'Taper Roller Bearing', cost: '₹621', bold: false },
                  { indent: 1, label: 'Half Shaft LH Assy.', cost: '₹2,546', bold: false },
                ].map(({ indent, label, cost, bold }, i) => (
                  <div key={i} className="flex items-start justify-between" style={{ paddingLeft: indent * 14 }}>
                    <span className={`flex items-center gap-1 ${bold ? 'font-bold text-[#0d1117]' : ''}`}>
                      {indent > 0 && <span className="text-[#cbd5e1]">{'└─'}</span>}
                      {label}
                    </span>
                    <span className={`ml-2 shrink-0 ${bold ? 'font-bold text-[#0d9488]' : 'text-[#94a3b8]'}`}>{cost}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ── Drive Head deep-dive ── */}
        <section>
          <SectionLabel>Primary Cost Driver — 46% of Axle</SectionLabel>
          <h2 className="text-2xl font-bold text-[#0d1117] mb-8">Drive Head / Carrier Assembly — ₹9,407.10</h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-x-auto rounded-2xl border border-black/[0.07] bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.06] bg-[#f8fafb]">
                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Component</th>
                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Type</th>
                    <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Cost (₹)</th>
                    <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {driveHeadItems.map((item, i) => (
                    <tr key={item.name} className={`border-b border-black/[0.04] ${i % 2 === 0 ? '' : 'bg-[#fafafa]'}`}>
                      <td className="px-5 py-3 font-medium text-[#0d1117]">{item.name}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          item.type === 'BOI' ? 'bg-amber-50 text-amber-700' :
                          item.type.includes('Forged') ? 'bg-blue-50 text-blue-700' :
                          item.type.includes('Casting') ? 'bg-purple-50 text-purple-700' :
                          'bg-[#f1f5f9] text-[#475569]'
                        }`}>{item.type}</span>
                      </td>
                      <td className="px-5 py-3 text-right font-mono font-semibold text-[#0d1117]">{item.cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${(item.pct / 16) * 100}%` }} />
                          </div>
                          <span className="w-7 text-[12px] font-semibold text-[#64748b]">{item.pct}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#f0fdfa]">
                    <td colSpan={2} className="px-5 py-3.5 font-bold text-[#0d1117]">Total Drive Head / Carrier</td>
                    <td className="px-5 py-3.5 text-right font-mono font-bold text-[#0d9488]">9,407.10</td>
                    <td className="px-5 py-3.5 text-right font-bold text-[#0d9488]">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="space-y-4">
              <Card>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Dual Cost Leaders — 16% Each</p>
                <p className="font-bold text-[#0d1117] mb-1">Carrier Housing vs Bearings</p>
                <p className="text-[13px] text-[#64748b] leading-relaxed mb-4">
                  Carrier Housing (cast + machined, 9.5 kg) and Bearing LM603049 pair are tied at ₹1,547 and ₹1,526 respectively — together they drive 32% of drive head cost.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-[#f0fdfa] p-3 text-center">
                    <p className="text-[16px] font-bold text-[#0d9488]">₹1,548</p>
                    <p className="text-[11px] text-[#0d9488]">Carrier Housing</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-3 text-center">
                    <p className="text-[16px] font-bold text-amber-700">₹1,526</p>
                    <p className="text-[11px] text-amber-600">Bearings (BOI)</p>
                  </div>
                </div>
              </Card>
              <Card>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">BOI Concentration</p>
                <p className="text-[13px] text-[#64748b] leading-relaxed">
                  Bought-out items (bearings, oil seals) represent <span className="font-bold text-[#0d1117]">~29%</span> of Drive Head cost — supplier pricing directly controls landed cost. No make vs buy opportunity for these components.
                </p>
              </Card>
              <Card>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Forged Components</p>
                <p className="text-[13px] text-[#64748b] leading-relaxed">
                  Ring Gear + Side Gears + Pinion Shaft = <span className="font-bold text-[#0d1117]">₹1,970 (21%)</span>. All forged and CNC machined — gear hobbing and deburring are the process cost drivers.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ── Axle Housing + Half Shaft ── */}
        <section>
          <SectionLabel>Sub-Assembly Breakdown</SectionLabel>
          <h2 className="text-2xl font-bold text-[#0d1117] mb-8">Axle Housing & Half Shafts</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Axle Housing */}
            <Card>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">20% of Axle Cost</p>
                  <h3 className="text-[16px] font-bold text-[#0d1117]">Axle Housing — ₹4,066</h3>
                  <p className="text-[12px] text-[#64748b]">Weldment · 17.37 kg · 16 line items</p>
                </div>
              </div>
              <div className="space-y-2.5 mb-4">
                {housingItems.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-[12px] mb-1">
                      <span className="text-[#334155]">{item.name}</span>
                      <span className="font-semibold text-[#0d1117]">₹{item.cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
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
              <div className="rounded-xl bg-[#f0fdfa] p-3 text-[12px] text-[#0f766e]">
                <span className="font-bold">Housing Formed Half (×2)</span> drives 47% of housing cost — deep drawn formed steel, key candidate for process optimisation.
              </div>
            </Card>

            {/* Half Shaft */}
            <Card>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">12% Each · 24% Combined</p>
                  <h3 className="text-[16px] font-bold text-[#0d1117]">Half Shaft RH + LH — ₹5,091.80</h3>
                  <p className="text-[12px] text-[#64748b]">Mirror configuration · 9.52 kg each · Brake Plate = Customer Scope</p>
                </div>
              </div>
              <div className="space-y-2.5 mb-4">
                {halfShaftItems.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-[12px] mb-1">
                      <span className="text-[#334155]">{item.name}</span>
                      <span className="font-semibold text-[#0d1117]">₹{item.cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-black/[0.05] overflow-hidden">
                        <div className="h-full rounded-full bg-[#5eead4]" style={{ width: `${item.pct * 2}%` }} />
                      </div>
                      <span className="w-7 text-right text-[11px] text-[#94a3b8]">{item.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-[#f0fdfa] p-3 text-[12px] text-[#0f766e]">
                <span className="font-bold">Axle Half Shaft (forged + CNC)</span> at ₹1,225 = 48% of shaft assembly — forging die + multi-axis turning are the dominant cost steps.
              </div>
            </Card>
          </div>
        </section>

        {/* ── Material & process rates ── */}
        <section>
          <SectionLabel>Assumptions & Rates</SectionLabel>
          <h2 className="text-2xl font-bold text-[#0d1117] mb-8">Material, machine & overhead basis</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <p className="text-[12px] font-bold text-[#0d1117] mb-4">Key Material Grades</p>
              <div className="space-y-2 text-[12px]">
                {[
                  { grade: '18CrNiMo7-6',   use: 'Gear steels',         rate: '₹74.2/kg' },
                  { grade: 'ASTM A247-10',   use: 'Castings (ingot)',    rate: '₹89.5/kg' },
                  { grade: 'EN24',           use: 'Alloy steel rod',     rate: '₹66/kg' },
                  { grade: 'En353',          use: 'Alloy steel sheet',   rate: '₹75/kg' },
                  { grade: 'IS2062',         use: 'Structural sheet',    rate: '₹64/kg' },
                  { grade: 'C60E',           use: 'High carbon rod',     rate: '₹56/kg' },
                  { grade: 'Cast Steel',     use: 'Sand casting',        rate: '₹60/kg' },
                ].map(({ grade, use, rate }) => (
                  <div key={grade} className="flex items-start justify-between gap-2 border-b border-black/[0.04] pb-1.5">
                    <div>
                      <p className="font-semibold text-[#0d1117]">{grade}</p>
                      <p className="text-[11px] text-[#94a3b8]">{use}</p>
                    </div>
                    <span className="shrink-0 font-mono font-semibold text-[#334155]">{rate}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="text-[12px] font-bold text-[#0d1117] mb-4">Machine Hour Rates</p>
              <div className="space-y-2 text-[12px]">
                {[
                  { machine: 'Roll Forging 7000T', mhr: '₹2,450/hr' },
                  { machine: 'Melting / Heating Furnace', mhr: '₹2,242/hr' },
                  { machine: 'Forging — 1800T', mhr: '₹836/hr' },
                  { machine: 'CNC Milling', mhr: '₹250/hr' },
                  { machine: 'Gear Hobbing', mhr: '₹350/hr' },
                  { machine: 'CNC Turning', mhr: '₹157/hr' },
                  { machine: 'Forging — 800T', mhr: '₹417/hr' },
                  { machine: 'Pipe/Rod Cutting', mhr: '₹86/hr' },
                ].map(({ machine, mhr }) => (
                  <div key={machine} className="flex items-center justify-between border-b border-black/[0.04] pb-1.5">
                    <span className="text-[#334155]">{machine}</span>
                    <span className="font-mono font-semibold text-[#0d1117]">{mhr}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="text-[12px] font-bold text-[#0d1117] mb-4">Overhead Structure</p>
              <div className="space-y-2 text-[12px]">
                {[
                  { item: 'Inbound Logistics', rate: '2% of RM' },
                  { item: 'Inventory Cost', rate: '5% of RM' },
                  { item: 'Material Handling', rate: '3% of RM' },
                  { item: 'Labour Overhead', rate: '5% of Labour' },
                  { item: 'Machine Overhead', rate: '8% of Machine' },
                  { item: 'Rejection / Misc.', rate: '2% of RM + VA' },
                  { item: 'R&D', rate: '2% of DMC' },
                  { item: 'SG&A', rate: '1% of R&D + DMC' },
                  { item: 'Profit', rate: '7% of Total Cost' },
                  { item: 'Outbound Logistics', rate: '2% of Mfg. Cost' },
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
        </section>

        {/* ── Commodity split ── */}
        <section>
          <SectionLabel>Commodity Intelligence</SectionLabel>
          <h2 className="text-2xl font-bold text-[#0d1117] mb-8">Manufacturing processes across the BOM</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { type: 'Forged & M/C', examples: 'Ring gear, half shaft, pinion, side gears', count: 6, icon: '⚒' },
              { type: 'Casting & M/C', examples: 'Carrier housing, bearing caps, end flanges, cage', count: 7, icon: '◬' },
              { type: 'Formed / Weldment', examples: 'Housing halves, brackets, wrapping plates', count: 8, icon: '⬡' },
              { type: 'BOI (Bought Out)', examples: 'Taper bearings, oil seals, O-rings, bolts', count: 12, icon: '◎' },
            ].map(({ type, examples, count, icon }) => (
              <div key={type} className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm">
                <div className="text-[24px] mb-3">{icon}</div>
                <p className="font-bold text-[#0d1117] text-[13px] mb-1">{type}</p>
                <p className="text-[11px] text-[#2dd4bf] font-semibold mb-2">{count} line items</p>
                <p className="text-[11px] text-[#64748b] leading-relaxed">{examples}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key findings dark card ── */}
        <section className="rounded-2xl bg-[#0d1117] p-8 md:p-10">
          <SectionLabel>Emithran Analysis</SectionLabel>
          <h2 className="text-2xl font-bold text-white mb-6">Key findings from this should cost</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: 'Drive Head is the Leverage Point',
                body: 'At 46% of total axle cost, any optimisation in carrier housing casting yield, bearing sourcing strategy or gear hobbing efficiency delivers outsized savings at the assembly level.',
              },
              {
                title: 'BOI Pricing Controls ~18% of Axle',
                body: 'Bearings and seals are bought-out items. Their unit pricing is directly passed through — supplier benchmarking and multi-source qualification are the only levers available.',
              },
              {
                title: 'Forging is the Process Cost Engine',
                body: 'Ring gear, half shaft, pinion, and side gears are all forged + CNC machined. Roll forging at ₹2,450/hr and gear hobbing at ₹350/hr are the dominant process cost contributors.',
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
          <p className="text-[15px] text-[#64748b] mb-5">Need should cost intelligence for your drivetrain or chassis assembly?</p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-[#0d1117] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-black transition-colors"
          >
            Request a Should Cost Analysis
          </Link>
        </div>

      </div>
    </main>
  )
}
