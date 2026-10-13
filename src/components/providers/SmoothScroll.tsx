'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Lenis only smooths the native window scroll - the DOM, URLs and content
// stay exactly as rendered, so crawlers and no-JS visitors are unaffected.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      // In-page #anchor links scroll smoothly, offset for the fixed navbar
      anchors: { offset: -80 },
      // Pauses while a modal sets overflow:hidden on <html>/<body>
      autoToggle: true,
      // Scrollable panels (modals, chat, dropdowns) keep their own native scroll
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    })

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
