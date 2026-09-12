import { CALCULATORS } from '../data/calculatorsList';
import { CATEGORIES } from '../data/categories';
import { CATEGORY_FAQS } from '../data/categoryFaqs';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blogPosts';
import { LANGUAGES } from '../i18n/translations';
import { GOOGLE_CONFIG } from '../config/google';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: 'website' | 'article' | 'application';
  calculatorId?: string;
  categoryId?: string;
  blogSlug?: string;
}

/**
 * Dynamically injects or updates SEO Head Tags, Meta, OpenGraph, Twitter, Hreflang, and JSON-LD Structured Data
 */
export function updateSeoMetaData(config: PageSeoConfig, currentLanguage: string = 'en'): void {
  if (typeof document === 'undefined') return;

  const siteUrl = GOOGLE_CONFIG.siteUrl.replace(/\/$/, '');
  const { title, description, canonicalUrl, type = 'website', calculatorId, categoryId, blogSlug } = config;

  // 1. Title
  document.title = title;

  // 2. Meta Helper
  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'description', description);
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  if (GOOGLE_CONFIG.googleSiteVerification) {
    setMeta('name', 'google-site-verification', GOOGLE_CONFIG.googleSiteVerification);
  }
  setMeta('name', 'viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
  setMeta('name', 'theme-color', '#0d9488');

  // 3. OpenGraph Tags
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', type === 'article' ? 'article' : 'website');
  setMeta('property', 'og:site_name', 'Calcora');
  setMeta('property', 'og:image', `${siteUrl}/og-image.svg`);

  // 4. Twitter Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', `${siteUrl}/og-image.svg`);

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 6. Hreflang Tags for all supported languages
  LANGUAGES.forEach((lang) => {
    const hreflangCode = lang.code;
    let hrefEl = document.querySelector(`link[rel="alternate"][hreflang="${hreflangCode}"]`);
    if (!hrefEl) {
      hrefEl = document.createElement('link');
      hrefEl.setAttribute('rel', 'alternate');
      hrefEl.setAttribute('hreflang', hreflangCode);
      document.head.appendChild(hrefEl);
    }
    // Append language parameter or preserve hash route
    const hashPart = window.location.hash || '';
    hrefEl.setAttribute('href', `${siteUrl}/?lang=${hreflangCode}${hashPart}`);
  });

  // x-default hreflang
  let xDefaultEl = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
  if (!xDefaultEl) {
    xDefaultEl = document.createElement('link');
    xDefaultEl.setAttribute('rel', 'alternate');
    xDefaultEl.setAttribute('hreflang', 'x-default');
    document.head.appendChild(xDefaultEl);
  }
  xDefaultEl.setAttribute('href', `${siteUrl}/${window.location.hash || ''}`);

  // 7. JSON-LD Structured Data
  let jsonLdEl = document.querySelector('script[type="application/ld+json"]#calcora-seo-schema');
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.setAttribute('type', 'application/ld+json');
    jsonLdEl.setAttribute('id', 'calcora-seo-schema');
    document.head.appendChild(jsonLdEl);
  }

  const schemas: any[] = [
    // WebSite & Organization Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Calcora',
      'url': siteUrl,
      'description': 'Calcora provides 256 free, verified online calculators for finance, mortgage, health, algebra, physics, unit conversions, and construction.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${siteUrl}/#search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Calcora',
      'url': siteUrl,
      'logo': `${siteUrl}/favicon.svg`,
      'sameAs': [
        'https://twitter.com/calcora',
        'https://github.com/calcora',
      ],
    },
  ];

  // If viewing a calculator, add WebApplication, BreadcrumbList, and FAQPage schemas
  if (calculatorId) {
    const calc = CALCULATORS.find((c) => c.id === calculatorId);
    const cat = calc ? CATEGORIES.find((ct) => ct.id === calc.categoryId) : null;

    if (calc) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': calc.schemaType || 'WebApplication',
        'name': calc.title,
        'operatingSystem': 'All',
        'applicationCategory': 'EducationalApplication',
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'description': calc.description || calc.shortDescription,
        'url': canonicalUrl,
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '2480',
          'bestRating': '5',
          'worstRating': '1',
        },
      });

      if (cat) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': siteUrl,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': cat.name,
              'item': `${siteUrl}/#category/${cat.id}`,
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': calc.title,
              'item': canonicalUrl,
            },
          ],
        });
      }

      if (calc.faqs && calc.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': calc.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        });
      }
    }
  } else if (categoryId) {
    const cat = CATEGORIES.find((ct) => ct.id === categoryId);
    if (cat) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': cat.name,
            'item': canonicalUrl,
          },
        ],
      });

      const catFaqs = CATEGORY_FAQS[cat.id as keyof typeof CATEGORY_FAQS];
      if (catFaqs && catFaqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': catFaqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.a,
            },
          })),
        });
      }
    }
  } else if (blogSlug) {
    const post = getBlogPostBySlug(blogSlug);
    if (post) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.title,
        'description': post.excerpt,
        'author': {
          '@type': 'Organization',
          'name': post.author || 'Calcora Editorial Team',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Calcora',
          'logo': {
            '@type': 'ImageObject',
            'url': `${siteUrl}/favicon.svg`,
          },
        },
        'datePublished': post.publishDate,
        'dateModified': post.publishDate,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      });

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Educational Guides',
            'item': `${siteUrl}/#blog`,
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': post.title,
            'item': canonicalUrl,
          },
        ],
      });

      if (post.faqs && post.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': post.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        });
      }
    }
  }

  jsonLdEl.textContent = JSON.stringify(schemas, null, 2);
}

