import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface DtiRatioCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const DtiRatioCalculator: React.FC<DtiRatioCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('7500');
  const [housingExpense, setHousingExpense] = useState<string>('1800');
  const [autoPayment, setAutoPayment] = useState<string>('350');
  const [creditCardMin, setCreditCardMin] = useState<string>('150');
  const [studentLoan, setStudentLoan] = useState<string>('200');
  const [otherDebt, setOtherDebt] = useState<string>('100');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.monthlyIncome !== undefined) setMonthlyIncome(String(initialPreset.monthlyIncome));
      if (initialPreset.housingExpense !== undefined) setHousingExpense(String(initialPreset.housingExpense));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setMonthlyIncome('7500');
    setHousingExpense('1800');
    setAutoPayment('350');
    setCreditCardMin('150');
    setStudentLoan('200');
    setOtherDebt('100');
  };

  const calculate = () => {
    const inc = safeParseNumber(monthlyIncome, 0);
    const house = safeParseNumber(housingExpense, 0);
    const auto = safeParseNumber(autoPayment, 0);
    const cc = safeParseNumber(creditCardMin, 0);
    const student = safeParseNumber(studentLoan, 0);
    const other = safeParseNumber(otherDebt, 0);

    if (inc <= 0) {
      return { isValid: false, msg: 'Gross monthly income must be greater than $0.' };
    }

    const totalNonHousingDebt = auto + cc + student + other;
    const totalDebt = house + totalNonHousingDebt;

    const frontEndDti = (house / inc) * 100;
    const backEndDti = (totalDebt / inc) * 100;

    return {
      isValid: true,
      msg: '',
      monthlyIncome: inc,
      housingExpense: house,
      totalDebt,
      frontEndDti,
      backEndDti,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `DTI: Back-End ${formatNumber(res.backEndDti, 1)}% | Front-End ${formatNumber(res.frontEndDti, 1)}%`,
        { monthlyIncome, housingExpense, autoPayment, creditCardMin },
        { frontEndDti: res.frontEndDti, backEndDti: res.backEndDti }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Monthly Income & Debt Obligations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput
            id="monthlyIncome"
            label="Gross Monthly Income (Pre-Tax)"
            prefix="$"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            min={0}
          />
          <CalcInput
            id="housingExpense"
            label="Monthly Housing (Rent / Mortgage + Tax/Ins)"
            prefix="$"
            value={housingExpense}
            onChange={setHousingExpense}
            min={0}
          />
          <CalcInput
            id="autoPayment"
            label="Monthly Auto Loan Payment"
            prefix="$"
            value={autoPayment}
            onChange={setAutoPayment}
            min={0}
          />
          <CalcInput
            id="creditCardMin"
            label="Credit Card Minimum Payments"
            prefix="$"
            value={creditCardMin}
            onChange={setCreditCardMin}
            min={0}
          />
          <CalcInput
            id="studentLoan"
            label="Student Loan Payments"
            prefix="$"
            value={studentLoan}
            onChange={setStudentLoan}
            min={0}
          />
          <CalcInput
            id="otherDebt"
            label="Other Personal Loans / Debt"
            prefix="$"
            value={otherDebt}
            onChange={setOtherDebt}
            min={0}
          />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Back-End DTI Ratio"
              value={`${formatNumber(res.backEndDti, 1)}%`}
              subtitle="All Debts / Income"
              highlighted={true}
              badgeText={res.backEndDti <= 36 ? 'Good (<36%)' : res.backEndDti <= 43 ? 'Acceptable (<43%)' : 'High (>43%)'}
              badgeType={res.backEndDti <= 36 ? 'success' : res.backEndDti <= 43 ? 'warning' : 'error'}
            />
            <CalcResultCard
              title="Front-End DTI Ratio"
              value={`${formatNumber(res.frontEndDti, 1)}%`}
              subtitle="Housing Only / Income"
              badgeText={res.frontEndDti <= 28 ? 'Ideal (<28%)' : 'Elevated'}
              badgeType={res.frontEndDti <= 28 ? 'success' : 'neutral'}
            />
            <CalcResultCard
              title="Total Monthly Debt"
              value={formatCurrency(res.totalDebt)}
              subtitle="Housing + all monthly obligations"
            />
            <CalcResultCard
              title="Remaining Disposable Income"
              value={formatCurrency(res.monthlyIncome - res.totalDebt)}
              subtitle="Income left after debt payments"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Conventional lenders look for a 28% front-end and 36% back-end DTI, while FHA allows up to 43%.</span>
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
