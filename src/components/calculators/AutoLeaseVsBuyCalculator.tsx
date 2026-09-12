import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency } from '../../lib/mathUtils';
import { Car, DollarSign, Calendar, ShieldCheck, CheckCircle2, TrendingUp, ArrowRight, Percent, AlertCircle } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

export const AutoLeaseVsBuyCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  // Vehicle Inputs
  const [vehiclePrice, setVehiclePrice] = useState<number>(42000);
  const [downPayment, setDownPayment] = useState<number>(4000);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(6.5);
  const [comparisonHorizonMonths, setComparisonHorizonMonths] = useState<number>(36);

  // Lease Parameters
  const [leaseTermMonths, setLeaseTermMonths] = useState<number>(36);
  const [residualPercent, setResidualPercent] = useState<number>(56); // 56% of MSRP
  const [moneyFactor, setMoneyFactor] = useState<number>(0.0025); // ~6.0% APR
  const [acquisitionFee, setAcquisitionFee] = useState<number>(895);
  const [dispositionFee, setDispositionFee] = useState<number>(395);

  // Loan Purchase Parameters
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(6.5);
  const [estimatedResalePercent, setEstimatedResalePercent] = useState<number>(56); // market value % after comparison horizon

  const calculation = useMemo(() => {
    const price = Math.max(1000, safeParseNumber(vehiclePrice, 40000));
    const down = Math.max(0, safeParseNumber(downPayment, 0));
    const taxRate = Math.max(0, safeParseNumber(salesTaxRate, 0)) / 100;
    const horizon = Math.max(12, Math.min(84, safeParseNumber(comparisonHorizonMonths, 36)));

    // 1. LEASE CALCULATION
    const leaseMonths = Math.max(12, safeParseNumber(leaseTermMonths, 36));
    const residPct = Math.max(10, Math.min(90, safeParseNumber(residualPercent, 55))) / 100;
    const mf = Math.max(0.0001, safeParseNumber(moneyFactor, 0.0025));
    const acqFee = Math.max(0, safeParseNumber(acquisitionFee, 0));
    const dispFee = Math.max(0, safeParseNumber(dispositionFee, 0));

    const residualValue = price * residPct;
    const netCapCost = Math.max(0, price + acqFee - down);
    const monthlyDepreciation = (netCapCost - residualValue) / leaseMonths;
    const monthlyFinanceCharge = (netCapCost + residualValue) * mf;
    const baseLeasePayment = Math.max(0, monthlyDepreciation + monthlyFinanceCharge);
    const monthlyLeasePaymentWithTax = baseLeasePayment * (1 + taxRate);
    const totalLeasePaymentsOverHorizon = monthlyLeasePaymentWithTax * Math.min(horizon, leaseMonths);
    const totalLeaseOutflow = down + totalLeasePaymentsOverHorizon + (horizon >= leaseMonths ? dispFee : 0);
    const leaseEndingEquity = 0; // Leased car is returned to dealership
    const netLeaseCost = totalLeaseOutflow - leaseEndingEquity;

    // Equivalent Lease APR
    const equivalentLeaseAPR = mf * 2400;

    // 2. PURCHASE / LOAN CALCULATION
    const loanMonths = Math.max(12, safeParseNumber(loanTermMonths, 60));
    const loanRateAnnual = Math.max(0, safeParseNumber(loanInterestRate, 0)) / 100;
    const monthlyLoanRate = loanRateAnnual / 12;

    const purchaseSalesTax = price * taxRate;
    const loanPrincipal = Math.max(0, price + purchaseSalesTax - down);

    let monthlyLoanPayment = 0;
    if (loanPrincipal > 0) {
      if (monthlyLoanRate > 0) {
        monthlyLoanPayment =
          (loanPrincipal * monthlyLoanRate * Math.pow(1 + monthlyLoanRate, loanMonths)) /
          (Math.pow(1 + monthlyLoanRate, loanMonths) - 1);
      } else {
        monthlyLoanPayment = loanPrincipal / loanMonths;
      }
    }

    // Amortization tracking over comparison horizon
    let remainingLoanBalance = loanPrincipal;
    let totalInterestPaidOverHorizon = 0;
    let totalPrincipalPaidOverHorizon = 0;

    for (let m = 1; m <= horizon; m++) {
      if (m <= loanMonths && remainingLoanBalance > 0) {
        const interestForMonth = remainingLoanBalance * monthlyLoanRate;
        const principalForMonth = Math.min(remainingLoanBalance, monthlyLoanPayment - interestForMonth);
        totalInterestPaidOverHorizon += interestForMonth;
        totalPrincipalPaidOverHorizon += principalForMonth;
        remainingLoanBalance = Math.max(0, remainingLoanBalance - principalForMonth);
      }
    }

    const totalLoanPaymentsOverHorizon =
      monthlyLoanPayment * Math.min(horizon, loanMonths) + down;

    // Resale value at end of horizon
    const resalePct = Math.max(10, Math.min(95, safeParseNumber(estimatedResalePercent, 55))) / 100;
    const estimatedVehicleMarketValue = price * resalePct;
    const purchaseEndingEquity = Math.max(0, estimatedVehicleMarketValue - remainingLoanBalance);
    const netPurchaseCost = totalLoanPaymentsOverHorizon - purchaseEndingEquity;

    // Decision Verdict
    const difference = netLeaseCost - netPurchaseCost;
    const isBuyingCheaper = difference > 0;
    const netSavings = Math.abs(difference);
    const monthlyPaymentDifference = monthlyLoanPayment - monthlyLeasePaymentWithTax;

    return {
      price,
      down,
      taxRate,
      horizon,
      leaseMonths,
      residualValue,
      netCapCost,
      monthlyDepreciation,
      monthlyFinanceCharge,
      baseLeasePayment,
      monthlyLeasePaymentWithTax,
      totalLeaseOutflow,
      leaseEndingEquity,
      netLeaseCost,
      equivalentLeaseAPR,
      loanMonths,
      purchaseSalesTax,
      loanPrincipal,
      monthlyLoanPayment,
      totalLoanPaymentsOverHorizon,
      totalInterestPaidOverHorizon,
      remainingLoanBalance,
      estimatedVehicleMarketValue,
      purchaseEndingEquity,
      netPurchaseCost,
      isBuyingCheaper,
      netSavings,
      monthlyPaymentDifference,
    };
  }, [
    vehiclePrice,
    downPayment,
    salesTaxRate,
    comparisonHorizonMonths,
    leaseTermMonths,
    residualPercent,
    moneyFactor,
    acquisitionFee,
    dispositionFee,
    loanTermMonths,
    loanInterestRate,
    estimatedResalePercent,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Lease vs Buy on ${formatCurrency(calculation.price, '$', 0)} car (${calculation.horizon} mo): ${calculation.isBuyingCheaper ? 'Buying' : 'Leasing'} saves ${formatCurrency(calculation.netSavings, '$', 0)}`,
        {
          vehiclePrice,
          downPayment,
          salesTaxRate,
          comparisonHorizonMonths,
          leaseTermMonths,
          loanTermMonths,
          moneyFactor,
          loanInterestRate,
        },
        {
          monthlyLeasePayment: calculation.monthlyLeasePaymentWithTax,
          monthlyLoanPayment: calculation.monthlyLoanPayment,
          netLeaseCost: calculation.netLeaseCost,
          netPurchaseCost: calculation.netPurchaseCost,
          purchaseEndingEquity: calculation.purchaseEndingEquity,
          netSavings: calculation.netSavings,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Comparison Horizon Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          Comparison Evaluation Horizon:
        </span>
        <div className="flex items-center gap-2">
          {[24, 36, 48, 60].map((months) => (
            <button
              key={months}
              type="button"
              onClick={() => {
                setComparisonHorizonMonths(months);
                if (months <= 36) setLeaseTermMonths(months);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                comparisonHorizonMonths === months
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400'
              }`}
            >
              {months} Months ({months / 12} Yrs)
            </button>
          ))}
        </div>
      </div>

      {/* Decision Verdict Banner */}
      <div
        className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          calculation.isBuyingCheaper
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
            : 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className={`w-5 h-5 ${
                calculation.isBuyingCheaper
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-teal-600 dark:text-teal-400'
              }`}
            />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recommendation: {calculation.isBuyingCheaper ? 'Purchasing (Buying) is Cheaper' : 'Leasing is Cheaper'}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Over a {calculation.horizon}-month period,{' '}
            <strong>{calculation.isBuyingCheaper ? 'buying and retaining equity' : 'leasing with lower monthly outlays'}</strong>{' '}
            saves an estimated{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-mono">
              {formatCurrency(calculation.netSavings, '$', 0)}
            </strong>{' '}
            in total net true cost.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
              Net Cost Advantage
            </span>
            <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(calculation.netSavings, '$', 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle General Inputs */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Car className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Vehicle & Shared Terms
            </h4>
          </div>

          <CalcInput
            id="vehiclePrice"
            label="Negotiated Vehicle Price / MSRP"
            value={vehiclePrice}
            onChange={(val) => setVehiclePrice(val)}
            min={1000}
            step={1000}
            prefix="$"
            helpText="Agreed-upon selling price before taxes, rebates, or trade-ins."
          />

          <CalcInput
            id="downPayment"
            label="Down Payment / Trade-In Equity"
            value={downPayment}
            onChange={(val) => setDownPayment(val)}
            min={0}
            step={500}
            prefix="$"
            helpText="Upfront cash or trade-in value applied to reduce financed/capitalized cost."
          />

          <CalcInput
            id="salesTaxRate"
            label="Local Sales Tax Rate"
            value={salesTaxRate}
            onChange={(val) => setSalesTaxRate(val)}
            min={0}
            max={15}
            step={0.1}
            suffix="%"
            helpText="Applied to monthly lease payment or total vehicle purchase price."
          />
        </div>

        {/* Lease Specific Parameters */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Lease Terms (Option A)
            </h4>
            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
              {calculation.equivalentLeaseAPR.toFixed(2)}% APR
            </span>
          </div>

          <CalcInput
            id="residualPercent"
            label="Lease Residual Value %"
            value={residualPercent}
            onChange={(val) => setResidualPercent(val)}
            min={20}
            max={80}
            step={1}
            suffix="%"
            helpText={`Value at lease end (${formatCurrency(calculation.residualValue, '$', 0)} set by lessor).`}
          />

          <CalcInput
            id="moneyFactor"
            label="Lease Money Factor (Rent Rate)"
            value={moneyFactor}
            onChange={(val) => setMoneyFactor(val)}
            min={0.0001}
            max={0.01}
            step={0.0001}
            helpText={`e.g. 0.0025 = ${(moneyFactor * 2400).toFixed(2)}% APR (Money Factor × 2,400).`}
          />

          <CalcInput
            id="acquisitionFee"
            label="Acquisition & Bank Fees"
            value={acquisitionFee}
            onChange={(val) => setAcquisitionFee(val)}
            min={0}
            step={50}
            prefix="$"
            helpText="Standard lessor origination fee rolled into cap cost."
          />
        </div>

        {/* Loan Purchase Specific Parameters */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Loan Purchase (Option B)
            </h4>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
              {loanTermMonths} Mo Term
            </span>
          </div>

          <CalcInput
            id="loanTermMonths"
            label="Auto Loan Term"
            value={loanTermMonths}
            onChange={(val) => setLoanTermMonths(val)}
            min={12}
            max={84}
            step={12}
            suffix="mo"
            helpText="Standard 48, 60, or 72-month financing duration."
          />

          <CalcInput
            id="loanInterestRate"
            label="Auto Loan APR"
            value={loanInterestRate}
            onChange={(val) => setLoanInterestRate(val)}
            min={0}
            max={25}
            step={0.25}
            suffix="%"
            helpText="Annual percentage interest rate on your auto loan."
          />

          <CalcInput
            id="estimatedResalePercent"
            label={`Market Value % at Month ${calculation.horizon}`}
            value={estimatedResalePercent}
            onChange={(val) => setEstimatedResalePercent(val)}
            min={10}
            max={90}
            step={1}
            suffix="%"
            helpText={`Estimated resale market price: ${formatCurrency(calculation.estimatedVehicleMarketValue, '$', 0)}.`}
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Monthly Lease Payment"
          value={formatCurrency(calculation.monthlyLeasePaymentWithTax, '$', 0)}
          subtitle={`Incl. $${Math.round(calculation.monthlyLeasePaymentWithTax - calculation.baseLeasePayment)}/mo sales tax`}
          highlighted={!calculation.isBuyingCheaper}
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Monthly Loan Payment"
          value={formatCurrency(calculation.monthlyLoanPayment, '$', 0)}
          subtitle={`$${Math.abs(Math.round(calculation.monthlyPaymentDifference))}/mo ${calculation.monthlyPaymentDifference > 0 ? 'more' : 'less'} than lease`}
          highlighted={calculation.isBuyingCheaper}
          icon={<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Net True Cost to Lease"
          value={formatCurrency(calculation.netLeaseCost, '$', 0)}
          subtitle={`Over ${calculation.horizon} months ($0 equity remaining)`}
          icon={<Car className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
        />

        <CalcResultCard
          title="Net True Cost to Buy"
          value={formatCurrency(calculation.netPurchaseCost, '$', 0)}
          subtitle={`Total Outflow - ${formatCurrency(calculation.purchaseEndingEquity, '$', 0)} Equity`}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Side-by-Side Financial Comparison Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Car className="w-4 h-4 text-teal-500" />
          Side-by-Side {calculation.horizon}-Month Financial Ledger
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Financial Metric</th>
                <th className="py-2.5 px-3 font-semibold text-teal-600 dark:text-teal-400">
                  Lease ({calculation.leaseMonths} Mo)
                </th>
                <th className="py-2.5 px-3 font-semibold text-blue-600 dark:text-blue-400">
                  Buy / Loan ({calculation.loanMonths} Mo)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                  Monthly Payment (with Tax)
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                  {formatCurrency(calculation.monthlyLeasePaymentWithTax, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(calculation.monthlyLoanPayment, '$', 0)}/mo
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                  Upfront Down Payment
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-900 dark:text-white">
                  {formatCurrency(calculation.down, '$', 0)}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-900 dark:text-white">
                  {formatCurrency(calculation.down, '$', 0)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                  Total Cash Payments ({calculation.horizon} Months)
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-900 dark:text-white">
                  {formatCurrency(calculation.totalLeaseOutflow, '$', 0)}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-900 dark:text-white">
                  {formatCurrency(calculation.totalLoanPaymentsOverHorizon, '$', 0)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                  Estimated Vehicle Market Value at Month {calculation.horizon}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-400">
                  N/A (Lessor Asset)
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-900 dark:text-white">
                  {formatCurrency(calculation.estimatedVehicleMarketValue, '$', 0)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                  Remaining Loan Principal
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-400">
                  $0 (Turned In)
                </td>
                <td className="py-2.5 px-3 font-mono text-rose-600 dark:text-rose-400">
                  {formatCurrency(calculation.remainingLoanBalance, '$', 0)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-slate-50/50 dark:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                  Vehicle Equity Retained
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-500">
                  $0
                </td>
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  +{formatCurrency(calculation.purchaseEndingEquity, '$', 0)}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-teal-50/30 dark:bg-teal-950/20">
                <td className="py-2.5 px-3 font-black text-slate-900 dark:text-white">
                  Net True Cost (Outflows - Equity)
                </td>
                <td className={`py-2.5 px-3 font-mono font-black ${!calculation.isBuyingCheaper ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {formatCurrency(calculation.netLeaseCost, '$', 0)}
                </td>
                <td className={`py-2.5 px-3 font-mono font-black ${calculation.isBuyingCheaper ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {formatCurrency(calculation.netPurchaseCost, '$', 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
