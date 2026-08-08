import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface VolumeSurface3DCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const VolumeSurface3DCalculator: React.FC<VolumeSurface3DCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [shape, setShape] = useState<string>('cylinder');
  const [dim1, setDim1] = useState<string>('5'); // Radius or length
  const [dim2, setDim2] = useState<string>('10'); // Height or width
  const [dim3, setDim3] = useState<string>('4'); // Depth

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.dim1 !== undefined) setDim1(String(initialPreset.dim1));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setShape('cylinder');
    setDim1('5');
    setDim2('10');
    setDim3('4');
  };

  const calculate = () => {
    const d1 = safeParseNumber(dim1, 0);
    const d2 = safeParseNumber(dim2, 0);
    const d3 = safeParseNumber(dim3, 0);

    if (d1 <= 0) {
      return { isValid: false, msg: 'Dimensions must be greater than 0.' };
    }

    let volume = 0;
    let surfaceArea = 0;
    let formulaName = '';

    if (shape === 'sphere') {
      // d1 = radius
      volume = (4 / 3) * Math.PI * Math.pow(d1, 3);
      surfaceArea = 4 * Math.PI * Math.pow(d1, 2);
      formulaName = 'Sphere: V = (4/3)πr³, SA = 4πr²';
    } else if (shape === 'cylinder') {
      // d1 = radius, d2 = height
      if (d2 <= 0) return { isValid: false, msg: 'Height must be greater than 0.' };
      volume = Math.PI * Math.pow(d1, 2) * d2;
      surfaceArea = 2 * Math.PI * d1 * d2 + 2 * Math.PI * Math.pow(d1, 2);
      formulaName = 'Cylinder: V = πr²h, SA = 2πrh + 2πr²';
    } else if (shape === 'cone') {
      // d1 = radius, d2 = height
      if (d2 <= 0) return { isValid: false, msg: 'Height must be greater than 0.' };
      volume = (1 / 3) * Math.PI * Math.pow(d1, 2) * d2;
      const slantHeight = Math.sqrt(d1 * d1 + d2 * d2);
      surfaceArea = Math.PI * d1 * (d1 + slantHeight);
      formulaName = 'Cone: V = (1/3)πr²h, SA = πr(r + s)';
    } else {
      // rectangular prism: d1=length, d2=width, d3=height
      if (d2 <= 0 || d3 <= 0) return { isValid: false, msg: 'Width and height must be greater than 0.' };
      volume = d1 * d2 * d3;
      surfaceArea = 2 * (d1 * d2 + d1 * d3 + d2 * d3);
      formulaName = 'Prism: V = lwh, SA = 2(lw + lh + wh)';
    }

    return {
      isValid: true,
      msg: '',
      volume,
      surfaceArea,
      formulaName,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `3D Geometry (${shape}): Volume = ${formatNumber(res.volume, 2)} | Surface Area = ${formatNumber(res.surfaceArea, 2)}`,
        { shape, dim1, dim2, dim3 },
        { volume: res.volume, surfaceArea: res.surfaceArea }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Geometric Shape & Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcSelect
            id="shape"
            label="Select 3D Solid Shape"
            value={shape}
            onChange={setShape}
            options={[
              { value: 'sphere', label: 'Sphere' },
              { value: 'cylinder', label: 'Cylinder' },
              { value: 'cone', label: 'Cone' },
              { value: 'prism', label: 'Rectangular Prism' },
            ]}
          />
          <CalcInput
            id="dim1"
            label={shape === 'prism' ? 'Length (l)' : 'Radius (r)'}
            value={dim1}
            onChange={setDim1}
            min={0.1}
          />
          {shape !== 'sphere' && (
            <CalcInput
              id="dim2"
              label={shape === 'prism' ? 'Width (w)' : 'Height (h)'}
              value={dim2}
              onChange={setDim2}
              min={0.1}
            />
          )}
          {shape === 'prism' && (
            <CalcInput id="dim3" label="Height (h)" value={dim3} onChange={setDim3} min={0.1} />
          )}
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CalcResultCard
              title="Solid Volume (V)"
              value={`${formatNumber(res.volume, 3)} units³`}
              subtitle="Three-dimensional capacity"
              highlighted={true}
            />
            <CalcResultCard
              title="Total Surface Area (SA)"
              value={`${formatNumber(res.surfaceArea, 3)} units²`}
              subtitle="Total outer boundary area"
            />
            <CalcResultCard
              title="Geometric Formula"
              value={res.formulaName.split(':')[0]}
              subtitle={res.formulaName.split(':')[1] || ''}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Volume measures internal space (cubic units) while surface area measures external boundary (square units).</span>
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
