import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface CombinationPermutationCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const CombinationPermutationCalculator: React.FC<CombinationPermutationCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [totalN, setTotalN] = useState<string>('10');
  const [sampleR, setSampleR] = useState<string>('3');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.totalN !== undefined) setTotalN(String(initialPreset.totalN));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setTotalN('10');
    setSampleR('3');
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const calculate = () => {
    const n = Math.round(safeParseNumber(totalN, 0));
    const r = Math.round(safeParseNumber(sampleR, 0));

    if (n < 0 || r < 0) {
      return { isValid: false, msg: 'n and r must be non-negative integers.' };
    }
    if (r > n) {
      return { isValid: false, msg: 'Sample size r cannot be greater than total items n.' };
    }
    if (n > 60) {
      return { isValid: false, msg: 'Please enter n <= 60 to prevent integer overflow.' };
    }

    // Combinations C(n,r) = n! / (r! * (n-r)!)
    const combinations = factorial(n) / (factorial(r) * factorial(n - r));

    // Permutations P(n,r) = n! / (n-r)!
    const permutations = factorial(n) / factorial(n - r);

    // Permutations with repetition: n^r
    const permWithRep = Math.pow(n, r);

    return {
      isValid: true,
      msg: '',
      n,
      r,
      combinations,
      permutations,
      permWithRep,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `C(${res.n}, ${res.r}) = ${res.combinations} | P(${res.n}, ${res.r}) = ${res.permutations}`,
        { totalN, sampleR },
        { combinations: res.combinations, permutations: res.permutations }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Combinatorics Parameters (nCr & nPr)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="totalN" label="Total Set Size (n)" value={totalN} onChange={setTotalN} min={0} max={60} />
          <CalcInput id="sampleR" label="Subset Sample Size (r)" value={sampleR} onChange={setSampleR} min={0} max={60} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title={`Combinations C(${res.n}, ${res.r})`}
              value={formatNumber(res.combinations, 0)}
              subtitle="n! / (r! × (n-r)!) — Order does NOT matter"
              highlighted={true}
            />
            <CalcResultCard
              title={`Permutations P(${res.n}, ${res.r})`}
              value={formatNumber(res.permutations, 0)}
              subtitle="n! / (n-r)! — Order DOES matter"
            />
            <CalcResultCard
              title={`Permutations with Repetition (nʳ)`}
              value={formatNumber(res.permWithRep, 0)}
              subtitle="n^r — Repetitions allowed"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Combinations count groups where selection order is ignored (e.g. lottery picks). Permutations count ordered arrangements.</span>
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
