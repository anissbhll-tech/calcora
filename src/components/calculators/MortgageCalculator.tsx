import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CalculationHistoryItem } from '../../types';

interface MortgageCalculatorProps {
  onAddHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  presetValues?: Record<string, any>;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  onAddHistory,
  presetValues,
}) => {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1400);
  const [hoaMonthly, setHoaMonthly] = useState<number>(100);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Apply preset if passed
  useEffect(() => {
    if (presetValues) {
      if (presetValues.homePrice !== undefined) setHomePrice(presetValues.homePrice);
      if (presetValues.downPaymentPercent !== undefined) setDownPaymentPercent(presetValues.downPaymentPercent);
      if (presetValues.interestRate !== undefined) setInterestRate(presetValues.interestRate);
      if (presetValues.loanTermYears !== undefined) setLoanTermYears(presetValues.loanTermYears);
      if (presetValues.propertyTaxRate !== undefined) setPropertyTaxRate(presetValues.propertyTaxRate);
      if (presetValues.homeInsuranceAnnual !== undefined) setHomeInsuranceAnnual(presetValues.homeInsuranceAnnual);
      if (presetValues.hoaMonthly !== undefined) setHoaMonthly(presetValues.hoaMonthly);
    }
  }, [presetValues]);

  // Derived Calculations
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanPrincipal = Math.max(0, homePrice - downPaymentAmount);
  
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyInterestRate > 0 && totalPayments > 0 && loanPrincipal > 0) {
    monthlyPrincipalAndInterest =
      (loanPrincipal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  } else if (totalPayments > 0) {
    monthlyPrincipalAndInterest = loanPrincipal / totalPayments;
  }

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeInsuranceAnnual / 12;
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + hoaMonthly;

  const totalLoanRepayment = monthlyPrincipalAndInterest * totalPayments;
  const totalInterestPaid = Math.max(0, totalLoanRepayment - loanPrincipal);

  // Amortization Schedule & Chart Data
  const yearlyChartData = [];
  const fullAmortizationSchedule = [];
  let balance = loanPrincipal;
  let accumulatedInterest = 0;

  for (let month = 1; month <= totalPayments; month++) {
    const interestForMonth = balance * monthlyInterestRate;
    const principalForMonth = monthlyPrincipalAndInterest - interestForMonth;
    balance = Math.max(0, balance - principalForMonth);
    accumulatedInterest += interestForMonth;

    if (month % 12 === 0 || month === totalPayments) {
      const year = month / 12;
      yearlyChartData.push({
        year: `Yr ${Math.ceil(year)}`,
        RemainingBalance: Math.round(balance),
        InterestPaid: Math.round(accumulatedInterest),
      });
    }

    fullAmortizationSchedule.push({
      month,
      year: Math.ceil(month / 12),
      principal: principalForMonth,
      interest: interestForMonth,
      balance,
    });
  }

  // Record history when payment changes significantly
  useEffect(() => {
    if (totalMonthlyPayment > 0) {
      const timeout = setTimeout(() => {
        onAddHistory({
          calculatorId: 'mortgage',
          calculatorTitle: 'Mortgage & Loan Repayment',
          summaryText: `$${Math.round(totalMonthlyPayment).toLocaleString()}/mo for $${homePrice.toLocaleString()} home loan`,
          inputs: { homePrice, downPaymentPercent, interestRate, loanTermYears },
          results: { totalMonthlyPayment, monthlyPrincipalAndInterest, totalInterestPaid },
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [totalMonthlyPayment, homePrice]);

  const pieData = [
    { name: 'Principal & Interest', value: Math.round(monthlyPrincipalAndInterest), color: '#2563eb' },
    { name: 'Property Tax', value: Math.round(monthlyPropertyTax), color: '#10b981' },
    { name: 'Home Insurance', value: Math.round(monthlyInsurance), color: '#f59e0b' },
    { name: 'HOA Fees', value: Math.round(hoaMonthly), color: '#8b5cf6' },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Loan Parameters
          </h3>

          {/* Home Price */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <label>Home Purchase Price</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">${homePrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={5000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-slate-400">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full text-xs font-mono p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          {/* Down Payment % and Amount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Down Payment (%)
              </label>
              <input
                type="number"
                min={0}
                max={90}
                step={0.5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full text-xs font-mono p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Down Payment ($)
              </label>
              <input
                type="text"
                disabled
                value={`$${Math.round(downPaymentAmount).toLocaleString()}`}
                className="w-full text-xs font-mono p-2.5 bg-slate-100 dark:bg-slate-800/50 text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                min={0.1}
                max={20}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full text-xs font-mono p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Loan Term (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full text-xs font-semibold p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>
          </div>

          {/* Taxes, Insurance, HOA */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400">Taxes & Insurance (Optional)</h4>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Prop Tax (%/yr)</label>
                <input
                  type="number"
                  step={0.1}
                  value={propertyTaxRate}
                  onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Insurance ($/yr)</label>
                <input
                  type="number"
                  step={50}
                  value={homeInsuranceAnnual}
                  onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">HOA ($/mo)</label>
                <input
                  type="number"
                  step={10}
                  value={hoaMonthly}
                  onChange={(e) => setHoaMonthly(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Total Monthly Payment</span>
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-1 font-mono">
              ${Math.round(totalMonthlyPayment).toLocaleString()}
              <span className="text-base text-slate-400 font-normal"> / mo</span>
            </div>

            {/* Monthly Payment Distribution Pie Chart */}
            <div className="h-48 mt-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Breakdown List */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Principal & Interest
                </span>
                <span className="font-mono font-bold">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Property Taxes
                </span>
                <span className="font-mono font-bold">${Math.round(monthlyPropertyTax).toLocaleString()}</span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Home Insurance
                </span>
                <span className="font-mono font-bold">${Math.round(monthlyInsurance).toLocaleString()}</span>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> HOA Fees
                </span>
                <span className="font-mono font-bold">${Math.round(hoaMonthly).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Key Loan Totals */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Loan Amount Principal:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${loanPrincipal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Total Interest Paid ({loanTermYears} yrs):</span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">${Math.round(totalInterestPaid).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span>Total Payments Cost:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">${Math.round(totalLoanRepayment).toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 text-xs transition"
          >
            {showAmortization ? 'Hide Amortization Schedule' : 'View Full Amortization Schedule & Graph'}
          </button>
        </div>

      </div>

      {/* Amortization Chart & Schedule Drawer */}
      {showAmortization && (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in">
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Loan Balance Decay Over {loanTermYears} Years
          </h4>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" textAnchor="end" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Area type="monotone" dataKey="RemainingBalance" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2} name="Remaining Loan Balance" />
                <Area type="monotone" dataKey="InterestPaid" stroke="#ef4444" fill="#f87171" fillOpacity={0.15} name="Total Interest Paid" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <table className="w-full text-left font-mono">
              <thead className="bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 sticky top-0">
                <tr>
                  <th className="p-2.5">Month</th>
                  <th className="p-2.5">Principal</th>
                  <th className="p-2.5">Interest</th>
                  <th className="p-2.5">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {fullAmortizationSchedule.filter((_, idx) => idx % 6 === 0 || idx === fullAmortizationSchedule.length - 1).map((row) => (
                  <tr key={row.month} className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-sans font-semibold">Yr {row.year} (M{row.month})</td>
                    <td className="p-2.5 text-emerald-600">${Math.round(row.principal).toLocaleString()}</td>
                    <td className="p-2.5 text-rose-500">${Math.round(row.interest).toLocaleString()}</td>
                    <td className="p-2.5 font-bold">${Math.round(row.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
