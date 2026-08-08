import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface RoofingShingleCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const RoofingShingleCalculator: React.FC<RoofingShingleCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [houseAreaSqFt, setHouseAreaSqFt] = useState<string>('2000');
  const [pitchFactor, setPitchFactor] = useState<string>('1.12'); // 4/12 pitch = 1.054, 6/12 = 1.12, 8/12 = 1.20
  const [wastePercent, setWastePercent] = useState<string>('10');
  const [costPerBundle, setCostPerBundle] = useState<string>('35');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.houseAreaSqFt !== undefined) setHouseAreaSqFt(String(initialPreset.houseAreaSqFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setHouseAreaSqFt('2000');
    setPitchFactor('1.12');
    setWastePercent('10');
    setCostPerBundle('35');
  };

  const calculate = () => {
    const baseArea = safeParseNumber(houseAreaSqFt, 0);
    const pitch = safeParseNumber(pitchFactor, 1.0);
    const waste = safeParseNumber(wastePercent, 10) / 100;
    const bundlePrice = safeParseNumber(costPerBundle, 0);

    if (baseArea <= 0) {
      return { isValid: false, msg: 'House roof footprint area must be greater than 0.' };
    }

    const adjustedRoofArea = baseArea * pitch;
    const roofSquares = adjustedRoofArea / 100; // 1 roofing square = 100 sq ft

    // Standard 3-tab or architectural shingles: 3 bundles per square
    const rawBundles = roofSquares * 3;
    const totalBundlesNeeded = Math.ceil(rawBundles * (1 + waste));
    const totalSquaresToOrder = Math.ceil((totalBundlesNeeded / 3) * 10) / 10;

    const totalCost = totalBundlesNeeded * bundlePrice;

    return {
      isValid: true,
      msg: '',
      adjustedRoofArea,
      roofSquares,
      totalBundlesNeeded,
      totalSquaresToOrder,
      totalCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Roof Shingles: ${res.totalBundlesNeeded} Bundles (${res.totalSquaresToOrder} Squares) | Cost ${formatCurrency(res.totalCost)}`,
        { houseAreaSqFt, pitchFactor, wastePercent, costPerBundle },
        { totalBundlesNeeded: res.totalBundlesNeeded, totalCost: res.totalCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Roof Footprint & Pitch Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="houseAreaSqFt" label="House Base Footprint Area" suffix="sq. ft" value={houseAreaSqFt} onChange={setHouseAreaSqFt} min={100} />
          <CalcInput id="pitchFactor" label="Roof Pitch Multiplier" value={pitchFactor} onChange={setPitchFactor} helperText="4/12 pitch = 1.05 | 6/12 pitch = 1.12 | 8/12 pitch = 1.20" />
          <CalcInput id="wastePercent" label="Cutting Waste %" suffix="%" value={wastePercent} onChange={setWastePercent} min={0} max={25} />
          <CalcInput id="costPerBundle" label="Cost per Shingle Bundle" prefix="$" value={costPerBundle} onChange={setCostPerBundle} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Shingle Bundles Required"
              value={`${res.totalBundlesNeeded} Bundles`}
              subtitle="3 bundles = 1 roofing square (100 sq ft)"
              highlighted={true}
            />
            <CalcResultCard
              title="Roofing Squares"
              value={`${res.totalSquaresToOrder} Squares`}
              subtitle="Standard commercial roofing unit"
            />
            <CalcResultCard
              title="Total Material Cost"
              value={formatCurrency(res.totalCost)}
              subtitle="Shingle bundle material cost"
              badgeText="Material Estimate"
              badgeType="success"
            />
            <CalcResultCard
              title="Adjusted Roof Surface Area"
              value={`${formatNumber(res.adjustedRoofArea, 0)} sq. ft`}
              subtitle="Slope adjusted surface area"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>One roofing square equals 100 square feet of sloped surface area. Standard asphalt shingles require 3 bundles per square.</span>
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
