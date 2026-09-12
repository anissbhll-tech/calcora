import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { TrendingUp, DollarSign, PiggyBank, RefreshCw, ShieldCheck, Zap, ArrowUpRight, BarChart3, CheckCircle2 } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

export const StockDividendYieldCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [initialInvestment, setInitialInvestment] = useState<number>(25000);
  const [sharePrice, setSharePrice] = useState<number>(100);
  const [annualDividendPerShare, setAnnualDividendPerShare] = useState<number>(3.50);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualDividendGrowthRate, setAnnualDividendGrowthRate] = useState<number>(6.0); // 6% DGR
  const [annualPriceAppreciationRate, setAnnualPriceAppreciationRate] = useState<number>(5.0); // 5% capital appreciation
  const [investmentYears, setInvestmentYears] = useState<number>(20);
  const [dripEnabled, setDripEnabled] = useState<boolean>(true);
  const [dividendTaxRate, setDividendTaxRate] = useState<number>(0); // 0% for Roth/IRA, 15% for taxable

  const calculation = useMemo(() => {
    const initCapital = Math.max(100, safeParseNumber(initialInvestment, 10000));
    const p0 = Math.max(1, safeParseNumber(sharePrice, 100));
    const d0 = Math.max(0, safeParseNumber(annualDividendPerShare, 3.5));
    const monthlyContrib = Math.max(0, safeParseNumber(monthlyContribution, 0));
    const dgr = Math.max(-50, Math.min(100, safeParseNumber(annualDividendGrowthRate, 5))) / 100;
    const priceGrowth = Math.max(-50, Math.min(100, safeParseNumber(annualPriceAppreciationRate, 5))) / 100;
    const years = Math.max(1, Math.min(50, safeParseNumber(investmentYears, 20)));
    const taxRate = Math.max(0, Math.min(50, safeParseNumber(dividendTaxRate, 0))) / 100;

    const initialDividendYieldPct = (d0 / p0) * 100;
    const initialShares = initCapital / p0;
    const initialAnnualIncome = initialShares * d0;

    // Simulation Engine: Year by Year
    let currentShares = initialShares;
    let currentPrice = p0;
    let currentDivPerShare = d0;
    let totalInvestedCapital = initCapital;
    let cumulativeDividendsEarned = 0;

    // Also track non-DRIP scenario for comparison
    let noDripShares = initialShares;
    let noDripCumulativeDivs = 0;

    const yearlyData = [];

    for (let yr = 1; yr <= years; yr++) {
      // Annual Contributions
      const annualContrib = monthlyContrib * 12;
      totalInvestedCapital += annualContrib;

      // Price & Dividend growth for this year
      currentPrice = currentPrice * (1 + priceGrowth);
      currentDivPerShare = currentDivPerShare * (1 + dgr);

      // New shares from monthly contributions (averaged across the year)
      const contribShares = annualContrib / currentPrice;

      // Gross Dividends
      const grossDividends = currentShares * currentDivPerShare;
      const netDividends = grossDividends * (1 - taxRate);
      cumulativeDividendsEarned += netDividends;

      // Non-DRIP calculation
      const noDripGross = noDripShares * currentDivPerShare;
      const noDripNet = noDripGross * (1 - taxRate);
      noDripCumulativeDivs += noDripNet;
      noDripShares += contribShares;

      // DRIP Reinvestment
      if (dripEnabled) {
        const dripNewShares = netDividends / currentPrice;
        currentShares += contribShares + dripNewShares;
      } else {
        currentShares += contribShares;
      }

      const portfolioValue = currentShares * currentPrice;
      const annualDividendIncome = currentShares * currentDivPerShare;
      const yieldOnCost = (annualDividendIncome / totalInvestedCapital) * 100;

      if (yr === 1 || yr === 5 || yr === 10 || yr === 15 || yr === 20 || yr === 25 || yr === 30 || yr === years) {
        yearlyData.push({
          year: yr,
          portfolioValue: Math.round(portfolioValue),
          annualIncome: Math.round(annualDividendIncome),
          monthlyIncome: Math.round(annualDividendIncome / 12),
          totalInvested: Math.round(totalInvestedCapital),
          sharesOwned: Math.round(currentShares),
          yieldOnCost: Number(yieldOnCost.toFixed(2)),
          sharePrice: Number(currentPrice.toFixed(2)),
          divPerShare: Number(currentDivPerShare.toFixed(2)),
        });
      }
    }

    const finalPortfolioValue = currentShares * currentPrice;
    const finalAnnualIncome = currentShares * currentDivPerShare;
    const finalMonthlyIncome = finalAnnualIncome / 12;
    const finalYieldOnCost = (finalAnnualIncome / totalInvestedCapital) * 100;

    const noDripPortfolioValue = noDripShares * currentPrice;
    const noDripAnnualIncome = noDripShares * currentDivPerShare;

    return {
      initCapital,
      p0,
      d0,
      initialDividendYieldPct,
      initialAnnualIncome,
      totalInvestedCapital,
      finalPortfolioValue,
      finalAnnualIncome,
      finalMonthlyIncome,
      finalYieldOnCost,
      currentShares,
      cumulativeDividendsEarned,
      noDripPortfolioValue,
      noDripAnnualIncome,
      noDripCumulativeDivs,
      dripAdvantagePortfolio: finalPortfolioValue - noDripPortfolioValue,
      dripAdvantageIncome: finalAnnualIncome - noDripAnnualIncome,
      yearlyData,
    };
  }, [
    initialInvestment,
    sharePrice,
    annualDividendPerShare,
    monthlyContribution,
    annualDividendGrowthRate,
    annualPriceAppreciationRate,
    investmentYears,
    dripEnabled,
    dividendTaxRate,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Dividend Strategy: ${formatCurrency(calculation.finalPortfolioValue, '$', 0)} Portfolio generating ${formatCurrency(calculation.finalAnnualIncome, '$', 0)}/yr passive income (${calculation.finalYieldOnCost.toFixed(1)}% YoC)`,
        {
          initialInvestment,
          monthlyContribution,
          sharePrice,
          annualDividendPerShare,
          annualDividendGrowthRate,
          annualPriceAppreciationRate,
          investmentYears,
          dripEnabled,
        },
        {
          portfolioValue: calculation.finalPortfolioValue,
          annualDividendIncome: calculation.finalAnnualIncome,
          monthlyDividendIncome: calculation.finalMonthlyIncome,
          yieldOnCost: calculation.finalYieldOnCost,
          cumulativeDividends: calculation.cumulativeDividendsEarned,
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
              Dividend Compounding &amp; Passive Cash Flow Projection
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            With dividend reinvestment (DRIP) and annual dividend growth, your portfolio reaches{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono">
              {formatCurrency(calculation.finalPortfolioValue, '$', 0)}
            </strong>
            , delivering{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono">
              {formatCurrency(calculation.finalAnnualIncome, '$', 0)}/year
            </strong>{' '}
            ({formatCurrency(calculation.finalMonthlyIncome, '$', 0)}/month) at a Yield on Cost of{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono">
              {calculation.finalYieldOnCost.toFixed(1)}%
            </strong>
            .
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Passive Monthly Income
            </span>
            <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
              {formatCurrency(calculation.finalMonthlyIncome, '$', 0)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Stock & Investment Parameters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Stock &amp; Capital Inputs
            </h4>
          </div>

          <CalcInput
            id="initialInvestment"
            label="Initial Portfolio / Lump Sum Capital"
            value={initialInvestment}
            onChange={(val) => setInitialInvestment(val)}
            min={0}
            step={1000}
            prefix="$"
          />

          <CalcInput
            id="monthlyContribution"
            label="Monthly Recurring Contribution"
            value={monthlyContribution}
            onChange={(val) => setMonthlyContribution(val)}
            min={0}
            step={50}
            prefix="$"
            helpText="New funds added each month to purchase additional shares."
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="sharePrice"
              label="Current Share Price"
              value={sharePrice}
              onChange={(val) => setSharePrice(val)}
              min={1}
              step={5}
              prefix="$"
            />
            <CalcInput
              id="annualDividendPerShare"
              label="Annual Dividend Payout / Share"
              value={annualDividendPerShare}
              onChange={(val) => setAnnualDividendPerShare(val)}
              min={0}
              step={0.25}
              prefix="$"
              helpText={`Initial Yield: ${calculation.initialDividendYieldPct.toFixed(2)}%`}
            />
          </div>

          <CalcInput
            id="investmentYears"
            label="Investment Time Horizon"
            value={investmentYears}
            onChange={(val) => setInvestmentYears(val)}
            min={1}
            max={40}
            step={1}
            suffix="years"
          />
        </div>

        {/* Right: Growth, DRIP & Tax Setting */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <RefreshCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Growth Rates &amp; DRIP Settings
            </h4>
          </div>

          <CalcInput
            id="annualDividendGrowthRate"
            label="Annual Dividend Growth Rate (DGR %)"
            value={annualDividendGrowthRate}
            onChange={(val) => setAnnualDividendGrowthRate(val)}
            min={0}
            max={25}
            step={0.5}
            suffix="%"
            helpText="Historical rate at which company increases its annual dividend payout (e.g. 5–8%)."
          />

          <CalcInput
            id="annualPriceAppreciationRate"
            label="Annual Share Price Appreciation Rate %"
            value={annualPriceAppreciationRate}
            onChange={(val) => setAnnualPriceAppreciationRate(val)}
            min={0}
            max={25}
            step={0.5}
            suffix="%"
            helpText="Expected capital appreciation of the underlying stock price."
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Dividend Reinvestment Plan (DRIP)
            </label>
            <div className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setDripEnabled(true)}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  dripEnabled ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                DRIP Enabled (Reinvest)
              </button>
              <button
                type="button"
                onClick={() => setDripEnabled(false)}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  !dripEnabled ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                Cash Payout (No DRIP)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Account Tax Status (Dividend Tax Rate)
            </label>
            <select
              value={dividendTaxRate}
              onChange={(e) => setDividendTaxRate(Number(e.target.value))}
              className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
            >
              <option value={0}>0% Tax (Roth IRA / Traditional IRA / 401k)</option>
              <option value={15}>15% Tax (Standard Qualified Taxable Brokerage)</option>
              <option value={20}>20% Tax (High Earner Qualified Rate)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Projected Portfolio Value"
          value={formatCurrency(calculation.finalPortfolioValue, '$', 0)}
          subtitle={`Total invested capital: ${formatCurrency(calculation.totalInvestedCapital, '$', 0)}`}
          highlighted={true}
          icon={<TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Annual Dividend Income"
          value={formatCurrency(calculation.finalAnnualIncome, '$', 0)}
          subtitle={`${formatCurrency(calculation.finalMonthlyIncome, '$', 0)} monthly passive cash flow`}
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Yield on Cost (YoC)"
          value={`${calculation.finalYieldOnCost.toFixed(2)}%`}
          subtitle={`Initial Yield: ${calculation.initialDividendYieldPct.toFixed(2)}%`}
          icon={<Zap className="w-5 h-5 text-amber-500" />}
        />

        <CalcResultCard
          title="Cumulative Dividends Paid"
          value={formatCurrency(calculation.cumulativeDividendsEarned, '$', 0)}
          subtitle={`${Math.round(calculation.currentShares)} total shares accumulated`}
          icon={<PiggyBank className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />
      </div>

      {/* DRIP Reinvestment Power Advantage */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-teal-500" />
          The DRIP Dividend Reinvestment Multiplier
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 block">
              With Automatic DRIP Reinvestment
            </span>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300">
                <span>Ending Portfolio Value:</span>
                <span className="font-mono font-bold text-teal-700 dark:text-teal-300">
                  {formatCurrency(calculation.finalPortfolioValue, '$', 0)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300">
                <span>Annual Dividend Cash Flow:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(calculation.finalAnnualIncome, '$', 0)}/yr
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Without DRIP (Cash Payouts Taken)
            </span>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Ending Portfolio Value:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.noDripPortfolioValue, '$', 0)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Annual Dividend Cash Flow:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.noDripAnnualIncome, '$', 0)}/yr
                </span>
              </div>
            </div>
          </div>
        </div>

        {calculation.dripAdvantagePortfolio > 0 && (
          <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
            DRIP generates an additional{' '}
            <strong className="font-mono">{formatCurrency(calculation.dripAdvantagePortfolio, '$', 0)}</strong> in
            wealth and{' '}
            <strong className="font-mono">{formatCurrency(calculation.dripAdvantageIncome, '$', 0)}/year</strong> in
            higher passive income through compound share accumulation.
          </p>
        )}
      </div>

      {/* Multi-Year Milestone Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-teal-500" />
          Multi-Year Dividend Growth &amp; Portfolio Milestones
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Year</th>
                <th className="py-2.5 px-3 font-semibold">Total Invested</th>
                <th className="py-2.5 px-3 font-semibold">Shares Owned</th>
                <th className="py-2.5 px-3 font-semibold">Share Price</th>
                <th className="py-2.5 px-3 font-semibold">Div / Share</th>
                <th className="py-2.5 px-3 font-semibold">Portfolio Value</th>
                <th className="py-2.5 px-3 font-semibold">Annual Income</th>
                <th className="py-2.5 px-3 font-semibold">Monthly Income</th>
                <th className="py-2.5 px-3 font-semibold">Yield on Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.yearlyData.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Yr {row.year}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    {formatCurrency(row.totalInvested, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                    {formatNumber(row.sharesOwned, 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ${row.sharePrice.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ${row.divPerShare.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    {formatCurrency(row.portfolioValue, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(row.annualIncome, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-300 font-semibold">
                    {formatCurrency(row.monthlyIncome, '$', 0)}/mo
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                    {row.yieldOnCost}%
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
