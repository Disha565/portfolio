import { Brain, Cloud, CodeXml, Database, Network, Server } from 'lucide-react'
import type { SkillGroup } from '../types'

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', icon: CodeXml, skills: ['C++', 'Python', 'TypeScript', 'JavaScript', 'C'] },
  { title: 'Frameworks & Testing', icon: Server, skills: ['NestJS', 'Node.js', 'FastAPI', 'Pytest', 'Locust'] },
  { title: 'Databases', icon: Database, skills: ['ClickHouse', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Milvus'] },
  { title: 'Cloud & DevOps', icon: Cloud, skills: ['AWS (S3, SES, Lambda)', 'GitHub Actions CI/CD', 'Docker', 'Kubernetes'] },
  {
    title: 'Distributed Systems',
    icon: Network,
    skills: ['Kafka', 'RabbitMQ', 'Microservices', 'Materialized Views', 'Caching', 'Socket Programming', 'Multithreading'],
  },
  { title: 'AI & LLM', icon: Brain, skills: ['LangGraph', 'LLMs', 'RAG', 'Prompt Engineering'] },
]

export const coursework = [
  'Operating Systems',
  'Computer Networks',
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Object-Oriented Programming',
]
