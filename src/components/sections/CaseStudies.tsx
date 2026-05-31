'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Study {
  id: string
  label: string
  logo?: string
  metric: string
  image: string
  headline?: string
  sub?: string
  href?: string
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
    image: '/assets/casestudy/truck.png',
    headline: 'Chassis Rail Should Cost — India vs Belgium',
    sub: 'DDP Chennai → Scotland · €538 vs €872 landed',
    href: '/case-studies/chassis-india-belgium',
  },
  {
    id: 'rear-view-mirror',
    label: 'Automotive OEM',
    metric: '₹80.25 full BOM should cost',
    image: '/assets/casestudy/case3.png',
    headline: 'Rear View Mirror Assembly — Full BOM Should Cost',
    sub: '5 parts · 5 processes · 1,50,000 units/yr · India',
    href: '/case-studies/rear-view-mirror',
  },
  {
    id: 'rear-axle-should-cost',
    label: 'LCV Drivetrain OEM',
    metric: '₹20,526 per axle · 46% in Drive Head',
    image: '/assets/casestudy/truck.png',
    headline: '2T LCV Rear Drive Axle — Should Cost Analysis',
    sub: '51.2 kg assembly · 40,000 units/yr · India manufacturing',
    href: '/case-studies/rear-axle-should-cost',
  },
]

export default function CaseStudies() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-white py-16 md:py-20 border-t border-black/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0d1117]">Case Studies</h2>
          <p className="mt-1 text-[15px] text-[#64748b]">See how manufacturers use Emithran to cut cost and compress cycle time.</p>
        </div>

        {/* ── Image accordion — desktop ── */}
        <div
          className="hidden md:flex gap-2 rounded-2xl overflow-hidden"
          style={{ height: 400 }}
          onMouseLeave={() => setActive(0)}
        >
          {studies.map((s, i) => {
            const Wrapper = s.href && active === i ? Link : 'div'
            return (
            <Wrapper
              key={s.id}
              {...(s.href && active === i ? { href: s.href } : {})}
              className="relative overflow-hidden rounded-xl cursor-pointer"
              style={{
                flex: active === i ? '5 1 0%' : '1 1 0%',
                minWidth: 52,
                transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseEnter={() => setActive(i)}
            >
              {/* background image */}
              <img
                src={s.image}
                alt={s.label}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                  transform: active === i ? 'scale(1.04)' : 'scale(1)',
                }}
              />

              {/* dark scrim — heavier at bottom */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)' }} />

              {/* expanded content */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-6"
                style={{ opacity: active === i ? 1 : 0, transition: 'opacity 0.3s ease 0.05s' }}
              >
                {/* top — logo or headline */}
                <div>
                  {s.logo ? (
                    <img src={s.logo} alt={s.label} className="h-10 w-auto object-contain brightness-0 invert opacity-85" />
                  ) : (
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{s.label}</span>
                  )}
                </div>

                {/* bottom — headline + metric */}
                <div>
                  {s.headline && (
                    <p className="mb-2 text-[15px] font-bold leading-snug text-white">{s.headline}</p>
                  )}
                  {s.sub && (
                    <p className="mb-3 text-[11px] text-white/55">{s.sub}</p>
                  )}
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                    {s.metric}
                  </span>
                </div>
              </div>

              {/* vertical label — visible when collapsed */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: active === i ? 0 : 1, transition: 'opacity 0.2s ease' }}
              >
                <span
                  className="text-white/50 text-[10px] font-semibold uppercase tracking-widest select-none"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  {s.label}
                </span>
              </div>
            </Wrapper>
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
            {s.href ? (
              <Link href={s.href} className="relative block shrink-0 w-[75vw] max-w-[300px] rounded-2xl overflow-hidden" style={{ height: 220 }}>
                <img src={s.image} alt={s.label} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div>{s.logo ? <img src={s.logo} alt={s.label} className="h-8 w-auto object-contain brightness-0 invert opacity-80" /> : <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{s.label}</span>}</div>
                  <div>{s.headline && <p className="mb-1.5 text-[13px] font-bold leading-snug text-white">{s.headline}</p>}<span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-white/15 text-white border border-white/20">{s.metric}</span></div>
                </div>
              </Link>
            ) : (
            <div
              className="relative shrink-0 w-[75vw] max-w-[300px] rounded-2xl overflow-hidden"
              style={{ height: 220 }}
            >
              <img src={s.image} alt={s.label} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div>
                  {s.logo
                    ? <img src={s.logo} alt={s.label} className="h-8 w-auto object-contain brightness-0 invert opacity-80" />
                    : <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{s.label}</span>
                  }
                </div>
                <div>
                  {s.headline && <p className="mb-1.5 text-[13px] font-bold leading-snug text-white">{s.headline}</p>}
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-white/15 text-white border border-white/20">
                    {s.metric}
                  </span>
                </div>
              </div>
            </div>
            )}
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
