import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { ShieldCheck, DollarSign, Calendar, TrendingUp, Sparkles, Home, ShoppingCart, Activity, Car, Users, AlertTriangle } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const EmergencyFundCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  // Essential monthly budget categories
  const [housing, setHousing] = useState<number>(() => initialPreset?.housing ?? 1600);
  const [utilities, setUtilities] = useState<number>(() => initialPreset?.utilities ?? 300);
  const [groceries, setGroceries] = useState<number>(() => initialPreset?.groceries ?? 600);
  const [debtPayments, setDebtPayments] = useState<number>(() => initialPreset?.debtPayments ?? 400);
  const [healthcareInsurance, setHealthcareInsurance] = useState<number>(() => initialPreset?.healthcareInsurance ?? 350);
  const [transportation, setTransportation] = useState<number>(() => initialPreset?.transportation ?? 250);
  const [dependentsChildcare, setDependentsChildcare] = useState<number>(() => initialPreset?.dependentsChildcare ?? 200);

  // Fund targets & current status
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(() => initialPreset?.currentSavings ?? 5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [hysaApy, setHysaApy] = useState<number>(4.25);

  const calculation = useMemo(() => {
    const monthlyEssential =
      Math.max(0, safeParseNumber(housing, 0)) +
      Math.max(0, safeParseNumber(utilities, 0)) +
      Math.max(0, safeParseNumber(groceries, 0)) +
      Math.max(0, safeParseNumber(debtPayments, 0)) +
      Math.max(0, safeParseNumber(healthcareInsurance, 0)) +
      Math.max(0, safeParseNumber(transportation, 0)) +
      Math.max(0, safeParseNumber(dependentsChildcare, 0));

    const months = Math.max(1, Math.min(24, safeParseNumber(targetMonths, 6)));
    const targetFund = monthlyEssential * months;
    const current = Math.max(0, safeParseNumber(currentSavings, 0));
    const gap = Math.max(0, targetFund - current);
    const progressPercent = targetFund > 0 ? Math.min(100, (current / targetFund) * 100) : 100;

    const deposit = Math.max(0, safeParseNumber(monthlyContribution, 0));
    const apy = Math.max(0, safeParseNumber(hysaApy, 0)) / 100;
    const monthlyRate = apy / 12;

    // Simulation of savings timeline with HYSA interest compounding
    let simBal = current;
    let monthsToGoal = 0;
    let totalInterestEarned = 0;
    const chartData = [{ month: 'M0', monthNum: 0, balance: Math.round(current), target: Math.round(targetFund) }];

    if (gap <= 0) {
      monthsToGoal = 0;
    } else if (deposit <= 0 && monthlyRate <= 0) {
      monthsToGoal = 9999;
    } else {
      while (simBal < targetFund && monthsToGoal < 240) {
        monthsToGoal++;
        const monthlyInt = simBal * monthlyRate;
        totalInterestEarned += monthlyInt;
        simBal += deposit + monthlyInt;

        if (monthsToGoal % 3 === 0 || simBal >= targetFund) {
          chartData.push({
            month: `M${monthsToGoal}`,
            monthNum: monthsToGoal,
            balance: Math.round(simBal),
            target: Math.round(targetFund),
          });
        }
      }
    }

    const annualHysaYieldOnFullFund = targetFund * apy;

    return {
      monthlyEssential,
      targetMonths: months,
      targetFund,
      current,
      gap,
      progressPercent,
      deposit,
      monthsToGoal,
      totalInterestEarned,
      annualHysaYieldOnFullFund,
      chartData,
    };
  }, [
    housing,
    utilities,
    groceries,
    debtPayments,
    healthcareInsurance,
    transportation,
    dependentsChildcare,
    targetMonths,
    currentSavings,
    monthlyContribution,
    hysaApy,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Emergency Fund: Target $${formatNumber(calculation.targetFund)} (${calculation.targetMonths} mos @ $${formatNumber(calculation.monthlyEssential)}/mo) — ${calculation.progressPercent.toFixed(0)}% funded`,
        {
          monthlyEssential: calculation.monthlyEssential,
          targetMonths: calculation.targetMonths,
          currentSavings,
          monthlyContribution,
        },
        {
          targetFund: calculation.targetFund,
          fundingGap: calculation.gap,
          monthsToGoal: calculation.monthsToGoal,
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
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Emergency Reserve Safety Net &amp; Cushion Target
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Bare-Bones Monthly Outlay:{' '}
            <strong className="text-slate-900 dark:text-white font-mono font-bold">
              ${formatCurrency(calculation.monthlyEssential)}/mo
            </strong>
            . Target ({calculation.targetMonths} Months):{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-bold font-mono text-base">
              ${formatCurrency(calculation.targetFund)}
            </strong>
            . You are{' '}
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              {calculation.progressPercent.toFixed(1)}%
            </strong>{' '}
            funded.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Remaining Savings Gap
            </span>
            <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              ${formatCurrency(calculation.gap)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Essential Expenses Breakdown (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Monthly Essential Expenses (Bare-Bones Survival)
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              Total: ${formatNumber(calculation.monthlyEssential)}/mo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput
              id="housing"
              label="Housing (Rent / Mortgage PITI)"
              value={housing}
              onChange={(val) => setHousing(val)}
              min={0}
              max={15000}
              step={50}
              prefix="$"
            />

            <CalcInput
              id="utilities"
              label="Utilities (Power, Water, Gas, Internet)"
              value={utilities}
              onChange={(val) => setUtilities(val)}
              min={0}
              max={3000}
              step={25}
              prefix="$"
            />

            <CalcInput
              id="groceries"
              label="Groceries &amp; Basic Household"
              value={groceries}
              onChange={(val) => setGroceries(val)}
              min={0}
              max={5000}
              step={25}
              prefix="$"
            />

            <CalcInput
              id="debtPayments"
              label="Minimum Debt (Cards, Auto, Student)"
              value={debtPayments}
              onChange={(val) => setDebtPayments(val)}
              min={0}
              max={10000}
              step={25}
              prefix="$"
            />

            <CalcInput
              id="healthcareInsurance"
              label="Health &amp; Insurance Premiums"
              value={healthcareInsurance}
              onChange={(val) => setHealthcareInsurance(val)}
              min={0}
              max={5000}
              step={25}
              prefix="$"
            />

            <CalcInput
              id="transportation"
              label="Essential Transportation (Gas, Transit)"
              value={transportation}
              onChange={(val) => setTransportation(val)}
              min={0}
              max={3000}
              step={25}
              prefix="$"
            />

            <div className="sm:col-span-2">
              <CalcInput
                id="dependentsChildcare"
                label="Childcare &amp; Essential Dependent Care"
                value={dependentsChildcare}
                onChange={(val) => setDependentsChildcare(val)}
                min={0}
                max={6000}
                step={25}
                prefix="$"
              />
            </div>
          </div>
        </div>

        {/* Right: Targets & Savings Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Target Duration &amp; Funding Plan
            </h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Safety Cushion Target (Months)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTargetMonths(m)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    targetMonths === m
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {m} Mos
                </button>
              ))}
            </div>
          </div>

          <CalcInput
            id="currentSavings"
            label="Current Emergency Cash Saved"
            value={currentSavings}
            onChange={(val) => setCurrentSavings(val)}
            min={0}
            max={200000}
            step={250}
            prefix="$"
          />

          <CalcInput
            id="monthlyContribution"
            label="Monthly Deposit from Income"
            value={monthlyContribution}
            onChange={(val) => setMonthlyContribution(val)}
            min={0}
            max={20000}
            step={50}
            prefix="$"
          />

          <CalcInput
            id="hysaApy"
            label="High-Yield Savings Account (HYSA) APY"
            value={hysaApy}
            onChange={(val) => setHysaApy(val)}
            min={0}
            max={12}
            step={0.1}
            suffix="%"
            helpText="Compounded monthly on accumulated cash reserves."
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Target Emergency Reserve"
          value={`$${formatCurrency(calculation.targetFund)}`}
          subtitle={`${calculation.targetMonths} months of essential needs`}
          highlighted={true}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Current Cushion Status"
          value={`${calculation.progressPercent.toFixed(1)}%`}
          subtitle={`$${formatCurrency(calculation.current)} saved of $${formatCurrency(calculation.targetFund)}`}
          icon={<TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Time to Full Target"
          value={
            calculation.gap === 0
              ? 'Funded! 🎉'
              : calculation.monthsToGoal > 300
              ? 'Indefinite'
              : `${Math.floor(calculation.monthsToGoal / 12)}y ${calculation.monthsToGoal % 12}m`
          }
          subtitle={
            calculation.gap === 0
              ? 'Goal reached'
              : `${calculation.monthsToGoal} months @ $${formatNumber(calculation.deposit)}/mo`
          }
          icon={<Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Annual HYSA Yield"
          value={`+$${formatCurrency(calculation.annualHysaYieldOnFullFund)}/yr`}
          subtitle={`Passive interest at ${hysaApy}% APY on full reserve`}
          icon={<DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Visual Savings Trajectory Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Emergency Reserve Accumulation Curve &amp; Target Goal
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fundBalanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
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
                dataKey="target"
                name="Target Emergency Goal ($)"
                stroke="#64748b"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={0}
              />
              <Area
                type="monotone"
                dataKey="balance"
                name="Accumulated Emergency Fund ($)"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#fundBalanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
