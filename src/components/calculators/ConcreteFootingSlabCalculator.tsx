import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { HardHat, Grid, DollarSign, RotateCcw, Save } from 'lucide-react';

export const ConcreteFootingSlabCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [shape, setShape] = useState<'slab' | 'footing'>('slab');
  const [lengthFeet, setLengthFeet] = useState<number>(20);
  const [widthFeet, setWidthFeet] = useState<number>(10);
  const [thicknessInches, setThicknessInches] = useState<number>(4);
  const [wastePercent, setWastePercent] = useState<number>(10);
  const [pricePerCubicYard, setPricePerCubicYard] = useState<number>(135);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setShape('slab');
    setLengthFeet(20);
    setWidthFeet(10);
    setThicknessInches(4);
    setWastePercent(10);
    setPricePerCubicYard(135);
  };

  // Calculations
  const thicknessFeet = thicknessInches / 12;
  const rawCubicFeet = lengthFeet * widthFeet * thicknessFeet;
  const rawCubicYards = rawCubicFeet / 27;
  const totalCubicYardsNeeded = rawCubicYards * (1 + wastePercent / 100);
  const totalCubicMetersNeeded = totalCubicYardsNeeded * 0.764555;

  // Pre-mixed bag estimates (80lb bag = 0.6 cu ft, 60lb bag = 0.45 cu ft)
  const totalCubicFeetWithWaste = rawCubicFeet * (1 + wastePercent / 100);
  const bags80lbNeeded = Math.ceil(totalCubicFeetWithWaste / 0.6);
  const bags60lbNeeded = Math.ceil(totalCubicFeetWithWaste / 0.45);

  const estimatedReadyMixCost = totalCubicYardsNeeded * pricePerCubicYard;

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Concrete ${shape === 'slab' ? 'Slab' : 'Footing'}: ${totalCubicYardsNeeded.toFixed(2)} cu yds (${bags80lbNeeded} 80lb bags, Ready-Mix cost ~$${estimatedReadyMixCost.toFixed(2)})`,
        { shape, lengthFeet, widthFeet, thicknessInches, wastePercent },
        { totalCubicYardsNeeded, bags80lbNeeded, estimatedReadyMixCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-zinc-800 to-stone-900 text-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-200 font-medium">Concrete Volume Needed</div>
            <div className="text-4xl font-extrabold mt-1">
              {totalCubicYardsNeeded.toFixed(2)} <span className="text-xl font-normal text-amber-200">cu yds</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {totalCubicMetersNeeded.toFixed(2)} m³ ({totalCubicFeetWithWaste.toFixed(1)} cu ft with {wastePercent}% waste)
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-amber-200 font-medium">Pre-Mixed Bag Estimate</div>
            <div className="text-3xl font-bold mt-1 text-amber-300">
              {bags80lbNeeded} Bags
            </div>
            <div className="text-xs text-slate-300 mt-1">
              80lb bags (or {bags60lbNeeded} 60lb bags)
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-medium">Est. Ready-Mix Truck Cost</div>
            <div className="text-3xl font-bold mt-1 text-emerald-300">
              ${estimatedReadyMixCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              At ${pricePerCubicYard}/cu yd delivered
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-700" /> Structure Dimensions
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setShape('slab')}
                className={`px-3 py-1 rounded-md transition ${shape === 'slab' ? 'bg-white text-amber-800 shadow-sm' : 'text-slate-600'}`}
              >
                Slab / Patio
              </button>
              <button
                onClick={() => setShape('footing')}
                className={`px-3 py-1 rounded-md transition ${shape === 'footing' ? 'bg-white text-amber-800 shadow-sm' : 'text-slate-600'}`}
              >
                Trench / Footing
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Length (Feet)</label>
              <input
                type="number"
                value={lengthFeet}
                onChange={(e) => setLengthFeet(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                {shape === 'slab' ? 'Width (Feet)' : 'Width (Inches)'}
              </label>
              <input
                type="number"
                value={widthFeet}
                onChange={(e) => setWidthFeet(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Thickness / Depth (Inches)</label>
              <input
                type="number"
                step="0.5"
                value={thicknessInches}
                onChange={(e) => setThicknessInches(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Waste Factor (%)</label>
              <input
                type="number"
                value={wastePercent}
                onChange={(e) => setWastePercent(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Ready-Mix Delivery Price ($ / Cu Yd)</label>
            <input
              type="number"
              value={pricePerCubicYard}
              onChange={(e) => setPricePerCubicYard(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
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
              className="flex-1 py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save Estimate
            </button>
          </div>
        </div>

        {/* Thickness Quick Guide */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs">
          <h3 className="font-semibold text-slate-800 border-b pb-2 text-sm">Recommended Thickness Guide</h3>

          <div
            onClick={() => setThicknessInches(4)}
            className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-lg border border-slate-100 cursor-pointer transition flex justify-between items-center"
          >
            <div>
              <div className="font-semibold text-slate-800">4 Inches (Standard)</div>
              <div className="text-slate-500">Residential sidewalks, shed bases, standard patios</div>
            </div>
            <div className="font-bold text-amber-800">4" Depth</div>
          </div>

          <div
            onClick={() => setThicknessInches(5)}
            className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-lg border border-slate-100 cursor-pointer transition flex justify-between items-center"
          >
            <div>
              <div className="font-semibold text-slate-800">5 - 6 Inches (Heavy Duty)</div>
              <div className="text-slate-500">Driveways carrying cars, SUVs, light trucks</div>
            </div>
            <div className="font-bold text-amber-800">5" - 6" Depth</div>
          </div>

          <div
            onClick={() => setThicknessInches(8)}
            className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-lg border border-slate-100 cursor-pointer transition flex justify-between items-center"
          >
            <div>
              <div className="font-semibold text-slate-800">8 - 12 Inches (Structural Footings)</div>
              <div className="text-slate-500">Commercial slabs, heavy vehicle pads, retaining wall footings</div>
            </div>
            <div className="font-bold text-amber-800">8"+ Depth</div>
          </div>
        </div>
      </div>
    </div>
  );
};
