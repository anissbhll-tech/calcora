import React from 'react';
import { ShieldCheck, Zap, Calculator, CheckCircle2, Award, Heart, BookOpen } from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <header className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span>Built for Precision & Speed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About <span className="text-teal-400">Calcora</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Calcora is a modern online mathematical and financial calculation suite engineered to deliver instant, accurate, and completely private results across 22 specialized domain tools.
          </p>
        </div>
      </header>

      {/* Mission & Core Pillars */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Our Engineering Principles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Instant Client Math</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every formula executes directly in your browser using optimized JavaScript math routines. No waiting for server responses or artificial delay loaders.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Zero Third-Party Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your financial figures, health metrics, and personal parameters remain entirely strictly on your client device in memory or localStorage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Transparent Logic</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Each calculator includes formula documentation, step-by-step breakdowns, and preset scenarios to help you understand the mathematics behind your numbers.
            </p>
          </div>
        </div>
      </section>

      {/* Domain Coverage */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">What We Measure & Calculate</h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Calcora covers six primary domains with 22 dedicated calculators:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <h4 className="text-xs font-bold text-teal-700 dark:text-teal-300">Finance & Loans</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Mortgages, compound interest, auto loans, credit card payoffs, ROI, and discount calculations.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <h4 className="text-xs font-bold text-teal-700 dark:text-teal-300">Health & Fitness</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">BMI index, Mifflin-St Jeor TDEE calorie estimator, US Navy body fat %, target heart rate zones, and hydration goals.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <h4 className="text-xs font-bold text-teal-700 dark:text-teal-300">Math & Algebra</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Full scientific math functions, percentage changes, quadratic equation solver, statistics, and trigonometry.</p>
          </div>
        </div>
      </section>

      {/* CTA Home */}
      <div className="text-center pt-4">
        <button
          onClick={onNavigateHome}
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition shadow-sm"
        >
          Explore All Calculators
        </button>
      </div>
    </article>
  );
};
