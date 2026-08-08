import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface TimeCardWorkHoursCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const TimeCardWorkHoursCalculator: React.FC<TimeCardWorkHoursCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [startTime, setStartTime] = useState<string>('08:30');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [breakMins, setBreakMins] = useState<string>('30');
  const [hourlyWage, setHourlyWage] = useState<string>('24.50');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.startTime !== undefined) setStartTime(String(initialPreset.startTime));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setStartTime('08:30');
    setEndTime('17:00');
    setBreakMins('30');
    setHourlyWage('24.50');
  };

  const calculate = () => {
    const [startH, startM] = startTime.split(':').map((x) => parseInt(x, 10));
    const [endH, endM] = endTime.split(':').map((x) => parseInt(x, 10));

    const lunchMins = safeParseNumber(breakMins, 0);
    const wage = safeParseNumber(hourlyWage, 0);

    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
      return { isValid: false, msg: 'Please enter valid clock-in and clock-out times.' };
    }

    const startTotalMins = startH * 60 + startM;
    let endTotalMins = endH * 60 + endM;

    if (endTotalMins < startTotalMins) {
      endTotalMins += 24 * 60; // Overnight shift
    }

    const totalElapsedMins = endTotalMins - startTotalMins;
    const netWorkMins = Math.max(0, totalElapsedMins - lunchMins);

    const netWorkHours = netWorkMins / 60;
    const grossPay = netWorkHours * wage;

    return {
      isValid: true,
      msg: '',
      netWorkMins,
      netWorkHours,
      grossPay,
      wage,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Timecard Shift: ${formatNumber(res.netWorkHours, 2)} Net Hours | Pay ${formatCurrency(res.grossPay)}`,
        { startTime, endTime, breakMins, hourlyWage },
        { netWorkHours: res.netWorkHours, grossPay: res.grossPay }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Shift Clock Times & Unpaid Breaks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="startTime" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Clock In Time
            </label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="endTime" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Clock Out Time
            </label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <CalcInput id="breakMins" label="Unpaid Meal / Break Duration" suffix="mins" value={breakMins} onChange={setBreakMins} min={0} max={180} />
          <CalcInput id="hourlyWage" label="Hourly Pay Rate" prefix="$" value={hourlyWage} onChange={setHourlyWage} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Net Paid Work Hours"
              value={`${formatNumber(res.netWorkHours, 2)} Hours`}
              subtitle={`Subtracts ${breakMins} min unpaid break`}
              highlighted={true}
            />
            <CalcResultCard
              title="Shift Gross Pay"
              value={formatCurrency(res.grossPay)}
              subtitle={`At ${formatCurrency(res.wage)} per hour`}
              badgeText="Daily Earnings"
              badgeType="success"
            />
            <CalcResultCard
              title="Total Shift Minutes"
              value={`${res.netWorkMins} Mins`}
              subtitle="Net billable work time"
            />
            <CalcResultCard
              title="Weekly 5-Day Projection"
              value={formatCurrency(res.grossPay * 5)}
              subtitle="5 shifts gross pay estimate"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Overnight shifts crossing midnight are automatically recognized and calculated accurately.</span>
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
