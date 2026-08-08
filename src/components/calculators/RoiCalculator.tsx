import React, { useState } from 'react';

export const RoiCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(10000);
  const [revenue, setRevenue] = useState<number>(18000);

  const netProfit = revenue - cost;
  const roiPercent = cost > 0 ? (netProfit / cost) * 100 : 0;
  const profitMarginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const markupPercent = cost > 0 ? (netProfit / cost) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Total Investment Cost ($)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gross Revenue / Value ($)</label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Return on Investment (ROI)</span>
          <div className={`text-5xl font-extrabold mt-1 font-mono ${roiPercent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {roiPercent >= 0 ? `+${roiPercent.toFixed(1)}%` : `${roiPercent.toFixed(1)}%`}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Net Profit</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${netProfit.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Profit Margin</span>
            <span className="font-mono font-bold text-blue-600">{profitMarginPercent.toFixed(1)}%</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-slate-400 block text-[10px]">Price Markup</span>
            <span className="font-mono font-bold text-purple-600">{markupPercent.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
