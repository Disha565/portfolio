import type { Experience } from '../types'

export const experience: Experience[] = [
  {
    company: 'Coschool.ai',
    companyUrl: 'https://coschool.ai',
    role: 'Software Developer',
    start: 'March 2025',
    end: 'Present',
    summary: 'EdTech platform: AI-powered learning for K-12 schools, serving students, teachers and parents.',
    workstreams: [
      {
        projectId: 'analytics-dashboards',
        title: 'Role-Based Analytics Dashboards',
        stack: ['NestJS', 'ClickHouse', 'MongoDB', 'Materialized Views', 'AWS SES'],
        metric: { value: '58%', label: 'faster dashboard responses' },
        challenge:
          'Teachers and principals needed homework-completion and performance views across classes, sections and subjects, and computing those metrics on every request was expensive.',
        built: [
          'Role-based dashboards for teachers using NestJS, ClickHouse and MongoDB.',
          'ClickHouse materialized views that pre-compute frequently used student-activity metrics.',
          'One-click actions: nudges for inactive students, login reminders, appreciation emails and level-up homework for students marked Needs Improvement.',
        ],
        impact:
          'Dashboard response times improved by 58%, and insights became actions that run without leaving the dashboard.',
      },
      {
        projectId: 'weekly-reports',
        title: 'Student Weekly Progress Reporting System',
        stack: ['NestJS', 'MongoDB', 'ClickHouse', 'Redis'],
        metric: { value: '90K+', label: 'students, every week' },
        challenge:
          "Parents had no single weekly picture of their child's learning, and reports had to be generated for every student on a fixed schedule.",
        built: [
          'Automated weekly reports covering class updates, learning time, homework, self-study, doubts cleared and experiential activities.',
          'Personalized insights: inactivity alerts, weak chapters, overdue homework, pending level-ups and learning-credit reminders.',
          'Scheduled cron jobs, fixed historical snapshots per report, and Redis caching for previously generated reports.',
        ],
        impact: 'Parents of 90K+ students receive a personalized, actionable report every week, with no manual effort.',
      },
      {
        projectId: 'question-generation',
        title: 'Agentic Question Generation & Validation',
        stack: ['Python', 'LangGraph', 'LLMs', 'Prompt Engineering', 'AWS S3'],
        metric: { value: '2 agents', label: 'generate → validate' },
        challenge:
          'LLM-generated questions cannot go straight to students. They have to be correct, complete and relevant to the chapter, and so do questions uploaded by teachers.',
        built: [
          'A LangGraph question-generation agent that works from teacher-uploaded chapter PDFs.',
          'A validation agent that checks correctness, completeness and chapter/topic relevance before publication.',
          'Context-aware concept explanations plus step-by-step solutions with rubric-based validation.',
        ],
        impact: 'More consistent, higher-quality student-facing questions and solutions, checked before they are published.',
      },
      {
        projectId: 'mock-test-engine',
        title: 'Practice & Mock Test Engine',
        stack: ['NestJS', 'TypeScript', 'ClickHouse', 'MongoDB'],
        metric: { value: '1', label: 'active session per student' },
        challenge:
          'Students pause tests, switch devices and open the same test in another tab, all of which can lose answers or create conflicting attempts.',
        built: [
          'End-to-end engine with pause/resume, cross-device continuation and saved answers.',
          'Test-specific time limits, inactivity timeouts and a single active session per student.',
          'Post-test reports with score, accuracy, time per question, revisits and answer changes.',
        ],
        impact:
          'No duplicate attempts or conflicting answers, plus detailed reports that show students exactly where they lost marks.',
      },
    ],
  },
]
