import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { PiggyBank, DollarSign, Calendar, TrendingUp, Sparkles, Percent, Target, ArrowRight } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const SavingsGoalTimelineCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [calcMode, setCalcMode] = useState<'needed_deposit' | 'time_needed'>('needed_deposit');
  const [targetGoal, setTargetGoal] = useState<number>(() => initialPreset?.targetGoal ?? 50000);
  const [initialBalance, setInitialBalance] = useState<number>(() => initialPreset?.initialBalance ?? 5000);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(() => initialPreset?.annualReturnRate ?? 5.5);
  const [targetYears, setTargetYears] = useState<number>(5);
  const [fixedMonthlyDeposit, setFixedMonthlyDeposit] = useState<number>(650);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [adjustForInflation, setAdjustForInflation] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const goal = Math.max(100, safeParseNumber(targetGoal, 50000));
    const initial = Math.max(0, safeParseNumber(initialBalance, 0));
    const nominalRate = Math.max(0, safeParseNumber(annualReturnRate, 5.5)) / 100;
    const inflRate = safeParseNumber(inflationRate, 2.5) / 100;

    // Effective rate
    const effAnnualRate = adjustForInflation
      ? (1 + nominalRate) / (1 + inflRate) - 1
      : nominalRate;
    const r = Math.max(-0.05, effAnnualRate) / 12;

    let requiredMonthly = 0;
    let totalMonths = 0;
    let totalDeposits = initial;
    let totalInterest = 0;

    if (calcMode === 'needed_deposit') {
      const yrs = Math.max(0.5, Math.min(40, safeParseNumber(targetYears, 5)));
      totalMonths = Math.round(yrs * 12);

      // FV = Initial * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
      if (Math.abs(r) < 0.000001) {
        requiredMonthly = Math.max(0, (goal - initial) / totalMonths);
      } else {
        const fvInitial = initial * Math.pow(1 + r, totalMonths);
        const remainingNeeded = goal - fvInitial;
        if (remainingNeeded <= 0) {
          requiredMonthly = 0;
        } else {
          requiredMonthly = (remainingNeeded * r) / (Math.pow(1 + r, totalMonths) - 1);
        }
      }

      totalDeposits = initial + requiredMonthly * totalMonths;
      totalInterest = Math.max(0, goal - totalDeposits);
    } else {
      // Find timeline given fixed monthly deposit
      const pmt = Math.max(1, safeParseNumber(fixedMonthlyDeposit, 650));
      requiredMonthly = pmt;

      if (initial >= goal) {
        totalMonths = 0;
        totalDeposits = initial;
        totalInterest = 0;
      } else {
        let simBal = initial;
        while (simBal < goal && totalMonths < 600) {
          totalMonths++;
          const intThisMonth = simBal * r;
          simBal += pmt + intThisMonth;
          totalInterest += intThisMonth;
        }
        totalDeposits = initial + pmt * totalMonths;
      }
    }

    // Chart trajectory data
    const chartData = [];
    const schedule: { year: number; deposits: number; interest: number; balance: number }[] = [];
    let runningBal = initial;
    let runningDeposits = initial;
    let runningInterest = 0;

    const maxM = Math.min(360, Math.max(12, totalMonths));
    const step = maxM > 60 ? 6 : maxM > 24 ? 3 : 1;

    chartData.push({
      month: 'Start',
      monthNum: 0,
      principal: Math.round(initial),
      interest: 0,
      totalBalance: Math.round(initial),
      goal: Math.round(goal),
    });

    for (let m = 1; m <= maxM; m++) {
      const intMonth = runningBal * r;
      runningInterest += intMonth;
      runningDeposits += requiredMonthly;
      runningBal = runningDeposits + runningInterest;

      if (m % 12 === 0 || m === maxM) {
        schedule.push({
          year: Math.ceil(m / 12),
          deposits: Math.round(runningDeposits),
          interest: Math.round(runningInterest),
          balance: Math.round(runningBal),
        });
      }

      if (m % step === 0 || m === maxM) {
        chartData.push({
          month: `M${m}`,
          monthNum: m,
          principal: Math.round(runningDeposits),
          interest: Math.round(runningInterest),
          totalBalance: Math.round(runningBal),
          goal: Math.round(goal),
        });
      }
    }

    const interestSharePercent = goal > 0 ? (totalInterest / goal) * 100 : 0;

    return {
      goal,
      initial,
      requiredMonthly,
      totalMonths,
      yearsToGoal: (totalMonths / 12).toFixed(1),
      totalDeposits,
      totalInterest,
      interestSharePercent,
      schedule,
      chartData,
    };
  }, [
    calcMode,
    targetGoal,
    initialBalance,
    annualReturnRate,
    targetYears,
    fixedMonthlyDeposit,
    inflationRate,
    adjustForInflation,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Savings Goal: Target $${formatNumber(calculation.goal)} reached in ${calculation.yearsToGoal} yrs ($${formatCurrency(calculation.requiredMonthly)}/mo @ ${annualReturnRate}% return, $${formatCurrency(calculation.totalInterest)} compound gain)`,
        { targetGoal, initialBalance, annualReturnRate, targetYears, fixedMonthlyDeposit },
        {
          requiredMonthly: calculation.requiredMonthly,
          totalMonths: calculation.totalMonths,
          totalInterest: calculation.totalInterest,
          totalDeposits: calculation.totalDeposits,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Target Savings Goal &amp; Compound Growth Plan
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {calcMode === 'needed_deposit' ? (
              <>
                To save <strong className="font-mono font-bold">${formatCurrency(calculation.goal)}</strong> in{' '}
                <strong>{targetYears} years</strong>, you need to deposit{' '}
                <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono text-base">
                  ${formatCurrency(calculation.requiredMonthly)}/mo
                </strong>
                . Compound growth provides{' '}
                <strong className="text-teal-600 font-bold font-mono">
                  ${formatCurrency(calculation.totalInterest)}
                </strong>{' '}
                ({calculation.interestSharePercent.toFixed(1)}% of your goal)!
              </>
            ) : (
              <>
                At <strong className="font-mono font-bold">${formatCurrency(fixedMonthlyDeposit)}/mo</strong>, you will
                reach your <strong>${formatCurrency(calculation.goal)}</strong> goal in{' '}
                <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono text-base">
                  {Math.floor(calculation.totalMonths / 12)} yrs {calculation.totalMonths % 12} mos
                </strong>{' '}
                ({calculation.totalMonths} months).
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {calcMode === 'needed_deposit' ? 'Required Monthly Deposit' : 'Timeline to Reach Goal'}
            </span>
            <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {calcMode === 'needed_deposit'
                ? `$${formatCurrency(calculation.requiredMonthly)}/mo`
                : `${calculation.yearsToGoal} Years`}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Goals & Starting Bal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Savings Goal &amp; Starting Balance
            </h4>
          </div>

          <CalcInput
            id="targetGoal"
            label="Target Savings Goal Amount"
            value={targetGoal}
            onChange={(val) => setTargetGoal(val)}
            min={500}
            max={5000000}
            step={500}
            prefix="$"
          />

          <CalcInput
            id="initialBalance"
            label="Current Starting Balance"
            value={initialBalance}
            onChange={(val) => setInitialBalance(val)}
            min={0}
            max={1000000}
            step={250}
            prefix="$"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Strategy Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCalcMode('needed_deposit')}
                className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
                  calcMode === 'needed_deposit'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Find Required Monthly Savings
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('time_needed')}
                className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
                  calcMode === 'time_needed'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Find Timeline for Fixed Budget
              </button>
            </div>
          </div>
        </div>

        {/* Right: Timeline / Deposit & Growth Rate */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Timeline &amp; Interest Return
            </h4>
          </div>

          {calcMode === 'needed_deposit' ? (
            <CalcInput
              id="targetYears"
              label="Target Timeframe (Years)"
              value={targetYears}
              onChange={(val) => setTargetYears(val)}
              min={0.5}
              max={40}
              step={0.5}
              suffix="yrs"
              helpText={`${Math.round(targetYears * 12)} months`}
            />
          ) : (
            <CalcInput
              id="fixedMonthlyDeposit"
              label="Fixed Monthly Contribution"
              value={fixedMonthlyDeposit}
              onChange={(val) => setFixedMonthlyDeposit(val)}
              min={10}
              max={50000}
              step={25}
              prefix="$"
            />
          )}

          <CalcInput
            id="annualReturnRate"
            label="Annual Expected Return / APY"
            value={annualReturnRate}
            onChange={(val) => setAnnualReturnRate(val)}
            min={0}
            max={15}
            step={0.25}
            suffix="%"
            helpText="e.g. 4.5% HYSA, 7.5% balanced portfolio, 10% S&P 500 index"
          />

          <div className="pt-1 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={adjustForInflation}
                onChange={(e) => setAdjustForInflation(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              Adjust for Inflation ({inflationRate}%/yr)
            </label>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title={calcMode === 'needed_deposit' ? 'Monthly Deposit Needed' : 'Time Horizon to Goal'}
          value={
            calcMode === 'needed_deposit'
              ? `$${formatCurrency(calculation.requiredMonthly)}`
              : `${calculation.yearsToGoal} Years`
          }
          subtitle={
            calcMode === 'needed_deposit'
              ? `Deposited consistently for ${targetYears} years`
              : `${calculation.totalMonths} total monthly contributions`
          }
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Compound Interest Earned"
          value={`+$${formatCurrency(calculation.totalInterest)}`}
          subtitle={`${calculation.interestSharePercent.toFixed(1)}% of your goal funded by interest`}
          icon={<TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Your Total Contributions"
          value={`$${formatCurrency(calculation.totalDeposits)}`}
          subtitle={`$${formatNumber(initialBalance)} start + $${formatNumber(Math.round(calculation.requiredMonthly * calculation.totalMonths))} monthly deposits`}
          icon={<PiggyBank className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Target Final Goal"
          value={`$${formatCurrency(calculation.goal)}`}
          subtitle={adjustForInflation ? 'In real purchasing power terms' : 'Nominal future goal value'}
          icon={<Target className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        />
      </div>

      {/* Visual Stacked Area Chart (Principal vs Interest) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-500" />
          Savings Accumulation Growth: Principal vs Compound Returns
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="savingsPrincipalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="savingsInterestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
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
                dataKey="goal"
                name="Target Goal ($)"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={0}
              />
              <Area
                type="monotone"
                dataKey="principal"
                name="Principal Deposited ($)"
                stackId="1"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#savingsPrincipalGrad)"
              />
              <Area
                type="monotone"
                dataKey="interest"
                name="Compound Interest Earned ($)"
                stackId="1"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#savingsInterestGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Annual Milestone Schedule Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Annual Savings Milestones</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Timeline</th>
                <th className="py-2.5 px-3">Your Contributions</th>
                <th className="py-2.5 px-3">Compound Interest</th>
                <th className="py-2.5 px-3 text-right">Total Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {calculation.schedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                    Year {row.year}
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">
                    ${row.deposits.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                    +${row.interest.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-black text-slate-900 dark:text-white">
                    ${row.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
