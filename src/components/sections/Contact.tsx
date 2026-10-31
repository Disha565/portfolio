import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react'
import { profile, resumeUrl } from '../../data/profile'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { handleSpotlight } from '../../hooks/useSpotlight'
import { Reveal } from '../ui/Reveal'
import { SocialIcon } from '../ui/SocialIcon'
import { ContactForm } from './ContactForm'

export function Contact() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 translate-y-1/3 rounded-full bg-accent/10 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3">
            <span className="text-subtle">06</span>
            <span className="h-px w-8 bg-accent/50" aria-hidden />
            Contact
          </p>
          <h2 id="contact-title" className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Let&apos;s build something that <span className="text-gradient font-serif font-normal italic">scales</span>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {profile.availability}. If you are hiring or want to talk about backend systems, data platforms or LLM
            applications, my inbox is open.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[1.45fr_1fr]">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-3">
            <div className="card p-5">
              <p className="font-mono text-xs tracking-wider text-subtle uppercase">Email me directly</p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg py-1 transition-colors hover:text-accent"
                >
                  <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                  <span className="truncate font-mono text-sm">{profile.email}</span>
                </a>
                <button type="button" onClick={() => copy(profile.email)} className="btn-ghost shrink-0 !rounded-lg !px-3 !py-1.5 !text-xs" aria-label="Copy email address">
                  {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {profile.socials.map((s) => (
                <li key={s.kind}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerMove={handleSpotlight}
                    className="spotlight card group flex items-center gap-3 p-4 transition-colors hover:border-line-strong"
                  >
                    <SocialIcon kind={s.kind} className="size-5 text-fg" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block truncate font-mono text-xs text-subtle">{s.handle}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={resumeUrl}
                  download
                  onPointerMove={handleSpotlight}
                  className="spotlight card group flex items-center gap-3 p-4 transition-colors hover:border-line-strong"
                >
                  <Download className="size-5 text-fg" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">Resume</span>
                    <span className="block font-mono text-xs text-subtle">PDF</span>
                  </span>
                  <ArrowUpRight className="size-4 rotate-90 text-subtle transition-colors group-hover:text-accent" aria-hidden />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
