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
}) => {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-bold text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {helperText && (
          <span id={helperId} className="text-[11px] text-slate-500 dark:text-slate-400">
            {helperText}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-xs">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">
            {prefix}
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
          aria-invalid={Boolean(error)}
          aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim() || undefined}
          className={`w-full text-xs font-medium rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 ${
            prefix ? 'pl-9' : 'pl-3.5'
          } ${suffix ? 'pr-12' : 'pr-3.5'} py-2.5 ${
            error
              ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-500'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">
            {suffix}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
};
