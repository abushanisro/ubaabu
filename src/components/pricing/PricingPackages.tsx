'use client'

import { useState } from 'react'
import {
  FileCode2, BarChart3, Cpu,
  Search, Users2, TrendingDown,
  Milestone, ShieldCheck, PackageCheck,
  ArrowRight, X,
} from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

/* ─────────────────────────── icons ─────────────────────────── */

const BLEND = { '--blendBackground': '#2dd4bf', '--blendForeground': '#0f1b2d', '--blendIntersection': '#0d9488' } as React.CSSProperties

const CASE_ICONS: Record<string, React.ReactNode> = {
  Design: (
    // Layered cards - represents design iterations and CAD layers
    <svg width="28" height="28" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <clipPath id="designIconClip">
          <rect x="2" y="16" width="32" height="22" rx="3" />
        </clipPath>
      </defs>
      <rect x="2" y="16" width="32" height="22" rx="3" fill="var(--blendBackground)" />
      <rect x="6" y="8" width="32" height="22" rx="3" fill="var(--blendForeground)" />
      <g clipPath="url(#designIconClip)">
        <rect x="6" y="8" width="32" height="22" rx="3" fill="var(--blendIntersection)" />
      </g>
    </svg>
  ),
  Source: (
    // Magnifying glass - represents supplier search and radar
    <svg width="28" height="28" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <clipPath id="sourceIconClip">
          <circle cx="16" cy="16" r="14" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="14" fill="var(--blendBackground)" />
      <path d="M26 26l11 11a2 2 0 01-3 3L23 29l3-3z" fill="var(--blendForeground)" />
      <circle cx="16" cy="16" r="7" fill="var(--blendForeground)" />
      <g clipPath="url(#sourceIconClip)">
        <path d="M26 26l11 11a2 2 0 01-3 3L23 29l3-3z" fill="var(--blendIntersection)" />
        <circle cx="16" cy="16" r="7" fill="var(--blendIntersection)" />
      </g>
    </svg>
  ),
  Track: (
    <svg width="28" height="26" viewBox="0 0 38 34" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <clipPath id="trackIconClip">
          <rect x="0" y="4" width="28" height="6" rx="3" />
          <rect x="0" y="14" width="22" height="6" rx="3" />
          <rect x="0" y="24" width="25" height="6" rx="3" />
        </clipPath>
      </defs>
      <rect x="0" y="4" width="28" height="6" rx="3" fill="var(--blendBackground)" />
      <rect x="0" y="14" width="22" height="6" rx="3" fill="var(--blendBackground)" />
      <rect x="0" y="24" width="25" height="6" rx="3" fill="var(--blendBackground)" />
      <circle cx="30" cy="7" r="8" fill="var(--blendForeground)" />
      <circle cx="24" cy="17" r="8" fill="var(--blendForeground)" />
      <circle cx="27" cy="27" r="8" fill="var(--blendForeground)" />
      <g clipPath="url(#trackIconClip)">
        <circle cx="30" cy="7" r="8" fill="var(--blendIntersection)" />
        <circle cx="24" cy="17" r="8" fill="var(--blendIntersection)" />
        <circle cx="27" cy="27" r="8" fill="var(--blendIntersection)" />
      </g>
    </svg>
  ),
}

/* ─────────────────────────── data ─────────────────────────── */

const COUNTRIES = [
  'Albania','Argentina','Armenia','Australia','Austria','Belarus','Belgium',
  'Bolivia','Bosnia and Herzegovina','Brazil','Bulgaria','Canada','Chile',
  'China','Colombia','Croatia','Czech Republic','Denmark','Ecuador','Egypt',
  'Estonia','Finland','France','Germany','Greece','Hong Kong','Hungary',
  'Iceland','India','Indonesia','Ireland','Israel','Italy','Japan',
  'Korea (South)','Liechtenstein','Lithuania','Luxembourg','Macedonia',
  'Malaysia','Mexico','Netherlands','New Zealand','Norway','Panama','Paraguay',
  'Peru','Philippines','Poland','Portugal','Puerto Rico','Romania',
  'Russian Federation','Saudi Arabia','Serbia and Montenegro','Singapore',
  'Slovak Republic','Slovenia','South Africa','Spain','Sweden','Switzerland',
  'Taiwan','Thailand','Turkey','Ukraine','United Kingdom','United States',
  'Uruguay','Venezuela','Vietnam',
]

const API_TIERS = [
  {
    name: 'Free',
    credits: '500',
    period: 'credits / month',
    description: 'Explore API capabilities on your own data. No credit card required.',
    featured: false,
    features: [
      { label: 'BOM cost estimation endpoint', included: true  },
      { label: 'Should-cost analysis endpoint', included: true  },
      { label: 'Supplier match endpoint',       included: false },
      { label: 'Batch & async requests',        included: false },
      { label: 'Webhooks',                      included: false },
      { label: 'SLA guarantee',                 included: false },
      { label: 'Support',                       value: 'Community' },
    ],
  },
  {
    name: 'Startup',
    credits: '25,000',
    period: 'credits / month',
    description: 'For teams building internal tools and integrating costing into their workflow.',
    featured: false,
    features: [
      { label: 'BOM cost estimation endpoint', included: true  },
      { label: 'Should-cost analysis endpoint', included: true  },
      { label: 'Supplier match endpoint',       included: true  },
      { label: 'Batch & async requests',        included: false },
      { label: 'Webhooks',                      included: false },
      { label: '99.5% uptime SLA',              included: true  },
      { label: 'Support',                       value: 'Email'  },
    ],
  },
  {
    name: 'Scale',
    credits: '250,000',
    period: 'credits / month',
    description: 'High-volume API access with webhooks, batch processing, and priority support.',
    featured: true,
    features: [
      { label: 'All endpoints',         included: true  },
      { label: 'Batch & async requests',included: true  },
      { label: 'Webhooks',              included: true  },
      { label: 'Custom overage rate',   included: true  },
      { label: '99.9% uptime SLA',      included: true  },
      { label: 'Support',               value: 'Priority' },
    ],
  },
  {
    name: 'Enterprise',
    credits: 'Unlimited',
    period: 'dedicated instance',
    description: 'Private deployment, custom endpoints, enterprise SLA, and 24/7 support.',
    featured: false,
    features: [
      { label: 'All endpoints + custom',     included: true  },
      { label: 'Batch & async requests',     included: true  },
      { label: 'Webhooks',                   included: true  },
      { label: 'Dedicated infrastructure',   included: true  },
      { label: '99.99% uptime SLA',          included: true  },
      { label: 'Support',                    value: '24/7 Dedicated' },
    ],
  },
]

const CASES = [
  {
    id: 'Design',
    title: 'Design',
    subtitle: 'Reduce cost from the first line of CAD',
    body: 'Embed real cost intelligence into your design workflow. Get DFM guidance, BOM accuracy checks, and AI-driven alternatives before a design is locked.',
    note: null,
    ctaLabel: 'Explore Design Packages',
    features: [
      {
        label: 'BOM Composer',
        Icon: FileCode2,
        desc: 'Build, cost, and validate bills of materials instantly from any CAD or spreadsheet source.',
      },
      {
        label: 'Should-Cost Engine',
        Icon: BarChart3,
        desc: 'Get real-time cost benchmarks at part and assembly level so you always know your target before an RFQ.',
      },
      {
        label: 'VAVE Studio',
        Icon: Cpu,
        desc: 'Surface AI-driven material and process alternatives that hit cost targets without compromising function.',
      },
    ],
  },
  {
    id: 'Source',
    title: 'Source',
    subtitle: 'Find the right supplier 10× faster',
    body: 'Match suppliers to your BOM, benchmark every quote against live market data, and score vendor capability before you commit to a partner.',
    note: null,
    ctaLabel: 'Explore Sourcing Packages',
    features: [
      {
        label: 'Supplier Radar',
        Icon: Search,
        desc: 'Score and shortlist from 50,000+ verified manufacturers matched precisely to your part requirements.',
      },
      {
        label: 'Cost Benchmarker',
        Icon: TrendingDown,
        desc: 'Compare every quote against regional market data to spot outliers and negotiate with confidence.',
      },
      {
        label: 'Vendor Match',
        Icon: Users2,
        desc: 'AI-powered RFQ routing and negotiation intelligence that cuts sourcing cycles significantly.',
      },
    ],
  },
  {
    id: 'Track',
    title: 'Track',
    subtitle: 'Deliver on time, every time',
    body: 'Monitor production milestones, quality checks, and shipment status against plan. Receive automated alerts before issues turn into delays.',
    note: null,
    ctaLabel: 'Explore Tracking Packages',
    features: [
      {
        label: 'Launch Tracker',
        Icon: Milestone,
        desc: 'Track every production milestone end to end, from tooling approval through to PPAP sign-off.',
      },
      {
        label: 'Quality Guard',
        Icon: ShieldCheck,
        desc: 'Monitor PPAP, APQP, and supplier quality metrics in real time from a single live dashboard.',
      },
      {
        label: 'Shipment Hub',
        Icon: PackageCheck,
        desc: 'Track live delivery status with delay prediction and OTIF scoring by supplier.',
      },
    ],
  },
]

/* ─────────────────────────── modal ─────────────────────────── */

const INDUSTRIES = [
  'Aerospace & Defence',
  'Space & Satellite',
  'Precision Engineering',
  'Automotive',
  'Electronics & PCB',
  'Medical Devices',
  'Industrial Equipment',
  'Oil & Gas',
  'Other',
]

const inputCls = 'w-full rounded-lg border border-black/[0.12] bg-white px-3.5 py-2.5 text-sm text-[#0f1b2d] placeholder:text-[#0f1b2d]/30 focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/10 transition-colors'
const labelCls = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-[#0f1b2d]/50'

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}{required && <span className="ml-0.5 text-[#ef4444]">*</span>}</label>
      {children}
    </div>
  )
}

function ContactModal({ intent, onClose }: { intent: string; onClose: () => void }) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', role: '', industry: '', country: '',
    message: '', optIn: false,
  })
  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'pricing',
          cta: intent,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setState('success')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.')
      setState('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full sm:max-w-[540px] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-black/[0.07] shrink-0">
          <div>
            <span className="inline-block mb-1.5 rounded-full bg-[#0d9488]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">
              {intent} Pricing
            </span>
            <h3 className="text-[15px] font-semibold leading-snug text-[#0f1b2d]">
              Get pricing &amp; package details
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="shrink-0 rounded-lg p-1.5 text-[#0f1b2d]/35 hover:bg-black/[0.05] hover:text-[#0f1b2d] transition-colors">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {state === 'success' ? (
          <div className="flex flex-col items-center gap-4 px-7 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0d9488]/10">
              <ShieldCheck className="size-7 text-[#0d9488]" aria-hidden />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0f1b2d]">Message sent!</h4>
              <p className="mt-1.5 max-w-[280px] text-sm leading-relaxed text-[#0f1b2d]/55">
                Check your inbox - we've sent a confirmation. Our team will reach out within 1 business day.
              </p>
            </div>
            <button onClick={onClose} className="mt-2 rounded-full bg-[#0f1b2d] px-7 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
            <div className="space-y-4 px-6 py-5">

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name" required>
                  <input type="text" required placeholder="First" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Last Name" required>
                  <input type="text" required placeholder="Last" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputCls} />
                </Field>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Business Email" required>
                  <input type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Phone">
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} />
                </Field>
              </div>

              {/* Company + Role */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Company" required>
                  <input type="text" required placeholder="Company name" value={form.company} onChange={(e) => set('company', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Your Role" required>
                  <input type="text" required placeholder="e.g. Procurement Head" value={form.role} onChange={(e) => set('role', e.target.value)} className={inputCls} />
                </Field>
              </div>

              {/* Industry + Country */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Industry" required>
                  <select required value={form.industry} onChange={(e) => set('industry', e.target.value)} className={inputCls}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </Field>
                <Field label="Country" required>
                  <select required value={form.country} onChange={(e) => set('country', e.target.value)} className={inputCls}>
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              {/* Message */}
              <Field label="What are you looking to solve?">
                <textarea
                  rows={3}
                  placeholder="Tell us about your manufacturing challenge or the specific packages you're interested in..."
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {/* Opt-in */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="pricingOptIn" checked={form.optIn} onChange={(e) => set('optIn', e.target.checked)}
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded border-black/20 accent-[#0d9488]" />
                <label htmlFor="pricingOptIn" className="cursor-pointer text-[11px] leading-relaxed text-[#0f1b2d]/40">
                  Keep me updated about Emithran products, pricing changes, and manufacturing intelligence resources.
                </label>
              </div>

              {/* Error */}
              {state === 'error' && (
                <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-[12px] text-red-600">{errorMsg}</p>
              )}

            </div>

            {/* Sticky footer with CTA */}
            <div className="sticky bottom-0 bg-white border-t border-black/[0.07] px-6 py-4 shrink-0">
              <button
                type="submit"
                disabled={state === 'loading'}
                className="w-full rounded-full bg-[#0f1b2d] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {state === 'loading' ? (
                  <>
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending…
                  </>
                ) : 'Get Pricing Details'}
              </button>
              <p className="mt-2 text-center text-[10px] text-[#0f1b2d]/30">
                No spam. We'll reply within 1 business day.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────── main section ─────────────────────── */

export default function PricingPackages() {
  const [modal, setModal] = useState<{ open: boolean; intent: string }>({ open: false, intent: '' })

  return (
    <>
      {/* ══════════════ Use-case cards section ══════════════ */}
      <section id="packages" className="pricing-section relative overflow-hidden bg-[#f8f9fa] py-10 md:py-14">

        {/* Full-section SVG background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src="/assets/cards/projectcarddemo.svg"
            alt=""
            className="h-full w-full object-cover object-top opacity-20 md:object-center md:opacity-30"
          />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6">

          {/* Cards wrapper */}
          <div className="relative px-6 pt-10 pb-6">

            {/* Header */}
            <AnimateIn>
              <h2 className="relative max-w-2xl text-3xl font-semibold tracking-tight text-[#0f1b2d] md:text-4xl">
                We Have Pricing &amp; Packaging Options Across Use-Cases
              </h2>
            </AnimateIn>

            {/* Three paper cards */}
            <div className="relative mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
              {CASES.map((c, ci) => (
                <AnimateIn key={c.id} delay={ci * 0.08} className="flex h-full flex-col">
                  <div className="group flex h-full flex-col rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.06)]">

                    <div className="flex flex-col p-6 pb-5">
                      <div
                        className="mb-3 inline-flex size-11 items-center justify-center rounded-lg border border-black/[0.08] bg-[#f3f7f9] transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={BLEND}
                      >
                        {CASE_ICONS[c.id]}
                      </div>
                      <h3 className="text-base font-bold text-[#0f1b2d]">{c.title}</h3>
                      <p className="mt-1 text-[12px] font-medium text-[#0d9488]">{c.subtitle}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#0f1b2d]/55">{c.body}</p>
                      <button
                        onClick={() => setModal({ open: true, intent: c.id })}
                        className="group mt-4 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-[#0d9488]/30 bg-[#0d9488]/5 px-4 py-2 text-[12px] font-semibold text-[#0d9488] transition-all hover:border-[#0d9488] hover:bg-[#0d9488]/10"
                      >
                        {c.ctaLabel}
                        <ArrowRight className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </button>
                    </div>

                    <div className="mx-6 border-t border-black/[0.07]" />

                    <div className="flex flex-1 flex-col divide-y divide-black/[0.06] px-6 pb-5">
                      {c.features.map((f) => (
                        <div key={f.label} className="py-3">
                          <div className="flex items-center gap-1.5">
                            <f.Icon className="size-[12px] shrink-0 text-[#0d9488]" aria-hidden />
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0f1b2d]/50">
                              {f.label}
                            </p>
                          </div>
                          <p className="mt-1 pl-[18px] text-[12px] leading-snug text-[#0f1b2d]/55">{f.desc}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* Footnote */}
            <AnimateIn delay={0.25}>
              <p className="relative mt-6 px-2 text-xs italic text-[#0f1b2d]/70">
                * Only select features highlighted. Some features listed are available across all use-cases.
                Contact us to learn more about all available features and to receive a proposal, as it may differ from what is shown.
              </p>
            </AnimateIn>

          </div>

        </div>
      </section>

      {/* ══════════════ API Pricing section ══════════════ */}
      <section id="api-pricing" className="pricing-section bg-[#f8f9fa] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimateIn>
            <div className="relative overflow-hidden rounded-3xl bg-white px-8 py-10 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.06)]">

              {/* Teal bg decoration */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-10%] top-[10%] h-[280px] w-[460px] rotate-[-18deg] rounded-[28px] bg-[#2dd4bf]/20" />
                <div className="absolute right-[-16%] top-[25%] h-[220px] w-[420px] rotate-[-18deg] rounded-[28px] bg-[#0d9488]/12" />
              </div>

              <div className="relative">
                <h2 className="text-2xl font-semibold tracking-tight text-[#0f1b2d] md:text-3xl">
                  Integrate Emithran intelligence directly into your systems
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#0f1b2d]/50">
                  Usage-based pricing for teams embedding costing, sourcing, and risk intelligence into their own tools, ERP, and data pipelines.
                </p>
              </div>

              <div className="relative mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {API_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className={`relative flex flex-col rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.06)] ${
                      tier.featured ? 'bg-[#0f1b2d]' : 'bg-white'
                    }`}
                  >
                    {tier.featured && (
                      <span className="absolute -top-3 left-5 rounded-full bg-[#0d9488] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        Most popular
                      </span>
                    )}

                    <div className={`border-b p-6 pb-5 ${tier.featured ? 'border-white/10' : 'border-black/[0.07]'}`}>
                      <h3 className={`text-base font-bold ${tier.featured ? 'text-white' : 'text-[#0f1b2d]'}`}>{tier.name}</h3>
                      <div className="mt-1.5 flex items-baseline gap-1">
                        <span className={`text-2xl font-bold tabular-nums ${tier.featured ? 'text-white' : 'text-[#0f1b2d]'}`}>{tier.credits}</span>
                        <span className={`text-[11px] ${tier.featured ? 'text-white/45' : 'text-[#0f1b2d]/40'}`}>{tier.period}</span>
                      </div>
                      <p className={`mt-2 text-xs leading-relaxed ${tier.featured ? 'text-white/50' : 'text-[#0f1b2d]/45'}`}>{tier.description}</p>
                    </div>

                    <ul className={`flex-1 divide-y px-6 py-2 ${tier.featured ? 'divide-white/10' : 'divide-black/[0.05]'}`}>
                      {tier.features.map((f) => (
                        <li key={f.label} className="flex items-center justify-between gap-2 py-2.5 text-[12px]">
                          {f.value !== undefined ? (
                            <>
                              <span className={tier.featured ? 'text-white/50' : 'text-[#0f1b2d]/50'}>{f.label}</span>
                              <span className={`font-medium ${tier.featured ? 'text-white' : 'text-[#0f1b2d]'}`}>{f.value}</span>
                            </>
                          ) : (
                            <>
                              <span className={f.included ? (tier.featured ? 'text-white/75' : 'text-[#0f1b2d]/65') : (tier.featured ? 'text-white/25' : 'text-[#0f1b2d]/25')}>
                                {f.label}
                              </span>
                              {f.included
                                ? <span className="shrink-0 text-[#0d9488]">✓</span>
                                : <span className={`shrink-0 ${tier.featured ? 'text-white/20' : 'text-[#0f1b2d]/20'}`}>-</span>
                              }
                            </>
                          )}
                        </li>
                      ))}
                    </ul>

                    <div className="p-6 pt-4">
                      <button
                        onClick={() => setModal({ open: true, intent: `${tier.name} API` })}
                        className={`w-full rounded-full py-2.5 text-[13px] font-medium transition-all hover:-translate-y-px ${
                          tier.featured
                            ? 'bg-[#2dd4bf] text-[#0f1b2d] hover:bg-[#2dd4bf]/90'
                            : 'border border-black/[0.10] bg-white text-[#0f1b2d] hover:border-[#0d9488]/50'
                        }`}
                      >
                        Contact Sales
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </AnimateIn>
        </div>
      </section>

      {modal.open && (
        <ContactModal intent={modal.intent} onClose={() => setModal({ open: false, intent: '' })} />
      )}
    </>
  )
}
