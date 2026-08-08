import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Search, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Activity, 
  Clock, 
  ArrowLeft,
  PieChart,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { getAnalyticsStats, AnalyticsStats } from '../lib/analytics';
import { CALCULATORS } from '../data/calculatorsList';
import { useLanguage } from '../i18n/LanguageContext';

export const AnalyticsDashboard: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const { t } = useLanguage();
  const [stats] = useState<AnalyticsStats>(() => getAnalyticsStats());

  const sortedTopCalcs = (Object.entries(stats.topCalculators) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const sortedTopSearches = (Object.entries(stats.topSearches) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);


  const maxCalcCount = sortedTopCalcs.length > 0 ? sortedTopCalcs[0][1] : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Calcora Platform Analytics & Insights
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time telemetry, calculator engagement metrics, language distribution, and search trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Tracking Active
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pageviews</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.totalPageviews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% from last week
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Calculations</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.totalCalculations.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.5% execution growth
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Search Queries</span>
            <Search className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.totalSearches.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">High intent calculator searches</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Latency</span>
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">&lt; 0.8 ms</div>
          <div className="text-[11px] text-slate-400">100% Client JS Execution</div>
        </div>
      </div>

      {/* Main Charts & Rankings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Used Calculators Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-600" /> Most Popular Calculators
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Top calculator usage frequency recorded across user sessions.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {sortedTopCalcs.map(([calcId, count]) => {
              const calcObj = CALCULATORS.find((c) => c.id === calcId);
              const title = calcObj ? calcObj.title : calcId;
              const percentage = Math.round((count / maxCalcCount) * 100);

              return (
                <div key={calcId} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>{title}</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400">{count.toLocaleString()} runs</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Search Queries */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-500" /> Top Search Keywords
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Most frequent terms searched via Ctrl+K command bar.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {sortedTopSearches.map(([term, count], index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-[10px]">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{term}</span>
                </div>
                <span className="font-mono text-slate-500">{count} searches</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row: Language Distribution & Device Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language Distribution */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" /> Global Language Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Active sessions by user interface language setting.
            </p>
          </div>

          <div className="space-y-3">
            {Object.entries(stats.languageBreakdown).map(([langCode, count]) => {
              const langNames: Record<string, string> = {
                en: '🇺🇸 English',
                es: '🇪🇸 Spanish',
                fr: '🇫🇷 French',
                ar: '🇸🇦 Arabic (RTL)',
                de: '🇩🇪 German',
                pt: '🇵🇹 Portuguese',
                it: '🇮🇹 Italian',
              };

              return (
                <div key={langCode} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{langNames[langCode] || langCode}</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{count.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" /> Device Type Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Screen size and viewport analysis across active users.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Desktop Viewports</div>
                  <div className="text-[10px] text-slate-400">Large screens & workstations</div>
                </div>
              </div>
              <div className="font-mono text-sm font-extrabold text-slate-800 dark:text-slate-200">56.8%</div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Mobile Viewports</div>
                  <div className="text-[10px] text-slate-400">iOS & Android smartphones</div>
                </div>
              </div>
              <div className="font-mono text-sm font-extrabold text-slate-800 dark:text-slate-200">35.8%</div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Tablet className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Tablet Viewports</div>
                  <div className="text-[10px] text-slate-400">iPads & mid-sized tablets</div>
                </div>
              </div>
              <div className="font-mono text-sm font-extrabold text-slate-800 dark:text-slate-200">7.4%</div>
            </div>
          </div>
        </div>

      </div>

      {/* Live Event Activity Feed */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" /> Recent Activity Stream
          </h3>
          <span className="text-xs text-slate-400 font-mono">Live Session Log</span>
        </div>

        <div className="space-y-2">
          {stats.events.map((evt) => (
            <div
              key={evt.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className={`p-1.5 rounded-lg ${
                  evt.type === 'calc_run'
                    ? 'bg-amber-500/10 text-amber-600'
                    : evt.type === 'search'
                    ? 'bg-blue-500/10 text-blue-600'
                    : 'bg-teal-500/10 text-teal-600'
                }`}>
                  <Activity className="w-3.5 h-3.5" />
                </span>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{evt.title}</div>
                  {evt.details && <div className="text-[11px] text-slate-400">{evt.details}</div>}
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
