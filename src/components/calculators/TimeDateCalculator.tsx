import React, { useState } from 'react';

export const TimeDateCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-12-31');

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);

  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = (totalDays / 7).toFixed(1);
  const totalHours = totalDays * 24;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full text-xs font-mono p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
          />
        </div>
      </div>

      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Duration Difference</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 font-mono mt-1">
            {totalDays} Days
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Total Weeks</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">{totalWeeks} weeks</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block">Total Hours</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">{totalHours.toLocaleString()} hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
