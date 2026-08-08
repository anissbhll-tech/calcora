import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface BloodPressureCategoryCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const BloodPressureCategoryCalculator: React.FC<BloodPressureCategoryCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [systolicMmHg, setSystolicMmHg] = useState<string>('124');
  const [diastolicMmHg, setDiastolicMmHg] = useState<string>('82');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.systolicMmHg !== undefined) setSystolicMmHg(String(initialPreset.systolicMmHg));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setSystolicMmHg('124');
    setDiastolicMmHg('82');
  };

  const calculate = () => {
    const sys = safeParseNumber(systolicMmHg, 0);
    const dia = safeParseNumber(diastolicMmHg, 0);

    if (sys <= 50 || sys >= 250 || dia <= 30 || dia >= 150) {
      return { isValid: false, msg: 'Systolic (50-250) and Diastolic (30-150) readings must be in valid physiological ranges.' };
    }

    // AHA 2017 Blood Pressure Categories:
    // Normal: Sys < 120 AND Dia < 80
    // Elevated: Sys 120-129 AND Dia < 80
    // Stage 1 Hypertension: Sys 130-139 OR Dia 80-89
    // Stage 2 Hypertension: Sys >= 140 OR Dia >= 90
    // Hypertensive Crisis: Sys > 180 OR Dia > 120

    let category = '';
    let badgeType: 'success' | 'warning' | 'error' | 'info' = 'info';

    if (sys > 180 || dia > 120) {
      category = 'Hypertensive Crisis (Seek Immediate Care)';
      badgeType = 'error';
    } else if (sys >= 140 || dia >= 90) {
      category = 'Stage 2 Hypertension';
      badgeType = 'error';
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      category = 'Stage 1 Hypertension';
      badgeType = 'warning';
    } else if (sys >= 120 && sys <= 129 && dia < 80) {
      category = 'Elevated Blood Pressure';
      badgeType = 'warning';
    } else {
      category = 'Normal Blood Pressure';
      badgeType = 'success';
    }

    // Pulse Pressure = Systolic - Diastolic (normal is 40-60 mmHg)
    const pulsePressure = sys - dia;

    // Mean Arterial Pressure (MAP) = Diastolic + 1/3(Systolic - Diastolic)
    const map = dia + (1 / 3) * pulsePressure;

    return {
      isValid: true,
      msg: '',
      sys,
      dia,
      category,
      badgeType,
      pulsePressure,
      map,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Blood Pressure: ${systolicMmHg}/${diastolicMmHg} mmHg (${res.category})`,
        { systolicMmHg, diastolicMmHg },
        { category: res.category, pulsePressure: res.pulsePressure }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Systolic & Diastolic Blood Pressure Readings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="systolicMmHg" label="Systolic (Top Number)" suffix="mmHg" value={systolicMmHg} onChange={setSystolicMmHg} min={50} max={250} helperText="Normal is less than 120 mmHg" />
          <CalcInput id="diastolicMmHg" label="Diastolic (Bottom Number)" suffix="mmHg" value={diastolicMmHg} onChange={setDiastolicMmHg} min={30} max={150} helperText="Normal is less than 80 mmHg" />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="AHA Health Classification"
              value={res.category}
              subtitle={`${systolicMmHg} / ${diastolicMmHg} mmHg`}
              highlighted={true}
              badgeText="AHA Category"
              badgeType={res.badgeType}
            />
            <CalcResultCard
              title="Pulse Pressure"
              value={`${res.pulsePressure} mmHg`}
              subtitle="Systolic minus Diastolic (normal: 40-60)"
            />
            <CalcResultCard
              title="Mean Arterial Pressure (MAP)"
              value={`${formatNumber(res.map, 1)} mmHg`}
              subtitle="Average arterial pressure during cardiac cycle"
            />
            <CalcResultCard
              title="Clinical Standard"
              value="AHA / ACC 2017"
              subtitle="Cardiology clinical benchmark"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>AHA guidelines recommend taking blood pressure after resting quietly for 5 minutes.</span>
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
