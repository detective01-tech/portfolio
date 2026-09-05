/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Play,
  Terminal as TerminalIcon,
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onProjectsClick }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'pipeline' | 'terminal'>('code');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'sohail@cluster-node-01:~$ ./security-audit.sh --target=prod-mesh',
    '[OK] Loaded zero-trust policy engine v4.8.2',
    '[PASS] Gitleaks: 0 entropy leaks detected across 1,480 commits',
    '[PASS] Trivy: 0 Critical / 0 High CVE vulnerabilities',
    '[SYS] Canary mesh: 100% healthy (P99: 13.8ms)'
  ]);
  const [isRunningAudit, setIsRunningAudit] = useState(false);

  const handleRunAudit = () => {
    if (isRunningAudit) return;
    setIsRunningAudit(true);
    setTerminalLogs(prev => [...prev, '\n> Triggering comprehensive cluster audit...']);

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, '[SAST] Inspecting AST contracts against OWASP Top 10...']);
    }, 400);

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, '[OCI] Trivy inspecting distroless base layer... Clean.']);
    }, 900);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        '[PROD] Attestation signed with Cosign key ID: 4B8F-90C1',
        '✓ ALL POLICY GATES PASSED (100% Green)'
      ]);
      setIsRunningAudit(false);
    }, 1400);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalLogs(prev => [...prev, `sohail@cluster-node-01:~$ ${terminalInput}`]);

    if (cmd === 'help') {
      setTerminalLogs(prev => [
        ...prev,
        'Available commands: audit, cve, status, clear, stack, ping'
      ]);
    } else if (cmd === 'audit') {
      handleRunAudit();
    } else if (cmd === 'cve') {
      setTerminalLogs(prev => [
        ...prev,
        'Trivy Report: 0 Critical, 0 High, 0 Medium, 0 Low vulnerabilities.'
      ]);
    } else if (cmd === 'status') {
      setTerminalLogs(prev => [
        ...prev,
        'Cluster status: ALL 12 PODS HEALTHY | Memory: 3.4GB / 32GB | Latency: 13.8ms'
      ]);
    } else if (cmd === 'stack') {
      setTerminalLogs(prev => [
        ...prev,
        'Stack: Flutter, TypeScript, Next.js, Node.js, Python, AWS ECS, Docker, Terraform'
      ]);
    } else if (cmd === 'ping') {
      setTerminalLogs(prev => [...prev, 'pong: latency 1.4ms to us-east-1a']);
    } else if (cmd === 'clear') {
      setTerminalLogs(['Console cleared. Ready for dispatch.']);
    } else {
      setTerminalLogs(prev => [
        ...prev,
        `bash: command not found: ${terminalInput}. Type 'help' for options.`
      ]);
    }
    setTerminalInput('');
  };

  return (
    <section
      id="hero"
      className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 min-h-[calc(100vh-5rem)] flex items-center py-16 lg:py-24"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Narrative Column (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Location & Role pill */}
          <motion.div
            id="hero-role-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Lead Full-Stack &amp; DevSecOps Engineer</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Open to Global Roles</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col"
          >
            <h1
              id="hero-main-heading"
              className="font-headline text-[36px] sm:text-[48px] md:text-[54px] lg:text-[58px] font-bold tracking-tight text-white leading-[1.12]"
            >
              Building resilient digital products with zero-trust engineering.
            </h1>
          </motion.div>

          {/* Supporting narrative */}
          <motion.p
            id="hero-narrative"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[17px] sm:text-[18px] text-zinc-400 max-w-2xl leading-relaxed font-normal"
          >
            Hi, I'm <span className="text-zinc-100 font-semibold">Muhammad Sohail</span>. I engineer high-performance mobile applications in Flutter, distributed web platforms with Next.js &amp; Node, and automated cloud security pipelines that verify every line from commit to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 w-full pt-2"
          >
            <button
              id="hero-view-work-btn"
              onClick={onProjectsClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-150 cursor-pointer shadow-sm group"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-connect-btn"
              onClick={onContactClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-medium bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all duration-150 border border-zinc-800 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-zinc-400" />
              <span>Let's Talk</span>
            </button>
          </motion.div>

          {/* Real engineering highlights */}
          <motion.div
            id="system-telemetry-ticker"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full pt-4 grid grid-cols-3 gap-3 sm:gap-4 border-t border-zinc-800/80 mt-2"
          >
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium">Core Stack</span>
              <span className="text-sm sm:text-[15px] font-semibold text-zinc-200 mt-1">
                Flutter • Next.js • Go
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium">Cloud &amp; Infra</span>
              <span className="text-sm sm:text-[15px] font-semibold text-zinc-200 mt-1">
                AWS ECS • Docker • K8s
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium">Security Gate</span>
              <span className="text-sm sm:text-[15px] font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                <span>Zero-Trust Verified</span>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Workstation & Code Console UI (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center"
        >
          {/* Workstation Frame */}
          <div
            id="workstation-chassis"
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden shadow-black/80"
          >
            {/* Window Header Bar */}
            <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <span className="ml-2 font-mono text-[11px] text-zinc-400 font-normal hidden sm:inline">
                  src/security/zero-trust-guard.ts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-[10px] text-emerald-400 uppercase font-medium tracking-wider">
                  Verified
                </span>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center border-b border-zinc-800 bg-zinc-900/40 px-3 text-[12px]">
              <button
                id="tab-code-btn"
                onClick={() => setActiveTab('code')}
                className={`px-3 py-2 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer font-medium ${
                  activeTab === 'code'
                    ? 'border-white text-white bg-zinc-950/60'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                <span>Policy Engine</span>
              </button>
              <button
                id="tab-pipeline-btn"
                onClick={() => setActiveTab('pipeline')}
                className={`px-3 py-2 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer font-medium ${
                  activeTab === 'pipeline'
                    ? 'border-white text-white bg-zinc-950/60'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                <span>Pipeline Gates</span>
              </button>
              <button
                id="tab-terminal-btn"
                onClick={() => setActiveTab('terminal')}
                className={`px-3 py-2 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer font-medium ${
                  activeTab === 'terminal'
                    ? 'border-white text-white bg-zinc-950/60'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
                <span>Interactive CLI</span>
              </button>
            </div>

            {/* Code Editor Body / Tab Content */}
            {activeTab === 'code' && (
              <div className="p-5 font-mono text-[12px] bg-zinc-950 leading-relaxed select-none overflow-x-auto min-h-[310px]">
                <div className="text-zinc-500">// Zero-trust policy enforcement &amp; OCI container verification</div>
                <div className="mt-1">
                  <span className="text-purple-400">import</span> &#123;{' '}
                  <span className="text-blue-300">ZeroTrustEngine</span>,{' '}
                  <span className="text-blue-300">PolicyAuditor</span> &#125;{' '}
                  <span className="text-purple-400">from</span>{' '}
                  <span className="text-emerald-400">'@cluster/security'</span>;
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">export async function</span>{' '}
                  <span className="text-amber-300">enforceCompliance</span>(ctx:{' '}
                  <span className="text-blue-300">ClusterContext</span>) &#123;
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">const</span> audit ={' '}
                  <span className="text-purple-400">await</span>{' '}
                  <span className="text-blue-300">PolicyAuditor</span>.
                  <span className="text-amber-300">scanPayload</span>(&#123;
                </div>
                <div className="pl-8">
                  spec: ctx.<span className="text-zinc-300">deploymentConfig</span>,
                </div>
                <div className="pl-8">
                  sastChecks: [<span className="text-emerald-400">'OWASP-TOP-10'</span>,{' '}
                  <span className="text-emerald-400">'SECRET_LEAKS'</span>],
                </div>
                <div className="pl-8">
                  mTLSStrict: <span className="text-emerald-400 font-bold">true</span>,
                </div>
                <div className="pl-4">&#125;);</div>
                <div className="pl-4 mt-1">
                  <span className="text-purple-400">if</span> (!audit.passed){' '}
                  <span className="text-purple-400">throw new</span>{' '}
                  <span className="text-rose-400">SecurityGateException</span>(audit.violations);
                </div>
                <div className="pl-4 text-emerald-400">
                  <span className="text-purple-400">return</span> ctx.promoteToProduction(&#123; zeroDowntime:{' '}
                  <span className="font-bold">true</span> &#125;);
                </div>
                <div>&#125;</div>

                {/* Sub-card dispatch status */}
                <div className="mt-4 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] flex flex-col gap-1">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="font-medium text-zinc-300">PIPELINE AUDIT: PASS</span>
                    <span className="text-emerald-400 font-semibold">ALL GATES VERIFIED</span>
                  </div>
                  <div className="text-zinc-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Trivy CVE scan: 0 critical / 0 high vulnerabilities</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pipeline' && (
              <div className="p-5 font-mono text-[12px] bg-zinc-950 flex flex-col gap-2.5 min-h-[310px]">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400 text-xs font-sans font-medium">PIPELINE STAGE GATES</span>
                  <button
                    onClick={handleRunAudit}
                    disabled={isRunningAudit}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-800 text-[11px] cursor-pointer transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRunningAudit ? 'animate-spin' : ''}`} />
                    <span>{isRunningAudit ? 'Scanning...' : 'Trigger Audit'}</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-zinc-200 font-medium">Stage 01: STRIDE Threat Model</span>
                    </div>
                    <span className="text-emerald-400 text-[11px]">PASSED</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-zinc-200 font-medium">Stage 02: Gitleaks Entropy Check</span>
                    </div>
                    <span className="text-emerald-400 text-[11px]">0 SECRETS</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-zinc-200 font-medium">Stage 03: Distroless OCI Packaging</span>
                    </div>
                    <span className="text-zinc-400 text-[11px]">HARDENED</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-zinc-200 font-medium">Stage 05: Trivy SAST &amp; CVE Scan</span>
                    </div>
                    <span className="text-emerald-400 text-[11px]">0 VULNERABILITIES</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">●</span>
                      <span className="text-zinc-200 font-medium">Stage 06: Blue/Green Deployment</span>
                    </div>
                    <span className="text-blue-400 text-[11px]">HEALTHY</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'terminal' && (
              <div className="p-4 font-mono text-[12px] bg-zinc-950 flex flex-col justify-between min-h-[310px]">
                <div className="overflow-y-auto max-h-[220px] flex flex-col gap-1 text-zinc-400 leading-relaxed">
                  {terminalLogs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.includes('[PASS]') || log.includes('✓')
                          ? 'text-emerald-400'
                          : log.includes('[OK]') || log.includes('[SYS]')
                          ? 'text-zinc-200'
                          : log.includes('sohail@')
                          ? 'text-white font-semibold'
                          : 'text-zinc-400'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold text-[12px]">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type 'help', 'audit', 'status', 'cve'..."
                    className="flex-1 bg-transparent text-zinc-200 text-[12px] focus:outline-none placeholder-zinc-600"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-[11px] hover:bg-zinc-700 hover:text-white transition-colors"
                  >
                    Run
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Console Bar */}
            <div className="px-4 py-2.5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between font-mono text-[11px] text-zinc-400">
              <span>cluster: us-east-1a [prod-mesh]</span>
              <span className="text-emerald-400 font-medium">Healthy • 13.8ms</span>
            </div>
          </div>

          {/* Clean Tech stack chips under editor */}
          <div className="w-full flex flex-wrap items-center justify-center gap-2 mt-4">
            {['Flutter', 'Next.js', 'Node.js', 'TypeScript', 'AWS ECS', 'Docker', 'Terraform', 'PostgreSQL'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

