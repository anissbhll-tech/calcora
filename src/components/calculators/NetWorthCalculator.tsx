import React, { useState, useEffect } from 'react';
import { BaseCalculatorProps } from './index';
import { DollarSign, ShieldCheck, TrendingUp, RotateCcw, Save, Plus, Trash2 } from 'lucide-react';

interface AssetLiabilityItem {
  id: string;
  name: string;
  value: number;
}

export const NetWorthCalculator: React.FC<BaseCalculatorProps> = ({
  onSaveHistory,
  resetSignal,
  initialPreset
}) => {
  const [assets, setAssets] = useState<AssetLiabilityItem[]>([
    { id: '1', name: 'Checking & Savings', value: 15000 },
    { id: '2', name: '401(k) / IRA Retirement', value: 85000 },
    { id: '3', name: 'Brokerage Investments', value: 25000 },
    { id: '4', name: 'Primary Residence Equity/Value', value: 350000 },
    { id: '5', name: 'Vehicles', value: 22000 }
  ]);

  const [liabilities, setLiabilities] = useState<AssetLiabilityItem[]>([
    { id: 'l1', name: 'Mortgage Balance', value: 240000 },
    { id: 'l2', name: 'Auto Loan Balance', value: 12000 },
    { id: 'l3', name: 'Credit Card Debt', value: 2500 },
    { id: 'l4', name: 'Student Loans', value: 18000 }
  ]);

  useEffect(() => {
    if (resetSignal) {
      handleReset();
    }
  }, [resetSignal]);

  const handleReset = () => {
    setAssets([
      { id: '1', name: 'Checking & Savings', value: 15000 },
      { id: '2', name: '401(k) / IRA Retirement', value: 85000 },
      { id: '3', name: 'Brokerage Investments', value: 25000 },
      { id: '4', name: 'Primary Residence Equity/Value', value: 350000 },
      { id: '5', name: 'Vehicles', value: 22000 }
    ]);
    setLiabilities([
      { id: 'l1', name: 'Mortgage Balance', value: 240000 },
      { id: 'l2', name: 'Auto Loan Balance', value: 12000 },
      { id: 'l3', name: 'Credit Card Debt', value: 2500 },
      { id: 'l4', name: 'Student Loans', value: 18000 }
    ]);
  };

  const addAsset = () => {
    setAssets([...assets, { id: Date.now().toString(), name: 'New Asset', value: 1000 }]);
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const updateAsset = (id: string, field: 'name' | 'value', val: any) => {
    setAssets(assets.map(a => a.id === id ? { ...a, [field]: field === 'value' ? Math.max(0, Number(val)) : val } : a));
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { id: Date.now().toString(), name: 'New Debt', value: 1000 }]);
  };

  const removeLiability = (id: string) => {
    setLiabilities(liabilities.filter(l => l.id !== id));
  };

  const updateLiability = (id: string, field: 'name' | 'value', val: any) => {
    setLiabilities(liabilities.map(l => l.id === id ? { ...l, [field]: field === 'value' ? Math.max(0, Number(val)) : val } : l));
  };

  // Calculations
  const totalAssets = assets.reduce((sum, item) => sum + (item.value || 0), 0);
  const totalLiabilities = liabilities.reduce((sum, item) => sum + (item.value || 0), 0);
  const netWorth = totalAssets - totalLiabilities;
  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory(
        `Net Worth Calculation: $${netWorth.toLocaleString()} (Assets: $${totalAssets.toLocaleString()}, Debt: $${totalLiabilities.toLocaleString()})`,
        { totalAssets, totalLiabilities },
        { netWorth, debtToAssetRatio }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Summary Banner */}
      <div className={`p-6 rounded-xl shadow-md text-white transition-colors ${netWorth >= 0 ? 'bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900' : 'bg-gradient-to-r from-rose-800 via-red-900 to-slate-900'}`}>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-medium">Your Estimated Net Worth</div>
            <div className="text-4xl font-extrabold mt-1">
              ${netWorth.toLocaleString()}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {netWorth >= 0 ? 'Positive Solvency - Assets exceed liabilities' : 'Negative Net Worth - Liabilities exceed assets'}
            </div>
          </div>
          <div className="flex gap-6 text-sm border-l border-white/20 pl-6">
            <div>
              <div className="text-xs text-slate-300">Total Assets</div>
              <div className="text-xl font-bold text-emerald-300">${totalAssets.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-slate-300">Total Debt</div>
              <div className="text-xl font-bold text-rose-300">${totalLiabilities.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-slate-300">Debt-to-Asset Ratio</div>
              <div className="text-xl font-bold text-amber-300">{debtToAssetRatio.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid for Assets vs Liabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-emerald-700">
              <TrendingUp className="w-5 h-5" /> Assets (What You Own)
            </h3>
            <span className="text-sm font-bold text-emerald-700">${totalAssets.toLocaleString()}</span>
          </div>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {assets.map((asset) => (
              <div key={asset.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                <input
                  type="text"
                  value={asset.name}
                  onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <div className="relative w-32">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={asset.value}
                    onChange={(e) => updateAsset(asset.id, 'value', e.target.value)}
                    className="w-full pl-6 pr-2 py-1.5 text-sm border rounded text-right focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  onClick={() => removeAsset(asset.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addAsset}
            className="w-full py-2 border border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
          >
            <Plus className="w-4 h-4" /> Add Asset Item
          </button>
        </div>

        {/* Liabilities Section */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-rose-700">
              <DollarSign className="w-5 h-5" /> Liabilities (What You Owe)
            </h3>
            <span className="text-sm font-bold text-rose-700">${totalLiabilities.toLocaleString()}</span>
          </div>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {liabilities.map((liability) => (
              <div key={liability.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                <input
                  type="text"
                  value={liability.name}
                  onChange={(e) => updateLiability(liability.id, 'name', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <div className="relative w-32">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    value={liability.value}
                    onChange={(e) => updateLiability(liability.id, 'value', e.target.value)}
                    className="w-full pl-6 pr-2 py-1.5 text-sm border rounded text-right focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <button
                  onClick={() => removeLiability(liability.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addLiability}
            className="w-full py-2 border border-dashed border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
          >
            <Plus className="w-4 h-4" /> Add Debt Item
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 justify-end bg-white p-4 rounded-xl border border-slate-200">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition flex items-center gap-1 text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reset All
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center gap-1 text-sm"
        >
          <Save className="w-4 h-4" /> Save Net Worth Statement
        </button>
      </div>
    </div>
  );
};
