/**
 * Page-wide mouse position, shared by every pointer-driven effect.
 *
 * One passive `pointermove` listener on window serves any number of subscribers, and
 * it is attached only while at least one subscriber exists. Subscribers are notified
 * synchronously and are expected to do their own rAF batching (browsers already align
 * pointermove to the frame rate), so a move never costs more than a few assignments.
 *
 * Only mouse and pen input count: on touch a "pointer" exists only mid-gesture, and
 * effects that chase it would jump around while the user scrolls.
 */

export type PointerState = {
  /** Viewport coordinates (clientX / clientY). */
  readonly x: number
  readonly y: number
  /** False until the first move, and after the pointer leaves the window. */
  readonly active: boolean
}

type Listener = (p: PointerState) => void

const state = { x: 0, y: 0, active: false }
const listeners = new Set<Listener>()

function emit() {
  for (const l of listeners) l(state)
}

function onMove(e: PointerEvent) {
  if (e.pointerType === 'touch') return
  state.x = e.clientX
  state.y = e.clientY
  state.active = true
  emit()
}

function onOut(e: MouseEvent) {
  // relatedTarget is null only when the pointer leaves the document itself.
  if (e.relatedTarget === null) deactivate()
}

function deactivate() {
  if (!state.active) return
  state.active = false
  emit()
}

function attach() {
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('mouseout', onOut, { passive: true })
  window.addEventListener('blur', deactivate)
}

function detach() {
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('mouseout', onOut)
  window.removeEventListener('blur', deactivate)
  state.active = false
}

export function getPointer(): PointerState {
  return state
}

/** Subscribe to pointer updates. Returns the unsubscribe function. */
export function subscribePointer(listener: Listener): () => void {
  if (listeners.size === 0) attach()
  listeners.add(listener)
  return () => {
    if (!listeners.delete(listener)) return
    if (listeners.size === 0) detach()
  }
}
