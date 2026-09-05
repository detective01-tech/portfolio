/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { DevSecOpsPipeline } from './components/DevSecOpsPipeline';
import { ProjectsSection } from './components/ProjectsSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { WorkflowSection } from './components/WorkflowSection';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { BuildingInPublic } from './components/BuildingInPublic';
import { SecurityPhilosophy } from './components/SecurityPhilosophy';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CommandPalette } from './components/CommandPalette';
import { ProjectItem } from './types';

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#09090b] text-[#f4f4f5] min-h-screen overflow-x-hidden selection:bg-[#27272a] selection:text-[#ffffff]">
      {/* Subtle Studio Ambient Light and Minimal Dot Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-zinc-800/15 via-zinc-900/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-[2200px] -right-40 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[160px]" />

        {/* Minimal dot matrix vector backdrop */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="studio-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#studio-grid)" />
        </svg>
      </div>

      {/* Header with Command Palette trigger */}
      <Header
        onContactClick={() => handleScrollToSection('contact')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20">
        <Hero
          onContactClick={() => handleScrollToSection('contact')}
          onProjectsClick={() => handleScrollToSection('projects')}
        />

        <div className="lazy-section">
          <AboutSection />
        </div>

        <div className="lazy-section">
          <SkillsSection />
        </div>

        <div className="lazy-section">
          <DevSecOpsPipeline />
        </div>

        <div className="lazy-section">
          <ProjectsSection onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)} />
        </div>

        <div className="lazy-section">
          <WorkflowSection />
        </div>

        <div className="lazy-section">
          <ServicesSection />
        </div>

        <div className="lazy-section">
          <ExperienceSection />
        </div>

        <div className="lazy-section">
          <BuildingInPublic />
        </div>

        <div className="lazy-section">
          <SecurityPhilosophy />
        </div>

        <div className="lazy-section">
          <ContactSection onShowToast={showToast} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* DevSecOps Command Palette Terminal Overlay */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={(proj) => setSelectedCaseStudy(proj)}
        onNavigateSection={handleScrollToSection}
        onShowToast={showToast}
      />

      {/* Live Toast Feedback Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
