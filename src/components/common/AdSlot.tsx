import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'calcora-responsive-banner',
  format = 'responsive',
  className = '',
}) => {
  // Configurable Monetization Slot
  // When an ad script (e.g., Google AdSense) is active, this component hosts the ad unit.
  // In development/clean mode, it renders a sleek, non-intrusive sponsor zone frame.
  return (
    <aside
      aria-label="Sponsor & Partner Resources"
      className={`my-6 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 text-center transition-opacity ${className}`}
    >
      <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-[11px] font-semibold tracking-wider uppercase">
        <Megaphone className="w-3.5 h-3.5" />
        <span>Sponsor & Partner Resources</span>
      </div>
      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
        Calcora is 100% free and client-side executed. Non-intrusive ad unit <span className="font-mono text-[10px] text-slate-400">({slotId})</span> ready for verified partner placement.
      </div>
    </aside>
  );
};
