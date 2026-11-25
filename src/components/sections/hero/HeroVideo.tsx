'use client'

import { createContext, useContext, useState } from 'react'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { HERO_THUMB } from '@/lib/heroImage'

/**
 * Client islands for the (server-rendered) homepage hero. Only the "video open"
 * state lives on the client: the provider passes its server-rendered children
 * straight through, so the hero's copy, H1, CTA and background are not hydrated
 * as client code (PageSpeed mobile, Nov 2026: main-thread work delayed LCP).
 */
const HeroVideoContext = createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null)

export function HeroVideoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return <HeroVideoContext.Provider value={{ open, setOpen }}>{children}</HeroVideoContext.Provider>
}

function useHeroVideo() {
  const ctx = useContext(HeroVideoContext)
  if (!ctx) throw new Error('Hero video islands must be inside <HeroVideoProvider>')
  return ctx
}

export function WatchOverviewButton() {
  const { setOpen } = useHeroVideo()
  return (
    <button onClick={() => setOpen(true)} className="hds-btn-secondary flex-1 justify-center sm:flex-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.55 0.14 182)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="oklch(0.55 0.14 182)" stroke="none" />
      </svg>
      Watch Overview
    </button>
  )
}

export function HeroVideoThumbnail() {
  const { open, setOpen } = useHeroVideo()
  return (
    <HeroVideoDialog
      animationStyle="from-center"
      videoSrc="/videos/emithran-overview.mp4"
      thumbnailSrc={HERO_THUMB.src}
      thumbnailSrcSet={HERO_THUMB.srcSet}
      thumbnailSizes={HERO_THUMB.sizes}
      thumbnailWidth={HERO_THUMB.width}
      thumbnailHeight={HERO_THUMB.height}
      priority
      thumbnailAlt="Emithran platform preview"
      isOpen={open}
      onOpenChange={setOpen}
      className="[&_img]:rounded-none [&_img]:border-0 [&_img]:shadow-none"
    />
  )
}
