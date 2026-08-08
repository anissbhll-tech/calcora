import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, Sparkles, Check, Calculator, ArrowRight, Zap, Copy, Heart } from 'lucide-react';

export const BrandStyleGuide: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          Phase 1 — Brand Identity & Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Calcora Brand Style Guide
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-3xl leading-relaxed">
          The core aesthetic design system behind Calcora: mathematical precision, clean typography, low-contrast subtle elevation, high-contrast readability, and zero visual clutter.
        </p>
      </div>

      {/* Brand Logos */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>Brand Marks & Logo Lockups</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <BrandLogo size="lg" variant="full" />
            <span className="text-xs font-mono text-slate-400">Primary Full Lockup</span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <BrandLogo size="lg" variant="full" />
            <span className="text-xs font-mono text-slate-400">Dark Canvas Variant</span>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <BrandLogo size="lg" variant="icon" />
            <span className="text-xs font-mono text-slate-400">Icon App Mark</span>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Color System & Contrast Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-teal-600 shadow-xs flex items-end p-2 text-[10px] font-mono text-white font-bold">#0d9488</div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Teal 600 (Primary)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-teal-500 shadow-xs flex items-end p-2 text-[10px] font-mono text-white font-bold">#14b8a6</div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Teal 500 (Accent)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-slate-900 shadow-xs flex items-end p-2 text-[10px] font-mono text-white font-bold">#0f172a</div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Slate 900 (Canvas)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-emerald-600 shadow-xs flex items-end p-2 text-[10px] font-mono text-white font-bold">#059669</div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Emerald 600 (Growth)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-rose-500 shadow-xs flex items-end p-2 text-[10px] font-mono text-white font-bold">#f43f5e</div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Rose 500 (Favorite)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-xl bg-amber-500 shadow-xs flex items-end p-2 text-[10px] font-mono text-white font-bold">#f59e0b</div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Amber 500 (Warning)</p>
          </div>
        </div>
      </section>

      {/* Typography & Spacing */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Typography Scale</h3>
          <div className="space-y-2 text-slate-800 dark:text-slate-200">
            <p className="text-2xl font-black">H1 Display Bold (32px / 2.0rem)</p>
            <p className="text-xl font-extrabold">H2 Section Heading (24px / 1.5rem)</p>
            <p className="text-lg font-bold">H3 Card Heading (18px / 1.125rem)</p>
            <p className="text-sm font-medium leading-relaxed">Body Text (14px / 0.875rem) — High readability ratio.</p>
            <p className="text-xs font-mono text-slate-500">Code / Formula Mono (12px / 0.75rem) — Math equations.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Spacing & Elevation System</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Strict 4px geometric spatial grid. Container padding matches or exceeds child elements to maintain optical balance.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs font-mono font-bold text-slate-400">Card</span>
              <span className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium">
                Rounded-2xl (16px), 1px subtle hairline border
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs font-mono font-bold text-slate-400">Button</span>
              <span className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold">
                Rounded-xl (12px), 2x horizontal padding
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-xs font-mono font-bold text-slate-400">Icons</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <LucideSampleIcons />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const LucideSampleIcons: React.FC = () => (
  <div className="flex items-center gap-2 text-teal-600">
    <Calculator className="w-4 h-4" />
    <ShieldCheck className="w-4 h-4" />
    <Zap className="w-4 h-4" />
    <Copy className="w-4 h-4" />
    <Heart className="w-4 h-4 text-rose-500" />
  </div>
);
