import React, { useState, useEffect } from 'react';
import { CalcSelect } from '../common/CalcSelect';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';

interface PregnancyDueDateCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const PregnancyDueDateCalculator: React.FC<PregnancyDueDateCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [calcMethod, setCalcMethod] = useState<string>('lmp'); // 'lmp', 'conception', 'ultrasound'
  const [inputDate, setInputDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 60); // default 60 days ago
    return d.toISOString().split('T')[0];
  });
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<string>('8');
  const [ultrasoundDays, setUltrasoundDays] = useState<string>('0');

  useEffect(() => {
    if (initialPreset && initialPreset.inputDate !== undefined) {
      setInputDate(String(initialPreset.inputDate));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setCalcMethod('lmp');
    const d = new Date();
    d.setDate(d.getDate() - 60);
    setInputDate(d.toISOString().split('T')[0]);
    setUltrasoundWeeks('8');
    setUltrasoundDays('0');
  };

  const calculate = () => {
    if (!inputDate) {
      return {
        isValid: false,
        msg: 'Please select a valid date.',
        dueDateStr: '',
        gestationalWeeks: 0,
        gestationalDays: 0,
        trimester: '',
        conceptionDateStr: '',
        fullTermDateStr: '',
      };
    }

    const baseDate = new Date(inputDate + 'T00:00:00');
    if (isNaN(baseDate.getTime())) {
      return {
        isValid: false,
        msg: 'Invalid date selected.',
        dueDateStr: '',
        gestationalWeeks: 0,
        gestationalDays: 0,
        trimester: '',
        conceptionDateStr: '',
        fullTermDateStr: '',
      };
    }

    let dueDate = new Date(baseDate);
    let lmpDate = new Date(baseDate);

    if (calcMethod === 'lmp') {
      // Due Date = LMP + 280 days (40 weeks)
      dueDate.setDate(dueDate.getDate() + 280);
    } else if (calcMethod === 'conception') {
      // Due Date = Conception + 266 days (38 weeks)
      dueDate.setDate(dueDate.getDate() + 266);
      lmpDate = new Date(baseDate);
      lmpDate.setDate(lmpDate.getDate() - 14);
    } else if (calcMethod === 'ultrasound') {
      // Due Date = Scan Date + (280 - (weeks * 7 + days))
      const weeks = parseInt(ultrasoundWeeks, 10) || 0;
      const days = parseInt(ultrasoundDays, 10) || 0;
      const daysElapsed = weeks * 7 + days;
      const daysRemaining = 280 - daysElapsed;
      dueDate.setDate(dueDate.getDate() + daysRemaining);
      lmpDate = new Date(dueDate);
      lmpDate.setDate(lmpDate.getDate() - 280);
    }

    // Gestational Age = Today - LMP
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const gestationalWeeks = Math.max(0, Math.floor(diffDays / 7));
    const gestationalDays = Math.max(0, diffDays % 7);

    // Trimester
    let trimester = '1st Trimester (Weeks 1-12)';
    if (gestationalWeeks >= 28) {
      trimester = '3rd Trimester (Weeks 28-40)';
    } else if (gestationalWeeks >= 13) {
      trimester = '2nd Trimester (Weeks 13-27)';
    }

    // Key Milestone Dates
    const conceptionDate = new Date(dueDate);
    conceptionDate.setDate(conceptionDate.getDate() - 266);

    const fullTermDate = new Date(dueDate);
    fullTermDate.setDate(fullTermDate.getDate() - 21); // 37 weeks is full term

    const formatDateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return {
      isValid: true,
      msg: '',
      dueDateStr: dueDate.toLocaleDateString(undefined, formatDateOptions),
      gestationalWeeks,
      gestationalDays,
      trimester,
      conceptionDateStr: conceptionDate.toLocaleDateString(undefined, formatDateOptions),
      fullTermDateStr: fullTermDate.toLocaleDateString(undefined, formatDateOptions),
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Pregnancy Due Date Estimate (${calcMethod.toUpperCase()}): Estimated Due Date = ${res.dueDateStr} (Currently ${res.gestationalWeeks}w ${res.gestationalDays}d)`,
        { inputDate, calcMethod },
        { dueDate: res.dueDateStr, gestationalWeeks: res.gestationalWeeks }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Pregnancy Timeline Input
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcSelect
            id="calcMethod"
            label="Calculation Method"
            value={calcMethod}
            onChange={setCalcMethod}
            options={[
              { value: 'lmp', label: 'First Day of Last Period (LMP)' },
              { value: 'conception', label: 'Conception Date' },
              { value: 'ultrasound', label: 'Ultrasound Scan Date & Age' },
            ]}
          />

          <CalcInput
            id="inputDate"
            type="date"
            label={
              calcMethod === 'lmp'
                ? 'First Day of Last Menstrual Period'
                : calcMethod === 'conception'
                ? 'Estimated Conception Date'
                : 'Date of Ultrasound Scan'
            }
            value={inputDate}
            onChange={setInputDate}
          />
        </div>

        {calcMethod === 'ultrasound' && (
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
            <CalcInput
              id="ultrasoundWeeks"
              label="Ultrasound Weeks"
              suffix="w"
              value={ultrasoundWeeks}
              onChange={setUltrasoundWeeks}
              min={1}
              max={40}
            />
            <CalcInput
              id="ultrasoundDays"
              label="Ultrasound Days"
              suffix="d"
              value={ultrasoundDays}
              onChange={setUltrasoundDays}
              min={0}
              max={6}
            />
          </div>
        )}
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Estimated Due Date (EDD)"
              value={res.dueDateStr}
              subtitle="40 weeks from last menstrual period"
              highlighted={true}
            />

            <CalcResultCard
              title="Current Gestational Age"
              value={`${res.gestationalWeeks} wks, ${res.gestationalDays} days`}
              subtitle={res.trimester}
              badgeText="Current Progress"
              badgeType="info"
            />

            <CalcResultCard
              title="Full Term Date (37 wks)"
              value={res.fullTermDateStr}
              subtitle="Earliest full term pregnancy date"
              badgeText="Early Term"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Key Milestones:</span> Estimated Conception Date:{' '}
              <span className="font-semibold">{res.conceptionDateStr}</span> | Current Stage:{' '}
              <span className="font-semibold text-rose-600 dark:text-rose-400">{res.trimester}</span>
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
