import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface PaintCoverageCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PaintCoverageCalculator: React.FC<PaintCoverageCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [roomLengthFt, setRoomLengthFt] = useState<string>('20');
  const [roomWidthFt, setRoomWidthFt] = useState<string>('15');
  const [wallHeightFt, setWallHeightFt] = useState<string>('8');
  const [numberOfCoats, setNumberOfCoats] = useState<string>('2');
  const [doorsAndWindows, setDoorsAndWindows] = useState<string>('3'); // subtracting ~20 sq ft per opening
  const [costPerGallon, setCostPerGallon] = useState<string>('42');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.roomLengthFt !== undefined) setRoomLengthFt(String(initialPreset.roomLengthFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setRoomLengthFt('20');
    setRoomWidthFt('15');
    setWallHeightFt('8');
    setNumberOfCoats('2');
    setDoorsAndWindows('3');
    setCostPerGallon('42');
  };

  const calculate = () => {
    const l = safeParseNumber(roomLengthFt, 0);
    const w = safeParseNumber(roomWidthFt, 0);
    const h = safeParseNumber(wallHeightFt, 0);
    const coats = safeParseNumber(numberOfCoats, 2);
    const openings = safeParseNumber(doorsAndWindows, 0);
    const gallonPrice = safeParseNumber(costPerGallon, 0);

    if (l <= 0 || w <= 0 || h <= 0) {
      return { isValid: false, msg: 'Room dimensions must be greater than 0.' };
    }

    const grossWallArea = 2 * (l + w) * h;
    const openingsDeduction = openings * 21; // ~21 sq ft per standard door/window
    const netWallArea = Math.max(0, grossWallArea - openingsDeduction);

    const totalCoatsArea = netWallArea * coats;

    // Standard paint gallon covers approximately 350-400 sq. ft.
    const gallonsNeeded = Math.ceil(totalCoatsArea / 350);
    const totalPaintCost = gallonsNeeded * gallonPrice;

    return {
      isValid: true,
      msg: '',
      grossWallArea,
      netWallArea,
      gallonsNeeded,
      totalPaintCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Paint Order: ${res.gallonsNeeded} Gallons (${numberOfCoats} coats) | Cost ${formatCurrency(res.totalPaintCost)}`,
        { roomLengthFt, roomWidthFt, wallHeightFt, numberOfCoats, costPerGallon },
        { gallonsNeeded: res.gallonsNeeded, totalPaintCost: res.totalPaintCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Wall Dimensions & Paint Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="roomLengthFt" label="Room Length" suffix="ft" value={roomLengthFt} onChange={setRoomLengthFt} min={1} />
          <CalcInput id="roomWidthFt" label="Room Width" suffix="ft" value={roomWidthFt} onChange={setRoomWidthFt} min={1} />
          <CalcInput id="wallHeightFt" label="Wall Height" suffix="ft" value={wallHeightFt} onChange={setWallHeightFt} min={6} max={20} />
          <CalcInput id="numberOfCoats" label="Number of Paint Coats" value={numberOfCoats} onChange={setNumberOfCoats} min={1} max={4} />
          <CalcInput id="doorsAndWindows" label="Doors & Windows Openings Count" value={doorsAndWindows} onChange={setDoorsAndWindows} min={0} helperText="Subtractor: ~21 sq ft per opening" />
          <CalcInput id="costPerGallon" label="Price per Paint Gallon" prefix="$" value={costPerGallon} onChange={setCostPerGallon} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Paint Gallons Required"
              value={`${res.gallonsNeeded} Gallons`}
              subtitle={`Based on 350 sq ft coverage per gallon (${numberOfCoats} coats)`}
              highlighted={true}
            />
            <CalcResultCard
              title="Estimated Paint Cost"
              value={formatCurrency(res.totalPaintCost)}
              subtitle="Material cost for paint gallons"
              badgeText="Paint Total"
              badgeType="success"
            />
            <CalcResultCard
              title="Net Wall Area to Paint"
              value={`${formatNumber(res.netWallArea, 0)} sq. ft`}
              subtitle="Wall area after door/window deductions"
            />
            <CalcResultCard
              title="Gross Wall Perimeter Area"
              value={`${formatNumber(res.grossWallArea, 0)} sq. ft`}
              subtitle="Perimeter wall footprint"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>One gallon of interior latex paint covers roughly 350 to 400 square feet of smooth wall surface per coat.</span>
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
