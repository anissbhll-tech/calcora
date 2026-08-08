import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'minimal';
  className?: string;
  dark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', text: 'text-lg', dot: 'w-1 h-1', svg: 'w-4 h-4' },
    md: { box: 'w-9 h-9', text: 'text-2xl', dot: 'w-1.5 h-1.5', svg: 'w-5 h-5' },
    lg: { box: 'w-11 h-11', text: 'text-3xl', dot: 'w-2 h-2', svg: 'w-6 h-6' },
    xl: { box: 'w-14 h-14', text: 'text-4xl', dot: 'w-2.5 h-2.5', svg: 'w-8 h-8' },
  };

  const { box, text, dot, svg } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon Badge */}
      <div className={`${box} bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 rounded-xl shadow-xs flex items-center justify-center text-white ring-1 ring-white/20 transition-transform group-hover:scale-105 shrink-0`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${svg} drop-shadow-xs`}
        >
          {/* Calculator Grid Symbol + Math Synergy Accent */}
          <rect x="4" y="3" width="16" height="18" rx="3" className="stroke-white" />
          <line x1="8" y1="7" x2="16" y2="7" className="stroke-teal-200" strokeWidth="2" />
          <circle cx="8" cy="11" r="1" fill="currentColor" />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="16" cy="11" r="1" fill="currentColor" />
          <circle cx="8" cy="15" r="1" fill="currentColor" />
          <line x1="12" y1="15" x2="16" y2="15" strokeWidth="2" className="stroke-teal-100" />
        </svg>
      </div>

      {/* Brand Wordmark Text */}
      {variant !== 'icon' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className={`${text} font-black tracking-tight text-slate-900 dark:text-white font-sans`}>
              Calcora
            </span>
            <span className={`${dot} rounded-full bg-teal-500 animate-pulse`} />
          </div>
        </div>
      )}
    </div>
  );
};
