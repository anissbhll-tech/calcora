import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface CookingUnitConverterCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const CookingUnitConverterCalculator: React.FC<CookingUnitConverterCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [amount, setAmount] = useState<string>('2');
  const [sourceUnit, setSourceUnit] = useState<string>('cups'); // cups, tbsp, tsp, fl_oz, ml

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.amount !== undefined) setAmount(String(initialPreset.amount));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setAmount('2');
    setSourceUnit('cups');
  };

  const calculate = () => {
    const val = safeParseNumber(amount, 0);

    if (val <= 0) {
      return { isValid: false, msg: 'Cooking quantity must be greater than 0.' };
    }

    // Convert source to milliliters (ml)
    let ml = 0;
    if (sourceUnit === 'tsp') ml = val * 4.92892;
    else if (sourceUnit === 'tbsp') ml = val * 14.7868;
    else if (sourceUnit === 'fl_oz') ml = val * 29.5735;
    else if (sourceUnit === 'cups') ml = val * 236.588;
    else if (sourceUnit === 'pints') ml = val * 473.176;
    else if (sourceUnit === 'quarts') ml = val * 946.353;
    else if (sourceUnit === 'gallons') ml = val * 3785.41;
    else ml = val; // ml

    const cups = ml / 236.588;
    const tbsp = ml / 14.7868;
    const tsp = ml / 4.92892;
    const flOz = ml / 29.5735;
    const liters = ml / 1000;

    return {
      isValid: true,
      msg: '',
      val,
      sourceUnit,
      ml,
      cups,
      tbsp,
      tsp,
      flOz,
      liters,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Recipe Conversion: ${amount} ${sourceUnit} = ${formatNumber(res.tbsp, 1)} tbsp / ${formatNumber(res.ml, 1)} ml`,
        { amount, sourceUnit },
        { cups: res.cups, tbsp: res.tbsp, ml: res.ml }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Recipe Quantity & Unit
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="amount" label="Ingredient Quantity" value={amount} onChange={setAmount} min={0.1} />
          <CalcSelect
            id="sourceUnit"
            label="Original Recipe Unit"
            value={sourceUnit}
            onChange={setSourceUnit}
            options={[
              { value: 'tsp', label: 'Teaspoons (tsp)' },
              { value: 'tbsp', label: 'Tablespoons (tbsp)' },
              { value: 'fl_oz', label: 'Fluid Ounces (fl oz)' },
              { value: 'cups', label: 'US Cups' },
              { value: 'pints', label: 'US Pints' },
              { value: 'quarts', label: 'US Quarts' },
              { value: 'gallons', label: 'US Gallons' },
              { value: 'ml', label: 'Milliliters (ml)' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="US Cups"
              value={formatNumber(res.cups, 2)}
              subtitle="1 US Cup = 236.6 ml"
              highlighted={true}
            />
            <CalcResultCard
              title="Tablespoons (tbsp)"
              value={formatNumber(res.tbsp, 1)}
              subtitle="1 Cup = 16 Tablespoons"
            />
            <CalcResultCard
              title="Teaspoons (tsp)"
              value={formatNumber(res.tsp, 1)}
              subtitle="1 Tablespoon = 3 Teaspoons"
            />
            <CalcResultCard
              title="Milliliters / Liters"
              value={`${formatNumber(res.ml, 1)} ml`}
              subtitle={`${formatNumber(res.liters, 3)} Liters`}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Standard US Kitchen Measurements: 1 Cup = 16 Tablespoons = 48 Teaspoons = 8 Fluid Ounces.</span>
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
