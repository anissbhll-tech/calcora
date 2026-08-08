import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface CircleCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const CircleCalculator: React.FC<CircleCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [inputType, setInputType] = useState<string>('radius'); // 'radius', 'diameter', 'circumference', 'area'
  const [inputValue, setInputValue] = useState<string>('5');
  const [sectorAngle, setSectorAngle] = useState<string>('90');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.inputValue !== undefined) setInputValue(String(initialPreset.inputValue));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setInputType('radius');
    setInputValue('5');
    setSectorAngle('90');
  };

  const calculate = () => {
    const val = safeParseNumber(inputValue, 0);
    const angle = safeParseNumber(sectorAngle, 0);

    if (val <= 0) {
      return {
        isValid: false,
        msg: 'Input circle parameter must be greater than 0.',
        radius: 0,
        diameter: 0,
        circumference: 0,
        area: 0,
        arcLength: 0,
        sectorArea: 0,
      };
    }

    let radius = 0;

    if (inputType === 'radius') {
      radius = val;
    } else if (inputType === 'diameter') {
      radius = val / 2;
    } else if (inputType === 'circumference') {
      radius = val / (2 * Math.PI);
    } else if (inputType === 'area') {
      radius = Math.sqrt(val / Math.PI);
    }

    const diameter = 2 * radius;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * radius * radius;

    // Sector calculations
    const normalizedAngle = Math.min(360, Math.max(0, angle));
    const arcLength = (normalizedAngle / 360) * circumference;
    const sectorArea = (normalizedAngle / 360) * area;

    return {
      isValid: true,
      msg: '',
      radius,
      diameter,
      circumference,
      area,
      arcLength,
      sectorArea,
      normalizedAngle,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Circle (r=${formatNumber(res.radius, 2)}): Area=${formatNumber(res.area, 2)}, Circumference=${formatNumber(res.circumference, 2)}`,
        { inputType, inputValue },
        { radius: res.radius, area: res.area, circumference: res.circumference }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Circle Input Parameters
          </h3>

          <CalcSelect
            id="inputType"
            label="Known Parameter Type"
            value={inputType}
            onChange={setInputType}
            options={[
              { value: 'radius', label: 'Radius (r)' },
              { value: 'diameter', label: 'Diameter (d)' },
              { value: 'circumference', label: 'Circumference (C)' },
              { value: 'area', label: 'Area (A)' },
            ]}
          />

          <CalcInput
            id="inputValue"
            label={`Value for ${inputType.charAt(0).toUpperCase() + inputType.slice(1)}`}
            value={inputValue}
            onChange={setInputValue}
            min={0}
            step="any"
          />
        </div>

        <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/50 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Optional Sector & Arc Angle
          </h3>

          <CalcInput
            id="sectorAngle"
            label="Central Angle (Degrees)"
            suffix="°"
            value={sectorAngle}
            onChange={setSectorAngle}
            min={0}
            max={360}
            helperText="For calculating arc length & sector area"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Area (A)"
              value={formatNumber(res.area, 4)}
              subtitle="A = πr²"
              highlighted={true}
            />

            <CalcResultCard
              title="Circumference (C)"
              value={formatNumber(res.circumference, 4)}
              subtitle="C = 2πr"
              badgeText="Perimeter"
              badgeType="info"
            />

            <CalcResultCard
              title="Radius (r)"
              value={formatNumber(res.radius, 4)}
              subtitle="r = d / 2"
              badgeText="Core Radius"
              badgeType="neutral"
            />

            <CalcResultCard
              title="Diameter (d)"
              value={formatNumber(res.diameter, 4)}
              subtitle="d = 2r"
              badgeText="Span"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Sector ({res.normalizedAngle}° angle):</span> Arc Length:{' '}
              <span className="font-semibold text-teal-600 dark:text-teal-400">{formatNumber(res.arcLength, 4)}</span> | Sector Area:{' '}
              <span className="font-semibold">{formatNumber(res.sectorArea, 4)}</span>
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
