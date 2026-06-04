'use client'

import { useEffect, useRef } from 'react'

export default function HeroWave({ className }: { className?: string }) {
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const mouseRef      = useRef({ x: 0.5, y: 0.5 })
  const targetMouse   = useRef({ x: 0.5, y: 0.5 })
  const frameRef      = useRef<number>(0)
  const timeRef       = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const raw = canvas.getContext('2d')
    if (!raw) return
    const ctx: CanvasRenderingContext2D = raw

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      targetMouse.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      }
    }
    window.addEventListener('mousemove', onMouse)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /** Fill a shape from a bezier left-boundary to the right edge */
    function fillWave(
      w: number, h: number,
      sx: number, sy: number,
      c1x: number, c1y: number,
      c2x: number, c2y: number,
      ex: number, ey: number,
      grad: CanvasGradient,
      alpha: number,
    ) {
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.moveTo(w, 0)
      ctx.lineTo(sx, sy)
      ctx.bezierCurveTo(c1x, c1y, c2x, c2y, ex, ey)
      ctx.lineTo(w, h)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (w === 0 || h === 0) { frameRef.current = requestAnimationFrame(draw); return }

      // Smooth mouse lag
      mouseRef.current.x += (targetMouse.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetMouse.current.y - mouseRef.current.y) * 0.04

      timeRef.current += 0.0025
      const t  = timeRef.current
      const mx = (mouseRef.current.x - 0.5) * 0.04
      const my = (mouseRef.current.y - 0.5) * 0.04

      // Independent oscillators for organic motion
      const a1 = Math.sin(t * 1.00)
      const a2 = Math.sin(t * 0.65 + 1.2)
      const a3 = Math.sin(t * 1.40 + 0.5)
      const a4 = Math.sin(t * 0.45 + 2.1)
      const b1 = Math.cos(t * 0.90 + 0.8)
      const b2 = Math.cos(t * 1.15 + 1.5)
      const b3 = Math.cos(t * 0.55 + 0.3)
      const breathe = 0.95 + Math.sin(t * 0.3) * 0.05

      ctx.clearRect(0, 0, w, h)

      const isMobile = w < 768
      const isTablet = w < 1024 && !isMobile

      // ── Desktop wave base positions ───────────────────────────────────────────
      // On tablet shift slightly right; desktop stays at designed positions
      const dShift = isTablet ? 0.08 : 0
      const W1     = 0.42 + dShift
      const W2     = 0.51 + dShift
      const W3     = 0.60 + dShift

      if (isMobile) {
        // ── Mobile: clip to safe zone — right ~45% at top, full-width at bottom ─
        // This diagonal clip keeps waves away from the text column entirely.
        ctx.save()
        ctx.beginPath()
        // Top: start at 58% across the top edge
        ctx.moveTo(w * 0.58, 0)
        // Diagonal bezier sweep down-left to left edge at 62% height
        ctx.bezierCurveTo(
          w * 0.30, h * 0.28,
          w * 0.10, h * 0.46,
          0,        h * 0.62,
        )
        // Down left edge to bottom-left
        ctx.lineTo(0, h)
        // Along bottom to bottom-right
        ctx.lineTo(w, h)
        // Up right edge to top-right
        ctx.lineTo(w, 0)
        ctx.closePath()
        ctx.clip()

        // Draw waves in the clipped safe zone (no shift needed — clip handles it)
        const M1 = 0.54, M2 = 0.62, M3 = 0.70

        // Wave 1
        {
          const g = ctx.createLinearGradient(M1 * w, 0, w, h * 0.6)
          g.addColorStop(0,    '#a7f3d0')
          g.addColorStop(0.4,  '#5eead4')
          g.addColorStop(0.8,  '#2dd4bf')
          g.addColorStop(1,    '#0d9488')
          fillWave(w, h,
            (M1      + a1 * 0.02 + mx) * w,  0,
            (M1-0.10 + a2 * 0.025+ mx) * w,  h * 0.32,
            (M1+0.04 + b1 * 0.02 + mx) * w,  h * 0.65,
            (M1+0.08 + a3 * 0.015+ mx) * w,  h,
            g, 0.45 * breathe)
        }
        // Wave 2
        {
          const g = ctx.createLinearGradient(M2 * w, 0, w, h)
          g.addColorStop(0,    '#67e8f9')
          g.addColorStop(0.3,  '#2dd4bf')
          g.addColorStop(0.7,  '#0d9488')
          g.addColorStop(1,    '#0f766e')
          fillWave(w, h,
            (M2      + a2 * 0.015+ mx) * w,  0,
            (M2-0.08 + b2 * 0.02 + mx) * w,  h * 0.28,
            (M2+0.05 + a1 * 0.02 + mx) * w,  h * 0.70,
            (M2+0.09 + b1 * 0.015+ mx) * w,  h,
            g, 0.60 * breathe)
        }
        // Wave 3 — radial glow in top-right
        {
          const cx = (0.86 + a3 * 0.03 + mx) * w
          const cy = (0.08 + b3 * 0.03 + my) * h
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.5)
          g.addColorStop(0,    'rgba(167,243,208,0.9)')
          g.addColorStop(0.3,  'rgba(103,232,249,0.6)')
          g.addColorStop(0.65, 'rgba(45,212,191,0.25)')
          g.addColorStop(1,    'rgba(45,212,191,0)')
          fillWave(w, h,
            (M3      + a4 * 0.014+ mx) * w,  0,
            (M3-0.06 + b3 * 0.018+ mx) * w,  h * 0.30,
            (M3+0.05 + a2 * 0.018+ mx) * w,  h * 0.67,
            (M3+0.09 + b1 * 0.014+ mx) * w,  h,
            g, 0.70 * breathe)
        }

        ctx.restore()

        // Feather the diagonal clip boundary with a soft white gradient
        {
          const g = ctx.createLinearGradient(w * 0.44, h * 0.10, w * 0.64, h * 0.55)
          g.addColorStop(0,   'rgba(255,255,255,1)')
          g.addColorStop(0.6, 'rgba(255,255,255,0.85)')
          g.addColorStop(1,   'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, w, h)
        }

      } else {
        // ── Desktop / Tablet waves ────────────────────────────────────────────

        // Wave 1 — wide, soft, light aqua
        {
          const g = ctx.createLinearGradient((W1 - 0.04) * w, 0, w, h * 0.55)
          g.addColorStop(0,    '#a7f3d0')
          g.addColorStop(0.35, '#5eead4')
          g.addColorStop(0.75, '#2dd4bf')
          g.addColorStop(1,    '#0d9488')
          fillWave(w, h,
            (W1      + a1 * 0.022 + mx) * w,  0,
            (W1-0.12 + a2 * 0.028 + mx) * w,  h * 0.32,
            (W1+0.04 + b1 * 0.026 + mx) * w,  h * 0.66,
            (W1+0.08 + a3 * 0.018 + mx) * w,  h,
            g, 0.40 * breathe)
        }

        // Wave 2 — vivid teal core
        {
          const g = ctx.createLinearGradient((W2 - 0.05) * w, 0, w, h * 0.9)
          g.addColorStop(0,    '#67e8f9')
          g.addColorStop(0.30, '#2dd4bf')
          g.addColorStop(0.68, '#0d9488')
          g.addColorStop(1,    '#0f766e')
          fillWave(w, h,
            (W2      + a2 * 0.018 + mx) * w,  0,
            (W2-0.10 + b2 * 0.024 + mx) * w,  h * 0.28,
            (W2+0.05 + a1 * 0.024 + mx) * w,  h * 0.70,
            (W2+0.10 + b1 * 0.016 + mx) * w,  h,
            g, 0.58 * breathe)
        }

        // Wave 3 — bright top-right radial glow
        {
          const cx = (0.84 + a3 * 0.035 + mx) * w
          const cy = (0.10 + b3 * 0.035 + my) * h
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.52)
          g.addColorStop(0,    'rgba(167,243,208,0.95)')
          g.addColorStop(0.25, 'rgba(103,232,249,0.70)')
          g.addColorStop(0.60, 'rgba(45,212,191,0.30)')
          g.addColorStop(1,    'rgba(45,212,191,0)')
          fillWave(w, h,
            (W3      + a4 * 0.016 + mx) * w,  0,
            (W3-0.08 + b3 * 0.020 + mx) * w,  h * 0.30,
            (W3+0.06 + a2 * 0.020 + mx) * w,  h * 0.67,
            (W3+0.10 + b1 * 0.016 + mx) * w,  h,
            g, 0.68 * breathe)
        }

        // Feather — white gradient that softens the left wave edge
        {
          const FEATHER = 0.44 + dShift
          const ex = (FEATHER + a1 * 0.016 + mx) * w
          const g  = ctx.createLinearGradient(ex - w * 0.12, 0, ex + w * 0.06, 0)
          g.addColorStop(0, 'rgba(255,255,255,1)')
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, ex + w * 0.06, h)
        }
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouse)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
