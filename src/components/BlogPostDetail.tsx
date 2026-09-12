import React from 'react';
import { 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  Calculator, 
  Share2, 
  Check, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Sigma,
  BookOpen
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { CALCULATORS } from '../data/calculatorsList';
import { getCalculatorById } from '../data/calculatorRegistry';
import { CalculatorMeta } from '../types';
import { Breadcrumbs } from './Breadcrumbs';

interface BlogPostDetailProps {
  postSlug?: string;
  post?: BlogPost;
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onSelectCalculator: (calcId: string) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  postSlug,
  post: postProp,
  onNavigateHome,
  onNavigateBlog,
  onSelectCalculator,
}) => {
  const [copied, setCopied] = React.useState(false);
  const post = postProp || BLOG_POSTS.find((p) => p.slug === postSlug) || BLOG_POSTS[0];

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Article Not Found</h2>
        <button
          onClick={onNavigateBlog}
          className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl text-xs"
        >
          Return to Educational Knowledge Center
        </button>
      </div>
    );
  }

  const primaryCalc = getCalculatorById(post.primaryCalculatorId) || (post.relatedCalculatorIds.length > 0 ? getCalculatorById(post.relatedCalculatorIds[0]) : undefined);
  const relatedCalcs = post.relatedCalculatorIds
    .map((id) => getCalculatorById(id))
    .filter((c): c is CalculatorMeta => Boolean(c));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Structured Data Schemas
  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Organization',
        name: post.author,
      },
      datePublished: post.publishDate,
      dateModified: post.publishDate,
      publisher: {
        '@type': 'Organization',
        name: 'Calcora',
        url: window.location.origin,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href,
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${window.location.origin}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Educational Guides',
          item: `${window.location.origin}/#blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: window.location.href,
        },
      ],
    }
  ];

  if (post.faqs && post.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateBlog}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Educational Guides</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
        </button>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-bold text-xs border border-teal-200 dark:border-teal-900">
            {post.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.publishDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-l-4 border-teal-500 pl-4 py-1.5 bg-teal-50/40 dark:bg-slate-900/60 rounded-r-xl">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
          <User className="w-4 h-4 text-teal-600" />
          <span>Authored by <strong>{post.author}</strong></span>
        </div>
      </header>

      {/* Direct Interactive Calculator CTA Banner */}
      {primaryCalc && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white border border-teal-800/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
              <Calculator className="w-4 h-4" />
              <span>Interactive Model Available</span>
            </div>
            <p className="text-sm font-semibold text-white">
              Try the live calculation engine: <span className="text-teal-200">{primaryCalc.title}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectCalculator(primaryCalc.id)}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition shrink-0"
          >
            <span>Launch Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Formula Highlight Box */}
      {post.formulaHighlight && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <Sigma className="w-4 h-4" />
            <span>Mathematical Formula Reference: {post.formulaHighlight.name}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-slate-900 dark:text-teal-300 overflow-x-auto">
            {post.formulaHighlight.formula}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {post.formulaHighlight.description}
          </p>
        </div>
      )}

      {/* Key Takeaways */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <div className="p-6 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/50 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Mathematical Takeaways</span>
          </div>
          <ul className="space-y-2">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400 mt-2 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Body */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed max-w-none">
        {post.content.split('\n\n').map((paragraph, idx) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('### ')) {
            return (
              <h2 key={idx} className="text-xl font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-100 dark:border-slate-800 first:border-0 first:pt-0">
                {trimmed.replace('### ', '')}
              </h2>
            );
          }

          if (trimmed.startsWith('* ')) {
            return (
              <ul key={idx} className="space-y-2 pl-2 text-slate-700 dark:text-slate-300">
                {trimmed.split('\n').map((li, lIdx) => {
                  const cleanLi = li.replace(/^\*\s+/, '');
                  return (
                    <li key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span>{cleanLi}</span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          if (/^\d+\.\s+/.test(trimmed)) {
            return (
              <ol key={idx} className="space-y-2 pl-2 text-slate-700 dark:text-slate-300">
                {trimmed.split('\n').map((li, lIdx) => {
                  const match = li.match(/^(\d+\.)\s+(.*)/);
                  return (
                    <li key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                      <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">
                        {match ? match[1] : `${lIdx + 1}.`}
                      </span>
                      <span>{match ? match[2] : li}</span>
                    </li>
                  );
                })}
              </ol>
            );
          }

          return (
            <p key={idx} className="leading-relaxed text-slate-700 dark:text-slate-300">
              {trimmed}
            </p>
          );
        })}
      </div>

      {/* Frequently Asked Questions */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Expert Questions & Answers</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Calculations & Guidance
          </h3>

          <div className="space-y-3 pt-2">
            {post.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
              >
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {faq.question}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Calculators CTA Box */}
      {relatedCalcs.length > 0 && (
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Interactive Calculators Related to This Guide</span>
          </div>

          <h3 className="text-xl font-bold">Launch Related Calculators</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {relatedCalcs.map((calc) => (
              <button
                key={calc.id}
                type="button"
                onClick={() => onSelectCalculator(calc.id)}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 hover:border-teal-500 border border-slate-700/80 text-left transition group flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-teal-300 group-hover:text-teal-200 transition">
                    {calc.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {calc.shortDescription}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-400 group-hover:text-teal-300 mt-3">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

