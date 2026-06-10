import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const TIERS = [
  {
    name: 'Startup',
    tag: 'Design & Engineering Teams',
    description: 'Real cost intelligence attached to your design workflow from day one - BOM to first RFQ.',
    highlights: [
      'BOM Composer',
      'Should-Cost Engine',
      'VAVE Studio',
      'Up to 8 users',
    ],
    cta: 'Explore Startup Packages',
    href: '#packages',
    featured: false,
  },
  {
    name: 'Growth',
    tag: 'Procurement & Sourcing Teams',
    description: 'AI-driven supplier shortlisting, quote benchmarking, and negotiation intelligence - compress sourcing cycles.',
    highlights: [
      'Everything in Startup',
      'Supplier Radar',
      'Cost Benchmarker',
      'Vendor Match',
      'Up to 20 users',
    ],
    cta: 'Explore Growth Packages',
    href: '#packages',
    featured: true,
  },
  {
    name: 'Enterprise',
    tag: 'Supply Chain & Program Leaders',
    description: 'Full platform visibility - production tracking, quality, delivery, and deep ERP / PLM integrations.',
    highlights: [
      'Everything in Growth',
      'Launch Tracker',
      'Quality Guard',
      'Shipment Hub',
      'ERP & PLM connectors',
      'Unlimited users',
    ],
    cta: 'Contact Sales',
    href: '#final-cta',
    featured: false,
  },
]

export default function PricingHero() {
  return (
    <section className="pricing-section relative overflow-hidden bg-white">

      {/* Background card decoration */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-[55%]">
        <div className="absolute right-[-12%] top-[18%] h-[340px] w-[520px] rotate-[-18deg] rounded-[28px] bg-[#2dd4bf]/20" />
        <div className="absolute right-[-18%] top-[30%] h-[280px] w-[480px] rotate-[-18deg] rounded-[28px] bg-[#0d9488]/15" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-12 md:pt-32 md:pb-16">

        <AnimateIn>
          <h1 className="max-w-3xl text-[32px] font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-[40px] lg:text-[50px]">
            Pricing built for{' '}
            <span className="text-[#0d9488]">manufacturers</span>{' '}
            of every scale
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#0f1b2d]/50">
            Transparent, outcome-based packages - no per-seat fees, no hidden costs, no long procurement cycles.
          </p>
        </AnimateIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <AnimateIn key={tier.name} delay={i * 0.08}>
              <div className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                tier.featured
                  ? 'border-[#0f1b2d] bg-[#0f1b2d]'
                  : 'border-black/[0.08] bg-white'
              }`}>
                {tier.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#0d9488] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <h2 className={`text-xl font-semibold ${tier.featured ? 'text-white' : 'text-[#0f1b2d]'}`}>
                    {tier.name}
                  </h2>
                  <p className={`mt-1 text-[12px] font-medium ${tier.featured ? 'text-[#2dd4bf]' : 'text-[#0d9488]'}`}>
                    {tier.tag}
                  </p>
                  <p className={`mt-3 text-sm leading-relaxed ${tier.featured ? 'text-white/60' : 'text-[#0f1b2d]/55'}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className={`mb-8 space-y-2.5 text-sm ${tier.featured ? 'text-white/70' : 'text-[#0f1b2d]/65'}`}>
                  {tier.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <Check
                        className={`size-3.5 shrink-0 ${tier.featured ? 'text-[#2dd4bf]' : 'text-[#0d9488]'}`}
                        aria-hidden
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`mt-auto inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-px ${
                    tier.featured
                      ? 'bg-[#2dd4bf] text-[#0f1b2d] hover:bg-[#2dd4bf]/90'
                      : 'border border-black/[0.08] bg-white text-[#0f1b2d] hover:border-[#0d9488]/50'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
