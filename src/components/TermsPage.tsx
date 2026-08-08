import React from 'react';
import { AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-200">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
          <FileText className="w-3.5 h-3.5" />
          <span>Usage Guidelines</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Terms of Use</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last Updated: July 2026. Please review our terms before using Calcora calculators.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-900 dark:text-amber-200">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            General Educational & Informational Disclaimer
          </h2>
          <p className="text-xs leading-relaxed">
            All calculations, schedules, formulas, indices, and currency values provided on Calcora are for general informational and educational purposes only. They do not constitute formal financial advice, tax planning, medical diagnosis, or certified structural engineering specs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            1. Financial & Mortgage Calculations
          </h2>
          <p>
            Mortgage amortization schedules, compound interest estimates, credit card payoff times, and loan values depend on individual lender terms, compounding schedules, property taxes, HOA fees, and insurance rates. Always verify exact rates with qualified mortgage advisors or financial institutions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            2. Health & Fitness Metrics
          </h2>
          <p>
            BMI, TDEE calorie estimates, Navy body fat ratios, target heart rates, and daily water recommendations are standard mathematical estimations based on peer-reviewed equations (e.g. Mifflin-St Jeor, US Navy method). They are not a substitute for clinical medical evaluation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            3. Currency & Unit Conversions
          </h2>
          <p>
            Currency exchange conversions utilize reference static benchmark rates for rapid estimation. They do not reflect real-time live interbank forex execution prices or institutional conversion spreads.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            4. Limitation of Liability
          </h2>
          <p>
            Calcora and its operators are not liable for decisions or actions taken based on calculator outputs. Users assume full responsibility for verifying critical calculations with certified domain specialists.
          </p>
        </section>

      </div>
    </article>
  );
};
