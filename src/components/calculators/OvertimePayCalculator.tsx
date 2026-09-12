import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { Clock, DollarSign, Calendar, TrendingUp, Sparkles, AlertCircle, ShieldAlert, Award } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const OvertimePayCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [baseHourlyRate, setBaseHourlyRate] = useState<number>(() => initialPreset?.baseHourlyRate ?? 28.5);
  const [regularHours, setRegularHours] = useState<number>(() => initialPreset?.regularHours ?? 40);
  const [overtimeHours, setOvertimeHours] = useState<number>(() => initialPreset?.overtimeHours ?? 10);
  const [doubleTimeHours, setDoubleTimeHours] = useState<number>(() => initialPreset?.doubleTimeHours ?? 4);
  const [payPeriod, setPayPeriod] = useState<'weekly' | 'biweekly'>('weekly');
  const [shiftDifferentialRate, setShiftDifferentialRate] = useState<number>(0);
  const [shiftDifferentialType, setShiftDifferentialType] = useState<'dollar' | 'percent'>('dollar');
  const [applyCaliforniaRule, setApplyCaliforniaRule] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const baseRate = Math.max(0, safeParseNumber(baseHourlyRate, 28.5));
    const regHrs = Math.max(0, safeParseNumber(regularHours, 40));
    const otHrs = Math.max(0, safeParseNumber(overtimeHours, 0));
    const dtHrs = Math.max(0, safeParseNumber(doubleTimeHours, 0));
    const diffVal = Math.max(0, safeParseNumber(shiftDifferentialRate, 0));

    // Shift differential adjustment to regular rate of pay (FLSA regular rate includes non-discretionary shift diff)
    let shiftDiffPerHour = 0;
    if (shiftDifferentialType === 'dollar') {
      shiftDiffPerHour = diffVal;
    } else {
      shiftDiffPerHour = (baseRate * diffVal) / 100;
    }

    const effectiveBaseRate = baseRate + shiftDiffPerHour;
    const otRate = effectiveBaseRate * 1.5;
    const dtRate = effectiveBaseRate * 2.0;

    const regularEarnings = regHrs * effectiveBaseRate;
    const overtimeEarnings = otHrs * otRate;
    const doubleTimeEarnings = dtHrs * dtRate;

    const totalGrossPay = regularEarnings + overtimeEarnings + doubleTimeEarnings;
    const totalHoursWorked = regHrs + otHrs + dtHrs;
    const totalOvertimeHours = otHrs + dtHrs;
    const totalPremiumPay = overtimeEarnings + doubleTimeEarnings;

    const effectiveBlendedRate = totalHoursWorked > 0 ? totalGrossPay / totalHoursWorked : effectiveBaseRate;
    const overtimeEarningsSharePercent = totalGrossPay > 0 ? (totalPremiumPay / totalGrossPay) * 100 : 0;

    const payCyclesPerYear = payPeriod === 'weekly' ? 52 : 26;
    const annualizedGross = totalGrossPay * payCyclesPerYear;
    const annualizedRegular = regularEarnings * payCyclesPerYear;
    const annualizedOvertime = totalPremiumPay * payCyclesPerYear;

    const chartData = [
      {
        name: 'Pay Summary',
        Regular: Math.round(regularEarnings),
        Overtime15x: Math.round(overtimeEarnings),
        DoubleTime20x: Math.round(doubleTimeEarnings),
      },
    ];

    return {
      baseRate,
      effectiveBaseRate,
      shiftDiffPerHour,
      regHrs,
      otHrs,
      dtHrs,
      otRate,
      dtRate,
      regularEarnings,
      overtimeEarnings,
      doubleTimeEarnings,
      totalGrossPay,
      totalHoursWorked,
      totalOvertimeHours,
      totalPremiumPay,
      effectiveBlendedRate,
      overtimeEarningsSharePercent,
      payCyclesPerYear,
      annualizedGross,
      annualizedRegular,
      annualizedOvertime,
      chartData,
    };
  }, [
    baseHourlyRate,
    regularHours,
    overtimeHours,
    doubleTimeHours,
    payPeriod,
    shiftDifferentialRate,
    shiftDifferentialType,
    applyCaliforniaRule,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Overtime Calculation: $${formatCurrency(calculation.totalGrossPay)} gross (${payPeriod}, ${calculation.totalHoursWorked} hrs: ${calculation.regHrs}h reg, ${calculation.otHrs}h 1.5x, ${calculation.dtHrs}h 2x — Blended $${calculation.effectiveBlendedRate.toFixed(2)}/hr)`,
        { baseHourlyRate, regularHours, overtimeHours, doubleTimeHours, payPeriod, shiftDifferentialRate },
        {
          totalGrossPay: calculation.totalGrossPay,
          totalPremiumPay: calculation.totalPremiumPay,
          effectiveBlendedRate: calculation.effectiveBlendedRate,
          annualizedGross: calculation.annualizedGross,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Total Paycheck &amp; Overtime Premium Breakdown ({payPeriod})
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Total Gross Pay:{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono text-base">
              ${formatCurrency(calculation.totalGrossPay)}
            </strong>{' '}
            for {calculation.totalHoursWorked} total hours worked. Overtime &amp; Double-Time Premium:{' '}
            <strong className="text-teal-600 dark:text-teal-400 font-mono font-bold">
              ${formatCurrency(calculation.totalPremiumPay)}
            </strong>{' '}
            ({calculation.overtimeEarningsSharePercent.toFixed(1)}% of paycheck). Effective Blended Rate:{' '}
            <strong className="text-slate-900 dark:text-white font-mono font-bold">
              ${calculation.effectiveBlendedRate.toFixed(2)}/hr
            </strong>
            .
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {payPeriod === 'weekly' ? 'Weekly Gross Pay' : 'Bi-Weekly Gross Pay'}
            </span>
            <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              ${formatCurrency(calculation.totalGrossPay)}
            </span>
          </div>
        </div>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Base Wage & Pay Period */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Base Wage &amp; Schedule
              </h4>
            </div>
            <div className="flex bg-white dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setPayPeriod('weekly')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  payPeriod === 'weekly'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setPayPeriod('biweekly')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  payPeriod === 'biweekly'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Bi-Weekly
              </button>
            </div>
          </div>

          <CalcInput
            id="baseHourlyRate"
            label="Base Regular Hourly Wage"
            value={baseHourlyRate}
            onChange={(val) => setBaseHourlyRate(val)}
            min={1}
            max={500}
            step={0.5}
            prefix="$"
          />

          <CalcInput
            id="regularHours"
            label={`Regular Hours Worked (${payPeriod === 'weekly' ? 'up to 40' : 'up to 80'})`}
            value={regularHours}
            onChange={(val) => setRegularHours(val)}
            min={0}
            max={payPeriod === 'weekly' ? 40 : 80}
            step={0.5}
            suffix="hrs"
          />

          <div className="space-y-1.5 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={applyCaliforniaRule}
                onChange={(e) => setApplyCaliforniaRule(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              Enable California Daily Overtime Rules (Daily &gt;8h OT / &gt;12h DT)
            </label>
          </div>
        </div>

        {/* Right: Overtime, Double Time & Shift Differential */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Overtime, Double Time &amp; Differential
            </h4>
          </div>

          <CalcInput
            id="overtimeHours"
            label={`1.5x Time & Half Overtime Hours (Rate: $${calculation.otRate.toFixed(2)}/hr)`}
            value={overtimeHours}
            onChange={(val) => setOvertimeHours(val)}
            min={0}
            max={60}
            step={0.5}
            suffix="hrs"
          />

          <CalcInput
            id="doubleTimeHours"
            label={`2.0x Double Time Hours (Rate: $${calculation.dtRate.toFixed(2)}/hr)`}
            value={doubleTimeHours}
            onChange={(val) => setDoubleTimeHours(val)}
            min={0}
            max={40}
            step={0.5}
            suffix="hrs"
            helpText="Sundays, holidays, 7th consecutive day, or daily >12 hours"
          />

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
              <CalcInput
                id="shiftDifferentialRate"
                label="Night / Weekend Shift Premium"
                value={shiftDifferentialRate}
                onChange={(val) => setShiftDifferentialRate(val)}
                min={0}
                max={100}
                step={0.25}
                prefix={shiftDifferentialType === 'dollar' ? '$' : undefined}
                suffix={shiftDifferentialType === 'percent' ? '%' : undefined}
              />
            </div>
            <div className="col-span-4 flex items-end">
              <button
                type="button"
                onClick={() =>
                  setShiftDifferentialType(shiftDifferentialType === 'dollar' ? 'percent' : 'dollar')
                }
                className="w-full h-[42px] mb-[2px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
              >
                {shiftDifferentialType === 'dollar' ? '$ / hr' : '% rate'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title={`Total Gross Pay (${payPeriod})`}
          value={`$${formatCurrency(calculation.totalGrossPay)}`}
          subtitle={`${calculation.totalHoursWorked} total paid hours`}
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Overtime Premium Pay"
          value={`$${formatCurrency(calculation.totalPremiumPay)}`}
          subtitle={`${calculation.totalOvertimeHours} OT hours (${calculation.overtimeEarningsSharePercent.toFixed(1)}% of check)`}
          icon={<TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Effective Hourly Rate"
          value={`$${calculation.effectiveBlendedRate.toFixed(2)}/hr`}
          subtitle={`+$${(calculation.effectiveBlendedRate - calculation.baseRate).toFixed(2)}/hr above base wage`}
          icon={<Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Projected Annual Gross"
          value={`$${formatCurrency(calculation.annualizedGross)}`}
          subtitle={`Based on ${calculation.payCyclesPerYear} consistent pay cycles`}
          icon={<Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        />
      </div>

      {/* Itemized Paycheck Tier Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pay Tier Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Pay Category</th>
                <th className="py-2.5 px-3">Multiplier</th>
                <th className="py-2.5 px-3">Hourly Rate</th>
                <th className="py-2.5 px-3">Hours</th>
                <th className="py-2.5 px-3 text-right">Total Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Regular Base Pay</td>
                <td className="py-2.5 px-3 text-slate-500">1.0x</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">${calculation.effectiveBaseRate.toFixed(2)}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{calculation.regHrs} hrs</td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                  ${formatCurrency(calculation.regularEarnings)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-teal-50/40 dark:bg-teal-950/20">
                <td className="py-2.5 px-3 font-sans font-semibold text-teal-800 dark:text-teal-300">
                  1.5x Time &amp; A Half Overtime
                </td>
                <td className="py-2.5 px-3 text-teal-600 font-bold">1.5x</td>
                <td className="py-2.5 px-3 text-teal-700 dark:text-teal-400 font-bold">${calculation.otRate.toFixed(2)}</td>
                <td className="py-2.5 px-3 text-teal-700 dark:text-teal-400">{calculation.otHrs} hrs</td>
                <td className="py-2.5 px-3 text-right font-bold text-teal-700 dark:text-teal-300">
                  ${formatCurrency(calculation.overtimeEarnings)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-indigo-50/40 dark:bg-indigo-950/20">
                <td className="py-2.5 px-3 font-sans font-semibold text-indigo-800 dark:text-indigo-300">
                  2.0x Double Time Pay
                </td>
                <td className="py-2.5 px-3 text-indigo-600 font-bold">2.0x</td>
                <td className="py-2.5 px-3 text-indigo-700 dark:text-indigo-400 font-bold">${calculation.dtRate.toFixed(2)}</td>
                <td className="py-2.5 px-3 text-indigo-700 dark:text-indigo-400">{calculation.dtHrs} hrs</td>
                <td className="py-2.5 px-3 text-right font-bold text-indigo-700 dark:text-indigo-300">
                  ${formatCurrency(calculation.doubleTimeEarnings)}
                </td>
              </tr>
              <tr className="border-t-2 border-slate-300 dark:border-slate-700 font-bold">
                <td className="py-3 px-3 font-sans text-slate-900 dark:text-white">Total Gross Earnings</td>
                <td className="py-3 px-3 text-slate-500">—</td>
                <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400">
                  ${calculation.effectiveBlendedRate.toFixed(2)} (avg)
                </td>
                <td className="py-3 px-3 text-slate-900 dark:text-white">{calculation.totalHoursWorked} hrs</td>
                <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 text-sm">
                  ${formatCurrency(calculation.totalGrossPay)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Paycheck Tier Distribution Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Paycheck Composition: Regular vs 1.5x Overtime vs 2.0x Double Time
        </h3>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculation.chartData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis
                type="number"
                tickFormatter={(val) => `$${val.toLocaleString()}`}
                tick={{ fontSize: 11 }}
              />
              <YAxis dataKey="name" type="category" hide={true} />
              <Tooltip
                formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="Regular" name="Regular Base Pay" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Overtime15x" name="1.5x Overtime Pay" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="DoubleTime20x" name="2.0x Double Time" stackId="a" fill="#6366f1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
