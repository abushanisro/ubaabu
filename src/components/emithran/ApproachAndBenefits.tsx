'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

const PILLARS = [
  {
    roman: 'I',
    title: 'Live Cost Intelligence',
    body:  'Real-time should-cost models powered by 72,000+ supplier data points across 80+ Indian manufacturing regions. Know what a part should cost before you send an RFQ. Baseline negotiations with data, not hope.',
  },
  {
    roman: 'II',
    title: 'Design-to-Supply Integration',
    body:  'DFM feedback while designs are still fluid. Supplier capability mapping built directly into CAD workflows. See manufacturability issues and cost optimization opportunities in days, not weeks.',
  },
  {
    roman: 'III',
    title: 'Supplier Ecosystem Intelligence',
    body:  'Continuous evaluation of 1,000+ suppliers across quality, capacity, delivery, and capability metrics. Real-time supplier shortlist matching for every part.',
  },
] as const

// ── Pillar card ───────────────────────────────────────────────────────────────

function PillarCard({ item, index }: { item: (typeof PILLARS)[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="relative group rounded-2xl border border-black/8 bg-white p-8 shadow-sm"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Background roman numeral */}
      <div
        className="absolute -top-6 -left-2 font-display font-bold pointer-events-none select-none leading-none transition-colors duration-500"
        style={{
          fontSize: '5rem',
          color: hov ? `rgba(13,158,138,0.08)` : 'rgba(0,0,0,0.04)',
        }}
      >
        {item.roman}
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-2xl mb-5 relative z-10 transition-colors duration-300"
        style={{ color: hov ? T : '#0d1117', letterSpacing: '-0.02em' }}
      >
        {item.title}
      </h3>

      {/* Body */}
      <p
        className="relative z-10 leading-relaxed"
        style={{ fontSize: '15px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.75 }}
      >
        {item.body}
      </p>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function ApproachAndBenefits() {
  const headerRef    = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const ctaRef       = useRef<HTMLDivElement>(null)
  const ctaInView    = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <section
      className="bg-white"
      style={{
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="chip-light inline-block mb-6"
            >
              Our Approach
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE }}
              className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900"
            >
              Intelligence at every{' '}
              <AnimatedText
                text="decision."
                textClassName="text-gray-900 font-bold"
                underlineColor="oklch(0.68 0.13 180)"
                underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                underlineDuration={1.8}
              />{' '}
              <span className="font-normal text-gray-400">
                A unified architecture replacing fragmented manual processes.
              </span>
            </motion.p>
          </div>
        </div>

        {/* ── Three pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 pt-4">
          {PILLARS.map((item, i) => (
            <PillarCard key={item.roman} item={item} index={i} />
          ))}
        </div>

      </div>

      {/* ── Impact / CTA block ── */}
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col md:flex-row items-center justify-between gap-12 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))',
            color: '#ffffff',
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem)',
          }}
        >
          <p
            className="font-display font-medium leading-tight tracking-tight"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
              maxWidth: '52rem',
              color: '#ffffff',
            }}
          >
            &ldquo;Teams using Emithran cut RFQ cycles by 40%, improve BOM accuracy to 99.4%, and identify &#8377;1.2Cr+ in annual savings.&rdquo;
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96" height="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 opacity-25"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
