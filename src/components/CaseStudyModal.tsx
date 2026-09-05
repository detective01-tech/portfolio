/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Terminal, X, ShieldCheck, Zap, Activity } from 'lucide-react';
import { ProjectItem } from '../types';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        id="case-study-modal-container"
        className="w-full max-w-2xl max-h-[90vh] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h4
                id="modal-project-title"
                className="font-headline text-[18px] font-semibold text-white"
              >
                {caseStudy.title}
              </h4>
              <span
                id="modal-project-meta"
                className="text-xs text-zinc-400 font-mono"
              >
                {caseStudy.subtitle}
              </span>
            </div>
          </div>

          <button
            id="close-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-750 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Section 01: Problem & System Scope */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-zinc-400 font-medium uppercase tracking-wider">
              01 / Problem &amp; Scope
            </span>
            <p
              id="modal-project-overview"
              className="text-[14px] text-zinc-300 leading-relaxed font-normal"
            >
              {caseStudy.problemScope}
            </p>
          </div>

          {/* Section 02: Technical Architecture */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-zinc-400 font-medium uppercase tracking-wider">
              02 / Architecture Details
            </span>
            <div
              id="modal-project-arch"
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed"
            >
              {caseStudy.technicalArchitecture}
            </div>
          </div>

          {/* Section 03: Security Considerations */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-emerald-400 font-medium uppercase tracking-wider">
              03 / Security &amp; DevSecOps Verification
            </span>
            <ul
              id="modal-project-sec"
              className="list-disc list-inside text-[14px] text-zinc-400 flex flex-col gap-2 pl-1"
            >
              {caseStudy.securityConsiderations.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center font-mono">
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[11px] uppercase">LATENCY</span>
              <span className="text-emerald-400 font-semibold text-base sm:text-lg mt-0.5">
                {caseStudy.latencyMetric}
              </span>
            </div>
            <div className="flex flex-col border-x border-zinc-850">
              <span className="text-zinc-500 text-[11px] uppercase">AVAILABILITY</span>
              <span className="text-zinc-200 font-semibold text-base sm:text-lg mt-0.5">
                {caseStudy.availabilityMetric}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[11px] uppercase">SECURITY</span>
              <span className="text-zinc-300 font-semibold text-base sm:text-lg mt-0.5">
                {caseStudy.securityStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-end">
          <button
            id="modal-dismiss-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-700/60"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
