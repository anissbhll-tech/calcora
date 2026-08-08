import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface RentalPropertyRoiCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const RentalPropertyRoiCalculator: React.FC<RentalPropertyRoiCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [purchasePrice, setPurchasePrice] = useState<string>('300000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTermYears, setLoanTermYears] = useState<string>('30');
  const [monthlyRent, setMonthlyRent] = useState<string>('2800');
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>('3600');
  const [insuranceAnnual, setInsuranceAnnual] = useState<string>('1200');
  const [maintenancePercent, setMaintenancePercent] = useState<string>('8');
  const [vacancyPercent, setVacancyPercent] = useState<string>('5');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.purchasePrice !== undefined) setPurchasePrice(String(initialPreset.purchasePrice));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setPurchasePrice('300000');
    setDownPaymentPercent('20');
    setInterestRate('6.5');
    setLoanTermYears('30');
    setMonthlyRent('2800');
    setPropertyTaxAnnual('3600');
    setInsuranceAnnual('1200');
    setMaintenancePercent('8');
    setVacancyPercent('5');
  };

  const calculate = () => {
    const price = safeParseNumber(purchasePrice, 0);
    const downPct = safeParseNumber(downPaymentPercent, 0) / 100;
    const rate = safeParseNumber(interestRate, 0) / 100;
    const term = safeParseNumber(loanTermYears, 30);
    const rent = safeParseNumber(monthlyRent, 0);
    const taxAnnual = safeParseNumber(propertyTaxAnnual, 0);
    const insAnnual = safeParseNumber(insuranceAnnual, 0);
    const maintPct = safeParseNumber(maintenancePercent, 0) / 100;
    const vacPct = safeParseNumber(vacancyPercent, 0) / 100;

    if (price <= 0 || rent <= 0) {
      return { isValid: false, msg: 'Purchase price and monthly rent must be greater than $0.' };
    }

    const downPayment = price * downPct;
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 12;
    const totalMonths = term * 12;

    const monthlyPrincipalInterest =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
        : loanAmount / totalMonths;

    const monthlyTax = taxAnnual / 12;
    const monthlyIns = insAnnual / 12;
    const monthlyMaint = rent * maintPct;
    const monthlyVacancy = rent * vacPct;

    const totalMonthlyOperatingExp = monthlyTax + monthlyIns + monthlyMaint + monthlyVacancy;
    const netOperatingIncomeMonthly = rent - totalMonthlyOperatingExp;
    const netOperatingIncomeAnnual = netOperatingIncomeMonthly * 12;

    const monthlyCashFlow = netOperatingIncomeMonthly - monthlyPrincipalInterest;
    const annualCashFlow = monthlyCashFlow * 12;

    const initialCashOutlay = downPayment + price * 0.03; // plus 3% closing costs
    const cashOnCashReturn = (annualCashFlow / initialCashOutlay) * 100;
    const capRate = (netOperatingIncomeAnnual / price) * 100;

    return {
      isValid: true,
      msg: '',
      price,
      downPayment,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
      capRate,
      netOperatingIncomeAnnual,
      monthlyPrincipalInterest,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Rental ROI: Cash Flow ${formatCurrency(res.monthlyCashFlow)}/mo | Cash-on-Cash ${formatNumber(res.cashOnCashReturn, 1)}%`,
        { purchasePrice, monthlyRent, downPaymentPercent },
        { monthlyCashFlow: res.monthlyCashFlow, cashOnCashReturn: res.cashOnCashReturn, capRate: res.capRate }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Rental Property Financial Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CalcInput id="purchasePrice" label="Purchase Price" prefix="$" value={purchasePrice} onChange={setPurchasePrice} min={0} />
          <CalcInput id="downPaymentPercent" label="Down Payment" suffix="%" value={downPaymentPercent} onChange={setDownPaymentPercent} min={0} max={100} />
          <CalcInput id="interestRate" label="Mortgage Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate} min={0} />
          <CalcInput id="monthlyRent" label="Gross Monthly Rent" prefix="$" value={monthlyRent} onChange={setMonthlyRent} min={0} />
          <CalcInput id="propertyTaxAnnual" label="Annual Property Taxes" prefix="$" value={propertyTaxAnnual} onChange={setPropertyTaxAnnual} min={0} />
          <CalcInput id="insuranceAnnual" label="Annual Property Insurance" prefix="$" value={insuranceAnnual} onChange={setInsuranceAnnual} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Net Monthly Cash Flow"
              value={formatCurrency(res.monthlyCashFlow)}
              subtitle="Rent - (P&I + Taxes + Ins + Maint + Vacancy)"
              highlighted={true}
              badgeText={res.monthlyCashFlow > 0 ? 'Positive Cash Flow' : 'Negative Cash Flow'}
              badgeType={res.monthlyCashFlow > 0 ? 'success' : 'error'}
            />
            <CalcResultCard
              title="Cash-on-Cash Return"
              value={`${formatNumber(res.cashOnCashReturn, 2)}%`}
              subtitle="Annual Cash Flow / Total Cash Outlay"
              badgeText={res.cashOnCashReturn >= 8 ? 'Strong Return' : 'Moderate'}
              badgeType={res.cashOnCashReturn >= 8 ? 'success' : 'neutral'}
            />
            <CalcResultCard
              title="Capitalization Rate (Cap Rate)"
              value={`${formatNumber(res.capRate, 2)}%`}
              subtitle="Annual NOI / Purchase Price"
            />
            <CalcResultCard
              title="Annual NOI"
              value={formatCurrency(res.netOperatingIncomeAnnual)}
              subtitle="Net Operating Income before mortgage"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Includes estimated 3% closing costs in initial cash outlay for Cash-on-Cash yield.</span>
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
