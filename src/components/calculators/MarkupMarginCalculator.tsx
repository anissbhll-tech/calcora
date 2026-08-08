import React, { useState, useEffect } from 'react';
import { CalcInput } from '../common/CalcInput';
import { CalcSelect } from '../common/CalcSelect';
import { CalcResultCard } from '../common/CalcResultCard';
import { CalcErrorAlert } from '../common/CalcErrorAlert';
import { safeParseNumber, formatCurrency, formatPercent } from '../../lib/mathUtils';

interface MarkupMarginCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const MarkupMarginCalculator: React.FC<MarkupMarginCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset,
}) => {
  const [calcMode, setCalcMode] = useState<string>('cost-price'); // 'cost-price', 'cost-markup', 'cost-margin'
  const [costPrice, setCostPrice] = useState<string>('50');
  const [sellingPrice, setSellingPrice] = useState<string>('80');
  const [markupPercent, setMarkupPercent] = useState<string>('60');
  const [marginPercent, setMarginPercent] = useState<string>('37.5');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.costPrice !== undefined) setCostPrice(String(initialPreset.costPrice));
      if (initialPreset.sellingPrice !== undefined) setSellingPrice(String(initialPreset.sellingPrice));
    }
  }, [initialPreset]);

  useEffect(() => {
    handleReset();
  }, [resetSignal]);

  const handleReset = () => {
    setCalcMode('cost-price');
    setCostPrice('50');
    setSellingPrice('80');
    setMarkupPercent('60');
    setMarginPercent('37.5');
  };

  const calculate = () => {
    const cost = safeParseNumber(costPrice, 0);

    if (cost <= 0) {
      return {
        isValid: false,
        msg: 'Cost price must be greater than $0.',
        profit: 0,
        marginPct: 0,
        markupPct: 0,
        finalSellingPrice: 0,
      };
    }

    let profit = 0;
    let marginPct = 0;
    let markupPct = 0;
    let finalSellingPrice = 0;

    if (calcMode === 'cost-price') {
      const price = safeParseNumber(sellingPrice, 0);
      if (price <= 0) {
        return {
          isValid: false,
          msg: 'Selling price must be greater than $0.',
          profit: 0,
          marginPct: 0,
          markupPct: 0,
          finalSellingPrice: 0,
        };
      }
      finalSellingPrice = price;
      profit = finalSellingPrice - cost;
      markupPct = (profit / cost) * 100;
      marginPct = (profit / finalSellingPrice) * 100;
    } else if (calcMode === 'cost-markup') {
      const mkup = safeParseNumber(markupPercent, 0);
      markupPct = mkup;
      profit = cost * (mkup / 100);
      finalSellingPrice = cost + profit;
      marginPct = finalSellingPrice > 0 ? (profit / finalSellingPrice) * 100 : 0;
    } else if (calcMode === 'cost-margin') {
      const mgn = safeParseNumber(marginPercent, 0);
      if (mgn >= 100) {
        return {
          isValid: false,
          msg: 'Profit margin percentage must be strictly less than 100%.',
          profit: 0,
          marginPct: 0,
          markupPct: 0,
          finalSellingPrice: 0,
        };
      }
      marginPct = mgn;
      // Margin = Profit / Revenue => Revenue = Cost / (1 - Margin/100)
      finalSellingPrice = cost / (1 - mgn / 100);
      profit = finalSellingPrice - cost;
      markupPct = (profit / cost) * 100;
    }

    return {
      isValid: true,
      msg: '',
      profit,
      marginPct,
      markupPct,
      finalSellingPrice,
      cost,
    };
  };

  const res = calculate();

  const handleSave = () => {
    if (onSaveHistory && res.isValid) {
      onSaveHistory(
        `Cost ${formatCurrency(res.cost)} -> Selling ${formatCurrency(res.finalSellingPrice)} (Profit ${formatCurrency(res.profit)}, Margin ${formatPercent(res.marginPct)}, Markup ${formatPercent(res.markupPct)})`,
        { costPrice, sellingPrice, calcMode },
        { profit: res.profit, marginPct: res.marginPct, markupPct: res.markupPct }
      );
    }
  };

  return (
    <div className="space-y-6">
      {!res.isValid && res.msg && <CalcErrorAlert message={res.msg} />}

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <CalcSelect
          id="calcMode"
          label="Calculation Mode"
          value={calcMode}
          onChange={setCalcMode}
          options={[
            { value: 'cost-price', label: 'Given Cost Price & Selling Price' },
            { value: 'cost-markup', label: 'Given Cost Price & Desired Markup %' },
            { value: 'cost-margin', label: 'Given Cost Price & Desired Profit Margin %' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput
            id="costPrice"
            label="Cost Price (COGS)"
            prefix="$"
            value={costPrice}
            onChange={setCostPrice}
            min={0}
            step="0.01"
          />

          {calcMode === 'cost-price' && (
            <CalcInput
              id="sellingPrice"
              label="Selling Price"
              prefix="$"
              value={sellingPrice}
              onChange={setSellingPrice}
              min={0}
              step="0.01"
            />
          )}

          {calcMode === 'cost-markup' && (
            <CalcInput
              id="markupPercent"
              label="Markup Percentage"
              suffix="%"
              value={markupPercent}
              onChange={setMarkupPercent}
              min={0}
              step="0.1"
            />
          )}

          {calcMode === 'cost-margin' && (
            <CalcInput
              id="marginPercent"
              label="Profit Margin Percentage"
              suffix="%"
              value={marginPercent}
              onChange={setMarginPercent}
              min={0}
              max={99.9}
              step="0.1"
            />
          )}
        </div>
      </div>

      {res.isValid && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResultCard
              title="Gross Profit"
              value={formatCurrency(res.profit)}
              subtitle={`Selling Price: ${formatCurrency(res.finalSellingPrice)}`}
              highlighted={true}
            />

            <CalcResultCard
              title="Profit Margin"
              value={formatPercent(res.marginPct)}
              subtitle="Profit as % of total revenue"
              badgeText="Revenue %"
              badgeType="info"
            />

            <CalcResultCard
              title="Markup Percentage"
              value={formatPercent(res.markupPct)}
              subtitle="Profit as % of item cost"
              badgeText="Cost %"
              badgeType="neutral"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-bold">Key Insight:</span> Markup is calculated on <span className="underline">Cost</span> (${formatCurrency(res.cost)} x {formatPercent(res.markupPct)}), whereas Profit Margin is calculated on <span className="underline">Revenue</span> (${formatCurrency(res.profit)} / ${formatCurrency(res.finalSellingPrice)}).
            </div>

            {onSaveHistory && (
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition shrink-0"
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
