import { Suspense, lazy, useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, LazyMotion, MotionConfig } from 'motion/react'
import { BackToTop, ScrollProgress } from './components/layout/ScrollChrome'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ProjectModalContext } from './components/projects/projectModalContext'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { projects } from './data/projects'
import { useScrollLock } from './hooks/useScrollLock'

const ProjectModal = lazy(() => import('./components/projects/ProjectModal'))
const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

function ModalFallback() {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/50 backdrop-blur-sm" role="status" aria-label="Loading project details">
      <span className="size-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
    </div>
  )
}

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  useScrollLock(openId !== null)

  const openProject = useCallback((id: string) => {
    returnFocus.current = document.activeElement as HTMLElement | null
    setOpenId(id)
  }, [])

  const close = useCallback(() => {
    setOpenId(null)
    requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }))
  }, [])

  const step = useCallback((delta: number) => {
    setOpenId((cur) => {
      const i = projects.findIndex((p) => p.id === cur)
      return projects[(i + delta + projects.length) % projects.length].id
    })
  }, [])

  const ctx = useMemo(() => ({ openProject }), [openProject])
  const project = projects.find((p) => p.id === openId)

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <ProjectModalContext.Provider value={ctx}>
          <a
            href="#main"
            className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          <Footer />
          <BackToTop />

          <Suspense fallback={<ModalFallback />}>
            <AnimatePresence>
              {project && <ProjectModal key="project-modal" project={project} onClose={close} onPrev={() => step(-1)} onNext={() => step(1)} />}
            </AnimatePresence>
          </Suspense>
        </ProjectModalContext.Provider>
      </MotionConfig>
    </LazyMotion>
  )
}
