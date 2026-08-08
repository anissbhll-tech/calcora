import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CalcErrorAlertProps {
  message: string;
  className?: string;
}

export const CalcErrorAlert: React.FC<CalcErrorAlertProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200 ${className}`}
    >
      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
      <span className="font-semibold">{message}</span>
    </div>
  );
};
