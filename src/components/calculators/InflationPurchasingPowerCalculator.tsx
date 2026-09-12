import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatPercent, formatNumber } from '../../lib/mathUtils';
import { TrendingDown, TrendingUp, ShieldAlert, Sparkles, HelpCircle, DollarSign, Clock, ArrowRightLeft } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const InflationPurchasingPowerCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [initialAmount, setInitialAmount] = useState<number>(() => initialPreset?.initialAmount ?? 50000);
  const [inflationRate, setInflationRate] = useState<number>(() => initialPreset?.inflationRate ?? 3.2);
  const [investmentReturnRate, setInvestmentReturnRate] = useState<number>(() => initialPreset?.investmentReturnRate ?? 0);
  const [years, setYears] = useState<number>(() => initialPreset?.years ?? 15);

  const calculation = useMemo(() => {
    const amount = Math.max(1, safeParseNumber(initialAmount, 50000));
    const infRate = Math.max(0, Math.min(50, safeParseNumber(inflationRate, 3.2))) / 100;
    const invRate = Math.max(0, Math.min(50, safeParseNumber(investmentReturnRate, 0))) / 100;
    const yrs = Math.max(1, Math.min(50, safeParseNumber(years, 15)));

    // Future purchasing power of today's $Amount = Amount / (1 + infRate)^yrs
    const futurePurchasingPower = amount / Math.pow(1 + infRate, yrs);

    // Future nominal cost to purchase the exact same basket of goods
    const futureCostToBuySame = amount * Math.pow(1 + infRate, yrs);

    // Cumulative purchasing power loss
    const purchasingPowerLossDollars = amount - futurePurchasingPower;
    const purchasingPowerLossPercent = (purchasingPowerLossDollars / amount) * 100;

    // Rule of 70 / 72: Years until purchasing power drops by 50%
    const yearsToCutInHalf = infRate > 0 ? 72 / (infRate * 100) : 999;

    // Investment comparison (if nominal return provided)
    const nominalFuturePortfolio = amount * Math.pow(1 + invRate, yrs);
    const realFuturePortfolio = nominalFuturePortfolio / Math.pow(1 + infRate, yrs);
    const realReturnRate = invRate > 0 ? ((1 + invRate) / (1 + infRate) - 1) * 100 : -(infRate * 100);

    // Year-by-year curve data
    const schedule = [];
    for (let y = 0; y <= yrs; y++) {
      const realValueUninvested = amount / Math.pow(1 + infRate, y);
      const futureCost = amount * Math.pow(1 + infRate, y);
      const investedNominal = amount * Math.pow(1 + invRate, y);
      const investedReal = investedNominal / Math.pow(1 + infRate, y);

      schedule.push({
        year: y,
        label: `Yr ${y}`,
        'Real Cash Buying Power': Math.round(realValueUninvested),
        'Cost to Buy Same Goods': Math.round(futureCost),
        'Invested Real Value': Math.round(investedReal),
      });
    }

    return {
      amount,
      infRatePercent: infRate * 100,
      invRatePercent: invRate * 100,
      yrs,
      futurePurchasingPower,
      futureCostToBuySame,
      purchasingPowerLossDollars,
      purchasingPowerLossPercent,
      yearsToCutInHalf,
      nominalFuturePortfolio,
      realFuturePortfolio,
      realReturnRate,
      schedule,
    };
  }, [initialAmount, inflationRate, investmentReturnRate, years]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Inflation Analysis: $${formatCurrency(calculation.amount)} over ${calculation.yrs} yrs @ ${calculation.infRatePercent.toFixed(1)}% inflation → Buying power drops to $${formatCurrency(calculation.futurePurchasingPower)} (${calculation.purchasingPowerLossPercent.toFixed(1)}% loss)`,
        { initialAmount, inflationRate, investmentReturnRate, years },
        {
          futurePurchasingPower: calculation.futurePurchasingPower,
          futureCostToBuySame: calculation.futureCostToBuySame,
          purchasingPowerLossPercent: calculation.purchasingPowerLossPercent,
          yearsToCutInHalf: calculation.yearsToCutInHalf,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 p-5 rounded-2xl border border-rose-200 dark:border-rose-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Inflation &amp; Purchasing Power Erosion Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            At a{' '}
            <strong className="text-rose-700 dark:text-rose-300 font-bold font-mono">
              {calculation.infRatePercent.toFixed(1)}%
            </strong>{' '}
            annual inflation rate,{' '}
            <strong className="text-slate-900 dark:text-white font-mono font-bold">
              ${formatCurrency(calculation.amount)}
            </strong>{' '}
            today will only have the purchasing power of{' '}
            <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold text-base">
              ${formatCurrency(calculation.futurePurchasingPower)}
            </strong>{' '}
            in {calculation.yrs} years (a{' '}
            <strong className="text-rose-600 dark:text-rose-400 font-bold font-mono">
              -{calculation.purchasingPowerLossPercent.toFixed(1)}%
            </strong>{' '}
            decay).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Purchasing Power Loss
            </span>
            <span className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
              -{calculation.purchasingPowerLossPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Dollar Amount & Time Horizon */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Capital &amp; Time Horizon
            </h4>
          </div>

          <CalcInput
            id="initialAmount"
            label="Current Cash / Purchasing Baseline"
            value={initialAmount}
            onChange={(val) => setInitialAmount(val)}
            min={100}
            max={10000000}
            step={1000}
            prefix="$"
          />

          <CalcInput
            id="years"
            label="Time Horizon (Years)"
            value={years}
            onChange={(val) => setYears(val)}
            min={1}
            max={50}
            step={1}
            suffix="yrs"
            helpText={`Rule of 72: Purchasing power cuts in half every ~${calculation.yearsToCutInHalf.toFixed(1)} years`}
          />
        </div>

        {/* Right: Inflation Rate & Investment Return */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Inflation &amp; Growth Assumptions
            </h4>
          </div>

          <div className="space-y-2">
            <CalcInput
              id="inflationRate"
              label="Expected Annual Inflation Rate (%)"
              value={inflationRate}
              onChange={(val) => setInflationRate(val)}
              min={0}
              max={30}
              step={0.1}
              suffix="%"
            />

            {/* Inflation Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: '2.0% Fed Target', val: 2.0 },
                { label: '3.2% US Avg', val: 3.2 },
                { label: '5.0% Elevated', val: 5.0 },
                { label: '8.0% High Spike', val: 8.0 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setInflationRate(p.val)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-lg border transition ${
                    Math.abs(inflationRate - p.val) < 0.05
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalcInput
            id="investmentReturnRate"
            label="Optional Nominal Investment Return (0% if cash in checking)"
            value={investmentReturnRate}
            onChange={(val) => setInvestmentReturnRate(val)}
            min={0}
            max={30}
            step={0.25}
            suffix="%"
            helpText={`Net Real Annual Return: ${calculation.realReturnRate.toFixed(2)}%`}
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Future Purchasing Power"
          value={`$${formatCurrency(calculation.futurePurchasingPower)}`}
          subtitle={`Real value of $${formatNumber(calculation.amount, 0)} in ${calculation.yrs} years`}
          highlighted={true}
          icon={<TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        />

        <CalcResultCard
          title="Future Cost for Same Goods"
          value={`$${formatCurrency(calculation.futureCostToBuySame)}`}
          subtitle={`+${formatCurrency(calculation.futureCostToBuySame - calculation.amount)} in cumulative price rise`}
          icon={<TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        />

        <CalcResultCard
          title="Total Real Value Loss"
          value={`-$${formatCurrency(calculation.purchasingPowerLossDollars)}`}
          subtitle={`-${calculation.purchasingPowerLossPercent.toFixed(1)}% cumulative erosion`}
          icon={<ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />}
        />

        <CalcResultCard
          title="50% Halving Period"
          value={`~${calculation.yearsToCutInHalf.toFixed(1)} Years`}
          subtitle="Rule of 72 purchasing power half-life"
          icon={<Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />
      </div>

      {/* Year-by-Year Multi-Decade Purchasing Power Schedule */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Multi-Year Purchasing Power &amp; Price Inflation Schedule
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Timeline</th>
                <th className="py-2.5 px-3">Uninvested Cash Value</th>
                <th className="py-2.5 px-3">Purchasing Power Loss</th>
                <th className="py-2.5 px-3">Cost to Buy Today's Basket</th>
                {calculation.invRatePercent > 0 && (
                  <th className="py-2.5 px-3 text-right">Real Invested Value ({calculation.invRatePercent}%)</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {[1, 3, 5, 10, 15, 20, 25, 30]
                .filter((y) => y <= calculation.yrs || y === 5 || y === 10 || y === 20)
                .map((y) => {
                  const val = calculation.amount / Math.pow(1 + calculation.infRatePercent / 100, y);
                  const cost = calculation.amount * Math.pow(1 + calculation.infRatePercent / 100, y);
                  const lossPct = ((calculation.amount - val) / calculation.amount) * 100;
                  const invReal =
                    (calculation.amount * Math.pow(1 + calculation.invRatePercent / 100, y)) /
                    Math.pow(1 + calculation.infRatePercent / 100, y);

                  return (
                    <tr
                      key={y}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                        y === calculation.yrs ? 'bg-rose-50/50 dark:bg-rose-950/20 font-bold' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                        Year {y} {y === calculation.yrs ? '(Target Horizon)' : ''}
                      </td>
                      <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">
                        ${formatCurrency(val)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">-{lossPct.toFixed(1)}%</td>
                      <td className="py-2.5 px-3 text-amber-700 dark:text-amber-300 font-semibold">
                        ${formatCurrency(cost)}
                      </td>
                      {calculation.invRatePercent > 0 && (
                        <td className="py-2.5 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                          ${formatCurrency(invReal)}
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Erosion Curve Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-rose-500" />
          Purchasing Power Erosion vs Future Price of Goods
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.schedule} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
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
                dataKey="Real Cash Buying Power"
                stroke="#f43f5e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCash)"
              />
              <Area
                type="monotone"
                dataKey="Cost to Buy Same Goods"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCost)"
              />
              {calculation.invRatePercent > 0 && (
                <Area
                  type="monotone"
                  dataKey="Invested Real Value"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInvest)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
