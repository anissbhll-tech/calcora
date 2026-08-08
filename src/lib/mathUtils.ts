/**
 * Calcora Core Math & Validation Utilities
 * Ensures safe, deterministic client-side calculation execution.
 */

/**
 * Safely parses an input value to a finite number.
 * Returns fallback (default 0) if parsing yields NaN, null, or Infinity.
 */
export function safeParseNumber(val: any, fallback: number = 0): number {
  if (val === null || val === undefined || val === '') {
    return fallback;
  }
  const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/,/g, ''));
  if (isNaN(num) || !isFinite(num)) {
    return fallback;
  }
  return num;
}

/**
 * Safely performs division without throwing DivisionByZero or returning Infinity.
 */
export function safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
  const num = safeParseNumber(numerator, 0);
  const den = safeParseNumber(denominator, 0);
  if (den === 0) {
    return fallback;
  }
  const result = num / den;
  return isFinite(result) ? result : fallback;
}

/**
 * Clamps a number within a specified minimum and maximum range.
 */
export function clamp(val: number, min: number, max: number): number {
  const num = safeParseNumber(val, min);
  return Math.max(min, Math.min(max, num));
}

/**
 * Checks if a value is a valid finite non-NaN number.
 */
export function isValidNumber(val: any): boolean {
  if (val === null || val === undefined || val === '') return false;
  const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/,/g, ''));
  return !isNaN(num) && isFinite(num);
}

/**
 * Standardized currency formatter with standard locale fallback.
 */
export function formatCurrency(amount: number, currencySymbol: string = '$', decimals: number = 2): string {
  const safeVal = safeParseNumber(amount, 0);
  const formatted = safeVal.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${currencySymbol}${formatted}`;
}

/**
 * Formats a number with comma separators and specified decimal precision.
 */
export function formatNumber(val: number, decimals: number = 2): string {
  const safeVal = safeParseNumber(val, 0);
  return safeVal.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats a percentage value (e.g. 0.05 -> "5.00%").
 */
export function formatPercent(val: number, decimals: number = 2): string {
  const safeVal = safeParseNumber(val, 0);
  return `${formatNumber(safeVal, decimals)}%`;
}
