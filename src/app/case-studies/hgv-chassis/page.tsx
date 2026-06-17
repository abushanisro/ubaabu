import CaseStudyShell, {
  SectionLabel, Card, DarkCard, ImpactGrid, StatRow,
} from '@/components/case-studies/CaseStudyShell'

export const metadata = {
  alternates: { canonical: '/case-studies/hgv-chassis' },
  title: 'Should Costing - HGV Chassis Ladder Frame | Emithran Case Study',
  description: 'How Emithran identified a 38% manufacturing cost reduction for chassis rails by comparing India vs Northern Europe production for an electric HGV OEM.',
}

export default function HGVChassisCaseStudy() {
  return (
    <CaseStudyShell
      slug="hgv-chassis"
      industry="Heavy Vehicles"
      date="May 20, 2026"
      readTime="6 min read"
      metric="âˆ’38% India rail cost"
      title={<>Assy Chassis Ladder Frame<br className="hidden md:block" /> HGV Â· 4Ã—2 Â· 4M</>}
      subtitle="Specialist developer of an Electric Heavy Goods Vehicle - Northern Europe vs India cost comparison across 74 BOM line items"
      image="/assets/casestudy/truck.png"
      imageAlt="HGV Chassis Ladder Frame"
      stats={[
        { label: 'Annual Qty',     value: '1,400 units' },
        { label: 'Finish Weight',  value: '591.8 kg' },
        { label: 'BOM Line Items', value: '74 items' },
        { label: 'Shifts',         value: 'Double' },
        { label: 'Rail Saving',    value: 'âˆ’38% India' },
      ]}
      ctaTitle="Need a should-cost analysis for your chassis or structural assembly?"
      ctaBody="Our engineering team models your assembly from first principles - giving you a cost breakdown you can use to negotiate, source, and design smarter."
      ctaSource="case-study-hgv-chassis"
    >

      {/* Row 1 - Problem + Scope */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card accent>
          <SectionLabel>Problem Statement Â· Business Challenges</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">What needed to be solved</h2>
          <p className="mb-4 text-[14px] leading-relaxed text-[#475569]">
            Assessing the optimal supplier for chassis ladder production in Northern Europe and determining the overall cost effect of producing side rails in India.
          </p>
          <ul className="space-y-3">
            {[
              'Nominating the European main supplier for the chassis ladder assembly',
              'Negotiating the supply price with shortlisted manufacturers',
              'Determining the manufacturing location for chassis rails - India vs Europe - based on cost, quality, and delivery',
            ].map((c, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#475569]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />{c}
              </li>
            ))}
          </ul>
        </Card>

        <Card accent>
          <SectionLabel>Scope of Work</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">What Emithran was tasked to do</h2>
          <ul className="space-y-4 mb-5">
            {[
              'Evaluate the existing design to ascertain the cost of the chassis ladder frame assembly using the should-cost methodology specific to Northern Europe',
              'Estimate the manufacturing costs for chassis rails produced in India',
            ].map((s, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#475569]">
                <span className="mt-0.5 shrink-0 text-[#0d9488] font-bold text-xs">{i + 1}.</span>{s}
              </li>
            ))}
          </ul>
          <div className="border-t border-black/[0.06] pt-5">
            <SectionLabel>Key Aspects</SectionLabel>
            <ul className="space-y-2.5">
              {[
                'Ideal process planning with advanced technology integration',
                'Appropriate machine selection',
                'Precise process parameter determination',
                'Contemporary cost data for materials, machinery, and labour at the manufacturing site',
              ].map((a, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#475569]">
                  <span className="mt-0.5 shrink-0 text-[#0d9488] font-bold text-xs">{i + 1}.</span>{a}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Row 2 - Technical Data + BOM */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <SectionLabel>Technical Data</SectionLabel>
          <div className="divide-y divide-black/[0.05]">
            {[
              { k: 'Annual Quantity',             v: '1,400 units' },
              { k: 'Chassis Ladder Location',      v: 'Northern Europe' },
              { k: 'Rails Estimation Locations',   v: 'Northern Europe & India' },
              { k: 'Number of Shifts',             v: 'Double (assumed)' },
              { k: 'Batch Volume',                 v: '100 (assumed)' },
              { k: 'Finish Weight',                v: '591.8 kg' },
              { k: 'Total Input Weight',           v: '935 kg' },
            ].map(({ k, v }) => <StatRow key={k} label={k} value={v} />)}
          </div>
        </Card>

        <Card>
          <SectionLabel>BOM Breakdown</SectionLabel>
          <div className="divide-y divide-black/[0.05]">
            {[
              { k: 'Total Line Items',  v: '74' },
              { k: 'Total Estimates',   v: '60' },
              { k: 'Child Parts',       v: '42' },
              { k: 'Repeated Items',    v: '14' },
              { k: 'Standard Parts',    v: '11' },
              { k: 'Sub-Assemblies',    v: '8' },
              { k: 'Sub-Sub-Assemblies',v: '5' },
              { k: 'Final Assembly',    v: '1' },
            ].map(({ k, v }) => <StatRow key={k} label={k} value={v} />)}
          </div>
        </Card>
      </div>

      {/* Row 3 - Material Grade Usage */}
      <Card accent>
        <SectionLabel>Material Grade Usage</SectionLabel>
        <h2 className="mb-5 text-[17px] font-bold text-[#0f1b2d]">Input Materials - Total 935 kg</h2>
        <div className="space-y-3">
          {[
            { mat: 'HR Steel 600MC',      kg: 495,  pct: Math.round(495/935*100) },
            { mat: 'HR Steel S460N',      kg: 421,  pct: Math.round(421/935*100) },
            { mat: 'Tube E155 (1.0033)',  kg: 15,   pct: Math.round(15/935*100)  },
            { mat: 'Casting 90-60',       kg: 12,   pct: Math.round(12/935*100)  },
            { mat: 'Aluminium 5251',      kg: 2.36, pct: 1                        },
          ].map((m) => (
            <div key={m.mat}>
              <div className="mb-1 flex justify-between text-[13px]">
                <span className="text-[#475569]">{m.mat}</span>
                <span className="font-semibold text-[#0f1b2d]">{m.kg} kg <span className="text-black/35 font-normal">({m.pct}%)</span></span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/[0.05]">
                <div className="h-1.5 rounded-full bg-[#0d9488]" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 4 - Cost Distribution + Top Drivers */}
      <div>
        <SectionLabel>Cost Analysis - Chassis Ladder Frame</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">Total Assembly Cost: â‚¬5,248.81 Â· Northern Europe</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="mb-5 text-[13px] font-semibold text-[#0f1b2d]">Cost Distribution</p>
            <div className="space-y-4">
              {[
                { label: 'Process Cost',  pct: 63, color: '#0d9488', note: 'Primary cost driver' },
                { label: 'Material Cost', pct: 19, color: '#60a5fa', note: 'Input weight: 935 kg' },
                { label: 'SG&A & Profit', pct: 17, color: '#94a3b8', note: '10% SG&A on mfg + 10% profit on overall' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                      <span className="text-[13px] text-[#475569]">{item.label}</span>
                    </div>
                    <span className="text-[15px] font-bold text-[#0f1b2d]">{item.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-black/[0.05]">
                    <div className="h-2 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                  {item.note && <p className="mt-1 text-[11px] text-black/35">{item.note}</p>}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-5 text-[13px] font-semibold text-[#0f1b2d]">Top 3 Cost Drivers - Child Parts</p>
            <div className="space-y-4">
              {[
                { rank: '01', part: 'Chassis Side LH & RH',             pct: 38, color: '#0d9488' },
                { rank: '02', part: 'Assy Cross Member Rear Suspension', pct: 12, color: '#60a5fa' },
                { rank: '03', part: 'Assy BKT RH FRT Chassis Extension',pct: 10, color: '#94a3b8' },
              ].map((d) => (
                <div key={d.rank}>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="shrink-0 text-[11px] font-bold text-black/30">{d.rank}</span>
                      <span className="text-[13px] text-[#475569]">{d.part}</span>
                    </div>
                    <span className="shrink-0 text-[15px] font-bold text-[#0f1b2d]">{d.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-black/[0.05]">
                    <div className="h-2 rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Row 5 - Region Comparison */}
      <Card accent>
        <SectionLabel>Chassis Side Rail - Region Cost Comparison</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">India vs Northern Europe</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-black/[0.06] bg-[#f8fafb] p-5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-black/35">Northern Europe</p>
            <p className="text-[28px] font-bold text-[#0f1b2d]">Baseline</p>
            <p className="mt-1 text-[13px] text-[#64748b]">SG&A + Profit included</p>
          </div>
          <div className="rounded-xl border border-[#0d9488]/30 bg-[#f0fdfb] p-5 ring-1 ring-[#0d9488]/15">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#0d9488]/70">India Â· Recommended</p>
            <p className="text-[28px] font-bold text-[#0d9488]">âˆ’38%</p>
            <p className="mt-1 text-[13px] text-[#475569]">DDP + SG&A + Profit - cost reduction vs Northern Europe for rails</p>
          </div>
        </div>
      </Card>

      {/* Row 6 - Deliverables */}
      <Card>
        <SectionLabel>Deliverables</SectionLabel>
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            'Should Cost Analysis report for Chassis Ladder and Rails',
            'Identification, analysis, and recommendations for cost drivers and reduction strategies',
            'Documentation of knowledge and lessons learned',
          ].map((d, i) => (
            <li key={i} className="flex gap-3 rounded-xl bg-[#f8fafb] p-4 text-[14px] leading-relaxed text-[#475569]">
              <span className="shrink-0 text-[#0d9488] font-bold">{i + 1}.</span>{d}
            </li>
          ))}
        </ul>
      </Card>

      {/* Row 7 - Impact */}
      <DarkCard>
        <SectionLabel>Value Additions</SectionLabel>
        <h2 className="mb-8 text-[22px] font-bold text-white">What Emithran delivered</h2>
        <ImpactGrid items={[
          { num: '01', title: 'Target Pricing',          desc: 'Established target prices with suppliers for all components within the chassis ladder assembly.' },
          { num: '02', title: 'Negotiation Support',     desc: 'Cost breakdown validated supplier pricing and enabled effective negotiations, facilitating selection of the optimal option.' },
          { num: '03', title: 'Value Engineering',       desc: 'Analysis of major cost drivers guided the client in conducting value engineering for design and cost optimisation.' },
          { num: '04', title: 'Cost Saving Opportunity', desc: '38% reduction in manufacturing costs identified for rails produced in India compared to Northern Europe.' },
        ]} />
      </DarkCard>

    </CaseStudyShell>
  )
}
