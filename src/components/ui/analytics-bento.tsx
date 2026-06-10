"use client"

import type React from "react"
import { useState, useRef, useMemo } from "react"
import { LayoutGrid } from "lucide-react"

const weekData = [
  { day: "Sun", value: 450 },
  { day: "Mon", value: 520 },
  { day: "Tue", value: 680 },
  { day: "Wed", value: 750 },
  { day: "Thu", value: 620 },
  { day: "Fri", value: 780 },
  { day: "Sat", value: 920 },
]

export function BudgetCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const chartRef = useRef<SVGSVGElement>(null)

  const maxValue = Math.max(...weekData.map((d) => d.value))
  const minValue = Math.min(...weekData.map((d) => d.value))
  const chartHeight = 80
  const chartWidth = 360
  const padding = { top: 10, bottom: 20, left: 10, right: 10 }

  const getY = (value: number) => {
    const range = maxValue - minValue
    const normalized = (value - minValue) / range
    return chartHeight - padding.bottom - normalized * (chartHeight - padding.top - padding.bottom)
  }

  const getX = (index: number) =>
    padding.left + (index / (weekData.length - 1)) * (chartWidth - padding.left - padding.right)

  const generatePath = () => {
    const points = weekData.map((d, i) => ({ x: getX(i), y: getY(d.value) }))
    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[i + 2] || p2
      const t = 0.35
      const cp1x = p1.x + (p2.x - p0.x) * t
      const cp1y = p1.y + (p2.y - p0.y) * t
      const cp2x = p2.x - (p3.x - p1.x) * t
      const cp2y = p2.y - (p3.y - p1.y) * t
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return path
  }

  const generateAreaPath = () => {
    const last = weekData.length - 1
    return `${generatePath()} L ${getX(last)} ${chartHeight - padding.bottom} L ${getX(0)} ${chartHeight - padding.bottom} Z`
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current) return
    const rect = chartRef.current.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * chartWidth
    let closest = 0
    let minDist = Infinity
    weekData.forEach((_, i) => {
      const d = Math.abs(getX(i) - relX)
      if (d < minDist) { minDist = d; closest = i }
    })
    setHoveredIndex(closest)
  }

  const scatteredDots = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        x: 20 + (i % 7) * 48 + Math.sin(i * 2.3) * 12,
        y: padding.top + 5 + Math.floor(i / 7) * 18 + Math.cos(i * 1.7) * 6,
        opacity: 0.12 + (i % 3) * 0.06,
        size: 1 + (i % 2) * 0.8,
      })),
    [],
  )

  return (
    <div className="rounded-xl border border-black/10 bg-white/90 backdrop-blur-sm p-3 shadow-lg">
      {/* Header - identical to existing Cost Data card */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0d9e8a]/10 text-[#0d9e8a]">
          <LayoutGrid className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-[#0d1117]">Cost Data</div>
          <div className="text-[10px] text-[#64748b]">Live should-cost analysis</div>
        </div>
      </div>

      {/* Interactive chart */}
      <div className="relative mt-2">
        <svg
          ref={chartRef}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="ab-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0d9e8a" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0d9e8a" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Decorative dots */}
          {scatteredDots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dot.size} fill="#0d9e8a" opacity={dot.opacity} />
          ))}

          {/* Vertical guide lines */}
          {weekData.map((_, i) => (
            <line
              key={i}
              x1={getX(i)} y1={padding.top}
              x2={getX(i)} y2={chartHeight - padding.bottom}
              stroke="#94a3b8"
              strokeWidth="0.5"
              strokeDasharray="2 4"
              opacity={hoveredIndex === i ? 0.6 : 0.2}
            />
          ))}

          {/* Area fill */}
          <path d={generateAreaPath()} fill="url(#ab-area)" />

          {/* Curve line */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#0d9e8a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover dot */}
          {hoveredIndex !== null && (
            <g>
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(weekData[hoveredIndex].value)}
                r="5"
                fill="white"
                stroke="#0d9e8a"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Day labels */}
          {weekData.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={chartHeight - 4}
              textAnchor="middle"
              fontSize="9"
              fill={hoveredIndex === i ? "#0d9e8a" : "#94a3b8"}
              fontWeight={hoveredIndex === i ? "600" : "400"}
            >
              {d.day}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: `${(getX(hoveredIndex) / chartWidth) * 100}%`,
              top: `${(getY(weekData[hoveredIndex].value) / chartHeight) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <div className="rounded-lg bg-[#0d1117] px-2 py-1 shadow-lg">
              <span className="text-[10px] font-semibold text-white">
                ${weekData[hoveredIndex].value}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
