'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, ScanSearch, ListOrdered, FileSearch, MousePointerClick } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: ScanSearch,       text: 'Evaluates 1,000+ suppliers across fit criteria'  },
  { icon: ListOrdered,      text: 'Returns ranked shortlist with matching analysis'  },
  { icon: FileSearch,       text: 'Shows transparent selection rationale'            },
  { icon: MousePointerClick,text: 'Enables one-click RFQ initiation'                },
]

const KEY_FEATURES = [
  'Intelligent requirements capture',
  'Multi-criteria matching',
  'Weighted ranking',
  'Supplier data sheets',
  'One-click RFQ send',
]

const BUILT_FOR = [
  { role: 'Procurement teams',   initials: 'PT' },
  { role: 'Sourcing specialists',initials: 'SS' },
  { role: 'Design engineers',    initials: 'DE' },
]

const STATS = [
  { label: 'Evaluation time',   value: '−75',  suffix: '%'   },
  { label: 'Options evaluated', value: '+300', suffix: '%'   },
  { label: 'RFQ quality',       value: '+18',  suffix: '%'   },
  { label: 'Time to send',      value: '10',   suffix: ' mins'},
]

// Supplier inputs (left side)
const INPUTS = [
  { id: 'REQ-01', label: 'Precision machining' },
  { id: 'REQ-02', label: 'ISO 9001 certified'  },
  { id: 'REQ-03', label: 'Pune / Chennai hub'  },
]

// Ranked match results (right side)
const MATCHES = [
  { rank: 1, id: 'SUP-07', name: 'Apex Precision',  score: 96, teal: true  },
  { rank: 2, id: 'SUP-23', name: 'VeeTech Works',   score: 88, teal: false },
  { rank: 3, id: 'SUP-11', name: 'Pinnacle Parts',  score: 81, teal: false },
]

// ── Vendor match visualization ────────────────────────────────────────────────
function VendorMatchViz({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#0c1117' }}>

      {/* Teal ambient glow at center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle 100px at 50% 56%, rgba(20,184,166,0.12) 0%, transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest">VENDOR MATCH · AI SHORTLISTING</span>
        <div className="flex items-center gap-1 text-[10px] text-teal-400">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          AI
        </div>
      </div>

      {/* Matching scene */}
      <div className="relative flex items-center justify-between px-8" style={{ height: 256 }}>

        {/* Left: Requirements */}
        <div className="flex flex-col gap-4 z-10">
          {INPUTS.map(({ id, label }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
            >
              <span className="text-[9px] font-mono text-teal-400/60">{id}</span>
              <span className="text-[10px] text-white/55">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Center connectors + hub (SVG) */}
        <div className="relative flex-1 h-full flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Left → Hub paths */}
            <motion.path d="M 0 70 C 40 70, 40 128, 80 128"
              fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="1.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }} />
            <motion.path d="M 0 128 C 40 128, 40 128, 80 128"
              fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="1.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }} />
            <motion.path d="M 0 186 C 40 186, 40 128, 80 128"
              fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="1.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }} />
            {/* Hub → Right paths */}
            <motion.path d="M 120 128 C 160 128, 160 70, 200 70"
              fill="none" stroke="rgba(20,184,166,0.35)" strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }} />
            <motion.path d="M 120 128 C 160 128, 160 128, 200 128"
              fill="none" stroke="rgba(20,184,166,0.55)" strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }} />
            <motion.path d="M 120 128 C 160 128, 160 186, 200 186"
              fill="none" stroke="rgba(20,184,166,0.25)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }} />
          </svg>

          {/* AI Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
            className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(20,184,166,0.18)', border: '1px solid rgba(20,184,166,0.5)', boxShadow: '0 0 28px rgba(20,184,166,0.18)' }}
          >
            <Users className="w-6 h-6 text-teal-400" />
            {/* Pulse */}
            <motion.div className="absolute inset-0 rounded-2xl border border-teal-400/30"
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
          </motion.div>
        </div>

        {/* Right: Ranked matches */}
        <div className="flex flex-col gap-3 z-10">
          {MATCHES.map(({ rank, id, name, score, teal }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.85 + i * 0.1, ease: EASE }}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 border"
              style={teal
                ? { background: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.45)' }
                : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }
              }
            >
              <span className="text-[9px] font-bold w-3" style={{ color: teal ? '#2dd4bf' : 'rgba(255,255,255,0.3)' }}>
                #{rank}
              </span>
              <div>
                <div className="text-[10px] font-semibold" style={{ color: teal ? '#2dd4bf' : 'rgba(255,255,255,0.6)' }}>
                  {name}
                </div>
                <div className="text-[9px] font-mono" style={{ color: teal ? 'rgba(45,212,191,0.6)' : 'rgba(255,255,255,0.25)' }}>
                  {id} · {score}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/[0.06]">
        {[['1,284', 'evaluated'], ['3', 'shortlisted'], ['< 4hr', 'RFQ turnaround']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-teal-400">{val}</span>
            <span className="text-[10px] text-white/30">{lbl}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[10px] text-white/25">
          <span className="h-1 w-1 rounded-full bg-teal-400 animate-pulse" />
          matched
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function VendorMatchSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Vendor Match module"
      className="relative bg-white overflow-hidden"
    >
      {/* Ambient — bottom-left */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 10% 80%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Decorative divider ── */}
        <div className="flex items-center gap-4 pt-10 pb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-xs font-mono text-teal-600 shrink-0"
          >
            <Users className="w-3.5 h-3.5" />
            MOD_05 · Vendor Match
          </motion.div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="relative flex flex-col lg:flex-row gap-16 pb-14 group">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="lg:w-5/12 relative z-10">
            <div className="sticky top-28">

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, ease: EASE }}
                className="relative w-16 h-16 rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)', border: '1px solid rgba(20,184,166,0.25)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))' }} />
                <Users className="w-7 h-7 text-teal-600 relative z-10" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 0 6px rgba(20,184,166,0.08)' }} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-3"
              >
                Vendor{' '}
                <AnimatedText
                  text="Match"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  Automated Supplier Shortlisting in Minutes
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
                className="hidden lg:block h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <VendorMatchViz inView={inView} />
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
              className="relative rounded-2xl overflow-hidden border border-black/8 hover:border-teal-200 transition-colors duration-300"
              style={{ background: '#ffffff' }}
            >
              <div className="absolute left-0 inset-y-0 w-1 rounded-l-2xl"
                style={{ background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' }} />
              <div className="pl-7 pr-7 pt-7 pb-7">
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-teal-500" />
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

            {/* Key Features + Built For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
                className="relative rounded-2xl border border-black/8 bg-white p-6 overflow-hidden hover:border-black/15 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-widest mb-4">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {KEY_FEATURES.map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: EASE }}
                      className="inline-flex items-center gap-1.5 text-xs text-black/60 bg-black/[0.03] border border-black/8
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
                className="relative rounded-2xl border border-black/8 bg-white p-6 overflow-hidden hover:border-black/15 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />
                <h3 className="text-xs font-mono text-black/40 uppercase tracking-widest mb-4">Built For</h3>
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
                      <span className="text-sm text-black/60 group-hover/role:text-black/80 transition-colors duration-200">{role}</span>
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
    </section>
  )
}
