import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { TrendingDown, DollarSign, Percent, Calendar, Plus, Trash2, Sparkles, Zap, Trophy, ShieldAlert } from 'lucide-react';
import { BaseCalculatorProps } from './index';

interface DebtItem {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

const DEFAULT_DEBTS: DebtItem[] = [
  { id: '1', name: 'Credit Card A (Store Card)', balance: 3500, rate: 24.99, minPayment: 105 },
  { id: '2', name: 'Personal Loan', balance: 6500, rate: 14.5, minPayment: 180 },
  { id: '3', name: 'Auto Loan', balance: 14000, rate: 6.75, minPayment: 320 },
  { id: '4', name: 'Student Loan', balance: 18500, rate: 5.25, minPayment: 210 },
];

export const DebtSnowballAvalancheCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [debts, setDebts] = useState<DebtItem[]>(() => {
    if (initialPreset?.debts && Array.isArray(initialPreset.debts)) {
      return initialPreset.debts;
    }
    return DEFAULT_DEBTS;
  });

  const [extraMonthlyBudget, setExtraMonthlyBudget] = useState<number>(300);

  const updateDebt = (id: string, field: keyof DebtItem, value: any) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const addDebt = () => {
    if (debts.length >= 8) return;
    const newId = String(Date.now());
    setDebts((prev) => [
      ...prev,
      { id: newId, name: `Debt #${prev.length + 1}`, balance: 2500, rate: 18.0, minPayment: 75 },
    ]);
  };

  const removeDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const simulation = useMemo(() => {
    const validDebts = debts
      .map((d) => ({
        id: d.id,
        name: d.name || 'Unnamed Debt',
        balance: Math.max(0, safeParseNumber(d.balance, 0)),
        rate: Math.max(0, safeParseNumber(d.rate, 0)) / 100 / 12,
        annualApr: Math.max(0, safeParseNumber(d.rate, 0)),
        minPayment: Math.max(0, safeParseNumber(d.minPayment, 0)),
      }))
      .filter((d) => d.balance > 0);

    const totalStartingBalance = validDebts.reduce((sum, d) => sum + d.balance, 0);
    const totalRequiredMinPayments = validDebts.reduce((sum, d) => sum + d.minPayment, 0);
    const extraBudget = Math.max(0, safeParseNumber(extraMonthlyBudget, 0));
    const totalMonthlyBudget = totalRequiredMinPayments + extraBudget;

    const runStrategy = (strategy: 'snowball' | 'avalanche' | 'min_only') => {
      // Clone debt list
      let active = validDebts.map((d) => ({ ...d }));
      let months = 0;
      let totalInterest = 0;
      const payoffOrder: { debtName: string; month: number }[] = [];
      const balanceHistory: { month: number; totalBal: number }[] = [
        { month: 0, totalBal: Math.round(totalStartingBalance) },
      ];

      const maxLimit = 600; // 50 years cap

      while (active.some((d) => d.balance > 0.01) && months < maxLimit) {
        months++;

        // 1. Accrue monthly interest
        for (const d of active) {
          if (d.balance > 0) {
            const int = d.balance * d.rate;
            d.balance += int;
            totalInterest += int;
          }
        }

        // 2. Sort debts according to strategy for extra payments
        if (strategy === 'snowball') {
          // Lowest balance first
          active.sort((a, b) => {
            if (a.balance <= 0 && b.balance <= 0) return 0;
            if (a.balance <= 0) return 1;
            if (b.balance <= 0) return -1;
            return a.balance - b.balance;
          });
        } else if (strategy === 'avalanche') {
          // Highest interest rate first
          active.sort((a, b) => {
            if (a.balance <= 0 && b.balance <= 0) return 0;
            if (a.balance <= 0) return 1;
            if (b.balance <= 0) return -1;
            return b.annualApr - a.annualApr;
          });
        }

        // 3. Distribute payments
        let currentExtraPool = strategy === 'min_only' ? 0 : extraBudget;

        // Pay minimums first and capture rolled-over minimums from paid-off debts
        for (const d of active) {
          if (d.balance > 0) {
            const pmt = Math.min(d.balance, d.minPayment);
            d.balance -= pmt;
            if (d.balance <= 0.01) {
              d.balance = 0;
              currentExtraPool += (d.minPayment - pmt); // leftover from min
              payoffOrder.push({ debtName: d.name, month: months });
            }
          } else if (strategy !== 'min_only') {
            // Freed up minimum from previously eliminated debts rolls into snowball
            currentExtraPool += d.minPayment;
          }
        }

        // Apply available extra / rolled snowball pool to priority target debt
        if (strategy !== 'min_only' && currentExtraPool > 0) {
          for (const d of active) {
            if (d.balance > 0) {
              const extraToApply = Math.min(d.balance, currentExtraPool);
              d.balance -= extraToApply;
              currentExtraPool -= extraToApply;
              if (d.balance <= 0.01) {
                d.balance = 0;
                if (!payoffOrder.some((p) => p.debtName === d.name)) {
                  payoffOrder.push({ debtName: d.name, month: months });
                }
              }
              if (currentExtraPool <= 0) break;
            }
          }
        }

        const remainingTotal = active.reduce((sum, d) => sum + d.balance, 0);
        if (months % 3 === 0 || remainingTotal <= 0.01) {
          balanceHistory.push({ month: months, totalBal: Math.max(0, Math.round(remainingTotal)) });
        }
      }

      return {
        months,
        totalInterest,
        payoffOrder,
        balanceHistory,
      };
    };

    const snowballRes = runStrategy('snowball');
    const avalancheRes = runStrategy('avalanche');
    const minOnlyRes = runStrategy('min_only');

    const interestSavedByAvalancheVsSnowball = Math.max(0, snowballRes.totalInterest - avalancheRes.totalInterest);
    const interestSavedByAvalancheVsMinOnly = Math.max(0, minOnlyRes.totalInterest - avalancheRes.totalInterest);

    // Merge history for chart
    const maxMonths = Math.min(120, Math.max(snowballRes.months, avalancheRes.months, 12));
    const chartData = [];

    const getBalAtMonth = (hist: { month: number; totalBal: number }[], m: number) => {
      const match = hist.find((h) => h.month === m);
      if (match) return match.totalBal;
      // find nearest prior
      let lastVal = hist[0]?.totalBal || 0;
      for (const h of hist) {
        if (h.month <= m) lastVal = h.totalBal;
        else break;
      }
      return lastVal;
    };

    for (let m = 0; m <= maxMonths; m += 3) {
      chartData.push({
        month: `M${m}`,
        monthNum: m,
        snowball: getBalAtMonth(snowballRes.balanceHistory, m),
        avalanche: getBalAtMonth(avalancheRes.balanceHistory, m),
      });
    }

    return {
      totalStartingBalance,
      totalRequiredMinPayments,
      totalMonthlyBudget,
      extraBudget,
      snowball: snowballRes,
      avalanche: avalancheRes,
      minOnly: minOnlyRes,
      interestSavedByAvalancheVsSnowball,
      interestSavedByAvalancheVsMinOnly,
      chartData,
    };
  }, [debts, extraMonthlyBudget]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Debt Payoff (${debts.length} debts, $${formatNumber(simulation.totalStartingBalance)} total): Avalanche saves $${formatCurrency(simulation.interestSavedByAvalancheVsSnowball)} vs Snowball ($${formatCurrency(simulation.interestSavedByAvalancheVsMinOnly)} vs Min)`,
        { extraMonthlyBudget, totalDebts: debts.length },
        {
          avalancheMonths: simulation.avalanche.months,
          snowballMonths: simulation.snowball.months,
          avalancheInterest: simulation.avalanche.totalInterest,
          interestSaved: simulation.interestSavedByAvalancheVsSnowball,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-950/30 dark:to-indigo-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Debt Snowball vs Debt Avalanche Elimination Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Total Debt:{' '}
            <strong className="text-slate-900 dark:text-white font-mono font-bold">
              ${formatCurrency(simulation.totalStartingBalance)}
            </strong>{' '}
            across {debts.length} accounts. Debt Avalanche eliminates debt in{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono text-base">
              {Math.floor(simulation.avalanche.months / 12)} yrs {simulation.avalanche.months % 12} mos
            </strong>{' '}
            and saves{' '}
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              ${formatCurrency(simulation.interestSavedByAvalancheVsMinOnly)}
            </strong>{' '}
            vs minimum payments.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Monthly Payment Budget
            </span>
            <span className="text-xl font-black font-mono text-teal-600 dark:text-teal-400">
              ${formatCurrency(simulation.totalMonthlyBudget)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Debt Portfolio Editor & Budget Input */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Your Debt Accounts ({debts.length}/8)
            </h4>
            <p className="text-[11px] text-slate-500">
              Enter all credit cards, student loans, car loans, and personal balances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CalcInput
              id="extraMonthlyBudget"
              label="Extra Monthly Accelerator Budget"
              value={extraMonthlyBudget}
              onChange={(val) => setExtraMonthlyBudget(val)}
              min={0}
              max={10000}
              step={25}
              prefix="$"
              className="w-56"
            />

            <button
              type="button"
              onClick={addDebt}
              disabled={debts.length >= 8}
              className="flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shrink-0 mt-4 sm:mt-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Debt
            </button>
          </div>
        </div>

        {/* Dynamic Debt Accounts List */}
        <div className="space-y-3">
          {debts.map((debt, index) => (
            <div
              key={debt.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 items-center text-xs"
            >
              <div className="sm:col-span-4">
                <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Debt Name</label>
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Balance ($)</label>
                <input
                  type="number"
                  value={debt.balance}
                  onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                  min={0}
                  step={50}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">APR (%)</label>
                <input
                  type="number"
                  value={debt.rate}
                  onChange={(e) => updateDebt(debt.id, 'rate', Number(e.target.value))}
                  min={0}
                  max={45}
                  step={0.1}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Min Pmt ($/mo)</label>
                <input
                  type="number"
                  value={debt.minPayment}
                  onChange={(e) => updateDebt(debt.id, 'minPayment', Number(e.target.value))}
                  min={0}
                  step={5}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeDebt(debt.id)}
                  disabled={debts.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 transition"
                  title="Remove Debt"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy Comparison Cards: Snowball vs Avalanche vs Minimum Only */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avalanche Card (Mathematically Optimal) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-teal-500 dark:border-teal-500/80 shadow-md space-y-4 relative">
          <div className="absolute -top-3 right-4 bg-teal-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
            Fastest &amp; Most Cost-Effective
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Debt Avalanche Method</h4>
          </div>
          <p className="text-[11px] text-slate-500">
            Prioritizes highest interest rate (APR) debts first. Mathematically minimizes total interest paid.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Debt-Free Timeline:</span>
              <strong className="text-teal-600 dark:text-teal-400 font-mono font-bold">
                {Math.floor(simulation.avalanche.months / 12)}y {simulation.avalanche.months % 12}m (
                {simulation.avalanche.months} mos)
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Interest Paid:</span>
              <strong className="text-slate-900 dark:text-white font-mono font-bold">
                ${formatCurrency(simulation.avalanche.totalInterest)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Interest Saved vs Snowball:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                +${formatCurrency(simulation.interestSavedByAvalancheVsSnowball)}
              </strong>
            </div>
          </div>
        </div>

        {/* Snowball Card (Psychological Momentum) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Debt Snowball Method</h4>
          </div>
          <p className="text-[11px] text-slate-500">
            Prioritizes lowest balances first. Builds quick psychological wins to keep you motivated.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Debt-Free Timeline:</span>
              <strong className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                {Math.floor(simulation.snowball.months / 12)}y {simulation.snowball.months % 12}m (
                {simulation.snowball.months} mos)
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Interest Paid:</span>
              <strong className="text-slate-900 dark:text-white font-mono font-bold">
                ${formatCurrency(simulation.snowball.totalInterest)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Interest Saved vs Minimum:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                +${formatCurrency(simulation.minOnly.totalInterest - simulation.snowball.totalInterest)}
              </strong>
            </div>
          </div>
        </div>

        {/* Minimum Payments Only Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 opacity-80">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Minimum Payments Only</h4>
          </div>
          <p className="text-[11px] text-slate-500">
            No extra budget. Minimum payments with no snowball rolling effect.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Debt-Free Timeline:</span>
              <strong className="text-rose-600 font-mono font-bold">
                {Math.floor(simulation.minOnly.months / 12)}y {simulation.minOnly.months % 12}m (
                {simulation.minOnly.months} mos)
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Interest Paid:</span>
              <strong className="text-rose-600 font-mono font-bold">
                ${formatCurrency(simulation.minOnly.totalInterest)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Excess Waste:</span>
              <span className="text-rose-600 font-mono font-bold">
                +${formatCurrency(simulation.interestSavedByAvalancheVsMinOnly)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payoff Trajectory Comparison Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-500" />
          Debt Balance Payoff Curves (Snowball vs Avalanche)
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={simulation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="avalancheGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="snowballGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Area
                type="monotone"
                dataKey="snowball"
                name="Debt Snowball (Lowest Balance First)"
                stroke="#6366f1"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#snowballGrad)"
              />
              <Area
                type="monotone"
                dataKey="avalanche"
                name="Debt Avalanche (Highest APR First)"
                stroke="#0d9488"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#avalancheGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
