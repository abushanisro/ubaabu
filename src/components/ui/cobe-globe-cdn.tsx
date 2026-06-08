"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"

interface CdnMarker {
  id: string
  location: [number, number]
  region: string
}

interface CdnArc {
  id: string
  from: [number, number]
  to: [number, number]
  label: string
}

interface GlobeCdnProps {
  markers?: CdnMarker[]
  arcs?: CdnArc[]
  className?: string
  speed?: number
}

const defaultMarkers: CdnMarker[] = [
  { id: "cdn-iad", location: [ 13.08,  80.27], region: "Chennai · HQ"      },
  { id: "cdn-sfo", location: [ 48.78,   9.18], region: "Stuttgart · Auto"  },
  { id: "cdn-cdg", location: [ 42.33, -83.04], region: "Detroit · Tier-1"  },
  { id: "cdn-hnd", location: [ 35.68, 139.69], region: "Tokyo · Precision" },
  { id: "cdn-syd", location: [-33.95, 151.18], region: "Sydney · Pacific"  },
  { id: "cdn-gru", location: [-23.43, -46.47], region: "São Paulo · Mfg"   },
  { id: "cdn-sin", location: [  1.36, 103.99], region: "Singapore · Aero"  },
  { id: "cdn-arn", location: [ 59.65,  17.93], region: "Stockholm · Space" },
  { id: "cdn-dub", location: [ 51.51,  -0.13], region: "London · Defence"  },
  { id: "cdn-bom", location: [ 19.09,  72.87], region: "Mumbai · OEM"      },
]

const defaultArcs: CdnArc[] = [
  { id: "cdn-arc-1", from: [ 13.08,  80.27], to: [ 48.78,   9.18], label: "Should-Cost"    },
  { id: "cdn-arc-2", from: [ 48.78,   9.18], to: [ 42.33, -83.04], label: "Supplier Intel"  },
  { id: "cdn-arc-3", from: [ 13.08,  80.27], to: [  1.36, 103.99], label: "BOM Sync"        },
  { id: "cdn-arc-4", from: [ 42.33, -83.04], to: [-23.43, -46.47], label: "OTIF Track"      },
  { id: "cdn-arc-5", from: [ 35.68, 139.69], to: [-33.95, 151.18], label: "Quality PPAP"    },
  { id: "cdn-arc-6", from: [ 48.78,   9.18], to: [ 19.09,  72.87], label: "VAVE Studio"     },
]

// Cycling platform metrics shown on each arc
const ARC_METRICS: Record<string, string[]> = {
  "cdn-arc-1": ["23% saved",    "Should-Cost", "Engine"      ],
  "cdn-arc-2": ["2,400+ sup",   "Supplier",    "Intel"       ],
  "cdn-arc-3": ["99.4% BOM",    "BOM Sync",    "Validated"   ],
  "cdn-arc-4": ["98.6% OTIF",   "On-Time",     "In-Full"     ],
  "cdn-arc-5": ["Quality PPAP", "Zero Defect", "Track"       ],
  "cdn-arc-6": ["−18% cost",    "VAVE Studio", "Value Engg"  ],
}

export function GlobeCdn({
  markers = defaultMarkers,
  arcs = defaultArcs,
  className = "",
  speed = 0.003,
}: GlobeCdnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const [traffic, setTraffic] = useState(() =>
    defaultArcs.map((a, i) => ({ id: a.id, tickIndex: i % 3 }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic((data) =>
        data.map((t) => ({
          ...t,
          tickIndex: (t.tickIndex + 1) % 3,
        }))
      )
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 0, theta: 0.2, dark: 0, diffuse: 1.5,
        mapSamples: 16000, mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: [0, 0, 0],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0.02,
        markers: markers.map((m) => ({ location: m.location, size: 0.012, id: m.id })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcColor: [0, 0, 0],
        arcWidth: 0.5, arcHeight: 0.25, opacity: 0.7,
      })

      function animate() {
        if (!isPausedRef.current) phi += speed
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, arcs, speed])

  const pyramidFaceStyle = (nth: number): React.CSSProperties => {
    const transforms = [
      "rotateY(0deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(120deg) translateZ(4px) rotateX(19.5deg)",
      "rotateY(240deg) translateZ(4px) rotateX(19.5deg)",
      "rotateX(-90deg) rotateZ(60deg) translateY(4px)",
    ]
    const colors = ["#111", "#333", "#555", "#222"]
    return {
      position: "absolute", left: -0.5, top: 0,
      width: 0, height: 0,
      borderLeft: "6.5px solid transparent",
      borderRight: "6.5px solid transparent",
      borderBottom: `13px solid ${colors[nth]}`,
      transformOrigin: "center bottom",
      transform: transforms[nth],
    }
  }

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes pyramid-spin {
          0% { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%", cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none",
        }}
      />

      {/* Spinning pyramid + city/hub label above each marker */}
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            // @ts-expect-error CSS Anchor Positioning
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: 6,
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.3s, filter 0.3s",
          }}
        >
          <div style={{
            width: 12, height: 12, position: "relative",
            transformStyle: "preserve-3d" as const,
            animation: "pyramid-spin 4s linear infinite",
          }}>
            {[0, 1, 2, 3].map((n) => (
              <div key={n} style={pyramidFaceStyle(n)} />
            ))}
          </div>
          <span style={{
            fontFamily: "monospace", fontSize: "0.55rem", color: "#000",
            background: "#fff", padding: "2px 6px", borderRadius: 3,
            letterSpacing: "0.05em", whiteSpace: "nowrap" as const,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}>{m.region}</span>
        </div>
      ))}

      {/* Platform feature + cycling metric on each arc */}
      {traffic.map((t) => {
        const arc = arcs.find(a => a.id === t.id)
        const metrics = ARC_METRICS[t.id] ?? ["Live", "Track", "Data"]
        return (
          <div
            key={t.id}
            style={{
              position: "absolute",
              // @ts-expect-error CSS Anchor Positioning
              positionAnchor: `--cobe-arc-${t.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              pointerEvents: "none" as const,
              opacity: `var(--cobe-visible-arc-${t.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-arc-${t.id}, 0)) * 8px))`,
              transition: "opacity 0.3s, filter 0.3s",
            }}
          >
            <div style={{
              background: "#0f1b2d",
              padding: "3px 8px",
              borderRadius: 4,
              whiteSpace: "nowrap" as const,
              border: "1px solid rgba(45,212,191,0.35)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}>
              <div style={{
                fontFamily: "monospace", fontSize: "0.42rem",
                color: "#2dd4bf", letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}>
                {arc?.label ?? "Platform"}
              </div>
              <div style={{
                fontFamily: "monospace", fontSize: "0.5rem",
                color: "#fff", fontWeight: 700,
              }}>
                {metrics[t.tickIndex]}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
