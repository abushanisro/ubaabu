'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calculator, Cpu, BarChart2, TrendingDown, Activity } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import { SectionDivider } from '@/components/products/SectionDivider'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Cpu,          text: 'Estimates manufacturing cost based on materials & processes' },
  { icon: BarChart2,    text: 'Benchmarks quotes against should-cost'                       },
  { icon: TrendingDown, text: 'Identifies cost optimization opportunities'                  },
  { icon: Activity,     text: 'Tracks cost trends over time'                               },
]

const STATS = [
  { label: 'RFQ evaluation time',   value: '−80',    suffix: '%'    },
  { label: 'Cost accuracy',         value: '±8',     suffix: '%'    },
  { label: 'Savings / project',     value: '₹10L',   suffix: '+'    },
  { label: 'Negotiation confidence',value: '100',    suffix: '%'    },
]

// Bar heights as % of chart area
const BARS = [
  { pct: 33, label: 'Mat',  teal: false },
  { pct: 55, label: 'Lab',  teal: false },
  { pct: 44, label: 'OH',   teal: false },
  { pct: 77, label: 'Tool', teal: false },
  { pct: 60, label: 'Log',  teal: false },
  { pct: 90, label: 'OPT',  teal: true  },
]

// ── Cost bar chart visualization ──────────────────────────────────────────────
function CostBarViz({ inView }: { inView: boolean }) {
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

      {/* Soft teal radial glow */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(45,212,191,0.13) 0%, transparent 80%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#d9f2ee' }}>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#94a3b8' }}>SHOULD-COST ENGINE · TVC-12</span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#2dd4bf' }} />
          <span className="text-[10px] font-mono" style={{ color: '#0d9488' }}>AI</span>
        </div>
      </div>

      {/* Chart area */}
      <div className="relative flex items-end justify-center gap-3 px-6" style={{ height: 210, paddingBottom: 36 }}>

        {/* Market-avg dashed line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          className="absolute left-6 right-6 origin-left pointer-events-none"
          style={{ bottom: 36 + 174 * 0.62, borderTop: '1px dashed rgba(13,148,136,0.35)' }}
        >
          <span className="absolute right-0 -top-4 text-[9px] font-mono" style={{ color: '#94a3b8' }}>MKT AVG</span>
        </motion.div>

        {BARS.map((bar, i) => (
          <div key={bar.label} className="relative flex flex-col items-center gap-1" style={{ flex: 1 }}>
            {bar.teal && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.3, ease: EASE }}
                className="absolute text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap font-semibold"
                style={{
                  bottom: `calc(${bar.pct}% + 8px)`,
                  color: '#0d9488',
                  background: 'rgba(45,212,191,0.12)',
                  border: '1px solid rgba(45,212,191,0.3)',
                }}
              >
                −23%
              </motion.div>
            )}

            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.3 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full rounded-t origin-bottom"
              style={{
                height: `${bar.pct * 1.74}px`,
                background: bar.teal
                  ? 'linear-gradient(to top, #0d9488, #2dd4bf)'
                  : 'rgba(13,148,136,0.07)',
                border: bar.teal
                  ? '1px solid rgba(45,212,191,0.5)'
                  : '1px solid #d9f2ee',
                borderBottom: 'none',
                boxShadow: bar.teal
                  ? '0 0 20px rgba(45,212,191,0.25), 0 0 60px rgba(45,212,191,0.10)'
                  : 'none',
              }}
            />

            <span className="text-[9px] font-mono absolute -bottom-5"
              style={{ color: bar.teal ? '#0d9488' : '#94a3b8' }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-5 px-4 py-2.5 border-t" style={{ borderColor: '#d9f2ee', background: '#f0fdf9' }}>
        {[['−23%', 'vs market avg'], ['₹2.4L', 'savings found'], ['6', 'scenarios']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-bold" style={{ color: '#0d9488' }}>{val}</span>
            <span className="text-[10px]" style={{ color: '#94a3b8' }}>{lbl}</span>
          </div>
        ))}
        <div className="ml-auto">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
            style={{ background: 'rgba(45,212,191,0.12)', color: '#0d9488' }}>
            Active
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ShouldCostSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Should-Cost Engine module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — right-side this time for visual variety */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 85% 40%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      {/* Fine dot grid */}
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
                className="relative w-16 h-16 rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)', border: '1px solid rgba(20,184,166,0.25)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))' }} />
                <Calculator className="w-7 h-7 text-teal-600 relative z-10" />
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
                Should-Cost{' '}
                <AnimatedText
                  text="Engine"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Live Cost Intelligence at Your Fingertips
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

              {/* Visualization */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="block h-[260px] lg:h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <CostBarViz inView={inView} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────────── */}
          <div className="lg:w-7/12 space-y-5 z-10 lg:self-center">

            {/* Capabilities card */}
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
                  <Calculator className="w-3.5 h-3.5 text-teal-500" />
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
