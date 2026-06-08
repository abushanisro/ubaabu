import Link from 'next/link'

export const metadata = {
  title: 'DC-DC Converter Teardown & VAVE | Emithran Case Study',
  description: 'How Emithran delivered 39% body cost reduction, 28% PCBA savings, and 13 VAVE ideas through teardown and should-cost analysis of a DC-DC converter for an electric two-wheeler OEM.',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">{children}</p>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default function DCDCConverterCaseStudy() {
  return (
    <main className="bg-[#f8fafb] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[440px] overflow-hidden bg-[#0a0f1a]">
        <img src="/assets/casestudy/case3.png" alt="DC-DC Converter electronics" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12">
          <Link href="/#case-studies" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight tracking-tight text-white max-w-[760px]">
            DC-DC Converter<br />
            <span className="text-[#2dd4bf]">Teardown, Should Cost & VAVE</span>
          </h1>
          <p className="mt-3 text-[16px] text-white/55 max-w-[540px]">
            Leading electric two-wheeler OEM — full teardown, component-level should costing, and 13 VAVE ideas to compress procurement cost
          </p>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-6 md:grid-cols-5 md:px-12">
          {[
            { label: 'Annual Demand',   value: '6,000 units' },
            { label: 'Should Cost',     value: '₹831.49' },
            { label: 'PCBA Share',      value: '74% of cost' },
            { label: 'VAVE Ideas',      value: '13 generated' },
            { label: 'Body Negotiation',value: '−39% saving' },
          ].map((item) => (
            <div key={item.label} className="py-5 px-4 first:pl-0 last:pr-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-black/35">{item.label}</p>
              <p className="mt-1 text-[15px] font-bold text-[#0d1117]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20 space-y-10">

        {/* Row 1 — Scope + Product */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionLabel>Scope of Work</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">What Emithran was engaged to do</h2>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              {[
                'Complete physical teardown of the DC-DC converter unit',
                'Examine and catalogue all individual components',
                'Conduct should-cost analysis at India manufacturing conditions',
                'Perform VAVE analysis and generate cost reduction ideas',
              ].map((s, i) => (
                <li key={i} className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />{s}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionLabel>Device Specification</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">DC-DC Converter</h2>
            <div className="divide-y divide-black/[0.06]">
              {[
                { k: 'Input Voltage',    v: '36V – 72V DC' },
                { k: 'Output Voltage',   v: '12V ± 0.5V' },
                { k: 'Output Current',   v: '10A – 15A' },
                { k: 'Product Weight',   v: '252 grams' },
                { k: 'Dimensions',       v: '310 × 52 mm' },
                { k: 'Body Material',    v: 'ADC12 Aluminium (HPDC)' },
                { k: 'Annual Volume',    v: '6,000 units · Batch 500' },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between py-2.5 text-[13px]">
                  <span className="text-black/45">{k}</span>
                  <span className="font-semibold text-[#0d1117]">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2 — Cost Breakdown Pareto */}
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">Should Cost Analysis — Total: ₹831.49</p>
          <h2 className="mb-6 text-[20px] font-bold text-[#0d1117]">Pareto: 80% of cost is PCBA</h2>
          <div className="grid gap-6 md:grid-cols-2">

            <Card>
              <p className="mb-5 text-[13px] font-semibold text-[#0d1117]">Component Cost Breakdown</p>
              <div className="space-y-4">
                {[
                  { label: 'PCBA',          cost: '₹615.51', pct: 74, color: '#2dd4bf' },
                  { label: 'Wiring Harness',cost: '₹107.88', pct: 13, color: '#60a5fa' },
                  { label: 'Body (HPDC)',   cost: '₹78.18',  pct: 9,  color: '#a78bfa' },
                  { label: 'Potting',        cost: '₹10.06',  pct: 1,  color: '#94a3b8' },
                  { label: 'Assembly + OH', cost: '₹19.86',  pct: 2,  color: '#cbd5e1' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                        <span className="text-[13px] text-[#475569]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-black/35">{item.cost}</span>
                        <span className="w-8 text-right text-[14px] font-bold text-[#0d1117]">{item.pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-black/[0.05]">
                      <div className="h-2 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="mb-5 text-[13px] font-semibold text-[#0d1117]">Cost Driver by Category (PCBA · WH · Body)</p>
              <div className="space-y-5">
                {[
                  {
                    name: 'PCBA', material: 454, process: 67, other: 95,
                    note: 'Electronic components dominate; volume drives pricing',
                  },
                  {
                    name: 'Wiring Harness', material: 69, process: 28, other: 11,
                    note: 'Material cost dominant; local sourcing reduces price',
                  },
                  {
                    name: 'Body (HPDC)', material: 25, process: 46, other: 7,
                    note: 'Process cost dominant; machine selection key',
                  },
                ].map((c) => {
                  const total = c.material + c.process + c.other
                  return (
                    <div key={c.name} className="rounded-xl bg-[#f8fafb] p-3.5">
                      <p className="mb-2 text-[12px] font-semibold text-[#0d1117]">{c.name}</p>
                      <div className="flex h-2 w-full overflow-hidden rounded-full">
                        <div style={{ width: `${(c.material/total)*100}%`, background: '#2dd4bf' }} />
                        <div style={{ width: `${(c.process/total)*100}%`, background: '#60a5fa' }} />
                        <div style={{ width: `${(c.other/total)*100}%`, background: '#e2e8f0' }} />
                      </div>
                      <div className="mt-1.5 flex gap-3 text-[10px] text-black/40">
                        <span><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2dd4bf] mr-1" />Material {Math.round((c.material/total)*100)}%</span>
                        <span><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#60a5fa] mr-1" />Process {Math.round((c.process/total)*100)}%</span>
                        <span><span className="inline-block h-1.5 w-1.5 rounded-full bg-[#e2e8f0] mr-1" />Other {Math.round((c.other/total)*100)}%</span>
                      </div>
                      <p className="mt-1.5 text-[11px] text-black/35">{c.note}</p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Row 3 — Supplier Negotiation */}
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">Supplier Negotiation Results</p>
          <h2 className="mb-6 text-[20px] font-bold text-[#0d1117]">Should Cost as Negotiation Lever</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { part: 'PCBA + Final Assy', initial: '₹1,450', negotiated: '₹1,040', pct: 28, note: 'Batch qty raised 500 → 6,000 to unlock BOM savings' },
              { part: 'Body (HPDC)',        initial: '₹115',   negotiated: '₹70',    pct: 39, note: 'Input weight & machine tonnage corrected via should cost' },
              { part: 'Wire Harness',       initial: '₹98',    negotiated: '₹77',    pct: 22, note: 'Dual-sourced from Bangalore suppliers' },
            ].map((n) => (
              <div key={n.part} className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">{n.part}</p>
                <div className="mb-3 flex items-end gap-3">
                  <div>
                    <p className="text-[11px] text-black/35">Initial</p>
                    <p className="text-[18px] font-bold text-[#94a3b8] line-through">{n.initial}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  <div>
                    <p className="text-[11px] text-black/35">Negotiated</p>
                    <p className="text-[22px] font-bold text-teal-700">{n.negotiated}</p>
                  </div>
                </div>
                <div className="mb-3 inline-block rounded-full bg-teal-50 px-3 py-1 text-[13px] font-bold text-teal-700">
                  −{n.pct}% reduction
                </div>
                <p className="text-[12px] leading-relaxed text-black/40">{n.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 4 — VAVE Ideas */}
        <Card>
          <SectionLabel>VAVE Analysis — 13 Ideas Generated</SectionLabel>
          <h2 className="mb-5 text-[17px] font-bold text-[#0d1117]">Cost Reduction Opportunities Identified</h2>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { type: 'Process',  idea: 'Surface finish change: HASL → OSP on bare PCB' },
              { type: 'Design',   idea: 'Remove 3 slots in PCB profile — make rectangular (saves routing cost)' },
              { type: 'Design',   idea: 'Change soldering to press fit / eliminate THT components' },
              { type: 'Design',   idea: 'Change WH soldering to connector assembly' },
              { type: 'Supplier', idea: 'Identify local Indian supplier for ICs (LM5116 switching controller: ₹89 target)' },
              { type: 'Supplier', idea: 'Dual-source A-grade components for price leverage' },
              { type: 'Material', idea: 'Body material change: Aluminium casting → Plastic' },
              { type: 'Process',  idea: 'Body process change: HPDC → Aluminium extrusion' },
              { type: 'Process',  idea: 'Body process change: HPDC → Sheet metal' },
              { type: 'Supplier', idea: 'Casting supplier change to Coimbatore cluster' },
              { type: 'Supplier', idea: 'PCBA assembly: switch to local Bangalore supplier' },
              { type: 'Supplier', idea: 'Wire harness: switch to local Bangalore supplier' },
              { type: 'Design',   idea: 'Replace potting compound with mechanical screw fixation' },
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-[#f8fafb] px-3.5 py-3">
                <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                  v.type === 'Process'  ? 'bg-blue-100 text-blue-700' :
                  v.type === 'Design'   ? 'bg-violet-100 text-violet-700' :
                  v.type === 'Supplier' ? 'bg-teal-100 text-teal-700' :
                                          'bg-orange-100 text-orange-700'
                }`}>{v.type}</span>
                <p className="text-[13px] leading-relaxed text-[#475569]">{v.idea}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Row 5 — Sourcing Recommendations */}
        <Card>
          <SectionLabel>Final Sourcing Recommendations</SectionLabel>
          <div className="divide-y divide-black/[0.06]">
            {[
              { part: 'DC Convertor PCBA',           rec: 'Source from China', note: 'OEM volumes achieve lower IC costs; China PCBA manufacturing more cost-effective at low volumes', color: '#60a5fa' },
              { part: 'Wiring Harness Assembly',      rec: 'Local Supplier',   note: 'Bangalore-based suppliers competitive; 22% negotiated reduction achieved', color: '#2dd4bf' },
              { part: 'DC Convertor Body (HPDC)',     rec: 'Local Supplier',   note: 'Coimbatore casting cluster; 39% reduction achieved with corrected machine selection', color: '#2dd4bf' },
              { part: 'Potting Compound',             rec: 'Local Supplier',   note: 'Standard chemical; locally available', color: '#2dd4bf' },
              { part: 'Final Assembly',               rec: 'Local Supplier',   note: 'Assembly operations suit local manufacturing', color: '#2dd4bf' },
            ].map((r) => (
              <div key={r.part} className="flex flex-col gap-1 py-3.5 md:flex-row md:items-center md:gap-4">
                <span className="w-52 shrink-0 text-[13px] font-semibold text-[#0d1117]">{r.part}</span>
                <span className="shrink-0 rounded-full px-3 py-0.5 text-[11px] font-bold" style={{ background: r.color + '20', color: r.color }}>{r.rec}</span>
                <span className="text-[12px] text-black/40">{r.note}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Row 6 — Takeaways */}
        <div className="rounded-2xl bg-[#0d1117] p-8 md:p-10">
          <SectionLabel>Key Takeaways</SectionLabel>
          <h2 className="mb-8 text-[22px] font-bold text-white">What Emithran delivered</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { num: '−39%', title: 'Body Cost Reduction',     desc: 'Should cost identified inflated input weight assumption in supplier quote; 150T machine and 90g input weight validated.' },
              { num: '−28%', title: 'PCBA Cost Reduction',     desc: 'Batch quantity optimised from 500 to 6,000 units; alternative components explored to compress BOM cost.' },
              { num: '−22%', title: 'Harness Cost Reduction',  desc: 'Dual-sourced from Bangalore WH suppliers; competitive bidding drove price to ₹77 from ₹98.' },
              { num:  '13',  title: 'VAVE Ideas Generated',    desc: 'Design, process, material, and supplier change ideas identified — all marked YTC (Yet to Confirm) for client review.' },
            ].map((v) => (
              <div key={v.num} className="flex gap-4 rounded-xl bg-white/[0.05] p-5">
                <span className="shrink-0 text-[22px] font-bold text-[#2dd4bf]">{v.num}</span>
                <div>
                  <p className="mb-1 text-[13px] font-semibold text-white">{v.title}</p>
                  <p className="text-[13px] leading-relaxed text-white/55">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 7 — CTA */}
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-6 py-10 text-center shadow-sm">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#2dd4bf]">For Enquiry</p>
          <h2 className="text-[20px] font-bold text-[#0d1117]">Need teardown, should costing, or VAVE for your EV component?</h2>
          <p className="max-w-[480px] text-[14px] text-[#64748b]">
            Emithran disassembles, costs, and engineers value out of your components — giving you the data to negotiate, redesign, and source smarter.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a href="/request-demo" className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-85" style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}>
              Request a Demo
            </a>
            <a href="/contact?source=case-study-dc-dc-converter&cta=contact-sales" className="rounded-lg border border-black/15 px-5 py-2.5 text-[13px] font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors">
              Contact Sales
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
