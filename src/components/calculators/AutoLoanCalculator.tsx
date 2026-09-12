import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { Car, DollarSign, Percent, Calendar, ShieldAlert, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BaseCalculatorProps } from './index';

export const AutoLoanCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(() => initialPreset?.price ?? 38000);
  const [downPayment, setDownPayment] = useState<number>(() => initialPreset?.downPayment ?? 5000);
  const [tradeInValue, setTradeInValue] = useState<number>(() => initialPreset?.tradeIn ?? 4000);
  const [tradeInLoanBalance, setTradeInLoanBalance] = useState<number>(0);
  const [interestRateApr, setInterestRateApr] = useState<number>(() => initialPreset?.interestRate ?? 6.2);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(() => initialPreset?.loanTermMonths ?? 60);
  const [salesTaxPercent, setSalesTaxPercent] = useState<number>(() => initialPreset?.salesTaxPercent ?? 6.5);
  const [dealerDocFees, setDealerDocFees] = useState<number>(450);
  const [registrationFees, setRegistrationFees] = useState<number>(350);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);

  const calculation = useMemo(() => {
    const price = Math.max(0, safeParseNumber(vehiclePrice, 38000));
    const down = Math.max(0, safeParseNumber(downPayment, 5000));
    const tradeVal = Math.max(0, safeParseNumber(tradeInValue, 0));
    const tradeOwed = Math.max(0, safeParseNumber(tradeInLoanBalance, 0));
    const netTradeInEquity = tradeVal - tradeOwed; // positive or negative

    const apr = Math.max(0, safeParseNumber(interestRateApr, 6.2)) / 100;
    const term = Math.max(12, Math.min(96, safeParseNumber(loanTermMonths, 60)));
    const taxRate = Math.max(0, safeParseNumber(salesTaxPercent, 6.5)) / 100;
    const fees = Math.max(0, safeParseNumber(dealerDocFees, 0)) + Math.max(0, safeParseNumber(registrationFees, 0));
    const extraPmt = Math.max(0, safeParseNumber(extraMonthlyPayment, 0));

    // Sales tax base: in most US states, trade-in value reduces taxable sales price
    const taxablePrice = Math.max(0, price - tradeVal);
    const totalSalesTax = taxablePrice * taxRate;

    // Total Out-the-Door Loan Principal
    // Price - Down - NetTradeInEquity + SalesTax + Fees
    // = Price - Down - (TradeVal - TradeOwed) + SalesTax + Fees
    const financedAmount = Math.max(0, price - down - netTradeInEquity + totalSalesTax + fees);

    const monthlyRate = apr / 12;
    let standardMonthlyPayment = 0;

    if (monthlyRate > 0 && financedAmount > 0) {
      standardMonthlyPayment =
        (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1);
    } else if (financedAmount > 0) {
      standardMonthlyPayment = financedAmount / term;
    }

    const standardTotalPayments = standardMonthlyPayment * term;
    const standardTotalInterest = Math.max(0, standardTotalPayments - financedAmount);
    const totalVehicleOutlay = down + standardTotalPayments + (tradeOwed > tradeVal ? tradeOwed - tradeVal : 0);

    // Accelerated Payoff with Extra Monthly Principal
    let actualMonths = 0;
    let actualTotalInterest = 0;
    let curBal = financedAmount;
    const amortizationSchedule = [];

    for (let m = 1; m <= term && curBal > 0.01; m++) {
      const interestThisMonth = curBal * monthlyRate;
      let principalThisMonth = standardMonthlyPayment - interestThisMonth + extraPmt;

      if (principalThisMonth > curBal) {
        principalThisMonth = curBal;
      }

      actualTotalInterest += interestThisMonth;
      curBal -= principalThisMonth;
      actualMonths = m;

      if (m % 12 === 0 || curBal <= 0.01 || m === term) {
        amortizationSchedule.push({
          month: m,
          year: Math.ceil(m / 12),
          remainingBalance: Math.max(0, Math.round(curBal)),
          interestPaidToDate: Math.round(actualTotalInterest),
        });
      }
    }

    const interestSaved = Math.max(0, standardTotalInterest - actualTotalInterest);
    const monthsSaved = term - actualMonths;

    return {
      financedAmount,
      totalSalesTax,
      totalFees: fees,
      netTradeInEquity,
      standardMonthlyPayment,
      standardTotalInterest,
      standardTotalPayments,
      totalVehicleOutlay,
      actualMonths,
      actualTotalInterest,
      interestSaved,
      monthsSaved,
      amortizationSchedule,
    };
  }, [
    vehiclePrice,
    downPayment,
    tradeInValue,
    tradeInLoanBalance,
    interestRateApr,
    loanTermMonths,
    salesTaxPercent,
    dealerDocFees,
    registrationFees,
    extraMonthlyPayment,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Auto Loan: $${formatCurrency(calculation.standardMonthlyPayment)}/mo for ${loanTermMonths} mos on $${formatNumber(vehiclePrice)} vehicle`,
        {
          vehiclePrice,
          downPayment,
          tradeInValue,
          interestRateApr,
          loanTermMonths,
        },
        {
          monthlyPayment: calculation.standardMonthlyPayment,
          totalFinanced: calculation.financedAmount,
          totalInterest: calculation.standardTotalInterest,
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
            <Car className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Auto Financing &amp; Monthly Payment Estimate
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Monthly Payment:{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono text-base">
              ${formatCurrency(calculation.standardMonthlyPayment)}/mo
            </strong>{' '}
            over <strong className="font-bold">{loanTermMonths} months</strong>. Total loan interest:{' '}
            <strong className="font-mono font-bold">${formatCurrency(calculation.standardTotalInterest)}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-teal-200 dark:border-teal-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Financed (OTD)
            </span>
            <span className="text-xl font-black font-mono text-teal-600 dark:text-teal-400">
              ${formatCurrency(calculation.financedAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: Vehicle Pricing & Trade-in */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Vehicle Price &amp; Trade-In
            </h4>
          </div>

          <CalcInput
            id="vehiclePrice"
            label="Vehicle Purchase Price (Negotiated MSRP)"
            value={vehiclePrice}
            onChange={(val) => setVehiclePrice(val)}
            min={1000}
            max={500000}
            step={500}
            prefix="$"
          />

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="downPayment"
              label="Cash Down Payment"
              value={downPayment}
              onChange={(val) => setDownPayment(val)}
              min={0}
              max={250000}
              step={500}
              prefix="$"
            />
            <CalcInput
              id="tradeInValue"
              label="Trade-In Vehicle Value"
              value={tradeInValue}
              onChange={(val) => setTradeInValue(val)}
              min={0}
              max={150000}
              step={500}
              prefix="$"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="tradeInLoanBalance"
              label="Trade-In Loan Owed (if any)"
              value={tradeInLoanBalance}
              onChange={(val) => setTradeInLoanBalance(val)}
              min={0}
              max={150000}
              step={500}
              prefix="$"
              helpText="Existing balance on your current car."
            />
            <CalcInput
              id="salesTaxPercent"
              label="State / Local Sales Tax %"
              value={salesTaxPercent}
              onChange={(val) => setSalesTaxPercent(val)}
              min={0}
              max={15}
              step={0.1}
              suffix="%"
            />
          </div>
        </div>

        {/* Right: Loan Term, Rates & Extra Payments */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Loan Terms &amp; Fees
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="interestRateApr"
              label="Annual Percentage Rate (APR)"
              value={interestRateApr}
              onChange={(val) => setInterestRateApr(val)}
              min={0}
              max={30}
              step={0.1}
              suffix="%"
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Loan Term (Months)
              </label>
              <select
                value={loanTermMonths}
                onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                className="w-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500"
              >
                <option value={24}>24 mos (2 yrs)</option>
                <option value={36}>36 mos (3 yrs)</option>
                <option value={48}>48 mos (4 yrs)</option>
                <option value={60}>60 mos (5 yrs)</option>
                <option value={72}>72 mos (6 yrs)</option>
                <option value={84}>84 mos (7 yrs)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalcInput
              id="dealerDocFees"
              label="Dealer Doc Fee"
              value={dealerDocFees}
              onChange={(val) => setDealerDocFees(val)}
              min={0}
              max={2500}
              step={50}
              prefix="$"
            />
            <CalcInput
              id="registrationFees"
              label="Title &amp; DMV Fees"
              value={registrationFees}
              onChange={(val) => setRegistrationFees(val)}
              min={0}
              max={2500}
              step={50}
              prefix="$"
            />
          </div>

          <CalcInput
            id="extraMonthlyPayment"
            label="Extra Monthly Principal Payment (Optional)"
            value={extraMonthlyPayment}
            onChange={(val) => setExtraMonthlyPayment(val)}
            min={0}
            max={2000}
            step={25}
            prefix="$"
            helpText="Accelerates payoff and saves interest."
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Monthly Payment"
          value={`$${formatCurrency(calculation.standardMonthlyPayment)}`}
          subtitle={`${loanTermMonths} payments of principal & interest`}
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Total Loan Interest"
          value={`$${formatCurrency(calculation.standardTotalInterest)}`}
          subtitle={`Financing cost over ${loanTermMonths / 12} years`}
          icon={<Percent className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Sales Tax &amp; Fees"
          value={`$${formatCurrency(calculation.totalSalesTax + calculation.totalFees)}`}
          subtitle={`Tax: $${formatCurrency(calculation.totalSalesTax)} | Fees: $${formatCurrency(calculation.totalFees)}`}
          icon={<ShieldAlert className="w-5 h-5 text-slate-500" />}
        />

        <CalcResultCard
          title="Total Out-of-Pocket Cost"
          value={`$${formatCurrency(calculation.totalVehicleOutlay)}`}
          subtitle="Down payment + all loan payments"
          icon={<Car className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Extra Payment Acceleration Banner (if entered) */}
      {extraMonthlyPayment > 0 && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              By paying an extra <strong>${formatNumber(extraMonthlyPayment)}/mo</strong>, you will pay off your car{' '}
              <strong>{calculation.monthsSaved} months early</strong> and save{' '}
              <strong>${formatCurrency(calculation.interestSaved)}</strong> in total interest.
            </span>
          </div>
        </div>
      )}

      {/* Annual Amortization Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-500" />
          Loan Balance &amp; Interest Payoff Progression
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Timeline (Month / Year)</th>
                <th className="py-2.5 px-3 font-semibold">Remaining Loan Balance</th>
                <th className="py-2.5 px-3 font-semibold">Cumulative Interest Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.amortizationSchedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Month {row.month} (Year {row.year})
                  </td>
                  <td className="py-2.5 px-3 font-mono text-teal-600 dark:text-teal-400 font-bold">
                    ${formatCurrency(row.remainingBalance)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ${formatCurrency(row.interestPaidToDate)}
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
