import React from 'react';
import { CalculatorMeta } from '../types';
import { CATEGORIES } from '../data/categories';
import { Calculator, Heart, ArrowRight, Star, Clock, Gauge } from 'lucide-react';

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCalculator: (id: string) => void;
}

const getDifficulty = (id: string, categoryId: string): { label: 'Beginner' | 'Intermediate' | 'Advanced'; color: string } => {
  const advancedIds = [
    'scientific', 'black-scholes-option', 'cap-rate-vs-cash-on-cash', 'quadratic-equation', 
    'matrix-calculator', 'bond-yield', 'bayes-theorem', 'differential-equation', 'standard-deviation'
  ];
  const intermediateIds = [
    'mortgage', 'compound-interest', 'calorie-tdee', 'rental-property-roi', 'amortization-schedule', 
    'roof-rafter', 'concrete-slab', 'refinance', 'auto-loan', 'business-break-even', 'macro-split'
  ];

  if (advancedIds.includes(id) || categoryId === 'algebra') {
    return { label: 'Advanced', color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200/60 dark:border-purple-800' };
  }
  if (intermediateIds.includes(id) || categoryId === 'finance') {
    return { label: 'Intermediate', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200/60 dark:border-blue-800' };
  }
  return { label: 'Beginner', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800' };
};

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calculator,
  isFavorite,
  onToggleFavorite,
  onSelectCalculator,
}) => {
  const category = CATEGORIES.find((c) => c.id === calculator.categoryId);
  const difficulty = getDifficulty(calculator.id, calculator.categoryId);

  return (
    <div
      onClick={() => onSelectCalculator(calculator.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectCalculator(calculator.id);
        }
      }}
      aria-label={`Open ${calculator.title} calculator`}
      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-md dark:hover:border-teal-500/80 transition-all duration-200 text-left group cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Calculator className="w-4 h-4" />
            </div>
            {calculator.isPopular && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1 border border-amber-200/60 dark:border-amber-800">
                <Star className="w-2.5 h-2.5 fill-current" /> Popular
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => onToggleFavorite(calculator.id, e)}
            aria-label={isFavorite ? `Remove ${calculator.title} from favorites` : `Add ${calculator.title} to favorites`}
            className={`p-2 rounded-xl transition-transform active:scale-125 ${
              isFavorite
                ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50'
                : 'text-slate-300 dark:text-slate-600 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
          </button>
        </div>

        <h3 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {calculator.title}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
          {calculator.shortDescription}
        </p>

        <div className="flex items-center gap-2 mt-3 text-[10px]">
          <span className={`px-2 py-0.5 rounded-md font-semibold border ${difficulty.color}`}>
            {difficulty.label}
          </span>
          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> &lt; 1 min
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
        {category && (
          <span className="text-slate-400 font-medium">
            {category.name}
          </span>
        )}
        <span className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Use Tool <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

