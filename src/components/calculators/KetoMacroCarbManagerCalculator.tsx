import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Apple, Flame, Activity, ShieldCheck, Scale, Dumbbell, Sparkles, PieChart, Info, CheckCircle2 } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
type KetoGoal = 'deficit_aggressive' | 'deficit_moderate' | 'maintenance' | 'surplus';
type UnitSystem = 'us' | 'metric';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

const GOAL_MULTIPLIERS: Record<KetoGoal, number> = {
  deficit_aggressive: 0.75, // 25% deficit
  deficit_moderate: 0.80, // 20% deficit
  maintenance: 1.0,
  surplus: 1.10, // 10% surplus
};

export const KetoMacroCarbManagerCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('us');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number>(32);
  const [weightLbs, setWeightLbs] = useState<number>(185);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightKg, setWeightKg] = useState<number>(84);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [bodyFatPercent, setBodyFatPercent] = useState<number>(22);
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<KetoGoal>('deficit_moderate');
  const [netCarbTargetGrams, setNetCarbTargetGrams] = useState<number>(20);
  const [proteinPerLbLean, setProteinPerLbLean] = useState<number>(0.85); // 0.85g per lb of lean mass

  // Net Carb Quick Calculator State
  const [foodTotalCarbs, setFoodTotalCarbs] = useState<number>(18);
  const [foodFiber, setFoodFiber] = useState<number>(8);
  const [foodSugarAlcohols, setFoodSugarAlcohols] = useState<number>(6);

  const calculation = useMemo(() => {
    // Standardize to Metric for BMR
    let weightInKg = 0;
    let heightInCm = 0;
    let weightInLbs = 0;

    if (unitSystem === 'us') {
      weightInLbs = Math.max(50, safeParseNumber(weightLbs, 180));
      weightInKg = weightInLbs * 0.45359237;
      const totalInches = safeParseNumber(heightFeet, 5) * 12 + safeParseNumber(heightInches, 10);
      heightInCm = totalInches * 2.54;
    } else {
      weightInKg = Math.max(25, safeParseNumber(weightKg, 80));
      weightInLbs = weightInKg * 2.20462;
      heightInCm = Math.max(100, safeParseNumber(heightCm, 175));
    }

    const safeAge = Math.max(15, Math.min(100, safeParseNumber(age, 30)));
    const bf = Math.max(4, Math.min(60, safeParseNumber(bodyFatPercent, 20))) / 100;
    const leanMassLbs = weightInLbs * (1 - bf);
    const leanMassKg = weightInKg * (1 - bf);

    // 1. BMR (Mifflin-St Jeor)
    let bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * safeAge;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // 2. TDEE
    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];

    // 3. Goal Daily Calories
    const targetCalories = Math.max(1000, Math.round(tdee * GOAL_MULTIPLIERS[goal]));

    // 4. Ketogenic Macros Allocation
    // Carbs: Fixed Net Target (4 kcal/g)
    const netCarbsG = Math.max(5, Math.min(50, safeParseNumber(netCarbTargetGrams, 20)));
    const carbCalories = netCarbsG * 4;

    // Protein: Based on Lean Body Mass (4 kcal/g)
    const proteinRatio = Math.max(0.6, Math.min(1.5, safeParseNumber(proteinPerLbLean, 0.85)));
    const proteinG = Math.max(40, Math.round(leanMassLbs * proteinRatio));
    const proteinCalories = proteinG * 4;

    // Fat: Fills the remaining calorie pool (9 kcal/g)
    const remainingCaloriesForFat = Math.max(0, targetCalories - carbCalories - proteinCalories);
    const fatG = Math.max(20, Math.round(remainingCaloriesForFat / 9));
    const fatCalories = fatG * 9;

    // Adjusted Total Calories from exact macro rounding
    const actualMacroCalories = carbCalories + proteinCalories + fatCalories;

    // Percentage Breakdown
    const carbPct = Math.round((carbCalories / actualMacroCalories) * 100);
    const proteinPct = Math.round((proteinCalories / actualMacroCalories) * 100);
    const fatPct = 100 - carbPct - proteinPct;

    // Food Net Carb Calculation
    const foodNet = Math.max(
      0,
      safeParseNumber(foodTotalCarbs, 0) -
        safeParseNumber(foodFiber, 0) -
        safeParseNumber(foodSugarAlcohols, 0)
    );

    return {
      weightInLbs,
      weightInKg,
      leanMassLbs,
      leanMassKg,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      actualMacroCalories,
      netCarbsG,
      carbCalories,
      carbPct,
      proteinG,
      proteinCalories,
      proteinPct,
      fatG,
      fatCalories,
      fatPct,
      foodNet,
    };
  }, [
    unitSystem,
    gender,
    age,
    weightLbs,
    heightFeet,
    heightInches,
    weightKg,
    heightCm,
    bodyFatPercent,
    activity,
    goal,
    netCarbTargetGrams,
    proteinPerLbLean,
    foodTotalCarbs,
    foodFiber,
    foodSugarAlcohols,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Keto Targets: ${calculation.targetCalories} kcal | ${calculation.netCarbsG}g Carbs (${calculation.carbPct}%) | ${calculation.proteinG}g Protein (${calculation.proteinPct}%) | ${calculation.fatG}g Fat (${calculation.fatPct}%)`,
        {
          gender,
          age,
          weight: unitSystem === 'us' ? `${weightLbs} lbs` : `${weightKg} kg`,
          goal,
          activity,
        },
        {
          calories: calculation.targetCalories,
          netCarbs: calculation.netCarbsG,
          protein: calculation.proteinG,
          fat: calculation.fatG,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Unit System & Goal Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Unit System:</span>
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setUnitSystem('us')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                unitSystem === 'us'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              US (lbs, ft/in)
            </button>
            <button
              type="button"
              onClick={() => setUnitSystem('metric')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                unitSystem === 'metric'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Metric (kg, cm)
            </button>
          </div>
        </div>

        {/* Nutritional Goal Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Keto Goal:</span>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as KetoGoal)}
            className="text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
          >
            <option value="deficit_moderate">Fat Loss (20% Deficit - Recommended)</option>
            <option value="deficit_aggressive">Aggressive Fat Loss (25% Deficit)</option>
            <option value="maintenance">Weight Maintenance (0% Deficit)</option>
            <option value="surplus">Lean Muscle Building (+10% Surplus)</option>
          </select>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Body Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Scale className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Personal Body Metrics
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Biological Sex</label>
              <div className="grid grid-cols-2 gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    gender === 'male' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    gender === 'female' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <CalcInput
              id="age"
              label="Age"
              value={age}
              onChange={(val) => setAge(val)}
              min={15}
              max={100}
              suffix="yrs"
            />
          </div>

          {unitSystem === 'us' ? (
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <CalcInput
                  id="weightLbs"
                  label="Weight"
                  value={weightLbs}
                  onChange={(val) => setWeightLbs(val)}
                  min={50}
                  step={1}
                  suffix="lbs"
                />
              </div>
              <div className="col-span-1">
                <CalcInput
                  id="heightFeet"
                  label="Height (Ft)"
                  value={heightFeet}
                  onChange={(val) => setHeightFeet(val)}
                  min={3}
                  max={7}
                  suffix="ft"
                />
              </div>
              <div className="col-span-1">
                <CalcInput
                  id="heightInches"
                  label="Height (In)"
                  value={heightInches}
                  onChange={(val) => setHeightInches(val)}
                  min={0}
                  max={11}
                  suffix="in"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <CalcInput
                id="weightKg"
                label="Weight"
                value={weightKg}
                onChange={(val) => setWeightKg(val)}
                min={30}
                step={0.5}
                suffix="kg"
              />
              <CalcInput
                id="heightCm"
                label="Height"
                value={heightCm}
                onChange={(val) => setHeightCm(val)}
                min={100}
                max={250}
                suffix="cm"
              />
            </div>
          )}

          <CalcInput
            id="bodyFatPercent"
            label="Estimated Body Fat %"
            value={bodyFatPercent}
            onChange={(val) => setBodyFatPercent(val)}
            min={5}
            max={55}
            suffix="%"
            helpText={`Lean mass: ${Math.round(calculation.leanMassLbs)} lbs (${Math.round(calculation.leanMassKg)} kg) used for protein calculation.`}
          />
        </div>

        {/* Right: Activity & Keto Fine-Tuning */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Activity &amp; Macro Precision
            </h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Daily Physical Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityLevel)}
              className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
            >
              <option value="sedentary">Sedentary (Desk Job, Minimal Movement)</option>
              <option value="light">Lightly Active (1–3 Days Exercise/Week)</option>
              <option value="moderate">Moderately Active (3–5 Days Exercise/Week)</option>
              <option value="very">Very Active (6–7 Days Intense Exercise/Week)</option>
              <option value="extra">Extremely Active (Athletic Training / Heavy Labor)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="netCarbTargetGrams"
              label="Net Carb Cap"
              value={netCarbTargetGrams}
              onChange={(val) => setNetCarbTargetGrams(val)}
              min={10}
              max={50}
              step={5}
              suffix="g"
              helpText="20g standard for deep ketosis."
            />

            <CalcInput
              id="proteinPerLbLean"
              label="Protein Ratio"
              value={proteinPerLbLean}
              onChange={(val) => setProteinPerLbLean(val)}
              min={0.6}
              max={1.2}
              step={0.05}
              suffix="g/lb"
              helpText="Per lb of lean body mass."
            />
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400">
              Basal Metabolic Rate (BMR):
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {calculation.bmr} kcal/day (TDEE: {calculation.tdee} kcal)
            </span>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Daily Target Calories"
          value={`${calculation.targetCalories} kcal`}
          subtitle={`${goal === 'deficit_moderate' ? '20% Deficit' : goal === 'deficit_aggressive' ? '25% Deficit' : goal === 'maintenance' ? 'Maintenance' : '10% Surplus'} (${calculation.tdee} TDEE)`}
          highlighted={true}
          icon={<Flame className="w-5 h-5 text-amber-500" />}
        />

        <CalcResultCard
          title="Fats (Primary Energy)"
          value={`${calculation.fatG}g`}
          subtitle={`${calculation.fatCalories} kcal (${calculation.fatPct}% of daily calories)`}
          icon={<Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Protein (Muscle Retention)"
          value={`${calculation.proteinG}g`}
          subtitle={`${calculation.proteinCalories} kcal (${calculation.proteinPct}% of daily calories)`}
          icon={<Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Net Carbohydrates (Cap)"
          value={`${calculation.netCarbsG}g`}
          subtitle={`${calculation.carbCalories} kcal (${calculation.carbPct}% of daily calories)`}
          icon={<Apple className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Macro Visual Distribution Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-teal-500" />
            Ketogenic Macro Caloric Proportion
          </h3>
          <span className="text-xs font-mono font-bold text-slate-500">
            Total {calculation.actualMacroCalories} kcal
          </span>
        </div>

        <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${calculation.fatPct}%` }}
            className="bg-teal-500 flex items-center justify-center text-[10px] font-bold text-white transition-all"
            title={`Fats: ${calculation.fatPct}%`}
          >
            Fats {calculation.fatPct}%
          </div>
          <div
            style={{ width: `${calculation.proteinPct}%` }}
            className="bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white transition-all"
            title={`Protein: ${calculation.proteinPct}%`}
          >
            Protein {calculation.proteinPct}%
          </div>
          <div
            style={{ width: `${calculation.carbPct}%` }}
            className="bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white transition-all"
            title={`Carbs: ${calculation.carbPct}%`}
          >
            Carbs {calculation.carbPct}%
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 rounded-xl border border-teal-100 dark:border-teal-900/50">
            <span className="text-teal-800 dark:text-teal-300 font-bold block">Fats (Energy Lever)</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px]">
              {calculation.fatG}g / day (Oils, Butter, Avocado, Nuts, Fatty Cuts)
            </span>
          </div>
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
            <span className="text-blue-800 dark:text-blue-300 font-bold block">Protein (Muscle Goal)</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px]">
              {calculation.proteinG}g / day (Eggs, Poultry, Beef, Fish, Whey)
            </span>
          </div>
          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <span className="text-emerald-800 dark:text-emerald-300 font-bold block">Net Carbs (Hard Limit)</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px]">
              ≤ {calculation.netCarbsG}g / day (Leafy Greens, Cruciferous Veggies)
            </span>
          </div>
        </div>
      </div>

      {/* Bonus Utility: Food Net Carb Deductor */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Apple className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Interactive Nutrition Label Net Carb Calculator
            </h4>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {calculation.foodNet}g Net Carbs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalcInput
            id="foodTotalCarbs"
            label="Total Carbohydrates"
            value={foodTotalCarbs}
            onChange={(val) => setFoodTotalCarbs(val)}
            min={0}
            suffix="g"
          />
          <CalcInput
            id="foodFiber"
            label="Dietary Fiber (Subtract)"
            value={foodFiber}
            onChange={(val) => setFoodFiber(val)}
            min={0}
            suffix="g"
          />
          <CalcInput
            id="foodSugarAlcohols"
            label="Sugar Alcohols (Erythritol/Allulose)"
            value={foodSugarAlcohols}
            onChange={(val) => setFoodSugarAlcohols(val)}
            min={0}
            suffix="g"
          />
        </div>
      </div>
    </div>
  );
};
