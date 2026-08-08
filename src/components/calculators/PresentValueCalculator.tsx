import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface PresentValueCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PresentValueCalculator: React.FC<PresentValueCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [futureValue, setFutureValue] = useState<string>('100000');
  const [discountRate, setDiscountRate] = useState<string>('7');
  const [years, setYears] = useState<string>('10');
  const [compoundingFreq, setCompoundingFreq] = useState<string>('1'); // 1=annual, 12=monthly, 4=quarterly

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.futureValue !== undefined) setFutureValue(String(initialPreset.futureValue));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setFutureValue('100000');
    setDiscountRate('7');
    setYears('10');
    setCompoundingFreq('1');
  };

  const calculate = () => {
    const fv = safeParseNumber(futureValue, 0);
    const r = safeParseNumber(discountRate, 0) / 100;
    const y = safeParseNumber(years, 0);
    const n = safeParseNumber(compoundingFreq, 1);

    if (fv <= 0 || y <= 0) {
      return { isValid: false, msg: 'Future value and time in years must be greater than 0.' };
    }

    const presentValue = fv / Math.pow(1 + r / n, n * y);
    const discountAmount = fv - presentValue;
    const discountFactor = presentValue / fv;

    return {
      isValid: true,
      msg: '',
      futureValue: fv,
      presentValue,
      discountAmount,
      discountFactor,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Present Value: ${formatCurrency(res.presentValue)} (FV: ${formatCurrency(res.futureValue)})`,
        { futureValue, discountRate, years, compoundingFreq },
        { presentValue: res.presentValue, discountAmount: res.discountAmount }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Discounting & Present Value Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="futureValue" label="Target Future Value (FV)" prefix="$" value={futureValue} onChange={setFutureValue} min={0} />
          <CalcInput id="discountRate" label="Annual Discount / Interest Rate" suffix="%" value={discountRate} onChange={setDiscountRate} min={0} />
          <CalcInput id="years" label="Time Horizon (Years)" suffix="yrs" value={years} onChange={setYears} min={1} />
          <CalcSelect
            id="compoundingFreq"
            label="Compounding Frequency"
            value={compoundingFreq}
            onChange={setCompoundingFreq}
            options={[
              { value: '1', label: 'Annual' },
              { value: '4', label: 'Quarterly' },
              { value: '12', label: 'Monthly' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Present Value (PV)"
              value={formatCurrency(res.presentValue)}
              subtitle="PV = FV / (1 + r/n)^(n*t)"
              highlighted={true}
            />
            <CalcResultCard
              title="Total Discount Amount"
              value={formatCurrency(res.discountAmount)}
              subtitle="Value lost to discount rate over time"
            />
            <CalcResultCard
              title="Discount Factor"
              value={formatNumber(res.discountFactor, 4)}
              subtitle="Multiplier applied to Future Value"
            />
            <CalcResultCard
              title="Future Target Value"
              value={formatCurrency(res.futureValue)}
              subtitle="Target cash flow in future"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Present value determines the current lump sum required today to reach a target future amount at a given rate.</span>
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
