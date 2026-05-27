'use client'
import dynamic from 'next/dynamic'
import AnimatedSection from '@/components/ui/AnimatedSection'

const WaveCanvasClient = dynamic(
  () => import('./WaveCanvas').then((m) => ({ default: m.WaveCanvas })),
  { ssr: false, loading: () => null },
)

const STATS = [
  { value: '18%',   label: 'Average cost reduction per project', color: '#48d2be' },
  { value: '98.6%', label: 'Average quality compliance rate',    color: '#22d3ee' },
  { value: '98%',   label: 'On-time delivery rate',             color: '#2dd4bf' },
]

export default function ScaleSection() {
  return (
    <section className="relative bg-[#080808] overflow-hidden text-white">

      {/* White column lines */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08] hidden md:block" style={{ left: 64 }} />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08] hidden md:block" style={{ right: 64 }} />

      {/* Wave — compact height, sits right after the diagram with no gap */}
      <div className="relative w-full" style={{ height: 260 }}>
        {/* Canvas constrained to stop at the column lines */}
        <div className="absolute inset-y-0 inset-x-0 md:left-16 md:right-16">
          <WaveCanvasClient />
        </div>
        {/* Top fade — blends with the diagram section above */}
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none"
             style={{ background: 'linear-gradient(to bottom, #080808, transparent)' }} />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
             style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
        {/* Side fades into column lines */}
        <div className="absolute inset-y-0 left-0 w-28 pointer-events-none hidden md:block"
             style={{ background: 'linear-gradient(to right, #080808, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-28 pointer-events-none hidden md:block"
             style={{ background: 'linear-gradient(to left, #080808, transparent)' }} />
      </div>

      {/* Stats sit below the wave */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 pb-14 md:pb-20 pt-4">
        <AnimatedSection className="max-w-sm mb-8">
          <p className="text-base md:text-lg leading-relaxed">
            <span className="font-bold">Scale with confidence.</span>{' '}
            <span className="text-white/50">
              Built for India&apos;s space, defence, and aerospace manufacturers —
              from ISIR to mass production, Emithran keeps every project on track.
            </span>
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-16 gap-y-8">
          {STATS.map((stat, i) => (
            <AnimatedSection key={stat.value} delay={i * 0.1}>
              <p
                className="font-display text-6xl md:text-7xl font-bold tracking-tight leading-none"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/45 leading-snug">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>

    </section>
  )
}
