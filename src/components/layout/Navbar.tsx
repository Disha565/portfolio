import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { profile, resumeUrl } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useTheme } from '../../hooks/useTheme'

const sectionIds = navItems.map((item) => item.id)

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pendingTarget, setPendingTarget] = useState<string | null>(null)
  useScrollLock(open)

  // Scroll only after the menu has closed and the scroll lock has been released.
  useEffect(() => {
    if (open || !pendingTarget) return
    document.getElementById(pendingTarget)?.scrollIntoView()
    history.replaceState(null, '', `#${pendingTarget}`)
    setPendingTarget(null)
  }, [open, pendingTarget])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const ThemeIcon = theme === 'dark' ? Sun : Moon
  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
          <span className="relative grid size-9 place-items-center rounded-xl border border-line-strong bg-surface-2 font-mono text-sm font-semibold">
            <span className="text-gradient">{profile.initials}</span>
          </span>
          <span className="hidden font-mono text-sm text-muted transition-colors group-hover:text-fg sm:inline">
            disha<span className="text-accent">.</span>jain
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative isolate rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-2"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="icon-btn size-9"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <ThemeIcon className="size-4" aria-hidden />
          </button>
          <a href={resumeUrl} download className="btn-primary hidden !px-4 !py-2 sm:inline-flex">
            <Download className="size-4" aria-hidden />
            Resume
          </a>
          <button
            type="button"
            className="icon-btn size-9 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pt-6">
              {navItems.map((item, i) => (
                <m.li key={item.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setPendingTarget(item.id)
                      setOpen(false)
                    }}
                    className={`flex items-baseline gap-4 rounded-xl px-3 py-3.5 text-2xl font-medium tracking-tight ${
                      active === item.id ? 'text-fg' : 'text-muted'
                    }`}
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {item.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="mt-6 px-7">
              <a href={resumeUrl} download className="btn-primary w-full" onClick={() => setOpen(false)}>
                <Download className="size-4" aria-hidden />
                Download Resume
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
