'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Study {
  id: string
  label: string
  metric: string
  image: string
  headline: string
  sub: string
  href: string
}

const studies: Study[] = [
  {
    id: 'f1-exhaust',
    label: 'High-Performance Automotive',
    metric: '£1.3m annual saving',
    image: '/assets/casestudy/f1card.png',
    headline: 'Should Costing for Exhaust System',
    sub: 'Titanium vs Stainless Steel · 300 pcs · UK volume',
    href: '/case-studies/exhaust-system',
  },
  {
    id: 'hgv-chassis',
    label: 'Electric HGV OEM',
    metric: '38% rail cost reduction',
    image: '/assets/casestudy/truck.png',
    headline: 'Assy Chassis Ladder Frame — HGV 4×2 4M',
    sub: 'India vs Northern Europe · €5,248 assembly cost',
    href: '/case-studies/hgv-chassis',
  },
  {
    id: 'dc-dc-converter',
    label: 'Electric Two-Wheeler OEM',
    metric: '−39% body cost negotiated',
    image: '/assets/casestudy/case3.png',
    headline: 'DC-DC Converter Teardown & VAVE',
    sub: '13 VAVE ideas · ₹831 should cost · India sourcing',
    href: '/case-studies/dc-dc-converter',
  },
  {
    id: 'electronics-teardown',
    label: 'Electronics OEM',
    metric: 'PCB savings: $19.89 → $8.07',
    image: '/assets/casestudy/case4.png',
    headline: 'PCB Teardown, Should Costing & VAVE',
    sub: 'Radar sensor · EV BTMS · Wire harness · India & China',
    href: '/case-studies/electronics-teardown',
  },
  {
    id: 'hgv-cab-strategy',
    label: 'Hydrogen HGV OEM',
    metric: '6 solutions · £0.85m–£10.6m',
    image: '/assets/casestudy/case5.png',
    headline: 'HGV CAB Structure Strategy',
    sub: 'Hydrogen vehicle · 191 kg composite · 4,034 units ramp',
    href: '/case-studies/hgv-cab-strategy',
  },
  {
    id: 'chassis-india-belgium',
    label: 'Hydrogen HGV — Rail Sourcing',
    metric: '38% India vs Belgium saving',
    image: '/assets/casestudy/case6.png',
    headline: 'Chassis Rail Should Cost — India vs Belgium',
    sub: 'DDP Chennai → Scotland · €538 vs €872 landed',
    href: '/case-studies/chassis-india-belgium',
  },
  {
    id: 'rear-view-mirror',
    label: 'Automotive OEM',
    metric: '₹80.25 full BOM should cost',
    image: '/assets/casestudy/case7.png',
    headline: 'Rear View Mirror Assembly — Full BOM Should Cost',
    sub: '5 parts · 5 processes · 1,50,000 units/yr · India',
    href: '/case-studies/rear-view-mirror',
  },
  {
    id: 'rear-axle-should-cost',
    label: 'LCV Drivetrain OEM',
    metric: '₹20,526 per axle · 46% in Drive Head',
    image: '/assets/casestudy/case8.png',
    headline: '2T LCV Rear Drive Axle — Should Cost Analysis',
    sub: '51.2 kg assembly · 40,000 units/yr · India manufacturing',
    href: '/case-studies/rear-axle-should-cost',
  },
]

export default function CaseStudies() {
  // orderMap[i] = visual position (CSS order) of studies[i]. 0 = leftmost / expanded.
  const [orderMap, setOrderMap] = useState<number[]>(studies.map((_, i) => i))

  const bringToFront = (studyIdx: number) => {
    const currentPos = orderMap[studyIdx]
    if (currentPos === 0) return
    setOrderMap(prev =>
      prev.map((pos, i) => {
        if (i === studyIdx) return 0
        if (pos < currentPos) return pos + 1
        return pos
      })
    )
  }

  return (
    <section className="bg-white py-16 md:py-20 border-t border-black/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#0d9e8a' }}>
            Case Studies
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0d1117] leading-tight">
            Real savings. Real manufacturers.
          </h2>
          <p className="mt-2 text-[15px] text-[#64748b] max-w-lg">
            See how engineering and procurement teams use Emithran to cut cost and compress cycle time.
          </p>
        </div>

        {/* ── Image accordion — desktop ── */}
        <div
          className="hidden md:flex gap-2 rounded-2xl overflow-hidden"
          style={{ height: 400 }}
        >
          {studies.map((s, i) => {
            const isExpanded = orderMap[i] === 0
            const sharedStyle = {
              order: orderMap[i],
              flex: isExpanded ? '5 1 0%' : '1 1 0%',
              minWidth: 52,
              transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1)',
            }
            const sharedClass = 'relative overflow-hidden rounded-xl cursor-pointer'
            const handlers = {
              onMouseEnter: () => bringToFront(i),
              onClick: () => bringToFront(i),
            }
            const inner = (
              <>
                <img
                  src={s.image}
                  alt={s.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                    transform: isExpanded ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)' }} />

                {/* Expanded content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-6"
                  style={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.3s ease 0.05s' }}
                >
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase drop-shadow-sm"
                      style={{ color: '#2dd4bf', letterSpacing: '0.18em', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div>
                    {s.headline && <p className="mb-2 text-[15px] font-bold leading-snug text-white">{s.headline}</p>}
                    {s.sub && <p className="mb-3 text-[11px] text-white/55">{s.sub}</p>}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                        {s.metric}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur-sm"
                        style={{ background: 'rgba(45,212,191,0.15)', color: '#2dd4bf', borderColor: 'rgba(45,212,191,0.35)' }}
                      >
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collapsed vertical label */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: isExpanded ? 0 : 1, transition: 'opacity 0.2s ease' }}
                >
                  <span
                    className="text-[10px] font-bold uppercase select-none"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      color: '#2dd4bf',
                      textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                      letterSpacing: '0.18em',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </>
            )

            return isExpanded ? (
              <Link key={s.id} href={s.href} className={sharedClass} style={sharedStyle} {...handlers}>
                {inner}
              </Link>
            ) : (
              <div key={s.id} className={sharedClass} style={sharedStyle} {...handlers}>
                {inner}
              </div>
            )
          })}
        </div>

        {/* ── Mobile horizontal scroll ── */}
        <ul
          role="list"
          className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-6 px-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {studies.map((s) => (
            <li key={s.id} style={{ scrollSnapAlign: 'start' }}>
              <Link
                href={s.href}
                className="relative block shrink-0 w-[75vw] max-w-[300px] rounded-2xl overflow-hidden"
                style={{ height: 220 }}
              >
                <img src={s.image} alt={s.label} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <span
                    className="text-[10px] font-bold uppercase"
                    style={{ color: '#2dd4bf', letterSpacing: '0.15em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                  >
                    {s.label}
                  </span>
                  <div>
                    <p className="mb-1.5 text-[13px] font-bold leading-snug text-white">{s.headline}</p>
                    <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-white/15 text-white border border-white/20">
                      {s.metric}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
