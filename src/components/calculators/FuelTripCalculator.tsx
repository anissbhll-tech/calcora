import React, { useState } from 'react';

export const FuelTripCalculator: React.FC = () => {
  const [distance, setDistance] = useState<number>(300);
  const [mpg, setMpg] = useState<number>(28);
  const [fuelPrice, setFuelPrice] = useState<number>(3.65);
  const [passengers, setPassengers] = useState<number>(3);

  const fuelConsumedGallons = mpg > 0 ? distance / mpg : 0;
  const totalCost = fuelConsumedGallons * fuelPrice;
  const costPerPassenger = passengers > 0 ? totalCost / passengers : totalCost;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Trip Distance (miles)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Fuel Economy (MPG)</label>
            <input
              type="number"
              value={mpg}
              onChange={(e) => setMpg(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gas Price ($/gal)</label>
            <input
              type="number"
              step={0.05}
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Passengers Split</label>
          <input
            type="number"
            min={1}
            value={passengers}
            onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Trip Gas Cost</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 font-mono">
            ${totalCost.toFixed(2)}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Cost per Passenger ({passengers} people):</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">${costPerPassenger.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Gasoline Consumed:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{fuelConsumedGallons.toFixed(1)} gallons</span>
          </div>
        </div>
      </div>
    </div>
  );
};
