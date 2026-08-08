import React from 'react';
import { ShieldAlert, Info, AlertTriangle } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      <header className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Educational & Mathematical Notice</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            General Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Important notices regarding financial estimates, health benchmarks, engineering formulas, and legal responsibility.
          </p>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Educational & Informational Purpose Only</h2>
          <p>
            All tools, formulas, outputs, schedules, and calculators provided on Calcora are designed strictly for educational, planning, and informational purposes. While every formula is tested against clinical or financial standards, outputs should be treated as estimations, not definitive legal or professional advice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-amber-600 dark:text-amber-400">2. Financial & Mortgage Disclaimer</h2>
          <p>
            Financial calculators (mortgages, loan payoff, refinancing, compound interest, cap rates, business break-even) do not constitute financial advice, credit approvals, or binding lender quotes. Actual loan terms depend on individual creditworthiness, interest rate fluctuations, escrow property taxes, and lender underwriting fees. Always consult a licensed CPA or certified financial planner.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-rose-600 dark:text-rose-400">3. Health & Medical Disclaimer</h2>
          <p>
            Health and fitness calculators (BMI, TDEE, BMR, blood pressure categories, ovulation windows, body surface area, target heart rate) are based on statistical population averages (e.g. AHA, WHO, Mifflin-St Jeor guidelines). They are NOT substitutes for professional medical diagnosis, clinical advice, or treatment by a qualified physician. Never delay seeking professional medical care because of a calculated index on this platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-teal-600 dark:text-teal-400">4. Construction & Engineering Disclaimer</h2>
          <p>
            Construction calculators (concrete slab volume, roof rafter pitch, drywall sheets, tile square footage, stair risers) estimate material needs based on standard geometric formulas. Actual job site requirements may vary based on soil conditions, local municipal building codes, architectural design, and material waste factors. Always verify material orders with a licensed contractor.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            Under no circumstances shall Calcora or its authors be held liable for any direct, indirect, incidental, or consequential damages resulting from the reliance on or use of information calculated on this website.
          </p>
        </section>
      </div>
    </article>
  );
};
