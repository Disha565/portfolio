import type { LucideIcon } from 'lucide-react'

export type SocialKind = 'github' | 'linkedin' | 'leetcode' | 'email'

export interface SocialLink {
  kind: SocialKind
  label: string
  handle: string
  href: string
}

export interface Stat {
  value: string
  label: string
}

export interface Profile {
  name: string
  initials: string
  roles: string[]
  headline: { lead: string; accent: string; tail: string }
  intro: string
  email: string
  /** File inside /public. Served relative to the site base path. */
  resumeFile: string
  siteUrl: string
  availability: string
  /**
   * Where the contact form POSTs (FormSubmit / Web3Forms-style JSON endpoint).
   * Leave unset to have Send open the visitor's email app instead.
   */
  contactFormEndpoint?: string
  /** Optional portrait shown in the About section. */
  photo?: { src: string; alt: string }
  socials: SocialLink[]
  about: string[]
  stats: Stat[]
}

export interface Workstream {
  /** Project id to open from the timeline, if the workstream has a project page. */
  projectId?: string
  title: string
  stack: string[]
  metric?: Stat
  challenge: string
  built: string[]
  impact: string
}

export interface Experience {
  company: string
  companyUrl?: string
  role: string
  start: string
  end: string
  summary: string
  workstreams: Workstream[]
}

export type NodeKind = 'client' | 'service' | 'database' | 'queue' | 'cache' | 'ai' | 'storage' | 'external'

export interface ArchNode {
  id: string
  label: string
  sub?: string
  /** Top-left corner in diagram units. */
  x: number
  y: number
  kind: NodeKind
  detail: string
}

export interface ArchEdge {
  from: string
  to: string
  label?: string
}

export interface ArchGroup {
  label: string
  x: number
  y: number
  w: number
  h: number
}

export interface Architecture {
  width: number
  height: number
  nodes: ArchNode[]
  edges: ArchEdge[]
  groups?: ArchGroup[]
  caption: string
}

export type ProjectCategory = 'professional' | 'personal'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  context: string
  summary: string
  overview: string
  problem: string
  contribution: string[]
  challenges: { title: string; body: string }[]
  stack: string[]
  highlight: Stat
  /** Only set when a public repository with code exists. */
  github?: string
  architecture: Architecture
}

export interface MoreWork {
  title: string
  description: string
  href: string
  tags: string[]
}

export interface SkillGroup {
  title: string
  icon: LucideIcon
  skills: string[]
}

export interface Education {
  institution: string
  short: string
  degree: string
  field: string
  start: string
  end: string
  location: string
  grade: string
  note?: string
}

export interface Achievement {
  value: string
  title: string
  detail: string
  icon: LucideIcon
}
