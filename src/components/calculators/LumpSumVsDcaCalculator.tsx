import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface LumpSumVsDcaCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const LumpSumVsDcaCalculator: React.FC<LumpSumVsDcaCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [totalCapital, setTotalCapital] = useState<string>('60000');
  const [years, setYears] = useState<string>('10');
  const [annualReturn, setAnnualReturn] = useState<string>('8');
  const [dcaMonths, setDcaMonths] = useState<string>('12');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.totalCapital !== undefined) setTotalCapital(String(initialPreset.totalCapital));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setTotalCapital('60000');
    setYears('10');
    setAnnualReturn('8');
    setDcaMonths('12');
  };

  const calculate = () => {
    const capital = safeParseNumber(totalCapital, 0);
    const yr = safeParseNumber(years, 0);
    const rate = safeParseNumber(annualReturn, 0) / 100;
    const dcaPeriod = safeParseNumber(dcaMonths, 1);

    if (capital <= 0 || yr <= 0) {
      return { isValid: false, msg: 'Investment capital and horizon must be greater than 0.' };
    }

    // Lump sum: invested day 1
    const lumpSumValue = capital * Math.pow(1 + rate, yr);

    // DCA: monthly installments over dcaPeriod, then grows for remaining time
    const monthlyRate = rate / 12;
    const monthlyDcaAmount = capital / dcaPeriod;
    let dcaPortfolio = 0;

    const totalMonths = yr * 12;

    for (let m = 1; m <= totalMonths; m++) {
      if (m <= dcaPeriod) {
        dcaPortfolio += monthlyDcaAmount;
      }
      dcaPortfolio *= (1 + monthlyRate);
    }

    const difference = lumpSumValue - dcaPortfolio;

    return {
      isValid: true,
      msg: '',
      capital,
      lumpSumValue,
      dcaPortfolio,
      difference,
      dcaMonths: dcaPeriod,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Lump Sum (${formatCurrency(res.lumpSumValue)}) vs DCA (${formatCurrency(res.dcaPortfolio)})`,
        { totalCapital, years, annualReturn, dcaMonths },
        { lumpSumValue: res.lumpSumValue, dcaPortfolio: res.dcaPortfolio }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Investment Strategy Inputs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput
            id="totalCapital"
            label="Total Available Capital"
            prefix="$"
            value={totalCapital}
            onChange={setTotalCapital}
            min={0}
          />
          <CalcInput
            id="years"
            label="Investment Horizon (Years)"
            suffix="yrs"
            value={years}
            onChange={setYears}
            min={1}
          />
          <CalcInput
            id="annualReturn"
            label="Expected Annual Return"
            suffix="%"
            value={annualReturn}
            onChange={setAnnualReturn}
          />
          <CalcInput
            id="dcaMonths"
            label="DCA Installment Period"
            suffix="mo"
            value={dcaMonths}
            onChange={setDcaMonths}
            min={1}
            max={60}
            helperText="Months over which to deploy cash"
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Lump Sum Final Value"
              value={formatCurrency(res.lumpSumValue)}
              subtitle="All capital invested on Day 1"
              highlighted={res.difference >= 0}
              badgeText="Immediate Investment"
              badgeType="success"
            />
            <CalcResultCard
              title="DCA Final Value"
              value={formatCurrency(res.dcaPortfolio)}
              subtitle={`Deployed over ${res.dcaMonths} months`}
              badgeText="DCA Strategy"
              badgeType="info"
            />
            <CalcResultCard
              title="Strategy Value Advantage"
              value={formatCurrency(Math.abs(res.difference))}
              subtitle={res.difference >= 0 ? 'Lump Sum Outperforms' : 'DCA Outperforms'}
              badgeText={res.difference >= 0 ? '+Lump Sum' : '+DCA'}
              badgeType={res.difference >= 0 ? 'success' : 'warning'}
            />
            <CalcResultCard
              title="Initial Capital Deposited"
              value={formatCurrency(res.capital)}
              subtitle="Original principal balance"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Historical market data shows Lump Sum investing outperforms DCA ~66% of the time due to market upward drift.</span>
            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
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
