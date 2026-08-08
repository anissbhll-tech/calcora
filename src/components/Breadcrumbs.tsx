import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculatorsList';
import { CategoryId } from '../types';

interface BreadcrumbsProps {
  categoryId?: CategoryId;
  calculatorId?: string;
  onNavigateHome: () => void;
  onNavigateCategory: (categoryId: CategoryId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categoryId,
  calculatorId,
  onNavigateHome,
  onNavigateCategory,
}) => {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const calculator = CALCULATORS.find((c) => c.id === calculatorId);

  return (
    <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 py-3 overflow-x-auto no-scrollbar">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition shrink-0 font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {category && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 mx-1.5 shrink-0" />
          <button
            onClick={() => onNavigateCategory(category.id)}
            className={`hover:text-blue-600 dark:hover:text-blue-400 transition shrink-0 font-medium ${
              !calculator ? 'text-slate-900 dark:text-slate-100 font-bold' : ''
            }`}
          >
            {category.name}
          </button>
        </>
      )}

      {calculator && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 mx-1.5 shrink-0" />
          <span className="text-slate-900 dark:text-slate-100 font-bold truncate">
            {calculator.title}
          </span>
        </>
      )}
    </nav>
  );
};
