/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export const SecurityPhilosophy: React.FC = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-gradient-to-br from-[#1e1f25] to-[#0d0e13] border border-[#3e484f]/50 shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#38bdf8]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#292a2f] border border-[#56e5a9]/30 mb-6">
          <Lock className="w-4 h-4 text-[#56e5a9]" />
          <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#e3e1e9] font-semibold">
            Security Philosophy
          </span>
        </div>

        <h2 className="font-headline text-[32px] sm:text-[44px] md:text-[54px] font-bold tracking-tight text-[#e3e1e9] max-w-3xl leading-[1.15]">
          “Build Fast. Build Secure.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ed5ff] via-[#38bdf8] to-[#56e5a9]">
            Build to Last.
          </span>”
        </h2>

        <p className="text-[16px] sm:text-[18px] text-[#bdc8d1] max-w-2xl mt-4 leading-relaxed">
          Zero trust isn't a product you install. It's an architectural mindset: authenticate continuously,
          verify explicitly, assume compromise, and automate defenses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.02, borderColor: '#56e5a9', boxShadow: '0 12px 28px rgba(86,229,169,0.15)' }}
            className="p-6 rounded-2xl bg-[#292a2f] border border-[#3e484f]/50 shadow-md flex flex-col gap-2 transition-colors cursor-default"
          >
            <span className="font-mono-code text-[11px] font-bold text-[#56e5a9]">
              01 • DEFENSE IN DEPTH
            </span>
            <h4 className="font-headline text-[18px] font-semibold text-[#e3e1e9]">
              Security By Design
            </h4>
            <p className="text-[13px] text-[#bdc8d1] leading-relaxed">
              Least-privilege IAM, isolated network namespaces, mutual TLS, and ephemeral secrets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.02, borderColor: '#38bdf8', boxShadow: '0 12px 28px rgba(56,189,248,0.15)' }}
            className="p-6 rounded-2xl bg-[#292a2f] border border-[#3e484f]/50 shadow-md flex flex-col gap-2 transition-colors cursor-default"
          >
            <span className="font-mono-code text-[11px] font-bold text-[#8ed5ff]">
              02 • ZERO TECH DEBT
            </span>
            <h4 className="font-headline text-[18px] font-semibold text-[#e3e1e9]">
              Automation First
            </h4>
            <p className="text-[13px] text-[#bdc8d1] leading-relaxed">
              If a security or build check is executed twice manually, codify and enforce it via automated CI gates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -6, scale: 1.02, borderColor: '#c0c1ff', boxShadow: '0 12px 28px rgba(192,193,255,0.15)' }}
            className="p-6 rounded-2xl bg-[#292a2f] border border-[#3e484f]/50 shadow-md flex flex-col gap-2 transition-colors cursor-default"
          >
            <span className="font-mono-code text-[11px] font-bold text-[#c0c1ff]">
              03 • OBSERVABILITY
            </span>
            <h4 className="font-headline text-[18px] font-semibold text-[#e3e1e9]">
              Continuous Telemetry
            </h4>
            <p className="text-[13px] text-[#bdc8d1] leading-relaxed">
              Comprehensive audit logs, distributed tracing, automated anomaly alerts, and fast disaster recovery.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
