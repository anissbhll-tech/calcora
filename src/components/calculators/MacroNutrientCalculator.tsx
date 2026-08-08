import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface MacroNutrientCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const MacroNutrientCalculator: React.FC<MacroNutrientCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [calories, setCalories] = useState<string>('2000');
  const [goalPreset, setGoalPreset] = useState<string>('balanced');
  const [proteinPct, setProteinPct] = useState<string>('30');
  const [carbsPct, setCarbsPct] = useState<string>('40');
  const [fatsPct, setFatsPct] = useState<string>('30');
  const [mealsCount, setMealsCount] = useState<string>('4');

  useEffect(() => {
    if (goalPreset === 'balanced') {
      setProteinPct('30');
      setCarbsPct('40');
      setFatsPct('30');
    } else if (goalPreset === 'cutting') {
      setProteinPct('40');
      setCarbsPct('30');
      setFatsPct('30');
    } else if (goalPreset === 'bulking') {
      setProteinPct('30');
      setCarbsPct('50');
      setFatsPct('20');
    } else if (goalPreset === 'lowcarb') {
      setProteinPct('35');
      setCarbsPct('20');
      setFatsPct('45');
    } else if (goalPreset === 'keto') {
      setProteinPct('25');
      setCarbsPct('5');
      setFatsPct('70');
    }
  }, [goalPreset]);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.calories !== undefined) setCalories(String(initialPreset.calories));
      if (initialPreset.goalPreset !== undefined) setGoalPreset(String(initialPreset.goalPreset));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setCalories('2000');
    setGoalPreset('balanced');
    setProteinPct('30');
    setCarbsPct('40');
    setFatsPct('30');
    setMealsCount('4');
  };

  const calculate = () => {
    const totalCals = safeParseNumber(calories, 0);
    const pPct = safeParseNumber(proteinPct, 0);
    const cPct = safeParseNumber(carbsPct, 0);
    const fPct = safeParseNumber(fatsPct, 0);
    const meals = safeParseNumber(mealsCount, 4);

    const totalPct = pPct + cPct + fPct;

    if (totalCals <= 0) {
      return {
        isValid: false,
        msg: 'Daily calorie target must be greater than 0 kcal.',
        proteinGrams: 0,
        carbsGrams: 0,
        fatsGrams: 0,
      };
    }

    if (Math.abs(totalPct - 100) > 0.1) {
      return {
        isValid: false,
        msg: `Macro percentages must add up to 100% (current sum: ${totalPct}%).`,
        proteinGrams: 0,
        carbsGrams: 0,
        fatsGrams: 0,
      };
    }

    // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fats: 9 kcal/g
    const proteinCals = totalCals * (pPct / 100);
    const carbsCals = totalCals * (cPct / 100);
    const fatsCals = totalCals * (fPct / 100);

    const proteinGrams = proteinCals / 4;
    const carbsGrams = carbsCals / 4;
    const fatsGrams = fatsCals / 9;

    const perMealProtein = proteinGrams / meals;
    const perMealCarbs = carbsGrams / meals;
    const perMealFats = fatsGrams / meals;
    const perMealCals = totalCals / meals;

    return {
      isValid: true,
      msg: '',
      proteinGrams,
      carbsGrams,
      fatsGrams,
      proteinCals,
      carbsCals,
      fatsCals,
      perMealProtein,
      perMealCarbs,
      perMealFats,
      perMealCals,
      meals,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Macro Target (${calories} kcal): ${formatNumber(res.proteinGrams, 0)}g Protein, ${formatNumber(res.carbsGrams, 0)}g Carbs, ${formatNumber(res.fatsGrams, 0)}g Fat`,
        { calories, proteinPct, carbsPct, fatsPct },
        { proteinGrams: res.proteinGrams, carbsGrams: res.carbsGrams, fatsGrams: res.fatsGrams }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calorie & Goal Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Daily Target & Preset
          </h3>

          <CalcInput
            id="calories"
            label="Target Daily Calories"
            suffix="kcal"
            value={calories}
            onChange={setCalories}
            min={500}
            max={10000}
          />

          <CalcSelect
            id="goalPreset"
            label="Macro Strategy / Goal Preset"
            value={goalPreset}
            onChange={setGoalPreset}
            options={[
              { value: 'balanced', label: 'Balanced (30% P / 40% C / 30% F)' },
              { value: 'cutting', label: 'Fat Loss / High Protein (40% P / 30% C / 30% F)' },
              { value: 'bulking', label: 'Muscle Building / High Carb (30% P / 50% C / 20% F)' },
              { value: 'lowcarb', label: 'Low Carbohydrate (35% P / 20% C / 45% F)' },
              { value: 'keto', label: 'Ketogenic (25% P / 5% C / 70% F)' },
              { value: 'custom', label: 'Custom Ratio Split' },
            ]}
          />

          <CalcSelect
            id="mealsCount"
            label="Daily Meal Frequency"
            value={mealsCount}
            onChange={setMealsCount}
            options={[
              { value: '3', label: '3 Meals / day' },
              { value: '4', label: '4 Meals / day' },
              { value: '5', label: '5 Meals / day' },
              { value: '6', label: '6 Meals / day' },
            ]}
          />
        </div>

        {/* Custom Ratios Card */}
        <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/50 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            Macro Ratio Percentages
          </h3>

          <CalcInput
            id="proteinPct"
            label="Protein Share"
            suffix="%"
            value={proteinPct}
            onChange={setProteinPct}
            min={0}
            max={100}
          />

          <CalcInput
            id="carbsPct"
            label="Carbohydrates Share"
            suffix="%"
            value={carbsPct}
            onChange={setCarbsPct}
            min={0}
            max={100}
          />

          <CalcInput
            id="fatsPct"
            label="Fats Share"
            suffix="%"
            value={fatsPct}
            onChange={setFatsPct}
            min={0}
            max={100}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Daily Protein"
              value={`${formatNumber(res.proteinGrams, 0)} g`}
              subtitle={`${formatNumber(res.proteinCals, 0)} kcal (${proteinPct}%)`}
              highlighted={true}
            />

            <CalcResultCard
              title="Daily Carbs"
              value={`${formatNumber(res.carbsGrams, 0)} g`}
              subtitle={`${formatNumber(res.carbsCals, 0)} kcal (${carbsPct}%)`}
              badgeText="Energy"
              badgeType="info"
            />

            <CalcResultCard
              title="Daily Fats"
              value={`${formatNumber(res.fatsGrams, 0)} g`}
              subtitle={`${formatNumber(res.fatsCals, 0)} kcal (${fatsPct}%)`}
              badgeText="Essential"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Per-Meal Targets ({res.meals} meals/day):</span>{' '}
              <span className="font-semibold text-teal-600 dark:text-teal-400">{formatNumber(res.perMealProtein, 0)}g Protein</span> |{' '}
              <span className="font-semibold">{formatNumber(res.perMealCarbs, 0)}g Carbs</span> |{' '}
              <span className="font-semibold">{formatNumber(res.perMealFats, 0)}g Fat</span> ({formatNumber(res.perMealCals, 0)} kcal/meal)
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
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
