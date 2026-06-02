'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'packages',  label: 'Packages'      },
  { id: 'compare',   label: 'Compare'       },
  { id: 'roi',       label: 'ROI calculator' },
  { id: 'faqs',      label: 'FAQs'          },
] as const

export default function PricingNav() {
  const [active, setActive] = useState<string>('packages')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="sticky top-[64px] z-40 border-b border-black/[0.06] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-center px-6 py-3">
        <nav className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white p-1 shadow-sm">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                active === id
                  ? 'bg-[#0f1b2d] text-white'
                  : 'text-[#0f1b2d] hover:bg-[#0d9488]/[0.08]'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
