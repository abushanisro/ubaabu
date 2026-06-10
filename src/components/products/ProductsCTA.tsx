'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, ArrowUpRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const TRUST = [
  { value: '72K+',  label: 'Verified suppliers'  },
  { value: '98.6%', label: 'OTIF accuracy'        },
  { value: '−18%',  label: 'Avg. cost reduction'  },
  { value: '< 4hr', label: 'RFQ turnaround'       },
]

export default function ProductsCTA() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      aria-label="Products CTA"
      className="relative overflow-hidden bg-black"
    >
      {/* ── Top fade: white → black ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 z-10"
        style={{ background: 'linear-gradient(to bottom, #ffffff, #000000)' }} />

      {/* ── Soft ambient teal blobs ───────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute"
          style={{
            width: '60vw', height: '60vw',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -55%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #2dd4bf 0%, transparent 65%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute"
          style={{
            width: '40vw', height: '40vw',
            bottom: '-15vw', right: '-8vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #2dd4bf 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Expanding pulse rings (centred on content) ────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ paddingTop: '4rem' }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-teal-500/20"
            style={{ width: 120, height: 120 }}
            animate={{ scale: [1, 5], opacity: [0.35, 0] }}
            transition={{
              duration: 5,
              delay: i * 1.25,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
        {/* Static innermost ring for reference */}
        <div className="absolute w-28 h-28 rounded-full border border-teal-500/12" />
      </div>

      {/* ── Teal top-border accent line ───────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.1, ease: 'easeOut' }}
        className="pointer-events-none absolute top-28 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.4) 30%, rgba(45,212,191,0.4) 70%, transparent)' }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-28 pb-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10
                     text-xs font-mono text-teal-400 mb-10 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
          10 Modules · One Connected Platform
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.14, ease: EASE }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.08]"
        >
          Ready to transform your
          <br className="hidden md:block" />
          <motion.span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #2dd4bf, #5eead4, #2dd4bf)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            {' '}supply chain?
          </motion.span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
          className="text-lg text-white/45 mb-12 max-w-xl mx-auto font-light leading-relaxed"
        >
          Join industry leaders using Emithran to drive intelligence, accuracy, and
          efficiency across their entire product lifecycle.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.36, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {/* Primary - white fill */}
          <button className="group relative w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-semibold
                             hover:bg-white/92 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden
                             shadow-[0_0_40px_rgba(255,255,255,0.07)] hover:shadow-[0_0_60px_rgba(255,255,255,0.18)]">
            <span className="pointer-events-none absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent
                             transition-transform duration-500 group-hover:translate-x-[250%]" />
            <span className="relative z-10">Get Started</span>
            <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Secondary - ghost */}
          <button className="group w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/15 bg-white/[0.04]
                             text-white font-medium hover:bg-white/[0.09] hover:border-white/30
                             transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm
                             hover:shadow-[0_0_24px_rgba(45,212,191,0.08)]">
            Contact Sales
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-white/[0.07] pt-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.56 + i * 0.09 }}
              >
                <div
                  className="text-2xl md:text-3xl font-semibold tracking-tight leading-none"
                  style={{ color: i % 2 === 0 ? '#2dd4bf' : '#ffffff' }}
                >
                  {value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/28">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Bottom rule ───────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
    </section>
  )
}
