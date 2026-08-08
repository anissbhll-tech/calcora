import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface ConcreteSlabVolumeCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const ConcreteSlabVolumeCalculator: React.FC<ConcreteSlabVolumeCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [lengthFt, setLengthFt] = useState<string>('20');
  const [widthFt, setWidthFt] = useState<string>('15');
  const [thicknessInches, setThicknessInches] = useState<string>('4');
  const [costPerCubicYard, setCostPerCubicYard] = useState<string>('135');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.lengthFt !== undefined) setLengthFt(String(initialPreset.lengthFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setLengthFt('20');
    setWidthFt('15');
    setThicknessInches('4');
    setCostPerCubicYard('135');
  };

  const calculate = () => {
    const l = safeParseNumber(lengthFt, 0);
    const w = safeParseNumber(widthFt, 0);
    const t = safeParseNumber(thicknessInches, 0);
    const priceYard = safeParseNumber(costPerCubicYard, 0);

    if (l <= 0 || w <= 0 || t <= 0) {
      return { isValid: false, msg: 'Length, width, and thickness must be greater than 0.' };
    }

    const areaSqFt = l * w;
    const volumeCubicFeet = areaSqFt * (t / 12);
    const volumeCubicYards = volumeCubicFeet / 27;

    // Add 10% safety margin buffer for spill & uneven ground
    const yardsWithBuffer = volumeCubicYards * 1.1;

    // Standard 80lb bags of pre-mix concrete (0.6 cu ft per bag)
    const total80lbBags = Math.ceil(volumeCubicFeet / 0.6);

    const estimatedCost = yardsWithBuffer * priceYard;

    return {
      isValid: true,
      msg: '',
      areaSqFt,
      volumeCubicYards,
      yardsWithBuffer,
      total80lbBags,
      estimatedCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Concrete Slab: ${formatNumber(res.yardsWithBuffer, 2)} cu. yards (${res.total80lbBags} bags)`,
        { lengthFt, widthFt, thicknessInches, costPerCubicYard },
        { volumeYards: res.yardsWithBuffer, cost: res.estimatedCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Slab Dimensions & Concrete Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="lengthFt" label="Slab Length" suffix="ft" value={lengthFt} onChange={setLengthFt} min={0.1} />
          <CalcInput id="widthFt" label="Slab Width" suffix="ft" value={widthFt} onChange={setWidthFt} min={0.1} />
          <CalcInput id="thicknessInches" label="Slab Thickness" suffix="inches" value={thicknessInches} onChange={setThicknessInches} min={1} helperText="Standard driveways 4-6 inches" />
          <CalcInput id="costPerCubicYard" label="Concrete Price per Yard" prefix="$" value={costPerCubicYard} onChange={setCostPerCubicYard} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Concrete Needed (With 10% Buffer)"
              value={`${formatNumber(res.yardsWithBuffer, 2)} cu. yards`}
              subtitle="Ready-mix truck volume required"
              highlighted={true}
            />
            <CalcResultCard
              title="Pre-Mix 80lb Bags"
              value={`${res.total80lbBags} Bags`}
              subtitle="0.6 cu. ft per standard bag"
            />
            <CalcResultCard
              title="Estimated Concrete Cost"
              value={formatCurrency(res.estimatedCost)}
              subtitle="Material cost estimate"
              badgeText="Material Estimate"
              badgeType="success"
            />
            <CalcResultCard
              title="Slab Surface Area"
              value={`${formatNumber(res.areaSqFt, 0)} sq. ft`}
              subtitle="Total footprint area"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Always order 10% extra concrete to accommodate subgrade variations and spillage during pour.</span>
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
