import { CALCULATORS } from '../data/calculatorsList';
import { CATEGORIES } from '../data/categories';
import { BLOG_POSTS } from '../data/blogPosts';
import { LANGUAGES } from '../i18n/translations';

export function buildSitemapXml(baseUrl: string = 'https://calcora.com'): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const now = new Date().toISOString().split('T')[0];

  const languages = LANGUAGES.map((l) => l.code);

  const formatUrlEntry = (path: string, priority: string, changefreq: string) => {
    const loc = `${cleanBase}/${path}`;
    const hashPart = path ? (path.startsWith('#') ? path : `#${path}`) : '';
    const alternates = languages
      .map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${cleanBase}/?lang=${lang}${hashPart}" />`)
      .join('\n');

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;
  };

  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '#about', priority: '0.6', changefreq: 'monthly' },
    { path: '#contact', priority: '0.6', changefreq: 'monthly' },
    { path: '#privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '#terms', priority: '0.5', changefreq: 'monthly' },
    { path: '#cookie', priority: '0.4', changefreq: 'monthly' },
    { path: '#disclaimer', priority: '0.5', changefreq: 'monthly' },
    { path: '#blog', priority: '0.8', changefreq: 'weekly' },
    { path: 'for-sale', priority: '0.8', changefreq: 'weekly' },
  ];

  const categoryEntries = CATEGORIES.map((cat) =>
    formatUrlEntry(`#category/${cat.id}`, '0.8', 'weekly')
  );

  const blogEntries = BLOG_POSTS.map((post) =>
    formatUrlEntry(`#blog/${post.slug}`, '0.7', 'monthly')
  );

  const calculatorEntries = CALCULATORS.map((calc) =>
    formatUrlEntry(`#calculator/${calc.id}`, calc.isPopular ? '0.9' : '0.8', 'weekly')
  );

  const staticEntries = staticPages.map((page) =>
    formatUrlEntry(page.path, page.priority, page.changefreq)
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticEntries.join('\n')}
${categoryEntries.join('\n')}
${blogEntries.join('\n')}
${calculatorEntries.join('\n')}
</urlset>`;
}
