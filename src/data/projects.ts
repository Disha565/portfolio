import type { MoreWork, Project } from '../types'

/*
 * Architecture coordinates are in diagram units (nodes are 164×60, columns 240 apart, see ArchitectureDiagram).
 * Keep `github` unset unless the repository is public and contains the code.
 */
export const projects: Project[] = [
  {
    id: 'analytics-dashboards',
    title: 'Role-Based Analytics Dashboards',
    category: 'professional',
    context: 'Coschool.ai',
    summary:
      'Teacher and principal dashboards on ClickHouse and MongoDB, made 58% faster with materialized views, with one-click actions that turn insights into follow-ups.',
    overview:
      'Role-based analytics for teachers and principals that track homework completion and academic performance across classes, sections and subjects, and let them act on what they see without leaving the dashboard.',
    problem:
      'Teachers and principals need an up-to-date view of how every class, section and subject is doing. Computing student-activity metrics from scratch on each request made dashboards slow, and spotting a struggling student still meant a separate, manual follow-up.',
    contribution: [
      'Built role-based analytics dashboards for teachers with NestJS, ClickHouse and MongoDB, tracking homework completion and academic performance across classes, sections and subjects.',
      'Improved dashboard response times by 58% by cutting expensive database work and using ClickHouse materialized views to pre-compute frequently used student-activity metrics.',
      'Built one-click dashboard actions for principals and teachers: nudges for inactive students, login reminders, appreciation emails, and assigning level-up homework to students marked Needs Improvement.',
    ],
    challenges: [
      {
        title: 'Fast reads over growing activity data',
        body: 'Aggregating raw activity per request does not hold up as data grows. Materialized views move the work to insert time, so dashboard reads hit pre-computed metrics.',
      },
      {
        title: 'Different roles, different scopes',
        body: 'Teachers and principals look at different slices of the same data, so what each user sees, and how it is aggregated, depends on their role.',
      },
      {
        title: 'From insight to action',
        body: 'Nudges, reminders, appreciation emails and level-up homework are triggered straight from the dashboard, so the insight and the follow-up live in one place.',
      },
    ],
    stack: ['NestJS', 'TypeScript', 'ClickHouse', 'Materialized Views', 'MongoDB', 'AWS SES'],
    highlight: { value: '58%', label: 'faster response times' },
    architecture: {
      width: 916,
      height: 320,
      caption: 'Dashboard reads hit pre-computed ClickHouse materialized views; one-click actions send email through AWS SES.',
      groups: [{ label: 'ClickHouse', x: 480, y: 4, w: 432, h: 102 }],
      nodes: [
        { id: 'users', label: 'Teachers & Principals', sub: 'Role-based dashboards', x: 16, y: 130, kind: 'client', detail: 'Each role gets its own view: teachers by class, section and subject; principals across the school.' },
        { id: 'api', label: 'NestJS API', sub: 'Role-aware endpoints', x: 256, y: 130, kind: 'service', detail: 'Resolves the viewer’s role and scope, then serves dashboard metrics and one-click actions.' },
        { id: 'mv', label: 'Materialized Views', sub: 'Pre-computed metrics', x: 496, y: 36, kind: 'database', detail: 'Frequently used student-activity metrics are pre-computed as data arrives, which removed expensive per-request work and drove the 58% speed-up.' },
        { id: 'raw', label: 'Activity Tables', sub: 'Student activity', x: 736, y: 36, kind: 'database', detail: 'Student activity data in ClickHouse that feeds the materialized views.' },
        { id: 'mongo', label: 'MongoDB', sub: 'Application data', x: 496, y: 130, kind: 'database', detail: 'Operational data the dashboards and actions work with.' },
        { id: 'actions', label: 'Dashboard Actions', sub: 'One-click workflows', x: 496, y: 230, kind: 'service', detail: 'Nudges for inactive students, login reminders, appreciation emails and level-up homework for students marked Needs Improvement.' },
        { id: 'ses', label: 'AWS SES', sub: 'Email delivery', x: 736, y: 230, kind: 'external', detail: 'Delivers the reminder and appreciation emails triggered from the dashboard.' },
      ],
      edges: [
        { from: 'users', to: 'api', label: 'HTTPS' },
        { from: 'api', to: 'mv', label: 'read' },
        { from: 'raw', to: 'mv', label: 'aggregate' },
        { from: 'api', to: 'mongo' },
        { from: 'api', to: 'actions', label: 'one-click' },
        { from: 'actions', to: 'ses', label: 'emails' },
      ],
    },
  },
  {
    id: 'question-generation',
    title: 'Agentic Question Generation & Validation',
    category: 'professional',
    context: 'Coschool.ai',
    summary:
      'LangGraph agents that turn teacher-uploaded chapter PDFs into chapter-aligned questions, validate them, and generate explanations and step-by-step solutions.',
    overview:
      'An agentic pipeline that reads chapter content uploaded by teachers, generates questions aligned to that chapter, and puts every question, generated or teacher-written, through validation before it reaches students.',
    problem:
      'Writing good questions for every chapter takes a long time, and raw LLM output cannot go straight to students because it can be wrong, incomplete or off-topic. Both generated and teacher-uploaded questions needed a dependable quality gate.',
    contribution: [
      'Built a question generation agent with LangGraph that works from teacher-uploaded chapter PDFs and generates chapter-aligned questions from the extracted content.',
      'Designed a question validation agent for generated and teacher-uploaded questions that checks correctness, completeness and chapter/topic relevance before publication.',
      'Generated context-aware concept explanations from question content and curriculum metadata, keeping them aligned with the selected chapter and topic.',
      'Automated step-by-step solution generation and rubric-based validation to make student-facing solutions more consistent.',
    ],
    challenges: [
      {
        title: 'Staying grounded in the chapter',
        body: 'Questions and explanations must stay within the selected chapter and topic, so generation is driven by the extracted chapter content and curriculum metadata rather than open-ended prompts.',
      },
      {
        title: 'Validation as its own step',
        body: 'Keeping generation and validation in separate agents means every question, from the model or from a teacher, passes the same correctness, completeness and relevance checks.',
      },
      {
        title: 'Consistency at volume',
        body: 'Rubric-based validation of step-by-step solutions keeps quality consistent across many questions instead of depending on one prompt getting it right.',
      },
    ],
    stack: ['Python', 'LangGraph', 'LLMs', 'Prompt Engineering', 'AWS S3'],
    highlight: { value: '2 agents', label: 'generate → validate' },
    architecture: {
      width: 916,
      height: 420,
      caption: 'Chapter PDFs flow from S3 through generation and validation agents; only validated questions are published.',
      groups: [{ label: 'LangGraph agents', x: 720, y: 4, w: 192, h: 410 }],
      nodes: [
        { id: 'pdf', label: 'Chapter PDFs', sub: 'Uploaded by teachers', x: 16, y: 36, kind: 'client', detail: 'Teachers upload chapter material that becomes the source for generated questions.' },
        { id: 's3', label: 'AWS S3', sub: 'Document storage', x: 256, y: 36, kind: 'storage', detail: 'Stores the uploaded chapter documents.' },
        { id: 'extract', label: 'Content Extraction', sub: 'Chapter content', x: 496, y: 36, kind: 'service', detail: 'Extracts the chapter content that grounds question generation.' },
        { id: 'gen', label: 'Generation Agent', sub: 'Aligned to chapter', x: 736, y: 36, kind: 'ai', detail: 'A LangGraph agent that generates questions aligned to the chapter from the extracted content.' },
        { id: 'teacher', label: 'Teacher Questions', sub: 'Uploaded directly', x: 496, y: 186, kind: 'client', detail: 'Questions written by teachers go through the same validation as generated ones.' },
        { id: 'validate', label: 'Validation Agent', sub: 'Correctness · relevance', x: 736, y: 186, kind: 'ai', detail: 'Checks each question for correctness, completeness and chapter/topic relevance before publication.' },
        { id: 'explain', label: 'Solutions Agent', sub: 'Explanations · rubric', x: 736, y: 340, kind: 'ai', detail: 'Generates context-aware concept explanations and step-by-step solutions, then validates them against a rubric.' },
        { id: 'publish', label: 'Published Questions', sub: 'Student-facing', x: 496, y: 340, kind: 'external', detail: 'Only questions that pass validation reach students.' },
      ],
      edges: [
        { from: 'pdf', to: 's3', label: 'upload' },
        { from: 's3', to: 'extract' },
        { from: 'extract', to: 'gen', label: 'context' },
        { from: 'gen', to: 'validate', label: 'candidates' },
        { from: 'teacher', to: 'validate' },
        { from: 'validate', to: 'explain', label: 'approved' },
        { from: 'explain', to: 'publish' },
      ],
    },
  },
  {
    id: 'weekly-reports',
    title: 'Weekly Progress Reporting System',
    category: 'professional',
    context: 'Coschool.ai',
    summary:
      'Automated weekly reports for the parents of 90K+ students: what their child learned, where they are slipping, and what to do next.',
    overview:
      "A scheduled reporting pipeline that summarises each student's week for their parents and adds personalized, actionable insights. Every report is stored as a fixed historical snapshot.",
    problem:
      "Parents rarely see one consolidated picture of their child's week, because classes, homework, self-study and doubts are spread across the platform. Reports had to be produced for every student, every week, and remain accurate historical records.",
    contribution: [
      'Built an automated weekly progress report sent to parents of 90K+ students, covering class updates, learning time, homework, self-study, doubts cleared and experiential activities.',
      "Generated personalized, actionable insights from each student's activity: inactivity alerts, weak chapters, overdue homework, pending level-ups and learning-credit reminders.",
      'Automated weekly generation with scheduled cron jobs, stored each report as a fixed historical snapshot, and used Redis caching for fast access to previously generated reports.',
    ],
    challenges: [
      {
        title: 'Scale on a schedule',
        body: 'Personalized reports for 90K+ students are produced every week by scheduled jobs, so generation has to be automatic and predictable rather than on demand.',
      },
      {
        title: 'Reports as history',
        body: 'Each week is stored as a fixed snapshot, so a report reads the same later even as the underlying activity data keeps changing.',
      },
      {
        title: 'Fast repeat reads',
        body: 'Previously generated reports are served from Redis instead of being rebuilt every time a parent opens one.',
      },
    ],
    stack: ['NestJS', 'TypeScript', 'ClickHouse', 'MongoDB', 'Redis', 'Cron'],
    highlight: { value: '90K+', label: 'students every week' },
    architecture: {
      width: 916,
      height: 340,
      caption: 'A weekly cron job builds each report from activity data, freezes it as a snapshot and serves repeats from Redis.',
      nodes: [
        { id: 'cron', label: 'Weekly Cron', sub: 'Scheduled job', x: 16, y: 140, kind: 'service', detail: 'Starts report generation every week, with no manual trigger.' },
        { id: 'ch', label: 'ClickHouse', sub: 'Learning activity', x: 256, y: 20, kind: 'database', detail: 'Learning time, homework, self-study and other activity summarised in the report.' },
        { id: 'gen', label: 'Report Generator', sub: 'NestJS', x: 256, y: 140, kind: 'service', detail: "Builds each student's weekly summary: class updates, learning time, homework, self-study, doubts cleared and experiential activities." },
        { id: 'mongo', label: 'MongoDB', sub: 'Platform data', x: 256, y: 260, kind: 'database', detail: 'Student and platform data used to build each report.' },
        { id: 'insights', label: 'Personalized Insights', sub: 'Alerts · weak chapters', x: 496, y: 140, kind: 'ai', detail: 'Inactivity alerts, weak chapters, overdue homework, pending level-ups and learning-credit reminders for each student.' },
        { id: 'snap', label: 'Report Snapshot', sub: 'Fixed weekly history', x: 736, y: 140, kind: 'storage', detail: 'Each report is stored as a fixed historical snapshot, so past weeks never change.' },
        { id: 'redis', label: 'Redis', sub: 'Report cache', x: 736, y: 260, kind: 'cache', detail: 'Serves previously generated reports quickly, without recomputing them.' },
        { id: 'parents', label: 'Parents', sub: '90K+ students', x: 496, y: 260, kind: 'client', detail: "Parents receive a weekly summary of their child's learning with clear next steps." },
      ],
      edges: [
        { from: 'cron', to: 'gen', label: 'weekly' },
        { from: 'ch', to: 'gen', label: 'activity' },
        { from: 'mongo', to: 'gen' },
        { from: 'gen', to: 'insights' },
        { from: 'insights', to: 'snap', label: 'persist' },
        { from: 'snap', to: 'redis', label: 'cache' },
        { from: 'redis', to: 'parents', label: 'fast reads' },
      ],
    },
  },
  {
    id: 'mock-test-engine',
    title: 'Practice & Mock Test Engine',
    category: 'professional',
    context: 'Coschool.ai',
    summary:
      'An end-to-end test engine with pause/resume, cross-device continuation, one active session per student, and detailed post-test analytics.',
    overview:
      'The engine behind practice and mock tests: students can pause, resume and continue on another device without losing answers, and get a detailed breakdown of their performance afterwards.',
    problem:
      'Students start a test on one device and finish on another, close tabs mid-attempt, or open the same test twice. Without careful session handling that means lost answers, broken timers and conflicting submissions.',
    contribution: [
      'Built the end-to-end Practice and Mock Test engine, letting students pause and resume tests, continue across devices and keep their saved answers.',
      'Handled test-specific time limits and inactivity timeouts.',
      'Ensured a student can have only one active test session at a time, preventing duplicate attempts and conflicting answers when the same test is opened from another device or tab.',
      'Built detailed post-test reports showing score, accuracy, time spent per question, revisits and answer changes, so students can see where they lost marks.',
    ],
    challenges: [
      {
        title: 'One active session',
        body: 'Opening the same test in another tab or on another device must not create a second attempt, so the engine allows only one active session per student at a time.',
      },
      {
        title: 'State that follows the student',
        body: 'Answers and progress are saved as the student works, so a test can be paused, picked up on another device and continued without losing anything.',
      },
      {
        title: 'Time rules that hold',
        body: 'Test-specific time limits and inactivity timeouts have to stay correct across pauses, resumes and device switches.',
      },
    ],
    stack: ['NestJS', 'TypeScript', 'MongoDB', 'ClickHouse'],
    highlight: { value: '1', label: 'active session, any device' },
    architecture: {
      width: 916,
      height: 320,
      caption: 'Every device talks to one engine that guards the single active session, enforces timers and persists answers.',
      nodes: [
        { id: 'a', label: 'Device A', sub: 'Laptop · original tab', x: 16, y: 40, kind: 'client', detail: 'Where the student started the test. Answers are saved as they go.' },
        { id: 'b', label: 'Device B', sub: 'Phone · another tab', x: 16, y: 220, kind: 'client', detail: 'Opening the same test elsewhere continues the existing attempt instead of creating a duplicate.' },
        { id: 'engine', label: 'Test Engine API', sub: 'NestJS · TypeScript', x: 256, y: 130, kind: 'service', detail: 'Handles starting, pausing, resuming and submitting tests across devices.' },
        { id: 'guard', label: 'Session Guard', sub: 'One active session', x: 496, y: 20, kind: 'service', detail: 'Makes sure a student has only one active test session at a time, preventing duplicate attempts and conflicting answers.' },
        { id: 'timer', label: 'Timers', sub: 'Limits · inactivity', x: 496, y: 130, kind: 'service', detail: 'Enforces test-specific time limits and inactivity timeouts.' },
        { id: 'mongo', label: 'MongoDB', sub: 'Sessions & answers', x: 496, y: 240, kind: 'database', detail: 'Keeps session state and saved answers so tests can resume anywhere.' },
        { id: 'ch', label: 'ClickHouse', sub: 'Attempt analytics', x: 736, y: 240, kind: 'database', detail: 'Attempt data behind the post-test analytics.' },
        { id: 'report', label: 'Post-test Report', sub: 'Accuracy · revisits', x: 736, y: 130, kind: 'client', detail: 'Score, accuracy, time spent per question, revisits and answer changes.' },
      ],
      edges: [
        { from: 'a', to: 'engine', label: 'answers' },
        { from: 'b', to: 'engine', label: 'continue' },
        { from: 'engine', to: 'guard' },
        { from: 'engine', to: 'timer' },
        { from: 'engine', to: 'mongo', label: 'save' },
        { from: 'mongo', to: 'ch', label: 'attempts' },
        { from: 'ch', to: 'report' },
      ],
    },
  },
  {
    id: 'p2p-file-sharing',
    title: 'Peer-to-Peer File Sharing System',
    category: 'personal',
    context: 'IIIT Hyderabad',
    summary:
      'A group-based P2P file sharing system in C++ with user authentication, SHA-1 integrity checks and multi-threaded parallel downloads.',
    overview:
      'Users authenticate, join groups and share files with other members. Downloads pull data from several peers at once over sockets, and integrity is verified with SHA-1.',
    problem:
      'Sending every file through a central server creates a bottleneck. Sharing directly between peers spreads the load, but data arriving from several peers at once still has to be verified and reassembled correctly.',
    contribution: [
      'Built a group-based peer-to-peer file sharing system in C++ using socket communication.',
      'Implemented user authentication and group-based sharing.',
      'Verified file integrity with SHA-1 checks.',
      'Used multithreading for simultaneous downloads from multiple peers.',
    ],
    challenges: [
      {
        title: 'Concurrency',
        body: 'Several transfers run at the same time, so downloads are spread across threads that each talk to a different peer.',
      },
      {
        title: 'Trust, but verify',
        body: 'Data arrives from different peers, so SHA-1 checks confirm the downloaded data is intact.',
      },
      {
        title: 'Coordinating groups',
        body: 'Users authenticate and share within groups, so peers need to know who belongs where and who holds which file.',
      },
    ],
    stack: ['C++', 'Socket Programming', 'Multithreading', 'SHA-1'],
    highlight: { value: 'SHA-1', label: 'integrity-checked downloads' },
    architecture: {
      width: 916,
      height: 400,
      caption: 'Peers coordinate through the tracker, then exchange data directly with each other in parallel.',
      nodes: [
        { id: 'tracker', label: 'Tracker', sub: 'Auth · groups · index', x: 376, y: 20, kind: 'service', detail: 'Handles user authentication and groups, and knows which peers share which files.' },
        { id: 'b', label: 'Peer B', sub: 'Shares file', x: 16, y: 170, kind: 'client', detail: 'Serves its data directly to other peers in the group.' },
        { id: 'a', label: 'Peer A', sub: 'Downloading', x: 376, y: 170, kind: 'client', detail: 'Finds who has the file through the tracker, then downloads from several peers at once.' },
        { id: 'c', label: 'Peer C', sub: 'Shares file', x: 736, y: 170, kind: 'client', detail: 'Another source for the same file, used in parallel.' },
        { id: 'threads', label: 'Worker Threads', sub: 'Simultaneous downloads', x: 376, y: 320, kind: 'service', detail: 'Multiple threads download in parallel, one per active transfer.' },
        { id: 'sha', label: 'SHA-1 Check', sub: 'Integrity verification', x: 736, y: 320, kind: 'service', detail: 'Verifies the downloaded data with SHA-1 hashes before the file is accepted.' },
      ],
      edges: [
        { from: 'a', to: 'tracker', label: 'login · lookup' },
        { from: 'b', to: 'tracker', label: 'share' },
        { from: 'c', to: 'tracker', label: 'share' },
        { from: 'b', to: 'a', label: 'data' },
        { from: 'c', to: 'a', label: 'data' },
        { from: 'a', to: 'threads' },
        { from: 'threads', to: 'sha', label: 'verify' },
      ],
    },
  },
  {
    id: 'media-conversion',
    title: 'Scalable Media Conversion Platform',
    category: 'personal',
    context: 'IIIT Hyderabad',
    summary:
      'Microservices that convert uploaded videos to MP3 asynchronously, with JWT auth, RabbitMQ queues, GridFS storage and email notifications, running on Kubernetes.',
    overview:
      'Users log in and upload a video through a gateway. Conversion happens asynchronously in a separate service, and users get an email when their MP3 is ready to download.',
    problem:
      'Converting video is slow and CPU-heavy. Doing it inside an upload request blocks the user and does not scale, so the work needs to be queued, processed independently and reported back when it is done.',
    contribution: [
      'Split the platform into gateway, auth, converter and notification microservices, each in its own Docker container, deployed on a single-node Minikube Kubernetes cluster.',
      'Implemented JWT authentication through a dedicated auth service backed by MySQL.',
      'Stored uploaded videos and converted MP3s in MongoDB GridFS.',
      'Used RabbitMQ to decouple uploads from conversion and to trigger email notifications when an MP3 is ready.',
    ],
    challenges: [
      {
        title: 'Decoupling slow work',
        body: 'Uploads return quickly. Conversion happens later, when the converter consumes the video queue.',
      },
      {
        title: 'Independent services',
        body: 'Each service runs in its own container behind Kubernetes, so services can be load-balanced and scaled independently.',
      },
      {
        title: 'Large binary files',
        body: 'Videos and MP3s live in GridFS, which splits large files into chunks instead of storing them as single documents.',
      },
    ],
    stack: ['Python', 'RabbitMQ', 'MongoDB GridFS', 'MySQL', 'JWT', 'Docker', 'Kubernetes'],
    highlight: { value: '4', label: 'microservices' },
    github: 'https://github.com/disha565/video-to-mp3-converter',
    architecture: {
      width: 1156,
      height: 340,
      caption: 'The gateway authenticates and enqueues work; converter and notification services consume RabbitMQ queues independently.',
      nodes: [
        { id: 'client', label: 'Client', sub: 'Upload · download', x: 16, y: 140, kind: 'client', detail: 'Logs in, uploads a video, and later downloads the MP3.' },
        { id: 'gateway', label: 'Gateway', sub: 'Entry point', x: 256, y: 140, kind: 'service', detail: 'Single entry point. Validates the user through the auth service, stores the upload and enqueues it for conversion.' },
        { id: 'auth', label: 'Auth Service', sub: 'JWT', x: 256, y: 20, kind: 'service', detail: 'Issues and validates JWTs for users.' },
        { id: 'mysql', label: 'MySQL', sub: 'User credentials', x: 496, y: 20, kind: 'database', detail: 'Stores user credentials for the auth service.' },
        { id: 'vq', label: 'RabbitMQ', sub: 'video queue', x: 496, y: 140, kind: 'queue', detail: 'Holds conversion jobs so uploads return immediately.' },
        { id: 'gridfs', label: 'MongoDB GridFS', sub: 'Videos & MP3s', x: 496, y: 260, kind: 'storage', detail: 'Stores large binary files in chunks: the uploaded videos and the converted MP3s.' },
        { id: 'converter', label: 'Converter', sub: 'Video → MP3', x: 736, y: 140, kind: 'service', detail: 'Consumes the video queue, converts to MP3, stores the result and publishes a completion message.' },
        { id: 'mq', label: 'RabbitMQ', sub: 'mp3 queue', x: 976, y: 140, kind: 'queue', detail: 'Announces finished conversions.' },
        { id: 'notify', label: 'Notification', sub: 'Email alert', x: 976, y: 260, kind: 'service', detail: 'Consumes the mp3 queue and emails the user that their download is ready.' },
      ],
      edges: [
        { from: 'client', to: 'gateway', label: 'upload' },
        { from: 'gateway', to: 'auth', label: 'validate' },
        { from: 'auth', to: 'mysql' },
        { from: 'gateway', to: 'vq', label: 'enqueue' },
        { from: 'gateway', to: 'gridfs', label: 'video' },
        { from: 'vq', to: 'converter', label: 'consume' },
        { from: 'converter', to: 'gridfs', label: 'mp3' },
        { from: 'converter', to: 'mq', label: 'done' },
        { from: 'mq', to: 'notify' },
      ],
    },
  },
]

export const moreWork: MoreWork[] = [
  {
    title: 'ML-Works',
    description: 'Machine learning notebooks, including image captioning with KNN and age prediction from facial images.',
    href: 'https://github.com/disha565/ML-Works',
    tags: ['Python', 'Jupyter', 'ML'],
  },
  {
    title: 'Task-Project-Management',
    description: 'A TypeScript project split into separate task and project services.',
    href: 'https://github.com/disha565/Task-Project-Management',
    tags: ['TypeScript', 'Services'],
  },
  {
    title: 'ichat',
    description: 'A real-time group chat application where many users can connect and share ideas.',
    href: 'https://github.com/disha565/ichat',
    tags: ['Node.js', 'JavaScript'],
  },
]
