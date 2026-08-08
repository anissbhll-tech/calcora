import React from 'react';

interface CalcResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'info' | 'neutral';
  icon?: React.ReactNode;
  highlighted?: boolean;
  className?: string;
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
}) => {
  const badgeStyles = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    info: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    neutral: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition shadow-xs ${
        highlighted
          ? 'bg-teal-600 text-white border-teal-500 dark:bg-teal-950/80 dark:border-teal-700'
          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-700'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-xs font-bold uppercase tracking-wider ${highlighted ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
          {title}
        </span>
        {icon && <div className={highlighted ? 'text-teal-200' : 'text-teal-600 dark:text-teal-400'}>{icon}</div>}
      </div>

      <div className={`text-2xl sm:text-3xl font-black tracking-tight ${highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        {value}
      </div>

      {(subtitle || badgeText) && (
        <div className="mt-2 flex items-center justify-between gap-2">
          {subtitle && (
            <span className={`text-xs ${highlighted ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
              {subtitle}
            </span>
          )}
          {badgeText && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeStyles[badgeType]}`}>
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
