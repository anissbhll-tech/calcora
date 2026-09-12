import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CalcResultCard } from '../common/CalcResultCard';
import { formatNumber } from '../../lib/mathUtils';
import { BarChart3, TrendingUp, Sparkles, Copy, Check, Info, FileSpreadsheet, RotateCcw } from 'lucide-react';

interface DatasetPreset {
  id: string;
  name: string;
  data: string;
  desc: string;
}

const PRESET_DATASETS: DatasetPreset[] = [
  {
    id: 'exam_scores',
    name: 'Exam Test Scores',
    data: '68, 74, 82, 85, 88, 88, 91, 92, 95, 98, 100, 72, 84, 86, 90',
    desc: '15 student test grades out of 100',
  },
  {
    id: 'sales_revenue',
    name: 'Daily Store Sales ($k)',
    data: '12.4, 15.8, 14.2, 18.5, 22.1, 19.4, 25.0, 16.8, 21.3, 24.5, 28.2, 17.6',
    desc: '12 days of retail store turnover',
  },
  {
    id: 'reaction_times',
    name: 'Reaction Times (ms)',
    data: '210, 225, 218, 240, 205, 232, 228, 250, 215, 222, 235, 219, 245',
    desc: 'Psychology cognitive reaction speed trial',
  },
  {
    id: 'stock_returns',
    name: 'Monthly Asset Returns (%)',
    data: '2.4, -1.2, 4.5, 0.8, -3.1, 5.2, 1.9, -0.5, 3.8, 2.1, -1.8, 6.4',
    desc: '1-year historical monthly portfolio performance',
  },
];

export const StatisticsCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [inputText, setInputText] = useState<string>('12, 15, 18, 22, 22, 25, 29, 31, 35, 40, 42, 48');
  const [activePresetId, setActivePresetId] = useState<string>('custom');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset && initialPreset.data) {
      setInputText(initialPreset.data);
    }
  }, [initialPreset]);

  const handleSelectPreset = (p: DatasetPreset) => {
    setActivePresetId(p.id);
    setInputText(p.data);
  };

  const calculation = useMemo(() => {
    // Parse numbers from arbitrary delimiters (commas, spaces, tabs, newlines, semicolons)
    const numbers = inputText
      .split(/[\s,;\n\t]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n) && isFinite(n));

    const count = numbers.length;

    if (count === 0) {
      return {
        count: 0,
        numbers: [],
        sorted: [],
        sum: 0,
        mean: 0,
        geometricMean: 0,
        median: 0,
        mode: [],
        min: 0,
        max: 0,
        range: 0,
        varianceSample: 0,
        stdDevSample: 0,
        variancePop: 0,
        stdDevPop: 0,
        sem: 0,
        q1: 0,
        q3: 0,
        iqr: 0,
        lowerFence: 0,
        upperFence: 0,
        outliers: [],
        skewness: 0,
        sumOfSquares: 0,
        bins: [],
      };
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = sorted.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;

    // Geometric Mean (for positive values)
    const allPositive = sorted.every((n) => n > 0);
    let geometricMean = 0;
    if (allPositive) {
      const logSum = sorted.reduce((acc, val) => acc + Math.log(val), 0);
      geometricMean = Math.exp(logSum / count);
    }

    // Median
    let median = 0;
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

    let mode: number[] = [];
    if (maxFreq > 1) {
      mode = Object.keys(freq)
        .filter((k) => freq[parseFloat(k)] === maxFreq)
        .map((k) => parseFloat(k))
        .sort((a, b) => a - b);
    }

    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min;

    // Quartiles (Tukey / Moore and McCabe standard)
    const getMedianOfSubarray = (arr: number[]) => {
      if (arr.length === 0) return 0;
      const mid = Math.floor(arr.length / 2);
      return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
    };

    const midIdx = Math.floor(count / 2);
    const lowerHalf = count % 2 === 0 ? sorted.slice(0, midIdx) : sorted.slice(0, midIdx);
    const upperHalf = count % 2 === 0 ? sorted.slice(midIdx) : sorted.slice(midIdx + 1);

    const q1 = getMedianOfSubarray(lowerHalf);
    const q3 = getMedianOfSubarray(upperHalf);
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    const outliers = sorted.filter((n) => n < lowerFence || n > upperFence);

    // Variances & StdDevs
    let varianceSample = 0;
    let stdDevSample = 0;
    let variancePop = 0;
    let stdDevPop = 0;
    let sem = 0;
    let skewness = 0;
    let sumOfSquares = 0;

    if (count > 1) {
      const sumSqDiff = sorted.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0);
      sumOfSquares = sumSqDiff;
      varianceSample = sumSqDiff / (count - 1);
      stdDevSample = Math.sqrt(varianceSample);
      variancePop = sumSqDiff / count;
      stdDevPop = Math.sqrt(variancePop);
      sem = stdDevSample / Math.sqrt(count);

      // Fisher-Pearson Skewness
      if (stdDevSample > 0 && count > 2) {
        const sumCubedDiff = sorted.reduce((acc, n) => acc + Math.pow(n - mean, 3), 0);
        skewness = (count / ((count - 1) * (count - 2))) * (sumCubedDiff / Math.pow(stdDevSample, 3));
      }
    }

    // Generate Histogram Bins (5 to 8 bins depending on count)
    const numBins = Math.min(8, Math.max(4, Math.round(Math.sqrt(count))));
    const binWidth = range > 0 ? range / numBins : 1;
    const bins = Array.from({ length: numBins }, (_, i) => {
      const bMin = min + i * binWidth;
      const bMax = i === numBins - 1 ? max + 0.0001 : min + (i + 1) * binWidth;
      const binCount = sorted.filter((val) => val >= bMin && (i === numBins - 1 ? val <= max : val < bMax)).length;
      return {
        range: `${bMin.toFixed(1)}–${(min + (i + 1) * binWidth).toFixed(1)}`,
        frequency: binCount,
      };
    });

    return {
      count,
      numbers,
      sorted,
      sum,
      mean,
      geometricMean,
      median,
      mode,
      min,
      max,
      range,
      varianceSample,
      stdDevSample,
      variancePop,
      stdDevPop,
      sem,
      q1,
      q3,
      iqr,
      lowerFence,
      upperFence,
      outliers,
      skewness,
      sumOfSquares,
      bins,
    };
  }, [inputText]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Preset Datasets Header */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Quick Example Datasets
          </span>
          <span className="text-[11px] text-slate-400">Click to autofill numbers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_DATASETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`p-2.5 text-left rounded-xl border transition ${
                activePresetId === p.id
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold truncate">{p.name}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Input Area */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-500" />
            Enter Raw Dataset Numbers
          </label>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            N = {calculation.count} values parsed
          </span>
        </div>

        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setActivePresetId('custom');
          }}
          placeholder="e.g. 10, 15.5, 20, 22, 25, 30.2, 40"
          className="w-full p-4 font-mono text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
        />
        <div className="text-[11px] text-slate-400 flex items-center justify-between">
          <span>Supports commas, spaces, tabs, and newlines as delimiters.</span>
          <button
            type="button"
            onClick={() => setInputText('')}
            className="text-rose-500 hover:underline font-semibold"
          >
            Clear Data
          </button>
        </div>
      </div>

      {/* Primary Key Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CalcResultCard
          title="Sample Mean (x̄)"
          value={formatNumber(calculation.mean, 3)}
          subtitle={`Arithmetic Average`}
          highlighted={true}
        />

        <CalcResultCard
          title="Median (Q2)"
          value={formatNumber(calculation.median, 3)}
          subtitle={`50th Percentile Middle`}
        />

        <CalcResultCard
          title="Sample Std Dev (s)"
          value={formatNumber(calculation.stdDevSample, 3)}
          subtitle={`Dispersion (n - 1)`}
        />

        <CalcResultCard
          title="Mode"
          value={calculation.mode.length > 0 ? calculation.mode.join(', ') : 'No Mode'}
          subtitle={calculation.mode.length > 1 ? 'Multimodal' : 'Most frequent value'}
        />
      </div>

      {/* Comprehensive Statistics Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-500" />
          Full Descriptive Statistical Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          {/* Column 1: Central Tendency & Dispersion */}
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Sample Count (n)</span>
              <strong className="text-slate-900 dark:text-white">{calculation.count}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Sum of Values (Σx)</span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(calculation.sum, 4)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Sample Variance (s²)</span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(calculation.varianceSample, 4)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Population Std Dev (σ)</span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(calculation.stdDevPop, 4)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Population Variance (σ²)</span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(calculation.variancePop, 4)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Standard Error (SEM)</span>
              <strong className="text-blue-600 dark:text-blue-400">{formatNumber(calculation.sem, 4)}</strong>
            </div>
          </div>

          {/* Column 2: Extremes, Quartiles & Shape */}
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Minimum / Maximum</span>
              <strong className="text-slate-900 dark:text-white">{calculation.min} / {calculation.max}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Range (Max − Min)</span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(calculation.range, 3)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">First Quartile (Q1, 25%)</span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(calculation.q1, 3)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Third Quartile (Q3, 75%)</span>
              <strong className="text-slate-900 dark:text-white">{formatNumber(calculation.q3, 3)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Interquartile Range (IQR)</span>
              <strong className="text-emerald-600 dark:text-emerald-400">{formatNumber(calculation.iqr, 3)}</strong>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
              <span className="font-sans text-slate-500">Skewness (Asymmetry)</span>
              <strong className="text-purple-600 dark:text-purple-400">{formatNumber(calculation.skewness, 3)}</strong>
            </div>
          </div>
        </div>

        {/* Frequency Distribution Chart */}
        {calculation.bins.length > 0 && calculation.count >= 4 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Frequency Distribution Histogram
            </span>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calculation.bins} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '0.75rem',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="frequency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Sorted Array Display */}
        {calculation.sorted.length > 0 && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Ascending Sorted Dataset:
            </span>
            <div className="font-mono text-slate-600 dark:text-slate-400 break-words leading-relaxed text-[11px]">
              [{calculation.sorted.join(', ')}]
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
