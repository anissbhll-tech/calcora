import { CALCULATORS } from '../data/calculatorsList';
import { CATEGORIES } from '../data/categories';
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
  setMeta('name', 'theme-color', '#0f172a');

  // 3. OpenGraph Tags
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', type === 'article' ? 'article' : 'website');
  setMeta('property', 'og:site_name', 'Calcora');
  setMeta('property', 'og:image', `${siteUrl}/og-image.png`);

  // 4. Twitter Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', `${siteUrl}/og-image.png`);

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
  let jsonLdEl = document.querySelector('script[type="application/ld+json"]');
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.setAttribute('type', 'application/ld+json');
    document.head.appendChild(jsonLdEl);
  }

  const schemas: any[] = [
    // WebSite & Organization Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Calcora',
      'url': siteUrl,
      'description': 'Calcora provides 250+ free, verified online calculators for finance, health, algebra, physics, unit conversions, and construction.',
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
      'logo': `${siteUrl}/logo.png`,
      'sameAs': [
        'https://twitter.com/calcora',
        'https://github.com/calcora',
      ],
    },
  ];

  // If viewing a calculator, add SoftwareApplication & BreadcrumbList schemas
  if (calculatorId) {
    const calc = CALCULATORS.find((c) => c.id === calculatorId);
    const cat = calc ? CATEGORIES.find((ct) => ct.id === calc.categoryId) : null;

    if (calc) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': calc.title,
        'operatingSystem': 'All',
        'applicationCategory': 'BusinessApplication',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'description': calc.description || calc.shortDescription,
        'url': canonicalUrl,
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
    }
  }

  jsonLdEl.textContent = JSON.stringify(schemas, null, 2);
}
