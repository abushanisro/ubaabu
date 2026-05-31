import Link from 'next/link'

export const metadata = {
  title: 'HGV CAB Structure Strategy — Should Cost & Decision Matrix | Emithran Case Study',
  description: 'How Emithran supported a hydrogen HGV manufacturer in evaluating six CAB structure solutions across tooling investment, piece cost, mass, and safety status — from proto to 4,000 units/yr.',
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

const solutions = [
  {
    name: 'AP Solution',
    desc: 'Box section tubes + hammer-formed panels (interim material)',
    investment: '£0.85m',
    investNum: 0.85,
    pieceK: '£70K',
    mass: 322,
    safety: 'known',
    status: 'Quoted',
    note: 'Only fully quoted option — lowest tooling investment',
    recommended: false,
  },
  {
    name: 'Current SOP Solution',
    desc: 'Box section tubes + pressed panels in correct material',
    investment: '£4.04m',
    investNum: 4.04,
    pieceK: '£8K',
    mass: 322,
    safety: 'known',
    status: 'Estimate',
    note: 'Only SOP-ready solution with fully known safety status',
    recommended: false,
  },
  {
    name: 'Hybrid Solution',
    desc: 'Mixed material CAB — box section with carbon in place of pressings',
    investment: '£2.8m',
    investNum: 2.8,
    pieceK: '£7K',
    mass: 250,
    safety: 'unknown',
    status: 'Estimate',
    note: 'Good mass reduction at mid-range investment; safety TBD',
    recommended: false,
  },
  {
    name: 'Recycled Carbon Solution',
    desc: 'Carbon tooling, hand layup & vacuum; tooling walk available for volume',
    investment: '£3.2m',
    investNum: 3.2,
    pieceK: '£5K',
    mass: 191,
    safety: 'unknown',
    status: 'Estimate',
    note: 'Best piece cost at scale; same mass as SMC at 40% lower tooling',
    recommended: true,
  },
  {
    name: 'SMC Solution',
    desc: 'Matched pair tooling, pressed carbon fibre SMC panels',
    investment: '£10.6m',
    investNum: 10.6,
    pieceK: '£6K',
    mass: 191,
    safety: 'partial',
    status: 'Initial Costing',
    note: 'Maximum mass reduction; highest investment risk',
    recommended: false,
  },
]

const volumeRamp = [
  { year: "'24", vol: 11,    label: '11 (Proto)' },
  { year: "'25", vol: 8,     label: '8' },
  { year: "'26", vol: 375,   label: '375' },
  { year: "'27", vol: 1087,  label: '1,087' },
  { year: "'28", vol: 2138,  label: '2,138' },
  { year: "'29", vol: 4034,  label: '4,034' },
]
const maxVol = 4034

export default function HGVCabStrategyCaseStudy() {
  return (
    <main className="bg-[#f8fafb] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[440px] overflow-hidden bg-[#0d1117]">
        <img src="/assets/casestudy/case5.png" alt="HGV CAB structure" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12">
          <Link href="/#case-studies" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight tracking-tight text-white max-w-[760px]">
            HGV CAB Structure Strategy<br />
            <span className="text-[#2dd4bf]">Hydrogen Vehicle · 6-Solution Decision Matrix</span>
          </h1>
          <p className="mt-3 text-[16px] text-white/55 max-w-[560px]">
            Leading hydrogen HGV manufacturer — tooling investment, piece cost, mass, and safety benchmarked across six manufacturing approaches from prototype to 4,000 units per year
          </p>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-6 md:grid-cols-5 md:px-12">
          {[
            { label: 'Solutions Evaluated', value: '6 options' },
            { label: 'Investment Range',    value: '£0.85m–£10.6m' },
            { label: 'Piece Cost Range',    value: '£5K–£70K' },
            { label: 'Best Mass',           value: '191 kg' },
            { label: 'Ramp Target (2029)',  value: '4,034 units' },
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

        {/* Row 1 — Context + Volume Ramp */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionLabel>Engagement Context</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">Why this analysis was needed</h2>
            <p className="mb-4 text-[14px] leading-relaxed text-[#475569]">
              A hydrogen HGV manufacturer scaling from prototype builds to full series production needed a structured evaluation of CAB (cab structure) manufacturing options — balancing tooling investment, unit piece cost, vehicle mass, and safety certification readiness across a 6-year ramp.
            </p>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              {[
                'Select the optimal CAB structure solution for series production from 2026',
                'Understand total investment commitment vs piece cost at volume',
                'Quantify mass impact of composite vs steel cab construction',
                'Identify which solutions carry safety certification risk before commitment',
              ].map((c, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />{c}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionLabel>Volume Ramp — Prototype to Series</SectionLabel>
            <h2 className="mb-5 text-[17px] font-bold text-[#0d1117]">Production targets by calendar year</h2>
            <div className="flex items-end gap-2 h-36">
              {volumeRamp.map((v) => (
                <div key={v.year} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-[#0d1117]">{v.label}</span>
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${Math.max((v.vol / maxVol) * 100, 4)}%`,
                      background: v.vol >= 1000 ? 'linear-gradient(to top, oklch(0.55 0.16 185), oklch(0.68 0.13 180))' : 'rgba(45,212,191,0.3)',
                    }}
                  />
                  <span className="text-[11px] text-black/40">{v.year}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-[#f0fdfb] border border-[#2dd4bf]/20 px-4 py-3 text-[13px]">
              <span className="font-semibold text-[#0d1117]">Investment basis: </span>
              <span className="text-[#475569]">£1.2m tooling target + £0.5m additional — evaluated against each solution</span>
            </div>
          </Card>
        </div>

        {/* Row 2 — Decision Matrix Cards */}
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">Decision Matrix — 6 Solutions Compared</p>
          <h2 className="mb-6 text-[20px] font-bold text-[#0d1117]">Investment · Piece Cost · Mass · Safety Status</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <div
                key={s.name}
                className={`rounded-2xl border p-5 shadow-sm ${s.recommended ? 'border-[#2dd4bf]/30 bg-[#f0fdfb] ring-1 ring-[#2dd4bf]/20' : 'border-black/[0.07] bg-white'}`}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-bold text-[#0d1117]">{s.name}</p>
                    <p className="mt-0.5 text-[11px] text-black/40">{s.status}</p>
                  </div>
                  {s.recommended && (
                    <span className="shrink-0 rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">Best Value</span>
                  )}
                </div>
                <p className="mb-4 text-[12px] leading-relaxed text-[#64748b]">{s.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-lg bg-black/[0.03] p-2.5">
                    <p className="text-[10px] text-black/35 mb-0.5">Tooling</p>
                    <p className="text-[14px] font-bold text-[#0d1117]">{s.investment}</p>
                  </div>
                  <div className="rounded-lg bg-black/[0.03] p-2.5">
                    <p className="text-[10px] text-black/35 mb-0.5">Piece Cost</p>
                    <p className="text-[14px] font-bold text-[#0d1117]">{s.pieceK}</p>
                  </div>
                  <div className="rounded-lg bg-black/[0.03] p-2.5">
                    <p className="text-[10px] text-black/35 mb-0.5">CAB Mass</p>
                    <p className={`text-[14px] font-bold ${s.mass === 191 ? 'text-teal-600' : 'text-[#0d1117]'}`}>{s.mass} kg</p>
                  </div>
                  <div className="rounded-lg bg-black/[0.03] p-2.5">
                    <p className="text-[10px] text-black/35 mb-0.5">Safety</p>
                    <p className={`text-[13px] font-bold ${s.safety === 'known' ? 'text-teal-600' : s.safety === 'partial' ? 'text-amber-500' : 'text-red-400'}`}>
                      {s.safety === 'known' ? '✓ Known' : s.safety === 'partial' ? '~ Partial' : '✗ Unknown'}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-black/40 border-t border-black/[0.06] pt-3">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 — Investment vs Mass scatter summary */}
        <Card>
          <SectionLabel>Investment vs Mass — Trade-off Summary</SectionLabel>
          <h2 className="mb-6 text-[17px] font-bold text-[#0d1117]">Cost of lightweighting across six solutions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-black/[0.07]">
                  <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-black/35">Solution</th>
                  <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-black/35">Tooling</th>
                  <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-black/35">Piece Cost</th>
                  <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-black/35">Mass (kg)</th>
                  <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-black/35">Safety</th>
                  <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-black/35">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05]">
                {solutions.map((s) => (
                  <tr key={s.name} className={s.recommended ? 'bg-[#f0fdfb]' : ''}>
                    <td className="py-3 font-semibold text-[#0d1117]">
                      {s.name}
                      {s.recommended && <span className="ml-2 rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">Recommended</span>}
                    </td>
                    <td className="py-3 text-right text-[#475569]">{s.investment}</td>
                    <td className="py-3 text-right text-[#475569]">{s.pieceK}</td>
                    <td className={`py-3 text-right font-semibold ${s.mass === 191 ? 'text-teal-600' : 'text-[#0d1117]'}`}>{s.mass}</td>
                    <td className={`py-3 text-right font-semibold ${s.safety === 'known' ? 'text-teal-600' : s.safety === 'partial' ? 'text-amber-500' : 'text-red-400'}`}>
                      {s.safety === 'known' ? '✓ Known' : s.safety === 'partial' ? '~ Partial' : '✗ Unknown'}
                    </td>
                    <td className="py-3 text-right text-[#94a3b8]">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              { label: 'Lowest tooling risk',      value: 'AP Solution — £0.85m quoted', color: '#60a5fa' },
              { label: 'Best mass at lowest cost', value: 'Recycled Carbon — 191 kg / £3.2m', color: '#2dd4bf' },
              { label: 'Only full-safety + SOP',   value: 'Current SOP Solution', color: '#a78bfa' },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-black/[0.06] bg-[#f8fafb] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: k.color }}>{k.label}</p>
                <p className="text-[13px] font-semibold text-[#0d1117]">{k.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Row 4 — Solution Timeline */}
        <Card>
          <SectionLabel>Solution Timeline — 2024 to 2029+</SectionLabel>
          <h2 className="mb-5 text-[17px] font-bold text-[#0d1117]">When each manufacturing approach enters production</h2>
          <div className="space-y-3">
            {[
              { sol: 'AP Solution',              start: 2024, ramp: 2024, end: 2027, note: 'Bridges proto to SOP; transitions out from 2027', color: '#60a5fa' },
              { sol: 'Current SOP Solution',     start: 2024, ramp: 2024, end: 2029, note: 'Primary SOP solution; runs full programme life', color: '#2dd4bf' },
              { sol: 'SMC Solution',             start: 2024, ramp: 2028, end: 2029, note: 'Enters mid-2024; high volume from 2028', color: '#a78bfa' },
              { sol: 'Recycled Carbon Solution', start: 2024, ramp: 2027, end: 2029, note: 'Tooling walk available; volume ramp from 2027', color: '#f472b6' },
              { sol: 'Hybrid Solution',          start: 2024, ramp: 2027, end: 2029, note: 'Mixed material; volume ramp from 2027', color: '#fb923c' },
            ].map((t) => (
              <div key={t.sol} className="flex items-center gap-4">
                <span className="w-48 shrink-0 text-[12px] font-medium text-[#0d1117]">{t.sol}</span>
                <div className="flex-1 relative h-6 rounded-full bg-black/[0.04] overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-full opacity-80"
                    style={{
                      left: `${((t.start - 2024) / 5) * 100}%`,
                      width: `${((t.end - t.start) / 5) * 100}%`,
                      background: t.color,
                    }}
                  />
                  <div
                    className="absolute top-0 h-full rounded-full"
                    style={{
                      left: `${((t.ramp - 2024) / 5) * 100}%`,
                      width: `${((t.end - t.ramp) / 5) * 100}%`,
                      background: t.color,
                    }}
                  />
                </div>
                <span className="w-56 shrink-0 text-[11px] text-black/40">{t.note}</span>
              </div>
            ))}
            <div className="flex items-center gap-4 pt-1">
              <span className="w-48 shrink-0" />
              <div className="flex-1 flex justify-between text-[10px] text-black/30 px-1">
                {["'24", "'25", "'26", "'27", "'28", "'29"].map(y => <span key={y}>{y}</span>)}
              </div>
            </div>
          </div>
        </Card>

        {/* Row 5 — Value Additions */}
        <div className="rounded-2xl bg-[#0d1117] p-8 md:p-10">
          <SectionLabel>What Emithran Delivered</SectionLabel>
          <h2 className="mb-8 text-[22px] font-bold text-white">Strategic should-cost and sourcing intelligence</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { num: '6',    title: 'Solutions Benchmarked',    desc: 'Full decision matrix covering tooling investment, piece cost, CAB mass, and safety certification status for every candidate.' },
              { num: '£9.8m',title: 'Investment Range Mapped',  desc: 'From £0.85m quoted (AP) to £10.6m initial costing (SMC) — enabling the client to set a realistic budget envelope.' },
              { num: '131kg',title: 'Mass Saving Quantified',   desc: 'Steel-to-composite reduction from 322 kg to 191 kg — directly translating to hydrogen range improvement per vehicle.' },
              { num: '2029', title: 'Volume Ramp Modelled',     desc: 'Proto (11 units) through to 4,034 units — each solution mapped to the year it becomes commercially viable.' },
            ].map((v) => (
              <div key={v.num} className="flex gap-4 rounded-xl bg-white/[0.05] p-5">
                <span className="shrink-0 text-[20px] font-bold text-[#2dd4bf] leading-tight">{v.num}</span>
                <div>
                  <p className="mb-1 text-[13px] font-semibold text-white">{v.title}</p>
                  <p className="text-[13px] leading-relaxed text-white/55">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 6 — CTA */}
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-6 py-10 text-center shadow-sm">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#2dd4bf]">For Enquiry</p>
          <h2 className="text-[20px] font-bold text-[#0d1117]">Evaluating manufacturing strategies for a new vehicle programme?</h2>
          <p className="max-w-[480px] text-[14px] text-[#64748b]">
            Emithran builds decision-ready should-cost models across steel, aluminium, and composite structures — from prototype quotation through to series production investment planning.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a href="#demo" className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-85" style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}>
              Request a Demo
            </a>
            <a href="/contact" className="rounded-lg border border-black/15 px-5 py-2.5 text-[13px] font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors">
              Contact Sales
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
