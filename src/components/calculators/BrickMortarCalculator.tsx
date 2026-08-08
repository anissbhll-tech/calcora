import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface BrickMortarCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const BrickMortarCalculator: React.FC<BrickMortarCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [wallLengthFt, setWallLengthFt] = useState<string>('20');
  const [wallHeightFt, setWallHeightFt] = useState<string>('8');
  const [brickType, setBrickType] = useState<string>('standard'); // 'standard' (6.85/sqft), 'queen' (5.8/sqft), 'king' (4.8/sqft), 'utility' (4.5/sqft)
  const [wastePct, setWastePct] = useState<string>('10');
  const [mortarJointInches, setMortarJointInches] = useState<string>('0.375'); // 3/8 inch joint

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.wallLengthFt !== undefined) setWallLengthFt(String(initialPreset.wallLengthFt));
      if (initialPreset.wallHeightFt !== undefined) setWallHeightFt(String(initialPreset.wallHeightFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setWallLengthFt('20');
    setWallHeightFt('8');
    setBrickType('standard');
    setWastePct('10');
    setMortarJointInches('0.375');
  };

  const calculate = () => {
    const length = safeParseNumber(wallLengthFt, 0);
    const height = safeParseNumber(wallHeightFt, 0);
    const waste = safeParseNumber(wastePct, 0) / 100;

    if (length <= 0 || height <= 0) {
      return {
        isValid: false,
        msg: 'Please enter a positive wall length and height.',
        wallAreaSqFt: 0,
        totalBricks: 0,
        mortarBags80lb: 0,
        sandTons: 0,
      };
    }

    const wallAreaSqFt = length * height;

    // Bricks per sq ft factor
    let bricksPerSqFt = 6.85; // Standard Modular (8" x 2.67")
    if (brickType === 'queen') bricksPerSqFt = 5.8;
    else if (brickType === 'king') bricksPerSqFt = 4.8;
    else if (brickType === 'utility') bricksPerSqFt = 4.5;

    const baseBricks = wallAreaSqFt * bricksPerSqFt;
    const totalBricks = Math.ceil(baseBricks * (1 + waste));

    // Mortar estimation: Approx 6.5 bags of 80lb mortar mix per 1,000 standard bricks
    const mortarBags80lb = Math.ceil((totalBricks / 1000) * 6.5);

    // Sand estimation: ~1 ton of sand per 1,000 bricks
    const sandTons = (totalBricks / 1000) * 1.0;

    return {
      isValid: true,
      msg: '',
      wallAreaSqFt,
      baseBricks: Math.ceil(baseBricks),
      totalBricks,
      mortarBags80lb,
      sandTons,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Brick & Mortar Estimate (${wallLengthFt}'x${wallHeightFt}' wall, ${res.wallAreaSqFt} sq ft): ${res.totalBricks} bricks (${wastePct}% waste), ${res.mortarBags80lb} bags (80lb) mortar`,
        { wallLengthFt, wallHeightFt, brickType, wastePct },
        { totalBricks: res.totalBricks, mortarBags: res.mortarBags80lb }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Wall & Material Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <CalcInput
            id="wallLengthFt"
            label="Wall Length"
            suffix="ft"
            value={wallLengthFt}
            onChange={setWallLengthFt}
            min={1}
            step="1"
          />

          <CalcInput
            id="wallHeightFt"
            label="Wall Height"
            suffix="ft"
            value={wallHeightFt}
            onChange={setWallHeightFt}
            min={1}
            step="1"
          />

          <CalcSelect
            id="brickType"
            label="Brick Size Type"
            value={brickType}
            onChange={setBrickType}
            options={[
              { value: 'standard', label: 'Standard Modular (6.85/sq ft)' },
              { value: 'queen', label: 'Queen Size (5.8/sq ft)' },
              { value: 'king', label: 'King Size (4.8/sq ft)' },
              { value: 'utility', label: 'Utility Size (4.5/sq ft)' },
            ]}
          />

          <CalcInput
            id="wastePct"
            label="Waste & Cut Allowance"
            suffix="%"
            value={wastePct}
            onChange={setWastePct}
            min={0}
            max={30}
            step="1"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Total Bricks Required"
              value={`${formatNumber(res.totalBricks, 0)} bricks`}
              subtitle={`Includes ${wastePct}% waste factor (${formatNumber(res.baseBricks, 0)} net)`}
              highlighted={true}
            />

            <CalcResultCard
              title="Mortar Mix Bags (80 lb)"
              value={`${formatNumber(res.mortarBags80lb, 0)} bags`}
              subtitle="Pre-mixed Type N masonry mortar"
              badgeText="Mortar"
              badgeType="info"
            />

            <CalcResultCard
              title="Masonry Sand Estimate"
              value={`${formatNumber(res.sandTons, 2)} tons`}
              subtitle={`For single wythe ${formatNumber(res.wallAreaSqFt, 0)} sq ft wall`}
              badgeText="Sand"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Pro Tip:</span> Always purchase 5-10% extra bricks from the same production batch/lot to ensure uniform color matching throughout the wall.
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
              >
                Save Brick Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
