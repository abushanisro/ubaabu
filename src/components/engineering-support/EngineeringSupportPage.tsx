import type { Metadata } from 'next'

// ── SVG icons ─────────────────────────────────────────────────────────────
function IconConsult() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.506 21.238C-.778 15.723.56 8.624 5.626 4.682c5.067-3.942 12.276-3.494 16.815 1.046 4.54 4.54 4.988 11.749 1.046 16.815-3.942 5.067-11.04 6.404-16.556 3.12L1.037 27.63c-.411.134-.632-.087-.498-.498L2.506 21.238Z" fill="#0d9e8a" fillOpacity=".15"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.228 12.728c4.539-4.54 11.748-4.988 16.814-1.046 5.067 3.942 6.404 11.04 3.12 16.556l1.967 5.893c.134.411-.087.632-.498.498l-5.893-1.967C27.222 35.946 20.124 34.609 16.182 29.542c-3.942-5.066-3.494-12.276 1.046-16.814Z" fill="#0d9e8a" fillOpacity=".3"/>
    </svg>
  )
}

function IconPriority() {
  return (
    <svg width="32" height="32" viewBox="0 0 39 37" fill="none" aria-hidden="true">
      <path d="M1.55 35.68l12.32-6.4a1 1 0 0 0 .44-.45L24.8 6.7a1 1 0 0 1 1.56-.33l12.3 10.64a1 1 0 0 1 .34.76V33a4 4 0 0 1-4 4H1.87a.7.7 0 0 1-.32-1.32Z" fill="#0d9e8a" fillOpacity=".15"/>
      <path d="M.76 34.6L12.1 19.26a1 1 0 0 1 1.09-.37l11.65 3.4a1 1 0 0 0 1.17-.5L37.1.6a1 1 0 0 1 1.89.46V33a4 4 0 0 1-4 4H1.97A1.5 1.5 0 0 1 .76 34.6Z" fill="#0d9e8a" fillOpacity=".5"/>
    </svg>
  )
}

function IconPartner() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="#0d9e8a" strokeOpacity=".25" strokeWidth="1.5" fill="#0d9e8a" fillOpacity=".08"/>
      <circle cx="28" cy="29" r="8" fill="#0d9e8a" fillOpacity=".2"/>
      <circle cx="28" cy="29" r="4" fill="#0d9e8a" fillOpacity=".5"/>
      <path d="M10 20c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#0d9e8a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconIntegration() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="34" height="28" rx="3" fill="#0d9e8a" fillOpacity=".1" stroke="#0d9e8a" strokeOpacity=".2" strokeWidth="1.5"/>
      <circle cx="5.5" cy="7.5" r="2" fill="#0d9e8a" fillOpacity=".4"/>
      <circle cx="10.5" cy="7.5" r="2" fill="#0d9e8a" fillOpacity=".4"/>
      <circle cx="15.5" cy="7.5" r="2" fill="#0d9e8a" fillOpacity=".4"/>
      <path d="M14 18l-5 5 5 5M22 18l5 5-5 5M17 13l4 14" stroke="#0d9e8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconManaged() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M19 26.9V17.5L28 13l9 4.5v9.4c0 1.43-.84 2.74-2.15 3.34L27 34l-8-3.76A3.5 3.5 0 0 1 17 26.9Z" fill="#0d9e8a" fillOpacity=".15" stroke="#0d9e8a" strokeOpacity=".3" strokeWidth="1.5"/>
      <path d="M2 26.9V17.5L11 13l9 4.5v9.4c0 1.43-.84 2.74-2.15 3.34L10 34l-8-3.76A3.5 3.5 0 0 1 0 26.9Z" fill="#0d9e8a" fillOpacity=".3" stroke="#0d9e8a" strokeOpacity=".5" strokeWidth="1.5"/>
    </svg>
  )
}

// ── Hover arrow ────────────────────────────────────────────────────────────
function HoverArrow() {
  return (
    <svg className="overflow-visible ml-0.5" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path className="origin-left transition-transform duration-200 ease-out -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" d="M0 5h7"/>
      <path className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]" d="M1 1l4 4-4 4"/>
    </svg>
  )
}

// ── Card data ──────────────────────────────────────────────────────────────
const cards = [
  {
    Icon: IconConsult,
    title: 'On-site engineering support',
    body: 'We deploy our engineers directly to your facility — working alongside your team on the floor, resolving issues hands-on, and continuing remote support through the Emithran platform.',
    cta: 'Talk to our team',
    href: '/contact?source=engineering-support&cta=talk-to-our-team',
  },
  {
    Icon: IconPriority,
    title: 'Priority support',
    body: 'Access a dedicated support channel with SLA-backed response times and direct escalation paths for critical production issues.',
    cta: 'View support plans',
    href: '/contact?source=engineering-support&cta=view-support-plans',
  },
  {
    Icon: IconPartner,
    title: 'Implementation partners',
    body: 'Work with certified Emithran partners for full-stack deployment, process mapping, and system integration across your facility.',
    cta: 'Find a partner',
    href: '/about/partners',
  },
  {
    Icon: IconIntegration,
    title: 'Technology integration',
    body: 'Connect Emithran to your existing ERP, MES, or SCM systems through our verified technology partner ecosystem.',
    cta: 'Browse integrations',
    href: '/contact?source=engineering-support&cta=browse-integrations',
  },
  {
    Icon: IconManaged,
    title: 'Managed services',
    body: 'Accelerate deployment and adoption with our in-house professional services team for custom configurations and go-live support.',
    cta: 'Learn more',
    href: '/contact?source=engineering-support&cta=learn-more',
  },
]

// ── Tier data ──────────────────────────────────────────────────────────────
const tiers = [
  {
    name: 'On-demand',
    badge: 'Starter',
    badgeColor: 'bg-[#f0fdf9] text-[#0d9e8a] border-[#0d9e8a]/20',
    description: 'Self-serve documentation, community forum access, and email support with standard response times.',
    features: ['Documentation portal', 'Community forum', 'Email support', '72-hr response SLA'],
  },
  {
    name: 'Priority',
    badge: 'Growth',
    badgeColor: 'bg-[#0f1b2d]/5 text-[#0f1b2d] border-[#0f1b2d]/15',
    description: 'Faster SLAs, live chat, named support engineers, and quarterly review calls with your account team.',
    features: ['Everything in On-demand', 'Live chat & phone', 'Named support engineer', '8-hr response SLA', 'Quarterly business reviews'],
    highlight: true,
  },
  {
    name: 'Dedicated',
    badge: 'Enterprise',
    badgeColor: 'bg-[#0d9e8a]/10 text-[#0d9e8a] border-[#0d9e8a]/20',
    description: 'Embedded Emithran engineer within your team, custom SLAs, on-site visits, and 24/7 critical support.',
    features: ['Everything in Priority', 'Embedded engineer', 'On-site visits', '1-hr critical SLA', '24/7 coverage', 'Custom integrations'],
  },
]

// ── Page component ─────────────────────────────────────────────────────────
export default function EngineeringSupportPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <img
          src="/assets/auth/sign-up.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-32 pb-24">
          <div className="max-w-[680px]">
            <h1 className="font-display text-[2.6rem] md:text-[3.4rem] font-bold text-[#0f1b2d] leading-[1.1] tracking-tight">
              Expert support for every stage of your manufacturing journey
            </h1>
            <p className="mt-5 text-[16px] text-[#0f1b2d]/55 leading-relaxed max-w-[520px]">
              From initial deployment to full-scale operations — our engineering teams, certified partners, and managed service options keep your platform running at peak performance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact?source=engineering-support&cta=talk-to-an-expert"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
              >
                Talk to an expert
              </a>
              <a
                href="/request-demo"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0f1b2d]/20 px-5 py-2.5 text-sm font-semibold text-[#0f1b2d]/70 hover:bg-[#0f1b2d]/[0.04] transition-colors"
              >
                Request a demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Support tiers ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0d9e8a] mb-3">Support plans</p>
            <h2 className="font-display text-[2rem] md:text-[2.4rem] font-bold text-[#0f1b2d] tracking-tight leading-snug">
              The right level of support<br className="hidden md:block" /> for where you are
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={
                  'rounded-2xl border p-7 flex flex-col ' +
                  (tier.highlight
                    ? 'bg-[#0f1b2d] border-[#0f1b2d]'
                    : 'bg-white border-black/[0.07]')
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>
                <h3 className={`font-display text-[1.3rem] font-bold mb-3 tracking-tight ${tier.highlight ? 'text-white' : 'text-[#0f1b2d]'}`}>
                  {tier.name}
                </h3>
                <p className={`text-[13.5px] leading-relaxed mb-6 ${tier.highlight ? 'text-white/55' : 'text-[#0f1b2d]/55'}`}>
                  {tier.description}
                </p>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6.5" stroke={tier.highlight ? '#2dd4bf' : '#0d9e8a'} strokeOpacity=".4"/>
                        <path d="M4 7l2 2 4-4" stroke={tier.highlight ? '#2dd4bf' : '#0d9e8a'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className={`text-[13px] ${tier.highlight ? 'text-white/70' : 'text-[#0f1b2d]/65'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact?source=engineering-support&cta=get-started"
                  className={
                    'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all ' +
                    (tier.highlight
                      ? 'bg-[#0d9e8a] text-white hover:opacity-85'
                      : 'border border-[#0f1b2d]/15 text-[#0f1b2d] hover:bg-[#0f1b2d]/[0.04]')
                  }
                >
                  Get started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Need help? (Stripe-style) ── */}
      <section className="py-20 bg-white border-t border-black/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Left */}
            <div className="lg:w-[260px] flex-shrink-0">
              <h2 className="font-display text-[1.9rem] font-bold text-[#0f1b2d] tracking-tight leading-snug mb-3">
                Need help?
              </h2>
              <p className="text-[14px] text-[#0f1b2d]/55 leading-relaxed">
                Our ecosystem of engineers and certified partners can help you find the right solution, integrate faster, and stay agile.
              </p>
            </div>

            {/* Right: cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {cards.map(({ Icon, title, body, cta, href }) => (
                <div key={title} className="flex flex-col">
                  <div className="mb-4 w-10 h-10 flex items-center justify-center">
                    <Icon />
                  </div>
                  <h3 className="font-display text-[15px] font-bold text-[#0f1b2d] mb-2 tracking-tight">{title}</h3>
                  <p className="text-[13.5px] text-[#0f1b2d]/55 leading-relaxed flex-1 mb-4">{body}</p>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-0 text-[13px] font-medium text-[#0d9e8a] hover:opacity-75 transition-opacity"
                  >
                    {cta}&nbsp;<HoverArrow />
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-[#f8fafc] border-t border-black/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div
            className="relative overflow-hidden rounded-2xl px-10 py-14 md:px-16"
            style={{ background: 'linear-gradient(135deg, #0f1b2d 0%, #1a3352 100%)' }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' }} />
            <div className="relative max-w-[560px]">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2dd4bf]/70 mb-3">Get started today</p>
              <h2 className="font-display text-[1.9rem] md:text-[2.3rem] font-bold text-white tracking-tight leading-snug mb-4">
                Ready to deploy with confidence?
              </h2>
              <p className="text-[14px] text-white/50 leading-relaxed mb-7">
                Talk to our engineering team to find the support plan that fits your scale, timeline, and integration complexity.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact?source=engineering-support&cta=talk-to-an-expert-cta"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
                >
                  Talk to an expert
                </a>
                <a
                  href="/request-demo"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/[0.08] transition-colors"
                >
                  Request a demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
