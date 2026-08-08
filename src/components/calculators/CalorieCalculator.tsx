import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CalculationHistoryItem } from '../../types';

interface CalorieCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  presetValues?: Record<string, any>;
}

export const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({
  onAddHistory,
  presetValues,
}) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(170);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(77);
  const [activityLevel, setActivityLevel] = useState<string>('light');
  const [goal, setGoal] = useState<string>('maintain');

  useEffect(() => {
    if (presetValues) {
      if (presetValues.unitSystem) setUnitSystem(presetValues.unitSystem);
      if (presetValues.sex) setSex(presetValues.sex);
      if (presetValues.age !== undefined) setAge(presetValues.age);
      if (presetValues.heightFt !== undefined) setHeightFt(presetValues.heightFt);
      if (presetValues.heightIn !== undefined) setHeightIn(presetValues.heightIn);
      if (presetValues.weightLbs !== undefined) setWeightLbs(presetValues.weightLbs);
      if (presetValues.activityLevel) setActivityLevel(presetValues.activityLevel);
      if (presetValues.goal) setGoal(presetValues.goal);
    }
  }, [presetValues]);

  // Convert inputs to kg & cm
  let weightKgVal = weightKg;
  let heightCmVal = heightCm;

  if (unitSystem === 'imperial') {
    weightKgVal = weightLbs * 0.453592;
    heightCmVal = (heightFt * 12 + heightIn) * 2.54;
  }

  // Mifflin-St Jeor Formula
  // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + s (male:+5, female:-161)
  const s = sex === 'male' ? 5 : -161;
  const bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * age + s;

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9,
  };

  const tdee = bmr * (activityMultipliers[activityLevel] || 1.375);

  let targetCalories = tdee;
  if (goal === 'lose_mild') targetCalories = tdee - 250;
  if (goal === 'lose') targetCalories = tdee - 500;
  if (goal === 'lose_aggressive') targetCalories = tdee - 750;
  if (goal === 'gain_mild') targetCalories = tdee + 250;
  if (goal === 'gain') targetCalories = tdee + 500;

  // Macros Calculation (40% carbs, 30% protein, 30% fat)
  const proteinGrams = Math.round((targetCalories * 0.3) / 4);
  const carbsGrams = Math.round((targetCalories * 0.4) / 4);
  const fatGrams = Math.round((targetCalories * 0.3) / 9);

  const macroPieData = [
    { name: 'Carbohydrates (40%)', value: carbsGrams * 4, grams: carbsGrams, color: '#3b82f6' },
    { name: 'Protein (30%)', value: proteinGrams * 4, grams: proteinGrams, color: '#10b981' },
    { name: 'Fats (30%)', value: fatGrams * 9, grams: fatGrams, color: '#f59e0b' },
  ];

  useEffect(() => {
    if (targetCalories > 0) {
      const timer = setTimeout(() => {
        onAddHistory({
          calculatorId: 'calorie-tdee',
          calculatorTitle: 'TDEE & Calorie Counter',
          summaryText: `${Math.round(targetCalories)} kcal/day (${goal.replace('_', ' ')})`,
          inputs: { age, sex, activityLevel, goal },
          results: { tdee: Math.round(tdee), targetCalories: Math.round(targetCalories) },
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [targetCalories, goal]);

  return (
    <div className="space-y-8">
      {/* Unit Toggle */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex gap-1">
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition ${
              unitSystem === 'imperial'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Imperial (ft, lbs)
          </button>
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition ${
              unitSystem === 'metric'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Metric (cm, kg)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as 'male' | 'female')}
                className="w-full text-xs font-semibold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          {unitSystem === 'imperial' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Height (ft & in)</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full text-xs font-semibold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value="sedentary">Sedentary (Little or no exercise, desk job)</option>
              <option value="light">Lightly Active (Exercise 1–3 days/week)</option>
              <option value="moderate">Moderately Active (Exercise 3–5 days/week)</option>
              <option value="heavy">Very Active (Hard exercise 6–7 days/week)</option>
              <option value="athlete">Extra Active (Hard physical job or 2x/day training)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full text-xs font-semibold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value="lose_aggressive">Aggressive Weight Loss (-750 kcal / -1.5 lb/wk)</option>
              <option value="lose">Standard Weight Loss (-500 kcal / -1.0 lb/wk)</option>
              <option value="lose_mild">Mild Weight Loss (-250 kcal / -0.5 lb/wk)</option>
              <option value="maintain">Maintain Current Weight (0 kcal adjustment)</option>
              <option value="gain_mild">Mild Lean Muscle Gain (+250 kcal / +0.5 lb/wk)</option>
              <option value="gain">Standard Bulking (+500 kcal / +1.0 lb/wk)</option>
            </select>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Daily Intake</span>
            <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
              {Math.round(targetCalories).toLocaleString()}
              <span className="text-base text-slate-400 font-normal"> kcal/day</span>
            </div>

            {/* Macro Chart */}
            <div className="h-44 mt-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {macroPieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => `${val} kcal`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">Carbs</span>
              <span className="font-mono font-bold text-blue-600 text-sm">{carbsGrams}g</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">Protein</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">{proteinGrams}g</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-slate-400 block text-[10px]">Fats</span>
              <span className="font-mono font-bold text-amber-500 text-sm">{fatGrams}g</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs flex justify-between text-slate-600 dark:text-slate-400">
            <span>Base Metabolic Rate (BMR):</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{Math.round(bmr)} kcal</span>
          </div>
        </div>

      </div>
    </div>
  );
};
