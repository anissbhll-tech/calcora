import React, { useEffect } from 'react';
import { Megaphone } from 'lucide-react';
import { GOOGLE_CONFIG } from '../../config/google';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive' | 'auto';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'calcora-responsive-banner',
  format = 'auto',
  className = '',
}) => {
  const clientId = GOOGLE_CONFIG.adsenseClientId
    ? (GOOGLE_CONFIG.adsenseClientId.startsWith('ca-')
        ? GOOGLE_CONFIG.adsenseClientId
        : `ca-${GOOGLE_CONFIG.adsenseClientId}`)
    : '';

  useEffect(() => {
    if (clientId && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // Safe fallback if blocked by ad-blocker or script still initializing
      }
    }
  }, [clientId]);

  if (clientId) {
    return (
      <aside
        aria-label="Advertisement"
        className={`my-6 overflow-hidden text-center ${className}`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // Configurable Sponsor Slot (Rendered when AdSense is not configured)
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
