import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { DollarSign, Percent, Calendar, FileText, ArrowRight, RotateCcw, Save } from 'lucide-react';

export const PersonalLoanPaymentCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36);
  const [originationFeePercent, setOriginationFeePercent] = useState<number>(2.0);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.loanAmount) setLoanAmount(Number(initialPreset.loanAmount));
      if (initialPreset.interestRate) setInterestRate(Number(initialPreset.interestRate));
      if (initialPreset.loanTermMonths) setLoanTermMonths(Number(initialPreset.loanTermMonths));
    }
  }, [initialPreset]);

  const handleReset = () => {
    setLoanAmount(10000);
    setInterestRate(10.5);
    setLoanTermMonths(36);
    setOriginationFeePercent(2.0);
  };

  // Calculation Logic
  const originationFeeAmount = (loanAmount * Math.max(0, originationFeePercent)) / 100;
  const netDisbursedAmount = Math.max(0, loanAmount - originationFeeAmount);

  const monthlyRate = interestRate > 0 ? (interestRate / 100) / 12 : 0;
  let monthlyPayment = 0;

  if (loanTermMonths > 0) {
    if (monthlyRate > 0) {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    } else {
      monthlyPayment = loanAmount / loanTermMonths;
    }
  }

  const totalPayments = monthlyPayment * loanTermMonths;
  const totalInterest = Math.max(0, totalPayments - loanAmount);
  const totalCostOfLoan = totalInterest + originationFeeAmount;
  const effectiveApr = loanAmount > 0 && netDisbursedAmount > 0 ? (((totalInterest + originationFeeAmount) / netDisbursedAmount) / (loanTermMonths / 12)) * 100 : interestRate;

  // Yearly Amortization preview
  const generateAmortization = () => {
    const schedule: { year: number; balance: number; interestPaid: number; principalPaid: number }[] = [];
    let currentBalance = loanAmount;
    let accumulatedInterest = 0;
    let accumulatedPrincipal = 0;

    for (let month = 1; month <= loanTermMonths; month++) {
      const interestForMonth = currentBalance * monthlyRate;
      const principalForMonth = monthlyPayment - interestForMonth;
      currentBalance = Math.max(0, currentBalance - principalForMonth);
      accumulatedInterest += interestForMonth;
      accumulatedPrincipal += principalForMonth;

      if (month % 12 === 0 || month === loanTermMonths) {
        schedule.push({
          year: Math.ceil(month / 12),
          balance: Math.round(currentBalance),
          interestPaid: Math.round(accumulatedInterest),
          principalPaid: Math.round(accumulatedPrincipal)
        });
      }
    }
    return schedule;
  };

  const schedule = generateAmortization();

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Personal Loan: $${loanAmount.toLocaleString()} @ ${interestRate}% for ${loanTermMonths} mos ($${monthlyPayment.toFixed(2)}/mo)`,
        { loanAmount, interestRate, loanTermMonths, originationFeePercent },
        { monthlyPayment, totalInterest, totalCostOfLoan, effectiveApr }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Preset Selector */}
      <div className="flex flex-wrap gap-2 items-center text-sm">
        <span className="font-medium text-slate-700">Quick Presets:</span>
        <button
          onClick={() => { setLoanAmount(5000); setInterestRate(8.9); setLoanTermMonths(24); setOriginationFeePercent(0); }}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
        >
          $5k Small Loan (2 yrs)
        </button>
        <button
          onClick={() => { setLoanAmount(15000); setInterestRate(11.5); setLoanTermMonths(36); setOriginationFeePercent(2); }}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
        >
          $15k Debt Consolidation (3 yrs)
        </button>
        <button
          onClick={() => { setLoanAmount(35000); setInterestRate(12.9); setLoanTermMonths(60); setOriginationFeePercent(3); }}
          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
        >
          $35k Home Improvement (5 yrs)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-600" />
            Loan Parameters
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Requested Loan Amount ($)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Interest Rate (APR %)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Loan Term (Months)
            </label>
            <select
              value={loanTermMonths}
              onChange={(e) => setLoanTermMonths(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value={12}>12 Months (1 Year)</option>
              <option value={24}>24 Months (2 Years)</option>
              <option value={36}>36 Months (3 Years)</option>
              <option value={48}>48 Months (4 Years)</option>
              <option value={60}>60 Months (5 Years)</option>
              <option value={72}>72 Months (6 Years)</option>
              <option value={84}>84 Months (7 Years)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Origination Fee (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={originationFeePercent}
              onChange={(e) => setOriginationFeePercent(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition flex items-center justify-center gap-1 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-md">
            <div className="text-xs uppercase tracking-wider text-indigo-200 font-medium mb-1">
              Estimated Monthly Payment
            </div>
            <div className="text-3xl font-bold mb-4">
              ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-sm font-normal text-indigo-200"> / mo</span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-indigo-700/50 pt-4 text-sm">
              <div>
                <div className="text-indigo-200 text-xs">Total Interest Paid</div>
                <div className="font-semibold text-lg">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs">Total Cost of Loan</div>
                <div className="font-semibold text-lg">${(totalPayments + originationFeeAmount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs">Net Amount Rec'd</div>
                <div className="font-semibold">${netDisbursedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
              <div>
                <div className="text-indigo-200 text-xs">Origination Fee</div>
                <div className="font-semibold">${originationFeeAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown Bar */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-slate-800 text-sm mb-3">Total Payment Breakdown</h4>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(loanAmount / (totalPayments + originationFeeAmount || 1)) * 100}%` }}
                className="bg-indigo-600 h-full"
                title="Principal"
              />
              <div
                style={{ width: `${(totalInterest / (totalPayments + originationFeeAmount || 1)) * 100}%` }}
                className="bg-amber-500 h-full"
                title="Interest"
              />
              <div
                style={{ width: `${(originationFeeAmount / (totalPayments + originationFeeAmount || 1)) * 100}%` }}
                className="bg-rose-500 h-full"
                title="Origination Fee"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span> Principal: ${loanAmount.toLocaleString()}</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Interest: ${Math.round(totalInterest).toLocaleString()}</span>
              {originationFeeAmount > 0 && (
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Fee: ${Math.round(originationFeeAmount).toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Summary */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-semibold text-slate-800 mb-3 text-sm">Amortization Milestone Schedule</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-50 uppercase text-slate-500 font-semibold border-b">
              <tr>
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3">Principal Paid</th>
                <th className="py-2.5 px-3">Interest Paid</th>
                <th className="py-2.5 px-3">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-medium">Year {row.year}</td>
                  <td className="py-2 px-3 text-emerald-700">${row.principalPaid.toLocaleString()}</td>
                  <td className="py-2 px-3 text-amber-700">${row.interestPaid.toLocaleString()}</td>
                  <td className="py-2 px-3 font-semibold">${row.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
