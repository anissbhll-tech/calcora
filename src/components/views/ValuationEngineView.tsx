import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const ValuationEngineView: React.FC = () => {
  const { activeProduct, dispatchAgentAction, isDispatching } = useWorkspace();

  const valuation = activeProduct?.valuation;

  const handleRecalculateValuation = async () => {
    if (!activeProduct) return;
    await dispatchAgentAction(
      'VALUATION_ENGINEER',
      'Institutional Valuation Update',
      `Recalculate DCF valuation and ARR multiples for asset "${activeProduct.name}". Asking Price: $${activeProduct.askingPrice}, ARR: $${activeProduct.arr}, Churn: ${activeProduct.churnRate}%.`
    );
  };

  if (!activeProduct) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No active product selected. Please select a product from the navbar or portfolio.</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Aegis Valuation Agent
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">{activeProduct.name}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Institutional Valuation & Financial Modeling
          </h1>
          <p className="text-xs text-slate-400">
            Risk-adjusted DCF modeling, ARR exit multiples benchmark, and monetization tier optimization.
          </p>
        </div>

        <button
          onClick={handleRecalculateValuation}
          disabled={isDispatching}
          className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-50 shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
          <span>{isDispatching ? 'Aegis Calculating...' : 'Recalculate Valuation'}</span>
        </button>
      </div>

      {/* Valuation Bounds Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="text-xs font-medium text-slate-400">Conservative Floor Bound</div>
          <div className="text-2xl font-extrabold text-slate-200 font-mono">
            ${( (valuation?.conservativeValue || activeProduct.askingPrice * 0.85) / 1000 ).toFixed(0)}k
          </div>
          <div className="text-[11px] text-slate-400">
            Multiple: <span className="font-mono text-slate-300">3.8x ARR</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-emerald-500/50 p-5 rounded-2xl space-y-2 shadow-xl relative overflow-hidden">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Target Fair Market Value</div>
          <div className="text-3xl font-extrabold text-white font-mono">
            ${( (valuation?.fairMarketValue || activeProduct.askingPrice) / 1000 ).toFixed(0)}k
          </div>
          <div className="text-[11px] text-emerald-300 font-semibold">
            Applied ARR Multiple: <span className="font-mono text-white">{valuation?.arrMultiple || 4.7}x</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg">
          <div className="text-xs font-medium text-slate-400">Optimistic Upside Ceiling</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">
            ${( (valuation?.optimisticValue || activeProduct.askingPrice * 1.15) / 1000 ).toFixed(0)}k
          </div>
          <div className="text-[11px] text-slate-400">
            Multiple: <span className="font-mono text-slate-300">5.5x ARR</span>
          </div>
        </div>

      </div>

      {/* Two Column Layout: Valuation Impact Factors & Pricing Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Factors & Value Drivers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Valuation Factors & Driver Analysis</h3>
          </div>

          <div className="space-y-3">
            {valuation?.valuationFactors?.map((fac, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={fac.impact === 'positive' ? 'text-emerald-400' : 'text-amber-400'}>
                    {fac.factor}
                  </span>
                  <span className="font-mono text-slate-400">Score: {fac.score}/100</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{fac.explanation}</p>
              </div>
            )) || (
              <div className="text-xs text-slate-400">No custom factors calculated yet. Click &quot;Recalculate Valuation&quot; to invoke Aegis Agent.</div>
            )}
          </div>
        </div>

        {/* Right Col: Monetize Pro Suggested Pricing Models */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Monetize Pro Packaging Tiers</h3>
          </div>

          <div className="space-y-3">
            {valuation?.suggestedPricingModels?.map((tier, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{tier.tierName}</span>
                  <span className="font-mono text-sm font-extrabold text-cyan-400">{tier.price}</span>
                </div>
                <div className="space-y-1">
                  {tier.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center space-x-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )) || (
              <div className="text-xs text-slate-400">No packaging tiers generated yet.</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
