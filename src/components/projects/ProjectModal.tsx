import { useEffect, useRef } from 'react'
import { m } from 'motion/react'
import { ArrowLeft, ArrowRight, Lock, X } from 'lucide-react'
import type { Project } from '../../types'
import { SocialIcon } from '../ui/SocialIcon'
import { ArchitectureDiagram } from './ArchitectureDiagram'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose, onPrev, onNext }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    scrollRef.current?.scrollTo({ top: 0 })
  }, [project.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const titleId = `project-${project.id}-title`

  return (
    <m.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-line-strong bg-bg-elev shadow-2xl sm:rounded-3xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0">
            <p className="font-mono text-xs text-accent">
              {project.context} · {project.category === 'professional' ? 'Professional work' : 'Personal project'}
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              {project.title}
            </h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="icon-btn shrink-0" aria-label="Close project details">
            <X className="size-4" aria-hidden />
          </button>
        </header>

        <div ref={scrollRef} className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <p className="text-base leading-relaxed text-muted sm:text-lg">{project.overview}</p>
            <div className="flex items-baseline gap-2 md:flex-col md:items-end md:gap-0 md:text-right">
              <span className="text-4xl font-semibold tracking-tight text-metric">{project.highlight.value}</span>
              <span className="text-sm text-subtle">{project.highlight.label}</span>
            </div>
          </div>

          <div className="mt-8">
            <SubHeading>Architecture</SubHeading>
            <ArchitectureDiagram architecture={project.architecture} />
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <SubHeading>Problem</SubHeading>
              <p className="text-sm leading-relaxed text-muted sm:text-base">{project.problem}</p>
            </div>
            <div>
              <SubHeading>My contribution</SubHeading>
              <ul className="space-y-2.5 text-sm leading-relaxed text-muted sm:text-base">
                {project.contribution.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <SubHeading>Engineering challenges</SubHeading>
            <div className="grid gap-3 md:grid-cols-3">
              {project.challenges.map((c, i) => (
                <div key={c.title} className="card p-5">
                  <p className="font-mono text-xs text-accent-2">0{i + 1}</p>
                  <p className="mt-2 font-medium">{c.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <SubHeading>Tech stack</SubHeading>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="tag !px-3 !py-1 !text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-8">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2">
              <SocialIcon kind="github" />
              View source on GitHub
            </a>
          ) : (
            <p className="flex items-center gap-2 text-xs text-subtle">
              <Lock className="size-3.5" aria-hidden />
              {project.category === 'professional' ? `Built at ${project.context}. The code is proprietary.` : 'Source code is not public yet.'}
            </p>
          )}
          <div className="flex gap-2">
            <button type="button" onClick={onPrev} className="btn-ghost !px-3.5 !py-2" aria-label="Previous project">
              <ArrowLeft className="size-4" aria-hidden />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button type="button" onClick={onNext} className="btn-ghost !px-3.5 !py-2" aria-label="Next project">
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </footer>
      </m.div>
    </m.div>
  )
}

function SubHeading({ children }: { children: string }) {
  return <h3 className="mb-3 font-mono text-xs tracking-[0.16em] text-subtle uppercase">{children}</h3>
}
