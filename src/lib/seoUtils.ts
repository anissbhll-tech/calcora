/**
 * Calcora SEO & Structured Data (JSON-LD) Utilities
 */
import { CalculatorMeta } from '../types';
import { GOOGLE_CONFIG } from '../config/google';

/**
 * Generates JSON-LD schema for a calculator tool (SoftwareApplication / WebApplication).
 */
export function generateCalculatorSchema(calc: CalculatorMeta) {
  const domain = (typeof window !== 'undefined' && window.location.origin) ? window.location.origin : GOOGLE_CONFIG.siteUrl;
  const url = `${domain.replace(/\/$/, '')}/#calculator/${calc.id}`;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': calc.schemaType || 'WebApplication',
    'name': calc.title,
    'description': calc.description,
    'url': url,
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
  };

  return JSON.stringify(schema);
}

/**
 * Generates JSON-LD schema for FAQ accordions on calculator pages.
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return JSON.stringify(schema);
}
