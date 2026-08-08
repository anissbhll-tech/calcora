import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface ChildHeightPredictorCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const ChildHeightPredictorCalculator: React.FC<ChildHeightPredictorCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [childSex, setChildSex] = useState<string>('boy');
  const [motherHeightCm, setMotherHeightCm] = useState<string>('165');
  const [fatherHeightCm, setFatherHeightCm] = useState<string>('178');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.motherHeightCm !== undefined) setMotherHeightCm(String(initialPreset.motherHeightCm));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setChildSex('boy');
    setMotherHeightCm('165');
    setFatherHeightCm('178');
  };

  const calculate = () => {
    const m = safeParseNumber(motherHeightCm, 0);
    const f = safeParseNumber(fatherHeightCm, 0);

    if (m <= 0 || f <= 0) {
      return { isValid: false, msg: 'Mother and father heights must be positive numbers.' };
    }

    // Mid-Parental Height Method:
    // Boy: (Father Height + Mother Height + 13 cm) / 2
    // Girl: (Father Height + Mother Height - 13 cm) / 2
    let targetCm = 0;
    if (childSex === 'boy') {
      targetCm = (f + m + 13) / 2;
    } else {
      targetCm = (f + m - 13) / 2;
    }

    const targetInches = targetCm / 2.54;
    const feet = Math.floor(targetInches / 12);
    const inches = Math.round(targetInches % 12);

    const minCm = targetCm - 6.5; // 85% range within +/- 6.5cm (2.5 inches)
    const maxCm = targetCm + 6.5;

    return {
      isValid: true,
      msg: '',
      targetCm,
      targetFormatted: `${feet}'${inches}" (${formatNumber(targetCm, 1)} cm)`,
      rangeFormatted: `${formatNumber(minCm, 1)} cm - ${formatNumber(maxCm, 1)} cm`,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Target Child Height: ${res.targetFormatted} (${childSex})`,
        { childSex, motherHeightCm, fatherHeightCm },
        { targetCm: res.targetCm }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Parental Biometrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcSelect
            id="childSex"
            label="Child Sex"
            value={childSex}
            onChange={setChildSex}
            options={[
              { value: 'boy', label: 'Boy' },
              { value: 'girl', label: 'Girl' },
            ]}
          />
          <CalcInput id="motherHeightCm" label="Mother's Height" suffix="cm" value={motherHeightCm} onChange={setMotherHeightCm} min={100} />
          <CalcInput id="fatherHeightCm" label="Father's Height" suffix="cm" value={fatherHeightCm} onChange={setFatherHeightCm} min={100} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcResultCard
              title="Predicted Adult Height"
              value={res.targetFormatted}
              subtitle="Mid-Parental Height Calculation"
              highlighted={true}
            />
            <CalcResultCard
              title="Target Range (85% Probability)"
              value={res.rangeFormatted}
              subtitle="± 6.5 cm (2.5 inches) range variance"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Pediatric Mid-Parental Height method predicts final adult height based on genetic inheritance patterns.</span>
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
