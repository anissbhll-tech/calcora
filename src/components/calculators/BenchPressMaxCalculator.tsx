import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';
import { Dumbbell, Target, Zap, ShieldCheck, Trophy, Activity, Flame, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

type LiftExercise = 'bench' | 'squat' | 'deadlift' | 'overhead_press' | 'custom';
type UnitSystem = 'lbs' | 'kg';

const EXERCISE_LABELS: Record<LiftExercise, string> = {
  bench: 'Barbell Bench Press',
  squat: 'Barbell Back Squat',
  deadlift: 'Barbell Conventional Deadlift',
  overhead_press: 'Barbell Overhead Press (OHP)',
  custom: 'Custom Compound Lift',
};

export const BenchPressMaxCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  const [exercise, setExercise] = useState<LiftExercise>('bench');
  const [unit, setUnit] = useState<UnitSystem>('lbs');
  const [weightLifted, setWeightLifted] = useState<number>(225);
  const [repsCompleted, setRepsCompleted] = useState<number>(5);
  const [rpe, setRpe] = useState<number>(10); // 10 = Max effort (0 RIR), 9 = 1 RIR, 8 = 2 RIR

  const calculation = useMemo(() => {
    const w = Math.max(1, safeParseNumber(weightLifted, 225));
    const r = Math.max(1, Math.min(30, safeParseNumber(repsCompleted, 5)));
    const safeRpe = Math.max(6, Math.min(10, safeParseNumber(rpe, 10)));

    // RPE Adjustment: RIR (Reps in Reserve) = 10 - RPE
    const rir = Math.max(0, 10 - safeRpe);
    const effectiveReps = r + rir;

    if (effectiveReps === 1) {
      return {
        oneRepMax: w,
        epley: w,
        brzycki: w,
        lander: w,
        lombardi: w,
        mayhew: w,
        oconner: w,
        wathan: w,
        effectiveReps,
        rir,
        percentages: [
          { pct: 100, weight: w, reps: 1 },
          { pct: 95, weight: Math.round(w * 0.95), reps: 2 },
          { pct: 90, weight: Math.round(w * 0.90), reps: 4 },
          { pct: 85, weight: Math.round(w * 0.85), reps: 6 },
          { pct: 80, weight: Math.round(w * 0.80), reps: 8 },
          { pct: 75, weight: Math.round(w * 0.75), reps: 10 },
          { pct: 70, weight: Math.round(w * 0.70), reps: 12 },
          { pct: 65, weight: Math.round(w * 0.65), reps: 15 },
          { pct: 60, weight: Math.round(w * 0.60), reps: 20 },
        ],
      };
    }

    // 1. Epley: 1RM = w * (1 + r / 30)
    const epley = Math.round(w * (1 + effectiveReps / 30));

    // 2. Brzycki: 1RM = w * (36 / (37 - r))
    const brzycki = effectiveReps < 37 ? Math.round(w * (36 / (37 - effectiveReps))) : epley;

    // 3. Lander (McGlothin): 100 * w / (101.3 - 2.67123 * r)
    const landerDenom = 101.3 - 2.67123 * effectiveReps;
    const lander = landerDenom > 0 ? Math.round((100 * w) / landerDenom) : epley;

    // 4. Lombardi: w * (r^0.10)
    const lombardi = Math.round(w * Math.pow(effectiveReps, 0.1));

    // 5. Mayhew et al.: 100 * w / (52.2 + 41.9 * e^(-0.055 * r))
    const mayhew = Math.round((100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * effectiveReps)));

    // 6. O'Conner: w * (1 + r / 40)
    const oconner = Math.round(w * (1 + effectiveReps / 40));

    // 7. Wathan: 100 * w / (48.8 + 53.8 * e^(-0.075 * r))
    const wathan = Math.round((100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * effectiveReps)));

    // Average Consensus 1RM
    const formulas = [epley, brzycki, lander, lombardi, mayhew, oconner, wathan];
    const avg1RM = Math.round(formulas.reduce((a, b) => a + b, 0) / formulas.length);

    // Submaximal training percentages table
    const percentages = [
      { pct: 100, weight: avg1RM, reps: 1 },
      { pct: 95, weight: Math.round(avg1RM * 0.95), reps: 2 },
      { pct: 90, weight: Math.round(avg1RM * 0.90), reps: 4 },
      { pct: 85, weight: Math.round(avg1RM * 0.85), reps: 6 },
      { pct: 80, weight: Math.round(avg1RM * 0.80), reps: 8 },
      { pct: 75, weight: Math.round(avg1RM * 0.75), reps: 10 },
      { pct: 70, weight: Math.round(avg1RM * 0.70), reps: 12 },
      { pct: 65, weight: Math.round(avg1RM * 0.65), reps: 15 },
      { pct: 60, weight: Math.round(avg1RM * 0.60), reps: 20 },
    ];

    return {
      oneRepMax: avg1RM,
      epley,
      brzycki,
      lander,
      lombardi,
      mayhew,
      oconner,
      wathan,
      effectiveReps,
      rir,
      percentages,
    };
  }, [weightLifted, repsCompleted, rpe]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `${EXERCISE_LABELS[exercise]}: Estimated 1RM of ${calculation.oneRepMax} ${unit} (from ${weightLifted} ${unit} × ${repsCompleted} reps @ RPE ${rpe})`,
        {
          exercise,
          weightLifted: `${weightLifted} ${unit}`,
          repsCompleted,
          rpe,
        },
        {
          estimated1RM: `${calculation.oneRepMax} ${unit}`,
          epley: `${calculation.epley} ${unit}`,
          brzycki: `${calculation.brzycki} ${unit}`,
          workingSet80Pct: `${calculation.percentages[4].weight} ${unit}`,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Exercise & Unit Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Lift:</span>
          <select
            value={exercise}
            onChange={(e) => setExercise(e.target.value as LiftExercise)}
            className="text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
          >
            <option value="bench">Barbell Bench Press</option>
            <option value="squat">Barbell Back Squat</option>
            <option value="deadlift">Barbell Conventional Deadlift</option>
            <option value="overhead_press">Barbell Overhead Press (OHP)</option>
            <option value="custom">Custom Compound Lift</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Unit:</span>
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setUnit('lbs')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                unit === 'lbs' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Pounds (lbs)
            </button>
            <button
              type="button"
              onClick={() => setUnit('kg')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                unit === 'kg' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Kilograms (kg)
            </button>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <CalcInput
          id="weightLifted"
          label="Weight Lifted"
          value={weightLifted}
          onChange={(val) => setWeightLifted(val)}
          min={5}
          max={1500}
          step={5}
          suffix={unit}
          helpText="Barbell plus all loaded plates."
        />

        <CalcInput
          id="repsCompleted"
          label="Repetitions Completed"
          value={repsCompleted}
          onChange={(val) => setRepsCompleted(val)}
          min={1}
          max={30}
          step={1}
          suffix="reps"
          helpText="Clean, full range-of-motion completed repetitions."
        />

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            RPE / Effort (Reps in Reserve)
          </label>
          <select
            value={rpe}
            onChange={(e) => setRpe(Number(e.target.value))}
            className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
          >
            <option value={10}>RPE 10 (Max Effort / 0 Reps in Reserve)</option>
            <option value={9.5}>RPE 9.5 (Maybe 1 rep left / Grinder)</option>
            <option value={9}>RPE 9 (1 Clean Rep in Reserve)</option>
            <option value={8.5}>RPE 8.5 (1–2 Reps in Reserve)</option>
            <option value={8}>RPE 8 (2 Reps in Reserve - Solid Working Set)</option>
            <option value={7}>RPE 7 (3 Reps in Reserve - Speed / Moderate)</option>
          </select>
          <p className="text-[11px] text-slate-500">
            Adjusts effective repetitions to model true maximum strength capacity.
          </p>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Estimated 1RM (Consensus)"
          value={`${calculation.oneRepMax} ${unit}`}
          subtitle={`Multi-formula average (${EXERCISE_LABELS[exercise]})`}
          highlighted={true}
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
        />

        <CalcResultCard
          title="Epley Formula"
          value={`${calculation.epley} ${unit}`}
          subtitle="1RM = w × (1 + r / 30)"
          icon={<Target className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Brzycki Formula"
          value={`${calculation.brzycki} ${unit}`}
          subtitle="1RM = w × (36 / (37 - r))"
          icon={<Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="80% Hypertrophy Set"
          value={`${calculation.percentages[4].weight} ${unit}`}
          subtitle="Target weight for 7–8 rep working sets"
          icon={<Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Multi-Formula Comparison Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-teal-500" />
          Validated Exercise Science 1RM Formula Breakdown
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Epley</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {calculation.epley} {unit}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Brzycki</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {calculation.brzycki} {unit}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Lander</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {calculation.lander} {unit}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Lombardi</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {calculation.lombardi} {unit}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Mayhew</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {calculation.mayhew} {unit}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">O&apos;Conner</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {calculation.oconner} {unit}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Wathan</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {calculation.wathan} {unit}
            </span>
          </div>
        </div>
      </div>

      {/* Submaximal Training Load & Rep Range Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Dumbbell className="w-4 h-4 text-teal-500" />
          Submaximal Training Percentages &amp; Repetition Ranges
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">% of 1RM</th>
                <th className="py-2.5 px-3 font-semibold">Training Weight ({unit})</th>
                <th className="py-2.5 px-3 font-semibold">Repetition Target</th>
                <th className="py-2.5 px-3 font-semibold">Primary Training Adaptation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.percentages.map((row) => (
                <tr
                  key={row.pct}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                    row.pct === 100 ? 'bg-amber-50/40 dark:bg-amber-950/20 font-bold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {row.pct}%
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    {row.weight} {unit}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    {row.reps} {row.reps === 1 ? 'Rep (1RM Test)' : 'Reps'}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {row.pct >= 90
                      ? 'Neuromuscular Maximum Strength'
                      : row.pct >= 80
                      ? 'Strength Hypertrophy / Heavy Compound Sets'
                      : row.pct >= 70
                      ? 'Volume Hypertrophy / Muscle Growth'
                      : 'Speed, Power & Muscular Endurance'}
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
