import React, { useState } from 'react';

export const ConstructionCalculator: React.FC = () => {
  const [lengthFt, setLengthFt] = useState<number>(10);
  const [widthFt, setWidthFt] = useState<number>(10);
  const [depthInches, setDepthInches] = useState<number>(4);
  const [costPerBag, setCostPerBag] = useState<number>(5.50);

  const volumeCuFt = lengthFt * widthFt * (depthInches / 12);
  const volumeCuYards = volumeCuFt / 27;

  // 80lb bag yields ~0.60 cu ft
  // 60lb bag yields ~0.45 cu ft
  const bags80lb = Math.ceil(volumeCuFt / 0.60);
  const bags60lb = Math.ceil(volumeCuFt / 0.45);

  const estimatedCost = bags80lb * costPerBag;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Slab Length (ft)</label>
            <input
              type="number"
              value={lengthFt}
              onChange={(e) => setLengthFt(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Slab Width (ft)</label>
            <input
              type="number"
              value={widthFt}
              onChange={(e) => setWidthFt(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Thickness / Depth (inches)</label>
          <input
            type="number"
            value={depthInches}
            onChange={(e) => setDepthInches(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Cost Per Bag ($)</label>
          <input
            type="number"
            step={0.25}
            value={costPerBag}
            onChange={(e) => setCostPerBag(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Concrete Volume</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 font-mono">
            {volumeCuYards.toFixed(2)}
            <span className="text-base text-slate-400 font-normal"> cu yards</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">({volumeCuFt.toFixed(1)} cubic feet)</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>80 lb Pre-mixed Bags:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{bags80lb} bags</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>60 lb Pre-mixed Bags:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{bags60lb} bags</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>Estimated Concrete Cost:</span>
            <span className="font-mono font-bold text-emerald-600">${estimatedCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
