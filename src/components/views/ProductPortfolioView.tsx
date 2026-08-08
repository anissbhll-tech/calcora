import React from 'react';
import { 
  Package, 
  PlusCircle, 
  ExternalLink, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Calculator,
  Target
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const ProductPortfolioView: React.FC = () => {
  const { products, activeProduct, setActiveProduct, activeWorkspace, setCurrentTab } = useWorkspace();

  const workspaceProducts = products.filter(p => p.workspaceId === activeWorkspace.id);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Portfolio Assets
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">{activeWorkspace.name}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Digital Assets & Product Portfolio
          </h1>
          <p className="text-xs text-slate-400">
            Manage digital products, SaaS web assets, productized services, and hardware items under corporate management.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('onboarding-wizard')}
          className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Register New Asset</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workspaceProducts.map((prod) => {
          const isSelected = activeProduct?.id === prod.id;

          return (
            <div
              key={prod.id}
              className={`bg-slate-900 border rounded-2xl p-6 space-y-4 shadow-xl transition-all ${
                isSelected 
                  ? 'border-indigo-500 ring-1 ring-indigo-500/50' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded">
                      {prod.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">{prod.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>{prod.name}</span>
                    {prod.url && (
                      <a href={prod.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{prod.tagline}</p>
                </div>

                <button
                  onClick={() => setActiveProduct(prod)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isSelected ? 'Active Focus' : 'Select'}
                </button>
              </div>

              {/* Financial Metrics Row */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Asking Price</div>
                  <div className="text-sm font-extrabold text-emerald-400 font-mono">
                    ${(prod.askingPrice / 1000).toFixed(0)}k
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">ARR / MRR</div>
                  <div className="text-xs font-bold text-white font-mono">
                    ${(prod.arr / 1000).toFixed(0)}k
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Gross Margin</div>
                  <div className="text-xs font-bold text-cyan-400 font-mono">
                    {prod.grossProfitMargin}%
                  </div>
                </div>
              </div>

              {/* Unique Selling Points */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Core Defensibility Moat</div>
                <div className="space-y-1">
                  {prod.uniqueSellingPoints.slice(0, 2).map((usp, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{usp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Action Bar */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    setActiveProduct(prod);
                    setCurrentTab('valuation-engine');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Valuation Breakdown</span>
                </button>

                <button
                  onClick={() => {
                    setActiveProduct(prod);
                    setCurrentTab('lead-scout');
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Buyer Leads</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
