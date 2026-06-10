'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const PARA1 = `Emithran wasn't born in a boardroom. It was built on the shop floor. Our founders spent years working as costing and manufacturing engineers across industries where precision, quality, and delivery are non-negotiable. From aerospace components and CNC machining to injection molding and sheet metal fabrication, we experienced firsthand the challenges that manufacturers face every day. We saw talented teams spending countless hours generating quotes, navigating supplier uncertainties, and managing disconnected communication between customers, engineers, and production teams. Critical cost decisions were often made too late, supplier selection relied on incomplete information, and visibility across the manufacturing lifecycle remained fragmented. The deeper we looked, the clearer the problem became. Manufacturers lacked real-time insight into the cost impact of design decisions. OEMs struggled to identify suppliers based on actual performance, capacity, and reliability rather than static capability lists. Customers and production teams operated without a single source of truth connecting design, sourcing, production, and delivery.`

const PARA2 = `We knew there had to be a better way. That's why we built Emithran. Emithran is not just another manufacturing dashboard or reporting tool. It is an intelligent digital layer that connects every stage of the manufacturing ecosystem - from design and cost estimation to supplier matching, production execution, and delivery tracking. Our mission is simple: help manufacturers make faster, smarter decisions, reduce uncertainty, and create complete visibility across the manufacturing value chain. Because great products deserve a manufacturing process that is just as intelligent as the engineering behind them.`

export default function AboutMission() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">

      {/* Decorative left triangle */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[clamp(48px,6vw,96px)]"
        style={{
          background: 'linear-gradient(to bottom right, #0d9e8a 0%, transparent 100%)',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          opacity: 0.12,
        }}
      />

      {/* Decorative right triangle */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-full w-[clamp(48px,6vw,96px)]"
        style={{
          background: 'linear-gradient(to top left, #0d9e8a 0%, transparent 100%)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          opacity: 0.12,
        }}
      />

      {/* Subtle teal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(13,158,138,0.05) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20 lg:items-start">

          {/* ── Left: heading ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* Teal accent bar */}
              <div
                className="mb-6 h-1 w-12 rounded-full"
                style={{ background: '#0d9e8a' }}
              />
              <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-tight tracking-tight text-[#080808]">
                "Our Mission Is to Simplify Manufacturing"
              </h2>
            </motion.div>
          </div>

          {/* ── Right: body text + signature ── */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
            >
              {/* Opening quote mark - negative margin pulls it flush to the paragraph */}
              <span
                aria-hidden
                className="block font-display text-[5rem] leading-none"
                style={{ color: '#0d9e8a', lineHeight: 1, marginBottom: '-1.6rem' }}
              >
                &ldquo;
              </span>

              <div className="space-y-5 text-[0.97rem] leading-relaxed text-black/65">
                <p>{PARA1}</p>
                <p>{PARA2}</p>
              </div>

              {/* Closing quote mark - negative margin pulls it flush to the paragraph */}
              <span
                aria-hidden
                className="block text-right font-display text-[5rem] leading-none"
                style={{ color: '#0d9e8a', lineHeight: 1, marginTop: '-1.4rem' }}
              >
                &rdquo;
              </span>

              {/* Signature - right-aligned, larger */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                className="mt-5 flex items-center justify-end border-t border-black/8 pt-5"
              >
                <img
                  src="/assets/cocosign.png"
                  alt="Founder signature"
                  className="h-24 w-auto object-contain opacity-100"
                  style={{ transform: 'rotate(-6deg)', filter: 'contrast(1.2)' }}
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
