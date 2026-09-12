import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { CreditCard, DollarSign, Percent, Calendar, AlertCircle, Sparkles, TrendingDown, Clock, ShieldAlert } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const CreditCardPayoffCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [balance, setBalance] = useState<number>(() => initialPreset?.balance ?? 7500);
  const [interestApr, setInterestApr] = useState<number>(() => initialPreset?.interestApr ?? 24.99);
  const [calcMode, setCalcMode] = useState<'fixed_payment' | 'target_months'>('fixed_payment');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(250);
  const [targetMonths, setTargetMonths] = useState<number>(24);

  const calculation = useMemo(() => {
    const bal = Math.max(10, safeParseNumber(balance, 7500));
    const apr = Math.max(0, safeParseNumber(interestApr, 24.99)) / 100;
    const monthlyRate = apr / 12;

    // Minimum Payment Trap Simulation
    // Standard credit card min payment rule: max($35, 1% of balance + monthly interest)
    let minPayBal = bal;
    let minPayTotalInterest = 0;
    let minPayMonths = 0;
    const minPayCurve: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }];

    while (minPayBal > 1 && minPayMonths < 600) {
      minPayMonths++;
      const monthlyInt = minPayBal * monthlyRate;
      minPayTotalInterest += monthlyInt;

      // Minimum payment calculation
      const standardMin = Math.max(35, minPayBal * 0.01 + monthlyInt);
      const actualMinPayment = Math.min(minPayBal + monthlyInt, standardMin);

      const principalPaid = actualMinPayment - monthlyInt;
      minPayBal = Math.max(0, minPayBal - principalPaid);

      if (minPayMonths % 6 === 0 || minPayBal <= 1) {
        minPayCurve.push({ month: minPayMonths, balance: Math.round(minPayBal) });
      }
    }

    // User Plan Calculation
    let requiredPayment = monthlyPayment;
    let payoffMonths = 0;
    let userTotalInterest = 0;
    let isPaymentTooLow = false;

    if (calcMode === 'target_months') {
      const n = Math.max(1, Math.min(360, safeParseNumber(targetMonths, 24)));
      if (monthlyRate > 0) {
        requiredPayment =
          (bal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      } else {
        requiredPayment = bal / n;
      }
      payoffMonths = n;
      userTotalInterest = Math.max(0, requiredPayment * n - bal);
    } else {
      const pmt = Math.max(1, safeParseNumber(monthlyPayment, 250));
      requiredPayment = pmt;

      const monthlyInterestStart = bal * monthlyRate;
      if (monthlyRate > 0 && pmt <= monthlyInterestStart) {
        isPaymentTooLow = true;
        payoffMonths = 9999;
      } else {
        let userBal = bal;
        while (userBal > 0.01 && payoffMonths < 600) {
          payoffMonths++;
          const monthlyInt = userBal * monthlyRate;
          userTotalInterest += monthlyInt;
          const prin = Math.min(userBal, pmt - monthlyInt);
          userBal -= prin;
        }
      }
    }

    // Chart trajectory combining user plan and min payment
    const chartData = [];
    let curUserBal = bal;
    let curMinBal = bal;

    const maxMonthsToChart = Math.min(120, Math.max(payoffMonths, Math.min(minPayMonths, 120)));

    for (let m = 0; m <= maxMonthsToChart; m++) {
      if (m > 0) {
        // Step user balance
        if (curUserBal > 0.01 && !isPaymentTooLow) {
          const userInt = curUserBal * monthlyRate;
          const userPrin = Math.min(curUserBal, requiredPayment - userInt);
          curUserBal = Math.max(0, curUserBal - userPrin);
        }

        // Step min payment balance
        if (curMinBal > 1) {
          const minInt = curMinBal * monthlyRate;
          const standardMin = Math.max(35, curMinBal * 0.01 + minInt);
          const actualMin = Math.min(curMinBal + minInt, standardMin);
          curMinBal = Math.max(0, curMinBal - (actualMin - minInt));
        }
      }

      if (m % 3 === 0 || m === maxMonthsToChart) {
        chartData.push({
          month: `M${m}`,
          monthNum: m,
          userPlanBalance: Math.round(curUserBal),
          minimumPaymentBalance: Math.round(curMinBal),
        });
      }
    }

    const interestSavedVsMin = Math.max(0, minPayTotalInterest - userTotalInterest);
    const monthsSavedVsMin = Math.max(0, minPayMonths - payoffMonths);
    const yearsSavedVsMin = (monthsSavedVsMin / 12).toFixed(1);

    const totalOutlayUser = bal + userTotalInterest;
    const totalOutlayMin = bal + minPayTotalInterest;

    return {
      bal,
      apr: apr * 100,
      monthlyRate,
      requiredPayment,
      payoffMonths,
      userTotalInterest,
      totalOutlayUser,
      isPaymentTooLow,
      minPayMonths,
      minPayTotalInterest,
      totalOutlayMin,
      interestSavedVsMin,
      monthsSavedVsMin,
      yearsSavedVsMin,
      chartData,
    };
  }, [balance, interestApr, calcMode, monthlyPayment, targetMonths]);

  const handleSave = () => {
    if (onSaveHistory && !calculation.isPaymentTooLow) {
      onSaveHistory(
        `Credit Card Payoff: $${formatCurrency(calculation.requiredPayment)}/mo pays off $${formatNumber(balance)} in ${calculation.payoffMonths} mos (saves $${formatCurrency(calculation.interestSavedVsMin)} vs min payment)`,
        { balance, interestApr, monthlyPayment, calcMode, targetMonths },
        {
          payoffMonths: calculation.payoffMonths,
          totalInterest: calculation.userTotalInterest,
          interestSavedVsMin: calculation.interestSavedVsMin,
          requiredPayment: calculation.requiredPayment,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 p-5 rounded-2xl border border-rose-200 dark:border-rose-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Credit Card Debt Elimination &amp; Payoff Strategy
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {calculation.isPaymentTooLow ? (
              <span className="text-rose-600 font-bold">
                Warning: Monthly payment is lower than monthly interest charges! Debt will grow indefinitely.
              </span>
            ) : (
              <>
                Debt Free in:{' '}
                <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono text-base">
                  {Math.floor(calculation.payoffMonths / 12)} yrs {calculation.payoffMonths % 12} mos
                </strong>{' '}
                ({calculation.payoffMonths} months). Total Interest:{' '}
                <strong className="font-mono font-bold">${formatCurrency(calculation.userTotalInterest)}</strong>.
                You save{' '}
                <strong className="text-emerald-600 font-bold font-mono">
                  ${formatCurrency(calculation.interestSavedVsMin)}
                </strong>{' '}
                vs minimum payments!
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {calcMode === 'fixed_payment' ? 'Current Monthly Plan' : 'Required Monthly Payment'}
            </span>
            <span className="text-xl font-black font-mono text-rose-600 dark:text-rose-400">
              ${formatCurrency(calculation.requiredPayment)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Card Balance & Rate */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Credit Card Balance &amp; Interest
            </h4>
          </div>

          <CalcInput
            id="balance"
            label="Total Credit Card Balance"
            value={balance}
            onChange={(val) => setBalance(val)}
            min={100}
            max={200000}
            step={100}
            prefix="$"
          />

          <CalcInput
            id="interestApr"
            label="Annual Percentage Rate (APR)"
            value={interestApr}
            onChange={(val) => setInterestApr(val)}
            min={0}
            max={45}
            step={0.25}
            suffix="%"
            helpText={`Monthly interest charge on balance: ~$${formatNumber(Math.round((balance * (interestApr / 100)) / 12))}/mo`}
          />
        </div>

        {/* Right: Strategy & Payment Target */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Payoff Strategy Mode
            </h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Calculation Strategy
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCalcMode('fixed_payment')}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition border ${
                  calcMode === 'fixed_payment'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Fixed Monthly Payment
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('target_months')}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition border ${
                  calcMode === 'target_months'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Target Payoff Timeline
              </button>
            </div>
          </div>

          {calcMode === 'fixed_payment' ? (
            <CalcInput
              id="monthlyPayment"
              label="Planned Monthly Payment"
              value={monthlyPayment}
              onChange={(val) => setMonthlyPayment(val)}
              min={10}
              max={10000}
              step={25}
              prefix="$"
              helpText="Must exceed monthly interest charges to pay down debt."
            />
          ) : (
            <CalcInput
              id="targetMonths"
              label="Target Months to Debt Freedom"
              value={targetMonths}
              onChange={(val) => setTargetMonths(val)}
              min={3}
              max={120}
              step={1}
              suffix="mos"
              helpText={`${(targetMonths / 12).toFixed(1)} years`}
            />
          )}
        </div>
      </div>

      {/* Payment Too Low Warning */}
      {calculation.isPaymentTooLow && (
        <div className="p-4 bg-rose-100 dark:bg-rose-950/60 rounded-xl border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-sm font-bold">Payment is below minimum monthly interest!</strong>
            <p>
              Your current monthly payment of <strong>${formatCurrency(monthlyPayment)}</strong> does not even cover
              the <strong>${formatCurrency((balance * (interestApr / 100)) / 12)}</strong> in monthly interest accrued
              at {interestApr}% APR. Increase your payment to at least $
              {formatNumber(Math.ceil((balance * (interestApr / 100)) / 12) + 20)}/mo to begin reducing principal.
            </p>
          </div>
        </div>
      )}

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Time to Zero Debt"
          value={
            calculation.isPaymentTooLow
              ? 'Never'
              : `${Math.floor(calculation.payoffMonths / 12)}y ${calculation.payoffMonths % 12}m`
          }
          subtitle={
            calculation.isPaymentTooLow
              ? 'Payment too low'
              : `${calculation.payoffMonths} consecutive monthly payments`
          }
          highlighted={!calculation.isPaymentTooLow}
          icon={<Clock className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        />

        <CalcResultCard
          title="Interest Saved vs Minimum"
          value={`$${formatCurrency(calculation.interestSavedVsMin)}`}
          subtitle={`Avoids the $${formatCurrency(calculation.minPayTotalInterest)} min-payment trap`}
          icon={<TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Total Interest Paid"
          value={`$${formatCurrency(calculation.userTotalInterest)}`}
          subtitle={`Total financing cost at ${interestApr}% APR`}
          icon={<Percent className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        />

        <CalcResultCard
          title="Total Out-of-Pocket Outlay"
          value={`$${formatCurrency(calculation.totalOutlayUser)}`}
          subtitle="Principal balance + total interest"
          icon={<DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      {/* Comparison: Minimum Payment Trap vs Your Plan */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            The Credit Card Minimum Payment Trap Exposed
          </h3>
          <span className="text-xs text-slate-500">Your Plan vs 2% / $35 Minimum Payment</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Minimum Payment Box */}
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900 space-y-2">
            <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-800 pb-2">
              <span className="font-bold text-rose-900 dark:text-rose-200">Standard Minimum Payments</span>
              <span className="text-[10px] bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100 font-bold px-2 py-0.5 rounded-full">
                Predatory Trap
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Time to Pay Off:</span>
              <strong className="text-rose-700 dark:text-rose-300 font-mono">
                {Math.floor(calculation.minPayMonths / 12)} yrs {calculation.minPayMonths % 12} mos (
                {calculation.minPayMonths} mos)
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Interest Paid:</span>
              <strong className="text-rose-700 dark:text-rose-300 font-mono">
                ${formatCurrency(calculation.minPayTotalInterest)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Amount Repaid:</span>
              <strong className="text-rose-700 dark:text-rose-300 font-mono">
                ${formatCurrency(calculation.totalOutlayMin)}
              </strong>
            </div>
          </div>

          {/* Your Aggressive Plan Box */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800 pb-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Your Structured Payoff Plan</span>
              <span className="text-[10px] bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 font-bold px-2 py-0.5 rounded-full">
                Smart Strategy
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Time to Pay Off:</span>
              <strong className="text-emerald-700 dark:text-emerald-300 font-mono">
                {Math.floor(calculation.payoffMonths / 12)} yrs {calculation.payoffMonths % 12} mos (
                {calculation.payoffMonths} mos)
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Interest Paid:</span>
              <strong className="text-emerald-700 dark:text-emerald-300 font-mono">
                ${formatCurrency(calculation.userTotalInterest)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Net Money Saved:</span>
              <strong className="text-emerald-700 dark:text-emerald-300 font-mono font-bold text-sm">
                +${formatCurrency(calculation.interestSavedVsMin)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Balance Reduction Curve Area Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-rose-500" />
          Balance Payoff Curve: Your Plan vs Minimum Payment Trap
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="userPlanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="minPayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
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
                dataKey="minimumPaymentBalance"
                name="Minimum Payment Balance"
                stroke="#f43f5e"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#minPayGrad)"
              />
              <Area
                type="monotone"
                dataKey="userPlanBalance"
                name="Your Fixed Payoff Plan"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#userPlanGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
