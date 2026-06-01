'use client'

import { useState, useEffect } from 'react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import type { PartType } from '@/components/three/CncPartViewer'
import { Component as AiLoader } from '@/components/ui/ai-loader'

const CncPartViewer = dynamic(
  () => import('@/components/three/CncPartViewer'),
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
    desc: 'Generate accurate multi-level BOMs from CAD files with zero manual entry.',
    features: ['AI-assisted BOM generation from CAD and specs', 'Auto-linked revisions and engineering change orders', 'Real-time cross-team BOM synchronisation'],
    cta: 'Read more',
  },
  {
    id: 'process',
    group: 'DESIGN',
    title: 'Should-Cost Engine',
    part: 'shaft',
    desc: 'Build a ground-up cost model for every part before a single supplier quote arrives.',
    features: ['AI process routing and cycle-time estimation', 'Live material and machine cost benchmarks', 'Instant OEM vs. supplier cost comparison'],
    cta: 'Read more',
  },
  {
    id: 'vave',
    group: 'DESIGN',
    title: 'VAVE Studio',
    part: 'blade',
    desc: 'Surface AI-ranked cost-reduction ideas grounded in your live should-cost data.',
    features: ['AI idea engine via SCAMPER and TRIZ frameworks', 'Savings ranked against live should-cost benchmarks', 'End-to-end idea-to-approval tracking'],
    cta: 'Read more',
  },
  {
    id: 'eval',
    group: 'BUILD',
    title: 'Supplier Radar',
    part: 'housing',
    desc: 'Score suppliers on capability and risk before you send a single RFQ.',
    features: ['AI technical feasibility and risk scoring', 'Automated supplier shortlist generation', 'Bulk RFQ dispatch with response consolidation'],
    cta: 'Read more',
  },
  {
    id: 'nom',
    group: 'BUILD',
    title: 'Vendor Match',
    part: 'valve',
    desc: 'AI-ranked nominations across cost, quality, delivery, and technology fit.',
    features: ['AI multi-criteria supplier ranking', 'Explainable nomination recommendation', 'Compliance-ready decision audit trail'],
    cta: 'Read more',
  },
  {
    id: 'prod',
    group: 'BUILD',
    title: 'Launch Tracker',
    part: 'flange',
    desc: 'Track every milestone from ISIR to mass production with automatic delay alerts.',
    features: ['AI-driven milestone scheduling and alerts', 'ISIR, PPAP, and lot sign-off automation', 'Cross-functional production visibility dashboard'],
    cta: 'Read more',
  },
  {
    id: 'quality',
    group: 'BUILD',
    title: 'Quality Guard',
    part: 'fitting',
    desc: 'Detect defect patterns early and auto-generate PPAP and APQP documentation.',
    features: ['AI defect pattern detection and root cause', 'Smart inspection plan generation', 'Automated PPAP and APQP compliance docs'],
    cta: 'Read more',
  },
  {
    id: 'delivery',
    group: 'SHIP',
    title: 'Shipment Hub',
    part: 'connector',
    desc: 'Monitor every delivery in real time with AI-predicted delay alerts.',
    features: ['AI shipment delay prediction and alerts', 'Automated packing list and label generation', 'Customs documentation and compliance checks'],
    cta: 'Read more',
  },
  {
    id: 'bench',
    group: 'SHIP',
    title: 'Cost Benchmarker',
    part: 'assembly',
    desc: 'Diff BOMs across projects to instantly surface cost outliers and savings opportunities.',
    features: ['AI cross-project BOM cost diffing', 'Top cost-driver identification by category', 'One-click conversion to VAVE pipeline'],
    cta: 'Read more',
  },
]

const GROUPS: { id: Group; label: string; tags: string[]; headline: string }[] = [
  { id: 'DESIGN', label: 'DESIGN', tags: [], headline: 'Cut cost before a single part is made.' },
  { id: 'BUILD',  label: 'BUILD',  tags: [], headline: 'Find the right supplier. Hit every milestone.' },
  { id: 'SHIP',   label: 'SHIP',   tags: [], headline: 'Full visibility from factory to delivery.' },
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
  const [activeId, setActiveId] = useState('bom')

  const activeModule = modules.find((m) => m.id === activeId) ?? modules[0]

  const handleSelect = (id: string) => setActiveId(id)

  const handleMobileToggle = (id: string) => {
    setActiveId((cur) => (cur === id ? '' : id))
  }

  return (
    <>
      {/* ── Mobile accordion (< lg) ── */}
      <section className="lg:hidden bg-white pt-16 pb-10 border-t border-black/[0.06]">
        <div className="px-6">

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
                              Read more
                              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" className="w-3.5 h-3.5">
                                <path d="M5 12H19" /><path d="M13 6L19 12L13 18" />
                              </svg>
                            </a>
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

      {/* ── Desktop (lg+) ── */}
      <div className="hidden lg:block">
        <section className="bg-white text-[#0a0a0a] py-24">

          {/* ── Centered section title ── */}
          <div className="text-center mb-16 px-6 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-[2.6rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-4">
              AI Product Intelligence from Design to{' '}
              <AnimatedText
                text="Build."
                textClassName="text-gray-900 font-bold"
                underlineColor="oklch(0.68 0.13 180)"
                underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                underlineDuration={1.8}
              />
            </p>
            <p className="text-base lg:text-lg font-normal text-gray-400 leading-relaxed">
              For engineering, procurement, and supply chain teams. From first design to final delivery.
            </p>
          </div>

          {/* ── Rows: one per group ── */}
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 space-y-32">
            {GROUPS.map((g, gi) => {
              const groupModules = modules.filter((m) => m.group === g.id)
              const firstMod = groupModules[0]
              const isReversed = gi % 2 !== 0
              return (
                <div
                  key={g.id}
                  className={`grid grid-cols-2 gap-16 xl:gap-24 items-center ${isReversed ? 'direction-rtl' : ''}`}
                  style={{ direction: isReversed ? 'rtl' : 'ltr' }}
                >
                  {/* Text */}
                  <div style={{ direction: 'ltr' }}>
                    {/* 4-pointed sparkle */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 mb-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3C12 3 12.8 8.2 15.5 10.5C17.8 12.5 21 12 21 12C21 12 17.8 11.5 15.5 13.5C12.8 15.8 12 21 12 21C12 21 11.2 15.8 8.5 13.5C6.2 11.5 3 12 3 12C3 12 6.2 12.5 8.5 10.5C11.2 8.2 12 3 12 3Z" fill="#0d9e8a" />
                    </svg>

                    {/* Headline */}
                    <h3 className="text-[1.85rem] xl:text-[2.2rem] font-bold text-[#0d0d0d] leading-[1.22] mb-7" style={{ letterSpacing: '-0.01em' }}>
                      {g.headline}
                    </h3>

                    {/* Blurbs */}
                    {groupModules.slice(0, 3).map((mod) => (
                      <p key={mod.id} className="text-[15.5px] leading-[1.65] text-[#3a3a3a] mb-4">
                        {mod.desc}
                      </p>
                    ))}

                    <a
                      href="#demo"
                      className="mt-3 inline-flex items-center px-7 py-3 rounded-full text-[14px] font-semibold text-white transition-opacity hover:opacity-80"
                      style={{ background: '#0d0d0d' }}
                    >
                      Read more
                    </a>
                  </div>

                  {/* Canvas card */}
                  <div style={{ direction: 'ltr', height: 500 }}>
                    <div
                      className="relative w-full h-full rounded-3xl overflow-hidden"
                      style={{
                        backgroundColor: '#0a8f7c',
                        backgroundImage: `url('/assets/cards/card1,2,3.svg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: gi === 0 ? 'center top' : gi === 1 ? 'center center' : 'center bottom',
                        backgroundRepeat: 'no-repeat',
                        backgroundBlendMode: 'multiply',
                        boxShadow: '0 24px 64px rgba(13,158,138,0.28), 0 4px 16px rgba(13,158,138,0.15)',
                      }}
                    >
                      {/* dot grid overlay */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-0"
                        style={{
                          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                      {gi === 0 ? (
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                          <img
                            src="/videos/card/demo.gif"
                            alt="Product demo"
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                      ) : gi === 1 ? (
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                          <img
                            src="/videos/card/demo2.gif"
                            alt="Product demo"
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                      ) : (
                        <CncPartViewer part={firstMod.part} className="absolute inset-0 z-10" />
                      )}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase" style={{ background: 'rgba(72,210,190,0.12)', color: '#48d2be', border: '1px solid rgba(72,210,190,0.2)' }}>
                          {g.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </section>
      </div>
    </>
  )
}
