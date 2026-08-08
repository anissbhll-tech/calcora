import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface MacroSplitCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const MacroSplitCalculator: React.FC<MacroSplitCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [dailyCalories, setDailyCalories] = useState<string>('2400');
  const [mealsCount, setMealsCount] = useState<string>('4');
  const [proteinGramsTotal, setProteinGramsTotal] = useState<string>('180');
  const [fatPercent, setFatPercent] = useState<string>('25');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.dailyCalories !== undefined) setDailyCalories(String(initialPreset.dailyCalories));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDailyCalories('2400');
    setMealsCount('4');
    setProteinGramsTotal('180');
    setFatPercent('25');
  };

  const calculate = () => {
    const cal = safeParseNumber(dailyCalories, 0);
    const meals = safeParseNumber(mealsCount, 1);
    const protGrams = safeParseNumber(proteinGramsTotal, 0);
    const fatPct = safeParseNumber(fatPercent, 0) / 100;

    if (cal <= 0 || meals <= 0 || protGrams <= 0) {
      return { isValid: false, msg: 'Calories, meals, and protein target must be greater than 0.' };
    }

    const proteinCalories = protGrams * 4;
    const fatCalories = cal * fatPct;
    const fatGrams = fatCalories / 9;

    const remainingCaloriesForCarbs = cal - (proteinCalories + fatCalories);
    if (remainingCaloriesForCarbs < 0) {
      return { isValid: false, msg: 'Protein and fat targets exceed total daily calorie limit.' };
    }

    const carbGrams = remainingCaloriesForCarbs / 4;

    const perMealCalories = cal / meals;
    const perMealProtein = protGrams / meals;
    const perMealCarbs = carbGrams / meals;
    const perMealFat = fatGrams / meals;

    return {
      isValid: true,
      msg: '',
      cal,
      meals,
      protGrams,
      fatGrams,
      carbGrams,
      perMealCalories,
      perMealProtein,
      perMealCarbs,
      perMealFat,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Meal Timing (${res.meals} meals): ${formatNumber(res.perMealProtein, 0)}g Protein / ${formatNumber(res.perMealCarbs, 0)}g Carbs per meal`,
        { dailyCalories, mealsCount, proteinGramsTotal, fatPercent },
        { perMealProtein: res.perMealProtein, perMealCarbs: res.perMealCarbs, perMealFat: res.perMealFat }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Daily Nutrition & Meal Split Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="dailyCalories" label="Target Daily Calories" suffix="kcal" value={dailyCalories} onChange={setDailyCalories} min={500} />
          <CalcInput id="proteinGramsTotal" label="Target Daily Protein" suffix="grams" value={proteinGramsTotal} onChange={setProteinGramsTotal} min={10} />
          <CalcInput id="fatPercent" label="Dietary Fat Percentage" suffix="%" value={fatPercent} onChange={setFatPercent} min={10} max={60} />
          <CalcSelect
            id="mealsCount"
            label="Daily Meal Frequency"
            value={mealsCount}
            onChange={setMealsCount}
            options={[
              { value: '3', label: '3 Meals / Day' },
              { value: '4', label: '4 Meals / Day' },
              { value: '5', label: '5 Meals / Day' },
              { value: '6', label: '6 Meals / Day' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Per-Meal Protein"
              value={`${formatNumber(res.perMealProtein, 1)} g`}
              subtitle={`Distributed across ${res.meals} meals`}
              highlighted={true}
              badgeText="Protein Target"
              badgeType="success"
            />
            <CalcResultCard
              title="Per-Meal Carbohydrates"
              value={`${formatNumber(res.perMealCarbs, 1)} g`}
              subtitle="Energy & glycogen recovery"
            />
            <CalcResultCard
              title="Per-Meal Dietary Fat"
              value={`${formatNumber(res.perMealFat, 1)} g`}
              subtitle="Hormonal & joint support"
            />
            <CalcResultCard
              title="Per-Meal Caloric Intake"
              value={`${formatNumber(res.perMealCalories, 0)} kcal`}
              subtitle="Average energy per feeding window"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Spacing protein feedings 3-4 hours apart optimizes muscle protein synthesis (MPS) throughout the day.</span>
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
