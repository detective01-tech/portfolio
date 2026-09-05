/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { History } from 'lucide-react';
import { CAREER_MILESTONES } from '../data/portfolio-data';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
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
          <History className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
            Career Timeline
          </span>
        </div>
        <h2 className="font-headline text-[32px] sm:text-[40px] font-bold tracking-tight text-white">
          Experience &amp; trajectory.
        </h2>
        <p className="text-[16px] text-zinc-400 max-w-2xl leading-relaxed font-normal">
          Chronological record of hands-on software development, distributed systems architecture, and production delivery.
        </p>
      </motion.div>

      {/* Experience Stack */}
      <div className="flex flex-col gap-4">
        {CAREER_MILESTONES.map((milestone, idx) => {
          const isLatest = idx === 0;

          return (
            <motion.div
              key={idx}
              id={`experience-milestone-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors"
            >
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-medium uppercase tracking-wider ${
                      isLatest ? 'text-emerald-400' : 'text-zinc-400'
                    }`}
                  >
                    {milestone.period}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {milestone.periodBadge}
                  </span>
                </div>

                <h3 className="font-headline text-[19px] font-semibold text-white">
                  {milestone.role}
                </h3>

                <p className="text-[14px] text-zinc-400 leading-relaxed font-normal">
                  {milestone.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {milestone.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-850 border border-zinc-750 text-zinc-400 font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-1 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
                <span
                  className={`font-mono text-base font-semibold ${
                    isLatest ? 'text-emerald-400' : 'text-zinc-300'
                  }`}
                >
                  {milestone.highlightMetric}
                </span>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  {milestone.highlightLabel}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
