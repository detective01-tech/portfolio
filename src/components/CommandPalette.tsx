/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Search,
  ArrowRight,
  CornerDownLeft,
  X,
  ShieldCheck,
  Rocket,
  Wrench,
  Download,
  Mail,
  Key,
  FolderGit2,
  Route,
  Handshake,
  History,
  Activity,
  HelpCircle,
  Check,
  Code
} from 'lucide-react';
import { PROJECTS_DATA, SKILLS_DATA } from '../data/portfolio-data';
import { ProjectItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onNavigateSection: (sectionId: string) => void;
  onShowToast: (message: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'directive' | 'navigation' | 'project' | 'skill' | 'action';
  description?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  keywords?: string[];
}

interface TerminalLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onNavigateSection,
  onShowToast
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle system resume download
  const handleDownloadResume = () => {
    onShowToast('Engineering resume downloaded (Sohail_Muhammad_DevSecOps.pdf)');
    const blob = new Blob(
      [
        `MUHAMMAD SOHAIL — LEAD FULL-STACK & DEVSECOPS ENGINEER\n` +
        `Portfolio & Workstation: https://github.com\n` +
        `Architecture: Zero-Trust Security, High-Concurrency Full Stack, Automated CI/CD Pipelines\n` +
        `Core Arsenal: Flutter, Next.js, Node.js, Python, PostgreSQL, Docker, Kubernetes, AWS, Trivy, Gitleaks\n` +
        `Verified GPG: 4A7B 89F1 2C3D 00E9 B1F4\n`
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sohail_Muhammad_DevSecOps_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  // Copy email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sohailmuhammad0318@gmail.com');
    onShowToast('Encrypted email copied: sohailmuhammad0318@gmail.com');
    onClose();
  };

  // Copy GPG Key
  const handleCopyGPG = () => {
    navigator.clipboard.writeText('4A7B 89F1 2C3D 00E9 B1F4');
    onShowToast('GPG Fingerprint copied: 4A7B 89F1 2C3D 00E9 B1F4');
    onClose();
  };

  // Trigger DevSecOps simulation
  const handleRunSecurityAudit = () => {
    const simLog: TerminalLog = {
      id: Date.now().toString(),
      command: 'audit --stride --zero-trust',
      timestamp: new Date().toLocaleTimeString(),
      output: (
        <div className="font-mono-code text-[12px] space-y-1 text-[#e3e1e9]">
          <div className="text-[#56e5a9] font-bold">[*] INITIALIZING 7-GATE DEVSECOPS SECURITY SCAN...</div>
          <div>[✓] Gate 01: STRIDE Threat Matrix validated. Zero-Trust perimeter verified.</div>
          <div>[✓] Gate 02: Gitleaks pre-commit entropy scan: 0 hardcoded credentials found.</div>
          <div>[✓] Gate 03: Multi-stage Distroless OCI build: Cosign signature valid.</div>
          <div>[✓] Gate 04: Vitest &amp; Playwright suites: 100% tests passed (0 flakes).</div>
          <div>[✓] Gate 05: Trivy CVE scan: 0 Critical / 0 High vulnerabilities.</div>
          <div>[✓] Gate 06: Blue/Green AWS ECS orchestrator: zero-downtime routing green.</div>
          <div>[✓] Gate 07: eBPF runtime monitor &amp; CloudWatch: 12ms latency baseline.</div>
          <div className="text-[#8ed5ff] pt-1 font-bold">
            [RESULT] AUDIT 100% COMPLIANT. SYSTEM INTEGRITY OPTIMAL.
          </div>
        </div>
      )
    };
    setTerminalLogs((prev) => [simLog, ...prev]);
    onShowToast('Security Audit Simulation Completed (100% Passed)');
  };

  // Predefined terminal commands and navigational items
  const allCommands: CommandItem[] = useMemo(() => {
    return [
      // Directives
      {
        id: 'cmd-audit',
        title: 'audit --zero-trust',
        category: 'directive',
        description: 'Execute full 7-gate DevSecOps container and vulnerability scan',
        icon: <ShieldCheck className="w-4 h-4 text-[#56e5a9]" />,
        shortcut: 'EXEC',
        keywords: ['audit', 'scan', 'security', 'cve', 'trivy', 'stride', 'check'],
        action: () => handleRunSecurityAudit()
      },
      {
        id: 'cmd-whoami',
        title: 'whoami',
        category: 'directive',
        description: 'Display identity, verified certifications, and engineering credentials',
        icon: <Terminal className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: 'INFO',
        keywords: ['whoami', 'sohail', 'author', 'bio', 'identity'],
        action: () => {
          setTerminalLogs((prev) => [
            {
              id: Date.now().toString(),
              command: 'whoami',
              timestamp: new Date().toLocaleTimeString(),
              output: (
                <div className="font-mono-code text-[12px] text-[#e3e1e9] space-y-1">
                  <div className="text-[#8ed5ff] font-bold">
                    Muhammad Sohail — Full-Stack &amp; DevSecOps Lead Engineer
                  </div>
                  <div className="text-[#bdc8d1]">
                    Specialization: Secure Microservices, Zero-Knowledge Cross-Platform Apps, Automated CI/CD Infrastructure.
                  </div>
                  <div className="text-[#56e5a9]">
                    Status: Active • Open for Senior &amp; Staff High-Impact Engineering Roles.
                  </div>
                </div>
              )
            },
            ...prev
          ]);
        }
      },
      {
        id: 'cmd-neofetch',
        title: 'neofetch',
        category: 'directive',
        description: 'Display workstation architecture and runtime system stats',
        icon: <Activity className="w-4 h-4 text-[#c0c1ff]" />,
        shortcut: 'SPEC',
        keywords: ['neofetch', 'sysinfo', 'specs', 'os', 'system'],
        action: () => {
          setTerminalLogs((prev) => [
            {
              id: Date.now().toString(),
              command: 'neofetch',
              timestamp: new Date().toLocaleTimeString(),
              output: (
                <div className="font-mono-code text-[11px] text-[#e3e1e9] grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#121318] p-3 rounded-lg border border-[#3e484f]/40">
                  <div>
                    <span className="text-[#8ed5ff] font-bold">OS:</span> Alpine Linux x86_64 Hardened<br />
                    <span className="text-[#8ed5ff] font-bold">KERNEL:</span> 6.8.0-devsecops-ebpf<br />
                    <span className="text-[#8ed5ff] font-bold">SHELL:</span> zsh 5.9 (x86_64-alpine)<br />
                    <span className="text-[#8ed5ff] font-bold">CONTAINER:</span> Distroless OCI Kaniko
                  </div>
                  <div>
                    <span className="text-[#56e5a9] font-bold">STACK:</span> Flutter / Next.js / Node / FastAPI<br />
                    <span className="text-[#56e5a9] font-bold">CLOUD:</span> AWS ECS / Route53 / Terraform<br />
                    <span className="text-[#56e5a9] font-bold">CI GATES:</span> Gitleaks + Trivy + SonarQube<br />
                    <span className="text-[#56e5a9] font-bold">UPTIME:</span> 99.99% • 1,480+ Commits
                  </div>
                </div>
              )
            },
            ...prev
          ]);
        }
      },
      {
        id: 'cmd-clear',
        title: 'clear',
        category: 'directive',
        description: 'Clear terminal audit telemetry outputs',
        icon: <X className="w-4 h-4 text-[#ffb4ab]" />,
        shortcut: 'RESET',
        keywords: ['clear', 'cls', 'clean', 'reset'],
        action: () => {
          setTerminalLogs([]);
          setQuery('');
        }
      },
      {
        id: 'cmd-help',
        title: 'help',
        category: 'directive',
        description: 'List available terminal directives and keyboard shortcuts',
        icon: <HelpCircle className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: 'MAN',
        keywords: ['help', 'commands', 'man', 'guide', 'usage'],
        action: () => {
          setTerminalLogs((prev) => [
            {
              id: Date.now().toString(),
              command: 'help',
              timestamp: new Date().toLocaleTimeString(),
              output: (
                <div className="font-mono-code text-[11px] text-[#e3e1e9] space-y-1">
                  <div className="text-[#8ed5ff] font-bold">AVAILABLE CLI DIRECTIVES:</div>
                  <div><span className="text-[#56e5a9]">audit</span> — Run full 7-gate automated security verification</div>
                  <div><span className="text-[#56e5a9]">whoami</span> — Display engineer identity &amp; credentials</div>
                  <div><span className="text-[#56e5a9]">neofetch</span> — Print workstation specs &amp; runtime architecture</div>
                  <div><span className="text-[#56e5a9]">resume</span> — Download technical PDF resume</div>
                  <div><span className="text-[#56e5a9]">clear</span> — Flush console output buffer</div>
                  <div className="text-[#bdc8d1] pt-1">
                    Or query any project, skill, or section (e.g. "nexora", "flutter", "aws", "docker").
                  </div>
                </div>
              )
            },
            ...prev
          ]);
        }
      },

      // Navigation Links
      {
        id: 'nav-hero',
        title: 'jump:hero (Terminal Workstation)',
        category: 'navigation',
        description: 'Scroll to terminal greeting & engineering overview',
        icon: <Terminal className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#hero',
        keywords: ['hero', 'home', 'terminal', 'greeting', 'top'],
        action: () => {
          onNavigateSection('hero');
          onClose();
        }
      },
      {
        id: 'nav-about',
        title: 'jump:about (Engineering Philosophy)',
        category: 'navigation',
        description: 'Core tenets: Clean Code, Zero Tech Debt, Security-First',
        icon: <ShieldCheck className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#about',
        keywords: ['about', 'philosophy', 'tenets', 'principles'],
        action: () => {
          onNavigateSection('about');
          onClose();
        }
      },
      {
        id: 'nav-skills',
        title: 'jump:skills (Technical Arsenal)',
        category: 'navigation',
        description: 'Frontend, backend, databases, cloud, and security stacks',
        icon: <Wrench className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#skills',
        keywords: ['skills', 'arsenal', 'tech', 'stack', 'languages', 'tools'],
        action: () => {
          onNavigateSection('skills');
          onClose();
        }
      },
      {
        id: 'nav-devsecops',
        title: 'jump:devsecops (7-Gate CI/CD Pipeline)',
        category: 'navigation',
        description: 'Interactive blueprint from Threat Modeling to eBPF Telemetry',
        icon: <ShieldCheck className="w-4 h-4 text-[#56e5a9]" />,
        shortcut: '#devsecops',
        keywords: ['pipeline', 'devsecops', 'ci', 'cd', 'trivy', 'gitleaks', 'gates'],
        action: () => {
          onNavigateSection('devsecops');
          onClose();
        }
      },
      {
        id: 'nav-projects',
        title: 'jump:projects (Production Projects)',
        category: 'navigation',
        description: 'Nexora, Wearixa, Enterprise Testing Labs',
        icon: <Rocket className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#projects',
        keywords: ['projects', 'work', 'showcase', 'apps', 'nexora', 'wearixa'],
        action: () => {
          onNavigateSection('projects');
          onClose();
        }
      },
      {
        id: 'nav-workflow',
        title: 'jump:workflow (7-Phase Engineering Lifecycle)',
        category: 'navigation',
        description: 'From Architecture Design to Production Post-Mortems',
        icon: <Route className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#workflow',
        keywords: ['workflow', 'phases', 'process', 'sdlc', 'methodology'],
        action: () => {
          onNavigateSection('workflow');
          onClose();
        }
      },
      {
        id: 'nav-services',
        title: 'jump:services (Capabilities & Services)',
        category: 'navigation',
        description: 'Mobile, web architecture, cloud migration, security audits',
        icon: <Handshake className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#services',
        keywords: ['services', 'consulting', 'capabilities', 'hire', 'offerings'],
        action: () => {
          onNavigateSection('services');
          onClose();
        }
      },
      {
        id: 'nav-experience',
        title: 'jump:experience (Career Milestones)',
        category: 'navigation',
        description: 'Chronological timeline of technical leadership and roles',
        icon: <History className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#experience',
        keywords: ['experience', 'history', 'career', 'jobs', 'timeline'],
        action: () => {
          onNavigateSection('experience');
          onClose();
        }
      },
      {
        id: 'nav-git',
        title: 'jump:git (Building In Public)',
        category: 'navigation',
        description: 'Git contribution telemetry & verified commit logs',
        icon: <FolderGit2 className="w-4 h-4 text-[#56e5a9]" />,
        shortcut: '#git',
        keywords: ['git', 'github', 'commits', 'telemetry', 'heatmap', 'public'],
        action: () => {
          const el = document.getElementById('building-in-public') || document.getElementById('devsecops');
          el?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        }
      },
      {
        id: 'nav-contact',
        title: 'jump:contact (Encrypted Dispatch)',
        category: 'navigation',
        description: 'Contact form, direct email, and GPG fingerprint',
        icon: <Mail className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: '#contact',
        keywords: ['contact', 'email', 'message', 'dispatch', 'touch', 'hire'],
        action: () => {
          onNavigateSection('contact');
          onClose();
        }
      },

      // Project Case Studies
      ...PROJECTS_DATA.map((project) => ({
        id: `proj-${project.id}`,
        title: `case-study: ${project.title.split('—')[0].trim()}`,
        category: 'project' as const,
        description: project.description.slice(0, 85) + '...',
        icon: <Rocket className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: 'MODAL',
        keywords: [project.id, project.title.toLowerCase(), ...project.techTags.map((t) => t.toLowerCase())],
        action: () => {
          onSelectProject(project);
          onClose();
        }
      })),

      // Skills & Arsenal
      ...SKILLS_DATA.map((skill) => ({
        id: `skill-${skill.id}`,
        title: `inspect: ${skill.name}`,
        category: 'skill' as const,
        description: `[${skill.badge}] ${skill.description.slice(0, 80)}...`,
        icon: <Code className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: skill.category.toUpperCase(),
        keywords: [skill.id, skill.name.toLowerCase(), skill.category, ...skill.tags.map((t) => t.toLowerCase())],
        action: () => {
          onNavigateSection('skills');
          onShowToast(`Inspecting Arsenal: ${skill.name}`);
          onClose();
        }
      })),

      // Actions
      {
        id: 'action-resume',
        title: 'download: Engineering Resume (PDF)',
        category: 'action',
        description: 'Export verified technical resume and credentials file',
        icon: <Download className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: 'SAVE',
        keywords: ['resume', 'cv', 'pdf', 'download', 'credentials'],
        action: handleDownloadResume
      },
      {
        id: 'action-email',
        title: 'copy: Encrypted Email Address',
        category: 'action',
        description: 'sohailmuhammad0318@gmail.com',
        icon: <Mail className="w-4 h-4 text-[#8ed5ff]" />,
        shortcut: 'COPY',
        keywords: ['email', 'copy', 'mail', 'address'],
        action: handleCopyEmail
      },
      {
        id: 'action-gpg',
        title: 'copy: GPG Fingerprint Key',
        category: 'action',
        description: '4A7B 89F1 2C3D 00E9 B1F4',
        icon: <Key className="w-4 h-4 text-[#56e5a9]" />,
        shortcut: 'GPG',
        keywords: ['gpg', 'key', 'fingerprint', 'encrypt', 'pgp'],
        action: handleCopyGPG
      }
    ];
  }, [onNavigateSection, onSelectProject, onShowToast]);

  // Filter commands based on query and category
  const filteredCommands = useMemo(() => {
    const cleanQuery = query.toLowerCase().trim();

    return allCommands.filter((cmd) => {
      // Category match
      if (activeCategory !== 'all' && cmd.category !== activeCategory) {
        return false;
      }

      if (!cleanQuery) return true;

      // Match query
      const matchTitle = cmd.title.toLowerCase().includes(cleanQuery);
      const matchDesc = cmd.description?.toLowerCase().includes(cleanQuery);
      const matchKeywords = cmd.keywords?.some((kw) => kw.includes(cleanQuery));

      return matchTitle || matchDesc || matchKeywords;
    });
  }, [allCommands, query, activeCategory]);

  // Reset selected index if results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length, query, activeCategory]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();

      // Check for direct CLI text commands like "audit", "clear", "help", "whoami", "neofetch"
      const lower = query.toLowerCase().trim();
      const directMatch = allCommands.find((c) => c.title.toLowerCase() === lower || c.id === `cmd-${lower}`);

      if (directMatch) {
        directMatch.action();
        if (directMatch.category !== 'directive') {
          onClose();
        }
      } else if (filteredCommands.length > 0) {
        filteredCommands[selectedIndex]?.action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="command-palette-backdrop"
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      >
        {/* Command Palette Terminal Chassis */}
        <motion.div
          id="command-palette-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-full max-w-2xl rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col font-mono"
        >
          {/* Terminal Title Bar */}
          <div className="h-10 px-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-2.5 h-2.5 rounded-full bg-zinc-600 hover:bg-red-500 transition-colors cursor-pointer"
                title="Close"
              />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-400 tracking-wide truncate">
                portfolio-cli — sohail@workstation:~
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                READY
              </span>
              <button
                id="close-command-palette"
                onClick={onClose}
                className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Exit (Esc)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Command Input with DevSecOps Prompt and Blinking Cursor */}
          <div className="p-3.5 bg-zinc-900 border-b border-zinc-800 relative flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-300">sohail</span>
              <span className="text-zinc-600">@</span>
              <span className="text-emerald-400">cli:~$</span>
            </div>

            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                id="terminal-command-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command or query (e.g. 'audit', 'projects', 'resume')..."
                className="w-full bg-transparent font-mono text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
                autoComplete="off"
                spellCheck={false}
              />
              {/* DevSecOps Terminal Blinking Cursor Effect */}
              <span
                className="inline-block w-2 h-4 bg-emerald-400 animate-terminal-cursor pointer-events-none select-none ml-0.5"
                aria-hidden="true"
              />
            </div>

            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[11px] text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-zinc-800 cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="px-3.5 py-2 bg-zinc-950 border-b border-zinc-850 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-zinc-500 uppercase text-[10px] tracking-wider shrink-0 mr-1">
              FILTER:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'directive', label: 'Commands' },
              { id: 'navigation', label: 'Jump' },
              { id: 'project', label: 'Projects' },
              { id: 'skill', label: 'Stack' },
              { id: 'action', label: 'Actions' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-zinc-800 text-white font-medium'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Terminal Real-Time Output Logs (If audit, whoami, neofetch, etc. ran) */}
          {terminalLogs.length > 0 && (
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 max-h-48 overflow-y-auto space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-zinc-850">
                <span className="text-[10px] uppercase text-zinc-500 font-medium tracking-wider">
                  OUTPUT LOG
                </span>
                <button
                  onClick={() => setTerminalLogs([])}
                  className="text-[10px] text-zinc-400 hover:text-white cursor-pointer"
                >
                  Clear output
                </button>
              </div>

              {terminalLogs.map((log) => (
                <div key={log.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="text-emerald-400">$</span>
                    <span className="font-semibold text-white">{log.command}</span>
                    <span className="text-zinc-600 text-[10px]">[{log.timestamp}]</span>
                  </div>
                  <div className="pl-3 border-l border-zinc-800 text-zinc-300 text-xs">
                    {log.output}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results List */}
          <div
            ref={listRef}
            id="command-results-list"
            className="max-h-72 sm:max-h-80 overflow-y-auto p-2 divide-y divide-zinc-850/50"
          >
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <Terminal className="w-6 h-6 text-zinc-600" />
                <span className="text-zinc-400 text-xs">
                  No matching command or query for "{query}".
                </span>
                <span className="text-zinc-600 text-[11px]">
                  Try typing <span className="text-zinc-400">audit</span>,{' '}
                  <span className="text-zinc-400">help</span>,{' '}
                  <span className="text-zinc-400">projects</span>, or{' '}
                  <span className="text-zinc-400">resume</span>.
                </span>
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;

                return (
                  <div
                    key={cmd.id}
                    id={`cmd-item-${cmd.id}`}
                    onClick={() => {
                      cmd.action();
                      if (cmd.category !== 'directive') {
                        onClose();
                      }
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-2.5 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-zinc-800 text-white'
                        : 'text-zinc-300 hover:bg-zinc-850/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-zinc-700 text-white'
                            : 'bg-zinc-950 text-zinc-400'
                        }`}
                      >
                        {cmd.icon}
                      </div>

                      <div className="flex flex-col truncate">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold truncate ${
                            isSelected ? 'text-white' : 'text-zinc-200'
                          }`}>
                            {cmd.title}
                          </span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-500 border border-zinc-800">
                            {cmd.category}
                          </span>
                        </div>
                        {cmd.description && (
                          <span className="text-[11px] text-zinc-400 truncate">
                            {cmd.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cmd.shortcut && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 font-mono">
                          {cmd.shortcut}
                        </span>
                      )}
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Terminal Command Palette Keyboard Shortcut Footer */}
          <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px]">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px]">
                  ↓
                </kbd>
                <span>Navigate</span>
              </span>

              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px]">
                  ↵
                </kbd>
                <span>Execute</span>
              </span>

              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px]">
                  ESC
                </kbd>
                <span>Exit</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-medium">ZERO-TRUST AUDIT: PASS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
