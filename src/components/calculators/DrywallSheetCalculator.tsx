import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface DrywallSheetCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const DrywallSheetCalculator: React.FC<DrywallSheetCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [roomLengthFt, setRoomLengthFt] = useState<string>('20');
  const [roomWidthFt, setRoomWidthFt] = useState<string>('15');
  const [wallHeightFt, setWallHeightFt] = useState<string>('8');
  const [sheetSize, setSheetSize] = useState<string>('4x8'); // 4x8 (32 sq ft), 4x12 (48 sq ft)
  const [sheetCost, setSheetCost] = useState<string>('18');

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
    setSheetSize('4x8');
    setSheetCost('18');
  };

  const calculate = () => {
    const l = safeParseNumber(roomLengthFt, 0);
    const w = safeParseNumber(roomWidthFt, 0);
    const h = safeParseNumber(wallHeightFt, 0);
    const price = safeParseNumber(sheetCost, 0);

    if (l <= 0 || w <= 0 || h <= 0) {
      return { isValid: false, msg: 'Room dimensions must be greater than 0.' };
    }

    const wallAreaSqFt = 2 * (l + w) * h;
    const ceilingAreaSqFt = l * w;
    const totalAreaSqFt = wallAreaSqFt + ceilingAreaSqFt;

    const sqFtPerSheet = sheetSize === '4x8' ? 32 : 48;
    const rawSheets = totalAreaSqFt / sqFtPerSheet;

    // Add 10% waste factor
    const sheetsNeeded = Math.ceil(rawSheets * 1.1);
    const estimatedCost = sheetsNeeded * price;

    return {
      isValid: true,
      msg: '',
      wallAreaSqFt,
      ceilingAreaSqFt,
      totalAreaSqFt,
      sheetsNeeded,
      estimatedCost,
      sqFtPerSheet,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Drywall: ${res.sheetsNeeded} sheets (${sheetSize}) | Cost ${formatCurrency(res.estimatedCost)}`,
        { roomLengthFt, roomWidthFt, wallHeightFt, sheetSize, sheetCost },
        { sheetsNeeded: res.sheetsNeeded, estimatedCost: res.estimatedCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Room Dimensions & Sheet Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <CalcInput id="roomLengthFt" label="Room Length" suffix="ft" value={roomLengthFt} onChange={setRoomLengthFt} min={1} />
          <CalcInput id="roomWidthFt" label="Room Width" suffix="ft" value={roomWidthFt} onChange={setRoomWidthFt} min={1} />
          <CalcInput id="wallHeightFt" label="Wall Height" suffix="ft" value={wallHeightFt} onChange={setWallHeightFt} min={6} max={20} />
          <CalcSelect
            id="sheetSize"
            label="Drywall Sheet Size"
            value={sheetSize}
            onChange={setSheetSize}
            options={[
              { value: '4x8', label: '4ft x 8ft (32 sq ft)' },
              { value: '4x12', label: '4ft x 12ft (48 sq ft)' },
            ]}
          />
          <CalcInput id="sheetCost" label="Cost per Sheet" prefix="$" value={sheetCost} onChange={setSheetCost} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Drywall Sheets Needed"
              value={`${res.sheetsNeeded} Sheets`}
              subtitle={`Includes 10% cutting waste factor (${sheetSize})`}
              highlighted={true}
            />
            <CalcResultCard
              title="Total Material Cost"
              value={formatCurrency(res.estimatedCost)}
              subtitle="Cost for drywall panel sheets"
              badgeText="Material Total"
              badgeType="success"
            />
            <CalcResultCard
              title="Total Surface Area"
              value={`${formatNumber(res.totalAreaSqFt, 0)} sq. ft`}
              subtitle="Walls + Ceiling area"
            />
            <CalcResultCard
              title="Wall Surface Area"
              value={`${formatNumber(res.wallAreaSqFt, 0)} sq. ft`}
              subtitle="Perimeter wall coverage"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Includes standard 10% waste buffer to account for door/window cutouts and joint trimming.</span>
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
