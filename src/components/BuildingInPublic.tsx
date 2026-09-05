/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, GitCommit as GitCommitIcon, ExternalLink, Check } from 'lucide-react';
import { GIT_COMMITS_DATA } from '../data/portfolio-data';
import { GitCommit } from '../types';

export const BuildingInPublic: React.FC = () => {
  const [selectedCommit, setSelectedCommit] = useState<GitCommit | null>(null);

  // 52 weeks x 5 days grid simulation
  const weeks = Array.from({ length: 40 }, (_, i) => i);
  const days = Array.from({ length: 5 }, (_, i) => i);

  // Seeded color generator for heatmap cells
  const getCellColor = (week: number, day: number) => {
    const val = (week * 7 + day * 13) % 10;
    if (val === 0 || val === 1) return '#1e1f25'; // empty
    if (val === 2 || val === 3) return '#30c88f99'; // low
    if (val === 4 || val === 5) return '#56e5a9'; // medium
    if (val === 6 || val === 7) return '#38bdf8'; // high
    return '#8ed5ff'; // max
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="p-6 sm:p-10 rounded-3xl bg-[#1a1b21] border border-[#3e484f]/40 shadow-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#8ed5ff]">
              <Terminal className="w-5 h-5 text-[#8ed5ff]" />
              <span className="font-mono-code text-[11px] uppercase tracking-widest font-semibold">
                Open Source Telemetry
              </span>
            </div>
            <h3 className="font-headline text-[26px] sm:text-[32px] font-bold text-[#e3e1e9]">
              Building in Public.
            </h3>
            <p className="text-[14px] text-[#bdc8d1]">
              Simulated live commit activity and reusable DevSecOps blueprints for the engineering community.
            </p>
          </div>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(56,189,248,0.25)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono-code text-[12px] font-semibold bg-[#292a2f] border border-[#3e484f]/50 text-[#8ed5ff] hover:bg-[#8ed5ff] hover:text-[#00354a] transition-all self-start lg:self-auto shadow-md"
          >
            <GitCommitIcon className="w-4 h-4" />
            <span>Explore GitHub Repos</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Contribution Heatmap Container */}
        <div className="p-5 rounded-2xl bg-[#0d0e13] border border-[#34343a] overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 font-mono-code text-[12px] text-[#bdc8d1]">
            <span className="leading-relaxed">Continuous Engineering Dispatch (Last 52 Weeks)</span>
            <span className="text-[#56e5a9] font-bold shrink-0">1,480+ Total Commits</span>
          </div>

          {/* Render CSS Grid Heatmap with interactive cell hover */}
          <div className="min-w-[680px] flex gap-1.5 py-2">
            {weeks.map((week) => (
              <div key={week} className="flex flex-col gap-1.5">
                {days.map((day) => {
                  const bg = getCellColor(week, day);
                  return (
                    <motion.div
                      key={day}
                      whileHover={{ scale: 1.45, zIndex: 10 }}
                      className="w-3 h-3 rounded-[2px] cursor-pointer"
                      style={{ backgroundColor: bg }}
                      title={`Week ${week + 1}, Day ${day + 1}: Active dispatch`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 font-mono-code text-[10px] text-[#bdc8d1]">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#1e1f25]"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#30c88f]/60"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#56e5a9]"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#38bdf8]"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8ed5ff]"></span>
            <span>More</span>
          </div>
        </div>

        {/* Live Terminal Feed Simulation */}
        <div className="mt-8 p-5 rounded-2xl bg-[#0d0e13] border border-[#34343a] font-mono-code text-[12px]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[#bdc8d1] mb-3 pb-2 border-b border-[#1e1f25]">
            <div className="flex items-start gap-2 min-w-0">
              <span className="text-[#56e5a9]">sohail@devsecops-box:~$</span>
              <span className="text-[#e3e1e9] break-all">git log -n 4 --oneline --graph</span>
            </div>
            <span className="text-[10px] text-[#bdc8d1] uppercase sm:text-right">Click commit to inspect</span>
          </div>

          <div className="flex flex-col gap-2 text-[#e3e1e9]">
            {GIT_COMMITS_DATA.map((commit) => (
              <motion.button
                key={commit.hash}
                onClick={() => setSelectedCommit(commit)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="text-left grid grid-cols-[auto_1fr_auto] sm:flex sm:items-start gap-x-2 gap-y-1 hover:bg-[#1a1b21] p-1.5 rounded-lg transition-colors cursor-pointer group"
              >
                <span className="text-[#8ed5ff] font-bold group-hover:underline whitespace-nowrap">
                  * {commit.hash}
                </span>
                <span className="text-[#bdc8d1] min-w-0 break-words">({commit.branch}) {commit.message}</span>
                <span className="text-[#87929a] text-[11px] shrink-0 justify-self-end">{commit.timeAgo}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedCommit && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 rounded-lg bg-[#1a1b21] border border-[#38bdf8]/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 overflow-hidden"
              >
                <div className="flex items-start gap-2 text-[#e3e1e9] min-w-0">
                  <Check className="w-4 h-4 text-[#56e5a9]" />
                  <span className="break-words">
                    Commit <strong className="text-[#8ed5ff]">{selectedCommit.hash}</strong> verified:
                    0 secrets, 0 policy regressions. Author:{' '}
                    <span className="text-[#56e5a9]">{selectedCommit.author}</span>
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCommit(null)}
                  className="text-[10px] text-[#bdc8d1] hover:text-[#e3e1e9] px-2 py-1 bg-[#292a2f] rounded cursor-pointer"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
