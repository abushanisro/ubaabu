'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gem, Globe, BarChart3, Sliders, TrendingUp } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Globe,    text: 'Benchmarks industry costs'                       },
  { icon: BarChart3,text: 'Analyzes cost structures comprehensively'        },
  { icon: Sliders,  text: 'Models scenarios for strategic decisions'         },
  { icon: TrendingUp,text:'Provides supplier-agnostic cost analysis'        },
]

const KEY_FEATURES = [
  'Industry benchmark database',
  'Cost structure breakdown',
  'Scenario modeling',
  'Competitive cost benchmarking',
  'Long-term trend analysis',
]

const BUILT_FOR = [
  { role: 'C-suite / Finance',     initials: 'CS' },
  { role: 'Procurement leadership',initials: 'PL' },
  { role: 'M&A / Corp Dev',        initials: 'MA' },
]

const STATS = [
  { label: 'Strategic visibility', value: 'Complete',      suffix: ''    },
  { label: 'Savings identified',   value: '₹100L',         suffix: '+'   },
  { label: 'Procurement strategy', value: 'Data',          suffix: '-backed' },
  { label: 'Margin protection',    value: 'Transparent',   suffix: ''    },
]

// Scenario comparison data
const SCENARIOS = [
  { label: 'Base Case',      saving: '₹0',     delta: '0%',   active: false },
  { label: 'Consolidation',  saving: '₹28L',   delta: '+14%', active: false },
  { label: 'Dual Source',    saving: '₹41L',   delta: '+22%', active: true  },
  { label: 'Nearshoring',    saving: '₹18L',   delta: '+9%',  active: false },
]

// ── 3D Sphere + Cost Intelligence Viz ────────────────────────────────────────
function CostBenchmarkerViz({ inView }: { inView: boolean }) {
  const RING_ROTATIONS = [
    'rotateX(0deg) rotateY(0deg)',
    'rotateX(45deg) rotateY(45deg)',
    'rotateX(90deg) rotateY(90deg)',
    'rotateX(135deg) rotateY(135deg)',
  ]

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#0c1117' }}>

      {/* Stronger teal glow — premium feel */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 140px at 50% 52%, rgba(20,184,166,0.16) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest">COST BENCHMARKER · PREMIUM</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full">
            PREMIUM
          </span>
        </div>
      </div>

      <div className="px-5 pt-3 pb-3 flex flex-col gap-4" style={{ height: 'calc(100% - 44px)' }}>

        {/* 3D sphere + surrounding metrics */}
        <div className="relative flex items-center justify-center" style={{ height: 130 }}>

          {/* 3D sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="relative"
            style={{
              width: 96, height: 96,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateX: [0, 360], rotateY: [0, 180] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              {RING_ROTATIONS.map((rot, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-teal-500/30"
                  style={{ transform: rot }}
                />
              ))}
            </motion.div>
            {/* Centre glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-teal-400 rounded-full opacity-50"
              style={{ filter: 'blur(14px)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-400 rounded-full" />
          </motion.div>

          {/* Floating metric chips around sphere */}
          {[
            { label: '72K+',  sub: 'benchmarks',  pos: 'left-0 top-1/2 -translate-y-1/2' },
            { label: '₹100L+',sub: 'savings pool', pos: 'right-0 top-1/2 -translate-y-1/2' },
            { label: '12',    sub: 'industries',   pos: 'top-0 left-1/2 -translate-x-1/2' },
          ].map(({ label, sub, pos }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.12, ease: EASE }}
              className={`absolute ${pos} text-center`}
            >
              <div className="text-xs font-bold text-teal-400">{label}</div>
              <div className="text-[9px] text-white/30">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Scenario comparison */}
        <div>
          <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-2">Scenario modelling</div>
          <div className="grid grid-cols-2 gap-1.5">
            {SCENARIOS.map(({ label, saving, delta, active }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
                className="rounded-lg px-3 py-2 border flex items-center justify-between"
                style={{
                  background: active ? 'rgba(20,184,166,0.1)' : 'rgba(255,255,255,0.02)',
                  borderColor: active ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.07)',
                }}
              >
                <div>
                  <div className="text-[9px] font-mono" style={{ color: active ? 'rgba(45,212,191,0.9)' : 'rgba(255,255,255,0.4)' }}>{label}</div>
                  <div className="text-[10px] font-semibold" style={{ color: active ? '#2dd4bf' : 'rgba(255,255,255,0.5)' }}>{saving}</div>
                </div>
                <div className="text-[9px] font-mono" style={{ color: active ? '#2dd4bf' : 'rgba(255,255,255,0.25)' }}>{delta}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/[0.06]">
        {[['₹41L', 'best scenario'], ['22%', 'uplift'], ['4', 'scenarios']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-teal-400">{val}</span>
            <span className="text-[10px] text-white/30">{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[10px] text-teal-400/60 font-mono">
          <Gem className="w-3 h-3" />
          premium
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function CostBenchmarkerSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Cost Benchmarker module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — slightly stronger for premium feel */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(20,184,166,0.05) 0%, transparent 70%)' }} />

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
            <Gem className="w-3.5 h-3.5" />
            MOD_10 · Cost Benchmarker
            <span className="text-[9px] uppercase tracking-widest font-bold bg-teal-500/15 text-teal-600 px-2 py-0.5 rounded-full border border-teal-300/50">
              Premium
            </span>
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-16 pb-14 group">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="lg:w-5/12 relative z-10">
            <div className="sticky top-28">

              {/* Icon — slightly premium styling */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative w-16 h-16 rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 50%, #f0fdf4 100%)',
                  border: '1px solid rgba(20,184,166,0.35)',
                  boxShadow: '0 0 20px rgba(20,184,166,0.08)',
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(20,184,166,0.05))' }} />
                <Gem className="w-7 h-7 text-teal-600 relative z-10" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 0 8px rgba(20,184,166,0.07)' }} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-3 leading-[1.1]"
              >
                Cost{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-700">
                  Benchmarker
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                className="text-base text-slate-500 leading-relaxed mb-3"
              >
                Strategic Cost Intelligence for Portfolio Optimization
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
                className="hidden lg:block h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(20,184,166,0.1)' }}
              >
                <CostBenchmarkerViz inView={inView} />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────────── */}
          <div className="lg:w-7/12 space-y-5 z-10">

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="relative rounded-2xl overflow-hidden border border-teal-100 hover:border-teal-300 transition-colors duration-300"
              style={{ background: 'linear-gradient(135deg, #f0fdfb 0%, #ffffff 60%)' }}
            >
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />
              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Gem className="w-3.5 h-3.5 text-teal-500" />
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
                className="relative rounded-2xl border border-slate-100 bg-white p-6 overflow-hidden hover:border-teal-200 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
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
                className="relative rounded-2xl border border-slate-100 bg-white p-6 overflow-hidden hover:border-teal-200 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />
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
                  className="relative overflow-hidden rounded-xl border border-teal-100/80 p-5 group/stat cursor-default
                             hover:border-teal-300 hover:shadow-lg transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #f0fdfb 0%, #ffffff 100%)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/[0.07] to-teal-400/0
                                  -translate-x-full group-hover/stat:translate-x-full transition-transform duration-700 ease-in-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0
                                  group-hover/stat:scale-x-100 transition-transform duration-400 ease-out rounded-b-xl"
                    style={{ background: 'linear-gradient(90deg, #14b8a6, transparent)' }} />
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 relative z-10">{label}</div>
                  <div className="relative z-10 flex items-baseline gap-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-slate-800 group-hover/stat:text-teal-600 transition-colors duration-300 leading-none">
                      {value}
                    </span>
                    {suffix && (
                      <span className="text-sm font-medium text-slate-500 group-hover/stat:text-teal-500 transition-colors duration-300">
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
