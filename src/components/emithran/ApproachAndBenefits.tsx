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
      {/* Background roman numeral — increased opacity */}
      <div
        className="absolute -top-6 -left-2 font-display font-bold pointer-events-none select-none leading-none transition-colors duration-500"
        style={{
          fontSize: '5rem',
          color: hov ? `rgba(13,158,138,0.32)` : 'rgba(13,158,138,0.18)',
        }}
      >
        {index + 1}
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
        paddingTop:    'clamp(2rem, 3.5vw, 3rem)',
        paddingBottom: 'clamp(2rem, 3.5vw, 3rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
        >
          <div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pt-2">
          {PILLARS.map((item, i) => (
            <PillarCard key={item.roman} item={item} index={i} />
          ))}
        </div>

      </div>

      {/* ── Single testimonial card with all 3 inside ── */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 24 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-[1280px] mx-auto px-6"
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f1b2d 0%, #0a2a26 55%, #0f1b2d 100%)' }}
        >
          {/* Teal radial glow — stronger, centred */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,212,191,0.22), transparent 65%)' }}
          />
          {/* Bottom teal wash */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(45,212,191,0.08), transparent 70%)' }}
          />

          {/* Inner grid */}
          <div
            className="relative z-10 grid grid-cols-1 md:grid-cols-3"
            style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {[
              {
                quote: '"We cut our RFQ cycle from 40 hours to 8. Emithran\'s should-cost engine changed how we negotiate."',
                role: 'Head of Procurement',
                company: 'Aerospace OEM',
                metric: '80% time saved',
              },
              {
                quote: '"DFM feedback inside our CAD workflow means we catch issues before they become expensive late-stage revisions."',
                role: 'Design Lead',
                company: 'Tier-1 Manufacturer',
                metric: '40% faster cycles',
              },
              {
                quote: '"For the first time I have live visibility into supplier capacity. No more fire-fighting at deadlines."',
                role: 'VP Operations',
                company: 'Deep-Tech Startup',
                metric: '99.4% accuracy',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="flex flex-col"
                style={{
                  padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                  borderLeft: i > 0 ? '1px solid rgba(45,212,191,0.12)' : 'none',
                  borderTop: '0',
                }}
              >
                {/* Quote mark */}
                <svg aria-hidden className="mb-4 shrink-0" width="28" height="20" viewBox="0 0 32 24" fill="none" style={{ opacity: 0.5 }}>
                  <path d="M0 24V14.4C0 6.4 4.267 1.6 12.8 0l1.6 2.4C10.133 3.6 8 6.533 8 10.4H13.6V24H0ZM18.4 24V14.4C18.4 6.4 22.667 1.6 31.2 0l1.6 2.4C28.533 3.6 26.4 6.533 26.4 10.4H32V24H18.4Z" fill="#2dd4bf"/>
                </svg>

                {/* Quote */}
                <p
                  className="font-display font-medium leading-relaxed flex-1"
                  style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75 }}
                >
                  {t.quote}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{t.role}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'rgba(45,212,191,0.5)' }}>{t.company}</p>
                  </div>
                  <span
                    className="shrink-0 text-[11px] font-bold"
                    style={{ color: '#2dd4bf' }}
                  >
                    {t.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
