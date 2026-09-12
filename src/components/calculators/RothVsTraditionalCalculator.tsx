import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency } from '../../lib/mathUtils';
import { ShieldCheck, TrendingUp, DollarSign, Scale, CheckCircle2, ArrowRightLeft, Info, HelpCircle } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

export const RothVsTraditionalCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  // Mode & Profile
  const [accountType, setAccountType] = useState<'ira' | '401k' | 'custom'>('ira');
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [annualContribution, setAnnualContribution] = useState<number>(7000);
  const [currentTaxRate, setCurrentTaxRate] = useState<number>(24);
  const [retirementTaxRate, setRetirementTaxRate] = useState<number>(15);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(7.0);
  
  // Tax savings reinvestment toggle (for max limit contributions)
  const [reinvestTaxSavings, setReinvestTaxSavings] = useState<boolean>(true);
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = useState<number>(15);

  // Set limits based on account type
  const handleAccountTypeChange = (type: 'ira' | '401k' | 'custom') => {
    setAccountType(type);
    if (type === 'ira') {
      setAnnualContribution(currentAge >= 50 ? 8000 : 7000);
    } else if (type === '401k') {
      setAnnualContribution(currentAge >= 50 ? 30500 : 23000);
    }
  };

  const calculation = useMemo(() => {
    const age = Math.max(16, safeParseNumber(currentAge, 30));
    const retAge = Math.max(age + 1, safeParseNumber(retirementAge, 65));
    const years = retAge - age;
    const grossContribution = Math.max(0, safeParseNumber(annualContribution, 7000));
    const tCurrent = Math.max(0, Math.min(60, safeParseNumber(currentTaxRate, 24))) / 100;
    const tRetirement = Math.max(0, Math.min(60, safeParseNumber(retirementTaxRate, 15))) / 100;
    const r = Math.max(0.001, safeParseNumber(annualReturnRate, 7.0)) / 100;
    const tCapGains = Math.max(0, Math.min(30, safeParseNumber(capitalGainsTaxRate, 15))) / 100;

    // Upfront Tax Savings per year for Traditional
    const annualTaxSavings = grossContribution * tCurrent;
    const totalTaxSavingsOverCareer = annualTaxSavings * years;

    // Future Value Annuity Multiplier: FV = PMT * [((1 + r)^n - 1) / r]
    const fvFactor = (Math.pow(1 + r, years) - 1) / r;

    // 1. TRADITIONAL ACCOUNT CALCULATION
    // Full gross contribution goes into Traditional account pre-tax
    const traditionalGrossBalance = grossContribution * fvFactor;
    const traditionalTotalContributions = grossContribution * years;
    const traditionalEarnings = traditionalGrossBalance - traditionalTotalContributions;
    
    // Tax paid on full Traditional withdrawals at retirement
    const traditionalRetirementTaxes = traditionalGrossBalance * tRetirement;
    const traditionalNetFromAccount = traditionalGrossBalance * (1 - tRetirement);

    // If reinvesting upfront tax savings in a taxable brokerage account:
    // Taxable brokerage account gets drag from annual capital gains/dividends or liquidation at retirement
    // Effective growth rate with dividend drag approx: r * (1 - 0.15 * tCapGains)
    const taxableGrowthRate = r * 0.95; // slight dividend drag during compounding
    const taxableFvFactor = (Math.pow(1 + taxableGrowthRate, years) - 1) / taxableGrowthRate;
    const taxableBrokerageGross = annualTaxSavings * taxableFvFactor;
    const taxableCostBasis = annualTaxSavings * years;
    const taxableCapitalGains = Math.max(0, taxableBrokerageGross - taxableCostBasis);
    const taxableBrokerageTaxAtLiquidation = taxableCapitalGains * tCapGains;
    const taxableBrokerageNet = reinvestTaxSavings
      ? taxableBrokerageGross - taxableBrokerageTaxAtLiquidation
      : 0;

    const totalTraditionalNetWealth = traditionalNetFromAccount + taxableBrokerageNet;

    // 2. ROTH ACCOUNT CALCULATION
    // Under standard limit matching: Same dollar amount contributed to Roth (taxes paid out of pocket today)
    const rothGrossBalance = grossContribution * fvFactor;
    const rothTotalContributions = grossContribution * years;
    const rothEarnings = rothGrossBalance - rothTotalContributions;
    // Qualified Roth withdrawals in retirement are 100% tax-free
    const rothRetirementTaxes = 0;
    const totalRothNetWealth = rothGrossBalance;

    // 3. COMPARISON & METRICS
    const difference = totalRothNetWealth - totalTraditionalNetWealth;
    const isRothWinner = difference > 0.01;
    const isTraditionalWinner = difference < -0.01;
    const isTie = Math.abs(difference) <= 0.01;

    const percentAdvantage = Math.min(totalTraditionalNetWealth, totalRothNetWealth) > 0
      ? (Math.abs(difference) / Math.min(totalTraditionalNetWealth, totalRothNetWealth)) * 100
      : 0;

    // Break-Even Tax Rate: The exact retirement tax rate where Traditional + Reinvested Tax Savings equals Roth
    // If no tax savings reinvested, break-even is simply currentTaxRate.
    // If reinvested, break-even is slightly higher because taxable account suffers capital gains tax.
    let breakEvenTaxRate = tCurrent * 100;
    if (reinvestTaxSavings && traditionalGrossBalance > 0) {
      // RothNet = TradGross*(1 - tRet) + TaxableNet
      // => tRet = 1 - (RothNet - TaxableNet) / TradGross
      const calculatedBreakEven = (1 - (totalRothNetWealth - taxableBrokerageNet) / traditionalGrossBalance) * 100;
      breakEvenTaxRate = Math.max(0, Math.min(60, calculatedBreakEven));
    }

    // Generate year-by-year simulation schedule (sampled every 5 years or full 35 years)
    const timeline = [];
    const stepSize = years > 20 ? 5 : 1;

    for (let yr = 1; yr <= years; yr++) {
      if (yr % stepSize === 0 || yr === years) {
        const factorYr = (Math.pow(1 + r, yr) - 1) / r;
        const tradGrossYr = grossContribution * factorYr;
        const tradNetYr = tradGrossYr * (1 - tRetirement);

        const taxFactorYr = (Math.pow(1 + taxableGrowthRate, yr) - 1) / taxableGrowthRate;
        const taxGrossYr = annualTaxSavings * taxFactorYr;
        const taxGainYr = Math.max(0, taxGrossYr - annualTaxSavings * yr);
        const taxNetYr = reinvestTaxSavings ? taxGrossYr - (taxGainYr * tCapGains) : 0;

        const rothNetYr = grossContribution * factorYr;

        timeline.push({
          year: yr,
          age: age + yr,
          rothNet: rothNetYr,
          tradNet: tradNetYr + taxNetYr,
          tradAccountOnly: tradNetYr,
          taxableBrokerage: taxNetYr,
          difference: rothNetYr - (tradNetYr + taxNetYr),
        });
      }
    }

    return {
      age,
      retAge,
      years,
      grossContribution,
      currentTaxRate: tCurrent * 100,
      retirementTaxRate: tRetirement * 100,
      annualReturnRate: r * 100,
      annualTaxSavings,
      totalTaxSavingsOverCareer,
      traditionalGrossBalance,
      traditionalRetirementTaxes,
      traditionalNetFromAccount,
      taxableBrokerageNet,
      totalTraditionalNetWealth,
      rothGrossBalance,
      totalRothNetWealth,
      difference,
      isRothWinner,
      isTraditionalWinner,
      isTie,
      percentAdvantage,
      breakEvenTaxRate,
      timeline,
    };
  }, [
    accountType,
    currentAge,
    retirementAge,
    annualContribution,
    currentTaxRate,
    retirementTaxRate,
    annualReturnRate,
    reinvestTaxSavings,
    capitalGainsTaxRate,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      const winnerText = calculation.isRothWinner
        ? `Roth wins by ${formatCurrency(calculation.difference, '$', 0)}`
        : calculation.isTraditionalWinner
        ? `Traditional wins by ${formatCurrency(Math.abs(calculation.difference), '$', 0)}`
        : 'Roth and Traditional are equal';

      onSaveHistory(
        `${accountType.toUpperCase()}: ${winnerText} at Age ${calculation.retAge}`,
        {
          accountType,
          currentAge,
          retirementAge,
          annualContribution,
          currentTaxRate,
          retirementTaxRate,
          annualReturnRate,
          reinvestTaxSavings,
        },
        {
          totalRothNetWealth: calculation.totalRothNetWealth,
          totalTraditionalNetWealth: calculation.totalTraditionalNetWealth,
          difference: calculation.difference,
          breakEvenTaxRate: calculation.breakEvenTaxRate,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Account Type Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          Retirement Vehicle:
        </span>
        <div className="flex items-center gap-2">
          {[
            { id: 'ira', label: 'IRA ($7k Max)', desc: 'Individual Retirement Account' },
            { id: '401k', label: '401(k) ($23k Max)', desc: 'Employer-Sponsored Plan' },
            { id: 'custom', label: 'Custom Contribution', desc: 'Custom Dollar Amount' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleAccountTypeChange(type.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                accountType === type.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left Column: Contributions & Horizon */}
        <div className="space-y-4">
          <CalcInput
            id="annualContribution"
            label={`Annual Contribution (${accountType.toUpperCase()})`}
            value={annualContribution}
            onChange={(val) => setAnnualContribution(val)}
            min={100}
            step={accountType === '401k' ? 1000 : 500}
            prefix="$"
            helpText={
              accountType === 'ira'
                ? '2024 IRS limit: $7,000 ($8,000 if age 50+).'
                : accountType === '401k'
                ? '2024 IRS limit: $23,000 ($30,500 if age 50+).'
                : 'Projected annual contribution amount.'
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              id="currentAge"
              label="Current Age"
              value={currentAge}
              onChange={(val) => setCurrentAge(val)}
              min={16}
              max={85}
              step={1}
              suffix="yrs"
            />
            <CalcInput
              id="retirementAge"
              label="Target Retirement Age"
              value={retirementAge}
              onChange={(val) => setRetirementAge(val)}
              min={currentAge + 1}
              max={95}
              step={1}
              suffix="yrs"
            />
          </div>

          <CalcInput
            id="annualReturnRate"
            label="Expected Annual Investment Return"
            value={annualReturnRate}
            onChange={(val) => setAnnualReturnRate(val)}
            min={1}
            max={15}
            step={0.5}
            suffix="%"
            helpText="Historical long-term nominal returns: ~7%–10% for stock index funds."
          />
        </div>

        {/* Right Column: Tax Brackets & Reinvestment */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Current Marginal Tax Rate (Today)
              </label>
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                {currentTaxRate}%
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 mb-2">
              {[12, 22, 24, 32, 35, 37].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setCurrentTaxRate(rate)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    currentTaxRate === rate
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Tax saved on Traditional contributions today (or paid upfront for Roth).
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Expected Retirement Tax Rate (Future)
              </label>
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                {retirementTaxRate}%
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {[10, 12, 22, 24].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setRetirementTaxRate(rate)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    retirementTaxRate === rate
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Effective tax rate applied to Traditional withdrawals when retired.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={reinvestTaxSavings}
                onChange={(e) => setReinvestTaxSavings(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Reinvest Traditional Tax Savings (${formatCurrency(calculation.annualTaxSavings, '$', 0)}/yr) in Brokerage
              </span>
            </label>
            <p className="text-[11px] text-slate-500 mt-1 pl-6">
              Ensures fair apples-to-apples comparison by compounding the upfront tax refund.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Result Banner & Strategic Recommendation */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          calculation.isRothWinner
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
            : calculation.isTraditionalWinner
            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800'
            : 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  calculation.isRothWinner
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                    : calculation.isTraditionalWinner
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {calculation.isRothWinner
                  ? 'ROTH RECOMMENDED'
                  : calculation.isTraditionalWinner
                  ? 'TRADITIONAL RECOMMENDED'
                  : 'EQUIVALENT VALUE'}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Over {calculation.years} Years of Compounding
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {calculation.isRothWinner
                ? `Roth delivers +${formatCurrency(calculation.difference, '$', 0)} (+${calculation.percentAdvantage.toFixed(1)}%) more net spendable cash`
                : calculation.isTraditionalWinner
                ? `Traditional delivers +${formatCurrency(Math.abs(calculation.difference), '$', 0)} (+${calculation.percentAdvantage.toFixed(1)}%) more net wealth`
                : 'Both accounts produce identical net retirement cash flow'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {calculation.isRothWinner
                ? `Because your current tax bracket (${calculation.currentTaxRate}%) is higher or your tax-free compounding overcomes future taxes, paying taxes today unlocks $0 retirement taxes on ${formatCurrency(calculation.totalRothNetWealth, '$', 0)}.`
                : `Because your retirement tax rate (${calculation.retirementTaxRate}%) is lower than today (${calculation.currentTaxRate}%), deducting contributions now and reinvesting the $${formatCurrency(calculation.annualTaxSavings, '$', 0)} annual tax savings yields superior terminal wealth.`}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center min-w-[160px] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Break-Even Tax Rate
            </span>
            <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-0.5">
              {calculation.breakEvenTaxRate.toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-400">
              If future tax &lt; {calculation.breakEvenTaxRate.toFixed(1)}%, Traditional wins
            </span>
          </div>
        </div>
      </div>

      {/* KPI Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Roth Net Retirement Value"
          value={formatCurrency(calculation.totalRothNetWealth, '$', 0)}
          subtitle="100% tax-free qualified withdrawals"
          highlighted={calculation.isRothWinner}
          icon={<ShieldCheck className="w-5 h-5" />}
        />

        <CalcResultCard
          title="Traditional Net Wealth"
          value={formatCurrency(calculation.totalTraditionalNetWealth, '$', 0)}
          subtitle={`Net after ${calculation.retirementTaxRate}% retirement taxes`}
          highlighted={calculation.isTraditionalWinner}
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Upfront Tax Benefit (Today)"
          value={formatCurrency(calculation.annualTaxSavings, '$', 0)}
          subtitle={`Annual savings (${formatCurrency(calculation.totalTaxSavingsOverCareer, '$', 0)} total)`}
          icon={<ArrowRightLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Taxes Paid at Retirement"
          value={formatCurrency(calculation.traditionalRetirementTaxes, '$', 0)}
          subtitle="On Traditional withdrawals ($0 for Roth)"
          icon={<Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Side-by-Side Account Breakdown Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roth Profile */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Roth IRA / 401(k) Summary
              </h4>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
              Tax-Free Growth
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Upfront Tax Deduction Today:</span>
              <span className="font-mono font-semibold text-rose-500">$0 (After-tax funds)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Total Out-of-Pocket Contributions:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.grossContribution * calculation.years, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Investment Growth Accumulated:</span>
              <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">
                {formatCurrency(calculation.rothGrossBalance - (calculation.grossContribution * calculation.years), '$', 0)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Gross Account Balance at Age {calculation.retAge}:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.rothGrossBalance, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Retirement Withdrawal Tax:</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">$0.00 (Tax-Free)</span>
            </div>
            <div className="flex justify-between pt-2 text-sm font-bold">
              <span className="text-slate-900 dark:text-white">Final Net Spendable Cash:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {formatCurrency(calculation.totalRothNetWealth, '$', 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Traditional Profile */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Traditional IRA / 401(k) Summary
              </h4>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              Tax-Deferred Growth
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Annual Upfront Tax Refund:</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                +{formatCurrency(calculation.annualTaxSavings, '$', 0)}/yr
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Gross Account Balance at Age {calculation.retAge}:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.traditionalGrossBalance, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Taxes Owed on Withdrawals ({calculation.retirementTaxRate}%):</span>
              <span className="font-mono font-semibold text-rose-500">
                -{formatCurrency(calculation.traditionalRetirementTaxes, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Net from Traditional Account:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.traditionalNetFromAccount, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500">Reinvested Tax Refund (Taxable Brokerage):</span>
              <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">
                +{formatCurrency(calculation.taxableBrokerageNet, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-sm font-bold">
              <span className="text-slate-900 dark:text-white">Total Net Spendable Wealth:</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                {formatCurrency(calculation.totalTraditionalNetWealth, '$', 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Decade Projection Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-500" />
            Net Wealth Projection by Horizon
          </h3>
          <span className="text-xs text-slate-500">
            Assumes <strong>{calculation.annualReturnRate}%</strong> compound annual return
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Year</th>
                <th className="py-2.5 px-3 font-semibold">Age</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">Roth Net Value</th>
                <th className="py-2.5 px-3 font-semibold text-blue-600 dark:text-blue-400">Traditional Net Total</th>
                <th className="py-2.5 px-3 font-semibold">Trad Account (Net)</th>
                <th className="py-2.5 px-3 font-semibold">Reinvested Tax Savings</th>
                <th className="py-2.5 px-3 font-semibold text-right">Net Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.timeline.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300">
                  <td className="py-2.5 px-3 font-mono font-bold">Year {row.year}</td>
                  <td className="py-2.5 px-3 font-mono">{row.age}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(row.rothNet, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(row.tradNet, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">
                    {formatCurrency(row.tradAccountOnly, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">
                    {formatCurrency(row.taxableBrokerage, '$', 0)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md ${
                        row.difference > 0
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                          : row.difference < 0
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {row.difference > 0
                        ? `Roth +${formatCurrency(row.difference, '$', 0)}`
                        : row.difference < 0
                        ? `Trad +${formatCurrency(Math.abs(row.difference), '$', 0)}`
                        : '$0'}
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
