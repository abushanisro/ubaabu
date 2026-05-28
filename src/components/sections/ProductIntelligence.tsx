'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import type { PartType } from '@/components/three/CncPartViewer'

const CncPartViewer = dynamic(
  () => import('@/components/three/CncPartViewer'),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

const AiSphere = dynamic(
  () => import('@/components/three/AiSphere'),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
)

// ── Data ──────────────────────────────────────────────────────

type Group = 'DESIGN' | 'BUILD' | 'SHIP'

interface Module {
  id: string
  group: Group
  title: string
  part: PartType
  desc: string
  features: string[]
  cta: string
}

const modules: Module[] = [
  {
    id: 'bom',
    group: 'DESIGN',
    title: 'BOM Composer',
    part: 'bracket',
    desc: 'Automatically generate and maintain multi-level Bills of Materials using AI — linking parts, drawings, and revisions with zero manual overhead.',
    features: ['AI-assisted BOM generation from CAD and specs', 'Auto-linked revisions and engineering change orders', 'Real-time cross-team BOM synchronisation'],
    cta: 'Explore AI BOM Engine',
  },
  {
    id: 'process',
    group: 'DESIGN',
    title: 'Should-Cost Engine',
    part: 'shaft',
    desc: 'AI builds a ground-up should-cost model for every part — routing, machine time, material, and overhead — so you negotiate from data, not gut feel.',
    features: ['AI process routing and cycle-time estimation', 'Live material and machine cost benchmarks', 'Instant OEM vs. supplier cost comparison'],
    cta: 'Explore Should-Cost Modeler',
  },
  {
    id: 'vave',
    group: 'DESIGN',
    title: 'VAVE Studio',
    part: 'blade',
    desc: 'AI generates targeted VAVE ideas using SCAMPER and TRIZ — grounded in your should-cost data and ranked by savings potential.',
    features: ['AI idea engine via SCAMPER and TRIZ frameworks', 'Savings ranked against live should-cost benchmarks', 'End-to-end idea-to-approval tracking'],
    cta: 'Explore AI Value Engineering',
  },
  {
    id: 'eval',
    group: 'BUILD',
    title: 'Supplier Radar',
    part: 'housing',
    desc: 'AI scores supplier capability across technical, financial, and quality dimensions — shortlisting the best-fit partners before you send a single RFQ.',
    features: ['AI technical feasibility and risk scoring', 'Automated supplier shortlist generation', 'Bulk RFQ dispatch with response consolidation'],
    cta: 'Explore AI Supplier Scoring',
  },
  {
    id: 'nom',
    group: 'BUILD',
    title: 'Vendor Match',
    part: 'valve',
    desc: 'AI weighs cost, quality, delivery, and technology signals to surface the optimal supplier nomination — with a full audit trail for compliance.',
    features: ['AI multi-criteria supplier ranking', 'Explainable nomination recommendation', 'Compliance-ready decision audit trail'],
    cta: 'Explore AI Nomination Engine',
  },
  {
    id: 'prod',
    group: 'BUILD',
    title: 'Launch Tracker',
    part: 'flange',
    desc: 'AI schedules and tracks every production milestone — from ISIR to mass production — flagging delays before they become disruptions.',
    features: ['AI-driven milestone scheduling and alerts', 'ISIR, PPAP, and lot sign-off automation', 'Cross-functional production visibility dashboard'],
    cta: 'Explore AI Production Planner',
  },
  {
    id: 'quality',
    group: 'BUILD',
    title: 'Quality Guard',
    part: 'fitting',
    desc: 'AI-guided inspection protocols detect defect patterns early and auto-generate PPAP and APQP documentation — keeping quality scores consistently high.',
    features: ['AI defect pattern detection and root cause', 'Smart inspection plan generation', 'Automated PPAP and APQP compliance docs'],
    cta: 'Explore AI Quality Intelligence',
  },
  {
    id: 'delivery',
    group: 'SHIP',
    title: 'Shipment Hub',
    part: 'connector',
    desc: 'AI monitors shipments end-to-end, predicts delays, and auto-generates customs documentation — giving ops teams one live view of every delivery.',
    features: ['AI shipment delay prediction and alerts', 'Automated packing list and label generation', 'Customs documentation and compliance checks'],
    cta: 'Explore AI Logistics Tracker',
  },
  {
    id: 'bench',
    group: 'SHIP',
    title: 'Cost Benchmarker',
    part: 'assembly',
    desc: 'AI overlays BOMs across projects and OEMs to instantly surface cost outliers, repeating patterns, and high-impact VAVE opportunities.',
    features: ['AI cross-project BOM cost diffing', 'Top cost-driver identification by category', 'One-click conversion to VAVE pipeline'],
    cta: 'Explore AI Benchmark Intelligence',
  },
]

const GROUPS: { id: Group; label: string }[] = [
  { id: 'DESIGN', label: 'DESIGN' },
  { id: 'BUILD',  label: 'BUILD'  },
  { id: 'SHIP',   label: 'SHIP'   },
]

// ── Curly brace SVG (outer AI bracket) ────────────────────────

function CurlyBracketSvg() {
  return (
    <svg viewBox="0 0 60 100" preserveAspectRatio="none" aria-hidden className="w-full h-full">
      <defs>
        <linearGradient id="curly-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a4a3a" />
          <stop offset="100%" stopColor="#0a7a6a" />
        </linearGradient>
      </defs>
      <path
        d="M10 5 H32 Q40 5 40 13 V42 Q40 50 52 50"
        fill="none" stroke="url(#curly-grad)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"
      />
      <path
        d="M52 50 Q40 50 40 58 V87 Q40 95 32 95 H10"
        fill="none" stroke="url(#curly-grad)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"
      />
    </svg>
  )
}

// ── Bracket SVG ───────────────────────────────────────────────

function BracketSvg({ id, colorFrom = '#0a7a6a', colorTo = '#0d9e8a' }: { id: string; colorFrom?: string; colorTo?: string }) {
  return (
    <svg viewBox="0 0 88 100" preserveAspectRatio="none" aria-hidden className="w-full h-full">
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </linearGradient>
        <mask id={`bm-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="88" height="100">
          <rect x="0" y="0" width="88" height="100" fill="black" />
          <path d="M30 6 H60 Q70 6 70 16 V84 Q70 94 60 94 H30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d="M30 6 H60 Q70 6 70 16" fill="none" stroke="black" strokeWidth="2" strokeDasharray="0 999" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M70 84 Q70 94 60 94 H30" fill="none" stroke="black" strokeWidth="2" strokeDasharray="0 999" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </mask>
      </defs>
      <path
        d="M30 6 H60 Q70 6 70 16 V84 Q70 94 60 94 H30"
        fill="none"
        stroke={`url(#bg-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity="1"
        mask={`url(#bm-${id})`}
        strokeDasharray="4 4"
      />
    </svg>
  )
}

// ── Main section ──────────────────────────────────────────────

export default function ProductIntelligence() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId]     = useState('bom')
  const [burstCount, setBurstCount] = useState(0)

  const activeModule = modules.find((m) => m.id === activeId) ?? modules[0]

  // Scroll → active module (desktop only)
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, -top / scrollable))
      const idx = Math.min(modules.length - 1, Math.floor(progress * modules.length))
      const next = modules[idx].id
      setActiveId((cur) => {
        if (cur !== next) setBurstCount((c) => c + 1)
        return next
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Click a module → scroll to its band midpoint (desktop)
  const handleSelect = (id: string) => {
    const el = wrapperRef.current
    if (!el) return
    const idx = modules.findIndex((m) => m.id === id)
    if (idx < 0) return
    const scrollable = el.offsetHeight - window.innerHeight
    const bandMid = (idx / modules.length) * scrollable + scrollable / (modules.length * 2)
    window.scrollTo({ top: el.offsetTop + bandMid, behavior: 'smooth' })
  }

  // Mobile accordion toggle
  const handleMobileToggle = (id: string) => {
    setActiveId((cur) => (cur === id ? '' : id))
  }

  return (
    <>
      {/* ── Mobile accordion (< lg) ── */}
      <section className="lg:hidden bg-white py-10 border-t border-black/[0.06]">
        <div className="px-6">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold leading-[1.2] tracking-tight text-[#111827]">
              Product Intelligence from{' '}
              <em className="not-italic text-[#0d9e8a]">Design</em>
              {' '}to{' '}
              <em className="not-italic text-[#0d9e8a]">Build</em>
              {' '}to{' '}
              <em className="not-italic text-[#0d9e8a]">Ship</em>
            </h3>
            <span className="mt-2 block text-[13px] leading-relaxed text-[#64748b]">
              For engineering, procurement, manufacturing, and supply chain teams looking to transform how they develop products, reduce costs, and win profitable business.
            </span>
          </div>

          {/* Grouped accordion */}
          {GROUPS.map((g) => (
            <div key={g.id} className="mb-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#0d9e8a] mb-2">{g.label}</p>
              {modules.filter((m) => m.group === g.id).map((mod) => {
                const isOpen = mod.id === activeId
                return (
                  <div key={mod.id} className="border border-black/10 rounded-xl mb-2 overflow-hidden">
                    <button
                      onClick={() => handleMobileToggle(mod.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-left"
                      style={{ color: isOpen ? '#0d9e8a' : 'rgba(0,0,0,0.75)' }}
                    >
                      {mod.title}
                      <span className="shrink-0 ml-3 text-base leading-none">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div>
                        {/* 3D part viewer — same as desktop right panel */}
                        <div
                          className="relative w-full"
                          style={{ height: 220, background: 'linear-gradient(160deg, #0a1a1a 0%, #0d2020 60%, #091515 100%)' }}
                        >
                          <CncPartViewer part={mod.part} className="absolute inset-0" />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-[0.07]"
                            style={{
                              backgroundImage: 'linear-gradient(rgba(72,210,190,1) 1px,transparent 1px),linear-gradient(90deg,rgba(72,210,190,1) 1px,transparent 1px)',
                              backgroundSize: '40px 40px',
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <span
                              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase"
                              style={{ background: 'rgba(72,210,190,0.12)', color: '#48d2be', border: '1px solid rgba(72,210,190,0.2)' }}
                            >
                              {mod.group}
                            </span>
                          </div>
                        </div>

                        {/* Teal divider */}
                        <div className="h-px mx-6" style={{ background: 'linear-gradient(90deg, transparent, #48d2be, transparent)', opacity: 0.35 }} />

                        {/* Copy — same layout as desktop */}
                        <div className="px-5 py-5" style={{ background: '#f7fafa' }}>
                          <h3 className="text-base font-semibold text-[#0a0a0a] mb-2 tracking-tight">
                            {mod.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-[#444] mb-4">
                            {mod.desc}
                          </p>
                          <ul className="space-y-2 mb-5">
                            {mod.features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm text-[#4b5563]">
                                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none">
                                  <circle cx="8" cy="8" r="7" stroke="#48d2be" strokeWidth="1.2" opacity="0.6" />
                                  <path d="M5 8l2 2 4-4" stroke="#48d2be" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {f}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap items-center gap-3">
                            <a
                              href="#demo"
                              className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                              style={{ color: '#0d9e8a' }}
                            >
                              {mod.cta}
                              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" className="w-3.5 h-3.5">
                                <path d="M5 12H19" /><path d="M13 6L19 12L13 18" />
                              </svg>
                            </a>
                            <button className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-1.5 text-xs font-medium text-[#555]">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                                <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                              </svg>
                              Watch Overview
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ── Desktop sticky scroll (lg+) ── */}
      <div ref={wrapperRef} className="hidden lg:block" style={{ height: `calc(${modules.length * 60}vh + 100vh)` }}>

        <section className="sticky top-0 h-screen overflow-hidden bg-white text-[#0a0a0a]">
          {/* Column lines */}
          <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-black/[0.06]" style={{ left: 64 }} />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-black/[0.06]" style={{ right: 64 }} />

          {/* Subtle radial glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(72,210,190,0.06) 0%, transparent 70%)' }} />

          <div className="relative h-full mx-auto max-w-[1280px] px-6 md:px-12 flex flex-col">

            {/* ── Header ── */}
            <div className="pt-[72px] pb-4 shrink-0">
              <h3 className="text-2xl md:text-3xl font-bold leading-[1.2] tracking-tight text-[#111827]">
                Product Intelligence from{' '}
                <em className="not-italic text-[#0d9e8a]">Design</em>
                {' '}to{' '}
                <em className="not-italic text-[#0d9e8a]">Build</em>
                {' '}to{' '}
                <em className="not-italic text-[#0d9e8a]">Ship</em>
              </h3>
              <span className="mt-2 block text-[15px] leading-relaxed text-[#64748b] font-normal max-w-2xl">
                For engineering, procurement, manufacturing, and supply chain teams looking to transform how they develop products, reduce costs, and win profitable business.
              </span>
            </div>

            {/* ── Two-column layout ── */}
            <div className="flex-1 min-h-0 grid grid-cols-1 gap-8 lg:grid-cols-[540px_1fr] lg:gap-12 xl:gap-16 items-start pb-6">

              {/* ── LEFT: accordion ── */}
              <div className="flex gap-0">

                {/* AI area: sphere on far-left, mirrored curly bracket connecting to accordion */}
                <div className="flex items-stretch shrink-0 mr-5">
                  <div className="relative self-center shrink-0" style={{ width: 160, height: 160 }}>
                    <AiSphere className="absolute inset-0" burst={burstCount} moduleId={activeId} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span
                        className="text-2xl font-black tracking-[0.18em] uppercase select-none"
                        style={{ color: '#ffffff', textShadow: '0 0 16px rgba(255,255,255,1), 0 0 30px rgba(72,210,190,1), 0 0 50px rgba(72,210,190,0.7)' }}
                      >
                        AI
                      </span>
                    </div>
                  </div>
                  <div className="relative self-stretch w-10" style={{ transform: 'scaleX(-1)' }}>
                    <div className="absolute inset-0">
                      <CurlyBracketSvg />
                    </div>
                  </div>
                </div>

                {/* Items + per-group bracket */}
                <div className="flex-1 space-y-3">
                  {GROUPS.map((g) => {
                    const groupModules = modules.filter((m) => m.group === g.id)
                    return (
                      <div key={g.id} className="flex gap-0">
                        {/* Per-group bracket — mirrored, now on LEFT of items */}
                        <div className="relative w-10 shrink-0">
                          <div className="absolute inset-0" style={{ transform: 'scaleX(-1)' }}>
                            <BracketSvg id={g.id} />
                          </div>
                          <div
                            className="absolute top-1/2 left-0 text-[8px] font-bold tracking-[0.18em] uppercase whitespace-nowrap"
                            style={{ writingMode: 'vertical-rl', transform: 'translateX(-14px) translateY(-50%)', color: '#0d9e8a' }}
                          >
                            {g.label}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1 pl-1">
                          {groupModules.map((mod) => {
                            const isActive = mod.id === activeId
                            return (
                              <button
                                key={mod.id}
                                onClick={() => handleSelect(mod.id)}
                                className="w-full text-left rounded-xl px-4 py-3 transition-all duration-200 flex items-center"
                                style={{
                                  background: isActive ? 'rgba(13,158,138,0.08)' : 'transparent',
                                  border: isActive ? '1px solid #0d9e8a' : '1px solid rgba(0,0,0,0.18)',
                                  borderRight: isActive ? '3px solid #0d9e8a' : '1px solid rgba(0,0,0,0.18)',
                                }}
                              >
                                <div className="flex w-full items-center justify-between">
                                  <span className="text-sm font-medium transition-colors duration-200" style={{ color: isActive ? '#0d9e8a' : 'rgba(0,0,0,0.75)' }}>
                                    {mod.title}
                                  </span>
                                  <span
                                    className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-200 ml-3"
                                    style={{ borderColor: isActive ? '#0d9e8a' : 'rgba(0,0,0,0.2)', color: isActive ? '#0d9e8a' : 'rgba(0,0,0,0.4)' }}
                                  >
                                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="w-3 h-3" stroke="currentColor">
                                      {isActive ? <path d="M5 12H19" /> : <><path d="M12 5V19" /><path d="M5 12H19" /></>}
                                    </svg>
                                  </span>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>

              {/* ── RIGHT: display panel ── */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: '#f7fafa', border: '1px solid rgba(72,210,190,0.2)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                  >
                    {/* 3D part viewer */}
                    <div
                      className="relative w-full"
                      style={{ height: 240, background: 'linear-gradient(160deg, #0a1a1a 0%, #0d2020 60%, #091515 100%)' }}
                    >
                      <CncPartViewer part={activeModule.part} className="absolute inset-0" />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(72,210,190,1) 1px,transparent 1px),linear-gradient(90deg,rgba(72,210,190,1) 1px,transparent 1px)',
                          backgroundSize: '40px 40px',
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase" style={{ background: 'rgba(72,210,190,0.12)', color: '#48d2be', border: '1px solid rgba(72,210,190,0.2)' }}>
                          {activeModule.group}
                        </span>
                      </div>
                    </div>

                    {/* Teal divider */}
                    <div className="h-px mx-6" style={{ background: 'linear-gradient(90deg, transparent, #48d2be, transparent)', opacity: 0.35 }} />

                    {/* Copy */}
                    <div className="px-6 py-6 md:px-8 md:py-7">
                      <h3 className="text-xl font-semibold text-[#0a0a0a] mb-3 tracking-tight">
                        {activeModule.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#444] mb-5">
                        {activeModule.desc}
                      </p>

                      <ul className="space-y-2 mb-7">
                        {activeModule.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-[#4b5563]">
                            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none">
                              <circle cx="8" cy="8" r="7" stroke="#48d2be" strokeWidth="1.2" opacity="0.6" />
                              <path d="M5 8l2 2 4-4" stroke="#48d2be" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href="#demo"
                          className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                          style={{ color: '#0d9e8a' }}
                        >
                          {activeModule.cta}
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" className="w-3.5 h-3.5">
                            <path d="M5 12H19" /><path d="M13 6L19 12L13 18" />
                          </svg>
                        </a>
                        <button className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-1.5 text-xs font-medium text-[#555] transition hover:border-black/25 hover:text-[#222]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                          </svg>
                          Watch Overview
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  )
}
