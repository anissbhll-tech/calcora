import React from 'react';
import { ShieldCheck, Zap, CheckCircle2, BarChart3 } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateCategory: (categoryId: CategoryId) => void;
  onSelectCalculator: (calculatorId: string) => void;
  onNavigateCalculators?: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigatePrivacy?: () => void;
  onNavigateTerms?: () => void;
  onNavigateBlog?: () => void;
  onNavigateCookie?: () => void;
  onNavigateDisclaimer?: () => void;
  onNavigateAnalytics?: () => void;
  onNavigateForSale?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateCategory,
  onSelectCalculator,
  onNavigateCalculators,
  onNavigateAbout,
  onNavigateContact,
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateBlog,
  onNavigateCookie,
  onNavigateDisclaimer,
  onNavigateAnalytics,
  onNavigateForSale,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Value Highlights - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{t('feature_instant_title', '100% Client-Side Math')}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t('feature_instant_desc', 'All calculator routines execute in your browser with instant zero-latency feedback.')}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{t('feature_private_title', 'Private & Secure')}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t('feature_private_desc', 'Your figures, inputs, and calculations remain local to your browser and device.')}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{t('feature_verified_title', 'Verified Formulas')}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t('feature_verified_desc', 'Free online access to financial schedules, health formulas, algebra, and construction tools.')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={onNavigateHome}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
                C
              </div>
              <span className="text-xl font-bold text-white tracking-tight">{t('app_title', 'Calcora')}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Calcora is a high-performance online calculation suite housing 154 verified calculation tools, 21 domain category hubs, and instant client-side math execution.
            </p>
            {onNavigateCalculators && (
              <div>
                <button
                  type="button"
                  onClick={onNavigateCalculators}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-xs font-semibold transition"
                >
                  <span>Explore Directory (154 Tools) →</span>
                </button>
              </div>
            )}
            <div className="flex items-center gap-3 pt-2">
              <LanguageSwitcher />
            </div>
            <div className="text-xs text-slate-500 pt-1">
              © {new Date().getFullYear()} Calcora Inc. All rights reserved.
            </div>
          </div>

          {/* Quick Links Categories */}
          <div>
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Finance & Loans</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectCalculator('mortgage')} className="hover:text-indigo-400 transition">
                  Mortgage Amortization
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCalculator('compound-interest')} className="hover:text-indigo-400 transition">
                  Compound Interest
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCalculator('auto-loan')} className="hover:text-indigo-400 transition">
                  Auto Financing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCalculator('rental-property-roi')} className="hover:text-indigo-400 transition">
                  Rental ROI & Cap Rate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('finance')} className="hover:text-indigo-400 text-indigo-300/80 transition">
                  All Finance Calculators →
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Health & Science</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectCalculator('bmi')} className="hover:text-indigo-400 transition">
                  BMI Index
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCalculator('calorie-tdee')} className="hover:text-indigo-400 transition">
                  Calorie & TDEE
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCalculator('body-fat')} className="hover:text-indigo-400 transition">
                  US Navy Body Fat %
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCalculator('unit-converter')} className="hover:text-indigo-400 transition">
                  Unit Conversions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('health')} className="hover:text-indigo-400 text-indigo-300/80 transition">
                  All Health Calculators →
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Resources & Legal</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {onNavigateBlog && (
                <li>
                  <button onClick={onNavigateBlog} className="hover:text-indigo-400 transition font-semibold text-indigo-300">
                    {t('blog_guides', 'Guides & Blog')}
                  </button>
                </li>
              )}
              {onNavigateAnalytics && (
                <li>
                  <button onClick={onNavigateAnalytics} className="hover:text-indigo-400 transition font-semibold text-indigo-400 flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>{t('analytics', 'Analytics Dashboard')}</span>
                  </button>
                </li>
              )}
              {onNavigateAbout && (
                <li>
                  <button onClick={onNavigateAbout} className="hover:text-indigo-400 transition">
                    {t('about', 'About Calcora')}
                  </button>
                </li>
              )}
              {onNavigateContact && (
                <li>
                  <button onClick={onNavigateContact} className="hover:text-indigo-400 transition">
                    {t('contact', 'Contact & Support')}
                  </button>
                </li>
              )}
              {onNavigatePrivacy && (
                <li>
                  <button onClick={onNavigatePrivacy} className="hover:text-indigo-400 transition">
                    {t('privacy_policy', 'Privacy Policy')}
                  </button>
                </li>
              )}
              {onNavigateTerms && (
                <li>
                  <button onClick={onNavigateTerms} className="hover:text-indigo-400 transition">
                    {t('terms_of_use', 'Terms of Use')}
                  </button>
                </li>
              )}
              {onNavigateCookie && (
                <li>
                  <button onClick={onNavigateCookie} className="hover:text-indigo-400 transition">
                    {t('cookie_policy', 'Cookie Policy')}
                  </button>
                </li>
              )}
              {onNavigateDisclaimer && (
                <li>
                  <button onClick={onNavigateDisclaimer} className="hover:text-indigo-400 transition">
                    {t('disclaimer', 'Disclaimer')}
                  </button>
                </li>
              )}
              {onNavigateForSale && (
                <li>
                  <button onClick={onNavigateForSale} className="hover:text-amber-400 text-amber-300 font-medium transition flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>Acquisition / For Sale</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Complete 21 Domain Category Index Hub Grid */}
        <div className="py-8 border-t border-slate-800/80">
          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
            Browse All 21 Calculation Categories
          </h5>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigateCategory(cat.id)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-indigo-950/60 border border-slate-700/60 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 text-xs transition flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/80 text-slate-400">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Disclaimer: Calcora calculators are for educational and planning purposes only.</p>
          <div className="flex items-center gap-4 text-slate-400">
            {onNavigatePrivacy && (
              <button onClick={onNavigatePrivacy} className="hover:text-indigo-400 transition">Privacy</button>
            )}
            {onNavigateTerms && (
              <button onClick={onNavigateTerms} className="hover:text-indigo-400 transition">Terms</button>
            )}
            {onNavigateDisclaimer && (
              <button onClick={onNavigateDisclaimer} className="hover:text-indigo-400 transition">Disclaimer</button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};

