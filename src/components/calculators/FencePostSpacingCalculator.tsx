import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface FencePostSpacingCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const FencePostSpacingCalculator: React.FC<FencePostSpacingCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [fenceLengthFt, setFenceLengthFt] = useState<string>('120');
  const [postSpacingFt, setPostSpacingFt] = useState<string>('8');
  const [picketWidthInches, setPicketWidthInches] = useState<string>('5.5');
  const [picketGapInches, setPicketGapInches] = useState<string>('0'); // 0 for privacy
  const [postCost, setPostCost] = useState<string>('22');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.fenceLengthFt !== undefined) setFenceLengthFt(String(initialPreset.fenceLengthFt));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setFenceLengthFt('120');
    setPostSpacingFt('8');
    setPicketWidthInches('5.5');
    setPicketGapInches('0');
    setPostCost('22');
  };

  const calculate = () => {
    const length = safeParseNumber(fenceLengthFt, 0);
    const spacing = safeParseNumber(postSpacingFt, 8);
    const picketW = safeParseNumber(picketWidthInches, 5.5);
    const picketGap = safeParseNumber(picketGapInches, 0);
    const pCost = safeParseNumber(postCost, 0);

    if (length <= 0 || spacing <= 0 || picketW <= 0) {
      return { isValid: false, msg: 'Fence length, post spacing, and picket width must be greater than 0.' };
    }

    const sectionsCount = Math.ceil(length / spacing);
    const totalPosts = sectionsCount + 1;
    const actualSpacingFt = length / sectionsCount;

    // Pickets count: length in inches / (picket width + gap)
    const lengthInches = length * 12;
    const totalPickets = Math.ceil(lengthInches / (picketW + picketGap));

    const totalPostCost = totalPosts * pCost;

    return {
      isValid: true,
      msg: '',
      sectionsCount,
      totalPosts,
      actualSpacingFt,
      totalPickets,
      totalPostCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Fence Layout: ${res.totalPosts} Posts (${formatNumber(res.actualSpacingFt, 1)}ft apart) + ${res.totalPickets} Pickets`,
        { fenceLengthFt, postSpacingFt, picketWidthInches, picketGapInches },
        { totalPosts: res.totalPosts, totalPickets: res.totalPickets }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Fence Perimeter & Material Specs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <CalcInput id="fenceLengthFt" label="Total Fence Perimeter" suffix="ft" value={fenceLengthFt} onChange={setFenceLengthFt} min={1} />
          <CalcInput id="postSpacingFt" label="Target Post Spacing" suffix="ft" value={postSpacingFt} onChange={setPostSpacingFt} min={4} max={12} helperText="Standard spacing is 6-8 ft" />
          <CalcInput id="picketWidthInches" label="Picket Board Width" suffix="inches" value={picketWidthInches} onChange={setPicketWidthInches} min={1} />
          <CalcInput id="picketGapInches" label="Picket Gap Distance" suffix="inches" value={picketGapInches} onChange={setPicketGapInches} min={0} helperText="0 for solid privacy fence" />
          <CalcInput id="postCost" label="Cost per Fence Post" prefix="$" value={postCost} onChange={setPostCost} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Fence Posts Required"
              value={`${res.totalPosts} Posts`}
              subtitle={`Spaced ${formatNumber(res.actualSpacingFt, 2)} ft on center`}
              highlighted={true}
            />
            <CalcResultCard
              title="Fence Picket Boards"
              value={`${res.totalPickets} Pickets`}
              subtitle="Vertical fence boards needed"
            />
            <CalcResultCard
              title="Total Post Material Cost"
              value={formatCurrency(res.totalPostCost)}
              subtitle="Cost for 4x4 / 6x6 posts"
              badgeText="Post Cost"
              badgeType="success"
            />
            <CalcResultCard
              title="Fence Sections"
              value={`${res.sectionsCount} Sections`}
              subtitle="Equal length fence bays"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Posts should be set in concrete to a depth equal to at least 1/3 of the post's total length (below frost line).</span>
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
