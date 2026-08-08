import React, { useState, useEffect } from 'react';
import { CalcSelect } from '../common/CalcSelect';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface PolynomialSolverCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PolynomialSolverCalculator: React.FC<PolynomialSolverCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [degree, setDegree] = useState<string>('2'); // '2' for quadratic, '3' for cubic
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('-5');
  const [c, setC] = useState<string>('6');
  const [d, setD] = useState<string>('0');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.a !== undefined) setA(String(initialPreset.a));
      if (initialPreset.b !== undefined) setB(String(initialPreset.b));
      if (initialPreset.c !== undefined) setC(String(initialPreset.c));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDegree('2');
    setA('1');
    setB('-5');
    setC('6');
    setD('0');
  };

  const calculate = () => {
    const coeffA = safeParseNumber(a, 0);
    const coeffB = safeParseNumber(b, 0);
    const coeffC = safeParseNumber(c, 0);
    const coeffD = safeParseNumber(d, 0);

    if (coeffA === 0) {
      return {
        isValid: false,
        msg: 'Leading coefficient (a) cannot be zero for a polynomial of this degree.',
        roots: [],
        discriminant: 0,
        steps: [],
      };
    }

    const roots: string[] = [];
    const steps: string[] = [];

    if (degree === '2') {
      // Quadratic ax^2 + bx + c = 0
      const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
      steps.push(`Discriminant Δ = b² - 4ac = (${coeffB})² - 4(${coeffA})(${coeffC}) = ${discriminant}`);

      if (discriminant > 0) {
        const x1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
        const x2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
        roots.push(`x₁ = ${formatNumber(x1, 4)}`);
        roots.push(`x₂ = ${formatNumber(x2, 4)}`);
        steps.push(`Two distinct real roots: x = (-b ± √Δ) / (2a)`);
      } else if (discriminant === 0) {
        const x = -coeffB / (2 * coeffA);
        roots.push(`x₁ = x₂ = ${formatNumber(x, 4)}`);
        steps.push(`One repeated real root: x = -b / (2a)`);
      } else {
        const realPart = -coeffB / (2 * coeffA);
        const imagPart = Math.sqrt(-discriminant) / (2 * coeffA);
        roots.push(`x₁ = ${formatNumber(realPart, 4)} + ${formatNumber(Math.abs(imagPart), 4)}i`);
        roots.push(`x₂ = ${formatNumber(realPart, 4)} - ${formatNumber(Math.abs(imagPart), 4)}i`);
        steps.push(`Two complex conjugate roots since Δ < 0.`);
      }

      return {
        isValid: true,
        msg: '',
        roots,
        discriminant,
        steps,
      };
    } else {
      // Cubic ax^3 + bx^2 + cx + d = 0 using Cardano's formula
      const p = (3 * coeffA * coeffC - coeffB * coeffB) / (3 * coeffA * coeffA);
      const q = (2 * Math.pow(coeffB, 3) - 9 * coeffA * coeffB * coeffC + 27 * coeffA * coeffA * coeffD) / (27 * Math.pow(coeffA, 3));
      const disc = (q * q) / 4 + (p * p * p) / 27;

      steps.push(`Depressed cubic transformation parameters: p = ${formatNumber(p, 4)}, q = ${formatNumber(q, 4)}`);
      steps.push(`Cubic Discriminant Δ = (q/2)² + (p/3)³ = ${formatNumber(disc, 4)}`);

      if (disc > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(disc));
        const v = Math.cbrt(-q / 2 - Math.sqrt(disc));
        const x1 = u + v - coeffB / (3 * coeffA);
        const realPart = -(u + v) / 2 - coeffB / (3 * coeffA);
        const imagPart = ((u - v) * Math.sqrt(3)) / 2;

        roots.push(`x₁ = ${formatNumber(x1, 4)}`);
        roots.push(`x₂ = ${formatNumber(realPart, 4)} + ${formatNumber(Math.abs(imagPart), 4)}i`);
        roots.push(`x₃ = ${formatNumber(realPart, 4)} - ${formatNumber(Math.abs(imagPart), 4)}i`);
      } else if (disc === 0) {
        const u = Math.cbrt(-q / 2);
        const x1 = 2 * u - coeffB / (3 * coeffA);
        const x2 = -u - coeffB / (3 * coeffA);
        roots.push(`x₁ = ${formatNumber(x1, 4)}`);
        roots.push(`x₂ = x₃ = ${formatNumber(x2, 4)}`);
      } else {
        const r = Math.sqrt(-Math.pow(p, 3) / 27);
        const phi = Math.acos(-q / (2 * r));
        const x1 = 2 * Math.cbrt(r) * Math.cos(phi / 3) - coeffB / (3 * coeffA);
        const x2 = 2 * Math.cbrt(r) * Math.cos((phi + 2 * Math.PI) / 3) - coeffB / (3 * coeffA);
        const x3 = 2 * Math.cbrt(r) * Math.cos((phi + 4 * Math.PI) / 3) - coeffB / (3 * coeffA);

        roots.push(`x₁ = ${formatNumber(x1, 4)}`);
        roots.push(`x₂ = ${formatNumber(x2, 4)}`);
        roots.push(`x₃ = ${formatNumber(x3, 4)}`);
      }

      return {
        isValid: true,
        msg: '',
        roots,
        discriminant: disc,
        steps,
      };
    }
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Polynomial Roots (${degree === '2' ? 'Quadratic' : 'Cubic'}): Roots = [${res.roots.join(', ')}]`,
        { degree, a, b, c, d },
        { roots: res.roots }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <CalcSelect
          id="degree"
          label="Polynomial Degree"
          value={degree}
          onChange={setDegree}
          options={[
            { value: '2', label: 'Quadratic Equation (ax² + bx + c = 0)' },
            { value: '3', label: 'Cubic Equation (ax³ + bx² + cx + d = 0)' },
          ]}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {degree === '3' && (
            <CalcInput id="a" label="a (x³)" value={a} onChange={setA} step="any" />
          )}
          {degree === '2' && (
            <CalcInput id="a" label="a (x²)" value={a} onChange={setA} step="any" />
          )}
          <CalcInput id="b" label="b (x² or x)" value={b} onChange={setB} step="any" />
          <CalcInput id="c" label="c (x or constant)" value={c} onChange={setC} step="any" />
          {degree === '3' && (
            <CalcInput id="d" label="d (constant)" value={d} onChange={setD} step="any" />
          )}
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {res.roots.map((root, index) => (
              <CalcResultCard
                key={index}
                title={`Root x${index + 1}`}
                value={root}
                subtitle="Calculated Root"
                highlighted={index === 0}
              />
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <span className="font-bold block text-slate-900 dark:text-white">Solution Steps:</span>
            <ul className="list-disc list-inside space-y-1">
              {res.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>

            {onSaveHistory && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
                >
                  Save Solution
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
