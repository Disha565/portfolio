import type { PointerEvent } from 'react'

/** Pointer handler for `.spotlight` cards: feeds the cursor position into CSS variables. */
export function handleSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}
