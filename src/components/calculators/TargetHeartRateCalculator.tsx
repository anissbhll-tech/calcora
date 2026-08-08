import React, { useState } from 'react';

export const TargetHeartRateCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [restingHr, setRestingHr] = useState<number>(65);

  const maxHr = 220 - age;
  const hrReserve = maxHr - restingHr;

  const getZoneRange = (minPct: number, maxPct: number) => {
    const minBpm = Math.round(hrReserve * minPct + restingHr);
    const maxBpm = Math.round(hrReserve * maxPct + restingHr);
    return `${minBpm} – ${maxBpm} BPM`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Resting Heart Rate (BPM)</label>
          <input
            type="number"
            value={restingHr}
            onChange={(e) => setRestingHr(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Max Heart Rate</span>
          <div className="text-4xl font-extrabold text-rose-500 font-mono">{maxHr} BPM</div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Fat Burn Zone (50% - 60%):</span>
            <span className="font-mono font-bold text-amber-500">{getZoneRange(0.5, 0.6)}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Aerobic Fitness (60% - 70%):</span>
            <span className="font-mono font-bold text-emerald-500">{getZoneRange(0.6, 0.7)}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Anaerobic Performance (70% - 85%):</span>
            <span className="font-mono font-bold text-blue-600">{getZoneRange(0.7, 0.85)}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Redline Max Effort (85% - 100%):</span>
            <span className="font-mono font-bold text-rose-600">{getZoneRange(0.85, 1.0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
