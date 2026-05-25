import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

function CADtoCostVisual() {
  const rows = [
    ['BRACKET-A12', 'Ti-6Al-4V', '\u20B984,200'],
    ['HOUSING-7B', 'Al 7075-T6', '\u20B936,800'],
    ['SHAFT-COMP', 'INCONEL 718', '\u20B9112,400'],
  ]
  return (
    <div className="border border-border bg-grey-600 p-6 font-mono text-xs">
      <div className="grid grid-cols-3 border-b border-border pb-2 mb-3 text-[10px] tracking-widest text-grey-300">
        <span>PART</span><span>MATERIAL</span><span>COST</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-3 py-2.5 border-b border-border last:border-0 text-[11px]">
          <span className="text-white">{r[0]}</span>
          <span className="text-grey-200">{r[1]}</span>
          <span className="text-grey-300">{r[2]}</span>
        </div>
      ))}
    </div>
  )
}

function ShouldCostVisual() {
  const rows = [
    { label: 'TARGET', bar: '████░░░░░░', value: '\u20B92.4Cr' },
    { label: 'SHOULD COST', bar: '██████░░░░', value: '\u20B91.9Cr' },
    { label: 'GAP', bar: '██░░░░░░░░', value: '-\u20B90.5Cr' },
  ]
  return (
    <div className="border border-border bg-grey-600 p-6 font-mono text-xs">
      <div className="text-[10px] tracking-widest text-grey-300 mb-4">COST COMPARISON</div>
      <div className="flex flex-col gap-4">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest text-grey-200 w-32">{r.label}</span>
            <span className="text-grey-300 text-[12px] flex-1">{r.bar}</span>
            <span className="text-white text-[12px] w-20 text-right">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessPlanningVisual() {
  const steps = ['DESIGN RELEASE', 'ROUTE DEFINITION', 'COST LOCK', 'PRODUCTION']
  return (
    <div className="border border-border bg-grey-600 p-6 font-mono text-xs">
      <div className="text-[10px] tracking-widest text-grey-300 mb-6">PROCESS FLOW</div>
      <div className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-grey-400 text-[10px] w-6">0{i+1}</span>
            <span className="text-white text-[12px] tracking-widest">{s}</span>
            {i < steps.length - 1 && <span className="text-grey-300 ml-auto">↓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function SupplierVisual() {
  const rows = [
    ['BHARAT FORGE', '\u20B92.1Cr', '\u20B91.9Cr', '92'],
    ['L&T DEFENCE', '\u20B92.4Cr', '\u20B91.9Cr', '88'],
    ['MTAR TECH', '\u20B91.95Cr', '\u20B91.9Cr', '95'],
  ]
  return (
    <div className="border border-border bg-grey-600 p-6 font-mono text-xs overflow-x-auto">
      <div className="grid grid-cols-4 border-b border-border pb-2 mb-3 text-[10px] tracking-widest text-grey-300 min-w-[420px]">
        <span>SUPPLIER</span><span>QUOTE</span><span>SHOULD-COST</span><span>SCORE</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-4 py-2.5 border-b border-border last:border-0 text-[11px] min-w-[420px]">
          <span className="text-white">{r[0]}</span>
          <span className="text-grey-200">{r[1]}</span>
          <span className="text-grey-300">{r[2]}</span>
          <span className="text-white">{r[3]}</span>
        </div>
      ))}
    </div>
  )
}

function DeliveryVisual() {
  const nodes = ['SOURCING', 'PRODUCTION', 'QUALITY', 'INSPECTION', 'DELIVERY']
  return (
    <div className="border border-border bg-grey-600 p-6 font-mono text-xs">
      <div className="text-[10px] tracking-widest text-grey-300 mb-6">EXECUTION TIMELINE</div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <span className="text-white text-[10px]">●</span>
            <span className="text-grey-200 text-[10px] tracking-widest">{n}</span>
            {i < nodes.length - 1 && <span className="text-grey-400">──</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const features = [
  {
    num: '01',
    label: 'CAD TO COST INTELLIGENCE',
    headline: 'Convert Engineering Inputs into Actionable Manufacturing Cost Insights',
    body: 'Emithran connects CAD files, drawings, part data, and BOM structures to cost models and process plans. Teams can understand cost at the part level, assembly level, and supplier level before production begins.',
    bullets: [
      'Estimate cost earlier in product development',
      'Identify cost drivers before sourcing',
      'Connect geometry, material, process, and supplier assumptions',
      'Reduce manual cost calculation effort',
    ],
    Visual: CADtoCostVisual,
  },
  {
    num: '02',
    label: 'SHOULD COST ANALYSIS',
    headline: 'Create Faster and More Reliable Cost Models for Complex Manufacturing Parts',
    body: 'Emithran calculates should-cost using raw material cost, machine hour rates, process steps, tooling, scrap, packaging, logistics, and supplier assumptions. This gives teams a traceable baseline for negotiation, planning, and decision-making.',
    bullets: [
      'Reduce manual Excel costing',
      'Compare target price vs should-cost',
      'Find cost gaps before supplier negotiation',
      'Support make-vs-buy decisions',
      'Improve cost transparency across programmes',
    ],
    Visual: ShouldCostVisual,
  },
  {
    num: '03',
    label: 'PROCESS PLANNING',
    headline: 'Move Beyond Estimates into Practical Production Planning',
    body: 'Emithran helps teams define manufacturing routes, raw material requirements, tooling, operations, packaging, logistics, and production assumptions. Every cost estimate becomes connected to how the part will actually be made.',
    bullets: [
      'Standardize manufacturing routes',
      'Compare alternate process plans',
      'Improve production readiness',
      'Reduce late-stage manufacturing surprises',
      'Connect costing with execution',
    ],
    Visual: ProcessPlanningVisual,
  },
  {
    num: '04',
    label: 'SUPPLIER INTELLIGENCE',
    headline: 'Choose the Right Supplier with Confidence',
    body: 'Emithran supports supplier evaluation, RFQ analysis, capability mapping, cost comparison, technical feasibility review, and weighted supplier nomination. Procurement teams can compare supplier quotes against should-cost and nominate vendors with stronger evidence.',
    bullets: [
      'Shortlist capable suppliers faster',
      'Improve negotiation confidence',
      'Compare quotes against internal cost models',
      'Reduce supplier risk',
      'Build a reliable vendor intelligence base',
    ],
    Visual: SupplierVisual,
  },
  {
    num: '05',
    label: 'PRODUCTION · QUALITY · DELIVERY',
    headline: 'Emithran Continues After Sourcing',
    body: 'Manage production lots, vendor assignments, ISIR/FIA sample submissions, PPAP workflows, quality checkpoints, inspections, packing, logistics, and delivery tracking from the same manufacturing record.',
    bullets: [
      'Track production progress',
      'Improve sample approval workflows',
      'Connect quality data with part and supplier records',
      'Monitor delivery readiness',
      'Reduce handoff gaps between teams',
    ],
    Visual: DeliveryVisual,
  },
]

export default function Features() {
  return (
    <section>
      {features.map((f, idx) => {
        const reverse = idx % 2 === 1
        const Visual = f.Visual
        return (
          <div key={f.num} className="py-24 lg:py-32 border-t border-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}>
                <AnimatedSection delay={0}>
                  <div className="relative">
                    <span aria-hidden className="font-display text-[80px] leading-none text-white opacity-[0.06] absolute -top-6 -left-1 pointer-events-none select-none">
                      {f.num}
                    </span>
                    <div className="relative">
                      <SectionLabel>{f.label}</SectionLabel>
                      <h3 className="font-display text-white text-[32px] lg:text-[44px] leading-tight mb-6">
                        {f.headline}
                      </h3>
                      <p className="font-mono text-[14px] text-grey-200 leading-relaxed mb-6 max-w-xl">
                        {f.body}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {f.bullets.map((b, i) => (
                          <li key={i} className="font-mono text-[13px] text-grey-300 leading-relaxed">
                            — {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <Visual />
                </AnimatedSection>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
