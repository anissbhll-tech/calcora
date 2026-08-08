import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface StandardFormConverterCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const StandardFormConverterCalculator: React.FC<StandardFormConverterCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [inputValue, setInputValue] = useState<string>('0.0000452');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.inputValue !== undefined) setInputValue(String(initialPreset.inputValue));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setInputValue('0.0000452');
  };

  const calculate = () => {
    const val = safeParseNumber(inputValue, 0);

    if (isNaN(val)) {
      return { isValid: false, msg: 'Please enter a valid numeric value.' };
    }

    const scientific = val.toExponential();
    const [mantissa, exp] = scientific.split('e');
    const exponentNum = parseInt(exp, 10);

    const scientificFormatted = `${formatNumber(parseFloat(mantissa), 4)} × 10^${exponentNum}`;

    // Engineering notation exponent is multiple of 3
    let engExp = Math.floor(exponentNum / 3) * 3;
    let engMantissa = val / Math.pow(10, engExp);
    const engFormatted = `${formatNumber(engMantissa, 4)} × 10^${engExp}`;

    return {
      isValid: true,
      msg: '',
      val,
      scientificFormatted,
      engFormatted,
      decimalStandard: val.toLocaleString('en-US', { maximumFractionDigits: 10 }),
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Standard Form: ${res.scientificFormatted}`,
        { inputValue },
        { scientific: res.scientificFormatted, engineering: res.engFormatted }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Numeric Input Value
        </h3>
        <CalcInput id="inputValue" label="Decimal or Scientific Value" value={inputValue} onChange={setInputValue} helperText="e.g. 0.0000452, 1250000, or 4.52e-5" />
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Standard / Scientific Form"
              value={res.scientificFormatted}
              subtitle="a × 10ⁿ where 1 ≤ |a| < 10"
              highlighted={true}
            />
            <CalcResultCard
              title="Engineering Notation"
              value={res.engFormatted}
              subtitle="Exponent is a multiple of 3"
            />
            <CalcResultCard
              title="Standard Decimal Expansion"
              value={res.decimalStandard}
              subtitle="Full decimal digits"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Scientific notation expresses numbers as a coefficient multiplied by powers of ten.</span>
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
