import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { Triangle, RotateCcw, Save } from 'lucide-react';

export const PythagoreanTheoremCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [solveFor, setSolveFor] = useState<'c' | 'a' | 'b'>('c');
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);
  const [hypotenuseC, setHypotenuseC] = useState<number>(5);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setSolveFor('c');
    setSideA(3);
    setSideB(4);
    setHypotenuseC(5);
  };

  // Calculations
  let calcA = sideA;
  let calcB = sideB;
  let calcC = hypotenuseC;
  let isValid = true;
  let errorMessage = '';

  if (solveFor === 'c') {
    calcC = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
  } else if (solveFor === 'a') {
    if (hypotenuseC <= sideB) {
      isValid = false;
      errorMessage = 'Hypotenuse (c) must be strictly greater than Side B';
    } else {
      calcA = Math.sqrt(Math.pow(hypotenuseC, 2) - Math.pow(sideB, 2));
    }
  } else if (solveFor === 'b') {
    if (hypotenuseC <= sideA) {
      isValid = false;
      errorMessage = 'Hypotenuse (c) must be strictly greater than Side A';
    } else {
      calcB = Math.sqrt(Math.pow(hypotenuseC, 2) - Math.pow(sideA, 2));
    }
  }

  const area = (calcA * calcB) / 2;
  const perimeter = calcA + calcB + calcC;
  const angleAlphaRad = Math.atan2(calcA, calcB);
  const angleBetaRad = Math.atan2(calcB, calcA);
  const angleAlphaDeg = (angleAlphaRad * 180) / Math.PI;
  const angleBetaDeg = (angleBetaRad * 180) / Math.PI;
  const altitude = (calcA * calcB) / calcC;

  const handleSave = () => {
    if (onSaveHistory && isValid) {
      onSaveHistory(
        `Pythagorean Theorem: a=${calcA.toFixed(2)}, b=${calcB.toFixed(2)}, c=${calcC.toFixed(2)} (Area=${area.toFixed(2)})`,
        { solveFor, sideA, sideB, hypotenuseC },
        { calcA, calcB, calcC, area, perimeter, angleAlphaDeg, angleBetaDeg }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl text-xs font-semibold max-w-md">
        <button
          onClick={() => setSolveFor('c')}
          className={`flex-1 py-2 rounded-lg transition ${solveFor === 'c' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Solve Hypotenuse (c)
        </button>
        <button
          onClick={() => setSolveFor('a')}
          className={`flex-1 py-2 rounded-lg transition ${solveFor === 'a' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Solve Side (a)
        </button>
        <button
          onClick={() => setSolveFor('b')}
          className={`flex-1 py-2 rounded-lg transition ${solveFor === 'b' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Solve Side (b)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
            <Triangle className="w-5 h-5 text-indigo-600" /> Right Triangle Inputs
          </h3>

          {solveFor !== 'a' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Side a (Leg 1)
              </label>
              <input
                type="number"
                step="any"
                value={sideA}
                onChange={(e) => setSideA(Math.max(0.001, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {solveFor !== 'b' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Side b (Leg 2)
              </label>
              <input
                type="number"
                step="any"
                value={sideB}
                onChange={(e) => setSideB(Math.max(0.001, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {solveFor !== 'c' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Hypotenuse c
              </label>
              <input
                type="number"
                step="any"
                value={hypotenuseC}
                onChange={(e) => setHypotenuseC(Math.max(0.001, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {!isValid && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition flex items-center justify-center gap-1 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save Solution
            </button>
          </div>
        </div>

        {/* Results & Geometric Properties */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-md">
            <div className="text-xs uppercase tracking-wider text-indigo-200 font-medium mb-1">
              {solveFor === 'c' ? 'Calculated Hypotenuse (c)' : solveFor === 'a' ? 'Calculated Side (a)' : 'Calculated Side (b)'}
            </div>
            <div className="text-4xl font-extrabold mb-4">
              {isValid ? (solveFor === 'c' ? calcC : solveFor === 'a' ? calcA : calcB).toFixed(4) : '—'}
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-700/50 pt-4 text-sm">
              <div>
                <div className="text-indigo-200 text-xs">Triangle Area</div>
                <div className="font-semibold text-lg">{isValid ? area.toFixed(4) : '—'}</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs">Perimeter</div>
                <div className="font-semibold text-lg">{isValid ? perimeter.toFixed(4) : '—'}</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs">Angle α (Opposite a)</div>
                <div className="font-semibold">{isValid ? `${angleAlphaDeg.toFixed(2)}°` : '—'}</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs">Angle β (Opposite b)</div>
                <div className="font-semibold">{isValid ? `${angleBetaDeg.toFixed(2)}°` : '—'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-xs space-y-2 text-slate-700">
            <div className="font-semibold text-slate-800 text-sm">Formula Execution</div>
            <p className="font-mono bg-slate-50 p-2 rounded border border-slate-100">
              a² + b² = c²
            </p>
            <p>
              {solveFor === 'c' && `c = √(${sideA}² + ${sideB}²) = √(${(sideA**2 + sideB**2).toFixed(2)}) = ${calcC.toFixed(4)}`}
              {solveFor === 'a' && `a = √(${hypotenuseC}² - ${sideB}²) = √(${(hypotenuseC**2 - sideB**2).toFixed(2)}) = ${calcA.toFixed(4)}`}
              {solveFor === 'b' && `b = √(${hypotenuseC}² - ${sideA}²) = √(${(hypotenuseC**2 - sideA**2).toFixed(2)}) = ${calcB.toFixed(4)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
