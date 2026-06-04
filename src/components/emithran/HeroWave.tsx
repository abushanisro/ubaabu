'use client'

import { useEffect, useRef } from 'react'

const EASE = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

export default function HeroWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0.5, y: 0.5 })
  const frameRef  = useRef<number>(0)
  const timeRef   = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
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
    window.addEventListener('resize', resize)

    // ── draw one filled wave blob ──────────────────────────────────────────────
    function drawBlob(
      w: number,
      h: number,
      t: number,
      mx: number,    // 0-1 mouse x
      my: number,    // 0-1 mouse y
      // left-edge anchor (0-1 in x/y)
      lx: number,
      ly0: number,
      ly1: number,
      // control point params
      cpTopX: number,
      cpTopY: number,
      cpBotX: number,
      cpBotY: number,
      gradient: CanvasGradient,
      alpha: number,
    ) {
      const MI = 0.05 // 5% mouse influence
      const wave = Math.sin(t) * 0.035

      // left edge of blob — sweeps from (lx, ly0) at top to (lx, ly1) at bottom
      const topX = (lx + wave + (mx - 0.5) * MI) * w
      const topY = ly0 * h
      const botX = (lx + wave * 0.4 + (mx - 0.5) * MI * 0.5) * w
      const botY = ly1 * h

      // bezier control points for the left S-curve
      const cp1x = (cpTopX + Math.sin(t * 1.1) * 0.04 + (mx - 0.5) * MI * 0.8) * w
      const cp1y = (cpTopY + Math.cos(t * 0.7) * 0.05 + (my - 0.5) * MI * 0.4) * h
      const cp2x = (cpBotX + Math.cos(t * 0.9) * 0.04 + (mx - 0.5) * MI * 0.6) * w
      const cp2y = (cpBotY + Math.sin(t * 1.3) * 0.05 + (my - 0.5) * MI * 0.4) * h

      ctx.beginPath()
      ctx.moveTo(w, 0)          // top-right
      ctx.lineTo(topX, topY)    // top of left edge
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, botX, botY) // S-curve left edge
      ctx.lineTo(w, h)          // bottom-right
      ctx.closePath()

      ctx.fillStyle = gradient
      ctx.globalAlpha = alpha
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      timeRef.current += 0.004   // slow drift

      const t  = timeRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, w, h)

      // ── Layer 1: widest, lightest — light mint fills right ~65% ──────────────
      const g1 = ctx.createLinearGradient(w * 0.25, h * 0.5, w, h * 0.2)
      g1.addColorStop(0,   'rgba(153,246,228,0.0)')   // #99f6e4 transparent edge
      g1.addColorStop(0.3, 'rgba(103,232,249,0.35)')  // #67e8f9
      g1.addColorStop(0.7, 'rgba(45,212,191,0.55)')   // #2dd4bf
      g1.addColorStop(1,   'rgba(20,184,166,0.45)')   // #14b8a6

      drawBlob(w, h, t, mx, my,
        0.32, 0.0, 1.0,           // left edge: x=32%, top=0%, bot=100%
        0.18, 0.35, 0.45, 0.65,   // control points
        g1, 1,
      )

      // ── Layer 2: mid — richer teal fills right ~50% ───────────────────────────
      const g2 = ctx.createLinearGradient(w * 0.4, 0, w, h * 0.5)
      g2.addColorStop(0,   'rgba(103,232,249,0.0)')   // transparent
      g2.addColorStop(0.25,'rgba(45,212,191,0.5)')    // #2dd4bf
      g2.addColorStop(0.65,'rgba(13,148,136,0.65)')   // #0d9488
      g2.addColorStop(1,   'rgba(15,118,110,0.4)')    // darker teal

      drawBlob(w, h, t * 1.15 + 0.8, mx, my,
        0.44, 0.0, 1.0,
        0.28, 0.3, 0.55, 0.7,
        g2, 1,
      )

      // ── Layer 3: accent highlight — top-right bright teal ────────────────────
      const g3 = ctx.createRadialGradient(w * 0.85, h * 0.12, 0, w * 0.85, h * 0.12, w * 0.45)
      g3.addColorStop(0,   'rgba(153,246,228,0.7)')   // bright mint center
      g3.addColorStop(0.4, 'rgba(45,212,191,0.35)')
      g3.addColorStop(1,   'rgba(45,212,191,0.0)')

      drawBlob(w, h, t * 0.9 + 1.6, mx, my,
        0.52, 0.0, 1.0,
        0.38, 0.2, 0.62, 0.75,
        g3, 1,
      )

      // ── Layer 4: soft white veil on the very right edge ──────────────────────
      const g4 = ctx.createLinearGradient(w * 0.7, 0, w, 0)
      g4.addColorStop(0, 'rgba(255,255,255,0.0)')
      g4.addColorStop(1, 'rgba(255,255,255,0.18)')

      ctx.fillStyle = g4
      ctx.globalAlpha = 1
      ctx.fillRect(w * 0.7, 0, w * 0.3, h)

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', resize)
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
