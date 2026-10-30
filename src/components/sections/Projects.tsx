import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { moreWork, projects } from '../../data/projects'
import type { ProjectCategory } from '../../types'
import { ProjectCard } from '../projects/ProjectCard'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SocialIcon } from '../ui/SocialIcon'

type Filter = 'all' | ProjectCategory

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'professional', label: 'Professional' },
  { id: 'personal', label: 'Personal' },
]

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Featured Projects"
      title="Systems, not just screens."
      description="Each project opens into an interactive architecture diagram: select any component to see what it does and how data moves through it."
    >
      <Reveal className="mb-8 flex">
        <div role="group" aria-label="Filter projects" className="inline-flex rounded-full border border-line bg-surface p-1">
          {filters.map((f) => {
            const count = f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length
            const isActive = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={isActive}
                className={`relative isolate rounded-full px-4 py-1.5 text-sm transition-colors ${isActive ? 'text-fg' : 'text-muted hover:text-fg'}`}
              >
                {isActive && (
                  <m.span layoutId="project-filter" className="absolute inset-0 -z-10 rounded-full bg-surface-2 ring-1 ring-line-strong" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                {f.label} <span className="font-mono text-xs text-subtle">{count}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <m.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <m.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <Reveal className="mt-14">
        <div className="flex items-center gap-3">
          <SocialIcon kind="github" className="size-4 text-muted" />
          <h3 className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">More on GitHub</h3>
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {moreWork.map((w) => (
            <li key={w.title}>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-5 transition-colors hover:border-line-strong hover:bg-surface-2"
              >
                <span className="flex items-center justify-between gap-2 font-medium">
                  {w.title}
                  <ArrowUpRight className="size-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden />
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.description}</span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
