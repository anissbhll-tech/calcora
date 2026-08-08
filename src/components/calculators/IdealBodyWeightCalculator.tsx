import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface IdealBodyWeightCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const IdealBodyWeightCalculator: React.FC<IdealBodyWeightCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [gender, setGender] = useState<string>('male');
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('10');
  const [unitSystem, setUnitSystem] = useState<string>('imperial'); // 'imperial' (lbs), 'metric' (kg)

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.gender !== undefined) setGender(String(initialPreset.gender));
      if (initialPreset.heightFeet !== undefined) setHeightFeet(String(initialPreset.heightFeet));
      if (initialPreset.heightInches !== undefined) setHeightInches(String(initialPreset.heightInches));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setGender('male');
    setHeightFeet('5');
    setHeightInches('10');
    setUnitSystem('imperial');
  };

  const calculate = () => {
    const ft = safeParseNumber(heightFeet, 5);
    const inches = safeParseNumber(heightInches, 0);

    const totalInches = ft * 12 + inches;

    if (totalInches <= 36) {
      return {
        isValid: false,
        msg: 'Please enter a valid height greater than 3 feet (36 inches).',
        devineKg: 0,
        robinsonKg: 0,
        millerKg: 0,
        hamwiKg: 0,
        bmiMinKg: 0,
        bmiMaxKg: 0,
      };
    }

    const inchesOver5Ft = Math.max(0, totalInches - 60);

    let devineKg = 0;
    let robinsonKg = 0;
    let millerKg = 0;
    let hamwiKg = 0;

    if (gender === 'male') {
      devineKg = 50 + 2.3 * inchesOver5Ft;
      robinsonKg = 52 + 1.9 * inchesOver5Ft;
      millerKg = 56.2 + 1.41 * inchesOver5Ft;
      hamwiKg = 48 + 2.7 * inchesOver5Ft;
    } else {
      devineKg = 45.5 + 2.3 * inchesOver5Ft;
      robinsonKg = 49 + 1.7 * inchesOver5Ft;
      millerKg = 53.1 + 1.36 * inchesOver5Ft;
      hamwiKg = 45.5 + 2.2 * inchesOver5Ft;
    }

    // Healthy BMI 18.5 - 24.9 range formula: Weight(kg) = BMI * Height(m)^2
    const heightMeters = totalInches * 0.0254;
    const bmiMinKg = 18.5 * heightMeters * heightMeters;
    const bmiMaxKg = 24.9 * heightMeters * heightMeters;

    const kgToLbs = 2.20462;

    const isImperial = unitSystem === 'imperial';
    const unitLabel = isImperial ? 'lbs' : 'kg';
    const multiplier = isImperial ? kgToLbs : 1;

    return {
      isValid: true,
      msg: '',
      devine: devineKg * multiplier,
      robinson: robinsonKg * multiplier,
      miller: millerKg * multiplier,
      hamwi: hamwiKg * multiplier,
      bmiMin: bmiMinKg * multiplier,
      bmiMax: bmiMaxKg * multiplier,
      unitLabel,
      totalInches,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Ideal Body Weight (${gender}, ${heightFeet}'${heightInches}"): Devine Formula = ${formatNumber(res.devine, 1)} ${res.unitLabel} (Healthy BMI Range: ${formatNumber(res.bmiMin, 1)}-${formatNumber(res.bmiMax, 1)} ${res.unitLabel})`,
        { gender, heightFeet, heightInches },
        { devine: res.devine, bmiMin: res.bmiMin, bmiMax: res.bmiMax }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Biological Profile & Height
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalcSelect
            id="gender"
            label="Biological Sex"
            value={gender}
            onChange={setGender}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />

          <div className="grid grid-cols-2 gap-2">
            <CalcInput
              id="heightFeet"
              label="Height (Ft)"
              suffix="ft"
              value={heightFeet}
              onChange={setHeightFeet}
              min={3}
              max={8}
            />
            <CalcInput
              id="heightInches"
              label="Inches"
              suffix="in"
              value={heightInches}
              onChange={setHeightInches}
              min={0}
              max={11}
            />
          </div>

          <CalcSelect
            id="unitSystem"
            label="Display Units"
            value={unitSystem}
            onChange={setUnitSystem}
            options={[
              { value: 'imperial', label: 'Pounds (lbs)' },
              { value: 'metric', label: 'Kilograms (kg)' },
            ]}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Devine Formula (Standard)"
              value={`${formatNumber(res.devine, 1)} ${res.unitLabel}`}
              subtitle="Most widely used clinical formula"
              highlighted={true}
            />

            <CalcResultCard
              title="Healthy BMI Weight Range"
              value={`${formatNumber(res.bmiMin, 1)} - ${formatNumber(res.bmiMax, 1)} ${res.unitLabel}`}
              subtitle="BMI range between 18.5 and 24.9"
              badgeText="BMI 18.5-24.9"
              badgeType="info"
            />

            <CalcResultCard
              title="Robinson Formula"
              value={`${formatNumber(res.robinson, 1)} ${res.unitLabel}`}
              subtitle="1983 revision of Devine formula"
              badgeText="Robinson"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Other Formula Benchmarks:</span> Miller Formula:{' '}
              <span className="font-semibold">{formatNumber(res.miller, 1)} {res.unitLabel}</span> | Hamwi Formula:{' '}
              <span className="font-semibold">{formatNumber(res.hamwi, 1)} {res.unitLabel}</span>
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
