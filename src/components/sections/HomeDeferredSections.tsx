'use client'

import { lazy, Suspense, type ComponentType } from 'react'

/**
 * Progressive hydration for the homepage's heavy, interactive sections.
 *
 * Each section is still rendered on the server (the full HTML is in the page for
 * visitors and crawlers). On the client, its JavaScript is only fetched and hydrated
 * when the visitor scrolls near it: the lazy loader waits for an IntersectionObserver
 * on the section's wrapper. Until then React keeps the server HTML in place as a
 * dehydrated Suspense boundary, so nothing changes visually.
 *
 * PageSpeed mobile (Nov 2026): hydrating every section up front kept the main thread
 * busy and delayed the hero LCP paint.
 */
// Resolves once the visitor has started using the page (scroll, touch, pointer or
// key) or immediately if it loaded already scrolled (e.g. an anchor link). Nothing
// below the hero is visible at load, so no section hydrates during initial load.
let interacted: Promise<void> | null = null
function afterFirstInteraction(): Promise<void> {
  if (interacted) return interacted
  interacted = new Promise((resolve) => {
    if (window.scrollY > 0 || window.location.hash) return resolve()
    const events = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const
    const done = () => {
      events.forEach((e) => window.removeEventListener(e, done))
      resolve()
    }
    events.forEach((e) => window.addEventListener(e, done, { passive: true, once: true }))
  })
  return interacted
}

function whenNearViewport(id: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve() // server: render immediately
  return afterFirstInteraction().then(
    () =>
      new Promise<void>((resolve) => {
        const el = document.getElementById(id)
        if (!el || typeof IntersectionObserver === 'undefined') return resolve()
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io.disconnect()
              resolve()
            }
          },
          { rootMargin: '600px 0px' },
        )
        io.observe(el)
      }),
  )
}

function deferred(id: string, load: () => Promise<{ default: ComponentType }>) {
  const Lazy = lazy(() => whenNearViewport(id).then(load))
  function DeferredHydration() {
    return (
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    )
  }
  return DeferredHydration
}

export const PlatformShowcase = deferred('home-platform', () => import('./PlatformShowcase'))
export const StatsSection = deferred('home-stats', () => import('./StatsSection'))
export const ProductIntelligence = deferred('home-product', () => import('./ProductIntelligence'))
export const WatchDemo = deferred('home-watch', () => import('./WatchDemo'))
export const CaseStudies = deferred('home-cases', () => import('./CaseStudies'))
export const EnterpriseSection = deferred('home-enterprise', () => import('./EnterpriseSection'))
