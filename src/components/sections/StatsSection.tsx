'use client'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Sun, Moon } from 'lucide-react'
import dynamic from 'next/dynamic'

const ManufacturingViz = dynamic(
  () => import('@/components/ManufacturingViz').then((m) => ({ default: m.ManufacturingViz })),
  { ssr: false, loading: () => null }
)

type Time = 'pre-dawn' | 'sunrise' | 'daytime' | 'dusk' | 'sunset' | 'night'
const TIMES: Time[] = ['pre-dawn', 'sunrise', 'daytime', 'dusk', 'sunset', 'night']

const stats = [
  {
    value: '$72B+',
    label: "in Indian defence procurement managed annually on spreadsheets and legacy ERP systems",
  },
  {
    value: '40%',
    label: 'faster RFQ turnaround time for engineering teams using Emithran should-cost models',
  },
  {
    value: '99.4%',
    label: 'BOM accuracy rate across active defence and aerospace programmes on the platform',
  },
]

export default function StatsSection() {
  const [active, setActive] = useState(2)
  const [hovered, setHovered] = useState<number | null>(null)
  const [time, setTime] = useState<Time>('night')
  const [playing, setPlaying] = useState(true)
  const intRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!playing) return
    intRef.current = setInterval(() => {
      setActive((a) => (a + 1) % stats.length)
    }, 3500)
    return () => {
      if (intRef.current) clearInterval(intRef.current)
    }
  }, [playing])

  const cycleTime = () => {
    const idx = TIMES.indexOf(time)
    setTime(TIMES[(idx + 1) % TIMES.length])
  }

  const isDay = time === 'daytime' || time === 'sunrise' || time === 'sunset'

  return (
    <section className="stats-stage relative" data-time={time}>
      <div className="stats-sky" data-time={time} />
      <div className="stats-stars" />
      {/* Column lines — match layout.tsx fixed lines but white for dark bg */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08] hidden md:block" style={{ left: 64 }} />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08] hidden md:block" style={{ right: 64 }} />
{/* ── Text content ── */}
      <div className="relative z-10 py-10 md:py-14">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-6xl">
              The intelligence layer for Every manufacturing.
            </h2>
            <div className="mt-8 flex items-center gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="grid h-9 w-9 place-items-center rounded-full border border-current/40 hover:bg-white/10 transition-colors"
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={cycleTime}
                aria-label="Time of day"
                className="grid h-9 w-9 place-items-center rounded-full border border-current/40 hover:bg-white/10 transition-colors"
              >
                {isDay ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <span className="ml-2 text-xs uppercase tracking-widest opacity-70">{time}</span>
            </div>
          </div>

          <div className="self-start">
            <ul className="flex flex-col">
              {stats.map((s, i) => (
                <li key={s.value}>
                  <button
                    className={`stat-pill ${i === active ? 'active' : ''}`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onTouchStart={() => setHovered(hovered === i ? null : i)}
                    onTouchEnd={() => setHovered(null)}
                    onClick={() => setActive(i)}
                  >
                    <p className="font-display text-4xl font-medium md:text-5xl lg:text-6xl">{s.value}</p>
                    {(i === active || i === hovered) && (
                      <p className="mt-2 text-sm opacity-80 md:text-base">{s.label}</p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Animation — taller on mobile, wider cinematic on desktop ── */}
      <div className="pointer-events-none relative z-0 w-full -mt-10 md:-mt-16" style={{ paddingLeft: 'clamp(16px, 5vw, 64px)', paddingRight: 'clamp(16px, 5vw, 64px)' }}>
        <div className="relative w-full aspect-[2/1] md:aspect-[5/1]">
          <ManufacturingViz index={active as 0 | 1 | 2 | 3} time={time} playing={playing} />
        </div>
      </div>
    </section>
  )
}
