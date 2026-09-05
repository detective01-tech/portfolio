/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Route, Brain, PenTool, Code2, CheckSquare, ShieldCheck, Rocket, LineChart } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/portfolio-data';

export const WorkflowSection: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'psychology':
        return <Brain className="w-4 h-4 text-zinc-300" />;
      case 'design_services':
        return <PenTool className="w-4 h-4 text-zinc-300" />;
      case 'code_blocks':
        return <Code2 className="w-4 h-4 text-zinc-300" />;
      case 'fact_check':
        return <CheckSquare className="w-4 h-4 text-zinc-300" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'rocket':
        return <Rocket className="w-4 h-4 text-zinc-300" />;
      case 'monitoring':
      default:
        return <LineChart className="w-4 h-4 text-zinc-300" />;
    }
  };

  return (
    <section
      id="workflow"
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
          <Route className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
            Engineering Process
          </span>
        </div>
        <h2 className="font-headline text-[32px] sm:text-[40px] font-bold tracking-tight text-white">
          Disciplined execution cycle.
        </h2>
        <p className="text-[16px] text-zinc-400 max-w-2xl leading-relaxed font-normal">
          Mitigating architectural flaws early. Seven non-negotiable quality checkpoints driving features from specification to production cluster.
        </p>
      </motion.div>

      {/* 7 Continuous Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isWide = idx === 6; // Step 07 spans 2 columns
          const isSecurity = step.stepNumber === '05';

          return (
            <div
              key={step.stepNumber}
              id={`workflow-step-${step.stepNumber}`}
              className={`p-6 rounded-xl bg-zinc-900/40 border transition-colors flex flex-col gap-3 ${
                isWide ? 'md:col-span-2 lg:col-span-2' : ''
              } ${
                isSecurity
                  ? 'border-emerald-500/40 bg-zinc-900/60'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-sm font-semibold ${
                    isSecurity ? 'text-emerald-400' : 'text-zinc-500'
                  }`}
                >
                  STEP {step.stepNumber}
                </span>
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center">
                  {getStepIcon(step.icon)}
                </div>
              </div>

              <h4 className="font-headline text-[16px] font-semibold text-white">
                {step.title}
              </h4>

              <p className="text-[13px] text-zinc-400 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
