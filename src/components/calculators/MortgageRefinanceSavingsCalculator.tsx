import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface MortgageRefinanceSavingsCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const MortgageRefinanceSavingsCalculator: React.FC<MortgageRefinanceSavingsCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [currentBalance, setCurrentBalance] = useState<string>('320000');
  const [currentRate, setCurrentRate] = useState<string>('6.75');
  const [currentTermYears, setCurrentTermYears] = useState<string>('25');
  const [newRate, setNewRate] = useState<string>('5.25');
  const [newTermYears, setNewTermYears] = useState<string>('30');
  const [refinanceClosingCosts, setRefinanceClosingCosts] = useState<string>('4500');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.currentBalance !== undefined) setCurrentBalance(String(initialPreset.currentBalance));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setCurrentBalance('320000');
    setCurrentRate('6.75');
    setCurrentTermYears('25');
    setNewRate('5.25');
    setNewTermYears('30');
    setRefinanceClosingCosts('4500');
  };

  const calculate = () => {
    const P = safeParseNumber(currentBalance, 0);
    const rOld = safeParseNumber(currentRate, 0) / 100 / 12;
    const nOld = safeParseNumber(currentTermYears, 0) * 12;

    const rNew = safeParseNumber(newRate, 0) / 100 / 12;
    const nNew = safeParseNumber(newTermYears, 0) * 12;

    const closingCosts = safeParseNumber(refinanceClosingCosts, 0);

    if (P <= 0 || rOld <= 0 || rNew <= 0 || nOld <= 0 || nNew <= 0) {
      return { isValid: false, msg: 'Balance, interest rates, and loan terms must be greater than 0.' };
    }

    // Current Payment: M = P * r * (1+r)^n / ((1+r)^n - 1)
    const oldPayment = (P * rOld * Math.pow(1 + rOld, nOld)) / (Math.pow(1 + rOld, nOld) - 1);
    const newPayment = (P * rNew * Math.pow(1 + rNew, nNew)) / (Math.pow(1 + rNew, nNew) - 1);

    const monthlySavings = oldPayment - newPayment;

    // Break-even month count = Closing Costs / Monthly Savings
    const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : 0;

    const totalOldCost = oldPayment * nOld;
    const totalNewCost = newPayment * nNew + closingCosts;
    const lifetimeSavings = totalOldCost - totalNewCost;

    return {
      isValid: true,
      msg: '',
      oldPayment,
      newPayment,
      monthlySavings,
      breakEvenMonths,
      lifetimeSavings,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Refinance Savings: ${formatCurrency(res.monthlySavings)}/mo savings | Break-even in ${formatNumber(res.breakEvenMonths, 1)} months`,
        { currentBalance, currentRate, newRate, refinanceClosingCosts },
        { monthlySavings: res.monthlySavings, breakEvenMonths: res.breakEvenMonths }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Current Loan vs Refinance Proposal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="currentBalance" label="Remaining Principal Balance" prefix="$" value={currentBalance} onChange={setCurrentBalance} min={1000} />
          <CalcInput id="currentRate" label="Current Interest Rate" suffix="%" value={currentRate} onChange={setCurrentRate} min={0.1} />
          <CalcInput id="currentTermYears" label="Current Remaining Term" suffix="years" value={currentTermYears} onChange={setCurrentTermYears} min={1} max={30} />
          <CalcInput id="newRate" label="New Refinance Interest Rate" suffix="%" value={newRate} onChange={setNewRate} min={0.1} />
          <CalcInput id="newTermYears" label="New Refinance Term" suffix="years" value={newTermYears} onChange={setNewTermYears} min={5} max={30} />
          <CalcInput id="refinanceClosingCosts" label="Estimated Closing Costs" prefix="$" value={refinanceClosingCosts} onChange={setRefinanceClosingCosts} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Monthly Payment Savings"
              value={formatCurrency(res.monthlySavings)}
              subtitle={`Old: ${formatCurrency(res.oldPayment)} vs New: ${formatCurrency(res.newPayment)}`}
              highlighted={true}
              badgeText={res.monthlySavings > 0 ? 'Refinance Advantage' : 'Higher Payment'}
              badgeType={res.monthlySavings > 0 ? 'success' : 'error'}
            />
            <CalcResultCard
              title="Break-Even Timeline"
              value={`${formatNumber(res.breakEvenMonths, 1)} Months`}
              subtitle={`Time to recover ${formatCurrency(safeParseNumber(refinanceClosingCosts, 0))} closing costs`}
            />
            <CalcResultCard
              title="Lifetime Total Savings"
              value={formatCurrency(res.lifetimeSavings)}
              subtitle="Net interest savings over loan life"
            />
            <CalcResultCard
              title="New Monthly Payment"
              value={formatCurrency(res.newPayment)}
              subtitle="Principal and interest only"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>If you plan to stay in your home past the break-even month threshold, refinancing produces net financial savings.</span>
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
