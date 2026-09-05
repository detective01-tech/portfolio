/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Rocket, ArrowRight, Code, Cpu, ShieldCheck } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolio-data';
import { ProjectItem } from '../types';
import { ASSET_MAP } from '../config/assets';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  return (
    <section
      id="projects"
      className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 mb-12"
      >
        <div className="flex items-center gap-2 text-zinc-400">
          <Rocket className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
            Selected Case Studies
          </span>
        </div>
        <h2 className="font-headline text-[32px] sm:text-[40px] font-bold tracking-tight text-white">
          Featured projects &amp; systems.
        </h2>
        <p className="text-[17px] text-zinc-400 max-w-2xl leading-relaxed font-normal">
          Engineered for high reliability, strict zero-trust boundary isolation, and sub-100ms response times across mobile and cloud platforms.
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="flex flex-col gap-8">
        {PROJECTS_DATA.map((project, index) => {
          const asset = ASSET_MAP[project.assetKey];
          const isReversed = index % 2 === 1;

          return (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center transition-colors"
            >
              {/* Visual Presentation (6 cols) */}
              <div
                className={`lg:col-span-6 relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 group ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <img
                  src={asset?.url}
                  alt={asset?.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500 ease-out"
                  loading="lazy"
                />

                {/* Spec overlay badge */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-xs text-zinc-200 font-medium">
                      {asset?.specLabel || 'Production Architecture'}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400 font-medium">
                    {asset?.specValue || project.statusBadge}
                  </span>
                </div>
              </div>

              {/* Project Narrative (6 cols) */}
              <div
                className={`lg:col-span-6 flex flex-col gap-4 ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase text-zinc-400 font-medium tracking-wider">
                    {project.projectNumber}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium">
                    {project.categoryTag}
                  </span>
                </div>

                <h3 className="font-headline text-[22px] sm:text-[25px] font-bold text-white leading-snug">
                  {project.title}
                </h3>

                <p className="text-[15px] text-zinc-400 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Architectural highlight callout */}
                <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5 text-zinc-300">
                    {project.id === 'nexora' ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    ) : project.id === 'wearixa' ? (
                      <Cpu className="w-4 h-4 text-zinc-300" />
                    ) : (
                      <Rocket className="w-4 h-4 text-zinc-300" />
                    )}
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="text-zinc-200 font-medium">
                      {project.highlightTitle}
                    </span>
                    <span className="text-zinc-400 mt-0.5 leading-relaxed">
                      {project.highlightDesc}
                    </span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-850 border border-zinc-750 text-zinc-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    id={`open-case-study-${project.id}`}
                    onClick={() => onOpenCaseStudy(project)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm group"
                  >
                    <span>Read Architecture Spec</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <a
                    href={project.githubUrl || 'https://github.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-zinc-800/60"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Source Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
