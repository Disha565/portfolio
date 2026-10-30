import { ArrowUpRight } from 'lucide-react'
import { handleSpotlight } from '../../hooks/useSpotlight'
import type { Project } from '../../types'
import { SocialIcon } from '../ui/SocialIcon'
import { MiniDiagram } from './MiniDiagram'
import { useProjectModal } from './projectModalContext'

const MAX_TAGS = 4

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { openProject } = useProjectModal()
  const extra = project.stack.length - MAX_TAGS

  return (
    <article
      onPointerMove={handleSpotlight}
      className="spotlight card group flex h-full flex-col overflow-hidden transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-line-strong"
    >
      <div className="relative h-40 border-b border-line bg-surface p-4">
        <div className="absolute inset-0 bg-grid [background-size:20px_20px] opacity-70" aria-hidden />
        <div className="relative h-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">
          <MiniDiagram architecture={project.architecture} />
        </div>
        <span className="absolute top-3 left-4 font-mono text-xs text-subtle">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] tracking-wider text-accent uppercase">{project.context}</p>
        <h3 className="mt-2 text-lg leading-snug font-semibold tracking-tight">
          <button
            type="button"
            onClick={() => openProject(project.id)}
            className="text-left after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:outline-none"
            aria-haspopup="dialog"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <p className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-metric">{project.highlight.value}</span>
          <span className="text-xs text-subtle">{project.highlight.label}</span>
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.slice(0, MAX_TAGS).map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
          {extra > 0 && <li className="tag">+{extra}</li>}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
            Architecture & details
            <ArrowUpRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn relative z-10 size-8"
              aria-label={`${project.title} source on GitHub (opens in a new tab)`}
              title="Source on GitHub"
            >
              <SocialIcon kind="github" className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
