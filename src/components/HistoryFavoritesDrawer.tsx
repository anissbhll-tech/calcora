import React from 'react';
import { X, Heart, Clock, Trash2, ArrowRight, Calculator, Check, Copy } from 'lucide-react';
import { CalculationHistoryItem } from '../types';
import { CALCULATORS } from '../data/calculatorsList';

interface HistoryFavoritesDrawerProps {
  isOpen: boolean;
  activeTab: 'favorites' | 'history';
  onClose: () => void;
  onSelectTab: (tab: 'favorites' | 'history') => void;
  favorites: string[];
  history: CalculationHistoryItem[];
  onSelectCalculator: (calculatorId: string) => void;
  onToggleFavorite: (calculatorId: string) => void;
  onClearHistory: () => void;
  onRemoveHistoryItem: (id: string) => void;
}

export const HistoryFavoritesDrawer: React.FC<HistoryFavoritesDrawerProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab,
  favorites,
  history,
  onSelectCalculator,
  onToggleFavorite,
  onClearHistory,
  onRemoveHistoryItem,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopySummary = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const favoriteCalculators = CALCULATORS.filter((c) => favorites.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          
          {/* Header & Tabs */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => onSelectTab('favorites')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'favorites'
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Favorites ({favorites.length})</span>
              </button>
              <button
                onClick={() => onSelectTab('history')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'history'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>History ({history.length})</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === 'favorites' ? (
              favoriteCalculators.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <Heart className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3 stroke-1" />
                  <p className="font-semibold text-slate-700 dark:text-slate-300">No Favorites Saved Yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Click the heart icon on any calculator to bookmark it here for instant 1-click access.
                  </p>
                </div>
              ) : (
                favoriteCalculators.map((calc) => (
                  <div
                    key={calc.id}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition flex items-center justify-between group"
                  >
                    <button
                      onClick={() => {
                        onSelectCalculator(calc.id);
                        onClose();
                      }}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition">
                          {calc.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{calc.shortDescription}</p>
                      </div>
                    </button>

                    <button
                      onClick={() => onToggleFavorite(calc.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition ml-2"
                      title="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))
              )
            ) : (
              /* History Tab */
              history.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <Clock className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3 stroke-1" />
                  <p className="font-semibold text-slate-700 dark:text-slate-300">No Calculation History</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Your recent calculations will be recorded automatically right here.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs text-slate-400">Recent Calculations</span>
                    <button
                      onClick={onClearHistory}
                      className="text-xs text-rose-500 font-medium hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  </div>

                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 relative group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <button
                          onClick={() => {
                            onSelectCalculator(item.calculatorId);
                            onClose();
                          }}
                          className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                        >
                          {item.calculatorTitle} <ArrowRight className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 font-mono bg-white dark:bg-slate-950 p-2 rounded-lg border border-slate-100 dark:border-slate-800 my-1">
                        {item.summaryText}
                      </p>

                      <div className="flex items-center justify-between pt-1.5">
                        <button
                          onClick={() => handleCopySummary(item.summaryText, item.id)}
                          className="text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Result</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onRemoveHistoryItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded transition"
                          title="Delete entry"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
