import React, { useState } from 'react';

export const WaterIntakeCalculator: React.FC = () => {
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [exerciseMins, setExerciseMins] = useState<number>(45);
  const [climate, setClimate] = useState<string>('moderate');

  const baseOunces = weightLbs * 0.5;
  const exerciseOunces = (exerciseMins / 30) * 12;
  const climateBonus = climate === 'hot' ? 16 : climate === 'cold' ? 0 : 8;

  const totalFlOz = baseOunces + exerciseOunces + climateBonus;
  const totalLiters = totalFlOz * 0.0295735;
  const cupsCount = totalFlOz / 8;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weight (lbs)</label>
          <input
            type="number"
            value={weightLbs}
            onChange={(e) => setWeightLbs(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Daily Exercise (minutes)</label>
          <input
            type="number"
            value={exerciseMins}
            onChange={(e) => setExerciseMins(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Weather Climate</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
            className="w-full text-xs font-semibold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          >
            <option value="cool">Cool / Air-conditioned</option>
            <option value="moderate">Moderate Normal Temperature</option>
            <option value="hot">Hot / Humid Weather</option>
          </select>
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Recommended Hydration</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
            {totalLiters.toFixed(2)} Liters
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">({Math.round(totalFlOz)} fl oz / ~{Math.round(cupsCount)} standard cups)</p>
        </div>
      </div>
    </div>
  );
};
