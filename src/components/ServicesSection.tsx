/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Handshake, Terminal, Smartphone, Network, ShieldCheck, CloudCheck, Database } from 'lucide-react';
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
            Specialized Offerings
          </span>
        </div>
        <h2 className="font-headline text-[32px] sm:text-[40px] md:text-[44px] font-bold tracking-tight text-[#e3e1e9]">
          Services &amp; Capabilities.
        </h2>
        <p className="text-[17px] text-[#bdc8d1] max-w-2xl leading-relaxed">
          Delivering end-to-end engineering excellence for modern tech companies, fast-scaling startups, and secure enterprises.
        </p>
      </motion.div>

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
          </motion.div>
        ))}
      </div>
    </section>
  );
};
