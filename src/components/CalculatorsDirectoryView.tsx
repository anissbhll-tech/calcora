import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  SlidersHorizontal, 
  Star, 
  Layers, 
  ArrowUpDown, 
  X, 
  Sparkles, 
  Calculator as CalcIcon,
  CheckCircle2
} from 'lucide-react';
import { CalculatorMeta, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { CalculatorCard } from './CalculatorCard';

interface CalculatorsDirectoryViewProps {
  calculators: CalculatorMeta[];
  favorites: string[];
  onToggleFavorite: (calcId: string) => void;
  onSelectCalculator: (calcId: string) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onNavigateHome: () => void;
}

export const CalculatorsDirectoryView: React.FC<CalculatorsDirectoryViewProps> = ({
  calculators,
  favorites,
  onToggleFavorite,
  onSelectCalculator,
  onSelectCategory,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'name-asc' | 'name-desc' | 'newest'>('popular');

  // Filter and Sort Logic
  const filteredCalculators = useMemo(() => {
    let result = [...calculators];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((c) => c.categoryId === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      const advancedIds = [
        'scientific', 'black-scholes-option', 'cap-rate-vs-cash-on-cash', 'quadratic-equation', 
        'matrix-calculator', 'bond-yield', 'bayes-theorem', 'differential-equation', 'standard-deviation'
      ];
      const intermediateIds = [
        'mortgage', 'compound-interest', 'calorie-tdee', 'rental-property-roi', 'amortization-schedule', 
        'roof-rafter', 'concrete-slab', 'refinance', 'auto-loan', 'business-break-even', 'macro-split'
      ];

      if (selectedDifficulty === 'advanced') {
        result = result.filter((c) => advancedIds.includes(c.id) || c.categoryId === 'algebra');
      } else if (selectedDifficulty === 'intermediate') {
        result = result.filter((c) => intermediateIds.includes(c.id) || c.categoryId === 'finance');
      } else if (selectedDifficulty === 'beginner') {
        result = result.filter(
          (c) => !advancedIds.includes(c.id) && !intermediateIds.includes(c.id) && c.categoryId !== 'algebra' && c.categoryId !== 'finance'
        );
      }
    }

    // Sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [calculators, selectedCategory, searchQuery, selectedDifficulty, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Grid className="w-3.5 h-3.5" />
            <span>Complete Calculator Directory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore All Free Online Calculators
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Search, filter, and discover verified calculation tools across 21 specialized disciplines — with instant client-side math, step-by-step formula breakdowns, and exportable results.
          </p>
        </div>
      </div>

      {/* Control Bar: Search, Category, Difficulty, Sort */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        
        {/* Search Input and Sort Selection */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, formula, keyword (e.g. amortization, calorie, voltage)..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort calculators"
                className="bg-transparent font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Difficulty Pill Filter */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedDifficulty(lvl)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition ${
                    selectedDifficulty === lvl
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Horizontal Scrollable Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>All Categories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'all' ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
              {calculators.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = calculators.filter((c) => c.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header / Active Filters Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredCalculators.length}</span> calculator{filteredCalculators.length !== 1 ? 's' : ''}
          {activeCategoryObj && <span> in <strong className="text-indigo-600 dark:text-indigo-400">{activeCategoryObj.name}</strong></span>}
          {searchQuery && <span> matching "<strong className="text-slate-900 dark:text-white">{searchQuery}</strong>"</span>}
        </div>

        {(selectedCategory !== 'all' || searchQuery || selectedDifficulty !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedDifficulty('all');
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Calculator Cards */}
      {filteredCalculators.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <CalcIcon className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No calculators found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any tools matching your filters. Try clearing your search query or choosing another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              isFavorite={favorites.includes(calc.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCalculator={onSelectCalculator}
            />
          ))}
        </div>
      )}

    </div>
  );
};
