'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const EASE = [0.16, 1, 0.3, 1] as const

export default function ProductsHero() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      aria-label="Products Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* ── Soft teal glow at top ──────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: '70%',
          background:
            'radial-gradient(ellipse 72% 52% at 50% -6%, rgba(20,184,166,0.08) 0%, transparent 100%)',
        }}
      />

      {/* ── Fine dot grid ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-20 pb-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/[0.06] text-xs font-mono text-black/55 mb-8 cursor-pointer hover:bg-black/[0.09] transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
          </span>
          Emithran OS v2.0 Architecture
        </motion.div>

        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.15, ease: EASE }}
          className="text-xl md:text-2xl lg:text-[2.6rem] font-bold leading-[1.25] tracking-tight text-gray-900 max-w-3xl mx-auto mb-12"
        >
          Product modules,{' '}
          <AnimatedText
            text="designed to work together."
            textClassName="text-gray-900 font-bold"
            underlineColor="oklch(0.68 0.13 180)"
            underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
            underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
            underlineDuration={1.8}
          />{' '}
          <span className="font-normal text-gray-400">
            Start with one, scale to your full value chain. Every module connects to every
            other, creating a seamless flow of intelligence across your enterprise.
          </span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.48, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto h-12 px-6 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_1px_3px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_24px_rgba(13,148,136,0.35)]" style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}>
            Request Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto h-12 px-6 rounded-lg bg-white border border-black/15 text-[#0d1117] font-medium hover:bg-black/[0.04] transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm">
            <Play className="w-4 h-4" />
            Watch Overview
          </button>
        </motion.div>

      </div>
    </section>
  )
}
