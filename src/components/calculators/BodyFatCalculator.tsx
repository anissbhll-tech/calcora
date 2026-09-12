import React, { useState, useMemo, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { UserCheck, Activity, Scale, Sparkles, Target, Heart, Info, CheckCircle2 } from 'lucide-react';
import { BaseCalculatorProps } from './index';

interface AceCategory {
  label: string;
  maleRange: string;
  femaleRange: string;
  minPct: number;
  maxPct: number;
  badgeClass: string;
  color: string;
}

const ACE_CATEGORIES_MALE: AceCategory[] = [
  { label: 'Essential Fat', maleRange: '2 – 5%', femaleRange: '10 – 13%', minPct: 2, maxPct: 5.99, badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300', color: '#f59e0b' },
  { label: 'Athletes', maleRange: '6 – 13%', femaleRange: '14 – 20%', minPct: 6, maxPct: 13.99, badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', color: '#10b981' },
  { label: 'Fitness', maleRange: '14 – 17%', femaleRange: '21 – 24%', minPct: 14, maxPct: 17.99, badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300', color: '#3b82f6' },
  { label: 'Average', maleRange: '18 – 24%', femaleRange: '25 – 31%', minPct: 18, maxPct: 24.99, badgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300', color: '#64748b' },
  { label: 'Obese', maleRange: '≥ 25%', femaleRange: '≥ 32%', minPct: 25, maxPct: 60, badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300', color: '#ef4444' },
];

const ACE_CATEGORIES_FEMALE: AceCategory[] = [
  { label: 'Essential Fat', maleRange: '2 – 5%', femaleRange: '10 – 13%', minPct: 10, maxPct: 13.99, badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300', color: '#f59e0b' },
  { label: 'Athletes', maleRange: '6 – 13%', femaleRange: '14 – 20%', minPct: 14, maxPct: 20.99, badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', color: '#10b981' },
  { label: 'Fitness', maleRange: '14 – 17%', femaleRange: '21 – 24%', minPct: 21, maxPct: 24.99, badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300', color: '#3b82f6' },
  { label: 'Average', maleRange: '18 – 24%', femaleRange: '25 – 31%', minPct: 25, maxPct: 31.99, badgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300', color: '#64748b' },
  { label: 'Obese', maleRange: '≥ 25%', femaleRange: '≥ 32%', minPct: 32, maxPct: 60, badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300', color: '#ef4444' },
];

export const BodyFatCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);

  // Imperial Inputs (inches & lbs)
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(175);
  const [waistIn, setWaistIn] = useState<number>(34);
  const [neckIn, setNeckIn] = useState<number>(15.5);
  const [hipIn, setHipIn] = useState<number>(38); // female

  // Metric Inputs (cm & kg)
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(79);
  const [waistCm, setWaistCm] = useState<number>(86.5);
  const [neckCm, setNeckCm] = useState<number>(39.5);
  const [hipCm, setHipCm] = useState<number>(96.5);

  const [targetFatPct, setTargetFatPct] = useState<number>(15);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.unitSystem) setUnitSystem(initialPreset.unitSystem);
      if (initialPreset.sex) setSex(initialPreset.sex);
      if (initialPreset.age !== undefined) setAge(initialPreset.age);
      if (initialPreset.heightFt !== undefined) setHeightFt(initialPreset.heightFt);
      if (initialPreset.heightIn !== undefined) setHeightIn(initialPreset.heightIn);
      if (initialPreset.weightLbs !== undefined) setWeightLbs(initialPreset.weightLbs);
      if (initialPreset.waistIn !== undefined) setWaistIn(initialPreset.waistIn);
      if (initialPreset.neckIn !== undefined) setNeckIn(initialPreset.neckIn);
      if (initialPreset.hipIn !== undefined) setHipIn(initialPreset.hipIn);
      if (initialPreset.targetFatPct !== undefined) setTargetFatPct(initialPreset.targetFatPct);
    }
  }, [initialPreset]);

  // Sync target fat % default when sex changes
  useEffect(() => {
    if (sex === 'male' && targetFatPct === 22) setTargetFatPct(15);
    if (sex === 'female' && targetFatPct === 15) setTargetFatPct(22);
  }, [sex]);

  const calculation = useMemo(() => {
    let hIn = 0;
    let wLbs = 0;
    let waist = 0;
    let neck = 0;
    let hip = 0;

    let hCm = 0;
    let wKg = 0;

    if (unitSystem === 'imperial') {
      const ft = safeParseNumber(heightFt, 5);
      const inches = safeParseNumber(heightIn, 10);
      hIn = ft * 12 + inches;
      hCm = hIn * 2.54;
      wLbs = safeParseNumber(weightLbs, 175);
      wKg = wLbs * 0.45359237;
      waist = safeParseNumber(waistIn, 34);
      neck = safeParseNumber(neckIn, 15.5);
      hip = safeParseNumber(hipIn, 38);
    } else {
      hCm = safeParseNumber(heightCm, 178);
      hIn = hCm / 2.54;
      wKg = safeParseNumber(weightKg, 79);
      wLbs = wKg * 2.20462;
      waist = safeParseNumber(waistCm, 86.5) / 2.54;
      neck = safeParseNumber(neckCm, 39.5) / 2.54;
      hip = safeParseNumber(hipCm, 96.5) / 2.54;
    }

    // 1. US Navy Circumference Method (Hodgdon & Beckett)
    let navyBfPct = 0;
    if (sex === 'male') {
      const diff = waist - neck;
      if (diff > 0 && hIn > 0) {
        navyBfPct = 86.010 * Math.log10(diff) - 70.041 * Math.log10(hIn) + 36.76;
      }
    } else {
      const sumDiff = waist + hip - neck;
      if (sumDiff > 0 && hIn > 0) {
        navyBfPct = 163.205 * Math.log10(sumDiff) - 97.684 * Math.log10(hIn) - 78.387;
      }
    }
    navyBfPct = Math.max(2, Math.min(60, navyBfPct));

    // 2. BMI & Deurenberg Equation
    // BMI = kg / m²
    const heightM = hCm / 100;
    const bmi = heightM > 0 ? wKg / (heightM * heightM) : 0;
    const sexValue = sex === 'male' ? 1 : 0;
    const deurenbergBfPct = Math.max(
      2,
      Math.min(60, 1.20 * bmi + 0.23 * safeParseNumber(age, 30) - 10.8 * sexValue - 5.4)
    );

    // 3. YMCA Method (Waist & Weight)
    let ymcaBfPct = 0;
    if (sex === 'male') {
      ymcaBfPct = ((-98.42 + 4.15 * waist - 0.082 * wLbs) / wLbs) * 100;
    } else {
      ymcaBfPct = ((-76.76 + 4.15 * waist - 0.082 * wLbs) / wLbs) * 100;
    }
    ymcaBfPct = Math.max(2, Math.min(60, ymcaBfPct));

    // Masses
    const fatMassLbs = (wLbs * navyBfPct) / 100;
    const leanMassLbs = wLbs - fatMassLbs;
    const fatMassKg = (wKg * navyBfPct) / 100;
    const leanMassKg = wKg - fatMassKg;

    // Target Body Fat Goal Projection:
    // Target Weight = Lean Mass / (1 - Target BF%)
    const targetBfFrac = Math.max(0.04, Math.min(0.5, safeParseNumber(targetFatPct, 15) / 100));
    const targetWeightLbs = leanMassLbs / (1 - targetBfFrac);
    const fatToLoseLbs = Math.max(0, wLbs - targetWeightLbs);
    const targetWeightKg = leanMassKg / (1 - targetBfFrac);
    const fatToLoseKg = Math.max(0, wKg - targetWeightKg);

    // ACE Category Lookup
    const categoryTable = sex === 'male' ? ACE_CATEGORIES_MALE : ACE_CATEGORIES_FEMALE;
    const matchedCategory =
      categoryTable.find((c) => navyBfPct >= c.minPct && navyBfPct <= c.maxPct) ||
      categoryTable[categoryTable.length - 1];

    // Gauge positioning (scale from 3% to 45%)
    const clampedBf = Math.max(3, Math.min(45, navyBfPct));
    const gaugePercentage = ((clampedBf - 3) / (45 - 3)) * 100;

    // Chart Data
    const chartData = [
      { name: 'Lean Body Mass', value: Math.round(leanMassLbs), color: '#3b82f6' },
      { name: 'Adipose Fat Mass', value: Math.round(fatMassLbs), color: '#f59e0b' },
    ];

    return {
      navyBfPct,
      deurenbergBfPct,
      ymcaBfPct,
      bmi,
      fatMassLbs,
      leanMassLbs,
      fatMassKg,
      leanMassKg,
      targetWeightLbs,
      fatToLoseLbs,
      targetWeightKg,
      fatToLoseKg,
      matchedCategory,
      categoryTable,
      gaugePercentage,
      chartData,
      wLbs,
      wKg,
    };
  }, [unitSystem, sex, age, heightFt, heightIn, weightLbs, waistIn, neckIn, hipIn, heightCm, weightKg, waistCm, neckCm, hipCm, targetFatPct]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Body Fat: ${calculation.navyBfPct.toFixed(1)}% (${calculation.matchedCategory.label}) | Lean Mass: ${
          unitSystem === 'imperial' ? `${calculation.leanMassLbs.toFixed(1)} lbs` : `${calculation.leanMassKg.toFixed(1)} kg`
        }`,
        { unitSystem, sex, age, heightFt, heightIn, weightLbs, waistIn, neckIn, hipIn, targetFatPct },
        {
          bodyFatPct: calculation.navyBfPct,
          fatMassLbs: calculation.fatMassLbs,
          leanMassLbs: calculation.leanMassLbs,
          category: calculation.matchedCategory.label,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Unit & Biological Sex Selector */}
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
            Imperial (in / lbs)
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
              min={12}
              max={100}
              step={1}
              suffix="yrs"
            />
          </div>
        </div>
      </div>

      {/* Circumference Measurements Grid */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Scale className="w-4 h-4 text-blue-500" />
          U.S. Navy Circumference Measurements
        </h3>

        {unitSystem === 'imperial' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <CalcInput
              id="heightFt"
              label="Height (Ft)"
              value={heightFt}
              onChange={(val) => setHeightFt(val)}
              min={2}
              max={8}
              step={1}
              suffix="ft"
            />
            <CalcInput
              id="heightIn"
              label="Height (In)"
              value={heightIn}
              onChange={(val) => setHeightIn(val)}
              min={0}
              max={11}
              step={1}
              suffix="in"
            />
            <CalcInput
              id="weightLbs"
              label="Body Weight"
              value={weightLbs}
              onChange={(val) => setWeightLbs(val)}
              min={50}
              max={600}
              step={1}
              suffix="lbs"
            />
            <CalcInput
              id="waistIn"
              label="Waist (at Navel)"
              value={waistIn}
              onChange={(val) => setWaistIn(val)}
              min={20}
              max={80}
              step={0.25}
              suffix="in"
            />
            <CalcInput
              id="neckIn"
              label="Neck (below Larynx)"
              value={neckIn}
              onChange={(val) => setNeckIn(val)}
              min={10}
              max={30}
              step={0.25}
              suffix="in"
            />
            {sex === 'female' && (
              <div className="sm:col-span-3 lg:col-span-5">
                <CalcInput
                  id="hipIn"
                  label="Hips (Widest Point)"
                  value={hipIn}
                  onChange={(val) => setHipIn(val)}
                  min={20}
                  max={80}
                  step={0.25}
                  suffix="in"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcInput
              id="heightCm"
              label="Height"
              value={heightCm}
              onChange={(val) => setHeightCm(val)}
              min={60}
              max={250}
              step={1}
              suffix="cm"
            />
            <CalcInput
              id="weightKg"
              label="Body Weight"
              value={weightKg}
              onChange={(val) => setWeightKg(val)}
              min={25}
              max={300}
              step={0.5}
              suffix="kg"
            />
            <CalcInput
              id="waistCm"
              label="Waist (at Navel)"
              value={waistCm}
              onChange={(val) => setWaistCm(val)}
              min={50}
              max={200}
              step={0.5}
              suffix="cm"
            />
            <CalcInput
              id="neckCm"
              label="Neck (below Larynx)"
              value={neckCm}
              onChange={(val) => setNeckCm(val)}
              min={25}
              max={75}
              step={0.5}
              suffix="cm"
            />
            {sex === 'female' && (
              <div className="sm:col-span-2 lg:col-span-4">
                <CalcInput
                  id="hipCm"
                  label="Hips (Widest Point)"
                  value={hipCm}
                  onChange={(val) => setHipCm(val)}
                  min={50}
                  max={200}
                  step={0.5}
                  suffix="cm"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Primary Result Banner & Gauge */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Estimated Body Fat Percentage (U.S. Navy)
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white">
                {calculation.navyBfPct.toFixed(1)}%
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${calculation.matchedCategory.badgeClass}`}>
                {calculation.matchedCategory.label}
              </span>
            </div>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="text-slate-500">
              Lean Body Mass:{' '}
              <strong className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                {unitSystem === 'imperial'
                  ? `${calculation.leanMassLbs.toFixed(1)} lbs`
                  : `${calculation.leanMassKg.toFixed(1)} kg`}
              </strong>
            </div>
            <div className="text-slate-500">
              Adipose Fat Mass:{' '}
              <strong className="text-amber-600 dark:text-amber-400 font-mono font-bold">
                {unitSystem === 'imperial'
                  ? `${calculation.fatMassLbs.toFixed(1)} lbs`
                  : `${calculation.fatMassKg.toFixed(1)} kg`}
              </strong>
            </div>
          </div>
        </div>

        {/* Needle Gauge for ACE Categories */}
        <div className="space-y-2">
          <div className="relative pt-6 pb-2">
            <div
              className="absolute top-0 -ml-3 transition-all duration-300 flex flex-col items-center z-10"
              style={{ left: `${calculation.gaugePercentage}%` }}
            >
              <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                {calculation.navyBfPct.toFixed(1)}%
              </div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-900 dark:border-t-white" />
            </div>

            <div className="h-4 w-full rounded-full flex overflow-hidden shadow-inner">
              <div className="bg-amber-400 flex-[3]" title="Essential Fat" />
              <div className="bg-emerald-500 flex-[8]" title="Athletes" />
              <div className="bg-blue-500 flex-[4]" title="Fitness" />
              <div className="bg-slate-400 flex-[7]" title="Average" />
              <div className="bg-rose-500 flex-[10]" title="Obese" />
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
            <span>Essential</span>
            <span>Athletes</span>
            <span>Fitness</span>
            <span>Average</span>
            <span>Obese (25%+)</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="U.S. Navy Body Fat"
          value={`${calculation.navyBfPct.toFixed(1)}%`}
          subtitle="Circumference regression standard"
          highlighted={true}
          icon={<UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="BMI Deurenberg Formula"
          value={`${calculation.deurenbergBfPct.toFixed(1)}%`}
          subtitle="Age, sex, and BMI correlation"
          icon={<Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="YMCA Waist Formula"
          value={`${calculation.ymcaBfPct.toFixed(1)}%`}
          subtitle="Waist-to-weight regression"
          icon={<Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Body Composition Ratio"
          value={`${((calculation.leanMassLbs / calculation.wLbs) * 100).toFixed(0)}% LBM`}
          subtitle={`${((calculation.fatMassLbs / calculation.wLbs) * 100).toFixed(0)}% Fat Mass`}
          icon={<Scale className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />
      </div>

      {/* Goal Body Fat Loss Calculator */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" />
              Target Body Fat Goal Planner
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Calculate the exact fat loss required to achieve your target body fat percentage while preserving 100% of lean mass.
            </p>
          </div>

          <div className="w-40">
            <CalcInput
              id="targetFatPct"
              label="Goal Body Fat %"
              value={targetFatPct}
              onChange={(val) => setTargetFatPct(val)}
              min={4}
              max={40}
              step={0.5}
              suffix="%"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
            <span className="text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
              Current Lean Body Mass
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {unitSystem === 'imperial'
                ? `${calculation.leanMassLbs.toFixed(1)} lbs`
                : `${calculation.leanMassKg.toFixed(1)} kg`}
            </div>
            <div className="text-[11px] font-sans text-slate-500">
              Muscle, bone, organs &amp; total water
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <span className="text-xs font-sans font-bold text-emerald-700 dark:text-emerald-400">
              Goal Weight at {targetFatPct}% BF
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {unitSystem === 'imperial'
                ? `${calculation.targetWeightLbs.toFixed(1)} lbs`
                : `${calculation.targetWeightKg.toFixed(1)} kg`}
            </div>
            <div className="text-[11px] font-sans text-slate-500">
              Weight with zero lean mass loss
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <span className="text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
              Pure Fat to Lose
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {unitSystem === 'imperial'
                ? `${calculation.fatToLoseLbs.toFixed(1)} lbs`
                : `${calculation.fatToLoseKg.toFixed(1)} kg`}
            </div>
            <div className="text-[11px] font-sans text-slate-500">
              Adipose fat deficit requirement
            </div>
          </div>
        </div>
      </div>

      {/* American Council on Exercise (ACE) Classification Reference Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          American Council on Exercise (ACE) Body Fat Norms
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3">Men (% Range)</th>
                <th className="py-2.5 px-3">Women (% Range)</th>
                <th className="py-2.5 px-3 text-right">Your Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {calculation.categoryTable.map((cat) => {
                const isCurrent = calculation.matchedCategory.label === cat.label;
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
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.label}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{cat.maleRange}</td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{cat.femaleRange}</td>
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
