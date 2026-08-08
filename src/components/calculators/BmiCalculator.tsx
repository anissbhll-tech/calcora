import React, { useState, useEffect } from 'react';
import { CalculationHistoryItem } from '../../types';

interface BmiCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  presetValues?: Record<string, any>;
}

export const BmiCalculator: React.FC<BmiCalculatorProps> = ({
  onAddHistory,
  presetValues,
}) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  // Imperial State
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(170);

  // Metric State
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(75);

  const [age, setAge] = useState<number>(30);
  const [sex, setSex] = useState<'male' | 'female'>('male');

  useEffect(() => {
    if (presetValues) {
      if (presetValues.unitSystem) setUnitSystem(presetValues.unitSystem);
      if (presetValues.heightFt !== undefined) setHeightFt(presetValues.heightFt);
      if (presetValues.heightIn !== undefined) setHeightIn(presetValues.heightIn);
      if (presetValues.weightLbs !== undefined) setWeightLbs(presetValues.weightLbs);
      if (presetValues.heightCm !== undefined) setHeightCm(presetValues.heightCm);
      if (presetValues.weightKg !== undefined) setWeightKg(presetValues.weightKg);
      if (presetValues.age !== undefined) setAge(presetValues.age);
      if (presetValues.sex) setSex(presetValues.sex);
    }
  }, [presetValues]);

  // Calculate BMI
  let bmi = 0;
  let healthyWeightMin = 0;
  let healthyWeightMax = 0;

  if (unitSystem === 'imperial') {
    const totalInches = heightFt * 12 + heightIn;
    if (totalInches > 0 && weightLbs > 0) {
      bmi = (weightLbs / (totalInches * totalInches)) * 703;
      healthyWeightMin = (18.5 * (totalInches * totalInches)) / 703;
      healthyWeightMax = (24.9 * (totalInches * totalInches)) / 703;
    }
  } else {
    const heightM = heightCm / 100;
    if (heightM > 0 && weightKg > 0) {
      bmi = weightKg / (heightM * heightM);
      healthyWeightMin = 18.5 * (heightM * heightM);
      healthyWeightMax = 24.9 * (heightM * heightM);
    }
  }

  const getBmiCategory = (score: number) => {
    if (score < 18.5) return { label: 'Underweight', color: 'text-amber-500', bg: 'bg-amber-500', range: '< 18.5' };
    if (score <= 24.9) return { label: 'Normal Weight', color: 'text-emerald-500', bg: 'bg-emerald-500', range: '18.5 – 24.9' };
    if (score <= 29.9) return { label: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-500', range: '25.0 – 29.9' };
    return { label: 'Obesity', color: 'text-rose-500', bg: 'bg-rose-500', range: '30.0+' };
  };

  const category = getBmiCategory(bmi);

  // Position indicator percentage for meter
  const getMeterPosition = (score: number) => {
    if (score <= 15) return 0;
    if (score >= 40) return 100;
    return ((score - 15) / 25) * 100;
  };

  useEffect(() => {
    if (bmi > 0) {
      const timer = setTimeout(() => {
        onAddHistory({
          calculatorId: 'bmi',
          calculatorTitle: 'BMI (Body Mass Index)',
          summaryText: `BMI ${bmi.toFixed(1)} (${category.label})`,
          inputs: { unitSystem, age, sex },
          results: { bmi, category: category.label },
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [bmi]);

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
        <div className="lg:col-span-6 space-y-5">
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
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Height</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <span className="text-xs text-slate-400 font-bold">ft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <span className="text-xs text-slate-400 font-bold">in</span>
                  </div>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Right Output Gauge */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Body Mass Index</span>
            <div className="text-5xl font-extrabold text-slate-900 dark:text-white mt-1 font-mono">
              {bmi.toFixed(1)}
            </div>
            <div className={`mt-2 inline-block px-4 py-1.5 rounded-full text-xs font-extrabold text-white ${category.bg}`}>
              {category.label}
            </div>

            {/* Visual Color Spectrum Gauge */}
            <div className="mt-8 space-y-2">
              <div className="relative h-4 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                <div className="w-[14%] bg-amber-400 h-full"></div>
                <div className="w-[25%] bg-emerald-500 h-full"></div>
                <div className="w-[20%] bg-orange-400 h-full"></div>
                <div className="w-[41%] bg-rose-500 h-full"></div>

                {/* Pointer Arrow */}
                <div
                  className="absolute top-0 bottom-0 w-1.5 bg-slate-900 dark:bg-white rounded-full shadow-lg transition-all duration-300 -translate-x-1/2"
                  style={{ left: `${getMeterPosition(bmi)}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                <span>Underweight (&lt;18.5)</span>
                <span>Normal (18.5-24.9)</span>
                <span>Overweight (25-29.9)</span>
                <span>Obese (&gt;30)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs space-y-2">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Healthy Weight Range:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                {unitSystem === 'imperial'
                  ? `${Math.round(healthyWeightMin)} lbs – ${Math.round(healthyWeightMax)} lbs`
                  : `${healthyWeightMin.toFixed(1)} kg – ${healthyWeightMax.toFixed(1)} kg`}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
