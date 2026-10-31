import { useRef, useState } from 'react'
import { AnimatePresence, m, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Briefcase, ChevronDown, Network } from 'lucide-react'
import { experience } from '../../data/experience'
import type { Workstream } from '../../types'
import { useProjectModal } from '../projects/projectModalContext'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Where I've been shipping."
      description="Four systems I built at Coschool.ai: the problem behind each one, what I built, and what changed as a result."
    >
      {experience.map((job) => (
        <Timeline key={job.company} job={job} />
      ))}
    </Section>
  )
}

function Timeline({ job }: { job: (typeof experience)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [open, setOpen] = useState(0)

  return (
    <div ref={ref} className="relative">
      <Reveal>
        <div className="card mb-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-surface-2 text-accent">
              <Briefcase className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                {job.role}{' '}
                <span className="text-muted">
                  ·{' '}
                  {job.companyUrl ? (
                    <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="text-fg underline-offset-4 hover:underline">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </span>
              </h3>
              <p className="mt-1 text-sm text-muted">{job.summary}</p>
            </div>
          </div>
          <p className="shrink-0 font-mono text-sm text-accent">
            <time>{job.start}</time> — <time>{job.end}</time>
          </p>
        </div>
      </Reveal>

      <div className="relative pl-8 sm:pl-12">
        <div aria-hidden className="absolute top-2 bottom-2 left-[11px] w-px bg-line sm:left-[19px]" />
        <m.div
          aria-hidden
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent sm:left-[19px]"
        />
        <ol className="space-y-5">
          {job.workstreams.map((ws, i) => (
            <WorkstreamItem key={ws.title} ws={ws} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ol>
      </div>
    </div>
  )
}

interface ItemProps {
  ws: Workstream
  index: number
  open: boolean
  onToggle: () => void
}

function WorkstreamItem({ ws, index, open, onToggle }: ItemProps) {
  const { openProject } = useProjectModal()
  const panelId = `ws-panel-${index}`

  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute top-6 -left-8 grid size-[23px] place-items-center rounded-full border bg-bg transition-colors sm:-left-12 sm:size-[39px] ${
          open ? 'border-accent' : 'border-line-strong'
        }`}
      >
        <span className={`size-2 rounded-full transition-colors sm:size-2.5 ${open ? 'bg-accent shadow-[0_0_12px_var(--accent)]' : 'bg-subtle'}`} />
      </span>

      <Reveal delay={index * 0.05}>
        <div className={`card overflow-hidden transition-colors ${open ? 'border-line-strong bg-surface-2' : 'hover:border-line-strong'}`}>
          <h4>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
            >
              <span className="min-w-0">
                <span className="block text-lg font-semibold tracking-tight sm:text-xl">{ws.title}</span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {ws.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-4">
                {ws.metric && (
                  <span className="hidden text-right sm:block">
                    <span className="block text-2xl font-semibold text-metric">{ws.metric.value}</span>
                    <span className="block max-w-[10rem] text-xs text-subtle">{ws.metric.label}</span>
                  </span>
                )}
                <ChevronDown className={`size-5 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
              </span>
            </button>
          </h4>

          <AnimatePresence initial={false}>
            {open && (
              <m.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid gap-6 border-t border-line p-5 sm:p-6 md:grid-cols-3">
                  {ws.metric && (
                    <p className="flex items-baseline gap-2 sm:hidden md:col-span-3">
                      <span className="text-2xl font-semibold text-metric">{ws.metric.value}</span>
                      <span className="text-sm text-subtle">{ws.metric.label}</span>
                    </p>
                  )}
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-accent-2 uppercase">The challenge</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{ws.challenge}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">What I built</p>
                    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
                      {ws.built.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-metric uppercase">Impact</p>
                    <p className="mt-2 text-sm leading-relaxed text-fg">{ws.impact}</p>
                    {ws.projectId && (
                      <button
                        type="button"
                        onClick={() => openProject(ws.projectId!)}
                        className="group mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent"
                      >
                        <Network className="size-4" aria-hidden />
                        View architecture
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </button>
                    )}
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </li>
  )
}
