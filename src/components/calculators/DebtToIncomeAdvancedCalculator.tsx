import React, { useState, useMemo } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { PieChart, Home, CreditCard, ShieldCheck, AlertTriangle, CheckCircle2, DollarSign, Scale, ArrowUpRight } from 'lucide-react';

interface Props {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
}

export const DebtToIncomeAdvancedCalculator: React.FC<Props> = ({ onSaveHistory }) => {
  // Income Streams (Monthly Gross)
  const [primaryIncome, setPrimaryIncome] = useState<number>(7500);
  const [coBorrowerIncome, setCoBorrowerIncome] = useState<number>(3500);
  const [bonusCommission, setBonusCommission] = useState<number>(500);
  const [otherIncome, setOtherIncome] = useState<number>(0);

  // Housing Costs (Proposed Front-End PITI + HOA)
  const [mortgagePrincipalInterest, setMortgagePrincipalInterest] = useState<number>(2100);
  const [propertyTaxes, setPropertyTaxes] = useState<number>(450);
  const [homeownersInsurance, setHomeownersInsurance] = useState<number>(150);
  const [hoaFees, setHoaFees] = useState<number>(100);
  const [pmiInsurance, setPmiInsurance] = useState<number>(80);

  // Recurring Non-Housing Debts (Monthly Minimums)
  const [autoLoans, setAutoLoans] = useState<number>(550);
  const [studentLoans, setStudentLoans] = useState<number>(320);
  const [creditCardMinPayments, setCreditCardMinPayments] = useState<number>(150);
  const [personalLoans, setPersonalLoans] = useState<number>(0);
  const [childSupportAlimony, setChildSupportAlimony] = useState<number>(0);
  const [otherDebts, setOtherDebts] = useState<number>(0);

  const calculation = useMemo(() => {
    // 1. Gross Monthly Income
    const primInc = Math.max(0, safeParseNumber(primaryIncome, 0));
    const coInc = Math.max(0, safeParseNumber(coBorrowerIncome, 0));
    const bonusInc = Math.max(0, safeParseNumber(bonusCommission, 0));
    const othInc = Math.max(0, safeParseNumber(otherIncome, 0));
    const totalGrossMonthlyIncome = Math.max(1, primInc + coInc + bonusInc + othInc);

    // 2. Housing Expenses (Front-End)
    const pi = Math.max(0, safeParseNumber(mortgagePrincipalInterest, 0));
    const tax = Math.max(0, safeParseNumber(propertyTaxes, 0));
    const ins = Math.max(0, safeParseNumber(homeownersInsurance, 0));
    const hoa = Math.max(0, safeParseNumber(hoaFees, 0));
    const pmi = Math.max(0, safeParseNumber(pmiInsurance, 0));
    const totalHousingExpense = pi + tax + ins + hoa + pmi;

    // 3. Non-Housing Monthly Debt Obligations (Back-End)
    const auto = Math.max(0, safeParseNumber(autoLoans, 0));
    const student = Math.max(0, safeParseNumber(studentLoans, 0));
    const cards = Math.max(0, safeParseNumber(creditCardMinPayments, 0));
    const personal = Math.max(0, safeParseNumber(personalLoans, 0));
    const alimony = Math.max(0, safeParseNumber(childSupportAlimony, 0));
    const other = Math.max(0, safeParseNumber(otherDebts, 0));
    const totalNonHousingDebts = auto + student + cards + personal + alimony + other;

    // 4. Total Monthly Debt
    const totalMonthlyDebt = totalHousingExpense + totalNonHousingDebts;

    // 5. Underwriting Ratios
    const frontEndDti = (totalHousingExpense / totalGrossMonthlyIncome) * 100;
    const backEndDti = (totalMonthlyDebt / totalGrossMonthlyIncome) * 100;

    // 6. Max Allowable Housing Payment Guidelines
    // Standard Conventional Benchmark (28% Front / 36% Back)
    const conventionalMaxHousingFront = totalGrossMonthlyIncome * 0.28;
    const conventionalMaxTotalDebtBack = totalGrossMonthlyIncome * 0.36;
    const conventionalMaxHousingFromBack = Math.max(0, conventionalMaxTotalDebtBack - totalNonHousingDebts);
    const conventionalAllowedHousing = Math.min(conventionalMaxHousingFront, conventionalMaxHousingFromBack);

    // FHA Loan Benchmark (31% Front / 43% Back)
    const fhaMaxHousingFront = totalGrossMonthlyIncome * 0.31;
    const fhaMaxTotalDebtBack = totalGrossMonthlyIncome * 0.43;
    const fhaMaxHousingFromBack = Math.max(0, fhaMaxTotalDebtBack - totalNonHousingDebts);
    const fhaAllowedHousing = Math.min(fhaMaxHousingFront, fhaMaxHousingFromBack);

    // VA Loan Benchmark (41% Back-End)
    const vaMaxTotalDebt = totalGrossMonthlyIncome * 0.41;
    const vaAllowedHousing = Math.max(0, vaMaxTotalDebt - totalNonHousingDebts);

    // Underwriting Status Assessment
    let underwritingGrade: 'Excellent' | 'Good' | 'Moderate' | 'High Risk';
    let gradeBadgeColor: string;
    let underwritingDescription: string;

    if (backEndDti <= 36 && frontEndDti <= 28) {
      underwritingGrade = 'Excellent';
      gradeBadgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      underwritingDescription = 'Meets ideal 28/36 benchmark. Qualifies for best conventional, prime jumbo, and government interest rates with zero manual underwriting friction.';
    } else if (backEndDti <= 43 && frontEndDti <= 31) {
      underwritingGrade = 'Good';
      gradeBadgeColor = 'text-teal-700 bg-teal-50 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800';
      underwritingDescription = 'Meets standard Fannie Mae, Freddie Mac, and FHA Qualified Mortgage (QM) limits. Strong approval odds with automated underwriting (Fannie DU / Freddie LP).';
    } else if (backEndDti <= 50) {
      underwritingGrade = 'Moderate';
      gradeBadgeColor = 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      underwritingDescription = 'Requires compensating factors (such as 6+ months cash reserves, high credit score 720+, or 10%+ down payment) for FHA/VA or Desktop Underwriter approval.';
    } else {
      underwritingGrade = 'High Risk';
      gradeBadgeColor = 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
      underwritingDescription = 'Exceeds standard 50% automated underwriting threshold. Lenders typically require debt paydown, a larger down payment, or co-signer addition before issuing loan commitment.';
    }

    return {
      totalGrossMonthlyIncome,
      totalHousingExpense,
      totalNonHousingDebts,
      totalMonthlyDebt,
      frontEndDti,
      backEndDti,
      conventionalAllowedHousing,
      fhaAllowedHousing,
      vaAllowedHousing,
      underwritingGrade,
      gradeBadgeColor,
      underwritingDescription,
      netMonthlyDiscretionary: Math.max(0, totalGrossMonthlyIncome - totalMonthlyDebt),
    };
  }, [
    primaryIncome,
    coBorrowerIncome,
    bonusCommission,
    otherIncome,
    mortgagePrincipalInterest,
    propertyTaxes,
    homeownersInsurance,
    hoaFees,
    pmiInsurance,
    autoLoans,
    studentLoans,
    creditCardMinPayments,
    personalLoans,
    childSupportAlimony,
    otherDebts,
  ]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `DTI Evaluation: ${calculation.frontEndDti.toFixed(1)}% Front-End / ${calculation.backEndDti.toFixed(1)}% Back-End DTI (${calculation.underwritingGrade}) on ${formatCurrency(calculation.totalGrossMonthlyIncome, '$', 0)}/mo GMI`,
        {
          totalGrossMonthlyIncome: calculation.totalGrossMonthlyIncome,
          totalHousingExpense: calculation.totalHousingExpense,
          totalNonHousingDebts: calculation.totalNonHousingDebts,
          frontEndDti: calculation.frontEndDti,
          backEndDti: calculation.backEndDti,
        },
        {
          frontEndDti: calculation.frontEndDti,
          backEndDti: calculation.backEndDti,
          underwritingGrade: calculation.underwritingGrade,
          conventionalAllowedHousing: calculation.conventionalAllowedHousing,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-teal-950/30 dark:to-indigo-950/30 p-5 rounded-2xl border border-teal-200 dark:border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Mortgage Underwriting Debt-to-Income (DTI) Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Your Front-End Housing DTI is{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-bold font-mono">
              {calculation.frontEndDti.toFixed(1)}%
            </strong>{' '}
            and your Back-End Total DTI is{' '}
            <strong className="text-indigo-700 dark:text-indigo-300 font-bold font-mono">
              {calculation.backEndDti.toFixed(1)}%
            </strong>
            . Loan Approval Risk Rating:{' '}
            <strong className="font-bold">{calculation.underwritingGrade}</strong>.
          </p>
        </div>

        <div className={`px-4 py-2.5 rounded-xl border text-xs font-bold shrink-0 ${calculation.gradeBadgeColor}`}>
          <div className="text-[10px] uppercase tracking-wider opacity-75">Underwriting Status</div>
          <div className="text-base font-black">{calculation.underwritingGrade}</div>
        </div>
      </div>

      {/* 3-Column Input Layout: Income, Housing, Debts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Column 1: Gross Monthly Income */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Gross Monthly Income
            </h4>
          </div>

          <CalcInput
            id="primaryIncome"
            label="Primary Borrower Gross Monthly Base"
            value={primaryIncome}
            onChange={(val) => setPrimaryIncome(val)}
            min={0}
            step={250}
            prefix="$"
          />

          <CalcInput
            id="coBorrowerIncome"
            label="Co-Borrower Gross Monthly Base"
            value={coBorrowerIncome}
            onChange={(val) => setCoBorrowerIncome(val)}
            min={0}
            step={250}
            prefix="$"
          />

          <CalcInput
            id="bonusCommission"
            label="Monthly Overtime / Bonus / Commission"
            value={bonusCommission}
            onChange={(val) => setBonusCommission(val)}
            min={0}
            step={100}
            prefix="$"
            helpText="2-year documented historical monthly average."
          />

          <CalcInput
            id="otherIncome"
            label="Other Documented Income (Rental, Dividends)"
            value={otherIncome}
            onChange={(val) => setOtherIncome(val)}
            min={0}
            step={100}
            prefix="$"
          />

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center">
            <span className="text-slate-500 font-semibold">Total Gross Income:</span>
            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
              {formatCurrency(calculation.totalGrossMonthlyIncome, '$', 0)}/mo
            </span>
          </div>
        </div>

        {/* Column 2: Proposed Housing (PITI + HOA) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Housing Expenses (PITI)
            </h4>
          </div>

          <CalcInput
            id="mortgagePrincipalInterest"
            label="Mortgage Principal &amp; Interest"
            value={mortgagePrincipalInterest}
            onChange={(val) => setMortgagePrincipalInterest(val)}
            min={0}
            step={50}
            prefix="$"
          />

          <CalcInput
            id="propertyTaxes"
            label="Monthly Property Taxes"
            value={propertyTaxes}
            onChange={(val) => setPropertyTaxes(val)}
            min={0}
            step={25}
            prefix="$"
          />

          <div className="grid grid-cols-2 gap-2">
            <CalcInput
              id="homeownersInsurance"
              label="Home Insurance"
              value={homeownersInsurance}
              onChange={(val) => setHomeownersInsurance(val)}
              min={0}
              step={10}
              prefix="$"
            />
            <CalcInput
              id="hoaFees"
              label="HOA / Condo Dues"
              value={hoaFees}
              onChange={(val) => setHoaFees(val)}
              min={0}
              step={10}
              prefix="$"
            />
          </div>

          <CalcInput
            id="pmiInsurance"
            label="PMI / Mortgage Insurance (if <20% down)"
            value={pmiInsurance}
            onChange={(val) => setPmiInsurance(val)}
            min={0}
            step={10}
            prefix="$"
          />

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center">
            <span className="text-slate-500 font-semibold">Total Housing (Front-End):</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(calculation.totalHousingExpense, '$', 0)}/mo
            </span>
          </div>
        </div>

        {/* Column 3: Recurring Non-Housing Debts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Monthly Debt Payments
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalcInput
              id="autoLoans"
              label="Auto Loan Payments"
              value={autoLoans}
              onChange={(val) => setAutoLoans(val)}
              min={0}
              step={25}
              prefix="$"
            />
            <CalcInput
              id="studentLoans"
              label="Student Loan Min"
              value={studentLoans}
              onChange={(val) => setStudentLoans(val)}
              min={0}
              step={25}
              prefix="$"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalcInput
              id="creditCardMinPayments"
              label="Credit Card Min Payments"
              value={creditCardMinPayments}
              onChange={(val) => setCreditCardMinPayments(val)}
              min={0}
              step={25}
              prefix="$"
              helpText="Minimum monthly due, not balance."
            />
            <CalcInput
              id="personalLoans"
              label="Personal Loans"
              value={personalLoans}
              onChange={(val) => setPersonalLoans(val)}
              min={0}
              step={25}
              prefix="$"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalcInput
              id="childSupportAlimony"
              label="Alimony / Child Support"
              value={childSupportAlimony}
              onChange={(val) => setChildSupportAlimony(val)}
              min={0}
              step={50}
              prefix="$"
            />
            <CalcInput
              id="otherDebts"
              label="Other Monthly Debts"
              value={otherDebts}
              onChange={(val) => setOtherDebts(val)}
              min={0}
              step={25}
              prefix="$"
            />
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center">
            <span className="text-slate-500 font-semibold">Total Non-Housing Debts:</span>
            <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(calculation.totalNonHousingDebts, '$', 0)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Front-End DTI (Housing Ratio)"
          value={`${calculation.frontEndDti.toFixed(1)}%`}
          subtitle={`Benchmark: ≤ 28.0% | ${formatCurrency(calculation.totalHousingExpense, '$', 0)}/mo`}
          highlighted={calculation.frontEndDti <= 28}
          icon={<Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Back-End DTI (Total Debt Ratio)"
          value={`${calculation.backEndDti.toFixed(1)}%`}
          subtitle={`Benchmark: ≤ 36.0% | ${formatCurrency(calculation.totalMonthlyDebt, '$', 0)}/mo`}
          highlighted={calculation.backEndDti <= 36}
          icon={<PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Conventional Max Housing"
          value={formatCurrency(calculation.conventionalAllowedHousing, '$', 0)}
          subtitle="Max PITI allowed under 28/36 rule"
          icon={<Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Net Discretionary Cash Flow"
          value={formatCurrency(calculation.netMonthlyDiscretionary, '$', 0)}
          subtitle="Remaining monthly income after all debts"
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Loan Program Approval Limits Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-500" />
          Loan Program Underwriting Limits &amp; Qualification Thresholds
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Loan Program</th>
                <th className="py-2.5 px-3 font-semibold">Target Front-End</th>
                <th className="py-2.5 px-3 font-semibold">Target Back-End</th>
                <th className="py-2.5 px-3 font-semibold">Max Housing Budget</th>
                <th className="py-2.5 px-3 font-semibold">Your Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                  Conventional (Fannie/Freddie)
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">28.0%</td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">36.0% - 45.0%</td>
                <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                  {formatCurrency(calculation.conventionalAllowedHousing, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3">
                  {calculation.backEndDti <= 45 ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" /> High DTI
                    </span>
                  )}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                  FHA Loan (HUD Guideline)
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">31.0%</td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">43.0% - 50.0%</td>
                <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                  {formatCurrency(calculation.fhaAllowedHousing, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3">
                  {calculation.backEndDti <= 50 ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" /> Over 50%
                    </span>
                  )}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                  VA Military Loan
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">No Limit</td>
                <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400">41.0%</td>
                <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                  {formatCurrency(calculation.vaAllowedHousing, '$', 0)}/mo
                </td>
                <td className="py-2.5 px-3">
                  {calculation.backEndDti <= 41 ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" /> Residual Check Needed
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
