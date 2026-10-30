# Disha Jain — Portfolio

Personal portfolio of **Disha Jain**, Software Engineer (Backend Systems · Distributed Systems · AI Engineering).

**Live:** https://disha565.github.io/portfolio/

Built with React, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide icons. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Features

- Dark-first design with a light-mode toggle (remembered per browser, applied before first paint)
- Animated hero "system graph" and a log ticker summarising real work
- Experience timeline that draws as you scroll, with expandable challenge / built / impact panels
- Six project cards with filters, each opening a detail modal with an **interactive architecture diagram**: select a component to highlight its connections and read what it does
- Categorised skills, education, achievements and a contact section with copy-to-clipboard email
- Resume download, sticky nav with active-section highlighting, mobile menu, back-to-top button, scroll progress bar
- SEO: meta description, canonical URL, Open Graph / Twitter cards with a 1200×630 preview image, JSON-LD `Person` schema, `robots.txt`, `sitemap.xml`
- Accessibility: skip link, semantic landmarks and headings, keyboard-operable diagrams, focus-trapped modal (Esc to close, focus restored), `prefers-reduced-motion` respected throughout

## Getting started

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173/portfolio/
```

## Project structure

```
src/
├── data/                 # ← all content lives here
│   ├── profile.ts        # name, intro, about, stats, email, social links, resume file
│   ├── experience.ts     # roles and workstreams for the timeline
│   ├── projects.ts       # projects, architecture diagrams, "More on GitHub"
│   ├── skills.ts         # skill groups and coursework
│   ├── education.ts      # degrees and achievements
│   └── navigation.ts     # nav items (ids must match section ids)
├── components/
│   ├── layout/           # Navbar, Footer, scroll progress, back-to-top
│   ├── sections/         # Hero, About, Experience, Projects, Skills, Education, Contact
│   ├── projects/         # ProjectCard, ProjectModal (lazy-loaded), ArchitectureDiagram, MiniDiagram
│   └── ui/               # Section, Reveal, SocialIcon
├── hooks/                # theme, active section, clipboard, scroll lock, card spotlight
├── lib/diagram.ts        # diagram geometry (node size, edge routing)
├── types.ts              # content types
└── index.css             # design tokens (light + dark) and Tailwind setup
public/
├── Disha_Jain_Resume.pdf # downloadable resume (phone number removed)
├── og-image.png          # social preview
├── favicon.svg, robots.txt, sitemap.xml, 404.html
```

## Customising content

Everything visible on the site comes from `src/data/`. You should not need to touch components to update content.

- **Links and contact:** `profile.ts` → `email`, `socials`.
- **Resume:** replace `public/Disha_Jain_Resume.pdf`. If the file name changes, update `resumeFile` in `profile.ts`. The published copy deliberately has the phone number removed; keep it that way unless you want it public.
- **Project GitHub links:** set `github` on a project in `projects.ts`. It is intentionally left unset for proprietary work and for repositories that are empty, so no card links to an empty page.
- **Architecture diagrams:** each project has an `architecture` object. Nodes are 164×60 units at `x`/`y` (top-left); columns are laid out 240 units apart. `kind` controls colour (`client`, `service`, `database`, `cache`, `storage`, `queue`, `ai`, `external`). Edges route automatically between the closest sides. Optional `groups` draw a dashed boundary with a label.
- **Colours and fonts:** tokens at the top of `src/index.css` (`:root` for light, `.dark` for dark).
- **SEO:** title, description and social tags in `index.html`. Regenerate `public/og-image.png` if your headline changes.

## Deployment

`.github/workflows/deploy.yml` type-checks, builds and publishes `dist/` to GitHub Pages on every push to `main` (it can also be run manually from the Actions tab).

One-time setup for a new repository:

1. Push the code to `main` on GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
   Or with the GitHub CLI: `gh api -X POST repos/<user>/portfolio/pages -f build_type=workflow`
3. Push again or run the workflow manually. The site appears at `https://<user>.github.io/portfolio/`.

### Base path

Vite builds with `base: '/portfolio/'` so assets resolve under the repository sub-path. If you rename the repository or move to a custom domain, build with a different base:

```bash
BASE_PATH=/ npm run build              # custom domain or <user>.github.io repository
BASE_PATH=/new-repo-name/ npm run build
```

Remember to update the absolute URLs in `index.html`, `public/robots.txt` and `public/sitemap.xml` as well.

The site is a single page with hash anchors, so no SPA routing workaround is needed. `public/404.html` sends unknown paths back to the home page.
