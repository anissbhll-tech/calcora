import React, { useState, useMemo, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Heart, Activity, Flame, Zap, ShieldAlert, Sparkles, User, Info, Compass } from 'lucide-react';
import { BaseCalculatorProps } from './index';

type FormulaType = 'tanaka' | 'karvonen' | 'fox' | 'gulati' | 'gellish';

interface HeartZone {
  zone: number;
  name: string;
  intensityRange: string;
  minPct: number;
  maxPct: number;
  minBpm: number;
  maxBpm: number;
  primaryBenefit: string;
  fuelSource: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: React.ReactNode;
}

interface PresetProfile {
  id: string;
  name: string;
  age: number;
  restingHr: number;
  sex: 'male' | 'female';
  desc: string;
}

const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'young_endurance',
    name: 'Young Endurance Runner',
    age: 24,
    restingHr: 48,
    sex: 'male',
    desc: 'High aerobic conditioning with low resting pulse',
  },
  {
    id: 'fitness_loss',
    name: 'General Fitness & Fat Loss',
    age: 38,
    restingHr: 68,
    sex: 'female',
    desc: 'Moderate baseline looking for Zone 2 fat burn efficiency',
  },
  {
    id: 'master_athlete',
    name: 'Masters Competitive Athlete',
    age: 52,
    restingHr: 54,
    sex: 'male',
    desc: 'Experienced cyclist/triathlete training in threshold zones',
  },
  {
    id: 'active_senior',
    name: 'Active Senior Cardiac Health',
    age: 68,
    restingHr: 72,
    sex: 'female',
    desc: 'Low-impact cardiovascular conditioning & active recovery',
  },
];

export const TargetHeartRateCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [age, setAge] = useState<number>(30);
  const [restingHr, setRestingHr] = useState<number>(60);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>('tanaka');
  const [activeZone, setActiveZone] = useState<number>(2); // Default to Zone 2
  const [activePresetId, setActivePresetId] = useState<string>('custom');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.age !== undefined) setAge(initialPreset.age);
      if (initialPreset.restingHr !== undefined) setRestingHr(initialPreset.restingHr);
      if (initialPreset.sex !== undefined) setSex(initialPreset.sex);
      if (initialPreset.selectedFormula !== undefined) setSelectedFormula(initialPreset.selectedFormula);
    }
  }, [initialPreset]);

  const handleSelectPreset = (p: PresetProfile) => {
    setActivePresetId(p.id);
    setAge(p.age);
    setRestingHr(p.restingHr);
    setSex(p.sex);
    if (p.sex === 'female') {
      setSelectedFormula('gulati');
    } else {
      setSelectedFormula('tanaka');
    }
  };

  const calculation = useMemo(() => {
    const userAge = Math.min(100, Math.max(10, safeParseNumber(age, 30)));
    const userRhr = Math.min(120, Math.max(35, safeParseNumber(restingHr, 60)));

    // Maximum Heart Rate (HRmax) Models
    const foxMax = Math.round(220 - userAge);
    const tanakaMax = Math.round(208 - 0.7 * userAge);
    const gellishMax = Math.round(207 - 0.7 * userAge);
    const gulatiMax = Math.round(206 - 0.88 * userAge); // Validated for biological women

    let computedMaxHr = tanakaMax;
    if (selectedFormula === 'fox') computedMaxHr = foxMax;
    else if (selectedFormula === 'gellish') computedMaxHr = gellishMax;
    else if (selectedFormula === 'gulati') computedMaxHr = gulatiMax;
    else if (selectedFormula === 'karvonen') computedMaxHr = tanakaMax; // Uses Tanaka base for HRR

    const hrReserve = Math.max(0, computedMaxHr - userRhr);

    // Calculate 5 standard training zones via Karvonen Heart Rate Reserve (HRR)
    const zones: HeartZone[] = [
      {
        zone: 1,
        name: 'Active Recovery & Warm-Up',
        intensityRange: '50% – 60% HRR',
        minPct: 0.5,
        maxPct: 0.6,
        minBpm: Math.round(userRhr + hrReserve * 0.5),
        maxBpm: Math.round(userRhr + hrReserve * 0.6),
        primaryBenefit: 'Improves blood circulation, cellular recovery, and low-impact warmups.',
        fuelSource: '85% Fatty Acids / 15% Carbohydrates',
        colorClass: 'text-slate-600 dark:text-slate-300',
        bgClass: 'bg-slate-50 dark:bg-slate-800/80',
        borderClass: 'border-slate-300 dark:border-slate-700',
        icon: <Compass className="w-4 h-4 text-slate-500" />,
      },
      {
        zone: 2,
        name: 'Aerobic Base & Fat Burn',
        intensityRange: '60% – 70% HRR',
        minPct: 0.6,
        maxPct: 0.7,
        minBpm: Math.round(userRhr + hrReserve * 0.6),
        maxBpm: Math.round(userRhr + hrReserve * 0.7),
        primaryBenefit: 'Maximizes mitochondrial density, fat oxidation, and all-day endurance base.',
        fuelSource: '70% Fatty Acids / 30% Carbohydrates',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
        borderClass: 'border-emerald-300 dark:border-emerald-800',
        icon: <Flame className="w-4 h-4 text-emerald-500" />,
      },
      {
        zone: 3,
        name: 'Aerobic Tempo & Cardio Stamina',
        intensityRange: '70% – 80% HRR',
        minPct: 0.7,
        maxPct: 0.8,
        minBpm: Math.round(userRhr + hrReserve * 0.7),
        maxBpm: Math.round(userRhr + hrReserve * 0.8),
        primaryBenefit: 'Expands stroke volume, capillary perfusion, and steady-state marathon pacing.',
        fuelSource: '50% Carbohydrates / 50% Fatty Acids',
        colorClass: 'text-blue-600 dark:text-blue-400',
        bgClass: 'bg-blue-50 dark:bg-blue-950/40',
        borderClass: 'border-blue-300 dark:border-blue-800',
        icon: <Activity className="w-4 h-4 text-blue-500" />,
      },
      {
        zone: 4,
        name: 'Anaerobic Lactate Threshold',
        intensityRange: '80% – 90% HRR',
        minPct: 0.8,
        maxPct: 0.9,
        minBpm: Math.round(userRhr + hrReserve * 0.8),
        maxBpm: Math.round(userRhr + hrReserve * 0.9),
        primaryBenefit: 'Trains muscle buffering capacity and delays metabolic acidosis accumulation.',
        fuelSource: '80% Carbohydrates / 20% Fatty Acids',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-50 dark:bg-amber-950/40',
        borderClass: 'border-amber-300 dark:border-amber-800',
        icon: <Zap className="w-4 h-4 text-amber-500" />,
      },
      {
        zone: 5,
        name: 'VO2 Max & Peak Neuromuscular Power',
        intensityRange: '90% – 100% HRR',
        minPct: 0.9,
        maxPct: 1.0,
        minBpm: Math.round(userRhr + hrReserve * 0.9),
        maxBpm: computedMaxHr,
        primaryBenefit: 'Maximizes maximal oxygen uptake, sprint speed, and high-intensity interval power.',
        fuelSource: '95%+ Rapid Glycolytic Carbohydrates',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-50 dark:bg-rose-950/40',
        borderClass: 'border-rose-300 dark:border-rose-800',
        icon: <ShieldAlert className="w-4 h-4 text-rose-500" />,
      },
    ];

    const currentSelectedZone = zones.find((z) => z.zone === activeZone) || zones[1];

    return {
      userAge,
      userRhr,
      foxMax,
      tanakaMax,
      gellishMax,
      gulatiMax,
      computedMaxHr,
      hrReserve,
      zones,
      currentSelectedZone,
    };
  }, [age, restingHr, sex, selectedFormula, activeZone]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Max HR: ${calculation.computedMaxHr} BPM | Zone 2: ${calculation.zones[1].minBpm}–${calculation.zones[1].maxBpm} BPM`,
        { age, restingHr, sex, selectedFormula },
        {
          maxHr: calculation.computedMaxHr,
          hrReserve: calculation.hrReserve,
          zone1: `${calculation.zones[0].minBpm}-${calculation.zones[0].maxBpm}`,
          zone2: `${calculation.zones[1].minBpm}-${calculation.zones[1].maxBpm}`,
          zone3: `${calculation.zones[2].minBpm}-${calculation.zones[2].maxBpm}`,
          zone4: `${calculation.zones[3].minBpm}-${calculation.zones[3].maxBpm}`,
          zone5: `${calculation.zones[4].minBpm}-${calculation.zones[4].maxBpm}`,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Preset Profiles Header */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-rose-500" />
            Athlete &amp; Lifestyle Presets
          </span>
          <span className="text-[11px] text-slate-400">Click to autofill biometric profile</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_PROFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`p-2.5 text-left rounded-xl border transition ${
                activePresetId === p.id
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold truncate">{p.name}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1">
                Age {p.age} • RHR {p.restingHr} BPM
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Biometric Inputs */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <User className="w-4 h-4 text-rose-500" />
          Biometric Parameters &amp; Clinical Formulas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalcInput
            id="age"
            label="Age (Years)"
            value={age}
            onChange={(val) => {
              setAge(val);
              setActivePresetId('custom');
            }}
            min={10}
            max={100}
            step={1}
            suffix="yrs"
          />

          <CalcInput
            id="restingHr"
            label="Resting Heart Rate (RHR)"
            value={restingHr}
            onChange={(val) => {
              setRestingHr(val);
              setActivePresetId('custom');
            }}
            min={35}
            max={120}
            step={1}
            suffix="BPM"
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSex('male');
                  if (selectedFormula === 'gulati') setSelectedFormula('tanaka');
                }}
                className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition ${
                  sex === 'male'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => {
                  setSex('female');
                  setSelectedFormula('gulati');
                }}
                className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition ${
                  sex === 'female'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        {/* Formula Selection Buttons */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Max Heart Rate ($HR_{`{max}`}$) Estimation Model
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setSelectedFormula('tanaka')}
              className={`p-2.5 rounded-xl text-left border text-xs transition ${
                selectedFormula === 'tanaka'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 font-bold text-rose-900 dark:text-rose-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="font-bold">Tanaka Formula</div>
              <div className="text-[10px] text-slate-400">208 - (0.7 × Age) [Gold Standard]</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormula('gulati')}
              className={`p-2.5 rounded-xl text-left border text-xs transition ${
                selectedFormula === 'gulati'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 font-bold text-rose-900 dark:text-rose-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="font-bold">Gulati Formula</div>
              <div className="text-[10px] text-slate-400">206 - (0.88 × Age) [Women-Specific]</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormula('gellish')}
              className={`p-2.5 rounded-xl text-left border text-xs transition ${
                selectedFormula === 'gellish'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 font-bold text-rose-900 dark:text-rose-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="font-bold">Gellish Formula</div>
              <div className="text-[10px] text-slate-400">207 - (0.7 × Age)</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormula('fox')}
              className={`p-2.5 rounded-xl text-left border text-xs transition ${
                selectedFormula === 'fox'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 font-bold text-rose-900 dark:text-rose-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="font-bold">Fox &amp; Haskell</div>
              <div className="text-[10px] text-slate-400">220 - Age [Classic]</div>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Display: Computed Max HR & HR Reserve */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Estimated Maximum Heart Rate ($HR_{`{max}`}$)
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
              <span className="text-5xl font-black font-mono text-rose-600 dark:text-rose-400">
                {calculation.computedMaxHr}
              </span>
              <span className="text-lg font-bold text-slate-400">BPM</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-400 font-sans block text-[10px]">Resting Heart Rate</span>
              <strong className="text-base text-slate-900 dark:text-white font-mono">{calculation.userRhr} BPM</strong>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-400 font-sans block text-[10px]">Heart Rate Reserve (HRR)</span>
              <strong className="text-base text-blue-600 dark:text-blue-400 font-mono">{calculation.hrReserve} BPM</strong>
            </div>
          </div>
        </div>

        {/* Interactive Zone Focus Card */}
        <div className={`p-4 rounded-xl border ${calculation.currentSelectedZone.borderClass} ${calculation.currentSelectedZone.bgClass} space-y-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {calculation.currentSelectedZone.icon}
              <span className={`text-sm font-bold ${calculation.currentSelectedZone.colorClass}`}>
                Zone {calculation.currentSelectedZone.zone}: {calculation.currentSelectedZone.name}
              </span>
            </div>
            <span className="font-mono font-bold text-base bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
              {calculation.currentSelectedZone.minBpm} – {calculation.currentSelectedZone.maxBpm} BPM
            </span>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p><strong>Primary Physiological Benefit:</strong> {calculation.currentSelectedZone.primaryBenefit}</p>
            <p><strong>Substrate / Fuel Utilization:</strong> {calculation.currentSelectedZone.fuelSource}</p>
          </div>
        </div>
      </div>

      {/* 5-Zone Scientific Matrix */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-rose-500" />
          5-Tier Karvonen Exercise Intensity Spectrum
        </h3>

        <div className="space-y-2">
          {calculation.zones.map((z) => (
            <div
              key={z.zone}
              onClick={() => setActiveZone(z.zone)}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                activeZone === z.zone
                  ? `${z.bgClass} ${z.borderClass} ring-2 ring-rose-400 shadow-sm`
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-black text-xs px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 ${z.colorClass}`}>
                  Z{z.zone}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {z.name}
                    <span className="text-[10px] text-slate-400 font-normal">({z.intensityRange})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{z.primaryBenefit}</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 font-mono">
                <span className={`text-sm font-black ${z.colorClass}`}>
                  {z.minBpm} – {z.maxBpm} BPM
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Explainer Note */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-700 dark:text-slate-300">Karvonen Method Precision:</strong> Unlike simple percentage-of-max calculations, the Karvonen formula accounts for individual resting heart rate ($HR_{`{reserve}`} = HR_{`{max}`} - HR_{`{rest}`}$). Athletes with lower resting pulses receive appropriately calibrated aerobic zones.
          </div>
        </div>
      </div>
    </div>
  );
};
