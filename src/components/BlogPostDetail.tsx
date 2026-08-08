import React from 'react';
import { Clock, Calendar, User, Tag, ArrowLeft, Calculator, BookOpen, Share2, Check } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { CALCULATORS } from '../data/calculatorsList';
import { Breadcrumbs } from './Breadcrumbs';

interface BlogPostDetailProps {
  postSlug: string;
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onSelectCalculator: (calcId: string) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  postSlug,
  onNavigateHome,
  onNavigateBlog,
  onSelectCalculator,
}) => {
  const [copied, setCopied] = React.useState(false);
  const post = BLOG_POSTS.find((p) => p.slug === postSlug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Article Not Found</h2>
        <button
          onClick={onNavigateBlog}
          className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl text-xs"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  const relatedCalcs = CALCULATORS.filter((c) => post.relatedCalculatorIds.includes(c.id));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.publishDate,
    publisher: {
      '@type': 'Organization',
      name: 'Calcora',
      url: 'https://calcora.com',
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateBlog}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Articles</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
        </button>
      </div>

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

        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-l-4 border-teal-500 pl-4 py-1 bg-slate-50 dark:bg-slate-900/40 rounded-r-xl">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
          <User className="w-4 h-4 text-teal-600" />
          <span>By <strong>{post.author}</strong></span>
        </div>
      </header>

      {/* Main Body */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed prose dark:prose-invert max-w-none">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2 key={idx} className="text-xl font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-100 dark:border-slate-800">
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('* ')) {
            return (
              <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2 text-slate-700 dark:text-slate-300">
                {paragraph.split('\n').map((li, lIdx) => (
                  <li key={lIdx}>{li.replace('* ', '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Related Calculators CTA Box */}
      {relatedCalcs.length > 0 && (
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Try Related Tools Now</span>
          </div>

          <h3 className="text-xl font-bold">Calculators Mentioned in This Article</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {relatedCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onSelectCalculator(calc.id)}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left transition group"
              >
                <h4 className="text-xs font-bold text-teal-300 group-hover:text-teal-200 transition">
                  {calc.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {calc.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-400 mt-2">
                  Calculate Now &rarr;
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
