import React from 'react';

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
      <label htmlFor={id} className="block text-xs font-bold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-300 dark:hover:border-slate-600"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <span className="block text-[11px] text-slate-500 dark:text-slate-400">
          {helperText}
        </span>
      )}
    </div>
  );
};
