import { Check, ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const PACKAGES = [
  {
    title: 'Reduce Design Costs',
    audience: 'Design & Engineering Teams',
    price: '₹5L',
    featured: false,
    features: [
      'Real-time DFM feedback during design',
      'Live cost estimation (see impact before RFQ)',
      'Supplier capability matching',
      'Material alternatives analysis',
    ],
    outcomes: [
      { label: 'Design cycles',               value: '40% faster'     },
      { label: 'First-pass manufacturability', value: '99.4%'          },
      { label: 'Rework cycles',               value: '85% fewer'      },
      { label: 'Time to RFQ',                value: '3 weeks faster' },
    ],
    teamSize: '5–8 engineers',
    cta: 'Explore Design Optimization',
  },
  {
    title: 'Accelerate Supplier Sourcing',
    audience: 'Procurement & Sourcing Teams',
    price: '₹10L',
    featured: true,
    features: [
      'AI supplier shortlisting (minutes vs. days)',
      'Automated quote benchmarking',
      'Real-time supplier intelligence',
      'Cost comparison dashboard',
    ],
    outcomes: [
      { label: 'RFQ cycles',           value: '40% faster (28 → 17 days)' },
      { label: 'Supplier evaluation',  value: '75% faster'                 },
      { label: 'Cost savings per RFQ', value: '₹50K–₹500K'               },
      { label: 'Supplier quality',     value: 'Higher consistency'         },
    ],
    teamSize: '8–12 procurement staff',
    cta: 'Explore Intelligent Sourcing',
  },
  {
    title: 'Gain Supply Chain Visibility',
    audience: 'Supply Chain & Program Leaders',
    price: '₹18L',
    featured: false,
    features: [
      'Real-time project tracking dashboard',
      'Automated risk alerts (delivery, quality, cost)',
      'VAVE automation (cost reduction workflow)',
      'Quality metrics by supplier',
      'End-to-end supplier integration',
    ],
    outcomes: [
      { label: 'Project visibility',      value: '100%'        },
      { label: 'On-time delivery (OTIF)', value: '98.6%'       },
      { label: 'Supply chain surprises',  value: '85% fewer'   },
      { label: 'Annual savings',          value: '₹100K–₹1M+' },
    ],
    teamSize: '15–25 cross-functional users',
    cta: 'Explore Supply Chain Intelligence',
  },
]

export default function PricingPackages() {
  return (
    <section id="packages" className="pricing-section bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-14">

        {/* Header */}
        <AnimateIn>
          <div className="mb-8 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 text-sm font-medium text-[#0d9488]">Packages</p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-4xl">
                Outcomes worth paying for.
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm text-[#0f1b2d]/50 md:block">
              Each package is priced for the outcome it delivers — not the modules it includes.
            </p>
          </div>
        </AnimateIn>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <AnimateIn key={pkg.title} delay={i * 0.1}>
              <article
                className={`group relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] ${
                  pkg.featured ? 'border-[#0f1b2d]' : 'border-black/[0.08]'
                } bg-white`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[#0f1b2d] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                    Most chosen
                  </span>
                )}

                {/* Title */}
                <div className="mb-5">
                  <h3 className="text-xl font-semibold tracking-tight text-[#0f1b2d]">{pkg.title}</h3>
                  <p className="mt-2 text-sm text-[#0f1b2d]/50">Best for {pkg.audience}</p>
                </div>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-1.5 border-y border-black/[0.06] py-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#0f1b2d]/40">Starting at</span>
                  <span className="ml-auto text-4xl font-semibold tracking-tight text-[#0f1b2d]">{pkg.price}</span>
                  <span className="text-sm text-[#0f1b2d]/40">/ year</span>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#0f1b2d]/40">What you get</p>
                  <ul className="space-y-2.5 text-sm text-[#0f1b2d]/70">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#0d9488]" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div className="mb-6 rounded-xl bg-[#0d9488]/[0.07] p-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#0f1b2d]/40">What happens</p>
                  <dl className="space-y-2 text-sm">
                    {pkg.outcomes.map((o) => (
                      <div key={o.label} className="flex justify-between gap-4">
                        <dt className="text-[#0f1b2d]/55">{o.label}</dt>
                        <dd className="text-right font-medium text-[#0f1b2d]">{o.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Footer */}
                <div className="mt-auto space-y-4">
                  <p className="text-xs text-[#0f1b2d]/40">Typical team size: {pkg.teamSize}</p>
                  <a
                    href="#final-cta"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                      pkg.featured
                        ? 'bg-[#0f1b2d] text-white hover:bg-[#0f1b2d]/90'
                        : 'border border-black/[0.08] bg-white text-[#0f1b2d] hover:border-[#0f1b2d]'
                    }`}
                  >
                    {pkg.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
