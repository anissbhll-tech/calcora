import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber } from '../../lib/mathUtils';

interface PeriodOvulationCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PeriodOvulationCalculator: React.FC<PeriodOvulationCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cycleLengthDays, setCycleLengthDays] = useState<string>('28');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.cycleLengthDays !== undefined) setCycleLengthDays(String(initialPreset.cycleLengthDays));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setLastPeriodDate(new Date().toISOString().split('T')[0]);
    setCycleLengthDays('28');
  };

  const calculate = () => {
    const cycle = safeParseNumber(cycleLengthDays, 28);
    if (cycle < 20 || cycle > 45) {
      return { isValid: false, msg: 'Menstrual cycle length typically ranges between 20 and 45 days.' };
    }

    const lmp = new Date(lastPeriodDate);
    if (isNaN(lmp.getTime())) {
      return { isValid: false, msg: 'Please select a valid date for your last period.' };
    }

    // Ovulation occurs approximately 14 days BEFORE the next period
    const nextPeriod = new Date(lmp);
    nextPeriod.setDate(nextPeriod.getDate() + cycle);

    const ovulationDate = new Date(nextPeriod);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Fertile window: 5 days before ovulation up to ovulation day
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);

    const pregnancyTestDate = new Date(nextPeriod);

    const formatDate = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return {
      isValid: true,
      msg: '',
      ovulationDate: formatDate(ovulationDate),
      fertileWindow: `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`,
      nextPeriodDate: formatDate(nextPeriod),
      pregnancyTestDate: formatDate(pregnancyTestDate),
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Ovulation Date: ${res.ovulationDate} | Fertile Window: ${res.fertileWindow}`,
        { lastPeriodDate, cycleLengthDays },
        { ovulationDate: res.ovulationDate, fertileWindow: res.fertileWindow }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Cycle Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="lastPeriodDate" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              First Day of Last Period
            </label>
            <input
              id="lastPeriodDate"
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <CalcInput
            id="cycleLengthDays"
            label="Average Cycle Length"
            suffix="days"
            value={cycleLengthDays}
            onChange={setCycleLengthDays}
            min={20}
            max={45}
            helperText="Standard average is 28 days"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Estimated Ovulation Date"
              value={res.ovulationDate}
              subtitle="Peak fertility day"
              highlighted={true}
            />
            <CalcResultCard
              title="Most Fertile Window"
              value={res.fertileWindow}
              subtitle="5 days prior to ovulation"
              badgeText="High Conception Chance"
              badgeType="success"
            />
            <CalcResultCard
              title="Next Expected Period"
              value={res.nextPeriodDate}
              subtitle="Start of next cycle"
            />
            <CalcResultCard
              title="Early Pregnancy Test Date"
              value={res.pregnancyTestDate}
              subtitle="Optimal test sensitivity date"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Ovulation calculations assume a consistent luteal phase of 14 days. Individual cycle variations occur.</span>
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
