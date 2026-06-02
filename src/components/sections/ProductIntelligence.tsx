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

const GROUP_ICONS = [
  <svg key="g0" xmlns="http://www.w3.org/2000/svg" width="33" height="36" viewBox="0 0 33 36" fill="none" className="mb-5">
    <path d="M10.1449 17.3154L1.75122 21.2284V21.2099L10.1449 25.1229L13.7229 34.3241H13.6977L17.2673 25.1229L25.661 21.2099V21.2284L17.2673 17.3154L13.6977 8.11426H13.7229L10.1449 17.3154Z" stroke="#0d9e8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24.0174 6.31266L20.1438 8.11849V8.10998L24.0174 9.91581L25.6687 14.1621H25.657L27.3044 9.91581L31.178 8.10998V8.11849L27.3044 6.31266L25.657 2.06641H25.6687L24.0174 6.31266Z" stroke="#0d9e8a" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="g1" xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none" className="mb-5">
    <path d="M13.4529 6.47559L13.4529 13.3161L6.92644 13.3158" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.4527 13.3141L4.01514 3.87646" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round"/>
    <path d="M20.2935 6.47559L20.2934 13.3161L26.8199 13.3158" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.2936 13.3141L29.7312 3.87646" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round"/>
    <path d="M20.2935 25.915L20.2934 19.0745L26.8199 19.0748" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.2936 19.0766L29.7312 28.5142" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round"/>
    <path d="M13.4529 25.915L13.4529 19.0745L6.92645 19.0748" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.4527 19.0766L4.01514 28.5142" stroke="#0d9e8a" strokeWidth="2.50122" strokeLinecap="round"/>
  </svg>,
  <svg key="g2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" className="mb-5">
    <path d="M2 1.25146H10.1533" stroke="#0d9e8a" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M2 8.52344H23.7422" stroke="#0d9e8a" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M2 23.1396H23.7422" stroke="#0d9e8a" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M2 15.708H12.8711" stroke="#0d9e8a" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18.3066 15.708H23.7422" stroke="#0d9e8a" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>,
]

export default function ProductIntelligence() {
  const [activeId, setActiveId] = useState('bom')

  return (
    <section className="bg-white text-[#0a0a0a] pt-6 pb-4 lg:pt-10 lg:pb-8">

      {/* Section title */}
      <div className="text-center mb-6 lg:mb-8 px-6 max-w-4xl mx-auto">
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
          return (
            <div
              key={g.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center"
            >
              {/* Text */}
              <div>
                {GROUP_ICONS[gi]}

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
              <div className="h-64 sm:h-80 lg:h-[500px]">
                <div
                  className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden"
                  style={{
                    background: '#080808',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.30)',
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
