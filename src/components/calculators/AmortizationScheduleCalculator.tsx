import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface AmortizationScheduleCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const AmortizationScheduleCalculator: React.FC<AmortizationScheduleCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [loanAmount, setLoanAmount] = useState<string>('250000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTermYears, setLoanTermYears] = useState<string>('30');
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<string>('150');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.loanAmount !== undefined) setLoanAmount(String(initialPreset.loanAmount));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setLoanAmount('250000');
    setInterestRate('6.5');
    setLoanTermYears('30');
    setExtraMonthlyPayment('150');
  };

  const calculate = () => {
    const principal = safeParseNumber(loanAmount, 0);
    const rate = safeParseNumber(interestRate, 0) / 100;
    const years = safeParseNumber(loanTermYears, 30);
    const extra = safeParseNumber(extraMonthlyPayment, 0);

    if (principal <= 0 || years <= 0) {
      return { isValid: false, msg: 'Loan amount and term must be greater than 0.' };
    }

    const monthlyRate = rate / 12;
    const totalMonths = years * 12;

    const baseMonthlyPayment =
      monthlyRate > 0
        ? (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
        : principal / totalMonths;

    // Standard schedule without extra payment
    let stdBalance = principal;
    let stdTotalInterest = 0;
    for (let m = 1; m <= totalMonths; m++) {
      const interest = stdBalance * monthlyRate;
      const principalPaid = baseMonthlyPayment - interest;
      stdTotalInterest += interest;
      stdBalance -= principalPaid;
    }

    // Schedule with extra payment
    let balance = principal;
    let totalInterestWithExtra = 0;
    let monthsToPayoff = 0;

    for (let m = 1; m <= totalMonths; m++) {
      if (balance <= 0) break;
      monthsToPayoff = m;

      const interest = balance * monthlyRate;
      let payment = baseMonthlyPayment + extra;
      if (payment > balance + interest) {
        payment = balance + interest;
      }

      const principalPaid = payment - interest;
      totalInterestWithExtra += interest;
      balance -= principalPaid;
    }

    const interestSaved = stdTotalInterest - totalInterestWithExtra;
    const monthsSaved = totalMonths - monthsToPayoff;

    return {
      isValid: true,
      msg: '',
      principal,
      baseMonthlyPayment,
      totalPaymentWithExtra: baseMonthlyPayment + extra,
      stdTotalInterest,
      totalInterestWithExtra,
      interestSaved,
      monthsSaved,
      yearsSaved: (monthsSaved / 12).toFixed(1),
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Amortization Payment ${formatCurrency(res.baseMonthlyPayment)} | Interest Saved ${formatCurrency(res.interestSaved)}`,
        { loanAmount, interestRate, loanTermYears, extraMonthlyPayment },
        { baseMonthlyPayment: res.baseMonthlyPayment, interestSaved: res.interestSaved }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Loan Amortization Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="loanAmount" label="Loan Principal" prefix="$" value={loanAmount} onChange={setLoanAmount} min={0} />
          <CalcInput id="interestRate" label="Annual Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate} min={0} />
          <CalcInput id="loanTermYears" label="Loan Term" suffix="yrs" value={loanTermYears} onChange={setLoanTermYears} min={1} />
          <CalcInput id="extraMonthlyPayment" label="Extra Monthly Principal Payment" prefix="$" value={extraMonthlyPayment} onChange={setExtraMonthlyPayment} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Standard Monthly Payment"
              value={formatCurrency(res.baseMonthlyPayment)}
              subtitle="Base Principal & Interest"
              highlighted={true}
            />
            <CalcResultCard
              title="Interest Saved with Extra Payment"
              value={formatCurrency(res.interestSaved)}
              subtitle={`Saved by adding ${formatCurrency(safeParseNumber(extraMonthlyPayment, 0))}/mo`}
              badgeText="Money Saved"
              badgeType="success"
            />
            <CalcResultCard
              title="Time Saved to Payoff"
              value={`${res.yearsSaved} Years`}
              subtitle={`${res.monthsSaved} fewer monthly payments`}
              badgeText="Faster Payoff"
              badgeType="info"
            />
            <CalcResultCard
              title="Total Interest (Standard)"
              value={formatCurrency(res.stdTotalInterest)}
              subtitle="Total interest paid over full term"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Extra principal payments directly reduce the balance, drastically compounding lifetime interest savings.</span>
            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
              >
                Save Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
