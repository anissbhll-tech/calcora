import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { ShieldCheck, DollarSign, Calendar, RotateCcw, Save } from 'lucide-react';

export const EmergencyFundCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [housing, setHousing] = useState<number>(1500);
  const [utilitiesFood, setUtilitiesFood] = useState<number>(800);
  const [debtPayments, setDebtPayments] = useState<number>(400);
  const [insuranceHealthcare, setInsuranceHealthcare] = useState<number>(350);
  const [transportation, setTransportation] = useState<number>(300);
  const [otherEssentials, setOtherEssentials] = useState<number>(200);

  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setHousing(1500);
    setUtilitiesFood(800);
    setDebtPayments(400);
    setInsuranceHealthcare(350);
    setTransportation(300);
    setOtherEssentials(200);
    setTargetMonths(6);
    setCurrentSavings(5000);
    setMonthlyContribution(500);
  };

  // Calculations
  const monthlyEssentialExpenses = housing + utilitiesFood + debtPayments + insuranceHealthcare + transportation + otherEssentials;
  const targetFundSize = monthlyEssentialExpenses * targetMonths;
  const fundingGap = Math.max(0, targetFundSize - currentSavings);
  const progressPercent = targetFundSize > 0 ? Math.min(100, (currentSavings / targetFundSize) * 100) : 100;

  const monthsToGoal = monthlyContribution > 0 ? Math.ceil(fundingGap / monthlyContribution) : Infinity;

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Emergency Fund: Target $${targetFundSize.toLocaleString()} (${targetMonths} mos @ $${monthlyEssentialExpenses.toLocaleString()}/mo), Current: $${currentSavings.toLocaleString()}`,
        { monthlyEssentialExpenses, targetMonths, currentSavings, monthlyContribution },
        { targetFundSize, fundingGap, monthsToGoal }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Target Fund Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-teal-200 font-medium">Target Emergency Fund</div>
            <div className="text-3xl font-extrabold mt-1">
              ${targetFundSize.toLocaleString()}
            </div>
            <div className="text-xs text-teal-200 mt-1">
              {targetMonths} months of essential expenses (${monthlyEssentialExpenses.toLocaleString()}/mo)
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-indigo-200 font-medium">Current Progress</div>
            <div className="text-2xl font-bold mt-1 text-emerald-300">
              {progressPercent.toFixed(1)}% Funded
            </div>
            <div className="w-full bg-slate-700/60 h-2.5 rounded-full mt-2 overflow-hidden">
              <div style={{ width: `${progressPercent}%` }} className="bg-emerald-400 h-full rounded-full transition-all duration-300" />
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-amber-200 font-medium">Time to Target Goal</div>
            <div className="text-2xl font-bold mt-1 text-amber-300">
              {fundingGap === 0 ? 'Goal Reached! 🎉' : monthsToGoal === Infinity ? 'Need Monthly Savings' : `${monthsToGoal} Months (${(monthsToGoal / 12).toFixed(1)} Yrs)`}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {fundingGap > 0 ? `$${fundingGap.toLocaleString()} gap remaining` : 'Your emergency cushion is fully funded!'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Essential Expenses Form */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-600" /> Monthly Bare-Bones Expenses
            </span>
            <span className="text-sm font-bold text-teal-700">${monthlyEssentialExpenses.toLocaleString()} / mo</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Rent / Mortgage</label>
              <input
                type="number"
                value={housing}
                onChange={(e) => setHousing(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Utilities & Food</label>
              <input
                type="number"
                value={utilitiesFood}
                onChange={(e) => setUtilitiesFood(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Minimum Debt Payments</label>
              <input
                type="number"
                value={debtPayments}
                onChange={(e) => setDebtPayments(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Insurance & Health</label>
              <input
                type="number"
                value={insuranceHealthcare}
                onChange={(e) => setInsuranceHealthcare(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Transportation & Gas</label>
              <input
                type="number"
                value={transportation}
                onChange={(e) => setTransportation(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Other Essentials</label>
              <input
                type="number"
                value={otherEssentials}
                onChange={(e) => setOtherEssentials(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Target Cushion & Funding Plan */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" /> Target Cushion & Savings
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Safety Cushion Horizon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => setTargetMonths(m)}
                  className={`py-2 text-xs font-bold rounded-lg border transition ${targetMonths === m ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  {m} Months
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Current Emergency Savings ($)
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Monthly Savings Contribution ($)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
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
              <Save className="w-4 h-4" /> Save Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
