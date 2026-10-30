import { m } from 'motion/react'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { profile, resumeUrl } from '../../data/profile'
import { SocialIcon } from '../ui/SocialIcon'
import { SystemGraph } from './SystemGraph'

const ease = [0.22, 1, 0.36, 1] as const

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24">
      {/* Backdrop: masked grid with two soft colour fields. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent-2/15 blur-[120px]" />
        <div className="absolute top-40 -right-40 h-[380px] w-[480px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8">
        <div>
          <m.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" aria-hidden />
            Software Developer at Coschool.ai
          </m.p>

          <m.h1 {...rise(0.08)} className="mt-7 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl lg:text-[5.25rem] lg:leading-[0.95]">
            {profile.name}
          </m.h1>

          <m.p {...rise(0.14)} className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide text-accent uppercase sm:text-sm">
            {profile.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 && <span className="text-subtle" aria-hidden>/</span>}
                {role}
              </span>
            ))}
          </m.p>

          <m.p {...rise(0.2)} className="mt-6 max-w-xl text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
            {profile.headline.lead} &amp;{' '}
            <span className="text-gradient font-serif text-[1.15em] font-normal italic">{profile.headline.accent}</span>{' '}
            {profile.headline.tail}
          </m.p>

          <m.p {...rise(0.26)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </m.p>

          <m.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary group">
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a href={resumeUrl} download className="btn-ghost">
              <Download className="size-4" aria-hidden />
              Download Resume
            </a>
            <a href="#contact" className="btn-ghost">
              <Mail className="size-4" aria-hidden />
              Contact Me
            </a>
          </m.div>

          <m.ul {...rise(0.38)} className="mt-7 flex items-center gap-2" aria-label="Profiles">
            {profile.socials.map((s) => (
              <li key={s.kind}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label={`${s.label} (opens in a new tab)`}
                  title={s.label}
                >
                  <SocialIcon kind={s.kind} />
                </a>
              </li>
            ))}
          </m.ul>
        </div>

        <m.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <SystemGraph />
        </m.div>
      </div>
    </section>
  )
}
