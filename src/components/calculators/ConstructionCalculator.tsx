import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Hammer, Sparkles, Copy, Check, Layers, Shovel, Grid, Box } from 'lucide-react';

type ConstructionMode = 'concrete_slab' | 'gravel_mulch' | 'drywall' | 'framing_studs';

const CONSTRUCTION_PRESETS = [
  { name: '10×10 ft Patio Slab (4")', mode: 'concrete_slab', l: 10, w: 10, d: 4, waste: 10, desc: '100 sq ft backyard patio' },
  { name: '24×24 ft Garage Slab (4")', mode: 'concrete_slab', l: 24, w: 24, d: 4, waste: 10, desc: '2-car garage concrete pad' },
  { name: '12" Round Post Footing', mode: 'concrete_slab', isRound: true, diam: 12, depthFt: 4, count: 6, waste: 10, desc: '6 deck sonotube piers' },
  { name: 'Garden Mulch Bed (500 sq ft, 3")', mode: 'gravel_mulch', area: 500, depthIn: 3, waste: 5, desc: 'Landscape flower bed' },
  { name: '24 ft Room Wall Framing', mode: 'framing_studs', wallLen: 24, spacing: 16, heightFt: 8, waste: 10, desc: 'Standard 16" OC stud wall' },
];

export const ConstructionCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [mode, setMode] = useState<ConstructionMode>('concrete_slab');

  // Concrete Mode Inputs
  const [slabShape, setSlabShape] = useState<'rectangle' | 'cylinder'>('rectangle');
  const [lengthFt, setLengthFt] = useState<number>(12);
  const [widthFt, setWidthFt] = useState<number>(10);
  const [depthInches, setDepthInches] = useState<number>(4);
  const [cylinderDiamInches, setCylinderDiamInches] = useState<number>(12);
  const [cylinderDepthFt, setCylinderDepthFt] = useState<number>(4);
  const [pierCount, setPierCount] = useState<number>(4);
  const [concreteWastePct, setConcreteWastePct] = useState<number>(10);
  const [costPer80lbBag, setCostPer80lbBag] = useState<number>(5.75);

  // Gravel & Mulch Inputs
  const [landscapeAreaSqFt, setLandscapeAreaSqFt] = useState<number>(400);
  const [bedDepthInches, setBedDepthInches] = useState<number>(3);
  const [landscapeWastePct, setLandscapeWastePct] = useState<number>(5);
  const [bulkMaterialCostPerYd, setBulkMaterialCostPerYd] = useState<number>(45);

  // Drywall Inputs
  const [wallAreaSqFt, setWallAreaSqFt] = useState<number>(640);
  const [sheetSize, setSheetSize] = useState<'4x8' | '4x10' | '4x12'>('4x8');
  const [drywallWastePct, setDrywallWastePct] = useState<number>(10);

  // Framing Inputs
  const [framingWallLengthFt, setFramingWallLengthFt] = useState<number>(20);
  const [studSpacingInches, setStudSpacingInches] = useState<number>(16); // 16 or 24
  const [framingWastePct, setFramingWastePct] = useState<number>(10);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.mode) setMode(initialPreset.mode);
      if (initialPreset.lengthFt !== undefined) setLengthFt(initialPreset.lengthFt);
      if (initialPreset.widthFt !== undefined) setWidthFt(initialPreset.widthFt);
    }
  }, [initialPreset]);

  // Calculations for Concrete
  const concreteResults = useMemo(() => {
    const wasteMultiplier = 1 + Math.max(0, safeParseNumber(concreteWastePct, 10)) / 100;
    let netCuFt = 0;

    if (slabShape === 'rectangle') {
      const l = Math.max(0, safeParseNumber(lengthFt, 0));
      const w = Math.max(0, safeParseNumber(widthFt, 0));
      const d = Math.max(0, safeParseNumber(depthInches, 0)) / 12;
      netCuFt = l * w * d;
    } else {
      const rFt = Math.max(0, safeParseNumber(cylinderDiamInches, 0)) / 24; // radius in feet
      const hFt = Math.max(0, safeParseNumber(cylinderDepthFt, 0));
      const count = Math.max(1, Math.floor(safeParseNumber(pierCount, 1)));
      netCuFt = Math.PI * rFt * rFt * hFt * count;
    }

    const totalCuFtWithWaste = netCuFt * wasteMultiplier;
    const totalCuYards = totalCuFtWithWaste / 27;

    // Bag yields: 80lb = 0.60 cu ft, 60lb = 0.45 cu ft, 50lb = 0.375 cu ft
    const bags80lb = Math.ceil(totalCuFtWithWaste / 0.6);
    const bags60lb = Math.ceil(totalCuFtWithWaste / 0.45);
    const bags50lb = Math.ceil(totalCuFtWithWaste / 0.375);

    const readyMixTruckloads = Math.ceil(totalCuYards / 10);
    const bagCost = bags80lb * Math.max(0, safeParseNumber(costPer80lbBag, 5.75));

    return {
      netCuFt,
      totalCuFtWithWaste,
      totalCuYards,
      bags80lb,
      bags60lb,
      bags50lb,
      readyMixTruckloads,
      bagCost,
    };
  }, [
    slabShape,
    lengthFt,
    widthFt,
    depthInches,
    cylinderDiamInches,
    cylinderDepthFt,
    pierCount,
    concreteWastePct,
    costPer80lbBag,
  ]);

  // Calculations for Gravel & Mulch
  const landscapeResults = useMemo(() => {
    const area = Math.max(0, safeParseNumber(landscapeAreaSqFt, 0));
    const depthFt = Math.max(0, safeParseNumber(bedDepthInches, 0)) / 12;
    const waste = 1 + Math.max(0, safeParseNumber(landscapeWastePct, 5)) / 100;
    const cuFt = area * depthFt * waste;
    const cuYards = cuFt / 27;
    const gravelTons = cuYards * 1.4; // standard ~1.4 tons per yard of crushed rock
    const estCost = cuYards * Math.max(0, safeParseNumber(bulkMaterialCostPerYd, 0));

    return {
      cuFt,
      cuYards,
      gravelTons,
      estCost,
    };
  }, [landscapeAreaSqFt, bedDepthInches, landscapeWastePct, bulkMaterialCostPerYd]);

  // Calculations for Drywall
  const drywallResults = useMemo(() => {
    const area = Math.max(0, safeParseNumber(wallAreaSqFt, 0));
    const waste = 1 + Math.max(0, safeParseNumber(drywallWastePct, 10)) / 100;
    const grossArea = area * waste;

    let sheetArea = 32; // 4x8
    if (sheetSize === '4x10') sheetArea = 40;
    if (sheetSize === '4x12') sheetArea = 48;

    const sheetsNeeded = Math.ceil(grossArea / sheetArea);
    const jointCompoundGallons = Math.ceil((sheetsNeeded * 0.05) * 10) / 10; // ~0.05 gal per sheet
    const screwsCount = sheetsNeeded * 32; // ~32 screws per 4x8 sheet

    return {
      grossArea,
      sheetArea,
      sheetsNeeded,
      jointCompoundGallons,
      screwsCount,
    };
  }, [wallAreaSqFt, sheetSize, drywallWastePct]);

  // Calculations for Framing
  const framingResults = useMemo(() => {
    const wallLen = Math.max(0, safeParseNumber(framingWallLengthFt, 0));
    const spacing = safeParseNumber(studSpacingInches, 16);
    const waste = 1 + Math.max(0, safeParseNumber(framingWastePct, 10)) / 100;

    // Number of standard vertical studs = (Wall Length in Inches / Spacing) + 1 for end
    const wallLenInches = wallLen * 12;
    const baseStuds = Math.ceil(wallLenInches / spacing) + 1;
    // Extra studs for corners (2 extra per corner), openings, headers
    const totalStudsWithWaste = Math.ceil(baseStuds * waste);

    // Plates: 1 bottom plate + 2 top plates = 3 × Wall Length
    const totalPlateLinearFt = wallLen * 3;
    const plateBoards12ft = Math.ceil(totalPlateLinearFt / 12);

    return {
      baseStuds,
      totalStudsWithWaste,
      totalPlateLinearFt,
      plateBoards12ft,
    };
  }, [framingWallLengthFt, studSpacingInches, framingWastePct]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyPreset = (p: typeof CONSTRUCTION_PRESETS[0]) => {
    setMode(p.mode as ConstructionMode);
    if (p.mode === 'concrete_slab') {
      if (p.isRound) {
        setSlabShape('cylinder');
        setCylinderDiamInches(p.diam || 12);
        setCylinderDepthFt(p.depthFt || 4);
        setPierCount(p.count || 4);
      } else {
        setSlabShape('rectangle');
        setLengthFt(p.l || 10);
        setWidthFt(p.w || 10);
        setDepthInches(p.d || 4);
      }
      setConcreteWastePct(p.waste);
    } else if (p.mode === 'gravel_mulch') {
      setLandscapeAreaSqFt(p.area || 500);
      setBedDepthInches(p.depthIn || 3);
      setLandscapeWastePct(p.waste);
    } else if (p.mode === 'framing_studs') {
      setFramingWallLengthFt(p.wallLen || 24);
      setStudSpacingInches(p.spacing || 16);
      setFramingWastePct(p.waste);
    }
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('concrete_slab')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'concrete_slab'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Concrete Slabs &amp; Piers
        </button>

        <button
          type="button"
          onClick={() => setMode('gravel_mulch')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'gravel_mulch'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Gravel, Mulch &amp; Soil
        </button>

        <button
          type="button"
          onClick={() => setMode('drywall')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'drywall'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Drywall &amp; Sheathing
        </button>

        <button
          type="button"
          onClick={() => setMode('framing_studs')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'framing_studs'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Wall Framing Studs
        </button>
      </div>

      {/* Presets */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Common DIY Construction Presets
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CONSTRUCTION_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="p-2 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 transition text-xs"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode 1: Concrete */}
      {mode === 'concrete_slab' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-500" />
                  Concrete Dimensions
                </h3>

                <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSlabShape('rectangle')}
                    className={`px-2 py-1 rounded-md ${
                      slabShape === 'rectangle' ? 'bg-white dark:bg-slate-900 shadow-xs text-amber-600' : 'text-slate-500'
                    }`}
                  >
                    Rectangular Slab
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlabShape('cylinder')}
                    className={`px-2 py-1 rounded-md ${
                      slabShape === 'cylinder' ? 'bg-white dark:bg-slate-900 shadow-xs text-amber-600' : 'text-slate-500'
                    }`}
                  >
                    Round Pier / Column
                  </button>
                </div>
              </div>

              {slabShape === 'rectangle' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <CalcInput id="lengthFt" label="Slab Length (Feet)" value={lengthFt} onChange={setLengthFt} min={1} suffix="ft" />
                    <CalcInput id="widthFt" label="Slab Width (Feet)" value={widthFt} onChange={setWidthFt} min={1} suffix="ft" />
                  </div>
                  <CalcInput id="depthInches" label="Slab Thickness / Depth" value={depthInches} onChange={setDepthInches} min={1} step={0.5} suffix="in" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <CalcInput id="diamInches" label="Pier Diameter" value={cylinderDiamInches} onChange={setCylinderDiamInches} min={4} suffix="in" />
                    <CalcInput id="depthFt" label="Hole Depth (Feet)" value={cylinderDepthFt} onChange={setCylinderDepthFt} min={1} suffix="ft" />
                  </div>
                  <CalcInput id="pierCount" label="Total Number of Footings" value={pierCount} onChange={setPierCount} min={1} step={1} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <CalcInput id="waste" label="Waste Margin Factor (%)" value={concreteWastePct} onChange={setConcreteWastePct} min={0} max={25} suffix="%" />
                <CalcInput id="costBag" label="Cost / 80lb Bag ($)" value={costPer80lbBag} onChange={setCostPer80lbBag} min={1} step={0.25} prefix="$" />
              </div>
            </div>

            {/* Right Output Panel */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total Concrete Required (With {concreteWastePct}% Waste)
                  </span>
                  <button
                    type="button"
                    onClick={() => copyVal(formatNumber(concreteResults.totalCuYards, 2), 'yards')}
                    className="text-xs text-slate-400 hover:text-amber-500 flex items-center gap-1 font-semibold"
                  >
                    {copiedKey === 'yards' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'yards' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="text-4xl sm:text-5xl font-black font-mono text-amber-600 dark:text-amber-400">
                  {formatNumber(concreteResults.totalCuYards, 2)}
                  <span className="text-lg text-slate-400 font-sans font-normal ml-2">yd³</span>
                </div>

                <div className="text-xs font-bold text-slate-500 font-mono">
                  {formatNumber(concreteResults.totalCuFtWithWaste, 1)} total cubic feet
                </div>
              </div>

              {/* Bag Count Breakdown */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">80 lb Pre-mixed Bags:</span>
                  <strong className="text-slate-900 dark:text-white">{concreteResults.bags80lb} bags</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">60 lb Pre-mixed Bags:</span>
                  <strong className="text-slate-900 dark:text-white">{concreteResults.bags60lb} bags</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">50 lb Fast-Setting Bags:</span>
                  <strong className="text-slate-900 dark:text-white">{concreteResults.bags50lb} bags</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-sans">Estimated 80lb Bag Cost:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">${formatNumber(concreteResults.bagCost, 2)}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CalcResultCard
              title="Cubic Yards"
              value={`${formatNumber(concreteResults.totalCuYards, 2)} yd³`}
              subtitle="Ready-mix volume"
              highlighted={true}
            />

            <CalcResultCard
              title="80 lb Bags"
              value={`${concreteResults.bags80lb} bags`}
              subtitle="0.60 cu ft yield/bag"
            />

            <CalcResultCard
              title="60 lb Bags"
              value={`${concreteResults.bags60lb} bags`}
              subtitle="0.45 cu ft yield/bag"
            />

            <CalcResultCard
              title="Ready-Mix Trucks"
              value={`${concreteResults.readyMixTruckloads} truck`}
              subtitle="Up to 10 yd³ capacity"
            />
          </div>
        </div>
      )}

      {/* Mode 2: Gravel & Mulch */}
      {mode === 'gravel_mulch' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shovel className="w-4 h-4 text-emerald-500" />
                Landscape Area &amp; Depth
              </h3>

              <CalcInput
                id="areaSqFt"
                label="Coverage Area (Square Feet)"
                value={landscapeAreaSqFt}
                onChange={setLandscapeAreaSqFt}
                min={1}
                step={25}
                suffix="sq ft"
              />

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="bedDepthInches"
                  label="Layer Depth (Inches)"
                  value={bedDepthInches}
                  onChange={setBedDepthInches}
                  min={0.5}
                  max={24}
                  step={0.5}
                  suffix="in"
                />
                <CalcInput
                  id="landWaste"
                  label="Compaction / Waste (%)"
                  value={landscapeWastePct}
                  onChange={setLandscapeWastePct}
                  min={0}
                  max={20}
                  suffix="%"
                />
              </div>

              <CalcInput
                id="costBulk"
                label="Bulk Material Cost ($/Cubic Yard)"
                value={bulkMaterialCostPerYd}
                onChange={setBulkMaterialCostPerYd}
                min={0}
                step={5}
                prefix="$"
              />
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Bulk Material Needed
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {formatNumber(landscapeResults.cuYards, 2)}
                  <span className="text-lg text-slate-400 font-sans font-normal ml-2">yd³</span>
                </div>
                <div className="text-xs font-bold text-slate-500 font-mono">
                  {formatNumber(landscapeResults.cuFt, 1)} cubic feet
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Crushed Gravel / Stone Weight:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {formatNumber(landscapeResults.gravelTons, 2)} tons
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">2 cu ft Bagged Mulch Equivalent:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {Math.ceil(landscapeResults.cuFt / 2)} bags
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-sans">Estimated Bulk Purchase Cost:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">${formatNumber(landscapeResults.estCost, 2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Drywall */}
      {mode === 'drywall' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Drywall Wall &amp; Ceiling Area
              </h3>

              <CalcInput
                id="wallArea"
                label="Total Surface Area (Sq Ft)"
                value={wallAreaSqFt}
                onChange={setWallAreaSqFt}
                min={10}
                step={20}
                suffix="sq ft"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Sheet Dimensions
                  </label>
                  <select
                    value={sheetSize}
                    onChange={(e) => setSheetSize(e.target.value as any)}
                    className="w-full text-xs font-bold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    <option value="4x8">4 × 8 ft (32 sq ft)</option>
                    <option value="4x10">4 × 10 ft (40 sq ft)</option>
                    <option value="4x12">4 × 12 ft (48 sq ft)</option>
                  </select>
                </div>

                <CalcInput
                  id="dryWaste"
                  label="Cutting Waste (%)"
                  value={drywallWastePct}
                  onChange={setDrywallWastePct}
                  min={0}
                  max={25}
                  suffix="%"
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Drywall Sheets Needed
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-blue-600 dark:text-blue-400">
                  {drywallResults.sheetsNeeded}
                  <span className="text-lg text-slate-400 font-sans font-normal ml-2">sheets</span>
                </div>
                <div className="text-xs font-bold text-slate-500 font-mono">
                  {formatNumber(drywallResults.grossArea, 0)} sq ft with {drywallWastePct}% cutting waste
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Drywall Screws (~32/sheet):</span>
                  <strong className="text-slate-900 dark:text-white">~{drywallResults.screwsCount.toLocaleString()} screws</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Joint Compound Mud:</span>
                  <strong className="text-slate-900 dark:text-white">
                    ~{drywallResults.jointCompoundGallons} gallons
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 4: Framing */}
      {mode === 'framing_studs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Hammer className="w-4 h-4 text-purple-500" />
                Wall Framing Parameters
              </h3>

              <CalcInput
                id="wallLen"
                label="Linear Wall Length (Feet)"
                value={framingWallLengthFt}
                onChange={setFramingWallLengthFt}
                min={1}
                step={2}
                suffix="ft"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    On-Center Stud Spacing
                  </label>
                  <select
                    value={studSpacingInches}
                    onChange={(e) => setStudSpacingInches(Number(e.target.value))}
                    className="w-full text-xs font-bold p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    <option value={16}>16 inches On-Center (Standard)</option>
                    <option value={24}>24 inches On-Center (Advanced)</option>
                  </select>
                </div>

                <CalcInput
                  id="frameWaste"
                  label="Extra / Waste Factor (%)"
                  value={framingWastePct}
                  onChange={setFramingWastePct}
                  min={0}
                  max={25}
                  suffix="%"
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total 2×4 or 2×6 Vertical Studs
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-purple-600 dark:text-purple-400">
                  {framingResults.totalStudsWithWaste}
                  <span className="text-lg text-slate-400 font-sans font-normal ml-2">studs</span>
                </div>
                <div className="text-xs font-bold text-slate-500 font-mono">
                  Includes {framingResults.baseStuds} base layout + corners &amp; waste
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Top &amp; Bottom Plates (3x wall):</span>
                  <strong className="text-slate-900 dark:text-white">
                    {framingResults.totalPlateLinearFt} linear ft
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">12 ft Framing Plate Boards:</span>
                  <strong className="text-slate-900 dark:text-white">{framingResults.plateBoards12ft} boards</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
