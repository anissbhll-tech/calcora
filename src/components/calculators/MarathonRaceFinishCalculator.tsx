import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber } from '../../lib/mathUtils';
import { Timer, Trophy, Activity, Gauge, Flame, Zap, ArrowUpRight, Compass, CheckCircle2 } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type BaseDistance = '1mi' | '5k' | '10k' | '10mi' | 'half' | 'marathon';
type TargetDistance = '5k' | '10k' | '10mi' | 'half' | 'marathon' | '50k';
type MileageTier = 'low' | 'moderate' | 'high'; // low: <25mpw, moderate: 25-45mpw, high: 45+mpw

const DISTANCE_METERS: Record<string, number> = {
  '1mi': 1609.34,
  '5k': 5000,
  '10k': 10000,
  '10mi': 16093.4,
  'half': 21097.5,
  'marathon': 42195,
  '50k': 50000,
};

const DISTANCE_LABELS: Record<string, string> = {
  '1mi': '1 Mile (1.61 km)',
  '5k': '5K (3.11 miles)',
  '10k': '10K (6.21 miles)',
  '10mi': '10 Miles (16.09 km)',
  'half': 'Half Marathon (13.11 mi / 21.1 km)',
  'marathon': 'Full Marathon (26.22 mi / 42.2 km)',
  '50k': '50K Ultra Marathon (31.07 miles)',
};

const EXPONENT_BY_MILEAGE: Record<MileageTier, number> = {
  high: 1.05, // well-trained endurance base
  moderate: 1.06, // standard Riegel benchmark
  low: 1.08, // undertrained / higher aerobic fatigue
};

function formatTimeHHMMSS(totalSeconds: number): string {
  const rounded = Math.round(totalSeconds);
  const hrs = Math.floor(rounded / 3600);
  const mins = Math.floor((rounded % 3600) / 60);
  const secs = rounded % 60;
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatPace(paceSecPerUnit: number): string {
  const mins = Math.floor(paceSecPerUnit / 60);
  const secs = Math.round(paceSecPerUnit % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const MarathonRaceFinishCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [baseDistance, setBaseDistance] = useState<BaseDistance>('5k');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(22);
  const [seconds, setSeconds] = useState<number>(30);
  const [mileageTier, setMileageTier] = useState<MileageTier>('moderate');
  const [targetDistance, setTargetDistance] = useState<TargetDistance>('marathon');

  const calculation = useMemo(() => {
    const h = Math.max(0, safeParseNumber(hours, 0));
    const m = Math.max(0, safeParseNumber(minutes, 0));
    const s = Math.max(0, safeParseNumber(seconds, 0));
    const baseTotalSec = Math.max(60, h * 3600 + m * 60 + s);

    const d1 = DISTANCE_METERS[baseDistance];
    const exponent = EXPONENT_BY_MILEAGE[mileageTier];

    // Base pace
    const basePaceMileSec = baseTotalSec / (d1 / 1609.34);
    const basePaceKmSec = baseTotalSec / (d1 / 1000);

    // Predict across standard events using Riegel formula: T2 = T1 * (D2 / D1)^exponent
    const standardDistances: TargetDistance[] = ['5k', '10k', '10mi', 'half', 'marathon', '50k'];
    const predictions = standardDistances.map((distKey) => {
      const d2 = DISTANCE_METERS[distKey];
      const predictedSec = baseTotalSec * Math.pow(d2 / d1, exponent);
      const miles = d2 / 1609.34;
      const km = d2 / 1000;
      const paceMileSec = predictedSec / miles;
      const paceKmSec = predictedSec / km;

      return {
        key: distKey,
        name: DISTANCE_LABELS[distKey],
        miles: Number(miles.toFixed(2)),
        km: Number(km.toFixed(2)),
        timeFormatted: formatTimeHHMMSS(predictedSec),
        paceMileFormatted: `${formatPace(paceMileSec)} /mi`,
        paceKmFormatted: `${formatPace(paceKmSec)} /km`,
        totalSeconds: predictedSec,
      };
    });

    const targetPred = predictions.find((p) => p.key === targetDistance) || predictions[4];

    // 5K split breakdown for the target distance
    const targetKm = DISTANCE_METERS[targetDistance] / 1000;
    const splitCount = Math.ceil(targetKm / 5);
    const splits = [];
    let accumSec = 0;
    const avgSecPerKm = targetPred.totalSeconds / targetKm;

    for (let i = 1; i <= splitCount; i++) {
      const splitKm = Math.min(5, targetKm - (i - 1) * 5);
      const splitSec = splitKm * avgSecPerKm;
      accumSec += splitSec;
      splits.push({
        splitName: i === splitCount && splitKm < 5 ? `Final ${splitKm.toFixed(2)} km` : `${(i - 1) * 5}k - ${i * 5}k`,
        splitTime: formatTimeHHMMSS(splitSec),
        accumulatedTime: formatTimeHHMMSS(accumSec),
      });
    }

    return {
      baseTotalSec,
      baseFormatted: formatTimeHHMMSS(baseTotalSec),
      basePaceMile: `${formatPace(basePaceMileSec)} /mi`,
      basePaceKm: `${formatPace(basePaceKmSec)} /km`,
      predictions,
      targetPred,
      splits,
      exponent,
    };
  }, [baseDistance, hours, minutes, seconds, mileageTier, targetDistance]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Race Prediction: ${DISTANCE_LABELS[baseDistance]} in ${calculation.baseFormatted} predicts Marathon in ${calculation.predictions.find((p) => p.key === 'marathon')?.timeFormatted}`,
        {
          baseDistance,
          hours,
          minutes,
          seconds,
          mileageTier,
          targetDistance,
        },
        {
          predictedTime: calculation.targetPred.timeFormatted,
          pacePerMile: calculation.targetPred.paceMileFormatted,
          pacePerKm: calculation.targetPred.paceKmFormatted,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-amber-50 dark:from-teal-950/30 dark:to-amber-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Marathon &amp; Endurance Race Time Predictor (Pete Riegel Model)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Based on your {DISTANCE_LABELS[baseDistance]} baseline of{' '}
            <strong className="font-mono font-bold text-teal-700 dark:text-teal-300">{calculation.baseFormatted}</strong>{' '}
            ({calculation.basePaceMile}), your predicted{' '}
            <strong className="text-amber-700 dark:text-amber-300 font-bold">
              {calculation.targetPred.name}
            </strong>{' '}
            finish time is{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono text-base">
              {calculation.targetPred.timeFormatted}
            </strong>{' '}
            at an average pace of{' '}
            <strong className="font-mono font-bold text-slate-900 dark:text-white">
              {calculation.targetPred.paceMileFormatted}
            </strong>{' '}
            ({calculation.targetPred.paceKmFormatted}).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Predicted Finish
            </span>
            <span className="text-xl font-black font-mono text-teal-600 dark:text-teal-400">
              {calculation.targetPred.timeFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Baseline Time & Distance Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Recent Performance Baseline */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Timer className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Recent Baseline Race or Time Trial
            </h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Baseline Race Distance
            </label>
            <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {(['1mi', '5k', '10k', '10mi', 'half', 'marathon'] as BaseDistance[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setBaseDistance(d)}
                  className={`py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    baseDistance === d
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Recent Time Achieved (HH : MM : SS)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <CalcInput
                id="hours"
                label="Hours"
                value={hours}
                onChange={(val) => setHours(val)}
                min={0}
                max={24}
                step={1}
              />
              <CalcInput
                id="minutes"
                label="Minutes"
                value={minutes}
                onChange={(val) => setMinutes(val)}
                min={0}
                max={59}
                step={1}
              />
              <CalcInput
                id="seconds"
                label="Seconds"
                value={seconds}
                onChange={(val) => setSeconds(val)}
                min={0}
                max={59}
                step={1}
              />
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center">
            <span className="text-slate-500 font-semibold">Baseline Pace:</span>
            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
              {calculation.basePaceMile} ({calculation.basePaceKm})
            </span>
          </div>
        </div>

        {/* Right: Training Volume & Target Race Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Training Volume &amp; Target Goal
            </h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Weekly Running Mileage Base (Fatigue Curve)
            </label>
            <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setMileageTier('low')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  mileageTier === 'low' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                &lt; 25 MPW (1.08)
              </button>
              <button
                type="button"
                onClick={() => setMileageTier('moderate')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  mileageTier === 'moderate' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                25-45 MPW (1.06)
              </button>
              <button
                type="button"
                onClick={() => setMileageTier('high')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  mileageTier === 'high' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                45+ MPW (1.05)
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Higher weekly mileage minimizes cardiovascular decoupling and late-race cardiac drift.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Target Target Distance to Plan
            </label>
            <select
              value={targetDistance}
              onChange={(e) => setTargetDistance(e.target.value as TargetDistance)}
              className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
            >
              <option value="5k">5K (3.11 miles)</option>
              <option value="10k">10K (6.21 miles)</option>
              <option value="10mi">10 Miles (16.09 km)</option>
              <option value="half">Half Marathon (13.11 miles)</option>
              <option value="marathon">Full Marathon (26.22 miles)</option>
              <option value="50k">50K Ultra Marathon (31.07 miles)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Full Race Distance Prediction Equivalency Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-teal-500" />
          Equivalent Race Performance Spectrum (All Major Distances)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Race Distance</th>
                <th className="py-2.5 px-3 font-semibold">Miles / Km</th>
                <th className="py-2.5 px-3 font-semibold">Predicted Time</th>
                <th className="py-2.5 px-3 font-semibold">Pace / Mile</th>
                <th className="py-2.5 px-3 font-semibold">Pace / Km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.predictions.map((p) => {
                const isSelected = p.key === targetDistance;
                return (
                  <tr
                    key={p.key}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                      isSelected ? 'bg-teal-50/50 dark:bg-teal-950/30 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
                      {p.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                      {p.miles} mi ({p.km} km)
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                      {p.timeFormatted}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                      {p.paceMileFormatted}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {p.paceKmFormatted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target Race 5K Split Strategy Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-500" />
          5K Pacing &amp; Elapsed Split Plan for {calculation.targetPred.name}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Checkpoint / Split</th>
                <th className="py-2.5 px-3 font-semibold">Segment Split Time</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative Clock Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.splits.map((split, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    {split.splitName}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                    {split.splitTime}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    {split.accumulatedTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
