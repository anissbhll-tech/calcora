import React, { useState } from 'react';

export const CreditCardPayoffCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(6000);
  const [apr, setApr] = useState<number>(22.5);
  const [targetMonthlyPayment, setTargetMonthlyPayment] = useState<number>(200);

  const monthlyRate = apr / 100 / 12;

  let monthsToPayoff = 0;
  let totalInterest = 0;
  let tempBal = balance;

  if (monthlyRate > 0 && targetMonthlyPayment > tempBal * monthlyRate) {
    while (tempBal > 0 && monthsToPayoff < 360) {
      const interest = tempBal * monthlyRate;
      totalInterest += interest;
      const principal = Math.min(tempBal, targetMonthlyPayment - interest);
      tempBal -= principal;
      monthsToPayoff++;
    }
  } else if (monthlyRate === 0) {
    monthsToPayoff = Math.ceil(balance / targetMonthlyPayment);
  } else {
    monthsToPayoff = -1; // Payment too low to cover interest!
  }

  const totalPaid = balance + totalInterest;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Credit Card Balance ($)</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Interest APR (%)</label>
            <input
              type="number"
              step={0.1}
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Payment ($)</label>
            <input
              type="number"
              value={targetMonthlyPayment}
              onChange={(e) => setTargetMonthlyPayment(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        {monthsToPayoff > 0 ? (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Time to Become Debt Free</span>
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              {Math.floor(monthsToPayoff / 12)} yrs {monthsToPayoff % 12} mos
            </div>
          </div>
        ) : (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-600 text-xs rounded-2xl">
            Warning: Your $ {targetMonthlyPayment} payment is less than monthly interest (${Math.round(balance * monthlyRate)}). Increase payment to reduce debt.
          </div>
        )}

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Total Credit Card Interest Paid:</span>
            <span className="font-mono font-bold text-rose-600">${Math.round(totalInterest).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Total Out of Pocket Paid:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${Math.round(totalPaid).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
