"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Play } from "lucide-react"
import type { AnimationStyle } from "./hero-video-modal"

// Loaded on first open only (keeps framer-motion out of the initial bundle).
const HeroVideoModal = dynamic(() => import("./hero-video-modal"), { ssr: false })

import { cn } from "@/lib/utils"

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
  /** Controlled open state - if provided, the component defers to the parent */
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Above-the-fold thumbnail (LCP candidate): fetch eagerly at high priority */
  priority?: boolean
  /** Responsive thumbnail sources; width/height are the intrinsic size (aspect ratio). */
  thumbnailSrcSet?: string
  thumbnailSizes?: string
  thumbnailWidth?: number
  thumbnailHeight?: number
}



function useHasOpened(open: boolean) {
  // "Adjust state while rendering" pattern: remember that the modal has been opened once.
  const [opened, setOpened] = useState(open)
  if (open && !opened) setOpened(true)
  return opened || open
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  isOpen: externalIsOpen,
  onOpenChange,
  priority = false,
  thumbnailSrcSet,
  thumbnailSizes,
  thumbnailWidth = 1920,
  thumbnailHeight = 1080,
}: HeroVideoProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const controlled = externalIsOpen !== undefined
  const isVideoOpen = controlled ? externalIsOpen : internalOpen

  const open = () => {
    if (controlled) onOpenChange?.(true)
    else setInternalOpen(true)
  }
  const close = () => {
    if (controlled) onOpenChange?.(false)
    else setInternalOpen(false)
  }

  // Mount the (lazy) modal once the video has been opened at least once, then keep it
  // mounted so its exit animation can run.
  const hasOpened = useHasOpened(isVideoOpen)

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative cursor-pointer group"
        onClick={open}
      >
        <img
          src={thumbnailSrc}
          srcSet={thumbnailSrcSet}
          sizes={thumbnailSrcSet ? thumbnailSizes : undefined}
          alt={thumbnailAlt}
          width={thumbnailWidth}
          height={thumbnailHeight}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border"
        />
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
          <div className="flex items-center justify-center rounded-full backdrop-blur-md size-28"
               style={{ background: 'rgba(72,210,190,0.15)' }}>
            <div className="flex items-center justify-center rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100"
                 style={{ background: 'linear-gradient(135deg, oklch(0.78 0.13 175), oklch(0.55 0.16 185))', boxShadow: '0 8px 40px oklch(0.68 0.13 180 / 0.55)' }}>
              <Play
                className="size-8 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {hasOpened && (
        <HeroVideoModal isVideoOpen={isVideoOpen} close={close} videoSrc={videoSrc} animationStyle={animationStyle} />
      )}
    </div>
  )
}
