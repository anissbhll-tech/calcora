import React, { useState } from 'react';

export const BodyFatCalculator: React.FC = () => {
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [waistIn, setWaistIn] = useState<number>(34);
  const [neckIn, setNeckIn] = useState<number>(15.5);
  const [hipIn, setHipIn] = useState<number>(38); // female
  const [heightIn, setHeightIn] = useState<number>(70);
  const [weightLbs, setWeightLbs] = useState<number>(175);

  let bodyFatPct = 0;
  if (sex === 'male') {
    if (waistIn > neckIn && heightIn > 0) {
      bodyFatPct = 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    }
  } else {
    if (waistIn + hipIn > neckIn && heightIn > 0) {
      bodyFatPct = 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
    }
  }

  bodyFatPct = Math.max(2, Math.min(60, bodyFatPct));
  const fatMassLbs = (weightLbs * bodyFatPct) / 100;
  const leanMassLbs = weightLbs - fatMassLbs;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Height (inches)</label>
            <input
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Waist Circumference (in)</label>
            <input
              type="number"
              step={0.5}
              value={waistIn}
              onChange={(e) => setWaistIn(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Neck Circumference (in)</label>
            <input
              type="number"
              step={0.5}
              value={neckIn}
              onChange={(e) => setNeckIn(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        {sex === 'female' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Hip Circumference (in)</label>
            <input
              type="number"
              step={0.5}
              value={hipIn}
              onChange={(e) => setHipIn(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        )}

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

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Body Fat Percentage</span>
          <div className="text-5xl font-extrabold text-rose-500 mt-1 font-mono">
            {bodyFatPct.toFixed(1)}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Lean Mass:</span>
            <span className="font-mono font-bold text-emerald-600 text-sm">{Math.round(leanMassLbs)} lbs</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Fat Mass:</span>
            <span className="font-mono font-bold text-rose-500 text-sm">{Math.round(fatMassLbs)} lbs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
