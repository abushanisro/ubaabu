'use client'

import { useEffect, useRef, useState } from 'react'
import { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    const app = new Application(canvasRef.current)
    appRef.current = app

    app.load(scene).then(() => {
      // Extend cursor-tracking to the whole page so the robot head
      // follows the mouse even when hovering elements outside the canvas.
      try { app.setGlobalEvents(true) } catch {}
      // Keep canvas hidden until the intro animation finishes (~3.5s).
      setTimeout(() => setReady(true), 3500)
    })

    return () => {
      try { app.stop() } catch {}
    }
  }, [scene])

  return (
    <div
      className={className ? `relative ${className}` : 'relative'}
      onWheel={e => e.stopPropagation()}
    >
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="w-6 h-6 rounded-full border-2 animate-spin"
            style={{ borderColor: '#2dd4bf', borderTopColor: 'transparent' }} />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: ready ? 1 : 0, transition: ready ? 'opacity 0.3s' : 'none' }}
      />
    </div>
  )
}
