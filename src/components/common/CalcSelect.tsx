import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CalcSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  helperText?: string;
  className?: string;
}

export const CalcSelect: React.FC<CalcSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  helperText,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight">
        {label}
      </label>
      <div className="relative rounded-xl shadow-2xs">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 pl-3.5 pr-9 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 dark:focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {helperText && (
        <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-normal">
          {helperText}
        </span>
      )}
    </div>
  );
};

