'use client'

import { useEffect, useState, type ComponentType, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import TargetCostCalculator from './TargetCostCalculator'
import BuildVsBuyCalculator from './BuildVsBuyCalculator'

/**
 * Interactive widgets embedded in article HTML. A post's content places
 * <div data-blog-widget="name">fallback text</div>; on the client the fallback
 * is replaced by the matching React component (rendered via a portal).
 */
const WIDGETS: Record<string, ComponentType> = {
  'target-cost-calculator': TargetCostCalculator,
  'build-vs-buy-tco': BuildVsBuyCalculator,
}

export default function BlogWidgets({ contentRef, html }: { contentRef: RefObject<HTMLDivElement | null>; html: string }) {
  const [mounts, setMounts] = useState<{ el: HTMLElement; Widget: ComponentType }[]>([])

  useEffect(() => {
    const root = contentRef.current
    if (!root) return
    const found: { el: HTMLElement; Widget: ComponentType }[] = []
    root.querySelectorAll<HTMLElement>('[data-blog-widget]').forEach(el => {
      const Widget = WIDGETS[el.dataset.blogWidget ?? '']
      if (!Widget) return
      el.replaceChildren()
      found.push({ el, Widget })
    })
    setMounts(found)
  }, [contentRef, html])

  return <>{mounts.map(({ el, Widget }, i) => createPortal(<Widget />, el, String(i)))}</>
}
