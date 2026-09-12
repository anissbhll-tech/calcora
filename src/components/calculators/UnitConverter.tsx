import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { ArrowLeftRight, Copy, Check, Sparkles, Layers, Search, RotateCcw } from 'lucide-react';

type UnitCategory =
  | 'length'
  | 'mass'
  | 'temperature'
  | 'volume'
  | 'area'
  | 'speed'
  | 'pressure'
  | 'energy'
  | 'power'
  | 'digital'
  | 'time';

interface UnitDef {
  id: string;
  label: string;
  symbol: string;
  ratioToBase: number; // relative to SI standard base unit
}

const UNIT_REGISTRY: Record<UnitCategory, { name: string; baseName: string; units: UnitDef[] }> = {
  length: {
    name: 'Length & Distance',
    baseName: 'Meters (m)',
    units: [
      { id: 'm', label: 'Meters', symbol: 'm', ratioToBase: 1 },
      { id: 'km', label: 'Kilometers', symbol: 'km', ratioToBase: 1000 },
      { id: 'cm', label: 'Centimeters', symbol: 'cm', ratioToBase: 0.01 },
      { id: 'mm', label: 'Millimeters', symbol: 'mm', ratioToBase: 0.001 },
      { id: 'um', label: 'Micrometers', symbol: 'µm', ratioToBase: 1e-6 },
      { id: 'nm', label: 'Nanometers', symbol: 'nm', ratioToBase: 1e-9 },
      { id: 'mi', label: 'Miles', symbol: 'mi', ratioToBase: 1609.344 },
      { id: 'yd', label: 'Yards', symbol: 'yd', ratioToBase: 0.9144 },
      { id: 'ft', label: 'Feet', symbol: 'ft', ratioToBase: 0.3048 },
      { id: 'in', label: 'Inches', symbol: 'in', ratioToBase: 0.0254 },
      { id: 'nmi', label: 'Nautical Miles', symbol: 'nmi', ratioToBase: 1852 },
    ],
  },
  mass: {
    name: 'Mass & Weight',
    baseName: 'Kilograms (kg)',
    units: [
      { id: 'kg', label: 'Kilograms', symbol: 'kg', ratioToBase: 1 },
      { id: 'g', label: 'Grams', symbol: 'g', ratioToBase: 0.001 },
      { id: 'mg', label: 'Milligrams', symbol: 'mg', ratioToBase: 1e-6 },
      { id: 'ug', label: 'Micrograms', symbol: 'µg', ratioToBase: 1e-9 },
      { id: 'lb', label: 'Pounds', symbol: 'lbs', ratioToBase: 0.45359237 },
      { id: 'oz', label: 'Ounces', symbol: 'oz', ratioToBase: 0.028349523125 },
      { id: 'ton_m', label: 'Metric Ton', symbol: 't', ratioToBase: 1000 },
      { id: 'ton_us', label: 'US Short Ton', symbol: 'US ton', ratioToBase: 907.18474 },
      { id: 'stone', label: 'Stone', symbol: 'st', ratioToBase: 6.35029 },
    ],
  },
  temperature: {
    name: 'Temperature',
    baseName: 'Celsius (°C)',
    units: [
      { id: 'c', label: 'Celsius', symbol: '°C', ratioToBase: 1 },
      { id: 'f', label: 'Fahrenheit', symbol: '°F', ratioToBase: 1 },
      { id: 'k', label: 'Kelvin', symbol: 'K', ratioToBase: 1 },
      { id: 'r', label: 'Rankine', symbol: '°R', ratioToBase: 1 },
    ],
  },
  volume: {
    name: 'Volume & Capacity',
    baseName: 'Liters (L)',
    units: [
      { id: 'l', label: 'Liters', symbol: 'L', ratioToBase: 1 },
      { id: 'ml', label: 'Milliliters', symbol: 'mL', ratioToBase: 0.001 },
      { id: 'm3', label: 'Cubic Meters', symbol: 'm³', ratioToBase: 1000 },
      { id: 'gal_us', label: 'US Gallons', symbol: 'gal', ratioToBase: 3.785411784 },
      { id: 'gal_uk', label: 'UK Imperial Gallons', symbol: 'imp gal', ratioToBase: 4.54609 },
      { id: 'qt_us', label: 'US Quarts', symbol: 'qt', ratioToBase: 0.946352946 },
      { id: 'pt_us', label: 'US Pints', symbol: 'pt', ratioToBase: 0.473176473 },
      { id: 'cup_us', label: 'US Cups', symbol: 'cup', ratioToBase: 0.2365882365 },
      { id: 'floz_us', label: 'US Fluid Ounces', symbol: 'fl oz', ratioToBase: 0.0295735295625 },
      { id: 'tbsp_us', label: 'US Tablespoons', symbol: 'tbsp', ratioToBase: 0.01478676478125 },
      { id: 'tsp_us', label: 'US Teaspoons', symbol: 'tsp', ratioToBase: 0.00492892159375 },
    ],
  },
  area: {
    name: 'Area',
    baseName: 'Square Meters (m²)',
    units: [
      { id: 'sqm', label: 'Square Meters', symbol: 'm²', ratioToBase: 1 },
      { id: 'sqkm', label: 'Square Kilometers', symbol: 'km²', ratioToBase: 1e6 },
      { id: 'sqcm', label: 'Square Centimeters', symbol: 'cm²', ratioToBase: 1e-4 },
      { id: 'sqft', label: 'Square Feet', symbol: 'ft²', ratioToBase: 0.09290304 },
      { id: 'sqin', label: 'Square Inches', symbol: 'in²', ratioToBase: 0.00064516 },
      { id: 'sqyd', label: 'Square Yards', symbol: 'yd²', ratioToBase: 0.83612736 },
      { id: 'acre', label: 'Acres', symbol: 'ac', ratioToBase: 4046.8564224 },
      { id: 'hectare', label: 'Hectares', symbol: 'ha', ratioToBase: 10000 },
      { id: 'sqmi', label: 'Square Miles', symbol: 'mi²', ratioToBase: 2589988.110336 },
    ],
  },
  speed: {
    name: 'Speed & Velocity',
    baseName: 'Meters / Second (m/s)',
    units: [
      { id: 'mps', label: 'Meters / Second', symbol: 'm/s', ratioToBase: 1 },
      { id: 'kph', label: 'Kilometers / Hour', symbol: 'km/h', ratioToBase: 0.277777778 },
      { id: 'mph', label: 'Miles / Hour', symbol: 'mph', ratioToBase: 0.44704 },
      { id: 'knot', label: 'Knots', symbol: 'kn', ratioToBase: 0.514444444 },
      { id: 'fps', label: 'Feet / Second', symbol: 'ft/s', ratioToBase: 0.3048 },
      { id: 'mach', label: 'Mach (at sea level)', symbol: 'M', ratioToBase: 340.29 },
    ],
  },
  pressure: {
    name: 'Pressure',
    baseName: 'Pascals (Pa)',
    units: [
      { id: 'pa', label: 'Pascals', symbol: 'Pa', ratioToBase: 1 },
      { id: 'kpa', label: 'Kilopascals', symbol: 'kPa', ratioToBase: 1000 },
      { id: 'bar', label: 'Bar', symbol: 'bar', ratioToBase: 100000 },
      { id: 'psi', label: 'Pounds / Square Inch', symbol: 'psi', ratioToBase: 6894.757293168 },
      { id: 'atm', label: 'Standard Atmospheres', symbol: 'atm', ratioToBase: 101325 },
      { id: 'mmhg', label: 'Millimeters of Mercury', symbol: 'mmHg', ratioToBase: 133.322387415 },
    ],
  },
  energy: {
    name: 'Energy & Work',
    baseName: 'Joules (J)',
    units: [
      { id: 'j', label: 'Joules', symbol: 'J', ratioToBase: 1 },
      { id: 'kj', label: 'Kilojoules', symbol: 'kJ', ratioToBase: 1000 },
      { id: 'cal', label: 'Calories', symbol: 'cal', ratioToBase: 4.184 },
      { id: 'kcal', label: 'Kilocalories (Food Cal)', symbol: 'kcal', ratioToBase: 4184 },
      { id: 'wh', label: 'Watt-Hours', symbol: 'Wh', ratioToBase: 3600 },
      { id: 'kwh', label: 'Kilowatt-Hours', symbol: 'kWh', ratioToBase: 3.6e6 },
      { id: 'btu', label: 'British Thermal Units', symbol: 'BTU', ratioToBase: 1055.05585262 },
      { id: 'ftlb', label: 'Foot-Pounds', symbol: 'ft⋅lbf', ratioToBase: 1.3558179483314 },
    ],
  },
  power: {
    name: 'Power',
    baseName: 'Watts (W)',
    units: [
      { id: 'w', label: 'Watts', symbol: 'W', ratioToBase: 1 },
      { id: 'kw', label: 'Kilowatts', symbol: 'kW', ratioToBase: 1000 },
      { id: 'mw', label: 'Megawatts', symbol: 'MW', ratioToBase: 1e6 },
      { id: 'hp_mech', label: 'Horsepower (Mechanical)', symbol: 'hp(I)', ratioToBase: 745.69987158227022 },
      { id: 'hp_met', label: 'Horsepower (Metric)', symbol: 'hp(M)', ratioToBase: 735.49875 },
      { id: 'btuh', label: 'BTU / Hour', symbol: 'BTU/h', ratioToBase: 0.29307107 },
    ],
  },
  digital: {
    name: 'Digital Data Storage',
    baseName: 'Bytes (B)',
    units: [
      { id: 'b', label: 'Bytes', symbol: 'B', ratioToBase: 1 },
      { id: 'kb', label: 'Kilobytes (Decimal)', symbol: 'KB', ratioToBase: 1000 },
      { id: 'mb', label: 'Megabytes (Decimal)', symbol: 'MB', ratioToBase: 1e6 },
      { id: 'gb', label: 'Gigabytes (Decimal)', symbol: 'GB', ratioToBase: 1e9 },
      { id: 'tb', label: 'Terabytes (Decimal)', symbol: 'TB', ratioToBase: 1e12 },
      { id: 'kib', label: 'Kibibytes (Binary 1024)', symbol: 'KiB', ratioToBase: 1024 },
      { id: 'mib', label: 'Mebibytes (Binary)', symbol: 'MiB', ratioToBase: 1048576 },
      { id: 'gib', label: 'Gibibytes (Binary)', symbol: 'GiB', ratioToBase: 1073741824 },
      { id: 'tib', label: 'Tebibytes (Binary)', symbol: 'TiB', ratioToBase: 1099511627776 },
    ],
  },
  time: {
    name: 'Time',
    baseName: 'Seconds (s)',
    units: [
      { id: 's', label: 'Seconds', symbol: 's', ratioToBase: 1 },
      { id: 'ms', label: 'Milliseconds', symbol: 'ms', ratioToBase: 0.001 },
      { id: 'min', label: 'Minutes', symbol: 'min', ratioToBase: 60 },
      { id: 'h', label: 'Hours', symbol: 'h', ratioToBase: 3600 },
      { id: 'd', label: 'Days', symbol: 'days', ratioToBase: 86400 },
      { id: 'wk', label: 'Weeks', symbol: 'wks', ratioToBase: 604800 },
      { id: 'yr', label: 'Years (365.25 d)', symbol: 'yrs', ratioToBase: 31557600 },
    ],
  },
};

export const UnitConverter: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [value, setValue] = useState<number>(10);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.category) setCategory(initialPreset.category);
      if (initialPreset.fromUnit) setFromUnit(initialPreset.fromUnit);
      if (initialPreset.toUnit) setToUnit(initialPreset.toUnit);
      if (initialPreset.value !== undefined) setValue(initialPreset.value);
    }
  }, [initialPreset]);

  const currentCategorySpec = UNIT_REGISTRY[category];

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const units = UNIT_REGISTRY[newCat].units;
    setFromUnit(units[0].id);
    setToUnit(units.length > 1 ? units[1].id : units[0].id);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Convert Function
  const convertValue = (val: number, fromId: string, toId: string): number => {
    if (category === 'temperature') {
      // Direct temperature formulas
      let tempC = val;
      if (fromId === 'f') tempC = ((val - 32) * 5) / 9;
      else if (fromId === 'k') tempC = val - 273.15;
      else if (fromId === 'r') tempC = ((val - 491.67) * 5) / 9;

      if (toId === 'c') return tempC;
      if (toId === 'f') return (tempC * 9) / 5 + 32;
      if (toId === 'k') return tempC + 273.15;
      if (toId === 'r') return (tempC + 273.15) * 1.8;
      return tempC;
    } else {
      const fromDef = currentCategorySpec.units.find((u) => u.id === fromId);
      const toDef = currentCategorySpec.units.find((u) => u.id === toId);
      if (!fromDef || !toDef) return 0;
      const baseValue = val * fromDef.ratioToBase;
      return baseValue / toDef.ratioToBase;
    }
  };

  const mainResult = useMemo(() => {
    const num = safeParseNumber(value, 0);
    return convertValue(num, fromUnit, toUnit);
  }, [value, fromUnit, toUnit, category]);

  // All Units Equivalent List
  const allEquivalents = useMemo(() => {
    const num = safeParseNumber(value, 0);
    return currentCategorySpec.units.map((u) => {
      const converted = convertValue(num, fromUnit, u.id);
      return {
        ...u,
        convertedValue: converted,
        formatted:
          Math.abs(converted) < 1e-5 && converted !== 0
            ? converted.toExponential(4)
            : formatNumber(converted, 5),
      };
    });
  }, [value, fromUnit, category]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fromUnitDef = currentCategorySpec.units.find((u) => u.id === fromUnit);
  const toUnitDef = currentCategorySpec.units.find((u) => u.id === toUnit);

  return (
    <div className="space-y-8">
      {/* Category Pills Header */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        {(Object.keys(UNIT_REGISTRY) as UnitCategory[]).map((catKey) => (
          <button
            key={catKey}
            type="button"
            onClick={() => handleCategoryChange(catKey)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[110px] text-center ${
              category === catKey
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {UNIT_REGISTRY[catKey].name}
          </button>
        ))}
      </div>

      {/* Main Interactive Converter Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center">
          {/* Left: From Unit */}
          <div className="sm:col-span-5 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              From Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full text-2xl sm:text-3xl font-mono font-black p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
            >
              {currentCategorySpec.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Middle: Swap Button */}
          <div className="sm:col-span-1 flex justify-center py-2">
            <button
              type="button"
              onClick={handleSwap}
              className="p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition shadow-lg shadow-blue-500/25 active:scale-95"
              title="Swap units"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: To Unit */}
          <div className="sm:col-span-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Converted Result
              </label>
              <button
                type="button"
                onClick={() => copyVal(String(mainResult), 'main')}
                className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'main' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'main' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="w-full text-2xl sm:text-3xl font-mono font-black p-4 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 border border-blue-200/80 dark:border-blue-900/60 rounded-2xl truncate select-all">
              {Math.abs(mainResult) < 1e-6 && mainResult !== 0
                ? mainResult.toExponential(6)
                : formatNumber(mainResult, 6)}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
            >
              {currentCategorySpec.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Formula / Conversion Factor Banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs flex flex-wrap items-center justify-between gap-2 font-mono">
          <span className="text-slate-600 dark:text-slate-400">
            1 {fromUnitDef?.symbol} ={' '}
            <strong className="text-blue-600 dark:text-blue-400">
              {formatNumber(convertValue(1, fromUnit, toUnit), 6)} {toUnitDef?.symbol}
            </strong>
          </span>
          <span className="text-slate-400 text-[11px]">
            Base Unit: {currentCategorySpec.baseName}
          </span>
        </div>
      </div>

      {/* Live Simultaneous Equivalents Matrix */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-500" />
            All {currentCategorySpec.name} Equivalents for {value} {fromUnitDef?.symbol}
          </span>
          <span className="text-[11px] text-slate-400">Click any card to select as target unit</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {allEquivalents.map((item) => (
            <div
              key={item.id}
              onClick={() => setToUnit(item.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                toUnit === item.id
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="truncate pr-2">
                <div className="text-[11px] font-semibold text-slate-400 truncate">
                  {item.label}
                </div>
                <div className="text-sm font-black font-mono text-slate-900 dark:text-white truncate">
                  {item.formatted} <span className="text-xs text-blue-500">{item.symbol}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyVal(String(item.convertedValue), item.id);
                }}
                className="p-1.5 text-slate-400 hover:text-blue-500 rounded-lg transition"
                title="Copy value"
              >
                {copiedKey === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
