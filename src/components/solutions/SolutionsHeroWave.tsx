'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  className?: string
}

export default function SolutionsHeroWave({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Scene & Camera ───────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const aspect = container.offsetWidth / container.offsetHeight
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100)
    camera.position.set(0, 0.3, 3.2)
    camera.lookAt(0.3, -0.1, 0)

    // ── Lights ───────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0x2dd4bf, 2.2)
    keyLight.position.set(2, 3, 2)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6)
    fillLight.position.set(-3, 1, 1)
    scene.add(fillLight)

    const shimmer = new THREE.PointLight(0x99f6e4, 1.2, 8)
    shimmer.position.set(0, 2, 1)
    scene.add(shimmer)

    // ── Geometry ─────────────────────────────────────────────────────────────
    const geometry = new THREE.PlaneGeometry(5, 3, 120, 72)

    // Store original x/y to avoid drift during vertex animation
    const posAttr  = geometry.attributes.position
    const origXY   = new Float32Array(posAttr.count * 2)
    for (let i = 0; i < posAttr.count; i++) {
      origXY[i * 2]     = posAttr.getX(i)
      origXY[i * 2 + 1] = posAttr.getY(i)
    }

    // ── Material ─────────────────────────────────────────────────────────────
    const material = new THREE.MeshPhongMaterial({
      color:     new THREE.Color('#0a8f7e'),
      specular:  new THREE.Color('#99f6e4'),
      shininess: 130,
      side:      THREE.DoubleSide,
    })

    // ── Mesh ─────────────────────────────────────────────────────────────────
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -0.35
    mesh.rotation.z =  0.18
    mesh.position.y = -0.1
    scene.add(mesh)

    // ── Animation loop ───────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let rafId   = 0

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      const t = clock.getElapsedTime()

      for (let i = 0; i < posAttr.count; i++) {
        const x = origXY[i * 2]
        const y = origXY[i * 2 + 1]
        const z =
          Math.sin(x * 1.6 + t * 0.9)        * 0.14
        + Math.sin(y * 2.2 + t * 0.7)        * 0.10
        + Math.sin((x + y) * 1.3 + t * 1.1)  * 0.07
        + Math.sin(x * 0.8 - t * 0.5)        * 0.06
        posAttr.setZ(i, z)
      }
      posAttr.needsUpdate = true
      geometry.computeVertexNormals()

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ───────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(container)

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className={className} />
}
