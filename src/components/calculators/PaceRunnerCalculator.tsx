import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface PaceRunnerCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PaceRunnerCalculator: React.FC<PaceRunnerCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [distanceKm, setDistanceKm] = useState<string>('10');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('50');
  const [seconds, setSeconds] = useState<string>('0');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.distanceKm !== undefined) setDistanceKm(String(initialPreset.distanceKm));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDistanceKm('10');
    setHours('0');
    setMinutes('50');
    setSeconds('0');
  };

  const calculate = () => {
    const dist = safeParseNumber(distanceKm, 0);
    const hrs = safeParseNumber(hours, 0);
    const mins = safeParseNumber(minutes, 0);
    const secs = safeParseNumber(seconds, 0);

    const totalSeconds = hrs * 3600 + mins * 60 + secs;

    if (dist <= 0 || totalSeconds <= 0) {
      return { isValid: false, msg: 'Distance and time must be greater than 0.' };
    }

    const secPerKm = totalSeconds / dist;
    const paceMinKm = Math.floor(secPerKm / 60);
    const paceSecKm = Math.round(secPerKm % 60);

    const distMiles = dist * 0.621371;
    const secPerMile = totalSeconds / distMiles;
    const paceMinMile = Math.floor(secPerMile / 60);
    const paceSecMile = Math.round(secPerMile % 60);

    const speedKmh = dist / (totalSeconds / 3600);
    const speedMph = distMiles / (totalSeconds / 3600);

    // Riegel's formula prediction for marathon (42.195km)
    const marathonSec = totalSeconds * Math.pow(42.195 / dist, 1.06);
    const marathonHrs = Math.floor(marathonSec / 3600);
    const marathonMins = Math.floor((marathonSec % 3600) / 60);

    return {
      isValid: true,
      msg: '',
      dist,
      distMiles,
      paceKm: `${paceMinKm}:${paceSecKm < 10 ? '0' : ''}${paceSecKm} /km`,
      paceMile: `${paceMinMile}:${paceSecMile < 10 ? '0' : ''}${paceSecMile} /mi`,
      speedKmh,
      speedMph,
      marathonPredicted: `${marathonHrs}h ${marathonMins}m`,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Running Pace: ${res.paceKm} (${res.paceMile})`,
        { distanceKm, hours, minutes, seconds },
        { paceKm: res.paceKm, paceMile: res.paceMile }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Run Distance & Total Time
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="distanceKm" label="Distance (km)" suffix="km" value={distanceKm} onChange={setDistanceKm} min={0.1} />
          <CalcInput id="hours" label="Hours" value={hours} onChange={setHours} min={0} />
          <CalcInput id="minutes" label="Minutes" value={minutes} onChange={setMinutes} min={0} max={59} />
          <CalcInput id="seconds" label="Seconds" value={seconds} onChange={setSeconds} min={0} max={59} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Pace per Kilometer"
              value={res.paceKm}
              subtitle="min/km"
              highlighted={true}
            />
            <CalcResultCard
              title="Pace per Mile"
              value={res.paceMile}
              subtitle="min/mile"
            />
            <CalcResultCard
              title="Average Speed"
              value={`${formatNumber(res.speedKmh, 2)} km/h`}
              subtitle={`${formatNumber(res.speedMph, 2)} mph`}
            />
            <CalcResultCard
              title="Predicted Marathon Time"
              value={res.marathonPredicted}
              subtitle="Riegel's endurance formula"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Riegel formula: T2 = T1 × (D2 / D1)^1.06 models athletic stamina fatigue over distance.</span>
            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
              >
                Save Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
