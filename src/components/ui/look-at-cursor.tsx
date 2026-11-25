'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useLookAtPointer, type LookAtOptions } from '@/hooks/useLookAtPointer'

/**
 * Wrapper that exposes `--look-x` / `--look-y` (-1..1, toward the mouse) to its
 * subtree. Children stay server-rendered; style them with CSS transforms that read
 * the variables (see `.robot-rig` in globals.css for an example).
 */
export function LookAtCursor({
  children,
  className,
  style,
  ...opts
}: LookAtOptions & { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useLookAtPointer(ref, opts)
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
