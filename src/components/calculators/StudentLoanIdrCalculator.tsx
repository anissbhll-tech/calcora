import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency } from '../../lib/mathUtils';
import { GraduationCap, DollarSign, Users, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, Info, Calendar, ArrowRight } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type LocationState = 'contiguous' | 'alaska' | 'hawaii';

// 2024 HHS Federal Poverty Guidelines
const BASE_FPL_2024: Record<LocationState, { base1: number; addPerson: number }> = {
  contiguous: { base1: 15060, addPerson: 5380 },
  alaska: { base1: 18810, addPerson: 6730 },
  hawaii: { base1: 17310, addPerson: 6190 },
};

function getFPL(householdSize: number, location: LocationState): number {
  const cfg = BASE_FPL_2024[location];
  const size = Math.max(1, householdSize);
  return cfg.base1 + (size - 1) * cfg.addPerson;
}

export const StudentLoanIdrCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  // Primary Loan Inputs
  const [loanBalance, setLoanBalance] = useState<number>(65000);
  const [interestRate, setInterestRate] = useState<number>(6.2);
  const [undergradPercent, setUndergradPercent] = useState<number>(60); // 60% undergrad, 40% grad

  // Borrower Financial Profile
  const [agi, setAgi] = useState<number>(62000);
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [location, setLocation] = useState<LocationState>('contiguous');

  const calculation = useMemo(() => {
    const balance = Math.max(0, safeParseNumber(loanBalance, 65000));
    const rate = Math.max(0, safeParseNumber(interestRate, 6.2)) / 100;
    const monthlyRate = rate / 12;
    const undergradFrac = Math.max(0, Math.min(100, safeParseNumber(undergradPercent, 60))) / 100;
    const borrowerAgi = Math.max(0, safeParseNumber(agi, 60000));
    const hhSize = Math.max(1, Math.min(12, safeParseNumber(householdSize, 1)));

    const fpl = getFPL(hhSize, location);

    // 1. STANDARD 10-YEAR FIXED REPAYMENT
    const standardTermMonths = 120;
    let standardMonthlyPayment = 0;
    if (balance > 0) {
      if (monthlyRate > 0) {
        standardMonthlyPayment =
          (balance * monthlyRate * Math.pow(1 + monthlyRate, standardTermMonths)) /
          (Math.pow(1 + monthlyRate, standardTermMonths) - 1);
      } else {
        standardMonthlyPayment = balance / standardTermMonths;
      }
    }
    const standardTotalPaid = standardMonthlyPayment * standardTermMonths;
    const standardTotalInterest = Math.max(0, standardTotalPaid - balance);

    // Monthly Accrued Interest
    const monthlyAccruedInterest = balance * monthlyRate;

    // 2. SAVE PLAN (Saving on a Valuable Education)
    // 225% FPL Protection
    const saveExemption = fpl * 2.25;
    const saveDiscretionaryIncome = Math.max(0, borrowerAgi - saveExemption);
    // Weighted discretionary cap: Undergrad is 5%, Graduate is 10%
    const saveRate = undergradFrac * 0.05 + (1 - undergradFrac) * 0.10;
    const saveAnnualPayment = saveDiscretionaryIncome * saveRate;
    const saveMonthlyPayment = saveAnnualPayment / 12;
    // SAVE 100% Unpaid Interest Subsidy
    const saveMonthlyInterestWaived = Math.max(0, monthlyAccruedInterest - saveMonthlyPayment);

    // 3. PAYE (Pay As You Earn)
    // 150% FPL Protection, 10% Discretionary, capped at Standard 10-yr payment
    const payeExemption = fpl * 1.50;
    const payeDiscretionaryIncome = Math.max(0, borrowerAgi - payeExemption);
    const payeRawMonthly = (payeDiscretionaryIncome * 0.10) / 12;
    const payeMonthlyPayment = Math.min(standardMonthlyPayment, payeRawMonthly);

    // 4. IBR (Income-Based Repayment for new borrowers)
    // 150% FPL Protection, 10% Discretionary, capped at Standard 10-yr payment
    const ibrMonthlyPayment = Math.min(standardMonthlyPayment, (payeDiscretionaryIncome * 0.10) / 12);

    // 5. ICR (Income-Contingent Repayment)
    // 100% FPL Protection, 20% Discretionary
    const icrExemption = fpl * 1.00;
    const icrDiscretionary = Math.max(0, borrowerAgi - icrExemption);
    const icrMonthlyPayment = (icrDiscretionary * 0.20) / 12;

    // Monthly Savings under SAVE vs Standard
    const saveMonthlySavings = Math.max(0, standardMonthlyPayment - saveMonthlyPayment);

    return {
      balance,
      rate,
      monthlyRate,
      undergradFrac,
      borrowerAgi,
      hhSize,
      fpl,
      monthlyAccruedInterest,
      standardMonthlyPayment,
      standardTotalPaid,
      standardTotalInterest,
      saveExemption,
      saveDiscretionaryIncome,
      saveRate,
      saveMonthlyPayment,
      saveMonthlyInterestWaived,
      saveMonthlySavings,
      payeExemption,
      payeDiscretionaryIncome,
      payeMonthlyPayment,
      ibrMonthlyPayment,
      icrMonthlyPayment,
    };
  }, [loanBalance, interestRate, undergradPercent, agi, householdSize, location]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `IDR SAVE Plan on ${formatCurrency(calculation.balance, '$', 0)} debt: ${formatCurrency(calculation.saveMonthlyPayment, '$', 0)}/mo (Saves ${formatCurrency(calculation.saveMonthlySavings, '$', 0)}/mo vs Standard)`,
        {
          loanBalance,
          interestRate,
          undergradPercent,
          agi,
          householdSize,
          location,
        },
        {
          saveMonthlyPayment: calculation.saveMonthlyPayment,
          standardMonthlyPayment: calculation.standardMonthlyPayment,
          saveMonthlyInterestWaived: calculation.saveMonthlyInterestWaived,
          saveMonthlySavings: calculation.saveMonthlySavings,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Plan Header Info Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Federal IDR &amp; SAVE Plan Calculator (2024 HHS Poverty Tables)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            The SAVE plan shields income up to 225% of the federal poverty line (${Math.round(calculation.saveExemption).toLocaleString()}/yr for family of {calculation.hhSize}) and waives 100% of unpaid monthly interest.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/80 dark:bg-slate-800/80 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              SAVE Payment
            </span>
            <span className="text-lg font-black font-mono text-teal-600 dark:text-teal-400">
              {formatCurrency(calculation.saveMonthlyPayment, '$', 0)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Loan Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Federal Loan Parameters
            </h4>
          </div>

          <CalcInput
            id="loanBalance"
            label="Total Federal Student Loan Balance"
            value={loanBalance}
            onChange={(val) => setLoanBalance(val)}
            min={0}
            step={5000}
            prefix="$"
            helpText="Combined Direct Subsidized, Unsubsidized, and Grad PLUS federal loans."
          />

          <CalcInput
            id="interestRate"
            label="Weighted Average Loan Interest Rate"
            value={interestRate}
            onChange={(val) => setInterestRate(val)}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            helpText="Average fixed interest rate across your federal loan portfolio."
          />

          <CalcInput
            id="undergradPercent"
            label="Undergraduate Loan Portion %"
            value={undergradPercent}
            onChange={(val) => setUndergradPercent(val)}
            min={0}
            max={100}
            step={10}
            suffix="%"
            helpText={`SAVE sets undergrad loans at 5% discretionary income vs 10% for graduate loans (effective ${(calculation.saveRate * 100).toFixed(1)}%).`}
          />
        </div>

        {/* Right: Income & Household Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Income &amp; Family Demographics
            </h4>
          </div>

          <CalcInput
            id="agi"
            label="Annual Adjusted Gross Income (AGI)"
            value={agi}
            onChange={(val) => setAgi(val)}
            min={0}
            step={2500}
            prefix="$"
            helpText="Line 11 of your IRS Form 1040 (after 401k, HSA, and pre-tax deductions)."
          />

          <CalcInput
            id="householdSize"
            label="Tax Household Size (Including Dependents)"
            value={householdSize}
            onChange={(val) => setHouseholdSize(val)}
            min={1}
            max={10}
            step={1}
            helpText="You, your spouse, and qualifying children or dependent relatives."
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Geographic Region (Poverty Line Baseline)
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as LocationState)}
              className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
            >
              <option value="contiguous">48 Contiguous States &amp; DC</option>
              <option value="alaska">Alaska (Higher Federal Poverty Level)</option>
              <option value="hawaii">Hawaii (Higher Federal Poverty Level)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="SAVE Plan Payment"
          value={`${formatCurrency(calculation.saveMonthlyPayment, '$', 0)}/mo`}
          subtitle={`Shields $${Math.round(calculation.saveExemption).toLocaleString()} income from payments`}
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Monthly Cash Savings"
          value={`${formatCurrency(calculation.saveMonthlySavings, '$', 0)}/mo`}
          subtitle="Cash flow savings compared to Standard 10-Yr Plan"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Monthly Interest Waived"
          value={`${formatCurrency(calculation.saveMonthlyInterestWaived, '$', 0)}/mo`}
          subtitle="100% government interest subsidy under SAVE"
          icon={<ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Standard 10-Yr Payment"
          value={`${formatCurrency(calculation.standardMonthlyPayment, '$', 0)}/mo`}
          subtitle={`Total 10-Yr Interest: ${formatCurrency(calculation.standardTotalInterest, '$', 0)}`}
          icon={<GraduationCap className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
        />
      </div>

      {/* All Repayment Plans Comparison Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-teal-500" />
          Comparison of All Federal Repayment Plans
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Repayment Plan</th>
                <th className="py-2.5 px-3 font-semibold">Protected Income</th>
                <th className="py-2.5 px-3 font-semibold">% Discretionary</th>
                <th className="py-2.5 px-3 font-semibold text-right">Monthly Payment</th>
                <th className="py-2.5 px-3 font-semibold">Forgiveness Term</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {/* SAVE Plan */}
              <tr className="bg-teal-50/50 dark:bg-teal-950/20">
                <td className="py-3 px-3 font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  SAVE Plan (Recommended)
                </td>
                <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                  225% FPL ({formatCurrency(calculation.saveExemption, '$', 0)})
                </td>
                <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                  {(calculation.saveRate * 100).toFixed(1)}% (5% Undergrad / 10% Grad)
                </td>
                <td className="py-3 px-3 font-mono font-black text-teal-600 dark:text-teal-400 text-right text-sm">
                  {formatCurrency(calculation.saveMonthlyPayment, '$', 0)}/mo
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                  10–20 Yrs (Undergrad) / 25 Yrs (Grad)
                </td>
              </tr>

              {/* PAYE */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                  PAYE (Pay As You Earn)
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                  150% FPL ({formatCurrency(calculation.payeExemption, '$', 0)})
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  10% (Capped at Standard)
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white text-right">
                  {formatCurrency(calculation.payeMonthlyPayment, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  20 Years
                </td>
              </tr>

              {/* IBR */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                  IBR (Income-Based Repayment)
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                  150% FPL ({formatCurrency(calculation.payeExemption, '$', 0)})
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  10% (New) / 15% (Old)
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white text-right">
                  {formatCurrency(calculation.ibrMonthlyPayment, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  20–25 Years
                </td>
              </tr>

              {/* ICR */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                  ICR (Income-Contingent)
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                  100% FPL ({formatCurrency(calculation.fpl, '$', 0)})
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  20%
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white text-right">
                  {formatCurrency(calculation.icrMonthlyPayment, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  25 Years
                </td>
              </tr>

              {/* Standard 10-Year */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                  Standard 10-Year Fixed
                </td>
                <td className="py-2.5 px-3 text-slate-400">
                  None (Non-income driven)
                </td>
                <td className="py-2.5 px-3 text-slate-400">
                  Amortized 120 Mo
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white text-right">
                  {formatCurrency(calculation.standardMonthlyPayment, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  Fully Paid Off in 10 Yrs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
