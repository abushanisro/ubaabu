'use client'

import { useState } from 'react'

interface Study {
  id: string
  logo: string
  metric: string
  gradient: string
  headline: string
  description: string
  cta: string
}

const studies: Study[] = [
  {
    id: 'tata-power',
    logo: '/assets/trustedby/TATAPower.png',
    metric: '40% faster RFQ',
    gradient: 'from-blue-900 via-blue-800 to-indigo-900',
    headline: 'Tata Power cut procurement cycle time by 40% using AI-driven should-cost models.',
    description: "Engineering teams replaced manual Excel costing with Emithran's should-cost engine, compressing RFQ cycles and sharpening negotiation baselines across 200+ components.",
    cta: 'Read case study',
  },
  {
    id: 'ashok-leyland',
    logo: '/assets/trustedby/ashokleyland.png',
    metric: '12 platforms unified',
    gradient: 'from-slate-800 via-zinc-800 to-neutral-900',
    headline: 'Ashok Leyland standardised BOM workflows across 12 vehicle platforms on Emithran.',
    description: 'From multi-level assembly structures to engineering change orders, Emithran gave the team a single source of truth for component data and cost rollups.',
    cta: 'Read case study',
  },
  {
    id: 'pixxel',
    logo: '/assets/trustedby/Pixxel.png',
    metric: '₹1.2Cr savings identified',
    gradient: 'from-violet-900 via-purple-900 to-indigo-950',
    headline: 'Pixxel identified ₹1.2Cr in satellite component savings using VAVE Studio.',
    description: 'AI-generated VAVE ideas ranked by savings potential helped the space-tech team redesign three critical assemblies before tooling was locked.',
    cta: 'Read case study',
  },
  {
    id: 'digantara',
    logo: '/assets/trustedby/digantara.png',
    metric: '80+ suppliers scored',
    gradient: 'from-teal-900 via-cyan-900 to-sky-950',
    headline: 'Digantara qualified its entire supplier base in days using Emithran Supplier Radar.',
    description: 'AI scored 80+ vendors across technical, financial, and quality dimensions — giving the team full confidence before their first production run.',
    cta: 'Read case study',
  },
  {
    id: 'roland-berger',
    logo: '/assets/trustedby/RolandBerger.png',
    metric: '40 OEM programmes',
    gradient: 'from-rose-900 via-red-900 to-orange-950',
    headline: 'Roland Berger benchmarked defence BOM costs across 40 OEM programmes with Emithran.',
    description: 'Cross-project cost diffing surfaced outliers and high-impact VAVE opportunities in minutes, supporting a major Indian defence procurement review.',
    cta: 'Read case study',
  },
]

function ArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
      <path d="M9.613 2.62 5.107 7.124h9.137v1.75H5.107l4.506 4.506-1.238 1.238-6-6L1.756 8l.619-.62 6-6 1.238 1.24Z" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
      <path d="m6.387 2.62 4.506 4.505H1.756v1.75h9.137l-4.506 4.506 1.238 1.238 6-6L14.245 8l-.618-.62-6-6-1.239 1.24Z" />
    </svg>
  )
}

function ChevronArrow() {
  return (
    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M0.5 5.5h7" />
      <path d="M1.5 1.5l4 4-4 4" />
    </svg>
  )
}

export default function CaseStudies() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const go = (dir: 'next' | 'prev') => {
    setDirection(dir)
    setActive((i) =>
      dir === 'next'
        ? (i + 1) % studies.length
        : (i - 1 + studies.length) % studies.length
    )
  }

  const getTranslate = (i: number): string => {
    if (i === active) return '0%'
    if (direction === 'next') return i < active ? '-100%' : '100%'
    return i > active ? '100%' : '-100%'
  }

  return (
    <section className="bg-white py-16 md:py-20 border-t border-black/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        {/* Header row */}
        <div className="flex items-start justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0d1117]">Case Studies</h2>
            <p className="mt-1 text-[15px] text-[#64748b]">See how India's top manufacturers use Emithran.</p>
          </div>
          <div className="flex gap-2 mt-1" role="group" aria-label="Carousel navigation">
            <button
              onClick={() => go('prev')}
              aria-label="Previous slide"
              className="h-8 w-8 flex items-center justify-center rounded border border-black/15 text-[#0d1117] hover:bg-black/5 transition-colors"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => go('next')}
              aria-label="Next slide"
              className="h-8 w-8 flex items-center justify-center rounded border border-black/15 text-[#0d1117] hover:bg-black/5 transition-colors"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:grid grid-cols-[58%_42%] rounded-2xl overflow-hidden border border-black/[0.06]" style={{ height: 340 }}>

          {/* Visual panel — gradient crossfade */}
          <div className="relative overflow-hidden">
            {studies.map((s, i) => (
              <div
                key={s.id}
                aria-hidden={i !== active}
                className={`absolute inset-0 bg-gradient-to-br ${s.gradient} transition-opacity duration-500`}
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <img
                  src={s.logo}
                  alt={s.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-auto object-contain brightness-0 invert opacity-75"
                />
                <span className="absolute bottom-6 left-6 rounded-full px-3 py-1 text-xs font-semibold bg-white/15 text-white border border-white/20">
                  {s.metric}
                </span>
              </div>
            ))}
          </div>

          {/* Text slides */}
          <div className="relative bg-[#f8fafb] overflow-hidden">
            {studies.map((s, i) => (
              <div
                key={s.id}
                aria-hidden={i !== active}
                className="absolute inset-0 flex flex-col justify-center px-8 py-8"
                style={{
                  transform: `translateX(${getTranslate(i)})`,
                  opacity: i === active ? 1 : 0,
                  pointerEvents: i === active ? 'auto' : 'none',
                  transition: 'transform 0.4s ease, opacity 0.3s ease',
                }}
              >
                <p className="text-[15px] leading-[1.65] mb-6">
                  <span className="font-bold text-[#0d1117]">{s.headline}</span>
                  {' '}
                  <span className="font-normal text-[#64748b]">{s.description}</span>
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d1117] border border-black/20 rounded-md px-4 py-2 w-fit hover:bg-black/5 transition-colors"
                >
                  {s.cta}
                  <ChevronArrow />
                </a>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile horizontal scroll cards */}
        <ul
          role="list"
          className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {studies.map((s) => (
            <li
              key={s.id}
              className="shrink-0 w-[85vw] max-w-[320px] rounded-2xl overflow-hidden border border-black/[0.06] bg-[#f8fafb]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className={`h-48 relative bg-gradient-to-br ${s.gradient}`}>
                <img
                  src={s.logo}
                  alt={s.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-auto object-contain brightness-0 invert opacity-75"
                />
                <span className="absolute bottom-4 left-4 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-white/15 text-white border border-white/20">
                  {s.metric}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[14px] leading-[1.6] mb-4">
                  <span className="font-bold text-[#0d1117]">{s.headline}</span>
                  {' '}
                  <span className="font-normal text-[#64748b]">{s.description}</span>
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d1117] border border-black/20 rounded-md px-3 py-1.5 hover:bg-black/5 transition-colors"
                >
                  {s.cta}
                  <ChevronArrow />
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Slide counter */}
        <p className="hidden md:block mt-4 text-xs text-[#94a3b8] text-right">
          {active + 1} / {studies.length}
        </p>

      </div>
    </section>
  )
}
