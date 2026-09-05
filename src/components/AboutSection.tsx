/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Clock,
  Layers,
  Cloud,
  Lock,
  Zap,
  Cpu,
  RefreshCw,
  Rocket,
  LineChart
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-2 mb-12"
      >
        <div className="flex items-center gap-2 text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
            About The Engineer
          </span>
        </div>
        <h2 className="font-headline text-[32px] sm:text-[40px] font-bold tracking-tight text-white">
          Engineering with purpose &amp; architectural discipline.
        </h2>
        <p className="text-[17px] text-zinc-400 max-w-3xl leading-relaxed">
          Bridging the gap between user-centric client interfaces and immutable, automated cloud infrastructure. I don't just ship features—I design reliable, maintainable systems.
        </p>
      </motion.div>

      {/* Narrative & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative Left (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="p-6 sm:p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-4">
            <h3 className="font-headline text-[20px] font-semibold text-white">
              Holistic Full-Stack &amp; Systems Craftsmanship
            </h3>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              From intuitive mobile applications crafted in <strong className="text-white font-semibold">Flutter</strong> to resilient backend APIs powered by <strong className="text-white font-semibold">Node.js, Express, and Python</strong>, my approach treats both user experience and underlying infrastructure as a unified discipline. Every software system must scale reliably under load, safeguard user data, and sustain high uptime.
            </p>
            <p className="text-[15px] text-zinc-400 leading-relaxed">
              By embedding <strong className="text-zinc-200 font-medium">zero-trust DevSecOps directly into version control</strong>, security vulnerabilities are caught before reaching deployment. Automated pipelines handle repetitive audits, allowing continuous focus on high-impact architecture.
            </p>
          </div>

          {/* Architectural Lifecycle */}
          <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
            <div className="text-xs uppercase text-zinc-400 font-mono tracking-wider mb-4 font-medium">
              CORE DEVELOPMENT LIFECYCLE
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              {[
                { icon: Cpu, step: '01. Build', label: 'Clean Logic' },
                { icon: Lock, step: '02. Secure', label: 'Zero-Trust' },
                { icon: RefreshCw, step: '03. Automate', label: 'CI/CD Gates' },
                { icon: Rocket, step: '04. Deploy', label: 'Containers' },
                { icon: LineChart, step: '05. Monitor', label: 'Telemetry' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800/80 flex flex-col items-center gap-1.5"
                >
                  <item.icon className="w-4 h-4 text-zinc-300" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">{item.step}</span>
                  <span className="text-[11px] text-zinc-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Career Evolution Timeline Right (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="font-headline text-[18px] font-semibold text-white mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              Career Journey
            </h3>

            <div className="flex flex-col gap-6 relative pl-3">
              {/* Continuous vertical line */}
              <div className="absolute top-2 bottom-2 left-1.5 w-[1px] bg-zinc-800"></div>

              {/* Phase 01 */}
              <div className="relative pl-5 flex flex-col">
                <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <span className="font-mono text-[11px] uppercase text-zinc-400 font-medium tracking-wider">
                  Phase 01 • Foundations
                </span>
                <span className="font-headline text-[15px] text-zinc-200 font-semibold mt-0.5">
                  Web &amp; Software Development
                </span>
                <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                  Full lifecycle development, relational schemas, responsive UI architecture, and modular API design.
                </p>
              </div>

              {/* Phase 02 */}
              <div className="relative pl-5 flex flex-col">
                <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <span className="font-mono text-[11px] uppercase text-zinc-400 font-medium tracking-wider">
                  Phase 02 • Scale &amp; Client
                </span>
                <span className="font-headline text-[15px] text-zinc-200 font-semibold mt-0.5">
                  Full-Stack &amp; Mobile Architecture
                </span>
                <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                  Cross-platform mobile apps in Flutter, distributed microservices in Node.js &amp; Python, WebSockets.
                </p>
              </div>

              {/* Phase 03 */}
              <div className="relative pl-5 flex flex-col">
                <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <span className="font-mono text-[11px] uppercase text-zinc-400 font-medium tracking-wider">
                  Phase 03 • Cloud Infrastructure
                </span>
                <span className="font-headline text-[15px] text-zinc-200 font-semibold mt-0.5">
                  Cloud Infrastructure &amp; DevOps
                </span>
                <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                  Containerization with Docker, AWS ECS orchestration, automated CI/CD releases, and Linux hardening.
                </p>
              </div>

              {/* Phase 04 */}
              <div className="relative pl-5 flex flex-col">
                <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-950"></div>
                <span className="font-mono text-[11px] uppercase text-emerald-400 font-medium tracking-wider">
                  Phase 04 • Current
                </span>
                <span className="font-headline text-[15px] text-zinc-100 font-semibold mt-0.5">
                  DevSecOps &amp; Zero-Trust Systems
                </span>
                <p className="text-[13px] text-zinc-400 mt-1 leading-relaxed">
                  Shift-left security, automated Trivy/Gitleaks pipeline gates, eBPF telemetry, and resilient production deployments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4 Focus Area Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      >
        {[
          {
            icon: Layers,
            title: 'Full-Stack Craft',
            badge: 'Mobile • Web • APIs',
            desc: 'High-performance Flutter and React applications backed by scalable, type-safe API services.',
          },
          {
            icon: Cloud,
            title: 'Cloud & DevOps',
            badge: 'AWS • Docker • CI/CD',
            desc: 'Automated release pipelines, infrastructure as code, container clustering, and resilient cloud workloads.',
          },
          {
            icon: Lock,
            title: 'Security Architecture',
            badge: 'Zero-Trust • SAST • SBOM',
            desc: 'Continuous vulnerability scanning, automated secrets detection, and compliance as code.',
          },
          {
            icon: Zap,
            title: 'Systems Reliability',
            badge: 'Sub-15ms • High Uptime',
            desc: 'Observability with Prometheus & CloudWatch, database query profiling, and proactive anomaly monitoring.',
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-800/70 border border-zinc-750 flex items-center justify-center text-zinc-200 mb-4">
              <card.icon className="w-4 h-4" />
            </div>
            <h4 className="font-headline text-[16px] font-semibold text-white">{card.title}</h4>
            <span className="text-xs font-mono text-zinc-400 block mt-0.5">{card.badge}</span>
            <p className="text-[13px] text-zinc-400 mt-2 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
