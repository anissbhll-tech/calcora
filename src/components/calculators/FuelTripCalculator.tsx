import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Fuel, Zap, Sparkles, Copy, Check, Users, Car, Navigation, Route } from 'lucide-react';

type TripMode = 'roadtrip' | 'ev_vs_gas' | 'commute';

const FUEL_PRESETS = [
  { name: 'Weekend Mountain Trip', dist: 320, mpg: 28, price: 3.65, tolls: 15, passengers: 3, desc: '320 miles, 3 passengers' },
  { name: 'Cross-Country Road Trip', dist: 2800, mpg: 26, price: 3.85, tolls: 65, passengers: 4, desc: '2,800 miles, 4 passengers' },
  { name: 'Daily Suburban Commute', dist: 25, mpg: 24, price: 3.60, tolls: 4, passengers: 1, desc: '25 miles one-way daily' },
  { name: 'Hybrid Highway Cruise', dist: 500, mpg: 52, price: 3.75, tolls: 10, passengers: 2, desc: '52 MPG ultra-efficient' },
];

export const FuelTripCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [mode, setMode] = useState<TripMode>('roadtrip');

  // Road Trip Mode
  const [distance, setDistance] = useState<number>(450);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [fuelEconomyMpg, setFuelEconomyMpg] = useState<number>(28);
  const [fuelPricePerGallon, setFuelPricePerGallon] = useState<number>(3.65);
  const [tollCost, setTollCost] = useState<number>(18.5);
  const [passengers, setPassengers] = useState<number>(3);

  // EV vs Gas Mode
  const [comparisonDistance, setComparisonDistance] = useState<number>(1000);
  const [gasMpg, setGasMpg] = useState<number>(26);
  const [gasPrice, setGasPrice] = useState<number>(3.75);
  const [evKwhPer100Mi, setEvKwhPer100Mi] = useState<number>(30); // ~30 kWh / 100 mi (Model 3 / Ioniq)
  const [electricityRatePerKwh, setElectricityRatePerKwh] = useState<number>(0.16); // $0.16 / kWh

  // Commute Mode
  const [oneWayCommuteMiles, setOneWayCommuteMiles] = useState<number>(22);
  const [workDaysPerYear, setWorkDaysPerYear] = useState<number>(240);
  const [commuteMpg, setCommuteMpg] = useState<number>(27);
  const [commuteGasPrice, setCommuteGasPrice] = useState<number>(3.65);
  const [dailyTolls, setDailyTolls] = useState<number>(3.5);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.mode) setMode(initialPreset.mode);
      if (initialPreset.distance !== undefined) setDistance(initialPreset.distance);
      if (initialPreset.fuelPricePerGallon !== undefined) setFuelPricePerGallon(initialPreset.fuelPricePerGallon);
    }
  }, [initialPreset]);

  // Calculations for Roadtrip
  const roadtripResults = useMemo(() => {
    const rawDist = Math.max(0, safeParseNumber(distance, 0));
    const totalDist = isRoundTrip ? rawDist * 2 : rawDist;
    const mpg = Math.max(0.1, safeParseNumber(fuelEconomyMpg, 28));
    const gasPrice = Math.max(0, safeParseNumber(fuelPricePerGallon, 0));
    const tolls = Math.max(0, safeParseNumber(tollCost, 0));
    const pax = Math.max(1, Math.floor(safeParseNumber(passengers, 1)));

    const gallonsNeeded = totalDist / mpg;
    const fuelCost = gallonsNeeded * gasPrice;
    const grandTotal = fuelCost + tolls;
    const costPerPerson = grandTotal / pax;
    const fuelPerPerson = fuelCost / pax;
    const costPerMile = totalDist > 0 ? grandTotal / totalDist : 0;

    return {
      totalDist,
      gallonsNeeded,
      fuelCost,
      tolls,
      grandTotal,
      costPerPerson,
      fuelPerPerson,
      costPerMile,
      pax,
    };
  }, [distance, isRoundTrip, fuelEconomyMpg, fuelPricePerGallon, tollCost, passengers]);

  // Calculations for EV vs Gas
  const evVsGasResults = useMemo(() => {
    const dist = Math.max(0, safeParseNumber(comparisonDistance, 0));
    const gMpg = Math.max(0.1, safeParseNumber(gasMpg, 26));
    const gPrice = Math.max(0, safeParseNumber(gasPrice, 0));
    const evRate = Math.max(0, safeParseNumber(evKwhPer100Mi, 30));
    const kwhPrice = Math.max(0, safeParseNumber(electricityRatePerKwh, 0.16));

    const gasGallons = dist / gMpg;
    const totalGasCost = gasGallons * gPrice;

    const totalKwh = (dist / 100) * evRate;
    const totalEvCost = totalKwh * kwhPrice;

    const savings = totalGasCost - totalEvCost;
    const savingsPct = totalGasCost > 0 ? (savings / totalGasCost) * 100 : 0;

    return {
      dist,
      gasGallons,
      totalGasCost,
      totalKwh,
      totalEvCost,
      savings,
      savingsPct,
      gasCostPerMile: dist > 0 ? totalGasCost / dist : 0,
      evCostPerMile: dist > 0 ? totalEvCost / dist : 0,
    };
  }, [comparisonDistance, gasMpg, gasPrice, evKwhPer100Mi, electricityRatePerKwh]);

  // Calculations for Annual Commute
  const commuteResults = useMemo(() => {
    const oneWay = Math.max(0, safeParseNumber(oneWayCommuteMiles, 0));
    const days = Math.max(0, safeParseNumber(workDaysPerYear, 240));
    const mpg = Math.max(0.1, safeParseNumber(commuteMpg, 27));
    const price = Math.max(0, safeParseNumber(commuteGasPrice, 3.65));
    const tollsDaily = Math.max(0, safeParseNumber(dailyTolls, 0));

    const dailyMiles = oneWay * 2;
    const annualMiles = dailyMiles * days;
    const annualGallons = annualMiles / mpg;
    const annualFuelCost = annualGallons * price;
    const annualTollCost = tollsDaily * days;
    const totalAnnualCommute = annualFuelCost + annualTollCost;
    const monthlyAverage = totalAnnualCommute / 12;

    return {
      dailyMiles,
      annualMiles,
      annualGallons,
      annualFuelCost,
      annualTollCost,
      totalAnnualCommute,
      monthlyAverage,
    };
  }, [oneWayCommuteMiles, workDaysPerYear, commuteMpg, commuteGasPrice, dailyTolls]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyPreset = (p: typeof FUEL_PRESETS[0]) => {
    setMode('roadtrip');
    setDistance(p.dist);
    setIsRoundTrip(false);
    setFuelEconomyMpg(p.mpg);
    setFuelPricePerGallon(p.price);
    setTollCost(p.tolls);
    setPassengers(p.passengers);
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('roadtrip')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'roadtrip'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Road Trip Cost &amp; Carpool Split
        </button>

        <button
          type="button"
          onClick={() => setMode('ev_vs_gas')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'ev_vs_gas'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Electric Vehicle vs Gas Comparison
        </button>

        <button
          type="button"
          onClick={() => setMode('commute')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'commute'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Annual Work Commute Budget
        </button>
      </div>

      {/* Presets */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-500" />
          Popular Trip Scenarios
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FUEL_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="p-2 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition text-xs"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode 1: Road Trip & Carpool */}
      {mode === 'roadtrip' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Route className="w-4 h-4 text-blue-500" />
                Route &amp; Fuel Parameters
              </h3>

              <div className="space-y-3">
                <CalcInput
                  id="distance"
                  label="One-Way Distance (Miles)"
                  value={distance}
                  onChange={setDistance}
                  min={1}
                  step={5}
                  suffix="mi"
                />

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={isRoundTrip}
                    onChange={(e) => setIsRoundTrip(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Round Trip (Doubles total distance to {distance * 2} miles)
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <CalcInput
                    id="mpg"
                    label="Vehicle Fuel Economy"
                    value={fuelEconomyMpg}
                    onChange={setFuelEconomyMpg}
                    min={1}
                    step={1}
                    suffix="MPG"
                  />
                  <CalcInput
                    id="gasPrice"
                    label="Gas Price ($/Gallon)"
                    value={fuelPricePerGallon}
                    onChange={setFuelPricePerGallon}
                    min={0.5}
                    step={0.05}
                    prefix="$"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <CalcInput
                    id="tolls"
                    label="Highway Tolls / Parking"
                    value={tollCost}
                    onChange={setTollCost}
                    min={0}
                    step={1}
                    prefix="$"
                  />
                  <CalcInput
                    id="passengers"
                    label="Number of Travelers"
                    value={passengers}
                    onChange={setPassengers}
                    min={1}
                    step={1}
                    suffix="people"
                  />
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total Estimated Trip Cost
                  </span>
                  <button
                    type="button"
                    onClick={() => copyVal(formatNumber(roadtripResults.grandTotal, 2), 'total')}
                    className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 font-semibold"
                  >
                    {copiedKey === 'total' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'total' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="text-4xl sm:text-5xl font-black font-mono text-blue-600 dark:text-blue-400">
                  ${formatNumber(roadtripResults.grandTotal, 2)}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-mono">
                  <Users className="w-3.5 h-3.5" />
                  Split Among {roadtripResults.pax}: ${formatNumber(roadtripResults.costPerPerson, 2)} per person
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Total Distance Traveled:</span>
                  <strong className="text-slate-900 dark:text-white">{roadtripResults.totalDist.toLocaleString()} miles</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Fuel Consumed:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {formatNumber(roadtripResults.gallonsNeeded, 1)} gallons
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Gasoline Cost:</span>
                  <strong className="text-slate-900 dark:text-white">${formatNumber(roadtripResults.fuelCost, 2)}</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Tolls &amp; Fees:</span>
                  <strong className="text-slate-900 dark:text-white">${formatNumber(roadtripResults.tolls, 2)}</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-sans">Effective Cost per Mile:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    ${formatNumber(roadtripResults.costPerMile, 2)}/mi
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CalcResultCard
              title="Per-Person Share"
              value={`$${formatNumber(roadtripResults.costPerPerson, 2)}`}
              subtitle={`For ${roadtripResults.pax} travelers`}
              highlighted={true}
            />

            <CalcResultCard
              title="Gasoline Expense"
              value={`$${formatNumber(roadtripResults.fuelCost, 2)}`}
              subtitle={`${formatNumber(roadtripResults.gallonsNeeded, 1)} gal`}
            />

            <CalcResultCard
              title="Tolls &amp; Fees"
              value={`$${formatNumber(roadtripResults.tolls, 2)}`}
              subtitle="Turnpikes & bridges"
            />

            <CalcResultCard
              title="Cost per Mile"
              value={`$${formatNumber(roadtripResults.costPerMile, 2)}`}
              subtitle="All-inclusive rate"
            />
          </div>
        </div>
      )}

      {/* Mode 2: EV vs Gas */}
      {mode === 'ev_vs_gas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-500" />
                Vehicle Efficiency Comparison
              </h3>

              <CalcInput
                id="comparisonDistance"
                label="Driving Distance Analyzed (Miles)"
                value={comparisonDistance}
                onChange={setComparisonDistance}
                min={10}
                step={50}
                suffix="mi"
              />

              <div className="grid grid-cols-2 gap-3 pt-2">
                <CalcInput
                  id="gasMpg"
                  label="Gas Car MPG"
                  value={gasMpg}
                  onChange={setGasMpg}
                  min={5}
                  step={1}
                  suffix="MPG"
                />
                <CalcInput
                  id="gasPrice"
                  label="Gas Price ($/gal)"
                  value={gasPrice}
                  onChange={setGasPrice}
                  min={1}
                  step={0.05}
                  prefix="$"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="evKwh"
                  label="EV Consumption Rate"
                  value={evKwhPer100Mi}
                  onChange={setEvKwhPer100Mi}
                  min={10}
                  step={1}
                  suffix="kWh/100mi"
                />
                <CalcInput
                  id="kwhPrice"
                  label="Electricity Rate ($/kWh)"
                  value={electricityRatePerKwh}
                  onChange={setElectricityRatePerKwh}
                  min={0.05}
                  step={0.01}
                  prefix="$"
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total EV Fuel Savings
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  ${formatNumber(evVsGasResults.savings, 2)}
                </div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  EV saves {formatNumber(evVsGasResults.savingsPct, 1)}% on energy costs over {evVsGasResults.dist.toLocaleString()} miles.
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-slate-400 font-sans block">Gasoline Car</span>
                  <strong className="text-slate-900 dark:text-white text-base block">
                    ${formatNumber(evVsGasResults.totalGasCost, 2)}
                  </strong>
                  <span className="text-[10px] text-slate-500">${formatNumber(evVsGasResults.gasCostPerMile, 3)}/mile</span>
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans block">Electric Car (EV)</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 text-base block">
                    ${formatNumber(evVsGasResults.totalEvCost, 2)}
                  </strong>
                  <span className="text-[10px] text-slate-500">${formatNumber(evVsGasResults.evCostPerMile, 3)}/mile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Annual Commute */}
      {mode === 'commute' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-500" />
                Work Commute Parameters
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="oneWay"
                  label="One-Way Commute (Miles)"
                  value={oneWayCommuteMiles}
                  onChange={setOneWayCommuteMiles}
                  min={1}
                  step={1}
                  suffix="mi"
                />
                <CalcInput
                  id="workDays"
                  label="Work Days / Year"
                  value={workDaysPerYear}
                  onChange={setWorkDaysPerYear}
                  min={1}
                  step={5}
                  suffix="days"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalcInput
                  id="commuteMpg"
                  label="Car MPG"
                  value={commuteMpg}
                  onChange={setCommuteMpg}
                  min={5}
                  step={1}
                  suffix="MPG"
                />
                <CalcInput
                  id="commuteGasPrice"
                  label="Gas Price ($/gal)"
                  value={commuteGasPrice}
                  onChange={setCommuteGasPrice}
                  min={1}
                  step={0.05}
                  prefix="$"
                />
              </div>

              <CalcInput
                id="dailyTolls"
                label="Daily Tolls &amp; Parking ($/day)"
                value={dailyTolls}
                onChange={setDailyTolls}
                min={0}
                step={0.5}
                prefix="$"
              />
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Annual Total Commute Expense
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-amber-600 dark:text-amber-400">
                  ${formatNumber(commuteResults.totalAnnualCommute, 2)}
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Equals ~${formatNumber(commuteResults.monthlyAverage, 2)} per month
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Annual Commute Miles:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {commuteResults.annualMiles.toLocaleString()} miles
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Annual Gasoline Gallons:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {formatNumber(commuteResults.annualGallons, 0)} gal
                  </strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Annual Gas Expense:</span>
                  <strong className="text-slate-900 dark:text-white">${formatNumber(commuteResults.annualFuelCost, 2)}</strong>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-sans">Annual Tolls &amp; Parking:</span>
                  <strong className="text-slate-900 dark:text-white">${formatNumber(commuteResults.annualTollCost, 2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
