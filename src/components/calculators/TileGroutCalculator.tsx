import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';

interface TileGroutCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const TileGroutCalculator: React.FC<TileGroutCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [roomLength, setRoomLength] = useState<string>('12');
  const [roomWidth, setRoomWidth] = useState<string>('10');
  const [tileLength, setTileLength] = useState<string>('12'); // inches
  const [tileWidth, setTileWidth] = useState<string>('12'); // inches
  const [jointWidth, setJointWidth] = useState<string>('0.125'); // 1/8 inch
  const [tileThickness, setTileThickness] = useState<string>('0.375'); // 3/8 inch
  const [wastePercent, setWastePercent] = useState<string>('10');
  const [costPerSqFt, setCostPerSqFt] = useState<string>('4.50');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.roomLength !== undefined) setRoomLength(String(initialPreset.roomLength));
      if (initialPreset.roomWidth !== undefined) setRoomWidth(String(initialPreset.roomWidth));
      if (initialPreset.tileLength !== undefined) setTileLength(String(initialPreset.tileLength));
      if (initialPreset.tileWidth !== undefined) setTileWidth(String(initialPreset.tileWidth));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setRoomLength('12');
    setRoomWidth('10');
    setTileLength('12');
    setTileWidth('12');
    setJointWidth('0.125');
    setTileThickness('0.375');
    setWastePercent('10');
    setCostPerSqFt('4.50');
  };

  const calculate = () => {
    const rL = safeParseNumber(roomLength, 0);
    const rW = safeParseNumber(roomWidth, 0);
    const tL = safeParseNumber(tileLength, 0);
    const tW = safeParseNumber(tileWidth, 0);
    const jW = safeParseNumber(jointWidth, 0);
    const tThick = safeParseNumber(tileThickness, 0);
    const waste = safeParseNumber(wastePercent, 0) / 100;
    const priceSqFt = safeParseNumber(costPerSqFt, 0);

    if (rL <= 0 || rW <= 0) {
      return {
        isValid: false,
        msg: 'Room dimensions (length and width) must be greater than 0 ft.',
        totalSqFt: 0,
        exactTiles: 0,
        tilesToBuy: 0,
        groutLbs: 0,
        totalCost: 0,
      };
    }

    if (tL <= 0 || tW <= 0) {
      return {
        isValid: false,
        msg: 'Tile dimensions (length and width) must be greater than 0 inches.',
        totalSqFt: 0,
        exactTiles: 0,
        tilesToBuy: 0,
        groutLbs: 0,
        totalCost: 0,
      };
    }

    const totalSqFt = rL * rW;
    const totalSqIn = totalSqFt * 144;

    // Single tile area plus joint share
    // Tile effective size in inches: (tL + jW) * (tW + jW)
    const effectiveTileAreaSqIn = (tL + jW) * (tW + jW);
    const exactTilesNoWaste = totalSqIn / effectiveTileAreaSqIn;
    const exactTiles = exactTilesNoWaste * (1 + waste);
    const tilesToBuy = Math.ceil(exactTiles);

    // Grout estimation formula (Standard Ceramic/Porcelain Industry Formula):
    // Grout Coverage Vol factor ~ [ (Tile L + Tile W) * Joint W * Tile Thickness * Density Factor ] / (Tile L * Tile W)
    // Dry grout density approx 100 lbs/cu ft.
    // Empirical formula in lbs per sq ft = ( (tL + tW) * jW * tThick * 1.55 ) / (tL * tW)
    let groutLbsPerSqFt = 0;
    if (tL * tW > 0) {
      groutLbsPerSqFt = ((tL + tW) * jW * tThick * 1.55) / (tL * tW);
    }
    const groutLbs = totalSqFt * groutLbsPerSqFt * 1.15; // +15% grout waste

    const totalSqFtToBuy = totalSqFt * (1 + waste);
    const totalCost = totalSqFtToBuy * priceSqFt;

    return {
      isValid: true,
      msg: '',
      totalSqFt,
      totalSqFtToBuy,
      exactTiles,
      tilesToBuy,
      groutLbs: Math.max(1, groutLbs),
      totalCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Tile estimate for ${roomLength}'x${roomWidth}' room: ${res.tilesToBuy} tiles (${tileLength}"x${tileWidth}"), ${formatNumber(res.groutLbs, 1)} lbs grout (${formatCurrency(res.totalCost)})`,
        { roomLength, roomWidth, tileLength, tileWidth },
        { tilesToBuy: res.tilesToBuy, groutLbs: res.groutLbs, totalCost: res.totalCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room & Tile Dimensions */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Room Area & Tile Size
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="roomLength"
              label="Room Length"
              suffix="ft"
              value={roomLength}
              onChange={setRoomLength}
              min={1}
            />
            <CalcInput
              id="roomWidth"
              label="Room Width"
              suffix="ft"
              value={roomWidth}
              onChange={setRoomWidth}
              min={1}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="tileLength"
              label="Tile Length"
              suffix="inches"
              value={tileLength}
              onChange={setTileLength}
              min={0.5}
            />
            <CalcInput
              id="tileWidth"
              label="Tile Width"
              suffix="inches"
              value={tileWidth}
              onChange={setTileWidth}
              min={0.5}
            />
          </div>
        </div>

        {/* Joint, Waste & Pricing */}
        <div className="p-5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-800/50 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
            Grout Joint & Material Costs
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="jointWidth"
              label="Grout Joint Width"
              suffix="in"
              value={jointWidth}
              onChange={setJointWidth}
              min={0.0625}
              max={1}
              step="0.0625"
              helperText="1/8 in = 0.125"
            />
            <CalcInput
              id="tileThickness"
              label="Tile Thickness"
              suffix="in"
              value={tileThickness}
              onChange={setTileThickness}
              min={0.125}
              max={1.5}
              step="0.0625"
              helperText="3/8 in = 0.375"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="wastePercent"
              label="Tile Cutting Waste"
              suffix="%"
              value={wastePercent}
              onChange={setWastePercent}
              min={0}
              max={30}
              helperText="10-15% recommended"
            />
            <CalcInput
              id="costPerSqFt"
              label="Tile Price / Sq Ft"
              prefix="$"
              value={costPerSqFt}
              onChange={setCostPerSqFt}
              min={0}
            />
          </div>
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Individual Tiles Needed"
              value={`${formatNumber(res.tilesToBuy, 0)} Tiles`}
              subtitle={`Includes ${wastePercent}% waste buffer`}
              highlighted={true}
            />

            <CalcResultCard
              title="Est. Dry Grout Needed"
              value={`${formatNumber(res.groutLbs, 1)} lbs`}
              subtitle="Based on joint width & depth"
              badgeText="Grout Mix"
              badgeType="info"
            />

            <CalcResultCard
              title="Est. Tile Material Cost"
              value={formatCurrency(res.totalCost)}
              subtitle={`For ${formatNumber(res.totalSqFtToBuy, 1)} sq ft of tile`}
              badgeText="Tile Cost"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Total Area:</span> Net Floor Space:{' '}
              <span className="font-semibold">{formatNumber(res.totalSqFt, 1)} sq ft</span> | Material with Overage:{' '}
              <span className="font-semibold text-teal-600 dark:text-teal-400">{formatNumber(res.totalSqFtToBuy, 1)} sq ft</span>
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
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
