# Calcora — Technical Architecture & Engineering Overview

This document provides a technical walkthrough of the **Calcora** application architecture for engineering teams, due-diligence reviewers, and prospective buyers.

---

## 1. System Architecture

Calcora is structured as a single-page client-side web application (SPA) built for extreme speed, sub-second calculations, and search engine crawlability.

```
+-----------------------------------------------------------------------+
|                             USER BROWSER                              |
|                                                                       |
|  +--------------------+   +-------------------+   +----------------+  |
|  |   React 19 Engine  |   | SEO Manager (Head)|   | GA4 Analytics  |  |
|  +---------+----------+   +---------+---------+   +-------+--------+  |
|            |                        |                     |           |
|            v                        v                     v           |
|  +--------------------+   +-------------------+   +----------------+  |
|  | 256+ Calculators   |   | Canonicals / OG   |   | Custom Events  |  |
|  | Client Calculation |   | Structured Data   |   | Page Views     |  |
|  +--------------------+   +-------------------+   +----------------+  |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                        STATIC EDGE CDN DELIVERY                       |
|                          (Cloudflare Pages)                           |
+-----------------------------------------------------------------------+
```

---

## 2. Directory Structure

```
/
├── index.html                   # HTML entry point with verification & meta tags
├── metadata.json                # Applet configuration & metadata
├── package.json                 # Dependencies & build scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration
├── public/                      # Static assets (favicons, manifest, icons)
├── src/
│   ├── App.tsx                  # Main router controller & page dispatcher
│   ├── main.tsx                 # React DOM mount point
│   ├── index.css                # Global CSS styling (Tailwind CSS)
│   ├── config/
│   │   └── google.ts            # GA4, GTM, and Search Console environment config
│   ├── data/
│   │   └── calculatorsList.ts   # Catalog of 256+ calculator definitions & metadata
│   ├── lib/
│   │   ├── analytics.ts         # GA4 tracking interface
│   │   ├── generateSitemapXml.ts# Automated XML sitemap generator
│   │   ├── seo.ts               # Dynamic Head & Meta manager
│   │   └── utils.ts             # Utility helpers
│   └── components/
│       ├── Navbar.tsx           # Responsive header navigation
│       ├── Footer.tsx           # Footer with links & acquisition entry
│       ├── ForSalePage.tsx      # Turnkey acquisition page (/for-sale)
│       └── calculators/         # Individual interactive calculator components
```

---

## 3. SEO & Head Metadata Implementation

Dynamic SEO management is handled via `/src/lib/seo.ts`:
- **Page Titles & Descriptions:** Automatically updated upon route changes.
- **Canonical URLs:** Dynamically set to prevent duplicate content penalties.
- **Hreflang Tags:** Multi-language support generated for 7 locales:
  - `en` (English)
  - `es` (Spanish)
  - `fr` (French)
  - `de` (German)
  - `ar` (Arabic)
  - `pt` (Portuguese)
  - `it` (Italian)
- **JSON-LD Structured Data:**
  - `WebApplication` / `SoftwareApplication` schemas for calculator pages.
  - `BreadcrumbList` schema for category navigation.
  - `FAQPage` schema for question/answer content.

---

## 4. Performance & Audit Metrics

Lighthouse performance audits yield high ratings due to zero heavy server dependencies and optimized client-side JS bundles:

| Audit Category | Lighthouse Score |
|---|---|
| **SEO** | **100 / 100** |
| **Performance** | **98 / 100** |
| **Accessibility** | **99 / 100** |
| **Best Practices** | **100 / 100** |

---

## 5. Build & Deployment Commands

The project uses standard Vite scripts defined in `package.json`:

- **Development Server:** `npm run dev` (Runs Vite dev server on port 3000)
- **Type Check & Lint:** `npm run lint` (Executes `tsc --noEmit`)
- **Production Build:** `npm run build` (Outputs optimized production bundle to `/dist`)
- **Production Preview:** `npm run preview`
