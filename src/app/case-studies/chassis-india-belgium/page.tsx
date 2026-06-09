import CaseStudyShell, {
  SectionLabel, Card, DarkCard, ImpactGrid, StatRow,
} from '@/components/case-studies/CaseStudyShell'

export const metadata = {
  title: 'Chassis Ladder Frame — India vs Belgium Should Cost | Emithran Case Study',
  description: 'How Emithran identified a 38% total landed cost saving for HGV chassis rails by benchmarking India roll forming against Belgium manufacturing, including full DDP logistics from Chennai to Scotland.',
}

export default function ChassisIndiaBelgiumCaseStudy() {
  return (
    <CaseStudyShell
      slug="chassis-india-belgium"
      industry="Heavy Vehicles"
      date="June 2, 2026"
      readTime="7 min read"
      metric="38% landed cost saving"
      title={<>India vs Belgium:<br className="hidden md:block" /> 38% Landed Cost Saving on HGV Chassis Rails</>}
      subtitle="Hydrogen HGV programme — full should-cost comparison of chassis rail manufacturing in India vs Belgium, including DDP logistics Chennai to Scotland"
      image="/assets/casestudy/truck.png"
      imageAlt="HGV Chassis Ladder Frame"
      stats={[
        { label: 'Annual Quantity', value: '1,312 units' },
        { label: 'Assembly Cost',   value: '€5,248.81' },
        { label: 'Belgium Rail',    value: '€872 / unit' },
        { label: 'India Rail DDP',  value: '€538 / unit' },
        { label: 'Total Saving',    value: '38%' },
      ]}
      ctaTitle="Need a region-to-region should-cost comparison for your structural assembly?"
      ctaBody="Emithran models factory-gate cost in any region plus full DDP logistics — giving you a like-for-like landed cost to negotiate and make sourcing decisions with confidence."
      ctaSource="case-study-chassis-india-belgium"
    >

      {/* Row 1 — Scope & BOM */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card accent>
          <SectionLabel>Scope & Inputs</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">Assy Chassis Ladder Frame · HGV 4×2 4M</h2>
          <div className="divide-y divide-black/[0.05]">
            {[
              { k: 'Part Number',       v: '105000056 Rev B.1' },
              { k: 'Annual Quantity',   v: '1,312 units' },
              { k: 'Batch Volume',      v: '100 (assumed)' },
              { k: 'Shifts',            v: 'Double' },
              { k: 'Finish Weight',     v: '591.80 kg' },
              { k: 'Total Input Weight',v: '945 kg' },
              { k: 'Frame Location',    v: 'Belgium (Ex Works)' },
              { k: 'Rails Location',    v: 'Belgium & India' },
              { k: 'SG&A',             v: '10% on manufacturing cost' },
              { k: 'Profit',            v: '10% on overall cost' },
              { k: 'Rejection Rate',    v: '2% at sub-assembly level' },
            ].map(({ k, v }) => <StatRow key={k} label={k} value={v} />)}
          </div>
        </Card>

        <div className="space-y-5">
          <Card>
            <SectionLabel>BOM Structure</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              {[
                { k: 'Total Line Items',   v: '74' },
                { k: 'Estimates',          v: '60' },
                { k: 'Child Parts',        v: '42' },
                { k: 'Repeated Items',     v: '14' },
                { k: 'Standard Parts',     v: '11' },
                { k: 'Sub-Assemblies',     v: '8' },
                { k: 'Sub-Sub-Assemblies', v: '5' },
                { k: 'Final Assembly',     v: '1' },
              ].map(({ k, v }) => (
                <div key={k} className="rounded-lg bg-[#f8fafb] px-3 py-2.5">
                  <p className="text-[10px] text-black/35">{k}</p>
                  <p className="text-[16px] font-bold text-[#0f1b2d]">{v}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionLabel>Material Grade Usage — 945 kg total</SectionLabel>
            <div className="space-y-2.5">
              {[
                { mat: 'HR Steel 600MC',     kg: 495,  spec: '8 mm',                    pct: 52 },
                { mat: 'HR Steel S460N',     kg: 421,  spec: '4/6/7/8/10 mm',           pct: 45 },
                { mat: 'Tube E155 (1.0033)', kg: 15,   spec: '—',                       pct: 2  },
                { mat: 'Casting 90-60',      kg: 12,   spec: '—',                       pct: 1  },
                { mat: 'Aluminium 5251',     kg: 2.36, spec: '—',                       pct: 1  },
              ].map((m) => (
                <div key={m.mat}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="text-[#475569]">{m.mat} <span className="text-black/30">{m.spec}</span></span>
                    <span className="font-semibold text-[#0f1b2d]">{m.kg} kg</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-black/[0.05]">
                    <div className="h-1.5 rounded-full bg-[#0d9488]" style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2 — Assembly Cost + Process Map */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card accent>
          <SectionLabel>Assembly Cost Breakdown — Belgium · €5,248.81</SectionLabel>
          <div className="space-y-4 mb-5">
            {[
              { label: 'Process Cost',      val: 3327.16, pct: 63, color: '#0d9488' },
              { label: 'Raw Material Cost', val: 1010.70, pct: 19, color: '#60a5fa' },
              { label: 'SG&A + Profit',     val:  910.95, pct: 17, color: '#94a3b8' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                    <span className="text-[13px] text-[#475569]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-black/30">€{item.val.toLocaleString()}</span>
                    <span className="w-7 text-right text-[14px] font-bold text-[#0f1b2d]">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-black/[0.05]">
                  <div className="h-2 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="divide-y divide-black/[0.06] border-t border-black/[0.06] pt-4">
            {[
              { k: 'Total Manufacturing Cost', v: '€4,337.85', bold: false },
              { k: 'SG&A (10%)',               v: '€433.78',   bold: false },
              { k: 'Profit (10%)',              v: '€477.16',   bold: false },
              { k: 'Total Cost / Assembly',     v: '€5,248.81', bold: true  },
            ].map(({ k, v, bold }) => (
              <div key={k} className="flex justify-between py-2 text-[13px]">
                <span className={bold ? 'font-bold text-[#0f1b2d]' : 'text-black/45'}>{k}</span>
                <span className={bold ? 'font-bold text-[#0f1b2d] text-[15px]' : 'font-semibold text-[#0f1b2d]'}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>Process Analysis — Operations Map</SectionLabel>
          <div className="space-y-4">
            {[
              { stage: 'Cutting',      color: '#60a5fa', ops: [{ name: 'Plasma Cutting', n: 22 }, { name: 'Laser Cutting', n: 13 }, { name: 'Pipe Cutting', n: 1 }] },
              { stage: 'Forming',      color: '#a78bfa', ops: [{ name: 'Bending', n: 42 }, { name: 'Turret Punch', n: 17 }, { name: 'Roll Forming', n: 1 }, { name: 'Tube Bending', n: 1 }, { name: 'Casting', n: 1 }] },
              { stage: 'Assembly',     color: '#0d9488', ops: [{ name: 'MIG Welding', n: 9 }, { name: 'TIG Welding', n: 2 }, { name: 'General Assembly', n: 3 }] },
              { stage: 'Post-Process', color: '#fb923c', ops: [{ name: 'CED Coat', n: 17 }, { name: 'Anodizing', n: 2 }, { name: 'Inspection', n: 74 }] },
            ].map((s) => (
              <div key={s.stage}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-black/40">{s.stage}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.ops.map((op) => (
                    <span key={op.name} className="rounded-lg border border-black/[0.07] bg-[#f8fafb] px-2.5 py-1.5 text-[12px]">
                      <span className="text-[#475569]">{op.name}</span>
                      <span className="ml-1.5 font-bold" style={{ color: s.color }}>×{op.n}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3 — Component Cost Breakdown */}
      <Card accent>
        <SectionLabel>Component Cost Breakdown — Top Cost Drivers</SectionLabel>
        <h2 className="mb-5 text-[17px] font-bold text-[#0f1b2d]">Chassis Side Rails account for 38% of total assembly cost</h2>
        <div className="space-y-2">
          {[
            { part: 'Chassis Side Rail LH',                        cost: 737.92, pct: 19 },
            { part: 'Chassis Side Rail RH',                        cost: 735.33, pct: 19 },
            { part: 'Assembly Cross Member Rear Suspension',        cost: 473.49, pct: 12 },
            { part: 'Assy Bracket Front Chassis Extension — LH',   cost: 392.36, pct: 10 },
            { part: 'Assy Bracket Front Chassis Extension — RH',   cost: 388.49, pct: 10 },
            { part: 'Assembly Cross Member Air Bellows',            cost: 304.42, pct: 8  },
            { part: 'Assembly Cross Member H2 Cylinder',           cost: 292.17, pct: 8  },
            { part: 'Assembly Cross Member Bulkhead',              cost: 171.15, pct: 4  },
            { part: 'Flitch LH & RH',                             cost: 117.60, pct: 3  },
            { part: 'Assy Cross Member FRT Chassis Extension',     cost:  68.66, pct: 2  },
            { part: 'Assy Bracket Support Side Structure LH & RH', cost:  59.14, pct: 2  },
            { part: 'Cross Member Rear End Closing',               cost:  52.40, pct: 1  },
            { part: 'BOP Parts',                                   cost:  52.06, pct: 1  },
          ].map((item) => (
            <div key={item.part} className="flex items-center gap-3">
              <span className="w-full min-w-0 flex-1 truncate text-[12px] text-[#475569] sm:w-72 sm:flex-none">{item.part}</span>
              <div className="flex-1 h-1.5 rounded-full bg-black/[0.05]">
                <div className="h-1.5 rounded-full bg-[#0d9488]" style={{ width: `${item.pct * 5}%` }} />
              </div>
              <span className="w-16 shrink-0 text-right text-[12px] text-black/40">€{item.cost.toFixed(2)}</span>
              <span className="w-8 shrink-0 text-right text-[13px] font-bold text-[#0f1b2d]">{item.pct}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 4 — India Rail Cost + DDP */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card accent>
          <SectionLabel>Chassis Side Rail — India Should Cost</SectionLabel>
          <h2 className="mb-1 text-[17px] font-bold text-[#0f1b2d]">€396.73 Ex Works · Roll Forming Process</h2>
          <p className="mb-4 text-[12px] text-black/40">Part 105002654/55 · 156.5 kg finish · 247.28 kg input</p>
          <div className="space-y-3 mb-5">
            {[
              { label: 'Raw Material Cost', val: '€222.55', pct: 56, color: '#0d9488',  note: 'Primary driver — 56% of manufacturing' },
              { label: 'SG&A + Profit',     val: '€68.85',  pct: 27, color: '#94a3b8', note: 'Higher share due to lower process base' },
              { label: 'Process Cost',      val: '€105.33', pct: 17, color: '#60a5fa', note: 'Only 6% of mfg cost — roll forming efficiency' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }} />
                    <span className="text-[13px] text-[#475569]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-black/30">{item.val}</span>
                    <span className="w-7 text-right text-[13px] font-bold text-[#0f1b2d]">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/[0.05]">
                  <div className="h-1.5 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
                <p className="mt-0.5 text-[10px] text-black/30">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-[#f8fafb] border border-black/[0.06] px-4 py-3 divide-y divide-black/[0.06]">
            {[
              { k: 'Total Manufacturing Cost', v: '€327.88', bold: false },
              { k: 'SG&A (10%)',               v: '€32.79',  bold: false },
              { k: 'Profit (10%)',              v: '€36.07',  bold: false },
              { k: 'Ex Works Cost / Piece',     v: '€396.73', bold: true  },
            ].map(({ k, v, bold }) => (
              <div key={k} className="flex justify-between py-2 text-[12px]">
                <span className={bold ? 'font-semibold text-[#0f1b2d]' : 'text-black/40'}>{k}</span>
                <span className={bold ? 'font-bold text-[#0f1b2d]' : 'font-medium text-[#0f1b2d]'}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>DDP Cost — Chennai → Scotland</SectionLabel>
          <h2 className="mb-4 text-[17px] font-bold text-[#0f1b2d]">€141.50 per unit delivered</h2>
          <div className="mb-4 grid grid-cols-2 gap-2 text-[12px]">
            {[
              { k: 'Ship From',     v: 'Chennai Port' },
              { k: 'Deliver To',    v: 'Grangemouth, Scotland' },
              { k: 'Mode',          v: 'Sea Freight (DDP)' },
              { k: 'Batch Qty',     v: '100 (LH-50 + RH-50)' },
              { k: 'Part Dims',     v: '6,269 × 287 × 80 mm' },
              { k: 'Weight / Part', v: '157 kg' },
              { k: 'CBM / Pallet',  v: '2.77 CBM' },
              { k: 'Rate',          v: '€613 / CBM' },
            ].map(({ k, v }) => (
              <div key={k} className="rounded-lg bg-[#f8fafb] border border-black/[0.05] px-2.5 py-2">
                <p className="text-[10px] text-black/35">{k}</p>
                <p className="text-[12px] font-semibold text-[#0f1b2d]">{v}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 divide-y divide-black/[0.04]">
            {[
              { k: 'Packing Cost',              v: '€204.78 / shipment' },
              { k: 'Local Transport (India)',    v: '€163.83' },
              { k: 'IHC / THC Charges',         v: '€66.18' },
              { k: 'Sea Freight',               v: '€49.82 (18 €/CBM)' },
              { k: 'Import Duties',             v: '€118.80' },
              { k: 'Local Delivery (Scotland)', v: '€725.00' },
              { k: 'DDP Handling + Insurance',  v: '€348.33' },
            ].map(({ k, v }) => (
              <div key={k} className="flex justify-between py-1 text-[12px]">
                <span className="text-black/45">{k}</span>
                <span className="font-medium text-[#0f1b2d]">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between rounded-xl bg-[#f0fdfb] border border-[#0d9488]/20 px-4 py-3">
            <span className="text-[13px] font-semibold text-[#0f1b2d]">Total DDP Cost / Unit</span>
            <span className="text-[16px] font-bold text-[#0d9488]">€141.50</span>
          </div>
        </Card>
      </div>

      {/* Row 5 — Belgium vs India Comparison */}
      <div>
        <SectionLabel>Chassis Side Rail — Belgium vs India Head-to-Head</SectionLabel>
        <h2 className="mb-6 text-xl font-bold text-[#0f1b2d]">India total landed cost: €538 vs Belgium: €872</h2>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-black/35">Belgium</p>
            <p className="text-[32px] font-bold text-[#0f1b2d]">€872</p>
            <p className="mb-4 text-[12px] text-black/40">Ex Works · SG&A + Profit only</p>
            <div className="space-y-2 text-[13px]">
              {[
                { k: 'Raw Material', v: '€267' },
                { k: 'Process Cost', v: '€454' },
                { k: 'SG&A + Profit',v: '€151' },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between border-b border-black/[0.05] pb-1">
                  <span className="text-black/45">{k}</span>
                  <span className="font-semibold text-[#0f1b2d]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#0d9488]/30 bg-[#f0fdfb] p-6 shadow-sm ring-1 ring-[#0d9488]/15">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#0d9488]/70">India DDP · Recommended</p>
            <p className="text-[32px] font-bold text-[#0d9488]">€538</p>
            <p className="mb-4 text-[12px] text-black/40">DDP Scotland · Includes full logistics</p>
            <div className="space-y-2 text-[13px]">
              {[
                { k: 'Raw Material', v: '€223', delta: '−17% vs Belgium' },
                { k: 'Process Cost', v: '€105', delta: '−77% vs Belgium' },
                { k: 'DDP + SG&A',  v: '€210', delta: '+39% (logistics overhead)' },
              ].map(({ k, v, delta }) => (
                <div key={k} className="flex justify-between border-b border-[#0d9488]/10 pb-1">
                  <span className="text-black/45">{k}</span>
                  <div className="text-right">
                    <span className="font-semibold text-[#0f1b2d]">{v}</span>
                    <span className="ml-2 text-[10px] text-black/30">{delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card>
          <p className="mb-4 text-[13px] font-semibold text-[#0f1b2d]">Cost advantage breakdown</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Process cost saving',    pct: '−77%', desc: 'Roll forming in India vs fabrication in Belgium — the single biggest driver of total savings', color: '#0d9488' },
              { label: 'Material cost saving',   pct: '−17%', desc: 'Lower raw material rates in India despite same grades (HR 600MC, S460N)', color: '#60a5fa' },
              { label: 'DDP logistics overhead', pct: '+39%', desc: 'Sea freight, import duties, and last-mile delivery from Chennai to Scotland — partially offsets savings', color: '#f87171' },
            ].map((k) => (
              <div key={k.label} className="rounded-xl bg-[#f8fafb] border border-black/[0.06] p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/35 mb-1">{k.label}</p>
                <p className="text-[24px] font-bold mb-2" style={{ color: k.color }}>{k.pct}</p>
                <p className="text-[12px] leading-relaxed text-[#475569]">{k.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 6 — Impact */}
      <DarkCard>
        <SectionLabel>What Emithran Delivered</SectionLabel>
        <h2 className="mb-8 text-[22px] font-bold text-white">End-to-end should cost from factory gate to customer dock</h2>
        <ImpactGrid items={[
          { num: '38%',    title: 'Total Landed Cost Saving',   desc: 'India DDP (€538) vs Belgium Ex Works (€872) — despite full sea freight, import duties, and last-mile delivery.' },
          { num: '−77%',   title: 'Process Cost Reduction',     desc: 'Roll forming in India is dramatically more efficient than Belgium fabrication for this chassis rail profile.' },
          { num: '€141',   title: 'DDP Fully Modelled',         desc: 'Packing, local freight, sea freight, IHC/THC, insurance, import duty, and door delivery to Scotland all costed.' },
          { num: '13 pts', title: 'Component-Level Visibility', desc: '13 child components individually costed — chassis side rails (38%), cross members, and brackets all quantified.' },
        ]} />
      </DarkCard>

    </CaseStudyShell>
  )
}
