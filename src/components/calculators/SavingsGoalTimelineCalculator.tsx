import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';

interface SavingsGoalTimelineCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const SavingsGoalTimelineCalculator: React.FC<SavingsGoalTimelineCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [calcMode, setCalcMode] = useState<string>('needed_deposit'); // 'needed_deposit' or 'time_needed'
  const [targetGoal, setTargetGoal] = useState<string>('50000');
  const [initialBalance, setInitialBalance] = useState<string>('5000');
  const [annualInterestRate, setAnnualInterestRate] = useState<string>('5.0');
  const [targetYears, setTargetYears] = useState<string>('5');
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>('600');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.targetGoal !== undefined) setTargetGoal(String(initialPreset.targetGoal));
      if (initialPreset.initialBalance !== undefined) setInitialBalance(String(initialPreset.initialBalance));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setCalcMode('needed_deposit');
    setTargetGoal('50000');
    setInitialBalance('5000');
    setAnnualInterestRate('5.0');
    setTargetYears('5');
    setMonthlyDeposit('600');
  };

  const calculate = () => {
    const goal = safeParseNumber(targetGoal, 0);
    const initial = safeParseNumber(initialBalance, 0);
    const rate = safeParseNumber(annualInterestRate, 0) / 100 / 12;

    if (goal <= 0) {
      return {
        isValid: false,
        msg: 'Please enter a target savings goal greater than $0.',
        requiredMonthlyDeposit: 0,
        totalMonthsNeeded: 0,
        totalInterestEarned: 0,
        totalUserContributions: 0,
      };
    }

    if (calcMode === 'needed_deposit') {
      const yrs = safeParseNumber(targetYears, 0);
      const totalMonths = Math.max(1, Math.round(yrs * 12));

      // FV = Initial*(1+r)^n + PMT * ((1+r)^n - 1)/r
      // PMT = (FV - Initial*(1+r)^n) * r / ((1+r)^n - 1)
      let pmt = 0;
      if (rate === 0) {
        pmt = (goal - initial) / totalMonths;
      } else {
        const futureValueOfInitial = initial * Math.pow(1 + rate, totalMonths);
        const remainingGoal = goal - futureValueOfInitial;
        if (remainingGoal <= 0) {
          pmt = 0;
        } else {
          pmt = (remainingGoal * rate) / (Math.pow(1 + rate, totalMonths) - 1);
        }
      }

      pmt = Math.max(0, pmt);
      const totalUserContributions = initial + pmt * totalMonths;
      const totalInterestEarned = Math.max(0, goal - totalUserContributions);

      return {
        isValid: true,
        msg: '',
        requiredMonthlyDeposit: pmt,
        totalMonthsNeeded: totalMonths,
        totalInterestEarned,
        totalUserContributions,
        goal,
      };
    } else {
      // Calculate months needed to reach goal with fixed PMT
      const pmt = safeParseNumber(monthlyDeposit, 0);

      if (initial >= goal) {
        return {
          isValid: true,
          msg: '',
          requiredMonthlyDeposit: pmt,
          totalMonthsNeeded: 0,
          totalInterestEarned: 0,
          totalUserContributions: initial,
          goal,
        };
      }

      if (pmt <= 0 && rate <= 0) {
        return {
          isValid: false,
          msg: 'Please enter a monthly deposit greater than $0 or a positive interest rate.',
          requiredMonthlyDeposit: 0,
          totalMonthsNeeded: 0,
          totalInterestEarned: 0,
          totalUserContributions: 0,
        };
      }

      let months = 0;
      let balance = initial;
      const maxMonths = 1200; // 100 years safety cap

      while (balance < goal && months < maxMonths) {
        months++;
        const interest = balance * rate;
        balance += interest + pmt;
      }

      const totalUserContributions = initial + pmt * months;
      const totalInterestEarned = Math.max(0, balance - totalUserContributions);

      return {
        isValid: true,
        msg: '',
        requiredMonthlyDeposit: pmt,
        totalMonthsNeeded: months,
        totalInterestEarned,
        totalUserContributions,
        goal,
      };
    }
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Savings Goal ($${formatNumber(res.goal, 0)}): ${
          calcMode === 'needed_deposit'
            ? `Deposit ${formatCurrency(res.requiredMonthlyDeposit)}/mo for ${targetYears} yrs`
            : `Takes ${Math.floor(res.totalMonthsNeeded / 12)} yrs ${res.totalMonthsNeeded % 12} mos`
        }`,
        { targetGoal, initialBalance, annualInterestRate, calcMode },
        { requiredMonthlyDeposit: res.requiredMonthlyDeposit, totalMonthsNeeded: res.totalMonthsNeeded }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <CalcSelect
          id="calcMode"
          label="Calculation Goal Mode"
          value={calcMode}
          onChange={setCalcMode}
          options={[
            { value: 'needed_deposit', label: 'How much do I need to save monthly?' },
            { value: 'time_needed', label: 'How long will it take me to reach my goal?' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalcInput
            id="targetGoal"
            label="Target Savings Goal ($)"
            prefix="$"
            value={targetGoal}
            onChange={setTargetGoal}
            min={1}
            step="1000"
          />

          <CalcInput
            id="initialBalance"
            label="Current Savings Balance ($)"
            prefix="$"
            value={initialBalance}
            onChange={setInitialBalance}
            min={0}
            step="100"
          />

          <CalcInput
            id="annualInterestRate"
            label="Expected APY / Return (%)"
            suffix="%"
            value={annualInterestRate}
            onChange={setAnnualInterestRate}
            min={0}
            max={30}
            step="0.1"
            helperText="e.g. High Yield Savings ~4.5%"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
          {calcMode === 'needed_deposit' ? (
            <CalcInput
              id="targetYears"
              label="Target Timeline (Years)"
              suffix="yrs"
              value={targetYears}
              onChange={setTargetYears}
              min={0.5}
              max={50}
              step="0.5"
            />
          ) : (
            <CalcInput
              id="monthlyDeposit"
              label="Monthly Deposit Amount ($)"
              prefix="$"
              value={monthlyDeposit}
              onChange={setMonthlyDeposit}
              min={1}
              step="50"
            />
          )}
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {calcMode === 'needed_deposit' ? (
              <CalcResultCard
                title="Required Monthly Savings"
                value={formatCurrency(res.requiredMonthlyDeposit)}
                subtitle={`Save monthly for ${targetYears} years`}
                highlighted={true}
              />
            ) : (
              <CalcResultCard
                title="Time to Reach Goal"
                value={`${Math.floor(res.totalMonthsNeeded / 12)} yrs, ${res.totalMonthsNeeded % 12} mos`}
                subtitle={`Saving ${formatCurrency(res.requiredMonthlyDeposit)}/mo`}
                highlighted={true}
              />
            )}

            <CalcResultCard
              title="Total Interest Earned"
              value={formatCurrency(res.totalInterestEarned)}
              subtitle="Compound interest growth"
              badgeText="Interest Growth"
              badgeType="info"
            />

            <CalcResultCard
              title="Your Total Deposits"
              value={formatCurrency(res.totalUserContributions)}
              subtitle="Initial balance + cumulative deposits"
              badgeText="Principal"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Goal Breakdown:</span> Interest covers{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {res.goal > 0 ? formatNumber((res.totalInterestEarned / res.goal) * 100, 1) : '0'}%
              </span>{' '}
              of your final ${formatNumber(res.goal, 0)} goal.
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
              >
                Save Goal Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
