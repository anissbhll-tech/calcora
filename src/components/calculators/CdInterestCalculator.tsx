import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface CdInterestCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const CdInterestCalculator: React.FC<CdInterestCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [deposit, setDeposit] = useState<string>('25000');
  const [apy, setApy] = useState<string>('4.85');
  const [termMonths, setTermMonths] = useState<string>('12');
  const [compoundFreq, setCompoundFreq] = useState<string>('365'); // 365=daily, 12=monthly, 4=quarterly, 1=annually
  const [taxRate, setTaxRate] = useState<string>('22');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.deposit !== undefined) setDeposit(String(initialPreset.deposit));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDeposit('25000');
    setApy('4.85');
    setTermMonths('12');
    setCompoundFreq('365');
    setTaxRate('22');
  };

  const calculate = () => {
    const p = safeParseNumber(deposit, 0);
    const r = safeParseNumber(apy, 0) / 100;
    const months = safeParseNumber(termMonths, 1);
    const n = safeParseNumber(compoundFreq, 365);
    const tax = safeParseNumber(taxRate, 0) / 100;

    if (p <= 0 || months <= 0) {
      return { isValid: false, msg: 'Deposit amount and CD term must be greater than 0.' };
    }

    const t = months / 12;
    const finalBalance = p * Math.pow(1 + r / n, n * t);
    const totalInterest = finalBalance - p;
    const taxAmount = totalInterest * tax;
    const afterTaxBalance = finalBalance - taxAmount;

    return {
      isValid: true,
      msg: '',
      deposit: p,
      finalBalance,
      totalInterest,
      taxAmount,
      afterTaxBalance,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `CD Earnings: ${formatCurrency(res.totalInterest)} | Final Balance: ${formatCurrency(res.finalBalance)}`,
        { deposit, apy, termMonths, compoundFreq, taxRate },
        { finalBalance: res.finalBalance, totalInterest: res.totalInterest }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Certificate of Deposit (CD) Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput
            id="deposit"
            label="Initial CD Deposit"
            prefix="$"
            value={deposit}
            onChange={setDeposit}
            min={0}
          />
          <CalcInput
            id="apy"
            label="Annual Percentage Yield (APY)"
            suffix="%"
            value={apy}
            onChange={setApy}
            min={0}
            step="0.01"
          />
          <CalcInput
            id="termMonths"
            label="CD Term"
            suffix="months"
            value={termMonths}
            onChange={setTermMonths}
            min={1}
          />
          <CalcSelect
            id="compoundFreq"
            label="Compounding Frequency"
            value={compoundFreq}
            onChange={setCompoundFreq}
            options={[
              { value: '365', label: 'Daily' },
              { value: '12', label: 'Monthly' },
              { value: '4', label: 'Quarterly' },
              { value: '1', label: 'Annually' },
            ]}
          />
          <CalcInput
            id="taxRate"
            label="Estimated Income Tax Rate"
            suffix="%"
            value={taxRate}
            onChange={setTaxRate}
            min={0}
            max={50}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="End of Term Balance"
              value={formatCurrency(res.finalBalance)}
              subtitle="Principal + Interest"
              highlighted={true}
            />
            <CalcResultCard
              title="Gross Interest Earned"
              value={formatCurrency(res.totalInterest)}
              subtitle="Pre-tax interest return"
              badgeText="Total Yield"
              badgeType="success"
            />
            <CalcResultCard
              title="After-Tax End Balance"
              value={formatCurrency(res.afterTaxBalance)}
              subtitle={`After ${taxRate}% marginal tax`}
            />
            <CalcResultCard
              title="Estimated Tax Owed"
              value={formatCurrency(res.taxAmount)}
              subtitle="Taxes on CD interest earnings"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>CD interest is taxed as ordinary income in the year it is earned.</span>
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
