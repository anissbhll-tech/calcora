# Calcora — Asset Transfer & Post-Acquisition Setup Guide

This guide provides step-by-step instructions for transferring ownership of **Calcora** from seller to buyer, along with a post-acquisition setup checklist.

---

## 1. Asset Transfer Checklist

### A. What Is Transferred To Buyer
- [x] Complete Git source code repository access (GitHub/GitLab/Bitbucket transfer).
- [x] All 256+ calculator source files, algorithms, and metadata files.
- [x] All frontend components, UI templates, and static graphic assets.
- [x] Deployment configuration files (`vite.config.ts`, `package.json`, `tsconfig.json`).
- [x] Documentation package (`SELLER_README.md`, `ASSET_INVENTORY.md`, `BUYER_FAQ.md`, `TECHNICAL_OVERVIEW.md`, `TRANSFER_GUIDE.md`).

### B. What Is Retained By Seller / Reconfigured By Buyer
- [ ] Google Search Console property ownership (Buyer adds their own property verification meta tag or DNS TXT record).
- [ ] Google Analytics 4 property (Buyer creates their own GA4 Measurement ID).
- [ ] Hosting account logins (Buyer deploys to their own Cloudflare Pages / Vercel / Netlify account).

---

## 2. Technical Handover Steps

### Step 1: Code Repository Transfer
1. Seller invites Buyer as Administrator to the private GitHub repository, or exports a clean `.zip` archive of the codebase.
2. Buyer verifies that the codebase compiles locally without errors:
   ```bash
   npm install
   npm run lint
   npm run build
   ```

### Step 2: Configure Environment Variables
Buyer creates a new `.env` file in the project root based on `.env.example`:

```env
# Buyer's Google Analytics 4 Measurement ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Buyer's Site Canonical Base URL
VITE_SITE_URL=https://calcora.com

# Buyer's Contact Email for Acquisition Page
VITE_SALE_CONTACT_EMAIL=acquisition@calcora.com
```

### Step 3: Deployment Setup (Cloudflare Pages Example)
1. Log into your **Cloudflare Dashboard**.
2. Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
3. Select the transferred `calcora` repository.
4. Set Build Settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
5. Add Environment Variables under **Settings** -> **Environment Variables**.
6. Click **Save and Deploy**.

---

## 3. Recommended Buyer Due-Diligence Checklist

Before finalizing acquisition escrow, the buyer should complete the following verification steps:

- [ ] **Code Compilation:** Verify `npm run lint` completes cleanly with zero TypeScript errors.
- [ ] **Production Build:** Verify `npm run build` creates a complete `/dist` output containing `index.html`.
- [ ] **Calculator Audit:** Test sample calculators across Finance, Health, Algebra, and Conversions to confirm calculation accuracy.
- [ ] **Responsive Design:** Confirm layout renders properly on desktop, tablet, and mobile browsers.
- [ ] **SEO Verification:** Verify `<head>` meta tags, canonical links, and `hreflang` tags render correctly.
- [ ] **Sitemap Verification:** Test sitemap generator output (`src/lib/generateSitemapXml.ts`).
- [ ] **Acquisition Page:** Test `/for-sale` page rendering and form submission logic.

---

## 4. Post-Acquisition Growth Roadmap (First 90 Days)

Once ownership is transferred, the new owner can execute the following growth steps:

1. **Activate Analytics & Search Console:**
   - Add site to Google Search Console and submit the generated sitemap URL (`/sitemap.xml`).
   - Plug in production GA4 ID to monitor user engagement.

2. **Monetization Activation:**
   - Apply for display ad networks (Google AdSense, Mediavine, Ezoic).
   - Insert targeted affiliate links inside mortgage, loan, and financial tools.

3. **Content & Backlink Expansion:**
   - Publish detailed explanatory articles around high-volume calculator keywords.
   - Embed interactive widgets into partner blogs and niche industry portals.
