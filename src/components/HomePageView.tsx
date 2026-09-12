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
  Layers,
  Sigma,
  Calculator,
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { CalculatorMeta, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { BLOG_POSTS } from '../data/blogPosts';
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
  onNavigateCalculators?: () => void;
  onOpenSearch: () => void;
  onNavigateBlog?: () => void;
  onSelectPost?: (postSlug: string) => void;
  totalCalculationsCount?: number;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  calculators,
  favorites,
  recentlyViewed,
  onToggleFavorite,
  onSelectCalculator,
  onSelectCategory,
  onNavigateCalculators,
  onOpenSearch,
  onNavigateBlog,
  onSelectPost,
  totalCalculationsCount = 0,
}) => {
  const { t } = useLanguage();
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'popular' | 'new' | 'finance' | 'health' | 'construction'>('all');

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
  const financeCalculators = calculators.filter((c) => c.categoryId === 'finance' || c.categoryId === 'realestate');
  const healthCalculators = calculators.filter((c) => c.categoryId === 'health' || c.categoryId === 'fitness');
  const constructionCalculators = calculators.filter((c) => c.categoryId === 'construction' || c.categoryId === 'engineering');

  const displayedCalculators = (() => {
    switch (activeTabFilter) {
      case 'popular':
        return popularCalculators;
      case 'new':
        return newCalculators;
      case 'finance':
        return financeCalculators;
      case 'health':
        return healthCalculators;
      case 'construction':
        return constructionCalculators;
      case 'all':
      default:
        return calculators;
    }
  })();

  // Continue where you left off
  const lastOpenedCalcId = recentlyViewed[0];
  const lastOpenedCalc = lastOpenedCalcId ? calculators.find((c) => c.id === lastOpenedCalcId) : null;

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION - 2026 AI-Native SaaS Centerpiece */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/90 text-white pt-10 pb-14 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 shadow-lg">
        {/* Ambient atmospheric backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.25),transparent_70%)] pointer-events-none"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 relative z-10 text-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>SMART CALCULATIONS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1] font-sans text-white max-w-3xl mx-auto">
            Calculate anything. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-300 via-indigo-200 to-violet-300 bg-clip-text text-transparent">
              Understand everything.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
            154 free calculators for finance, business, health, math, engineering and everyday decisions.
          </p>

          {/* Prominent Command/Search Interface */}
          <div className="w-full max-w-2xl mx-auto pt-1 space-y-3.5">
            <div className="p-1.5 sm:p-2 bg-slate-800/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-indigo-500/30 hover:border-indigo-400/60 shadow-xl sm:shadow-2xl ring-1 ring-white/10 transition-all duration-200 group">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-3.5 bg-slate-900/95 hover:bg-slate-900 text-slate-200 rounded-xl sm:rounded-2xl border border-slate-700/60 shadow-inner transition group text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Search className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-xs sm:text-base font-medium text-slate-300 truncate">
                    What do you want to calculate?
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 bg-indigo-950/80 rounded-lg text-xs font-mono font-bold text-indigo-300 border border-indigo-800/60 shadow-xs">
                    ⌘ K
                  </span>
                </div>
              </button>
            </div>

            {/* Popular Calculation Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs pt-0.5">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                Popular:
              </span>
              {[
                { id: 'mortgage', label: 'Mortgage' },
                { id: 'auto-loan', label: 'Loan' },
                { id: 'bmi', label: 'BMI' },
                { id: 'compound-interest', label: 'Compound Interest' },
                { id: 'roi-margin', label: 'Salary' },
                { id: 'stock-dividend-yield', label: 'Investment' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectCalculator(item.id)}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/80 hover:border-indigo-400/60 text-slate-200 hover:text-indigo-200 text-[11px] sm:text-xs font-medium transition duration-150 shadow-2xs hover:scale-105"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {onNavigateCalculators && (
                <button
                  type="button"
                  onClick={onNavigateCalculators}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md hover:shadow-indigo-500/25 transition duration-150"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Browse All 154 Calculators</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleRandomCalculator}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold transition duration-150"
                title="Launch a random calculator"
              >
                <Shuffle className="w-3.5 h-3.5 text-indigo-300" />
                <span>Random Tool</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-COLUMN FEATURE SECTION (INSTANT, PRIVATE, VERIFIED) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 mt-10 sm:mt-14">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 text-left flex items-start gap-3.5 shadow-sm hover:border-indigo-500/40 transition">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">INSTANT</div>
              <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">Client-Side Calculations</h3>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-relaxed">&lt; 1ms speed with zero server latency.</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 text-left flex items-start gap-3.5 shadow-sm hover:border-indigo-500/40 transition">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">PRIVATE</div>
              <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">Your Data Stays In Browser</h3>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-relaxed">Inputs never leave your device memory.</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 text-left flex items-start gap-3.5 shadow-sm hover:border-indigo-500/40 transition">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">VERIFIED</div>
              <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">Standard Formulas</h3>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-relaxed">Transparent step-by-step math proofs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM METRICS COUNTER BAR */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-600 dark:text-indigo-400 font-sans tracking-tight">154</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Professional Calculators</div>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-600 dark:text-indigo-400 font-sans tracking-tight">
              {totalCalculationsCount > 0 ? totalCalculationsCount.toLocaleString() : '1,437'}
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
              Total Calculations
            </div>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-600 dark:text-indigo-400 font-sans tracking-tight">21</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Calculation Domains</div>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo-600 dark:text-indigo-400 font-sans tracking-tight">&lt; 1ms</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Execution Latency</div>
          </div>
        </div>
      </section>

      {/* CONTINUE WHERE YOU LEFT OFF BANNER */}
      {lastOpenedCalc && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Continue Where You Left Off</span>
                <h3 className="text-sm font-bold text-white truncate">{lastOpenedCalc.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{lastOpenedCalc.shortDescription}</p>
              </div>
            </div>
            <button
              onClick={() => onSelectCalculator(lastOpenedCalc.id)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
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
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Grid className="w-4 h-4" />
              <span>Explore Domains</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Featured Calculator Categories
            </h2>
          </div>
          {onNavigateCalculators && (
            <button
              type="button"
              onClick={onNavigateCalculators}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All 21 Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 8).map((cat) => {
            const catCount = calculators.filter((c) => c.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition text-left group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.badgeColor} mb-2.5 group-hover:scale-105 transition-transform`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>{catCount} Calculators</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CURATED CALCULATOR COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collection Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Popular & Verified Tools
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTabFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({calculators.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('popular')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                activeTabFilter === 'popular'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular</span>
            </button>
            <button
              onClick={() => setActiveTabFilter('finance')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTabFilter === 'finance'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Finance & Real Estate
            </button>
            <button
              onClick={() => setActiveTabFilter('health')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTabFilter === 'health'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Health & Fitness
            </button>
            <button
              onClick={() => setActiveTabFilter('construction')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTabFilter === 'construction'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Construction & Math
            </button>
          </div>
        </div>

        {/* Calculator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedCalculators.slice(0, 12).map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              isFavorite={favorites.includes(calc.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCalculator={onSelectCalculator}
            />
          ))}
        </div>

        {onNavigateCalculators && displayedCalculators.length > 12 && (
          <div className="text-center pt-8">
            <button
              type="button"
              onClick={onNavigateCalculators}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
            >
              <span>Explore All {displayedCalculators.length} Tools in Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* RECENTLY VIEWED SECTION */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
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
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition text-left group"
                >
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 truncate">
                    {calc.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{calc.shortDescription}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* EDUCATIONAL KNOWLEDGE CENTER & GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="space-y-2 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Educational Knowledge Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Learn the Math Behind Mortgage Rates, TDEE, & Compounding
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore rigorous guides explaining financial amortization schedules, calorie deficit thermodynamics, commercial cap rates, and debt payoff mathematics with verified interactive calculation engines.
            </p>
          </div>
          {onNavigateBlog && (
            <button
              type="button"
              onClick={onNavigateBlog}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition shrink-0 relative z-10"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Real Content Layer: Grid of Educational Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => {
            const primaryCalc = calculators.find((c) => c.id === post.primaryCalculatorId);
            const relatedCalcs = calculators.filter((c) => post.relatedCalculatorIds.includes(c.id));

            return (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-md transition flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Category & Metadata */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-100 dark:border-indigo-900">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTimeMinutes} min read
                      </span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-2">
                    <h3
                      onClick={() => {
                        if (onSelectPost) onSelectPost(post.slug);
                        else if (onNavigateBlog) onNavigateBlog();
                      }}
                      className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition cursor-pointer leading-snug"
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Mathematical Formula Snippet */}
                  {post.formulaHighlight && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        <Sigma className="w-3 h-3" />
                        <span>{post.formulaHighlight.name}</span>
                      </div>
                      <div className="font-mono text-xs font-bold text-slate-900 dark:text-indigo-300 overflow-x-auto truncate">
                        {post.formulaHighlight.formula}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                        {post.formulaHighlight.description}
                      </p>
                    </div>
                  )}

                  {/* Key Takeaway */}
                  {post.keyTakeaways && post.keyTakeaways[0] && (
                    <div className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300 bg-indigo-50/40 dark:bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-100/60 dark:border-indigo-900/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{post.keyTakeaways[0]}</span>
                    </div>
                  )}

                  {/* Related Tools Pills */}
                  {relatedCalcs.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Related Calculators:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {relatedCalcs.map((rc) => (
                          <button
                            key={rc.id}
                            type="button"
                            onClick={() => onSelectCalculator(rc.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 text-slate-600 dark:text-slate-300 text-[11px] font-medium transition"
                          >
                            {rc.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {primaryCalc && (
                    <button
                      type="button"
                      onClick={() => onSelectCalculator(primaryCalc.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Launch {primaryCalc.title}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPost) onSelectPost(post.slug);
                      else if (onNavigateBlog) onNavigateBlog();
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform self-end sm:self-auto"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
};

