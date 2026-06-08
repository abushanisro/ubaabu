'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gem, Globe, BarChart3, Sliders, TrendingUp } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import { SectionDivider } from '@/components/products/SectionDivider'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: Globe,    text: 'Benchmarks industry costs'                       },
  { icon: BarChart3,text: 'Analyzes cost structures comprehensively'        },
  { icon: Sliders,  text: 'Models scenarios for strategic decisions'         },
  { icon: TrendingUp,text:'Provides supplier-agnostic cost analysis'        },
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
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f0fdf9 100%)', border: '1px solid rgba(20,184,166,0.18)', boxShadow: '0 0 20px rgba(45,212,191,0.12),0 0 60px rgba(45,212,191,0.06),0 24px 64px rgba(0,0,0,0.06)' }}>

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(13,148,136,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,0.07) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Teal glow — premium feel */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 140px at 50% 52%, rgba(45,212,191,0.12) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#d9f2ee' }}>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#94a3b8' }}>COST BENCHMARKER · PREMIUM</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(45,212,191,0.12)', color: '#0d9488', border: '1px solid rgba(45,212,191,0.35)' }}>
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
            style={{ width: 96, height: 96, transformStyle: 'preserve-3d' }}
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
                  className="absolute inset-0 rounded-full border"
                  style={{ transform: rot, borderColor: 'rgba(13,148,136,0.30)' }}
                />
              ))}
            </motion.div>
            {/* Centre glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-50"
              style={{ background: '#2dd4bf', filter: 'blur(14px)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: '#0d9488' }} />
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
              <div className="text-xs font-bold" style={{ color: '#0d9488' }}>{label}</div>
              <div className="text-[9px]" style={{ color: '#94a3b8' }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Scenario comparison */}
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>Scenario modelling</div>
          <div className="grid grid-cols-2 gap-1.5">
            {SCENARIOS.map(({ label, saving, delta, active }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
                className="rounded-lg px-3 py-2 border flex items-center justify-between"
                style={{
                  background: active ? 'rgba(45,212,191,0.08)' : '#ffffff',
                  borderColor: active ? 'rgba(20,184,166,0.45)' : '#d9f2ee',
                }}
              >
                <div>
                  <div className="text-[9px] font-mono" style={{ color: active ? '#0d9488' : '#94a3b8' }}>{label}</div>
                  <div className="text-[10px] font-semibold" style={{ color: active ? '#0d9488' : '#64748b' }}>{saving}</div>
                </div>
                <div className="text-[9px] font-mono" style={{ color: active ? '#0d9488' : '#94a3b8' }}>{delta}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t" style={{ borderColor: '#d9f2ee', background: '#f0fdf9' }}>
        {[['₹41L', 'best scenario'], ['22%', 'uplift'], ['4', 'scenarios']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-bold" style={{ color: '#0d9488' }}>{val}</span>
            <span className="text-[10px]" style={{ color: '#94a3b8' }}>{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 font-mono" style={{ color: '#0d9488' }}>
          <Gem className="w-3 h-3" />
          <span className="text-[10px]">premium</span>
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
                  width: 44,
                  height: 44,
                  background: 'rgba(240,253,249,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(20,184,166,0.22)',
                  boxShadow: 'rgba(0,0,0,0.06) 0px 2px 6px, rgba(255,255,255,0.75) 0px 1px 0px inset',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ overflow: 'visible' }}>
                  <rect x="10" y="6" width="20" height="7" rx="2" fill="#2dd4bf" />
                  <rect x="4" y="18" width="14" height="7" rx="2" fill="#0d9488" />
                  <rect x="22" y="18" width="14" height="7" rx="2" fill="#0d9488" />
                  <rect x="4" y="30" width="8" height="5" rx="1.5" fill="#0f1b2d" />
                  <rect x="16" y="30" width="8" height="5" rx="1.5" fill="#0f1b2d" />
                  <rect x="28" y="30" width="8" height="5" rx="1.5" fill="#0f1b2d" />
                  <rect x="19" y="13" width="2" height="5" fill="#0f1b2d" opacity="0.6" />
                  <rect x="8" y="25" width="2" height="5" fill="#0f1b2d" opacity="0.6" />
                  <rect x="30" y="25" width="2" height="5" fill="#0f1b2d" opacity="0.6" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                Cost{' '}
                <AnimatedText
                  text="Benchmarker"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Strategic Cost Intelligence for Portfolio Optimization
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
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(20,184,166,0.1)' }}
              >
                <CostBenchmarkerViz inView={inView} />
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
              className="relative rounded-2xl overflow-hidden border border-black/8 hover:border-teal-300 transition-colors duration-300"
              style={{ background: '#ffffff' }}
            >
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />
              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-widest mb-5 flex items-center gap-2">
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
                             hover:border-teal-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/[0.07] to-teal-400/0
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
    </section>
  )
}
