import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';

interface DebtItem {
  id: string;
  name: string;
  balance: string;
  rate: string;
  minPayment: string;
}

interface DebtSnowballAvalancheCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const DebtSnowballAvalancheCalculator: React.FC<DebtSnowballAvalancheCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [extraPayment, setExtraPayment] = useState<string>('200');
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: '1', name: 'Credit Card A', balance: '3500', rate: '22.9', minPayment: '100' },
    { id: '2', name: 'Car Loan', balance: '12000', rate: '6.5', minPayment: '250' },
    { id: '3', name: 'Personal Loan', balance: '5000', rate: '14.2', minPayment: '130' },
  ]);

  useEffect(() => {
    if (initialPreset && initialPreset.extraPayment !== undefined) {
      setExtraPayment(String(initialPreset.extraPayment));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setExtraPayment('200');
    setDebts([
      { id: '1', name: 'Credit Card A', balance: '3500', rate: '22.9', minPayment: '100' },
      { id: '2', name: 'Car Loan', balance: '12000', rate: '6.5', minPayment: '250' },
      { id: '3', name: 'Personal Loan', balance: '5000', rate: '14.2', minPayment: '130' },
    ]);
  };

  const updateDebt = (index: number, field: keyof DebtItem, value: string) => {
    setDebts((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addDebt = () => {
    if (debts.length >= 6) return;
    setDebts((prev) => [
      ...prev,
      { id: String(Date.now()), name: `Debt ${prev.length + 1}`, balance: '2000', rate: '18.0', minPayment: '60' },
    ]);
  };

  const removeDebt = (index: number) => {
    if (debts.length <= 1) return;
    setDebts((prev) => prev.filter((_, i) => i !== index));
  };

  const simulatePayoff = (method: 'snowball' | 'avalanche') => {
    const extra = safeParseNumber(extraPayment, 0);

    let activeDebts = debts.map((d) => ({
      name: d.name,
      balance: safeParseNumber(d.balance, 0),
      rate: safeParseNumber(d.rate, 0) / 100 / 12,
      minPayment: safeParseNumber(d.minPayment, 0),
    })).filter((d) => d.balance > 0);

    if (activeDebts.length === 0) {
      return { totalMonths: 0, totalInterest: 0 };
    }

    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600; // 50 years cap

    while (activeDebts.some((d) => d.balance > 0) && months < maxMonths) {
      months++;

      // Sort debts based on strategy
      if (method === 'snowball') {
        // Lowest balance first
        activeDebts.sort((a, b) => a.balance - b.balance);
      } else {
        // Highest interest rate first
        activeDebts.sort((a, b) => b.rate - a.rate);
      }

      let availableExtra = extra;

      for (let i = 0; i < activeDebts.length; i++) {
        const debt = activeDebts[i];
        if (debt.balance <= 0) continue;

        const interest = debt.balance * debt.rate;
        debt.balance += interest;
        totalInterest += interest;

        let payment = debt.minPayment;
        if (i === 0) {
          // Priority debt gets extra payment
          payment += availableExtra;
        }

        if (payment >= debt.balance) {
          availableExtra += (payment - debt.balance);
          debt.balance = 0;
        } else {
          debt.balance -= payment;
        }
      }
    }

    return { totalMonths: months, totalInterest };
  };

  const calculate = () => {
    const validDebts = debts.filter((d) => safeParseNumber(d.balance, 0) > 0);
    if (validDebts.length === 0) {
      return {
        isValid: false,
        msg: 'Please enter at least one debt balance greater than $0.',
        totalDebt: 0,
        snowballMonths: 0,
        snowballInterest: 0,
        avalancheMonths: 0,
        avalancheInterest: 0,
        interestSaved: 0,
      };
    }

    const totalDebt = validDebts.reduce((acc, d) => acc + safeParseNumber(d.balance, 0), 0);
    const snowball = simulatePayoff('snowball');
    const avalanche = simulatePayoff('avalanche');

    const interestSaved = snowball.totalInterest - avalanche.totalInterest;

    return {
      isValid: true,
      msg: '',
      totalDebt,
      snowballMonths: snowball.totalMonths,
      snowballInterest: snowball.totalInterest,
      avalancheMonths: avalanche.totalMonths,
      avalancheInterest: avalanche.totalInterest,
      interestSaved,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Debt Payoff Comparison (${debts.length} debts, Total ${formatCurrency(res.totalDebt)}): Avalanche saves ${formatCurrency(res.interestSaved)} in total interest`,
        { extraPayment, totalDebt: res.totalDebt },
        { snowballMonths: res.snowballMonths, avalancheMonths: res.avalancheMonths, interestSaved: res.interestSaved }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Your Current Debts</h3>
            <p className="text-xs text-slate-500">Add up to 6 credit cards, loans, or balances to compare strategies.</p>
          </div>

          <CalcInput
            id="extraPayment"
            label="Extra Monthly Payment Budget"
            prefix="$"
            value={extraPayment}
            onChange={setExtraPayment}
            min={0}
            className="w-full sm:w-56"
          />
        </div>

        <div className="space-y-3">
          {debts.map((d, index) => (
            <div
              key={d.id}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
            >
              <div className="sm:col-span-3">
                <input
                  type="text"
                  value={d.name}
                  onChange={(e) => updateDebt(index, 'name', e.target.value)}
                  placeholder="Debt Name"
                  className="w-full text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:text-white"
                />
              </div>

              <div className="sm:col-span-3">
                <CalcInput
                  id={`balance-${index}`}
                  label="Balance ($)"
                  prefix="$"
                  value={d.balance}
                  onChange={(val) => updateDebt(index, 'balance', val)}
                  min={0}
                />
              </div>

              <div className="sm:col-span-2">
                <CalcInput
                  id={`rate-${index}`}
                  label="APR (%)"
                  suffix="%"
                  value={d.rate}
                  onChange={(val) => updateDebt(index, 'rate', val)}
                  min={0}
                />
              </div>

              <div className="sm:col-span-3">
                <CalcInput
                  id={`minPay-${index}`}
                  label="Min Pay ($)"
                  prefix="$"
                  value={d.minPayment}
                  onChange={(val) => updateDebt(index, 'minPayment', val)}
                  min={0}
                />
              </div>

              <div className="sm:col-span-1 flex justify-end">
                {debts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDebt(index)}
                    className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                    title="Remove Debt"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {debts.length < 6 && (
          <button
            type="button"
            onClick={addDebt}
            className="px-3 py-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition"
          >
            + Add Another Debt
          </button>
        )}
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Avalanche Strategy */}
            <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/60 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-teal-900 dark:text-teal-300">
                  🏔️ Debt Avalanche Strategy
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 px-2 py-0.5 rounded-full">
                  Saves Most Interest
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pays off highest interest rate debts first.
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payoff Time:</span>
                  <span className="font-bold text-teal-700 dark:text-teal-400">
                    {Math.floor(res.avalancheMonths / 12)} yrs {res.avalancheMonths % 12} mos ({res.avalancheMonths} mos)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Interest Paid:</span>
                  <span className="font-bold">{formatCurrency(res.avalancheInterest)}</span>
                </div>
              </div>
            </div>

            {/* Snowball Strategy */}
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300">
                  ❄️ Debt Snowball Strategy
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                  Quick Psychological Wins
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pays off smallest balances first.
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payoff Time:</span>
                  <span className="font-bold text-blue-700 dark:text-blue-400">
                    {Math.floor(res.snowballMonths / 12)} yrs {res.snowballMonths % 12} mos ({res.snowballMonths} mos)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Interest Paid:</span>
                  <span className="font-bold">{formatCurrency(res.snowballInterest)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Total Combined Debt:</span> {formatCurrency(res.totalDebt)} |{' '}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Avalanche saves {formatCurrency(Math.abs(res.interestSaved))} in interest
              </span>{' '}
              compared to Snowball.
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
              >
                Save Strategy
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
