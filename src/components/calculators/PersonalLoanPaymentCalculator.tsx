import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { DollarSign, Percent, Calendar, ShieldCheck, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const PersonalLoanPaymentCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [loanAmount, setLoanAmount] = useState<number>(() => initialPreset?.loanAmount ?? 15000);
  const [interestApr, setInterestApr] = useState<number>(() => initialPreset?.interestApr ?? 11.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(() => initialPreset?.loanTermMonths ?? 36);
  const [originationFeePercent, setOriginationFeePercent] = useState<number>(() => initialPreset?.originationFeePercent ?? 2.5);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);

  const calculation = useMemo(() => {
    const P = Math.max(500, safeParseNumber(loanAmount, 15000));
    const annualRate = Math.max(0, safeParseNumber(interestApr, 11.5)) / 100;
    const r = annualRate / 12;
    const n = Math.max(6, Math.min(120, safeParseNumber(loanTermMonths, 36)));
    const feePct = Math.max(0, safeParseNumber(originationFeePercent, 0)) / 100;
    const extra = Math.max(0, safeParseNumber(extraMonthlyPayment, 0));

    const originationFeeDollar = P * feePct;
    const netDisbursed = P - originationFeeDollar;

    // Monthly payment formula
    let monthlyPI = 0;
    if (r > 0) {
      monthlyPI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      monthlyPI = P / n;
    }

    const standardTotalPayments = monthlyPI * n;
    const standardTotalInterest = standardTotalPayments - P;
    const standardTotalCost = standardTotalInterest + originationFeeDollar;

    // True Effective APR accounting for upfront origination fee deduction
    // Solve netDisbursed = sum_{t=1}^n [ monthlyPI / (1 + r_eff)^t ]
    // High-accuracy approximation
    let effectiveApr = annualRate * 100;
    if (netDisbursed > 0 && n > 0) {
      effectiveApr = ((standardTotalCost / netDisbursed) / (n / 12)) * 100;
    }

    // Schedule simulation with extra payments
    let curBal = P;
    let totalInterestExtra = 0;
    let payoffMonths = 0;
    const schedule: { year: number; balance: number; principalPaid: number; interestPaid: number }[] = [];
    const chartData = [{ month: 'M0', monthNum: 0, standardBalance: Math.round(P), acceleratedBalance: Math.round(P) }];

    let accPrinYear = 0;
    let accIntYear = 0;

    for (let m = 1; m <= n; m++) {
      if (curBal > 0.01) {
        const intMonth = curBal * r;
        totalInterestExtra += intMonth;
        accIntYear += intMonth;

        const totalPayThisMonth = monthlyPI + extra;
        const prinMonth = Math.min(curBal, totalPayThisMonth - intMonth);
        accPrinYear += prinMonth;
        curBal = Math.max(0, curBal - prinMonth);
        payoffMonths = m;
      }

      if (m % 12 === 0 || m === n || curBal <= 0.01) {
        const yr = Math.ceil(m / 12);
        if (!schedule.some((s) => s.year === yr)) {
          schedule.push({
            year: yr,
            balance: Math.round(curBal),
            principalPaid: Math.round(accPrinYear),
            interestPaid: Math.round(accIntYear),
          });
          accPrinYear = 0;
          accIntYear = 0;
        }
      }

      // Standard balance curve at month m
      let stdBal = P;
      if (r > 0) {
        stdBal = P * (Math.pow(1 + r, n) - Math.pow(1 + r, m)) / (Math.pow(1 + r, n) - 1);
      } else {
        stdBal = P - (P / n) * m;
      }

      if (m % 3 === 0 || m === n) {
        chartData.push({
          month: `M${m}`,
          monthNum: m,
          standardBalance: Math.max(0, Math.round(stdBal)),
          acceleratedBalance: Math.max(0, Math.round(curBal)),
        });
      }

      if (curBal <= 0.01 && m >= payoffMonths && extra > 0) {
        // fill remaining months with zero balance for chart if accelerated
        if (m === n) {
          chartData.push({
            month: `M${m}`,
            monthNum: m,
            standardBalance: 0,
            acceleratedBalance: 0,
          });
        }
      }
    }

    const interestSaved = Math.max(0, standardTotalInterest - totalInterestExtra);
    const monthsSaved = Math.max(0, n - payoffMonths);

    return {
      loanPrincipal: P,
      annualRate: annualRate * 100,
      termMonths: n,
      originationFeeDollar,
      netDisbursed,
      monthlyPI,
      standardTotalPayments,
      standardTotalInterest,
      standardTotalCost,
      effectiveApr,
      extra,
      payoffMonths,
      totalInterestExtra,
      interestSaved,
      monthsSaved,
      schedule,
      chartData,
    };
  }, [loanAmount, interestApr, loanTermMonths, originationFeePercent, extraMonthlyPayment]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Personal Loan: $${formatNumber(calculation.loanPrincipal)} @ ${calculation.annualRate}% for ${calculation.termMonths} mos — $${formatCurrency(calculation.monthlyPI)}/mo (Cost: $${formatCurrency(calculation.standardTotalCost)})`,
        { loanAmount, interestApr, loanTermMonths, originationFeePercent, extraMonthlyPayment },
        {
          monthlyPayment: calculation.monthlyPI,
          totalInterest: calculation.standardTotalInterest,
          netDisbursed: calculation.netDisbursed,
          effectiveApr: calculation.effectiveApr,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Personal Loan Installment &amp; Total Cost Breakdown
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Estimated Monthly Payment:{' '}
            <strong className="text-blue-700 dark:text-blue-300 font-bold font-mono text-base">
              ${formatCurrency(calculation.monthlyPI)}/mo
            </strong>{' '}
            for {calculation.termMonths} months. Total Interest:{' '}
            <strong className="font-mono font-bold">${formatCurrency(calculation.standardTotalInterest)}</strong>. Net
            Cash Disbursed:{' '}
            <strong className="text-slate-900 dark:text-white font-mono font-bold">
              ${formatCurrency(calculation.netDisbursed)}
            </strong>
            .
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Fixed Monthly Payment
            </span>
            <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
              ${formatCurrency(calculation.monthlyPI)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Principal & Term */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Loan Amount &amp; Duration
            </h4>
          </div>

          <CalcInput
            id="loanAmount"
            label="Personal Loan Amount"
            value={loanAmount}
            onChange={(val) => setLoanAmount(val)}
            min={1000}
            max={100000}
            step={500}
            prefix="$"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Loan Term ({loanTermMonths} Months / {(loanTermMonths / 12).toFixed(1)} Yrs)
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[12, 24, 36, 48, 60].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setLoanTermMonths(m)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    loanTermMonths === m
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {m} mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interest, Fees & Extra Principal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Percent className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Interest, Fees &amp; Prepayment
            </h4>
          </div>

          <CalcInput
            id="interestApr"
            label="Nominal Interest Rate (APR)"
            value={interestApr}
            onChange={(val) => setInterestApr(val)}
            min={3}
            max={36}
            step={0.25}
            suffix="%"
          />

          <CalcInput
            id="originationFeePercent"
            label="Lender Origination Fee"
            value={originationFeePercent}
            onChange={(val) => setOriginationFeePercent(val)}
            min={0}
            max={10}
            step={0.25}
            suffix="%"
            helpText={`Deducted upfront: $${formatNumber(Math.round(calculation.originationFeeDollar))} fee`}
          />

          <CalcInput
            id="extraMonthlyPayment"
            label="Extra Monthly Principal Prepayment"
            value={extraMonthlyPayment}
            onChange={(val) => setExtraMonthlyPayment(val)}
            min={0}
            max={5000}
            step={25}
            prefix="$"
            helpText="Shortens loan term and eliminates future interest."
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Monthly Payment (P&I)"
          value={`$${formatCurrency(calculation.monthlyPI)}`}
          subtitle={`${calculation.termMonths} fixed monthly installments`}
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Net Cash Disbursed"
          value={`$${formatCurrency(calculation.netDisbursed)}`}
          subtitle={`After $${formatCurrency(calculation.originationFeeDollar)} (${originationFeePercent}%) upfront fee`}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Total Lifetime Interest"
          value={`$${formatCurrency(calculation.standardTotalInterest)}`}
          subtitle={`At ${interestApr}% nominal APR over ${calculation.termMonths} mos`}
          icon={<Percent className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        />

        <CalcResultCard
          title="Effective Total APR"
          value={`${calculation.effectiveApr.toFixed(2)}%`}
          subtitle="True annual cost including origination fee"
          icon={<Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />
      </div>

      {/* Prepayment Acceleration Savings Banner */}
      {extraMonthlyPayment > 0 && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
          <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-sm font-bold block">Prepayment Accelerator Active!</strong>
            <p>
              By paying an extra <strong>${formatCurrency(extraMonthlyPayment)}/mo</strong>, you will pay off your
              personal loan <strong>{calculation.monthsSaved} months early</strong> (in {calculation.payoffMonths}{' '}
              months) and save{' '}
              <strong className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                ${formatCurrency(calculation.interestSaved)}
              </strong>{' '}
              in interest.
            </p>
          </div>
        </div>
      )}

      {/* Loan Balance Decay Area Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          Personal Loan Balance Reduction Trajectory
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="personalLoanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
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
                dataKey="standardBalance"
                name="Standard Loan Balance ($)"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#personalLoanGrad)"
              />
              {extraMonthlyPayment > 0 && (
                <Area
                  type="monotone"
                  dataKey="acceleratedBalance"
                  name="Accelerated Loan Balance ($)"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={0}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Annual Amortization Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Annual Amortization Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3">Principal Paid</th>
                <th className="py-2.5 px-3">Interest Paid</th>
                <th className="py-2.5 px-3 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {calculation.schedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                    Year {row.year}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">
                    ${row.principalPaid.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-rose-500">${row.interestPaid.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white">
                    ${row.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
