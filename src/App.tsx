import React, { useState, useEffect, useMemo } from 'react';
import { CALCULATORS } from './data/calculatorsList';
import { CATEGORIES } from './data/categories';
import { BLOG_POSTS, getBlogPostBySlug } from './data/blogPosts';
import { getCalculatorById } from './data/calculatorRegistry';
import { CategoryId, CalculationHistoryItem, CalculatorMeta } from './types';
import { getCalculatorComponent } from './components/calculators';
import { updateSeoMetaData } from './lib/seo';
import { GOOGLE_CONFIG } from './config/google';
import { initGA, trackPageView, trackCalculatorOpen, trackCalculatorCompletion, trackAcquisitionEvent } from './lib/analytics';

// Layout & Navigation Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePageView } from './components/HomePageView';
import { CategoryLandingView } from './components/CategoryLandingView';
import { CalculatorWrapper } from './components/CalculatorWrapper';

// Views
import { CalculatorsDirectoryView } from './components/CalculatorsDirectoryView';
import { BlogPage } from './components/BlogPage';
import { BlogPostDetail } from './components/BlogPostDetail';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { CookiePage } from './components/CookiePage';
import { DisclaimerPage } from './components/DisclaimerPage';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { OpportunityScout } from './components/OpportunityScout';
import { StartupArchitectBlueprint } from './components/StartupArchitectBlueprint';
import { ForSalePage } from './components/ForSalePage';

// Drawers & Modals
import { SearchModal } from './components/SearchModal';
import { HistoryFavoritesDrawer } from './components/HistoryFavoritesDrawer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [currentView, setCurrentView] = useState<
    | 'home'
    | 'calculators'
    | 'category'
    | 'calculator'
    | 'blog'
    | 'blogDetail'
    | 'about'
    | 'contact'
    | 'privacy'
    | 'terms'
    | 'cookie'
    | 'disclaimer'
    | 'analytics'
    | 'opportunityScout'
    | 'blueprint'
  >('home');

  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>('finance');
  const [selectedCalculatorId, setSelectedCalculatorId] = useState<string>('mortgage');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');

  // Local Storage State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calcora_favorites');
      return saved ? JSON.parse(saved) : ['mortgage', 'compound-interest', 'bmi'];
    } catch {
      return ['mortgage', 'compound-interest', 'bmi'];
    }
  });

  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calcora_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calcora_recently_viewed');
      return saved ? JSON.parse(saved) : ['mortgage', 'compound-interest'];
    } catch {
      return ['mortgage', 'compound-interest'];
    }
  });

  const [totalCalculationsCount, setTotalCalculationsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('calcora_total_calc_count');
      return saved ? parseInt(saved, 10) : 1420;
    } catch {
      return 1420;
    }
  });

  // Modal & Drawer State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'favorites' | 'history'>('favorites');

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('calcora_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('calcora_history', JSON.stringify(history));
    } catch (e) {
      console.warn(e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('calcora_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.warn(e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem('calcora_total_calc_count', totalCalculationsCount.toString());
    } catch (e) {
      console.warn(e);
    }
  }, [totalCalculationsCount]);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    initGA();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Parse initial hash route & support popstate back/forward navigation
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      if (pathname === '/for-sale' || pathname === '/for-sale/') {
        setCurrentView('forSale' as any);
        return;
      }

      if (hash.startsWith('#calculator/')) {
        const rawTarget = hash.replace('#calculator/', '');
        const calc = getCalculatorById(rawTarget);
        if (calc) {
          setSelectedCalculatorId(calc.id);
          setCurrentView('calculator');
        }
      } else if (hash.startsWith('#category/')) {
        const catId = hash.replace('#category/', '') as CategoryId;
        const exists = CATEGORIES.some((c) => c.id === catId);
        if (exists) {
          setSelectedCategoryId(catId);
          setCurrentView('category');
        }
      } else if (hash === '#calculators' || hash === '#all-calculators' || hash === '#directory') {
        setCurrentView('calculators');
      } else if (hash.startsWith('#blog/')) {
        const rawSlug = hash.replace('#blog/', '');
        const post = getBlogPostBySlug(rawSlug);
        if (post) {
          setSelectedPostSlug(post.slug);
          setCurrentView('blogDetail');
        }
      } else if (hash === '#blog') {
        setCurrentView('blog');
      } else if (hash === '#for-sale' || hash === '#forSale') {
        setCurrentView('forSale' as any);
      } else if (['#about', '#contact', '#privacy', '#terms', '#cookie', '#disclaimer', '#analytics', '#opportunityScout', '#blueprint', '#for-sale', '#forSale'].includes(hash)) {
        const routeName = hash.replace('#', '');
        setCurrentView((routeName === 'for-sale' || routeName === 'forSale') ? 'forSale' as any : routeName as any);
      } else if (!hash || hash === '#') {
        setCurrentView('home');
      }
    };

    parseHashRoute();
    window.addEventListener('popstate', parseHashRoute);
    return () => window.removeEventListener('popstate', parseHashRoute);
  }, []);

  // Synchronize SEO Meta Tags, Document Title, and GA4 Analytics on view transition
  useEffect(() => {
    let title = 'Calcora | 154 Free Online Calculators & Converter Tools';
    let description = 'Calcora provides 154 verified free online calculators for finance, mortgage, health, algebra, physics, unit conversions, and construction with instant client-side math.';
    let path = '/';
    let calcId: string | undefined;
    let catId: string | undefined;
    let postSlug: string | undefined;

    if (currentView === 'home') {
      path = '/';
    } else if (currentView === 'calculators') {
      title = 'All Free Online Calculators & Converter Tools Directory | Calcora';
      description = 'Search, filter, and explore all 154 free verified online calculators for finance, mortgage, health, math, construction, and engineering.';
      path = '/#calculators';
      window.location.hash = '#calculators';
    } else if (currentView === 'calculator') {
      const calc = CALCULATORS.find((c) => c.id === selectedCalculatorId);
      if (calc) {
        const hasToolSuffix = /calculator|converter|estimator|solver|generator|tool|schedule/i.test(calc.title);
        title = hasToolSuffix
          ? `${calc.title} (Free & Instant Online) | Calcora`
          : `${calc.title} Calculator — Free & Instant Online Tool | Calcora`;
        
        const baseDesc = calc.description || calc.shortDescription;
        description = baseDesc.endsWith('.') 
          ? `${baseDesc} Calculate instantly with verified formulas, step-by-step instructions, and exportable results.`
          : `${baseDesc}. Calculate instantly with verified formulas, step-by-step instructions, and exportable results.`;
        
        path = `/#calculator/${calc.id}`;
        calcId = calc.id;
        window.location.hash = `#calculator/${calc.id}`;
        trackCalculatorOpen(calc.id, calc.title);
      }
    } else if (currentView === 'category') {
      const cat = CATEGORIES.find((c) => c.id === selectedCategoryId);
      if (cat) {
        title = `${cat.name} Calculators — Free Interactive Math & Planning Tools | Calcora`;
        const baseDesc = cat.description;
        description = baseDesc.endsWith('.')
          ? `${baseDesc} Explore verified tools with instant zero-latency math, formula guides, and domain FAQs.`
          : `${baseDesc}. Explore verified tools with instant zero-latency math, formula guides, and domain FAQs.`;
        path = `/#category/${cat.id}`;
        catId = cat.id;
        window.location.hash = `#category/${cat.id}`;
      }
    } else if (currentView === 'blog') {
      title = 'Calcora Blog & Research: Financial Guides, Science & Math Tutorials';
      description = 'Read in-depth financial analyses, mortgage amortization tips, health guides, and mathematical explanations from Calcora engineering team.';
      path = '/#blog';
      window.location.hash = '#blog';
    } else if (currentView === 'blogDetail') {
      const post = getBlogPostBySlug(selectedPostSlug);
      if (post) {
        title = `${post.title} | Calcora Guide`;
        description = post.excerpt.endsWith('.')
          ? `${post.excerpt} Read the comprehensive guide with mathematical formulas and practical examples on Calcora.`
          : `${post.excerpt}. Read the comprehensive guide with mathematical formulas and practical examples on Calcora.`;
        path = `/#blog/${post.slug}`;
        postSlug = post.slug;
        window.location.hash = `#blog/${post.slug}`;
      }
    } else if (currentView === ('forSale' as any)) {
      title = 'Calcora for Sale — 256+ Calculator Platform | Digital Asset Acquisition';
      description = 'Acquire Calcora, a production-ready calculator platform with 256+ interactive calculators, multilingual SEO infrastructure, analytics integration, and expansion potential.';
      path = '/for-sale';
      window.location.hash = '#for-sale';
      trackAcquisitionEvent('for_sale_page_view', { source: 'route_view' });
    } else {
      title = `${currentView.charAt(0).toUpperCase() + currentView.slice(1)} | Calcora Free Online Tools`;
      path = `/#${currentView}`;
      window.location.hash = `#${currentView}`;
    }

    const canonicalUrl = `${GOOGLE_CONFIG.siteUrl.replace(/\/$/, '')}${path}`;

    updateSeoMetaData({
      title,
      description,
      canonicalUrl,
      type: currentView === 'blogDetail' ? 'article' : (currentView === 'calculator' ? 'application' : 'website'),
      calculatorId: calcId,
      categoryId: catId,
      blogSlug: postSlug,
    });

    trackPageView(path, title);
  }, [currentView, selectedCalculatorId, selectedCategoryId, selectedPostSlug]);

  // Handlers
  const handleToggleFavorite = (calcId: string) => {
    setFavorites((prev) =>
      prev.includes(calcId) ? prev.filter((id) => id !== calcId) : [...prev, calcId]
    );
  };

  const handleSelectCalculator = (calcId: string) => {
    setSelectedCalculatorId(calcId);
    setCurrentView('calculator');
    setRecentlyViewed((prev) => [calcId, ...prev.filter((id) => id !== calcId)].slice(0, 10));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: CategoryId) => {
    setSelectedCategoryId(catId);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDrawer = (tab: 'favorites' | 'history') => {
    setDrawerTab(tab);
    setIsDrawerOpen(true);
  };

  const handleAddCalculationHistory = (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: CalculationHistoryItem = {
      ...item,
      id: `calc-hist-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 50));
    setTotalCalculationsCount((prev) => prev + 1);

    const calc = CALCULATORS.find((c) => c.id === selectedCalculatorId);
    if (calc) {
      trackCalculatorCompletion(calc.id, calc.title, item.summaryText);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Active Calculator Component
  const ActiveCalcComponent = useMemo(() => {
    return getCalculatorComponent(selectedCalculatorId);
  }, [selectedCalculatorId]);

  const activeCalcMeta: CalculatorMeta = useMemo(() => {
    return CALCULATORS.find((c) => c.id === selectedCalculatorId) || CALCULATORS[0];
  }, [selectedCalculatorId]);

  const activePost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.slug === selectedPostSlug) || BLOG_POSTS[0];
  }, [selectedPostSlug]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header Navbar */}
      <Navbar
        onNavigateHome={handleNavigateHome}
        onNavigateCalculators={() => { setCurrentView('calculators'); window.scrollTo(0, 0); }}
        onNavigateCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDrawer={handleOpenDrawer}
        favoritesCount={favorites.length}
        historyCount={history.length}
        currentView={currentView}
        onNavigateAbout={() => { setCurrentView('about'); window.scrollTo(0, 0); }}
        onNavigateContact={() => { setCurrentView('contact'); window.scrollTo(0, 0); }}
        onNavigateBlog={() => { setCurrentView('blog'); window.scrollTo(0, 0); }}
        onNavigateAnalytics={() => { setCurrentView('analytics'); window.scrollTo(0, 0); }}
        onNavigateOpportunityScout={() => { setCurrentView('opportunityScout'); window.scrollTo(0, 0); }}
        onNavigateForSale={() => { setCurrentView('forSale' as any); window.scrollTo(0, 0); }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePageView
            calculators={CALCULATORS}
            favorites={favorites}
            recentlyViewed={recentlyViewed}
            onToggleFavorite={handleToggleFavorite}
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onNavigateCalculators={() => { setCurrentView('calculators'); window.scrollTo(0, 0); }}
            onOpenSearch={() => setIsSearchOpen(true)}
            onNavigateBlog={() => { setCurrentView('blog'); window.scrollTo(0, 0); }}
            onSelectPost={(postSlug) => {
              setSelectedPostSlug(postSlug);
              setCurrentView('blogDetail');
              window.scrollTo(0, 0);
            }}
            totalCalculationsCount={totalCalculationsCount}
          />
        )}

        {currentView === 'calculators' && (
          <CalculatorsDirectoryView
            calculators={CALCULATORS}
            categories={CATEGORIES}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {currentView === 'category' && (
          <CategoryLandingView
            categoryId={selectedCategoryId}
            calculators={CALCULATORS}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {currentView === 'calculator' && (
          <CalculatorWrapper
            calculatorId={selectedCalculatorId}
            isFavorite={favorites.includes(selectedCalculatorId)}
            onToggleFavorite={handleToggleFavorite}
            onNavigateHome={handleNavigateHome}
            onNavigateCategory={handleSelectCategory}
            onSelectCalculator={handleSelectCalculator}
            onReset={() => {}}
            faqs={activeCalcMeta.faqs}
            stepByStepInstructions={activeCalcMeta.stepByStepInstructions}
            educationalDisclaimer={activeCalcMeta.educationalDisclaimer}
          >
            {ActiveCalcComponent ? (
              <ActiveCalcComponent
                onAddHistory={handleAddCalculationHistory}
                onSelectCalculator={handleSelectCalculator}
              />
            ) : (
              <div className="p-8 text-center text-slate-500">
                Calculator component loading...
              </div>
            )}
          </CalculatorWrapper>
        )}

        {currentView === 'blog' && (
          <BlogPage
            onNavigateHome={handleNavigateHome}
            onSelectPost={(postSlug) => {
              setSelectedPostSlug(postSlug);
              setCurrentView('blogDetail');
              window.scrollTo(0, 0);
            }}
            onSelectCalculator={handleSelectCalculator}
          />
        )}

        {currentView === 'blogDetail' && (
          <BlogPostDetail
            post={activePost}
            onNavigateHome={handleNavigateHome}
            onNavigateBlog={() => { setCurrentView('blog'); window.scrollTo(0, 0); }}
            onSelectCalculator={handleSelectCalculator}
          />
        )}

        {currentView === 'about' && <AboutPage onNavigateHome={handleNavigateHome} />}
        {currentView === 'contact' && <ContactPage onNavigateHome={handleNavigateHome} />}
        {currentView === 'privacy' && <PrivacyPage onNavigateHome={handleNavigateHome} />}
        {currentView === 'terms' && <TermsPage onNavigateHome={handleNavigateHome} />}
        {currentView === 'cookie' && <CookiePage onNavigateHome={handleNavigateHome} />}
        {currentView === 'disclaimer' && <DisclaimerPage onNavigateHome={handleNavigateHome} />}
        {currentView === 'analytics' && <AnalyticsDashboard onNavigateHome={handleNavigateHome} onSelectCalculator={handleSelectCalculator} />}
        {currentView === 'opportunityScout' && <OpportunityScout onNavigateHome={handleNavigateHome} onSelectCalculator={handleSelectCalculator} />}
        {currentView === 'blueprint' && <StartupArchitectBlueprint onNavigateHome={handleNavigateHome} />}
        {currentView === ('forSale' as any) && (
          <ForSalePage
            onNavigateHome={handleNavigateHome}
            onNavigateContact={() => { setCurrentView('contact'); window.scrollTo(0, 0); }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateCalculators={() => { setCurrentView('calculators'); window.scrollTo(0, 0); }}
        onNavigateCategory={handleSelectCategory}
        onSelectCalculator={handleSelectCalculator}
        onNavigateAbout={() => { setCurrentView('about'); window.scrollTo(0, 0); }}
        onNavigateContact={() => { setCurrentView('contact'); window.scrollTo(0, 0); }}
        onNavigatePrivacy={() => { setCurrentView('privacy'); window.scrollTo(0, 0); }}
        onNavigateTerms={() => { setCurrentView('terms'); window.scrollTo(0, 0); }}
        onNavigateBlog={() => { setCurrentView('blog'); window.scrollTo(0, 0); }}
        onNavigateCookie={() => { setCurrentView('cookie'); window.scrollTo(0, 0); }}
        onNavigateDisclaimer={() => { setCurrentView('disclaimer'); window.scrollTo(0, 0); }}
        onNavigateAnalytics={() => { setCurrentView('analytics'); window.scrollTo(0, 0); }}
        onNavigateForSale={() => { setCurrentView('forSale' as any); window.scrollTo(0, 0); }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        calculators={CALCULATORS}
        categories={CATEGORIES}
        onSelectCalculator={(id) => {
          handleSelectCalculator(id);
          setIsSearchOpen(false);
        }}
        onSelectCategory={(id) => {
          handleSelectCategory(id);
          setIsSearchOpen(false);
        }}
      />

      {/* History & Favorites Drawer */}
      <HistoryFavoritesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={drawerTab}
        onTabChange={setDrawerTab}
        favorites={favorites}
        calculators={CALCULATORS}
        history={history}
        onToggleFavorite={handleToggleFavorite}
        onSelectCalculator={(id) => {
          handleSelectCalculator(id);
          setIsDrawerOpen(false);
        }}
        onClearHistory={handleClearHistory}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner onNavigateCookie={() => { setCurrentView('cookie'); window.scrollTo(0, 0); }} />

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
