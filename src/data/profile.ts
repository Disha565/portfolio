import photo from '../assets/disha-jain.webp'
import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Disha Jain',
  initials: 'DJ',
  roles: ['Software Engineer', 'Backend Systems'],
  headline: { lead: 'Building Scalable Systems', accent: 'Intelligent', tail: 'Applications.' },
  intro:
    'Software Developer at Coschool.ai, building the backend behind an AI-powered learning platform for K-12 schools: analytics on ClickHouse, weekly reports for the parents of 90K+ students, and LLM agents that generate and validate questions. M.Tech from IIIT Hyderabad.',
  email: 'jaindisha592001@gmail.com',
  resumeFile: 'Disha_Jain_Resume.pdf',
  siteUrl: 'https://disha565.github.io/portfolio/',
  availability: 'Interested in backend and distributed systems roles',
  // FormSubmit forwards messages to the email above. First use sends a one-time activation email.
  contactFormEndpoint: 'https://formsubmit.co/ajax/jaindisha592001@gmail.com',
  photo: { src: photo, alt: 'Disha Jain smiling, seated on a terrace with a city skyline at night behind her' },
  socials: [
    { kind: 'github', label: 'GitHub', handle: 'disha565', href: 'https://github.com/disha565' },
    { kind: 'linkedin', label: 'LinkedIn', handle: 'disha-jain05', href: 'https://www.linkedin.com/in/disha-jain05/' },
    { kind: 'leetcode', label: 'LeetCode', handle: 'DishaJain05', href: 'https://leetcode.com/u/DishaJain05/' },
  ],
  about: [
    "I'm a backend engineer at Coschool.ai, where I build the services behind an AI-powered learning platform for K-12 students, teachers and parents. Most of my work sits where data volume meets product: dashboards that have to answer quickly, reports that go out to tens of thousands of families every week, and test sessions that have to survive a closed tab or a switch to another device.",
    'Before Coschool I did my M.Tech in Computer Science and Information Security at IIIT Hyderabad. Much of that work was low-level: sockets, threads and message queues, building a peer-to-peer file sharing system in C++ and a microservice-based media converter on Kubernetes. That is where I got hooked on distributed systems, because the interesting problems show up once things run concurrently, fail partially or need to scale.',
    'Lately I have been building with LLMs, mostly agentic pipelines in LangGraph that generate and validate questions from chapter content. I treat them like any other system: separate steps, explicit validation and rubrics, rather than trusting a single prompt to get it right.',
  ],
  stats: [
    { value: '58%', label: 'faster analytics dashboards' },
    { value: '90K+', label: 'students covered by weekly reports' },
    { value: 'M.Tech', label: 'CSIS, IIIT Hyderabad' },
  ],
}

export const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`
