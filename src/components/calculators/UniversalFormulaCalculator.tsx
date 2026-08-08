import React, { useState } from 'react';
import { CALCULATORS } from '../../data/calculatorsList';
import { Calculator as CalcIcon, RefreshCw, Check, Copy, Share2, HelpCircle } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface Props {
  calculatorId: string;
  onSaveToHistory?: (summaryText: string, inputs: Record<string, any>, results: Record<string, any>) => void;
}

export const UniversalFormulaCalculator: React.FC<Props> = ({ calculatorId, onSaveToHistory }) => {
  const calc = CALCULATORS.find((c) => c.id === calculatorId);

  const [inputVal1, setInputVal1] = useState<number>(1000);
  const [inputVal2, setInputVal2] = useState<number>(5);
  const [inputVal3, setInputVal3] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  if (!calc) {
    return <div className="p-8 text-center text-slate-500">Calculator configuration not found.</div>;
  }

  // Calculate dynamic results based on keywords/category or default standard formula
  const computeResult = () => {
    const v1 = Number(inputVal1) || 0;
    const v2 = Number(inputVal2) || 0;
    const v3 = Number(inputVal3) || 0;

    let mainVal = 0;
    let label1 = 'Primary Result';
    let label2 = 'Secondary Metric';
    let val2Num = 0;

    if (calc.id.includes('token') || calc.id.includes('ai')) {
      mainVal = v1 * 0.0000025 * v2;
      label1 = 'Estimated API Cost ($)';
      label2 = 'Total Words Equivalent';
      val2Num = v1 * 0.75;
    } else if (calc.id.includes('tax') || calc.id.includes('income')) {
      mainVal = v1 * (v2 / 100);
      label1 = 'Estimated Tax Owed ($)';
      label2 = 'Net Take-Home Pay ($)';
      val2Num = v1 - mainVal;
    } else if (calc.id.includes('ohm') || calc.id.includes('electrical')) {
      mainVal = v1 * v2; // V = I * R
      label1 = 'Voltage Output (V)';
      label2 = 'Power Dissipation (Watts)';
      val2Num = (v1 * v1) * v2;
    } else if (calc.id.includes('molar') || calc.id.includes('chemistry')) {
      mainVal = v1 / (v2 || 1);
      label1 = 'Molar Concentration (M)';
      label2 = 'Total Mass (g)';
      val2Num = v1 * v3;
    } else if (calc.id.includes('projectile') || calc.id.includes('physics')) {
      mainVal = (v1 * v1 * Math.sin((2 * v2 * Math.PI) / 180)) / 9.81;
      label1 = 'Max Distance (Meters)';
      label2 = 'Peak Height (Meters)';
      val2Num = (v1 * v1 * Math.sin((v2 * Math.PI) / 180) ** 2) / (2 * 9.81);
    } else if (calc.id.includes('beam') || calc.id.includes('engineering')) {
      mainVal = (v1 * v2 ** 3) / (48 * 200000);
      label1 = 'Beam Deflection (mm)';
      label2 = 'Max Bending Stress (MPa)';
      val2Num = (v1 * v2) / 8;
    } else {
      // Default formula: Compound/Growth or Linear Proportion
      mainVal = v1 * Math.pow(1 + (v2 / 100) / 12, 12 * v3);
      label1 = 'Calculated Value';
      label2 = 'Growth / Variance Factor';
      val2Num = mainVal - v1;
    }

    return {
      mainVal: Math.round(mainVal * 100) / 100,
      label1,
      label2,
      secondaryVal: Math.round(val2Num * 100) / 100,
    };
  };

  const res = computeResult();

  const handleCopy = () => {
    const text = `${calc.title} Result: ${res.label1} = ${res.mainVal}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    trackEvent('conversion', 'Copy Result', calc.title, calc.id);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Interactive Form Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Primary Quantity / Amount ($ or Units)
          </label>
          <input
            type="number"
            value={inputVal1}
            onChange={(e) => setInputVal1(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Secondary Rate / Factor / Percentage (%)
          </label>
          <input
            type="number"
            value={inputVal2}
            onChange={(e) => setInputVal2(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Duration / Multiplier / Years
          </label>
          <input
            type="number"
            value={inputVal3}
            onChange={(e) => setInputVal3(parseFloat(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Output Display Panel */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-900 to-slate-900 text-white space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-teal-800/60 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
            <CalcIcon className="w-4 h-4 text-teal-400" /> Computation Output
          </span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 rounded-lg bg-teal-800/80 hover:bg-teal-700 text-teal-200 text-xs font-bold flex items-center gap-1 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Results'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-teal-200/80 font-medium">{res.label1}</div>
            <div className="text-3xl font-extrabold text-white font-mono mt-1">
              {res.mainVal.toLocaleString()}
            </div>
          </div>

          <div>
            <div className="text-xs text-teal-200/80 font-medium">{res.label2}</div>
            <div className="text-2xl font-bold text-teal-300 font-mono mt-1">
              {res.secondaryVal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Formula & Mathematical Explanation */}
      {calc.formulaDescription && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Mathematical Formula & Logic</div>
          <div className="font-mono text-xs text-teal-600 dark:text-teal-400">{calc.formulaDescription}</div>
        </div>
      )}

    </div>
  );
};
