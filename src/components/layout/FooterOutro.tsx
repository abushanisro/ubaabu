'use client'
import { useEffect, useState } from 'react'

// Fixed "EMITHRAN" layer revealed behind the page as the footer scrolls away.
// It stays hidden until the spacer below the footer is within a viewport of the
// screen, so it can never show through other sections while scrolling.
export default function FooterOutro({ spacerId }: { spacerId: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const spacer = document.getElementById(spacerId)
    if (!spacer) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '100% 0px 100% 0px' },
    )
    io.observe(spacer)
    return () => io.disconnect()
  }, [spacerId])

  return (
    <div
      aria-hidden
      className="hidden md:flex fixed bottom-0 inset-x-0 h-screen overflow-hidden pointer-events-none"
      style={{
        zIndex: 0,
        visibility: visible ? 'visible' : 'hidden',
        backgroundImage: [
          'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 5px)',
          'linear-gradient(to bottom, #fff 0%, #b2f5ea 40%, #2dd4bf 100%)',
        ].join(', '),
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 text-center font-black select-none whitespace-nowrap"
        style={{
          fontSize: 'clamp(40px, 19.5vw, 260px)',
          color: '#0f1b2d',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '0.06em',
        }}
      >
        EMITHRAN
      </div>
    </div>
  )
}
