import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface MeetingCostCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const MeetingCostCalculator: React.FC<MeetingCostCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [attendeesCount, setAttendeesCount] = useState<string>('8');
  const [avgHourlySalary, setAvgHourlySalary] = useState<string>('65');
  const [meetingDurationMins, setMeetingDurationMins] = useState<string>('60');
  const [frequencyPerWeek, setFrequencyPerWeek] = useState<string>('2');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.attendeesCount !== undefined) setAttendeesCount(String(initialPreset.attendeesCount));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setAttendeesCount('8');
    setAvgHourlySalary('65');
    setMeetingDurationMins('60');
    setFrequencyPerWeek('2');
  };

  const calculate = () => {
    const attendees = safeParseNumber(attendeesCount, 0);
    const hourlyRate = safeParseNumber(avgHourlySalary, 0);
    const mins = safeParseNumber(meetingDurationMins, 0);
    const weeklyFreq = safeParseNumber(frequencyPerWeek, 1);

    if (attendees <= 0 || hourlyRate <= 0 || mins <= 0) {
      return { isValid: false, msg: 'Attendees, hourly wage, and meeting length must be greater than 0.' };
    }

    const meetingDurationHours = mins / 60;
    const totalManHoursPerMeeting = attendees * meetingDurationHours;
    const singleMeetingCost = totalManHoursPerMeeting * hourlyRate;

    const weeklyCost = singleMeetingCost * weeklyFreq;
    const annualCost = weeklyCost * 50; // 50 working weeks

    return {
      isValid: true,
      msg: '',
      attendees,
      singleMeetingCost,
      totalManHoursPerMeeting,
      weeklyCost,
      annualCost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Meeting Cost: ${formatCurrency(res.singleMeetingCost)} per meeting (${res.attendees} attendees, ${meetingDurationMins} min) | Annual ${formatCurrency(res.annualCost)}`,
        { attendeesCount, avgHourlySalary, meetingDurationMins, frequencyPerWeek },
        { singleMeetingCost: res.singleMeetingCost, annualCost: res.annualCost }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Meeting & Salary Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="attendeesCount" label="Number of Attendees" value={attendeesCount} onChange={setAttendeesCount} min={1} />
          <CalcInput id="avgHourlySalary" label="Avg Salary / Hourly Rate" prefix="$" value={avgHourlySalary} onChange={setAvgHourlySalary} min={1} />
          <CalcInput id="meetingDurationMins" label="Meeting Duration" suffix="mins" value={meetingDurationMins} onChange={setMeetingDurationMins} min={5} />
          <CalcInput id="frequencyPerWeek" label="Frequency per Week" value={frequencyPerWeek} onChange={setFrequencyPerWeek} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Single Meeting Cost"
              value={formatCurrency(res.singleMeetingCost)}
              subtitle={`Direct cost for ${res.attendees} attendees`}
              highlighted={true}
            />
            <CalcResultCard
              title="Annual Recurring Cost"
              value={formatCurrency(res.annualCost)}
              subtitle={`At ${frequencyPerWeek} recurring meetings / week`}
              badgeText="Annual Cost"
              badgeType="error"
            />
            <CalcResultCard
              title="Weekly Meeting Cost"
              value={formatCurrency(res.weeklyCost)}
              subtitle="Cumulative weekly burn rate"
            />
            <CalcResultCard
              title="Man-Hours Consumed"
              value={`${formatNumber(res.totalManHoursPerMeeting, 1)} Hours`}
              subtitle="Total productivity hours spent"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Reducing meeting length by 15 minutes or eliminating non-essential attendees generates significant operational savings.</span>
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
