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
      'Implemented GitHub Actions CI/CD workflows to automate testing, build validation and deployment of the NestJS backend services.',
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
    stack: ['NestJS', 'TypeScript', 'ClickHouse', 'Materialized Views', 'MongoDB', 'AWS SES', 'GitHub Actions'],
    highlight: { value: '58%', label: 'faster response times' },
    architecture: {
      width: 916,
      height: 320,
      caption: 'Dashboard reads hit pre-computed ClickHouse materialized views; one-click actions send email through AWS SES; GitHub Actions tests and deploys the API.',
      groups: [{ label: 'ClickHouse', x: 480, y: 4, w: 432, h: 102 }],
      nodes: [
        { id: 'users', label: 'Teachers & Principals', sub: 'Role-based dashboards', x: 16, y: 130, kind: 'client', detail: 'Each role gets its own view: teachers by class, section and subject; principals across the school.' },
        { id: 'api', label: 'NestJS API', sub: 'Role-aware endpoints', x: 256, y: 130, kind: 'service', detail: 'Resolves the viewer’s role and scope, then serves dashboard metrics and one-click actions.' },
        { id: 'mv', label: 'Materialized Views', sub: 'Pre-computed metrics', x: 496, y: 36, kind: 'database', detail: 'Frequently used student-activity metrics are pre-computed as data arrives, which removed expensive per-request work and drove the 58% speed-up.' },
        { id: 'raw', label: 'Activity Tables', sub: 'Student activity', x: 736, y: 36, kind: 'database', detail: 'Student activity data in ClickHouse that feeds the materialized views.' },
        { id: 'mongo', label: 'MongoDB', sub: 'Application data', x: 496, y: 130, kind: 'database', detail: 'Operational data the dashboards and actions work with.' },
        { id: 'actions', label: 'Dashboard Actions', sub: 'One-click workflows', x: 496, y: 230, kind: 'service', detail: 'Nudges for inactive students, login reminders, appreciation emails and level-up homework for students marked Needs Improvement.' },
        { id: 'ses', label: 'AWS SES', sub: 'Email delivery', x: 736, y: 230, kind: 'external', detail: 'Delivers the reminder and appreciation emails triggered from the dashboard.' },
        { id: 'ci', label: 'GitHub Actions', sub: 'Test · build · deploy', x: 16, y: 230, kind: 'external', detail: 'CI/CD workflows that automate testing, build validation and deployment of the NestJS services.' },
      ],
      edges: [
        { from: 'users', to: 'api', label: 'HTTPS' },
        { from: 'api', to: 'mv', label: 'read' },
        { from: 'raw', to: 'mv', label: 'aggregate' },
        { from: 'api', to: 'mongo' },
        { from: 'api', to: 'actions', label: 'one-click' },
        { from: 'actions', to: 'ses', label: 'emails' },
        { from: 'ci', to: 'api', label: 'deploy' },
      ],
    },
  },
  {
    id: 'question-generation',
    title: 'LLM-Based Question Generation & Validation Pipeline',
    category: 'professional',
    context: 'Coschool.ai',
    summary:
      'A LangGraph pipeline that turns teacher-uploaded chapter PDFs into chapter-aligned questions, validates them, and generates explanations and step-by-step solutions.',
    overview:
      'An LLM pipeline that reads chapter PDFs uploaded by teachers, pulls structured curriculum metadata from the knowledge tree, generates chapter-aligned questions, and checks each one before it reaches students.',
    problem:
      'Writing good questions for every chapter takes a long time, and raw LLM output cannot go straight to students because it can be wrong, incomplete or off-topic. Generated questions needed grounding in the curriculum and a dependable validation step.',
    contribution: [
      'Built an LLM-based question generation pipeline using LangGraph to generate chapter-aligned questions from teacher-uploaded PDFs.',
      'Built a validation pipeline that evaluates generated questions for correctness, completeness and alignment with chapter content.',
      'Used an AWS Lambda function to fetch structured curriculum metadata, including topics and subtopics, from the knowledge tree for question generation.',
      'Generated question explanations and step-by-step solutions that help students understand each question, the underlying concept and the complete problem-solving approach.',
    ],
    challenges: [
      {
        title: 'Grounded in the curriculum',
        body: 'Generation uses the chapter content plus topics and subtopics from the knowledge tree, so questions stay aligned with what the chapter actually covers.',
      },
      {
        title: 'Validation as its own stage',
        body: 'A separate validation pipeline checks every generated question for correctness, completeness and alignment before it is used.',
      },
      {
        title: 'More than an answer',
        body: 'Each question comes with an explanation and a step-by-step solution, so students see the concept and the full problem-solving approach.',
      },
    ],
    stack: ['LangGraph', 'LLMs', 'Prompt Engineering', 'AWS S3', 'AWS Lambda', 'Milvus'],
    highlight: { value: 'PDF → Q&A', label: 'generate, validate, explain' },
    architecture: {
      width: 916,
      height: 270,
      caption: 'Chapter PDFs and knowledge-tree metadata feed a LangGraph generation pipeline; only validated questions, with explanations and solutions, are published.',
      groups: [{ label: 'LangGraph pipeline', x: 480, y: 4, w: 432, h: 102 }],
      nodes: [
        { id: 'pdf', label: 'Chapter PDFs', sub: 'Uploaded by teachers', x: 16, y: 36, kind: 'client', detail: 'Teachers upload chapter material that becomes the source for generated questions.' },
        { id: 's3', label: 'AWS S3', sub: 'Document storage', x: 256, y: 36, kind: 'storage', detail: 'Stores the uploaded chapter PDFs.' },
        { id: 'gen', label: 'Generation', sub: 'Chapter-aligned Qs', x: 496, y: 36, kind: 'ai', detail: 'An LLM-based LangGraph pipeline that generates chapter-aligned questions from the uploaded PDFs.' },
        { id: 'validate', label: 'Validation', sub: 'Correct · complete', x: 736, y: 36, kind: 'ai', detail: 'Evaluates each generated question for correctness, completeness and alignment with the chapter content.' },
        { id: 'tree', label: 'Knowledge Tree', sub: 'Topics & subtopics', x: 16, y: 186, kind: 'database', detail: 'Structured curriculum metadata: the topics and subtopics behind each chapter.' },
        { id: 'lambda', label: 'AWS Lambda', sub: 'Curriculum metadata', x: 256, y: 186, kind: 'service', detail: 'Fetches structured curriculum metadata from the knowledge tree for question generation.' },
        { id: 'publish', label: 'Published Questions', sub: 'Student-facing', x: 496, y: 186, kind: 'external', detail: 'Validated questions, with explanations and solutions, ready for students.' },
        { id: 'explain', label: 'Solutions', sub: 'Explanations · steps', x: 736, y: 186, kind: 'ai', detail: 'Generates an explanation and a step-by-step solution for each question.' },
      ],
      edges: [
        { from: 'pdf', to: 's3', label: 'upload' },
        { from: 's3', to: 'gen', label: 'content' },
        { from: 'tree', to: 'lambda' },
        { from: 'lambda', to: 'gen', label: 'metadata' },
        { from: 'gen', to: 'validate', label: 'questions' },
        { from: 'validate', to: 'explain', label: 'approved' },
        { from: 'explain', to: 'publish' },
      ],
    },
  },
  {
    id: 'weekly-reports',
    title: 'Student Progress Reporting System',
    category: 'professional',
    context: 'Coschool.ai',
    summary:
      'Automated progress reports for the parents of 90K+ students, with personalized insights on weak chapters, inactivity and overdue homework.',
    overview:
      "A scheduled reporting system that gives parents a clear view of their child's academic performance, homework and learning activities, with personalized insights on what needs attention.",
    problem:
      "Parents rarely see one consolidated picture of their child's learning, because performance, homework and activities are spread across the platform. Reports had to be generated automatically for every student and kept as history.",
    contribution: [
      'Developed an automated student progress reporting system for 90K+ students, giving parents insights into academic performance, homework and learning activities.',
      'Generated personalized student insights highlighting weak chapters, inactivity, overdue homework and areas requiring attention.',
      'Implemented scheduled cron jobs for automated report generation, storing historical reports in MongoDB and using Redis caching for faster retrieval.',
    ],
    challenges: [
      {
        title: 'Scale on a schedule',
        body: 'Reports for 90K+ students are produced by scheduled cron jobs, so generation has to be automatic and predictable rather than on demand.',
      },
      {
        title: 'Reports as history',
        body: 'Generated reports are stored in MongoDB, so parents can look back at earlier reports.',
      },
      {
        title: 'Fast repeat reads',
        body: 'Redis caching serves previously generated reports quickly instead of rebuilding them on every view.',
      },
    ],
    stack: ['NestJS', 'TypeScript', 'ClickHouse', 'MongoDB', 'Redis', 'Cron'],
    highlight: { value: '90K+', label: 'students covered' },
    architecture: {
      width: 916,
      height: 340,
      caption: 'Scheduled cron jobs build each report from activity data, store it in MongoDB and serve repeat reads from Redis.',
      nodes: [
        { id: 'cron', label: 'Scheduled Cron', sub: 'Automated jobs', x: 16, y: 140, kind: 'service', detail: 'Starts report generation automatically, with no manual trigger.' },
        { id: 'ch', label: 'ClickHouse', sub: 'Learning activity', x: 256, y: 20, kind: 'database', detail: 'Activity and performance data summarised in each report.' },
        { id: 'gen', label: 'Report Generator', sub: 'NestJS', x: 256, y: 140, kind: 'service', detail: "Builds each student's report: academic performance, homework and learning activities." },
        { id: 'insights', label: 'Personalized Insights', sub: 'Weak chapters · overdue', x: 496, y: 140, kind: 'ai', detail: 'Weak chapters, inactivity, overdue homework and areas requiring attention for each student.' },
        { id: 'history', label: 'MongoDB', sub: 'Historical reports', x: 736, y: 140, kind: 'database', detail: 'Stores every generated report as history.' },
        { id: 'redis', label: 'Redis', sub: 'Faster retrieval', x: 736, y: 260, kind: 'cache', detail: 'Caches generated reports so they load quickly.' },
        { id: 'parents', label: 'Parents', sub: '90K+ students', x: 496, y: 260, kind: 'client', detail: "Parents get a clear picture of their child's learning and what needs attention." },
      ],
      edges: [
        { from: 'cron', to: 'gen', label: 'scheduled' },
        { from: 'ch', to: 'gen', label: 'activity' },
        { from: 'gen', to: 'insights' },
        { from: 'insights', to: 'history', label: 'store' },
        { from: 'history', to: 'redis', label: 'cache' },
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
        body: 'Each service runs in its own container behind Kubernetes, so each one can be scaled independently.',
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
