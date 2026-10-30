import { useEffect, useState } from 'react'
import { AnimatePresence, m, useScroll, useSpring } from 'motion/react'
import { ArrowUp } from 'lucide-react'

/** Thin reading-progress bar at the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
    />
  )
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          onClick={() => {
            window.scrollTo({ top: 0 })
            document.getElementById('main')?.focus({ preventScroll: true })
          }}
          className="icon-btn fixed right-4 bottom-4 z-40 size-11 bg-bg-elev/90 shadow-lg backdrop-blur sm:right-6 sm:bottom-6"
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" aria-hidden />
        </m.button>
      )}
    </AnimatePresence>
  )
}
