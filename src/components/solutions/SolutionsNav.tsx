'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Cpu,
  Network,
  ChartLine,
  ShieldAlert,
  Lightbulb,
  Activity,
} from 'lucide-react'

const T = '#0d9e8a'

const NAV_ITEMS = [
  { id: 'design',   label: 'Design',    Icon: Cpu        },
  { id: 'supplier', label: 'Suppliers', Icon: Network    },
  { id: 'cost',     label: 'Cost',      Icon: ChartLine  },
  { id: 'risk',     label: 'Risk',      Icon: ShieldAlert },
  { id: 'vave',     label: 'VAVE',      Icon: Lightbulb  },
  { id: 'tracking', label: 'Tracking',  Icon: Activity   },
] as const

export default function SolutionsNav() {
  const [active, setActive] = useState<string>('design')
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const getActive = () => {
      const threshold = window.scrollY + window.innerHeight * 0.28
      let found = NAV_ITEMS[0].id as string

      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top + window.scrollY <= threshold) {
          found = id
        }
      }
      return found
    }

    const onScroll = () => {
      const next = getActive()
      if (next !== activeRef.current) setActive(next)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-20 z-30 mx-auto flex justify-center px-4 py-3">
      <div
        className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full p-1.5"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={`#${id}`}
              className={[
                'relative flex items-center gap-2 whitespace-nowrap rounded-full',
                'px-3.5 py-1.5 text-xs font-medium transition-colors duration-200',
                isActive ? 'text-black/80' : 'text-black/50 hover:text-black/80',
              ].join(' ')}
            >
              {isActive && (
                <motion.span
                  layoutId="solutions-nav-pill"
                  className="absolute inset-0 -z-0 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,1)',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
                    border: '1px solid rgba(0,0,0,0.07)',
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="relative z-10">{label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
