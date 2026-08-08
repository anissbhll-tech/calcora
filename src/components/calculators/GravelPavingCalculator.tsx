import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface GravelPavingCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const GravelPavingCalculator: React.FC<GravelPavingCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [drivewayLengthFt, setDrivewayLengthFt] = useState<string>('50');
  const [drivewayWidthFt, setDrivewayWidthFt] = useState<string>('12');
  const [depthInches, setDepthInches] = useState<string>('3');
  const [costPerTon, setCostPerTon] = useState<string>('45');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.drivewayLengthFt !== undefined) setDrivewayLengthFt(String(initialPreset.drivewayLengthFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDrivewayLengthFt('50');
    setDrivewayWidthFt('12');
    setDepthInches('3');
    setCostPerTon('45');
  };

  const calculate = () => {
    const l = safeParseNumber(drivewayLengthFt, 0);
    const w = safeParseNumber(drivewayWidthFt, 0);
    const d = safeParseNumber(depthInches, 0);
    const priceTon = safeParseNumber(costPerTon, 0);

    if (l <= 0 || w <= 0 || d <= 0) {
      return { isValid: false, msg: 'Length, width, and depth must be greater than 0.' };
    }

    const areaSqFt = l * w;
    const volumeCubicFeet = areaSqFt * (d / 12);
    const volumeCubicYards = volumeCubicFeet / 27;

    // Average gravel density: ~1.4 tons per cubic yard (2,800 lbs/cu yard)
    const weightTons = volumeCubicYards * 1.4;

    const estimatedCost = weightTons * priceTon;

    return {
      isValid: true,
      msg: '',
      areaSqFt,
      volumeCubicYards,
      weightTons,
      estimatedCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Gravel Driveway: ${formatNumber(res.weightTons, 2)} Tons (${formatNumber(res.volumeCubicYards, 2)} cu. yd) | Cost ${formatCurrency(res.estimatedCost)}`,
        { drivewayLengthFt, drivewayWidthFt, depthInches, costPerTon },
        { weightTons: res.weightTons, estimatedCost: res.estimatedCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Paving / Driveway Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="drivewayLengthFt" label="Driveway Length" suffix="ft" value={drivewayLengthFt} onChange={setDrivewayLengthFt} min={1} />
          <CalcInput id="drivewayWidthFt" label="Driveway Width" suffix="ft" value={drivewayWidthFt} onChange={setDrivewayWidthFt} min={1} />
          <CalcInput id="depthInches" label="Gravel Depth" suffix="inches" value={depthInches} onChange={setDepthInches} min={1} max={12} helperText="Standard driveway depth is 3-4 inches" />
          <CalcInput id="costPerTon" label="Gravel Price per Ton" prefix="$" value={costPerTon} onChange={setCostPerTon} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Gravel Weight Required"
              value={`${formatNumber(res.weightTons, 2)} Tons`}
              subtitle="Weight for quarry bulk delivery"
              highlighted={true}
            />
            <CalcResultCard
              title="Cubic Volume"
              value={`${formatNumber(res.volumeCubicYards, 2)} cu. yards`}
              subtitle="Volume capacity needed"
            />
            <CalcResultCard
              title="Estimated Gravel Cost"
              value={formatCurrency(res.estimatedCost)}
              subtitle="Bulk material purchase estimate"
              badgeText="Material Cost"
              badgeType="success"
            />
            <CalcResultCard
              title="Surface Footprint"
              value={`${formatNumber(res.areaSqFt, 0)} sq. ft`}
              subtitle="Total paved area"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Crushed stone and gravel weigh approximately 1.4 tons (2,800 pounds) per cubic yard.</span>
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
