import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface StairRiserTreadCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const StairRiserTreadCalculator: React.FC<StairRiserTreadCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [totalRiseInches, setTotalRiseInches] = useState<string>('108'); // 9 feet = 108 inches
  const [targetRiserInches, setTargetRiserInches] = useState<string>('7.5');
  const [treadDepthInches, setTreadDepthInches] = useState<string>('10');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.totalRiseInches !== undefined) setTotalRiseInches(String(initialPreset.totalRiseInches));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setTotalRiseInches('108');
    setTargetRiserInches('7.5');
    setTreadDepthInches('10');
  };

  const calculate = () => {
    const rise = safeParseNumber(totalRiseInches, 0);
    const targetRiser = safeParseNumber(targetRiserInches, 7.5);
    const treadDepth = safeParseNumber(treadDepthInches, 10);

    if (rise <= 0 || targetRiser <= 0 || treadDepth <= 0) {
      return { isValid: false, msg: 'Total rise, target riser height, and tread depth must be greater than 0.' };
    }

    const numberOfRisers = Math.round(rise / targetRiser);
    const actualRiserHeight = rise / numberOfRisers;
    const numberOfTreads = numberOfRisers - 1;

    const totalRunInches = numberOfTreads * treadDepth;
    const totalRunFeet = totalRunInches / 12;

    // IRC Stair Building Code Compliance Rule:
    // Max Riser Height = 7.75 inches
    // Min Tread Depth = 10.0 inches
    // Comfort rule: 2 * Riser + Tread should be between 24 and 25 inches
    const comfortCheck = 2 * actualRiserHeight + treadDepth;
    const isIrcCompliant = actualRiserHeight <= 7.75 && treadDepth >= 10;

    return {
      isValid: true,
      msg: '',
      numberOfRisers,
      actualRiserHeight,
      numberOfTreads,
      totalRunInches,
      totalRunFeet,
      comfortCheck,
      isIrcCompliant,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Staircase: ${res.numberOfRisers} Risers at ${formatNumber(res.actualRiserHeight, 2)}" | Total Run: ${formatNumber(res.totalRunFeet, 1)} ft`,
        { totalRiseInches, targetRiserInches, treadDepthInches },
        { numberOfRisers: res.numberOfRisers, actualRiserHeight: res.actualRiserHeight }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Stair Rise & Tread Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="totalRiseInches" label="Total Stair Height (Rise)" suffix="inches" value={totalRiseInches} onChange={setTotalRiseInches} min={1} helperText="Floor to upper floor total vertical height" />
          <CalcInput id="targetRiserInches" label="Target Individual Riser Height" suffix="inches" value={targetRiserInches} onChange={setTargetRiserInches} min={4} max={9} helperText="Standard residential target is 7 to 7.75 in" />
          <CalcInput id="treadDepthInches" label="Individual Tread Depth" suffix="inches" value={treadDepthInches} onChange={setTreadDepthInches} min={8} max={14} helperText="Standard residential min is 10 in" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Actual Riser Height"
              value={`${formatNumber(res.actualRiserHeight, 3)} inches`}
              subtitle={`Exact height across ${res.numberOfRisers} risers`}
              highlighted={true}
              badgeText={res.isIrcCompliant ? 'IRC Building Code OK' : 'Check Local Code'}
              badgeType={res.isIrcCompliant ? 'success' : 'error'}
            />
            <CalcResultCard
              title="Number of Steps / Treads"
              value={`${res.numberOfTreads} Treads`}
              subtitle={`Top landing acts as ${res.numberOfRisers}th step`}
            />
            <CalcResultCard
              title="Total Horizontal Run"
              value={`${formatNumber(res.totalRunFeet, 2)} Feet`}
              subtitle={`${formatNumber(res.totalRunInches, 1)} inches horizontal span`}
            />
            <CalcResultCard
              title="Ergonomic Comfort Score"
              value={formatNumber(res.comfortCheck, 2)}
              subtitle="Optimal 2 × Riser + Tread is 24 - 25"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>IRC residential code requires maximum riser height of 7.75" and minimum tread depth of 10.0".</span>
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
