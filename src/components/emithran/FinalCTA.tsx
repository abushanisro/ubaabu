'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

export default function FinalCTA() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [demoHov, setDemoHov] = useState(false)
  const [caseHov, setCaseHov] = useState(false)

  return (
    <section
      style={{
        minHeight: '100vh',
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
          opacity: 0.05,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <span
          className="font-bold tracking-tighter whitespace-nowrap"
          style={{
            fontSize: '30vw',
            color: '#ffffff',
            lineHeight: 1,
            fontFamily: 'var(--font-sora), Sora, ui-sans-serif, sans-serif',
          }}
        >
          EMITHRAN
        </span>
      </div>

      {/* Content */}
      <div
        className="max-w-5xl mx-auto px-6 md:px-24 text-center"
        style={{ position: 'relative', zIndex: 10, width: '100%' }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2
            className="font-bold tracking-tighter uppercase"
            style={{
              fontFamily: 'var(--font-sora), Sora, ui-sans-serif, sans-serif',
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              lineHeight: 0.92,
              color: '#ffffff',
              marginBottom: '3rem',
            }}
          >
            Build Faster.
            <br />
            Source{' '}
            <span style={{ color: T }}>Smarter.</span>
          </h2>

          <div
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: '1.5rem', marginTop: '4rem' }}
          >
            {/* Primary CTA */}
            <a
              href="#demo"
              onMouseEnter={() => setDemoHov(true)}
              onMouseLeave={() => setDemoHov(false)}
              className="group inline-flex items-center justify-center font-display font-medium"
              style={{
                height: '4rem',
                padding: '0 2.5rem',
                fontSize: '1.15rem',
                background: demoHov ? '#ffffff' : T,
                color: demoHov ? '#080808' : '#ffffff',
                textDecoration: 'none',
                gap: '1rem',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              Request a Demo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transition: 'transform 0.2s ease',
                  transform: demoHov ? 'translateX(6px)' : 'translateX(0)',
                }}
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <a
              href="#case-study"
              onMouseEnter={() => setCaseHov(true)}
              onMouseLeave={() => setCaseHov(false)}
              className="inline-flex items-center justify-center font-display font-medium"
              style={{
                height: '4rem',
                padding: '0 2.5rem',
                fontSize: '1.15rem',
                border: '1px solid #ffffff',
                background: caseHov ? '#ffffff' : 'transparent',
                color: caseHov ? '#080808' : '#ffffff',
                textDecoration: 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              Watch Case Study
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
