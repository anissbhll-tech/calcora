import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface VectorCrossDotCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const VectorCrossDotCalculator: React.FC<VectorCrossDotCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [ax, setAx] = useState<string>('3');
  const [ay, setAy] = useState<string>('4');
  const [az, setAz] = useState<string>('0');
  const [bx, setBx] = useState<string>('1');
  const [by, setBy] = useState<string>('2');
  const [bz, setBz] = useState<string>('5');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.ax !== undefined) setAx(String(initialPreset.ax));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setAx('3');
    setAy('4');
    setAz('0');
    setBx('1');
    setBy('2');
    setBz('5');
  };

  const calculate = () => {
    const a1 = safeParseNumber(ax, 0);
    const a2 = safeParseNumber(ay, 0);
    const a3 = safeParseNumber(az, 0);
    const b1 = safeParseNumber(bx, 0);
    const b2 = safeParseNumber(by, 0);
    const b3 = safeParseNumber(bz, 0);

    const magA = Math.sqrt(a1 * a1 + a2 * a2 + a3 * a3);
    const magB = Math.sqrt(b1 * b1 + b2 * b2 + b3 * b3);

    if (magA === 0 || magB === 0) {
      return { isValid: false, msg: 'Vector magnitudes must be non-zero.' };
    }

    // Dot product A . B = a1*b1 + a2*b2 + a3*b3
    const dotProduct = a1 * b1 + a2 * b2 + a3 * b3;

    // Cross product A x B = (a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1)
    const cx = a2 * b3 - a3 * b2;
    const cy = a3 * b1 - a1 * b3;
    const cz = a1 * b2 - a2 * b1;
    const magCross = Math.sqrt(cx * cx + cy * cy + cz * cz);

    // Angle theta between vectors cos(theta) = (A . B) / (|A| * |B|)
    const cosTheta = Math.max(-1, Math.min(1, dotProduct / (magA * magB)));
    const angleRad = Math.acos(cosTheta);
    const angleDeg = (angleRad * 180) / Math.PI;

    return {
      isValid: true,
      msg: '',
      dotProduct,
      crossVector: `(${formatNumber(cx, 2)}, ${formatNumber(cy, 2)}, ${formatNumber(cz, 2)})`,
      magA,
      magB,
      magCross,
      angleDeg,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Vector A·B = ${formatNumber(res.dotProduct, 2)} | A×B = ${res.crossVector}`,
        { ax, ay, az, bx, by, bz },
        { dotProduct: res.dotProduct, crossVector: res.crossVector, angleDeg: res.angleDeg }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          3D Vector Components
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300">Vector A = (Ax, Ay, Az)</h4>
            <div className="grid grid-cols-3 gap-2">
              <CalcInput id="ax" label="Ax" value={ax} onChange={setAx} />
              <CalcInput id="ay" label="Ay" value={ay} onChange={setAy} />
              <CalcInput id="az" label="Az" value={az} onChange={setAz} />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300">Vector B = (Bx, By, Bz)</h4>
            <div className="grid grid-cols-3 gap-2">
              <CalcInput id="bx" label="Bx" value={bx} onChange={setBx} />
              <CalcInput id="by" label="By" value={by} onChange={setBy} />
              <CalcInput id="bz" label="Bz" value={bz} onChange={setBz} />
            </div>
          </div>
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Dot Product (A · B)"
              value={formatNumber(res.dotProduct, 4)}
              subtitle="Scalar value = AxBx + AyBy + AzBz"
              highlighted={true}
            />
            <CalcResultCard
              title="Cross Product (A × B)"
              value={res.crossVector}
              subtitle="Vector perpendicular to A and B"
              badgeText="Orthogonal Vector"
              badgeType="info"
            />
            <CalcResultCard
              title="Angle Between Vectors (θ)"
              value={`${formatNumber(res.angleDeg, 2)}°`}
              subtitle="Cos⁻¹((A · B) / (|A||B|))"
            />
            <CalcResultCard
              title="Vector Magnitudes"
              value={`|A|=${formatNumber(res.magA, 2)}, |B|=${formatNumber(res.magB, 2)}`}
              subtitle="Euclidean lengths"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Dot product is zero when vectors are orthogonal (90°). Cross product magnitude equals parallelogram area.</span>
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
