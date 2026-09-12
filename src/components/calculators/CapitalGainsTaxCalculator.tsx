import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency } from '../../lib/mathUtils';
import { TrendingUp, DollarSign, ShieldCheck, PieChart, Percent, Receipt, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household';
type HoldingPeriod = 'long' | 'short';

// 2024 IRS Statutory LTCG Thresholds (Revenue Procedure 2023-34)
const LTCG_BRACKETS_2024: Record<FilingStatus, { rate0Max: number; rate15Max: number }> = {
  single: { rate0Max: 47025, rate15Max: 518900 },
  married_joint: { rate0Max: 94050, rate15Max: 583750 },
  married_separate: { rate0Max: 47025, rate15Max: 291850 },
  head_of_household: { rate0Max: 63000, rate15Max: 551350 },
};

// 2024 NIIT (Net Investment Income Tax) 3.8% Statutory MAGI Thresholds
const NIIT_THRESHOLDS_2024: Record<FilingStatus, number> = {
  single: 200000,
  married_joint: 250000,
  married_separate: 125000,
  head_of_household: 200000,
};

// 2024 Standard Deductions
const STANDARD_DEDUCTIONS_2024: Record<FilingStatus, number> = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
};

// 2024 Ordinary Income Tax Brackets (for Short-Term Capital Gains)
const ORDINARY_BRACKETS_2024: Record<FilingStatus, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
  married_joint: [
    { rate: 0.10, min: 0, max: 23200 },
    { rate: 0.12, min: 23200, max: 94300 },
    { rate: 0.22, min: 94300, max: 201050 },
    { rate: 0.24, min: 201050, max: 383900 },
    { rate: 0.32, min: 383900, max: 487450 },
    { rate: 0.35, min: 487450, max: 731200 },
    { rate: 0.37, min: 731200, max: Infinity },
  ],
  married_separate: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 365600 },
    { rate: 0.37, min: 365600, max: Infinity },
  ],
  head_of_household: [
    { rate: 0.10, min: 0, max: 16550 },
    { rate: 0.12, min: 16550, max: 63100 },
    { rate: 0.22, min: 63100, max: 100500 },
    { rate: 0.24, min: 100500, max: 191950 },
    { rate: 0.32, min: 191950, max: 243700 },
    { rate: 0.35, min: 243700, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
};

function computeOrdinaryTax(taxableIncome: number, brackets: { rate: number; min: number; max: number }[]): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  for (const b of brackets) {
    if (taxableIncome > b.min) {
      const chunk = Math.min(taxableIncome, b.max) - b.min;
      tax += chunk * b.rate;
    } else {
      break;
    }
  }
  return tax;
}

export const CapitalGainsTaxCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [sellingPrice, setSellingPrice] = useState<number>(75000);
  const [costBasis, setCostBasis] = useState<number>(25000);
  const [fees, setFees] = useState<number>(500);
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>('long');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [otherIncome, setOtherIncome] = useState<number>(85000);
  const [stateTaxRate, setStateTaxRate] = useState<number>(4.5);

  const calculation = useMemo(() => {
    const sell = Math.max(0, safeParseNumber(sellingPrice, 0));
    const buy = Math.max(0, safeParseNumber(costBasis, 0));
    const fee = Math.max(0, safeParseNumber(fees, 0));
    const income = Math.max(0, safeParseNumber(otherIncome, 0));
    const stateRate = Math.max(0, Math.min(20, safeParseNumber(stateTaxRate, 0))) / 100;

    // Gross and Net Capital Gain/Loss
    const adjustedBasis = buy + fee;
    const netGain = sell - adjustedBasis;
    const isGain = netGain > 0;
    const gainAmount = Math.max(0, netGain);
    const lossAmount = netGain < 0 ? Math.abs(netGain) : 0;

    const stdDed = STANDARD_DEDUCTIONS_2024[filingStatus];
    const ordinaryTaxableBase = Math.max(0, income - stdDed);

    // 1. Long-Term Capital Gains Calculation
    const ltcgLimits = LTCG_BRACKETS_2024[filingStatus];
    let ltcgTax = 0;
    let ltcgBracket0 = 0;
    let ltcgBracket15 = 0;
    let ltcgBracket20 = 0;

    if (gainAmount > 0) {
      // The capital gain stacks on top of ordinary taxable income
      const totalTaxable = ordinaryTaxableBase + gainAmount;

      // Portion in 0% LTCG bracket (up to rate0Max)
      const roomIn0 = Math.max(0, ltcgLimits.rate0Max - ordinaryTaxableBase);
      ltcgBracket0 = Math.min(gainAmount, roomIn0);

      // Portion in 15% LTCG bracket (between rate0Max and rate15Max)
      const baseFor15 = Math.max(ordinaryTaxableBase, ltcgLimits.rate0Max);
      if (totalTaxable > ltcgLimits.rate0Max) {
        const roomIn15 = Math.max(0, ltcgLimits.rate15Max - baseFor15);
        const gainRemainingAfter0 = gainAmount - ltcgBracket0;
        ltcgBracket15 = Math.min(gainRemainingAfter0, roomIn15);
      }

      // Portion in 20% LTCG bracket (above rate15Max)
      ltcgBracket20 = Math.max(0, gainAmount - ltcgBracket0 - ltcgBracket15);

      ltcgTax = ltcgBracket15 * 0.15 + ltcgBracket20 * 0.20;
    }

    // 2. Short-Term Capital Gains Calculation (Marginal Ordinary Income Tax on the Gain)
    const ordinaryBrackets = ORDINARY_BRACKETS_2024[filingStatus];
    const baseOrdinaryTax = computeOrdinaryTax(ordinaryTaxableBase, ordinaryBrackets);
    const totalOrdinaryTaxWithSTCG = computeOrdinaryTax(ordinaryTaxableBase + gainAmount, ordinaryBrackets);
    const stcgTax = Math.max(0, totalOrdinaryTaxWithSTCG - baseOrdinaryTax);

    // Active Federal Capital Gains Tax based on user toggle
    const federalCapitalGainsTax = holdingPeriod === 'long' ? ltcgTax : stcgTax;

    // 3. Net Investment Income Tax (NIIT 3.8%)
    // Applies to the lesser of: net investment income (gainAmount) OR excess of MAGI over statutory threshold
    const niitThreshold = NIIT_THRESHOLDS_2024[filingStatus];
    const totalMAGI = income + gainAmount;
    const excessMAGI = Math.max(0, totalMAGI - niitThreshold);
    const niitSubjectAmount = Math.min(gainAmount, excessMAGI);
    const niitTax = niitSubjectAmount * 0.038;

    // 4. State Capital Gains Tax
    const estimatedStateTax = gainAmount * stateRate;

    // 5. Total Tax Owed on the Capital Gain
    const totalTaxOnGain = federalCapitalGainsTax + niitTax + estimatedStateTax;
    const effectiveTaxRateOnGain = gainAmount > 0 ? (totalTaxOnGain / gainAmount) * 100 : 0;
    const netProceedsAfterTax = sell - fee - totalTaxOnGain;
    const netCashProfit = netGain - totalTaxOnGain;

    // 6. Holding Period Tax Arbitrage Comparison
    const totalTaxIfLong = ltcgTax + niitTax + estimatedStateTax;
    const totalTaxIfShort = stcgTax + niitTax + estimatedStateTax;
    const taxSavedByHoldingLongTerm = Math.max(0, totalTaxIfShort - totalTaxIfLong);

    return {
      sell,
      buy,
      fee,
      adjustedBasis,
      netGain,
      isGain,
      gainAmount,
      lossAmount,
      ordinaryTaxableBase,
      ltcgTax,
      ltcgBracket0,
      ltcgBracket15,
      ltcgBracket20,
      stcgTax,
      federalCapitalGainsTax,
      niitTax,
      niitSubjectAmount,
      estimatedStateTax,
      totalTaxOnGain,
      effectiveTaxRateOnGain,
      netProceedsAfterTax,
      netCashProfit,
      taxSavedByHoldingLongTerm,
      totalTaxIfLong,
      totalTaxIfShort,
    };
  }, [sellingPrice, costBasis, fees, holdingPeriod, filingStatus, otherIncome, stateTaxRate]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `${holdingPeriod === 'long' ? 'Long-Term' : 'Short-Term'} Gain of ${formatCurrency(calculation.gainAmount, '$', 0)}: Total Tax ${formatCurrency(calculation.totalTaxOnGain, '$', 0)} (${calculation.effectiveTaxRateOnGain.toFixed(1)}%)`,
        {
          sellingPrice,
          costBasis,
          fees,
          holdingPeriod,
          filingStatus,
          otherIncome,
          stateTaxRate,
        },
        {
          netGain: calculation.netGain,
          totalTaxOnGain: calculation.totalTaxOnGain,
          effectiveTaxRateOnGain: calculation.effectiveTaxRateOnGain,
          netCashProfit: calculation.netCashProfit,
          federalCapitalGainsTax: calculation.federalCapitalGainsTax,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Holding Period & Filing Status Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Holding Period Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Asset Holding Period:
          </span>
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setHoldingPeriod('long')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                holdingPeriod === 'long'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Long-Term (&gt; 1 Year: 0/15/20%)
            </button>
            <button
              type="button"
              onClick={() => setHoldingPeriod('short')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                holdingPeriod === 'short'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Short-Term (≤ 1 Year: Ordinary Rates)
            </button>
          </div>
        </div>

        {/* Filing Status Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">IRS Status:</span>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            className="text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
          >
            <option value="single">Single Filer</option>
            <option value="married_joint">Married Filing Jointly</option>
            <option value="married_separate">Married Filing Separately</option>
            <option value="head_of_household">Head of Household</option>
          </select>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Transaction Specifics */}
        <div className="space-y-4">
          <CalcInput
            id="sellingPrice"
            label="Gross Asset Selling Price / Proceeds"
            value={sellingPrice}
            onChange={(val) => setSellingPrice(val)}
            min={0}
            step={2500}
            prefix="$"
            helpText="Total cash or fair market value received upon selling stocks, crypto, real estate, or equity."
          />

          <CalcInput
            id="costBasis"
            label="Original Purchase Price / Cost Basis"
            value={costBasis}
            onChange={(val) => setCostBasis(val)}
            min={0}
            step={2500}
            prefix="$"
            helpText="Original acquisition purchase price including reinvested dividends and capital improvements."
          />

          <CalcInput
            id="fees"
            label="Selling Costs, Commissions & Legal Fees"
            value={fees}
            onChange={(val) => setFees(val)}
            min={0}
            step={100}
            prefix="$"
            helpText="Brokerage trading fees, exchange transfer fees, or real estate realtor commissions."
          />
        </div>

        {/* Right: Income & Tax Context */}
        <div className="space-y-4">
          <CalcInput
            id="otherIncome"
            label="Annual Ordinary Income / W-2 Wages"
            value={otherIncome}
            onChange={(val) => setOtherIncome(val)}
            min={0}
            step={5000}
            prefix="$"
            helpText="Your non-capital salary, 1099, or business income (determines your starting LTCG/NIIT tax bracket)."
          />

          <CalcInput
            id="stateTaxRate"
            label="Estimated State Capital Gains Tax Rate"
            value={stateTaxRate}
            onChange={(val) => setStateTaxRate(val)}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
            helpText="0% in TX/FL/NV/TN/WY/SD, ~3%–6% average states, up to 13.3% in CA."
          />

          <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Net Recognized Capital Gain:
            </span>
            <span className={`text-sm font-black font-mono ${calculation.isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {calculation.isGain ? `+${formatCurrency(calculation.gainAmount, '$', 0)}` : `-${formatCurrency(calculation.lossAmount, '$', 0)} (Tax Loss)`}
            </span>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Total Capital Gains Tax"
          value={formatCurrency(calculation.totalTaxOnGain, '$', 0)}
          subtitle={`Effective Tax Rate: ${calculation.effectiveTaxRateOnGain.toFixed(1)}%`}
          highlighted={true}
          icon={<Receipt className="w-5 h-5" />}
        />

        <CalcResultCard
          title="Federal Capital Gains Tax"
          value={formatCurrency(calculation.federalCapitalGainsTax, '$', 0)}
          subtitle={holdingPeriod === 'long' ? 'Preferential 0% / 15% / 20% rates' : 'Marginal ordinary income tax'}
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Net After-Tax Profit"
          value={formatCurrency(calculation.netCashProfit, '$', 0)}
          subtitle={`Net Cash Kept from ${formatCurrency(calculation.gainAmount, '$', 0)} Gain`}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Net Cash Proceeds"
          value={formatCurrency(calculation.netProceedsAfterTax, '$', 0)}
          subtitle="Final check/bank deposit after fees & tax"
          icon={<ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />
      </div>

      {/* Long-Term vs Short-Term Comparison Callout */}
      {calculation.gainAmount > 0 && (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Holding Period Tax Arbitrage Analysis (2024 IRS Rules)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Holding this asset over 1 year (Long-Term) saves{' '}
              <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono">
                {formatCurrency(calculation.taxSavedByHoldingLongTerm, '$', 0)}
              </strong>{' '}
              in direct federal taxes compared to short-term ordinary rates ($
              {Math.round(calculation.totalTaxIfLong).toLocaleString()} vs $
              {Math.round(calculation.totalTaxIfShort).toLocaleString()}).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHoldingPeriod(holdingPeriod === 'long' ? 'short' : 'long')}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shrink-0"
          >
            Switch to {holdingPeriod === 'long' ? 'Short-Term' : 'Long-Term'} View
          </button>
        </div>
      )}

      {/* Detailed Tax Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Federal Bracket Distribution */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. Federal Bracket Tiering
            </h4>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono">
              {formatCurrency(calculation.federalCapitalGainsTax, '$', 0)}
            </span>
          </div>

          {holdingPeriod === 'long' ? (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>0% LTCG Bracket:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.ltcgBracket0, '$', 0)} ($0 Tax)
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>15% LTCG Bracket:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.ltcgBracket15, '$', 0)} ({formatCurrency(calculation.ltcgBracket15 * 0.15, '$', 0)})
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>20% LTCG Bracket:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.ltcgBracket20, '$', 0)} ({formatCurrency(calculation.ltcgBracket20 * 0.20, '$', 0)})
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <p className="text-slate-600 dark:text-slate-400">
                Short-term gains are taxed at your marginal ordinary income rate.
              </p>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Marginal Ordinary Tax:</span>
                <span className="font-mono text-teal-600 dark:text-teal-400">
                  {formatCurrency(calculation.stcgTax, '$', 0)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card 2: Surtaxes & State Taxes */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              2. Surtaxes & State Taxes
            </h4>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
              {formatCurrency(calculation.niitTax + calculation.estimatedStateTax, '$', 0)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>NIIT 3.8% Surtax (IRC § 1411):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.niitTax, '$', 0)}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              {calculation.niitTax > 0
                ? `Assessed on ${formatCurrency(calculation.niitSubjectAmount, '$', 0)} exceeding statutory MAGI cap.`
                : 'Income below MAGI statutory threshold (exempt from 3.8% surtax).'}
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>State Tax ({stateTaxRate}%):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.estimatedStateTax, '$', 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Final Transaction Summary */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              3. Cash Flow Summary
            </h4>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              Final Net
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Gross Proceeds:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.sell, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Cost Basis + Fees:</span>
              <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                -{formatCurrency(calculation.adjustedBasis, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Total Taxes Owed:</span>
              <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                -{formatCurrency(calculation.totalTaxOnGain, '$', 0)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-slate-900 dark:text-white">
              <span>Net Take-Home Cash:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(calculation.netProceedsAfterTax, '$', 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
