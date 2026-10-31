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
        <Reveal delay={0.1} className="mx-auto w-full max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          {profile.photo && (
            <figure className="group relative overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_30px_80px_-45px_var(--accent-2)]">
              <img
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-16 text-white">
                <span>
                  <span className="block font-semibold tracking-tight">{profile.name}</span>
                  <span className="block font-mono text-xs text-white/70">{profile.roles.slice(1).join(' · ')}</span>
                </span>
                <span className="mb-1.5 size-2 shrink-0 rounded-full bg-[#5ee6c5] shadow-[0_0_12px_#5ee6c5]" aria-hidden />
              </figcaption>
            </figure>
          )}
          <div className="card mt-3 p-5">
            <p className="font-mono text-xs tracking-wider text-subtle uppercase">Currently</p>
            <p className="mt-2 text-fg">
              Software Developer at <span className="font-medium">Coschool.ai</span>
            </p>
            <p className="mt-1 text-sm text-muted">{profile.availability}.</p>
          </div>
        </Reveal>

        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:order-1 lg:col-span-7">
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
          <Reveal delay={0.25}>
            <dl className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="card flex flex-col justify-between gap-4 p-4">
                  <dt className="order-2 text-xs leading-snug text-muted sm:text-sm">{stat.label}</dt>
                  <dd className="order-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    <span className="text-gradient">{stat.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
