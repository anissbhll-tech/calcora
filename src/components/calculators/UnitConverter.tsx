import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { CalculationHistoryItem } from '../../types';

interface UnitConverterProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
}

type UnitCategory = 'length' | 'mass' | 'temperature' | 'volume' | 'area' | 'speed' | 'digital' | 'currency';

interface UnitDef {
  id: string;
  label: string;
  ratioToBase: number; // relative to SI base / USD
}

const UNIT_SPECS: Record<UnitCategory, { name: string; units: UnitDef[] }> = {
  length: {
    name: 'Length & Distance',
    units: [
      { id: 'm', label: 'Meters (m)', ratioToBase: 1 },
      { id: 'km', label: 'Kilometers (km)', ratioToBase: 1000 },
      { id: 'cm', label: 'Centimeters (cm)', ratioToBase: 0.01 },
      { id: 'mm', label: 'Millimeters (mm)', ratioToBase: 0.001 },
      { id: 'mi', label: 'Miles (mi)', ratioToBase: 1609.344 },
      { id: 'yd', label: 'Yards (yd)', ratioToBase: 0.9144 },
      { id: 'ft', label: 'Feet (ft)', ratioToBase: 0.3048 },
      { id: 'in', label: 'Inches (in)', ratioToBase: 0.0254 },
    ],
  },
  mass: {
    name: 'Mass & Weight',
    units: [
      { id: 'kg', label: 'Kilograms (kg)', ratioToBase: 1 },
      { id: 'g', label: 'Grams (g)', ratioToBase: 0.001 },
      { id: 'mg', label: 'Milligrams (mg)', ratioToBase: 0.000001 },
      { id: 'lb', label: 'Pounds (lbs)', ratioToBase: 0.45359237 },
      { id: 'oz', label: 'Ounces (oz)', ratioToBase: 0.028349523125 },
      { id: 'ton', label: 'Metric Tons (t)', ratioToBase: 1000 },
    ],
  },
  temperature: {
    name: 'Temperature',
    units: [
      { id: 'c', label: 'Celsius (°C)', ratioToBase: 1 },
      { id: 'f', label: 'Fahrenheit (°F)', ratioToBase: 1 },
      { id: 'k', label: 'Kelvin (K)', ratioToBase: 1 },
    ],
  },
  volume: {
    name: 'Volume & Capacity',
    units: [
      { id: 'l', label: 'Liters (L)', ratioToBase: 1 },
      { id: 'ml', label: 'Milliliters (mL)', ratioToBase: 0.001 },
      { id: 'gal', label: 'US Gallons (gal)', ratioToBase: 3.78541 },
      { id: 'qt', label: 'US Quarts (qt)', ratioToBase: 0.946353 },
      { id: 'pt', label: 'US Pints (pt)', ratioToBase: 0.473176 },
      { id: 'cup', label: 'US Cups', ratioToBase: 0.24 },
      { id: 'floz', label: 'Fluid Ounces (fl oz)', ratioToBase: 0.0295735 },
    ],
  },
  area: {
    name: 'Area',
    units: [
      { id: 'sqm', label: 'Square Meters (m²)', ratioToBase: 1 },
      { id: 'sqkm', label: 'Square Kilometers (km²)', ratioToBase: 1000000 },
      { id: 'sqft', label: 'Square Feet (ft²)', ratioToBase: 0.092903 },
      { id: 'sqin', label: 'Square Inches (in²)', ratioToBase: 0.00064516 },
      { id: 'acre', label: 'Acres', ratioToBase: 4046.86 },
      { id: 'hectare', label: 'Hectares (ha)', ratioToBase: 10000 },
    ],
  },
  speed: {
    name: 'Speed & Velocity',
    units: [
      { id: 'mps', label: 'Meters / second (m/s)', ratioToBase: 1 },
      { id: 'kph', label: 'Kilometers / hour (km/h)', ratioToBase: 0.277778 },
      { id: 'mph', label: 'Miles / hour (mph)', ratioToBase: 0.44704 },
      { id: 'knot', label: 'Knots (kn)', ratioToBase: 0.514444 },
    ],
  },
  digital: {
    name: 'Digital Data Storage',
    units: [
      { id: 'b', label: 'Bytes (B)', ratioToBase: 1 },
      { id: 'kb', label: 'Kilobytes (KB)', ratioToBase: 1024 },
      { id: 'mb', label: 'Megabytes (MB)', ratioToBase: 1048576 },
      { id: 'gb', label: 'Gigabytes (GB)', ratioToBase: 1073741824 },
      { id: 'tb', label: 'Terabytes (TB)', ratioToBase: 1099511627776 },
    ],
  },
  currency: {
    name: 'Currency (Static Rates)',
    units: [
      { id: 'usd', label: 'US Dollar (USD)', ratioToBase: 1.0 },
      { id: 'eur', label: 'Euro (EUR)', ratioToBase: 0.92 },
      { id: 'gbp', label: 'British Pound (GBP)', ratioToBase: 0.79 },
      { id: 'jpy', label: 'Japanese Yen (JPY)', ratioToBase: 155.5 },
      { id: 'cad', label: 'Canadian Dollar (CAD)', ratioToBase: 1.36 },
      { id: 'aud', label: 'Australian Dollar (AUD)', ratioToBase: 1.52 },
      { id: 'chf', label: 'Swiss Franc (CHF)', ratioToBase: 0.89 },
      { id: 'inr', label: 'Indian Rupee (INR)', ratioToBase: 83.5 },
      { id: 'cny', label: 'Chinese Yuan (CNY)', ratioToBase: 7.23 },
    ],
  },
};

export const UnitConverter: React.FC<UnitConverterProps> = ({ onAddHistory }) => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [value, setValue] = useState<number>(10);

  const currentCategoryUnits = UNIT_SPECS[category].units;

  // Handle unit swap
  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Convert
  let result = 0;
  if (category === 'temperature') {
    if (fromUnit === 'c' && toUnit === 'f') result = (value * 9) / 5 + 32;
    else if (fromUnit === 'f' && toUnit === 'c') result = ((value - 32) * 5) / 9;
    else if (fromUnit === 'c' && toUnit === 'k') result = value + 273.15;
    else if (fromUnit === 'k' && toUnit === 'c') result = value - 273.15;
    else if (fromUnit === 'f' && toUnit === 'k') result = ((value - 32) * 5) / 9 + 273.15;
    else if (fromUnit === 'k' && toUnit === 'f') result = ((value - 273.15) * 9) / 5 + 32;
    else result = value;
  } else {
    const fromDef = currentCategoryUnits.find((u) => u.id === fromUnit);
    const toDef = currentCategoryUnits.find((u) => u.id === toUnit);

    if (fromDef && toDef) {
      const baseValue = value * fromDef.ratioToBase;
      result = baseValue / toDef.ratioToBase;
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center pb-2 border-b border-slate-100 dark:border-slate-800">
        {(Object.keys(UNIT_SPECS) as UnitCategory[]).map((catKey) => (
          <button
            key={catKey}
            onClick={() => {
              setCategory(catKey);
              setFromUnit(UNIT_SPECS[catKey].units[0].id);
              setToUnit(UNIT_SPECS[catKey].units[1].id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              category === catKey
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {UNIT_SPECS[catKey].name}
          </button>
        ))}
      </div>

      {/* Converter Workspace */}
      <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
        
        {/* From Input */}
        <div className="sm:col-span-5 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">From</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full text-xl font-mono font-bold p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold"
          >
            {currentCategoryUnits.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="sm:col-span-1 flex justify-center py-2">
          <button
            onClick={handleSwap}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition shadow-md shadow-blue-500/20"
            title="Swap units"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        {/* To Output */}
        <div className="sm:col-span-5 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">To (Result)</label>
          <div className="w-full text-xl font-mono font-bold p-3 bg-blue-50 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-800 rounded-2xl truncate">
            {Number.isInteger(result) ? result : parseFloat(result.toFixed(6))}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold"
          >
            {currentCategoryUnits.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
};
