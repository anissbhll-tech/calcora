import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface BodySurfaceAreaCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const BodySurfaceAreaCalculator: React.FC<BodySurfaceAreaCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('70');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.heightCm !== undefined) setHeightCm(String(initialPreset.heightCm));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setHeightCm('175');
    setWeightKg('70');
  };

  const calculate = () => {
    const h = safeParseNumber(heightCm, 0);
    const w = safeParseNumber(weightKg, 0);

    if (h <= 0 || w <= 0) {
      return { isValid: false, msg: 'Height and weight must be positive numbers.' };
    }

    // Mosteller Formula: BSA (m²) = sqrt([Height(cm) x Weight(kg)] / 3600)
    const bsaMosteller = Math.sqrt((h * w) / 3600);

    // DuBois & DuBois Formula: BSA = 0.007184 x Height(cm)^0.725 x Weight(kg)^0.425
    const bsaDuBois = 0.007184 * Math.pow(h, 0.725) * Math.pow(w, 0.425);

    // Haycock Formula: BSA = 0.024265 x Height(cm)^0.3964 x Weight(kg)^0.5378
    const bsaHaycock = 0.024265 * Math.pow(h, 0.3964) * Math.pow(w, 0.5378);

    return {
      isValid: true,
      msg: '',
      bsaMosteller,
      bsaDuBois,
      bsaHaycock,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Body Surface Area: ${formatNumber(res.bsaMosteller, 2)} m² (Mosteller)`,
        { heightCm, weightKg },
        { bsaMosteller: res.bsaMosteller, bsaDuBois: res.bsaDuBois }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Body Measurements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="heightCm" label="Height" suffix="cm" value={heightCm} onChange={setHeightCm} min={1} />
          <CalcInput id="weightKg" label="Weight" suffix="kg" value={weightKg} onChange={setWeightKg} min={1} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="BSA (Mosteller Formula)"
              value={`${formatNumber(res.bsaMosteller, 2)} m²`}
              subtitle="√(Height × Weight / 3600)"
              highlighted={true}
            />
            <CalcResultCard
              title="BSA (DuBois Formula)"
              value={`${formatNumber(res.bsaDuBois, 2)} m²`}
              subtitle="0.007184 × H^0.725 × W^0.425"
            />
            <CalcResultCard
              title="BSA (Haycock Formula)"
              value={`${formatNumber(res.bsaHaycock, 2)} m²`}
              subtitle="0.024265 × H^0.3964 × W^0.5378"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Body Surface Area (BSA) is widely used in medical clinical settings for chemotherapy dosing and cardiac index calculations.</span>
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
