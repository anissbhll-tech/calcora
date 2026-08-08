import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface BmrCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const BmrCalculator: React.FC<BmrCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [sex, setSex] = useState<string>('male');
  const [age, setAge] = useState<string>('30');
  const [weight, setWeight] = useState<string>('75'); // kg
  const [height, setHeight] = useState<string>('175'); // cm
  const [formula, setFormula] = useState<string>('mifflin'); // mifflin, harris

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.weight !== undefined) setWeight(String(initialPreset.weight));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setSex('male');
    setAge('30');
    setWeight('75');
    setHeight('175');
    setFormula('mifflin');
  };

  const calculate = () => {
    const a = safeParseNumber(age, 0);
    const w = safeParseNumber(weight, 0);
    const h = safeParseNumber(height, 0);

    if (a <= 0 || w <= 0 || h <= 0) {
      return { isValid: false, msg: 'Age, weight, and height must be positive numbers.' };
    }

    let bmr = 0;
    if (formula === 'mifflin') {
      // Mifflin-St Jeor Formula
      bmr = 10 * w + 6.25 * h - 5 * a + (sex === 'male' ? 5 : -161);
    } else {
      // Revised Harris-Benedict Formula
      if (sex === 'male') {
        bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
      } else {
        bmr = 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
      }
    }

    const sedentary = bmr * 1.2;
    const lightActive = bmr * 1.375;
    const moderateActive = bmr * 1.55;
    const veryActive = bmr * 1.725;

    return {
      isValid: true,
      msg: '',
      bmr,
      sedentary,
      lightActive,
      moderateActive,
      veryActive,
      hourlyBmr: bmr / 24,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `BMR: ${formatNumber(res.bmr, 0)} kcal/day (${sex}, ${age}y)`,
        { sex, age, weight, height, formula },
        { bmr: res.bmr, sedentary: res.sedentary, moderateActive: res.moderateActive }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Biometric Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <CalcSelect
            id="sex"
            label="Biological Sex"
            value={sex}
            onChange={setSex}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
          <CalcInput id="age" label="Age" suffix="years" value={age} onChange={setAge} min={1} max={120} />
          <CalcInput id="weight" label="Weight" suffix="kg" value={weight} onChange={setWeight} min={1} />
          <CalcInput id="height" label="Height" suffix="cm" value={height} onChange={setHeight} min={1} />
          <CalcSelect
            id="formula"
            label="Formula Engine"
            value={formula}
            onChange={setFormula}
            options={[
              { value: 'mifflin', label: 'Mifflin-St Jeor (Modern Standard)' },
              { value: 'harris', label: 'Harris-Benedict (Revised)' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Basal Metabolic Rate (BMR)"
              value={`${formatNumber(res.bmr, 0)} kcal`}
              subtitle="Calories burned completely at rest"
              highlighted={true}
            />
            <CalcResultCard
              title="Hourly Resting Burn"
              value={`${formatNumber(res.hourlyBmr, 1)} kcal/hr`}
              subtitle="Resting energy expenditure per hour"
            />
            <CalcResultCard
              title="Sedentary TDEE (1.2x)"
              value={`${formatNumber(res.sedentary, 0)} kcal`}
              subtitle="Desk job, minimal exercise"
            />
            <CalcResultCard
              title="Moderate Exercise (1.55x)"
              value={`${formatNumber(res.moderateActive, 0)} kcal`}
              subtitle="3-5 workout sessions per week"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>BMR represents the minimum baseline energy your body requires to maintain vital organ function.</span>
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
