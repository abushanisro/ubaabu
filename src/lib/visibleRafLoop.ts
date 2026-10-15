// Runs `frame` on every animation frame, but only while `el` is near the
// viewport and the tab is visible. Decorative canvas loops otherwise keep
// burning main-thread time off-screen (hurting TBT/INP).
// Returns a cleanup function.
export function visibleRafLoop(
  el: Element,
  frame: (time: number) => void,
  rootMargin = '100px',
): () => void {
  let raf = 0
  let onScreen = false

  const tick = (time: number) => {
    frame(time)
    raf = requestAnimationFrame(tick)
  }

  const sync = () => {
    const run = onScreen && !document.hidden
    if (run && !raf) raf = requestAnimationFrame(tick)
    else if (!run && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    },
    { rootMargin },
  )
  io.observe(el)
  document.addEventListener('visibilitychange', sync)

  return () => {
    io.disconnect()
    document.removeEventListener('visibilitychange', sync)
    cancelAnimationFrame(raf)
    raf = 0
  }
}
