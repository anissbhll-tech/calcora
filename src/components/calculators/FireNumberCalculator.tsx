import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency } from '../../lib/mathUtils';
import { Flame, TrendingUp, Calendar, DollarSign, Target, ShieldCheck, PieChart, Sparkles } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

export const FireNumberCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [annualExpenses, setAnnualExpenses] = useState<number>(60000);
  const [currentNetWorth, setCurrentNetWorth] = useState<number>(120000);
  const [annualSavings, setAnnualSavings] = useState<number>(30000);
  const [swrPercent, setSwrPercent] = useState<number>(4.0); // 4% rule
  const [realReturnRate, setRealReturnRate] = useState<number>(7.0); // 7% after inflation
  const [currentAge, setCurrentAge] = useState<number>(32);

  const calculation = useMemo(() => {
    const expenses = Math.max(0, safeParseNumber(annualExpenses, 0));
    const currentPortfolio = Math.max(0, safeParseNumber(currentNetWorth, 0));
    const savings = Math.max(0, safeParseNumber(annualSavings, 0));
    const swr = Math.max(0.1, safeParseNumber(swrPercent, 4.0)) / 100;
    const r = Math.max(0.001, safeParseNumber(realReturnRate, 7.0)) / 100;
    const age = Math.max(16, safeParseNumber(currentAge, 30));

    // Standard FIRE Target (100% of expenses)
    const fireNumber = swr > 0 ? expenses / swr : 0;
    const monthlyPassiveIncome = fireNumber * (swr / 12);

    // Multi-tier FIRE targets
    const leanExpenses = expenses * 0.75;
    const leanFireNumber = leanExpenses / swr;
    
    const fatExpenses = expenses * 1.40;
    const fatFireNumber = fatExpenses / swr;

    // Coast FIRE target (assuming traditional retirement at age 65)
    const yearsTo65 = Math.max(1, 65 - age);
    const coastFireNumber = fireNumber / Math.pow(1 + r, yearsTo65);

    // Progress percentage
    const progressPercent = fireNumber > 0 ? Math.min(100, (currentPortfolio / fireNumber) * 100) : 0;

    // Years to FIRE calculation using analytical compound log formula:
    // FV = PV*(1+r)^t + S*((1+r)^t - 1)/r
    // => (1+r)^t * (PV + S/r) = FV + S/r
    // => t = ln((FV + S/r) / (PV + S/r)) / ln(1+r)
    let yearsToFire = 0;
    let monthsToFire = 0;
    let isAlreadyReached = false;

    if (currentPortfolio >= fireNumber && fireNumber > 0) {
      yearsToFire = 0;
      monthsToFire = 0;
      isAlreadyReached = true;
    } else if (fireNumber > 0) {
      const numerator = fireNumber + (savings / r);
      const denominator = currentPortfolio + (savings / r);

      if (denominator > 0 && numerator / denominator > 0) {
        yearsToFire = Math.log(numerator / denominator) / Math.log(1 + r);
        yearsToFire = Math.max(0, yearsToFire);
        monthsToFire = Math.round((yearsToFire % 1) * 12);
      }
    }

    const fireAge = age + yearsToFire;

    // Year-by-year schedule simulation (capped at 40 years for visualization)
    const maxYears = Math.min(40, Math.ceil(yearsToFire) + 2);
    const timeline = [];
    let runningBalance = currentPortfolio;

    for (let yr = 0; yr <= maxYears; yr++) {
      const yearAge = age + yr;
      const pctReached = fireNumber > 0 ? Math.min(100, (runningBalance / fireNumber) * 100) : 0;
      const isFireMilestone = runningBalance >= fireNumber;

      timeline.push({
        year: yr,
        age: yearAge,
        startingBalance: runningBalance,
        contributions: yr > 0 ? savings : 0,
        growth: yr > 0 ? runningBalance * r : 0,
        endingBalance: yr === 0 ? runningBalance : runningBalance * (1 + r) + savings,
        pctReached,
        isFireMilestone,
      });

      if (yr > 0) {
        runningBalance = runningBalance * (1 + r) + savings;
      }
    }

    return {
      expenses,
      currentPortfolio,
      savings,
      swrPercent: swr * 100,
      realReturnRate: r * 100,
      currentAge: age,
      fireNumber,
      monthlyPassiveIncome,
      leanFireNumber,
      fatFireNumber,
      coastFireNumber,
      progressPercent,
      yearsToFire,
      monthsToFire,
      fireAge,
      isAlreadyReached,
      timeline,
    };
  }, [annualExpenses, currentNetWorth, annualSavings, swrPercent, realReturnRate, currentAge]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `FIRE Target: ${formatCurrency(calculation.fireNumber, '$', 0)} in ${calculation.yearsToFire.toFixed(1)} yrs (Age ${calculation.fireAge.toFixed(1)})`,
        {
          annualExpenses,
          currentNetWorth,
          annualSavings,
          swrPercent,
          realReturnRate,
          currentAge,
        },
        {
          fireNumber: calculation.fireNumber,
          yearsToFire: calculation.yearsToFire,
          fireAge: calculation.fireAge,
          progressPercent: calculation.progressPercent,
          monthlyPassiveIncome: calculation.monthlyPassiveIncome,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="space-y-4">
          <CalcInput
            id="annualExpenses"
            label="Annual Retirement Living Expenses"
            value={annualExpenses}
            onChange={(val) => setAnnualExpenses(val)}
            min={1000}
            step={2500}
            prefix="$"
            helpText="Projected total annual spending needed in financial independence."
          />

          <CalcInput
            id="currentNetWorth"
            label="Current Invested Portfolio"
            value={currentNetWorth}
            onChange={(val) => setCurrentNetWorth(val)}
            min={0}
            step={5000}
            prefix="$"
            helpText="Liquid assets (stocks, index funds, 401k, IRAs, brokerage)."
          />

          <CalcInput
            id="annualSavings"
            label="Annual New Savings & Investments"
            value={annualSavings}
            onChange={(val) => setAnnualSavings(val)}
            min={0}
            step={1000}
            prefix="$"
            helpText="Total new funds contributed to investment portfolio per year."
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Safe Withdrawal Rate (SWR) Preset
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '3.0% (Ultra-Safe)', val: 3.0 },
                { label: '3.5% (Conservative)', val: 3.5 },
                { label: '4.0% (Trinity Rule)', val: 4.0 },
                { label: '4.5% (Aggressive)', val: 4.5 },
              ].map((tier) => (
                <button
                  key={tier.val}
                  type="button"
                  onClick={() => setSwrPercent(tier.val)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                    swrPercent === tier.val
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  {tier.val}%
                </button>
              ))}
            </div>
          </div>

          <CalcInput
            id="realReturnRate"
            label="Expected Real Annual Return (% after inflation)"
            value={realReturnRate}
            onChange={(val) => setRealReturnRate(val)}
            min={0.5}
            max={15}
            step={0.5}
            suffix="%"
            helpText="Historically, US broad stock index funds have returned ~7% real (net of inflation)."
          />

          <CalcInput
            id="currentAge"
            label="Current Age"
            value={currentAge}
            onChange={(val) => setCurrentAge(val)}
            min={16}
            max={90}
            step={1}
            suffix="yrs"
            helpText="Used to project your target FIRE retirement age and Coast FIRE threshold."
          />
        </div>
      </div>

      {/* Primary KPI Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="FIRE Target Portfolio"
          value={formatCurrency(calculation.fireNumber, '$', 0)}
          subtitle={`Based on ${calculation.swrPercent}% SWR (${Math.round(100 / calculation.swrPercent)}x expenses)`}
          highlighted={true}
          icon={<Flame className="w-5 h-5" />}
        />

        <CalcResultCard
          title="Timeline to Freedom"
          value={
            calculation.isAlreadyReached
              ? 'Achieved!'
              : `${calculation.yearsToFire.toFixed(1)} Years`
          }
          subtitle={
            calculation.isAlreadyReached
              ? 'Portfolio exceeds FIRE target'
              : `Retire at Age ~${calculation.fireAge.toFixed(1)}`
          }
          icon={<Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Safe Monthly Cash Flow"
          value={formatCurrency(calculation.monthlyPassiveIncome, '$', 0)}
          subtitle="Perpetual inflation-adjusted income"
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Current Goal Progress"
          value={`${calculation.progressPercent.toFixed(1)}%`}
          subtitle={`${formatCurrency(calculation.currentPortfolio, '$', 0)} of ${formatCurrency(calculation.fireNumber, '$', 0)}`}
          icon={<Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Progress Bar Visualizer */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Financial Independence Portfolio Gauge
          </span>
          <span className="text-teal-600 dark:text-teal-400 font-bold">
            {calculation.progressPercent.toFixed(1)}% Completed
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(3, calculation.progressPercent))}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Current: {formatCurrency(calculation.currentPortfolio, '$', 0)}</span>
          <span>Goal: {formatCurrency(calculation.fireNumber, '$', 0)}</span>
        </div>
      </div>

      {/* Multi-Tier FIRE Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Lean FIRE</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">75% Budget</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">
            {formatCurrency(calculation.leanFireNumber, '$', 0)}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Covers basic essentials ({formatCurrency(calculation.expenses * 0.75, '$', 0)}/yr) with minimalist spending.
          </p>
        </div>

        <div className="bg-teal-50/50 dark:bg-teal-950/20 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Standard FIRE</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">100% Budget</span>
          </div>
          <p className="text-xl font-bold text-teal-900 dark:text-teal-100 font-mono">
            {formatCurrency(calculation.fireNumber, '$', 0)}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Maintains full current lifestyle ({formatCurrency(calculation.expenses, '$', 0)}/yr) in perpetuity.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Coast FIRE Target</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">At Age {calculation.currentAge}</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">
            {formatCurrency(calculation.coastFireNumber, '$', 0)}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Amount needed today to compound to full FIRE by age 65 with zero additional contributions.
          </p>
        </div>
      </div>

      {/* Yearly Milestone Timeline Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-500" />
            FIRE Portfolio Growth Simulation Schedule
          </h3>
          <span className="text-xs text-slate-500">
            Real Return: <strong>{calculation.realReturnRate}%/yr</strong> | Savings: <strong>{formatCurrency(calculation.savings, '$', 0)}/yr</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Year</th>
                <th className="py-2.5 px-3 font-semibold">Age</th>
                <th className="py-2.5 px-3 font-semibold">Annual Contributions</th>
                <th className="py-2.5 px-3 font-semibold">Investment Growth</th>
                <th className="py-2.5 px-3 font-semibold">Portfolio Balance</th>
                <th className="py-2.5 px-3 font-semibold text-right">% of FIRE Goal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.timeline.slice(0, 15).map((row) => (
                <tr
                  key={row.year}
                  className={`transition-colors ${
                    row.isFireMilestone
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 font-medium text-emerald-900 dark:text-emerald-300'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono font-bold">
                    {row.year === 0 ? 'Today' : `Year ${row.year}`}
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    {row.age}
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    {row.year === 0 ? '—' : formatCurrency(row.contributions, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-teal-600 dark:text-teal-400">
                    {row.year === 0 ? '—' : formatCurrency(row.growth, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {formatCurrency(row.endingBalance, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md ${
                        row.pctReached >= 100
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {row.pctReached.toFixed(1)}%
                    </span>
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
