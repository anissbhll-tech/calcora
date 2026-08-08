import React from 'react';
import { Cookie, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CookiePage: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      <header className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
            <Cookie className="w-3.5 h-3.5 text-teal-400" />
            <span>Cookie & Storage Policy</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last updated: July 2026. Calcora utilizes local browser storage strictly for user experience preferences.
          </p>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. What Are Cookies & Local Storage?</h2>
          <p>
            Cookies and LocalStorage are small data files saved directly inside your web browser. They allow websites to remember your settings, saved calculation history, and personal preference states across visits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. How Calcora Uses Local Storage</h2>
          <p>
            Calcora runs 100% client-side inside your browser. We do NOT use persistent tracking cookies or selling trackers. We only store essential preference state in your browser's <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">localStorage</code>:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 pt-2">
            <li><strong>Favorites List (<code className="font-mono text-[11px]">calcora_favorites</code>):</strong> Remembers your pinned favorite calculators.</li>
            <li><strong>Calculation History (<code className="font-mono text-[11px]">calcora_history</code>):</strong> Stores your recent local calculation summaries so you can review previous results.</li>
            <li><strong>Recently Viewed (<code className="font-mono text-[11px]">calcora_recently_viewed</code>):</strong> Saves quick shortcuts to calculators you opened.</li>
            <li><strong>Theme Preference:</strong> Remembers your Dark Mode or Light Mode toggle choice.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Third-Party Partners & Ad Units</h2>
          <p>
            If non-intrusive display advertisements (e.g., Google AdSense) are served on Calcora, third-party vendors may use cookies to serve ads based on prior website visits. You can opt out of personalized advertising by visiting Google's Ads Settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Managing Your Preferences</h2>
          <p>
            You can clear or disable your local calculation history and favorites at any time using the "Clear History" button inside Calcora's History Drawer, or by clearing your web browser cache.
          </p>
        </section>
      </div>
    </article>
  );
};
