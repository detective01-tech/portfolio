/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick, onOpenCommandPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'devsecops', 'workflow', 'services', 'experience', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'DevSecOps', href: '#devsecops', id: 'devsecops' },
    { label: 'Workflow', href: '#workflow', id: 'workflow' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20'
          : 'bg-[#09090b]/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="h-16 sm:h-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-5">
          <a
            id="brand-logo-link"
            href="#hero"
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200 group-hover:border-zinc-700 transition-colors">
              <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300">MS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-[16px] sm:text-[17px] text-zinc-100 tracking-tight font-semibold">
                Muhammad Sohail
              </span>
              <span className="text-[12px] text-zinc-400 font-normal">
                Full-Stack &amp; DevSecOps
              </span>
            </div>
          </a>

          {/* Live Status beacon */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[12px] text-zinc-300 font-medium">
              Available for projects
            </span>
          </div>
        </div>

        {/* Desktop Nav links */}
        <nav
          id="desktop-nav"
          className="hidden lg:flex items-center gap-6 text-[14px]"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                className={`transition-colors py-1 relative font-medium ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action button & mobile trigger */}
        <div className="flex items-center gap-3">
          {/* Quick Command Palette launcher */}
          <button
            id="terminal-command-palette-trigger"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all cursor-pointer shadow-sm group"
            title="Open Command Palette (Ctrl+K or ⌘K)"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            <span className="hidden md:inline text-[12px] font-medium">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>

          <button
            id="header-cta-button"
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-[13px] font-medium bg-zinc-100 text-zinc-900 hover:bg-white transition-all duration-150 cursor-pointer shadow-sm"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-5 flex flex-col gap-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200"
        >
          <button
            id="mobile-command-palette-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommandPalette();
            }}
            className="w-full py-2.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-zinc-200 text-[13px] hover:bg-zinc-850 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span>Search portfolio commands</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 font-mono">
              ⌘K
            </span>
          </button>

          <div className="flex flex-col gap-1 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-nav-${link.id}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-md text-[14px] font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            id="mobile-cta-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className="w-full mt-2 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-[14px] font-medium text-center hover:bg-white transition-colors"
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
};
