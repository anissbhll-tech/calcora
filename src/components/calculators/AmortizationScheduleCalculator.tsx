import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { Table, DollarSign, Percent, Calendar, Sparkles, TrendingDown, Clock } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const AmortizationScheduleCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [loanAmount, setLoanAmount] = useState<number>(() => initialPreset?.loanAmount ?? 300000);
  const [interestRate, setInterestRate] = useState<number>(() => initialPreset?.interestRate ?? 6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(() => initialPreset?.loanTermYears ?? 30);
  const [extraMonthlyPrincipal, setExtraMonthlyPrincipal] = useState<number>(100);
  const [lumpSumAmount, setLumpSumAmount] = useState<number>(5000);
  const [lumpSumMonth, setLumpSumMonth] = useState<number>(12);
  const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');

  const calculation = useMemo(() => {
    const principal = Math.max(100, safeParseNumber(loanAmount, 300000));
    const apr = Math.max(0, safeParseNumber(interestRate, 6.5)) / 100;
    const years = Math.max(1, Math.min(50, safeParseNumber(loanTermYears, 30)));
    const totalMonths = years * 12;
    const monthlyRate = apr / 12;

    const extraMonthly = Math.max(0, safeParseNumber(extraMonthlyPrincipal, 0));
    const lumpAmount = Math.max(0, safeParseNumber(lumpSumAmount, 0));
    const lumpMonth = Math.max(1, safeParseNumber(lumpSumMonth, 12));

    // Standard Monthly P&I
    let standardMonthlyPayment = 0;
    if (monthlyRate > 0 && totalMonths > 0) {
      standardMonthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      standardMonthlyPayment = principal / totalMonths;
    }

    const standardTotalCost = standardMonthlyPayment * totalMonths;
    const standardTotalInterest = Math.max(0, standardTotalCost - principal);

    // Accelerated Amortization Simulation
    let balance = principal;
    let stdBalance = principal;
    let accumulatedInterest = 0;
    let accumulatedPrincipal = 0;
    let actualPayoffMonth = totalMonths;

    const monthlySchedule = [];
    const yearlySchedule = [];

    let yearPrincipalAcc = 0;
    let yearInterestAcc = 0;

    for (let m = 1; m <= totalMonths && (balance > 0.001 || stdBalance > 0.001); m++) {
      // Standard baseline tracking
      const stdInterest = stdBalance > 0 ? stdBalance * monthlyRate : 0;
      const stdPrin = stdBalance > 0 ? Math.min(stdBalance, standardMonthlyPayment - stdInterest) : 0;
      stdBalance = Math.max(0, stdBalance - stdPrin);

      // Accelerated tracking
      if (balance > 0.001) {
        const interestThisMonth = balance * monthlyRate;
        let paymentThisMonth = standardMonthlyPayment + extraMonthly;

        if (m === lumpMonth) {
          paymentThisMonth += lumpAmount;
        }

        let principalThisMonth = paymentThisMonth - interestThisMonth;
        if (principalThisMonth > balance) {
          principalThisMonth = balance;
          paymentThisMonth = principalThisMonth + interestThisMonth;
        }

        balance = Math.max(0, balance - principalThisMonth);
        accumulatedInterest += interestThisMonth;
        accumulatedPrincipal += principalThisMonth;
        yearPrincipalAcc += principalThisMonth;
        yearInterestAcc += interestThisMonth;
        actualPayoffMonth = m;

        monthlySchedule.push({
          month: m,
          payment: paymentThisMonth,
          principal: principalThisMonth,
          interest: interestThisMonth,
          balance: balance,
          accumulatedInterest: accumulatedInterest,
        });
      }

      if (m % 12 === 0 || balance <= 0.001 || m === totalMonths) {
        const yr = Math.ceil(m / 12);
        // Avoid duplicate year entries if loan paid off mid-year
        if (!yearlySchedule.find((y) => y.year === yr)) {
          yearlySchedule.push({
            year: yr,
            label: `Yr ${yr}`,
            yearPrincipal: Math.round(yearPrincipalAcc),
            yearInterest: Math.round(yearInterestAcc),
            balance: Math.round(balance),
            stdBalance: Math.round(stdBalance),
            accumulatedInterest: Math.round(accumulatedInterest),
          });
          yearPrincipalAcc = 0;
          yearInterestAcc = 0;
        }
      }
    }

    const interestSaved = Math.max(0, standardTotalInterest - accumulatedInterest);
    const monthsSaved = Math.max(0, totalMonths - actualPayoffMonth);
    const yearsSaved = (monthsSaved / 12).toFixed(1);
    const acceleratedTotalCost = principal + accumulatedInterest;

    return {
      principal,
      standardMonthlyPayment,
      standardTotalInterest,
      standardTotalCost,
      accumulatedInterest,
      acceleratedTotalCost,
      interestSaved,
      monthsSaved,
      yearsSaved,
      actualPayoffMonth,
      totalMonths,
      monthlySchedule,
      yearlySchedule,
    };
  }, [loanAmount, interestRate, loanTermYears, extraMonthlyPrincipal, lumpSumAmount, lumpSumMonth]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Amortization: $${formatCurrency(calculation.standardMonthlyPayment)}/mo ($${formatNumber(loanAmount)} @ ${interestRate}%), Saved $${formatCurrency(calculation.interestSaved)} with extra payments`,
        { loanAmount, interestRate, loanTermYears, extraMonthlyPrincipal, lumpSumAmount },
        {
          monthlyPayment: calculation.standardMonthlyPayment,
          totalInterest: calculation.accumulatedInterest,
          interestSaved: calculation.interestSaved,
          yearsSaved: calculation.yearsSaved,
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
            <Table className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Loan Amortization &amp; Principal Reduction Engine
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Standard Monthly Payment:{' '}
            <strong className="text-blue-700 dark:text-blue-300 font-bold font-mono text-base">
              ${formatCurrency(calculation.standardMonthlyPayment)}/mo
            </strong>
            . Lifetime Interest Saved:{' '}
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              ${formatCurrency(calculation.interestSaved)}
            </strong>{' '}
            (shaves <strong>{calculation.yearsSaved} years</strong> off payoff).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Payoff Timeline
            </span>
            <span className="text-lg font-black font-mono text-teal-600 dark:text-teal-400">
              {Math.floor(calculation.actualPayoffMonth / 12)} yrs {calculation.actualPayoffMonth % 12} mos
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Base Loan Parameters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Base Loan Terms
            </h4>
          </div>

          <CalcInput
            id="loanAmount"
            label="Loan Principal Amount"
            value={loanAmount}
            onChange={(val) => setLoanAmount(val)}
            min={1000}
            max={10000000}
            step={5000}
            prefix="$"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="interestRate"
              label="Annual Interest Rate (APR)"
              value={interestRate}
              onChange={(val) => setInterestRate(val)}
              min={0.1}
              max={30}
              step={0.125}
              suffix="%"
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Loan Term (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value={30}>30 Years (360 mos)</option>
                <option value={25}>25 Years (300 mos)</option>
                <option value={20}>20 Years (240 mos)</option>
                <option value={15}>15 Years (180 mos)</option>
                <option value={10}>10 Years (120 mos)</option>
                <option value={5}>5 Years (60 mos)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Accelerated Payoff Options */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Extra Principal Prepayments
            </h4>
          </div>

          <CalcInput
            id="extraMonthlyPrincipal"
            label="Extra Monthly Principal Payment"
            value={extraMonthlyPrincipal}
            onChange={(val) => setExtraMonthlyPrincipal(val)}
            min={0}
            max={10000}
            step={25}
            prefix="$"
            helpText="Applied directly toward balance every month"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="lumpSumAmount"
              label="One-Time Lump Sum"
              value={lumpSumAmount}
              onChange={(val) => setLumpSumAmount(val)}
              min={0}
              max={100000}
              step={500}
              prefix="$"
              helpText="e.g. bonus or tax refund"
            />

            <CalcInput
              id="lumpSumMonth"
              label="Lump Sum in Month #"
              value={lumpSumMonth}
              onChange={(val) => setLumpSumMonth(val)}
              min={1}
              max={360}
              step={1}
              helpText="Month applied (e.g. 12 = Yr 1)"
            />
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Monthly Payment (P&I)"
          value={`$${formatCurrency(calculation.standardMonthlyPayment)}`}
          subtitle="Standard monthly principal & interest"
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Total Interest Saved"
          value={`$${formatCurrency(calculation.interestSaved)}`}
          subtitle="Saved through extra principal payments"
          icon={<TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Time Shaved Off"
          value={`${calculation.yearsSaved} Years`}
          subtitle={`${calculation.monthsSaved} fewer monthly payments`}
          icon={<Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Accelerated Total Interest"
          value={`$${formatCurrency(calculation.accumulatedInterest)}`}
          subtitle={`vs $${formatCurrency(calculation.standardTotalInterest)} standard`}
          icon={<Percent className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      {/* Interactive Payoff Curve Comparison Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            Standard vs Accelerated Loan Amortization Trajectory
          </h3>
          <span className="text-xs text-slate-500">Remaining Balance Over Loan Term</span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.yearlySchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="accBalanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="stdBalanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
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
              <Area
                type="monotone"
                dataKey="stdBalance"
                name="Standard Payoff Balance"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#stdBalanceGrad)"
              />
              <Area
                type="monotone"
                dataKey="balance"
                name="Accelerated Balance (with extra)"
                stroke="#0d9488"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#accBalanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Amortization Table with Toggle (Yearly vs Monthly) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Table className="w-4 h-4 text-teal-500" />
            Amortization Payment Schedule
          </h3>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('yearly')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'yearly' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Year-by-Year
            </button>
            <button
              type="button"
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'monthly' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Month-by-Month
            </button>
          </div>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-xs text-left">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-2.5 px-3 font-semibold">{viewMode === 'yearly' ? 'Year' : 'Month'}</th>
                <th className="py-2.5 px-3 font-semibold">Principal Paid</th>
                <th className="py-2.5 px-3 font-semibold">Interest Paid</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative Interest</th>
                <th className="py-2.5 px-3 font-semibold">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {viewMode === 'yearly'
                ? calculation.yearlySchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">Year {row.year}</td>
                      <td className="py-2 px-3 font-mono text-teal-600 dark:text-teal-400 font-semibold">
                        ${row.yearPrincipal.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-mono text-red-500 dark:text-red-400">
                        ${row.yearInterest.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">
                        ${row.accumulatedInterest.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        ${row.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))
                : calculation.monthlySchedule.slice(0, 120).map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">Month {row.month}</td>
                      <td className="py-2 px-3 font-mono text-teal-600 dark:text-teal-400 font-semibold">
                        ${Math.round(row.principal).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-mono text-red-500 dark:text-red-400">
                        ${Math.round(row.interest).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">
                        ${Math.round(row.accumulatedInterest).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        ${Math.round(row.balance).toLocaleString()}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {viewMode === 'monthly' && calculation.monthlySchedule.length > 120 && (
          <p className="text-[11px] text-slate-400 text-center">
            Showing first 120 months. Switch to Year-by-Year view for the complete 30-year lifecycle.
          </p>
        )}
      </div>
    </div>
  );
};
