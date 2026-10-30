import { GraduationCap } from 'lucide-react'
import { coursework, skillGroups } from '../../data/skills'
import { handleSpotlight } from '../../hooks/useSpotlight'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Technical Skills"
      title="The toolbox."
      description="What I use to build services, move data and ship AI features to production."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map(({ title, icon: Icon, skills }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.06}>
            <div onPointerMove={handleSpotlight} className="spotlight card h-full p-6 transition-colors hover:border-line-strong">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-surface-2 text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-semibold tracking-tight">{title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-line bg-bg/40 px-3 py-1.5 text-sm text-fg/90 transition-colors hover:border-accent/50 hover:text-fg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <span className="flex shrink-0 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-surface-2 text-accent-2">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <h3 className="font-semibold tracking-tight">Foundations</h3>
          </span>
          <ul className="flex flex-wrap gap-2 sm:ml-4">
            {coursework.map((c) => (
              <li key={c} className="tag !text-xs">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
