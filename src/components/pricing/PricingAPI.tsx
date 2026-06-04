import { Check, Minus } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const TIERS = [
  {
    name: 'Free',
    credits: '500',
    period: 'credits / month',
    description: 'Explore API capabilities on your own data. No credit card required.',
    featured: false,
    features: [
      { label: 'BOM cost estimation endpoint',   included: true  },
      { label: 'Should-cost analysis endpoint',  included: true  },
      { label: 'Supplier match endpoint',        included: false },
      { label: 'Batch & async requests',         included: false },
      { label: 'Webhooks',                       included: false },
      { label: 'SLA guarantee',                  included: false },
      { label: 'Support',                        value: 'Community' },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
  },
  {
    name: 'Startup',
    credits: '25,000',
    period: 'credits / month',
    description: 'For teams building internal tools and integrating costing into their workflow.',
    featured: false,
    features: [
      { label: 'BOM cost estimation endpoint',   included: true  },
      { label: 'Should-cost analysis endpoint',  included: true  },
      { label: 'Supplier match endpoint',        included: true  },
      { label: 'Batch & async requests',         included: false },
      { label: 'Webhooks',                       included: false },
      { label: '99.5% uptime SLA',               included: true  },
      { label: 'Support',                        value: 'Email'  },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
  },
  {
    name: 'Scale',
    credits: '250,000',
    period: 'credits / month',
    description: 'High-volume API access with webhooks, batch processing, and priority support.',
    featured: true,
    features: [
      { label: 'All endpoints',                  included: true  },
      { label: 'Batch & async requests',         included: true  },
      { label: 'Webhooks',                       included: true  },
      { label: 'Custom overage rate',            included: true  },
      { label: '99.9% uptime SLA',               included: true  },
      { label: 'Support',                        value: 'Priority' },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'filled',
  },
  {
    name: 'Enterprise',
    credits: 'Unlimited',
    period: 'dedicated instance',
    description: 'Private deployment, custom endpoints, enterprise SLA, and 24/7 support.',
    featured: false,
    features: [
      { label: 'All endpoints + custom',         included: true  },
      { label: 'Batch & async requests',         included: true  },
      { label: 'Webhooks',                       included: true  },
      { label: 'Dedicated infrastructure',       included: true  },
      { label: '99.99% uptime SLA',              included: true  },
      { label: 'Support',                        value: '24/7 Dedicated' },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
  },
]

type Feature = { label: string; included?: boolean; value?: string }

function FeatureRow({ f, dark }: { f: Feature; dark: boolean }) {
  if (f.value !== undefined) {
    return (
      <li className="flex items-center justify-between gap-3 py-2 text-sm">
        <span className={dark ? 'text-white/50' : 'text-[#0f1b2d]/55'}>{f.label}</span>
        <span className={`text-[13px] font-medium ${dark ? 'text-white' : 'text-[#0f1b2d]'}`}>{f.value}</span>
      </li>
    )
  }
  return (
    <li className="flex items-center gap-2.5 py-2 text-sm">
      {f.included ? (
        <Check className="size-4 shrink-0 text-[#0d9488]" aria-hidden />
      ) : (
        <Minus className={`size-4 shrink-0 ${dark ? 'text-white/20' : 'text-[#0f1b2d]/20'}`} aria-hidden />
      )}
      <span className={
        f.included
          ? dark ? 'text-white/80' : 'text-[#0f1b2d]/70'
          : dark ? 'text-white/30' : 'text-[#0f1b2d]/30'
      }>{f.label}</span>
    </li>
  )
}

export default function PricingAPI() {
  return (
    <section id="api" className="pricing-section bg-[#f0fdf9]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">

        {/* Header */}
        <AnimateIn>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-4xl">
            Integrate Emithran intelligence directly into your systems
          </h2>
          <p className="mt-4 max-w-xl text-base text-[#0f1b2d]/50">
            Usage-based pricing built for teams embedding costing, sourcing, and risk intelligence into their own tools, ERP, and data pipelines.
          </p>
        </AnimateIn>

        {/* Tier cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <AnimateIn key={tier.name} delay={i * 0.07}>
              <div className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                tier.featured
                  ? 'border-[#0f1b2d] bg-[#0f1b2d] text-white'
                  : 'border-black/[0.08] bg-white'
              }`}>
                {tier.featured && (
                  <span className="absolute -top-3 left-5 rounded-full bg-[#0d9488] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}

                <div className={`mb-5 border-b pb-5 ${tier.featured ? 'border-white/10' : 'border-black/[0.07]'}`}>
                  <h3 className={`text-lg font-semibold ${tier.featured ? 'text-white' : 'text-[#0f1b2d]'}`}>
                    {tier.name}
                  </h3>
                  <div className="mt-2">
                    <span className={`text-3xl font-bold tabular-nums ${tier.featured ? 'text-white' : 'text-[#0f1b2d]'}`}>
                      {tier.credits}
                    </span>
                    <span className={`ml-2 text-xs ${tier.featured ? 'text-white/50' : 'text-[#0f1b2d]/40'}`}>
                      {tier.period}
                    </span>
                  </div>
                  <p className={`mt-2 text-xs leading-relaxed ${tier.featured ? 'text-white/55' : 'text-[#0f1b2d]/50'}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className={`mb-6 flex-1 divide-y ${tier.featured ? 'divide-white/10' : 'divide-black/[0.05]'}`}>
                  {tier.features.map((f) => (
                    <FeatureRow key={f.label} f={f} dark={tier.featured} />
                  ))}
                </ul>

                <a
                  href="#final-cta"
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all hover:-translate-y-px ${
                    tier.featured
                      ? 'bg-[#2dd4bf] text-[#0f1b2d] hover:bg-[#2dd4bf]/90'
                      : 'border border-black/[0.10] bg-white text-[#0f1b2d] hover:border-[#0d9488]/50'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </AnimateIn>
          ))}
        </div>


      </div>
    </section>
  )
}
