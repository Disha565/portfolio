import { Calendar, MapPin, Star } from 'lucide-react'
import { achievements, education } from '../../data/education'
import { handleSpotlight } from '../../hooks/useSpotlight'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education & Achievements" title="Foundations in computer science and security.">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.institution} delay={i * 0.08}>
            <article className="card relative h-full overflow-hidden p-6 sm:p-7">
              <span aria-hidden className="absolute -top-6 -right-2 font-serif text-[7rem] leading-none text-fg/[0.04] italic select-none">
                {edu.degree}
              </span>
              <p className="font-mono text-xs tracking-wider text-accent uppercase">{edu.short}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {edu.degree} in {edu.field}
              </h3>
              <p className="mt-1 text-muted">{edu.institution}</p>
              <dl className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Dates</dt>
                  <Calendar className="size-4 text-subtle" aria-hidden />
                  <dd>
                    {edu.start} — {edu.end}
                  </dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Location</dt>
                  <MapPin className="size-4 text-subtle" aria-hidden />
                  <dd>{edu.location}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Grade</dt>
                  <Star className="size-4 text-subtle" aria-hidden />
                  <dd>{edu.grade}</dd>
                </div>
              </dl>
              {edu.note && <p className="mt-5 inline-flex rounded-full border border-metric/30 bg-metric/10 px-3 py-1 text-xs font-medium text-metric">{edu.note}</p>}
            </article>
          </Reveal>
        ))}
      </div>

      <h3 id="achievements" className="mt-16 mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-subtle uppercase">
        Achievements
        <span className="h-px flex-1 bg-line" aria-hidden />
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map(({ value, title, detail, icon: Icon }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.06} className="h-full">
              <div onPointerMove={handleSpotlight} className="spotlight card flex h-full flex-col p-6 transition-colors hover:border-line-strong">
                <Icon className="size-5 text-metric" aria-hidden />
                <p className="mt-6 text-3xl font-semibold tracking-tight">
                  <span className="text-gradient">{value}</span>
                </p>
                <p className="mt-1 font-medium">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{detail}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
