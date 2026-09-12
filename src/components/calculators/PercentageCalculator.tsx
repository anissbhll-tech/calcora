import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Percent, TrendingUp, TrendingDown, ArrowRight, Sparkles, HelpCircle, Layers, Copy, Check } from 'lucide-react';

type PercentageTab = 'value_of' | 'share_of' | 'change' | 'increase_decrease' | 'reverse';

export const PercentageCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [activeTab, setActiveTab] = useState<PercentageTab>('value_of');

  // Mode 1: What is P% of X?
  const [p1Pct, setP1Pct] = useState<number>(15);
  const [p1Val, setP1Val] = useState<number>(250);

  // Mode 2: X is what % of Y?
  const [p2Part, setP2Part] = useState<number>(45);
  const [p2Total, setP2Total] = useState<number>(180);

  // Mode 3: % Change from V1 to V2
  const [p3V1, setP3V1] = useState<number>(120);
  const [p3V2, setP3V2] = useState<number>(165);

  // Mode 4: X increased/decreased by P%
  const [p4Base, setP4Base] = useState<number>(300);
  const [p4Pct, setP4Pct] = useState<number>(20);
  const [p4Mode, setP4Mode] = useState<'increase' | 'decrease'>('increase');

  // Mode 5: Reverse Percentage (X is P% of what?)
  const [p5Part, setP5Part] = useState<number>(75);
  const [p5Pct, setP5Pct] = useState<number>(25);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.activeTab) setActiveTab(initialPreset.activeTab);
      if (initialPreset.p1Pct !== undefined) setP1Pct(initialPreset.p1Pct);
      if (initialPreset.p1Val !== undefined) setP1Val(initialPreset.p1Val);
    }
  }, [initialPreset]);

  // Calculations
  const m1 = useMemo(() => {
    const p = safeParseNumber(p1Pct, 0);
    const x = safeParseNumber(p1Val, 0);
    const result = (p / 100) * x;
    const decimal = p / 100;
    return { p, x, result, decimal };
  }, [p1Pct, p1Val]);

  const m2 = useMemo(() => {
    const part = safeParseNumber(p2Part, 0);
    const total = safeParseNumber(p2Total, 1);
    const result = total !== 0 ? (part / total) * 100 : 0;
    const ratio = total !== 0 ? part / total : 0;
    return { part, total, result, ratio };
  }, [p2Part, p2Total]);

  const m3 = useMemo(() => {
    const v1 = safeParseNumber(p3V1, 0);
    const v2 = safeParseNumber(p3V2, 0);
    const diff = v2 - v1;
    const pctChange = v1 !== 0 ? (diff / Math.abs(v1)) * 100 : 0;
    const isIncrease = diff >= 0;
    return { v1, v2, diff, pctChange, isIncrease };
  }, [p3V1, p3V2]);

  const m4 = useMemo(() => {
    const base = safeParseNumber(p4Base, 0);
    const pct = safeParseNumber(p4Pct, 0);
    const adjustment = (pct / 100) * base;
    const finalVal = p4Mode === 'increase' ? base + adjustment : base - adjustment;
    const multiplier = p4Mode === 'increase' ? 1 + pct / 100 : 1 - pct / 100;
    return { base, pct, adjustment, finalVal, multiplier };
  }, [p4Base, p4Pct, p4Mode]);

  const m5 = useMemo(() => {
    const part = safeParseNumber(p5Part, 0);
    const pct = safeParseNumber(p5Pct, 1);
    const total = pct !== 0 ? part / (pct / 100) : 0;
    return { part, pct, total };
  }, [p5Part, p5Pct]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setActiveTab('value_of')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'value_of'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          What is X% of Y?
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('share_of')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'share_of'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          X is what % of Y?
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('change')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'change'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Percentage Change (%)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('increase_decrease')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'increase_decrease'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Increase / Decrease
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reverse')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl transition ${
            activeTab === 'reverse'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Reverse % (Find Total)
        </button>
      </div>

      {/* Mode 1: What is P% of X? */}
      {activeTab === 'value_of' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-500" />
              Calculate Percentage of a Number
            </h3>
            <span className="text-xs text-slate-400 font-mono">Formula: (P ÷ 100) × X</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput
              id="p1Pct"
              label="Percentage (P %)"
              value={p1Pct}
              onChange={setP1Pct}
              min={-1000}
              max={10000}
              step={0.5}
              suffix="%"
            />

            <CalcInput
              id="p1Val"
              label="Total Value (X)"
              value={p1Val}
              onChange={setP1Val}
              min={-100000000}
              max={100000000}
              step={1}
            />
          </div>

          {/* Hero Result */}
          <div className="p-6 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                {m1.p}% of {formatNumber(m1.x)} is:
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-blue-950 dark:text-blue-100 mt-1">
                {formatNumber(m1.result, 4)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyVal(String(m1.result), 'm1')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-sm"
            >
              {copiedKey === 'm1' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedKey === 'm1' ? 'Copied' : 'Copy Value'}
            </button>
          </div>

          {/* Step-by-Step Math Breakdown */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 font-mono">
            <div className="font-sans font-bold text-slate-700 dark:text-slate-300">Step-by-Step Solution:</div>
            <div className="text-slate-600 dark:text-slate-400">1. Convert percentage to decimal: {m1.p}% ÷ 100 = {m1.decimal}</div>
            <div className="text-slate-600 dark:text-slate-400">2. Multiply by total: {m1.decimal} × {m1.x} = <strong className="text-blue-600 dark:text-blue-400 font-bold">{m1.result}</strong></div>
          </div>
        </div>
      )}

      {/* Mode 2: X is what % of Y? */}
      {activeTab === 'share_of' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              Find Percentage Share (Part to Whole)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Formula: (Part ÷ Total) × 100</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput
              id="p2Part"
              label="Part / Portion (X)"
              value={p2Part}
              onChange={setP2Part}
              min={-100000000}
              max={100000000}
              step={1}
            />

            <CalcInput
              id="p2Total"
              label="Total Whole (Y)"
              value={p2Total}
              onChange={setP2Total}
              min={-100000000}
              max={100000000}
              step={1}
            />
          </div>

          {/* Hero Result */}
          <div className="p-6 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                {formatNumber(m2.part)} is what % of {formatNumber(m2.total)}:
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-950 dark:text-emerald-100 mt-1">
                {m2.result.toFixed(2)}%
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyVal(`${m2.result.toFixed(2)}%`, 'm2')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-sm"
            >
              {copiedKey === 'm2' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedKey === 'm2' ? 'Copied' : 'Copy %'}
            </button>
          </div>

          {/* Step-by-Step */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 font-mono">
            <div className="font-sans font-bold text-slate-700 dark:text-slate-300">Step-by-Step Solution:</div>
            <div className="text-slate-600 dark:text-slate-400">1. Calculate ratio: {m2.part} ÷ {m2.total} = {m2.ratio.toFixed(4)}</div>
            <div className="text-slate-600 dark:text-slate-400">2. Convert to percentage: {m2.ratio.toFixed(4)} × 100 = <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{m2.result.toFixed(2)}%</strong></div>
          </div>
        </div>
      )}

      {/* Mode 3: Percentage Change */}
      {activeTab === 'change' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Percentage Change &amp; Growth Rate
            </h3>
            <span className="text-xs text-slate-400 font-mono">Formula: ((V2 - V1) ÷ |V1|) × 100</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput
              id="p3V1"
              label="Original Value (V₁)"
              value={p3V1}
              onChange={setP3V1}
              min={-100000000}
              max={100000000}
              step={1}
            />

            <CalcInput
              id="p3V2"
              label="New Value (V₂)"
              value={p3V2}
              onChange={setP3V2}
              min={-100000000}
              max={100000000}
              step={1}
            />
          </div>

          {/* Hero Result */}
          <div className="p-6 bg-purple-50/70 dark:bg-purple-950/40 rounded-2xl border border-purple-100 dark:border-purple-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                Percentage Change from {formatNumber(m3.v1)} to {formatNumber(m3.v2)}:
              </span>
              <div className={`text-4xl sm:text-5xl font-black font-mono mt-1 ${m3.isIncrease ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {m3.isIncrease ? `+${m3.pctChange.toFixed(2)}%` : `${m3.pctChange.toFixed(2)}%`}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono block">
                Absolute difference: {m3.diff >= 0 ? `+${formatNumber(m3.diff)}` : formatNumber(m3.diff)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => copyVal(`${m3.isIncrease ? '+' : ''}${m3.pctChange.toFixed(2)}%`, 'm3')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-sm"
            >
              {copiedKey === 'm3' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedKey === 'm3' ? 'Copied' : 'Copy Change'}
            </button>
          </div>

          {/* Step-by-Step */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 font-mono">
            <div className="font-sans font-bold text-slate-700 dark:text-slate-300">Step-by-Step Solution:</div>
            <div className="text-slate-600 dark:text-slate-400">1. Subtract original from new: {m3.v2} − {m3.v1} = {m3.diff}</div>
            <div className="text-slate-600 dark:text-slate-400">2. Divide by original: {m3.diff} ÷ |{m3.v1}| = {(m3.diff / Math.abs(m3.v1 || 1)).toFixed(4)}</div>
            <div className="text-slate-600 dark:text-slate-400">3. Multiply by 100 = <strong className="text-purple-600 dark:text-purple-400 font-bold">{m3.pctChange.toFixed(2)}%</strong></div>
          </div>
        </div>
      )}

      {/* Mode 4: Percentage Increase / Decrease */}
      {activeTab === 'increase_decrease' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Apply Percentage Increase or Discount
            </h3>
            <span className="text-xs text-slate-400 font-mono">Formula: X × (1 ± P%)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcInput
              id="p4Base"
              label="Starting Value (X)"
              value={p4Base}
              onChange={setP4Base}
              min={0}
              max={100000000}
              step={1}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Operation Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setP4Mode('increase')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition ${
                    p4Mode === 'increase'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Increase (+)
                </button>
                <button
                  type="button"
                  onClick={() => setP4Mode('decrease')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition ${
                    p4Mode === 'decrease'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Discount (−)
                </button>
              </div>
            </div>

            <CalcInput
              id="p4Pct"
              label="Percentage (P %)"
              value={p4Pct}
              onChange={setP4Pct}
              min={0}
              max={1000}
              step={0.5}
              suffix="%"
            />
          </div>

          {/* Hero Result */}
          <div className="p-6 bg-amber-50/70 dark:bg-amber-950/40 rounded-2xl border border-amber-100 dark:border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                {formatNumber(m4.base)} {p4Mode === 'increase' ? `+ ${m4.pct}%` : `− ${m4.pct}%`} is:
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-amber-950 dark:text-amber-100 mt-1">
                {formatNumber(m4.finalVal, 4)}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono block">
                Adjustment amount: {p4Mode === 'increase' ? `+${formatNumber(m4.adjustment, 2)}` : `-${formatNumber(m4.adjustment, 2)}`}
              </span>
            </div>

            <button
              type="button"
              onClick={() => copyVal(String(m4.finalVal), 'm4')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-sm"
            >
              {copiedKey === 'm4' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedKey === 'm4' ? 'Copied' : 'Copy Value'}
            </button>
          </div>
        </div>
      )}

      {/* Mode 5: Reverse Percentage */}
      {activeTab === 'reverse' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              Reverse Percentage (Find Original Whole)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Formula: Part ÷ (P ÷ 100)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput
              id="p5Part"
              label="Given Portion (X)"
              value={p5Part}
              onChange={setP5Part}
              min={0}
              max={100000000}
              step={1}
            />

            <CalcInput
              id="p5Pct"
              label="Percentage it Represents (P %)"
              value={p5Pct}
              onChange={setP5Pct}
              min={0.01}
              max={10000}
              step={0.5}
              suffix="%"
            />
          </div>

          {/* Hero Result */}
          <div className="p-6 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block">
                If {formatNumber(m5.part)} is {m5.pct}%, the total (100%) is:
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-indigo-950 dark:text-indigo-100 mt-1">
                {formatNumber(m5.total, 4)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyVal(String(m5.total), 'm5')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-sm"
            >
              {copiedKey === 'm5' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedKey === 'm5' ? 'Copied' : 'Copy Total'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
