import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { DollarSign, Percent, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

interface Props {
  onSaveToHistory?: (summaryText: string, inputs: Record<string, any>, results: Record<string, any>) => void;
}

type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household';

interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}

// IRS 2024 Tax Brackets & Standard Deductions (Inflation-adjusted)
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

const STANDARD_DEDUCTIONS_2024: Record<FilingStatus, number> = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
};

export const FederalIncomeTaxBracketCalculator: React.FC<Props> = ({ onSaveToHistory }) => {
  const [grossIncome, setGrossIncome] = useState<number>(85000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard');
  const [customDeductions, setCustomDeductions] = useState<number>(18000);
  const [preTaxContributions, setPreTaxContributions] = useState<number>(5000); // 401k, HSA, etc.
  const [taxCredits, setTaxCredits] = useState<number>(0); // Child Tax Credit, etc.

  const deductionAmount = useMemo(() => {
    if (deductionType === 'standard') {
      return STANDARD_DEDUCTIONS_2024[filingStatus];
    }
    return Math.max(0, customDeductions);
  }, [deductionType, filingStatus, customDeductions]);

  const taxCalculation = useMemo(() => {
    const gross = Math.max(0, grossIncome);
    const preTax = Math.max(0, preTaxContributions);
    const adjustedGrossIncome = Math.max(0, gross - preTax);
    const taxableIncome = Math.max(0, adjustedGrossIncome - deductionAmount);

    const brackets = TAX_BRACKETS_2024[filingStatus];
    let totalTaxBeforeCredits = 0;
    let marginalRate = 0.10;

    const bracketBreakdown = brackets.map((b) => {
      if (taxableIncome > b.min) {
        const taxableInBracket = Math.min(taxableIncome, b.max) - b.min;
        const taxForBracket = taxableInBracket * b.rate;
        totalTaxBeforeCredits += taxForBracket;
        marginalRate = b.rate;
        return {
          rate: b.rate,
          min: b.min,
          max: b.max,
          taxableInBracket,
          taxForBracket,
          isActive: true,
        };
      }
      return {
        rate: b.rate,
        min: b.min,
        max: b.max,
        taxableInBracket: 0,
        taxForBracket: 0,
        isActive: false,
      };
    });

    const totalTax = Math.max(0, totalTaxBeforeCredits - Math.max(0, taxCredits));
    const effectiveTaxRate = gross > 0 ? (totalTax / gross) * 100 : 0;
    const effectiveTaxRateOnTaxable = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
    const netIncome = Math.max(0, gross - totalTax - preTax);
    const monthlyTakeHome = netIncome / 12;
    const biweeklyTakeHome = netIncome / 26;

    return {
      gross,
      adjustedGrossIncome,
      taxableIncome,
      deductionAmount,
      totalTax,
      totalTaxBeforeCredits,
      marginalRate: marginalRate * 100,
      effectiveTaxRate,
      effectiveTaxRateOnTaxable,
      netIncome,
      monthlyTakeHome,
      biweeklyTakeHome,
      bracketBreakdown,
    };
  }, [grossIncome, filingStatus, deductionType, deductionAmount, preTaxContributions, taxCredits]);

  const handleSave = () => {
    if (onSaveToHistory) {
      onSaveToHistory(
        `Federal Tax on $${taxCalculation.gross.toLocaleString()}: $${Math.round(taxCalculation.totalTax).toLocaleString()} (${taxCalculation.effectiveTaxRate.toFixed(1)}% eff.)`,
        {
          grossIncome,
          filingStatus,
          deductionType,
          preTaxContributions,
          taxCredits,
        },
        {
          totalTax: taxCalculation.totalTax,
          taxableIncome: taxCalculation.taxableIncome,
          marginalRate: taxCalculation.marginalRate,
          effectiveTaxRate: taxCalculation.effectiveTaxRate,
          netIncome: taxCalculation.netIncome,
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
            id="grossIncome"
            label="Gross Annual Income (W-2, 1099, Business)"
            value={grossIncome}
            onChange={(val) => setGrossIncome(val)}
            min={0}
            step={1000}
            prefix="$"
            helpText="Total earnings before payroll deductions and pre-tax deferrals."
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              IRS Filing Status (Tax Year 2024)
            </label>
            <select
              id="filingStatus"
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="single">Single Filer</option>
              <option value="married_joint">Married Filing Jointly</option>
              <option value="married_separate">Married Filing Separately</option>
              <option value="head_of_household">Head of Household</option>
            </select>
          </div>

          <CalcInput
            id="preTaxContributions"
            label="Pre-Tax Deductions (401k, Traditional IRA, HSA, FSA)"
            value={preTaxContributions}
            onChange={(val) => setPreTaxContributions(val)}
            min={0}
            step={500}
            prefix="$"
            helpText="Directly reduces Adjusted Gross Income (AGI)."
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tax Deduction Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeductionType('standard')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  deductionType === 'standard'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                Standard (${STANDARD_DEDUCTIONS_2024[filingStatus].toLocaleString()})
              </button>
              <button
                type="button"
                onClick={() => setDeductionType('itemized')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  deductionType === 'itemized'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                Itemized Schedule A
              </button>
            </div>
          </div>

          {deductionType === 'itemized' && (
            <CalcInput
              id="customDeductions"
              label="Total Itemized Deductions (Mortgage Interest, State/Local Tax, Charity)"
              value={customDeductions}
              onChange={(val) => setCustomDeductions(val)}
              min={0}
              step={500}
              prefix="$"
              helpText="Itemize only when total deductible expenses exceed the standard deduction."
            />
          )}

          <CalcInput
            id="taxCredits"
            label="Total Tax Credits (Child Tax Credit, EV Credit, Lifetime Learning)"
            value={taxCredits}
            onChange={(val) => setTaxCredits(val)}
            min={0}
            step={250}
            prefix="$"
            helpText="Dollar-for-dollar reduction of final federal tax liability."
          />
        </div>
      </div>

      {/* Primary KPI Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Total Federal Tax"
          value={`$${Math.round(taxCalculation.totalTax).toLocaleString()}`}
          subtitle="Before state/local & FICA payroll taxes"
          highlighted={true}
          icon={<DollarSign className="w-5 h-5" />}
        />

        <CalcResultCard
          title="Effective Tax Rate"
          value={`${taxCalculation.effectiveTaxRate.toFixed(2)}%`}
          subtitle={`Of gross income ($${taxCalculation.gross.toLocaleString()})`}
          icon={<Percent className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Marginal Tax Bracket"
          value={`${taxCalculation.marginalRate}%`}
          subtitle="Rate applied to your last dollar earned"
          icon={<ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Estimated Annual Take-Home"
          value={`$${Math.round(taxCalculation.netIncome).toLocaleString()}`}
          subtitle={`~$${Math.round(taxCalculation.monthlyTakeHome).toLocaleString()}/month`}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Progressive Bracket Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-500" />
            2024 Progressive Tax Bracket Breakdown
          </h3>
          <span className="text-xs text-slate-500">
            Taxable Income: <strong className="text-slate-900 dark:text-white">${Math.round(taxCalculation.taxableIncome).toLocaleString()}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Tax Bracket</th>
                <th className="py-2.5 px-3 font-semibold">Income Threshold</th>
                <th className="py-2.5 px-3 font-semibold">Taxable in Bracket</th>
                <th className="py-2.5 px-3 font-semibold text-right">Tax Owed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {taxCalculation.bracketBreakdown.map((b, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    b.isActive && b.taxableInBracket > 0
                      ? 'bg-teal-50/60 dark:bg-teal-950/20 font-medium text-slate-900 dark:text-white'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {(b.rate * 100)}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    ${b.min.toLocaleString()} – {b.max === Infinity ? 'Above' : `$${b.max.toLocaleString()}`}
                  </td>
                  <td className="py-2.5 px-3">
                    ${Math.round(b.taxableInBracket).toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">
                    ${Math.round(b.taxForBracket).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">
                <td className="py-3 px-3" colSpan={2}>
                  Total Tax Before Credits
                </td>
                <td className="py-3 px-3">
                  ${Math.round(taxCalculation.taxableIncome).toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono text-teal-600 dark:text-teal-400">
                  ${Math.round(taxCalculation.totalTaxBeforeCredits).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
