import { createContext, useContext } from 'react'

interface ProjectModalContextValue {
  openProject: (id: string) => void
}

export const ProjectModalContext = createContext<ProjectModalContextValue>({ openProject: () => {} })

export const useProjectModal = () => useContext(ProjectModalContext)
