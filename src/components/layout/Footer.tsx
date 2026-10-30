import { profile } from '../../data/profile'
import { SocialIcon } from '../ui/SocialIcon'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-subtle sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind CSS and Motion.
        </p>
        <ul className="flex items-center gap-2">
          {profile.socials.map((s) => (
            <li key={s.kind}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn size-9"
                aria-label={`${s.label} (opens in a new tab)`}
              >
                <SocialIcon kind={s.kind} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
