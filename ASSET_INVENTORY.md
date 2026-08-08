# Calcora — Comprehensive Asset Inventory

This document details the verified assets included in the sale and acquisition of **Calcora**.

---

## 1. Codebase & Software Repository

- **Repository Architecture:** Single-page application (SPA) built with React 19, TypeScript 5.8, Vite 6, and Tailwind CSS v4.
- **Strict Typing:** 100% TypeScript compliance (`tsc --noEmit` verified clean).
- **Core Application Entry Points:**
  - `/index.html` — Production HTML shell containing Search Console verification tags, preconnect tags, and font loading.
  - `/src/App.tsx` — Main application controller managing route states, SEO metadata synchronization, drawer states, and analytics.
  - `/src/main.tsx` — React root DOM mount.
- **Calculator Components Suite (`/src/components/calculators/`):**
  - Modular calculator React components with instant client-side math calculations.
  - Interactive inputs, visual charts (Recharts), copyable output fields, and breakdown tables.
- **Core Pages & Views:**
  - Homepage with category filters and search modal.
  - Category view pages.
  - Calculator detail view with full mathematical explanation and formula cards.
  - `/for-sale` — Acquisition landing page.
  - `/about`, `/contact`, `/privacy`, `/terms`, `/cookie`, `/disclaimer`.
  - `/analytics` — Client-side analytics dashboard.
  - `/opportunityScout` — Calculator keyword research & opportunity tool.
  - `/blueprint` — Product blueprint & architecture view.

---

## 2. Interactive Calculator Suite (256+ Tools)

All 256+ tools are cataloged in `/src/data/calculatorsList.ts`. The catalog covers major categories:

1. **Finance & Investment (45+ tools):** Mortgage, Compound Interest, Loan Amortization, Auto Loan, Retirement 401(k), Roth IRA, Crypto Profit, Stock ROI, Credit Card Payoff, Dividend Yield, Rental Property Yield, Salary Take-Home.
2. **Health & Fitness (35+ tools):** BMI, Calorie BMR, Macro Calculator, Body Fat Percentage, Target Heart Rate, Ideal Weight, Water Intake, Sleep Cycle.
3. **Algebra & Mathematics (40+ tools):** Quadratic Formula, Matrix Determinant, Percentage Change, Fraction Arithmetic, Logarithm, Exponential Growth, Standard Deviation, Combinations & Permutations.
4. **Physics & Engineering (35+ tools):** Ohm's Law, Projectile Motion, Kinetic Energy, Torque, Wave Frequency, Density/Mass/Volume, Thermal Conductivity.
5. **Construction & Real Estate (30+ tools):** Concrete Volume, Flooring Tile, Drywall Sheet, Paint Coverage, Roof Pitch, Lumber Board Feet, Brick Quantity.
6. **Unit Conversions & Utilities (50+ tools):** Temperature, Length, Weight, Digital Data Storage, Speed, Pressure, Power, Time Zone Difference.

---

## 3. SEO & Growth Infrastructure

- **Head Metadata System (`/src/lib/seo.ts`):** Dynamic page title, meta description, canonical link tag, Open Graph image & text, Twitter cards.
- **Multilingual Support:** Head `hreflang` tags generated for 7 supported locales (en, es, fr, de, ar, pt, it).
- **XML Sitemap Generator (`/src/lib/generateSitemapXml.ts`):** Client-side and build-compatible XML sitemap builder producing standard `<urlset>` format across all 256+ calculator routes and static pages.
- **Structured Data (Schema.org):** JSON-LD injection for `WebApplication`, `SoftwareApplication`, `BreadcrumbList`, and `FAQPage`.
- **Search Console Verification:** Pre-configured Google Search Console verification meta tag in `/index.html`.

---

## 4. Analytics & Event Tracking

- **GA4 Module (`/src/lib/analytics.ts`):**
  - Google Analytics 4 pageview & event tracker.
  - Custom events: `calculator_open`, `calculator_compute`, `copy_results`, `for_sale_page_view`, `acquisition_cta_click`, `contact_click`.
  - Configurable via `VITE_GA_MEASUREMENT_ID` environment variable.

---

## 5. Deployment & Configuration Files

- `package.json` — Dependency manifest & build scripts.
- `vite.config.ts` — Vite bundling configuration.
- `tsconfig.json` — Strict TypeScript compiler setup.
- `tailwind.config.js` / `@import "tailwindcss"` — Tailwind styling configuration.
- `metadata.json` — Platform applet identification.
- `.env.example` — Environment variable blueprint.

---

## 6. Exclusions (What Is NOT Included)

To ensure full transparency, the following are **not** part of the sale:
- Third-party personal domain accounts (domain transfer subject to negotiation).
- Personal Google Accounts or personal analytics dashboard logins (buyer configures their own GA4 ID).
