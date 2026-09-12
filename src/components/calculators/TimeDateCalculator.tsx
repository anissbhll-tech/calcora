import React, { useState, useMemo, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { formatNumber } from '../../lib/mathUtils';
import { Calendar, Clock, Sparkles, Copy, Check, Plus, Minus, Cake, Briefcase } from 'lucide-react';

type DateCalcMode = 'difference' | 'add_subtract' | 'age' | 'business_days';

export const TimeDateCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [mode, setMode] = useState<DateCalcMode>('difference');

  // Mode 1: Date Difference
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-12-31');
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(true);

  // Mode 2: Add/Subtract
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [opType, setOpType] = useState<'add' | 'subtract'>('add');
  const [addYears, setAddYears] = useState<number>(0);
  const [addMonths, setAddMonths] = useState<number>(0);
  const [addWeeks, setAddWeeks] = useState<number>(0);
  const [addDays, setAddDays] = useState<number>(30);

  // Mode 3: Age
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');
  const [ageAtDate, setAgeAtDate] = useState<string>(todayStr);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.mode) setMode(initialPreset.mode);
      if (initialPreset.startDate) setStartDate(initialPreset.startDate);
      if (initialPreset.endDate) setEndDate(initialPreset.endDate);
      if (initialPreset.birthDate) setBirthDate(initialPreset.birthDate);
    }
  }, [initialPreset]);

  // Mode 1: Difference Calculations
  const diffResults = useMemo(() => {
    if (!startDate || !endDate) return null;
    const d1 = new Date(`${startDate}T00:00:00`);
    const d2 = new Date(`${endDate}T00:00:00`);

    const isReversed = d2.getTime() < d1.getTime();
    const [early, late] = isReversed ? [d2, d1] : [d1, d2];

    const diffMs = late.getTime() - early.getTime();
    let totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (includeEndDay) totalDays += 1;

    // Count business days (Mon-Fri) vs weekends (Sat-Sun)
    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(early);
    const countLimit = includeEndDay ? totalDays : totalDays;

    for (let i = 0; i < countLimit; i++) {
      const dayOfWeek = cur.getDay(); // 0 = Sun, 6 = Sat
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    // Precise Years, Months, Days breakdown
    let years = late.getFullYear() - early.getFullYear();
    let months = late.getMonth() - early.getMonth();
    let days = late.getDate() - early.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(late.getFullYear(), late.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalWeeks = totalDays / 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    return {
      isReversed,
      totalDays,
      businessDays,
      weekendDays,
      years,
      months,
      days,
      totalWeeks: formatNumber(totalWeeks, 1),
      totalHours,
      totalMinutes,
      totalSeconds,
    };
  }, [startDate, endDate, includeEndDay]);

  // Mode 2: Add/Subtract Calculations
  const addSubtractResult = useMemo(() => {
    if (!baseDate) return null;
    const target = new Date(`${baseDate}T00:00:00`);
    const sign = opType === 'add' ? 1 : -1;

    target.setFullYear(target.getFullYear() + sign * Math.floor(addYears || 0));
    target.setMonth(target.getMonth() + sign * Math.floor(addMonths || 0));
    const totalDaysShift = sign * (Math.floor(addWeeks || 0) * 7 + Math.floor(addDays || 0));
    target.setDate(target.getDate() + totalDaysShift);

    const formattedDate = target.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      dateObj: target,
      isoDate: target.toISOString().split('T')[0],
      formattedDate,
    };
  }, [baseDate, opType, addYears, addMonths, addWeeks, addDays]);

  // Mode 3: Age Calculations
  const ageResults = useMemo(() => {
    if (!birthDate || !ageAtDate) return null;
    const bday = new Date(`${birthDate}T00:00:00`);
    const at = new Date(`${ageAtDate}T00:00:00`);

    if (at.getTime() < bday.getTime()) return null;

    let years = at.getFullYear() - bday.getFullYear();
    let months = at.getMonth() - bday.getMonth();
    let days = at.getDate() - bday.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(at.getFullYear(), at.getMonth(), 0).getDate();
      days += prevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDaysLived = Math.round((at.getTime() - bday.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeksLived = formatNumber(totalDaysLived / 7, 1);
    const totalHoursLived = totalDaysLived * 24;

    // Next Birthday countdown
    const nextBday = new Date(at.getFullYear(), bday.getMonth(), bday.getDate());
    if (nextBday.getTime() < at.getTime()) {
      nextBday.setFullYear(nextBday.getFullYear() + 1);
    }
    const daysUntilNextBday = Math.round((nextBday.getTime() - at.getTime()) / (1000 * 60 * 60 * 24));

    // Zodiac Sign
    const m = bday.getMonth() + 1;
    const d = bday.getDate();
    let zodiac = 'Capricorn';
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = 'Aquarius';
    else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) zodiac = 'Pisces';
    else if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = 'Aries';
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = 'Taurus';
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = 'Gemini';
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = 'Cancer';
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = 'Leo';
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = 'Virgo';
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = 'Libra';
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = 'Scorpio';
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = 'Sagittarius';

    // Biological stats estimates
    const heartbeats = Math.round(totalDaysLived * 24 * 60 * 75); // avg 75 bpm
    const breaths = Math.round(totalDaysLived * 24 * 60 * 16); // avg 16 bpm

    return {
      years,
      months,
      days,
      totalDaysLived,
      totalWeeksLived,
      totalHoursLived,
      daysUntilNextBday,
      zodiac,
      heartbeats: heartbeats.toLocaleString(),
      breaths: breaths.toLocaleString(),
    };
  }, [birthDate, ageAtDate]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setMode('difference')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'difference'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Date Difference &amp; Span
        </button>

        <button
          type="button"
          onClick={() => setMode('add_subtract')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'add_subtract'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Add / Subtract Days &amp; Years
        </button>

        <button
          type="button"
          onClick={() => setMode('age')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex-1 min-w-[130px] text-center ${
            mode === 'age'
              ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Exact Age &amp; Birthday Countdown
        </button>
      </div>

      {/* Mode 1: Date Difference */}
      {mode === 'difference' && diffResults && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Inputs */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Select Start &amp; End Dates
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-sm font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-sm font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 pt-2">
                  <input
                    type="checkbox"
                    checked={includeEndDay}
                    onChange={(e) => setIncludeEndDay(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Include end day in total day count (+1 day)
                </label>
              </div>
            </div>

            {/* Main Result Card */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total Calendar Duration
                  </span>
                  <button
                    type="button"
                    onClick={() => copyVal(`${diffResults.totalDays} days`, 'days')}
                    className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 font-semibold"
                  >
                    {copiedKey === 'days' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'days' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="text-4xl sm:text-5xl font-black font-mono text-blue-600 dark:text-blue-400">
                  {diffResults.totalDays.toLocaleString()} Days
                </div>

                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Equivalent to {diffResults.years > 0 ? `${diffResults.years}y ` : ''}
                  {diffResults.months > 0 ? `${diffResults.months}m ` : ''}
                  {diffResults.days}d
                </div>
              </div>

              {/* Workday & Weekend Breakdown */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-400 font-sans block">Business Working Days (Mon–Fri)</span>
                  <strong className="text-slate-900 dark:text-white text-base">
                    {diffResults.businessDays.toLocaleString()} days
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 font-sans block">Weekend Days (Sat–Sun)</span>
                  <strong className="text-amber-600 dark:text-amber-400 text-base">
                    {diffResults.weekendDays.toLocaleString()} days
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Matrix Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CalcResultCard
              title="Total Weeks"
              value={`${diffResults.totalWeeks} wks`}
              subtitle={`${diffResults.totalDays} total days`}
            />

            <CalcResultCard
              title="Total Hours"
              value={`${diffResults.totalHours.toLocaleString()} hrs`}
              subtitle="24 hours per day"
            />

            <CalcResultCard
              title="Total Minutes"
              value={`${diffResults.totalMinutes.toLocaleString()} min`}
              subtitle="60 min per hour"
            />

            <CalcResultCard
              title="Total Seconds"
              value={`${diffResults.totalSeconds.toLocaleString()} s`}
              subtitle="Standard elapsed seconds"
            />
          </div>
        </div>
      )}

      {/* Mode 2: Add/Subtract */}
      {mode === 'add_subtract' && addSubtractResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Date &amp; Offset Configuration
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Starting Reference Date
                </label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="w-full text-sm font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              {/* Add vs Subtract */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpType('add')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    opType === 'add'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" /> Add Time
                </button>
                <button
                  type="button"
                  onClick={() => setOpType('subtract')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    opType === 'subtract'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" /> Subtract Time
                </button>
              </div>

              {/* Duration fields */}
              <div className="grid grid-cols-2 gap-3">
                <CalcInput id="addYears" label="Years" value={addYears} onChange={setAddYears} min={0} />
                <CalcInput id="addMonths" label="Months" value={addMonths} onChange={setAddMonths} min={0} />
                <CalcInput id="addWeeks" label="Weeks" value={addWeeks} onChange={setAddWeeks} min={0} />
                <CalcInput id="addDays" label="Days" value={addDays} onChange={setAddDays} min={0} />
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Result Date
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {addSubtractResult.isoDate}
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {addSubtractResult.formattedDate}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                <span className="text-slate-400 font-sans block">Applied Operation:</span>
                <div className="text-slate-800 dark:text-slate-200 font-bold">
                  {baseDate} {opType === 'add' ? '+' : '−'} {addYears}y {addMonths}m {addWeeks}w {addDays}d
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Age */}
      {mode === 'age' && ageResults && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cake className="w-4 h-4 text-purple-500" />
                Birthdate &amp; Target Age Date
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full text-sm font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Age at Date
                  </label>
                  <input
                    type="date"
                    value={ageAtDate}
                    onChange={(e) => setAgeAtDate(e.target.value)}
                    className="w-full text-sm font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Exact Chronological Age
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-purple-600 dark:text-purple-400">
                  {ageResults.years} Years
                </div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {ageResults.months} months, {ageResults.days} days
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-400 font-sans block">Next Birthday In:</span>
                  <strong className="text-purple-600 dark:text-purple-400 text-sm">
                    {ageResults.daysUntilNextBday} days
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 font-sans block">Astrological Zodiac:</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{ageResults.zodiac}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CalcResultCard
              title="Total Days Lived"
              value={ageResults.totalDaysLived.toLocaleString()}
              subtitle="Total elapsed days"
              highlighted={true}
            />

            <CalcResultCard
              title="Total Weeks Lived"
              value={`${ageResults.totalWeeksLived} wks`}
              subtitle="52.1775 wks/yr"
            />

            <CalcResultCard
              title="Estimated Heartbeats"
              value={ageResults.heartbeats}
              subtitle="At ~75 beats per minute"
            />

            <CalcResultCard
              title="Estimated Breaths"
              value={ageResults.breaths}
              subtitle="At ~16 breaths per min"
            />
          </div>
        </div>
      )}
    </div>
  );
};
