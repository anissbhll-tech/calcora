import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface CapRateCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const CapRateCalculator: React.FC<CapRateCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [propertyValue, setPropertyValue] = useState<string>('350000');
  const [grossIncome, setGrossIncome] = useState<string>('42000');
  const [operatingExpenses, setOperatingExpenses] = useState<string>('14000');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.propertyValue !== undefined) setPropertyValue(String(initialPreset.propertyValue));
      if (initialPreset.grossIncome !== undefined) setGrossIncome(String(initialPreset.grossIncome));
      if (initialPreset.operatingExpenses !== undefined) setOperatingExpenses(String(initialPreset.operatingExpenses));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setPropertyValue('350000');
    setGrossIncome('42000');
    setOperatingExpenses('14000');
  };

  const calculate = () => {
    const val = safeParseNumber(propertyValue, 0);
    const gross = safeParseNumber(grossIncome, 0);
    const exp = safeParseNumber(operatingExpenses, 0);

    if (val <= 0) {
      return { isValid: false, msg: 'Property value must be greater than $0.' };
    }
    if (gross < 0 || exp < 0) {
      return { isValid: false, msg: 'Gross income and expenses cannot be negative.' };
    }

    const noi = gross - exp;
    const capRate = (noi / val) * 100;
    const monthlyCashFlow = noi / 12;
    const grm = gross > 0 ? val / gross : 0;

    return {
      isValid: true,
      msg: '',
      propertyValue: val,
      grossIncome: gross,
      operatingExpenses: exp,
      noi,
      capRate,
      monthlyCashFlow,
      grm,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Cap Rate: ${formatNumber(res.capRate, 2)}% | NOI: ${formatCurrency(res.noi)}`,
        { propertyValue, grossIncome, operatingExpenses },
        { capRate: res.capRate, noi: res.noi, grm: res.grm }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Property Financial Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput
            id="propertyValue"
            label="Property Value / Purchase Price"
            prefix="$"
            value={propertyValue}
            onChange={setPropertyValue}
            min={0}
          />
          <CalcInput
            id="grossIncome"
            label="Gross Annual Rental Income"
            prefix="$"
            value={grossIncome}
            onChange={setGrossIncome}
            min={0}
          />
          <CalcInput
            id="operatingExpenses"
            label="Annual Operating Expenses"
            prefix="$"
            value={operatingExpenses}
            onChange={setOperatingExpenses}
            min={0}
            helperText="Property taxes, insurance, maintenance, management, vacancy"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Capitalization Rate"
              value={`${formatNumber(res.capRate, 2)}%`}
              subtitle="NOI / Property Value"
              highlighted={true}
              badgeText={res.capRate >= 8 ? 'High Yield' : res.capRate >= 5 ? 'Moderate Yield' : 'Low Yield'}
              badgeType={res.capRate >= 8 ? 'success' : 'neutral'}
            />
            <CalcResultCard
              title="Net Operating Income (NOI)"
              value={formatCurrency(res.noi)}
              subtitle="Annual pre-tax cash income"
            />
            <CalcResultCard
              title="Monthly Cash Income"
              value={formatCurrency(res.monthlyCashFlow)}
              subtitle="Average monthly NOI"
            />
            <CalcResultCard
              title="Gross Rent Multiplier (GRM)"
              value={formatNumber(res.grm, 2)}
              subtitle="Price / Gross Annual Rent"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Formula: Cap Rate = (Gross Income - Operating Expenses) / Property Purchase Price</span>
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
