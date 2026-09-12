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
  BarChart3,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateCalculators?: () => void;
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
  onNavigateCalculators,
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
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-200 print:hidden shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 lg:gap-6">
          
          {/* Brand Logo Area */}
          <div className="flex items-center gap-3 lg:gap-6 shrink-0">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group focus:outline-none rounded-xl p-1 hover:opacity-90 transition-opacity"
              aria-label="Calcora Home"
            >
              <BrandLogo size="md" variant="full" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {onNavigateCalculators && (
                <button
                  onClick={onNavigateCalculators}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 ${
                    currentView === 'calculators'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-500/20 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Calculators</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-100/70 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold">
                    154
                  </span>
                </button>
              )}

              {/* Category Mega Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  onBlur={() => setTimeout(() => setIsCategoryMenuOpen(false), 250)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 ${
                    currentView === 'category'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-500/20 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{t('categories', 'Categories')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${isCategoryMenuOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {isCategoryMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-black/5">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {t('categories', 'Calculation Domains')}
                      </span>
                      <span className="text-slate-400 font-normal">21 Categories</span>
                    </div>
                    <div className="max-h-84 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onNavigateCategory(cat.id);
                            setIsCategoryMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 text-left transition group"
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cat.badgeColor}`}>
                            <Calculator className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                              {cat.name}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {cat.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {onNavigateBlog && (
                <button
                  onClick={onNavigateBlog}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 ${
                    currentView === 'blog' || currentView === 'blogDetail'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-500/20 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{t('blog_guides', 'Knowledge')}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Desktop Quick Search Command Trigger */}
          <div className="hidden md:block flex-1 max-w-md mx-2">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl text-xs sm:text-sm border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all group shadow-2xs"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate text-xs font-medium text-slate-600 dark:text-slate-300">
                  {t('search_placeholder', 'What do you want to calculate?')}
                </span>
              </div>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/60 rounded-md shadow-2xs">
                ⌘ K
              </span>
            </button>
          </div>

          {/* Action Buttons: Clean Mobile (Search + Menu) & Rich Desktop */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop-only Action items */}
            <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
              <LanguageSwitcher compact />

              {/* Saved Favorites Drawer Button */}
              <button
                onClick={() => onOpenDrawer('favorites')}
                className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-indigo-50/70 dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                title={t('saved_favorites', 'Saved Favorites')}
                aria-label="Open saved favorites"
              >
                <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500/20' : 'text-slate-500'}`} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* History Drawer Button */}
              <button
                onClick={() => onOpenDrawer('history')}
                className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-indigo-50/70 dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                title={t('calculation_history', 'Calculation History')}
                aria-label="Open calculation history"
              >
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {historyCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {historyCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Search Icon Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search calculators"
              className="md:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 transition"
            >
              <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 md:hidden transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-indigo-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150">
            {/* Quick Search Trigger in Drawer */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>Search 154 calculators...</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-400">
                ⌘ K
              </span>
            </button>

            {/* Main Navigation Links */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-2">
                Navigation
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onNavigateHome();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition ${
                    currentView === 'home'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/60 dark:border-slate-700'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-indigo-600" />
                  <span>Home</span>
                </button>

                {onNavigateCalculators && (
                  <button
                    onClick={() => {
                      onNavigateCalculators();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition ${
                      currentView === 'calculators'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/60 dark:border-slate-700'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Grid className="w-4 h-4 text-indigo-600" />
                    <span>All 154 Tools</span>
                  </button>
                )}

                {onNavigateBlog && (
                  <button
                    onClick={() => {
                      onNavigateBlog();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition ${
                      currentView === 'blog' || currentView === 'blogDetail'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/60 dark:border-slate-700'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Guides & Math</span>
                  </button>
                )}

                {onNavigateAbout && (
                  <button
                    onClick={() => {
                      onNavigateAbout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 text-left"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>About Calcora</span>
                  </button>
                )}
              </div>
            </div>

            {/* User Activity Shortcuts */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-2">
                Saved & History
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDrawer('favorites');
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Favorites</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600">
                    {favoritesCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDrawer('history');
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>History</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                    {historyCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Language Selection Row */}
            <div className="pt-1 flex items-center justify-between px-1">
              <span className="text-xs font-medium text-slate-500">Language:</span>
              <LanguageSwitcher />
            </div>

            {/* Categories List */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-2">
                Browse by Category (21)
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onNavigateCategory(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 text-left hover:bg-indigo-50 dark:hover:bg-slate-700 truncate"
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${cat.badgeColor}`}>
                      <Calculator className="w-3 h-3" />
                    </div>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};



