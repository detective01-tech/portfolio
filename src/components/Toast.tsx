/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      id="toast"
      className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#8ed5ff] text-[#00354a] font-mono-code text-[13px] font-bold shadow-2xl shadow-[#38bdf8]/30 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200 border border-[#38bdf8]"
    >
      <ShieldCheck className="w-4 h-4 text-[#00354a]" />
      <span id="toast-text">{message}</span>
    </div>
  );
};
