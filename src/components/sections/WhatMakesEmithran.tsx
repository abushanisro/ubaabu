import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

const items = [
  { title: 'CAD AND DRAWING INTELLIGENCE', desc: 'Connect geometry, materials, and process assumptions directly to cost models.' },
  { title: 'BOM AND ASSEMBLY COST ROLLUPS', desc: 'Understand cost at the part level, assembly level, and supplier level before production begins.' },
  { title: 'AUTOMATED SHOULD-COST ANALYSIS', desc: 'Traceable cost baselines for negotiation, planning, and decision-making — automatically.' },
  { title: 'MANUFACTURING PROCESS PLANNING', desc: 'Define routes, raw material requirements, tooling, packaging, and production assumptions.' },
  { title: 'SUPPLIER EVALUATION AND NOMINATION', desc: 'Compare quotes against should-cost. Nominate vendors with stronger evidence.' },
  { title: 'PRODUCTION, QUALITY, AND DELIVERY', desc: 'Manage production lots, quality checkpoints, inspections, and delivery tracking in one platform.' },
  { title: 'REAL-TIME ANALYTICS AND REPORTING', desc: 'Programme cost, supplier performance, production status, and delivery risk — live.' },
  { title: 'NATURAL LANGUAGE OPERATIONS', desc: 'Ask questions in plain English. Get answers from your live manufacturing data in seconds.' },
  { title: 'DATA STAYS IN INDIA', desc: 'On-premise deployment. MoD-compliant architecture. No data leaves your network. Ever.' },
]

export default function WhatMakesEmithran() {
  return (
    <section className="border-t border-border py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <AnimatedSection>
          <SectionLabel>WHAT MAKES EMITHRAN FASTER</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-tight max-w-3xl mb-16">
            End-to-End Manufacturing Platform. Not Just Costing. Not Just ERP.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="border-t border-border pt-6 pb-6 pr-8 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-border lg:!border-r lg:[&:nth-child(3n)]:!border-r-0 lg:pr-8 pl-0 sm:pl-6 first:pl-0"
              >
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-white uppercase mb-2">{it.title}</h3>
                <p className="font-mono text-[13px] text-grey-200 leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
