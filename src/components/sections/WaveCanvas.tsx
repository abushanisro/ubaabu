'use client'
import { useEffect, useRef } from 'react'

export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let t = 0

    const dpr = Math.min(window.devicePixelRatio, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* Wave layers — all teal family, brand-compliant */
    const waves = [
      { amp: 55, freq: 0.007, speed: 0.45, phase: 0,              alpha: 0.18, lw: 1.5,
        r: [72, 210, 190],   /* teal primary  */ fill: 0.07 },
      { amp: 42, freq: 0.011, speed: 0.65, phase: Math.PI * 0.5,  alpha: 0.26, lw: 2,
        r: [34, 211, 238],   /* cyan-400      */ fill: 0.05 },
      { amp: 30, freq: 0.016, speed: 0.85, phase: Math.PI * 1.1,  alpha: 0.36, lw: 2.5,
        r: [45, 212, 191],   /* teal-400      */ fill: 0.04 },
      { amp: 20, freq: 0.022, speed: 1.1,  phase: Math.PI * 1.7,  alpha: 0.55, lw: 3,
        r: [20, 184, 166],   /* teal-500 deep */ fill: 0.03 },
    ]

    const draw = () => {
      t += 0.012

      const w = canvas.width  / dpr
      const h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      waves.forEach((wave) => {
        const midY = h * 0.45
        const [r, g, b] = wave.r

        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const y = midY
            + Math.sin(x * wave.freq + t * wave.speed + wave.phase) * wave.amp
            + Math.sin(x * wave.freq * 1.6 + t * wave.speed * 0.55) * (wave.amp * 0.28)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        /* Horizontal colour gradient for stroke */
        const sg = ctx.createLinearGradient(0, 0, w, 0)
        sg.addColorStop(0,    `rgba(${r},${g},${b},0)`)
        sg.addColorStop(0.15, `rgba(${r},${g},${b},${wave.alpha})`)
        sg.addColorStop(0.5,  `rgba(${r},${g},${b},${wave.alpha * 1.5})`)
        sg.addColorStop(0.85, `rgba(${r},${g},${b},${wave.alpha})`)
        sg.addColorStop(1,    `rgba(${r},${g},${b},0)`)

        ctx.strokeStyle = sg
        ctx.lineWidth   = wave.lw
        ctx.lineCap     = 'round'
        ctx.stroke()

        /* Subtle fill below each wave */
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        const fg = ctx.createLinearGradient(0, midY - wave.amp, 0, h)
        fg.addColorStop(0, `rgba(${r},${g},${b},${wave.fill})`)
        fg.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = fg
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />
}
