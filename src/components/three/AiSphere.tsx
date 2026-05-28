'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props { className?: string; burst?: number; moduleId?: string }

// ── Shape generators ──────────────────────────────────────────
// Each returns a Float32Array of n*3 (x,y,z) positions, fitting ~[-1.8,1.8]

function genBom(n: number): Float32Array {
  // Cascading hierarchy rows (tree / BOM table)
  const p = new Float32Array(n * 3)
  const rows = [
    { y: 1.5, w: 0.6,  frac: 0.07 },
    { y: 0.9, w: 1.1,  frac: 0.14 },
    { y: 0.3, w: 1.5,  frac: 0.20 },
    { y: -0.35, w: 1.7, frac: 0.26 },
    { y: -1.1, w: 1.8, frac: 0.33 },
  ]
  let i = 0
  for (const r of rows) {
    const cnt = Math.round(n * r.frac)
    for (let k = 0; k < cnt && i < n; k++, i++) {
      p[i*3]   = (Math.random() - .5) * r.w * 2
      p[i*3+1] = r.y + (Math.random() - .5) * .09
      p[i*3+2] = (Math.random() - .5) * .18
    }
  }
  while (i < n) { p[i*3] = (Math.random()-.5)*3.6; p[i*3+1] = (Math.random()-.5)*3; i++ }
  return p
}

function genBarChart(n: number): Float32Array {
  // 5-bar cost breakdown chart
  const p = new Float32Array(n * 3)
  const bars = [
    { cx: -1.45, h: 1.3 },
    { cx: -0.72, h: 2.5 },
    { cx: 0,     h: 1.9 },
    { cx: 0.72,  h: 3.1 },
    { cx: 1.45,  h: 1.5 },
  ]
  const w = 0.46, base = -1.7
  const totalH = bars.reduce((s, b) => s + b.h, 0)
  let i = 0
  for (const bar of bars) {
    const cnt = Math.round(n * bar.h / totalH)
    for (let k = 0; k < cnt && i < n; k++, i++) {
      p[i*3]   = bar.cx + (Math.random() - .5) * w
      p[i*3+1] = base + Math.random() * bar.h
      p[i*3+2] = (Math.random() - .5) * .18
    }
  }
  while (i < n) {
    const b = bars[Math.floor(Math.random() * bars.length)]
    p[i*3] = b.cx + (Math.random()-.5)*w; p[i*3+1] = base + Math.random()*b.h; i++
  }
  return p
}

function genStar(n: number): Float32Array {
  // 8-arm asterisk (VAVE = creative explosion)
  const p = new Float32Array(n * 3)
  const arms = 8, len = 1.75
  for (let i = 0; i < n; i++) {
    const arm  = Math.floor(Math.random() * arms)
    const a    = (arm / arms) * Math.PI * 2
    const dist = Math.pow(Math.random(), .5) * len
    const spr  = (1 - dist / len) * .11
    p[i*3]   = Math.cos(a) * dist + (Math.random()-.5) * spr
    p[i*3+1] = Math.sin(a) * dist + (Math.random()-.5) * spr
    p[i*3+2] = (Math.random() - .5) * .14
  }
  return p
}

function genRadar(n: number): Float32Array {
  // Concentric pentagons (supplier radar chart)
  const p = new Float32Array(n * 3)
  const radii = [0.38, 0.76, 1.14, 1.52, 1.85]
  const sides = 5
  for (let i = 0; i < n; i++) {
    const ri  = Math.floor(Math.random() * radii.length)
    const r   = radii[ri]
    const seg = Math.floor(Math.random() * sides)
    const t   = Math.random()
    const a0  = (seg / sides) * Math.PI * 2 - Math.PI / 2
    const a1  = ((seg + 1) / sides) * Math.PI * 2 - Math.PI / 2
    p[i*3]   = (Math.cos(a0) * (1-t) + Math.cos(a1) * t) * r + (Math.random()-.5) * .06
    p[i*3+1] = (Math.sin(a0) * (1-t) + Math.sin(a1) * t) * r + (Math.random()-.5) * .06
    p[i*3+2] = (Math.random() - .5) * .14
  }
  return p
}

function genVenn(n: number): Float32Array {
  // Two overlapping circles (vendor comparison)
  const p = new Float32Array(n * 3)
  const cx = 0.62, r = 1.15
  for (let i = 0; i < n; i++) {
    const side  = Math.random() < .5 ? -1 : 1
    const angle = Math.random() * Math.PI * 2
    const rad   = r + (Math.random() - .5) * .12
    p[i*3]   = side * cx + Math.cos(angle) * rad
    p[i*3+1] = Math.sin(angle) * rad
    p[i*3+2] = (Math.random() - .5) * .14
  }
  return p
}

function genArrow(n: number): Float32Array {
  // Upward arrow (launch / rocket trajectory)
  const p = new Float32Array(n * 3)
  const shaftN = Math.floor(n * .42)
  let i = 0
  // Shaft
  for (; i < shaftN; i++) {
    p[i*3]   = (Math.random() - .5) * .5
    p[i*3+1] = -1.75 + Math.random() * 2.6
    p[i*3+2] = (Math.random() - .5) * .18
  }
  // Arrowhead (triangle)
  for (; i < n; i++) {
    const t   = Math.random()
    const maxW = (1 - t) * 1.25
    p[i*3]   = (Math.random() - .5) * maxW
    p[i*3+1] = 0.85 + t * 1.1
    p[i*3+2] = (Math.random() - .5) * .18
  }
  return p
}

function genShield(n: number): Float32Array {
  // Shield outline (quality guard)
  const p = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const t   = Math.random()  // 0=top … 1=bottom
    const y   = 1.7 - t * 3.4
    const maxW = t < .12
      ? 1.7 * (t / .12)
      : 1.7 * (1 - Math.pow((t - .12) / .88, .65))
    p[i*3]   = (Math.random() - .5) * maxW * 2
    p[i*3+1] = y + (Math.random() - .5) * .07
    p[i*3+2] = (Math.random() - .5) * .18
  }
  return p
}

function genBox(n: number): Float32Array {
  // Package / shipment box (isometric cube edges)
  const p = new Float32Array(n * 3)
  const s = 1.45, dz = 0.55
  // 12 edges: front-face (z=+dz), back-face (z=-dz), 4 depth edges
  type E = [[number,number,number],[number,number,number]]
  const edges: E[] = [
    [[-s,-s, dz],[ s,-s, dz]], [[ s,-s, dz],[ s, s, dz]],
    [[ s, s, dz],[-s, s, dz]], [[-s, s, dz],[-s,-s, dz]],
    [[-s,-s,-dz],[ s,-s,-dz]], [[ s,-s,-dz],[ s, s,-dz]],
    [[ s, s,-dz],[-s, s,-dz]], [[-s, s,-dz],[-s,-s,-dz]],
    [[-s,-s, dz],[-s,-s,-dz]], [[ s,-s, dz],[ s,-s,-dz]],
    [[ s, s, dz],[ s, s,-dz]], [[-s, s, dz],[-s, s,-dz]],
  ]
  const perE = Math.floor(n / edges.length)
  let i = 0
  for (const [a,b] of edges) {
    for (let k = 0; k < perE && i < n; k++, i++) {
      const t = Math.random()
      p[i*3]   = a[0] + (b[0]-a[0])*t + (Math.random()-.5)*.045
      p[i*3+1] = a[1] + (b[1]-a[1])*t + (Math.random()-.5)*.045
      p[i*3+2] = a[2] + (b[2]-a[2])*t + (Math.random()-.5)*.045
    }
  }
  while (i < n) {
    const [a,b] = edges[Math.floor(Math.random()*edges.length)]
    const t = Math.random()
    p[i*3] = a[0]+(b[0]-a[0])*t; p[i*3+1] = a[1]+(b[1]-a[1])*t; p[i*3+2] = a[2]+(b[2]-a[2])*t; i++
  }
  return p
}

function genPie(n: number): Float32Array {
  // Pie / donut chart segments (cost benchmark)
  const p = new Float32Array(n * 3)
  const segs = [.15, .24, .19, .30, .12]
  const rMin = 0.55, rMax = 1.8
  let start = -Math.PI / 2, i = 0
  for (const frac of segs) {
    const end = start + frac * Math.PI * 2
    const cnt = Math.round(n * frac)
    for (let k = 0; k < cnt && i < n; k++, i++) {
      const a = start + Math.random() * (end - start)
      const r = rMin + Math.random() * (rMax - rMin)
      p[i*3]   = Math.cos(a) * r
      p[i*3+1] = Math.sin(a) * r
      p[i*3+2] = (Math.random() - .5) * .15
    }
    start = end
  }
  while (i < n) {
    const a = Math.random() * Math.PI * 2
    const r = rMin + Math.random() * (rMax - rMin)
    p[i*3] = Math.cos(a)*r; p[i*3+1] = Math.sin(a)*r; i++
  }
  return p
}

const SHAPES: Record<string, (n: number) => Float32Array> = {
  bom:      genBom,
  process:  genBarChart,
  vave:     genStar,
  eval:     genRadar,
  nom:      genVenn,
  prod:     genArrow,
  quality:  genShield,
  delivery: genBox,
  bench:    genPie,
}

function smoothstep(t: number) { return t * t * (3 - 2 * t) }

// ── Component ─────────────────────────────────────────────────

export default function AiSphere({ className = '', burst = 0, moduleId }: Props) {
  const mountRef    = useRef<HTMLDivElement>(null)
  const burstRef    = useRef(burst)
  const moduleIdRef = useRef(moduleId)

  useEffect(() => { burstRef.current    = burst    }, [burst])
  useEffect(() => { moduleIdRef.current = moduleId }, [moduleId])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let mounted = true
    let rafId: number

    const w = mount.clientWidth  || 140
    const h = mount.clientHeight || 140

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, {
      position: 'absolute', inset: '0', width: '100%', height: '100%', cursor: 'grab',
    })

    // ── Outer particle shell ───────────────────────────────────
    const shellCount = 1600
    const shellBase   = new Float32Array(shellCount * 3)
    const shellWork   = new Float32Array(shellCount * 3)
    const shellOffset = new Float32Array(shellCount * 3).fill(0)
    const shellVel    = new Float32Array(shellCount * 3).fill(0)
    const shellPhi    = new Float32Array(shellCount)
    const shellColors = new Float32Array(shellCount * 3)

    for (let i = 0; i < shellCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1.9 + (Math.random() - .5) * .35
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      shellBase[i*3] = x; shellBase[i*3+1] = y; shellBase[i*3+2] = z
      shellWork[i*3] = x; shellWork[i*3+1] = y; shellWork[i*3+2] = z
      shellPhi[i] = phi / Math.PI
      const t2 = Math.random()
      shellColors[i*3]   = 0.07 + t2 * 0.22
      shellColors[i*3+1] = 0.65 + t2 * 0.18
      shellColors[i*3+2] = 0.72 + t2 * 0.17
    }

    const shellGeo = new THREE.BufferGeometry()
    shellGeo.setAttribute('position', new THREE.BufferAttribute(shellWork, 3))
    shellGeo.setAttribute('color',    new THREE.BufferAttribute(shellColors, 3))
    const shell = new THREE.Points(shellGeo,
      new THREE.PointsMaterial({ size: 0.065, vertexColors: true, transparent: true, opacity: 0.92 }))
    scene.add(shell)

    // ── Inner nebula ───────────────────────────────────────────
    const innerCount  = 600
    const innerBase   = new Float32Array(innerCount * 3)
    const innerWork   = new Float32Array(innerCount * 3)
    const innerOffset = new Float32Array(innerCount * 3).fill(0)
    const innerVel    = new Float32Array(innerCount * 3).fill(0)

    for (let i = 0; i < innerCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = Math.random() * 1.7
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      innerBase[i*3] = x; innerBase[i*3+1] = y; innerBase[i*3+2] = z
      innerWork[i*3] = x; innerWork[i*3+1] = y; innerWork[i*3+2] = z
    }

    const innerGeo = new THREE.BufferGeometry()
    innerGeo.setAttribute('position', new THREE.BufferAttribute(innerWork, 3))
    const inner = new THREE.Points(innerGeo,
      new THREE.PointsMaterial({ color: 0x0d9e8a, size: 0.040, transparent: true, opacity: 0.42 }))
    scene.add(inner)

    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x060f0f, transparent: true, opacity: 0.55 }),
    ))
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.95, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x48d2be, transparent: true, opacity: 0.04, side: THREE.BackSide }),
    ))

    // ── Drag interaction ───────────────────────────────────────
    let dragging = false
    let px = 0, py = 0
    let velX = 0, velY = 0
    let manRotX = 0, manRotY = 0

    const onDown = (x: number, y: number) => { dragging = true; px = x; py = y; renderer.domElement.style.cursor = 'grabbing' }
    const onMove = (x: number, y: number) => { if (!dragging) return; velX = (x-px)*.012; velY = (y-py)*.012; px = x; py = y }
    const onUp   = () => { dragging = false; renderer.domElement.style.cursor = 'grab' }

    const md = (e: MouseEvent)  => onDown(e.clientX, e.clientY)
    const mm = (e: MouseEvent)  => onMove(e.clientX, e.clientY)
    const ts = (e: TouchEvent)  => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY) }
    const tm = (e: TouchEvent)  => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY) }

    mount.addEventListener('mousedown', md)
    window.addEventListener('mousemove', mm)
    window.addEventListener('mouseup', onUp)
    mount.addEventListener('touchstart', ts, { passive: false })
    mount.addEventListener('touchmove',  tm, { passive: false })
    mount.addEventListener('touchend',   onUp)

    // ── Precompute all shapes ──────────────────────────────────
    const shapes: Record<string, Float32Array> = {}
    for (const [id, fn] of Object.entries(SHAPES)) shapes[id] = fn(shellCount)

    // ── Burst / morph state ────────────────────────────────────
    const SPRING_K = 0.09
    const DAMPING  = 0.86
    let lastBurst     = burstRef.current
    let lastModuleId  = moduleIdRef.current
    let wavePhase     = -1
    let morphT        = 0          // 0 = sphere, 1 = target shape
    let morphDelay    = 0          // frames to wait before morphing in
    let currentShape: Float32Array | null = null
    const kicked = new Uint8Array(shellCount)

    const fireWave = () => {
      wavePhase = 0
      kicked.fill(0)
      // Reset all offsets/velocities — prevents accumulation from rapid card changes
      shellVel.fill(0)
      shellOffset.fill(0)
      innerOffset.fill(0)
      innerVel.fill(0)
      // Inner nebula burst (all at once) — set, not +=
      for (let i = 0; i < innerCount; i++) {
        const j = i * 3
        const bx = innerBase[j], by = innerBase[j+1], bz = innerBase[j+2]
        const r  = Math.sqrt(bx*bx + by*by + bz*bz) || .001
        const s  = .3 + Math.random() * .25
        innerVel[j]   = bx/r * s
        innerVel[j+1] = by/r * s
        innerVel[j+2] = bz/r * s
      }
    }

    // ── Render loop ────────────────────────────────────────────
    let t = 0
    const tick = () => {
      if (!mounted) return
      rafId = requestAnimationFrame(tick)
      t += 0.004

      // Detect new burst
      if (burstRef.current !== lastBurst) {
        lastBurst = burstRef.current
        fireWave()
        morphT = 0
        morphDelay = 18
      }

      // Detect moduleId change → pick new target shape
      if (moduleIdRef.current !== lastModuleId) {
        lastModuleId = moduleIdRef.current
        morphT = 0
        morphDelay = 20 // wait for burst wave to peak first
        currentShape = lastModuleId ? (shapes[lastModuleId] ?? null) : null
      }

      // Wave sweep (north→south)
      if (wavePhase >= 0) {
        wavePhase += 0.038
        for (let i = 0; i < shellCount; i++) {
          if (!kicked[i] && shellPhi[i] <= wavePhase) {
            kicked[i] = 1
            const j = i * 3
            const bx = shellBase[j], by = shellBase[j+1], bz = shellBase[j+2]
            const r  = Math.sqrt(bx*bx + by*by + bz*bz) || 1
            const s  = .55 + Math.random() * .45
            shellVel[j]   = bx/r * s
            shellVel[j+1] = by/r * s
            shellVel[j+2] = bz/r * s
          }
        }
        if (wavePhase > 1.08) wavePhase = -1
      }

      // Morph delay countdown → then advance morphT toward 1
      if (morphDelay > 0) {
        morphDelay--
      } else if (currentShape && morphT < 1) {
        morphT = Math.min(1, morphT + 0.024)
      } else if (!currentShape && morphT > 0) {
        morphT = Math.max(0, morphT - 0.024)
      }

      const sT = smoothstep(morphT)
      const springFade = 1 - sT

      // Shell physics + morph
      for (let i = 0; i < shellCount; i++) {
        const j = i * 3
        shellVel[j]   = (shellVel[j]   - shellOffset[j]   * SPRING_K) * DAMPING
        shellVel[j+1] = (shellVel[j+1] - shellOffset[j+1] * SPRING_K) * DAMPING
        shellVel[j+2] = (shellVel[j+2] - shellOffset[j+2] * SPRING_K) * DAMPING
        shellOffset[j]   += shellVel[j]
        shellOffset[j+1] += shellVel[j+1]
        shellOffset[j+2] += shellVel[j+2]

        const bx = shellBase[j]   + shellOffset[j]   * springFade
        const by = shellBase[j+1] + shellOffset[j+1] * springFade
        const bz = shellBase[j+2] + shellOffset[j+2] * springFade

        if (currentShape && sT > 0) {
          shellWork[j]   = bx + (currentShape[j]   - shellBase[j])   * sT
          shellWork[j+1] = by + (currentShape[j+1] - shellBase[j+1]) * sT
          shellWork[j+2] = bz + (currentShape[j+2] - shellBase[j+2]) * sT
        } else {
          shellWork[j] = bx; shellWork[j+1] = by; shellWork[j+2] = bz
        }
      }
      shellGeo.attributes.position.needsUpdate = true

      // Inner physics + scale toward centre when morphed
      for (let i = 0; i < innerCount; i++) {
        const j = i * 3
        innerVel[j]   = (innerVel[j]   - innerOffset[j]   * SPRING_K) * DAMPING
        innerVel[j+1] = (innerVel[j+1] - innerOffset[j+1] * SPRING_K) * DAMPING
        innerVel[j+2] = (innerVel[j+2] - innerOffset[j+2] * SPRING_K) * DAMPING
        innerOffset[j]   += innerVel[j]
        innerOffset[j+1] += innerVel[j+1]
        innerOffset[j+2] += innerVel[j+2]
        const scale = 1 - sT * .55 // condense to glowing core when shape forms
        innerWork[j]   = (innerBase[j]   + innerOffset[j]   * springFade) * scale
        innerWork[j+1] = (innerBase[j+1] + innerOffset[j+1] * springFade) * scale
        innerWork[j+2] = (innerBase[j+2] + innerOffset[j+2] * springFade) * scale
      }
      innerGeo.attributes.position.needsUpdate = true

      if (!dragging) { velX *= 0.93; velY *= 0.93 }
      manRotY += velX
      manRotX += velY

      shell.rotation.y = t + manRotY
      shell.rotation.x = 0.1 + manRotX
      inner.rotation.y = -(t * 0.6) + manRotY * 0.8
      inner.rotation.z = t * 0.15

      renderer.render(scene, camera)
    }
    tick()

    const ro = new ResizeObserver(() => {
      if (!mount || !mounted) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    })
    ro.observe(mount)

    return () => {
      mounted = false
      cancelAnimationFrame(rafId)
      ro.disconnect()
      mount.removeEventListener('mousedown', md)
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('mouseup', onUp)
      mount.removeEventListener('touchstart', ts)
      mount.removeEventListener('touchmove', tm)
      mount.removeEventListener('touchend', onUp)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }}
    />
  )
}
