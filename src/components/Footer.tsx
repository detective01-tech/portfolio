/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Code, Share2, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const techPills = [
    'TypeScript',
    'Next.js',
    'Flutter',
    'Go',
    'Kubernetes',
    'Terraform',
    'AWS ECS',
    'CI/CD SAST/DAST'
  ];

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-16">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-zinc-900">
          {/* Brand and Summary */}
          <div className="flex flex-col gap-2 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-headline text-[18px] text-white tracking-tight font-semibold">
                Muhammad Sohail
              </span>
            </div>
            <p className="text-[14px] text-zinc-400 leading-relaxed mt-1 font-normal">
              Full-Stack Software Engineer &amp; DevSecOps Architect crafting resilient enterprise
              systems, immutable deployment pipelines, and cloud native services.
            </p>
          </div>

          {/* Technical Foundation */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-medium">
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-1.5 max-w-md">
              {techPills.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-850"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Network & Dispatch */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-medium">
              Connect
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="GitHub"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="LinkedIn"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            <span>© 2026 Muhammad Sohail. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Systems Nominal
            </span>
            <span className="text-zinc-600">v4.8.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
