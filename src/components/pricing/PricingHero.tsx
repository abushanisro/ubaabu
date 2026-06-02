import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

export default function PricingHero() {
  return (
    <section className="pricing-section relative overflow-hidden bg-white">

      {/* Teal geometric decoration */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-[55%]">
        <div className="absolute right-[-12%] top-[18%] h-[340px] w-[520px] rotate-[-18deg] rounded-[28px] bg-[#2dd4bf]/20" />
        <div className="absolute right-[-18%] top-[30%] h-[280px] w-[480px] rotate-[-18deg] rounded-[28px] bg-[#0d9488]/15" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pt-14 pb-10 md:pt-20 md:pb-14">

        <AnimateIn>
          <h1 className="max-w-4xl text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] text-black md:text-[68px]">
            Pricing built for manufacturers of every scale
          </h1>
        </AnimateIn>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2">

          {/* Standard */}
          <AnimateIn delay={0.1}>
            <article className="grid h-full overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-40px_rgba(10,20,30,0.18)] ring-1 ring-black/[0.06] md:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-between p-7 md:p-8">
                <div>
                  <h2 className="text-xl font-semibold text-[#0f1b2d]">Standard</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#0f1b2d]/55">
                    A complete manufacturing intelligence platform with transparent, outcome-based pricing. No per-seat fees, no hidden costs, no long procurement cycles.
                  </p>
                </div>
                <Link
                  href="#packages"
                  className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0f1b2d] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px"
                >
                  Explore packages <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
              <div className="grid border-l border-black/[0.06] md:grid-rows-2">
                <div className="flex flex-col items-center justify-center border-b border-black/[0.06] bg-[#0d9488]/[0.07] px-6 py-8 text-center">
                  <p className="text-3xl font-semibold tracking-tight text-[#0f1b2d]">₹5L</p>
                  <p className="mt-2 text-xs leading-snug text-[#0f1b2d]/45">starting, for design &amp; engineering teams</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-[#0d9488]/[0.07] px-6 py-8 text-center">
                  <p className="text-3xl font-semibold tracking-tight text-[#0f1b2d]">₹10L</p>
                  <p className="mt-2 text-xs leading-snug text-[#0f1b2d]/45">for full sourcing &amp; supply chain visibility</p>
                </div>
              </div>
            </article>
          </AnimateIn>

          {/* Custom */}
          <AnimateIn delay={0.18}>
            <article className="grid h-full overflow-hidden rounded-2xl bg-[#0f1b2d] shadow-[0_30px_80px_-40px_rgba(10,20,30,0.55)] md:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-between p-7 md:p-8">
                <div>
                  <h2 className="text-xl font-semibold text-white">Custom</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    Design a custom package — for manufacturers with high project volume, complex multi-site operations, or specialized compliance requirements.
                  </p>
                </div>
                <Link
                  href="#final-cta"
                  className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#2dd4bf] px-5 py-2.5 text-sm font-medium text-[#0f1b2d] transition-transform hover:-translate-y-px"
                >
                  Contact sales <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
              <div className="grid border-l border-white/10 md:grid-rows-3">
                <div className="flex items-center justify-center border-b border-white/10 px-6 py-5 text-center text-sm font-medium text-white">
                  Volume discounts
                </div>
                <div className="flex items-center justify-center border-b border-white/10 px-6 py-5 text-center text-sm font-medium text-white">
                  Multi-site rollouts
                </div>
                <div className="flex items-center justify-center px-6 py-5 text-center text-sm font-medium text-white">
                  Aerospace &amp; auto compliance
                </div>
              </div>
            </article>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
