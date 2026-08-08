import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatPercent, formatNumber } from '../../lib/mathUtils';

interface InflationPurchasingPowerCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const InflationPurchasingPowerCalculator: React.FC<InflationPurchasingPowerCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [initialAmount, setInitialAmount] = useState<string>('10000');
  const [inflationRate, setInflationRate] = useState<string>('3.5');
  const [years, setYears] = useState<string>('10');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.initialAmount !== undefined) setInitialAmount(String(initialPreset.initialAmount));
      if (initialPreset.inflationRate !== undefined) setInflationRate(String(initialPreset.inflationRate));
      if (initialPreset.years !== undefined) setYears(String(initialPreset.years));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setInitialAmount('10000');
    setInflationRate('3.5');
    setYears('10');
  };

  const calculate = () => {
    const amount = safeParseNumber(initialAmount, 0);
    const rate = safeParseNumber(inflationRate, 0) / 100;
    const yrs = safeParseNumber(years, 0);

    if (amount <= 0) {
      return {
        isValid: false,
        msg: 'Please enter a initial dollar amount greater than $0.',
        futurePurchasingPower: 0,
        futureCostToBuySame: 0,
        lossOfPurchasingPowerPct: 0,
      };
    }

    if (yrs < 0) {
      return {
        isValid: false,
        msg: 'Years must be a non-negative number.',
        futurePurchasingPower: 0,
        futureCostToBuySame: 0,
        lossOfPurchasingPowerPct: 0,
      };
    }

    // Future purchasing power of today's $Amount = Amount / (1 + r)^yrs
    const futurePurchasingPower = amount / Math.pow(1 + rate, yrs);

    // Future cost to buy what costs $Amount today = Amount * (1 + r)^yrs
    const futureCostToBuySame = amount * Math.pow(1 + rate, yrs);

    const lossOfPurchasingPowerPct = amount > 0 ? ((amount - futurePurchasingPower) / amount) * 100 : 0;

    return {
      isValid: true,
      msg: '',
      futurePurchasingPower,
      futureCostToBuySame,
      lossOfPurchasingPowerPct,
      amount,
      yrs,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Inflation Impact ($${initialAmount} over ${years} yrs at ${inflationRate}% inflation): Purchasing power shrinks to ${formatCurrency(res.futurePurchasingPower)} (${formatPercent(res.lossOfPurchasingPowerPct)} loss)`,
        { initialAmount, inflationRate, years },
        { futurePurchasingPower: res.futurePurchasingPower, futureCostToBuySame: res.futureCostToBuySame }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Inflation & Time Horizon Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalcInput
            id="initialAmount"
            label="Current Dollar Amount ($)"
            prefix="$"
            value={initialAmount}
            onChange={setInitialAmount}
            min={1}
            step="100"
          />

          <CalcInput
            id="inflationRate"
            label="Avg. Annual Inflation Rate (%)"
            suffix="%"
            value={inflationRate}
            onChange={setInflationRate}
            min={0}
            max={50}
            step="0.1"
            helperText="US long-term historical avg ~ 3.2%"
          />

          <CalcInput
            id="years"
            label="Time Horizon (Years)"
            suffix="yrs"
            value={years}
            onChange={setYears}
            min={1}
            max={100}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Future Buying Power"
              value={formatCurrency(res.futurePurchasingPower)}
              subtitle={`What $${formatNumber(res.amount, 0)} today will be worth in ${res.yrs} years`}
              highlighted={true}
            />

            <CalcResultCard
              title="Future Cost for Same Goods"
              value={formatCurrency(res.futureCostToBuySame)}
              subtitle={`Cost in ${res.yrs} years to buy $${formatNumber(res.amount, 0)} worth of goods today`}
              badgeText="Future Price"
              badgeType="info"
            />

            <CalcResultCard
              title="Purchasing Power Loss"
              value={`-${formatPercent(res.lossOfPurchasingPowerPct)}`}
              subtitle="Cumulative real value reduction"
              badgeText="Value Loss"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Key takeaway:</span> Over {res.yrs} years at {inflationRate}% annual inflation, cash sitting in uninvested savings loses <span className="font-semibold text-rose-600 dark:text-rose-400">{formatPercent(res.lossOfPurchasingPowerPct)}</span> of its purchasing power.
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
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
