import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface ExponentPowerCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const ExponentPowerCalculator: React.FC<ExponentPowerCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [base, setBase] = useState<string>('2');
  const [exponent, setExponent] = useState<string>('10');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.base !== undefined) setBase(String(initialPreset.base));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setBase('2');
    setExponent('10');
  };

  const calculate = () => {
    const b = safeParseNumber(base, 0);
    const n = safeParseNumber(exponent, 0);

    if (b === 0 && n <= 0) {
      return { isValid: false, msg: '0 raised to a non-positive power is undefined.' };
    }

    const result = Math.pow(b, n);
    const scientificStr = result.toExponential(4);
    const reciprocal = result !== 0 ? 1 / result : 0;
    const squareRootOfBase = Math.sqrt(Math.abs(b));

    return {
      isValid: true,
      msg: '',
      b,
      n,
      result,
      scientificStr,
      reciprocal,
      squareRootOfBase,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `${res.b}^${res.n} = ${formatNumber(res.result, 4)}`,
        { base, exponent },
        { result: res.result }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Exponent Expression: Base^Exponent (bⁿ)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="base" label="Base (b)" value={base} onChange={setBase} />
          <CalcInput id="exponent" label="Exponent (n)" value={exponent} onChange={setExponent} helperText="Supports positive, negative, and fractional powers" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title={`${res.b}^${res.n}`}
              value={Math.abs(res.result) > 1e7 || Math.abs(res.result) < 1e-5 ? res.scientificStr : formatNumber(res.result, 6)}
              subtitle="Evaluated power"
              highlighted={true}
            />
            <CalcResultCard
              title="Scientific Notation"
              value={res.scientificStr}
              subtitle="a × 10^b format"
            />
            <CalcResultCard
              title="Reciprocal (1 / bⁿ)"
              value={formatNumber(res.reciprocal, 6)}
              subtitle="Negative power equivalent b⁻ⁿ"
            />
            <CalcResultCard
              title="Square Root of Base (√b)"
              value={formatNumber(res.squareRootOfBase, 4)}
              subtitle="b^(1/2) fractional exponent"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Power Rule: bⁿ × bᵐ = bⁿ⁺ᵐ and (bⁿ)ᵐ = bⁿᵐ</span>
            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
              >
                Save Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
