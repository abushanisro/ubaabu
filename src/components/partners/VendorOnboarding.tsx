'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

/* ── Nav ──────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Work with a partner', href: '/about/partners',                   active: false },
  { label: 'Become a partner',    href: '/about/partners/become-a-partner',  active: false },
  { label: 'Vendor onboarding',   href: '/about/partners/vendor-onboarding', active: true  },
] as const

function PartnerEcosystemNav() {
  return (
    <div className="sticky top-[64px] z-40 border-b bg-white/95 backdrop-blur-md" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 md:px-12 py-0">
        <span className="hidden sm:block shrink-0 py-3 border-r pr-6 text-[13px] font-semibold" style={{ color: '#0f1b2d', borderColor: 'rgba(0,0,0,0.08)' }}>
          Partner Ecosystem
        </span>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map(({ label, href, active }) => (
            <Link key={label} href={href}
              className="relative whitespace-nowrap px-3 py-3.5 text-[13px] font-medium transition-colors"
              style={{ color: active ? '#0d9488' : 'rgba(15,27,45,0.5)' }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#0f1b2d' }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(15,27,45,0.5)' }}
            >
              {label}
              {active && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full" style={{ background: '#0d9488' }} />}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

/* ── Platform data (from Emithran supplier DB) ────────────────────── */

const SERVICES = [
  'Additive Manufacturing', 'CNC Machining', 'Centrifugal Casting',
  'Closed Die Forging', 'Cold Forging', 'Die Casting', 'FRP Moulding',
  'Forging', 'Gravity Die Casting', 'Hot Forging', 'Injection Moulding',
  'Investment Casting', 'Laser Cutting', 'Machining', 'Open Die Forging',
  'Pressure Die Casting', 'Ring Forging', 'Sand Casting',
  'Sheet Metal Fabrication', 'Sheet Metal Stamping', 'Welding',
]

const INDUSTRIES = [
  'Aerospace', 'Agricultural Equipment', 'Automotive', 'Defence',
  'Earthmover', 'Electrical', 'Electronic', 'Marine', 'Oil & Gas',
  'Rail & Transit', 'Space',
]

const CERTIFICATIONS = [
  'ISO 9001:2015', 'IATF 16949:2016', 'ISO 14001', 'ISO 3834',
  'AS9100', 'EN 9100', 'NADCAP', 'PED',
]

const PROCESSES = [
  'CNC Machining', 'Forging', 'Casting', 'Sheet Metal',
  'Additive Manufacturing', 'Welding', 'Injection Moulding',
]

const EQUIPMENT_TYPES: Record<string, string[]> = {
  'CNC Machining':          ['VMC', 'HMC', 'Turning Centre', 'Grinding Machine', 'EDM', 'Wire EDM'],
  'Forging':                ['Hammer Forge', 'Screw Press', 'Hydraulic Press', 'Ring Roll', 'Upset Forge'],
  'Casting':                ['HPDC Machine', 'Gravity Die', 'Sand Cast', 'Investment Cast', 'Centrifugal Cast'],
  'Sheet Metal':            ['Press Brake', 'Laser Cutter', 'Punch Press', 'Stamping Press', 'Shear'],
  'Additive Manufacturing': ['FDM', 'SLA', 'SLS', 'DMLS', 'Binder Jetting'],
  'Welding':                ['MIG', 'TIG', 'SAW', 'Spot Welding', 'Friction Stir'],
  'Injection Moulding':     ['Injection Moulding Machine'],
}

const COUNTRIES = [
  'India', 'Australia', 'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada',
  'China', 'Czech Republic', 'Denmark', 'Finland', 'France', 'Germany',
  'Hong Kong', 'Hungary', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan',
  'Malaysia', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland',
  'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea',
  'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam',
]

/* ── Helpers ──────────────────────────────────────────────────────── */

function genSupplierCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let c = 'EMT-'
  for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)]
  return c
}

const inputCls = [
  'w-full rounded-lg border px-3.5 py-2.5 text-[13px] bg-white outline-none transition',
  'border-[rgba(0,0,0,0.14)] text-[#0f1b2d] placeholder:text-[rgba(15,27,45,0.28)]',
  'focus:border-[#0d9488] focus:ring-2 focus:ring-[rgba(13,148,136,0.11)]',
].join(' ')

const labelCls = 'block text-[12px] font-medium mb-1.5 text-[rgba(15,27,45,0.6)]'

function Err({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-red-500">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
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
      <path d="M9 1L5 5 1 1" stroke="rgba(15,27,45,0.35)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/* ── Tag chip selector with "Other" ──────────────────────────────── */

function TagSelectorWithOther({
  options, selected, onChange, placeholder = 'Describe your service…',
}: {
  options: string[]
  selected: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const [showInput, setShowInput] = useState(false)
  const [draft, setDraft]         = useState('')

  function toggle(o: string) {
    onChange(selected.includes(o) ? selected.filter(x => x !== o) : [...selected, o])
  }

  function addCustom() {
    const val = draft.trim()
    if (val && !selected.includes(val)) onChange([...selected, val])
    setDraft('')
    setShowInput(false)
  }

  const customValues = selected.filter(s => !options.includes(s))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {/* Predefined chips */}
        {options.map(o => {
          const on = selected.includes(o)
          return (
            <button key={o} type="button" onClick={() => toggle(o)}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all select-none"
              style={{
                background:  on ? '#0d9488' : 'white',
                color:       on ? 'white'   : 'rgba(15,27,45,0.6)',
                borderColor: on ? '#0d9488' : 'rgba(15,27,45,0.14)',
                boxShadow:   on ? '0 0 0 3px rgba(13,148,136,0.15)' : 'none',
              }}
            >
              {o}
            </button>
          )
        })}

        {/* Custom values entered via Other */}
        {customValues.map(cv => (
          <button key={cv} type="button" onClick={() => toggle(cv)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all select-none"
            style={{
              background: '#0d9488', color: 'white', borderColor: '#0d9488',
              boxShadow: '0 0 0 3px rgba(13,148,136,0.15)',
            }}
          >
            {cv}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 2l6 6M8 2l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        ))}

        {/* + Other toggle chip */}
        <button type="button" onClick={() => { setShowInput(v => !v); setDraft('') }}
          className="px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all select-none"
          style={{
            background:  showInput ? 'rgba(13,148,136,0.08)' : 'white',
            color:       '#0d9488',
            borderColor: 'rgba(13,148,136,0.35)',
            borderStyle: 'dashed',
          }}
        >
          {showInput ? '− Cancel' : '+ Other'}
        </button>
      </div>

      {/* Inline input */}
      {showInput && (
        <div className="flex gap-2 items-center">
          <input
            autoFocus
            className={inputCls + ' flex-1'}
            placeholder={placeholder}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustom() } }}
          />
          <button
            type="button"
            onClick={addCustom}
            disabled={!draft.trim()}
            className="shrink-0 px-4 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg,#0d9488,#2dd4bf)' }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Step progress bar ────────────────────────────────────────────── */

const STEP_LABELS = ['Company', 'Capabilities', 'Equipment', 'Review']

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center mb-6 sm:mb-10">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1
        const done   = n < step
        const active = n === step
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                style={{
                  background: done || active ? '#0d9488' : 'rgba(15,27,45,0.07)',
                  color:      done || active ? 'white'   : 'rgba(15,27,45,0.35)',
                  boxShadow:  active ? '0 0 0 4px rgba(13,148,136,0.18)' : 'none',
                }}
              >
                {done
                  ? <svg width="12" height="10" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : n
                }
              </div>
              <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: active ? '#0d9488' : done ? '#0f1b2d' : 'rgba(15,27,45,0.35)' }}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className="flex-1 h-[2px] mx-3 mb-5 rounded-full transition-all"
                style={{ background: done ? '#0d9488' : 'rgba(15,27,45,0.1)' }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

/* ── Form type ────────────────────────────────────────────────────── */

type F = {
  companyName: string; firstName: string; lastName: string
  email: string; phone: string; website: string; country: string; city: string
  services: string[]; industries: string[]
  certifications: string[]
  process: string; equipmentType: string
  tonnage: string; maxLength: string; maxWidth: string; maxHeight: string
  notes: string
}

type Errs = Partial<Record<keyof Omit<F, 'services' | 'industries' | 'certifications'>, string>
  & { services: string }>

const INIT: F = {
  companyName: '', firstName: '', lastName: '', email: '', phone: '',
  website: '', country: 'India', city: '',
  services: [], industries: [],
  certifications: [],
  process: '', equipmentType: '', tonnage: '', maxLength: '', maxWidth: '', maxHeight: '',
  notes: '',
}

/* ── Step 1 - Company ─────────────────────────────────────────────── */

function Step1({ d, e, set }: { d: F; e: Errs; set: <K extends keyof F>(k: K, v: F[K]) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className={labelCls}>Company name</label>
        <input className={inputCls} placeholder="Acme Manufacturing Pvt. Ltd."
          value={d.companyName} onChange={ev => set('companyName', ev.target.value)} />
        <Err msg={e.companyName} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>First name</label>
          <input className={inputCls} placeholder="Arjun"
            value={d.firstName} onChange={ev => set('firstName', ev.target.value)} />
          <Err msg={e.firstName} />
        </div>
        <div>
          <label className={labelCls}>Last name</label>
          <input className={inputCls} placeholder="Sharma"
            value={d.lastName} onChange={ev => set('lastName', ev.target.value)} />
          <Err msg={e.lastName} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Work email</label>
          <input className={inputCls} type="email" placeholder="arjun@acme.com"
            value={d.email} onChange={ev => set('email', ev.target.value)} />
          <Err msg={e.email} />
        </div>
        <div>
          <label className={labelCls}>Phone <span className="font-normal opacity-60">(optional)</span></label>
          <input className={inputCls} placeholder="+91 98765 43210"
            value={d.phone} onChange={ev => set('phone', ev.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Company website <span className="font-normal opacity-60">(optional)</span></label>
        <input className={inputCls} placeholder="acme.com"
          value={d.website} onChange={ev => set('website', ev.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Country</label>
          <div className="relative">
            <select className={inputCls + ' appearance-none pr-8 cursor-pointer'}
              value={d.country} onChange={ev => set('country', ev.target.value)}>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Chevron />
          </div>
          <Err msg={e.country} />
        </div>
        <div>
          <label className={labelCls}>City</label>
          <input className={inputCls} placeholder="Bangalore"
            value={d.city} onChange={ev => set('city', ev.target.value)} />
          <Err msg={e.city} />
        </div>
      </div>
    </div>
  )
}

/* ── Step 2 - Capabilities ───────────────────────────────────────── */

function Step2({ d, e, set }: { d: F; e: Errs; set: <K extends keyof F>(k: K, v: F[K]) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className={labelCls + ' mb-3'}>
          Manufacturing services
          <span className="ml-1.5 font-normal opacity-60">Select all that apply</span>
        </label>
        <TagSelectorWithOther options={SERVICES} selected={d.services}
          onChange={v => set('services', v)}
          placeholder="e.g. Gear Cutting, Honing, Surface Treatment…" />
        <Err msg={e.services} />
      </div>

      <div>
        <label className={labelCls + ' mb-3'}>
          Industries served
          <span className="ml-1.5 font-normal opacity-60">Select all that apply</span>
        </label>
        <TagSelectorWithOther options={INDUSTRIES} selected={d.industries}
          onChange={v => set('industries', v)}
          placeholder="e.g. Semiconductor, Medical Devices…" />
      </div>
    </div>
  )
}

/* ── Step 3 - Equipment & Certs ──────────────────────────────────── */

function Step3({ d, e, set }: { d: F; e: Errs; set: <K extends keyof F>(k: K, v: F[K]) => void }) {
  const [processMode, setProcessMode]   = useState<'select' | 'custom'>('select')
  const [equipMode,   setEquipMode]     = useState<'select' | 'custom'>('select')

  const equipOpts = (processMode === 'select' && d.process)
    ? EQUIPMENT_TYPES[d.process] ?? []
    : []

  function handleProcessChange(val: string) {
    if (val === '__other__') {
      setProcessMode('custom')
      set('process', '')
      set('equipmentType', '')
      setEquipMode('select')
    } else {
      setProcessMode('select')
      set('process', val)
      set('equipmentType', '')
      setEquipMode('select')
    }
  }

  function handleEquipChange(val: string) {
    if (val === '__other__') {
      setEquipMode('custom')
      set('equipmentType', '')
    } else {
      setEquipMode('select')
      set('equipmentType', val)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className={labelCls + ' mb-3'}>
          Quality certifications
          <span className="ml-1.5 font-normal opacity-60">Select all you hold</span>
        </label>
        <TagSelectorWithOther options={CERTIFICATIONS} selected={d.certifications}
          onChange={v => set('certifications', v)}
          placeholder="e.g. ASME, DNV GL, BIS…" />
      </div>

      <div className="border-t pt-8" style={{ borderColor: 'rgba(15,27,45,0.07)' }}>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: '#0d9488' }}>
          Primary process block
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Process */}
          <div>
            <label className={labelCls}>Process</label>
            {processMode === 'select' ? (
              <div className="relative">
                <select
                  className={inputCls + ' appearance-none pr-8 cursor-pointer'}
                  value={d.process}
                  onChange={ev => handleProcessChange(ev.target.value)}
                >
                  <option value="">Select a process</option>
                  {PROCESSES.map(p => <option key={p} value={p}>{p}</option>)}
                  <option value="__other__">Other…</option>
                </select>
                <Chevron />
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  autoFocus
                  className={inputCls + ' flex-1'}
                  placeholder="e.g. Electroplating, Anodising…"
                  value={d.process}
                  onChange={ev => set('process', ev.target.value)}
                />
                <button
                  type="button"
                  onClick={() => { setProcessMode('select'); set('process', ''); set('equipmentType', '') }}
                  className="shrink-0 px-3 py-2 rounded-lg border text-[12px] transition-colors"
                  style={{ color: 'rgba(15,27,45,0.5)', borderColor: 'rgba(15,27,45,0.15)' }}
                >
                  ↩
                </button>
              </div>
            )}
          </div>

          {/* Equipment type */}
          <div>
            <label className={labelCls}>Equipment type</label>
            {equipMode === 'select' ? (
              <div className="relative">
                <select
                  className={inputCls + ' appearance-none pr-8 cursor-pointer'}
                  value={d.equipmentType}
                  onChange={ev => handleEquipChange(ev.target.value)}
                  disabled={!d.process && processMode === 'select'}
                >
                  <option value="">Select equipment</option>
                  {equipOpts.map(t => <option key={t} value={t}>{t}</option>)}
                  <option value="__other__">Other…</option>
                </select>
                <Chevron />
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  autoFocus
                  className={inputCls + ' flex-1'}
                  placeholder="e.g. Rotary Table, 5-axis VMC…"
                  value={d.equipmentType}
                  onChange={ev => set('equipmentType', ev.target.value)}
                />
                <button
                  type="button"
                  onClick={() => { setEquipMode('select'); set('equipmentType', '') }}
                  className="shrink-0 px-3 py-2 rounded-lg border text-[12px] transition-colors"
                  style={{ color: 'rgba(15,27,45,0.5)', borderColor: 'rgba(15,27,45,0.15)' }}
                >
                  ↩
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {([
            ['tonnage', 'Max tonnage (t)',  '250'  ],
            ['maxLength', 'Max L (mm)',     '2000' ],
            ['maxWidth',  'Max W (mm)',     '1000' ],
            ['maxHeight', 'Max H (mm)',     '800'  ],
          ] as [keyof F, string, string][]).map(([key, label, ph]) => (
            <div key={key}>
              <label className={labelCls}>{label}</label>
              <input className={inputCls} type="number" placeholder={ph}
                value={d[key] as string} onChange={ev => set(key, ev.target.value)} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Additional notes <span className="font-normal opacity-60">(optional)</span></label>
        <textarea className={inputCls + ' resize-none'} rows={3}
          placeholder="Special processes, capacity details, export experience, etc."
          value={d.notes} onChange={ev => set('notes', ev.target.value)} />
      </div>
    </div>
  )
}

/* ── Step 4 - Review ─────────────────────────────────────────────── */

function ReviewRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(15,27,45,0.06)' }}>
      <span className="w-24 sm:w-36 shrink-0 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'rgba(15,27,45,0.4)' }}>{label}</span>
      <span className="text-[13px]" style={{ color: '#0f1b2d' }}>{value}</span>
    </div>
  )
}

function ReviewTags({ label, tags }: { label: string; tags: string[] }) {
  if (!tags.length) return null
  return (
    <div className="py-3 border-b" style={{ borderColor: 'rgba(15,27,45,0.06)' }}>
      <span className="block text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: 'rgba(15,27,45,0.4)' }}>{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-medium border"
            style={{ color: '#0d9488', borderColor: 'rgba(13,148,136,0.3)', background: 'rgba(13,148,136,0.06)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function Step4({ d, supplierCode }: { d: F; supplierCode: string }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Supplier code badge */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{ background: 'rgba(13,148,136,0.05)', border: '1.5px solid rgba(13,148,136,0.2)' }}>
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#0d9488' }}>Auto-generated supplier code</p>
          <p className="text-2xl font-bold font-mono tracking-wider" style={{ color: '#0f1b2d' }}>{supplierCode}</p>
        </div>
        <p className="text-[12px] leading-relaxed max-w-xs" style={{ color: 'rgba(15,27,45,0.5)' }}>
          This code will be assigned to your supplier profile in the Emithran database upon approval.
        </p>
      </div>

      {/* Company */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(15,27,45,0.08)' }}>
        <div className="px-5 py-3 border-b" style={{ background: 'rgba(15,27,45,0.02)', borderColor: 'rgba(15,27,45,0.08)' }}>
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'rgba(15,27,45,0.5)' }}>Company</span>
        </div>
        <div className="px-5">
          <ReviewRow label="Company"  value={d.companyName} />
          <ReviewRow label="Contact"  value={`${d.firstName} ${d.lastName}`.trim()} />
          <ReviewRow label="Email"    value={d.email} />
          <ReviewRow label="Phone"    value={d.phone} />
          <ReviewRow label="Website"  value={d.website} />
          <ReviewRow label="Location" value={[d.city, d.country].filter(Boolean).join(', ')} />
        </div>
      </div>

      {/* Capabilities */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(15,27,45,0.08)' }}>
        <div className="px-5 py-3 border-b" style={{ background: 'rgba(15,27,45,0.02)', borderColor: 'rgba(15,27,45,0.08)' }}>
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'rgba(15,27,45,0.5)' }}>Capabilities</span>
        </div>
        <div className="px-5 py-1">
          <ReviewTags label="Services"         tags={d.services} />
          <ReviewTags label="Industries"       tags={d.industries} />
          <ReviewTags label="Certifications"   tags={d.certifications} />
        </div>
      </div>

      {/* Equipment */}
      {(d.process || d.tonnage) && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(15,27,45,0.08)' }}>
          <div className="px-5 py-3 border-b" style={{ background: 'rgba(15,27,45,0.02)', borderColor: 'rgba(15,27,45,0.08)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'rgba(15,27,45,0.5)' }}>Equipment</span>
          </div>
          <div className="px-5">
            <ReviewRow label="Process"    value={d.process} />
            <ReviewRow label="Equipment"  value={d.equipmentType} />
            <ReviewRow label="Tonnage"    value={d.tonnage ? `${d.tonnage} t` : undefined} />
            <ReviewRow label="Max L×W×H"
              value={[d.maxLength, d.maxWidth, d.maxHeight].every(Boolean)
                ? `${d.maxLength} × ${d.maxWidth} × ${d.maxHeight} mm` : undefined} />
            <ReviewRow label="Notes"      value={d.notes} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main form ────────────────────────────────────────────────────── */

function VendorOnboardingForm() {
  const [step, setStep]       = useState(1)
  const [data, setData]       = useState<F>(INIT)
  const [errors, setErrors]   = useState<Errs>({})
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [supplierCode]        = useState(() => genSupplierCode())
  const [cfToken, setCfToken] = useState('')
  const turnstileRef          = useRef<TurnstileInstance>(null)

  function set<K extends keyof F>(key: K, val: F[K]) {
    setData(d => ({ ...d, [key]: val }))
    setErrors(e => { const n = { ...e }; delete n[key as keyof Errs]; return n })
  }

  function transition(to: number) {
    setVisible(false)
    setTimeout(() => { setStep(to); setVisible(true) }, 140)
  }

  function validateStep(): Errs {
    const e: Errs = {}
    if (step === 1) {
      if (!data.companyName.trim()) e.companyName = 'Required'
      if (!data.firstName.trim())  e.firstName   = 'Required'
      if (!data.lastName.trim())   e.lastName    = 'Required'
      if (!data.email.trim())      e.email       = 'Required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email'
      if (!data.city.trim())       e.city        = 'Required'
    }
    if (step === 2) {
      if (!data.services.length) e.services = 'Select at least one service'
    }
    return e
  }

  function next() {
    const e = validateStep()
    if (Object.keys(e).length) { setErrors(e); return }
    transition(step + 1)
  }

  function back() {
    transition(step - 1)
  }

  async function submit() {
    setLoading(true)
    try {
      const res = await fetch('/api/vendor-onboard', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, supplierCode, cfToken }),
      })
      if (!res.ok) throw new Error('Request failed')
      setDone(true)
    } catch {
      turnstileRef.current?.reset()
      setCfToken('')
      setErrors(e => ({ ...e, notes: 'Something went wrong. Please try again or email partner@emithran.com.' }))
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border bg-white p-6 sm:p-10 flex flex-col items-center text-center gap-5"
        style={{ borderColor: 'rgba(13,148,136,0.15)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(13,148,136,0.1)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="rgba(13,148,136,0.12)" />
            <path d="M7 12.5l3.5 3.5 6-7" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="text-[20px] font-bold mb-2" style={{ color: '#0f1b2d' }}>Application submitted</h3>
          <p className="text-[13px] leading-relaxed max-w-sm" style={{ color: 'rgba(15,27,45,0.55)' }}>
            Your vendor profile has been submitted to the Emithran supplier database. Our team will review and be in touch within 3 business days.
          </p>
        </div>
        <div className="rounded-xl px-6 py-4 w-full max-w-xs"
          style={{ background: 'rgba(13,148,136,0.06)', border: '1.5px solid rgba(13,148,136,0.2)' }}>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#0d9488' }}>Your supplier code</p>
          <p className="text-2xl font-bold font-mono tracking-widest" style={{ color: '#0f1b2d' }}>{supplierCode}</p>
        </div>
        <Link href="/about/partners"
          className="text-[13px] font-medium transition-colors"
          style={{ color: 'rgba(15,27,45,0.45)' }}>
          ← Back to Partner Ecosystem
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-8 shadow-sm" style={{ borderColor: 'rgba(13,148,136,0.12)' }}>
      <StepBar step={step} />

      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.14s ease' }}>
        {step === 1 && <Step1 d={data} e={errors} set={set} />}
        {step === 2 && <Step2 d={data} e={errors} set={set} />}
        {step === 3 && <Step3 d={data} e={errors} set={set} />}
        {step === 4 && (
          <>
            <Step4 d={data} supplierCode={supplierCode} />
            <div className="mt-6">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={setCfToken}
                onExpire={() => setCfToken('')}
                onError={() => setCfToken('')}
                options={{ theme: 'light', size: 'normal' }}
              />
            </div>
          </>
        )}
      </div>

      {/* Nav buttons */}
      <div className="mt-6 sm:mt-8 flex items-center justify-between gap-4">
        {step > 1
          ? <button type="button" onClick={back}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-medium border transition-colors"
              style={{ color: 'rgba(15,27,45,0.6)', borderColor: 'rgba(15,27,45,0.15)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(15,27,45,0.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: 'scaleX(-1)' }}>
                <path d="M0 5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6" />
                <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
          : <div />
        }

        <div className="flex items-center gap-3">
          <span className="text-[11px]" style={{ color: 'rgba(15,27,45,0.35)' }}>
            Step {step} of {STEP_LABELS.length}
          </span>

          {step < 4
            ? <button type="button" onClick={next}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-85 group"
                style={{ background: 'linear-gradient(135deg, #0d9488, #2dd4bf)' }}
              >
                Continue
                <AnimatedArrow />
              </button>
            : <button type="button" onClick={submit} disabled={loading || !cfToken}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #0d9488, #2dd4bf)' }}
              >
                {loading ? 'Submitting…' : 'Submit application'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function VendorOnboardingPage() {
  return (
    <main>
      <PartnerEcosystemNav />
      <section className="bg-white py-12 sm:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

            {/* Left - copy */}
            <div className="lg:pt-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest mb-5 px-3 py-1 rounded-full"
                style={{ color: '#0d9488', background: 'rgba(13,148,136,0.08)' }}>
                Vendor onboarding
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-5" style={{ color: '#0f1b2d' }}>
                Join the Emithran supplier database
              </h1>
              <p className="text-[15px] leading-relaxed mb-6 sm:mb-8" style={{ color: 'rgba(15,27,45,0.6)' }}>
                Register your manufacturing capabilities to be discovered by OEMs and procurement teams across space, defence, and aerospace. Approval typically takes 3 business days.
              </p>

              {/* What you get */}
              <div className="flex flex-col gap-4">
                {[
                  ['Verified profile', 'Listed in the Emithran supplier database with capability tags, certifications, and process specs.'],
                  ['OEM visibility',   'Directly discoverable by procurement teams running should-cost and sourcing analyses.'],
                  ['Auto supplier code', 'Receive a unique EMT- supplier code assigned on approval for platform-wide identification.'],
                ].map(([title, body]) => (
                  <div key={title} className="flex gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: 'rgba(13,148,136,0.12)' }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="#0d9488" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold mb-0.5" style={{ color: '#0f1b2d' }}>{title}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.55)' }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[12px]" style={{ color: 'rgba(15,27,45,0.4)' }}>
                Questions? Contact us at{' '}
                <a href="mailto:partner@emithran.com" className="text-[#0d9488] hover:underline">partner@emithran.com</a>
              </p>
            </div>

            {/* Right - form */}
            <VendorOnboardingForm />
          </div>
        </div>
      </section>
    </main>
  )
}
