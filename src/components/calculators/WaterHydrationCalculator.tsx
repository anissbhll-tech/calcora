import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface WaterHydrationCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const WaterHydrationCalculator: React.FC<WaterHydrationCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [weightKg, setWeightKg] = useState<string>('70');
  const [exerciseMinsPerDay, setExerciseMinsPerDay] = useState<string>('45');
  const [climate, setClimate] = useState<string>('temperate'); // temperate, hot

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.weightKg !== undefined) setWeightKg(String(initialPreset.weightKg));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setWeightKg('70');
    setExerciseMinsPerDay('45');
    setClimate('temperate');
  };

  const calculate = () => {
    const w = safeParseNumber(weightKg, 0);
    const exercise = safeParseNumber(exerciseMinsPerDay, 0);

    if (w <= 0) {
      return { isValid: false, msg: 'Body weight must be greater than 0.' };
    }

    // Baseline hydration: 35 ml water per kg of body weight
    let baseWaterMl = w * 35;

    // Exercise addition: ~350 ml per 30 minutes of exercise
    const exerciseAdditionMl = (exercise / 30) * 350;

    let totalWaterMl = baseWaterMl + exerciseAdditionMl;

    if (climate === 'hot') {
      totalWaterMl *= 1.15; // 15% increase for hot/humid environment
    }

    const totalLiters = totalWaterMl / 1000;

    // Standard glass = 250 ml (8.5 fl oz)
    const glassesCount = Math.ceil(totalWaterMl / 250);

    // Standard 16.9 oz (500 ml) water bottle count
    const bottlesCount = Math.ceil(totalWaterMl / 500);

    return {
      isValid: true,
      msg: '',
      w,
      totalWaterMl,
      totalLiters,
      glassesCount,
      bottlesCount,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Hydration Target: ${formatNumber(res.totalLiters, 2)} Liters / day (${res.glassesCount} glasses)`,
        { weightKg, exerciseMinsPerDay, climate },
        { totalLiters: res.totalLiters, glassesCount: res.glassesCount }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Personal Biometrics & Activity Level
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="weightKg" label="Body Weight" suffix="kg" value={weightKg} onChange={setWeightKg} min={20} max={250} />
          <CalcInput id="exerciseMinsPerDay" label="Daily Physical Exercise" suffix="mins/day" value={exerciseMinsPerDay} onChange={setExerciseMinsPerDay} min={0} max={300} />
          <CalcSelect
            id="climate"
            label="Climate / Weather"
            value={climate}
            onChange={setClimate}
            options={[
              { value: 'temperate', label: 'Moderate / Air Conditioned' },
              { value: 'hot', label: 'Hot / Arid / Humid Climate (+15% fluid loss)' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Daily Water Intake Target"
              value={`${formatNumber(res.totalLiters, 2)} Liters`}
              subtitle={`${formatNumber(res.totalWaterMl, 0)} ml daily requirement`}
              highlighted={true}
            />
            <CalcResultCard
              title="Standard Glasses (250ml)"
              value={`${res.glassesCount} Glasses`}
              subtitle="8.5 fl oz glass equivalent"
            />
            <CalcResultCard
              title="Water Bottles (500ml)"
              value={`${res.bottlesCount} Bottles`}
              subtitle="16.9 fl oz bottle count"
            />
            <CalcResultCard
              title="Base Hydration Rate"
              value="35 ml / kg"
              subtitle="Clinical baseline guideline"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Drinking adequate water supports cellular metabolism, temperature regulation, and cognitive focus.</span>
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
