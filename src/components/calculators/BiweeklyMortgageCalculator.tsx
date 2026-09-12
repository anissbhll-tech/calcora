import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency } from '../../lib/mathUtils';
import { Home, DollarSign, Clock, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight, Zap, PiggyBank } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

export const BiweeklyMortgageCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [loanAmount, setLoanAmount] = useState<number>(425000);
  const [interestRate, setInterestRate] = useState<number>(6.75);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [extraPerBiweekly, setExtraPerBiweekly] = useState<number>(0);

  const calculation = useMemo(() => {
    const principal = Math.max(1000, safeParseNumber(loanAmount, 400000));
    const annualRate = Math.max(0.1, safeParseNumber(interestRate, 6.5)) / 100;
    const termYears = Math.max(5, Math.min(40, safeParseNumber(loanTermYears, 30)));
    const extraPmt = Math.max(0, safeParseNumber(extraPerBiweekly, 0));

    // 1. STANDARD MONTHLY SCHEDULE
    const monthlyRate = annualRate / 12;
    const totalMonths = termYears * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const standardTotalPaid = monthlyPayment * totalMonths;
    const standardTotalInterest = Math.max(0, standardTotalPaid - principal);

    // 2. ACCELERATED BI-WEEKLY SCHEDULE (26 payments/yr = 13 monthly payments)
    const baseBiweeklyPayment = monthlyPayment / 2;
    const totalBiweeklyPayment = baseBiweeklyPayment + extraPmt;
    const biweeklyRate = annualRate / 26;

    let biweeklyBalance = principal;
    let biweeklyTotalInterest = 0;
    let biweeklyTotalPaid = 0;
    let periodsCount = 0;
    const maxPeriods = termYears * 26 * 2; // Safeguard

    while (biweeklyBalance > 0.01 && periodsCount < maxPeriods) {
      periodsCount++;
      const interestForPeriod = biweeklyBalance * biweeklyRate;
      biweeklyTotalInterest += interestForPeriod;

      const principalForPeriod = Math.min(biweeklyBalance, totalBiweeklyPayment - interestForPeriod);
      biweeklyTotalPaid += principalForPeriod + interestForPeriod;
      biweeklyBalance -= principalForPeriod;
    }

    const biweeklyYears = periodsCount / 26;
    const biweeklyYearsInt = Math.floor(biweeklyYears);
    const biweeklyMonthsInt = Math.round((biweeklyYears - biweeklyYearsInt) * 12);

    const yearsSaved = Math.max(0, termYears - biweeklyYears);
    const yearsSavedInt = Math.floor(yearsSaved);
    const monthsSavedInt = Math.round((yearsSaved - yearsSavedInt) * 12);

    const totalInterestSaved = Math.max(0, standardTotalInterest - biweeklyTotalInterest);
    const totalCashSaved = Math.max(0, standardTotalPaid - biweeklyTotalPaid);

    return {
      principal,
      annualRate,
      termYears,
      monthlyPayment,
      standardTotalPaid,
      standardTotalInterest,
      baseBiweeklyPayment,
      totalBiweeklyPayment,
      extraPmt,
      periodsCount,
      biweeklyYears,
      biweeklyYearsInt,
      biweeklyMonthsInt,
      yearsSaved,
      yearsSavedInt,
      monthsSavedInt,
      biweeklyTotalPaid,
      biweeklyTotalInterest,
      totalInterestSaved,
      totalCashSaved,
    };
  }, [loanAmount, interestRate, loanTermYears, extraPerBiweekly]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Bi-Weekly Payoff on ${formatCurrency(calculation.principal, '$', 0)} Mortgage: Saves ${formatCurrency(calculation.totalInterestSaved, '$', 0)} & ${calculation.yearsSavedInt}y ${calculation.monthsSavedInt}m`,
        {
          loanAmount,
          interestRate,
          loanTermYears,
          extraPerBiweekly,
        },
        {
          monthlyPayment: calculation.monthlyPayment,
          biweeklyPayment: calculation.totalBiweeklyPayment,
          totalInterestSaved: calculation.totalInterestSaved,
          yearsSaved: calculation.yearsSaved,
          newPayoffYears: calculation.biweeklyYears,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Acceleration Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Mortgage Payoff Acceleration Impact
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Switching to bi-weekly payments of{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono">
              {formatCurrency(calculation.totalBiweeklyPayment, '$', 0)}
            </strong>{' '}
            every 2 weeks pays off your mortgage{' '}
            <strong>
              {calculation.yearsSavedInt} years and {calculation.monthsSavedInt} months early
            </strong>
            , saving a total of{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono">
              {formatCurrency(calculation.totalInterestSaved, '$', 0)}
            </strong>{' '}
            in lifetime mortgage interest.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Lifetime Interest Saved
            </span>
            <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(calculation.totalInterestSaved, '$', 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Mortgage Terms */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Home className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Current Mortgage Terms
            </h4>
          </div>

          <CalcInput
            id="loanAmount"
            label="Mortgage Balance / Original Loan Principal"
            value={loanAmount}
            onChange={(val) => setLoanAmount(val)}
            min={10000}
            step={10000}
            prefix="$"
            helpText="Current remaining balance or new home loan amount."
          />

          <CalcInput
            id="interestRate"
            label="Annual Mortgage Interest Rate (Fixed APR)"
            value={interestRate}
            onChange={(val) => setInterestRate(val)}
            min={0.5}
            max={15}
            step={0.125}
            suffix="%"
            helpText="Your fixed annual note rate (e.g., 6.75%)."
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Original Mortgage Amortization Term
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermYears(term)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    loanTermYears === term
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {term} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Bi-Weekly Acceleration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Bi-Weekly Custom Acceleration
            </h4>
          </div>

          <CalcInput
            id="extraPerBiweekly"
            label="Optional Extra Principal Per Bi-Weekly Payment"
            value={extraPerBiweekly}
            onChange={(val) => setExtraPerBiweekly(val)}
            min={0}
            step={25}
            prefix="$"
            helpText="Additional principal added to every 2-week payment to accelerate payoff even further."
          />

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-300 font-medium">
              <span>Standard Monthly (12 pmts/yr):</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {formatCurrency(calculation.monthlyPayment, '$', 0)}/mo
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300 font-medium">
              <span>Bi-Weekly (26 pmts/yr = Monthly ÷ 2):</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(calculation.baseBiweeklyPayment, '$', 0)} every 2 wks
              </span>
            </div>
            {extraPerBiweekly > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-700">
                <span>Total Payment with Extra Principal:</span>
                <span className="font-mono font-bold">
                  {formatCurrency(calculation.totalBiweeklyPayment, '$', 0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Total Interest Saved"
          value={formatCurrency(calculation.totalInterestSaved, '$', 0)}
          subtitle="Direct lifetime mortgage interest savings"
          highlighted={true}
          icon={<PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Time Shaved Off Loan"
          value={`${calculation.yearsSavedInt} yrs ${calculation.monthsSavedInt} mos`}
          subtitle={`New payoff term: ${calculation.biweeklyYearsInt} yrs ${calculation.biweeklyMonthsInt} mos`}
          icon={<Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Bi-Weekly Payment"
          value={formatCurrency(calculation.totalBiweeklyPayment, '$', 0)}
          subtitle="Due every 2 weeks (26 payments per year)"
          icon={<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Standard Monthly Payment"
          value={formatCurrency(calculation.monthlyPayment, '$', 0)}
          subtitle={`Total standard interest: ${formatCurrency(calculation.standardTotalInterest, '$', 0)}`}
          icon={<Home className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
        />
      </div>

      {/* Side-by-Side Financial Amortization Comparison */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Home className="w-4 h-4 text-teal-500" />
          Side-by-Side Amortization Schedule Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Payment Strategy</th>
                <th className="py-2.5 px-3 font-semibold">Annual Payment Count</th>
                <th className="py-2.5 px-3 font-semibold">Per-Period Payment</th>
                <th className="py-2.5 px-3 font-semibold">Total Mortgage Interest</th>
                <th className="py-2.5 px-3 font-semibold">Total Cost of Home</th>
                <th className="py-2.5 px-3 font-semibold">Payoff Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {/* Standard Monthly */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                  Standard Monthly
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  12 payments / yr
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-900 dark:text-white">
                  {formatCurrency(calculation.monthlyPayment, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3 font-mono text-rose-600 dark:text-rose-400">
                  {formatCurrency(calculation.standardTotalInterest, '$', 0)}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-900 dark:text-white">
                  {formatCurrency(calculation.standardTotalPaid, '$', 0)}
                </td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                  {calculation.termYears} Years (360 Months)
                </td>
              </tr>

              {/* Accelerated Bi-Weekly */}
              <tr className="bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/60">
                <td className="py-3 px-3 font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Accelerated Bi-Weekly
                </td>
                <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-semibold">
                  26 payments / yr
                </td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(calculation.totalBiweeklyPayment, '$', 0)} / 2 wks
                </td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(calculation.biweeklyTotalInterest, '$', 0)}
                </td>
                <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(calculation.biweeklyTotalPaid, '$', 0)}
                </td>
                <td className="py-3 px-3 font-bold text-emerald-700 dark:text-emerald-300">
                  {calculation.biweeklyYearsInt} Yrs {calculation.biweeklyMonthsInt} Mos ({calculation.periodsCount} Payments)
                </td>
              </tr>

              {/* Total Financial Advantage */}
              <tr className="bg-teal-50/50 dark:bg-teal-950/30 font-black">
                <td className="py-2.5 px-3 text-teal-900 dark:text-teal-200" colSpan={3}>
                  Bi-Weekly Total Advantage (Net Savings &amp; Time Cut)
                </td>
                <td className="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400">
                  -{formatCurrency(calculation.totalInterestSaved, '$', 0)}
                </td>
                <td className="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400">
                  -{formatCurrency(calculation.totalCashSaved, '$', 0)}
                </td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">
                  -{calculation.yearsSavedInt} Yrs {calculation.monthsSavedInt} Mos
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
