'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import RequestCTA from '@/components/ui/request-cta'

// ── Industry SVG icons ────────────────────────────────────────────────────────

function IconSpace() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="20" fill="#0d9e8a" fillOpacity=".08" stroke="#0d9e8a" strokeOpacity=".18" strokeWidth="1.5"/>
      <circle cx="22" cy="22" r="12" fill="#0d9e8a" fillOpacity=".12"/>
      <circle cx="22" cy="22" r="5" fill="#0d9e8a" fillOpacity=".6"/>
      <ellipse cx="22" cy="22" rx="20" ry="7" stroke="#0d9e8a" strokeOpacity=".25" strokeWidth="1.2" fill="none"/>
      <path d="M22 8v4M22 32v4M8 22h4M32 22h4" stroke="#0d9e8a" strokeOpacity=".35" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function IconDefence() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M22 4l16 6v12c0 9-7 16-16 18C13 38 6 31 6 22V10l16-6z" fill="#0d9e8a" fillOpacity=".1" stroke="#0d9e8a" strokeOpacity=".22" strokeWidth="1.5"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M22 8l12 4.5v10c0 7-5.5 12.5-12 14-6.5-1.5-12-7-12-14v-10L22 8z" fill="#0d9e8a" fillOpacity=".18"/>
      <path d="M16 22l4 4 8-8" stroke="#0d9e8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconAerospace() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="2" y="14" width="40" height="16" rx="8" fill="#0d9e8a" fillOpacity=".1" stroke="#0d9e8a" strokeOpacity=".2" strokeWidth="1.5"/>
      <ellipse cx="22" cy="22" rx="6" ry="10" fill="#0d9e8a" fillOpacity=".2" stroke="#0d9e8a" strokeOpacity=".35" strokeWidth="1.2"/>
      <path d="M22 12v20M12 22h20" stroke="#0d9e8a" strokeOpacity=".2" strokeWidth="1" strokeLinecap="round"/>
      <rect x="6" y="26" width="8" height="4" rx="2" fill="#0d9e8a" fillOpacity=".35"/>
      <rect x="30" y="26" width="8" height="4" rx="2" fill="#0d9e8a" fillOpacity=".35"/>
      <circle cx="22" cy="22" r="3" fill="#0d9e8a" fillOpacity=".7"/>
    </svg>
  )
}

function IconPrecision() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="14" fill="#0d9e8a" fillOpacity=".08" stroke="#0d9e8a" strokeOpacity=".18" strokeWidth="1.5"/>
      <circle cx="22" cy="22" r="8" stroke="#0d9e8a" strokeOpacity=".3" strokeWidth="1.2" fill="none" strokeDasharray="2 2"/>
      <circle cx="22" cy="22" r="3" fill="#0d9e8a" fillOpacity=".6"/>
      <path d="M22 8v5M22 31v5M8 22h5M31 22h5" stroke="#0d9e8a" strokeOpacity=".4" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M13.5 13.5l3 3M27.5 27.5l3 3M13.5 30.5l3-3M27.5 16.5l3-3" stroke="#0d9e8a" strokeOpacity=".25" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// ── Cross-industry capability icons ───────────────────────────────────────────

function IconCost() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 3l11 5.5v9c0 5.5-4.5 10-11 11.5C9 27.5 4.5 23 4.5 17.5v-9L16 3z" fill="#0d9e8a" fillOpacity=".15"/>
      <path d="M11 16l4 4 7-7" stroke="#0d9e8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconSupplier() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="9" cy="10" r="3.5" fill="#0d9e8a" fillOpacity=".5"/>
      <circle cx="23" cy="10" r="3.5" fill="#0d9e8a" fillOpacity=".3"/>
      <circle cx="16" cy="22" r="3.5" fill="#0d9e8a" fillOpacity=".7"/>
      <path d="M9 13.5L16 18.5M23 13.5L16 18.5M9 13.5h14" stroke="#0d9e8a" strokeOpacity=".4" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function IconProgramme() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="28" height="24" rx="3" fill="#0d9e8a" fillOpacity=".1" stroke="#0d9e8a" strokeOpacity=".2" strokeWidth="1.3"/>
      <path d="M2 10h28" stroke="#0d9e8a" strokeOpacity=".25" strokeWidth="1.2"/>
      <rect x="6" y="14" width="8" height="3" rx="1.5" fill="#0d9e8a" fillOpacity=".4"/>
      <rect x="6" y="20" width="12" height="3" rx="1.5" fill="#0d9e8a" fillOpacity=".25"/>
      <rect x="18" y="14" width="8" height="3" rx="1.5" fill="#0d9e8a" fillOpacity=".6"/>
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  {
    n: '01',
    Icon: IconSpace,
    tag: 'Space & Satellite Hardware',
    tagColor: '#0d9488',
    headline: 'Mission-critical parts. Zero margin for error.',
    desc: 'Satellite buses, payload structures, propulsion components, ground systems. Tight tolerances, exotic materials, multi-tier supply chains - connected and traceable.',
    bullets: [
      'Programme-level cost & schedule control',
      'Tier-1 / Tier-2 supplier intelligence',
      'Inspection and PPAP workflows',
      'Materials traceability for space-grade',
    ],
    caseStudyHref: '/case-studies',
    accentBg: 'rgba(13,148,136,0.04)',
  },
  {
    n: '02',
    Icon: IconDefence,
    tag: 'Defence Equipment Manufacturing',
    tagColor: '#0f1b2d',
    headline: 'MoD-compliant. India-resident. Atmanirbhar Bharat.',
    desc: 'Land systems, naval, missile, sensor and electronic warfare programmes. Air-gapped deployment with full data sovereignty for HAL, BEL, BDL, DRDO, L&T and Tata-class OEMs.',
    bullets: [
      'Air-gapped, on-premise deployment',
      'Indigenisation tracking',
      'Should-cost for offset programmes',
      'Programme audit trails',
    ],
    caseStudyHref: '/case-studies',
    accentBg: 'rgba(15,27,45,0.03)',
  },
  {
    n: '03',
    Icon: IconAerospace,
    tag: 'Aerospace Component Suppliers',
    tagColor: '#0d9488',
    headline: 'Tier-1 to Tier-3. End-to-end visibility.',
    desc: 'Engine components, structural assemblies, avionics enclosures, precision machined parts. Built for high-mix, low-volume aerospace work with strict certification needs.',
    bullets: [
      'AS9100-aligned quality workflows',
      'FAI and ISIR submissions',
      'Customer-specific PPAP',
      'Programme-level cost rollups',
    ],
    caseStudyHref: '/case-studies',
    accentBg: 'rgba(13,148,136,0.04)',
  },
  {
    n: '04',
    Icon: IconPrecision,
    tag: 'Precision Manufacturing',
    tagColor: '#0f1b2d',
    headline: 'High-mix, low-volume. Always under cost pressure.',
    desc: 'Precision machining, fabrication, sheet metal, sub-assemblies. The full lifecycle for shops handling complex tolerances, low quantities and demanding OEM customers.',
    bullets: [
      'Estimator productivity',
      'Quote-to-cost lifecycle',
      'Shop floor production status',
      'Customer delivery tracking',
    ],
    caseStudyHref: '/case-studies',
    accentBg: 'rgba(15,27,45,0.03)',
  },
]

const CAPABILITIES = [
  {
    Icon: IconCost,
    title: 'Should-Cost Intelligence',
    desc: 'AI-driven cost models across 72,000+ verified data points - for every part, process, and material in your BOM.',
  },
  {
    Icon: IconSupplier,
    title: 'Supplier Radar',
    desc: 'Rank and shortlist suppliers across 1,000+ verified vendors in seconds. Benchmarked, certified, and ready to quote.',
  },
  {
    Icon: IconProgramme,
    title: 'Programme Visibility',
    desc: 'Live OTIF tracking, quality checkpoints, and delivery intelligence - from first article to final shipment.',
  },
]

// ── Page component ────────────────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-20">

        {/* Background decoration */}
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-[55%] overflow-hidden">
          <div className="absolute right-[-12%] top-[12%] h-[360px] w-[560px] rotate-[-18deg] rounded-[32px] bg-[#2dd4bf]/[0.13]" />
          <div className="absolute right-[-20%] top-[26%] h-[280px] w-[500px] rotate-[-18deg] rounded-[32px] bg-[#0d9488]/[0.09]" />
          <div className="absolute right-[4%] top-[10%] h-[180px] w-[280px] rotate-[-18deg] rounded-[24px] border border-[#0d9e8a]/[0.12]" />
        </div>

        {/* Bottom fade */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, white)', zIndex: 3 }} />

        <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
          <AnimateIn>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d9488]">
              Industries
            </p>
            <h1 className="max-w-3xl font-display text-[2.4rem] font-bold leading-[1.08] tracking-tight text-[#0f1b2d] md:text-[3rem] lg:text-[3.6rem]">
              Built for{' '}
              <span className="text-[#0d9488]">mission-critical</span>{' '}
              manufacturing.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#0f1b2d]/55">
              Industries where parts are complex, tolerances are strict, suppliers are critical,
              and programme delays are expensive.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-[#2dd4bf] px-6 py-3 text-sm font-semibold text-[#0f1b2d] shadow-[0_4px_24px_rgba(45,212,191,0.30)] transition-all hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(45,212,191,0.38)]"
              >
                Book a Demo
                <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
              </Link>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-6 py-3 text-sm font-medium text-[#0f1b2d] transition-all hover:border-[#0d9488]/40 hover:-translate-y-px"
              >
                Read Case Studies
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── Stat bar ── */}
      <div className="border-y border-black/[0.07] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid grid-cols-2 divide-x divide-black/[0.06] md:grid-cols-4">
            {[
              { value: '4', label: 'Industry verticals' },
              { value: '72K+', label: 'Cost data points' },
              { value: '1,000+', label: 'Verified suppliers' },
              { value: '−18%', label: 'Avg. BOM cost reduction' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="font-display text-[1.7rem] font-bold text-[#0d9488] leading-none">{value}</span>
                <span className="mt-1.5 text-[11.5px] font-medium text-[#0f1b2d]/50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Industry cards ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">

          <AnimateIn>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d9488]">
              Sectors we serve
            </p>
            <h2 className="font-display text-[1.85rem] font-bold tracking-tight text-[#0f1b2d] md:text-[2.2rem]">
              One platform. Four demanding sectors.
            </h2>
            <div className="mt-2.5 h-0.5 w-8 rounded-full" style={{ background: 'linear-gradient(90deg,#0d9488,#2dd4bf)' }} />
          </AnimateIn>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {INDUSTRIES.map((ind, i) => (
              <AnimateIn key={ind.n} delay={i * 0.07}>
                <div
                  className="group relative flex h-full flex-col rounded-2xl border border-black/[0.07] p-7 md:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0d9488]/30 hover:shadow-[0_12px_40px_rgba(13,148,136,0.09)]"
                  style={{ background: ind.accentBg }}
                >
                  {/* Teal accent top line */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full bg-[#0d9e8a] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                  {/* Header row */}
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <ind.Icon />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ind.tagColor }}>
                          {ind.tag}
                        </span>
                      </div>
                    </div>
                    <span className="font-display text-[2.2rem] font-bold leading-none text-[#0f1b2d]/[0.06]">
                      {ind.n}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 font-display text-[1.15rem] font-bold leading-snug tracking-tight text-[#0f1b2d] md:text-[1.25rem]">
                    {ind.headline}
                  </h3>
                  <p className="mb-5 text-[13.5px] leading-relaxed text-[#0f1b2d]/55">
                    {ind.desc}
                  </p>

                  {/* Bullets */}
                  <ul className="mb-6 flex flex-col gap-2">
                    {ind.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-[#0f1b2d]/65">
                        <Check className="mt-[2px] size-3.5 shrink-0 text-[#0d9488]" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={ind.caseStudyHref}
                    className="group/link mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0d9488] transition-colors hover:text-[#0f1b2d]"
                  >
                    View case studies
                    <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-industry capabilities ── */}
      <section className="border-t border-black/[0.07] bg-[#fafffe] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <AnimateIn>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d9488]">
              Cross-industry platform
            </p>
            <h2 className="font-display text-[1.85rem] font-bold tracking-tight text-[#0f1b2d] md:text-[2.2rem]">
              Capabilities that work across every sector.
            </h2>
            <div className="mt-2.5 h-0.5 w-8 rounded-full" style={{ background: 'linear-gradient(90deg,#0d9488,#2dd4bf)' }} />
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#0f1b2d]/55">
              Whether you&apos;re building satellite hardware or precision-machined components, the same intelligence layer powers your design, sourcing, and supply chain decisions.
            </p>
          </AnimateIn>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CAPABILITIES.map((cap, i) => (
              <AnimateIn key={cap.title} delay={i * 0.08}>
                <div className="group relative rounded-2xl border border-black/[0.07] bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(13,148,136,0.08)]">
                  <span aria-hidden className="absolute left-0 top-9 h-5 w-[3px] rounded-r-full bg-[#2dd4bf] transition-all duration-300 group-hover:h-7 group-hover:bg-[#0d9488]" />
                  <div className="pl-4">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f0fdf9]">
                      <cap.Icon />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#0f1b2d]">{cap.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[#0f1b2d]/55">{cap.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 md:py-16">
        <RequestCTA />
      </section>

    </div>
  )
}
