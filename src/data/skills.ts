import { Brain, Cloud, CodeXml, Database, Network, Server } from 'lucide-react'
import type { SkillGroup } from '../types'

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', icon: CodeXml, skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'C', 'HTML', 'CSS'] },
  { title: 'Backend Frameworks', icon: Server, skills: ['NestJS', 'Node.js', 'Express.js'] },
  { title: 'Databases', icon: Database, skills: ['ClickHouse', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'DynamoDB'] },
  { title: 'Cloud & DevOps', icon: Cloud, skills: ['AWS (S3, SES)', 'Docker', 'Kubernetes', 'Locust'] },
  {
    title: 'Distributed Systems',
    icon: Network,
    skills: ['Kafka', 'RabbitMQ', 'Microservices', 'Materialized Views', 'Caching', 'Socket Programming', 'Multithreading'],
  },
  { title: 'AI & LLM', icon: Brain, skills: ['LLMs', 'RAG', 'LangGraph', 'Agentic Workflows', 'Prompt Engineering'] },
]

export const coursework = [
  'Operating Systems',
  'Computer Networks',
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Object-Oriented Programming',
]
