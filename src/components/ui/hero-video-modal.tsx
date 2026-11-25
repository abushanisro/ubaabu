"use client"

import { AnimatePresence, motion } from "framer-motion"
import { XIcon } from "lucide-react"

/**
 * The video overlay for HeroVideoDialog. Split into its own chunk and loaded only
 * when the viewer first opens the video, so framer-motion and the <video> element
 * stay out of the homepage's initial JavaScript (SEO audit Nov 2026, issue #04).
 */
export type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

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

export default function HeroVideoModal({
  isVideoOpen,
  close,
  videoSrc,
  animationStyle = "from-center",
}: {
  isVideoOpen: boolean
  close: () => void
  videoSrc: string
  animationStyle?: AnimationStyle
}) {
  const selectedAnimation = animationVariants[animationStyle]
  const isLocal = LOCAL_VIDEO_RE.test(videoSrc)
  return (
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
              className="relative w-full max-w-4xl mx-3 sm:mx-6 md:mx-0"
              style={{ aspectRatio: '16/9' }}
            >
              <motion.button
                className="absolute -top-10 right-0 z-10 text-white bg-black/50 hover:bg-black/70 ring-1 ring-white/20 backdrop-blur-md rounded-full p-1.5 transition-colors"
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
                    playsInline
                    className="size-full rounded-2xl object-cover"
                    style={{ WebkitPlaysinline: true } as React.CSSProperties}
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
  )
}
