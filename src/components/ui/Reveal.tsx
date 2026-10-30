import type { ReactNode } from 'react'
import { m } from 'motion/react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

/** Fades content up once as it scrolls into view. */
export function Reveal({ children, delay = 0, className, y = 18 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
