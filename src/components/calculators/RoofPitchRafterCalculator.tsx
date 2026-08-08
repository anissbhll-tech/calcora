import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface RoofPitchRafterCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const RoofPitchRafterCalculator: React.FC<RoofPitchRafterCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [riseInches, setRiseInches] = useState<string>('6'); // Rise per 12 inches run (6/12 pitch)
  const [buildingSpanFeet, setBuildingSpanFeet] = useState<string>('24'); // Total span of building (ft)
  const [buildingLengthFeet, setBuildingLengthFeet] = useState<string>('30'); // Length of building (ft)
  const [overhangInches, setOverhangInches] = useState<string>('12'); // Eave overhang in inches

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.riseInches !== undefined) setRiseInches(String(initialPreset.riseInches));
      if (initialPreset.buildingSpanFeet !== undefined) setBuildingSpanFeet(String(initialPreset.buildingSpanFeet));
      if (initialPreset.buildingLengthFeet !== undefined) setBuildingLengthFeet(String(initialPreset.buildingLengthFeet));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setRiseInches('6');
    setBuildingSpanFeet('24');
    setBuildingLengthFeet('30');
    setOverhangInches('12');
  };

  const calculate = () => {
    const rise = safeParseNumber(riseInches, 0);
    const span = safeParseNumber(buildingSpanFeet, 0);
    const length = safeParseNumber(buildingLengthFeet, 0);
    const overhang = safeParseNumber(overhangInches, 0);

    if (rise <= 0 || span <= 0 || length <= 0) {
      return {
        isValid: false,
        msg: 'Please enter positive dimensions for rise, span, and length.',
        pitchRatio: '',
        pitchAngleDeg: 0,
        rafterLengthFt: 0,
        rafterLengthInchesTotal: 0,
        roofAreaSqFt: 0,
      };
    }

    const run = 12; // Standard 12 inches run
    const pitchAngleRad = Math.atan(rise / run);
    const pitchAngleDeg = (pitchAngleRad * 180) / Math.PI;

    // Pitch multiplier = sqrt(1 + (rise/12)^2)
    const pitchMultiplier = Math.sqrt(1 + Math.pow(rise / 12, 2));

    // Half span in feet + overhang in feet
    const halfSpanFt = span / 2;
    const overhangFt = overhang / 12;

    const rafterLengthFt = (halfSpanFt + overhangFt) * pitchMultiplier;
    const rafterLengthInchesTotal = rafterLengthFt * 12;

    // Total Roof Area = 2 * (Building Length + Overhang) * Rafter Length
    const roofAreaSqFt = 2 * (length + 2 * overhangFt) * rafterLengthFt;

    return {
      isValid: true,
      msg: '',
      pitchRatio: `${rise}/12`,
      pitchAngleDeg,
      pitchMultiplier,
      rafterLengthFt,
      rafterLengthInchesTotal,
      roofAreaSqFt,
      roofSquares: roofAreaSqFt / 100, // 1 roof square = 100 sq ft
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Roof Pitch & Rafter (${res.pitchRatio} pitch, ${buildingSpanFeet}' span): Rafter Length = ${formatNumber(res.rafterLengthFt, 2)} ft (${formatNumber(res.roofAreaSqFt, 0)} sq ft area)`,
        { riseInches, buildingSpanFeet, buildingLengthFeet, overhangInches },
        { rafterLengthFt: res.rafterLengthFt, roofAreaSqFt: res.roofAreaSqFt }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Building & Pitch Dimensions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <CalcInput
            id="riseInches"
            label="Roof Rise (per 12 in)"
            suffix="in"
            value={riseInches}
            onChange={setRiseInches}
            min={1}
            max={24}
            step="0.5"
            helperText="e.g. 6 = 6/12 pitch"
          />

          <CalcInput
            id="buildingSpanFeet"
            label="Building Span (Width)"
            suffix="ft"
            value={buildingSpanFeet}
            onChange={setBuildingSpanFeet}
            min={1}
            step="1"
          />

          <CalcInput
            id="buildingLengthFeet"
            label="Building Length"
            suffix="ft"
            value={buildingLengthFeet}
            onChange={setBuildingLengthFeet}
            min={1}
            step="1"
          />

          <CalcInput
            id="overhangInches"
            label="Eave Overhang"
            suffix="in"
            value={overhangInches}
            onChange={setOverhangInches}
            min={0}
            step="1"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Common Rafter Length"
              value={`${formatNumber(res.rafterLengthFt, 2)} ft`}
              subtitle={`${formatNumber(res.rafterLengthInchesTotal, 1)} total inches (incl. overhang)`}
              highlighted={true}
            />

            <CalcResultCard
              title="Roof Slope / Pitch Angle"
              value={`${formatNumber(res.pitchAngleDeg, 1)}° (${res.pitchRatio})`}
              subtitle={`Pitch multiplier: ${formatNumber(res.pitchMultiplier, 3)}`}
              badgeText="Pitch Angle"
              badgeType="info"
            />

            <CalcResultCard
              title="Total Roof Surface Area"
              value={`${formatNumber(res.roofAreaSqFt, 0)} sq ft`}
              subtitle={`Approx. ${formatNumber(res.roofSquares, 1)} roofing squares (100 sq ft/sq)`}
              badgeText="Surface Area"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Estimating Tip:</span> Add 10-15% waste allowance when ordering shingles, plywood sheathing, or underlayment.
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
              >
                Save Roof Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
