import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface LogarithmCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const LogarithmCalculator: React.FC<LogarithmCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [numberVal, setNumberVal] = useState<string>('100');
  const [baseVal, setBaseVal] = useState<string>('10');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.numberVal !== undefined) setNumberVal(String(initialPreset.numberVal));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setNumberVal('100');
    setBaseVal('10');
  };

  const calculate = () => {
    const x = safeParseNumber(numberVal, 0);
    const b = safeParseNumber(baseVal, 0);

    if (x <= 0) {
      return { isValid: false, msg: 'Logarithm input value (x) must be greater than 0.' };
    }
    if (b <= 0 || b === 1) {
      return { isValid: false, msg: 'Logarithm base (b) must be greater than 0 and not equal to 1.' };
    }

    const logBaseB = Math.log(x) / Math.log(b);
    const log10 = Math.log10(x);
    const ln = Math.log(x);
    const log2 = Math.log2(x);

    return {
      isValid: true,
      msg: '',
      x,
      b,
      logBaseB,
      log10,
      ln,
      log2,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `log_${res.b}(${res.x}) = ${formatNumber(res.logBaseB, 4)}`,
        { numberVal, baseVal },
        { logBaseB: res.logBaseB, ln: res.ln }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Logarithm Expression: log_b(x)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="numberVal" label="Input Value (x)" value={numberVal} onChange={setNumberVal} min={0.000001} />
          <CalcInput id="baseVal" label="Base (b)" value={baseVal} onChange={setBaseVal} min={0.000001} helperText="Standard base 10, e (~2.718), or 2" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title={`log_${res.b}(${res.x})`}
              value={formatNumber(res.logBaseB, 5)}
              subtitle={`b^y = x (${res.b}^${formatNumber(res.logBaseB, 2)} = ${res.x})`}
              highlighted={true}
            />
            <CalcResultCard
              title="Common Log (log₁₀)"
              value={formatNumber(res.log10, 5)}
              subtitle="Base 10 logarithm"
            />
            <CalcResultCard
              title="Natural Log (ln / log_e)"
              value={formatNumber(res.ln, 5)}
              subtitle="Base e (Euler's number)"
            />
            <CalcResultCard
              title="Binary Log (log₂)"
              value={formatNumber(res.log2, 5)}
              subtitle="Base 2 computer science log"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Change of Base Formula: log_b(x) = ln(x) / ln(b)</span>
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
