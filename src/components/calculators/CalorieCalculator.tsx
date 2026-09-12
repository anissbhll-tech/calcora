import React, { useState, useMemo, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Flame, Activity, Zap, Scale, Target, Sparkles, Utensils, Award, Info } from 'lucide-react';
import { BaseCalculatorProps } from './index';

interface MacroSplitPreset {
  id: string;
  name: string;
  carbPct: number;
  proteinPct: number;
  fatPct: number;
  desc: string;
}

const MACRO_PRESETS: MacroSplitPreset[] = [
  { id: 'balanced', name: 'Balanced Standard', carbPct: 45, proteinPct: 25, fatPct: 30, desc: 'General fitness & sustainable health' },
  { id: 'high_protein', name: 'High Protein / Muscle', carbPct: 35, proteinPct: 40, fatPct: 25, desc: 'Hypertrophy & muscle retention during cuts' },
  { id: 'low_carb', name: 'Low Carb / Ketogenic', carbPct: 10, proteinPct: 25, fatPct: 65, desc: 'Insulin sensitivity & fat adaptation' },
  { id: 'endurance', name: 'High Carb / Endurance', carbPct: 60, proteinPct: 20, fatPct: 20, desc: 'Runners, cyclists, and intense cardio' },
];

export const CalorieCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);

  // Imperial
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(170);

  // Metric
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(77);

  const [bodyFatPercent, setBodyFatPercent] = useState<number>(18);
  const [useBodyFat, setUseBodyFat] = useState<boolean>(false);
  const [bmrFormula, setBmrFormula] = useState<'mifflin' | 'harris' | 'katch'>('mifflin');

  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [calorieGoal, setCalorieGoal] = useState<string>('lose_moderate');
  const [macroPresetId, setMacroPresetId] = useState<string>('high_protein');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.unitSystem) setUnitSystem(initialPreset.unitSystem);
      if (initialPreset.sex) setSex(initialPreset.sex);
      if (initialPreset.age !== undefined) setAge(initialPreset.age);
      if (initialPreset.heightFt !== undefined) setHeightFt(initialPreset.heightFt);
      if (initialPreset.heightIn !== undefined) setHeightIn(initialPreset.heightIn);
      if (initialPreset.weightLbs !== undefined) setWeightLbs(initialPreset.weightLbs);
      if (initialPreset.heightCm !== undefined) setHeightCm(initialPreset.heightCm);
      if (initialPreset.weightKg !== undefined) setWeightKg(initialPreset.weightKg);
      if (initialPreset.activityLevel) setActivityLevel(initialPreset.activityLevel);
      if (initialPreset.calorieGoal) setCalorieGoal(initialPreset.calorieGoal);
    }
  }, [initialPreset]);

  const calculation = useMemo(() => {
    let weightInKg = 0;
    let heightInCm = 0;

    if (unitSystem === 'imperial') {
      const ft = safeParseNumber(heightFt, 5);
      const inches = safeParseNumber(heightIn, 10);
      heightInCm = (ft * 12 + inches) * 2.54;
      const lbs = safeParseNumber(weightLbs, 170);
      weightInKg = lbs * 0.45359237;
    } else {
      heightInCm = safeParseNumber(heightCm, 178);
      weightInKg = safeParseNumber(weightKg, 77);
    }

    const validAge = Math.max(10, Math.min(100, safeParseNumber(age, 28)));
    const bf = Math.max(3, Math.min(60, safeParseNumber(bodyFatPercent, 18))) / 100;

    // 1. Calculate BMR based on selected formula
    // A. Mifflin-St Jeor: 10 * weight(kg) + 6.25 * height(cm) - 5 * age + s (male:+5, female:-161)
    const sMifflin = sex === 'male' ? 5 : -161;
    const bmrMifflin = 10 * weightInKg + 6.25 * heightInCm - 5 * validAge + sMifflin;

    // B. Revised Harris-Benedict (1984):
    // Men: 88.362 + (13.397 * kg) + (4.799 * cm) - (5.677 * age)
    // Women: 447.593 + (9.247 * kg) + (3.098 * cm) - (4.330 * age)
    const bmrHarris =
      sex === 'male'
        ? 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * validAge
        : 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * validAge;

    // C. Katch-McArdle: 370 + (21.6 * Lean Body Mass in kg)
    const leanMassKg = weightInKg * (1 - bf);
    const bmrKatch = 370 + 21.6 * leanMassKg;

    let activeBmr = bmrMifflin;
    if (bmrFormula === 'harris') activeBmr = bmrHarris;
    if (bmrFormula === 'katch' || useBodyFat) activeBmr = bmrKatch;

    // 2. Activity Multipliers
    const multipliers: Record<string, { factor: number; label: string; desc: string }> = {
      sedentary: { factor: 1.2, label: 'Sedentary', desc: 'Desk job, minimal daily movement' },
      light: { factor: 1.375, label: 'Lightly Active', desc: '1–3 workouts/wk or active walking' },
      moderate: { factor: 1.55, label: 'Moderately Active', desc: '3–5 moderate training sessions/wk' },
      heavy: { factor: 1.725, label: 'Very Active', desc: '6–7 intense workouts/wk or hard labor' },
      athlete: { factor: 1.9, label: 'Extremely Active / Athlete', desc: 'Daily intense training or 2x/day' },
    };

    const activeMultiplier = multipliers[activityLevel]?.factor || 1.55;
    const tdee = activeBmr * activeMultiplier;

    // 3. Goal Caloric Adjustment
    const goals: Record<string, { delta: number; label: string; weeklyChangeLbs: number }> = {
      maintain: { delta: 0, label: 'Maintain Weight (TDEE)', weeklyChangeLbs: 0 },
      lose_mild: { delta: -250, label: 'Mild Fat Loss (-0.5 lb / wk)', weeklyChangeLbs: -0.5 },
      lose_moderate: { delta: -500, label: 'Standard Fat Loss (-1.0 lb / wk)', weeklyChangeLbs: -1.0 },
      lose_aggressive: { delta: -750, label: 'Aggressive Cut (-1.5 lb / wk)', weeklyChangeLbs: -1.5 },
      gain_mild: { delta: 250, label: 'Lean Bulk (+0.5 lb / wk)', weeklyChangeLbs: 0.5 },
      gain_moderate: { delta: 500, label: 'Standard Bulk (+1.0 lb / wk)', weeklyChangeLbs: 1.0 },
    };

    const selectedGoal = goals[calorieGoal] || goals.lose_moderate;
    const targetCalories = Math.max(1000, tdee + selectedGoal.delta);

    // 4. Macro Nutrients Calculation
    const activeMacroPreset = MACRO_PRESETS.find((p) => p.id === macroPresetId) || MACRO_PRESETS[1];
    const carbsCalories = targetCalories * (activeMacroPreset.carbPct / 100);
    const proteinCalories = targetCalories * (activeMacroPreset.proteinPct / 100);
    const fatCalories = targetCalories * (activeMacroPreset.fatPct / 100);

    const carbsGrams = Math.round(carbsCalories / 4);
    const proteinGrams = Math.round(proteinCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    const proteinPerLb = unitSystem === 'imperial' ? proteinGrams / weightLbs : proteinGrams / (weightInKg * 2.20462);

    const macroChartData = [
      { name: `Carbs (${activeMacroPreset.carbPct}%)`, value: carbsGrams * 4, grams: carbsGrams, color: '#3b82f6' },
      { name: `Protein (${activeMacroPreset.proteinPct}%)`, value: proteinGrams * 4, grams: proteinGrams, color: '#10b981' },
      { name: `Fat (${activeMacroPreset.fatPct}%)`, value: fatGrams * 9, grams: fatGrams, color: '#f59e0b' },
    ];

    return {
      weightInKg,
      heightInCm,
      bmr: activeBmr,
      bmrMifflin,
      bmrHarris,
      bmrKatch,
      tdee,
      targetCalories,
      selectedGoal,
      activeMacroPreset,
      carbsGrams,
      proteinGrams,
      fatGrams,
      carbsCalories,
      proteinCalories,
      fatCalories,
      proteinPerLb,
      macroChartData,
      multipliers,
      goals,
    };
  }, [unitSystem, sex, age, heightFt, heightIn, weightLbs, heightCm, weightKg, bodyFatPercent, useBodyFat, bmrFormula, activityLevel, calorieGoal, macroPresetId]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `TDEE: ${Math.round(calculation.tdee)} kcal | Target: ${Math.round(calculation.targetCalories)} kcal (${calculation.selectedGoal.label})`,
        { unitSystem, sex, age, heightFt, heightIn, weightLbs, heightCm, weightKg, activityLevel, calorieGoal, macroPresetId },
        {
          bmr: Math.round(calculation.bmr),
          tdee: Math.round(calculation.tdee),
          targetCalories: Math.round(calculation.targetCalories),
          proteinGrams: calculation.proteinGrams,
          carbsGrams: calculation.carbsGrams,
          fatGrams: calculation.fatGrams,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Unit & Demographic Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
              unitSystem === 'imperial'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Imperial (ft / in / lbs)
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
              unitSystem === 'metric'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Metric (cm / kg)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setSex('male')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                sex === 'male'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setSex('female')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                sex === 'female'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Female
            </button>
          </div>

          <div className="w-28">
            <CalcInput
              id="age"
              label="Age"
              value={age}
              onChange={(val) => setAge(val)}
              min={10}
              max={100}
              step={1}
              suffix="yrs"
            />
          </div>
        </div>
      </div>

      {/* Body Measurements & BMR Formula Options */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Scale className="w-4 h-4 text-blue-500" />
          Body Composition &amp; BMR Engine
        </h3>

        {unitSystem === 'imperial' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcInput
              id="heightFt"
              label="Height (Feet)"
              value={heightFt}
              onChange={(val) => setHeightFt(val)}
              min={2}
              max={8}
              step={1}
              suffix="ft"
            />
            <CalcInput
              id="heightIn"
              label="Height (Inches)"
              value={heightIn}
              onChange={(val) => setHeightIn(val)}
              min={0}
              max={11}
              step={1}
              suffix="in"
            />
            <CalcInput
              id="weightLbs"
              label="Weight (Pounds)"
              value={weightLbs}
              onChange={(val) => setWeightLbs(val)}
              min={40}
              max={600}
              step={1}
              suffix="lbs"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput
              id="heightCm"
              label="Height (Centimeters)"
              value={heightCm}
              onChange={(val) => setHeightCm(val)}
              min={60}
              max={250}
              step={1}
              suffix="cm"
            />
            <CalcInput
              id="weightKg"
              label="Weight (Kilograms)"
              value={weightKg}
              onChange={(val) => setWeightKg(val)}
              min={20}
              max={300}
              step={0.5}
              suffix="kg"
            />
          </div>
        )}

        {/* Optional Body Fat / Formula Switcher */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">BMR Formula:</label>
            <div className="flex gap-2">
              {[
                { id: 'mifflin', label: 'Mifflin-St Jeor (Standard)' },
                { id: 'harris', label: 'Harris-Benedict' },
                { id: 'katch', label: 'Katch-McArdle (Lean Mass)' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setBmrFormula(f.id as any);
                    if (f.id === 'katch') setUseBodyFat(true);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                    bmrFormula === f.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {bmrFormula === 'katch' && (
            <div className="w-full sm:w-48">
              <CalcInput
                id="bodyFatPercent"
                label="Body Fat %"
                value={bodyFatPercent}
                onChange={(val) => setBodyFatPercent(val)}
                min={3}
                max={60}
                step={0.5}
                suffix="%"
              />
            </div>
          )}
        </div>
      </div>

      {/* Activity Level & Target Goal Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Activity Level */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Daily Activity Multiplier
          </label>
          <div className="space-y-2">
            {Object.entries(calculation.multipliers).map(([key, data]: [string, any]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActivityLevel(key)}
                className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                  activityLevel === key
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{data.label}</div>
                  <div className="text-[11px] text-slate-500">{data.desc}</div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  ×{data.factor}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Caloric Goal */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Target Weight Goal
          </label>
          <div className="space-y-2">
            {Object.entries(calculation.goals).map(([key, data]: [string, any]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCalorieGoal(key)}
                className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                  calorieGoal === key
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-400 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{data.label}</div>
                  <div className="text-[11px] text-slate-500">
                    {data.delta === 0 ? 'Maintain current bodyweight' : `${data.delta > 0 ? '+' : ''}${data.delta} kcal / day`}
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.round(calculation.tdee + data.delta)} kcal
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary KPI Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Daily Caloric Target"
          value={`${Math.round(calculation.targetCalories)} kcal`}
          subtitle={calculation.selectedGoal.label}
          highlighted={true}
          icon={<Flame className="w-5 h-5 text-amber-500" />}
        />

        <CalcResultCard
          title="Maintenance TDEE"
          value={`${Math.round(calculation.tdee)} kcal`}
          subtitle="Total Daily Energy Expenditure"
          icon={<Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Basal Metabolic Rate (BMR)"
          value={`${Math.round(calculation.bmr)} kcal`}
          subtitle="Calories burned at complete rest"
          icon={<Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Protein Allocation"
          value={`${calculation.proteinGrams}g / day`}
          subtitle={`≈ ${calculation.proteinPerLb.toFixed(2)}g per lb bodyweight`}
          icon={<Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Macronutrient Distribution Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-indigo-500" />
              Macronutrient Target Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeting <strong className="font-mono text-slate-800 dark:text-slate-200">{Math.round(calculation.targetCalories)} calories</strong> per day
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {MACRO_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setMacroPresetId(p.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                  macroPresetId === p.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Donut Chart */}
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={calculation.macroChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {calculation.macroChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number, name: string) => [`${val} kcal`, name]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Macro Stat Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-xs font-sans font-bold text-blue-700 dark:text-blue-400 flex items-center justify-between">
                <span>Carbohydrates</span>
                <span>{calculation.activeMacroPreset.carbPct}%</span>
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {calculation.carbsGrams}g
              </div>
              <div className="text-[11px] font-sans text-slate-500">
                {Math.round(calculation.carbsCalories)} calories (4 kcal/g)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-xs font-sans font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                <span>Protein</span>
                <span>{calculation.activeMacroPreset.proteinPct}%</span>
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {calculation.proteinGrams}g
              </div>
              <div className="text-[11px] font-sans text-slate-500">
                {Math.round(calculation.proteinCalories)} calories (4 kcal/g)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
              <span className="text-xs font-sans font-bold text-amber-700 dark:text-amber-400 flex items-center justify-between">
                <span>Dietary Fats</span>
                <span>{calculation.activeMacroPreset.fatPct}%</span>
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {calculation.fatGrams}g
              </div>
              <div className="text-[11px] font-sans text-slate-500">
                {Math.round(calculation.fatCalories)} calories (9 kcal/g)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
