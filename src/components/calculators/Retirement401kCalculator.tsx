import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';

interface Retirement401kCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const Retirement401kCalculator: React.FC<Retirement401kCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentBalance, setCurrentBalance] = useState<string>('25000');
  const [salary, setSalary] = useState<string>('75000');
  const [contributionPercent, setContributionPercent] = useState<string>('8');
  const [employerMatchPercent, setEmployerMatchPercent] = useState<string>('50'); // 50% match
  const [employerMatchCap, setEmployerMatchCap] = useState<string>('6'); // up to 6% of salary
  const [returnRate, setReturnRate] = useState<string>('7'); // 7% annual return
  const [salaryIncreaseRate, setSalaryIncreaseRate] = useState<string>('2.5'); // 2.5% annual raise

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.currentAge !== undefined) setCurrentAge(String(initialPreset.currentAge));
      if (initialPreset.retirementAge !== undefined) setRetirementAge(String(initialPreset.retirementAge));
      if (initialPreset.currentBalance !== undefined) setCurrentBalance(String(initialPreset.currentBalance));
      if (initialPreset.salary !== undefined) setSalary(String(initialPreset.salary));
      if (initialPreset.contributionPercent !== undefined) setContributionPercent(String(initialPreset.contributionPercent));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setCurrentAge('30');
    setRetirementAge('65');
    setCurrentBalance('25000');
    setSalary('75000');
    setContributionPercent('8');
    setEmployerMatchPercent('50');
    setEmployerMatchCap('6');
    setReturnRate('7');
    setSalaryIncreaseRate('2.5');
  };

  const calculate = () => {
    const age = safeParseNumber(currentAge, 0);
    const retAge = safeParseNumber(retirementAge, 0);
    let bal = safeParseNumber(currentBalance, 0);
    let currentSal = safeParseNumber(salary, 0);

    const contribPct = safeParseNumber(contributionPercent, 0) / 100;
    const matchMatch = safeParseNumber(employerMatchPercent, 0) / 100;
    const matchCap = safeParseNumber(employerMatchCap, 0) / 100;
    const annualReturn = safeParseNumber(returnRate, 0) / 100;
    const raiseRate = safeParseNumber(salaryIncreaseRate, 0) / 100;

    const years = retAge - age;

    if (age <= 0 || retAge <= age) {
      return {
        isValid: false,
        msg: 'Retirement age must be greater than current age.',
        projectedBalance: 0,
        totalEmployeeContrib: 0,
        totalEmployerMatch: 0,
        totalEarnings: 0,
        monthlyIncome4Pct: 0,
      };
    }

    if (years > 70) {
      return {
        isValid: false,
        msg: 'Time horizon cannot exceed 70 years.',
        projectedBalance: 0,
        totalEmployeeContrib: 0,
        totalEmployerMatch: 0,
        totalEarnings: 0,
        monthlyIncome4Pct: 0,
      };
    }

    let totalEmployeeContrib = 0;
    let totalEmployerMatch = 0;

    for (let year = 1; year <= years; year++) {
      // Annual employee contribution
      const eeContrib = currentSal * contribPct;

      // Employer match: e.g., matches 50% of employee contribution up to 6% of salary
      const matchableEePct = Math.min(contribPct, matchCap);
      const erContrib = currentSal * matchableEePct * matchMatch;

      totalEmployeeContrib += eeContrib;
      totalEmployerMatch += erContrib;

      // Add contributions and apply return
      bal += eeContrib + erContrib;
      bal *= (1 + annualReturn);

      // Annual raise
      currentSal *= (1 + raiseRate);
    }

    const initialBal = safeParseNumber(currentBalance, 0);
    const totalEarnings = bal - initialBal - totalEmployeeContrib - totalEmployerMatch;
    const monthlyIncome4Pct = (bal * 0.04) / 12;

    return {
      isValid: true,
      msg: '',
      projectedBalance: bal,
      totalEmployeeContrib,
      totalEmployerMatch,
      totalEarnings,
      monthlyIncome4Pct,
      years,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Projected 401(k) balance at age ${retirementAge}: ${formatCurrency(res.projectedBalance)}`,
        { currentAge, retirementAge, salary, contributionPercent, returnRate },
        { projectedBalance: res.projectedBalance, monthlyIncome: res.monthlyIncome4Pct }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Timeline */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Timeline & Current Balance
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="currentAge"
              label="Current Age"
              value={currentAge}
              onChange={setCurrentAge}
              min={18}
              max={80}
            />
            <CalcInput
              id="retirementAge"
              label="Retirement Age"
              value={retirementAge}
              onChange={setRetirementAge}
              min={19}
              max={90}
            />
          </div>

          <CalcInput
            id="currentBalance"
            label="Current 401(k) / Savings"
            prefix="$"
            value={currentBalance}
            onChange={setCurrentBalance}
            min={0}
          />

          <CalcInput
            id="salary"
            label="Annual Salary"
            prefix="$"
            value={salary}
            onChange={setSalary}
            min={0}
          />
        </div>

        {/* Contributions & Growth */}
        <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/50 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            Contributions & Growth Rates
          </h3>

          <CalcInput
            id="contributionPercent"
            label="Your Contribution"
            suffix="% of salary"
            value={contributionPercent}
            onChange={setContributionPercent}
            min={0}
            max={100}
            step="0.5"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="employerMatchPercent"
              label="Employer Match"
              suffix="%"
              value={employerMatchPercent}
              onChange={setEmployerMatchPercent}
              helperText="% matched (e.g. 50%)"
              min={0}
              max={100}
            />
            <CalcInput
              id="employerMatchCap"
              label="Match Cap"
              suffix="% salary"
              value={employerMatchCap}
              onChange={setEmployerMatchCap}
              helperText="Up to % (e.g. 6%)"
              min={0}
              max={100}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="returnRate"
              label="Est. Annual Return"
              suffix="%"
              value={returnRate}
              onChange={setReturnRate}
              min={0}
              max={25}
              step="0.1"
            />
            <CalcInput
              id="salaryIncreaseRate"
              label="Annual Raise"
              suffix="%"
              value={salaryIncreaseRate}
              onChange={setSalaryIncreaseRate}
              min={0}
              max={15}
              step="0.1"
            />
          </div>
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Projected Balance at Retirement"
              value={formatCurrency(res.projectedBalance)}
              subtitle={`Over ${res.years} years of growth`}
              highlighted={true}
            />

            <CalcResultCard
              title="Est. Monthly Income (4% Rule)"
              value={formatCurrency(res.monthlyIncome4Pct)}
              subtitle="Estimated safe monthly withdrawal"
              badgeText="Safe Withdrawal"
              badgeType="success"
            />

            <CalcResultCard
              title="Total Employer Match Added"
              value={formatCurrency(res.totalEmployerMatch)}
              subtitle={`Free money from company match`}
              badgeText="Free Capital"
              badgeType="info"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Breakdown:</span> Your contributions:{' '}
              <span className="font-semibold">{formatCurrency(res.totalEmployeeContrib)}</span> | Employer match:{' '}
              <span className="font-semibold text-teal-600 dark:text-teal-400">{formatCurrency(res.totalEmployerMatch)}</span> | Compound interest earned:{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.totalEarnings)}</span>
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
