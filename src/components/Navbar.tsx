import React, { useState } from 'react';
import { 
  Calculator, 
  Search, 
  Heart, 
  Clock, 
  ChevronDown, 
  Menu, 
  X, 
  Grid,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateCategory: (categoryId: CategoryId) => void;
  onOpenSearch: () => void;
  onOpenDrawer: (tab: 'favorites' | 'history') => void;
  favoritesCount: number;
  historyCount: number;
  currentView: string;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigateBlog?: () => void;
  onNavigateAnalytics?: () => void;
  onNavigateOpportunityScout?: () => void;
  onNavigateForSale?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateCategory,
  onOpenSearch,
  onOpenDrawer,
  favoritesCount,
  historyCount,
  currentView,
  onNavigateAbout,
  onNavigateContact,
  onNavigateBlog,
  onNavigateAnalytics,
  onNavigateOpportunityScout,
  onNavigateForSale,
}) => {
  const { t } = useLanguage();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Bento Logo Brand */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group focus:outline-none rounded-xl p-1 hover:opacity-90 transition-opacity"
            >
              <BrandLogo size="md" variant="full" />
            </button>

            {/* Desktop Navigation Category Trigger & Links */}
            <div className="relative hidden md:flex items-center gap-1">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                onBlur={() => setTimeout(() => setIsCategoryMenuOpen(false), 200)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Grid className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{t('categories', 'Categories')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {onNavigateOpportunityScout && (
                <button
                  onClick={onNavigateOpportunityScout}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 px-3 py-1.5 rounded-xl transition border border-amber-200 dark:border-amber-800 shadow-xs"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>20 Best Businesses</span>
                </button>
              )}

              {onNavigateBlog && (
                <button
                  onClick={onNavigateBlog}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>{t('blog_guides', 'Blog & Guides')}</span>
                </button>
              )}

              {onNavigateAbout && (
                <button
                  onClick={onNavigateAbout}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {t('about', 'About')}
                </button>
              )}

              {onNavigateContact && (
                <button
                  onClick={onNavigateContact}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {t('contact', 'Contact')}
                </button>
              )}

              {onNavigateForSale && (
                <button
                  onClick={onNavigateForSale}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1.5 rounded-lg border border-amber-500/20 transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Buy Calcora</span>
                </button>
              )}

              {onNavigateAnalytics && (
                <button
                  onClick={onNavigateAnalytics}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
                  <span>{t('analytics', 'Analytics')}</span>
                </button>
              )}

              {/* Bento Dropdown Menu */}
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1.5">
                    {t('categories', 'Browse Categories')}
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onNavigateCategory(cat.id);
                        setIsCategoryMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-teal-50/80 dark:hover:bg-slate-800 text-left transition group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cat.badgeColor}`}>
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {cat.name}
                        </p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bento Quick Search Bar */}
          <div className="flex-1 max-w-md mx-1">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-xs sm:text-sm border-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition group"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors shrink-0" />
                <span className="truncate">{t('search_placeholder', 'Search mortgage, calories, scientific, percentage...')}</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-xs">
                {t('search_shortcut', 'Ctrl K')}
              </span>
            </button>
          </div>

          {/* Bento Navigation Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Language Switcher Dropdown */}
            <LanguageSwitcher compact />

            <button
              onClick={() => onOpenDrawer('favorites')}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={t('saved_favorites', 'Saved Favorites')}
            >
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onOpenDrawer('history')}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={t('calculation_history', 'Calculation History')}
            >
              <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              {historyCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1">
              Navigation
            </div>
            {onNavigateBlog && (
              <button
                onClick={() => {
                  onNavigateBlog();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> {t('blog_guides', 'Blog & Guides')}
              </button>
            )}
            {onNavigateAnalytics && (
              <button
                onClick={() => {
                  onNavigateAnalytics();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" /> {t('analytics', 'Analytics Dashboard')}
              </button>
            )}
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1 pt-2">
              Calculator Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onNavigateCategory(cat.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 text-left hover:bg-teal-50 dark:hover:bg-slate-700"
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${cat.badgeColor}`}>
                    <Calculator className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

