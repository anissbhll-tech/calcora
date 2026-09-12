import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency } from '../../lib/mathUtils';
import { Briefcase, DollarSign, Calendar, ShieldCheck, PieChart, Percent, Receipt, HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household';

interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}

// 2024 IRS Statutory Parameters
const SS_WAGE_CAP_2024 = 168600; // 2024 Social Security wage base limit
const SE_BASE_FACTOR = 0.9235; // 92.35% statutory net earnings multiplier (100% - 7.65%)
const SS_TAX_RATE = 0.124; // 12.4% (6.2% employee + 6.2% employer equivalent)
const MEDICARE_TAX_RATE = 0.029; // 2.9% (1.45% employee + 1.45% employer equivalent)
const ADDITIONAL_MEDICARE_RATE = 0.009; // 0.9% ACA surtax

const ADDITIONAL_MEDICARE_THRESHOLDS: Record<FilingStatus, number> = {
  single: 200000,
  head_of_household: 200000,
  married_joint: 250000,
  married_separate: 125000,
};

const STANDARD_DEDUCTIONS_2024: Record<FilingStatus, number> = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
};

const TAX_BRACKETS_2024: Record<FilingStatus, TaxBracket[]> = {
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

export const SelfEmploymentTaxCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  // Input state
  const [grossIncome, setGrossIncome] = useState<number>(100000);
  const [businessExpenses, setBusinessExpenses] = useState<number>(15000);
  const [w2Wages, setW2Wages] = useState<number>(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [applyQBI, setApplyQBI] = useState<boolean>(true);
  const [estimatedStateTaxRate, setEstimatedStateTaxRate] = useState<number>(4.0);

  const calculation = useMemo(() => {
    const gross = Math.max(0, safeParseNumber(grossIncome, 0));
    const expenses = Math.max(0, safeParseNumber(businessExpenses, 0));
    const netProfit = Math.max(0, gross - expenses);
    const w2 = Math.max(0, safeParseNumber(w2Wages, 0));
    const stateTaxRate = Math.max(0, Math.min(20, safeParseNumber(estimatedStateTaxRate, 0))) / 100;

    // IRS Threshold: If net earnings from self-employment are under $400, no SE tax is assessed
    const isUnderThreshold = netProfit < 400;

    // 1. Taxable Self-Employment Earnings (Schedule SE line 4a)
    const taxableSEEarnings = isUnderThreshold ? 0 : netProfit * SE_BASE_FACTOR;

    // 2. Social Security Tax (12.4% up to 2024 wage base of $168,600, reduced by W-2 wages)
    const remainingSSCap = Math.max(0, SS_WAGE_CAP_2024 - w2);
    const ssTaxableEarnings = Math.min(taxableSEEarnings, remainingSSCap);
    const socialSecurityTax = ssTaxableEarnings * SS_TAX_RATE;

    // 3. Medicare Tax (2.9% uncapped)
    const medicareTax = taxableSEEarnings * MEDICARE_TAX_RATE;

    // 4. Additional Medicare Tax (0.9% over statutory threshold)
    const threshold = ADDITIONAL_MEDICARE_THRESHOLDS[filingStatus];
    const totalCombinedIncome = w2 + taxableSEEarnings;
    const excessOverThreshold = Math.max(0, totalCombinedIncome - threshold);
    const seExcessShare = Math.min(taxableSEEarnings, excessOverThreshold);
    const additionalMedicareTax = seExcessShare * ADDITIONAL_MEDICARE_RATE;

    // Total Self-Employment Tax (Schedule SE)
    const totalSelfEmploymentTax = socialSecurityTax + medicareTax + additionalMedicareTax;

    // 5. Deductible 50% Portion of Self-Employment Tax (Schedule 1 line 15 deduction for AGI)
    const deductibleSETax = totalSelfEmploymentTax / 2;

    // 6. Section 199A Qualified Business Income (QBI) Deduction (up to 20% of net profit after SE deduction)
    const qbiEligibleProfit = Math.max(0, netProfit - deductibleSETax);
    const qbiDeduction = applyQBI ? qbiEligibleProfit * 0.20 : 0;

    // 7. Adjusted Gross Income & Federal Taxable Income
    const adjustedGrossIncome = Math.max(0, w2 + netProfit - deductibleSETax);
    const standardDeduction = STANDARD_DEDUCTIONS_2024[filingStatus];
    const taxableIncome = Math.max(0, adjustedGrossIncome - standardDeduction - qbiDeduction);

    // 8. Progressive Federal Income Tax Calculation
    const brackets = TAX_BRACKETS_2024[filingStatus];
    let federalIncomeTax = 0;
    const bracketBreakdown: { rate: number; min: number; max: number; taxableInBracket: number; taxAmount: number }[] = [];

    for (const b of brackets) {
      if (taxableIncome > b.min) {
        const taxableInBracket = Math.min(taxableIncome, b.max) - b.min;
        const taxAmount = taxableInBracket * b.rate;
        federalIncomeTax += taxAmount;
        bracketBreakdown.push({
          rate: b.rate * 100,
          min: b.min,
          max: b.max,
          taxableInBracket,
          taxAmount,
        });
      } else {
        break;
      }
    }

    // 9. State & Local Tax Estimate
    const estimatedStateTax = taxableIncome * stateTaxRate;

    // 10. Total Tax Burden, Quarterly Deadlines, & Net Take-Home Pay
    const totalTaxLiability = totalSelfEmploymentTax + federalIncomeTax + estimatedStateTax;
    const quarterlyPayment = totalTaxLiability / 4;
    const totalIncome = netProfit + w2;
    const effectiveTotalTaxRate = totalIncome > 0 ? (totalTaxLiability / totalIncome) * 100 : 0;
    const effectiveSETaxRate = netProfit > 0 ? (totalSelfEmploymentTax / netProfit) * 100 : 0;
    const netTakeHomePay = Math.max(0, totalIncome - totalTaxLiability);
    const monthlyTakeHomePay = netTakeHomePay / 12;

    return {
      gross,
      expenses,
      netProfit,
      w2,
      isUnderThreshold,
      taxableSEEarnings,
      ssTaxableEarnings,
      remainingSSCap,
      socialSecurityTax,
      medicareTax,
      additionalMedicareTax,
      totalSelfEmploymentTax,
      deductibleSETax,
      qbiDeduction,
      adjustedGrossIncome,
      standardDeduction,
      taxableIncome,
      federalIncomeTax,
      bracketBreakdown,
      estimatedStateTax,
      totalTaxLiability,
      quarterlyPayment,
      totalIncome,
      effectiveTotalTaxRate,
      effectiveSETaxRate,
      netTakeHomePay,
      monthlyTakeHomePay,
    };
  }, [grossIncome, businessExpenses, w2Wages, filingStatus, applyQBI, estimatedStateTaxRate]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `1099 Tax on ${formatCurrency(calculation.netProfit, '$', 0)}: SE Tax ${formatCurrency(calculation.totalSelfEmploymentTax, '$', 0)} | Total ${formatCurrency(calculation.totalTaxLiability, '$', 0)} (Quarterly: ${formatCurrency(calculation.quarterlyPayment, '$', 0)})`,
        {
          grossIncome,
          businessExpenses,
          w2Wages,
          filingStatus,
          applyQBI,
          estimatedStateTaxRate,
        },
        {
          netProfit: calculation.netProfit,
          totalSelfEmploymentTax: calculation.totalSelfEmploymentTax,
          federalIncomeTax: calculation.federalIncomeTax,
          totalTaxLiability: calculation.totalTaxLiability,
          quarterlyPayment: calculation.quarterlyPayment,
          netTakeHomePay: calculation.netTakeHomePay,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Filing Status Quick Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          Filing Status (Tax Year 2024):
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'single', label: 'Single ($14.6k Std Ded)' },
            { id: 'married_joint', label: 'Married Joint ($29.2k Std Ded)' },
            { id: 'married_separate', label: 'Married Separate' },
            { id: 'head_of_household', label: 'Head of Household' },
          ].map((status) => (
            <button
              key={status.id}
              type="button"
              onClick={() => setFilingStatus(status.id as FilingStatus)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filingStatus === status.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left Column: Business Revenue & Deductions */}
        <div className="space-y-4">
          <CalcInput
            id="grossIncome"
            label="Gross 1099 / Freelance / Business Revenue"
            value={grossIncome}
            onChange={(val) => setGrossIncome(val)}
            min={0}
            step={5000}
            prefix="$"
            helpText="Total gross earnings received from 1099-NEC, 1099-K, clients, and direct sales."
          />

          <CalcInput
            id="businessExpenses"
            label="Ordinary & Necessary Business Expenses (Schedule C)"
            value={businessExpenses}
            onChange={(val) => setBusinessExpenses(val)}
            min={0}
            step={1000}
            prefix="$"
            helpText="Supplies, mileage, software, equipment depreciation, contractor pay, home office."
          />

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Net Schedule C Business Profit:
            </span>
            <span className="text-sm font-black font-mono text-teal-600 dark:text-teal-400">
              {formatCurrency(calculation.netProfit, '$', 0)}
            </span>
          </div>
        </div>

        {/* Right Column: Other Income & Tax Settings */}
        <div className="space-y-4">
          <CalcInput
            id="w2Wages"
            label="Other W-2 Employment Wages (If any)"
            value={w2Wages}
            onChange={(val) => setW2Wages(val)}
            min={0}
            step={5000}
            prefix="$"
            helpText="W-2 wages reduce the $168,600 Social Security wage cap for your 1099 income."
          />

          <CalcInput
            id="estimatedStateTaxRate"
            label="Estimated State & Local Income Tax Rate"
            value={estimatedStateTaxRate}
            onChange={(val) => setEstimatedStateTaxRate(val)}
            min={0}
            max={15}
            step={0.5}
            suffix="%"
            helpText="e.g. 0% for TX/FL/WA, ~3%–6% for average states, 9%+ for CA/NY."
          />

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={applyQBI}
                onChange={(e) => setApplyQBI(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Apply 20% Qualified Business Income (QBI Section 199A) Deduction
              </span>
            </label>
            <p className="text-[11px] text-slate-500 mt-1 pl-6">
              Deducts up to 20% of net self-employment profit from federal taxable income.
            </p>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Self-Employment Tax (SE)"
          value={formatCurrency(calculation.totalSelfEmploymentTax, '$', 0)}
          subtitle={`15.3% on ${formatCurrency(calculation.taxableSEEarnings, '$', 0)} taxable SE base`}
          highlighted={true}
          icon={<Receipt className="w-5 h-5" />}
        />

        <CalcResultCard
          title="Quarterly Estimated Payment"
          value={formatCurrency(calculation.quarterlyPayment, '$', 0)}
          subtitle="Form 1040-ES (4 equal payments/year)"
          icon={<Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Total Estimated Tax"
          value={formatCurrency(calculation.totalTaxLiability, '$', 0)}
          subtitle={`SE Tax + Federal (${formatCurrency(calculation.federalIncomeTax, '$', 0)}) + State`}
          icon={<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Net After-Tax Take-Home"
          value={formatCurrency(calculation.netTakeHomePay, '$', 0)}
          subtitle={`${formatCurrency(calculation.monthlyTakeHomePay, '$', 0)}/mo (${(100 - calculation.effectiveTotalTaxRate).toFixed(1)}% kept)`}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Detailed Tax Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Self-Employment Tax Sub-Components */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. SE Tax Components (15.3%)
            </h4>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono">
              {formatCurrency(calculation.totalSelfEmploymentTax, '$', 0)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Taxable SE Base (92.35%):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.taxableSEEarnings, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Social Security (12.4%):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.socialSecurityTax, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Medicare (2.9%):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.medicareTax, '$', 0)}
              </span>
            </div>
            {calculation.additionalMedicareTax > 0 && (
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>Addl. Medicare (0.9% surtax):</span>
                <span className="font-mono font-semibold">
                  +{formatCurrency(calculation.additionalMedicareTax, '$', 0)}
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>50% Above-the-Line Deduction:</span>
              <span className="font-mono">-{formatCurrency(calculation.deductibleSETax, '$', 0)}</span>
            </div>
          </div>
        </div>

        {/* 2. Income Tax Deductions & Adjusted Income */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              2. Income Tax Deductions
            </h4>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
              {formatCurrency(calculation.standardDeduction + calculation.qbiDeduction + calculation.deductibleSETax, '$', 0)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Adjusted Gross Income (AGI):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(calculation.adjustedGrossIncome, '$', 0)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Standard Deduction (2024):</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                -{formatCurrency(calculation.standardDeduction, '$', 0)}
              </span>
            </div>
            {calculation.qbiDeduction > 0 && (
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>QBI 20% Sec. 199A Deduction:</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  -{formatCurrency(calculation.qbiDeduction, '$', 0)}
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-slate-900 dark:text-white">
              <span>Federal Taxable Income:</span>
              <span className="font-mono text-teal-600 dark:text-teal-400">
                {formatCurrency(calculation.taxableIncome, '$', 0)}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Estimated Quarterly Schedule (Form 1040-ES) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              3. 1040-ES Quarterly Deadlines
            </h4>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              4 Payments
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {[
              { q: 'Q1', period: 'Jan 1 – Mar 31', due: 'April 15' },
              { q: 'Q2', period: 'Apr 1 – May 31', due: 'June 15' },
              { q: 'Q3', period: 'Jun 1 – Aug 31', due: 'September 15' },
              { q: 'Q4', period: 'Sep 1 – Dec 31', due: 'January 15 (Next Yr)' },
            ].map((item) => (
              <div key={item.q} className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {item.q} ({item.due}):
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.quarterlyPayment, '$', 0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tax Bracket Breakdown Table */}
      {calculation.bracketBreakdown.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Percent className="w-4 h-4 text-teal-500" />
              Federal Income Tax Progressive Bracket Breakdown (Tax Year 2024)
            </h3>
            <span className="text-xs text-slate-500">
              Total Federal Income Tax: <strong>{formatCurrency(calculation.federalIncomeTax, '$', 0)}</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-3 font-semibold">Tax Bracket</th>
                  <th className="py-2.5 px-3 font-semibold">Taxable Range</th>
                  <th className="py-2.5 px-3 font-semibold">Income in Bracket</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Tax Assessed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {calculation.bracketBreakdown.map((b) => (
                  <tr key={b.rate} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300">
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                      {b.rate}%
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">
                      ${b.min.toLocaleString()} – {b.max === Infinity ? 'Above' : `$${b.max.toLocaleString()}`}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(b.taxableInBracket, '$', 0)}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-right text-slate-900 dark:text-white">
                      {formatCurrency(b.taxAmount, '$', 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
