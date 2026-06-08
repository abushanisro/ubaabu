import Link from 'next/link'

export const metadata = {
  title: 'Electronics Teardown, PCB Should Costing & VAVE | Emithran Case Study',
  description: 'How Emithran delivered component-level teardown, bare PCB benchmarking, PCBA should costing, and wire harness costing across radar sensors and EV battery management systems.',
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

export default function ElectronicsTeardownCaseStudy() {
  return (
    <main className="bg-[#f8fafb] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[440px] overflow-hidden bg-[#0a0f1a]">
        <img src="/assets/casestudy/case4.png" alt="Electronics PCB teardown" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12">
          <Link href="/#case-studies" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Case Studies
          </Link>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight tracking-tight text-white max-w-[760px]">
            Electronics Teardown,<br />
            <span className="text-[#2dd4bf]">PCB Should Costing & VAVE</span>
          </h1>
          <p className="mt-3 text-[16px] text-white/55 max-w-[560px]">
            Radar sensor, EV BTMS, and wiring harness — full teardown to should cost across India, China, and European manufacturing locations
          </p>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px px-6 md:grid-cols-5 md:px-12">
          {[
            { label: 'Products Analysed', value: '3 assemblies' },
            { label: 'PCB Variants Compared', value: '3 technologies' },
            { label: 'Bare PCB Cost', value: '$3.05 (China)' },
            { label: 'PCBA Should Cost', value: '$65.07 (India)' },
            { label: 'PCB Saving Identified', value: '$19.89 → $8.07' },
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

        {/* Row 1 — Scope + Approach */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionLabel>Scope of Work</SectionLabel>
            <h2 className="mb-4 text-[17px] font-bold text-[#0d1117]">What Emithran delivered</h2>
            <ul className="space-y-3 text-[14px] leading-relaxed text-[#475569]">
              {[
                'Review existing designs of PCB, PCBA, and wiring harness to determine cost drivers using should-cost methodology',
                'Regional costing based on current manufacturing location (India / China / Europe)',
                'Complete physical teardown of assemblies and component-level identification',
                'PCB cross-section analysis via SEM / EDAX microscopy',
                'VAVE idea generation and cost reduction workshops',
                'Lessons learned documentation and knowledge base compilation',
              ].map((s, i) => (
                <li key={i} className="flex gap-2.5"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />{s}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionLabel>Execution Approach — 10-Step Should Cost</SectionLabel>
            <div className="space-y-2">
              {[
                { n: '01', t: 'Setup',     d: 'Work environment, project guidelines, procedures & checklist' },
                { n: '02', t: 'Inputs',    d: 'Gather sufficient inputs from the customer' },
                { n: '03', t: 'Analyse',   d: 'Generate process plan for PCB, PCBA & wiring harness' },
                { n: '04', t: 'Study',     d: 'Study available machines and processes for each operation' },
                { n: '05', t: 'Select',    d: 'Select suitable machines & process parameters' },
                { n: '06', t: 'Calculate', d: 'Calculate process cost, material and machine hour rate' },
                { n: '07', t: 'Identify',  d: 'Identify the major cost drivers' },
                { n: '08', t: 'Report',    d: 'Generate should costing report' },
                { n: '09', t: 'Review',    d: 'Final customer review; summarise & deliver reports' },
                { n: '10', t: 'Output',    d: 'Suggestions for future review; knowledge document' },
              ].map((step) => (
                <div key={step.n} className="flex gap-3 rounded-lg px-3 py-2 hover:bg-black/[0.02]">
                  <span className="shrink-0 text-[11px] font-bold text-[#2dd4bf] w-5">{step.n}</span>
                  <div>
                    <span className="text-[12px] font-semibold text-[#0d1117]">{step.t} — </span>
                    <span className="text-[12px] text-[#64748b]">{step.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2 — Radar Sensor Teardown */}
        <Card>
          <SectionLabel>Case A — Radar Sensor Assembly Teardown</SectionLabel>
          <h2 className="mb-6 text-[17px] font-bold text-[#0d1117]">10-Component Exploded View + PCB Layer Stack Analysis</h2>
          <div className="grid gap-6 md:grid-cols-3">

            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">Assembly Components</p>
              <div className="divide-y divide-black/[0.05]">
                {[
                  { part: 'Radar Sensor Top Cover',  mat: 'ALMg3' },
                  { part: 'Low Frequency PCB',       mat: 'FR4 – 6 Layers' },
                  { part: 'PCB Shielding',           mat: 'AlSi12CU1-fe' },
                  { part: 'Radio Frequency PCB',     mat: 'FR4 – 4 Layers' },
                  { part: 'Radar Sensor Main Casing',mat: 'PBT GF 30' },
                  { part: 'Connector',               mat: '7 Pin' },
                  { part: 'Top Cover Bolt, Sealant, Breather', mat: '—' },
                ].map(({ part, mat }) => (
                  <div key={part} className="flex justify-between py-2 text-[12px]">
                    <span className="text-[#475569]">{part}</span>
                    <span className="font-medium text-[#0d1117]">{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">LF PCB Layer Stack (6L)</p>
              <div className="divide-y divide-black/[0.05]">
                {[
                  { layer: 'Solder Mask Top',  t: '0.010' },
                  { layer: 'Copper Layer 1',   t: '0.072' },
                  { layer: 'Prepreg 1',        t: '0.076' },
                  { layer: 'Copper Layer 2',   t: '0.057' },
                  { layer: 'Core 1',           t: '0.522' },
                  { layer: 'Copper Layer 3–4', t: '0.057–0.053' },
                  { layer: 'Core 2',           t: '0.474' },
                  { layer: 'Copper Layer 5–6', t: '0.051–0.070' },
                  { layer: 'Solder Mask Bot',  t: '0.010' },
                ].map(({ layer, t }) => (
                  <div key={layer} className="flex justify-between py-2 text-[12px]">
                    <span className="text-[#475569]">{layer}</span>
                    <span className="font-medium text-[#0d1117]">{t} mm</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">RF PCB Layer Stack (4L)</p>
              <div className="divide-y divide-black/[0.05] mb-4">
                {[
                  { layer: 'Solder Mask Top', t: '0.010' },
                  { layer: 'Copper Layer 1',  t: '0.063' },
                  { layer: 'Prepreg 1',       t: '0.157' },
                  { layer: 'Copper Layer 2',  t: '0.055' },
                  { layer: 'Core 1',          t: '0.309' },
                  { layer: 'Copper Layer 3',  t: '0.062' },
                  { layer: 'Prepreg 2',       t: '0.342' },
                  { layer: 'Copper Bot',      t: '0.045' },
                  { layer: 'Solder Mask Bot', t: '0.010' },
                ].map(({ layer, t }) => (
                  <div key={layer} className="flex justify-between py-2 text-[12px]">
                    <span className="text-[#475569]">{layer}</span>
                    <span className="font-medium text-[#0d1117]">{t} mm</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-[#f0fdfb] px-3 py-2.5 text-[12px] text-[#0d1117]">
                <span className="font-semibold">Analysis method:</span>
                <span className="text-[#475569]"> PCB cross-section → mould → 1500× SEM imaging → EDAX analysis of Cu foil + coating thickness</span>
              </div>
            </div>

          </div>
        </Card>

        {/* Row 3 — Bare PCB Should Cost + Comparison */}
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">Case B — Bare PCB Should Costing & Benchmarking</p>
          <h2 className="mb-6 text-[20px] font-bold text-[#0d1117]">Main PCB · China · 65,000 units/yr · $3.046 should cost</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="mb-4 text-[13px] font-semibold text-[#0d1117]">Should Cost Breakdown — China Manufacturing</p>
              <div className="space-y-3">
                {[
                  { label: 'Bill of Material Cost', usd: 1.357, pct: 45, color: '#2dd4bf' },
                  { label: 'Process Cost',          usd: 1.011, pct: 33, color: '#60a5fa' },
                  { label: 'SG&A',                  usd: 0.189, pct: 6,  color: '#a78bfa' },
                  { label: 'Margin + Mat. Overhead',usd: 0.141, pct: 5,  color: '#f472b6' },
                  { label: 'Scrap',                 usd: 0.071, pct: 2,  color: '#94a3b8' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }} />
                        <span className="text-[13px] text-[#475569]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-black/30">${item.usd.toFixed(3)}</span>
                        <span className="w-7 text-right text-[13px] font-bold text-[#0d1117]">{item.pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/[0.05]">
                      <div className="h-1.5 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between rounded-xl bg-[#f0fdfb] px-4 py-3">
                <span className="text-[13px] font-semibold text-[#0d1117]">Total Should Cost</span>
                <span className="text-[16px] font-bold text-teal-700">$3.046 / unit</span>
              </div>
            </Card>

            <Card>
              <p className="mb-4 text-[13px] font-semibold text-[#0d1117]">Bare PCB Technology Comparison</p>
              <div className="space-y-3">
                {[
                  { tech: 'FR4 + PTFE', spec: '9L · 2-4b-2 HDI · OSP · 1.5mm',   usdCost: 12.08, eurCost: 10.07, highlight: false },
                  { tech: 'FR4 + PTFE GF', spec: '11L · 2-6b-2 HDI · Im.TIN · 1.65mm', usdCost: 8.07, eurCost: 6.73, highlight: true },
                  { tech: 'FR4 + Ceramic GF', spec: '12L · 2-8b-2 HDI · OSP · 1.9mm', usdCost: 19.89, eurCost: 16.58, highlight: false },
                ].map((v) => (
                  <div key={v.tech} className={`rounded-xl border p-4 ${v.highlight ? 'border-[#2dd4bf]/30 bg-[#f0fdfb] ring-1 ring-[#2dd4bf]/20' : 'border-black/[0.06] bg-[#f8fafb]'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-semibold text-[#0d1117]">{v.tech} {v.highlight && <span className="ml-1.5 rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">Lowest Cost</span>}</p>
                        <p className="mt-0.5 text-[11px] text-black/40">{v.spec}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-[16px] font-bold ${v.highlight ? 'text-teal-700' : 'text-[#0d1117]'}`}>${v.usdCost.toFixed(2)}</p>
                        <p className="text-[11px] text-black/35">€{v.eurCost.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Row 4 — PCBA Should Cost */}
        <Card>
          <SectionLabel>Case C — PCBA Should Costing · EV Battery Management System</SectionLabel>
          <h2 className="mb-6 text-[17px] font-bold text-[#0d1117]">India Manufacturing · Total: $65.074 / unit</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2.5">
              {[
                { label: 'BOM Cost',                   usd: 47.672, pct: 73 },
                { label: 'Profit (10%)',                usd: 5.524,  pct: 8  },
                { label: 'SG&A (5%)',                   usd: 2.762,  pct: 4  },
                { label: 'Conformal Coating',           usd: 1.587,  pct: 2  },
                { label: 'Resin Potting',               usd: 1.468,  pct: 2  },
                { label: 'Solder Paste',                usd: 1.288,  pct: 2  },
                { label: 'Process Cost',                usd: 4.263,  pct: 7  },
                { label: 'Rejection + Setup',           usd: 0.509,  pct: 1  },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-44 shrink-0 text-[12px] text-[#475569]">{item.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-black/[0.05]">
                    <div className="h-1.5 rounded-full bg-[#2dd4bf]" style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="w-14 shrink-0 text-right text-[12px] font-semibold text-[#0d1117]">${item.usd.toFixed(3)}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between rounded-xl bg-[#f0fdfb] px-4 py-3">
                <span className="text-[13px] font-semibold text-[#0d1117]">Total EX-Works</span>
                <span className="text-[16px] font-bold text-teal-700">$65.074 / unit</span>
              </div>
            </div>

            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">PCBA Cycle Time Breakdown</p>
              <div className="space-y-2 mb-5">
                {[
                  { process: 'Testing Process',  sec: 16.97, pct: 25 },
                  { process: 'Depaneling',        sec: 10.99, pct: 16 },
                  { process: 'Manual Process',    sec: 9.89,  pct: 14 },
                  { process: 'TH Process',        sec: 8.30,  pct: 12 },
                  { process: 'SMD Process',       sec: 8.06,  pct: 12 },
                  { process: 'Solder Paste',      sec: 5.23,  pct: 8  },
                  { process: 'Other',             sec: 9.34,  pct: 13 },
                ].map((item) => (
                  <div key={item.process} className="flex items-center gap-2">
                    <span className="w-36 shrink-0 text-[12px] text-[#475569]">{item.process}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-black/[0.05]">
                      <div className="h-1.5 rounded-full bg-[#60a5fa]" style={{ width: `${item.pct}%` }} />
                    </div>
                    <span className="w-12 shrink-0 text-right text-[11px] text-black/40">{item.sec}s</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-[#f8fafb] border border-black/[0.06] px-4 py-3 text-[13px]">
                <span className="font-semibold text-[#0d1117]">Total Product Cycle Time: </span>
                <span className="text-[#475569]">68.78 seconds</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Row 5 — Wire Harness */}
        <Card>
          <SectionLabel>Case D — Wire Harness Should Costing · EV Application</SectionLabel>
          <h2 className="mb-6 text-[17px] font-bold text-[#0d1117]">6-Step Methodology · Multi-Connector Harness</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { step: '01', title: 'Requirement Check',    desc: 'Annual quantity, production plant, Material Master, Assembly Drawing, GQRS' },
              { step: '02', title: 'Drawing Study',         desc: 'Connector specs, wire routing, shielded conductor assemblies, continuity requirements' },
              { step: '03', title: 'Circuit Analysis',      desc: 'From/to connections, terminal/seal identification, GD spec part number search' },
              { step: '04', title: 'Public Sourcing',       desc: 'Connector, terminal & seal costs via Octopart/ciiva; preferred: TE, APTIV, MOLEX' },
              { step: '05', title: 'BOM Creation',          desc: 'Part No, Manufacturer, Class, Qty, Unit Cost, Currency, Source reference link' },
              { step: '06', title: 'Process Calculation',   desc: 'Cavity plug, terminal insertion, crimping, taping, inspection — auto-calculated cycle times' },
            ].map((s) => (
              <div key={s.step} className="rounded-xl bg-[#f8fafb] border border-black/[0.06] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#2dd4bf]">{s.step}</span>
                  <span className="text-[13px] font-semibold text-[#0d1117]">{s.title}</span>
                </div>
                <p className="text-[12px] leading-relaxed text-[#475569]">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-black/[0.06] pt-5">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-black/35">Sample Process Cost Output</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-black/[0.06]">
                    <th className="pb-2 text-left font-semibold text-black/40">Labour Operation</th>
                    <th className="pb-2 text-right font-semibold text-black/40">Parts</th>
                    <th className="pb-2 text-right font-semibold text-black/40">Cycle Time (s)</th>
                    <th className="pb-2 text-right font-semibold text-black/40">Cost (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {[
                    { op: 'Connector Terminal Insertion', n: 215, t: 5,   c: 11.158 },
                    { op: 'Wire Twisting Operations',     n: 13,  t: 60,  c: 9.461  },
                    { op: 'Inspection Time',              n: 1,   t: 600, c: 7.032  },
                    { op: 'Connector Electric Test',      n: 26,  t: 30,  c: 8.270  },
                    { op: 'Connector Placement',          n: 26,  t: 15,  c: 4.135  },
                    { op: 'Machine Terminations',         n: 215, t: 3,   c: 7.678  },
                    { op: 'Taping Operation',             n: 1,   t: 180, c: 2.118  },
                  ].map((row) => (
                    <tr key={row.op}>
                      <td className="py-2 text-[#475569]">{row.op}</td>
                      <td className="py-2 text-right text-[#0d1117]">{row.n}</td>
                      <td className="py-2 text-right text-[#0d1117]">{row.t}s</td>
                      <td className="py-2 text-right font-semibold text-[#0d1117]">${row.c.toFixed(3)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-black/[0.1]">
                    <td colSpan={3} className="pt-2.5 font-semibold text-[#0d1117]">Total Process Cost</td>
                    <td className="pt-2.5 text-right text-[15px] font-bold text-teal-700">$81.838</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Row 6 — Value Additions */}
        <div className="rounded-2xl bg-[#0d1117] p-8 md:p-10">
          <SectionLabel>Emithran Capabilities Demonstrated</SectionLabel>
          <h2 className="mb-8 text-[22px] font-bold text-white">End-to-end electronics cost intelligence</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { icon: '🔬', title: 'Physical Teardown',        desc: 'SEM / EDAX cross-section analysis, 1500× microscopy, Cu foil & coating thickness measurement, PCBA component MPN mapping.' },
              { icon: '📐', title: 'Bare PCB Should Costing',  desc: 'Layer stack modelling, surface finish selection, laminate / prepreg / drill cost build-up for FR4, PTFE, and ceramic hybrid boards.' },
              { icon: '⚡', title: 'PCBA Should Costing',      desc: 'BOM sourcing, SMT + THT + wave solder cycle time estimation, conformal coating, potting, ICT, and EX-Works cost build-up.' },
              { icon: '🔌', title: 'Wire Harness Costing',     desc: 'Circuit analysis, GD-spec sourcing, BOM creation with landed cost, and auto-calculated process cost per operation.' },
            ].map((v) => (
              <div key={v.title} className="flex gap-4 rounded-xl bg-white/[0.05] p-5">
                <span className="shrink-0 text-[22px]">{v.icon}</span>
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
          <h2 className="text-[20px] font-bold text-[#0d1117]">Need PCB teardown, should costing, or VAVE for your electronics?</h2>
          <p className="max-w-[480px] text-[14px] text-[#64748b]">
            Emithran's electronics team covers bare PCB, PCBA, and wire harness — from physical teardown through to supplier negotiation baseline.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a href="/request-demo" className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-85" style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}>
              Request a Demo
            </a>
            <a href="/contact?source=case-study-electronics-teardown&cta=contact-sales" className="rounded-lg border border-black/15 px-5 py-2.5 text-[13px] font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors">
              Contact Sales
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
