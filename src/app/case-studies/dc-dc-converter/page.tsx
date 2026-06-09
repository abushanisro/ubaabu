import CaseStudyShell, {
  SectionLabel, Card, DarkCard, ImpactGrid, BarRow, StatRow, TagBadge,
} from '@/components/case-studies/CaseStudyShell'

export const metadata = {
  title: 'DC-DC Converter Teardown & VAVE | Emithran Case Study',
  description: 'How Emithran delivered 39% body cost reduction, 28% PCBA savings, and 13 VAVE ideas through teardown and should-cost analysis of a DC-DC converter for an electric two-wheeler OEM.',
}

const VAVE_IDEAS = [
  { type: 'Process',  idea: 'Surface finish change: HASL → OSP on bare PCB' },
  { type: 'Design',   idea: 'Remove 3 slots in PCB profile — make rectangular (saves routing cost)' },
  { type: 'Design',   idea: 'Change soldering to press fit / eliminate THT components' },
  { type: 'Design',   idea: 'Change WH soldering to connector assembly' },
  { type: 'Supplier', idea: 'Identify local supplier for ICs (LM5116 switching controller: $1.06 target)' },
  { type: 'Supplier', idea: 'Dual-source A-grade components for price leverage' },
  { type: 'Material', idea: 'Body material change: Aluminium casting → Plastic' },
  { type: 'Process',  idea: 'Body process change: HPDC → Aluminium extrusion' },
  { type: 'Process',  idea: 'Body process change: HPDC → Sheet metal' },
  { type: 'Supplier', idea: 'Casting supplier change to Coimbatore cluster' },
  { type: 'Supplier', idea: 'PCBA assembly: switch to local Bangalore supplier' },
  { type: 'Supplier', idea: 'Wire harness: switch to local Bangalore supplier' },
  { type: 'Design',   idea: 'Replace potting compound with mechanical screw fixation' },
] as const

export default function DCDCConverterCaseStudy() {
  return (
    <CaseStudyShell
      slug="dc-dc-converter"
      industry="Aerospace"
      date="May 12, 2026"
      readTime="6 min read"
      metric="22% unit cost down"
      title={<>DC-DC Converter<br className="hidden md:block" /> Teardown, Should Cost & VAVE</>}
      subtitle="Leading electric two-wheeler OEM — full teardown, component-level should costing, and 13 VAVE ideas to compress procurement cost"
      image="/assets/casestudy/case3.png"
      imageAlt="DC-DC Converter electronics"
      stats={[
        { label: 'Annual Demand',    value: '6,000 units' },
        { label: 'Should Cost',      value: '$9.90' },
        { label: 'PCBA Share',       value: '74% of cost' },
        { label: 'VAVE Ideas',       value: '13 generated' },
        { label: 'Body Negotiation', value: '−39% saving' },
      ]}
      ctaTitle="Need teardown, should costing, or VAVE for your EV component?"
      ctaBody="Emithran disassembles, costs, and engineers value out of your components — giving you the data to negotiate, redesign, and source smarter."
      ctaSource="case-study-dc-dc-converter"
    >

      {/* Row 1 — Scope + Spec */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card accent>
          <SectionLabel>Scope of Work</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">What Emithran was engaged to do</h2>
          <ul className="space-y-3">
            {[
              'Complete physical teardown of the DC-DC converter unit',
              'Examine and catalogue all individual components',
              'Conduct should-cost analysis at India manufacturing conditions',
              'Perform VAVE analysis and generate cost reduction ideas',
            ].map((s, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#475569]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />{s}
              </li>
            ))}
          </ul>
        </Card>

        <Card accent>
          <SectionLabel>Device Specification</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">DC-DC Converter</h2>
          <div className="divide-y divide-black/[0.05]">
            {[
              { k: 'Input Voltage',  v: '36V – 72V DC' },
              { k: 'Output Voltage', v: '12V ± 0.5V' },
              { k: 'Output Current', v: '10A – 15A' },
              { k: 'Product Weight', v: '252 grams' },
              { k: 'Dimensions',     v: '310 × 52 mm' },
              { k: 'Body Material',  v: 'ADC12 Aluminium (HPDC)' },
              { k: 'Annual Volume',  v: '6,000 units · Batch 500' },
            ].map(({ k, v }) => <StatRow key={k} label={k} value={v} />)}
          </div>
        </Card>
      </div>

      {/* Row 2 — Cost Breakdown */}
      <div>
        <SectionLabel>Should Cost Analysis — Total: $9.90</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Pareto: 80% of cost is PCBA</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="mb-5 text-[13px] font-semibold text-[#0f1b2d]">Component Cost Breakdown</p>
            <div className="space-y-4">
              {[
                { label: 'PCBA',           cost: '$7.33', pct: 74, color: '#0d9488' },
                { label: 'Wiring Harness', cost: '$1.28', pct: 13, color: '#60a5fa' },
                { label: 'Body (HPDC)',    cost: '$0.93', pct: 9,  color: '#a78bfa' },
                { label: 'Potting',        cost: '$0.12', pct: 1,  color: '#94a3b8' },
                { label: 'Assembly + OH',  cost: '$0.24', pct: 2,  color: '#cbd5e1' },
              ].map((item) => (
                <BarRow key={item.label} label={item.label} value={`${item.pct}%`} pct={item.pct} color={item.color} extra={item.cost} />
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-5 text-[13px] font-semibold text-[#0f1b2d]">Cost Driver by Category</p>
            <div className="space-y-5">
              {[
                { name: 'PCBA',           material: 454, process: 67, other: 95, note: 'Electronic components dominate; volume drives pricing' },
                { name: 'Wiring Harness', material: 69,  process: 28, other: 11, note: 'Material cost dominant; local sourcing reduces price' },
                { name: 'Body (HPDC)',    material: 25,  process: 46, other: 7,  note: 'Process cost dominant; machine selection key' },
              ].map((c) => {
                const total = c.material + c.process + c.other
                return (
                  <div key={c.name} className="rounded-xl bg-[#f8fafb] p-3.5">
                    <p className="mb-2 text-[12px] font-semibold text-[#0f1b2d]">{c.name}</p>
                    <div className="flex h-2 w-full overflow-hidden rounded-full">
                      <div style={{ width: `${(c.material/total)*100}%`, background: '#0d9488' }} />
                      <div style={{ width: `${(c.process/total)*100}%`, background: '#60a5fa' }} />
                      <div style={{ width: `${(c.other/total)*100}%`, background: '#e2e8f0' }} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-black/40">
                      <span><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#0d9488]" />Material {Math.round((c.material/total)*100)}%</span>
                      <span><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#60a5fa]" />Process {Math.round((c.process/total)*100)}%</span>
                      <span><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#e2e8f0]" />Other {Math.round((c.other/total)*100)}%</span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-black/35">{c.note}</p>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Row 3 — Negotiation */}
      <div>
        <SectionLabel>Supplier Negotiation Results</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Should Cost as Negotiation Lever</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { part: 'PCBA + Final Assy', initial: '$17.26', negotiated: '$12.38', pct: 28, note: 'Batch qty raised 500 → 6,000 to unlock BOM savings' },
            { part: 'Body (HPDC)',       initial: '$1.37',  negotiated: '$0.83',  pct: 39, note: 'Input weight & machine tonnage corrected via should cost' },
            { part: 'Wire Harness',      initial: '$1.17',  negotiated: '$0.92',  pct: 22, note: 'Dual-sourced from Bangalore suppliers' },
          ].map((n) => (
            <div key={n.part} className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-black/35">{n.part}</p>
              <div className="mb-4 flex items-end gap-3">
                <div>
                  <p className="text-[10px] text-black/35">Initial</p>
                  <p className="text-[18px] font-bold text-[#94a3b8] line-through">{n.initial}</p>
                </div>
                <svg className="mb-1 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <div>
                  <p className="text-[10px] text-black/35">Negotiated</p>
                  <p className="text-[22px] font-bold text-[#0d9488]">{n.negotiated}</p>
                </div>
              </div>
              <span className="inline-block rounded-full bg-[#0d9488]/10 px-3 py-1 text-[12px] font-bold text-[#0d9488]">−{n.pct}% reduction</span>
              <p className="mt-3 text-[12px] leading-relaxed text-black/40">{n.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4 — VAVE Ideas */}
      <Card accent>
        <SectionLabel>VAVE Analysis — 13 Ideas Generated</SectionLabel>
        <h2 className="mb-5 text-[17px] font-bold text-[#0f1b2d]">Cost Reduction Opportunities Identified</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {VAVE_IDEAS.map((v, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-black/[0.05] bg-[#f8fafb] px-3.5 py-3">
              <TagBadge type={v.type} />
              <p className="text-[13px] leading-relaxed text-[#475569]">{v.idea}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 5 — Sourcing */}
      <Card>
        <SectionLabel>Final Sourcing Recommendations</SectionLabel>
        <div className="divide-y divide-black/[0.05]">
          {[
            { part: 'DC Convertor PCBA',       rec: 'Source from China', note: 'OEM volumes achieve lower IC costs; China PCBA manufacturing more cost-effective at low volumes', color: '#60a5fa' },
            { part: 'Wiring Harness Assembly',  rec: 'Local Supplier',   note: 'Bangalore-based suppliers competitive; 22% negotiated reduction achieved', color: '#0d9488' },
            { part: 'DC Convertor Body (HPDC)', rec: 'Local Supplier',   note: 'Coimbatore casting cluster; 39% reduction achieved with corrected machine selection', color: '#0d9488' },
            { part: 'Potting Compound',         rec: 'Local Supplier',   note: 'Standard chemical; locally available', color: '#0d9488' },
            { part: 'Final Assembly',           rec: 'Local Supplier',   note: 'Assembly operations suit local manufacturing', color: '#0d9488' },
          ].map((r) => (
            <div key={r.part} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-4">
              <span className="shrink-0 text-[13px] font-semibold text-[#0f1b2d] sm:w-52">{r.part}</span>
              <span className="shrink-0 rounded-full px-3 py-0.5 text-[11px] font-bold" style={{ background: r.color + '18', color: r.color }}>{r.rec}</span>
              <span className="text-[12px] text-black/40">{r.note}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 6 — Impact */}
      <DarkCard>
        <SectionLabel>Key Takeaways</SectionLabel>
        <h2 className="mb-8 text-[22px] font-bold text-white">What Emithran delivered</h2>
        <ImpactGrid items={[
          { num: '−39%', title: 'Body Cost Reduction',    desc: 'Should cost identified inflated input weight assumption in supplier quote; 150T machine and 90g input weight validated.' },
          { num: '−28%', title: 'PCBA Cost Reduction',    desc: 'Batch quantity optimised from 500 to 6,000 units; alternative components explored to compress BOM cost.' },
          { num: '−22%', title: 'Harness Cost Reduction', desc: 'Dual-sourced from Bangalore WH suppliers; competitive bidding drove price to $0.92 from $1.17.' },
          { num: '13',   title: 'VAVE Ideas Generated',   desc: 'Design, process, material, and supplier change ideas identified — all marked YTC for client review.' },
        ]} />
      </DarkCard>

    </CaseStudyShell>
  )
}
