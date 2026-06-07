'use client'

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react'

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ')

export interface GalleryItem {
  label: string
  sub: string
  photo: {
    url: string
    text: string
    pos?: string
  }
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[]
  radius?: number
  autoRotateSpeed?: number
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 320, autoRotateSpeed = 0.015, ...props }, ref) => {
    const [rotation, setRotation] = useState(0)
    const [cardSize, setCardSize] = useState({ w: 270, h: 360, r: radius })
    const isDragging = useRef(false)
    const dragStartX = useRef(0)
    const dragStartRotation = useRef(0)
    const animationFrameRef = useRef<number | null>(null)

    useEffect(() => {
      const update = () => {
        const vw = window.innerWidth
        if (vw < 480) {
          setCardSize({ w: 180, h: 240, r: 140 })
        } else if (vw < 768) {
          setCardSize({ w: 220, h: 290, r: 180 })
        } else if (vw < 1024) {
          setCardSize({ w: 240, h: 320, r: 200 })
        } else {
          setCardSize({ w: 270, h: 360, r: radius })
        }
      }
      update()
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }, [radius])

    useEffect(() => {
      const autoRotate = () => {
        if (!isDragging.current) setRotation(prev => prev + autoRotateSpeed)
        animationFrameRef.current = requestAnimationFrame(autoRotate)
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate)
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      }
    }, [autoRotateSpeed])

    const onDragStart = (clientX: number) => {
      isDragging.current = true
      dragStartX.current = clientX
      dragStartRotation.current = rotation
    }

    const onDragMove = (clientX: number) => {
      if (!isDragging.current) return
      const delta = clientX - dragStartX.current
      setRotation(dragStartRotation.current + delta * 0.3)
    }

    const onDragEnd = () => {
      isDragging.current = false
    }

    useEffect(() => {
      const el = (ref as React.RefObject<HTMLDivElement>)?.current
      if (!el) return
      const handler = (e: TouchEvent) => { if (isDragging.current) e.preventDefault() }
      el.addEventListener('touchmove', handler, { passive: false })
      return () => el.removeEventListener('touchmove', handler)
    }, [ref])

    const anglePerItem = 360 / items.length

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Solution cards gallery"
        className={cn('relative w-full h-full flex items-center justify-center', className)}
        style={{ perspective: '1800px', cursor: isDragging.current ? 'grabbing' : 'grab', userSelect: 'none' }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); onDragMove(e.touches[0].clientX) }}
        onTouchEnd={onDragEnd}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem
            const totalRotation = rotation % 360
            const relativeAngle = (itemAngle + totalRotation + 360) % 360
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)
            const opacity = Math.max(0.25, 1 - normalizedAngle / 180)

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.label}
                className="absolute"
                style={{
                  width: cardSize.w,
                  height: cardSize.h,
                  transform: `rotateY(${itemAngle}deg) translateZ(${cardSize.r}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -cardSize.w / 2,
                  marginTop: -cardSize.h / 2,
                  opacity,
                  transition: 'opacity 0.3s linear',
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden"
                  style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos ?? 'center top' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full px-4 py-3"
                    style={{ background: 'linear-gradient(to top, rgba(15,27,45,0.85), transparent)' }}>
                    <p className="text-white text-[13px] font-semibold leading-tight">{item.label}</p>
                    <p className="text-white/60 text-[10px] mt-0.5">{item.sub}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

CircularGallery.displayName = 'CircularGallery'
export { CircularGallery }
