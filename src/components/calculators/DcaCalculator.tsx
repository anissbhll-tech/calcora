import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { PieChart, TrendingUp, DollarSign, Calendar, ShieldCheck, ArrowUpRight, Scale, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type DcaFrequency = 'weekly' | 'biweekly' | 'monthly';
type AssetCategory = 'sp500' | 'nasdaq' | 'crypto' | 'custom';

const FREQUENCY_PERIODS: Record<DcaFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  monthly: 12,
};

const FREQUENCY_LABELS: Record<DcaFrequency, string> = {
  weekly: 'Weekly (52 times / yr)',
  biweekly: 'Every 2 Weeks (26 times / yr)',
  monthly: 'Monthly (12 times / yr)',
};

export const DcaCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [initialCapital, setInitialCapital] = useState<number>(2000);
  const [recurringAmount, setRecurringAmount] = useState<number>(250);
  const [frequency, setFrequency] = useState<DcaFrequency>('monthly');
  const [initialAssetPrice, setInitialAssetPrice] = useState<number>(100);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(10.0); // 10% typical index return
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(10);

  const calculation = useMemo(() => {
    const initLump = Math.max(0, safeParseNumber(initialCapital, 0));
    const recurring = Math.max(1, safeParseNumber(recurringAmount, 100));
    const p0 = Math.max(0.01, safeParseNumber(initialAssetPrice, 100));
    const annualReturn = Math.max(-50, Math.min(200, safeParseNumber(expectedAnnualReturn, 10))) / 100;
    const years = Math.max(1, Math.min(40, safeParseNumber(timeHorizonYears, 10)));

    const periodsPerYear = FREQUENCY_PERIODS[frequency];
    const totalPeriods = years * periodsPerYear;
    const periodicRate = Math.pow(1 + annualReturn, 1 / periodsPerYear) - 1;

    let totalCapitalInvested = initLump;
    let totalUnitsPurchased = initLump > 0 ? initLump / p0 : 0;
    let currentPrice = p0;

    const yearlyData = [];

    for (let yr = 1; yr <= years; yr++) {
      const yearStartUnits = totalUnitsPurchased;
      const yearStartInvested = totalCapitalInvested;

      for (let p = 1; p <= periodsPerYear; p++) {
        currentPrice = currentPrice * (1 + periodicRate);
        const unitsBought = recurring / currentPrice;
        totalUnitsPurchased += unitsBought;
        totalCapitalInvested += recurring;
      }

      const portfolioVal = totalUnitsPurchased * currentPrice;
      const netGain = portfolioVal - totalCapitalInvested;
      const avgCost = totalCapitalInvested / totalUnitsPurchased;
      const roi = (netGain / totalCapitalInvested) * 100;

      if (yr === 1 || yr === 3 || yr === 5 || yr === 10 || yr === 15 || yr === 20 || yr === years) {
        yearlyData.push({
          year: yr,
          totalInvested: Math.round(totalCapitalInvested),
          portfolioValue: Math.round(portfolioVal),
          netProfit: Math.round(netGain),
          unitsAccumulated: Number(totalUnitsPurchased.toFixed(4)),
          assetPrice: Number(currentPrice.toFixed(2)),
          averageCost: Number(avgCost.toFixed(2)),
          roi: Number(roi.toFixed(1)),
        });
      }
    }

    const finalPortfolioValue = totalUnitsPurchased * currentPrice;
    const finalNetProfit = finalPortfolioValue - totalCapitalInvested;
    const finalAverageCost = totalCapitalInvested / totalUnitsPurchased;
    const finalRoi = (finalNetProfit / totalCapitalInvested) * 100;

    // Lump Sum Comparison (if entire capital had been invested on Day 1)
    const lumpSumEndingValue = totalCapitalInvested * Math.pow(1 + annualReturn, years);
    const lumpSumNetProfit = lumpSumEndingValue - totalCapitalInvested;
    const lumpSumRoi = (lumpSumNetProfit / totalCapitalInvested) * 100;

    return {
      initLump,
      recurring,
      p0,
      annualReturn,
      years,
      periodsPerYear,
      totalPeriods,
      totalCapitalInvested,
      totalUnitsPurchased,
      finalAssetPrice: currentPrice,
      finalPortfolioValue,
      finalNetProfit,
      finalAverageCost,
      finalRoi,
      lumpSumEndingValue,
      lumpSumNetProfit,
      lumpSumRoi,
      yearlyData,
    };
  }, [
    initialCapital,
    recurringAmount,
    frequency,
    initialAssetPrice,
    expectedAnnualReturn,
    timeHorizonYears,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `DCA Strategy: ${formatCurrency(calculation.recurring, '$', 0)}/${frequency} for ${calculation.years} yrs yields ${formatCurrency(calculation.finalPortfolioValue, '$', 0)} (+${calculation.finalRoi.toFixed(1)}% ROI)`,
        {
          initialCapital,
          recurringAmount,
          frequency,
          expectedAnnualReturn,
          timeHorizonYears,
        },
        {
          totalInvested: calculation.totalCapitalInvested,
          portfolioValue: calculation.finalPortfolioValue,
          netProfit: calculation.finalNetProfit,
          averageCost: calculation.finalAverageCost,
          unitsAccumulated: calculation.totalUnitsPurchased,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Dollar Cost Averaging (DCA) Wealth Projection
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Investing{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono">
              {formatCurrency(calculation.recurring, '$', 0)}
            </strong>{' '}
            {FREQUENCY_LABELS[frequency].toLowerCase()} over {calculation.years} years builds a total portfolio value of{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono">
              {formatCurrency(calculation.finalPortfolioValue, '$', 0)}
            </strong>{' '}
            on an invested principal of{' '}
            <strong>{formatCurrency(calculation.totalCapitalInvested, '$', 0)}</strong> (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              +{formatCurrency(calculation.finalNetProfit, '$', 0)} profit, +{calculation.finalRoi.toFixed(1)}% ROI
            </span>
            ).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Net Profit
            </span>
            <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(calculation.finalNetProfit, '$', 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Contribution Cadence */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Recurring DCA Investment Cadence
            </h4>
          </div>

          <CalcInput
            id="recurringAmount"
            label="Recurring Investment Amount"
            value={recurringAmount}
            onChange={(val) => setRecurringAmount(val)}
            min={10}
            step={25}
            prefix="$"
            helpText="The fixed dollar amount invested on every recurring interval."
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Investment Frequency
            </label>
            <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {(['weekly', 'biweekly', 'monthly'] as DcaFrequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    frequency === f
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {f === 'biweekly' ? 'Bi-Weekly' : f}
                </button>
              ))}
            </div>
          </div>

          <CalcInput
            id="initialCapital"
            label="Starting Lump Sum Capital (Optional)"
            value={initialCapital}
            onChange={(val) => setInitialCapital(val)}
            min={0}
            step={500}
            prefix="$"
            helpText="Initial cash deployed at Day 1 before recurring deposits."
          />
        </div>

        {/* Right: Asset Performance & Horizon */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Asset Assumptions &amp; Horizon
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="initialAssetPrice"
              label="Starting Asset Unit Price"
              value={initialAssetPrice}
              onChange={(val) => setInitialAssetPrice(val)}
              min={0.01}
              step={10}
              prefix="$"
              helpText="e.g., $100/share or $60,000/coin"
            />

            <CalcInput
              id="expectedAnnualReturn"
              label="Expected Annual Return (CAGR %)"
              value={expectedAnnualReturn}
              onChange={(val) => setExpectedAnnualReturn(val)}
              min={-20}
              max={150}
              step={0.5}
              suffix="%"
              helpText="Historical: S&P 500 (~10%), Nasdaq (~13%)."
            />
          </div>

          <CalcInput
            id="timeHorizonYears"
            label="DCA Time Horizon"
            value={timeHorizonYears}
            onChange={(val) => setTimeHorizonYears(val)}
            min={1}
            max={40}
            step={1}
            suffix="years"
            helpText={`${calculation.totalPeriods} total recurring buy orders executed.`}
          />

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">
              Total Capital Committed:
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {formatCurrency(calculation.totalCapitalInvested, '$', 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Projected Portfolio Value"
          value={formatCurrency(calculation.finalPortfolioValue, '$', 0)}
          subtitle={`Total invested: ${formatCurrency(calculation.totalCapitalInvested, '$', 0)}`}
          highlighted={true}
          icon={<TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Total Net Profit"
          value={formatCurrency(calculation.finalNetProfit, '$', 0)}
          subtitle={`+${calculation.finalRoi.toFixed(1)}% total return on investment`}
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Average Purchase Cost / Unit"
          value={`$${calculation.finalAverageCost.toFixed(2)}`}
          subtitle={`Ending market price: $${calculation.finalAssetPrice.toFixed(2)}`}
          icon={<Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Units Accumulated"
          value={formatNumber(calculation.totalUnitsPurchased, 2)}
          subtitle={`Across ${calculation.totalPeriods} scheduled purchases`}
          icon={<PieChart className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
        />
      </div>

      {/* DCA vs Lump Sum Strategy Comparison */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-teal-500" />
          Strategy Comparison: Dollar-Cost Averaging vs. 100% Upfront Lump Sum
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900 dark:text-teal-200">
                Dollar-Cost Averaging (DCA)
              </span>
              <span className="text-[10px] font-bold bg-teal-200 dark:bg-teal-800 text-teal-900 dark:text-teal-100 px-2 py-0.5 rounded-full">
                Zero Timing Risk
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Total Capital Invested:</span>
                <span className="font-mono font-bold">
                  {formatCurrency(calculation.totalCapitalInvested, '$', 0)}
                </span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Ending Portfolio Value:</span>
                <span className="font-mono font-bold text-teal-700 dark:text-teal-300">
                  {formatCurrency(calculation.finalPortfolioValue, '$', 0)}
                </span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Net Gain / ROI:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  +{formatCurrency(calculation.finalNetProfit, '$', 0)} (+{calculation.finalRoi.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Theoretical 100% Upfront Lump Sum
              </span>
              <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full">
                Full Market Exposure
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Upfront Capital Required:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.totalCapitalInvested, '$', 0)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Ending Portfolio Value:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.lumpSumEndingValue, '$', 0)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Net Gain / ROI:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  +{formatCurrency(calculation.lumpSumNetProfit, '$', 0)} (+{calculation.lumpSumRoi.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Year Milestone Amortization Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-500" />
          DCA Multi-Year Asset Accumulation Milestones
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Horizon</th>
                <th className="py-2.5 px-3 font-semibold">Total Invested</th>
                <th className="py-2.5 px-3 font-semibold">Units Owned</th>
                <th className="py-2.5 px-3 font-semibold">Avg Cost Basis</th>
                <th className="py-2.5 px-3 font-semibold">Market Price</th>
                <th className="py-2.5 px-3 font-semibold">Portfolio Value</th>
                <th className="py-2.5 px-3 font-semibold">Net Profit</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.yearlyData.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Year {row.year}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    {formatCurrency(row.totalInvested, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                    {formatNumber(row.unitsAccumulated, 2)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ${row.averageCost.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ${row.assetPrice.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    {formatCurrency(row.portfolioValue, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatCurrency(row.netProfit, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    +{row.roi}%
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
