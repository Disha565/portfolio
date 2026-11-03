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
        stack: ['NestJS', 'ClickHouse', 'MongoDB', 'Materialized Views', 'AWS SES', 'GitHub Actions'],
        metric: { value: '58%', label: 'faster dashboard responses' },
        challenge:
          'Teachers and principals needed homework-completion and performance views across classes, sections and subjects, and computing those metrics on every request was expensive.',
        built: [
          'Role-based dashboards for teachers using NestJS, ClickHouse and MongoDB.',
          'ClickHouse materialized views that pre-compute frequently used student-activity metrics.',
          'One-click actions: nudges for inactive students, login reminders, appreciation emails and level-up homework for students marked Needs Improvement.',
          'GitHub Actions CI/CD workflows that automate testing, build validation and deployment of the NestJS services.',
        ],
        impact:
          'Dashboard response times improved by 58%, insights became actions that run without leaving the dashboard, and backend changes ship through automated checks.',
      },
      {
        projectId: 'question-generation',
        title: 'LLM-Based Question Generation & Validation Pipeline',
        stack: ['LangGraph', 'LLMs', 'Prompt Engineering', 'AWS S3', 'Milvus'],
        metric: { value: 'PDF → Q&A', label: 'generate, validate, explain' },
        challenge:
          'LLM-generated questions cannot go straight to students. They have to be correct, complete and aligned with the chapter they come from.',
        built: [
          'A LangGraph question-generation pipeline that works from teacher-uploaded chapter PDFs.',
          'A validation pipeline that checks correctness, completeness and alignment with chapter content.',
          'An AWS Lambda function that fetches topics and subtopics from the knowledge tree for generation.',
          'Explanations and step-by-step solutions for every question.',
        ],
        impact:
          'Chapter-aligned questions that are validated before use, with explanations that show students the concept and the full solution.',
      },
      {
        projectId: 'weekly-reports',
        title: 'Student Progress Reporting System',
        stack: ['NestJS', 'MongoDB', 'ClickHouse', 'Redis'],
        metric: { value: '90K+', label: 'students covered' },
        challenge:
          "Parents had no single picture of their child's academic performance, homework and learning activities, and reports had to be produced for every student automatically.",
        built: [
          'An automated progress reporting system covering academic performance, homework and learning activities.',
          'Personalized insights: weak chapters, inactivity, overdue homework and areas requiring attention.',
          'Scheduled cron jobs, historical reports stored in MongoDB, and Redis caching for faster retrieval.',
        ],
        impact: 'Parents of 90K+ students receive personalized, actionable progress reports, generated with no manual effort.',
      },
      {
        projectId: 'mock-test-engine',
        title: 'Practice & Mock Test Engine',
        stack: ['NestJS', 'TypeScript', 'ClickHouse', 'MongoDB'],
        metric: { value: '1', label: 'active session per student' },
        challenge:
          'Students pause tests, switch devices and open the same test in another tab, all of which can lose answers or create conflicting attempts.',
        built: [
          'End-to-end engine with pause/resume, cross-device continuation, saved answers, time limits and inactivity handling.',
          'Single active test session handling across devices and tabs.',
          'Post-test analytics with score, accuracy, time per question, revisits and answer changes.',
        ],
        impact:
          'No duplicate attempts or conflicting answers, plus detailed reports that help students identify areas for improvement.',
      },
    ],
  },
]
