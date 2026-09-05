/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Play,
  CheckCircle,
  FileSearch,
  Code2,
  Box,
  ClipboardCheck,
  ShieldCheck,
  Rocket,
  Activity,
  RotateCcw
} from 'lucide-react';
import { PIPELINE_STAGES_DATA } from '../data/portfolio-data';
import { PipelineStage } from '../types';
import { DataFlowVisualization } from './DataFlowVisualization';

export const DevSecOpsPipeline: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('info-security');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedIndex, setSimulatedIndex] = useState<number | null>(null);

  const currentStage: PipelineStage =
    PIPELINE_STAGES_DATA.find((s) => s.id === selectedStageId) || PIPELINE_STAGES_DATA[4];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatedIndex(0);
    setSelectedStageId(PIPELINE_STAGES_DATA[0].id);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < PIPELINE_STAGES_DATA.length) {
        setSimulatedIndex(step);
        setSelectedStageId(PIPELINE_STAGES_DATA[step].id);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulatedIndex(null);
      }
    }, 1200);
  };

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'architecture':
        return <FileSearch className="w-5 h-5 text-zinc-300" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-zinc-300" />;
      case 'deployed_code':
        return <Box className="w-5 h-5 text-zinc-300" />;
      case 'fact_check':
        return <ClipboardCheck className="w-5 h-5 text-zinc-300" />;
      case 'shield_check':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'rocket_launch':
        return <Rocket className="w-5 h-5 text-zinc-300" />;
      case 'monitoring':
      default:
        return <Activity className="w-5 h-5 text-zinc-300" />;
    }
  };

  return (
    <section
      id="devsecops"
      className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-10 rounded-2xl bg-zinc-900/40 border border-zinc-800 relative overflow-hidden"
      >
        <div className="flex flex-col gap-2 max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
              Zero-Trust DevSecOps Architecture
            </span>
          </div>
          <h2 className="font-headline text-[30px] sm:text-[38px] font-bold tracking-tight text-white">
            Security isn't a feature. It's an immutable layer.
          </h2>
          <p className="text-[16px] text-zinc-400 leading-relaxed font-normal">
            Shifting security left: Every commit undergoes static analysis, secret entropy detection, container image scanning, and automated compliance verification before reaching staging.
          </p>
        </div>

        {/* Pipeline Control & Status */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-1">
            <span className="text-xs font-mono text-zinc-400 uppercase font-medium">
              Pipeline Stage Gates &amp; Telemetry
            </span>
            <div className="flex items-center gap-2.5">
              <button
                id="run-pipeline-simulation-btn"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 text-xs font-medium cursor-pointer transition-colors"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                    <span>Testing Stage {simulatedIndex !== null ? simulatedIndex + 1 : ''}...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current text-zinc-300" />
                    <span>Simulate Pipeline Verification</span>
                  </>
                )}
              </button>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                7 GATES ACTIVE
              </span>
            </div>
          </div>

          {/* 7-Stage Horizontal Pipeline Grid */}
          <div
            id="pipeline-stages-grid"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2"
          >
            {PIPELINE_STAGES_DATA.map((stage, idx) => {
              const isSelected = selectedStageId === stage.id;
              const isSimActive = simulatedIndex === idx;

              return (
                <button
                  key={stage.id}
                  id={`pipeline-stage-${stage.id}`}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`p-3.5 rounded-xl text-left flex flex-col gap-1 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-zinc-800/90 border-zinc-600 text-white'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300'
                  } ${isSimActive ? 'ring-2 ring-emerald-500' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-300">
                      {stage.stepNumber}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="font-headline text-[13px] text-zinc-100 font-semibold truncate">
                    {stage.subtitle}
                  </span>
                  <span className="text-[11px] text-zinc-400 truncate">
                    {stage.tools[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* D3.js Animated Zero-Trust Data-Flow Visualization */}
          <DataFlowVisualization
            selectedStageId={selectedStageId}
            onSelectStage={(stageId) => setSelectedStageId(stageId)}
          />

          {/* Dynamic Pipeline Stage Detail Pane */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              id="pipeline-detail-box"
              className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                  {getStageIcon(currentStage.icon)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-medium tracking-wider">
                    {currentStage.tag}
                  </span>
                  <h4 className="font-headline text-[18px] font-semibold text-white mt-0.5">
                    {currentStage.fullTitle}
                  </h4>
                  <p className="text-[14px] text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                    {currentStage.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                <div className="text-xs font-mono uppercase text-zinc-400 font-medium">
                  Verified Tools:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentStage.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
