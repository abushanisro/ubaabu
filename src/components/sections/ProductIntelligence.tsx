'use client'

import { useState } from 'react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import dynamic from 'next/dynamic'

// ── Data ──────────────────────────────────────────────────────

type Group = 'DESIGN' | 'BUILD' | 'SHIP'

interface Module {
  id: string
  group: Group
  title: string
  desc: string
  features: string[]
  cta: string
}

const modules: Module[] = [
  {
    id: 'bom',
    group: 'DESIGN',
    title: 'BOM Composer',
desc: 'Generate accurate multi-level BOMs from CAD files with zero manual entry.',
    features: ['AI-assisted BOM generation from CAD and specs', 'Auto-linked revisions and engineering change orders', 'Real-time cross-team BOM synchronisation'],
    cta: 'Read more',
  },
  {
    id: 'process',
    group: 'DESIGN',
    title: 'Should-Cost Engine',
desc: 'Build a ground-up cost model for every part before a single supplier quote arrives.',
    features: ['AI process routing and cycle-time estimation', 'Live material and machine cost benchmarks', 'Instant OEM vs. supplier cost comparison'],
    cta: 'Read more',
  },
  {
    id: 'vave',
    group: 'DESIGN',
    title: 'VAVE Studio',
desc: 'Surface AI-ranked cost-reduction ideas grounded in your live should-cost data.',
    features: ['AI idea engine via SCAMPER and TRIZ frameworks', 'Savings ranked against live should-cost benchmarks', 'End-to-end idea-to-approval tracking'],
    cta: 'Read more',
  },
  {
    id: 'eval',
    group: 'BUILD',
    title: 'Supplier Radar',
desc: 'Score suppliers on capability and risk before you send a single RFQ.',
    features: ['AI technical feasibility and risk scoring', 'Automated supplier shortlist generation', 'Bulk RFQ dispatch with response consolidation'],
    cta: 'Read more',
  },
  {
    id: 'nom',
    group: 'BUILD',
    title: 'Vendor Match',
desc: 'AI-ranked nominations across cost, quality, delivery, and technology fit.',
    features: ['AI multi-criteria supplier ranking', 'Explainable nomination recommendation', 'Compliance-ready decision audit trail'],
    cta: 'Read more',
  },
  {
    id: 'prod',
    group: 'BUILD',
    title: 'Launch Tracker',
desc: 'Track every milestone from ISIR to mass production with automatic delay alerts.',
    features: ['AI-driven milestone scheduling and alerts', 'ISIR, PPAP, and lot sign-off automation', 'Cross-functional production visibility dashboard'],
    cta: 'Read more',
  },
  {
    id: 'quality',
    group: 'BUILD',
    title: 'Quality Guard',
desc: 'Detect defect patterns early and auto-generate PPAP and APQP documentation.',
    features: ['AI defect pattern detection and root cause', 'Smart inspection plan generation', 'Automated PPAP and APQP compliance docs'],
    cta: 'Read more',
  },
  {
    id: 'delivery',
    group: 'SHIP',
    title: 'Shipment Hub',
desc: 'Monitor every delivery in real time with AI-predicted delay alerts.',
    features: ['AI shipment delay prediction and alerts', 'Automated packing list and label generation', 'Customs documentation and compliance checks'],
    cta: 'Read more',
  },
  {
    id: 'bench',
    group: 'SHIP',
    title: 'Cost Benchmarker',
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

export default function ProductIntelligence() {
  const [activeId, setActiveId] = useState('bom')

  return (
    <section className="bg-white text-[#0a0a0a] py-16 lg:py-24">

      {/* Section title */}
      <div className="text-center mb-12 lg:mb-16 px-6 max-w-4xl mx-auto">
        <p className="text-2xl md:text-3xl lg:text-[2.6rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-4">
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

      {/* Rows: one per group */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 space-y-16 lg:space-y-32">
        {GROUPS.map((g, gi) => {
          const groupModules = modules.filter((m) => m.group === g.id)
          const firstMod = groupModules[0]
          const isReversed = gi % 2 !== 0
          return (
            <div
              key={g.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center`}
              style={{ direction: isReversed ? 'rtl' : 'ltr' }}
            >
              {/* Text */}
              <div style={{ direction: 'ltr' }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 mb-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3C12 3 12.8 8.2 15.5 10.5C17.8 12.5 21 12 21 12C21 12 17.8 11.5 15.5 13.5C12.8 15.8 12 21 12 21C12 21 11.2 15.8 8.5 13.5C6.2 11.5 3 12 3 12C3 12 6.2 12.5 8.5 10.5C11.2 8.2 12 3 12 3Z" fill="#0d9e8a" />
                </svg>

                <h3 className="text-[1.5rem] lg:text-[1.85rem] xl:text-[2.2rem] font-bold text-[#0d0d0d] leading-[1.22] mb-5 lg:mb-7" style={{ letterSpacing: '-0.01em' }}>
                  {g.headline}
                </h3>

                {groupModules.slice(0, 3).map((mod) => (
                  <p key={mod.id} className="text-sm lg:text-[15.5px] leading-[1.65] text-[#3a3a3a] mb-3 lg:mb-4">
                    {mod.desc}
                  </p>
                ))}

                <a
                  href="#demo"
                  className="mt-3 inline-flex items-center px-6 lg:px-7 py-2.5 lg:py-3 rounded-full text-[13px] lg:text-[14px] font-semibold text-white transition-opacity hover:opacity-80"
                  style={{ background: '#0d0d0d' }}
                >
                  Read more
                </a>
              </div>

              {/* Canvas card */}
              <div style={{ direction: 'ltr' }} className="h-64 sm:h-80 lg:h-[500px]">
                <div
                  className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden"
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
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {gi === 0 ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4 lg:p-6">
                      <img src="/videos/card/demo.gif" alt="Product demo" className="w-full h-full object-contain rounded-xl" />
                    </div>
                  ) : gi === 1 ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4 lg:p-6">
                      <img src="/videos/card/demo2.gif" alt="Product demo" className="w-full h-full object-contain rounded-xl" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4 lg:p-6">
                      <img src="/videos/card/delivery.gif" alt="Delivery tracking demo" className="w-full h-full object-contain rounded-xl" />
                    </div>
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
  )
}
