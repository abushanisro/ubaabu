'use client'

import { useEffect, useState, type RefObject } from 'react'

/**
 * True once the element has come within `margin` of the viewport (then stays true).
 * Native IntersectionObserver replacement for framer-motion's `useInView({ once: true })`,
 * so components that only need visibility don't pull framer-motion into the bundle.
 */
export function useInViewOnce(ref: RefObject<Element | null>, margin = '0px'): boolean {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin, inView])
  return inView
}
