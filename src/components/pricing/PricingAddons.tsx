import { Check } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const ADDONS = [
  {
    price: '+₹5L',
    title: 'Aerospace / Defense Compliance',
    features: ['AS9100D automation', 'Supplier certification tracking', 'Compliance reporting'],
    bestFor: 'Defense OEMs, aerospace contractors',
  },
  {
    price: '+₹4L',
    title: 'Automotive Compliance',
    features: ['IATF compliance', 'APQP integration', 'Design FMEA linking'],
    bestFor: 'Auto Tier-1, OEMs',
  },
  {
    price: '+₹5–10L',
    title: 'ERP Integration',
    features: ['Real-time sync (SAP, Oracle, NetSuite)', 'Bi-directional updates', 'Custom field mapping'],
    bestFor: 'Enterprises with complex systems',
  },
  {
    price: '+₹4L',
    title: 'Supplier Portal',
    features: ['Self-service supplier updates', 'Capacity & capability visibility', 'Two-way communication'],
    bestFor: 'Companies with 50+ active suppliers',
  },
]

export default function PricingAddons() {
  return (
    <section className="pricing-section bg-[#f0fdf9]">
      <div className="mx-auto max-w-[1200px] px-6 py-12">

        {/* Header */}
        <AnimateIn>
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-medium text-[#0d9488]">Add-ons</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-4xl">
              Specialized modules.
            </h2>
            <p className="mt-4 text-base text-[#0f1b2d]/55">
              Optional capabilities you can attach to any package — priced clearly, scoped narrowly.
            </p>
          </div>
        </AnimateIn>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ADDONS.map((addon, i) => (
            <AnimateIn key={addon.title} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-xl border border-black/[0.08] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0d9488] hover:shadow-[0_12px_30px_-12px_rgba(13,148,136,0.2)]">
                {/* Price */}
                <div className="mb-4 flex items-baseline justify-between border-b border-black/[0.06] pb-4">
                  <span className="text-lg font-semibold tabular-nums text-[#0f1b2d]">{addon.price}</span>
                  <span className="text-xs text-[#0f1b2d]/40">/ year</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-[#0f1b2d]">{addon.title}</h3>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-sm text-[#0f1b2d]/60">
                  {addon.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-[#0d9488]" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Best for */}
                <p className="mt-auto pt-5 text-xs text-[#0f1b2d]/40">
                  <span className="font-medium text-[#0f1b2d]/50">Best for: </span>
                  {addon.bestFor}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
