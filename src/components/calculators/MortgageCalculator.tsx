import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { Home, DollarSign, Percent, Calendar, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const MortgageCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [homePrice, setHomePrice] = useState<number>(() => initialPreset?.homePrice ?? 450000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(() => initialPreset?.downPaymentPercent ?? 20);
  const [interestRate, setInterestRate] = useState<number>(() => initialPreset?.interestRate ?? 6.75);
  const [loanTermYears, setLoanTermYears] = useState<number>(() => initialPreset?.loanTermYears ?? 30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(() => initialPreset?.propertyTaxRate ?? 1.2);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(() => initialPreset?.homeInsuranceAnnual ?? 1500);
  const [hoaMonthly, setHoaMonthly] = useState<number>(() => initialPreset?.hoaMonthly ?? 120);
  const [pmiRateAnnual, setPmiRateAnnual] = useState<number>(0.75); // % of loan per year if down payment < 20%
  const [extraMonthlyPrincipal, setExtraMonthlyPrincipal] = useState<number>(0);

  const calculation = useMemo(() => {
    const price = Math.max(0, safeParseNumber(homePrice, 450000));
    const downPct = Math.max(0, Math.min(100, safeParseNumber(downPaymentPercent, 20)));
    const downAmount = (price * downPct) / 100;
    const loanPrincipal = Math.max(0, price - downAmount);

    const apr = Math.max(0, safeParseNumber(interestRate, 6.75)) / 100;
    const years = Math.max(5, Math.min(40, safeParseNumber(loanTermYears, 30)));
    const totalMonths = years * 12;
    const monthlyRate = apr / 12;

    // Monthly Principal & Interest (P&I)
    let monthlyPI = 0;
    if (monthlyRate > 0 && totalMonths > 0 && loanPrincipal > 0) {
      monthlyPI =
        (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else if (totalMonths > 0 && loanPrincipal > 0) {
      monthlyPI = loanPrincipal / totalMonths;
    }

    // Taxes & Insurance
    const taxRate = Math.max(0, safeParseNumber(propertyTaxRate, 1.2)) / 100;
    const monthlyPropertyTax = (price * taxRate) / 12;
    const monthlyInsurance = Math.max(0, safeParseNumber(homeInsuranceAnnual, 1500)) / 12;
    const hoa = Math.max(0, safeParseNumber(hoaMonthly, 0));

    // PMI calculation: applies until loan-to-value (LTV) reaches 80% (equity >= 20%)
    const requiresPmi = downPct < 20;
    const pmiRate = requiresPmi ? Math.max(0, safeParseNumber(pmiRateAnnual, 0.75)) / 100 : 0;
    const initialMonthlyPmi = requiresPmi ? (loanPrincipal * pmiRate) / 12 : 0;

    const initialTotalMonthlyPITI = monthlyPI + monthlyPropertyTax + monthlyInsurance + hoa + initialMonthlyPmi;

    const standardTotalPayments = monthlyPI * totalMonths;
    const standardTotalInterest = Math.max(0, standardTotalPayments - loanPrincipal);

    // Amortization loop with extra payment and dynamic PMI drop-off at 80% LTV
    const extraPmt = Math.max(0, safeParseNumber(extraMonthlyPrincipal, 0));
    let curBal = loanPrincipal;
    let accumulatedInterest = 0;
    let accumulatedPmi = 0;
    let pmiDropMonth = requiresPmi ? totalMonths : 0;
    let actualPayoffMonths = 0;
    const yearlyAmortization = [];

    const ltv80Threshold = price * 0.8; // PMI cancels when loan balance <= 80% of original purchase price

    for (let m = 1; m <= totalMonths && curBal > 0.01; m++) {
      const interestM = curBal * monthlyRate;
      let principalM = monthlyPI - interestM + extraPmt;

      if (principalM > curBal) {
        principalM = curBal;
      }

      accumulatedInterest += interestM;
      curBal -= principalM;
      actualPayoffMonths = m;

      // Track PMI
      if (curBal > ltv80Threshold && requiresPmi) {
        accumulatedPmi += (loanPrincipal * pmiRate) / 12;
      } else if (pmiDropMonth === totalMonths && requiresPmi) {
        pmiDropMonth = m;
      }

      if (m % 12 === 0 || curBal <= 0.01 || m === totalMonths) {
        const yr = Math.ceil(m / 12);
        yearlyAmortization.push({
          year: yr,
          label: `Yr ${yr}`,
          balance: Math.max(0, Math.round(curBal)),
          interestPaid: Math.round(accumulatedInterest),
          principalPaid: Math.round(loanPrincipal - curBal),
        });
      }
    }

    const interestSaved = Math.max(0, standardTotalInterest - accumulatedInterest);
    const monthsSaved = totalMonths - actualPayoffMonths;
    const yearsSaved = (monthsSaved / 12).toFixed(1);

    return {
      price,
      downAmount,
      downPct,
      loanPrincipal,
      monthlyPI,
      monthlyPropertyTax,
      monthlyInsurance,
      hoa,
      initialMonthlyPmi,
      initialTotalMonthlyPITI,
      standardTotalPayments,
      standardTotalInterest,
      pmiDropMonth,
      accumulatedPmi,
      actualPayoffMonths,
      interestSaved,
      monthsSaved,
      yearsSaved,
      yearlyAmortization,
    };
  }, [
    homePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    homeInsuranceAnnual,
    hoaMonthly,
    pmiRateAnnual,
    extraMonthlyPrincipal,
  ]);

  const pieData = [
    { name: 'Principal & Interest', value: Math.round(calculation.monthlyPI), color: '#0d9488' },
    { name: 'Property Tax', value: Math.round(calculation.monthlyPropertyTax), color: '#3b82f6' },
    { name: 'Home Insurance', value: Math.round(calculation.monthlyInsurance), color: '#f59e0b' },
    { name: 'HOA Dues', value: Math.round(calculation.hoa), color: '#8b5cf6' },
    { name: 'PMI', value: Math.round(calculation.initialMonthlyPmi), color: '#ef4444' },
  ].filter((d) => d.value > 0);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Mortgage: $${formatCurrency(calculation.initialTotalMonthlyPITI)}/mo ($${formatNumber(homePrice)} home @ ${interestRate}% for ${loanTermYears} yrs)`,
        {
          homePrice,
          downPaymentPercent,
          interestRate,
          loanTermYears,
          propertyTaxRate,
        },
        {
          monthlyPITI: calculation.initialTotalMonthlyPITI,
          monthlyPI: calculation.monthlyPI,
          totalInterest: calculation.standardTotalInterest,
          loanPrincipal: calculation.loanPrincipal,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Estimated Total Monthly Mortgage Payment (PITI + HOA)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Total Monthly Payment:{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono text-base">
              ${formatCurrency(calculation.initialTotalMonthlyPITI)}/mo
            </strong>{' '}
            (Principal &amp; Interest:{' '}
            <strong className="font-mono font-bold">${formatCurrency(calculation.monthlyPI)}/mo</strong>). Total loan interest:{' '}
            <strong className="font-mono font-bold">${formatCurrency(calculation.standardTotalInterest)}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Loan Amount Financed
            </span>
            <span className="text-xl font-black font-mono text-teal-600 dark:text-teal-400">
              ${formatCurrency(calculation.loanPrincipal)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Home Price & Loan Parameters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Home Price &amp; Down Payment
            </h4>
          </div>

          <CalcInput
            id="homePrice"
            label="Home Purchase Price"
            value={homePrice}
            onChange={(val) => setHomePrice(val)}
            min={20000}
            max={10000000}
            step={5000}
            prefix="$"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="downPaymentPercent"
              label="Down Payment %"
              value={downPaymentPercent}
              onChange={(val) => setDownPaymentPercent(val)}
              min={0}
              max={95}
              step={0.5}
              suffix="%"
              helpText={`Amount: $${formatNumber(Math.round(calculation.downAmount))}`}
            />

            <CalcInput
              id="interestRate"
              label="Mortgage Interest Rate"
              value={interestRate}
              onChange={(val) => setInterestRate(val)}
              min={0.1}
              max={20}
              step={0.125}
              suffix="%"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Loan Term (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>

            <CalcInput
              id="extraMonthlyPrincipal"
              label="Extra Monthly Principal"
              value={extraMonthlyPrincipal}
              onChange={(val) => setExtraMonthlyPrincipal(val)}
              min={0}
              max={10000}
              step={50}
              prefix="$"
              helpText="Accelerates loan payoff."
            />
          </div>
        </div>

        {/* Right: Taxes, Insurance & HOA */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Taxes, Insurance &amp; HOA Dues
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="propertyTaxRate"
              label="Annual Property Tax Rate"
              value={propertyTaxRate}
              onChange={(val) => setPropertyTaxRate(val)}
              min={0}
              max={6}
              step={0.05}
              suffix="%"
              helpText={`$${formatNumber(Math.round(calculation.monthlyPropertyTax))}/mo`}
            />

            <CalcInput
              id="homeInsuranceAnnual"
              label="Annual Homeowners Insurance"
              value={homeInsuranceAnnual}
              onChange={(val) => setHomeInsuranceAnnual(val)}
              min={0}
              max={15000}
              step={50}
              prefix="$"
              helpText={`$${formatNumber(Math.round(calculation.monthlyInsurance))}/mo`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="hoaMonthly"
              label="Monthly HOA Dues"
              value={hoaMonthly}
              onChange={(val) => setHoaMonthly(val)}
              min={0}
              max={5000}
              step={10}
              prefix="$"
            />

            <CalcInput
              id="pmiRateAnnual"
              label="PMI Rate (if < 20% down)"
              value={pmiRateAnnual}
              onChange={(val) => setPmiRateAnnual(val)}
              min={0}
              max={3}
              step={0.05}
              suffix="%"
              helpText={
                downPaymentPercent < 20
                  ? `$${formatNumber(Math.round(calculation.initialMonthlyPmi))}/mo until 80% LTV`
                  : 'No PMI required (≥20% down)'
              }
            />
          </div>

          {downPaymentPercent < 20 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                With a {downPaymentPercent}% down payment, Private Mortgage Insurance (PMI) of{' '}
                <strong>${formatNumber(Math.round(calculation.initialMonthlyPmi))}/mo</strong> applies until your loan
                balance drops below 80% of home value (around month {calculation.pmiDropMonth}).
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Total Monthly PITI"
          value={`$${formatCurrency(calculation.initialTotalMonthlyPITI)}`}
          subtitle="Principal, Interest, Tax, Ins & HOA"
          highlighted={true}
          icon={<Home className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Principal & Interest"
          value={`$${formatCurrency(calculation.monthlyPI)}`}
          subtitle={`Pure mortgage loan payment per month`}
          icon={<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Total Lifetime Interest"
          value={`$${formatCurrency(calculation.standardTotalInterest)}`}
          subtitle={`Over ${loanTermYears} years at ${interestRate}%`}
          icon={<Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Total Loan Outlay"
          value={`$${formatCurrency(calculation.standardTotalPayments)}`}
          subtitle="Total P&I paid over loan life"
          icon={<Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      {/* Extra Monthly Payment Benefit Banner */}
      {extraMonthlyPrincipal > 0 && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              By paying an extra <strong>${formatNumber(extraMonthlyPrincipal)}/mo</strong>, you will pay off your
              mortgage <strong>{calculation.yearsSaved} years ({calculation.monthsSaved} months) early</strong> and save{' '}
              <strong>${formatCurrency(calculation.interestSaved)}</strong> in total interest!
            </span>
          </div>
        </div>
      )}

      {/* Breakdown Visual: Pie Chart & Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Monthly Payment Composition Pie */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-teal-500" />
            Monthly Payment Composition
          </h3>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}/mo`, '']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${item.value.toLocaleString()}/mo
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Balance Payoff Curve Area Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            Mortgage Balance &amp; Cumulative Interest Over Time
          </h3>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calculation.yearlyAmortization} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                  labelFormatter={(lbl) => `Timeline: ${lbl}`}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  name="Remaining Principal Balance"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#balanceGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="interestPaid"
                  name="Cumulative Interest Paid"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#interestGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Year-by-Year Amortization Schedule Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-500" />
          Year-by-Year Loan Amortization Schedule
        </h3>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-xs text-left">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Year</th>
                <th className="py-2.5 px-3 font-semibold">Remaining Loan Balance</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative Principal Paid</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative Interest Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.yearlyAmortization.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                    Year {row.year}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                    ${row.balance.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ${row.principalPaid.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 font-mono text-red-600 dark:text-red-400">
                    ${row.interestPaid.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
