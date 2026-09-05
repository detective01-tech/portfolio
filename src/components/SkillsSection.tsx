/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Phone, Globe, Server, Terminal, Database, Cpu, HardDrive, Cloud, Shield } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolio-data';
import { SkillCategory } from '../types';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');

  const categories: { key: SkillCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'frontend', label: 'Mobile & Web' },
    { key: 'backend', label: 'Backend & APIs' },
    { key: 'databases', label: 'Databases' },
    { key: 'devops', label: 'Cloud & DevOps' },
    { key: 'security', label: 'DevSecOps' },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone_iphone':
        return <Phone className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'web':
        return <Globe className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'dns':
        return <Server className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'database':
        return <Database className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'memory':
        return <Cpu className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'deployed_code':
        return <HardDrive className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
      case 'policy':
      default:
        return <Shield className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />;
    }
  };

  return (
    <section
      id="skills"
      className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Wrench className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
              Technical Stack &amp; Skills
            </span>
          </div>
          <h2 className="font-headline text-[32px] sm:text-[40px] font-bold tracking-tight text-white">
            Engineered proficiencies.
          </h2>
          <p className="text-[16px] text-zinc-400 max-w-xl">
            Categorized across the architectural stack. Every skill reflects production-tested implementations, continuous delivery, and verified security standards.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          id="skills-filter-container"
          className="flex flex-wrap gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              id={`skill-filter-${cat.key}`}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid Matrix with Layout Animation */}
      <motion.div
        layout
        id="skills-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              key={skill.id}
              id={`skill-card-${skill.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
              className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                      {renderIcon(skill.icon)}
                    </div>
                    <span className="font-headline text-[17px] font-semibold text-zinc-100 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700/60 text-zinc-300 font-medium">
                    {skill.badge}
                  </span>
                </div>

                <p className="text-[14px] text-zinc-400 leading-relaxed font-normal">
                  {skill.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                {skill.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-normal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
