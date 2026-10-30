import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const focus = ['Backend engineering', 'Distributed systems', 'Data-heavy APIs', 'Analytics at scale', 'LLM agents & RAG']

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Backend engineer focused on the parts users never see, but <span className="text-gradient">always feel</span>.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-span-7">
          {profile.about.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <ul className="flex flex-wrap gap-2 pt-3" aria-label="Focus areas">
              {focus.map((f) => (
                <li key={f} className="tag !text-xs">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-3">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="card flex flex-col justify-between gap-6 p-5">
                <dt className="order-2 text-sm leading-snug text-muted">{stat.label}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                  <span className="text-gradient">{stat.value}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="card mt-3 p-5">
            <p className="font-mono text-xs tracking-wider text-subtle uppercase">Currently</p>
            <p className="mt-2 text-fg">
              Software Developer at <span className="font-medium">Coschool.ai</span>
            </p>
            <p className="mt-1 text-sm text-muted">{profile.availability}.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
