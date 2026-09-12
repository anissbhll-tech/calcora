import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { DollarSign, Clock, Calendar, Briefcase, Sparkles, TrendingUp, ArrowRightLeft, Percent } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const HourlyToSalaryCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [conversionDirection, setConversionDirection] = useState<'hourly_to_salary' | 'salary_to_hourly'>('hourly_to_salary');
  const [hourlyWage, setHourlyWage] = useState<number>(() => initialPreset?.hourlyWage ?? 38.5);
  const [targetAnnualSalary, setTargetAnnualSalary] = useState<number>(() => initialPreset?.targetAnnualSalary ?? 80000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(() => initialPreset?.hoursPerWeek ?? 40);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [unpaidWeeksOff, setUnpaidWeeksOff] = useState<number>(2);
  const [overtimeHoursWeekly, setOvertimeHoursWeekly] = useState<number>(0);
  const [annualBonus, setAnnualBonus] = useState<number>(0);

  const calculation = useMemo(() => {
    const hrsWeek = Math.max(1, Math.min(100, safeParseNumber(hoursPerWeek, 40)));
    const daysWeek = Math.max(1, Math.min(7, safeParseNumber(daysPerWeek, 5)));
    const unpaidWeeks = Math.max(0, Math.min(52, safeParseNumber(unpaidWeeksOff, 0)));
    const paidWeeks = 52 - unpaidWeeks;
    const otHrs = Math.max(0, safeParseNumber(overtimeHoursWeekly, 0));
    const bonus = Math.max(0, safeParseNumber(annualBonus, 0));

    let baseHourly = 0;
    let annualGross = 0;

    if (conversionDirection === 'hourly_to_salary') {
      baseHourly = Math.max(0, safeParseNumber(hourlyWage, 38.5));
      const regularWeeklyPay = hrsWeek * baseHourly;
      const overtimeWeeklyPay = otHrs * (baseHourly * 1.5);
      const weeklyTotal = regularWeeklyPay + overtimeWeeklyPay;
      annualGross = weeklyTotal * paidWeeks + bonus;
    } else {
      annualGross = Math.max(0, safeParseNumber(targetAnnualSalary, 80000));
      const baseSalaryMinusBonus = Math.max(0, annualGross - bonus);
      // annualGross = (hrsWeek * baseHourly + otHrs * baseHourly * 1.5) * paidWeeks
      const effectiveWeeklyHours = hrsWeek + otHrs * 1.5;
      const totalEffectiveHours = effectiveWeeklyHours * paidWeeks;
      baseHourly = totalEffectiveHours > 0 ? baseSalaryMinusBonus / totalEffectiveHours : 0;
    }

    const regularAnnual = (hrsWeek * baseHourly) * paidWeeks;
    const overtimeAnnual = (otHrs * baseHourly * 1.5) * paidWeeks;
    const monthlyGross = annualGross / 12;
    const semiMonthlyGross = annualGross / 24; // 24 paychecks/year
    const biweeklyGross = annualGross / 26; // 26 paychecks/year
    const weeklyGross = paidWeeks > 0 ? annualGross / paidWeeks : 0;
    const dailyGross = daysWeek > 0 ? weeklyGross / daysWeek : 0;

    const totalHoursWorkedAnnual = (hrsWeek + otHrs) * paidWeeks;
    const ot15Rate = baseHourly * 1.5;
    const ot20Rate = baseHourly * 2.0;

    const chartData = [
      {
        period: 'Monthly Gross',
        RegularBase: Math.round(regularAnnual / 12),
        OvertimeBonus: Math.round((overtimeAnnual + bonus) / 12),
      },
      {
        period: 'Bi-Weekly Paycheck',
        RegularBase: Math.round(regularAnnual / 26),
        OvertimeBonus: Math.round((overtimeAnnual + bonus) / 26),
      },
      {
        period: 'Weekly Paycheck',
        RegularBase: Math.round(regularAnnual / 52),
        OvertimeBonus: Math.round((overtimeAnnual + bonus) / 52),
      },
    ];

    return {
      baseHourly,
      annualGross,
      monthlyGross,
      semiMonthlyGross,
      biweeklyGross,
      weeklyGross,
      dailyGross,
      hrsWeek,
      daysWeek,
      paidWeeks,
      unpaidWeeks,
      otHrs,
      bonus,
      regularAnnual,
      overtimeAnnual,
      totalHoursWorkedAnnual,
      ot15Rate,
      ot20Rate,
      chartData,
    };
  }, [
    conversionDirection,
    hourlyWage,
    targetAnnualSalary,
    hoursPerWeek,
    daysPerWeek,
    unpaidWeeksOff,
    overtimeHoursWeekly,
    annualBonus,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Wage Conversion: $${calculation.baseHourly.toFixed(2)}/hr ↔ $${formatCurrency(calculation.annualGross)}/yr ($${formatCurrency(calculation.biweeklyGross)} bi-weekly, ${calculation.hrsWeek} hrs/wk)`,
        { hourlyWage, targetAnnualSalary, hoursPerWeek, unpaidWeeksOff, overtimeHoursWeekly, annualBonus },
        {
          annualGross: calculation.annualGross,
          monthlyGross: calculation.monthlyGross,
          biweeklyGross: calculation.biweeklyGross,
          baseHourly: calculation.baseHourly,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Hourly Wage &amp; Annual Salary Converter
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            <strong className="text-blue-700 dark:text-blue-300 font-bold font-mono text-base">
              ${calculation.baseHourly.toFixed(2)}/hr
            </strong>{' '}
            at {calculation.hrsWeek} hrs/wk ({calculation.paidWeeks} paid weeks) ={' '}
            <strong className="text-slate-900 dark:text-white font-mono font-bold text-base">
              ${formatCurrency(calculation.annualGross)}/year
            </strong>{' '}
            (or{' '}
            <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              ${formatCurrency(calculation.biweeklyGross)} bi-weekly
            </strong>
            ).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Gross Annual Salary</span>
            <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
              ${formatCurrency(calculation.annualGross)}
            </span>
          </div>
        </div>
      </div>

      {/* Mode Selector & Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Direction & Core Pay */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Conversion Direction
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setConversionDirection('hourly_to_salary')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
                conversionDirection === 'hourly_to_salary'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Hourly Rate → Salary
            </button>
            <button
              type="button"
              onClick={() => setConversionDirection('salary_to_hourly')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
                conversionDirection === 'salary_to_hourly'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Salary → Hourly Rate
            </button>
          </div>

          {conversionDirection === 'hourly_to_salary' ? (
            <CalcInput
              id="hourlyWage"
              label="Standard Hourly Wage"
              value={hourlyWage}
              onChange={(val) => setHourlyWage(val)}
              min={1}
              max={1000}
              step={0.5}
              prefix="$"
            />
          ) : (
            <CalcInput
              id="targetAnnualSalary"
              label="Gross Annual Target Salary"
              value={targetAnnualSalary}
              onChange={(val) => setTargetAnnualSalary(val)}
              min={5000}
              max={2000000}
              step={1000}
              prefix="$"
            />
          )}

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="hoursPerWeek"
              label="Hours / Week"
              value={hoursPerWeek}
              onChange={(val) => setHoursPerWeek(val)}
              min={1}
              max={80}
              step={1}
              suffix="hrs"
            />
            <CalcInput
              id="daysPerWeek"
              label="Days / Week"
              value={daysPerWeek}
              onChange={(val) => setDaysPerWeek(val)}
              min={1}
              max={7}
              step={1}
              suffix="days"
            />
          </div>
        </div>

        {/* Right: Overtime, PTO & Bonus */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Schedule, PTO &amp; Overtime
            </h4>
          </div>

          <CalcInput
            id="unpaidWeeksOff"
            label="Unpaid Vacation / Time Off"
            value={unpaidWeeksOff}
            onChange={(val) => setUnpaidWeeksOff(val)}
            min={0}
            max={52}
            step={1}
            suffix="wks"
            helpText={`${calculation.paidWeeks} paid work weeks per calendar year`}
          />

          <CalcInput
            id="overtimeHoursWeekly"
            label="Overtime Hours per Week (1.5x)"
            value={overtimeHoursWeekly}
            onChange={(val) => setOvertimeHoursWeekly(val)}
            min={0}
            max={40}
            step={1}
            suffix="hrs"
            helpText={`1.5x OT Rate: $${calculation.ot15Rate.toFixed(2)}/hr`}
          />

          <CalcInput
            id="annualBonus"
            label="Annual Bonus / Commissions"
            value={annualBonus}
            onChange={(val) => setAnnualBonus(val)}
            min={0}
            max={500000}
            step={500}
            prefix="$"
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Annual Gross Salary"
          value={`$${formatCurrency(calculation.annualGross)}`}
          subtitle={`${calculation.totalHoursWorkedAnnual.toLocaleString()} total work hours/year`}
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Monthly Gross Pay"
          value={`$${formatCurrency(calculation.monthlyGross)}`}
          subtitle="Based on 12 calendar months"
          icon={<Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Bi-Weekly Paycheck"
          value={`$${formatCurrency(calculation.biweeklyGross)}`}
          subtitle="26 paychecks / year (standard)"
          icon={<Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Base Hourly Rate"
          value={`$${calculation.baseHourly.toFixed(2)}/hr`}
          subtitle={`1.5x OT: $${calculation.ot15Rate.toFixed(2)} | 2x: $${calculation.ot20Rate.toFixed(2)}`}
          icon={<Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />
      </div>

      {/* Granular Pay Period Equivalent Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pay Period Equivalency Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Pay Frequency</th>
                <th className="py-2.5 px-3">Periods / Year</th>
                <th className="py-2.5 px-3">Gross Payment</th>
                <th className="py-2.5 px-3 text-right">Annual Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Hourly Rate</td>
                <td className="py-2.5 px-3 text-slate-500">{calculation.totalHoursWorkedAnnual} hrs</td>
                <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-bold">
                  ${calculation.baseHourly.toFixed(2)} / hr
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                  ${formatCurrency(calculation.annualGross)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Daily Pay</td>
                <td className="py-2.5 px-3 text-slate-500">{calculation.paidWeeks * calculation.daysWeek} days</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                  ${formatCurrency(calculation.dailyGross)} / day
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                  ${formatCurrency(calculation.annualGross)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Weekly Pay</td>
                <td className="py-2.5 px-3 text-slate-500">{calculation.paidWeeks} weeks</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                  ${formatCurrency(calculation.weeklyGross)} / wk
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                  ${formatCurrency(calculation.annualGross)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-blue-50/40 dark:bg-blue-950/20">
                <td className="py-2.5 px-3 font-sans font-semibold text-blue-700 dark:text-blue-300">Bi-Weekly Pay</td>
                <td className="py-2.5 px-3 text-slate-500">26 paychecks</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                  ${formatCurrency(calculation.biweeklyGross)} / paycheck
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                  ${formatCurrency(calculation.annualGross)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                  Semi-Monthly Pay
                </td>
                <td className="py-2.5 px-3 text-slate-500">24 paychecks (1st &amp; 15th)</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                  ${formatCurrency(calculation.semiMonthlyGross)} / paycheck
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                  ${formatCurrency(calculation.annualGross)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">Monthly Pay</td>
                <td className="py-2.5 px-3 text-slate-500">12 months</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                  ${formatCurrency(calculation.monthlyGross)} / month
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                  ${formatCurrency(calculation.annualGross)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Pay Distribution Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          Pay Period Income Allocation: Base Wages vs Overtime / Bonus
        </h3>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} />
              <YAxis
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11 }}
              />
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
              <Bar dataKey="RegularBase" name="Regular Base Pay ($)" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
              <Bar
                dataKey="OvertimeBonus"
                name="Overtime & Bonuses ($)"
                stackId="a"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
