import React from 'react';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-200">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Client-Side Architecture</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Privacy Policy</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last Updated: July 2026. Calcora is designed around strict client-side data isolation.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-600" />
            1. Zero Server-Side Financial or Health Storage
          </h2>
          <p>
            Calcora does not store or transmit your calculator inputs (such as income, loan balances, weight, height, or health parameters) to external servers. All calculation logic executes purely inside your web browser environment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-600" />
            2. Local Browser Storage (localStorage)
          </h2>
          <p>
            To provide features like saved favorites and calculation history, Calcora utilizes your browser’s standard <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> API. This data never leaves your device and can be cleared at any time directly through your browser settings or via the "Clear All History" button inside the app drawer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-teal-600" />
            3. Third-Party Analytics & Cookies
          </h2>
          <p>
            Calcora does not use tracking cookies to build personal advertising profiles or sell user metrics to data brokers. Any temporary network activity relates solely to loading standard CDN web assets (fonts, icons).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            4. Contact Regarding Privacy
          </h2>
          <p>
            If you have questions regarding Calcora's privacy posture, you can contact us via our support form or email at <span className="font-mono text-teal-600 dark:text-teal-400">privacy@calcora.com</span>.
          </p>
        </section>

      </div>
    </article>
  );
};
