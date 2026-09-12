import React, { useState, useMemo, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Activity, Heart, Info, Scale, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BaseCalculatorProps } from './index';

interface BmiCategoryInfo {
  label: string;
  sublabel: string;
  minBmi: number;
  maxBmi: number;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
}

const BMI_CATEGORIES: BmiCategoryInfo[] = [
  { label: 'Severe Thinness', sublabel: '< 16.0', minBmi: 0, maxBmi: 15.99, colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500', borderClass: 'border-rose-300 dark:border-rose-800', badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' },
  { label: 'Moderate Thinness', sublabel: '16.0 – 16.9', minBmi: 16.0, maxBmi: 16.99, colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500', borderClass: 'border-amber-300 dark:border-amber-800', badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  { label: 'Mild Thinness', sublabel: '17.0 – 18.4', minBmi: 17.0, maxBmi: 18.49, colorClass: 'text-yellow-600 dark:text-yellow-400', bgClass: 'bg-yellow-500', borderClass: 'border-yellow-300 dark:border-yellow-800', badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' },
  { label: 'Normal Healthy Weight', sublabel: '18.5 – 24.9', minBmi: 18.5, maxBmi: 24.99, colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-300 dark:border-emerald-800', badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
  { label: 'Overweight (Pre-obese)', sublabel: '25.0 – 29.9', minBmi: 25.0, maxBmi: 29.99, colorClass: 'text-orange-600 dark:text-orange-400', bgClass: 'bg-orange-500', borderClass: 'border-orange-300 dark:border-orange-800', badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' },
  { label: 'Obese Class I', sublabel: '30.0 – 34.9', minBmi: 30.0, maxBmi: 34.99, colorClass: 'text-rose-500 dark:text-rose-400', bgClass: 'bg-rose-500', borderClass: 'border-rose-300 dark:border-rose-800', badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' },
  { label: 'Obese Class II', sublabel: '35.0 – 39.9', minBmi: 35.0, maxBmi: 39.99, colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-600', borderClass: 'border-rose-400 dark:border-rose-800', badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' },
  { label: 'Obese Class III', sublabel: '≥ 40.0', minBmi: 40.0, maxBmi: 100, colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-purple-600', borderClass: 'border-purple-300 dark:border-purple-800', badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
];

export const BmiCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);

  // Imperial
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(165);

  // Metric
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(75);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.unitSystem) setUnitSystem(initialPreset.unitSystem);
      if (initialPreset.heightFt !== undefined) setHeightFt(initialPreset.heightFt);
      if (initialPreset.heightIn !== undefined) setHeightIn(initialPreset.heightIn);
      if (initialPreset.weightLbs !== undefined) setWeightLbs(initialPreset.weightLbs);
      if (initialPreset.heightCm !== undefined) setHeightCm(initialPreset.heightCm);
      if (initialPreset.weightKg !== undefined) setWeightKg(initialPreset.weightKg);
      if (initialPreset.age !== undefined) setAge(initialPreset.age);
      if (initialPreset.sex) setSex(initialPreset.sex);
    }
  }, [initialPreset]);

  const calculation = useMemo(() => {
    let weightInKg = 0;
    let heightInMeters = 0;
    let heightTotalInches = 0;

    if (unitSystem === 'imperial') {
      const ft = safeParseNumber(heightFt, 5);
      const inches = safeParseNumber(heightIn, 10);
      heightTotalInches = ft * 12 + inches;
      heightInMeters = heightTotalInches * 0.0254;
      const lbs = safeParseNumber(weightLbs, 165);
      weightInKg = lbs * 0.45359237;
    } else {
      const cm = safeParseNumber(heightCm, 178);
      heightInMeters = cm / 100;
      heightTotalInches = heightInMeters / 0.0254;
      weightInKg = safeParseNumber(weightKg, 75);
    }

    if (heightInMeters <= 0 || weightInKg <= 0) {
      return {
        standardBmi: 0,
        newOxfordBmi: 0,
        bmiPrime: 0,
        ponderalIndex: 0,
        category: BMI_CATEGORIES[3],
        minHealthyWeightKg: 0,
        maxHealthyWeightKg: 0,
        minHealthyWeightLbs: 0,
        maxHealthyWeightLbs: 0,
        weightDeltaToNormalLbs: 0,
        weightDeltaToNormalKg: 0,
        gaugePercentage: 0,
      };
    }

    // 1. Standard WHO Quetelet Formula: weight (kg) / height (m)^2
    const standardBmi = weightInKg / (heightInMeters * heightInMeters);

    // 2. New Oxford / Nick Trefethen Formula: 1.3 * weight (kg) / height (m)^2.5
    const newOxfordBmi = (1.3 * weightInKg) / Math.pow(heightInMeters, 2.5);

    // 3. BMI Prime: ratio of actual BMI to upper normal boundary (25.0)
    const bmiPrime = standardBmi / 25.0;

    // 4. Ponderal Index (Corpulence index): weight (kg) / height (m)^3
    const ponderalIndex = weightInKg / Math.pow(heightInMeters, 3);

    // Healthy weight range (BMI 18.5 to 24.9)
    const minHealthyWeightKg = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeightKg = 24.9 * (heightInMeters * heightInMeters);
    const minHealthyWeightLbs = minHealthyWeightKg * 2.20462;
    const maxHealthyWeightLbs = maxHealthyWeightKg * 2.20462;

    // Weight delta to enter normal range
    let weightDeltaToNormalKg = 0;
    let weightDeltaToNormalLbs = 0;
    if (standardBmi < 18.5) {
      weightDeltaToNormalKg = minHealthyWeightKg - weightInKg;
      weightDeltaToNormalLbs = minHealthyWeightLbs - (unitSystem === 'imperial' ? weightLbs : weightInKg * 2.20462);
    } else if (standardBmi > 24.9) {
      weightDeltaToNormalKg = weightInKg - maxHealthyWeightKg;
      weightDeltaToNormalLbs = (unitSystem === 'imperial' ? weightLbs : weightInKg * 2.20462) - maxHealthyWeightLbs;
    }

    // Active Category lookup
    const matchedCategory =
      BMI_CATEGORIES.find((c) => standardBmi >= c.minBmi && standardBmi <= c.maxBmi) ||
      (standardBmi >= 40 ? BMI_CATEGORIES[7] : BMI_CATEGORIES[0]);

    // Gauge positioning (scale from 12 to 42)
    const clampedBmi = Math.max(12, Math.min(42, standardBmi));
    const gaugePercentage = ((clampedBmi - 12) / (42 - 12)) * 100;

    return {
      standardBmi,
      newOxfordBmi,
      bmiPrime,
      ponderalIndex,
      category: matchedCategory,
      minHealthyWeightKg,
      maxHealthyWeightKg,
      minHealthyWeightLbs,
      maxHealthyWeightLbs,
      weightDeltaToNormalLbs,
      weightDeltaToNormalKg,
      gaugePercentage,
    };
  }, [unitSystem, heightFt, heightIn, weightLbs, heightCm, weightKg]);

  const handleSave = () => {
    if (onSaveHistory && calculation.standardBmi > 0) {
      onSaveHistory(
        `BMI: ${calculation.standardBmi.toFixed(1)} (${calculation.category.label})`,
        { unitSystem, heightFt, heightIn, weightLbs, heightCm, weightKg, age, sex },
        {
          bmi: calculation.standardBmi,
          category: calculation.category.label,
          newOxfordBmi: calculation.newOxfordBmi,
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
              min={2}
              max={120}
              step={1}
              suffix="yrs"
            />
          </div>
        </div>
      </div>

      {/* Body Dimension Inputs */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
          <Scale className="w-4 h-4 text-blue-500" />
          Body Measurements
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
      </div>

      {/* Primary Result Banner & Needle Meter */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Your Body Mass Index (BMI)
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white">
                {calculation.standardBmi.toFixed(1)}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${calculation.category.badgeClass}`}>
                {calculation.category.label}
              </span>
            </div>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="text-slate-500">
              WHO Healthy BMI Target: <strong className="text-slate-900 dark:text-white font-mono">18.5 – 24.9</strong>
            </div>
            <div className="text-slate-500">
              Ideal Weight Range:{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                {unitSystem === 'imperial'
                  ? `${calculation.minHealthyWeightLbs.toFixed(0)} – ${calculation.maxHealthyWeightLbs.toFixed(0)} lbs`
                  : `${calculation.minHealthyWeightKg.toFixed(1)} – ${calculation.maxHealthyWeightKg.toFixed(1)} kg`}
              </strong>
            </div>
          </div>
        </div>

        {/* Visual Needle Spectrum Gauge */}
        <div className="space-y-2">
          <div className="relative pt-6 pb-2">
            {/* Pointer Marker */}
            <div
              className="absolute top-0 -ml-3 transition-all duration-300 flex flex-col items-center z-10"
              style={{ left: `${calculation.gaugePercentage}%` }}
            >
              <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                {calculation.standardBmi.toFixed(1)}
              </div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-900 dark:border-t-white" />
            </div>

            {/* Continuous Color Bar */}
            <div className="h-4 w-full rounded-full flex overflow-hidden shadow-inner">
              <div className="bg-blue-400 flex-[6.5]" title="Underweight (< 18.5)" />
              <div className="bg-emerald-500 flex-[6.4]" title="Normal (18.5 - 24.9)" />
              <div className="bg-amber-400 flex-[5.0]" title="Overweight (25.0 - 29.9)" />
              <div className="bg-rose-500 flex-[5.0]" title="Obese Class I (30.0 - 34.9)" />
              <div className="bg-rose-700 flex-[7.1]" title="Obese Class II/III (35.0+)" />
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
            <span>12 (Under)</span>
            <span>18.5 (Normal)</span>
            <span>25.0 (Over)</span>
            <span>30.0 (Obese I)</span>
            <span>35.0 (Obese II)</span>
            <span>42+</span>
          </div>
        </div>

        {/* Target Delta Notification */}
        {calculation.weightDeltaToNormalKg > 0.1 && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              To reach a normal WHO weight category (BMI 24.9), you would need to{' '}
              {calculation.standardBmi > 24.9 ? 'lose' : 'gain'}{' '}
              <strong className="font-mono font-bold text-slate-900 dark:text-white">
                {unitSystem === 'imperial'
                  ? `${calculation.weightDeltaToNormalLbs.toFixed(1)} lbs`
                  : `${calculation.weightDeltaToNormalKg.toFixed(1)} kg`}
              </strong>
              .
            </span>
          </div>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="WHO Standard BMI"
          value={calculation.standardBmi.toFixed(1)}
          subtitle="Quetelet formula: kg / m²"
          highlighted={true}
          icon={<Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="New Oxford BMI"
          value={calculation.newOxfordBmi.toFixed(1)}
          subtitle="Trefethen formula: 1.3 × kg / m²·⁵"
          icon={<Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="BMI Prime Index"
          value={calculation.bmiPrime.toFixed(2)}
          subtitle="Ratio to upper normal limit (< 1.0 is healthy)"
          icon={<Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Ponderal Index"
          value={`${calculation.ponderalIndex.toFixed(1)} kg/m³`}
          subtitle="Volumetric corpulence index (norm: 11-15)"
          icon={<Scale className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />
      </div>

      {/* WHO Detailed Classification Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          World Health Organization (WHO) Adult BMI Classifications
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3">BMI Range (kg/m²)</th>
                <th className="py-2.5 px-3">Equivalent Weight for Your Height</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {BMI_CATEGORIES.map((cat) => {
                const isCurrent = calculation.category.label === cat.label;
                const minWeight =
                  cat.minBmi === 0
                    ? 0
                    : unitSystem === 'imperial'
                    ? ((cat.minBmi * ((heightFt * 12 + heightIn) ** 2)) / 703)
                    : cat.minBmi * ((heightCm / 100) ** 2);
                const maxWeight =
                  cat.maxBmi >= 100
                    ? null
                    : unitSystem === 'imperial'
                    ? ((cat.maxBmi * ((heightFt * 12 + heightIn) ** 2)) / 703)
                    : cat.maxBmi * ((heightCm / 100) ** 2);

                const weightText =
                  cat.minBmi === 0
                    ? `< ${maxWeight?.toFixed(0)} ${unitSystem === 'imperial' ? 'lbs' : 'kg'}`
                    : maxWeight === null
                    ? `> ${minWeight.toFixed(0)} ${unitSystem === 'imperial' ? 'lbs' : 'kg'}`
                    : `${minWeight.toFixed(0)} – ${maxWeight.toFixed(0)} ${unitSystem === 'imperial' ? 'lbs' : 'kg'}`;

                return (
                  <tr
                    key={cat.label}
                    className={`transition ${
                      isCurrent
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.bgClass}`} />
                      {cat.label}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{cat.sublabel}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{weightText}</td>
                    <td className="py-2.5 px-3 text-right font-sans">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Your Result
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
