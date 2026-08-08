import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';

interface BusinessBreakEvenCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const BusinessBreakEvenCalculator: React.FC<BusinessBreakEvenCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [fixedCosts, setFixedCosts] = useState<string>('25000');
  const [pricePerUnit, setPricePerUnit] = useState<string>('80');
  const [costPerUnit, setCostPerUnit] = useState<string>('30');
  const [targetUnits, setTargetUnits] = useState<string>('600');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.fixedCosts !== undefined) setFixedCosts(String(initialPreset.fixedCosts));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setFixedCosts('25000');
    setPricePerUnit('80');
    setCostPerUnit('30');
    setTargetUnits('600');
  };

  const calculate = () => {
    const fixed = safeParseNumber(fixedCosts, 0);
    const price = safeParseNumber(pricePerUnit, 0);
    const variableCost = safeParseNumber(costPerUnit, 0);
    const unitsPlanned = safeParseNumber(targetUnits, 0);

    if (fixed <= 0 || price <= 0) {
      return { isValid: false, msg: 'Fixed costs and selling price per unit must be greater than $0.' };
    }

    const contributionMarginPerUnit = price - variableCost;
    if (contributionMarginPerUnit <= 0) {
      return {
        isValid: false,
        msg: 'Selling price per unit must be greater than variable cost per unit to generate a positive contribution margin.',
      };
    }

    const breakEvenUnits = Math.ceil(fixed / contributionMarginPerUnit);
    const breakEvenRevenue = breakEvenUnits * price;
    const contributionMarginRatio = (contributionMarginPerUnit / price) * 100;

    const totalRevenueAtTarget = unitsPlanned * price;
    const totalCostAtTarget = fixed + unitsPlanned * variableCost;
    const netProfitAtTarget = totalRevenueAtTarget - totalCostAtTarget;

    return {
      isValid: true,
      msg: '',
      fixed,
      price,
      variableCost,
      contributionMarginPerUnit,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
      unitsPlanned,
      netProfitAtTarget,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Break-Even: ${res.breakEvenUnits} units (${formatCurrency(res.breakEvenRevenue)})`,
        { fixedCosts, pricePerUnit, costPerUnit, targetUnits },
        { breakEvenUnits: res.breakEvenUnits, breakEvenRevenue: res.breakEvenRevenue }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Cost & Unit Pricing Structure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CalcInput id="fixedCosts" label="Total Fixed Costs" prefix="$" value={fixedCosts} onChange={setFixedCosts} min={0} helperText="Rent, salaries, insurance, overhead" />
          <CalcInput id="pricePerUnit" label="Selling Price per Unit" prefix="$" value={pricePerUnit} onChange={setPricePerUnit} min={0} />
          <CalcInput id="costPerUnit" label="Variable Cost per Unit" prefix="$" value={costPerUnit} onChange={setCostPerUnit} min={0} helperText="Materials, shipping, direct labor" />
          <CalcInput id="targetUnits" label="Planned Sales Volume (Units)" value={targetUnits} onChange={setTargetUnits} min={0} />
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CalcResultCard
              title="Break-Even Volume"
              value={`${formatNumber(res.breakEvenUnits, 0)} Units`}
              subtitle="Fixed Costs / Unit Margin"
              highlighted={true}
              badgeText="Zero Profit Point"
              badgeType="info"
            />
            <CalcResultCard
              title="Break-Even Revenue"
              value={formatCurrency(res.breakEvenRevenue)}
              subtitle="Minimum gross sales needed"
            />
            <CalcResultCard
              title="Contribution Margin per Unit"
              value={formatCurrency(res.contributionMarginPerUnit)}
              subtitle={`${formatNumber(res.contributionMarginRatio, 1)}% Margin Ratio`}
            />
            <CalcResultCard
              title="Net Profit at Planned Volume"
              value={formatCurrency(res.netProfitAtTarget)}
              subtitle={`At ${res.unitsPlanned} units sold`}
              badgeText={res.netProfitAtTarget >= 0 ? 'Profitable' : 'Loss'}
              badgeType={res.netProfitAtTarget >= 0 ? 'success' : 'error'}
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Every unit sold beyond the break-even volume generates {formatCurrency(res.contributionMarginPerUnit)} in net profit.</span>
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
