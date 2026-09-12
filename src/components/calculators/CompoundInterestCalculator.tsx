import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { TrendingUp, PiggyBank, Percent, Calendar, DollarSign, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { BaseCalculatorProps } from './index';

type CompoundingFrequency = 1 | 2 | 4 | 12 | 365;
type DepositTiming = 'end' | 'beginning';

export const CompoundInterestCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [initialPrincipal, setInitialPrincipal] = useState<number>(() => initialPreset?.initialDeposit ?? 10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(() => initialPreset?.monthlyContribution ?? 500);
  const [annualRate, setAnnualRate] = useState<number>(() => initialPreset?.annualRate ?? 8.0);
  const [investmentYears, setInvestmentYears] = useState<number>(() => initialPreset?.years ?? 25);
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundingFrequency>(() => initialPreset?.compoundFrequency ?? 12);
  const [depositTiming, setDepositTiming] = useState<DepositTiming>('end');
  const [inflationRate, setInflationRate] = useState<number>(2.5);

  const calculation = useMemo(() => {
    const P = Math.max(0, safeParseNumber(initialPrincipal, 10000));
    const PMT = Math.max(0, safeParseNumber(monthlyContribution, 500));
    const r = Math.max(0, safeParseNumber(annualRate, 8.0)) / 100;
    const t = Math.max(1, Math.min(60, safeParseNumber(investmentYears, 25)));
    const n = compoundFrequency;
    const inf = Math.max(0, safeParseNumber(inflationRate, 2.5)) / 100;

    const yearlyData = [];
    let currentBalance = P;
    let totalDeposits = P;

    const ratePerPeriod = r / n;
    // periods per month
    const periodsPerMonth = n / 12;

    yearlyData.push({
      year: 0,
      label: 'Year 0',
      balance: Math.round(P),
      deposits: Math.round(P),
      interest: 0,
      annualInterest: 0,
      realBalance: Math.round(P),
    });

    for (let yr = 1; yr <= t; yr++) {
      const startOfYearBalance = currentBalance;
      const startOfYearDeposits = totalDeposits;

      if (n === 12) {
        // Standard monthly compounding
        for (let m = 1; m <= 12; m++) {
          if (depositTiming === 'beginning') {
            currentBalance += PMT;
            totalDeposits += PMT;
            currentBalance *= (1 + ratePerPeriod);
          } else {
            currentBalance *= (1 + ratePerPeriod);
            currentBalance += PMT;
            totalDeposits += PMT;
          }
        }
      } else {
        // Daily, quarterly, semi-annual, or annual compounding with monthly contributions
        for (let m = 1; m <= 12; m++) {
          if (depositTiming === 'beginning') {
            currentBalance += PMT;
            totalDeposits += PMT;
            currentBalance *= Math.pow(1 + ratePerPeriod, periodsPerMonth);
          } else {
            currentBalance *= Math.pow(1 + ratePerPeriod, periodsPerMonth);
            currentBalance += PMT;
            totalDeposits += PMT;
          }
        }
      }

      const interestThisYear = currentBalance - startOfYearBalance - (totalDeposits - startOfYearDeposits);
      const totalInterest = currentBalance - totalDeposits;
      const realPurchasingPower = currentBalance / Math.pow(1 + inf, yr);

      yearlyData.push({
        year: yr,
        label: `Yr ${yr}`,
        balance: Math.round(currentBalance),
        deposits: Math.round(totalDeposits),
        interest: Math.max(0, Math.round(totalInterest)),
        annualInterest: Math.max(0, Math.round(interestThisYear)),
        realBalance: Math.round(realPurchasingPower),
      });
    }

    const finalBalance = yearlyData[yearlyData.length - 1].balance;
    const finalDeposits = yearlyData[yearlyData.length - 1].deposits;
    const finalInterest = yearlyData[yearlyData.length - 1].interest;
    const finalRealBalance = yearlyData[yearlyData.length - 1].realBalance;
    const wealthMultiplier = finalDeposits > 0 ? (finalBalance / finalDeposits).toFixed(2) : '1.00';
    const interestPercentage = finalBalance > 0 ? ((finalInterest / finalBalance) * 100).toFixed(1) : '0';

    return {
      finalBalance,
      finalDeposits,
      finalInterest,
      finalRealBalance,
      wealthMultiplier,
      interestPercentage,
      yearlyData,
    };
  }, [initialPrincipal, monthlyContribution, annualRate, investmentYears, compoundFrequency, depositTiming, inflationRate]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Compound Growth: $${calculation.finalBalance.toLocaleString()} (${calculation.wealthMultiplier}x) over ${investmentYears} yrs @ ${annualRate}%`,
        {
          initialPrincipal,
          monthlyContribution,
          annualRate,
          investmentYears,
          compoundFrequency,
          depositTiming,
        },
        {
          finalBalance: calculation.finalBalance,
          totalDeposits: calculation.finalDeposits,
          interestEarned: calculation.finalInterest,
          realPurchasingPower: calculation.finalRealBalance,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Long-Term Compound Wealth Projection
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Investing{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono">
              ${formatNumber(monthlyContribution)}/mo
            </strong>{' '}
            with an initial{' '}
            <strong className="font-mono font-bold">${formatNumber(initialPrincipal)}</strong>{' '}
            over <strong className="font-bold">{investmentYears} years</strong> yields a future portfolio of{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono text-base">
              ${formatCurrency(calculation.finalBalance)}
            </strong>{' '}
            ({calculation.interestPercentage}% from pure compound interest).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Wealth Multiplier
            </span>
            <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {calculation.wealthMultiplier}x
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Contributions & Returns */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Principal &amp; Contribution Inputs
            </h4>
          </div>

          <CalcInput
            id="initialPrincipal"
            label="Initial Starting Principal"
            value={initialPrincipal}
            onChange={(val) => setInitialPrincipal(val)}
            min={0}
            max={10000000}
            step={500}
            prefix="$"
          />

          <CalcInput
            id="monthlyContribution"
            label="Monthly Recurring Contribution"
            value={monthlyContribution}
            onChange={(val) => setMonthlyContribution(val)}
            min={0}
            max={500000}
            step={50}
            prefix="$"
            helpText="Recurring deposits added every month."
          />

          <CalcInput
            id="annualRate"
            label="Estimated Annual Interest / Return Rate"
            value={annualRate}
            onChange={(val) => setAnnualRate(val)}
            min={0}
            max={35}
            step={0.1}
            suffix="%"
            helpText="S&P 500 historical average nominal return: ~10%."
          />
        </div>

        {/* Right: Time Horizon & Compounding Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Time Horizon &amp; Compounding Frequency
            </h4>
          </div>

          <CalcInput
            id="investmentYears"
            label="Investment Time Horizon"
            value={investmentYears}
            onChange={(val) => setInvestmentYears(val)}
            min={1}
            max={50}
            step={1}
            suffix="years"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Compounding Frequency
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {[
                { label: 'Annually', freq: 1 },
                { label: 'Quarterly', freq: 4 },
                { label: 'Monthly', freq: 12 },
                { label: 'Daily', freq: 365 },
              ].map((item) => (
                <button
                  key={item.freq}
                  type="button"
                  onClick={() => setCompoundFrequency(item.freq as CompoundingFrequency)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    compoundFrequency === item.freq
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Deposit Timing
              </label>
              <div className="grid grid-cols-2 gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setDepositTiming('end')}
                  className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    depositTiming === 'end' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  End of Mo
                </button>
                <button
                  type="button"
                  onClick={() => setDepositTiming('beginning')}
                  className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    depositTiming === 'beginning' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Start of Mo
                </button>
              </div>
            </div>

            <CalcInput
              id="inflationRate"
              label="Assumed Inflation Rate"
              value={inflationRate}
              onChange={(val) => setInflationRate(val)}
              min={0}
              max={12}
              step={0.1}
              suffix="%"
            />
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Future Portfolio Value"
          value={`$${formatCurrency(calculation.finalBalance)}`}
          subtitle={`After ${investmentYears} years of compounding`}
          highlighted={true}
          icon={<TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Total Principal Contributed"
          value={`$${formatCurrency(calculation.finalDeposits)}`}
          subtitle={`Initial ($${formatNumber(initialPrincipal)}) + Monthly deposits`}
          icon={<PiggyBank className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Total Interest Earned"
          value={`$${formatCurrency(calculation.finalInterest)}`}
          subtitle={`${calculation.interestPercentage}% of total portfolio balance`}
          icon={<Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Inflation-Adjusted Real Value"
          value={`$${formatCurrency(calculation.finalRealBalance)}`}
          subtitle={`Purchasing power at ${inflationRate}% annual inflation`}
          icon={<Flame className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Recharts Visual Growth Curve */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-500" />
            Compound Interest vs. Principal Growth Trajectory
          </h3>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded-xs bg-slate-300 dark:bg-slate-700" />
              Total Principal Contributed
            </span>
            <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold">
              <span className="w-3 h-3 rounded-xs bg-teal-500" />
              Total Balance (with Interest)
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="depositsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11 }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                labelFormatter={(lbl) => `Timeline: ${lbl}`}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                name="Total Portfolio Balance"
                stroke="#0d9488"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#balanceGrad)"
              />
              <Area
                type="monotone"
                dataKey="deposits"
                name="Principal Contributed"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#depositsGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Year-by-Year Amortization Schedule Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          Year-by-Year Compound Growth &amp; Interest Breakdown
        </h3>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-xs text-left">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Year</th>
                <th className="py-2.5 px-3 font-semibold">Total Deposits</th>
                <th className="py-2.5 px-3 font-semibold">Annual Interest</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative Interest</th>
                <th className="py-2.5 px-3 font-semibold">Ending Balance</th>
                <th className="py-2.5 px-3 font-semibold">Inflation-Adjusted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.yearlyData.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                    Year {row.year}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ${row.deposits.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    +${row.annualInterest.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 font-mono text-emerald-700 dark:text-emerald-300">
                    ${row.interest.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    ${row.balance.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-500 dark:text-slate-400">
                    ${row.realBalance.toLocaleString()}
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
