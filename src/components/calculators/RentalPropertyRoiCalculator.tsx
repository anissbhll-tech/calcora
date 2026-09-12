import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { Building, DollarSign, Percent, TrendingUp, ShieldCheck, Home, AlertCircle, Sparkles } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const RentalPropertyRoiCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  // Acquisition & Financing
  const [purchasePrice, setPurchasePrice] = useState<number>(() => initialPreset?.purchasePrice ?? 350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(() => initialPreset?.downPaymentPercent ?? 20);
  const [closingCostsPercent, setClosingCostsPercent] = useState<number>(3.0);
  const [rehabCost, setRehabCost] = useState<number>(5000);
  const [mortgageRate, setMortgageRate] = useState<number>(6.75);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // Income & Occupancy
  const [monthlyRent, setMonthlyRent] = useState<number>(() => initialPreset?.monthlyRent ?? 2600);
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState<number>(100);
  const [vacancyRate, setVacancyRate] = useState<number>(5.0);

  // Operating Expenses
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(4200);
  const [insuranceAnnual, setInsuranceAnnual] = useState<number>(1500);
  const [managementFeePercent, setManagementFeePercent] = useState<number>(8.0);
  const [maintenancePercent, setMaintenancePercent] = useState<number>(7.0);
  const [hoaMonthly, setHoaMonthly] = useState<number>(0);
  const [annualAppreciationRate, setAnnualAppreciationRate] = useState<number>(3.5);

  const calculation = useMemo(() => {
    const price = Math.max(1000, safeParseNumber(purchasePrice, 350000));
    const downPct = Math.max(0, Math.min(100, safeParseNumber(downPaymentPercent, 20))) / 100;
    const closingPct = Math.max(0, safeParseNumber(closingCostsPercent, 3)) / 100;
    const rehab = Math.max(0, safeParseNumber(rehabCost, 0));

    const downPayment = price * downPct;
    const closingCosts = price * closingPct;
    const totalCashInvested = downPayment + closingCosts + rehab;

    const loanPrincipal = Math.max(0, price - downPayment);
    const apr = Math.max(0, safeParseNumber(mortgageRate, 6.75)) / 100;
    const years = Math.max(5, Math.min(40, safeParseNumber(loanTermYears, 30)));
    const totalMonths = years * 12;
    const monthlyRate = apr / 12;

    let monthlyPI = 0;
    if (monthlyRate > 0 && totalMonths > 0 && loanPrincipal > 0) {
      monthlyPI =
        (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else if (totalMonths > 0 && loanPrincipal > 0) {
      monthlyPI = loanPrincipal / totalMonths;
    }
    const annualDebtService = monthlyPI * 12;

    // Gross Revenue
    const baseRent = Math.max(0, safeParseNumber(monthlyRent, 2600));
    const otherInc = Math.max(0, safeParseNumber(otherMonthlyIncome, 0));
    const grossPotentialMonthly = baseRent + otherInc;
    const grossPotentialAnnual = grossPotentialMonthly * 12;

    const vacancyPct = Math.max(0, Math.min(100, safeParseNumber(vacancyRate, 5))) / 100;
    const monthlyVacancy = grossPotentialMonthly * vacancyPct;
    const effectiveGrossMonthly = grossPotentialMonthly - monthlyVacancy;
    const effectiveGrossAnnual = effectiveGrossMonthly * 12;

    // Operating Expenses
    const monthlyPropertyTax = Math.max(0, safeParseNumber(propertyTaxAnnual, 4200)) / 12;
    const monthlyInsurance = Math.max(0, safeParseNumber(insuranceAnnual, 1500)) / 12;
    const mgmtPct = Math.max(0, Math.min(100, safeParseNumber(managementFeePercent, 8))) / 100;
    const monthlyMgmt = effectiveGrossMonthly * mgmtPct;
    const maintPct = Math.max(0, Math.min(100, safeParseNumber(maintenancePercent, 7))) / 100;
    const monthlyMaint = effectiveGrossMonthly * maintPct;
    const monthlyHoa = Math.max(0, safeParseNumber(hoaMonthly, 0));

    const totalMonthlyOperatingExpenses =
      monthlyPropertyTax + monthlyInsurance + monthlyMgmt + monthlyMaint + monthlyHoa;
    const totalAnnualOperatingExpenses = totalMonthlyOperatingExpenses * 12;

    // Net Operating Income (NOI)
    const monthlyNOI = effectiveGrossMonthly - totalMonthlyOperatingExpenses;
    const annualNOI = monthlyNOI * 12;

    // Cash Flow
    const monthlyCashFlow = monthlyNOI - monthlyPI;
    const annualCashFlow = monthlyCashFlow * 12;

    // Performance Metrics
    const capRate = price > 0 ? (annualNOI / price) * 100 : 0;
    const cashOnCashROI = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
    const grossRentalYield = price > 0 ? (grossPotentialAnnual / price) * 100 : 0;
    const grossRentMultiplier = grossPotentialAnnual > 0 ? price / grossPotentialAnnual : 0;
    const onePercentRuleRatio = price > 0 ? (baseRent / price) * 100 : 0;
    const dscr = annualDebtService > 0 ? annualNOI / annualDebtService : 999;

    // 10-Year Wealth Projection (Cash Flow + Principal Paydown + Appreciation)
    const appreciationPct = Math.max(0, safeParseNumber(annualAppreciationRate, 3.5)) / 100;
    const wealthProjection = [];
    let curBalance = loanPrincipal;
    let accumulatedCashFlow = 0;
    let propValue = price;

    for (let yr = 1; yr <= 10; yr++) {
      let principalPaidThisYear = 0;
      for (let m = 1; m <= 12 && curBalance > 0; m++) {
        const intM = curBalance * monthlyRate;
        const prinM = Math.min(curBalance, monthlyPI - intM);
        curBalance -= prinM;
        principalPaidThisYear += prinM;
      }
      propValue *= (1 + appreciationPct);
      accumulatedCashFlow += annualCashFlow;
      const equity = propValue - curBalance;
      const totalNetGain = equity - totalCashInvested + accumulatedCashFlow;

      wealthProjection.push({
        year: `Yr ${yr}`,
        propertyValue: Math.round(propValue),
        remainingLoan: Math.max(0, Math.round(curBalance)),
        accumulatedCashFlow: Math.round(accumulatedCashFlow),
        equity: Math.round(equity),
        totalNetGain: Math.round(totalNetGain),
      });
    }

    return {
      price,
      downPayment,
      closingCosts,
      rehab,
      totalCashInvested,
      loanPrincipal,
      monthlyPI,
      grossPotentialMonthly,
      grossPotentialAnnual,
      monthlyVacancy,
      effectiveGrossMonthly,
      effectiveGrossAnnual,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyMgmt,
      monthlyMaint,
      monthlyHoa,
      totalMonthlyOperatingExpenses,
      totalAnnualOperatingExpenses,
      monthlyNOI,
      annualNOI,
      monthlyCashFlow,
      annualCashFlow,
      capRate,
      cashOnCashROI,
      grossRentalYield,
      grossRentMultiplier,
      onePercentRuleRatio,
      dscr,
      wealthProjection,
    };
  }, [
    purchasePrice,
    downPaymentPercent,
    closingCostsPercent,
    rehabCost,
    mortgageRate,
    loanTermYears,
    monthlyRent,
    otherMonthlyIncome,
    vacancyRate,
    propertyTaxAnnual,
    insuranceAnnual,
    managementFeePercent,
    maintenancePercent,
    hoaMonthly,
    annualAppreciationRate,
  ]);

  const expensePieData = [
    { name: 'Mortgage P&I', value: Math.round(calculation.monthlyPI), color: '#0d9488' },
    { name: 'Property Taxes', value: Math.round(calculation.monthlyPropertyTax), color: '#3b82f6' },
    { name: 'Insurance', value: Math.round(calculation.monthlyInsurance), color: '#f59e0b' },
    { name: 'Management Fee', value: Math.round(calculation.monthlyMgmt), color: '#8b5cf6' },
    { name: 'Maint & CapEx', value: Math.round(calculation.monthlyMaint), color: '#ec4899' },
    { name: 'Vacancy Reserve', value: Math.round(calculation.monthlyVacancy), color: '#64748b' },
  ].filter((d) => d.value > 0);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Rental Property ROI: $${formatCurrency(calculation.monthlyCashFlow)}/mo cash flow | ${calculation.cashOnCashROI.toFixed(1)}% CoC ROI on $${formatNumber(purchasePrice)} property`,
        {
          purchasePrice,
          downPaymentPercent,
          monthlyRent,
          mortgageRate,
        },
        {
          monthlyCashFlow: calculation.monthlyCashFlow,
          cashOnCashROI: calculation.cashOnCashROI,
          capRate: calculation.capRate,
          annualNOI: calculation.annualNOI,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Real Estate Rental Cash Flow &amp; Return Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Net Cash Flow:{' '}
            <strong className={`font-mono font-bold text-base ${calculation.monthlyCashFlow >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600'}`}>
              ${formatCurrency(calculation.monthlyCashFlow)}/mo
            </strong>{' '}
            (${formatCurrency(calculation.annualCashFlow)}/yr). Cap Rate:{' '}
            <strong className="font-mono font-bold">{calculation.capRate.toFixed(2)}%</strong> | Cash-on-Cash Return:{' '}
            <strong className="font-mono font-bold text-teal-700 dark:text-teal-300">
              {calculation.cashOnCashROI.toFixed(2)}%
            </strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Cash Invested
            </span>
            <span className="text-xl font-black font-mono text-teal-600 dark:text-teal-400">
              ${formatCurrency(calculation.totalCashInvested)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Column 1: Acquisition & Loan */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Home className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Purchase &amp; Financing
            </h4>
          </div>

          <CalcInput
            id="purchasePrice"
            label="Purchase Price"
            value={purchasePrice}
            onChange={(val) => setPurchasePrice(val)}
            min={10000}
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
              max={100}
              step={1}
              suffix="%"
              helpText={`$${formatNumber(Math.round(calculation.downPayment))}`}
            />
            <CalcInput
              id="closingCostsPercent"
              label="Closing Costs %"
              value={closingCostsPercent}
              onChange={(val) => setClosingCostsPercent(val)}
              min={0}
              max={10}
              step={0.5}
              suffix="%"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="rehabCost"
              label="Initial Rehab / Repair"
              value={rehabCost}
              onChange={(val) => setRehabCost(val)}
              min={0}
              max={500000}
              step={1000}
              prefix="$"
            />
            <CalcInput
              id="mortgageRate"
              label="Mortgage Rate (APR)"
              value={mortgageRate}
              onChange={(val) => setMortgageRate(val)}
              min={0}
              max={20}
              step={0.125}
              suffix="%"
            />
          </div>
        </div>

        {/* Column 2: Rental Income */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Rental Income &amp; Vacancy
            </h4>
          </div>

          <CalcInput
            id="monthlyRent"
            label="Gross Monthly Rent"
            value={monthlyRent}
            onChange={(val) => setMonthlyRent(val)}
            min={0}
            max={50000}
            step={50}
            prefix="$"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="otherMonthlyIncome"
              label="Other Monthly Income"
              value={otherMonthlyIncome}
              onChange={(val) => setOtherMonthlyIncome(val)}
              min={0}
              max={10000}
              step={25}
              prefix="$"
              helpText="Parking, laundry, storage"
            />
            <CalcInput
              id="vacancyRate"
              label="Vacancy Reserve %"
              value={vacancyRate}
              onChange={(val) => setVacancyRate(val)}
              min={0}
              max={30}
              step={0.5}
              suffix="%"
              helpText={`-$${formatNumber(Math.round(calculation.monthlyVacancy))}/mo`}
            />
          </div>

          <CalcInput
            id="annualAppreciationRate"
            label="Annual Property Appreciation"
            value={annualAppreciationRate}
            onChange={(val) => setAnnualAppreciationRate(val)}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            helpText="Historical real estate avg ~3-4%/yr"
          />
        </div>

        {/* Column 3: Operating Expenses */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Operating Expenses
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="propertyTaxAnnual"
              label="Annual Property Taxes"
              value={propertyTaxAnnual}
              onChange={(val) => setPropertyTaxAnnual(val)}
              min={0}
              max={50000}
              step={100}
              prefix="$"
            />
            <CalcInput
              id="insuranceAnnual"
              label="Annual Insurance"
              value={insuranceAnnual}
              onChange={(val) => setInsuranceAnnual(val)}
              min={0}
              max={25000}
              step={50}
              prefix="$"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="managementFeePercent"
              label="Management Fee %"
              value={managementFeePercent}
              onChange={(val) => setManagementFeePercent(val)}
              min={0}
              max={25}
              step={0.5}
              suffix="%"
              helpText={`$${formatNumber(Math.round(calculation.monthlyMgmt))}/mo`}
            />
            <CalcInput
              id="maintenancePercent"
              label="Maint &amp; CapEx %"
              value={maintenancePercent}
              onChange={(val) => setMaintenancePercent(val)}
              min={0}
              max={25}
              step={0.5}
              suffix="%"
              helpText={`$${formatNumber(Math.round(calculation.monthlyMaint))}/mo`}
            />
          </div>

          <CalcInput
            id="hoaMonthly"
            label="Monthly HOA / Condo Dues"
            value={hoaMonthly}
            onChange={(val) => setHoaMonthly(val)}
            min={0}
            max={3000}
            step={10}
            prefix="$"
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Monthly Net Cash Flow"
          value={`$${formatCurrency(calculation.monthlyCashFlow)}`}
          subtitle={`$${formatCurrency(calculation.annualCashFlow)}/year after all expenses & debt`}
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Cash-on-Cash Return"
          value={`${calculation.cashOnCashROI.toFixed(2)}%`}
          subtitle="Annual Cash Flow / Total Cash Invested"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Capitalization Rate (Cap Rate)"
          value={`${calculation.capRate.toFixed(2)}%`}
          subtitle="Unleveraged Annual NOI / Purchase Price"
          icon={<Percent className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Annual Net Operating Income"
          value={`$${formatCurrency(calculation.annualNOI)}`}
          subtitle={`$${formatCurrency(calculation.monthlyNOI)}/month before mortgage`}
          icon={<Building className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      {/* Secondary Underwriting Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="space-y-0.5">
          <span className="text-slate-500 dark:text-slate-400 block font-medium">1% Rule Metric</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
            {calculation.onePercentRuleRatio.toFixed(2)}%
          </span>
          <span className="text-[10px] text-slate-500 block">
            {calculation.onePercentRuleRatio >= 1.0 ? 'Passes 1% Rule' : 'Below 1% guideline'}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-slate-500 dark:text-slate-400 block font-medium">Gross Rent Multiplier</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
            {calculation.grossRentMultiplier.toFixed(1)}x
          </span>
          <span className="text-[10px] text-slate-500 block">Price / Annual Gross Rent</span>
        </div>

        <div className="space-y-0.5">
          <span className="text-slate-500 dark:text-slate-400 block font-medium">Debt Service Coverage (DSCR)</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
            {calculation.dscr.toFixed(2)}x
          </span>
          <span className="text-[10px] text-slate-500 block">
            {calculation.dscr >= 1.25 ? 'Strong DSCR (≥1.25)' : 'Tight debt coverage'}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-slate-500 dark:text-slate-400 block font-medium">Gross Rental Yield</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
            {calculation.grossRentalYield.toFixed(2)}%
          </span>
          <span className="text-[10px] text-slate-500 block">Annual Rent / Price</span>
        </div>
      </div>

      {/* Visuals: Monthly Outflow Pie & 10-Year Wealth Projection Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Monthly Expenses & Debt Pie */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-teal-500" />
            Monthly Expense &amp; Debt Outflows
          </h3>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {expensePieData.map((entry, index) => (
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
            {expensePieData.map((item) => (
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

        {/* Right: 10-Year Wealth & Equity Accumulation Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            10-Year Real Estate Wealth Accumulation
          </h3>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calculation.wealthProjection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="equity" name="Property Equity" fill="#0d9488" stackId="a" />
                <Bar dataKey="accumulatedCashFlow" name="Cumulative Cash Flow" fill="#10b981" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 10-Year Pro-Forma Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building className="w-4 h-4 text-teal-500" />
          10-Year Investment Return &amp; Equity Schedule
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Year</th>
                <th className="py-2.5 px-3 font-semibold">Property Value</th>
                <th className="py-2.5 px-3 font-semibold">Remaining Loan</th>
                <th className="py-2.5 px-3 font-semibold">Accumulated Cash Flow</th>
                <th className="py-2.5 px-3 font-semibold">Property Equity</th>
                <th className="py-2.5 px-3 font-semibold">Total Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.wealthProjection.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{row.year}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                    ${row.propertyValue.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">
                    ${row.remainingLoan.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ${row.accumulatedCashFlow.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-teal-600 dark:text-teal-400 font-bold">
                    ${row.equity.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    +${row.totalNetGain.toLocaleString()}
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
