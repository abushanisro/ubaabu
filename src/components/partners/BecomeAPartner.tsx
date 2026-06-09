'use client'

import React, { Suspense, useState, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

/* ── Nav (Become a partner active) ───────────────────────────────── */

const NAV_LINKS = [
  { label: 'Work with a partner', href: '/about/partners',                       active: false              },
  { label: 'Become a partner',    href: '/about/partners/become-a-partner',      active: true               },
  { label: 'Vendor onboarding',   href: '/about/partners/vendor-onboarding',     active: false },
] as const

function PartnerEcosystemNav() {
  return (
    <div className="sticky top-[64px] z-40 border-b bg-white/95 backdrop-blur-md" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 md:px-12 py-0">
        <span className="hidden sm:block shrink-0 py-3 border-r pr-6 text-[13px] font-semibold tracking-tight" style={{ color: '#0f1b2d', borderColor: 'rgba(0,0,0,0.08)' }}>
          Partner Ecosystem
        </span>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map(({ label, href, active, ...rest }) => (
            <Link
              key={label}
              href={href}
              {...('external' in rest && rest.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="relative whitespace-nowrap px-3 py-3.5 text-[13px] font-medium transition-colors"
              style={{ color: active ? '#0d9488' : 'rgba(15,27,45,0.5)' }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#0f1b2d' }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(15,27,45,0.5)' }}
            >
              {label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full" style={{ background: '#0d9488' }} />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

/* ── Form constants ───────────────────────────────────────────────── */

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica',
  'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Honduras', 'Hong Kong',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
  'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg', 'Malaysia', 'Malta', 'Mexico',
  'Moldova', 'Monaco', 'Morocco', 'Mozambique', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovakia',
  'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden',
  'Switzerland', 'Taiwan', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
  'Uzbekistan', 'Venezuela', 'Vietnam', 'Zimbabwe',
]

const TRACKS = [
  'System Integrator (ERP / MES)',
  'Technology Partner',
  'Industry Consultant',
  'Reseller / Distributor',
]

const TRACK_SLUG_MAP: Record<string, string> = {
  'system-integrator':    'System Integrator (ERP / MES)',
  'technology-partner':   'Technology Partner',
  'industry-consultant':  'Industry Consultant',
  'reseller-distributor': 'Reseller / Distributor',
}

const PARTNERSHIP_MODELS = [
  'Co-marketing & events',
  'Co-selling & referrals',
  'Platform integration',
  'Implementation services',
  'Training & certification',
]

/* ── Helpers ──────────────────────────────────────────────────────── */

const inputCls = [
  'w-full rounded-lg border px-3.5 py-2.5 text-[13px] bg-white outline-none transition',
  'border-[rgba(0,0,0,0.15)] text-[#0f1b2d] placeholder:text-[rgba(15,27,45,0.3)]',
  'focus:border-[#0d9488] focus:ring-2 focus:ring-[rgba(13,148,136,0.12)]',
].join(' ')

const labelCls = 'block text-[12px] font-medium mb-1.5 text-[rgba(15,27,45,0.65)]'

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-red-600">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <circle cx="8" cy="8" r="8" fill="rgba(220,38,38,0.15)" />
        <path d="M8 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-8a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1z" fill="#dc2626" />
      </svg>
      {msg}
    </p>
  )
}

function Chevron() {
  return (
    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="10" height="6" viewBox="0 0 10 7" fill="none">
      <path d="M9 1L5 5 1 1" stroke="rgba(15,27,45,0.4)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Checkmark() {
  return (
    <svg width="9" height="7" viewBox="0 0 8 7" fill="none">
      <path d="M7.16.18L2.4 4.79 1.13 3.43a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36C3.2 6.33 7.77.86 7.77.86c.6-.6-.13-1.15-.6-.68z" fill="white" />
    </svg>
  )
}

function CheckBox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className="w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-all cursor-pointer"
      style={{
        borderColor: checked ? '#0d9488' : 'rgba(15,27,45,0.2)',
        background:   checked ? '#0d9488' : 'white',
      }}
    >
      {checked && <Checkmark />}
    </div>
  )
}

/* ── Form ─────────────────────────────────────────────────────────── */

type Fields = {
  firstName: string; lastName: string; website: string; email: string;
  country: string; track: string; models: string[]; reason: string;
  accountId: string; marketingOptIn: boolean
}
type Errs = Partial<Record<'firstName' | 'lastName' | 'website' | 'email' | 'country' | 'track' | 'reason', string>>

function BecomeAPartnerForm() {
  const params = useSearchParams()
  const initialTrack = TRACK_SLUG_MAP[params.get('track') ?? ''] ?? ''

  const [fields, setFields] = useState<Fields>({
    firstName: '', lastName: '', website: '', email: '', country: '',
    track: initialTrack, models: [], reason: '', accountId: '', marketingOptIn: false,
  })
  const [errors, setErrors] = useState<Errs>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cfToken, setCfToken] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)

  function set<K extends keyof Fields>(key: K, val: Fields[K]) {
    setFields(f => ({ ...f, [key]: val }))
    setErrors(e => { const n = { ...e }; delete n[key as keyof Errs]; return n })
  }

  function toggleModel(m: string) {
    setFields(f => ({ ...f, models: f.models.includes(m) ? f.models.filter(x => x !== m) : [...f.models, m] }))
  }

  function validate(): Errs {
    const e: Errs = {}
    if (!fields.firstName.trim()) e.firstName = 'Required'
    if (!fields.lastName.trim())  e.lastName  = 'Required'
    if (!fields.website.trim())   e.website   = 'Required'
    if (!fields.email.trim())     e.email     = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Enter a valid work email'
    if (!fields.country)          e.country   = 'Required'
    if (!fields.track)            e.track     = 'Required'
    if (!fields.reason.trim())    e.reason    = 'Required'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('/api/partner-apply', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...fields, cfToken }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
    } catch {
      turnstileRef.current?.reset()
      setCfToken('')
      setErrors({ reason: 'Something went wrong. Please try again or email emithran@emuski.com.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border bg-white p-6 sm:p-10 flex flex-col items-center text-center gap-4"
        style={{ borderColor: 'rgba(13,148,136,0.15)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.1)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="rgba(13,148,136,0.15)" />
            <path d="M7 12.5l3.5 3.5 6-7" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-[18px] font-bold" style={{ color: '#0f1b2d' }}>We've received your information.</h3>
        <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'rgba(15,27,45,0.55)' }}>
          Thank you for your interest in the Emithran Partner Ecosystem. We will be in touch with next steps on how to start your Emithran Partner journey.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-8 shadow-sm" style={{ borderColor: 'rgba(13,148,136,0.13)' }}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-5">

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>First name</label>
              <input className={inputCls} type="text" placeholder="Jane"
                value={fields.firstName} onChange={e => set('firstName', e.target.value)} />
              {errors.firstName && <ErrorMsg msg={errors.firstName} />}
            </div>
            <div>
              <label className={labelCls}>Last name</label>
              <input className={inputCls} type="text" placeholder="Smith"
                value={fields.lastName} onChange={e => set('lastName', e.target.value)} />
              {errors.lastName && <ErrorMsg msg={errors.lastName} />}
            </div>
          </div>

          {/* Company website */}
          <div>
            <label className={labelCls}>Company website</label>
            <input className={inputCls} type="text" placeholder="example.com"
              value={fields.website} onChange={e => set('website', e.target.value)} />
            {errors.website && <ErrorMsg msg={errors.website} />}
          </div>

          {/* Work email */}
          <div>
            <label className={labelCls}>Work email</label>
            <input className={inputCls} type="email" placeholder="jane@example.com"
              value={fields.email} onChange={e => set('email', e.target.value)} />
            {errors.email && <ErrorMsg msg={errors.email} />}
          </div>

          {/* Country */}
          <div>
            <label className={labelCls}>Country / Region</label>
            <div className="relative">
              <select className={inputCls + ' appearance-none pr-8 cursor-pointer'}
                value={fields.country} onChange={e => set('country', e.target.value)}>
                <option value="" disabled>Select a country</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Chevron />
            </div>
            {errors.country && <ErrorMsg msg={errors.country} />}
          </div>

          {/* Track */}
          <div>
            <label className={labelCls}>Which partner track best describes your business?</label>
            <div className="relative">
              <select className={inputCls + ' appearance-none pr-8 cursor-pointer'}
                value={fields.track} onChange={e => set('track', e.target.value)}>
                <option value="" disabled>Select a track</option>
                {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <Chevron />
            </div>
            {errors.track && <ErrorMsg msg={errors.track} />}
          </div>

          {/* Partnership models */}
          <div>
            <label className={labelCls}>
              What is your ideal partnership model?
              <span className="ml-1.5 font-normal opacity-60">Select all that apply.</span>
            </label>
            <div className="flex flex-col gap-2.5 mt-1">
              {PARTNERSHIP_MODELS.map(m => (
                <label key={m} className="flex items-center gap-2.5 cursor-pointer">
                  <CheckBox checked={fields.models.includes(m)} onChange={() => toggleModel(m)} />
                  <span className="text-[13px]" style={{ color: 'rgba(15,27,45,0.75)' }}>{m}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className={labelCls}>Why are you interested in partnering with Emithran?</label>
            <textarea className={inputCls + ' resize-none'} rows={3}
              placeholder="Describe how you plan to bring Emithran's cost intelligence to manufacturing clients — ERP integration, should-cost consulting, supplier benchmarking, etc."
              value={fields.reason} onChange={e => set('reason', e.target.value)} />
            {errors.reason && <ErrorMsg msg={errors.reason} />}
          </div>

          {/* Account ID */}
          <div>
            <label className={labelCls}>
              Emithran Workspace ID
              <span className="ml-1.5 font-normal opacity-60">(if you are already trialing the platform)</span>
            </label>
            <input className={inputCls} type="text" placeholder="ws_xxxxxxxx"
              value={fields.accountId} onChange={e => set('accountId', e.target.value)} />
          </div>

          {/* Marketing opt-in */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="mt-0.5">
              <CheckBox checked={fields.marketingOptIn} onChange={() => set('marketingOptIn', !fields.marketingOptIn)} />
            </div>
            <span className="text-[12px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.5)' }}>
              Get emails from Emithran about platform updates, manufacturing intelligence insights, and partner events. You can unsubscribe at any time.
            </span>
          </label>

          {/* Turnstile */}
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={setCfToken}
            onExpire={() => setCfToken('')}
            onError={() => setCfToken('')}
            options={{ theme: 'light', size: 'normal' }}
          />

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading || !cfToken}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-60 group"
              style={{ background: 'linear-gradient(135deg, #0d9488, #2dd4bf)' }}
            >
              {loading ? 'Submitting…' : (
                <>
                  Submit
                  <AnimatedArrow />
                </>
              )}
            </button>
          </div>

          {/* Privacy */}
          <p className="text-[11px]" style={{ color: 'rgba(15,27,45,0.38)' }}>
            Emithran will handle your data pursuant to its{' '}
            <Link href="/privacy" className="underline hover:text-[#0d9488] transition-colors">Privacy Policy</Link>.
          </p>

        </div>
      </form>
    </div>
  )
}

/* ── Explore section ──────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M0 5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExploreSection() {
  return (
    <section className="border-t bg-white py-10 sm:py-16 px-6 md:px-12" style={{ borderColor: 'rgba(13,148,136,0.10)' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* 1 — Explore ecosystem (spans 2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug" style={{ color: '#0f1b2d' }}>
              Explore our ecosystem of partners
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.55)' }}>
              Discover how Emithran partners help organisations of all sizes.
            </p>
            <Link
              href="/about/partners"
              className="mt-2 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white self-start transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, #0d9488, #2dd4bf)' }}
            >
              View partner directory <ArrowIcon />
            </Link>
          </div>

          {/* 2 — Already a partner */}
          <div className="flex flex-col gap-3">
            <div className="mb-1">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="bapPersonClip">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 8C25.8366 8 33 15.1634 33 24C33 29.087 30.626 33.6195 26.9256 36.5501C26.0383 33.2393 21.9317 30.7368 17 30.7368C12.0683 30.7368 7.96174 33.2392 7.07298 36.5493C3.37396 33.6195 1 29.087 1 24C1 15.1634 8.16344 8 17 8ZM17 18C14.2386 18 12 20.2386 12 23C12 25.7614 14.2386 28 17 28C19.7614 28 22 25.7614 22 23C22 20.2386 19.7614 18 17 18Z" />
                  </clipPath>
                </defs>
                <path fillRule="evenodd" clipRule="evenodd" d="M17 8C25.8366 8 33 15.1634 33 24C33 29.087 30.626 33.6195 26.9256 36.5501C26.0383 33.2393 21.9317 30.7368 17 30.7368C12.0683 30.7368 7.96174 33.2392 7.07298 36.5493C3.37396 33.6195 1 29.087 1 24C1 15.1634 8.16344 8 17 8ZM17 18C14.2386 18 12 20.2386 12 23C12 25.7614 14.2386 28 17 28C19.7614 28 22 25.7614 22 23C22 20.2386 19.7614 18 17 18Z" fill="rgba(13,148,136,0.15)" />
                <path fillRule="evenodd" clipRule="evenodd" d="M30 3C34.9706 3 39 7.02944 39 12C39 16.9706 34.9706 21 30 21C25.0294 21 21 16.9706 21 12C21 7.02944 25.0294 3 30 3ZM33.94 7.73L28 13.78L26.43 12C26.1336 11.7182 25.6762 11.6943 25.352 11.9436C25.0279 12.193 24.9337 12.6413 25.13 13L27 16.2C27.1823 16.4942 27.5039 16.6732 27.85 16.6732C28.1961 16.6732 28.5177 16.4942 28.7 16.2C29 15.79 34.7 8.63 34.7 8.63C35.45 7.83 34.54 7.12 33.94 7.73Z" fill="#0d9488" />
                <g clipPath="url(#bapPersonClip)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M30 3C34.9706 3 39 7.02944 39 12C39 16.9706 34.9706 21 30 21C25.0294 21 21 16.9706 21 12C21 7.02944 25.0294 3 30 3ZM33.94 7.73L28 13.78L26.43 12C26.1336 11.7182 25.6762 11.6943 25.352 11.9436C25.0279 12.193 24.9337 12.6413 25.13 13L27 16.2C27.1823 16.4942 27.5039 16.6732 27.85 16.6732C28.1961 16.6732 28.5177 16.4942 28.7 16.2C29 15.79 34.7 8.63 34.7 8.63C35.45 7.83 34.54 7.12 33.94 7.73Z" fill="rgba(13,148,136,0.5)" />
                </g>
              </svg>
            </div>
            <h3 className="text-[15px] font-bold" style={{ color: '#0f1b2d' }}>Already an Emithran partner?</h3>
            <p className="text-[13px] leading-relaxed flex-1" style={{ color: 'rgba(15,27,45,0.55)' }}>
              Manage your benefits in the partner portal.
            </p>
            <a
              href="https://portal.emithran.in/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
              style={{ color: '#0d9488' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a7c72' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0d9488' }}
            >
              Log in <ArrowIcon />
            </a>
          </div>

          {/* 3 — View requirements */}
          <div className="flex flex-col gap-3">
            <div className="mb-1">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="bapDocClip">
                    <path d="M22 4C22 1.79086 20.2091 0 18 0H4C1.79086 0 0 1.79086 0 4V32C0 34.2091 1.79086 36 4 36H18C20.2091 36 22 34.2091 22 32V4Z" />
                  </clipPath>
                </defs>
                <path d="M22 4C22 1.79086 20.2091 0 18 0H4C1.79086 0 0 1.79086 0 4V32C0 34.2091 1.79086 36 4 36H18C20.2091 36 22 34.2091 22 32V4Z" fill="rgba(13,148,136,0.15)" />
                <path d="M4 8h14M4 14h14M4 20h9M4 26h7" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M30 15C34.4183 15 38 18.5817 38 23C38 27.4183 34.4183 31 30 31C25.5817 31 22 27.4183 22 23C22 18.5817 25.5817 15 30 15ZM33.47 19.73L28.5 24.78L27.04 23C26.7754 22.718 26.363 22.6944 26.074 22.9436C25.785 23.193 25.7025 23.6413 25.877 24L27.5 26.85C27.6636 27.1227 27.9535 27.2917 28.265 27.2917C28.5765 27.2917 28.8664 27.1227 29.03 26.85C29.29 26.49 33.68 20.63 33.68 20.63C34.32 19.93 33.55 19.32 33.47 19.73Z" fill="#0d9488" />
                <g clipPath="url(#bapDocClip)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M30 15C34.4183 15 38 18.5817 38 23C38 27.4183 34.4183 31 30 31C25.5817 31 22 27.4183 22 23C22 18.5817 25.5817 15 30 15ZM33.47 19.73L28.5 24.78L27.04 23C26.7754 22.718 26.363 22.6944 26.074 22.9436C25.785 23.193 25.7025 23.6413 25.877 24L27.5 26.85C27.6636 27.1227 27.9535 27.2917 28.265 27.2917C28.5765 27.2917 28.8664 27.1227 29.03 26.85C29.29 26.49 33.68 20.63 33.68 20.63C34.32 19.93 33.55 19.32 33.47 19.73Z" fill="rgba(13,148,136,0.5)" />
                </g>
              </svg>
            </div>
            <h3 className="text-[15px] font-bold" style={{ color: '#0f1b2d' }}>View partner requirements</h3>
            <p className="text-[13px] leading-relaxed flex-1" style={{ color: 'rgba(15,27,45,0.55)' }}>
              See what it takes to become an Emithran partner.
            </p>
            <Link
              href="/about/partners/become-a-partner"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
              style={{ color: '#0d9488' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a7c72' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0d9488' }}
            >
              View requirements <ArrowIcon />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function BecomeAPartnerPage() {
  return (
    <main>
      <PartnerEcosystemNav />
      <section className="bg-white py-12 sm:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

            {/* Left — copy */}
            <div className="lg:pt-2">
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-widest mb-5 px-3 py-1 rounded-full"
                style={{ color: '#0d9488', background: 'rgba(13,148,136,0.08)' }}
              >
                Become a partner
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-5" style={{ color: '#0f1b2d' }}>
                Interested in becoming an Emithran&nbsp;partner?
              </h1>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
                Tell us about yourself to start your journey to become an Emithran partner. Questions? Reach out to us at{' '}
                <a href="mailto:emithran@emuski.com" className="text-[#0d9488] hover:underline">
                  emithran@emuski.com
                </a>.
              </p>
            </div>

            {/* Right — form */}
            <Suspense fallback={<div className="rounded-2xl border bg-white p-8" style={{ borderColor: 'rgba(13,148,136,0.13)', minHeight: 400 }} />}>
              <BecomeAPartnerForm />
            </Suspense>

          </div>
        </div>
      </section>
      <ExploreSection />
    </main>
  )
}
