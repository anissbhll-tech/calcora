import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface OneRepMaxCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const OneRepMaxCalculator: React.FC<OneRepMaxCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [weightLifted, setWeightLifted] = useState<string>('225');
  const [repsPerformed, setRepsPerformed] = useState<string>('5');
  const [unit, setUnit] = useState<string>('lbs');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.weightLifted !== undefined) setWeightLifted(String(initialPreset.weightLifted));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setWeightLifted('225');
    setRepsPerformed('5');
    setUnit('lbs');
  };

  const calculate = () => {
    const w = safeParseNumber(weightLifted, 0);
    const r = safeParseNumber(repsPerformed, 0);

    if (w <= 0 || r <= 0) {
      return { isValid: false, msg: 'Weight lifted and repetitions must be greater than 0.' };
    }
    if (r > 15) {
      return { isValid: false, msg: '1RM formulas are most accurate for 1 to 12 repetitions.' };
    }

    // Epley Formula: 1RM = w * (1 + r / 30)
    const epley1RM = w * (1 + r / 30);
    // Brzycki Formula: 1RM = w * (36 / (37 - r))
    const brzycki1RM = w * (36 / (37 - r));
    // Lander Formula: 1RM = (100 * w) / (101.3 - 2.67123 * r)
    const lander1RM = (100 * w) / (101.3 - 2.67123 * r);

    const avg1RM = (epley1RM + brzycki1RM + lander1RM) / 3;

    return {
      isValid: true,
      msg: '',
      w,
      r,
      avg1RM,
      epley1RM,
      brzycki1RM,
      lander1RM,
      p95: avg1RM * 0.95,
      p90: avg1RM * 0.9,
      p85: avg1RM * 0.85,
      p80: avg1RM * 0.8,
      p75: avg1RM * 0.75,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `1RM Estimate: ${formatNumber(res.avg1RM, 1)} ${unit} (${weightLifted}x${repsPerformed})`,
        { weightLifted, repsPerformed, unit },
        { avg1RM: res.avg1RM, epley1RM: res.epley1RM }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Lift Performance Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="weightLifted" label="Weight Lifted" suffix={unit} value={weightLifted} onChange={setWeightLifted} min={1} />
          <CalcInput id="repsPerformed" label="Repetitions Completed" value={repsPerformed} onChange={setRepsPerformed} min={1} max={15} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Estimated 1RM (Average)"
              value={`${formatNumber(res.avg1RM, 1)} ${unit}`}
              subtitle="Consensus 1 Rep Max"
              highlighted={true}
            />
            <CalcResultCard
              title="Epley Formula"
              value={`${formatNumber(res.epley1RM, 1)} ${unit}`}
              subtitle="w × (1 + r/30)"
            />
            <CalcResultCard
              title="Brzycki Formula"
              value={`${formatNumber(res.brzycki1RM, 1)} ${unit}`}
              subtitle="w × (36 / (37 - r))"
            />
            <CalcResultCard
              title="85% Working Set (5 Reps)"
              value={`${formatNumber(res.p85, 1)} ${unit}`}
              subtitle="Optimal strength training weight"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Training Percentage Chart: 90% = {formatNumber(res.p90, 1)} | 80% = {formatNumber(res.p80, 1)} | 75% = {formatNumber(res.p75, 1)} {unit}</span>
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
