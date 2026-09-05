/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import {
  ShieldAlert,
  Play,
  Pause,
  Zap,
  Activity,
  Cpu,
  Lock,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PIPELINE_STAGES_DATA } from '../data/portfolio-data';

interface PipelineNode {
  id: string;
  name: string;
  short: string;
  gateNumber: number;
  tool: string;
  x: number;
  y: number;
  status: 'active' | 'scanning' | 'passed';
}

interface Packet {
  id: number;
  progress: number; // 0 to 1
  speed: number;
  type: 'data' | 'auth' | 'telemetry' | 'threat';
  label: string;
  size: string;
  threatLevel: 'none' | 'blocked';
  blockedAtGate?: number;
  yOffset: number;
}

interface DataFlowVisualizationProps {
  onSelectStage?: (stageId: string) => void;
  selectedStageId?: string;
}

export const DataFlowVisualization: React.FC<DataFlowVisualizationProps> = ({
  onSelectStage,
  selectedStageId
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [dimensions, setDimensions] = useState({ width: 900, height: 260 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [trafficRate, setTrafficRate] = useState<'nominal' | 'high' | 'burst'>('nominal');
  const [packetsCount, setPacketsCount] = useState(14820);
  const [threatsBlocked, setThreatsBlocked] = useState(42);
  const [recentEvent, setRecentEvent] = useState<string>('mTLS tunnel active • Zero-Trust gates armed');
  const [hoveredNode, setHoveredNode] = useState<PipelineNode | null>(null);

  // Nodes definition mapped to pipeline stages
  const nodesRef = useRef<PipelineNode[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const packetIdCounter = useRef(1);
  const lastSpawnTime = useRef(0);
  const timerRef = useRef<d3.Timer | null>(null);

  // Measure container dimensions with ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width > 0) {
          // Adjust height based on width
          const h = width < 640 ? 300 : width < 1024 ? 260 : 250;
          setDimensions({ width, height: h });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute node positions based on dimensions
  const updateNodes = useCallback(() => {
    const { width, height } = dimensions;
    const paddingX = Math.max(45, width * 0.06);
    const availableWidth = width - paddingX * 2;
    const count = PIPELINE_STAGES_DATA.length;
    const step = availableWidth / (count - 1);
    const centerY = height * 0.52;

    const nodes: PipelineNode[] = PIPELINE_STAGES_DATA.map((stage, i) => {
      // Subtle sine wave variation for circuit path
      const waveY = centerY + Math.sin((i / (count - 1)) * Math.PI) * (width < 640 ? 15 : 24);

      return {
        id: stage.id,
        name: stage.shortTitle,
        short: `G${stage.stepNumber}`,
        gateNumber: parseInt(stage.stepNumber.replace('0', ''), 10) || i + 1,
        tool: stage.tools[0] || 'Enforcer',
        x: paddingX + i * step,
        y: waveY,
        status: 'active'
      };
    });

    nodesRef.current = nodes;
  }, [dimensions]);

  useEffect(() => {
    updateNodes();
  }, [dimensions, updateNodes]);

  // Spawn new packet
  const spawnPacket = useCallback(
    (forcedType?: 'threat' | 'data' | 'auth') => {
      const types: ('data' | 'auth' | 'telemetry')[] = ['data', 'auth', 'telemetry'];
      const chosenType = forcedType || types[Math.floor(Math.random() * types.length)];
      const isThreat = forcedType === 'threat';

      const speeds = {
        nominal: 0.0018 + Math.random() * 0.0006,
        high: 0.0035 + Math.random() * 0.001,
        burst: 0.006 + Math.random() * 0.0015
      };

      const packet: Packet = {
        id: packetIdCounter.current++,
        progress: 0,
        speed: speeds[trafficRate],
        type: isThreat ? 'threat' : chosenType,
        label: isThreat
          ? 'MALICIOUS_PROBE'
          : chosenType === 'auth'
          ? 'mTLS_TOKEN'
          : chosenType === 'telemetry'
          ? 'eBPF_TRACE'
          : 'OCI_ARTIFACT',
        size: `${Math.floor(Math.random() * 45 + 12)} KB`,
        threatLevel: isThreat ? 'blocked' : 'none',
        blockedAtGate: isThreat ? (Math.random() > 0.5 ? 2 : 5) : undefined, // Blocked at Secret Scan or Trivy
        yOffset: (Math.random() - 0.5) * 6
      };

      packetsRef.current.push(packet);
      setPacketsCount((prev) => prev + 1);

      if (isThreat) {
        setRecentEvent(`INTRUSION DETECTED: Rogue payload intercepted by Zero-Trust gate`);
      }
    },
    [trafficRate]
  );

  // Manual Trigger: Inject custom payload
  const handleInjectPayload = () => {
    spawnPacket('auth');
    setRecentEvent('CUSTOM DISPATCH: Verified mTLS cryptographic token injected into pipeline');
  };

  // Manual Trigger: Inject Threat simulation
  const handleInjectThreat = () => {
    spawnPacket('threat');
  };

  // Setup D3 Canvas and Continuous Data-Flow Loop
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Define SVG filters for high-tech cyber glow effects
    const defs = svg.append('defs');

    // Cyan Glow Filter
    const filterCyan = defs.append('filter').attr('id', 'glow-cyan').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filterCyan.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMergeCyan = filterCyan.append('feMerge');
    feMergeCyan.append('feMergeNode').attr('in', 'coloredBlur');
    feMergeCyan.append('feMergeNode').attr('in', 'SourceGraphic');

    // Emerald Glow Filter
    const filterGreen = defs.append('filter').attr('id', 'glow-green').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filterGreen.append('feGaussianBlur').attr('stdDeviation', '5').attr('result', 'coloredBlur');
    const feMergeGreen = filterGreen.append('feMerge');
    feMergeGreen.append('feMergeNode').attr('in', 'coloredBlur');
    feMergeGreen.append('feMergeNode').attr('in', 'SourceGraphic');

    // Red Threat Glow Filter
    const filterRed = defs.append('filter').attr('id', 'glow-red').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filterRed.append('feGaussianBlur').attr('stdDeviation', '6').attr('result', 'coloredBlur');
    const feMergeRed = filterRed.append('feMerge');
    feMergeRed.append('feMergeNode').attr('in', 'coloredBlur');
    feMergeRed.append('feMergeNode').attr('in', 'SourceGraphic');

    // Cyber grid background pattern
    const pattern = defs
      .append('pattern')
      .attr('id', 'cyber-grid')
      .attr('width', 24)
      .attr('height', 24)
      .attr('patternUnits', 'userSpaceOnUse');

    pattern
      .append('path')
      .attr('d', 'M 24 0 L 0 0 0 24')
      .attr('fill', 'none')
      .attr('stroke', '#27272a')
      .attr('stroke-width', '0.5')
      .attr('stroke-opacity', '0.5');

    // Background rect with grid pattern
    svg.append('rect').attr('width', width).attr('height', height).attr('fill', 'url(#cyber-grid)').attr('opacity', 0.9);

    // Layer groups for clean SVG z-indexing
    const busGroup = svg.append('g').attr('class', 'bus-layer');
    const particlesGroup = svg.append('g').attr('class', 'particles-layer');
    const packetsGroup = svg.append('g').attr('class', 'packets-layer');
    const nodesGroup = svg.append('g').attr('class', 'nodes-layer');
    const alertsGroup = svg.append('g').attr('class', 'alerts-layer');

    // Draw main conduit bus curve through all nodes
    const nodes = nodesRef.current;
    if (nodes.length >= 2) {
      const lineGenerator = d3
        .line<PipelineNode>()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(d3.curveCatmullRom.alpha(0.5));

      const pathData = lineGenerator(nodes);

      if (pathData) {
        // Core conduit track
        busGroup
          .append('path')
          .attr('d', pathData)
          .attr('fill', 'none')
          .attr('stroke', '#27272a')
          .attr('stroke-width', 4);

        // Dashed transmission line
        busGroup
          .append('path')
          .attr('d', pathData)
          .attr('fill', 'none')
          .attr('stroke', '#10b981')
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '3 6')
          .attr('stroke-opacity', 0.6);
      }
    }

    // Render Pipeline Nodes (Gates)
    nodes.forEach((node) => {
      const isSelected = selectedStageId === node.id;
      const g = nodesGroup
        .append('g')
        .attr('class', `node-group-${node.id}`)
        .attr('transform', `translate(${node.x}, ${node.y})`)
        .style('cursor', 'pointer')
        .on('click', () => {
          onSelectStage?.(node.id);
          setRecentEvent(`INSPECTING GATE ${node.gateNumber}: ${node.name} (${node.tool})`);
        })
        .on('mouseenter', () => setHoveredNode(node))
        .on('mouseleave', () => setHoveredNode(null));

      // Node outer ring
      g.append('circle')
        .attr('r', isSelected ? 20 : 16)
        .attr('fill', isSelected ? '#27272a' : '#18181b')
        .attr('stroke', isSelected ? '#10b981' : '#3f3f46')
        .attr('stroke-width', isSelected ? 1.5 : 1);

      // Inner gate disc
      g.append('circle')
        .attr('r', 10)
        .attr('fill', isSelected ? '#09090b' : '#18181b')
        .attr('stroke', isSelected ? '#10b981' : '#52525b')
        .attr('stroke-width', 1);

      // Gate number text
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .attr('fill', isSelected ? '#10b981' : '#a1a1aa')
        .attr('font-size', '9px')
        .attr('font-family', 'var(--font-mono, monospace)')
        .attr('font-weight', 'bold')
        .text(node.gateNumber);

      // Node labels
      const labelYOffset = node.y > height * 0.55 ? -26 : 26;
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', labelYOffset)
        .attr('fill', isSelected ? '#ffffff' : '#d4d4d8')
        .attr('font-size', width < 640 ? '9px' : '11px')
        .attr('font-family', 'var(--font-mono, monospace)')
        .attr('font-weight', isSelected ? '600' : '500')
        .text(node.name);

      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', labelYOffset + (labelYOffset < 0 ? -12 : 12))
        .attr('fill', '#71717a')
        .attr('font-size', '8.5px')
        .attr('font-family', 'var(--font-mono, monospace)')
        .text(node.tool);
    });

    // Main 60fps Animation Loop with D3.timer
    let lastTime = performance.now();

    const timer = d3.timer((elapsed) => {
      if (!isPlaying) return;

      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      // Spawn packets at calculated intervals based on traffic rate
      const spawnInterval = trafficRate === 'nominal' ? 1400 : trafficRate === 'high' ? 800 : 400;
      if (now - lastSpawnTime.current > spawnInterval) {
        lastSpawnTime.current = now;
        // Occasionally spawn an automatic threat to demonstrate zero-trust interception
        if (Math.random() < 0.18) {
          spawnPacket('threat');
        } else {
          spawnPacket();
        }
      }

      // Update positions of packets
      const currentNodes = nodesRef.current;
      if (currentNodes.length < 2) return;

      const startNode = currentNodes[0];
      const endNode = currentNodes[currentNodes.length - 1];
      const totalDist = endNode.x - startNode.x;

      // Interpolator function along the circuit path
      const getPointOnBus = (prog: number) => {
        const targetX = startNode.x + prog * totalDist;
        // Find adjacent nodes
        let i = 0;
        while (i < currentNodes.length - 1 && currentNodes[i + 1].x < targetX) {
          i++;
        }
        const n1 = currentNodes[i];
        const n2 = currentNodes[Math.min(i + 1, currentNodes.length - 1)];

        if (!n2 || n1 === n2) return { x: n1.x, y: n1.y };

        const segmentProgress = (targetX - n1.x) / (n2.x - n1.x || 1);
        const y = n1.y + segmentProgress * (n2.y - n1.y);
        return { x: targetX, y };
      };

      // Filter and update packets
      const activePackets: Packet[] = [];

      packetsRef.current.forEach((pkt) => {
        pkt.progress += pkt.speed * (delta / 16.6);

        // Check if packet is a threat and reached its block gate
        if (pkt.threatLevel === 'blocked' && pkt.blockedAtGate) {
          const blockNode = currentNodes[pkt.blockedAtGate - 1];
          const blockProgress = (blockNode.x - startNode.x) / totalDist;

          if (pkt.progress >= blockProgress) {
            // Threat blocked!
            setThreatsBlocked((prev) => prev + 1);
            setRecentEvent(`ZERO-TRUST ISOLATION: Rogue payload incinerated at Gate 0${pkt.blockedAtGate} (${blockNode.name})`);

            // Flash gate visual
            const alertGate = alertsGroup
              .append('circle')
              .attr('cx', blockNode.x)
              .attr('cy', blockNode.y)
              .attr('r', 16)
              .attr('fill', 'none')
              .attr('stroke', '#f87171')
              .attr('stroke-width', 3)
              .attr('filter', 'url(#glow-red)');

            alertGate
              .transition()
              .duration(500)
              .attr('r', 36)
              .attr('stroke-opacity', 0)
              .remove();

            return; // Discard packet
          }
        }

        if (pkt.progress < 1) {
          activePackets.push(pkt);
        }
      });

      packetsRef.current = activePackets;

      // Render packets on D3 SVG
      const packetSelection = packetsGroup
        .selectAll<SVGGElement, Packet>('.data-packet')
        .data(activePackets, (d) => d.id.toString());

      // Enter
      const enter = packetSelection
        .enter()
        .append('g')
        .attr('class', 'data-packet')
        .style('cursor', 'crosshair')
        .on('click', (_, d) => {
          setRecentEvent(`INSPECTING PACKET #${d.id} [${d.type.toUpperCase()}] • Size: ${d.size} • Cryptographically Verified`);
        });

      // Outer glow pulse
      enter
        .append('circle')
        .attr('class', 'packet-glow')
        .attr('r', (d) => (d.type === 'threat' ? 9 : 7))
        .attr('fill', (d) =>
          d.type === 'threat'
            ? '#f87171'
            : d.type === 'auth'
            ? '#56e5a9'
            : d.type === 'telemetry'
            ? '#c0c1ff'
            : '#38bdf8'
        )
        .attr('fill-opacity', 0.25)
        .attr('filter', (d) =>
          d.type === 'threat'
            ? 'url(#glow-red)'
            : d.type === 'auth'
            ? 'url(#glow-green)'
            : 'url(#glow-cyan)'
        );

      // Core packet diamond/circle
      enter
        .append('circle')
        .attr('class', 'packet-core')
        .attr('r', (d) => (d.type === 'threat' ? 5 : 4))
        .attr('fill', (d) =>
          d.type === 'threat'
            ? '#f87171'
            : d.type === 'auth'
            ? '#56e5a9'
            : d.type === 'telemetry'
            ? '#c0c1ff'
            : '#8ed5ff'
        )
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1);

      // Packet Label
      enter
        .append('text')
        .attr('class', 'packet-tag')
        .attr('dy', -9)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8px')
        .attr('font-family', 'var(--font-mono, monospace)')
        .attr('fill', (d) => (d.type === 'threat' ? '#ffb4ab' : '#8ed5ff'))
        .text((d) => (d.type === 'threat' ? '⚠️ ROGUE' : d.label));

      // Update positions
      packetSelection
        .merge(enter)
        .attr('transform', (d) => {
          const pt = getPointOnBus(d.progress);
          return `translate(${pt.x}, ${pt.y + d.yOffset})`;
        });

      // Exit
      packetSelection.exit().remove();
    });

    timerRef.current = timer;

    return () => {
      timer.stop();
    };
  }, [dimensions, isPlaying, trafficRate, onSelectStage, selectedStageId, spawnPacket]);

  return (
    <div
      ref={containerRef}
      id="devsecops-dataflow-telemetry"
      className="w-full my-6 rounded-xl bg-zinc-950 border border-zinc-800 p-4 sm:p-5 relative flex flex-col gap-4 font-mono"
    >
      {/* HUD Header with Status & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-zinc-850">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white tracking-wide">
                ZERO-TRUST DATA-FLOW TELEMETRY
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-zinc-800 font-medium">
                eBPF ACTIVE
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">
              Simulated real-time packet inspection &amp; gate enforcement stream
            </span>
          </div>
        </div>

        {/* Action and Rate Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pause / Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            title={isPlaying ? 'Pause stream' : 'Resume stream'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-zinc-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>

          {/* Traffic Rate Switcher */}
          <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-0.5 text-xs">
            {(['nominal', 'high', 'burst'] as const).map((rate) => (
              <button
                key={rate}
                onClick={() => setTrafficRate(rate)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors uppercase font-medium cursor-pointer ${
                  trafficRate === rate
                    ? 'bg-zinc-750 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {rate}
              </button>
            ))}
          </div>

          {/* Inject Normal Payload */}
          <button
            id="inject-payload-btn"
            onClick={handleInjectPayload}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-200 border border-zinc-750 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-zinc-300" />
            <span>Inject Token</span>
          </button>

          {/* Simulate Threat Attack */}
          <button
            id="inject-threat-btn"
            onClick={handleInjectThreat}
            className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/50 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            title="Simulate malicious unverified payload to test automated quarantine"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Simulate Threat</span>
          </button>
        </div>
      </div>

      {/* D3 Canvas Container */}
      <div className="w-full relative overflow-hidden rounded-lg bg-zinc-950 border border-zinc-850">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full block"
        />

        {/* Hovered Gate Tooltip Overlay */}
        {hoveredNode && (
          <div className="absolute top-3 left-3 bg-zinc-900/95 border border-zinc-750 rounded-lg p-2.5 text-xs shadow-lg pointer-events-none backdrop-blur-sm animate-in fade-in duration-150">
            <div className="text-white font-medium">
              Gate {hoveredNode.gateNumber}: {hoveredNode.name}
            </div>
            <div className="text-zinc-400">Enforcer: {hoveredNode.tool}</div>
            <div className="text-emerald-400 text-[10px] mt-0.5">Policy: VERIFIED</div>
          </div>
        )}
      </div>

      {/* Telemetry Metrics & Event Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex flex-col">
          <span className="text-[10px] text-zinc-400 uppercase font-medium">Packets Inspected</span>
          <span className="text-[14px] font-semibold text-white">{packetsCount.toLocaleString()}</span>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex flex-col">
          <span className="text-[10px] text-zinc-400 uppercase font-medium">Threats Neutralized</span>
          <span className="text-[14px] font-semibold text-emerald-400">{threatsBlocked} Blocked (100%)</span>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex flex-col">
          <span className="text-[10px] text-zinc-400 uppercase font-medium">Latency Overhead</span>
          <span className="text-[14px] font-semibold text-zinc-300">11.4 ms ±0.8</span>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex flex-col">
          <span className="text-[10px] text-zinc-400 uppercase font-medium">Policy Enforced</span>
          <span className="text-[14px] font-semibold text-zinc-300">Mutual TLS</span>
        </div>
      </div>

      {/* Console Audit Ticker */}
      <div className="px-3 py-2 rounded-lg bg-zinc-900/40 border border-zinc-850 flex items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2 truncate">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="text-zinc-300 truncate">{recentEvent}</span>
        </div>
        <span className="text-[10px] text-emerald-400 shrink-0 font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          LIVE
        </span>
      </div>
    </div>
  );
};
