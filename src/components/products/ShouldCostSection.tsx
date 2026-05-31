'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calculator, Cpu, BarChart2, TrendingDown, Activity } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Cpu,          text: 'Estimates manufacturing cost based on materials & processes' },
  { icon: BarChart2,    text: 'Benchmarks quotes against should-cost'                       },
  { icon: TrendingDown, text: 'Identifies cost optimization opportunities'                  },
  { icon: Activity,     text: 'Tracks cost trends over time'                               },
]

const KEY_FEATURES = [
  'Real-time material cost feed',
  'Process cost library',
  'Supplier benchmarking',
  'Multi-scenario costing',
  'Cost sensitivity analysis',
]

const BUILT_FOR = [
  { role: 'Procurement teams',  initials: 'PT' },
  { role: 'Cost engineers',     initials: 'CE' },
  { role: 'Finance',            initials: 'FN' },
  { role: 'Program management', initials: 'PM' },
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
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#0c1117' }}>

      {/* Top teal glow */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 55% at 50% -5%, rgba(20,184,166,0.12) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest">SHOULD-COST ENGINE · TVC-12</span>
        <div className="flex items-center gap-1 text-[10px] text-teal-400">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          AI
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
          style={{ bottom: 36 + 174 * 0.62, borderTop: '1px dashed rgba(255,255,255,0.18)' }}
        >
          <span className="absolute right-0 -top-4 text-[9px] font-mono text-white/30">MKT AVG</span>
        </motion.div>

        {BARS.map((bar, i) => (
          <div key={bar.label} className="relative flex flex-col items-center gap-1" style={{ flex: 1 }}>
            {/* OPT tooltip */}
            {bar.teal && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.3, ease: EASE }}
                className="absolute text-[9px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/25 px-1.5 py-0.5 rounded whitespace-nowrap"
                style={{ bottom: `calc(${bar.pct}% + 8px)` }}
              >
                −23%
              </motion.div>
            )}

            {/* Bar */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.3 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full rounded-t origin-bottom"
              style={{
                height: `${bar.pct * 1.74}px`,
                background: bar.teal
                  ? 'linear-gradient(to top, rgba(13,148,136,0.6), rgba(20,184,166,0.4))'
                  : 'rgba(255,255,255,0.06)',
                border: bar.teal
                  ? '1px solid rgba(20,184,166,0.45)'
                  : '1px solid rgba(255,255,255,0.1)',
                borderBottom: 'none',
                boxShadow: bar.teal ? '0 0 20px rgba(20,184,166,0.15)' : 'none',
              }}
            />

            {/* X-axis label */}
            <span className="text-[9px] font-mono absolute -bottom-5"
              style={{ color: bar.teal ? 'rgba(45,212,191,0.8)' : 'rgba(255,255,255,0.3)' }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/[0.06]">
        {[['−23%', 'vs market avg'], ['₹2.4L', 'savings found'], ['6', 'scenarios']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-teal-400">{val}</span>
            <span className="text-[10px] text-white/30">{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[10px] text-white/25">
          <span className="h-1 w-1 rounded-full bg-teal-400 animate-pulse" />
          live data
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Decorative divider ── */}
        <div className="flex items-center gap-4 pt-10 pb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-mono text-teal-600 shrink-0"
          >
            <Calculator className="w-3.5 h-3.5" />
            MOD_02 · Should-Cost Engine
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-16 pb-14 group">

          {/* ── LEFT ─────────────────────────────────────────────── */}
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
                <Calculator className="w-7 h-7 text-teal-600 relative z-10" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 0 6px rgba(20,184,166,0.08)' }} />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-3 leading-[1.1]"
              >
                Should-Cost{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-700">
                  Engine
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                className="text-base text-slate-500 leading-relaxed mb-3"
              >
                Live Cost Intelligence at Your Fingertips
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
                className="hidden lg:block h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <CostBarViz inView={inView} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────────── */}
          <div className="lg:w-7/12 space-y-5 z-10">

            {/* Capabilities card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative rounded-2xl overflow-hidden border border-slate-100 hover:border-teal-200 transition-colors duration-300"
              style={{ background: 'linear-gradient(135deg, #f8fffd 0%, #ffffff 60%)' }}
            >
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />

              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
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
                      <span className="text-sm text-slate-600 leading-relaxed group-hover/item:text-slate-800 transition-colors duration-200">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Key Features + Built For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 overflow-hidden hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {KEY_FEATURES.map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: EASE }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200
                                 px-3 py-1.5 rounded-lg hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700
                                 transition-all duration-200 cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                      {f}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.38, ease: EASE }}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 overflow-hidden hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Built For</h3>
                <div className="flex flex-col gap-2.5">
                  {BUILT_FOR.map(({ role, initials }, i) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.44 + i * 0.07, ease: EASE }}
                      className="flex items-center gap-3 group/role cursor-default"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/60
                                      flex items-center justify-center shrink-0 text-[9px] font-bold text-teal-600
                                      group-hover/role:from-teal-100 group-hover/role:to-teal-200 transition-colors duration-200">
                        {initials}
                      </div>
                      <span className="text-sm text-slate-600 group-hover/role:text-slate-800 transition-colors duration-200">{role}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ label, value, suffix }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.46 + i * 0.09, ease: EASE }}
                  className="relative overflow-hidden rounded-xl border border-slate-100 p-5 group/stat cursor-default
                             hover:border-teal-200 hover:shadow-lg transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #f8fffe 0%, #ffffff 100%)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/[0.06] to-teal-400/0
                                  -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700 ease-in-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0
                                  group-hover/stat:scale-x-100 transition-transform duration-400 ease-out rounded-b-xl"
                    style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }} />
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 relative z-10">{label}</div>
                  <div className="relative z-10 flex items-baseline gap-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-slate-800 group-hover/stat:text-teal-600 transition-colors duration-300 leading-none">
                      {value}
                    </span>
                    <span className="text-sm font-medium text-slate-500 group-hover/stat:text-teal-500 transition-colors duration-300">
                      {suffix}
                    </span>
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
