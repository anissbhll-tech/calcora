import React from 'react';
import { Category } from '../types';
import { CALCULATORS } from '../data/calculatorsList';
import { Calculator, DollarSign, HeartPulse, ArrowLeftRight, HardHat, Sparkles, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelectCategory }) => {
  const count = CALCULATORS.filter((c) => c.categoryId === category.id).length;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'DollarSign': return <DollarSign className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'ArrowLeftRight': return <ArrowLeftRight className="w-5 h-5" />;
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Calculator className="w-5 h-5" />;
    }
  };

  return (
    <button
      onClick={() => onSelectCategory(category.id)}
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-200 text-left group flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${category.badgeColor} group-hover:scale-105 transition-transform`}>
            {renderIcon(category.iconName)}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
            {count} tools
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
        <span>Explore Category</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
};
