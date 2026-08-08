import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { Grid, DollarSign, Layers, RotateCcw, Save } from 'lucide-react';

export const FlooringSquareFootageCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [lengthFeet, setLengthFeet] = useState<number>(20);
  const [widthFeet, setWidthFeet] = useState<number>(15);
  const [wastePercent, setWastePercent] = useState<number>(10);
  const [sqftPerBox, setSqftPerBox] = useState<number>(24);
  const [pricePerSqft, setPricePerSqft] = useState<number>(3.50);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setLengthFeet(20);
    setWidthFeet(15);
    setWastePercent(10);
    setSqftPerBox(24);
    setPricePerSqft(3.50);
  };

  // Calculations
  const rawSquareFootage = lengthFeet * widthFeet;
  const wasteSquareFootage = (rawSquareFootage * wastePercent) / 100;
  const totalSquareFootageNeeded = rawSquareFootage + wasteSquareFootage;
  const boxesNeeded = sqftPerBox > 0 ? Math.ceil(totalSquareFootageNeeded / sqftPerBox) : 0;
  const actualPurchasedSqft = boxesNeeded * sqftPerBox;
  const totalMaterialCost = totalSquareFootageNeeded * pricePerSqft;
  const actualPurchasedCost = actualPurchasedSqft * pricePerSqft;

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Flooring: ${totalSquareFootageNeeded.toFixed(0)} sq ft needed (${boxesNeeded} boxes @ $${pricePerSqft}/sq ft = $${actualPurchasedCost.toFixed(2)})`,
        { lengthFeet, widthFeet, wastePercent, sqftPerBox, pricePerSqft },
        { rawSquareFootage, totalSquareFootageNeeded, boxesNeeded, actualPurchasedCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-slate-900 text-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-200 font-medium">Total Flooring Needed</div>
            <div className="text-4xl font-extrabold mt-1">
              {Math.ceil(totalSquareFootageNeeded)} <span className="text-xl font-normal text-amber-200">sq ft</span>
            </div>
            <div className="text-xs text-amber-200 mt-1">
              Base: {rawSquareFootage} sq ft + {wastePercent}% Waste ({Math.round(wasteSquareFootage)} sq ft)
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-amber-200 font-medium">Cartons / Boxes Required</div>
            <div className="text-3xl font-bold mt-1 text-amber-300">
              {boxesNeeded} Boxes
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {actualPurchasedSqft} total purchased sq ft ({sqftPerBox} sq ft/box)
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-medium">Estimated Material Cost</div>
            <div className="text-3xl font-bold mt-1 text-emerald-300">
              ${actualPurchasedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Based on ${pricePerSqft.toFixed(2)} per sq ft
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dimensions & Waste Inputs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
            <Grid className="w-5 h-5 text-amber-700" /> Room Dimensions & Overage
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Room Length (Ft)</label>
              <input
                type="number"
                value={lengthFeet}
                onChange={(e) => setLengthFeet(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Room Width (Ft)</label>
              <input
                type="number"
                value={widthFeet}
                onChange={(e) => setWidthFeet(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Waste / Cutting Factor Allowance
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((w) => (
                <button
                  key={w}
                  onClick={() => setWastePercent(w)}
                  className={`py-2 text-xs font-bold rounded-lg border transition ${wastePercent === w ? 'bg-amber-700 text-white border-amber-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  {w}% {w === 10 ? '(Std)' : w === 15 ? '(Diagonal)' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Sq Ft Per Carton/Box</label>
              <input
                type="number"
                step="0.5"
                value={sqftPerBox}
                onChange={(e) => setSqftPerBox(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Material Price ($ / Sq Ft)</label>
              <input
                type="number"
                step="0.25"
                value={pricePerSqft}
                onChange={(e) => setPricePerSqft(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
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
              className="flex-1 py-2 px-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save Estimate
            </button>
          </div>
        </div>

        {/* Flooring Type Pricing Quick Reference */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 text-sm flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-700" /> Flooring Material Cost Benchmarks
          </h3>

          <div className="space-y-2 text-xs">
            <div
              onClick={() => { setPricePerSqft(2.50); setWastePercent(10); setSqftPerBox(24); }}
              className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-lg border border-slate-100 cursor-pointer transition flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-slate-800">Luxury Vinyl Plank (LVP)</div>
                <div className="text-slate-500">Waterproof click-lock planks ($2.00 - $4.50/sq ft)</div>
              </div>
              <div className="font-bold text-amber-800">$2.50 / sq ft</div>
            </div>

            <div
              onClick={() => { setPricePerSqft(3.80); setWastePercent(10); setSqftPerBox(20); }}
              className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-lg border border-slate-100 cursor-pointer transition flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-slate-800">Laminate Flooring</div>
                <div className="text-slate-500">Durable wood-look floating flooring ($2.50 - $5.00/sq ft)</div>
              </div>
              <div className="font-bold text-amber-800">$3.80 / sq ft</div>
            </div>

            <div
              onClick={() => { setPricePerSqft(7.50); setWastePercent(15); setSqftPerBox(18); }}
              className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-lg border border-slate-100 cursor-pointer transition flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-slate-800">Hardwood Flooring</div>
                <div className="text-slate-500">Solid oak/maple engineered wood ($6.00 - $12.00/sq ft)</div>
              </div>
              <div className="font-bold text-amber-800">$7.50 / sq ft</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
