import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CalcResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'info' | 'neutral';
  icon?: React.ReactNode;
  highlighted?: boolean;
  className?: string;
  allowCopy?: boolean;
}

export const CalcResultCard: React.FC<CalcResultCardProps> = ({
  title,
  value,
  subtitle,
  badgeText,
  badgeType = 'info',
  icon,
  highlighted = false,
  className = '',
  allowCopy = false,
}) => {
  const [copied, setCopied] = useState(false);

  const badgeStyles = {
    success: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800',
    warning: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200/80 dark:border-amber-800',
    info: 'bg-indigo-100/80 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-150 relative ${
        highlighted
          ? 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white border-indigo-500 shadow-md dark:from-indigo-900/90 dark:to-violet-950 dark:border-indigo-700'
          : 'bg-slate-50/90 dark:bg-slate-800/80 text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-[11px] font-bold uppercase tracking-wider ${highlighted ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          {allowCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className={`p-1 rounded-md transition ${
                highlighted
                  ? 'text-indigo-200 hover:text-white hover:bg-indigo-500/50'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
              title="Copy value"
              aria-label={`Copy ${title} value`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
          {icon && <div className={highlighted ? 'text-indigo-200' : 'text-indigo-600 dark:text-indigo-400'}>{icon}</div>}
        </div>
      </div>

      <div className={`text-2xl sm:text-3xl font-black tracking-tight font-sans ${highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        {value}
      </div>

      {(subtitle || badgeText) && (
        <div className="mt-2.5 flex items-center justify-between gap-2 flex-wrap pt-1">
          {subtitle && (
            <span className={`text-xs ${highlighted ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
              {subtitle}
            </span>
          )}
          {badgeText && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${highlighted ? 'bg-white/15 text-white border-white/20' : badgeStyles[badgeType]}`}>
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

