import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  HelpCircle, 
  BookOpen, 
  Check, 
  Sparkles, 
  RotateCcw, 
  ChevronDown, 
  ArrowRight,
  Printer,
  Copy,
  Calculator as CalcIcon
} from 'lucide-react';
import { CALCULATORS } from '../data/calculatorsList';
import { CATEGORIES } from '../data/categories';
import { PRESETS } from '../data/presets';
import { getRelatedCalculators } from '../data/calculatorRegistry';
import { generateCalculatorSchema, generateFAQSchema } from '../lib/seoUtils';
import { CalcDisclaimer } from './common/CalcDisclaimer';
import { AdSlot } from './common/AdSlot';
import { Breadcrumbs } from './Breadcrumbs';
import { CategoryId } from '../types';

interface CalculatorWrapperProps {
  calculatorId: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (catId: CategoryId) => void;
  onSelectCalculator: (calcId: string) => void;
  onApplyPreset?: (presetValues: Record<string, any>) => void;
  onReset: () => void;
  children: React.ReactNode;
  resultSummaryText?: string;
  faqs?: Array<{ question: string; answer: string }>;
  stepByStepInstructions?: string[];
  educationalDisclaimer?: string;
}

export const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({
  calculatorId,
  isFavorite,
  onToggleFavorite,
  onNavigateHome,
  onNavigateCategory,
  onSelectCalculator,
  onApplyPreset,
  onReset,
  children,
  resultSummaryText,
  faqs = [],
  stepByStepInstructions = [],
  educationalDisclaimer,
}) => {
  const calculator = CALCULATORS.find((c) => c.id === calculatorId);
  const category = CATEGORIES.find((cat) => cat.id === calculator?.categoryId);
  const presets = PRESETS[calculatorId] || [];

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showFormula, setShowFormula] = useState(true);

  if (!calculator || !category) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: calculator.title,
        text: calculator.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyResults = () => {
    const textToCopy = resultSummaryText || `${calculator.title} calculation via Calcora: ${window.location.href}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const relatedCalculators = getRelatedCalculators(calculator.id, 3);
  const mergedFaqs = faqs.length > 0 ? faqs : calculator.faqs || [];

  const calcSchemaJson = generateCalculatorSchema(calculator);
  const faqSchemaJson = generateFAQSchema(mergedFaqs);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* Inject JSON-LD Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: calcSchemaJson }} />
      {faqSchemaJson && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson }} />
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs
        categoryId={category.id}
        calculatorId={calculator.id}
        onNavigateHome={onNavigateHome}
        onNavigateCategory={onNavigateCategory}
      />

      {/* Main Header Card - Bento Style */}
      <header className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden print:border-none print:p-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-0 pointer-events-none print:hidden"></div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5 print:hidden">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${category.badgeColor}`}>
                {category.name}
              </span>
              {calculator.isPopular && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
                  ★ Popular Tool
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {calculator.title}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {calculator.description}
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden">
            <button
              type="button"
              onClick={() => onToggleFavorite(calculator.id)}
              className={`p-2.5 sm:p-3 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-200 dark:border-rose-800 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 hover:text-rose-500'
              }`}
              title={isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyResults}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
              title="Copy Calculation Summary"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-indigo-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedSummary ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
              title="Share Calculator"
            >
              {copiedLink ? <Check className="w-4 h-4 text-indigo-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 text-xs font-semibold"
              title="Print Page / Report"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
              title="Reset Calculator Inputs"
            >
              <RotateCcw className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Preset Sample Scenarios */}
        {presets.length > 0 && onApplyPreset && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 print:hidden">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Quick Preset Scenarios
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onApplyPreset(preset.values)}
                  className="px-3 py-1.5 bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-semibold border border-indigo-200/60 dark:border-slate-700 transition flex items-center gap-1.5"
                >
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Educational Disclaimer Callout */}
      {(educationalDisclaimer || calculator.educationalDisclaimer || ['finance', 'health'].includes(category.id)) && (
        <CalcDisclaimer text={educationalDisclaimer || calculator.educationalDisclaimer} />
      )}

      {/* Primary Calculator Workspace Component */}
      <main className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm print:border-none print:shadow-none">
        {children}
      </main>

      {/* Formula & Explanation Section */}
      {calculator.formulaDescription && (
        <section className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 print:bg-white print:border-none shadow-2xs">
          <button
            type="button"
            onClick={() => setShowFormula(!showFormula)}
            className="w-full flex items-center justify-between text-left focus:outline-none print:pointer-events-none group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">Methodology</span>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  How It Works & Formula Proof
                </h2>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform print:hidden ${showFormula ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>

          {showFormula && (
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-3.5 animate-in fade-in">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl font-mono text-xs font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-slate-800">
                {calculator.formulaDescription}
              </div>

              {stepByStepInstructions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-200">Step-by-Step Calculation Guide:</h3>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400">
                    {stepByStepInstructions.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* FAQ Section */}
      {mergedFaqs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xs print:hidden">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">Knowledge Base</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {mergedFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left p-4 font-bold text-sm text-slate-900 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Monetization Ready Ad Slot */}
      <AdSlot slotId={`calcora-${calculator.id}-bottom`} format="responsive" className="print:hidden" />

      {/* Related Calculators Footer */}
      {relatedCalculators.length > 0 && (
        <section className="pt-4 print:hidden">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <CalcIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            More {category.name} Calculators
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCalculators.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelectCalculator(rel.id)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-md transition text-left group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {rel.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-4 group-hover:translate-x-1 transition-transform">
                  Open Calculator <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
