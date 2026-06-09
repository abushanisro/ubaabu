'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChartColumn, Search, TrendingDown, LineChart, AlertCircle } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import { SectionDivider } from '@/components/products/SectionDivider'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Search,       text: 'Analyzes costs across suppliers, parts, processes' },
  { icon: ChartColumn,  text: 'Benchmarks against market standards'               },
  { icon: AlertCircle,  text: 'Identifies cost outliers and opportunities'         },
  { icon: LineChart,    text: 'Tracks cost trends over time'                      },
]

const STATS = [
  { label: 'Cost transparency',     value: '100',        suffix: '%'   },
  { label: 'Savings identified',    value: '$12K',       suffix: '+'   },
  { label: 'Negotiation prep',      value: 'Data',       suffix: '-backed' },
  { label: 'Portfolio optimization',value: 'Continuous', suffix: ''    },
]

// Benchmark bars: label, height %, teal (= you = lowest/best)
const BARS = [
  { label: 'MKT',  pct: 70, teal: false, value: '$51' },
  { label: 'AVG',  pct: 100, teal: false, value: '$61' },
  { label: 'YOU',  pct: 47, teal: true,  value: '$34' },
  { label: 'COMP', pct: 82, teal: false, value: '$59' },
]

// Dimension comparison rows
const DIMENSIONS = [
  { label: 'Material cost',   you: 78, mkt: 100 },
  { label: 'Labor efficiency',you: 91, mkt: 72  },
  { label: 'Lead time',       you: 84, mkt: 100 },
]

// ── Benchmark visualization ───────────────────────────────────────────────────
function BenchmarkViz({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f0fdf9 100%)', border: '1px solid rgba(20,184,166,0.18)', boxShadow: '0 0 20px rgba(45,212,191,0.12),0 0 60px rgba(45,212,191,0.06),0 24px 64px rgba(0,0,0,0.06)' }}>

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(13,148,136,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,0.07) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Teal glow on the "YOU" bar area */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 30% 60% at 58% 70%, rgba(45,212,191,0.10) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#d9f2ee' }}>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#94a3b8' }}>BENCHMARK ANALYSIS · PART TVC-12</span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#2dd4bf' }} />
        </div>
      </div>

      <div className="px-5 pt-4 pb-3 flex flex-col gap-5" style={{ height: 'calc(100% - 44px)' }}>

        {/* Main bar chart */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: '#94a3b8' }}>Unit cost comparison ($/pc)</span>
            <span className="text-[9px] font-mono" style={{ color: '#0d9488' }}>You are −44% below avg</span>
          </div>

          <div className="flex items-end gap-5 justify-center" style={{ height: 110 }}>
            {BARS.map(({ label, pct, teal, value }, i) => (
              <div key={label} className="flex flex-col items-center gap-2" style={{ flex: 1 }}>
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: EASE }}
                  className="text-[9px] font-mono text-center"
                  style={{ color: teal ? '#0d9488' : '#94a3b8' }}
                >
                  {value}
                </motion.div>
                <div className="w-full flex items-end" style={{ height: 80 }}>
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                    className="w-full origin-bottom rounded-t"
                    style={{
                      height: `${pct}%`,
                      background: teal
                        ? 'linear-gradient(to top, #0d9488, #2dd4bf)'
                        : 'rgba(13,148,136,0.07)',
                      border: teal ? '1px solid rgba(45,212,191,0.5)' : '1px solid #d9f2ee',
                      borderBottom: 'none',
                      boxShadow: teal ? '0 0 20px rgba(45,212,191,0.25), 0 0 60px rgba(45,212,191,0.10)' : 'none',
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono font-semibold"
                  style={{ color: teal ? '#0d9488' : '#94a3b8' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimension comparison */}
        <div className="space-y-2.5">
          <div className="text-[9px] font-mono uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>Performance dimensions vs market</div>
          {DIMENSIONS.map(({ label, you, mkt }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.6 + i * 0.1, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="text-[10px] w-28 shrink-0" style={{ color: '#64748b' }}>{label}</span>
              <div className="relative flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(13,148,136,0.08)' }}>
                {/* Market bar */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ background: 'rgba(13,148,136,0.20)' }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${mkt}%` } : {}}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.1, ease: EASE }}
                />
                {/* You bar */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ background: 'rgba(13,148,136,0.55)' }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${you}%` } : {}}
                  transition={{ duration: 0.7, delay: 0.8 + i * 0.1, ease: EASE }}
                />
              </div>
              <div className="flex gap-2 shrink-0 text-[9px] font-mono">
                <span style={{ color: '#0d9488' }}>{you}</span>
                <span style={{ color: '#94a3b8' }}>vs</span>
                <span style={{ color: '#94a3b8' }}>{mkt}</span>
              </div>
            </motion.div>
          ))}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded-full" style={{ background: 'rgba(13,148,136,0.55)' }} />
              <span className="text-[8px]" style={{ color: '#94a3b8' }}>You</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded-full" style={{ background: 'rgba(13,148,136,0.20)' }} />
              <span className="text-[8px]" style={{ color: '#94a3b8' }}>Market</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t" style={{ borderColor: '#d9f2ee', background: '#f0fdf9' }}>
        {[['−44%', 'vs market avg'], ['$10K', 'annual saving'], ['3', 'outliers flagged']].map(([val, lbl]) => (
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
export default function BenchmarkAnalysisSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Benchmark Analysis module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — bottom-right */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 90% 90%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-10 pb-0 group">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="lg:w-5/12 relative z-10">
            <div className="lg:sticky lg:top-28">

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
                  <rect x="4" y="34" width="32" height="2" rx="1" fill="#0f1b2d" opacity="0.2" />
                  <rect x="6" y="16" width="8" height="18" rx="2" fill="#0d9488" opacity="0.5" />
                  <rect x="16" y="8" width="8" height="26" rx="2" fill="#2dd4bf" />
                  <rect x="26" y="20" width="8" height="14" rx="2" fill="#0d9488" opacity="0.75" />
                  <rect x="4" y="12" width="32" height="1.5" rx="0.75" fill="#0f1b2d" opacity="0.18" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                Benchmark{' '}
                <AnimatedText
                  text="Analysis"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Understand Your Cost & Supply Chain Performance
                </span>
              </motion.p>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                className="origin-left h-0.5 w-16 rounded-full mb-10"
                style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }}
              />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="block h-[260px] lg:h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <BenchmarkViz inView={inView} />
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
                  <ChartColumn className="w-3.5 h-3.5 text-teal-500" />
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
      <SectionDivider />
    </section>
  )
}
