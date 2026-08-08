import React, { useState } from 'react';

export const TriangleCalculator: React.FC = () => {
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);
  const [angleC, setAngleC] = useState<number>(90); // degrees

  const radC = (angleC * Math.PI) / 180;
  // Law of Cosines: c^2 = a^2 + b^2 - 2ab cos(C)
  const sideC = Math.sqrt(sideA * sideA + sideB * sideB - 2 * sideA * sideB * Math.cos(radC));

  // Area = 1/2 * a * b * sin(C)
  const area = 0.5 * sideA * sideB * Math.sin(radC);
  const perimeter = sideA + sideB + sideC;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Side a</label>
            <input
              type="number"
              value={sideA}
              onChange={(e) => setSideA(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Side b</label>
            <input
              type="number"
              value={sideB}
              onChange={(e) => setSideB(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Included Angle C (degrees)</label>
          <input
            type="number"
            value={angleC}
            onChange={(e) => setAngleC(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hypotenuse / Opposite Side c</span>
          <div className="text-4xl font-extrabold text-blue-600 font-mono mt-1">
            {sideC.toFixed(3)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Triangle Area</span>
            <span className="font-mono font-bold text-emerald-600 text-sm">{area.toFixed(3)}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Total Perimeter</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">{perimeter.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
