import React, { useState } from 'react';

export const StatisticsCalculator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('12, 15, 18, 22, 22, 25, 29, 31, 35, 40');

  const numbers = inputText
    .split(/[\s,]+/)
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n));

  const count = numbers.length;
  let mean = 0;
  let median = 0;
  let mode: number[] = [];
  let min = 0;
  let max = 0;
  let range = 0;
  let sum = 0;
  let varianceSample = 0;
  let stdDevSample = 0;

  if (count > 0) {
    const sorted = [...numbers].sort((a, b) => a - b);
    sum = sorted.reduce((a, b) => a + b, 0);
    mean = sum / count;
    min = sorted[0];
    max = sorted[sorted.length - 1];
    range = max - min;

    // Median
    if (count % 2 === 0) {
      median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
    } else {
      median = sorted[Math.floor(count / 2)];
    }

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    sorted.forEach((n) => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    if (maxFreq > 1) {
      mode = Object.keys(freq)
        .filter((k) => freq[parseFloat(k)] === maxFreq)
        .map((k) => parseFloat(k));
    }

    // Variance & StdDev
    if (count > 1) {
      const sumSqDiff = sorted.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0);
      varianceSample = sumSqDiff / (count - 1);
      stdDevSample = Math.sqrt(varianceSample);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Input Dataset (separate with commas or spaces)
        </label>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-3 font-mono text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
        />
        <span className="text-[11px] text-slate-400">Total Numbers Parsed: {count}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 block text-[10px]">Mean (Average)</span>
          <span className="font-mono font-bold text-blue-600 text-sm">{mean.toFixed(2)}</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 block text-[10px]">Median</span>
          <span className="font-mono font-bold text-emerald-600 text-sm">{median.toFixed(2)}</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 block text-[10px]">Mode</span>
          <span className="font-mono font-bold text-purple-600 text-sm">{mode.length > 0 ? mode.join(', ') : 'None'}</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 block text-[10px]">Std Deviation (s)</span>
          <span className="font-mono font-bold text-amber-500 text-sm">{stdDevSample.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block">Min / Max</span>
          <span className="font-mono font-bold">{min} / {max}</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block">Range</span>
          <span className="font-mono font-bold">{range}</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block">Sum</span>
          <span className="font-mono font-bold">{sum}</span>
        </div>
      </div>
    </div>
  );
};
