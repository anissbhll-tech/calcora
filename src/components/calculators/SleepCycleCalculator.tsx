import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber } from '../../lib/mathUtils';

interface SleepCycleCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const SleepCycleCalculator: React.FC<SleepCycleCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [calculationMode, setCalculationMode] = useState<string>('wake'); // 'wake' = I want to wake up at X, 'sleep' = I am going to bed at X
  const [targetTime, setTargetTime] = useState<string>('07:00');
  const [fallAsleepMins, setFallAsleepMins] = useState<string>('15');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.targetTime !== undefined) setTargetTime(String(initialPreset.targetTime));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setCalculationMode('wake');
    setTargetTime('07:00');
    setFallAsleepMins('15');
  };

  const calculate = () => {
    const latency = safeParseNumber(fallAsleepMins, 15);
    const [hrsStr, minsStr] = targetTime.split(':');
    const hrs = parseInt(hrsStr || '0', 10);
    const mins = parseInt(minsStr || '0', 10);

    if (isNaN(hrs) || isNaN(mins)) {
      return { isValid: false, msg: 'Please select a valid time.' };
    }

    const baseDate = new Date();
    baseDate.setHours(hrs, mins, 0, 0);

    // Sleep cycle length = 90 minutes (1.5 hours)
    const cycleMinutes = 90;

    const timesList: { cycles: number; totalHours: string; timeStr: string; status: string }[] = [];

    const cycleCounts = [6, 5, 4, 3]; // 9 hrs, 7.5 hrs, 6 hrs, 4.5 hrs

    cycleCounts.forEach((c) => {
      const totalMins = c * cycleMinutes + latency;
      const t = new Date(baseDate);

      if (calculationMode === 'wake') {
        // Subtract sleep duration from wake time to find bedtime
        t.setMinutes(t.getMinutes() - totalMins);
      } else {
        // Add sleep duration to bedtime to find wake time
        t.setMinutes(t.getMinutes() + totalMins);
      }

      const formattedTime = t.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const hrsDecimal = (c * 1.5).toFixed(1);

      timesList.push({
        cycles: c,
        totalHours: `${hrsDecimal} Hours`,
        timeStr: formattedTime,
        status: c === 5 || c === 6 ? 'Optimal Rest' : 'Minimum Rest',
      });
    });

    return {
      isValid: true,
      msg: '',
      calculationMode,
      targetTime,
      timesList,
      optimalBedtime: timesList.find((x) => x.cycles === 5)?.timeStr || timesList[0].timeStr,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Sleep Timing: Optimal Bedtime ${res.optimalBedtime} for ${targetTime} Wake-up`,
        { calculationMode, targetTime, fallAsleepMins },
        { optimalTime: res.optimalBedtime }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Sleep Cycle Schedule Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcSelect
            id="calculationMode"
            label="Schedule Objective"
            value={calculationMode}
            onChange={setCalculationMode}
            options={[
              { value: 'wake', label: 'I want to wake up at a specific time' },
              { value: 'sleep', label: 'I am going to sleep right now / at a specific time' },
            ]}
          />
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="targetTime" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {calculationMode === 'wake' ? 'Target Wake Up Time' : 'Bedtime'}
            </label>
            <input
              id="targetTime"
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <CalcInput
            id="fallAsleepMins"
            label="Average Sleep Latency"
            suffix="mins"
            value={fallAsleepMins}
            onChange={setFallAsleepMins}
            min={0}
            max={60}
            helperText="Average adult takes 10-20 mins to fall asleep"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {res.timesList.map((item, idx) => (
              <CalcResultCard
                key={idx}
                title={`${item.cycles} Cycles (${item.totalHours})`}
                value={item.timeStr}
                subtitle={calculationMode === 'wake' ? 'Recommended Bedtime' : 'Recommended Wake Time'}
                highlighted={item.cycles === 5}
                badgeText={item.status}
                badgeType={item.cycles >= 5 ? 'success' : 'info'}
              />
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Human sleep cycles average 90 minutes. Waking up at the end of a cycle avoids groggy sleep inertia.</span>
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
