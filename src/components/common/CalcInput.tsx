import React from 'react';

interface CalcInputProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  step?: string | number;
  min?: number;
  max?: number;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export const CalcInput: React.FC<CalcInputProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  prefix,
  suffix,
  step = 'any',
  min,
  max,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  autoFocus = false,
}) => {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="block text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight"
        >
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        {helperText && (
          <span id={helperId} className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
            {helperText}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-2xs group">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 text-xs font-semibold select-none">
            <span className="px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-[11px] font-mono">
              {prefix}
            </span>
          </div>
        )}

        <input
          id={id}
          type={type}
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          aria-invalid={Boolean(error)}
          aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim() || undefined}
          className={`w-full text-xs font-medium rounded-xl border bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 dark:focus:border-indigo-500 ${
            prefix ? 'pl-11' : 'pl-3.5'
          } ${suffix ? 'pr-12' : 'pr-3.5'} py-2.5 ${
            error
              ? 'border-rose-400 dark:border-rose-700 bg-rose-50/20 dark:bg-rose-950/20 focus:ring-rose-500'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}`}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 text-xs font-semibold select-none">
            <span className="px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-[11px] font-mono">
              {suffix}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 animate-in fade-in">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
};

