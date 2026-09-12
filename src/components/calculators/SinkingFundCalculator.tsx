import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatPercent, formatNumber } from '../../lib/mathUtils';
import { PiggyBank, Target, Calendar, DollarSign, Sparkles, TrendingUp, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';
import { BaseCalculatorProps } from './index';

interface SinkingFundPreset {
  name: string;
  amount: number;
  months: number;
  initial: number;
  icon: string;
}

const PRESETS: SinkingFundPreset[] = [
  { name: 'Vacation & Travel', amount: 5000, months: 10, initial: 500, icon: '✈️' },
  { name: 'Vehicle Replacement', amount: 12000, months: 24, initial: 1500, icon: '🚗' },
  { name: 'Annual Insurance & Tax', amount: 3600, months: 12, initial: 0, icon: '📄' },
  { name: 'Wedding & Events', amount: 20000, months: 18, initial: 3000, icon: '💍' },
  { name: 'Home Maintenance/HVAC', amount: 8000, months: 16, initial: 1000, icon: '🏡' },
  { name: 'Holiday Shopping', amount: 1800, months: 9, initial: 200, icon: '🎁' },
];

export const SinkingFundCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [goalName, setGoalName] = useState<string>('Dream Vacation');
  const [targetGoalAmount, setTargetGoalAmount] = useState<number>(() => initialPreset?.targetGoalAmount ?? 6000);
  const [targetMonths, setTargetMonths] = useState<number>(() => initialPreset?.targetMonths ?? 12);
  const [currentSavings, setCurrentSavings] = useState<number>(() => initialPreset?.currentSavings ?? 500);
  const [annualApyPercent, setAnnualApyPercent] = useState<number>(() => initialPreset?.annualApyPercent ?? 4.5);
  const [adjustInflation, setAdjustInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(3.0);

  const applyPreset = (preset: SinkingFundPreset) => {
    setGoalName(preset.name);
    setTargetGoalAmount(preset.amount);
    setTargetMonths(preset.months);
    setCurrentSavings(preset.initial);
  };

  const calculation = useMemo(() => {
    const rawGoal = Math.max(100, safeParseNumber(targetGoalAmount, 6000));
    const months = Math.max(1, Math.min(360, safeParseNumber(targetMonths, 12)));
    const initial = Math.max(0, safeParseNumber(currentSavings, 500));
    const apy = Math.max(0, Math.min(25, safeParseNumber(annualApyPercent, 4.5))) / 100;
    const infRate = adjustInflation ? Math.max(0, safeParseNumber(inflationRate, 3.0)) / 100 : 0;

    // Adjusted goal for inflation if enabled: Goal * (1 + inf)^(months/12)
    const adjustedGoal = adjustInflation ? rawGoal * Math.pow(1 + infRate, months / 12) : rawGoal;
    const netGap = Math.max(0, adjustedGoal - initial);

    const monthlyRate = apy / 12;
    let monthlyDeposit = 0;

    if (monthlyRate > 0) {
      // FV of initial balance = initial * (1 + r)^n
      const fvInitial = initial * Math.pow(1 + monthlyRate, months);
      const remainingGoalNeeded = Math.max(0, adjustedGoal - fvInitial);

      // Ordinary annuity sinking fund formula: PMT = FV * r / ((1 + r)^n - 1)
      monthlyDeposit = (remainingGoalNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      monthlyDeposit = netGap / months;
    }

    const biweeklyDeposit = (monthlyDeposit * 12) / 26;
    const weeklyDeposit = (monthlyDeposit * 12) / 52;
    const totalOutofPocket = initial + monthlyDeposit * months;
    const totalInterestEarned = Math.max(0, adjustedGoal - totalOutofPocket);
    const interestFundingShare = adjustedGoal > 0 ? (totalInterestEarned / adjustedGoal) * 100 : 0;

    // Generate month-by-month accumulation schedule
    let curBalance = initial;
    let cumDeposits = initial;
    let cumInterest = 0;

    const schedule = [];
    schedule.push({
      month: 0,
      label: 'Start',
      balance: Math.round(curBalance),
      deposits: Math.round(cumDeposits),
      interest: 0,
      targetGoal: Math.round(adjustedGoal),
    });

    for (let m = 1; m <= months; m++) {
      const monthInterest = curBalance * monthlyRate;
      cumInterest += monthInterest;
      cumDeposits += monthlyDeposit;
      curBalance = curBalance + monthlyDeposit + monthInterest;

      if (m % Math.ceil(months / 12) === 0 || m === months) {
        schedule.push({
          month: m,
          label: `Mo ${m}`,
          balance: Math.round(curBalance),
          deposits: Math.round(cumDeposits),
          interest: Math.round(cumInterest),
          targetGoal: Math.round(adjustedGoal),
        });
      }
    }

    return {
      rawGoal,
      adjustedGoal,
      months,
      initial,
      monthlyDeposit,
      biweeklyDeposit,
      weeklyDeposit,
      totalOutofPocket,
      totalInterestEarned,
      interestFundingShare,
      schedule,
    };
  }, [targetGoalAmount, targetMonths, currentSavings, annualApyPercent, adjustInflation, inflationRate]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Sinking Fund: Save $${formatCurrency(calculation.monthlyDeposit)}/mo toward "${goalName}" ($${formatCurrency(calculation.adjustedGoal)} in ${calculation.months} mos)`,
        { goalName, targetGoalAmount, targetMonths, currentSavings, annualApyPercent, adjustInflation },
        {
          monthlyDeposit: calculation.monthlyDeposit,
          totalInterestEarned: calculation.totalInterestEarned,
          totalOutofPocket: calculation.totalOutofPocket,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Presets Carousel */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Quick Sinking Fund Category Presets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                goalName === p.name
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{p.icon}</span>
                <span className="text-[10px] font-bold text-slate-500 font-mono">{p.months} mo</span>
              </div>
              <div className="mt-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                  {p.name}
                </span>
                <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                  ${formatCurrency(p.amount)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Inputs Card */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CalcInput
            id="targetGoalAmount"
            label="Target Goal / Purchase Cost"
            value={targetGoalAmount}
            onChange={(val) => setTargetGoalAmount(val)}
            min={100}
            max={1000000}
            step={250}
            prefix="$"
          />

          <CalcInput
            id="targetMonths"
            label="Target Timeline"
            value={targetMonths}
            onChange={(val) => setTargetMonths(val)}
            min={1}
            max={120}
            step={1}
            suffix="months"
            helpText={`≈ ${(targetMonths / 12).toFixed(1)} years`}
          />

          <CalcInput
            id="currentSavings"
            label="Starting Balance (Seed Money)"
            value={currentSavings}
            onChange={(val) => setCurrentSavings(val)}
            min={0}
            max={500000}
            step={100}
            prefix="$"
          />

          <CalcInput
            id="annualApyPercent"
            label="High-Yield Savings APY Rate"
            value={annualApyPercent}
            onChange={(val) => setAnnualApyPercent(val)}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            helpText="HYSA / Money Market yield"
          />
        </div>

        {/* Inflation Protection Toggle */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <input
              id="adjustInflation"
              type="checkbox"
              checked={adjustInflation}
              onChange={(e) => setAdjustInflation(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="adjustInflation" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              Adjust target goal for annual inflation (Cost of goods increase over time)
            </label>
          </div>

          {adjustInflation && (
            <div className="w-full sm:w-56">
              <CalcInput
                id="inflationRate"
                label="Annual Inflation Assumption"
                value={inflationRate}
                onChange={(val) => setInflationRate(val)}
                min={0}
                max={15}
                step={0.5}
                suffix="%"
              />
            </div>
          )}
        </div>
      </div>

      {/* KPI Results Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Required Monthly Deposit"
          value={`$${formatCurrency(calculation.monthlyDeposit)}`}
          subtitle={`Auto-save each month for ${calculation.months} mos`}
          highlighted={true}
          icon={<PiggyBank className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Bi-Weekly Equivalent"
          value={`$${formatCurrency(calculation.biweeklyDeposit)}`}
          subtitle="Every 2 weeks (26 paychecks/yr)"
          icon={<Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Interest Growth Earned"
          value={`$${formatCurrency(calculation.totalInterestEarned)}`}
          subtitle={`HYSA pays ${calculation.interestFundingShare.toFixed(1)}% of your target`}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Total Out-of-Pocket"
          value={`$${formatCurrency(calculation.totalOutofPocket)}`}
          subtitle={`Direct capital vs $${formatCurrency(calculation.adjustedGoal)} goal`}
          icon={<Target className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />
      </div>

      {/* Breakdown Matrix & Pay Frequency Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
          <span>Deposit Frequency Breakdown</span>
          <span className="text-xs font-mono font-normal text-slate-500">
            Target Goal: <strong className="text-blue-600 dark:text-blue-400 font-bold">${formatCurrency(calculation.adjustedGoal)}</strong>
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider block">Monthly</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">${formatCurrency(calculation.monthlyDeposit)}</span>
            <span className="text-[11px] font-sans text-slate-500 block mt-0.5">12 transfers per year</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider block">Bi-Weekly</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">${formatCurrency(calculation.biweeklyDeposit)}</span>
            <span className="text-[11px] font-sans text-slate-500 block mt-0.5">26 transfers per year</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-sans font-bold text-slate-500 uppercase tracking-wider block">Weekly</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">${formatCurrency(calculation.weeklyDeposit)}</span>
            <span className="text-[11px] font-sans text-slate-500 block mt-0.5">52 transfers per year</span>
          </div>
        </div>
      </div>

      {/* Sinking Fund Growth & Target Trajectory Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          Sinking Fund Accumulation Trajectory
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.schedule} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="depositsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis
                tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
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
                dataKey="deposits"
                name="Your Out-of-Pocket Deposits"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#depositsGrad)"
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="interest"
                name="Compound HYSA Interest Growth"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#interestGrad)"
                stackId="1"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
