import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface TipSplitTaxCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const TipSplitTaxCalculator: React.FC<TipSplitTaxCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [billSubtotal, setBillSubtotal] = useState<string>('120');
  const [tipPercent, setTipPercent] = useState<string>('18');
  const [salesTaxPercent, setSalesTaxPercent] = useState<string>('8.5');
  const [peopleCount, setPeopleCount] = useState<string>('4');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.billSubtotal !== undefined) setBillSubtotal(String(initialPreset.billSubtotal));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setBillSubtotal('120');
    setTipPercent('18');
    setSalesTaxPercent('8.5');
    setPeopleCount('4');
  };

  const calculate = () => {
    const subtotal = safeParseNumber(billSubtotal, 0);
    const tipPct = safeParseNumber(tipPercent, 0) / 100;
    const taxPct = safeParseNumber(salesTaxPercent, 0) / 100;
    const people = safeParseNumber(peopleCount, 1);

    if (subtotal <= 0 || people <= 0) {
      return { isValid: false, msg: 'Bill subtotal and number of people must be greater than 0.' };
    }

    const tipAmount = subtotal * tipPct;
    const taxAmount = subtotal * taxPct;
    const grandTotal = subtotal + tipAmount + taxAmount;

    const costPerPerson = grandTotal / people;
    const tipPerPerson = tipAmount / people;

    return {
      isValid: true,
      msg: '',
      subtotal,
      tipAmount,
      taxAmount,
      grandTotal,
      people,
      costPerPerson,
      tipPerPerson,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Tip & Bill Split: ${formatCurrency(res.costPerPerson)} / person (${res.people} people) | Total ${formatCurrency(res.grandTotal)}`,
        { billSubtotal, tipPercent, salesTaxPercent, peopleCount },
        { grandTotal: res.grandTotal, costPerPerson: res.costPerPerson }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Restaurant Bill & Party Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="billSubtotal" label="Bill Pre-Tax Subtotal" prefix="$" value={billSubtotal} onChange={setBillSubtotal} min={0} />
          <CalcInput id="tipPercent" label="Gratuity / Tip Percentage" suffix="%" value={tipPercent} onChange={setTipPercent} min={0} max={100} />
          <CalcInput id="salesTaxPercent" label="Local Sales Tax Rate" suffix="%" value={salesTaxPercent} onChange={setSalesTaxPercent} min={0} max={30} />
          <CalcInput id="peopleCount" label="Party Size (Split Count)" value={peopleCount} onChange={setPeopleCount} min={1} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Individual Share per Person"
              value={formatCurrency(res.costPerPerson)}
              subtitle={`Total divided by ${res.people} people`}
              highlighted={true}
              badgeText="Per Person"
              badgeType="success"
            />
            <CalcResultCard
              title="Grand Total Bill"
              value={formatCurrency(res.grandTotal)}
              subtitle="Subtotal + Gratuity + Sales Tax"
            />
            <CalcResultCard
              title="Total Gratuity Amount"
              value={formatCurrency(res.tipAmount)}
              subtitle={`Tip calculated on pre-tax subtotal`}
            />
            <CalcResultCard
              title="Total Sales Tax Amount"
              value={formatCurrency(res.taxAmount)}
              subtitle={`Local sales tax added`}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Standard etiquette calculates gratuity on the pre-tax bill subtotal amount.</span>
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
