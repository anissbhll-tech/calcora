import React, { useState } from 'react';
import { CalculationHistoryItem } from '../../types';

interface PercentageCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
}

export const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({ onAddHistory }) => {
  // Mode 1: What is X% of Y?
  const [p1X, setP1X] = useState<number>(15);
  const [p1Y, setP1Y] = useState<number>(200);
  const r1 = (p1X / 100) * p1Y;

  // Mode 2: X is what % of Y?
  const [p2X, setP2X] = useState<number>(45);
  const [p2Y, setP2Y] = useState<number>(150);
  const r2 = p2Y !== 0 ? (p2X / p2Y) * 100 : 0;

  // Mode 3: % Change from X to Y?
  const [p3X, setP3X] = useState<number>(100);
  const [p3Y, setP3Y] = useState<number>(125);
  const r3 = p3X !== 0 ? ((p3Y - p3X) / Math.abs(p3X)) * 100 : 0;

  // Mode 4: X increased/decreased by Y%
  const [p4X, setP4X] = useState<number>(250);
  const [p4Y, setP4Y] = useState<number>(10);
  const [p4Op, setP4Op] = useState<'increase' | 'decrease'>('increase');
  const r4 = p4Op === 'increase' ? p4X * (1 + p4Y / 100) : p4X * (1 - p4Y / 100);

  return (
    <div className="space-y-6">
      
      {/* Box 1 */}
      <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">1. Calculate Percentage Value</h4>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span>What is</span>
          <input
            type="number"
            value={p1X}
            onChange={(e) => setP1X(Number(e.target.value))}
            className="w-24 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <span>% of</span>
          <input
            type="number"
            value={p1Y}
            onChange={(e) => setP1Y(Number(e.target.value))}
            className="w-24 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <span>?</span>
          <div className="ml-auto font-mono text-xl font-extrabold text-blue-600 dark:text-blue-400">
            = {r1.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Box 2 */}
      <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">2. Find Percentage Share</h4>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <input
            type="number"
            value={p2X}
            onChange={(e) => setP2X(Number(e.target.value))}
            className="w-24 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <span>is what % of</span>
          <input
            type="number"
            value={p2Y}
            onChange={(e) => setP2Y(Number(e.target.value))}
            className="w-24 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <span>?</span>
          <div className="ml-auto font-mono text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            = {r2.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Box 3 */}
      <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">3. Percentage Change (Increase / Decrease)</h4>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span>Change from</span>
          <input
            type="number"
            value={p3X}
            onChange={(e) => setP3X(Number(e.target.value))}
            className="w-24 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <span>to</span>
          <input
            type="number"
            value={p3Y}
            onChange={(e) => setP3Y(Number(e.target.value))}
            className="w-24 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <span>?</span>
          <div className={`ml-auto font-mono text-xl font-extrabold ${r3 >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            = {r3 >= 0 ? `+${r3.toFixed(2)}%` : `${r3.toFixed(2)}%`}
          </div>
        </div>
      </div>

      {/* Box 4 */}
      <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">4. Apply Percentage Adjustment</h4>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span>What is</span>
          <input
            type="number"
            value={p4X}
            onChange={(e) => setP4X(Number(e.target.value))}
            className="w-24 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <select
            value={p4Op}
            onChange={(e) => setP4Op(e.target.value as 'increase' | 'decrease')}
            className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
          >
            <option value="increase">increased (+)</option>
            <option value="decrease">decreased (-)</option>
          </select>
          <span>by</span>
          <input
            type="number"
            value={p4Y}
            onChange={(e) => setP4Y(Number(e.target.value))}
            className="w-20 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-center"
          />
          <span>%?</span>
          <div className="ml-auto font-mono text-xl font-extrabold text-amber-600 dark:text-amber-400">
            = {r4.toLocaleString()}
          </div>
        </div>
      </div>

    </div>
  );
};
