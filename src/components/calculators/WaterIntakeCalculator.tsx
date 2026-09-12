import React, { useState, useMemo, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Droplets, GlassWater, Sun, Flame, Sparkles, User, Info, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { BaseCalculatorProps } from './index';

type UnitSystem = 'imperial' | 'metric';
type ActivityLevel = 'sedentary' | 'moderate' | 'intense' | 'endurance';
type ClimateType = 'temperate' | 'hot' | 'dry_altitude' | 'cold_dry';
type SpecialCondition = 'none' | 'pregnant' | 'breastfeeding';

interface HydrationScheduleSlot {
  time: string;
  label: string;
  cups: number;
  ml: number;
  tip: string;
}

export const WaterIntakeCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [unit, setUnit] = useState<UnitSystem>('imperial');
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [exerciseMinutes, setExerciseMinutes] = useState<number>(45);
  const [activityIntensity, setActivityIntensity] = useState<ActivityLevel>('moderate');
  const [climate, setClimate] = useState<ClimateType>('temperate');
  const [specialCondition, setSpecialCondition] = useState<SpecialCondition>('none');
  const [bottleSizeMl, setBottleSizeMl] = useState<number>(750); // e.g. 750ml standard sport bottle

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.unit !== undefined) setUnit(initialPreset.unit);
      if (initialPreset.weightLbs !== undefined) setWeightLbs(initialPreset.weightLbs);
      if (initialPreset.weightKg !== undefined) setWeightKg(initialPreset.weightKg);
      if (initialPreset.exerciseMinutes !== undefined) setExerciseMinutes(initialPreset.exerciseMinutes);
      if (initialPreset.activityIntensity !== undefined) setActivityIntensity(initialPreset.activityIntensity);
      if (initialPreset.climate !== undefined) setClimate(initialPreset.climate);
      if (initialPreset.specialCondition !== undefined) setSpecialCondition(initialPreset.specialCondition);
    }
  }, [initialPreset]);

  // Sync weights when unit changes
  const handleUnitChange = (newUnit: UnitSystem) => {
    if (newUnit === 'metric' && unit === 'imperial') {
      setWeightKg(Math.round(weightLbs / 2.20462));
    } else if (newUnit === 'imperial' && unit === 'metric') {
      setWeightLbs(Math.round(weightKg * 2.20462));
    }
    setUnit(newUnit);
  };

  const calculation = useMemo(() => {
    // Standard weight in kg and lbs
    const weightInKg = unit === 'metric' ? Math.max(30, safeParseNumber(weightKg, 75)) : Math.max(30, safeParseNumber(weightLbs, 165) / 2.20462);
    const weightInLbs = weightInKg * 2.20462;

    // 1. Base Hydration (NASEM / EFSA Baseline): ~35 ml per kg of body weight
    const baseMl = weightInKg * 35;

    // 2. Sweat rate adjustment from exercise duration & intensity
    // Light: 8 ml/min, Moderate: 12 ml/min, Intense/HIIT: 16 ml/min, Endurance: 20 ml/min
    const intensityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 0,
      moderate: 12,
      intense: 16,
      endurance: 20,
    };
    const exerciseMins = Math.max(0, safeParseNumber(exerciseMinutes, 45));
    const exerciseBonusMl = exerciseMins * (intensityMultipliers[activityIntensity] || 12);

    // 3. Climate / Environmental Temperature factor
    let climateBonusMl = 0;
    if (climate === 'hot') climateBonusMl = 500; // ~17 oz
    else if (climate === 'dry_altitude') climateBonusMl = 400; // ~13.5 oz
    else if (climate === 'cold_dry') climateBonusMl = 250; // respiratory moisture loss

    // 4. Pregnancy / Lactation (ACOG / Institute of Medicine guidelines)
    let conditionBonusMl = 0;
    if (specialCondition === 'pregnant') conditionBonusMl = 300; // +10 oz / ~300 ml
    else if (specialCondition === 'breastfeeding') conditionBonusMl = 800; // +27 oz / ~800 ml for breast milk production

    // Total Daily Water Recommendation
    const totalMl = Math.round(baseMl + exerciseBonusMl + climateBonusMl + conditionBonusMl);
    const totalLiters = totalMl / 1000;
    const totalFlOz = totalMl * 0.033814;
    const standard8OzCups = totalFlOz / 8;
    const standardSportBottles = totalMl / Math.max(250, bottleSizeMl);

    // Timeline Hydration Distribution
    const schedule: HydrationScheduleSlot[] = [
      {
        time: '7:00 AM – 8:30 AM',
        label: 'Morning Kickstart & Rehydration',
        cups: 2,
        ml: Math.round(totalMl * 0.20),
        tip: 'Drink 1-2 glasses immediately upon waking to restore overnight respiratory water loss.',
      },
      {
        time: '9:00 AM – 12:30 PM',
        label: 'Mid-Morning Mental Focus',
        cups: Math.max(1, Math.round(standard8OzCups * 0.25)),
        ml: Math.round(totalMl * 0.25),
        tip: 'Sip steadily at your desk. Dehydration of just 1-2% reduces cognitive focus.',
      },
      {
        time: 'Workout Window',
        label: 'Pre / During / Post Exercise',
        cups: Math.max(1.5, Math.round((exerciseBonusMl * 0.033814) / 8)),
        ml: Math.max(400, exerciseBonusMl),
        tip: 'Drink 200–300 ml every 15–20 minutes of sweating. Add electrolytes for >60 min sessions.',
      },
      {
        time: '1:30 PM – 5:00 PM',
        label: 'Afternoon Vitality',
        cups: Math.max(1, Math.round(standard8OzCups * 0.25)),
        ml: Math.round(totalMl * 0.25),
        tip: 'Prevents the common 3 PM afternoon energy slump often mistaken for hunger.',
      },
      {
        time: '6:00 PM – 9:00 PM',
        label: 'Evening & Dinner Wind-Down',
        cups: Math.max(1, Math.round(standard8OzCups * 0.15)),
        ml: Math.round(totalMl * 0.15),
        tip: 'Taper fluid intake 1–2 hours before sleep to prevent sleep-disrupting nocturia.',
      },
    ];

    return {
      weightInKg,
      weightInLbs,
      baseMl,
      exerciseBonusMl,
      climateBonusMl,
      conditionBonusMl,
      totalMl,
      totalLiters,
      totalFlOz,
      standard8OzCups,
      standardSportBottles,
      schedule,
    };
  }, [unit, weightLbs, weightKg, exerciseMinutes, activityIntensity, climate, specialCondition, bottleSizeMl]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Water Intake: ${calculation.totalLiters.toFixed(2)} L (${Math.round(calculation.totalFlOz)} fl oz / ${calculation.standard8OzCups.toFixed(1)} cups)`,
        { unit, weightLbs, weightKg, exerciseMinutes, activityIntensity, climate, specialCondition },
        {
          totalLiters: calculation.totalLiters,
          totalFlOz: calculation.totalFlOz,
          standard8OzCups: calculation.standard8OzCups,
          baseMl: calculation.baseMl,
          exerciseBonusMl: calculation.exerciseBonusMl,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Unit Selector & Setup */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-blue-500" />
          Unit System
        </span>
        <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => handleUnitChange('imperial')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              unit === 'imperial'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Imperial (lbs / fl oz)
          </button>
          <button
            type="button"
            onClick={() => handleUnitChange('metric')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              unit === 'metric'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Metric (kg / Liters)
          </button>
        </div>
      </div>

      {/* Main Parameters Grid */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          Body Metrics &amp; Lifestyle Factors
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {unit === 'imperial' ? (
            <CalcInput
              id="weightLbs"
              label="Body Weight (lbs)"
              value={weightLbs}
              onChange={setWeightLbs}
              min={60}
              max={500}
              step={1}
              suffix="lbs"
            />
          ) : (
            <CalcInput
              id="weightKg"
              label="Body Weight (kg)"
              value={weightKg}
              onChange={setWeightKg}
              min={30}
              max={250}
              step={0.5}
              suffix="kg"
            />
          )}

          <CalcInput
            id="exerciseMinutes"
            label="Daily Exercise / Sweating"
            value={exerciseMinutes}
            onChange={setExerciseMinutes}
            min={0}
            max={360}
            step={5}
            suffix="mins"
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Exercise Intensity
            </label>
            <select
              value={activityIntensity}
              onChange={(e) => setActivityIntensity(e.target.value as ActivityLevel)}
              className="w-full text-xs font-semibold p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value="sedentary">Sedentary (No strenuous workouts)</option>
              <option value="moderate">Moderate (Jogging, Gym, Swimming)</option>
              <option value="intense">Intense / HIIT (Heavy sweating)</option>
              <option value="endurance">Endurance / Long distance (&gt;90m)</option>
            </select>
          </div>
        </div>

        {/* Environmental & Life Stage Adjustments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Climate &amp; Environment
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value as ClimateType)}
              className="w-full text-xs font-semibold p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value="temperate">Temperate / Indoor Climate</option>
              <option value="hot">Hot &amp; Humid Weather (+500 ml)</option>
              <option value="dry_altitude">Arid / High Altitude (+400 ml)</option>
              <option value="cold_dry">Cold &amp; Dry Winter (+250 ml)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Pregnancy / Nursing State
            </label>
            <select
              value={specialCondition}
              onChange={(e) => setSpecialCondition(e.target.value as SpecialCondition)}
              className="w-full text-xs font-semibold p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value="none">Standard Adult</option>
              <option value="pregnant">Pregnant (+300 ml / 10 oz)</option>
              <option value="breastfeeding">Breastfeeding / Lactating (+800 ml / 27 oz)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Reusable Water Bottle Size
            </label>
            <select
              value={bottleSizeMl}
              onChange={(e) => setBottleSizeMl(Number(e.target.value))}
              className="w-full text-xs font-semibold p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
            >
              <option value={500}>500 ml (16.9 oz standard bottle)</option>
              <option value={750}>750 ml (25.4 oz sports bottle)</option>
              <option value={1000}>1,000 ml / 1 Liter (33.8 oz Nalgene)</option>
              <option value={1200}>1,200 ml / 40 oz (Hydroflask/Stanley)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hero Display Result */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Optimal Total Daily Fluid Intake
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mt-1">
              <span className="text-5xl sm:text-6xl font-black font-mono text-blue-600 dark:text-blue-400">
                {calculation.totalLiters.toFixed(2)}
              </span>
              <span className="text-2xl font-bold text-slate-500">Liters / day</span>
            </div>
            <div className="text-sm font-mono text-slate-500 mt-1">
              ≈ <strong>{Math.round(calculation.totalFlOz)} fl oz</strong> • <strong>{calculation.totalMl.toLocaleString()} ml</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/60">
              <GlassWater className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <div className="text-2xl font-black font-mono text-blue-900 dark:text-blue-200">
                ~{calculation.standard8OzCups.toFixed(1)}
              </div>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">8-oz Glasses</span>
            </div>

            <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/60">
              <Droplets className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
              <div className="text-2xl font-black font-mono text-indigo-900 dark:text-indigo-200">
                {calculation.standardSportBottles.toFixed(1)}
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">Refill Bottles ({bottleSizeMl}ml)</span>
            </div>
          </div>
        </div>

        {/* Breakdown Breakdown Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-sans block text-[10px]">Basal Metabolism</span>
            <strong className="text-slate-800 dark:text-slate-200">{Math.round(calculation.baseMl)} ml</strong>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-sans block text-[10px]">Exercise Sweat Loss</span>
            <strong className="text-blue-600 dark:text-blue-400">+{Math.round(calculation.exerciseBonusMl)} ml</strong>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-sans block text-[10px]">Climate Adjust</span>
            <strong className="text-amber-600 dark:text-amber-400">+{calculation.climateBonusMl} ml</strong>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-sans block text-[10px]">Lactation / Pregnancy</span>
            <strong className="text-rose-600 dark:text-rose-400">+{calculation.conditionBonusMl} ml</strong>
          </div>
        </div>
      </div>

      {/* Suggested Daily Hydration Schedule */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          Optimal Pacing &amp; Hydration Schedule
        </h3>

        <div className="space-y-3">
          {calculation.schedule.map((slot, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{slot.label}</span>
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-mono">
                    {slot.time}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{slot.tip}</div>
              </div>

              <div className="flex items-center gap-2 font-mono shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                  {slot.ml} ml (~{slot.cups} cups)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Note */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-700 dark:text-slate-300">Food Hydration Contribution:</strong> Approximately 20% of your daily hydration naturally comes from moisture-dense foods (fruits, vegetables, soups). This calculator represents total recommended fluid consumption to keep urine pale straw-yellow.
          </div>
        </div>
      </div>
    </div>
  );
};
