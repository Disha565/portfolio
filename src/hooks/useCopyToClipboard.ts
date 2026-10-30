import { useCallback, useEffect, useRef, useState } from 'react'

function legacyCopy(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const ok = document.execCommand('copy')
  textarea.remove()
  return ok
}

/** Copies text and exposes a `copied` flag that resets after `resetMs`. */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      let ok = false
      try {
        await navigator.clipboard.writeText(text)
        ok = true
      } catch {
        ok = legacyCopy(text)
      }
      if (!ok) return false
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), resetMs)
      return true
    },
    [resetMs],
  )

  return { copied, copy }
}
