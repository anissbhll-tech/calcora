import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalcInput } from '../common/CalcInput';
import { CalcResultCard } from '../common/CalcResultCard';
import { safeParseNumber, formatCurrency, formatNumber } from '../../lib/mathUtils';
import { ShieldCheck, DollarSign, Percent, TrendingUp, Sparkles, Building, Landmark, Award, Plus, Trash2, ArrowUpRight } from 'lucide-react';
import { BaseCalculatorProps } from './index';

interface LineItem {
  id: string;
  category: string;
  name: string;
  value: number;
}

const DEFAULT_ASSETS: LineItem[] = [
  { id: 'a1', category: 'Cash & Liquid', name: 'Checking & High-Yield Savings', value: 25000 },
  { id: 'a2', category: 'Retirement', name: '401(k), 403(b), & IRAs', value: 110000 },
  { id: 'a3', category: 'Investments', name: 'Taxable Brokerage & Stocks', value: 35000 },
  { id: 'a4', category: 'Real Estate', name: 'Primary Residence Market Value', value: 425000 },
  { id: 'a5', category: 'Personal Property', name: 'Vehicles (KBB Resale Value)', value: 28000 },
];

const DEFAULT_LIABILITIES: LineItem[] = [
  { id: 'l1', category: 'Mortgages', name: 'Primary Mortgage Balance', value: 295000 },
  { id: 'l2', category: 'Auto Loans', name: 'Auto Loan Balance', value: 14500 },
  { id: 'l3', category: 'Student Loans', name: 'Student Loan Debt', value: 22000 },
  { id: 'l4', category: 'Credit Cards', name: 'Credit Card Balances', value: 3500 },
];

export const NetWorthCalculator: React.FC<BaseCalculatorProps> = ({ onSaveHistory, initialPreset }) => {
  const [assets, setAssets] = useState<LineItem[]>(() => initialPreset?.assets ?? DEFAULT_ASSETS);
  const [liabilities, setLiabilities] = useState<LineItem[]>(() => initialPreset?.liabilities ?? DEFAULT_LIABILITIES);

  // Age & Income for "Millionaire Next Door" formula benchmark
  const [age, setAge] = useState<number>(() => initialPreset?.age ?? 35);
  const [annualIncome, setAnnualIncome] = useState<number>(() => initialPreset?.annualIncome ?? 95000);

  const updateAsset = (id: string, field: keyof LineItem, val: any) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: field === 'value' ? safeParseNumber(val, 0) : val } : a))
    );
  };

  const addAsset = () => {
    setAssets((prev) => [
      ...prev,
      { id: String(Date.now()), category: 'Other Assets', name: `Asset #${prev.length + 1}`, value: 5000 },
    ]);
  };

  const removeAsset = (id: string) => {
    if (assets.length <= 1) return;
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const updateLiability = (id: string, field: keyof LineItem, val: any) => {
    setLiabilities((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: field === 'value' ? safeParseNumber(val, 0) : val } : l))
    );
  };

  const addLiability = () => {
    setLiabilities((prev) => [
      ...prev,
      { id: String(Date.now()), category: 'Other Debts', name: `Debt #${prev.length + 1}`, value: 2000 },
    ]);
  };

  const removeLiability = (id: string) => {
    if (liabilities.length <= 1) return;
    setLiabilities((prev) => prev.filter((l) => l.id !== id));
  };

  const calculation = useMemo(() => {
    const totalAssets = assets.reduce((sum, item) => sum + Math.max(0, safeParseNumber(item.value, 0)), 0);
    const totalLiabilities = liabilities.reduce(
      (sum, item) => sum + Math.max(0, safeParseNumber(item.value, 0)),
      0
    );
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    // Liquid Assets (Cash + Brokerage)
    const liquidAssets = assets
      .filter((a) => a.category.includes('Cash') || a.category.includes('Investments'))
      .reduce((sum, a) => sum + a.value, 0);

    // Real Estate Equity
    const realEstateAsset = assets.filter((a) => a.category.includes('Real Estate')).reduce((s, a) => s + a.value, 0);
    const mortgageDebt = liabilities.filter((l) => l.category.includes('Mortgage')).reduce((s, l) => s + l.value, 0);
    const homeEquity = Math.max(0, realEstateAsset - mortgageDebt);

    // "Millionaire Next Door" Benchmark Formula: Expected Net Worth = (Age × Income) / 10
    const userAge = Math.max(18, safeParseNumber(age, 35));
    const income = Math.max(0, safeParseNumber(annualIncome, 95000));
    const expectedNetWorth = (userAge * income) / 10;
    const wealthRatio = expectedNetWorth > 0 ? netWorth / expectedNetWorth : 1;

    let wealthStatus = 'Average Accumulator of Wealth (AAW)';
    let wealthColor = 'text-blue-600 dark:text-blue-400';
    if (wealthRatio >= 2.0) {
      wealthStatus = 'Prodigious Accumulator of Wealth (PAW)';
      wealthColor = 'text-emerald-600 dark:text-emerald-400';
    } else if (wealthRatio < 0.8) {
      wealthStatus = 'Under Accumulator of Wealth (UAW)';
      wealthColor = 'text-amber-600 dark:text-amber-400';
    }

    const chartData = [
      {
        category: 'Balance Sheet',
        Assets: Math.round(totalAssets),
        Liabilities: Math.round(totalLiabilities),
        NetWorth: Math.round(netWorth),
      },
    ];

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
      liquidAssets,
      homeEquity,
      expectedNetWorth,
      wealthRatio,
      wealthStatus,
      wealthColor,
      chartData,
    };
  }, [assets, liabilities, age, annualIncome]);

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Net Worth Statement: $${formatCurrency(calculation.netWorth)} (Assets: $${formatCurrency(calculation.totalAssets)}, Liabilities: $${formatCurrency(calculation.totalLiabilities)}) — Status: ${calculation.wealthStatus}`,
        { totalAssets: calculation.totalAssets, totalLiabilities: calculation.totalLiabilities, age, annualIncome },
        {
          netWorth: calculation.netWorth,
          debtToAssetRatio: calculation.debtToAssetRatio,
          expectedNetWorth: calculation.expectedNetWorth,
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Highlight Header Banner */}
      <div
        className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          calculation.netWorth >= 0
            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800'
            : 'bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 border-rose-200 dark:border-rose-800'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck
              className={`w-5 h-5 ${calculation.netWorth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}
            />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Total Household Net Worth &amp; Financial Solvency
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Total Assets:{' '}
            <strong className="text-slate-900 dark:text-white font-mono font-bold">
              ${formatCurrency(calculation.totalAssets)}
            </strong>{' '}
            | Total Liabilities:{' '}
            <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">
              ${formatCurrency(calculation.totalLiabilities)}
            </strong>
            . Wealth Benchmark: <strong className={calculation.wealthColor}>{calculation.wealthStatus}</strong> (
            {(calculation.wealthRatio * 100).toFixed(0)}% of age-{age} expected).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-800/90 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Net Worth</span>
            <span
              className={`text-2xl font-black font-mono ${
                calculation.netWorth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
              }`}
            >
              ${formatCurrency(calculation.netWorth)}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Section: Assets vs Liabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Assets List */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Assets (What You Own)
              </h4>
            </div>
            <button
              type="button"
              onClick={addAsset}
              className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Asset
            </button>
          </div>

          <div className="space-y-3">
            {assets.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 items-center text-xs"
              >
                <div className="col-span-7">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateAsset(item.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => updateAsset(item.id, 'value', e.target.value)}
                    min={0}
                    step={500}
                    className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 text-right"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeAsset(item.id)}
                    disabled={assets.length <= 1}
                    className="text-slate-400 hover:text-red-500 disabled:opacity-30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between text-xs font-bold border-t border-slate-200 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400">Total Asset Value:</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              ${formatCurrency(calculation.totalAssets)}
            </span>
          </div>
        </div>

        {/* Right: Liabilities List */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-rose-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Liabilities (What You Owe)
              </h4>
            </div>
            <button
              type="button"
              onClick={addLiability}
              className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Liability
            </button>
          </div>

          <div className="space-y-3">
            {liabilities.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 items-center text-xs"
              >
                <div className="col-span-7">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateLiability(item.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => updateLiability(item.id, 'value', e.target.value)}
                    min={0}
                    step={500}
                    className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-rose-600 dark:text-rose-400 text-right"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeLiability(item.id)}
                    disabled={liabilities.length <= 1}
                    className="text-slate-400 hover:text-red-500 disabled:opacity-30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between text-xs font-bold border-t border-slate-200 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400">Total Liabilities:</span>
            <span className="font-mono text-rose-600 dark:text-rose-400">
              ${formatCurrency(calculation.totalLiabilities)}
            </span>
          </div>
        </div>
      </div>

      {/* Benchmark Parameters (Age & Income) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
          <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Wealth Accumulator Benchmark (The Millionaire Next Door Formula)
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput
            id="age"
            label="Your Current Age"
            value={age}
            onChange={(val) => setAge(val)}
            min={18}
            max={100}
            step={1}
            suffix="yrs"
          />
          <CalcInput
            id="annualIncome"
            label="Annual Pre-Tax Household Income"
            value={annualIncome}
            onChange={(val) => setAnnualIncome(val)}
            min={0}
            max={2000000}
            step={2500}
            prefix="$"
          />
        </div>
      </div>

      {/* Main KPI Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CalcResultCard
          title="Total Net Worth"
          value={`$${formatCurrency(calculation.netWorth)}`}
          subtitle="Assets minus total liabilities"
          highlighted={true}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />

        <CalcResultCard
          title="Debt-to-Asset Ratio"
          value={`${calculation.debtToAssetRatio.toFixed(1)}%`}
          subtitle={calculation.debtToAssetRatio < 35 ? 'Healthy solvency (<35%)' : 'High leverage (>50%)'}
          icon={<Percent className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />

        <CalcResultCard
          title="Liquid Quick Assets"
          value={`$${formatCurrency(calculation.liquidAssets)}`}
          subtitle="Cash & taxable investments"
          icon={<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        />

        <CalcResultCard
          title="Target Expected Net Worth"
          value={`$${formatCurrency(calculation.expectedNetWorth)}`}
          subtitle={`(Age ${age} × $${formatNumber(annualIncome)}) / 10`}
          icon={<Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Balance Sheet Comparison Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Landmark className="w-4 h-4 text-emerald-500" />
          Balance Sheet Breakdown: Assets vs Liabilities vs Equity
        </h3>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
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
              <Bar dataKey="Assets" name="Total Assets" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Liabilities" name="Total Liabilities" fill="#f43f5e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="NetWorth" name="Net Worth (Equity)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
