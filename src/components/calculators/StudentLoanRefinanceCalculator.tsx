import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, TrendingDown, ArrowRight, ShieldAlert } from 'lucide-react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, safeDivide, formatCurrency } from '../../lib/mathUtils';

interface StudentLoanRefinanceCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const StudentLoanRefinanceCalculator: React.FC<StudentLoanRefinanceCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [balance, setBalance] = useState<string>('35000');
  const [currentRate, setCurrentRate] = useState<string>('6.8');
  const [currentTermYears, setCurrentTermYears] = useState<string>('10');
  const [newRate, setNewRate] = useState<string>('4.5');
  const [newTermYears, setNewTermYears] = useState<string>('10');
  const [refinanceFees, setRefinanceFees] = useState<string>('0');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.balance !== undefined) setBalance(String(initialPreset.balance));
      if (initialPreset.currentRate !== undefined) setCurrentRate(String(initialPreset.currentRate));
      if (initialPreset.currentTermYears !== undefined) setCurrentTermYears(String(initialPreset.currentTermYears));
      if (initialPreset.newRate !== undefined) setNewRate(String(initialPreset.newRate));
      if (initialPreset.newTermYears !== undefined) setNewTermYears(String(initialPreset.newTermYears));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setBalance('35000');
    setCurrentRate('6.8');
    setCurrentTermYears('10');
    setNewRate('4.5');
    setNewTermYears('10');
    setRefinanceFees('0');
    setError('');
  };

  const calculateResults = () => {
    const bal = safeParseNumber(balance, 0);
    const cRate = safeParseNumber(currentRate, 0) / 100 / 12;
    const cN = safeParseNumber(currentTermYears, 0) * 12;

    const nRate = safeParseNumber(newRate, 0) / 100 / 12;
    const nN = safeParseNumber(newTermYears, 0) * 12;
    const fees = safeParseNumber(refinanceFees, 0);

    if (bal <= 0) {
      return {
        oldMonthly: 0,
        newMonthly: 0,
        monthlySavings: 0,
        oldTotalInterest: 0,
        newTotalInterest: 0,
        netInterestSaved: 0,
        isValid: false,
        msg: 'Please enter a loan balance greater than $0.',
      };
    }

    if (cN <= 0 || nN <= 0) {
      return {
        oldMonthly: 0,
        newMonthly: 0,
        monthlySavings: 0,
        oldTotalInterest: 0,
        newTotalInterest: 0,
        netInterestSaved: 0,
        isValid: false,
        msg: 'Loan terms must be greater than 0 years.',
      };
    }

    // Old monthly payment: P * [i(1+i)^n] / [(1+i)^n - 1]
    let oldMonthly = 0;
    if (cRate === 0) {
      oldMonthly = bal / cN;
    } else {
      const powC = Math.pow(1 + cRate, cN);
      oldMonthly = bal * ((cRate * powC) / (powC - 1));
    }

    const oldTotalPaid = oldMonthly * cN;
    const oldTotalInterest = oldTotalPaid - bal;

    // New monthly payment (balance + fees)
    const newBal = bal + fees;
    let newMonthly = 0;
    if (nRate === 0) {
      newMonthly = newBal / nN;
    } else {
      const powN = Math.pow(1 + nRate, nN);
      newMonthly = newBal * ((nRate * powN) / (powN - 1));
    }

    const newTotalPaid = newMonthly * nN;
    const newTotalInterest = newTotalPaid - newBal;

    const monthlySavings = oldMonthly - newMonthly;
    const netInterestSaved = oldTotalInterest - (newTotalInterest + fees);

    return {
      oldMonthly,
      newMonthly,
      monthlySavings,
      oldTotalInterest,
      newTotalInterest,
      netInterestSaved,
      oldTotalPaid,
      newTotalPaid,
      isValid: true,
      msg: '',
    };
  };

  const res = calculateResults();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Refinanced $${balance} student loan from ${currentRate}% to ${newRate}%, saving ${formatCurrency(res.netInterestSaved)} total interest`,
        { balance, currentRate, currentTermYears, newRate, newTermYears },
        { newMonthly: res.newMonthly, netInterestSaved: res.netInterestSaved }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Loan Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Current Loan Details
          </h3>

          <CalcInput
            id="balance"
            label="Remaining Loan Balance"
            prefix="$"
            value={balance}
            onChange={setBalance}
            min={0}
          />

          <CalcInput
            id="currentRate"
            label="Current Interest Rate"
            suffix="%"
            value={currentRate}
            onChange={setCurrentRate}
            min={0}
            max={30}
            step="0.1"
          />

          <CalcInput
            id="currentTerm"
            label="Current Remaining Term"
            suffix="Years"
            value={currentTermYears}
            onChange={setCurrentTermYears}
            min={1}
            max={30}
          />
        </div>

        {/* Refinanced Loan Card */}
        <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/80 dark:border-teal-800/50 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            Proposed Refinanced Loan
          </h3>

          <CalcInput
            id="newRate"
            label="New Offered Interest Rate"
            suffix="%"
            value={newRate}
            onChange={setNewRate}
            min={0}
            max={30}
            step="0.1"
          />

          <CalcInput
            id="newTerm"
            label="New Loan Term"
            suffix="Years"
            value={newTermYears}
            onChange={setNewTermYears}
            min={1}
            max={30}
          />

          <CalcInput
            id="refinanceFees"
            label="Origination / Processing Fees"
            prefix="$"
            value={refinanceFees}
            onChange={setRefinanceFees}
            min={0}
            helperText="Fees added into total refinanced balance"
          />
        </div>
      </div>

      {/* Results Summary Grid */}
      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="New Monthly Payment"
              value={formatCurrency(res.newMonthly)}
              subtitle={`vs. ${formatCurrency(res.oldMonthly)} current`}
              highlighted={true}
            />

            <CalcResultCard
              title="Monthly Difference"
              value={formatCurrency(Math.abs(res.monthlySavings))}
              subtitle={res.monthlySavings >= 0 ? 'Monthly savings' : 'Higher monthly cost'}
              badgeText={res.monthlySavings >= 0 ? 'Saves Monthly' : 'Higher Payment'}
              badgeType={res.monthlySavings >= 0 ? 'success' : 'warning'}
            />

            <CalcResultCard
              title="Net Interest Saved"
              value={formatCurrency(Math.abs(res.netInterestSaved))}
              subtitle={res.netInterestSaved >= 0 ? 'Over life of loan' : 'More interest paid'}
              badgeText={res.netInterestSaved >= 0 ? 'Total Savings' : 'Net Loss'}
              badgeType={res.netInterestSaved >= 0 ? 'success' : 'warning'}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Summary Comparison:</span> Total current loan cost is{' '}
              <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(res.oldTotalPaid)}</span> vs.{' '}
              <span className="font-semibold text-teal-600 dark:text-teal-400">{formatCurrency(res.newTotalPaid)}</span> with refinancing.
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
