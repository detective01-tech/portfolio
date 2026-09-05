/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Handshake, Terminal, Smartphone, Network, ShieldCheck, CloudCheck, Database, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolio-data';

export const ServicesSection: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'terminal':
        return <Terminal className="w-6 h-6 text-[#8ed5ff]" />;
      case 'mobile_friendly':
        return <Smartphone className="w-6 h-6 text-[#8ed5ff]" />;
      case 'hub':
        return <Network className="w-6 h-6 text-[#7bd0ff]" />;
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-[#56e5a9]" />;
      case 'cloud_done':
        return <CloudCheck className="w-6 h-6 text-[#7bd0ff]" />;
      case 'dataset':
      default:
        return <Database className="w-6 h-6 text-[#c0c1ff]" />;
    }
  };

  return (
    <section
      id="services"
      className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 mb-14"
      >
        <div className="flex items-center gap-2 text-[#8ed5ff]">
          <Handshake className="w-5 h-5 text-[#8ed5ff]" />
          <span className="font-mono-code text-[11px] uppercase tracking-widest font-semibold">
            Available Services
          </span>
        </div>
        <h2 className="font-headline text-[32px] sm:text-[40px] md:text-[44px] font-bold tracking-tight text-[#e3e1e9]">
          Engineering support for your next release.
        </h2>
        <p className="text-[17px] text-[#bdc8d1] max-w-2xl leading-relaxed">
          Choose a focused build, architecture sprint, or security engagement. Every service is shaped around your product stage, team, and delivery goals.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#13251f] border border-[#56e5a9]/30">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-0.5 text-[#56e5a9] shrink-0" />
          <div>
            <p className="text-[14px] font-semibold text-[#e3e1e9]">Currently accepting new projects</p>
            <p className="text-[12px] text-[#bdc8d1] mt-1">Remote engagements · UTC-friendly collaboration · Clear weekly deliverables</p>
          </div>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#56e5a9] text-[#06251b] text-[12px] font-bold hover:bg-[#8ed5ff] transition-colors shrink-0"
        >
          Start a conversation
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 6 Premium Cards with Staggered Scroll Reveals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service, idx) => (
          <motion.div
            key={service.id}
            id={`service-card-${service.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              borderColor: '#38bdf8',
              boxShadow: '0 16px 35px rgba(56,189,248,0.16)'
            }}
            className="p-7 sm:p-8 rounded-2xl bg-[#1e1f25] border border-[#3e484f]/40 shadow-lg flex flex-col gap-3 group cursor-default transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-[#292a2f] border border-[#3e484f]/50 flex items-center justify-center mb-1 group-hover:border-[#38bdf8]/60 group-hover:scale-110 transition-all duration-200">
              {getServiceIcon(service.icon)}
            </div>

            <h3 className="font-headline text-[20px] font-semibold text-[#e3e1e9] group-hover:text-[#8ed5ff] transition-colors">
              {service.title}
            </h3>

            <p className="text-[14px] text-[#bdc8d1] leading-relaxed">
              {service.description}
            </p>

            <div className="mt-auto pt-4 border-t border-[#3e484f]/40 flex flex-col gap-2 text-[11px] font-mono-code">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#bdc8d1]">Availability</span>
                <span className={service.availability === 'Limited capacity' ? 'text-[#f7c873]' : 'text-[#56e5a9]'}>
                  {service.availability}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#bdc8d1]">Format</span>
                <span className="text-[#8ed5ff] text-right">{service.engagement}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
