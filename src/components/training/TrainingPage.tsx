function HoverArrow() {
  return (
    <svg className="overflow-visible ml-0.5" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path className="origin-left transition-transform duration-200 ease-out -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" d="M0 5h7"/>
      <path className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]" d="M1 1l4 4-4 4"/>
    </svg>
  )
}

const tracks = [
  {
    number: '01',
    title: 'Platform Fundamentals',
    duration: '2 days',
    level: 'Beginner',
    description: 'Get hands-on with the Emithran platform. Learn navigation, core modules, BOM creation, and basic cost analysis workflows.',
    topics: ['Platform overview & navigation', 'BOM creation & management', 'Supplier database setup', 'Basic cost estimation'],
  },
  {
    number: '02',
    title: 'Advanced Analytics & Reporting',
    duration: '2 days',
    level: 'Intermediate',
    description: 'Master the analytics engine. Build custom dashboards, configure KPIs, and generate should-cost reports for procurement decisions.',
    topics: ['Custom dashboard builder', 'Should-cost modelling', 'KPI configuration', 'Export & reporting pipelines'],
  },
  {
    number: '03',
    title: 'System Administration',
    duration: '1 day',
    level: 'Intermediate',
    description: 'Manage users, roles, permissions, and system configuration. Covers backup procedures, audit logs, and security hardening.',
    topics: ['User & role management', 'Permission matrices', 'Audit logs & compliance', 'System health monitoring'],
  },
  {
    number: '04',
    title: 'API & Integration',
    duration: '2 days',
    level: 'Advanced',
    description: 'Connect Emithran to your ERP, MES, or SCM systems. Deep-dive into the REST API, webhooks, and data mapping patterns.',
    topics: ['REST API reference', 'Webhook configuration', 'ERP/MES data mapping', 'Authentication & rate limits'],
  },
  {
    number: '05',
    title: 'Supply Chain Optimisation',
    duration: '1 day',
    level: 'Intermediate',
    description: "Leverage Emithran's sourcing intelligence to qualify suppliers, benchmark pricing, and manage multi-tier supply chains.",
    topics: ['Supplier qualification', 'Price benchmarking', 'Multi-tier mapping', 'Risk scoring'],
  },
  {
    number: '06',
    title: 'Leadership & ROI',
    duration: '½ day',
    level: 'All levels',
    description: 'Designed for operations and procurement leaders. Understand platform ROI metrics, change management, and team enablement strategies.',
    topics: ['ROI measurement framework', 'Change management', 'Team rollout strategy', 'Executive dashboards'],
  },
]


const whyItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#0d9e8a" strokeOpacity=".35" strokeWidth="1.4"/>
        <path d="M6 10l3 3 5-5" stroke="#0d9e8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Certified instructors',
    body: 'All trainers are Emithran-certified engineers with active manufacturing deployment experience.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="12" rx="2" stroke="#0d9e8a" strokeOpacity=".35" strokeWidth="1.4"/>
        <path d="M7 9l2 2 4-4" stroke="#0d9e8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Hands-on labs',
    body: 'Every track includes live sandbox exercises using real manufacturing data sets and production-like environments.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#0d9e8a" strokeOpacity=".35" strokeWidth="1.4"/>
        <path d="M10 6v4l2.5 2.5" stroke="#0d9e8a" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Flexible formats',
    body: 'Choose from on-site instructor-led, virtual live sessions, or self-paced on-demand recordings - whatever fits your team.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.4l-4.8 2.5.9-5.4L2.2 7.7l5.4-.8L10 2Z" stroke="#0d9e8a" strokeOpacity=".5" strokeWidth="1.4" fill="#0d9e8a" fillOpacity=".08"/>
      </svg>
    ),
    title: 'Platform certification',
    body: 'Earn an official Emithran certification badge upon completion of each track, recognised across the partner ecosystem.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M10 4l6 6-6 6" stroke="#0d9e8a" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Custom programmes',
    body: 'We build bespoke training curricula tailored to your team size, integration landscape, and manufacturing vertical.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8" cy="7" r="4" stroke="#0d9e8a" strokeOpacity=".35" strokeWidth="1.4"/>
        <path d="M2 17c0-3.314 2.686-5 6-5" stroke="#0d9e8a" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="15" cy="14" r="3" stroke="#0d9e8a" strokeOpacity=".5" strokeWidth="1.4"/>
        <path d="M15 12v2l1 1" stroke="#0d9e8a" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Post-training support',
    body: '90 days of Q&A access with your instructor and a private Slack channel for your cohort after every training programme.',
  },
]

export default function TrainingPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <img
          src="/assets/auth/traning.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
        />
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-28 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-[660px]">
            <h1 className="font-display text-[2.6rem] md:text-[3.4rem] font-bold text-[#0f1b2d] leading-[1.1] tracking-tight">
              Master the Emithran platform
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
               from first login to full deployment
            </h1>
            <p className="mt-5 text-[16px] text-[#0f1b2d]/55 leading-relaxed max-w-[500px]">
              Structured training tracks for operators, engineers, and leaders. Get certified and unlock the full potential of your manufacturing intelligence stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact?source=training&cta=enroll-your-team"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
              >
                Enroll your team
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
        <div className="absolute bottom-0 inset-x-0 h-px bg-black/[0.08]" />
      </section>

      {/* ── Training tracks ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0d9e8a] mb-3">Training tracks</p>
            <h2 className="font-display text-[2rem] md:text-[2.4rem] font-bold text-[#0f1b2d] tracking-tight leading-snug">
              Six tracks. Every role covered.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tracks.map((track) => (
              <div key={track.number} className="group rounded-2xl border border-black/[0.07] bg-white p-7 hover:border-[#0d9e8a]/30 hover:shadow-lg hover:shadow-[#0d9e8a]/5 transition-all duration-300 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <span className="text-[11px] font-bold text-[#0d9e8a]/40 font-mono">{track.number}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] font-semibold text-[#0d9e8a]">{track.level}</span>
                    <span className="text-[10.5px] text-[#0f1b2d]/35 font-medium">· {track.duration}</span>
                  </div>
                </div>
                <h3 className="font-display text-[15.5px] font-bold text-[#0f1b2d] mb-2.5 tracking-tight">{track.title}</h3>
                <p className="text-[13px] text-[#0f1b2d]/55 leading-relaxed mb-5 flex-1">{track.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {track.topics.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-[12.5px] text-[#0f1b2d]/50">
                      <span className="w-1 h-1 rounded-full bg-[#0d9e8a]/50 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href="/contact?source=training&cta=enrol-now" className="group/link inline-flex items-center gap-0 text-[13px] font-medium text-[#0d9e8a] hover:opacity-75 transition-opacity">
                  Enrol now&nbsp;<HoverArrow />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why train with Emithran ── */}
      <section className="py-20 bg-[#f8fafc] border-t border-black/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-[260px] flex-shrink-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0d9e8a] mb-3">Why Emithran training</p>
              <h2 className="font-display text-[1.9rem] font-bold text-[#0f1b2d] tracking-tight leading-snug">
                Built for real manufacturing teams
              </h2>
              <p className="mt-4 text-[14px] text-[#0f1b2d]/55 leading-relaxed">
                Our training is built around how manufacturing engineers actually work - not generic software tutorials.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
              {whyItems.map(({ icon, title, body }) => (
                <div key={title}>
                  <div className="mb-3 w-8 h-8 flex items-center justify-center">{icon}</div>
                  <h3 className="font-display text-[14.5px] font-bold text-[#0f1b2d] mb-1.5 tracking-tight">{title}</h3>
                  <p className="text-[13px] text-[#0f1b2d]/55 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Need help? ── */}
      <section className="py-20 bg-white border-t border-black/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            <div className="lg:w-[260px] flex-shrink-0">
              <h2 className="font-display text-[1.9rem] font-bold text-[#0f1b2d] tracking-tight leading-snug mb-3">
                Need help?
              </h2>
              <p className="text-[14px] text-[#0f1b2d]/55 leading-relaxed">
                Our ecosystem of engineers and certified partners can help you find the right solution, integrate faster, and stay agile.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {[
                {
                  title: 'On-site engineering support',
                  body: 'We deploy our engineers directly to your facility - working alongside your team on the floor, resolving issues hands-on, and continuing remote support through the Emithran platform.',
                  cta: 'Talk to our team',
                  href: '/contact?source=training&cta=talk-to-our-team',
                },
                {
                  title: 'Priority support',
                  body: 'Access a dedicated support channel with SLA-backed response times and direct escalation paths for critical production issues.',
                  cta: 'View support plans',
                  href: '/products/engineering-support',
                },
                {
                  title: 'Implementation partners',
                  body: 'Work with certified Emithran partners for full-stack deployment, process mapping, and system integration across your facility.',
                  cta: 'Find a partner',
                  href: '/about/partners',
                },
                {
                  title: 'Technology integration',
                  body: 'Connect Emithran to your existing ERP, MES, or SCM systems through our verified technology partner ecosystem.',
                  cta: 'Browse integrations',
                  href: '/contact?source=training&cta=browse-integrations',
                },
                {
                  title: 'Managed services',
                  body: 'Accelerate deployment and adoption with our in-house professional services team for custom configurations and go-live support.',
                  cta: 'Learn more',
                  href: '/contact?source=training&cta=learn-more',
                },
              ].map(({ title, body, cta, href }) => (
                <div key={title} className="flex flex-col">
                  <div className="w-8 h-1 rounded-full bg-[#0d9e8a]/30 mb-4" />
                  <h3 className="font-display text-[15px] font-bold text-[#0f1b2d] mb-2 tracking-tight">{title}</h3>
                  <p className="text-[13.5px] text-[#0f1b2d]/55 leading-relaxed flex-1 mb-4">{body}</p>
                  <a href={href} className="group inline-flex items-center gap-0 text-[13px] font-medium text-[#0d9e8a] hover:opacity-75 transition-opacity">
                    {cta}&nbsp;<HoverArrow />
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white border-t border-black/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div
            className="relative overflow-hidden rounded-2xl px-10 py-14 md:px-16"
            style={{ background: 'linear-gradient(135deg, #0f1b2d 0%, #1a3352 100%)' }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' }} />
            <div className="relative max-w-[560px]">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2dd4bf]/70 mb-3">Get your team trained</p>
              <h2 className="font-display text-[1.9rem] md:text-[2.3rem] font-bold text-white tracking-tight leading-snug mb-4">
                Ready to upskill your manufacturing team?
              </h2>
              <p className="text-[14px] text-white/50 leading-relaxed mb-7">
                Contact us to discuss a custom training schedule, group pricing, or a blended on-site and virtual programme for your facility.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact?source=training&cta=enroll-your-team-cta"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
                >
                  Enroll your team
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
