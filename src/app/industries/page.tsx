import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import SectionLabel from '@/components/ui/SectionLabel'
import { Rocket, Shield, Plane, Cog } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Industry {
  Icon: LucideIcon
  n: string
  name: string
  headline: string
  desc: string
  bullets: string[]
}

const industries: Industry[] = [
  {
    Icon: Rocket,
    n: '01',
    name: 'SPACE & SATELLITE HARDWARE',
    headline: 'Mission-critical parts. Zero margin for error.',
    desc: 'Satellite buses, payload structures, propulsion components, ground systems. Tight tolerances, exotic materials, multi-tier supply chains — connected and traceable.',
    bullets: ['Programme-level cost & schedule control', 'Tier-1 / Tier-2 supplier intelligence', 'Inspection and PPAP workflows', 'Materials traceability for space-grade'],
  },
  {
    Icon: Shield,
    n: '02',
    name: 'DEFENCE EQUIPMENT MANUFACTURING',
    headline: 'MoD-compliant. India-resident. Built for Atmanirbhar Bharat.',
    desc: 'Land systems, naval, missile, sensor and electronic warfare programmes. Air-gapped deployment with full data sovereignty for HAL, BEL, BDL, DRDO, L&T and Tata-class OEMs.',
    bullets: ['Air-gapped, on-premise deployment', 'Indigenisation tracking', 'Should-cost for offset programmes', 'Programme audit trails'],
  },
  {
    Icon: Plane,
    n: '03',
    name: 'AEROSPACE COMPONENT SUPPLIERS',
    headline: 'Tier-1 to Tier-3. End-to-end visibility.',
    desc: 'Engine components, structural assemblies, avionics enclosures, precision machined parts. Built for high-mix, low-volume aerospace work with strict certification needs.',
    bullets: ['AS9100-aligned quality workflows', 'FAI and ISIR submissions', 'Customer-specific PPAP', 'Programme-level cost rollups'],
  },
  {
    Icon: Cog,
    n: '04',
    name: 'PRECISION MANUFACTURING',
    headline: 'High-mix, low-volume. Always under cost pressure.',
    desc: 'Precision machining, fabrication, sheet metal, sub-assemblies. The full lifecycle for shops handling complex tolerances, low quantities and demanding OEM customers.',
    bullets: ['Estimator productivity', 'Quote-to-cost lifecycle', 'Shop floor production status', 'Customer delivery tracking'],
  },
]

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="INDUSTRIES"
        title="Built for mission-critical manufacturing."
        subtitle="Industries where parts are complex, tolerances are strict, suppliers are critical and programme delays are expensive."
      />

      <section>
        {industries.map((ind, i) => {
          const Icon = ind.Icon
          return (
            <div key={i} className="border-t border-border py-20 lg:py-28">
              <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16">
                <div className="flex items-start gap-6">
                  <span className="font-display text-[80px] text-white opacity-[0.08] leading-none">{ind.n}</span>
                  <div className="w-14 h-14 rounded-full border border-grey-400 flex items-center justify-center mt-2">
                    <Icon size={22} strokeWidth={1.3} className="text-white" />
                  </div>
                </div>
                <div>
                  <SectionLabel>{ind.name}</SectionLabel>
                  <h2 className="font-display text-white text-[32px] lg:text-[44px] leading-tight mb-6 max-w-2xl">
                    {ind.headline}
                  </h2>
                  <p className="font-mono text-[14px] text-grey-200 leading-relaxed mb-8 max-w-2xl">
                    {ind.desc}
                  </p>
                  <ul className="flex flex-col gap-2 max-w-xl">
                    {ind.bullets.map((b, k) => (
                      <li key={k} className="font-mono text-[13px] text-grey-300 leading-relaxed">— {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <PageCTA title="Your programme deserves a platform built for it." />
    </>
  )
}
