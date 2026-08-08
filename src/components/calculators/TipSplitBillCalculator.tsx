import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';

interface TipSplitBillCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const TipSplitBillCalculator: React.FC<TipSplitBillCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [billAmount, setBillAmount] = useState<string>('85.00');
  const [tipPercentage, setTipPercentage] = useState<string>('18');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('3');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.billAmount !== undefined) setBillAmount(String(initialPreset.billAmount));
      if (initialPreset.tipPercentage !== undefined) setTipPercentage(String(initialPreset.tipPercentage));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setBillAmount('85.00');
    setTipPercentage('18');
    setNumberOfPeople('3');
  };

  const presetTipButtons = [15, 18, 20, 22, 25];

  const calculate = () => {
    const bill = safeParseNumber(billAmount, 0);
    const tipPct = safeParseNumber(tipPercentage, 0) / 100;
    const people = Math.max(1, safeParseNumber(numberOfPeople, 1));

    if (bill <= 0) {
      return {
        isValid: false,
        msg: 'Please enter a bill amount greater than $0.',
        tipAmount: 0,
        totalWithTip: 0,
        perPersonTotal: 0,
        perPersonTip: 0,
      };
    }

    const tipAmount = bill * tipPct;
    const totalWithTip = bill + tipAmount;
    const perPersonTotal = totalWithTip / people;
    const perPersonTip = tipAmount / people;

    return {
      isValid: true,
      msg: '',
      bill,
      tipAmount,
      totalWithTip,
      perPersonTotal,
      perPersonTip,
      people,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Tip & Split Bill ($${billAmount} bill, ${tipPercentage}% tip, ${numberOfPeople} people): ${formatCurrency(res.perPersonTotal)} per person`,
        { billAmount, tipPercentage, numberOfPeople },
        { totalWithTip: res.totalWithTip, perPersonTotal: res.perPersonTotal }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Bill & Tip Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput
            id="billAmount"
            label="Subtotal Bill Amount ($)"
            prefix="$"
            value={billAmount}
            onChange={setBillAmount}
            min={1}
            step="0.01"
          />

          <CalcInput
            id="numberOfPeople"
            label="Split Between (People)"
            value={numberOfPeople}
            onChange={setNumberOfPeople}
            min={1}
            max={100}
            step="1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Tip Percentage (%)
          </label>
          <div className="flex flex-wrap gap-2">
            {presetTipButtons.map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setTipPercentage(String(pct))}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                  tipPercentage === String(pct)
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {pct}%
              </button>
            ))}

            <div className="w-28">
              <CalcInput
                id="tipPercentage"
                label=""
                suffix="%"
                value={tipPercentage}
                onChange={setTipPercentage}
                min={0}
                max={100}
                step="1"
              />
            </div>
          </div>
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Total Per Person"
              value={formatCurrency(res.perPersonTotal)}
              subtitle={`Split equally between ${res.people} ${res.people === 1 ? 'person' : 'people'}`}
              highlighted={true}
            />

            <CalcResultCard
              title="Total Bill with Tip"
              value={formatCurrency(res.totalWithTip)}
              subtitle={`Subtotal ${formatCurrency(res.bill)} + Tip ${formatCurrency(res.tipAmount)}`}
              badgeText="Total Bill"
              badgeType="info"
            />

            <CalcResultCard
              title="Total Tip Amount"
              value={formatCurrency(res.tipAmount)}
              subtitle={`${formatCurrency(res.perPersonTip)} tip share per person`}
              badgeText="Tip Total"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Breakdown per person:</span> Base share = {formatCurrency(res.bill / res.people)} | Tip share = {formatCurrency(res.perPersonTip)}
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
              >
                Save Tip Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
