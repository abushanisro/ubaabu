'use client'

import React, { useState } from 'react'
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

const BLEND = { '--blendBackground': '#2dd4bf', '--blendForeground': '#0f1b2d', '--blendIntersection': '#0d9488' } as React.CSSProperties

const GROUP_ICONS = [
  <svg key="g0" className="mb-5" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={BLEND}>
    <path style={{ fill: 'var(--blendForeground)' }} d="M36 11a4 4 0 0 1 4 4v21a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4zm-7.9 18h-1.2a1 1 0 0 0-.54.09.59.59 0 0 0-.27.27 1 1 0 0 0-.09.54v5.2a1 1 0 0 0 .09.54.59.59 0 0 0 .27.27 1 1 0 0 0 .54.09h1.2a1 1 0 0 0 .54-.09.59.59 0 0 0 .27-.27 1 1 0 0 0 .09-.54v-5.2a1 1 0 0 0-.09-.54.59.59 0 0 0-.27-.27 1 1 0 0 0-.54-.09zm7-3h-1.2a1 1 0 0 0-.54.09.59.59 0 0 0-.27.27 1 1 0 0 0-.09.54v8.2a1 1 0 0 0 .09.54.59.59 0 0 0 .27.27 1 1 0 0 0 .54.09h1.2a1 1 0 0 0 .54-.09.59.59 0 0 0 .27-.27 1 1 0 0 0 .09-.54v-8.2a1 1 0 0 0-.09-.54.59.59 0 0 0-.27-.27 1 1 0 0 0-.54-.09zm-21 0h-1.2a1 1 0 0 0-.54.09.59.59 0 0 0-.27.27 1 1 0 0 0-.09.54v8.2a1 1 0 0 0 .09.54.59.59 0 0 0 .27.27 1 1 0 0 0 .54.09h1.2a1 1 0 0 0 .54-.09.59.59 0 0 0 .27-.27 1 1 0 0 0 .09-.54v-8.2a1 1 0 0 0-.09-.54.59.59 0 0 0-.27-.27 1 1 0 0 0-.54-.09zm7-7h-1.2a1 1 0 0 0-.54.09.59.59 0 0 0-.27.27 1 1 0 0 0-.09.54v15.2a1 1 0 0 0 .09.54.59.59 0 0 0 .27.27 1 1 0 0 0 .54.09h1.2a1 1 0 0 0 .54-.09.59.59 0 0 0 .27-.27 1 1 0 0 0 .09-.54V19.9a1 1 0 0 0-.09-.54.59.59 0 0 0-.27-.27 1 1 0 0 0-.54-.09z"/>
    <path style={{ fill: 'var(--blendBackground)' }} d="M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zM16 6a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"/>
    <path style={{ fill: 'var(--blendIntersection)' }} d="M32 11v7a4 4 0 0 1-4 4h-6v-2.1a1 1 0 0 0-.09-.54.59.59 0 0 0-.27-.27 1 1 0 0 0-.54-.09h-1.2a1 1 0 0 0-.54.09.59.59 0 0 0-.27.27.9.9 0 0 0-.09.42V22H8v-7a4 4 0 0 1 3-3.87V11a5 5 0 0 0 10 0z"/>
  </svg>,
  <svg key="g1" className="mb-5" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={BLEND}>
    <defs>
      <clipPath id="CardWithMagnifyingGlassIconClipPath-">
        <path fillRule="evenodd" clipRule="evenodd" d="M4 5C1.79086 5 0 6.79086 0 9V23C0 25.2091 1.79086 27 4 27H28C30.2091 27 32 25.2091 32 23V9C32 6.79086 30.2091 5 28 5H4ZM3.75 9C3.33579 9 3 9.33579 3 9.75V11.25C3 11.6642 3.33579 12 3.75 12H28.25C28.6642 12 29 11.6642 29 11.25V9.75C29 9.33579 28.6642 9 28.25 9H3.75Z" style={{ fill: 'var(--blendBackground)' }}/>
      </clipPath>
    </defs>
    <path fillRule="evenodd" clipRule="evenodd" d="M4 5C1.79086 5 0 6.79086 0 9V23C0 25.2091 1.79086 27 4 27H28C30.2091 27 32 25.2091 32 23V9C32 6.79086 30.2091 5 28 5H4ZM3.75 9C3.33579 9 3 9.33579 3 9.75V11.25C3 11.6642 3.33579 12 3.75 12H28.25C28.6642 12 29 11.6642 29 11.25V9.75C29 9.33579 28.6642 9 28.25 9H3.75Z" style={{ fill: 'var(--blendBackground)' }}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M24 33C26.1677 33 28.1564 32.2336 29.71 30.9571L31.043 32.29C30.653 32.6806 30.6531 33.3134 31.0435 33.7038L36.8438 39.5041C37.2343 39.8946 37.8675 39.8946 38.258 39.5041L39.6739 38.0882C40.0645 37.6977 40.0645 37.0645 39.6739 36.674L33.8736 30.8736C33.4833 30.4833 32.8505 30.4831 32.4599 30.8731L31.108 29.5212C32.2938 27.9968 33 26.0809 33 24C33 19.0294 28.9706 15 24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33ZM24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" style={{ fill: 'var(--blendForeground)' }}/>
    <g clipPath="url(#CardWithMagnifyingGlassIconClipPath-)">
      <path fillRule="evenodd" clipRule="evenodd" d="M24 33C26.1677 33 28.1564 32.2336 29.71 30.9571L31.043 32.29C30.653 32.6806 30.6531 33.3134 31.0435 33.7038L36.8438 39.5041C37.2343 39.8946 37.8675 39.8946 38.258 39.5041L39.6739 38.0882C40.0645 37.6977 40.0645 37.0645 39.6739 36.674L33.8736 30.8736C33.4833 30.4833 32.8505 30.4831 32.4599 30.8731L31.108 29.5212C32.2938 27.9968 33 26.0809 33 24C33 19.0294 28.9706 15 24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33ZM24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" style={{ fill: 'var(--blendIntersection)' }}/>
    </g>
  </svg>,
  <svg key="g2" className="mb-5" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={BLEND}>
    <defs>
      <clipPath id="BrowserWithCartIconClipPath-">
        <path fillRule="evenodd" clipRule="evenodd" d="M4 2C1.79086 2 0 3.79086 0 6V26C0 28.2091 1.79086 30 4 30H32C34.2091 30 36 28.2091 36 26V6C36 3.79086 34.2091 2 32 2H4ZM4.5 8C5.32843 8 6 7.32843 6 6.5C6 5.67157 5.32843 5 4.5 5C3.67157 5 3 5.67157 3 6.5C3 7.32843 3.67157 8 4.5 8ZM11 6.5C11 7.32843 10.3284 8 9.5 8C8.67157 8 8 7.32843 8 6.5C8 5.67157 8.67157 5 9.5 5C10.3284 5 11 5.67157 11 6.5ZM14.5 8C15.3284 8 16 7.32843 16 6.5C16 5.67157 15.3284 5 14.5 5C13.6716 5 13 5.67157 13 6.5C13 7.32843 13.6716 8 14.5 8Z" style={{ fill: 'var(--blendBackground)' }}/>
      </clipPath>
    </defs>
    <path fillRule="evenodd" clipRule="evenodd" d="M4 2C1.79086 2 0 3.79086 0 6V26C0 28.2091 1.79086 30 4 30H32C34.2091 30 36 28.2091 36 26V6C36 3.79086 34.2091 2 32 2H4ZM4.5 8C5.32843 8 6 7.32843 6 6.5C6 5.67157 5.32843 5 4.5 5C3.67157 5 3 5.67157 3 6.5C3 7.32843 3.67157 8 4.5 8ZM11 6.5C11 7.32843 10.3284 8 9.5 8C8.67157 8 8 7.32843 8 6.5C8 5.67157 8.67157 5 9.5 5C10.3284 5 11 5.67157 11 6.5ZM14.5 8C15.3284 8 16 7.32843 16 6.5C16 5.67157 15.3284 5 14.5 5C13.6716 5 13 5.67157 13 6.5C13 7.32843 13.6716 8 14.5 8Z" style={{ fill: 'var(--blendBackground)' }}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.75 11C5.33579 11 5 11.3358 5 11.75V13.25C5 13.6642 5.33579 14 5.75 14H9.68733C10.3687 14 10.9645 14.4593 11.1379 15.1183L14.5685 28.1542C15.3199 31.0097 17.9017 33 20.8544 33H33C31.3431 33 30 34.3431 30 36C30 37.6569 31.3431 39 33 39C34.6569 39 36 37.6569 36 36C36 34.3431 34.6569 33 33 33H36.25C36.6642 33 37 32.6642 37 32.25V30.75C37 30.3358 36.6642 30 36.25 30H20.8544C19.4843 30 18.2624 29.2041 17.6919 28H35.409C36.3403 28 37.1483 27.3572 37.3578 26.4497L39.7173 16.2249C39.8619 15.5982 39.386 15 38.7429 15H14.209L14.0392 14.3548C13.5189 12.3779 11.7315 11 9.68733 11H5.75ZM20 39C21.6569 39 23 37.6569 23 36C23 34.3431 21.6569 33 20 33C18.3431 33 17 34.3431 17 36C17 37.6569 18.3431 39 20 39Z" style={{ fill: 'var(--blendForeground)' }}/>
    <g clipPath="url(#BrowserWithCartIconClipPath-)">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.75 11C5.33579 11 5 11.3358 5 11.75V13.25C5 13.6642 5.33579 14 5.75 14H9.68733C10.3687 14 10.9645 14.4593 11.1379 15.1183L14.5685 28.1542C15.3199 31.0097 17.9017 33 20.8544 33H33C31.3431 33 30 34.3431 30 36C30 37.6569 31.3431 39 33 39C34.6569 39 36 37.6569 36 36C36 34.3431 34.6569 33 33 33H36.25C36.6642 33 37 32.6642 37 32.25V30.75C37 30.3358 36.6642 30 36.25 30H20.8544C19.4843 30 18.2624 29.2041 17.6919 28H35.409C36.3403 28 37.1483 27.3572 37.3578 26.4497L39.7173 16.2249C39.8619 15.5982 39.386 15 38.7429 15H14.209L14.0392 14.3548C13.5189 12.3779 11.7315 11 9.68733 11H5.75ZM20 39C21.6569 39 23 37.6569 23 36C23 34.3431 21.6569 33 20 33C18.3431 33 17 34.3431 17 36C17 37.6569 18.3431 39 20 39Z" style={{ fill: 'var(--blendIntersection)' }}/>
    </g>
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
                  href="/products"
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
                    <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#48d2be' }}>
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
