'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

const TurbineModel = dynamic(() => import('@/components/three/TurbineModel'), {
  ssr: false,
  loading: () => null,
})

const stages = [
  {
    num: '01',
    label: 'CAD TO COST',
    headline: 'From Drawing\nto Cost\nin Minutes.',
    body: 'Connect CAD files, drawings, and BOM structures directly to cost models. Understand cost at part, assembly, and supplier level - before production begins.',
    bullets: ['Estimate cost earlier in development', 'Identify cost drivers before sourcing', 'Reduce manual calculation effort'],
    bg: 'dark',
    turbineStage: 0,
  },
  {
    num: '02',
    label: 'SHOULD COST',
    headline: 'Know What\nIt Should Cost\nBefore You Ask.',
    body: 'Calculate should-cost using raw material, machine hours, tooling, scrap, and logistics. A traceable baseline for every supplier negotiation.',
    bullets: ['Eliminate manual Excel costing', 'Compare target vs should-cost instantly', 'Find cost gaps before negotiation'],
    bg: 'dark',
    turbineStage: 1,
  },
  {
    num: '03',
    label: 'SUPPLIER INTELLIGENCE',
    headline: 'Every Component.\nEvery Supplier.\nLabelled.',
    body: 'Evaluate suppliers on cost, capability, feasibility, and delivery. Compare quotes against your should-cost model. Nominate with confidence, not gut feel.',
    bullets: ['Shortlist capable suppliers faster', 'Compare quotes against cost models', 'Build reliable vendor intelligence'],
    bg: 'light',
    turbineStage: 2,
  },
  {
    num: '04',
    label: 'PRODUCTION & QUALITY',
    headline: 'Track Every\nLot. Every\nCheckpoint.',
    body: 'Manage production lots, PPAP workflows, quality checkpoints, inspections, and delivery tracking - all from the same manufacturing record.',
    bullets: ['Track production progress live', 'Connect quality data with supplier records', 'Reduce handoff gaps between teams'],
    bg: 'light',
    turbineStage: 3,
  },
  {
    num: '05',
    label: 'DELIVERY',
    headline: 'From First BOM\nto Final\nShipment.',
    body: 'One continuous manufacturing record from design release to delivery. Full traceability, one platform, zero gaps.',
    bullets: ['Monitor delivery readiness', 'Full traceability BOM to shipment', 'Reduce programme delay risk'],
    bg: 'dark',
    turbineStage: 4,
  },
]

export default function ScrollExperience() {
  const [active, setActive] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef(null)
  const touchStartY = useRef(0)
  const lastWheelTime = useRef(0)

  const goTo = useCallback((index) => {
    if (isAnimating) return
    const next = Math.max(0, Math.min(stages.length - 1, index))
    if (next === active) return
    setIsAnimating(true)
    setActive(next)
    setTimeout(() => setIsAnimating(false), 800)
  }, [active, isAnimating])

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now()
      if (now - lastWheelTime.current < 900) return
      lastWheelTime.current = now

      // Only capture scroll when container is in view
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.top > 0 || rect.bottom < 0) return

      // Check if we're within the snap section
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        e.preventDefault()
        if (e.deltaY > 0) goTo(active + 1)
        else goTo(active - 1)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') goTo(active + 1)
      if (e.key === 'ArrowUp') goTo(active - 1)
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(active + 1)
        else goTo(active - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [active, goTo])

  const current = stages[active]
  const isDark = current.bg === 'dark'

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '100vh',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: isDark ? '#080808' : '#e8e4dc',
        transition: 'background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Stage number - giant background */}
      <div
        aria-hidden
        className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none z-0"
        style={{
          fontSize: 'clamp(180px, 28vw, 400px)',
          color: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.04)',
          transition: 'color 0.9s ease',
        }}
      >
        {current.num}
      </div>

      {/* -- LEFT - text -- */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-end pb-16 lg:pb-20 px-6 lg:px-16 z-10"
        style={{ width: '42%' }}
      >
        {/* Label */}
        <div
          key={`label-${active}`}
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5"
          style={{
            color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)',
            animation: 'fadeSlideUp 0.6s ease forwards',
          }}
        >
          {current.label}
        </div>

        {/* Headline */}
        <h2
          key={`headline-${active}`}
          className="font-display leading-none mb-7"
          style={{
            fontSize: 'clamp(36px, 4.5vw, 68px)',
            color: isDark ? '#ffffff' : '#111111',
            whiteSpace: 'pre-line',
            animation: 'fadeSlideUp 0.65s 0.05s ease forwards',
            opacity: 0,
          }}
        >
          {current.headline}
        </h2>

        {/* Body */}
        <p
          key={`body-${active}`}
          className="font-mono text-[13px] leading-relaxed max-w-xs mb-7"
          style={{
            color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.55)',
            animation: 'fadeSlideUp 0.65s 0.1s ease forwards',
            opacity: 0,
          }}
        >
          {current.body}
        </p>

        {/* Bullets */}
        <ul className="flex flex-col gap-2.5">
          {current.bullets.map((b, i) => (
            <li
              key={`${active}-${i}`}
              className="font-mono text-[12px] flex items-start gap-2.5"
              style={{
                color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)',
                animation: `fadeSlideUp 0.6s ${0.15 + i * 0.07}s ease forwards`,
                opacity: 0,
              }}
            >
              <span style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)' }}>-</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* -- RIGHT - 3D turbine, takes 60% of width -- */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10"
        style={{
          width: '62%',
          height: '100%',
          borderLeft: `1px solid ${isDark ? '#1a1a1a' : '#ccc8c0'}`,
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <TurbineModel stage={current.turbineStage} bgLight={!isDark} />
        </div>
      </div>

      {/* -- BOTTOM RIGHT - stage indicator -- */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        {stages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-500"
            style={{
              height: '1px',
              width: i === active ? 32 : 12,
              backgroundColor: isDark
                ? `rgba(255,255,255,${i === active ? 0.7 : 0.2})`
                : `rgba(0,0,0,${i === active ? 0.5 : 0.15})`,
              cursor: 'pointer',
              border: 'none',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* -- BOTTOM LEFT - stage count -- */}
      <div
        className="absolute bottom-8 left-6 lg:left-16 z-20 font-mono text-[10px] tracking-widest"
        style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)' }}
      >
        {String(active + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
      </div>

    </section>
  )
}
