import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface SimpleInterestCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const SimpleInterestCalculator: React.FC<SimpleInterestCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [principal, setPrincipal] = useState<string>('10000');
  const [rate, setRate] = useState<string>('5');
  const [timeValue, setTimeValue] = useState<string>('3');
  const [timeUnit, setTimeUnit] = useState<string>('years');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.principal !== undefined) setPrincipal(String(initialPreset.principal));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setPrincipal('10000');
    setRate('5');
    setTimeValue('3');
    setTimeUnit('years');
  };

  const calculate = () => {
    const p = safeParseNumber(principal, 0);
    const r = safeParseNumber(rate, 0) / 100;
    const tVal = safeParseNumber(timeValue, 0);

    if (p <= 0 || tVal <= 0) {
      return { isValid: false, msg: 'Principal and time duration must be greater than 0.' };
    }

    let timeInYears = tVal;
    if (timeUnit === 'months') {
      timeInYears = tVal / 12;
    } else if (timeUnit === 'days') {
      timeInYears = tVal / 365;
    }

    const totalInterest = p * r * timeInYears;
    const totalAmount = p + totalInterest;
    const dailyInterest = (p * r) / 365;

    return {
      isValid: true,
      msg: '',
      principal: p,
      timeInYears,
      totalInterest,
      totalAmount,
      dailyInterest,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Simple Interest: ${formatCurrency(res.totalInterest)} | Total: ${formatCurrency(res.totalAmount)}`,
        { principal, rate, timeValue, timeUnit },
        { totalInterest: res.totalInterest, totalAmount: res.totalAmount }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Simple Interest Loan / Investment Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput
            id="principal"
            label="Principal Amount"
            prefix="$"
            value={principal}
            onChange={setPrincipal}
            min={0}
          />
          <CalcInput
            id="rate"
            label="Annual Interest Rate"
            suffix="%"
            value={rate}
            onChange={setRate}
            min={0}
          />
          <CalcInput
            id="timeValue"
            label="Duration Value"
            value={timeValue}
            onChange={setTimeValue}
            min={1}
          />
          <CalcSelect
            id="timeUnit"
            label="Time Unit"
            value={timeUnit}
            onChange={setTimeUnit}
            options={[
              { value: 'years', label: 'Years' },
              { value: 'months', label: 'Months' },
              { value: 'days', label: 'Days' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Total Interest Earned / Paid"
              value={formatCurrency(res.totalInterest)}
              subtitle="I = P × r × t"
              highlighted={true}
            />
            <CalcResultCard
              title="Total End Balance"
              value={formatCurrency(res.totalAmount)}
              subtitle="Principal + Simple Interest"
            />
            <CalcResultCard
              title="Daily Interest Accrual"
              value={formatCurrency(res.dailyInterest)}
              subtitle="Interest generated per day"
            />
            <CalcResultCard
              title="Effective Period in Years"
              value={`${formatNumber(res.timeInYears, 2)} yrs`}
              subtitle="Time converted to annual factor"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Simple interest calculates returns purely on the original principal without compounding past interest.</span>
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
