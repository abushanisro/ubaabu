'use client'

import { useEffect, useRef, useState } from 'react'
import { Application } from '@splinetool/runtime'

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    let mounted = true
    const app = new Application(canvasRef.current)
    appRef.current = app

    app.load(scene)
      .then(() => {
        if (!mounted) return
        try { app.setGlobalEvents(true) } catch {}
        setReady(true)
        onLoad?.()
      })
      .catch(() => {
        if (mounted) setError(true)
      })

    return () => {
      mounted = false
      try { app.stop() } catch {}
    }
  }, [scene]) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div
        className={className ? `relative ${className}` : 'relative'}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="24" cy="24" r="8" fill="none" stroke="#2dd4bf" strokeWidth="2" />
        </svg>
      </div>
    )
  }

  return (
    <div
      className={className ? `relative ${className}` : 'relative'}
      onWheel={e => e.stopPropagation()}
    >
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span
            className="w-6 h-6 rounded-full border-2 animate-spin"
            style={{ borderColor: '#2dd4bf', borderTopColor: 'transparent' }}
          />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: ready ? 1 : 0, transition: ready ? 'opacity 0.5s' : 'none' }}
      />
    </div>
  )
}
