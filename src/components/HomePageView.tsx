import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Grid, 
  Shuffle, 
  Star, 
  ChevronRight, 
  ArrowRight,
  Flame,
  Newspaper,
  BookOpen,
  Award,
  Layers
} from 'lucide-react';
import { CalculatorMeta, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { CalculatorCard } from './CalculatorCard';
import { useLanguage } from '../i18n/LanguageContext';
import { trackRandomToolClick } from '../lib/analytics';

interface HomePageViewProps {
  calculators: CalculatorMeta[];
  favorites: string[];
  recentlyViewed: string[];
  onToggleFavorite: (calcId: string) => void;
  onSelectCalculator: (calcId: string) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onOpenSearch: () => void;
  onNavigateBlog?: () => void;
  totalCalculationsCount?: number;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  calculators,
  favorites,
  recentlyViewed,
  onToggleFavorite,
  onSelectCalculator,
  onSelectCategory,
  onOpenSearch,
  onNavigateBlog,
  totalCalculationsCount = 0,
}) => {
  const { t } = useLanguage();
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'popular' | 'new' | 'trending'>('all');

  // Random Calculator Handler
  const handleRandomCalculator = () => {
    if (!calculators.length) return;
    const randomIndex = Math.floor(Math.random() * calculators.length);
    const randomCalc = calculators[randomIndex];
    trackRandomToolClick(randomCalc.id);
    onSelectCalculator(randomCalc.id);
  };

  // Filtered calculators
  const popularCalculators = calculators.filter((c) => c.isPopular);
  const newCalculators = calculators.filter((c) => c.isNew);
  const trendingCalculators = calculators.slice(0, 8); // top calculators

  // Continue where you left off
  const lastOpenedCalcId = recentlyViewed[0];
  const lastOpenedCalc = lastOpenedCalcId ? calculators.find((c) => c.id === lastOpenedCalcId) : null;

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(20,184,166,0.15),transparent_60%)] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>256 Professional Free Online Calculators</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto font-sans">
            Calculations Made <span className="text-teal-400">Simple, Fast & Accurate</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Calcora provides 256 verified calculation tools across finance, mortgage, health, algebra, physics, unit conversion, and construction — with instant client-side math and step-by-step breakdowns.
          </p>

          {/* Quick Search Trigger & Random Button */}
          <div className="max-w-xl mx-auto pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex-1 w-full flex items-center justify-between p-3.5 bg-slate-800/90 hover:bg-slate-800 text-slate-200 rounded-2xl border border-slate-700/80 shadow-md transition group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-slate-300 truncate">
                  Search mortgage, calories, scientific, percentage...
                </span>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 bg-slate-900 rounded-lg text-[10px] font-mono font-medium text-slate-400 border border-slate-700">
                Ctrl + K
              </span>
            </button>

            {/* Random Calculator Trigger */}
            <button
              onClick={handleRandomCalculator}
              className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition shrink-0"
              title="Surprise me with a random calculator"
            >
              <Shuffle className="w-4 h-4" />
              <span>Random Tool</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 text-left flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Instant Client Math</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Calculates in real-time as you type with zero server latency.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 text-left flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">100% Private & Secure</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Your inputs remain strictly inside your browser memory.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 text-left flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Verified Standard Formulas</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Step-by-step formula breakdowns for all 256 tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM METRICS COUNTER BAR */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 font-sans">256</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Professional Calculators</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 font-sans">
              {totalCalculationsCount > 0 ? totalCalculationsCount.toLocaleString() : '100% Free'}
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {totalCalculationsCount > 0 ? 'Total Calculations Performed' : 'Zero Subscriptions'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 font-sans">5</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Core Specialized Domains</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 font-sans">&lt; 1ms</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Execution Latency</div>
          </div>
        </div>
      </section>

      {/* CONTINUE WHERE YOU LEFT OFF BANNER */}
      {lastOpenedCalc && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900/40 via-slate-900 to-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">Continue Where You Left Off</span>
                <h3 className="text-sm font-bold text-white">{lastOpenedCalc.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{lastOpenedCalc.shortDescription}</p>
              </div>
            </div>
            <button
              onClick={() => onSelectCalculator(lastOpenedCalc.id)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0"
            >
              <span>Resume Calculation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Grid className="w-4 h-4" />
              <span>Explore Domains</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Featured Calculator Categories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const catCount = calculators.filter((c) => c.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-md transition text-left group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.badgeColor} mb-3 group-hover:scale-105 transition-transform`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
                  <span>{catCount} Calculators</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* MULTI-SECTION CALCULATOR COLLECTIONS (POPULAR, NEW, TRENDING, RECOMMENDED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collection Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Popular & Verified Tools
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTabFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Top Tools
            </button>
            <button
              onClick={() => setActiveTabFilter('popular')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                activeTabFilter === 'popular'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular</span>
            </button>
            <button
              onClick={() => setActiveTabFilter('new')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                activeTabFilter === 'new'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>New This Week</span>
            </button>
          </div>
        </div>

        {/* Calculator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(activeTabFilter === 'popular'
            ? popularCalculators
            : activeTabFilter === 'new'
            ? newCalculators
            : trendingCalculators
          ).slice(0, 12).map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              isFavorite={favorites.includes(calc.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCalculator={onSelectCalculator}
            />
          ))}
        </div>
      </section>

      {/* RECENTLY VIEWED SECTION */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Recently Opened Tools</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {recentlyViewed.slice(0, 4).map((calcId) => {
              const calc = calculators.find((c) => c.id === calcId);
              if (!calc) return null;
              return (
                <button
                  key={calc.id}
                  type="button"
                  onClick={() => onSelectCalculator(calc.id)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-400 transition text-left group"
                >
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 truncate">
                    {calc.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{calc.shortDescription}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* BLOG & GUIDES BANNER */}
      {onNavigateBlog && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="space-y-2 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Educational Knowledge Center</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Learn the Math Behind Mortgage Rates, TDEE, & Compounding
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore in-depth guide articles explaining financial amortization tables, calorie deficit mathematics, Cap Rates, and debt avalanche strategies.
              </p>
            </div>
            <button
              onClick={onNavigateBlog}
              className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition shrink-0 relative z-10"
            >
              <span>Explore Blog & Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

    </div>
  );
};
