'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Search, SortDesc, Workflow, PiggyBank } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import { SectionDivider } from '@/components/products/SectionDivider'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Search,    text: 'Identifies design, material, process, and supplier optimizations' },
  { icon: SortDesc,  text: 'Prioritizes VAVE ideas by impact & feasibility'                  },
  { icon: Workflow,  text: 'Structures VAVE workflow (ideation to implementation)'            },
  { icon: PiggyBank, text: 'Tracks savings realization across portfolio'                      },
]

const STATS = [
  { label: 'Ideas generated',  value: '3–5',   suffix: 'x'         },
  { label: 'Idea quality',     value: '+40',   suffix: '%'         },
  { label: 'Realization rate', value: '+55',   suffix: '%'         },
  { label: 'Cost reduction',   value: '$6K',  suffix: '/yr'       },
]

// Orbit chips - VAVE idea categories
const ORBIT_ITEMS = [
  { label: 'Material', angle: 0   },
  { label: 'Design',   angle: 72  },
  { label: 'Process',  angle: 144 },
  { label: 'Supplier', angle: 216 },
  { label: 'Tooling',  angle: 288 },
]

// Pre-computed at module level so server and client produce identical floats
const R = 88
const round = (n: number) => Math.round(n * 1e4) / 1e4

const SPOKES = ORBIT_ITEMS.map(({ angle }) => {
  const rad = (angle * Math.PI) / 180
  return {
    x2: round(Math.cos(rad) * (R - 20)),
    y2: round(Math.sin(rad) * (R - 20)),
  }
})

// ── Animated VAVE orbit visualization ────────────────────────────────────────
function VaveOrbitViz({ inView }: { inView: boolean }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf9 100%)',
        border: '1px solid rgba(20,184,166,0.18)',
        boxShadow: '0 0 20px rgba(45,212,191,0.12), 0 0 60px rgba(45,212,191,0.06), 0 24px 64px rgba(0,0,0,0.06)',
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(13,148,136,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

      {/* Teal radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 140px at 50% 55%, rgba(45,212,191,0.10) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#d9f2ee' }}>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#94a3b8' }}>VAVE STUDIO · ACTIVE SESSION</span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#2dd4bf' }} />
          <span className="text-[10px] font-mono" style={{ color: '#0d9488' }}>AI</span>
        </div>
      </div>

      {/* Orbit scene */}
      <div className="relative flex items-center justify-center" style={{ height: 258 }}>

        {/* Outer dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-dashed"
          style={{ width: R * 2 + 48, height: R * 2 + 48, borderColor: 'rgba(13,148,136,0.2)' }}
        />

        {/* Middle teal ring */}
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.04, 1] }}
          transition={{ rotate: { duration: 18, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute rounded-full"
          style={{ width: R * 2 + 12, height: R * 2 + 12, border: '1px solid rgba(45,212,191,0.35)' }}
        />

        {/* Central hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(13,148,136,0.08))',
            border: '1px solid rgba(45,212,191,0.45)',
            boxShadow: '0 0 32px rgba(45,212,191,0.20), 0 0 0 1px rgba(45,212,191,0.10)',
          }}
        >
          <Zap className="w-7 h-7" style={{ color: '#0d9488' }} />
          {[0, 0.6, 1.2].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-2xl"
              style={{ border: '1px solid rgba(45,212,191,0.3)' }}
              animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay, ease: 'easeOut' }}
            />
          ))}
        </motion.div>

        {/* Orbiting idea chips */}
        {ORBIT_ITEMS.map(({ label, angle }, i) => {
          const rad = (angle * Math.PI) / 180
          const x = round(Math.cos(rad) * R)
          const y = round(Math.sin(rad) * R)
          return (
            <div key={label} className="absolute"
              style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`, transform: 'translate(-50%, -50%)' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: EASE }}
                className="text-[10px] font-mono font-semibold px-2 py-1 rounded-md whitespace-nowrap"
                style={{
                  color: '#0d9488',
                  background: 'rgba(45,212,191,0.10)',
                  border: '1px solid rgba(45,212,191,0.28)',
                }}
              >
                {label}
              </motion.div>
            </div>
          )
        })}

        {/* Connecting spokes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          <g transform="translate(50%, 50%)">
            {SPOKES.map(({ x2, y2 }, i) => (
              <motion.line
                key={i}
                x1="0" y1="0" x2={x2} y2={y2}
                stroke="rgba(13,148,136,0.22)"
                strokeWidth="1"
                strokeDasharray="3 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-5 px-4 py-2.5 border-t" style={{ borderColor: '#d9f2ee', background: '#f0fdf9' }}>
        {[['12', 'ideas found'], ['$277K', 'pipeline'], ['4', 'in progress']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-bold" style={{ color: '#0d9488' }}>{val}</span>
            <span className="text-[10px]" style={{ color: '#94a3b8' }}>{lbl}</span>
          </div>
        ))}
        <div className="ml-auto">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
            style={{ background: 'rgba(16,185,129,0.10)', color: '#10b981' }}>
            Active
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function VaveStudioSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="VAVE Studio module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient - center-left for variety */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 20% 55%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-10 pb-0 group">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="lg:w-5/12 relative z-10">
            <div className="lg:sticky lg:top-28">

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, ease: EASE }}
                className="flex items-center justify-center rounded-lg shrink-0 mb-6"
                style={{
                  width: 44, height: 44,
                  background: 'rgba(240,253,249,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(20,184,166,0.22)',
                  boxShadow: 'rgba(0,0,0,0.06) 0px 2px 6px, rgba(255,255,255,0.75) 0px 1px 0px inset',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ overflow: 'visible' }}>
                  <rect x="4" y="28" width="10" height="8" rx="2" fill="#0d9488" opacity="0.5" />
                  <rect x="15" y="20" width="10" height="16" rx="2" fill="#0d9488" />
                  <rect x="26" y="10" width="10" height="26" rx="2" fill="#2dd4bf" />
                  <rect x="4" y="26" width="10" height="2" rx="1" fill="#2dd4bf" opacity="0.5" />
                  <rect x="15" y="18" width="10" height="2" rx="1" fill="#2dd4bf" opacity="0.4" />
                  <rect x="26" y="8" width="10" height="2" rx="1" fill="#2dd4bf" opacity="0.6" />
                </svg>
              </motion.div>

              {/* Heading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                VAVE{' '}
                <AnimatedText
                  text="Studio"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Systematic Value Engineering at Scale
                </span>
              </motion.p>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                className="origin-left h-0.5 w-16 rounded-full mb-10"
                style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }}
              />

              {/* Visualization */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="block h-[260px] lg:h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <VaveOrbitViz inView={inView} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────────── */}
          <div className="lg:w-7/12 space-y-5 z-10 lg:self-center">

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative rounded-2xl overflow-hidden border border-black/8 hover:border-teal-200 transition-colors duration-300"
              style={{ background: '#ffffff' }}
            >
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />
              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-teal-500" />
                  Capabilities
                </h3>
                <ul className="space-y-3.5">
                  {CAPABILITIES.map(({ icon: Icon, text }, i) => (
                    <motion.li
                      key={text}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.26 + i * 0.07, ease: EASE }}
                      className="flex items-start gap-3.5 group/item cursor-default"
                    >
                      <div className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-teal-50 border border-teal-100 flex items-center justify-center
                                      group-hover/item:bg-teal-100 group-hover/item:border-teal-200 transition-colors duration-200">
                        <Icon className="w-3.5 h-3.5 text-teal-500" />
                      </div>
                      <span className="text-sm text-black/60 leading-relaxed group-hover/item:text-black/80 transition-colors duration-200">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ label, value, suffix }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.46 + i * 0.09, ease: EASE }}
                  className="relative overflow-hidden rounded-xl border border-black/8 p-5 group/stat cursor-default
                             hover:border-teal-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/[0.06] to-teal-400/0
                                  -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700 ease-in-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0
                                  group-hover/stat:scale-x-100 transition-transform duration-400 ease-out rounded-b-xl"
                    style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }} />
                  <div className="text-[10px] font-mono text-black/40 uppercase tracking-wider mb-2 relative z-10">{label}</div>
                  <div className="relative z-10 flex items-baseline gap-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-[#0d1117] group-hover/stat:text-[#0d9e8a] transition-colors duration-300 leading-none">
                      {value}
                    </span>
                    <span className="text-sm font-medium text-black/55 group-hover/stat:text-[#0d9e8a] transition-colors duration-300">
                      {suffix}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <SectionDivider />
    </section>
  )
}
