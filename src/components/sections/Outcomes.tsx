import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const items = [
  { num: '01', title: 'REDUCE COSTING TIME', desc: 'Move from manual calculations and scattered spreadsheets to structured should-cost models.' },
  { num: '02', title: 'IMPROVE SUPPLIER DECISIONS', desc: 'Use cost, capability, feasibility, quality, and delivery data to nominate suppliers with confidence.' },
  { num: '03', title: 'ACCELERATE PRODUCT DEVELOPMENT', desc: 'Connect engineering data to manufacturing decisions earlier in the lifecycle.' },
  { num: '04', title: 'STRENGTHEN PROGRAMME CONTROL', desc: 'Track BOM, cost, sourcing, production, quality, and delivery in one platform.' },
  { num: '05', title: 'INCREASE MANUFACTURING CONFIDENCE', desc: 'Give every team one source of truth from design to delivery.' },
]

export default function Outcomes() {
  return (
    <section className="border-t border-border py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection>
          <SectionLabel>MEASURABLE OUTCOMES</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-tight max-w-3xl mb-16">
            Drive Measurable Results Across the Manufacturing Lifecycle
          </h2>

          <div className="grid lg:grid-cols-5 gap-y-10">
            {items.map((it, i) => (
              <div key={i} className="border-l border-border pl-6 pr-4">
                <div className="font-display text-[48px] text-white opacity-[0.15] leading-none mb-4">{it.num}</div>
                <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-white mb-3">{it.title}</h3>
                <p className="font-mono text-[13px] text-grey-200 leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
