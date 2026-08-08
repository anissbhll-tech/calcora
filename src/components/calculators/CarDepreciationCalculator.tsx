import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface CarDepreciationCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const CarDepreciationCalculator: React.FC<CarDepreciationCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [purchasePrice, setPurchasePrice] = useState<string>('35000');
  const [ownershipYears, setOwnershipYears] = useState<string>('5');
  const [depreciationCurve, setDepreciationCurve] = useState<string>('average'); // 'low', 'average', 'high'

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.purchasePrice !== undefined) setPurchasePrice(String(initialPreset.purchasePrice));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setPurchasePrice('35000');
    setOwnershipYears('5');
    setDepreciationCurve('average');
  };

  const calculate = () => {
    const price = safeParseNumber(purchasePrice, 0);
    const years = safeParseNumber(ownershipYears, 1);

    if (price <= 0 || years <= 0) {
      return { isValid: false, msg: 'Vehicle price and ownership years must be greater than 0.' };
    }

    // Typical automotive depreciation retention curves:
    // Year 1: ~80% (Avg), ~85% (Low), ~75% (High)
    // Year 2: ~70% (Avg), ~76% (Low), ~63% (High)
    // Year 3: ~60% (Avg), ~68% (Low), ~52% (High)
    // Year 4: ~52% (Avg), ~61% (Low), ~43% (High)
    // Year 5: ~45% (Avg), ~55% (Low), ~35% (High)
    const annualRates: Record<string, number[]> = {
      low: [0.85, 0.76, 0.68, 0.61, 0.55, 0.50, 0.45, 0.41, 0.38, 0.35],
      average: [0.80, 0.70, 0.60, 0.52, 0.45, 0.39, 0.34, 0.30, 0.27, 0.25],
      high: [0.75, 0.63, 0.52, 0.43, 0.35, 0.29, 0.24, 0.20, 0.17, 0.15],
    };

    const curveList = annualRates[depreciationCurve] || annualRates.average;
    const yearIndex = Math.min(Math.max(1, Math.round(years)), 10) - 1;
    const retentionRate = curveList[yearIndex];

    const estimatedResaleValue = price * retentionRate;
    const totalDepreciation = price - estimatedResaleValue;
    const valueRetainedPercent = retentionRate * 100;
    const annualAverageDepreciation = totalDepreciation / years;

    return {
      isValid: true,
      msg: '',
      price,
      years,
      estimatedResaleValue,
      totalDepreciation,
      valueRetainedPercent,
      annualAverageDepreciation,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Car Resale Value: ${formatCurrency(res.estimatedResaleValue)} after ${res.years} yrs`,
        { purchasePrice, ownershipYears, depreciationCurve },
        { estimatedResaleValue: res.estimatedResaleValue, totalDepreciation: res.totalDepreciation }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Vehicle Purchase & Depreciation Curve
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="purchasePrice" label="Vehicle Purchase Price" prefix="$" value={purchasePrice} onChange={setPurchasePrice} min={0} />
          <CalcInput id="ownershipYears" label="Ownership Duration" suffix="yrs" value={ownershipYears} onChange={setOwnershipYears} min={1} max={10} />
          <CalcSelect
            id="depreciationCurve"
            label="Depreciation Category"
            value={depreciationCurve}
            onChange={setDepreciationCurve}
            options={[
              { value: 'low', label: 'Low Depreciation (Trucks / Reliable Japanese)' },
              { value: 'average', label: 'Average Vehicle Depreciation' },
              { value: 'high', label: 'High Depreciation (Luxury / German EVs)' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Estimated Resale Value"
              value={formatCurrency(res.estimatedResaleValue)}
              subtitle={`After ${res.years} years of driving`}
              highlighted={true}
            />
            <CalcResultCard
              title="Total Depreciation Loss"
              value={formatCurrency(res.totalDepreciation)}
              subtitle="Value lost over ownership"
            />
            <CalcResultCard
              title="Value Retained"
              value={`${formatNumber(res.valueRetainedPercent, 1)}%`}
              subtitle="Percentage of purchase price kept"
            />
            <CalcResultCard
              title="Avg Annual Cost"
              value={formatCurrency(res.annualAverageDepreciation)}
              subtitle="Depreciation cost per year"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>New vehicles lose approximately 20% of their value in the first 12 months.</span>
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
