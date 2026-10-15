'use client'
import { useEffect } from 'react'

// Pages using <DeferredSection> (content-visibility: auto) lay out placeholder
// heights for off-screen sections, and those sections take their real size as
// a scroll passes through them. That can throw off anchor scrolling (#hash on
// load, or a same-page #link). While sizes settle, keep re-targeting the anchor,
// then stop - and stop at once if the user scrolls or types themselves.
export default function HashAnchorFix() {
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    let cleanup: (() => void) | null = null

    const anchorTo = (id: string, behavior: ScrollBehavior) => {
      const target = document.getElementById(id)
      if (!target) return
      cleanup?.()
      const realign = () => target.scrollIntoView({ behavior, block: 'start' })
      const ro = new ResizeObserver(realign)
      ro.observe(main)
      // Done once a scroll has ended with the target where scroll-padding puts it
      const onScrollEnd = () => {
        const want = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
        if (Math.abs(target.getBoundingClientRect().top - want) <= 2) stop()
        else realign()
      }
      const stop = () => {
        ro.disconnect()
        clearTimeout(timer)
        window.removeEventListener('scrollend', onScrollEnd)
        window.removeEventListener('wheel', stop)
        window.removeEventListener('touchstart', stop)
        window.removeEventListener('keydown', stop)
        cleanup = null
      }
      // Hard cap (also the fallback where `scrollend` is unsupported)
      const timer = setTimeout(stop, 5000)
      window.addEventListener('scrollend', onScrollEnd)
      window.addEventListener('wheel', stop, { passive: true })
      window.addEventListener('touchstart', stop, { passive: true })
      window.addEventListener('keydown', stop)
      cleanup = stop
    }

    const initial = decodeURIComponent(window.location.hash.slice(1))
    if (initial) {
      anchorTo(initial, 'instant')
      document.getElementById(initial)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }

    // Same-page #links: the browser starts the (smooth) scroll; we keep it on target.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      const id = a?.getAttribute('href')?.slice(1)
      if (id) anchorTo(decodeURIComponent(id), 'smooth')
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cleanup?.()
    }
  }, [])

  return null
}
