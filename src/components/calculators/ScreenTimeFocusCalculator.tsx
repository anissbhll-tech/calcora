import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber } from '../../lib/mathUtils';

interface ScreenTimeFocusCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const ScreenTimeFocusCalculator: React.FC<ScreenTimeFocusCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [dailyScreenHours, setDailyScreenHours] = useState<string>('6.5');
  const [userAgeYears, setUserAgeYears] = useState<string>('30');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.dailyScreenHours !== undefined) setDailyScreenHours(String(initialPreset.dailyScreenHours));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setDailyScreenHours('6.5');
    setUserAgeYears('30');
  };

  const calculate = () => {
    const hrs = safeParseNumber(dailyScreenHours, 0);
    const age = safeParseNumber(userAgeYears, 30);

    if (hrs < 0 || hrs > 24) {
      return { isValid: false, msg: 'Daily screen time must be between 0 and 24 hours.' };
    }

    const annualScreenHours = hrs * 365;
    const annualScreenDays = annualScreenHours / 24;

    const remainingLifeYears = Math.max(1, 80 - age); // Assume 80 year life expectancy
    const lifetimeScreenYears = (annualScreenHours * remainingLifeYears) / 8760;

    const wakingHoursPerDay = 16;
    const percentOfWakingLife = (hrs / wakingHoursPerDay) * 100;

    return {
      isValid: true,
      msg: '',
      hrs,
      annualScreenHours,
      annualScreenDays,
      lifetimeScreenYears,
      percentOfWakingLife,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Screen Time Impact: ${formatNumber(res.annualScreenDays, 1)} days/year (${formatNumber(res.percentOfWakingLife, 1)}% of waking life)`,
        { dailyScreenHours, userAgeYears },
        { annualScreenDays: res.annualScreenDays, percentOfWakingLife: res.percentOfWakingLife }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Daily Screen Usage Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalcInput id="dailyScreenHours" label="Average Daily Screen Time" suffix="hrs/day" value={dailyScreenHours} onChange={setDailyScreenHours} min={0} max={24} />
          <CalcInput id="userAgeYears" label="Current Age" suffix="years" value={userAgeYears} onChange={setUserAgeYears} min={10} max={100} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Annual Screen Days"
              value={`${formatNumber(res.annualScreenDays, 1)} Days`}
              subtitle="Full 24-hour days spent on screens / year"
              highlighted={true}
              badgeText="Annual Lifetime Impact"
              badgeType={res.percentOfWakingLife > 40 ? 'error' : 'info'}
            />
            <CalcResultCard
              title="% of Waking Life"
              value={`${formatNumber(res.percentOfWakingLife, 1)}%`}
              subtitle="Percentage of non-sleeping time"
            />
            <CalcResultCard
              title="Lifetime Screen Years Left"
              value={`${formatNumber(res.lifetimeScreenYears, 1)} Years`}
              subtitle="Years spent on screens until age 80"
            />
            <CalcResultCard
              title="Total Annual Screen Hours"
              value={`${formatNumber(res.annualScreenHours, 0)} Hours`}
              subtitle="365 days cumulative screen hours"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>A daily screen time of 6.5 hours equates to over 98 full 24-hour days spent looking at digital screens every single year.</span>
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
