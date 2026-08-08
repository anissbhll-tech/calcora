# Calcora — Frequently Asked Questions (Buyer FAQ)

This document addresses common technical, commercial, and operational questions regarding the acquisition of Calcora.

---

### Q1: Is Calcora currently generating revenue?
**Answer:** No. Calcora is currently a **pre-revenue digital asset**. It has been built and deployed as a production-ready application with SEO, analytics, and performance optimization prepared for future growth.

---

### Q2: How much does Calcora cost?
**Answer:** The asking price is **$12,500 USD**. Serious offers are considered, and pricing remains negotiable depending on the structure of the deal, transfer assistance requested, and transaction terms.

---

### Q3: What technology stack is used in Calcora?
**Answer:** Calcora is built using modern web standards:
- **Frontend Framework:** React 19
- **Language:** TypeScript 5.8 (strict mode enabled)
- **Bundler:** Vite 6
- **CSS Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Hosting / CDN:** Cloudflare Pages (or any static host / Node.js container)

---

### Q4: How many calculators are included?
**Answer:** The current platform contains **256+ interactive calculators** across financial, health, mathematical, engineering, construction, and conversion domains.

---

### Q5: Can new calculators be added easily?
**Answer:** Yes. The codebase utilizes a modular architecture. Adding a new calculator requires defining the calculator metadata and formula parameters in `/src/data/calculatorsList.ts` and adding its math logic in a component under `/src/components/calculators/`.

---

### Q6: Is Calcora optimized for search engines (SEO)?
**Answer:** Yes. Calcora achieves a **100/100 Lighthouse SEO score**. It includes dynamic head title and description updates, canonical link management, Schema.org JSON-LD structured data, XML sitemap generation, robots.txt, and `hreflang` tag support for 7 languages.

---

### Q7: Are there any guaranteed traffic levels or AdSense approvals?
**Answer:** No. We do not provide guarantees regarding future organic search rankings, traffic volume, or ad network approval times. AdSense or third-party ad network approval depends entirely on the buyer's domain authority, content policies, and compliance with network guidelines.

---

### Q8: How is analytics tracked?
**Answer:** Calcora features a built-in Google Analytics 4 integration (`/src/lib/analytics.ts`). The buyer simply needs to set the `VITE_GA_MEASUREMENT_ID` environment variable to their own GA4 Measurement ID during deployment.

---

### Q9: How will the codebase and asset transfer take place?
**Answer:** Upon completion of escrow or payment terms:
1. The full Git repository (source code, assets, configuration files) will be transferred to the buyer's GitHub or Git host.
2. Deployment instructions and setup guidance will be provided.
3. Ownership of the project is fully assigned to the buyer.

---

### Q10: Does Calcora require an expensive backend server or database to run?
**Answer:** No. Calcora executes all mathematical calculations on the client side inside the user's browser. It can be hosted on free or low-cost static hosts such as Cloudflare Pages, Vercel, Netlify, or AWS S3 + CloudFront with minimal ongoing server overhead.
