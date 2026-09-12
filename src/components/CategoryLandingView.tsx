import React, { useState } from 'react';
import { 
  CalculatorMeta, 
  CategoryId 
} from '../types';
import { CATEGORIES } from '../data/categories';
import { CATEGORY_FAQS } from '../data/categoryFaqs';
import { CalculatorCard } from './CalculatorCard';
import { 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  BookOpen, 
  CheckCircle2, 
  Grid, 
  TrendingUp, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { AdSlot } from './common/AdSlot';

interface CategoryLandingViewProps {
  categoryId: CategoryId;
  calculators: CalculatorMeta[];
  favorites: string[];
  onToggleFavorite: (calcId: string) => void;
  onSelectCalculator: (calcId: string) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onNavigateHome: () => void;
}

export const CategoryLandingView: React.FC<CategoryLandingViewProps> = ({
  categoryId,
  calculators,
  favorites,
  onToggleFavorite,
  onSelectCalculator,
  onSelectCategory,
  onNavigateHome,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const category = CATEGORIES.find((c) => c.id === categoryId);
  const categoryCalcs = calculators.filter((c) => c.categoryId === categoryId);

  if (!category) return null;

  // Filter subsets
  const popularCalcs = categoryCalcs.filter((c) => c.isPopular);
  const beginnerCalcs = categoryCalcs.slice(0, 4);
  const otherCategories = CATEGORIES.filter((c) => c.id !== categoryId);

  // Category specific FAQs with full 21 category coverage
  const faqs = CATEGORY_FAQS[categoryId] || [
    {
      q: `What makes Calcora's ${category.name} calculators unique?`,
      a: `Calcora offers verified ${category.name} tools with instant zero-latency math execution, step-by-step formula explanations, and complete client-side data privacy.`,
    },
    {
      q: 'Are these tools completely free to use?',
      a: 'Yes, 100% free with no login required, zero subscriptions, and unrestricted result downloads.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-200">
      
      {/* CATEGORY HERO BANNER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Verified Domain Directory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {category.name} Calculators ({categoryCalcs.length})
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {category.description} Explore our comprehensive suite of verified calculation tools engineered for high mathematical accuracy, step-by-step formula breakdowns, and instant browser performance.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="w-4 h-4" /> 100% Free Access
            </span>
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-4 h-4" /> Client-Side Privacy
            </span>
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" /> Verified Equations
            </span>
          </div>
        </div>
      </div>

      {/* POPULAR IN THIS CATEGORY */}
      {popularCalcs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Most Popular in {category.name}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCalcs.map((calc) => (
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
      )}

      {/* ALL CALCULATORS IN THIS CATEGORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              All {category.name} Calculation Tools ({categoryCalcs.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select any tool below to launch interactive inputs, presets, and formula guides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryCalcs.map((calc) => (
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

      {/* EDUCATIONAL GUIDE & HELPFUL TIPS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Educational Guide & Practical Tips</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Understanding {category.name} Calculations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300">1. Verify Key Inputs</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always ensure input values (e.g. annual interest rates vs monthly interest, or kilograms vs pounds) match required unit standards for maximum output accuracy.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300">2. Review Formula Breakdown</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every calculator provides step-by-step mathematical logic explaining how output figures are derived from raw inputs.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300">3. Print & Export Results</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use the built-in Print and Copy summary controls to save reports to PDF, client emails, or spreadsheet schedules.
            </p>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Category FAQ</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions About {category.name}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NON-INTRUSIVE AD SLOT */}
      <AdSlot slotId={`calcora-category-${categoryId}`} format="responsive" />

      {/* RELATED CATEGORIES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Explore Related Domains
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {otherCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition text-left flex items-center justify-between group"
            >
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {cat.name}
                </p>
                <p className="text-[10px] text-slate-400">Browse tools</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all" />
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
