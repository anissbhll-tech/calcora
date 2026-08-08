import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CalculationHistoryItem } from '../../types';

interface CompoundInterestCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  presetValues?: Record<string, any>;
}

export const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({
  onAddHistory,
  presetValues,
}) => {
  const [initialDeposit, setInitialDeposit] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [years, setYears] = useState<number>(20);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // monthly

  useEffect(() => {
    if (presetValues) {
      if (presetValues.initialDeposit !== undefined) setInitialDeposit(presetValues.initialDeposit);
      if (presetValues.monthlyContribution !== undefined) setMonthlyContribution(presetValues.monthlyContribution);
      if (presetValues.annualRate !== undefined) setAnnualRate(presetValues.annualRate);
      if (presetValues.years !== undefined) setYears(presetValues.years);
      if (presetValues.compoundFrequency !== undefined) setCompoundFrequency(presetValues.compoundFrequency);
    }
  }, [presetValues]);

  // Calculation logic
  const chartData = [];
  let currentBalance = initialDeposit;
  let totalDeposits = initialDeposit;
  const ratePerPeriod = annualRate / 100 / compoundFrequency;

  for (let y = 0; y <= years; y++) {
    if (y === 0) {
      chartData.push({
        year: `Year 0`,
        TotalBalance: Math.round(currentBalance),
        TotalDeposits: Math.round(totalDeposits),
        InterestEarned: 0,
      });
      continue;
    }

    for (let m = 1; m <= 12; m++) {
      currentBalance += monthlyContribution;
      totalDeposits += monthlyContribution;
      currentBalance *= 1 + ratePerPeriod * (compoundFrequency / 12);
    }

    chartData.push({
      year: `Yr ${y}`,
      TotalBalance: Math.round(currentBalance),
      TotalDeposits: Math.round(totalDeposits),
      InterestEarned: Math.max(0, Math.round(currentBalance - totalDeposits)),
    });
  }

  const finalBalance = chartData[chartData.length - 1].TotalBalance;
  const finalDeposits = chartData[chartData.length - 1].TotalDeposits;
  const finalInterest = chartData[chartData.length - 1].InterestEarned;

  useEffect(() => {
    if (finalBalance > 0) {
      const timer = setTimeout(() => {
        onAddHistory({
          calculatorId: 'compound-interest',
          calculatorTitle: 'Compound Interest & Investment',
          summaryText: `$${finalBalance.toLocaleString()} after ${years} years @ ${annualRate}%`,
          inputs: { initialDeposit, monthlyContribution, annualRate, years },
          results: { finalBalance, finalDeposits, finalInterest },
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [finalBalance, years, annualRate]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
            Investment Growth Inputs
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Initial Principal ($)
            </label>
            <input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Annual Return (%)
              </label>
              <input
                type="number"
                step={0.1}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Investment Horizon (Years)
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Compound Frequency
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(Number(e.target.value))}
              className="w-full text-xs font-semibold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <option value={12}>Compounded Monthly</option>
              <option value={4}>Compounded Quarterly</option>
              <option value={1}>Compounded Annually</option>
              <option value={365}>Compounded Daily</option>
            </select>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Future Value Projection</span>
            <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
              ${finalBalance.toLocaleString()}
            </div>

            {/* Growth chart */}
            <div className="h-52 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Area type="monotone" dataKey="TotalDeposits" stackId="1" stroke="#2563eb" fill="#3b82f6" name="Total Deposits" />
                  <Area type="monotone" dataKey="InterestEarned" stackId="1" stroke="#10b981" fill="#10b981" name="Compound Interest" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Out-of-Pocket</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">${finalDeposits.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Interest Earned</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">${finalInterest.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
