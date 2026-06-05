'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, CircleCheck, GitBranch, Link2, Bell, RefreshCw, History } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: GitBranch, text: 'Auto-generate multi-level BOMs from CAD/design specs' },
  { icon: Link2,     text: 'Link parts to suppliers and their capabilities'        },
  { icon: Bell,      text: 'Track revisions with automated change notifications'   },
  { icon: RefreshCw, text: 'Sync BOMs across design, procurement, manufacturing, quality systems' },
  { icon: History,   text: 'Historical BOM tracking (understand cost/design evolution)' },
]

const STATS = [
  { label: 'BOM accuracy',        value: '99.4%+',     suffix: '' },
  { label: 'Time to generate',    value: '80%',         suffix: 'faster' },
  { label: 'Supplier matching',   value: 'Auto',        suffix: 'matic'  },
  { label: 'Change coordination', value: 'Real',        suffix: '-time'  },
]

// ── SVG tree paths (viewBox 400×220) ─────────────────────────────────────────
const TREE_PATHS = [
  { d: 'M200,52 C200,80 100,80 100,108', teal: true,  delay: 0.2 },
  { d: 'M200,52 C200,80 300,80 300,108', teal: true,  delay: 0.3 },
  { d: 'M100,126 C100,152 60,152 60,178', teal: false, delay: 0.5 },
  { d: 'M100,126 C100,152 140,152 140,178', teal: false, delay: 0.6 },
  { d: 'M300,126 C300,152 260,152 260,178', teal: false, delay: 0.7 },
  { d: 'M300,126 C300,152 340,152 340,178', teal: false, delay: 0.8 },
]

const L1_NODES = [
  { x: 75,  y: 108, label: 'ENG-01', sub: 'Engine Block', delay: 0.4 },
  { x: 275, y: 108, label: 'ROT-01', sub: 'Rotor Sys',    delay: 0.45 },
]

const L2_NODES = [
  { x: 35,  y: 178, label: 'SFT', delay: 0.6 },
  { x: 115, y: 178, label: 'BRG', delay: 0.65 },
  { x: 235, y: 178, label: 'BLD', delay: 0.7 },
  { x: 315, y: 178, label: 'HUB', delay: 0.75 },
]

// ── BOM Tree Visualization ────────────────────────────────────────────────────
function BomTreeViz({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#0f1b2d' }}>

      {/* Primary teal glow at top — #2dd4bf */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% -10%, rgba(45,212,191,0.22) 0%, rgba(13,148,136,0.08) 55%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest">BOM COMPOSER · TVC-12</span>
        <div />
      </div>

      {/* SVG tree */}
      <div className="relative flex items-center justify-center" style={{ height: 250 }}>
        <svg viewBox="0 0 400 220" width="100%" height="100%" className="overflow-visible">

          {/* Connector paths */}
          {TREE_PATHS.map((p, i) => (
            <g key={i}>
              <motion.path
                d={p.d}
                fill="none"
                stroke={p.teal ? 'rgba(45,212,191,0.55)' : 'rgba(255,255,255,0.10)'}
                strokeWidth={p.teal ? 1.5 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: p.delay, ease: 'easeOut' }}
              />
              {/* Travelling dot along teal paths */}
              {p.teal && (
                <circle r="2.5" fill="#2dd4bf" opacity="0">
                  <animateMotion path={p.d} dur={`${2.8 + i * 0.3}s`} repeatCount="indefinite" begin={`${p.delay + 0.8}s`} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1"
                    dur={`${2.8 + i * 0.3}s`} repeatCount="indefinite" begin={`${p.delay + 0.8}s`} />
                </circle>
              )}
            </g>
          ))}

          {/* Root node — primary #2dd4bf border, deep #0d9488 fill tint */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <rect x="148" y="22" width="104" height="32" rx="6"
              fill="rgba(13,148,136,0.18)" stroke="#2dd4bf" strokeWidth="1.5" />
            <text x="200" y="35" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="700" fontFamily="monospace" letterSpacing="1">TVC-12</text>
            <text x="200" y="46" textAnchor="middle" fill="rgba(45,212,191,0.65)" fontSize="8" fontFamily="system-ui">Turbine Assembly</text>
          </motion.g>

          {/* L1 nodes — deep teal border hint */}
          {L1_NODES.map((n) => (
            <motion.g key={n.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: n.delay, ease: EASE }}
            >
              <rect x={n.x} y={n.y} width="50" height="20" rx="4"
                fill="rgba(13,148,136,0.10)" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
              <text x={n.x + 25} y={n.y + 10} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8" fontWeight="600" fontFamily="monospace">{n.label}</text>
              <text x={n.x + 25} y={n.y + 18} textAnchor="middle" fill="rgba(45,212,191,0.45)" fontSize="7" fontFamily="system-ui">{n.sub}</text>
            </motion.g>
          ))}

          {/* L2 nodes */}
          {L2_NODES.map((n) => (
            <motion.g key={n.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: n.delay, ease: EASE }}
            >
              <rect x={n.x} y={n.y} width="40" height="16" rx="3"
                fill="rgba(13,148,136,0.07)" stroke="rgba(45,212,191,0.15)" strokeWidth="1" />
              <text x={n.x + 20} y={n.y + 10} textAnchor="middle" fill="rgba(45,212,191,0.5)" fontSize="7.5" fontFamily="monospace">{n.label}</text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Footer stats bar */}
      <div className="flex items-center gap-4 px-4 py-2 border-t" style={{ borderColor: 'rgba(13,148,136,0.2)' }}>
        {[['127', 'parts'], ['4', 'levels'], ['72K+', 'suppliers']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-semibold" style={{ color: '#2dd4bf' }}>{val}</span>
            <span className="text-[10px] text-white/30">{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[10px] text-white/25">
          <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: '#2dd4bf' }} />
          synced
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function BomComposerSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="BOM Composer module"
      className="relative bg-white overflow-hidden"
    >
      {/* Subtle teal ambient in section background */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 15% 60%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      {/* Fine dot grid */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-16">

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-16 pb-0 group">

          {/* ── LEFT: sticky info ──────────────────────────────────── */}
          <div className="lg:w-5/12 relative z-10">
            <div className="sticky top-28">

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative w-16 h-16 rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)', border: '1px solid rgba(20,184,166,0.25)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))' }} />
                <Layers className="w-7 h-7 text-teal-600 relative z-10" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 0 6px rgba(20,184,166,0.08)' }} />
              </motion.div>

              {/* Heading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                BOM{' '}
                <AnimatedText
                  text="Composer"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Intelligent Bill of Materials Management
                </span>
              </motion.p>

              {/* Accent rule */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                className="origin-left h-0.5 w-16 rounded-full mb-10"
                style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }}
              />

              {/* BOM tree visualization */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="hidden lg:block h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <BomTreeViz inView={inView} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: cards ───────────────────────────────────────── */}
          <div className="lg:w-7/12 space-y-5 z-10">

            {/* Capabilities card — teal left-border accent */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative rounded-2xl overflow-hidden border border-black/8 hover:border-teal-200 transition-colors duration-300"
              style={{ background: '#ffffff' }}
            >
              {/* Left accent bar */}
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />

              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-teal-500" />
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

            {/* Stats — 2×2 grid */}
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
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/[0.06] to-teal-400/0
                                  -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700 ease-in-out" />
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0
                                  group-hover/stat:scale-x-100 transition-transform duration-400 ease-out rounded-b-xl"
                    style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }} />

                  <div className="text-[10px] font-mono text-black/40 uppercase tracking-wider mb-2 relative z-10">{label}</div>
                  <div className="relative z-10 flex items-baseline gap-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-[#0d1117] group-hover/stat:text-[#0d9e8a] transition-colors duration-300 leading-none">
                      {value}
                    </span>
                    {suffix && (
                      <span className="text-sm font-medium text-black/55 group-hover/stat:text-[#0d9e8a] transition-colors duration-300">
                        {suffix}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
