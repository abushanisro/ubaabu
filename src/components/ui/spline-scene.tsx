'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import type { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  className?: string
  /** Called once the scene has loaded and rendered its first frame. */
  onReady?: () => void
  /** Called if the runtime or the scene fails to load (e.g. no WebGL). */
  onError?: () => void
}

/**
 * Live Spline scene on a canvas.
 *
 * - The ~2 MB runtime is imported inside the effect, so it is its own chunk and is
 *   only requested when this component actually mounts.
 * - Global events are on, so "look at cursor" interactions follow the mouse anywhere
 *   on the page; the canvas itself ignores pointer input so it never captures scroll
 *   or clicks.
 * - Rendering is paused while the canvas is off-screen or the tab is hidden, and the
 *   WebGL context is released on unmount.
 */
export function SplineScene({ scene, className, onReady, onError }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cb = useRef({ onReady, onError })
  useLayoutEffect(() => { cb.current = { onReady, onError } })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let disposed = false
    let app: Application | null = null
    let onScreen = true

    const sync = () => {
      if (!app) return
      try {
        if (onScreen && !document.hidden) app.play()
        else app.stop()
      } catch {}
    }
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync() }, { rootMargin: '100px' })
    io.observe(canvas)
    document.addEventListener('visibilitychange', sync)

    import('@splinetool/runtime')
      .then(async ({ Application }) => {
        if (disposed) return
        const instance = new Application(canvas)
        app = instance
        await instance.load(scene)
        if (disposed) return
        instance.setGlobalEvents(true)
        sync()
        requestAnimationFrame(() => { if (!disposed) cb.current.onReady?.() })
      })
      .catch(() => { if (!disposed) cb.current.onError?.() })

    return () => {
      disposed = true
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      try { app?.dispose() } catch {}
      app = null
    }
  }, [scene])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} style={{ pointerEvents: 'none' }} />
}
