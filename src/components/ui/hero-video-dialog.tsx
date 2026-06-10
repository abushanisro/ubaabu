"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
  /** Controlled open state - if provided, the component defers to the parent */
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
}

const LOCAL_VIDEO_RE = /\.(mp4|webm|ogg)(\?.*)?$/i

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  isOpen: externalIsOpen,
  onOpenChange,
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

  const selectedAnimation = animationVariants[animationStyle]
  const isLocal = LOCAL_VIDEO_RE.test(videoSrc)

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative cursor-pointer group"
        onClick={open}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
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

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={close}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video mx-4 md:mx-0"
            >
              <motion.button
                className="absolute top-3 right-3 z-10 text-white bg-black/50 hover:bg-black/70 ring-1 ring-white/20 backdrop-blur-md rounded-full p-1.5 transition-colors"
                onClick={close}
              >
                <XIcon className="size-5" />
              </motion.button>
              <div className="size-full border-2 border-white rounded-2xl overflow-hidden isolate z-[1] relative">
                {isLocal ? (
                  <video
                    src={videoSrc}
                    controls
                    autoPlay
                    className="size-full rounded-2xl object-cover"
                  />
                ) : (
                  <iframe
                    src={videoSrc}
                    className="size-full rounded-2xl"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
