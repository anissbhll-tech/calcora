import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface SinkingFundCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const SinkingFundCalculator: React.FC<SinkingFundCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [targetGoalAmount, setTargetGoalAmount] = useState<string>('6000'); // e.g. Vacation, car purchase, home renovation
  const [targetMonths, setTargetMonths] = useState<string>('12');
  const [currentSavings, setCurrentSavings] = useState<string>('500');
  const [annualApyPercent, setAnnualApyPercent] = useState<string>('4.5'); // High-yield savings rate

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.targetGoalAmount !== undefined) setTargetGoalAmount(String(initialPreset.targetGoalAmount));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setTargetGoalAmount('6000');
    setTargetMonths('12');
    setCurrentSavings('500');
    setAnnualApyPercent('4.5');
  };

  const calculate = () => {
    const goal = safeParseNumber(targetGoalAmount, 0);
    const months = safeParseNumber(targetMonths, 0);
    const initial = safeParseNumber(currentSavings, 0);
    const apy = safeParseNumber(annualApyPercent, 0) / 100;

    if (goal <= 0 || months <= 0) {
      return { isValid: false, msg: 'Target goal amount and target months must be greater than 0.' };
    }

    const netGoalGap = Math.max(0, goal - initial);

    // Monthly compounding interest formula for sinking fund required deposit PMT
    const r = apy / 12;

    let monthlyDepositNeeded = 0;
    if (r > 0) {
      // Future Value of Initial = initial * (1+r)^months
      const fvInitial = initial * Math.pow(1 + r, months);
      const remainingFvNeeded = Math.max(0, goal - fvInitial);

      // PMT = FV * r / ((1+r)^months - 1)
      monthlyDepositNeeded = (remainingFvNeeded * r) / (Math.pow(1 + r, months) - 1);
    } else {
      monthlyDepositNeeded = netGoalGap / months;
    }

    const totalOutofPocket = initial + monthlyDepositNeeded * months;
    const totalInterestEarned = Math.max(0, goal - totalOutofPocket);

    return {
      isValid: true,
      msg: '',
      goal,
      netGoalGap,
      monthlyDepositNeeded,
      totalInterestEarned,
      totalOutofPocket,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Sinking Fund: Save ${formatCurrency(res.monthlyDepositNeeded)}/mo to reach ${formatCurrency(res.goal)} in ${targetMonths} months`,
        { targetGoalAmount, targetMonths, currentSavings, annualApyPercent },
        { monthlyDepositNeeded: res.monthlyDepositNeeded, totalInterestEarned: res.totalInterestEarned }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Target Expense & Savings Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="targetGoalAmount" label="Target Future Goal Amount" prefix="$" value={targetGoalAmount} onChange={setTargetGoalAmount} min={100} />
          <CalcInput id="targetMonths" label="Months Until Needed" suffix="months" value={targetMonths} onChange={setTargetMonths} min={1} max={360} />
          <CalcInput id="currentSavings" label="Starting Lump Sum Saved" prefix="$" value={currentSavings} onChange={setCurrentSavings} min={0} />
          <CalcInput id="annualApyPercent" label="High Yield Savings APY Rate" suffix="%" value={annualApyPercent} onChange={setAnnualApyPercent} min={0} max={20} helperText="e.g. 4.5% APY in HYSA" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Required Monthly Deposit"
              value={formatCurrency(res.monthlyDepositNeeded)}
              subtitle={`Automatic monthly transfer for ${targetMonths} months`}
              highlighted={true}
              badgeText="Monthly Target"
              badgeType="success"
            />
            <CalcResultCard
              title="Interest Growth Earned"
              value={formatCurrency(res.totalInterestEarned)}
              subtitle="Yield generated by HYSA rate"
            />
            <CalcResultCard
              title="Total Out-of-Pocket"
              value={formatCurrency(res.totalOutofPocket)}
              subtitle="Your direct capital contributions"
            />
            <CalcResultCard
              title="Net Savings Gap"
              value={formatCurrency(res.netGoalGap)}
              subtitle="Amount left after starting lump sum"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Sinking funds help you prepare for large upcoming expenses without relying on high-interest credit cards.</span>
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
