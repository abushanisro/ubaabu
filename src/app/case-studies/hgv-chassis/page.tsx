import Link from 'next/link'

export const metadata = {
  title: 'Should Costing — HGV Chassis Ladder Frame | Emithran Case Study',
  description: 'How Emithran identified a 38% manufacturing cost reduction for chassis rails by comparing India vs Northern Europe production for an electric HGV OEM.',
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

export default function HGVChassisCaseStudy() {
  return (
    <main className="bg-[#f8fafb] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[440px] overflow-hidden bg-[#0d1117]">
        <img src="/assets/casestudy/truck.png" alt="HGV Chassis Ladder Frame" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12">
          <Link href="/#case-studies" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight tracking-tight text-white max-w-[760px]">
            Assy Chassis Ladder Frame<br />
            <span className="text-[#2dd4bf]">HGV · 4×2 · 4M</span>
          </h1>
          <p className="mt-3 text-[16px] text-white/55 max-w-[520px]">
            Specialist developer of an Electric Heavy Goods Vehicle — Northern Europe vs India cost comparison
          </p>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-6 md:grid-cols-5 md:px-12">
          {[
            { label: 'Annual Qty',    value: '1,400 units' },
            { label: 'Finish Weight', value: '591.8 kg' },
            { label: 'BOM Line Items',value: '74 items' },
            { label: 'Shifts',        value: 'Double' },
            { label: 'Rail Saving',   value: '−38% India' },
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

        {/* Row 1 — Problem + Scope */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionLabel>Problem Statement · Business Challenges</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">What needed to be solved</h2>
            <p className="mb-4 text-[14px] leading-relaxed text-[#475569]">
              Assessing the optimal supplier for chassis ladder production in Northern Europe and determining the overall cost effect of producing side rails in India.
            </p>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              {[
                'Nominating the European main supplier for the chassis ladder assembly',
                'Negotiating the supply price with shortlisted manufacturers',
                'Determining the manufacturing location for chassis rails — India vs Europe — based on cost, quality, and delivery',
              ].map((c, i) => (
                <li key={i} className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />{c}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionLabel>Scope of Work</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">What Emithran was tasked to do</h2>
            <ul className="space-y-4 text-[14px] leading-relaxed text-[#475569]">
              {[
                'Evaluate the existing design to ascertain the cost of the chassis ladder frame assembly using the should-cost methodology specific to Northern Europe',
                'Estimate the manufacturing costs for chassis rails produced in India',
              ].map((s, i) => (
                <li key={i} className="flex gap-2.5"><span className="mt-0.5 shrink-0 text-[#2dd4bf] font-bold text-xs">{i + 1}.</span>{s}</li>
              ))}
            </ul>
            <div className="mt-6 border-t border-black/[0.06] pt-5">
              <SectionLabel>Key Aspects</SectionLabel>
              <ul className="space-y-2.5 text-[14px] leading-relaxed text-[#475569]">
                {[
                  'Ideal process planning with advanced technology integration',
                  'Appropriate machine selection',
                  'Precise process parameter determination',
                  'Contemporary cost data for materials, machinery, and labour at the manufacturing site',
                ].map((a, i) => (
                  <li key={i} className="flex gap-2.5"><span className="mt-0.5 shrink-0 text-[#2dd4bf] font-bold text-xs">{i + 1}.</span>{a}</li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Row 2 — Technical Data + BOM */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionLabel>Technical Data</SectionLabel>
            <div className="divide-y divide-black/[0.06]">
              {[
                { k: 'Annual Quantity',                    v: '1,400 units' },
                { k: 'Chassis Ladder Location',            v: 'Northern Europe' },
                { k: 'Rails Estimation Locations',         v: 'Northern Europe & India' },
                { k: 'Number of Shifts',                   v: 'Double (assumed)' },
                { k: 'Batch Volume',                       v: '100 (assumed)' },
                { k: 'Finish Weight',                      v: '591.8 kg' },
                { k: 'Total Input Weight',                 v: '935 kg' },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between py-2.5 text-[13px]">
                  <span className="text-black/45">{k}</span>
                  <span className="font-semibold text-[#0d1117]">{v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionLabel>BOM Breakdown</SectionLabel>
            <div className="mb-5 divide-y divide-black/[0.06]">
              {[
                { k: 'Total Line Items',      v: '74' },
                { k: 'Total Estimates',        v: '60' },
                { k: 'Child Parts',            v: '42' },
                { k: 'Repeated Items',         v: '14' },
                { k: 'Standard Parts',         v: '11' },
                { k: 'Sub-Assemblies',         v: '8' },
                { k: 'Sub-Sub-Assemblies',     v: '5' },
                { k: 'Final Assembly',         v: '1' },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between py-2.5 text-[13px]">
                  <span className="text-black/45">{k}</span>
                  <span className="font-semibold text-[#0d1117]">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 3 — Material Grade Usage */}
        <Card>
          <SectionLabel>Material Grade Usage</SectionLabel>
          <h2 className="mb-5 text-[17px] font-bold text-[#0d1117]">Input Materials — Total 935 kg</h2>
          <div className="space-y-3">
            {[
              { mat: 'HR Steel 600MC',      kg: 495, pct: Math.round(495/935*100) },
              { mat: 'HR Steel S460N',      kg: 421, pct: Math.round(421/935*100) },
              { mat: 'Tube E155 (1.0033)',  kg: 15,  pct: Math.round(15/935*100)  },
              { mat: 'Casting 90-60',       kg: 12,  pct: Math.round(12/935*100)  },
              { mat: 'Aluminium 5251',      kg: 2.36,pct: 1                        },
            ].map((m) => (
              <div key={m.mat}>
                <div className="mb-1 flex justify-between text-[13px]">
                  <span className="text-[#475569]">{m.mat}</span>
                  <span className="font-semibold text-[#0d1117]">{m.kg} kg&nbsp;<span className="text-black/35 font-normal">({m.pct}%)</span></span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/[0.05]">
                  <div className="h-1.5 rounded-full bg-[#2dd4bf]" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Row 4 — Cost Breakup + Major Cost Drivers */}
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">Cost Analysis — Chassis Ladder Frame</p>
          <h2 className="mb-6 text-[20px] font-bold text-[#0d1117]">Total Assembly Cost: €5,248.81 &nbsp;·&nbsp; Northern Europe</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="mb-5 text-[13px] font-semibold text-[#0d1117]">Cost Distribution</p>
              <div className="space-y-4">
                {[
                  { label: 'Process Cost',   pct: 63, color: '#2dd4bf', note: 'Primary cost driver' },
                  { label: 'Material Cost',  pct: 19, color: '#60a5fa', note: 'Input weight: 935 kg' },
                  { label: 'SG&A & Profit',  pct: 17, color: '#94a3b8', note: '10% SG&A on mfg + 10% profit on overall' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                        <span className="text-[13px] text-[#475569]">{item.label}</span>
                      </div>
                      <span className="text-[15px] font-bold text-[#0d1117]">{item.pct}%</span>
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
              <p className="mb-5 text-[13px] font-semibold text-[#0d1117]">Top 3 Cost Drivers — Child Parts</p>
              <div className="space-y-4">
                {[
                  { rank: '01', part: 'Chassis Side LH & RH',                pct: 38, color: '#2dd4bf' },
                  { rank: '02', part: 'Assy Cross Member Rear Suspension',    pct: 12, color: '#60a5fa' },
                  { rank: '03', part: 'Assy BKT RH FRT Chassis Extension',   pct: 10, color: '#94a3b8' },
                ].map((d) => (
                  <div key={d.rank}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0 text-[11px] font-bold text-black/30">{d.rank}</span>
                        <span className="text-[13px] text-[#475569]">{d.part}</span>
                      </div>
                      <span className="shrink-0 text-[15px] font-bold text-[#0d1117]">{d.pct}%</span>
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

        {/* Row 5 — Region Comparison */}
        <div className="rounded-2xl border border-black/[0.07] bg-white p-8 shadow-sm">
          <SectionLabel>Chassis Side Rail — Region Cost Comparison</SectionLabel>
          <h2 className="mb-6 text-[20px] font-bold text-[#0d1117]">India vs Northern Europe</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-black/[0.06] bg-[#f8fafb] p-5">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-black/35">Northern Europe</p>
              <p className="text-[28px] font-bold text-[#0d1117]">Baseline</p>
              <p className="mt-1 text-[13px] text-[#64748b]">SG&A + Profit included</p>
            </div>
            <div className="rounded-xl border border-[#2dd4bf]/30 bg-[#f0fdfb] p-5 ring-1 ring-[#2dd4bf]/20">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#2dd4bf]/70">India · Recommended</p>
              <p className="text-[28px] font-bold text-teal-700">−38%</p>
              <p className="mt-1 text-[13px] text-[#475569]">DDP + SG&A + Profit — cost reduction vs Northern Europe for rails</p>
            </div>
          </div>
        </div>

        {/* Row 6 — Deliverables */}
        <Card>
          <SectionLabel>Deliverables</SectionLabel>
          <ul className="grid gap-4 md:grid-cols-3">
            {[
              'Should Cost Analysis report for Chassis Ladder and Rails',
              'Identification, analysis, and recommendations for cost drivers and reduction strategies',
              'Documentation of knowledge and lessons learned',
            ].map((d, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-[#f8fafb] p-4 text-[14px] leading-relaxed text-[#475569]">
                <span className="shrink-0 text-[#2dd4bf] font-bold">{i + 1}.</span>{d}
              </li>
            ))}
          </ul>
        </Card>

        {/* Row 7 — Value Additions */}
        <div className="rounded-2xl bg-[#0d1117] p-8 md:p-10">
          <SectionLabel>Value Additions</SectionLabel>
          <h2 className="mb-8 text-[22px] font-bold text-white">What Emithran delivered</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { num: '01', title: 'Target Pricing',         desc: 'Established target prices with suppliers for all components within the chassis ladder assembly.' },
              { num: '02', title: 'Negotiation Support',    desc: 'Cost breakdown validated supplier pricing and enabled effective negotiations, facilitating selection of the optimal option.' },
              { num: '03', title: 'Value Engineering',      desc: 'Analysis of major cost drivers guided the client in conducting value engineering for design and cost optimisation.' },
              { num: '04', title: 'Cost Saving Opportunity',desc: '38% reduction in manufacturing costs identified for rails produced in India compared to Northern Europe.' },
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

        {/* Row 8 — CTA */}
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-6 py-10 text-center shadow-sm">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#2dd4bf]">For Enquiry</p>
          <h2 className="text-[20px] font-bold text-[#0d1117]">Need a should-cost analysis for your chassis or structural assembly?</h2>
          <p className="max-w-[480px] text-[14px] text-[#64748b]">
            Our engineering team models your assembly from first principles — giving you a cost breakdown you can use to negotiate, source, and design smarter.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a
              href="#demo"
              className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Request a Demo
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-black/15 px-5 py-2.5 text-[13px] font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
