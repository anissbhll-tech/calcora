import React, { useState } from 'react';
import { CalculationHistoryItem } from '../../types';

interface AutoLoanCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
}

export const AutoLoanCalculator: React.FC<AutoLoanCalculatorProps> = () => {
  const [price, setPrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeIn, setTradeIn] = useState<number>(2500);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60); // 5 years
  const [salesTaxPercent, setSalesTaxPercent] = useState<number>(7);

  const netPrice = Math.max(0, price - downPayment - tradeIn);
  const salesTax = (price * salesTaxPercent) / 100;
  const loanPrincipal = netPrice + salesTax;

  const monthlyRate = interestRate / 100 / 12;
  let monthlyPayment = 0;
  if (monthlyRate > 0 && loanTermMonths > 0) {
    monthlyPayment = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  } else {
    monthlyPayment = loanPrincipal / loanTermMonths;
  }

  const totalPayments = monthlyPayment * loanTermMonths;
  const totalInterest = Math.max(0, totalPayments - loanPrincipal);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Vehicle Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Down Payment ($)</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Trade-in Value ($)</label>
            <input
              type="number"
              value={tradeIn}
              onChange={(e) => setTradeIn(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">APR Rate (%)</label>
            <input
              type="number"
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Term</label>
            <select
              value={loanTermMonths}
              onChange={(e) => setLoanTermMonths(Number(e.target.value))}
              className="w-full text-xs font-semibold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value={36}>36 mos (3 yrs)</option>
              <option value={48}>48 mos (4 yrs)</option>
              <option value={60}>60 mos (5 yrs)</option>
              <option value={72}>72 mos (6 yrs)</option>
              <option value={84}>84 mos (7 yrs)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sales Tax %</label>
            <input
              type="number"
              step={0.1}
              value={salesTaxPercent}
              onChange={(e) => setSalesTaxPercent(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Car Payment</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
            ${Math.round(monthlyPayment).toLocaleString()}
            <span className="text-base text-slate-400 font-normal"> / mo</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Financed Loan Principal:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${Math.round(loanPrincipal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Total Financing Interest:</span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">${Math.round(totalInterest).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Total Loan Repayment:</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">${Math.round(totalPayments).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
