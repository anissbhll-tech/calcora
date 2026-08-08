import React, { useState, useEffect } from 'react';
import { CalculationHistoryItem } from '../../types';

interface SalesTaxTipCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  presetValues?: Record<string, any>;
}

export const SalesTaxTipCalculator: React.FC<SalesTaxTipCalculatorProps> = ({
  onAddHistory,
  presetValues,
}) => {
  const [subtotal, setSubtotal] = useState<number>(120);
  const [taxRate, setTaxRate] = useState<number>(8.875);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(3);

  useEffect(() => {
    if (presetValues) {
      if (presetValues.subtotal !== undefined) setSubtotal(presetValues.subtotal);
      if (presetValues.taxRate !== undefined) setTaxRate(presetValues.taxRate);
      if (presetValues.tipPercent !== undefined) setTipPercent(presetValues.tipPercent);
      if (presetValues.numberOfPeople !== undefined) setNumberOfPeople(presetValues.numberOfPeople);
    }
  }, [presetValues]);

  const taxAmount = (subtotal * taxRate) / 100;
  const tipAmount = (subtotal * tipPercent) / 100;
  const totalBill = subtotal + taxAmount + tipAmount;

  const perPersonSubtotal = subtotal / numberOfPeople;
  const perPersonTax = taxAmount / numberOfPeople;
  const perPersonTip = tipAmount / numberOfPeople;
  const perPersonTotal = totalBill / numberOfPeople;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
            Bill & Tip Details
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Bill Subtotal ($)
            </label>
            <input
              type="number"
              step={0.01}
              value={subtotal}
              onChange={(e) => setSubtotal(Number(e.target.value))}
              className="w-full text-sm font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sales Tax Rate (%)
              </label>
              <input
                type="number"
                step={0.1}
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Split Between People
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          {/* Quick Tip Selection Pills */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Tip Percentage
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[10, 15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPercent(pct)}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    tipPercent === pct
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-slate-400">Custom Tip %:</span>
              <input
                type="number"
                value={tipPercent}
                onChange={(e) => setTipPercent(Number(e.target.value))}
                className="w-24 text-xs font-mono p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total per Person ({numberOfPeople} People)</span>
            <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
              ${perPersonTotal.toFixed(2)}
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 mt-6 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Per Person Meal:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${perPersonSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Per Person Tax ({taxRate}%):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${perPersonTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Per Person Tip ({tipPercent}%):</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${perPersonTip.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Grand Total Bill:</span>
              <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100 text-sm">${totalBill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Total Tip Amount:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${tipAmount.toFixed(2)}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
