/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'databases' | 'devops' | 'security';

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
  badge: string;
  category: Exclude<SkillCategory, 'all'>;
  description: string;
  tags: string[];
  level?: string;
}

export interface PipelineStage {
  id: string;
  stepNumber: string;
  shortTitle: string;
  subtitle: string;
  fullTitle: string;
  tag: string;
  icon: string;
  description: string;
  tools: string[];
  active?: boolean;
}

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  problemScope: string;
  technicalArchitecture: string;
  securityConsiderations: string[];
  latencyMetric: string;
  availabilityMetric: string;
  securityStatus: string;
}

export interface ProjectItem {
  id: string;
  assetKey: 'nexora' | 'wearixa' | 'devsecopsLab';
  projectNumber: string;
  categoryTag: string;
  statusBadge: string;
  title: string;
  description: string;
  highlightTitle: string;
  highlightDesc: string;
  techTags: string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudy: CaseStudyData;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  icon: string;
  description: string;
  accent?: 'primary' | 'tertiary' | 'surface-tint' | 'primary-container';
}

export interface ServiceCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  accentColor: string;
}

export interface CareerMilestone {
  period: string;
  periodBadge: string;
  role: string;
  description: string;
  tags: string[];
  highlightMetric: string;
  highlightLabel: string;
  accentColor: 'tertiary' | 'primary' | 'surface-tint' | 'secondary';
}

export interface GitCommit {
  hash: string;
  branch: string;
  message: string;
  timeAgo: string;
  author: string;
  type: 'security' | 'perf' | 'refactor' | 'feat' | 'infra';
}
