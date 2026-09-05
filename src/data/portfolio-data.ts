/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkillItem, PipelineStage, ProjectItem, WorkflowStep, ServiceCard, CareerMilestone, GitCommit } from '../types';

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'flutter',
    name: 'Flutter & Dart',
    icon: 'phone_iphone',
    badge: 'CROSS-PLATFORM',
    category: 'frontend',
    description: 'Cross-platform native iOS & Android rendering, state machines (Bloc/Provider), hardware camera/biometric integrations, and offline synchronization.',
    tags: ['Bloc Pattern', 'Native Plugins', '60FPS Canvas']
  },
  {
    id: 'nextjs',
    name: 'TypeScript & Next.js',
    icon: 'web',
    badge: 'CLIENT/SSR',
    category: 'frontend',
    description: 'Server-side rendered architectures, modern React Server Components, Tailwind token integration, strict type-safety, and Web Vitals optimization.',
    tags: ['SSR / Edge', 'Tailwind', 'Zero-Runtime']
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    icon: 'dns',
    badge: 'HIGH CONCURRENCY',
    category: 'backend',
    description: 'Event-driven asynchronous backend services, rate-limited REST controllers, WebSocket clustering for real-time messaging, and OAuth2/JWT auth.',
    tags: ['WebSockets', 'JWT/JWE', 'Event-Driven']
  },
  {
    id: 'python',
    name: 'Python & FastAPI',
    icon: 'terminal',
    badge: 'ASYNC API',
    category: 'backend',
    description: 'Asynchronous endpoints with Pydantic validation, worker tasks via Celery/Redis, automated OpenAPI documentation, and high-throughput ingestion.',
    tags: ['Pydantic', 'Celery Workers', 'AsyncIO']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & Supabase',
    icon: 'database',
    badge: 'RELATIONAL',
    category: 'databases',
    description: 'Relational schema modeling, index optimization (B-tree, GIN), Row-Level Security (RLS) policies, replication configurations, and Supabase auth.',
    tags: ['RLS Security', 'Index Tuning', 'Migrations']
  },
  {
    id: 'redis',
    name: 'Redis & Caching',
    icon: 'memory',
    badge: 'SUB-MILLISECOND',
    category: 'databases',
    description: 'Distributed session caching, sliding window rate-limiters, Pub/Sub messaging backbones, and atomic locking for payment workflows.',
    tags: ['Pub/Sub', 'Rate Limiting', 'Cache Invalidation']
  },
  {
    id: 'docker',
    name: 'Docker & Linux',
    icon: 'deployed_code',
    badge: 'INFRASTRUCTURE',
    category: 'devops',
    description: 'Multi-stage minimal distroless Docker builds, rootless execution, Linux kernel hardening, systemd automation, and secure socket forwarding.',
    tags: ['Distroless', 'Rootless OCI', 'Systemd']
  },
  {
    id: 'aws',
    name: 'AWS & Terraform',
    icon: 'cloud',
    badge: 'PROVISIONING',
    category: 'devops',
    description: 'VPC networking, ECS Fargate clusters, IAM zero-privilege enforcement, S3 encrypted buckets, CloudWatch metric alarms, and declarative Terraform IaC.',
    tags: ['ECS Fargate', 'Terraform IaC', 'IAM Lockdown']
  },
  {
    id: 'devsecops',
    name: 'DevSecOps & SAST/DAST',
    icon: 'policy',
    badge: 'CYBER DEFENSE',
    category: 'security',
    description: 'Automated vulnerability scanning with Trivy & SonarQube in GitHub Actions, Gitleaks secret pre-commit hooks, OWASP Top 10 mitigation, and CVE patching.',
    tags: ['Trivy', 'Gitleaks', 'OWASP ZAP']
  }
];

export const PIPELINE_STAGES_DATA: PipelineStage[] = [
  {
    id: 'info-plan',
    stepNumber: '01',
    shortTitle: 'PLAN',
    subtitle: 'Threat Modeling',
    fullTitle: 'STRIDE Matrix & Zero-Trust Boundary Planning',
    tag: 'Stage 01 • Threat Modeling & Architecture Design',
    icon: 'architecture',
    description: 'Formulating attack surface boundaries, defining IAM principle of least privilege, and establishing compliance baseline standards prior to single-line code dispatch.',
    tools: ['STRIDE', 'Miro Threat Models', 'Zero-Trust RFC', 'IAM Scopes']
  },
  {
    id: 'info-code',
    stepNumber: '02',
    shortTitle: 'CODE',
    subtitle: 'Pre-Commit Gates',
    fullTitle: 'Gitleaks & ESLint High-Entropy Secret Detection',
    tag: 'Stage 02 • Pre-Commit Hooks & Static Syntax Verification',
    icon: 'code',
    description: 'Locally enforced pre-commit git hooks block accidental commits with credentials, API tokens, or hardcoded sensitive database connection strings.',
    tools: ['Gitleaks', 'Husky Pre-commit', 'ESLint Guard', 'TypeScript Strict']
  },
  {
    id: 'info-build',
    stepNumber: '03',
    shortTitle: 'BUILD',
    subtitle: 'Distroless Docker',
    fullTitle: 'Multi-Stage Distroless Container Compilation',
    tag: 'Stage 03 • Minimal Hardened Image Assembly',
    icon: 'deployed_code',
    description: 'Applications compile in ephemeral build environments and transition into minimal OCI distroless containers containing zero package managers or attack tools.',
    tools: ['Docker Buildx', 'Google Distroless', 'Kaniko', 'Cosign Signatures']
  },
  {
    id: 'info-test',
    stepNumber: '04',
    shortTitle: 'TEST',
    subtitle: 'Unit & E2E Tests',
    fullTitle: 'Continuous Test Gate Execution in GitHub Actions',
    tag: 'Stage 04 • Automated Unit, Mock & Integration Suites',
    icon: 'fact_check',
    description: 'Automated runner orchestrates concurrency tests, schema contract validations, and unit assertions with hard quality gates enforcing minimum test coverage.',
    tools: ['Jest / Vitest', 'Playwright E2E', 'Pact Contract Tests', 'Supertest']
  },
  {
    id: 'info-security',
    stepNumber: '05',
    shortTitle: 'SCAN',
    subtitle: 'SAST & Trivy',
    fullTitle: 'Automated Container & Dependency Scanning (Trivy + SonarQube)',
    tag: 'Stage 05 • Security Audit & Artifact Attestation',
    icon: 'shield_check',
    description: 'High-entropy secrets scanner blocks hardcoded tokens. Trivy audits the generated OCI layer against the CVE national database; if any critical CVSS > 7.0 is detected, the automated pipeline halts immediately.',
    tools: ['Trivy OCI Scan', 'SonarQube SAST', 'Gitleaks CLI', 'Snyk OpenSource']
  },
  {
    id: 'info-deploy',
    stepNumber: '06',
    shortTitle: 'DEPLOY',
    subtitle: 'Blue/Green AWS',
    fullTitle: 'Blue/Green Rolling Deployments on AWS ECS',
    tag: 'Stage 06 • Zero-Downtime Infrastructure Release',
    icon: 'rocket_launch',
    description: 'Canary traffic routing smoothly transitions health-checked incoming requests to new service revisions without dropping existing active user WebSocket sessions.',
    tools: ['AWS ECS Fargate', 'Terraform CDK', 'Route53 Canary', 'ALB Health Checks']
  },
  {
    id: 'info-monitor',
    stepNumber: '07',
    shortTitle: 'OBSERVE',
    subtitle: 'Live Telemetry',
    fullTitle: 'CloudWatch Observability & eBPF Threat Monitoring',
    tag: 'Stage 07 • Live Telemetry & Proactive Alerting',
    icon: 'monitoring',
    description: 'Real-time distributed tracing, automated latency degradation alerts, synthetic health probes, and autonomic node recovery systems.',
    tools: ['AWS CloudWatch', 'Prometheus & Grafana', 'OpenTelemetry', 'eBPF Kernel Probes']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'nexora',
    assetKey: 'nexora',
    projectNumber: 'PROJECT 01 • PRIVACY & MEDIA',
    categoryTag: 'Production Live',
    statusBadge: 'ZERO-KNOWLEDGE AUTH',
    title: 'Nexora — Privacy-Centric Communication Platform',
    description: 'Ultra-low latency instant messaging and encrypted voice/video sessions. Engineered with zero-knowledge metadata architecture, peer-to-peer WebRTC mesh routing, and client-side end-to-end cryptographic keys.',
    highlightTitle: 'Architectural Highlight:',
    highlightDesc: 'Distributed WebSocket cluster with automated TLS termination and ephemeral secret rotation reducing server overhead by 64%.',
    techTags: ['Flutter', 'Node.js', 'WebSockets', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com',
    demoUrl: '#',
    caseStudy: {
      id: 'nexora',
      title: 'Nexora — Privacy Communication Architecture',
      subtitle: 'Engineering Architecture Breakdown',
      problemScope: 'Standard monolithic messaging systems suffered from metadata surveillance vulnerabilities, intermittent NAT traversal dropouts, and high database query latency during concurrent peak audio/video streaming spikes.',
      technicalArchitecture: 'Decoupled presentation layer built in Flutter communicating over encrypted WebSockets with automatic reconnection retry queues. Backpressure is managed via Redis streams and distributed TURN/STUN nodes spread across three global AWS availability zones.',
      securityConsiderations: [
        'Zero-knowledge client-side encryption using the Signal Protocol with ephemeral Double Ratchet keys.',
        'No metadata retention policy: message payloads evaporate from memory buffers immediately upon delivery acknowledgement.',
        'Continuous SAST audits with Trivy and SonarQube enforcing zero CVE vulnerability tolerance in the container pipeline.'
      ],
      latencyMetric: '<24ms',
      availabilityMetric: '99.99%',
      securityStatus: 'VERIFIED'
    }
  },
  {
    id: 'wearixa',
    assetKey: 'wearixa',
    projectNumber: 'PROJECT 02 • COMMERCE & SAAS',
    categoryTag: 'High-Throughput',
    statusBadge: 'PCI-DSS LEVEL 1 READY',
    title: 'Wearixa — Headless E-Commerce & Apparel Engine',
    description: 'High-throughput digital storefront featuring distributed catalog caching, dynamic localized currency conversions, instant full-text filtering, and multi-tenant seller pipelines.',
    highlightTitle: 'Architectural Highlight:',
    highlightDesc: 'Multi-tiered Redis cache invalidation layer dropping database hit frequency by 82% during flash drop load tests.',
    techTags: ['Next.js', 'FastAPI', 'Supabase', 'Redis', 'AWS ECS'],
    githubUrl: 'https://github.com',
    demoUrl: '#',
    caseStudy: {
      id: 'wearixa',
      title: 'Wearixa — Headless E-Commerce SaaS Engine',
      subtitle: 'Engineering Architecture Breakdown',
      problemScope: 'High-volume flash apparel drops created concurrent race conditions on stock reservations, degrading traditional RDBMS performance and causing checkout lockups during peak minutes.',
      technicalArchitecture: 'Next.js App Router on edge nodes paired with asynchronous Python FastAPI microservices on AWS ECS. Implemented Redis atomic Lua scripts for inventory lock reservations and multi-tiered CDN cache purging.',
      securityConsiderations: [
        'Strict Row-Level Security (RLS) policies on Supabase preventing cross-tenant catalog or order exposure.',
        'Tokenized Stripe checkout workflows achieving full PCI-DSS Level 1 compliance without credit card storage on self-hosted infra.',
        'Rate-limiting sliding windows in Redis defending against automated bot scalping attempts.'
      ],
      latencyMetric: '<18ms',
      availabilityMetric: '99.98%',
      securityStatus: 'PCI-READY'
    }
  },
  {
    id: 'devsecops-lab',
    assetKey: 'devsecopsLab',
    projectNumber: 'PROJECT 03 • CLOUD & SECURITY LABS',
    categoryTag: 'Open-Source Spec',
    statusBadge: '100% REPRODUCIBLE IAC',
    title: 'Cloud DevSecOps Sandbox & Testing Labs',
    description: 'Automated multi-region cloud security testing laboratory. Simulates synthetic DDoS vectors, automated container vulnerability scans, secret injection prevention, and live disaster recovery failover pipelines.',
    highlightTitle: 'Architectural Highlight:',
    highlightDesc: 'Fully automated GitHub Actions workflow enforcing strict DAST with OWASP ZAP and ephemeral AWS test-bed destruction.',
    techTags: ['Terraform', 'AWS', 'Docker', 'Linux SysAdmin', 'OWASP ZAP'],
    githubUrl: 'https://github.com',
    demoUrl: '#',
    caseStudy: {
      id: 'devsecops-lab',
      title: 'Cloud DevSecOps Sandbox & Testing Labs',
      subtitle: 'Engineering Architecture Breakdown',
      problemScope: 'Engineering teams lacked safe environments to execute destructive chaos engineering tests, dynamic application security tests (DAST), and automated vulnerability gate triggers without risking production infrastructure.',
      technicalArchitecture: 'Terraform Infrastructure-as-Code definitions orchestrating isolated VPCs, ECS Fargate test tasks, and ephemeral bastion gateways. Integrates directly into GitHub Actions with automated post-test resource teardown to optimize cloud spend.',
      securityConsiderations: [
        'Automated container scanning with Trivy halting pipelines upon detection of critical CVSS > 7.0 CVEs.',
        'Gitleaks entropy scans blocking secret leaks before git push execution.',
        'OWASP ZAP dynamic penetration probes verifying absence of SQLi, XSS, and SSRF flaws in live staging endpoints.'
      ],
      latencyMetric: '<12ms',
      availabilityMetric: '100%',
      securityStatus: 'HARDENED'
    }
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Understand',
    icon: 'psychology',
    description: 'Deconstructing core business objectives, identifying operational bottlenecks, user friction points, and domain boundaries.',
    accent: 'primary'
  },
  {
    stepNumber: '02',
    title: 'Design',
    icon: 'design_services',
    description: 'Drafting schema ERDs, mapping API contracts, creating threat-model vectors, and detailing clean interface components.',
    accent: 'primary'
  },
  {
    stepNumber: '03',
    title: 'Develop',
    icon: 'code_blocks',
    description: 'Strictly-typed implementation with modular encapsulation, readable algorithms, and decoupled service layers.',
    accent: 'primary'
  },
  {
    stepNumber: '04',
    title: 'Test',
    icon: 'fact_check',
    description: 'Automated unit testing, integration contract validation, load simulations, and chaos scenario drills.',
    accent: 'primary'
  },
  {
    stepNumber: '05',
    title: 'Secure',
    icon: 'security',
    description: 'Static code analysis, credential leak detection, dependency vulnerability scans, and access policy enforcement.',
    accent: 'tertiary'
  },
  {
    stepNumber: '06',
    title: 'Deploy',
    icon: 'rocket',
    description: 'Automated zero-downtime blue/green deployments into containerized orchestrations on AWS or bare-metal Linux.',
    accent: 'primary'
  },
  {
    stepNumber: '07',
    title: 'Monitor & Iterate',
    icon: 'monitoring',
    description: 'Real-time metrics, proactive log aggregation, SLA monitoring, automated alerting thresholds, and iterative architectural refactoring.',
    accent: 'primary-container'
  }
];

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'fullstack-web',
    title: 'Full-Stack Web Platforms',
    icon: 'terminal',
    description: 'Modern web architectures utilizing React/Next.js, Tailwind CSS, TypeScript, and Node.js. Built for lightning-fast First Contentful Paint and bulletproof state management.',
    accentColor: 'text-primary'
  },
  {
    id: 'mobile-apps',
    title: 'Cross-Platform Mobile Apps',
    icon: 'mobile_friendly',
    description: 'High-performance mobile applications engineered with Flutter. Single codebase reaching both iOS and Android with 60 FPS fluidity, hardware biometrics, and offline storage.',
    accentColor: 'text-primary'
  },
  {
    id: 'backend-apis',
    title: 'Backend & API Systems',
    icon: 'hub',
    description: 'Robust RESTful and real-time WebSocket endpoints in Node.js and Python FastAPI. Scalable connection pools, rate limiting, token rotation, and SQL database tuning.',
    accentColor: 'text-surface-tint'
  },
  {
    id: 'devsecops-audits',
    title: 'DevSecOps & Security Audits',
    icon: 'shield',
    description: 'Hardening CI/CD delivery pipelines, automated vulnerability assessments (Trivy, SonarQube, Gitleaks), secret management with Vault, and OWASP compliance auditing.',
    accentColor: 'text-tertiary'
  },
  {
    id: 'cloud-infra',
    title: 'Cloud Infra & Containerization',
    icon: 'cloud_done',
    description: 'AWS infrastructure automation using Terraform, Docker container clustering, Linux server administration, zero-downtime rolling deploys, and automated backups.',
    accentColor: 'text-surface-tint'
  },
  {
    id: 'database-arch',
    title: 'Database & Data Pipeline Architecture',
    icon: 'dataset',
    description: 'Schema design in PostgreSQL, Supabase integration, Redis caching hierarchies, distributed transactions, zero-data-loss backup automation, and migration safety.',
    accentColor: 'text-secondary'
  }
];

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    period: '2024 — PRESENT',
    periodBadge: 'Current Focus',
    role: 'Senior DevSecOps & Cloud Systems Architect Focus',
    description: 'Architecting immutable multi-region container deployments on AWS ECS, orchestrating zero-trust CI/CD enforcement through GitHub Actions, and standardizing automated SAST/DAST container scans with Trivy and SonarQube across all software releases.',
    tags: ['Zero-Trust CI/CD', 'AWS Terraform', 'AppSec Gates'],
    highlightMetric: '0 Security Breaches',
    highlightLabel: 'SLA: 99.99% Uptime',
    accentColor: 'tertiary'
  },
  {
    period: '2023 — 2024',
    periodBadge: 'Full-Stack Lead',
    role: 'Lead Full-Stack & Mobile Engineer',
    description: 'Spearheaded the development of cross-platform Flutter mobile applications and integrated web applications with Node.js and FastAPI microservices. Optimized PostgreSQL database queries, reducing average API response times from 340ms to 42ms.',
    tags: ['Flutter Mobile', 'Node Microservices', 'PostgreSQL Tuning'],
    highlightMetric: '87% Latency Reduction',
    highlightLabel: 'Production Release',
    accentColor: 'primary'
  },
  {
    period: '2022 — 2023',
    periodBadge: 'Core Systems',
    role: 'Full-Stack Systems & API Developer',
    description: 'Developed real-time WebSocket communication modules, payment processing hooks via Stripe, multi-tenant RBAC permissions, and Docker deployment containers for web platforms.',
    tags: ['WebSockets', 'Docker Compose', 'Stripe Integration'],
    highlightMetric: '50k+ Active Users',
    highlightLabel: 'SaaS Scale',
    accentColor: 'surface-tint'
  },
  {
    period: '2021 — 2022',
    periodBadge: 'Foundation',
    role: 'Software Engineer & Core Application Developer',
    description: 'Built responsive web applications in JavaScript and Python, implemented normalized SQL schemas, created automated unit tests, and managed Linux VPS hosting environments.',
    tags: ['JavaScript', 'Python', 'Linux Ubuntu'],
    highlightMetric: 'Foundational Architecture',
    highlightLabel: 'Software Engineering',
    accentColor: 'secondary'
  }
];

export const GIT_COMMITS_DATA: GitCommit[] = [
  {
    hash: 'f48a291',
    branch: 'main',
    message: 'feat(security): inject trivy scan gate to PR action pipeline',
    timeAgo: '2 hours ago',
    author: 'Muhammad Sohail',
    type: 'security'
  },
  {
    hash: '9d10e54',
    branch: 'feat/redis-cache',
    message: 'perf(cache): establish redis sliding-window rate limiters',
    timeAgo: '5 hours ago',
    author: 'Muhammad Sohail',
    type: 'perf'
  },
  {
    hash: '0a3b811',
    branch: 'main',
    message: 'refactor(auth): enforce RLS policy validation on Supabase ingress',
    timeAgo: '1 day ago',
    author: 'Muhammad Sohail',
    type: 'refactor'
  },
  {
    hash: 'e812c9a',
    branch: 'infra/ecs-cluster',
    message: 'infra(aws): provision multi-AZ ECS task definitions via Terraform',
    timeAgo: '2 days ago',
    author: 'Muhammad Sohail',
    type: 'infra'
  }
];
