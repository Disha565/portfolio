import { useCallback, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'

function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** The initial theme is applied by an inline script in index.html; this hook keeps it in sync. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
