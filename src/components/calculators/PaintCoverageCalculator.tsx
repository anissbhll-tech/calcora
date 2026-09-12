import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';
import { Palette, Sparkles, Copy, Check, CheckSquare, Square, Layers, DollarSign } from 'lucide-react';

const PAINT_PRESETS = [
  { name: 'Standard Bedroom (12×14 ft)', l: 12, w: 14, h: 8, doors: 1, windows: 2, desc: '144 sq ft floor, 8ft ceiling' },
  { name: 'Living Room (16×20 ft, 9ft)', l: 16, w: 20, h: 9, doors: 2, windows: 4, desc: '320 sq ft floor, 9ft ceiling' },
  { name: 'Master Suite (18×22 ft, 10ft)', l: 18, w: 22, h: 10, doors: 3, windows: 5, desc: '396 sq ft floor, 10ft ceiling' },
  { name: 'Small Bathroom (6×8 ft)', l: 6, w: 8, h: 8, doors: 1, windows: 1, desc: '48 sq ft floor, 8ft ceiling' },
];

export const PaintCoverageCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [roomLengthFt, setRoomLengthFt] = useState<number>(() => initialPreset?.roomLengthFt ?? 16);
  const [roomWidthFt, setRoomWidthFt] = useState<number>(() => initialPreset?.roomWidthFt ?? 14);
  const [wallHeightFt, setWallHeightFt] = useState<number>(() => initialPreset?.wallHeightFt ?? 8);
  const [numberOfCoats, setNumberOfCoats] = useState<number>(() => initialPreset?.numberOfCoats ?? 2);
  const [doorCount, setDoorCount] = useState<number>(1); // ~21 sq ft each
  const [windowCount, setWindowCount] = useState<number>(2); // ~15 sq ft each
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(false);
  const [includePrimer, setIncludePrimer] = useState<boolean>(false);
  const [coveragePerGallon, setCoveragePerGallon] = useState<number>(350); // 350 sq ft / gal standard
  const [costPerGallon, setCostPerGallon] = useState<number>(45);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.roomLengthFt !== undefined) setRoomLengthFt(initialPreset.roomLengthFt);
      if (initialPreset.roomWidthFt !== undefined) setRoomWidthFt(initialPreset.roomWidthFt);
      if (initialPreset.wallHeightFt !== undefined) setWallHeightFt(initialPreset.wallHeightFt);
    }
  }, [initialPreset]);

  const calculation = useMemo(() => {
    const l = Math.max(0, safeParseNumber(roomLengthFt, 0));
    const w = Math.max(0, safeParseNumber(roomWidthFt, 0));
    const h = Math.max(0, safeParseNumber(wallHeightFt, 0));
    const coats = Math.max(1, Math.min(5, Math.floor(safeParseNumber(numberOfCoats, 2))));
    const doors = Math.max(0, Math.floor(safeParseNumber(doorCount, 0)));
    const windows = Math.max(0, Math.floor(safeParseNumber(windowCount, 0)));
    const coverage = Math.max(100, safeParseNumber(coveragePerGallon, 350));
    const pricePerGal = Math.max(0, safeParseNumber(costPerGallon, 45));

    const perimeter = 2 * (l + w);
    const grossWallArea = perimeter * h;
    const doorsArea = doors * 21; // standard interior door ~ 21 sq ft
    const windowsArea = windows * 15; // standard window ~ 15 sq ft
    const netWallArea = Math.max(0, grossWallArea - doorsArea - windowsArea);

    const ceilingArea = includeCeiling ? l * w : 0;
    const totalSurfaceAreaSingleCoat = netWallArea + ceilingArea;
    const totalPaintAreaWithCoats = totalSurfaceAreaSingleCoat * coats;

    // Primer is 1 coat
    const primerArea = includePrimer ? totalSurfaceAreaSingleCoat : 0;
    const primerGallons = Math.ceil(primerArea / coverage);

    // Wall paint in exact gallons and rounded
    const exactGallons = totalPaintAreaWithCoats / coverage;
    const totalGallonsPurchased = Math.ceil(exactGallons);

    // Quarts estimate: if under 1 gallon, or remainder < 0.25 gallon
    const remainderGal = totalGallonsPurchased - exactGallons;
    const totalQuartsEquivalent = Math.ceil(exactGallons * 4);

    const totalWallPaintCost = totalGallonsPurchased * pricePerGal;
    const estimatedPrimerCost = primerGallons * (pricePerGal * 0.7); // Primer ~30% cheaper
    const grandTotalCost = totalWallPaintCost + estimatedPrimerCost;

    return {
      perimeter,
      grossWallArea,
      doorsArea,
      windowsArea,
      netWallArea,
      ceilingArea,
      totalSurfaceAreaSingleCoat,
      totalPaintAreaWithCoats,
      exactGallons,
      totalGallonsPurchased,
      totalQuartsEquivalent,
      primerGallons,
      totalWallPaintCost,
      estimatedPrimerCost,
      grandTotalCost,
    };
  }, [
    roomLengthFt,
    roomWidthFt,
    wallHeightFt,
    numberOfCoats,
    doorCount,
    windowCount,
    includeCeiling,
    includePrimer,
    coveragePerGallon,
    costPerGallon,
  ]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyPreset = (p: typeof PAINT_PRESETS[0]) => {
    setRoomLengthFt(p.l);
    setRoomWidthFt(p.w);
    setWallHeightFt(p.h);
    setDoorCount(p.doors);
    setWindowCount(p.windows);
  };

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          Common Room Dimensions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PAINT_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="p-2 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition text-xs"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-500" />
            Room Dimensions &amp; Openings
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <CalcInput id="lengthFt" label="Room Length" value={roomLengthFt} onChange={setRoomLengthFt} min={1} suffix="ft" />
            <CalcInput id="widthFt" label="Room Width" value={roomWidthFt} onChange={setRoomWidthFt} min={1} suffix="ft" />
            <CalcInput id="heightFt" label="Ceiling Height" value={wallHeightFt} onChange={setWallHeightFt} min={6} max={24} suffix="ft" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput id="doors" label="Doors (~21 sq ft)" value={doorCount} onChange={setDoorCount} min={0} max={10} step={1} />
            <CalcInput id="windows" label="Windows (~15 sq ft)" value={windowCount} onChange={setWindowCount} min={0} max={20} step={1} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput id="coats" label="Number of Paint Coats" value={numberOfCoats} onChange={setNumberOfCoats} min={1} max={4} step={1} />
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Paint Coverage Rating
              </label>
              <select
                value={coveragePerGallon}
                onChange={(e) => setCoveragePerGallon(Number(e.target.value))}
                className="w-full text-xs font-bold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value={350}>Standard Latex (350 sq ft/gal)</option>
                <option value={400}>Premium High-Hide (400 sq ft/gal)</option>
                <option value={250}>Textured / Porous (250 sq ft/gal)</option>
              </select>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIncludeCeiling(!includeCeiling)}
              className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition text-left ${
                includeCeiling
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {includeCeiling ? <CheckSquare className="w-4 h-4 text-emerald-500" /> : <Square className="w-4 h-4" />}
              Paint Ceiling Too
            </button>

            <button
              type="button"
              onClick={() => setIncludePrimer(!includePrimer)}
              className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition text-left ${
                includePrimer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {includePrimer ? <CheckSquare className="w-4 h-4 text-emerald-500" /> : <Square className="w-4 h-4" />}
              Add 1 Primer Coat
            </button>
          </div>

          <CalcInput id="priceGal" label="Cost per Paint Gallon ($)" value={costPerGallon} onChange={setCostPerGallon} min={0} step={1} prefix="$" />
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Paint Gallons Needed ({numberOfCoats} Coats)
              </span>
              <button
                type="button"
                onClick={() => copyVal(String(calculation.totalGallonsPurchased), 'gallons')}
                className="text-xs text-slate-400 hover:text-emerald-500 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'gallons' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'gallons' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {calculation.totalGallonsPurchased}
              <span className="text-lg text-slate-400 font-sans font-normal ml-2">Gallons</span>
            </div>

            <div className="text-xs font-bold text-slate-500 font-mono">
              Exact volume: {formatNumber(calculation.exactGallons, 2)} gal ({calculation.totalQuartsEquivalent} quarts equivalent)
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span className="font-sans">Net Wall Surface Area:</span>
              <strong className="text-slate-900 dark:text-white">
                {formatNumber(calculation.netWallArea, 0)} sq ft
              </strong>
            </div>

            {includeCeiling && (
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span className="font-sans">Ceiling Surface Area:</span>
                <strong className="text-slate-900 dark:text-white">
                  +{formatNumber(calculation.ceilingArea, 0)} sq ft
                </strong>
              </div>
            )}

            {includePrimer && (
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span className="font-sans">Primer Gallons (1 coat):</span>
                <strong className="text-blue-600 dark:text-blue-400">
                  {calculation.primerGallons} gal (~${formatNumber(calculation.estimatedPrimerCost, 2)})
                </strong>
              </div>
            )}

            <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="font-sans font-bold">Estimated Total Material Cost:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 text-sm">
                ${formatNumber(calculation.grandTotalCost, 2)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CalcResultCard
          title="Paint Gallons"
          value={`${calculation.totalGallonsPurchased} Gal`}
          subtitle={`${numberOfCoats} coats applied`}
          highlighted={true}
        />

        <CalcResultCard
          title="Total Paint Cost"
          value={`$${formatNumber(calculation.grandTotalCost, 2)}`}
          subtitle={`At $${costPerGallon}/gal`}
        />

        <CalcResultCard
          title="Total Paint Area"
          value={`${formatNumber(calculation.totalPaintAreaWithCoats, 0)} sq ft`}
          subtitle="Cumulative coverage area"
        />

        <CalcResultCard
          title="Room Perimeter"
          value={`${calculation.perimeter} linear ft`}
          subtitle={`Minus ${doorCount} doors / ${windowCount} windows`}
        />
      </div>
    </div>
  );
};
