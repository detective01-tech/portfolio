/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, Key, Download, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'fullstack',
    message: ''
  });

  const emailAddress = 'contact@muhammadsohail.dev';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    onShowToast('Email copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    onShowToast('Simulating resume dispatch: muhammad_sohail_resume_2026.pdf');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    onShowToast('Encrypted dispatch sent to Muhammad Sohail');
  };

  return (
    <section
      id="contact"
      className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Narrative Left (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-400">
              <Mail className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
                Get In Touch
              </span>
            </div>
            <h2 className="font-headline text-[32px] sm:text-[40px] font-bold tracking-tight text-white">
              Let's build something remarkable.
            </h2>
            <p className="text-[15px] text-zinc-400 leading-relaxed font-normal">
              Whether you are architecting a distributed system, migrating infrastructure to Kubernetes, or shipping a full-stack product, I am available for high-impact technical engagements.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="flex flex-col gap-3">
            {/* Email Copy Card */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500 font-medium">Direct Email</span>
                  <span
                    id="contact-email"
                    className="font-mono text-xs sm:text-[13px] font-medium text-zinc-200"
                  >
                    {emailAddress}
                  </span>
                </div>
              </div>

              <button
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700/60"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* GPG Key Fingerprint */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between font-mono">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                  <Key className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-zinc-500 font-normal">PGP Fingerprint</span>
                  <span className="text-xs text-zinc-300">4B8F 90C1 2D8E 7FA3 6E01</span>
                </div>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                VERIFIED
              </span>
            </div>

            {/* Direct Resume Download Button */}
            <a
              id="resume-download-btn"
              href="#resume"
              onClick={handleDownloadResume}
              className="inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-850 border border-zinc-750 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Download Engineering Resume (PDF)</span>
            </a>
          </div>
        </motion.div>

        {/* Quick Message Form Right (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800"
        >
          <h3 className="font-headline text-[20px] font-semibold text-white mb-6 flex items-center gap-2.5">
            <Send className="w-4 h-4 text-zinc-400" />
            Send a message
          </h3>

          {submitted ? (
            <div className="p-8 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-headline text-[18px] font-semibold text-white">
                Message delivered
              </h4>
              <p className="text-[14px] text-zinc-400 max-w-md font-normal">
                Thank you for reaching out. Muhammad will review your requirements and respond via email within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', category: 'fullstack', message: '' });
                }}
                className="mt-3 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-xs border border-zinc-700 hover:bg-zinc-750 hover:text-white transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Your Name
                  </label>
                  <input
                    id="form-name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-300">
                    Your Email
                  </label>
                  <input
                    id="form-email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Topic / Engagement Type
                </label>
                <select
                  id="form-category-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-500"
                >
                  <option value="fullstack">Full-Stack Application Development</option>
                  <option value="cloud">Cloud Infrastructure &amp; Kubernetes</option>
                  <option value="security">DevSecOps &amp; Security Pipeline</option>
                  <option value="contract">Full-Time / Advisory Role</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Project Details
                </label>
                <textarea
                  id="form-message-input"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, technical stack, timeline, or inquiries..."
                  className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 resize-none font-sans"
                />
              </div>

              <button
                id="form-submit-btn"
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer mt-2 shadow-sm"
              >
                <span>Send Message</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
