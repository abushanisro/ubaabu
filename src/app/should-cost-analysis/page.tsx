import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Should-Cost Analysis Software India | Emithran',
  description:
    "AI-powered should-cost analysis software for India's defence, aerospace, and space OEMs. Bottom-up cost modelling from CAD data. Cut supplier costs by 20-40%. Trusted by Ashok Leyland, TATA Power & Pixxel.",
  keywords: [
    'should cost analysis software india', 'should cost estimation tool',
    'bottom up cost modelling', 'supplier cost analysis india',
    'manufacturing cost estimation software', 'RFQ cost analysis',
    'cost engineering software india', 'should cost analysis defence',
    'aerospace should cost tool', 'procurement cost intelligence',
  ],
  alternates: { canonical: '/should-cost-analysis' },
  openGraph: {
    title: 'Should-Cost Analysis Software India | Emithran',
    description: 'AI-powered should-cost analysis for defence, aerospace, and space OEMs in India. Bottom-up cost modelling from CAD data.',
    url: '/should-cost-analysis',
    type: 'website',
  },
  twitter: {
    title: 'Should-Cost Analysis Software India | Emithran',
    description: "Bottom-up cost modelling from CAD data. Cut supplier costs by 20-40%. Built for India's OEMs.",
  },
}

const features = [
  {
    title: 'CAD-to-Cost in Hours',
    body: 'Upload a CAD file or drawing and get a bottom-up should-cost model within hours, not weeks. Material, process, tooling, and overhead modelled from first principles.',
  },
  {
    title: 'Negotiation-Ready Reports',
    body: 'Walk into supplier negotiations with a line-by-line cost breakdown. Know exactly where a quote is inflated before you sit down at the table.',
  },
  {
    title: 'Multi-Process Coverage',
    body: 'Sheet metal, casting, forging, machining, injection moulding, composites, PCBAs, wire harnesses - all covered in a single platform.',
  },
  {
    title: 'India + Global Benchmarking',
    body: 'Compare India manufacturing cost against Northern Europe, China, or Southeast Asia for any component. Used to identify 38% landed cost savings on HGV chassis rails.',
  },
  {
    title: 'Integrated with BOM',
    body: 'Should-cost models roll up directly into your BOM. See total programme cost in real time as designs change, not after the fact.',
  },
  {
    title: 'Audit Trail Built In',
    body: 'Every assumption, every rate, every source is logged. Cost models are defensible in internal reviews and supplier conversations.',
  },
]

const stats = [
  { value: '40%', label: 'faster RFQ turnaround for engineering teams using Emithran should-cost models' },
  { value: '38%', label: 'landed cost saving identified on HGV chassis rails - India vs Belgium' },
  { value: '1.3m', label: 'GBP annual saving identified for a high-performance automotive OEM on a single exhaust assembly' },
]

export default function ShouldCostAnalysisPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <PageHero
        eyebrow="Should-Cost Analysis - India"
        title="Know what every part should cost before you buy it."
        subtitle="Emithran's Should-Cost Engine builds bottom-up cost models from CAD geometry, material specs, and process routes - giving procurement and cost engineering teams the data to negotiate with suppliers from a position of knowledge, not instinct."
      />

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-[0.95] tracking-tight max-w-3xl mb-16">
            Should-cost analysis built for complex Indian supply chains.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {features.map((f) => (
              <div key={f.title} className="bg-[#0a0a0a] p-8 lg:p-10">
                <h3 className="font-display text-[20px] mb-3" style={{ color: '#2dd4bf' }}>{f.title}</h3>
                <p className="font-mono text-[13px] text-white/60 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Results</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            {stats.map((s) => (
              <div key={s.value}>
                <p className="font-display text-[56px] lg:text-[72px] leading-none tracking-tight" style={{ color: '#2dd4bf' }}>{s.value}</p>
                <p className="font-mono text-[13px] text-white/60 leading-relaxed mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Use cases</SectionLabel>
          <h2 className="font-display text-white text-[36px] lg:text-[48px] leading-[0.95] max-w-2xl mb-10">
            Used across every cost engineering scenario.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[13px] text-white/70">
            {[
              'New programme RFQ - establish target prices before going to market',
              'Supplier negotiation - validate or challenge an existing quote line by line',
              'India vs Global sourcing - quantify the landed-cost delta for any component',
              'VAVE studies - model the cost impact of design or material changes before committing',
              'Cost-down programmes - identify the highest-leverage components in a BOM',
              'Make vs Buy decisions - cost both options on the same assumptions',
            ].map((u) => (
              <div key={u} className="flex gap-3 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2dd4bf]" />
                {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="See a should-cost model built for your part."
        subtitle="Book a programme-specific walkthrough. We sign NDAs before every demo."
      />
    </div>
  )
}