import React, { useState } from 'react';

export const AlgebraSolver: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  const discriminant = b * b - 4 * a * c;

  let root1 = '';
  let root2 = '';
  const vertexH = a !== 0 ? -b / (2 * a) : 0;
  const vertexK = a !== 0 ? a * vertexH * vertexH + b * vertexH + c : 0;

  if (a !== 0) {
    if (discriminant > 0) {
      const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      root1 = r1.toFixed(4);
      root2 = r2.toFixed(4);
    } else if (discriminant === 0) {
      const r = -b / (2 * a);
      root1 = r.toFixed(4);
      root2 = 'Repeated Root';
    } else {
      const realPart = (-b / (2 * a)).toFixed(2);
      const imagPart = (Math.abs(Math.sqrt(Math.abs(discriminant)) / (2 * a))).toFixed(2);
      root1 = `${realPart} + ${imagPart}i`;
      root2 = `${realPart} - ${imagPart}i`;
    }
  } else {
    if (b !== 0) {
      root1 = (-c / b).toFixed(4);
      root2 = 'Linear Equation (a = 0)';
    } else {
      root1 = c === 0 ? 'Infinite Solutions' : 'No Solution';
      root2 = 'Trivial Equation';
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-center font-mono text-base font-bold text-blue-600 dark:text-blue-400">
        {a}x² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Coefficient a</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Coefficient b</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Constant c</label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center"
          />
        </div>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block text-xs">Root x₁</span>
            <span className="font-mono font-extrabold text-blue-600 text-lg">{root1}</span>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block text-xs">Root x₂</span>
            <span className="font-mono font-extrabold text-blue-600 text-lg">{root2}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Discriminant (Δ = b² - 4ac)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{discriminant}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Parabola Vertex (h, k)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">({vertexH.toFixed(2)}, {vertexK.toFixed(2)})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
