import React from 'react';
import { AlertCircle } from 'lucide-react';

interface CalcDisclaimerProps {
  text?: string;
  className?: string;
}

export const CalcDisclaimer: React.FC<CalcDisclaimerProps> = ({
  text = 'Calculations are estimates for educational and planning purposes only. Consult qualified professionals for specific financial, medical, or engineering advice.',
  className = '',
}) => {
  return (
    <div className={`p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5 ${className}`}>
      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p className="leading-relaxed text-[11px] font-medium">{text}</p>
    </div>
  );
};
