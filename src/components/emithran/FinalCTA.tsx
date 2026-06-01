'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

export default function FinalCTA() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        minHeight: '80vh',
        background: '#080808',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.04,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <span
          className="font-bold tracking-tighter whitespace-nowrap"
          style={{
            fontSize: '28vw',
            color: '#ffffff',
            lineHeight: 1,
            fontFamily: 'var(--font-sora), Sora, ui-sans-serif, sans-serif',
          }}
        >
          EMITHRAN
        </span>
      </div>

      {/* Subtle teal glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(45,212,191,0.06) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div
        className="max-w-[1280px] mx-auto px-6 text-center"
        style={{ position: 'relative', zIndex: 10, width: '100%' }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="chip inline-block mb-8">Ready to start?</span>

          <h2
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}
          >
            Build Faster.
            <br />
            Source{' '}
            <span style={{ color: T }}>Smarter.</span>
          </h2>

          <p
            className="mx-auto mb-12"
            style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '32rem', lineHeight: 1.7 }}
          >
            Join the teams already running on Emithran&rsquo;s manufacturing intelligence platform.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-85"
              style={{
                background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))',
                textDecoration: 'none',
              }}
            >
              Request a Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <a
              href="#case-study"
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/[0.06] transition-colors"
              style={{ textDecoration: 'none' }}
            >
              Watch Case Study
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
