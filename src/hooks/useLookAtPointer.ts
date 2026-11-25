'use client'

import { useEffect, type RefObject } from 'react'
import { getPointer, subscribePointer } from '@/lib/pointer'

export type LookAtOptions = {
  /** Vertical position of the "eyes" inside the element, 0 (top) to 1 (bottom). */
  originY?: number
  /**
   * Distance, as a fraction of the viewport size, at which the look reaches ~76% of
   * full deflection (tanh(1)). Smaller = more eager to turn.
   */
  falloff?: number
  /** Easing time constant in ms; higher = heavier, slower follow. */
  smoothing?: number
  /** Set false to detach all listeners (e.g. while something else is shown). */
  enabled?: boolean
}

/**
 * Writes `--look-x` and `--look-y` (each -1..1) on the element, pointing from the
 * element toward the mouse. CSS turns those into transforms, so the motion is
 * compositor-only and React never re-renders.
 *
 * Cost model: no work at all on touch devices, with reduced motion, or while the
 * element is off-screen. Otherwise one rAF per frame while the values are still
 * settling, then it goes idle until the pointer moves or the page scrolls.
 */
export function useLookAtPointer(ref: RefObject<HTMLElement | null>, opts: LookAtOptions = {}) {
  const { originY = 0.5, falloff = 0.35, smoothing = 110, enabled = true } = opts

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!canHover.matches || reduced.matches) return

    let cx = 0, cy = 0, rectDirty = true
    let x = 0, y = 0 // current (eased) values
    let raf = 0, last = 0
    let unsubscribe: (() => void) | null = null

    const frame = (t: number) => {
      raf = 0
      if (rectDirty) {
        const r = el.getBoundingClientRect()
        cx = r.left + r.width / 2
        cy = r.top + r.height * originY
        rectDirty = false
      }
      const p = getPointer()
      const tx = p.active ? Math.tanh((p.x - cx) / (window.innerWidth * falloff)) : 0
      const ty = p.active ? Math.tanh((p.y - cy) / (window.innerHeight * falloff)) : 0

      const dt = last ? Math.min(t - last, 64) : 16
      last = t
      const k = 1 - Math.exp(-dt / smoothing) // frame-rate independent easing
      x += (tx - x) * k
      y += (ty - y) * k

      const settled = Math.abs(tx - x) < 5e-4 && Math.abs(ty - y) < 5e-4
      if (settled) { x = tx; y = ty }
      el.style.setProperty('--look-x', x.toFixed(4))
      el.style.setProperty('--look-y', y.toFixed(4))

      if (settled) last = 0
      else raf = requestAnimationFrame(frame)
    }

    const schedule = () => { if (!raf) raf = requestAnimationFrame(frame) }
    const invalidate = () => { rectDirty = true; schedule() }

    const start = () => {
      if (unsubscribe) return
      unsubscribe = subscribePointer(schedule)
      window.addEventListener('scroll', invalidate, { passive: true, capture: true })
      window.addEventListener('resize', invalidate, { passive: true })
      invalidate()
    }
    const stop = () => {
      if (!unsubscribe) return
      unsubscribe(); unsubscribe = null
      window.removeEventListener('scroll', invalidate, { capture: true })
      window.removeEventListener('resize', invalidate)
      if (raf) { cancelAnimationFrame(raf); raf = 0 }
      last = 0
    }

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '150px' })
    io.observe(el)

    return () => { io.disconnect(); stop() }
  }, [ref, originY, falloff, smoothing, enabled])
}
