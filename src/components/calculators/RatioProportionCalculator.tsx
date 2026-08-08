import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { Percent, ArrowRight, RotateCcw, Save, Sliders } from 'lucide-react';

export const RatioProportionCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [valA, setValA] = useState<number>(4);
  const [valB, setValB] = useState<number>(10);
  const [valC, setValC] = useState<number>(20);

  // Simplifier inputs
  const [simpA, setSimpA] = useState<number>(12);
  const [simpB, setSimpB] = useState<number>(18);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setValA(4);
    setValB(10);
    setValC(20);
    setSimpA(12);
    setSimpB(18);
  };

  // Proportion: A / B = C / X => X = (B * C) / A
  const solvedX = valA > 0 ? (valB * valC) / valA : 0;

  // Inverse Proportion: A * B = C * X => X = (A * B) / C
  const inverseX = valC > 0 ? (valA * valB) / valC : 0;

  // Greatest Common Divisor
  const gcd = (x: number, y: number): number => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  const commonDivisor = gcd(simpA, simpB) || 1;
  const simplifiedA = simpA / commonDivisor;
  const simplifiedB = simpB / commonDivisor;
  const ratioDecimal = simpB > 0 ? simpA / simpB : 0;

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Ratio Proportion: ${valA}:${valB} = ${valC}:${solvedX.toFixed(2)} (Simplified ${simpA}:${simpB} → ${simplifiedA}:${simplifiedB})`,
        { valA, valB, valC, simpA, simpB },
        { solvedX, inverseX, simplifiedA, simplifiedB }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Proportion Solver (A : B = C : X) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" /> Solve Missing Value (A : B = C : X)
          </h3>

          <div className="grid grid-cols-3 gap-2 items-center text-center">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">A</label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value))}
                className="w-full text-center py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="text-xl font-bold text-slate-400 mt-4">:</div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">B</label>
              <input
                type="number"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                className="w-full text-center py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="text-center font-bold text-slate-400 text-lg">=</div>

          <div className="grid grid-cols-3 gap-2 items-center text-center">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">C</label>
              <input
                type="number"
                value={valC}
                onChange={(e) => setValC(Number(e.target.value))}
                className="w-full text-center py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="text-xl font-bold text-slate-400 mt-4">:</div>
            <div>
              <label className="block text-xs font-semibold text-indigo-600 uppercase mb-1">X (Unknown)</label>
              <div className="w-full py-2 bg-indigo-50 border border-indigo-200 rounded-lg font-bold text-indigo-700 text-lg">
                {solvedX.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-600">
            <div><strong>Direct Proportion:</strong> X = (B × C) / A = ({valB} × {valC}) / {valA} = <span className="font-bold text-indigo-700">{solvedX.toFixed(2)}</span></div>
            <div><strong>Inverse Proportion:</strong> X = (A × B) / C = ({valA} × {valB}) / {valC} = <span className="font-bold text-teal-700">{inverseX.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Ratio Simplifier */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
            <Percent className="w-5 h-5 text-indigo-600" /> Ratio Simplifier
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">First Term (A)</label>
              <input
                type="number"
                value={simpA}
                onChange={(e) => setSimpA(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Second Term (B)</label>
              <input
                type="number"
                value={simpB}
                onChange={(e) => setSimpB(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-sm text-center">
            <div className="text-xs uppercase text-indigo-200">Simplified Ratio</div>
            <div className="text-3xl font-extrabold mt-1 text-indigo-100">
              {simplifiedA} : {simplifiedB}
            </div>
            <div className="text-xs text-indigo-200 mt-1">
              GCD = {commonDivisor} | Decimal = {ratioDecimal.toFixed(4)}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition flex items-center justify-center gap-1 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
