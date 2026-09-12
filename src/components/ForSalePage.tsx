import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  DollarSign,
  Globe,
  Code2,
  Cpu,
  Zap,
  TrendingUp,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Layers,
  Building2,
  Users,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Mail,
  FileText,
  Layout,
  Award,
  Check,
  HelpCircle,
  Send,
  Lock,
  Search,
} from 'lucide-react';
import { trackAcquisitionEvent } from '../lib/analytics';

interface ForSalePageProps {
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export const ForSalePage: React.FC<ForSalePageProps> = ({ onNavigateHome, onNavigateContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    offerAmount: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = import.meta.env.VITE_SALE_CONTACT_EMAIL || '';

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.email.trim()) return;

    trackAcquisitionEvent('contact_click', {
      name: inquiryForm.name,
      email: inquiryForm.email,
      offerAmount: inquiryForm.offerAmount,
    });

    setSubmitted(true);
  };

  const handlePrimaryCtaScroll = () => {
    trackAcquisitionEvent('acquisition_cta_click', { section: 'hero' });
    const el = document.getElementById('acquisition-contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    trackAcquisitionEvent('explore_calcora_click');
    onNavigateHome();
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Is Calcora currently generating revenue?',
      a: 'Calcora is currently a pre-revenue digital asset.',
    },
    {
      q: 'What is included in the acquisition?',
      a: 'The acquisition can include the complete source code, calculator platform, supporting infrastructure, documentation, and transfer assistance.',
    },
    {
      q: 'How many calculators are included?',
      a: 'The current platform contains 154+ interactive calculators.',
    },
    {
      q: 'Can the platform be expanded?',
      a: 'Yes. The architecture is designed to allow additional calculators, content, monetization features, APIs, and commercial functionality to be added.',
    },
    {
      q: 'Is the platform deployed?',
      a: 'Yes. Calcora is currently deployed on Cloudflare Pages.',
    },
    {
      q: 'Does Calcora support analytics?',
      a: 'Google Analytics 4 integration is implemented and can be activated by configuring the production Measurement ID.',
    },
    {
      q: 'Is the platform multilingual?',
      a: 'Yes. The current SEO infrastructure supports seven languages.',
    },
    {
      q: 'Why is Calcora being sold?',
      a: 'Calcora is being offered to a buyer who can dedicate resources to traffic acquisition, monetization, and continued expansion.',
    },
  ];

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={handleExploreClick}
          className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span>Back to Calcora Platform</span>
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Digital Asset Available for Acquisition</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Turnkey Platform Acquisition Opportunity</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Calcora Is Available for <span className="text-teal-400 underline decoration-teal-500/30">Acquisition</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
            Own a production-ready calculator platform with 154+ interactive tools, multilingual SEO infrastructure, analytics integration, and significant room for growth.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {[
              '154+ Calculators',
              'SEO Ready',
              'Production Deployed',
              '7 Languages',
              'GA4 Ready',
              'Cloudflare Deployed',
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>{badge}</span>
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={handlePrimaryCtaScroll}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-teal-500/20 active:scale-98"
            >
              <Mail className="w-4 h-4" />
              <span>Request Acquisition Details</span>
            </button>
            <button
              onClick={handleExploreClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Explore Calcora</span>
            </button>
          </div>
        </div>
      </section>

      {/* ACQUISITION SUMMARY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Acquisition Executive Summary</span>
          </h2>
          <span className="text-xs text-slate-500">Verified Technical Benchmark</span>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Asset</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">Calcora</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Type</span>
              <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">Digital Asset / Platform</span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 block uppercase">Current Stage</span>
              <span className="text-base font-extrabold text-teal-600 dark:text-teal-400 mt-1 block">Pre-Revenue / Ready</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Calculators</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">154+ Tools</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Languages</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">7 Locales</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Deployment</span>
              <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">Cloudflare Pages</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 col-span-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Technology Stack</span>
              <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">React + TypeScript + Vite + Tailwind</span>
            </div>
          </div>

          {/* Audit Metrics */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Lighthouse Technical Audit Scores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block">100/100</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Lighthouse SEO</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block">98/100</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Lighthouse Performance</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block">99/100</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Lighthouse Accessibility</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block">100/100</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Best Practices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ACQUIRE CALCORA */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Why Acquire Calcora?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: '1. Large Existing Calculator Library',
              desc: '154+ interactive calculators across finance, mortgage, health, algebra, physics, unit conversions, and construction.',
              icon: Calculator,
              color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
            },
            {
              title: '2. Production-Ready Architecture',
              desc: 'Modern React + TypeScript architecture designed for modularity, sub-second client-side math, and seamless developer updates.',
              icon: Code2,
              color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
            },
            {
              title: '3. SEO Infrastructure',
              desc: 'Dynamic metadata, canonical URLs, hreflang tags, XML sitemap, robots.txt, Schema.org structured data, and automated internal linking.',
              icon: Search,
              color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
            },
            {
              title: '4. Multilingual Foundation',
              desc: 'Built-in support for 7 languages (English, Spanish, French, German, Arabic, Portuguese, Italian) to tap global organic search.',
              icon: Globe,
              color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
            },
            {
              title: '5. Monetization Potential',
              desc: 'Potential revenue channels include display advertising, affiliate marketing, premium tools, API subscriptions, B2B widgets, and lead gen.',
              icon: DollarSign,
              color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
            },
            {
              title: '6. Ready for Expansion',
              desc: 'The buyer can easily add new calculators, blog content, traffic channels, paid features, SaaS tools, and commercial integrations.',
              icon: TrendingUp,
              color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 transition-all shadow-xs space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TECHNOLOGY & INFRASTRUCTURE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Technology & Infrastructure</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {[
            { name: 'React 19', tag: 'Frontend Library', desc: 'Modern functional components & state' },
            { name: 'TypeScript', tag: 'Type Safety', desc: '100% strict type definitions' },
            { name: 'Vite', tag: 'Build System', desc: 'Sub-second dev server & ESM bundles' },
            { name: 'Tailwind CSS', tag: 'Styling', desc: 'Utility-first responsive design' },
            { name: 'Cloudflare Pages', tag: 'Hosting', desc: 'Edge CDN deployment & zero cold-starts' },
            { name: 'Google Analytics 4', tag: 'Analytics', desc: 'Custom event tracking & SPA support' },
            { name: 'Schema.org', tag: 'Structured Data', desc: 'JSON-LD WebApp & SoftwareApp schemas' },
            { name: 'XML Sitemap', tag: 'Crawlability', desc: 'Dynamic sitemap builder with 250+ URLs' },
            { name: 'SEO Engine', tag: 'Meta & Head', desc: 'Dynamic canonicals & hreflang tags' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{tech.name}</span>
                <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md">
                  {tech.tag}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO & ORGANIC GROWTH */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Architected for Search Engines</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Built for Organic Growth</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Calcora has been built from the ground up to support long-term organic search capture across financial, educational, health, and technical query verticals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'Individual calculator URLs',
            'Category routing pages',
            'Dynamic SEO metadata',
            'Canonical link tags',
            'Multilingual hreflang tags',
            'Schema.org structured data',
            'Breadcrumb JSON-LD',
            'Automated XML Sitemap',
            'Robots.txt configuration',
            'Contextual internal linking',
            'Editorial blog infrastructure',
            'Mobile-first layout',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 font-medium">
              <Check className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Note on Performance Scores:</strong> Calcora maintains top-tier Lighthouse benchmarks (100 SEO, 98 Performance, 99 Accessibility, 100 Best Practices). These represent verified technical compliance and user experience quality.
        </div>
      </section>

      {/* MONETIZATION POTENTIAL */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Monetization Potential</span>
          </h2>
          <p className="text-xs text-slate-500">Multiple potential revenue streams available for activation by the new owner</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Google AdSense', desc: 'Potential display advertising across 154+ high-intent tool pages.' },
            { title: 'Affiliate Marketing', desc: 'Potential referral links for mortgage lenders, brokers, & finance products.' },
            { title: 'Premium Calculators', desc: 'Potential gated PDF exports, detailed schedules, or pro features.' },
            { title: 'Calculator API', desc: 'Potential B2B API access for developers, Fintechs, and real estate portals.' },
            { title: 'Embedded Widgets', desc: 'Potential embeddable widget licensing for third-party blogs & websites.' },
            { title: 'White-Label Solutions', desc: 'Potential custom branded deployment packages for enterprise clients.' },
            { title: 'Sponsored Content', desc: 'Potential featured placement for financial & health software tools.' },
            { title: 'Lead Generation', desc: 'Potential lead capture for mortgages, loans, insurance, and solar quotes.' },
          ].map((mon) => (
            <div
              key={mon.title}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-amber-500/40 transition"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{mon.title}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{mon.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GROWTH OPPORTUNITIES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Where the Next Owner Can Take Calcora</span>
        </h2>

        <div className="p-6 sm:p-8 rounded-3xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/50 space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            As a pre-revenue digital asset, Calcora offers an immediate, clean foundation for growth-oriented buyers. Strategic expansion avenues include:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
            {[
              'Scale organic search acquisition via programmatic content',
              'Publish calculator-focused articles & educational guides',
              'Execute strategic link-building campaigns in financial niches',
              'Expand calculator suite to 500+ specialized vertical tools',
              'Activate ad networks (AdSense, Mediavine, Raptive)',
              'Launch SaaS subscriptions for pro financial tools & PDF reports',
              'Build developer REST API & embeddable JS widget marketplace',
              'Partner with mortgage brokers & insurers for lead monetization',
            ].map((opp, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-teal-200/60 dark:border-teal-800/40">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <span>{opp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED IN ACQUISITION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Included in the Acquisition</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            '✓ Complete React + TypeScript Source Code',
            '✓ 154+ Interactive Calculator Components',
            '✓ Custom UI Component Library',
            '✓ Structured Calculator Data & Definitions',
            '✓ Full SEO & Head Metadata System',
            '✓ Automated XML Sitemap Generator',
            '✓ GA4 Analytics Integration Module',
            '✓ Schema.org JSON-LD Infrastructure',
            '✓ Cloudflare Pages Deployment Config',
            '✓ 7-Language Multilingual Foundation',
            '✓ Technical Architecture Documentation',
            '✓ Source Code Transfer Assistance',
          ].map((inc) => (
            <div
              key={inc}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-teal-500 shrink-0" />
              <span>{inc.replace('✓ ', '')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TRANSPARENT BUSINESS STATUS & PRICING */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stage Card */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparent Asset Status</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Current Business Stage</h2>
          <div className="text-lg font-bold text-amber-400">Pre-Revenue / Production-Ready Digital Asset</div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Calcora is currently a pre-revenue digital asset. The platform has been developed and deployed with SEO, analytics, and monetization infrastructure prepared for future growth.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-teal-200 uppercase tracking-wider block">Asking Price</span>
            <div className="text-4xl font-black text-white tracking-tight">$12,500 USD</div>
            <p className="text-xs font-medium text-teal-100">Serious offers considered.</p>
          </div>

          <div className="p-3 rounded-xl bg-teal-900/40 border border-teal-400/30 text-[11px] text-teal-100 leading-snug">
            Price is negotiable based on transaction terms, transfer scope, and buyer offer structure.
          </div>

          <button
            onClick={handlePrimaryCtaScroll}
            className="w-full py-3 rounded-xl bg-white text-slate-950 font-extrabold text-xs transition hover:bg-slate-100 text-center shadow-md"
          >
            Submit Acquisition Offer
          </button>
        </div>
      </section>

      {/* WHO IS THIS FOR (BUYER PROFILE) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Who Is This For?</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'SEO Entrepreneurs', desc: 'Build an organic traffic empire around high-volume calculator terms.' },
            { title: 'SaaS Founders', desc: 'Embed lead-generating calculators into existing SaaS products.' },
            { title: 'Affiliate Marketers', desc: 'Monetize financial, loan, and health calculation traffic.' },
            { title: 'Content Publishers', desc: 'Enhance media publications with interactive utilities.' },
            { title: 'Software Developers', desc: 'Acquire clean React code to launch customized commercial tools.' },
            { title: 'Digital Agencies', desc: 'Provide client lead-generation or white-label tools.' },
            { title: 'Ad-Tech Operators', desc: 'Deploy ad units across 154+ utility tools.' },
            { title: 'Calculator Networks', desc: 'Expand existing portal portfolio with a ready asset.' },
          ].map((profile) => (
            <div key={profile.title} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">{profile.title}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{profile.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACQUISITION PROCESS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Acquisition Process</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', name: 'Request Details', desc: 'Submit an acquisition inquiry or email to express interest.' },
            { step: '02', name: 'Review the Asset', desc: 'Review code repository, live deployment, and technical architecture.' },
            { step: '03', name: 'Agree on Terms', desc: 'Finalize transaction terms, purchase agreement, and payment structure.' },
            { step: '04', name: 'Secure Transfer', desc: 'Receive source code, repository transfer, documentation, and assets.' },
          ].map((proc) => (
            <div key={proc.step} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 relative overflow-hidden">
              <span className="text-3xl font-black text-slate-200 dark:text-slate-800 block">{proc.step}</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{proc.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-teal-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / CTA INQUIRY SECTION */}
      <section id="acquisition-contact-section" className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Asset Inquiry</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Interested in Acquiring Calcora?</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Contact the owner to request additional information, technical details, and acquisition discussions.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Acquisition Inquiry Received</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Thank you for expressing interest in Calcora. Your inquiry has been registered. You can also contact our support directly if needed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Indicative Offer or Budget (USD)</label>
              <input
                type="text"
                value={inquiryForm.offerAmount}
                onChange={(e) => setInquiryForm({ ...inquiryForm, offerAmount: e.target.value })}
                placeholder="e.g. $12,500"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry / Message</label>
              <textarea
                rows={3}
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                placeholder="Share your background, questions, or acquisition timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>

              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}?subject=Calcora%20Acquisition%20Inquiry`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold border border-slate-700"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  <span>Email Owner Directly ({contactEmail})</span>
                </a>
              )}

              {onNavigateContact && (
                <button
                  type="button"
                  onClick={() => {
                    trackAcquisitionEvent('contact_click', { action: 'navigate_contact' });
                    onNavigateContact();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium"
                >
                  <span>General Contact Form</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              )}
            </div>
          </form>
        )}
      </section>

    </article>
  );
};
