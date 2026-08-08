import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface MulchSoilVolumeCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const MulchSoilVolumeCalculator: React.FC<MulchSoilVolumeCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [areaSqFt, setAreaSqFt] = useState<string>('500');
  const [depthInches, setDepthInches] = useState<string>('3');
  const [bagSizeCuFt, setBagSizeCuFt] = useState<string>('2'); // Standard 2 cu ft bag
  const [costPerBag, setCostPerBag] = useState<string>('4.50');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.areaSqFt !== undefined) setAreaSqFt(String(initialPreset.areaSqFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setAreaSqFt('500');
    setDepthInches('3');
    setBagSizeCuFt('2');
    setCostPerBag('4.50');
  };

  const calculate = () => {
    const area = safeParseNumber(areaSqFt, 0);
    const depth = safeParseNumber(depthInches, 0);
    const bagSize = safeParseNumber(bagSizeCuFt, 2);
    const bagPrice = safeParseNumber(costPerBag, 0);

    if (area <= 0 || depth <= 0) {
      return { isValid: false, msg: 'Bed area and depth must be greater than 0.' };
    }

    const totalCubicFeet = area * (depth / 12);
    const totalCubicYards = totalCubicFeet / 27;

    const bagsNeeded = Math.ceil(totalCubicFeet / bagSize);
    const totalBagCost = bagsNeeded * bagPrice;

    return {
      isValid: true,
      msg: '',
      area,
      depth,
      totalCubicFeet,
      totalCubicYards,
      bagsNeeded,
      totalBagCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Mulch/Soil: ${formatNumber(res.totalCubicYards, 2)} cu. yards (${res.bagsNeeded} bags) | Cost ${formatCurrency(res.totalBagCost)}`,
        { areaSqFt, depthInches, bagSizeCuFt, costPerBag },
        { totalCubicYards: res.totalCubicYards, bagsNeeded: res.bagsNeeded, totalBagCost: res.totalBagCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Landscaping Bed Dimensions & Bag Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="areaSqFt" label="Garden Bed Area" suffix="sq. ft" value={areaSqFt} onChange={setAreaSqFt} min={1} />
          <CalcInput id="depthInches" label="Desired Coverage Depth" suffix="inches" value={depthInches} onChange={setDepthInches} min={0.5} max={12} helperText="Standard mulch depth is 2-4 inches" />
          <CalcInput id="bagSizeCuFt" label="Bag Volume Size" suffix="cu. ft" value={bagSizeCuFt} onChange={setBagSizeCuFt} min={0.5} helperText="Standard bag size is 2 cu. ft" />
          <CalcInput id="costPerBag" label="Price per Bag" prefix="$" value={costPerBag} onChange={setCostPerBag} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Bulk Volume Needed"
              value={`${formatNumber(res.totalCubicYards, 2)} cu. yards`}
              subtitle="Cubic yards for bulk truck delivery"
              highlighted={true}
            />
            <CalcResultCard
              title="Bags to Purchase"
              value={`${res.bagsNeeded} Bags`}
              subtitle={`At ${bagSizeCuFt} cu. ft per bag`}
            />
            <CalcResultCard
              title="Estimated Bagged Cost"
              value={formatCurrency(res.totalBagCost)}
              subtitle="Total cost for bagged mulch/soil"
              badgeText="Material Estimate"
              badgeType="success"
            />
            <CalcResultCard
              title="Total Volume in Cu. Ft"
              value={`${formatNumber(res.totalCubicFeet, 1)} cu. ft`}
              subtitle="Total cubic volume required"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>1 cubic yard of mulch or topsoil equals 27 cubic feet, which equals approximately 13.5 standard 2 cu. ft bags.</span>
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
