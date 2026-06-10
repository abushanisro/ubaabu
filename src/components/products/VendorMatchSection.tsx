'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, ScanSearch, ListOrdered, FileSearch, MousePointerClick } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import { SectionDivider } from '@/components/products/SectionDivider'

const EASE = [0.16, 1, 0.3, 1] as const

const CAPABILITIES = [
  { icon: ScanSearch,       text: 'Evaluates 1,000+ suppliers across fit criteria'  },
  { icon: ListOrdered,      text: 'Returns ranked shortlist with matching analysis'  },
  { icon: FileSearch,       text: 'Shows transparent selection rationale'            },
  { icon: MousePointerClick,text: 'Enables one-click RFQ initiation'                },
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
  const containerRef  = useRef<HTMLDivElement>(null)
  const svgParentRef  = useRef<HTMLDivElement>(null)
  const hubRef        = useRef<HTMLDivElement>(null)
  const leftRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const rightRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const [leftY,  setLeftY]  = useState([70, 128, 186])
  const [rightY, setRightY] = useState([70, 128, 186])
  const [hubX, setHubX] = useState({ left: 80, right: 120, svgWidth: 200 })

  useEffect(() => {
    const container = containerRef.current
    const svgParent = svgParentRef.current
    const hub       = hubRef.current
    if (!container || !svgParent || !hub) return

    const { top: cTop }              = container.getBoundingClientRect()
    const { left: svgLeft, width: svgW } = svgParent.getBoundingClientRect()
    const hubRect                    = hub.getBoundingClientRect()

    setHubX({
      left:     hubRect.left  - svgLeft,
      right:    hubRect.right - svgLeft,
      svgWidth: svgW,
    })

    const measure = (refs: (HTMLDivElement | null)[]) =>
      refs.map(el => {
        if (!el) return 128
        const r = el.getBoundingClientRect()
        return r.top + r.height / 2 - cTop
      })
    setLeftY(measure(leftRefs.current))
    setRightY(measure(rightRefs.current))
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f0fdf9 100%)', border: '1px solid rgba(20,184,166,0.18)', boxShadow: '0 0 20px rgba(45,212,191,0.12),0 0 60px rgba(45,212,191,0.06),0 24px 64px rgba(0,0,0,0.06)' }}>

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(13,148,136,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,0.07) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Teal radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle 120px at 50% 56%,rgba(45,212,191,0.10) 0%,transparent 100%)' }} />

      {/* Chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#d9f2ee' }}>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-300/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
        </div>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#94a3b8' }}>VENDOR MATCH · AI SHORTLISTING</span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#2dd4bf' }} />
          <span className="text-[10px] font-mono" style={{ color: '#0d9488' }}>AI</span>
        </div>
      </div>

      {/* Matching scene */}
      <div ref={containerRef} className="relative flex items-center justify-between px-8" style={{ height: 256 }}>

        {/* Left: Requirements */}
        <div className="flex flex-col gap-4 z-10">
          {INPUTS.map(({ id, label }, i) => (
            <motion.div
              key={id}
              ref={(el) => { leftRefs.current[i] = el }}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 border"
              style={{ background: '#ffffff', borderColor: '#d9f2ee' }}
            >
              <span className="text-[9px] font-mono" style={{ color: '#0d9488' }}>{id}</span>
              <span className="text-[10px]" style={{ color: '#0f1b2d' }}>{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Center connectors + hub (SVG) */}
        <div ref={svgParentRef} className="relative flex-1 h-full flex items-center justify-center">
          {(() => {
            const { left: hL, right: hR, svgWidth: sW } = hubX
            const lcx = hL / 2
            const rcx = (hR + sW) / 2
            return (
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                {/* Left → Hub paths */}
                <motion.path d={`M 0 ${leftY[0]} C ${lcx} ${leftY[0]}, ${lcx} 128, ${hL} 128`}
                  fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="1.5" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }} />
                <motion.path d={`M 0 ${leftY[1]} C ${lcx} ${leftY[1]}, ${lcx} 128, ${hL} 128`}
                  fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="1.5" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }} />
                <motion.path d={`M 0 ${leftY[2]} C ${lcx} ${leftY[2]}, ${lcx} 128, ${hL} 128`}
                  fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="1.5" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }} />
                {/* Hub → Right paths */}
                <motion.path d={`M ${hR} 128 C ${rcx} 128, ${rcx} ${rightY[0]}, ${sW} ${rightY[0]}`}
                  fill="none" stroke="rgba(20,184,166,0.35)" strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }} />
                <motion.path d={`M ${hR} 128 C ${rcx} 128, ${rcx} ${rightY[1]}, ${sW} ${rightY[1]}`}
                  fill="none" stroke="rgba(20,184,166,0.55)" strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }} />
                <motion.path d={`M ${hR} 128 C ${rcx} 128, ${rcx} ${rightY[2]}, ${sW} ${rightY[2]}`}
                  fill="none" stroke="rgba(20,184,166,0.25)" strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }} />
              </svg>
            )
          })()}

          {/* AI Hub */}
          <motion.div
            ref={hubRef}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
            className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#f0fdf9 0%,#ccfbf1 100%)', border: '1px solid rgba(20,184,166,0.45)', boxShadow: '0 0 28px rgba(45,212,191,0.20)' }}
          >
            <Users className="w-6 h-6" style={{ color: '#0d9488' }} />
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
              ref={(el) => { rightRefs.current[i] = el }}
              initial={{ opacity: 0, x: 14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.85 + i * 0.1, ease: EASE }}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 border"
              style={teal
                ? { background: 'rgba(45,212,191,0.08)', borderColor: 'rgba(20,184,166,0.45)' }
                : { background: '#ffffff', borderColor: '#d9f2ee' }
              }
            >
              <span className="text-[9px] font-bold w-3" style={{ color: teal ? '#0d9488' : '#94a3b8' }}>
                #{rank}
              </span>
              <div>
                <div className="text-[10px] font-semibold" style={{ color: teal ? '#0d9488' : '#0f1b2d' }}>
                  {name}
                </div>
                <div className="text-[9px] font-mono" style={{ color: teal ? '#2dd4bf' : '#94a3b8' }}>
                  {id} · {score}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2 border-t" style={{ borderColor: '#d9f2ee', background: '#f0fdf9' }}>
        {[['1,284', 'evaluated'], ['3', 'shortlisted'], ['< 4hr', 'RFQ turnaround']].map(([val, lbl]) => (
          <div key={lbl} className="flex items-baseline gap-1">
            <span className="text-xs font-bold" style={{ color: '#0d9488' }}>{val}</span>
            <span className="text-[10px]" style={{ color: '#94a3b8' }}>{lbl}</span>
          </div>
        ))}
        <div className="ml-auto">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
            style={{ background: 'rgba(45,212,191,0.12)', color: '#0d9488' }}>
            matched
          </span>
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
      {/* Ambient - bottom-left */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 10% 80%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

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
                  <rect x="4" y="6" width="12" height="6" rx="2" fill="#0d9488" />
                  <rect x="4" y="17" width="12" height="6" rx="2" fill="#0d9488" opacity="0.55" />
                  <rect x="4" y="28" width="12" height="6" rx="2" fill="#0d9488" opacity="0.3" />
                  <rect x="24" y="6" width="12" height="6" rx="2" fill="#0f1b2d" opacity="0.6" />
                  <rect x="24" y="17" width="12" height="6" rx="2" fill="#2dd4bf" />
                  <rect x="24" y="28" width="12" height="6" rx="2" fill="#0f1b2d" opacity="0.6" />
                  <rect x="16" y="19" width="8" height="2" rx="1" fill="#2dd4bf" />
                </svg>
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
                className="block h-[260px] lg:h-[340px] w-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)' }}
              >
                <VendorMatchViz inView={inView} />
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
