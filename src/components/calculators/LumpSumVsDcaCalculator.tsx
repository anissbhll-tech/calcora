import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatPercent, formatNumber } from '../../lib/mathUtils';
import { TrendingUp, Scale, Sparkles, Shield, DollarSign, Calendar, ArrowRight, Zap, Info } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const LumpSumVsDcaCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [totalCapital, setTotalCapital] = useState<number>(() => initialPreset?.totalCapital ?? 100000);
  const [years, setYears] = useState<number>(() => initialPreset?.years ?? 10);
  const [annualReturn, setAnnualReturn] = useState<number>(() => initialPreset?.annualReturn ?? 9.0);
  const [dcaMonths, setDcaMonths] = useState<number>(() => initialPreset?.dcaMonths ?? 12);
  const [cashHysaYield, setCashHysaYield] = useState<number>(() => initialPreset?.cashHysaYield ?? 4.5);
  const [marketScenario, setMarketScenario] = useState<'steady_growth' | 'early_dip' | 'sideways'>('steady_growth');

  const calculation = useMemo(() => {
    const capital = Math.max(100, safeParseNumber(totalCapital, 100000));
    const horizonYears = Math.max(1, Math.min(40, safeParseNumber(years, 10)));
    const expReturn = Math.max(-20, Math.min(40, safeParseNumber(annualReturn, 9.0))) / 100;
    const dcaPeriod = Math.max(1, Math.min(60, safeParseNumber(dcaMonths, 12)));
    const cashYield = Math.max(0, Math.min(20, safeParseNumber(cashHysaYield, 4.5))) / 100;

    const totalMonths = horizonYears * 12;
    const monthlyMarketRate = Math.pow(1 + expReturn, 1 / 12) - 1;
    const monthlyCashRate = Math.pow(1 + cashYield, 1 / 12) - 1;
    const monthlyInstallment = capital / dcaPeriod;

    // Simulate month-by-month trajectory
    let lumpSumPortfolio = capital;
    let dcaPortfolio = 0;
    let dcaCashRemaining = capital;

    const trajectory = [];
    trajectory.push({
      month: 0,
      year: 0,
      label: 'Month 0',
      'Lump Sum': Math.round(lumpSumPortfolio),
      'Dollar Cost Averaging (DCA)': Math.round(dcaPortfolio + dcaCashRemaining),
      'DCA Invested Stock Value': Math.round(dcaPortfolio),
      'DCA Uninvested Cash': Math.round(dcaCashRemaining),
    });

    for (let m = 1; m <= totalMonths; m++) {
      // Determine monthly market factor depending on scenario
      let curMonthMarketRate = monthlyMarketRate;
      if (marketScenario === 'early_dip' && m <= 12) {
        // Market drops 20% during year 1 then recovers at higher pace
        curMonthMarketRate = m <= 6 ? -0.035 : 0.025;
      } else if (marketScenario === 'sideways' && m <= 12) {
        curMonthMarketRate = 0.001;
      }

      // 1. Lump sum growth
      lumpSumPortfolio = lumpSumPortfolio * (1 + curMonthMarketRate);

      // 2. DCA strategy
      if (m <= dcaPeriod) {
        const transferAmount = Math.min(monthlyInstallment, dcaCashRemaining);
        dcaCashRemaining = (dcaCashRemaining - transferAmount) * (1 + monthlyCashRate);
        dcaPortfolio = (dcaPortfolio + transferAmount) * (1 + curMonthMarketRate);
      } else {
        dcaCashRemaining = dcaCashRemaining * (1 + monthlyCashRate);
        dcaPortfolio = dcaPortfolio * (1 + curMonthMarketRate);
      }

      if (m % 6 === 0 || m === dcaPeriod || m === totalMonths) {
        trajectory.push({
          month: m,
          year: +(m / 12).toFixed(1),
          label: m % 12 === 0 ? `Yr ${m / 12}` : `Mo ${m}`,
          'Lump Sum': Math.round(lumpSumPortfolio),
          'Dollar Cost Averaging (DCA)': Math.round(dcaPortfolio + dcaCashRemaining),
          'DCA Invested Stock Value': Math.round(dcaPortfolio),
          'DCA Uninvested Cash': Math.round(dcaCashRemaining),
        });
      }
    }

    const finalLumpSum = lumpSumPortfolio;
    const finalDca = dcaPortfolio + dcaCashRemaining;
    const netDifference = finalLumpSum - finalDca;
    const winner = netDifference >= 0 ? 'Lump Sum' : 'Dollar Cost Averaging (DCA)';
    const outperformancePercent = finalDca > 0 ? (Math.abs(netDifference) / Math.min(finalLumpSum, finalDca)) * 100 : 0;

    // Vanguard empirical historical probability (~68% for 12-mo DCA in diversified global stocks)
    const historicalLumpSumWinRate = 68;

    return {
      capital,
      horizonYears,
      expReturnPercent: expReturn * 100,
      dcaPeriod,
      cashYieldPercent: cashYield * 100,
      monthlyInstallment,
      finalLumpSum,
      finalDca,
      netDifference,
      winner,
      outperformancePercent,
      historicalLumpSumWinRate,
      trajectory,
    };
  }, [totalCapital, years, annualReturn, dcaMonths, cashHysaYield, marketScenario]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Lump Sum ($${formatCurrency(calculation.finalLumpSum)}) vs DCA ($${formatCurrency(calculation.finalDca)}) over ${calculation.horizonYears} yrs — ${calculation.winner} leads by $${formatCurrency(Math.abs(calculation.netDifference))}`,
        { totalCapital, years, annualReturn, dcaMonths, cashHysaYield, marketScenario },
        {
          finalLumpSum: calculation.finalLumpSum,
          finalDca: calculation.finalDca,
          netDifference: calculation.netDifference,
          winner: calculation.winner,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Lump Sum vs Dollar Cost Averaging (DCA) Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            For <strong className="text-slate-900 dark:text-white font-mono font-bold">${formatCurrency(calculation.capital)}</strong> invested over {calculation.horizonYears} years:{' '}
            <strong className="text-blue-700 dark:text-blue-300 font-bold font-mono text-base">
              {calculation.winner}
            </strong>{' '}
            generates{' '}
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              ${formatCurrency(Math.abs(calculation.netDifference))}
            </strong>{' '}
            more in terminal wealth ({calculation.outperformancePercent.toFixed(1)}% premium).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Leading Strategy</span>
            <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
              {calculation.winner}
            </span>
          </div>
        </div>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Capital & Time Horizon */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Capital &amp; Market Assumptions
            </h4>
          </div>

          <CalcInput
            id="totalCapital"
            label="Total Windfall / Investment Capital"
            value={totalCapital}
            onChange={(val) => setTotalCapital(val)}
            min={1000}
            max={50000000}
            step={5000}
            prefix="$"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="years"
              label="Investment Horizon"
              value={years}
              onChange={(val) => setYears(val)}
              min={1}
              max={40}
              step={1}
              suffix="yrs"
            />
            <CalcInput
              id="annualReturn"
              label="Expected Equity Return"
              value={annualReturn}
              onChange={(val) => setAnnualReturn(val)}
              min={-10}
              max={30}
              step={0.5}
              suffix="%"
              helpText="S&P 500 hist. avg ~9-10%"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Market Trajectory Scenario
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'steady_growth', label: 'Steady Bull' },
                { id: 'early_dip', label: 'Early Dip (-20%)' },
                { id: 'sideways', label: 'Flat / Volatile' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setMarketScenario(s.id as any)}
                  className={`px-2 py-2 text-xs font-bold rounded-xl border transition ${
                    marketScenario === s.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: DCA Schedule & Cash Yield */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              DCA Deployment Strategy
            </h4>
          </div>

          <CalcInput
            id="dcaMonths"
            label="DCA Tranche Schedule (Months)"
            value={dcaMonths}
            onChange={(val) => setDcaMonths(val)}
            min={1}
            max={60}
            step={1}
            suffix="mo"
            helpText={`Installment: $${formatCurrency(calculation.monthlyInstallment)} / month`}
          />

          <CalcInput
            id="cashHysaYield"
            label="Cash Yield on Uninvested Capital (HYSA / T-Bills)"
            value={cashHysaYield}
            onChange={(val) => setCashHysaYield(val)}
            min={0}
            max={15}
            step={0.25}
            suffix="%"
            helpText="Earned on remaining cash while waiting to deploy"
          />

          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Academic Consensus (Vanguard &amp; Nobel Research)
            </div>
            <p className="text-[11px] leading-relaxed">
              Empirical data across rolling 10-year periods shows Lump Sum investing beats DCA ~68% of the time in the US (and ~75% globally), because equities trend upward over time and cash drag reduces long-term compounding.
            </p>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Lump Sum Terminal Wealth"
          value={`$${formatCurrency(calculation.finalLumpSum)}`}
          subtitle="100% invested immediately on Day 1"
          highlighted={calculation.winner === 'Lump Sum'}
          icon={<Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="DCA Terminal Wealth"
          value={`$${formatCurrency(calculation.finalDca)}`}
          subtitle={`DCA over ${calculation.dcaPeriod} monthly installments`}
          highlighted={calculation.winner === 'Dollar Cost Averaging (DCA)'}
          icon={<Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Strategy Delta (Gap)"
          value={`$${formatCurrency(Math.abs(calculation.netDifference))}`}
          subtitle={`${calculation.winner} advantage (+${calculation.outperformancePercent.toFixed(1)}%)`}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Lump Sum Win Rate"
          value="~68% Historical"
          subtitle="Vanguard empirical rolling period study"
          icon={<Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />
      </div>

      {/* Comparison Overview Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Comparative Strategy Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Metric / Factor</th>
                <th className="py-2.5 px-3">Lump Sum Strategy</th>
                <th className="py-2.5 px-3">Dollar Cost Averaging (DCA)</th>
                <th className="py-2.5 px-3 text-right">Edge / Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Terminal Portfolio Value</td>
                <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-bold">${formatCurrency(calculation.finalLumpSum)}</td>
                <td className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400 font-bold">${formatCurrency(calculation.finalDca)}</td>
                <td className="py-2.5 px-3 text-right font-sans font-bold text-slate-900 dark:text-white">{calculation.winner}</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Deployment Duration</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-sans">Immediate (Day 1)</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-sans">{calculation.dcaPeriod} monthly tranches</td>
                <td className="py-2.5 px-3 text-right font-sans text-slate-500">DCA reduces timing shock</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Expected Mathematical Return</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Higher (Maximizes time in market)</td>
                <td className="py-2.5 px-3 text-amber-600 dark:text-amber-400 font-sans font-semibold">Lower (Cash drag during phase-in)</td>
                <td className="py-2.5 px-3 text-right font-sans text-emerald-600 dark:text-emerald-400 font-bold">Lump Sum (+{calculation.outperformancePercent.toFixed(1)}%)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Psychological Regret Risk</td>
                <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-sans">High if market plunges immediately</td>
                <td className="py-2.5 px-3 text-teal-600 dark:text-teal-400 font-sans font-semibold">Low (Dips feel like buying discounts)</td>
                <td className="py-2.5 px-3 text-right font-sans text-teal-600 dark:text-teal-400 font-bold">DCA wins on peace of mind</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Portfolio Growth Trajectory Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          Wealth Trajectory: Lump Sum vs DCA Portfolio Evolution
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={calculation.trajectory} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
              <Line
                type="monotone"
                dataKey="Lump Sum"
                name="Lump Sum Strategy"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Dollar Cost Averaging (DCA)"
                name="DCA Total Wealth (Stocks + HYSA Cash)"
                stroke="#6366f1"
                strokeWidth={3}
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="DCA Invested Stock Value"
                name="DCA Invested Stocks Only"
                stroke="#10b981"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
