import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';

interface HourlyToSalaryCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const HourlyToSalaryCalculator: React.FC<HourlyToSalaryCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [hourlyWage, setHourlyWage] = useState<string>('30');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('5');
  const [unpaidWeeksOff, setUnpaidWeeksOff] = useState<string>('0');
  const [overtimeHours, setOvertimeHours] = useState<string>('0');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.hourlyWage !== undefined) setHourlyWage(String(initialPreset.hourlyWage));
      if (initialPreset.hoursPerWeek !== undefined) setHoursPerWeek(String(initialPreset.hoursPerWeek));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setHourlyWage('30');
    setHoursPerWeek('40');
    setDaysPerWeek('5');
    setUnpaidWeeksOff('0');
    setOvertimeHours('0');
  };

  const calculate = () => {
    const wage = safeParseNumber(hourlyWage, 0);
    const hrsWeek = safeParseNumber(hoursPerWeek, 0);
    const daysWeek = safeParseNumber(daysPerWeek, 5);
    const offWeeks = safeParseNumber(unpaidWeeksOff, 0);
    const otHrs = safeParseNumber(overtimeHours, 0);

    const paidWeeks = Math.max(0, 52 - offWeeks);

    if (wage <= 0) {
      return {
        isValid: false,
        msg: 'Please enter an hourly wage greater than $0.',
        annualSalary: 0,
        monthlyPay: 0,
        biweeklyPay: 0,
        weeklyPay: 0,
        dailyPay: 0,
        totalHours: 0,
      };
    }

    if (hrsWeek <= 0) {
      return {
        isValid: false,
        msg: 'Hours per week must be greater than 0.',
        annualSalary: 0,
        monthlyPay: 0,
        biweeklyPay: 0,
        weeklyPay: 0,
        dailyPay: 0,
        totalHours: 0,
      };
    }

    const regWeeklyPay = hrsWeek * wage;
    const otWeeklyPay = otHrs * (wage * 1.5);
    const totalWeeklyPay = regWeeklyPay + otWeeklyPay;

    const annualSalary = totalWeeklyPay * paidWeeks;
    const monthlyPay = annualSalary / 12;
    const biweeklyPay = annualSalary / 26;
    const dailyPay = daysWeek > 0 ? totalWeeklyPay / daysWeek : totalWeeklyPay / 5;
    const totalHours = (hrsWeek + otHrs) * paidWeeks;

    return {
      isValid: true,
      msg: '',
      annualSalary,
      monthlyPay,
      biweeklyPay,
      weeklyPay: totalWeeklyPay,
      dailyPay,
      totalHours,
      paidWeeks,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Converted $${hourlyWage}/hr (${hoursPerWeek} hrs/wk) -> ${formatCurrency(res.annualSalary)} annual gross salary`,
        { hourlyWage, hoursPerWeek, unpaidWeeksOff },
        { annualSalary: res.annualSalary, monthlyPay: res.monthlyPay }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hourly Inputs */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Hourly Wage & Regular Work Schedule
          </h3>

          <CalcInput
            id="hourlyWage"
            label="Hourly Rate / Wage"
            prefix="$"
            value={hourlyWage}
            onChange={setHourlyWage}
            min={0}
            step="0.25"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="hoursPerWeek"
              label="Hours Worked / Week"
              suffix="hrs"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              min={1}
              max={168}
            />
            <CalcInput
              id="daysPerWeek"
              label="Days Worked / Week"
              suffix="days"
              value={daysPerWeek}
              onChange={setDaysPerWeek}
              min={1}
              max={7}
            />
          </div>
        </div>

        {/* Adjustments & Overtime */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Overtime & Unpaid Time Off
          </h3>

          <CalcInput
            id="unpaidWeeksOff"
            label="Unpaid Vacation / Time Off"
            suffix="Weeks/Yr"
            value={unpaidWeeksOff}
            onChange={setUnpaidWeeksOff}
            min={0}
            max={52}
          />

          <CalcInput
            id="overtimeHours"
            label="Overtime Hours / Week (1.5x Pay)"
            suffix="hrs/wk"
            value={overtimeHours}
            onChange={setOvertimeHours}
            min={0}
            max={80}
            helperText="Paid at 1.5x base wage"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Annual Gross Salary"
              value={formatCurrency(res.annualSalary)}
              subtitle={`Based on ${res.paidWeeks} paid weeks/year`}
              highlighted={true}
            />

            <CalcResultCard
              title="Monthly Gross Pay"
              value={formatCurrency(res.monthlyPay)}
              subtitle="Average gross income per month"
              badgeText="Monthly"
              badgeType="info"
            />

            <CalcResultCard
              title="Bi-Weekly Gross Pay"
              value={formatCurrency(res.biweeklyPay)}
              subtitle="Every 2 weeks (26 pay periods)"
              badgeText="Bi-Weekly"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Equivalent Income Breakdown:</span> Weekly Pay:{' '}
              <span className="font-semibold text-teal-600 dark:text-teal-400">{formatCurrency(res.weeklyPay)}</span> | Daily Pay:{' '}
              <span className="font-semibold">{formatCurrency(res.dailyPay)}</span> | Total Hours Worked:{' '}
              <span className="font-semibold">{formatNumber(res.totalHours, 0)} hrs/yr</span>
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
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
