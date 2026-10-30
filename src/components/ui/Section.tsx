import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, index, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-3xl sm:mb-16">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-subtle">{index}</span>
            <span className="h-px w-8 bg-accent/50" aria-hidden />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
