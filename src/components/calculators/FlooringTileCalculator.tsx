import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface FlooringTileCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const FlooringTileCalculator: React.FC<FlooringTileCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [roomLengthFt, setRoomLengthFt] = useState<string>('15');
  const [roomWidthFt, setRoomWidthFt] = useState<string>('12');
  const [tileWidthInches, setTileWidthInches] = useState<string>('12');
  const [tileLengthInches, setTileLengthInches] = useState<string>('12');
  const [wastePercent, setWastePercent] = useState<string>('10');
  const [pricePerSqFt, setPricePerSqFt] = useState<string>('4.50');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.roomLengthFt !== undefined) setRoomLengthFt(String(initialPreset.roomLengthFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setRoomLengthFt('15');
    setRoomWidthFt('12');
    setTileWidthInches('12');
    setTileLengthInches('12');
    setWastePercent('10');
    setPricePerSqFt('4.50');
  };

  const calculate = () => {
    const l = safeParseNumber(roomLengthFt, 0);
    const w = safeParseNumber(roomWidthFt, 0);
    const tw = safeParseNumber(tileWidthInches, 0);
    const tl = safeParseNumber(tileLengthInches, 0);
    const waste = safeParseNumber(wastePercent, 10) / 100;
    const price = safeParseNumber(pricePerSqFt, 0);

    if (l <= 0 || w <= 0 || tw <= 0 || tl <= 0) {
      return { isValid: false, msg: 'Room and tile dimensions must be greater than 0.' };
    }

    const roomAreaSqFt = l * w;
    const tileAreaSqFt = (tw * tl) / 144; // convert sq inches to sq ft

    const rawTileCount = roomAreaSqFt / tileAreaSqFt;
    const totalTileCount = Math.ceil(rawTileCount * (1 + waste));

    const totalOrderSqFt = totalTileCount * tileAreaSqFt;
    const totalMaterialCost = totalOrderSqFt * price;

    return {
      isValid: true,
      msg: '',
      roomAreaSqFt,
      totalTileCount,
      totalOrderSqFt,
      totalMaterialCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Tile flooring: ${res.totalTileCount} tiles (${formatNumber(res.totalOrderSqFt, 0)} sq. ft) | Cost ${formatCurrency(res.totalMaterialCost)}`,
        { roomLengthFt, roomWidthFt, tileWidthInches, tileLengthInches, wastePercent, pricePerSqFt },
        { totalTileCount: res.totalTileCount, totalMaterialCost: res.totalMaterialCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Flooring & Tile Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="roomLengthFt" label="Room Length" suffix="ft" value={roomLengthFt} onChange={setRoomLengthFt} min={1} />
          <CalcInput id="roomWidthFt" label="Room Width" suffix="ft" value={roomWidthFt} onChange={setRoomWidthFt} min={1} />
          <CalcInput id="pricePerSqFt" label="Tile Price per Sq Ft" prefix="$" value={pricePerSqFt} onChange={setPricePerSqFt} min={0} />
          <CalcInput id="tileWidthInches" label="Tile Width" suffix="inches" value={tileWidthInches} onChange={setTileWidthInches} min={1} />
          <CalcInput id="tileLengthInches" label="Tile Length" suffix="inches" value={tileLengthInches} onChange={setTileLengthInches} min={1} />
          <CalcInput id="wastePercent" label="Cutting Waste Allowance" suffix="%" value={wastePercent} onChange={setWastePercent} min={0} max={30} helperText="10% standard, 15% for diagonal tile layouts" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Total Tiles Required"
              value={`${res.totalTileCount} Tiles`}
              subtitle={`Includes ${wastePercent}% layout waste allowance`}
              highlighted={true}
            />
            <CalcResultCard
              title="Order Coverage Area"
              value={`${formatNumber(res.totalOrderSqFt, 1)} sq. ft`}
              subtitle="Square footage to purchase"
            />
            <CalcResultCard
              title="Estimated Material Cost"
              value={formatCurrency(res.totalMaterialCost)}
              subtitle="Tile purchase cost estimate"
              badgeText="Tile Total"
              badgeType="success"
            />
            <CalcResultCard
              title="Actual Room Footprint"
              value={`${formatNumber(res.roomAreaSqFt, 1)} sq. ft`}
              subtitle="Net floor surface area"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Diagonal or herringbone tile installation patterns require a 15% waste allowance due to corner angle cuts.</span>
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
