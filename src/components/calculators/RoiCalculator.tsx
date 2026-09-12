import React, { useState, useMemo, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatNumber, formatCurrency } from '../../lib/mathUtils';
import { TrendingUp, DollarSign, Percent, BarChart3, Clock, Sparkles, Layers, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { BaseCalculatorProps } from './index';

interface PresetScenario {
  id: string;
  name: string;
  initialCost: number;
  additionalCost: number;
  grossRevenue: number;
  years: number;
  months: number;
  desc: string;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'stock_investment',
    name: 'Stock / Portfolio Growth',
    initialCost: 25000,
    additionalCost: 0,
    grossRevenue: 42500,
    years: 4,
    months: 0,
    desc: 'Equities capital appreciation over 4-year holding period',
  },
  {
    id: 'real_estate_flip',
    name: 'Real Estate Flip',
    initialCost: 240000,
    additionalCost: 35000,
    grossRevenue: 345000,
    years: 1,
    months: 6,
    desc: 'Property purchase, renovation budget, and resale after 18 months',
  },
  {
    id: 'marketing_campaign',
    name: 'Digital Ad Campaign',
    initialCost: 5000,
    additionalCost: 1500,
    grossRevenue: 18200,
    years: 0,
    months: 3,
    desc: 'PPC ad spend + creative agency fees generating e-commerce revenue',
  },
  {
    id: 'retail_product',
    name: 'Retail Product Markup',
    initialCost: 2000,
    additionalCost: 500,
    grossRevenue: 6000,
    years: 0,
    months: 6,
    desc: 'Inventory purchase, freight, packaging, and total retail sales',
  },
];

export const RoiCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [initialCost, setInitialCost] = useState<number>(10000);
  const [additionalCost, setAdditionalCost] = useState<number>(1500);
  const [grossRevenue, setGrossRevenue] = useState<number>(18500);
  const [holdingYears, setHoldingYears] = useState<number>(2);
  const [holdingMonths, setHoldingMonths] = useState<number>(0);
  const [activePresetId, setActivePresetId] = useState<string>('custom');

  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.initialCost !== undefined) setInitialCost(initialPreset.initialCost);
      if (initialPreset.additionalCost !== undefined) setAdditionalCost(initialPreset.additionalCost);
      if (initialPreset.grossRevenue !== undefined) setGrossRevenue(initialPreset.grossRevenue);
      if (initialPreset.holdingYears !== undefined) setHoldingYears(initialPreset.holdingYears);
      if (initialPreset.holdingMonths !== undefined) setHoldingMonths(initialPreset.holdingMonths);
    }
  }, [initialPreset]);

  const handleSelectPreset = (scenario: PresetScenario) => {
    setActivePresetId(scenario.id);
    setInitialCost(scenario.initialCost);
    setAdditionalCost(scenario.additionalCost);
    setGrossRevenue(scenario.grossRevenue);
    setHoldingYears(scenario.years);
    setHoldingMonths(scenario.months);
  };

  const calculation = useMemo(() => {
    const costBase = Math.max(0, safeParseNumber(initialCost, 10000));
    const extraCost = Math.max(0, safeParseNumber(additionalCost, 0));
    const totalCost = costBase + extraCost;
    const revenue = Math.max(0, safeParseNumber(grossRevenue, 18500));

    const totalYears = safeParseNumber(holdingYears, 0) + safeParseNumber(holdingMonths, 0) / 12;

    const netProfit = revenue - totalCost;
    const roiPercent = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    const profitMarginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const markupPercent = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    const moic = totalCost > 0 ? revenue / totalCost : 0; // Multiple on Invested Capital
    const benefitCostRatio = totalCost > 0 ? revenue / totalCost : 0;

    // Annualized ROI (Compound Annual Growth Rate / CAGR)
    let annualizedRoiPercent = 0;
    if (totalCost > 0 && revenue > 0 && totalYears > 0) {
      annualizedRoiPercent = (Math.pow(revenue / totalCost, 1 / totalYears) - 1) * 100;
    } else if (totalYears === 0) {
      annualizedRoiPercent = roiPercent;
    }

    const chartData = [
      {
        name: 'Investment Overview',
        'Initial Capital': costBase,
        'Additional Costs': extraCost,
        'Net Profit': Math.max(0, netProfit),
        'Total Revenue': revenue,
      },
    ];

    return {
      costBase,
      extraCost,
      totalCost,
      revenue,
      totalYears,
      netProfit,
      roiPercent,
      profitMarginPercent,
      markupPercent,
      annualizedRoiPercent,
      moic,
      benefitCostRatio,
      chartData,
    };
  }, [initialCost, additionalCost, grossRevenue, holdingYears, holdingMonths]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `ROI: ${calculation.roiPercent.toFixed(1)}% | Net Profit: ${formatCurrency(calculation.netProfit)}`,
        { initialCost, additionalCost, grossRevenue, holdingYears, holdingMonths },
        {
          roiPercent: calculation.roiPercent,
          annualizedRoiPercent: calculation.annualizedRoiPercent,
          netProfit: calculation.netProfit,
          profitMarginPercent: calculation.profitMarginPercent,
          markupPercent: calculation.markupPercent,
        }
      );
    }
  };

  const isProfit = calculation.netProfit >= 0;

  return (
    <div className="space-y-8">
      {/* Preset Scenarios Header */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Quick Investment Scenarios
          </span>
          <span className="text-[11px] text-slate-400">Click to autofill preset</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleSelectPreset(sc)}
              className={`p-2.5 text-left rounded-xl border transition ${
                activePresetId === sc.id
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold truncate">{sc.name}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{sc.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Inputs Grid */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-blue-500" />
          Financial Capital &amp; Returns
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CalcInput
            id="initialCost"
            label="Initial Investment Cost"
            value={initialCost}
            onChange={(val) => {
              setInitialCost(val);
              setActivePresetId('custom');
            }}
            min={0}
            max={10000000}
            step={100}
            prefix="$"
          />

          <CalcInput
            id="additionalCost"
            label="Additional Ongoing Costs"
            value={additionalCost}
            onChange={(val) => {
              setAdditionalCost(val);
              setActivePresetId('custom');
            }}
            min={0}
            max={5000000}
            step={50}
            prefix="$"
          />

          <CalcInput
            id="grossRevenue"
            label="Final Value / Gross Revenue"
            value={grossRevenue}
            onChange={(val) => {
              setGrossRevenue(val);
              setActivePresetId('custom');
            }}
            min={0}
            max={50000000}
            step={100}
            prefix="$"
          />
        </div>

        {/* Investment Duration for Annualized CAGR */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput
            id="holdingYears"
            label="Holding Period (Years)"
            value={holdingYears}
            onChange={(val) => {
              setHoldingYears(val);
              setActivePresetId('custom');
            }}
            min={0}
            max={50}
            step={1}
            suffix="yrs"
          />

          <CalcInput
            id="holdingMonths"
            label="Holding Period (Months)"
            value={holdingMonths}
            onChange={(val) => {
              setHoldingMonths(val);
              setActivePresetId('custom');
            }}
            min={0}
            max={11}
            step={1}
            suffix="mo"
          />
        </div>
      </div>

      {/* Primary Hero Result Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Total Return on Investment (ROI)
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mt-1">
              <span
                className={`text-4xl sm:text-5xl font-black font-mono flex items-center ${
                  isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isProfit ? (
                  <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 inline-block mr-1" />
                ) : (
                  <ArrowDownRight className="w-8 h-8 sm:w-10 sm:h-10 inline-block mr-1" />
                )}
                {isProfit ? `+${calculation.roiPercent.toFixed(1)}%` : `${calculation.roiPercent.toFixed(1)}%`}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isProfit
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                }`}
              >
                {isProfit ? 'Profitable Return' : 'Capital Loss'}
              </span>
            </div>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="text-slate-500">
              Total Invested Cost: <strong className="text-slate-900 dark:text-white font-mono">{formatCurrency(calculation.totalCost)}</strong>
            </div>
            <div className="text-slate-500">
              Net Gain / Loss:{' '}
              <strong className={`font-mono font-bold ${isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {isProfit ? `+${formatCurrency(calculation.netProfit)}` : formatCurrency(calculation.netProfit)}
              </strong>
            </div>
          </div>
        </div>

        {/* Annualized vs Multiple summary */}
        {calculation.totalYears > 0 && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>
                Over a <strong className="font-bold">{calculation.totalYears.toFixed(1)} year</strong> period, your compound annual growth rate is{' '}
                <strong className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {calculation.annualizedRoiPercent >= 0
                    ? `+${calculation.annualizedRoiPercent.toFixed(2)}% / yr`
                    : `${calculation.annualizedRoiPercent.toFixed(2)}% / yr`}
                </strong>
                .
              </span>
            </div>
            <span className="font-mono font-bold text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
              {calculation.moic.toFixed(2)}x MOIC
            </span>
          </div>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Net Profit / Gain"
          value={formatCurrency(calculation.netProfit)}
          subtitle={`Total revenue minus all costs`}
          highlighted={true}
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Annualized ROI (CAGR)"
          value={`${calculation.annualizedRoiPercent.toFixed(1)}%`}
          subtitle={`Compounded annual return rate`}
          icon={<TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        />

        <CalcResultCard
          title="Profit Margin"
          value={`${calculation.profitMarginPercent.toFixed(1)}%`}
          subtitle={`Net profit as % of gross revenue`}
          icon={<Percent className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Price Markup"
          value={`${calculation.markupPercent.toFixed(1)}%`}
          subtitle={`Profit added above total cost`}
          icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      {/* Capital Allocation & Financial Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-500" />
          Financial Returns &amp; Capital Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs font-sans font-semibold text-slate-500">Total Invested Capital</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {formatCurrency(calculation.totalCost)}
            </div>
            <div className="text-[11px] font-sans text-slate-400">
              {formatCurrency(calculation.costBase)} base + {formatCurrency(calculation.extraCost)} ongoing
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <span className="text-xs font-sans font-semibold text-emerald-700 dark:text-emerald-400">
              Gross Realized Revenue
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {formatCurrency(calculation.revenue)}
            </div>
            <div className="text-[11px] font-sans text-slate-500">
              Benefit-Cost Ratio: <strong className="font-mono">{calculation.benefitCostRatio.toFixed(2)}x</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
            <span className="text-xs font-sans font-semibold text-blue-700 dark:text-blue-400">
              Multiple on Invested Capital (MOIC)
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {calculation.moic.toFixed(2)}x
            </div>
            <div className="text-[11px] font-sans text-slate-500">
              ${(calculation.moic * 1).toFixed(2)} returned per $1.00 invested
            </div>
          </div>
        </div>

        {/* Profit vs Markup Comparison Explainer */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
          <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-500" />
            Margin vs Markup Distinction
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600 dark:text-slate-400">
            <div>
              <strong className="text-slate-800 dark:text-slate-200">Profit Margin ({calculation.profitMarginPercent.toFixed(1)}%):</strong> Measures the percentage of each dollar of revenue that is kept as profit:
              <span className="font-mono block text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                (Profit ÷ Revenue) × 100
              </span>
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200">Price Markup ({calculation.markupPercent.toFixed(1)}%):</strong> Measures the percentage by which the cost price is marked up to arrive at the selling price:
              <span className="font-mono block text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                (Profit ÷ Cost) × 100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
