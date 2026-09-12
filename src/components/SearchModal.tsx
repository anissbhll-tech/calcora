import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, ArrowRight, Sparkles, Folder, History, TrendingUp, CornerDownLeft } from 'lucide-react';
import { CALCULATORS } from '../data/calculatorsList';
import { CATEGORIES } from '../data/categories';
import { CalculatorMeta } from '../types';
import { trackSearch } from '../lib/analytics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (calculatorId: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCalculator,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calcora_recent_searches');
      return saved ? JSON.parse(saved) : ['mortgage', 'bmi', 'compound interest', 'percentage'];
    } catch {
      return ['mortgage', 'bmi', 'compound interest', 'percentage'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const saveRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const term = searchTerm.trim().toLowerCase();
    trackSearch(term, filteredCalculators.length);
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== term);
      const updated = [searchTerm.trim(), ...filtered].slice(0, 6);
      try {
        localStorage.setItem('calcora_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((t) => t !== termToRemove);
      try {
        localStorage.setItem('calcora_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const filteredCalculators = CALCULATORS.filter((calc) => {
    const matchesCategory = selectedCategoryFilter === 'all' || calc.categoryId === selectedCategoryFilter;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesTitle = calc.title.toLowerCase().includes(q);
    const matchesDesc = calc.shortDescription.toLowerCase().includes(q);
    const matchesKeywords = calc.keywords.some((k) => k.toLowerCase().includes(q));
    return matchesCategory && (matchesTitle || matchesDesc || matchesKeywords);
  });

  // Reset selected index when query or category filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategoryFilter]);

  // Keyboard navigation logic (Escape, ArrowUp, ArrowDown, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredCalculators.length > 0 ? (prev + 1) % filteredCalculators.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredCalculators.length > 0 ? (prev - 1 + filteredCalculators.length) % filteredCalculators.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCalculators.length > 0 && filteredCalculators[selectedIndex]) {
          const selectedCalc = filteredCalculators[selectedIndex];
          saveRecentSearch(query || selectedCalc.title);
          onSelectCalculator(selectedCalc.id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCalculators, selectedIndex, query, onClose, onSelectCalculator]);

  if (!isOpen) return null;

  // Helper to highlight matching text in title/description
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="bg-amber-200/90 dark:bg-amber-900/80 text-slate-900 dark:text-amber-100 rounded px-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to calculate? (e.g. mortgage, BMI, concrete, compound interest)..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base focus:outline-none font-medium"
            aria-label="Search calculators"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 bg-slate-200/60 dark:bg-slate-800 dark:text-slate-400 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            ESC
          </button>
        </div>

        {/* Recent Searches Pills (When Query is empty) */}
        {!query && recentSearches.length > 0 && (
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
              <History className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> Recent:
            </span>
            {recentSearches.map((term, i) => (
              <span
                key={i}
                onClick={() => setQuery(term)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500 cursor-pointer shrink-0 transition"
              >
                <span>{term}</span>
                <X
                  className="w-3 h-3 text-slate-400 hover:text-rose-500 transition-colors"
                  onClick={(e) => removeRecentSearch(e, term)}
                />
              </span>
            ))}
          </div>
        )}

        {/* Category Filters Pill Row */}
        <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs bg-white dark:bg-slate-900">
          <span className="text-slate-400 font-medium shrink-0 mr-1">Filter:</span>
          <button
            type="button"
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-2.5 py-1 rounded-full transition shrink-0 font-medium ${
              selectedCategoryFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All ({CALCULATORS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = CALCULATORS.filter((c) => c.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-full transition shrink-0 font-medium ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto flex-1 space-y-1 focus:outline-none" tabIndex={-1}>
          {filteredCalculators.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Calculator className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No calculators found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try popular search topics like mortgage, bmi, compound interest, percentage, or concrete.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {['mortgage', 'bmi', 'compound interest', 'percentage', 'calories'].map((suggested, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuery(suggested)}
                    className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 text-xs font-medium hover:bg-indigo-100 transition"
                  >
                    {suggested}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            filteredCalculators.map((calc, index) => {
              const cat = CATEGORIES.find((c) => c.id === calc.categoryId);
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={calc.id}
                  type="button"
                  onClick={() => {
                    saveRecentSearch(query || calc.title);
                    onSelectCalculator(calc.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-xl transition group flex items-center justify-between border ${
                    isSelected
                      ? 'bg-indigo-50/90 dark:bg-slate-800 border-indigo-300 dark:border-indigo-500/60 shadow-xs'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                      isSelected
                        ? 'bg-indigo-600 text-white scale-105'
                        : 'bg-indigo-100/70 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm transition-colors ${
                          isSelected
                            ? 'text-indigo-700 dark:text-indigo-300 font-bold'
                            : 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                        }`}>
                          {highlightMatch(calc.title, query)}
                        </span>
                        {calc.isPopular && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-medium shrink-0">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {highlightMatch(calc.shortDescription, query)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    {cat && (
                      <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {cat.name}
                      </span>
                    )}
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                        Press <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''} available</span>
          <span className="hidden sm:flex items-center gap-3 text-[11px]">
            <span><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">↵</kbd> Select</span>
            <span><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">ESC</kbd> Close</span>
          </span>
          <span className="flex sm:hidden items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Calcora Command
          </span>
        </div>
      </div>
    </div>
  );
};

