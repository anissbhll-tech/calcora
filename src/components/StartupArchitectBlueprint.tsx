import React, { useState } from 'react';
import {
  Rocket,
  Cpu,
  Database,
  Layout,
  Search,
  Palette,
  DollarSign,
  TrendingUp,
  Share2,
  Sparkles,
  Zap,
  Building2,
  Award,
  CheckCircle2,
  Code,
  FileCode,
  Layers,
  ArrowRight,
  Download,
  Shield,
  Server,
  Terminal,
  ExternalLink,
  ChevronRight,
  Globe,
  BarChart,
  Users,
  Target,
  FileText
} from 'lucide-react';

export const StartupArchitectBlueprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'roadmap' | 'architecture' | 'database' | 'pages' | 'seo' | 'branding' | 'monetization' | 'marketing' | 'ai' | 'saas' | 'exit' | 'srs'
  >('srs');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl mb-8 border border-indigo-900/50 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Flagship Project #1 Architectural Dossier
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              Project Name: CALCORA
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Calcora: Multi-Niche Programmatic Calculator Suite
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-4xl leading-relaxed mb-6">
            Complete production-ready startup architecture, database schemas, programmatic SEO pipelines, AI integration, and marketplace exit strategy designed to build a high-yielding, 95% net-margin digital asset valued at <strong className="text-emerald-400">$145,000+</strong> upon launch and indexing.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block font-medium uppercase tracking-wider">Time to MVP</span>
              <span className="text-lg font-black text-indigo-300">3 Weeks</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium uppercase tracking-wider">Target Net Margin</span>
              <span className="text-lg font-black text-emerald-400">95% (Zero API Server Costs)</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium uppercase tracking-wider">Programmatic Pages</span>
              <span className="text-lg font-black text-sky-300">150+ Structured URLs</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium uppercase tracking-wider">Target Exit Multiple</span>
              <span className="text-lg font-black text-amber-400">38x Monthly Profit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'srs', label: '★ Technical Spec (SRS)', icon: FileText },
          { id: 'roadmap', label: '1. Roadmap', icon: Rocket },
          { id: 'architecture', label: '2. Architecture', icon: Cpu },
          { id: 'database', label: '3. Database Schema', icon: Database },
          { id: 'pages', label: '4. UI & Pages', icon: Layout },
          { id: 'seo', label: '5. Programmatic SEO', icon: Search },
          { id: 'branding', label: '6. Branding & Design', icon: Palette },
          { id: 'monetization', label: '7. Monetization Engine', icon: DollarSign },
          { id: 'marketing', label: '8. Growth & Distribution', icon: TrendingUp },
          { id: 'ai', label: '9. Gemini AI Integration', icon: Sparkles },
          { id: 'saas', label: '10. B2B White-Label SaaS', icon: Building2 },
          { id: 'exit', label: '11. Acquisition Exit Strategy', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md dark:bg-indigo-600'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* ★ SRS TECHNICAL SPECIFICATION */}
        {activeTab === 'srs' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-300 font-extrabold text-[10px]">
                      SYSTEM ARCHITECTURE DOC v1.0
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ISO/IEC 29148 Standard</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    Software Requirements Specification (SRS)
                  </h2>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CTO Approved for AI Build
                </span>
              </div>
            </div>

            {/* SRS Executive Summary Card */}
            <div className="bg-slate-950 text-slate-100 rounded-2xl p-6 border border-slate-800 font-mono text-xs space-y-3">
              <div className="text-indigo-400 font-bold text-sm tracking-wide border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>PROJECT IDENTIFIER: CALCORA-SUITE-2026</span>
                <span className="text-slate-400 font-normal">CLASSIFICATION: CONFIDENTIAL CTO TECHNICAL SPEC</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                This document provides the definitive Software Requirements Specification (SRS) for <strong>Calcora</strong>, a high-throughput multi-niche programmatic calculator suite designed for search dominance, zero-latency client-side execution, and maximum enterprise asset sale value ($145,000+).
              </p>
            </div>

            {/* SRS Modules Breakdown */}
            <div className="space-y-8">
              {/* SECTION 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" /> 1. System Overview & Scope
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <strong className="text-indigo-600 dark:text-indigo-400 block mb-1 font-bold">1.1 Core Objective</strong>
                    Build a client-side execution web application hosting 150+ specialized financial, construction, health, and developer calculators. Every route must render interactive sliders, real-time SVG charts, Gemini 1.5 Flash insights, and dynamic JSON-LD structured schema.
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <strong className="text-emerald-600 dark:text-emerald-400 block mb-1 font-bold">1.2 Performance Mandates</strong>
                    First Contentful Paint (FCP) &lt; 0.8s, Time to Interactive (TTI) &lt; 1.2s, 100/100 Lighthouse Performance & SEO scores. Zero server CPU overhead during calculation execution.
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-sky-500" /> 2. Architectural Specification
                </h3>
                <div className="space-y-3 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2">
                    <div className="text-sky-400 font-bold">2.1 Execution Model (Client-Side CSR + Express Edge Proxy)</div>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li><strong>Frontend Runtime:</strong> React 18 SPA bundled via Vite, deployed on Cloudflare Pages / Container Port 3000.</li>
                      <li><strong>Calculation Engine:</strong> Pure TypeScript mathematical functions with zero external runtime network calls.</li>
                      <li><strong>AI Inference Proxy:</strong> Express server endpoint <code className="text-amber-300">/api/ai/insights</code> proxying calls to Gemini 1.5 Flash using <code className="text-amber-300">@google/genai</code> SDK.</li>
                      <li><strong>Persistence:</strong> Firebase Firestore for Auth, Lead Captures, and Pro Saved Workspace states. LocalStorage for offline guest history.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-emerald-500" /> 3. Functional Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <strong className="text-slate-900 dark:text-white block font-bold">FR-1: Universal Calculation Engine</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Standardized interface <code className="text-indigo-500">CalculatorPlugin</code> defining inputs (sliders, selects, inputs), computation formulas, result view models, and chart datasets.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <strong className="text-slate-900 dark:text-white block font-bold">FR-2: Gemini AI Explanation Service</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      On formula evaluation completion, asynchronously stream or fetch a concise 3-bullet financial/health action plan generated by Gemini Flash.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <strong className="text-slate-900 dark:text-white block font-bold">FR-3: Programmatic Schema Injector</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Auto-inject <code className="text-indigo-500">WebApplication</code> and <code className="text-indigo-500">FAQPage</code> JSON-LD scripts into document head for Google Rich Snippets.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <strong className="text-slate-900 dark:text-white block font-bold">FR-4: WASM Report Export Engine</strong>
                    <p className="text-slate-600 dark:text-slate-300">
                      Client-side PDF compilation using <code className="text-indigo-500">pdf-lib</code> generating branded quote sheets with amortisation schedules and lead contact details.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-500" /> 4. Security, Auth & Data Integrity
                </h3>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                    <li><strong>API Key Protection:</strong> Zero GEMINI_API_KEY exposure in browser bundles. Endpoint proxy rate-limited to 20 req/min per IP.</li>
                    <li><strong>Database Security:</strong> Firestore rules enforcing owner-only read/write access on <code className="text-indigo-500">/users/{'{userId}'}</code> and server-side write on <code className="text-indigo-500">/lead_captures</code>.</li>
                    <li><strong>Sanitization:</strong> Strict Zod schema validation on all incoming query parameters and lead submission forms.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. ROADMAP (AI PRODUCT MANAGER SPEC) */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
                  <Rocket className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-300 font-extrabold text-[10px]">
                      PRODUCT MANAGEMENT ROADMAP v1.0
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Sequential Independent Execution</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    AI PM Phased Implementation Roadmap
                  </h2>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Dependency Blockers
                </span>
              </div>
            </div>

            {/* PM Principles Banner */}
            <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 text-xs space-y-2">
              <div className="text-indigo-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" /> AI Product Manager Execution Guardrails
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Each development phase is strictly decoupled and independently testable. An AI coding agent can build and pass automated tests for Phase N without requiring incomplete assets from Phase N+1.
              </p>
            </div>

            {/* 6 Sequenced Phases */}
            <div className="space-y-6">
              {/* PHASE 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs">
                      PHASE 1
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Foundation & Core Mathematical Engine
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Duration: Days 1–3 • Scope: Core Logic</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">Key Deliverables</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>TypeScript interfaces (<code className="text-indigo-500">CalculatorPlugin</code>, <code className="text-indigo-500">InputConfig</code>)</li>
                      <li>30 pure math calculation utilities (Mortgage, ROI, BMI, Brick Count)</li>
                      <li>Zero external network dependency unit tests</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Independent Test Criteria</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>100% unit test coverage on formulas</li>
                      <li>Sub-1ms computation speed benchmark</li>
                      <li>Zero runtime errors on edge numerical inputs (0, negative, max double)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-amber-600 dark:text-amber-400 block font-bold">Verification Command</strong>
                    <code className="p-2 rounded bg-slate-900 text-amber-300 font-mono text-[11px] block mt-1">
                      npm run test:unit -- src/utils/calculators/
                    </code>
                  </div>
                </div>
              </div>

              {/* PHASE 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-sky-600 text-white font-black text-xs">
                      PHASE 2
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Universal UI Component Suite & Interactive Charts
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Duration: Days 4–7 • Scope: Frontend UI</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">Key Deliverables</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Reusable <code className="text-indigo-500">CalculatorWorkspace</code> layout component</li>
                      <li>Interactive range sliders, numeric inputs, and unit toggles</li>
                      <li>Recharts visualization integration (Amortization schedules, pie charts)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Independent Test Criteria</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Fluid 60fps slider drag rendering</li>
                      <li>Responsive layout across mobile (375px) and desktop (1440px)</li>
                      <li>Accessibility compliance (WCAG AA contrast)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-amber-600 dark:text-amber-400 block font-bold">Verification Command</strong>
                    <code className="p-2 rounded bg-slate-900 text-amber-300 font-mono text-[11px] block mt-1">
                      npm run compile_applet
                    </code>
                  </div>
                </div>
              </div>

              {/* PHASE 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-purple-600 text-white font-black text-xs">
                      PHASE 3
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Programmatic SEO Pipeline & Schema Injector
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Duration: Days 8–10 • Scope: pSEO & Meta</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">Key Deliverables</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Dynamic JSON-LD schema builder (<code className="text-indigo-500">WebApplication</code> & <code className="text-indigo-500">FAQPage</code>)</li>
                      <li>Automated <code className="text-indigo-500">sitemap.xml</code> and <code className="text-indigo-500">robots.txt</code> generator</li>
                      <li>Dynamic OpenGraph image & meta description tagger</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Independent Test Criteria</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Valid JSON-LD structure on Google Rich Results Test</li>
                      <li>100/100 Lighthouse SEO audit rating</li>
                      <li>0 missing canonical tags across 150 programmatic routes</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-amber-600 dark:text-amber-400 block font-bold">Verification Command</strong>
                    <code className="p-2 rounded bg-slate-900 text-amber-300 font-mono text-[11px] block mt-1">
                      npm run test:seo-schema
                    </code>
                  </div>
                </div>
              </div>

              {/* PHASE 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs">
                      PHASE 4
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Gemini 1.5 Flash AI Service & Server Endpoint
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Duration: Days 11–14 • Scope: Backend AI</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">Key Deliverables</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Express API route <code className="text-indigo-500">POST /api/ai/insights</code></li>
                      <li>Server-side <code className="text-indigo-500">@google/genai</code> client initialization</li>
                      <li>Rate limiter & error fallback handling (Zero client API key leak)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Independent Test Criteria</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Latency under 800ms for Gemini Flash AI completion</li>
                      <li>Graceful offline fallback if GEMINI_API_KEY is unset</li>
                      <li>Strict 20 req/min IP rate limiting test</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-amber-600 dark:text-amber-400 block font-bold">Verification Command</strong>
                    <code className="p-2 rounded bg-slate-900 text-amber-300 font-mono text-[11px] block mt-1">
                      curl -X POST http://localhost:3000/api/ai/insights
                    </code>
                  </div>
                </div>
              </div>

              {/* PHASE 5 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-amber-600 text-white font-black text-xs">
                      PHASE 5
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Lead Capture Engine, Auth & WASM PDF Exporter
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Duration: Days 15–18 • Scope: Data & Export</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">Key Deliverables</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Firebase Firestore integration for <code className="text-indigo-500">/lead_captures</code></li>
                      <li>Client-side WASM PDF report generation using <code className="text-indigo-500">pdf-lib</code></li>
                      <li>User save/favorite calculations drawer</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Independent Test Criteria</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Successful write to Firestore upon lead form submit</li>
                      <li>PDF report downloads cleanly with active dynamic values</li>
                      <li>Zero memory leaks during client-side PDF rendering</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-amber-600 dark:text-amber-400 block font-bold">Verification Command</strong>
                    <code className="p-2 rounded bg-slate-900 text-amber-300 font-mono text-[11px] block mt-1">
                      npm run test:lead-capture
                    </code>
                  </div>
                </div>
              </div>

              {/* PHASE 6 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs">
                      PHASE 6
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Monetization Engine, AdSense & Exit Prospectus
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Duration: Days 19–21 • Scope: Launch & Monetize</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">Key Deliverables</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>High-CTR responsive AdSense / Ezoic placeholder units</li>
                      <li>Financial affiliate link dynamic insertion (Mortgage/Loan quotes)</li>
                      <li>Acquire.com & Flippa confidential sales prospectus dashboard</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Independent Test Criteria</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Zero CLS (Cumulative Layout Shift) from ad slots</li>
                      <li>Affiliate clicks correctly log outbound tracking IDs</li>
                      <li>Final production bundle builds green on <code className="text-indigo-500">compile_applet</code></li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <strong className="text-amber-600 dark:text-amber-400 block font-bold">Verification Command</strong>
                    <code className="p-2 rounded bg-slate-900 text-amber-300 font-mono text-[11px] block mt-1">
                      npm run compile_applet
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Full-Stack Tech Architecture</h2>
                <p className="text-slate-500 text-xs">Zero server infrastructure cost model delivering sub-50ms render times.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
                <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
                  <Server className="w-4 h-4" /> Frontend & Rendering Stack
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 font-mono">
                  <li><strong className="text-white">Framework:</strong> React 18 + Vite SPA (Client-Side Rendering)</li>
                  <li><strong className="text-white">State Management:</strong> React Context + LocalStorage for persistent history/favorites</li>
                  <li><strong className="text-white">UI Components:</strong> Tailwind CSS v3 + Lucide Icons + Recharts</li>
                  <li><strong className="text-white">PDF Generation:</strong> pdf-lib + jspdf (Client-side WASM rendering, 0 server cost)</li>
                  <li><strong className="text-white">Hosting & Edge CDN:</strong> Cloudflare Pages / Vercel / Cloud Run Reverse Proxy</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Server-Side Proxy & AI Layer
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 font-mono">
                  <li><strong className="text-white">Backend Server:</strong> Express + Node.js (via server.ts bundle)</li>
                  <li><strong className="text-white">AI Engine:</strong> @google/genai SDK (Gemini 1.5 Flash for speed & ultra-low token cost)</li>
                  <li><strong className="text-white">Database:</strong> Firebase Firestore (Auth & Lead Storage)</li>
                  <li><strong className="text-white">Edge Security:</strong> Express Rate Limiter + CORS Protection</li>
                  <li><strong className="text-white">Hosting Ingress:</strong> Port 3000 container with Cloudflare caching</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3. DATABASE SCHEMA */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Firestore Database Schema</h2>
                <p className="text-slate-500 text-xs">Production schema for user accounts, calculation logs, and B2B white-label lead collection.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Collection 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1 rounded-lg">
                    /users/{'{userId}'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">User Profile & Subscription</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto">
{`{
  "uid": "string (Auth UID)",
  "email": "string",
  "displayName": "string",
  "plan": "free" | "pro_monthly" | "white_label_broker",
  "createdAt": "Timestamp",
  "savedCalculations": [
    {
      "id": "calc_mortgage_1",
      "calculatorId": "mortgage-amortization",
      "inputs": { "homeValue": 450000, "downPayment": 90000, "interestRate": 6.5 },
      "savedAt": "Timestamp"
    }
  ]
}`}
                </pre>
              </div>

              {/* Collection 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-lg">
                    /lead_captures/{'{leadId}'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">High-Value Lead Generation Storage</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto">
{`{
  "leadId": "string",
  "calculatorType": "mortgage-refinance" | "construction-brick",
  "userEmail": "string",
  "phoneNumber": "string",
  "loanAmount": 360000,
  "zipCode": "90210",
  "monetizedStatus": "sold_to_broker",
  "soldPriceUSD": 45.00,
  "timestamp": "Timestamp"
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* 4. UI & PAGES */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Core Pages & UI Wireframes</h2>
                <p className="text-slate-500 text-xs">High-converting layout architecture optimized for search engines and user retention.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">1. Home Directory</h3>
                <p className="text-xs text-slate-500">Fast global search bar, featured calculators, category grid, recent tools, and high-CTR AdSense slots.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">2. Calculator Workspaces</h3>
                <p className="text-xs text-slate-500">Interactive sliders, dynamic charts (Recharts), Gemini AI summary explanation, PDF download button, and affiliate banner integration.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">3. White-Label Pro Portal</h3>
                <p className="text-xs text-slate-500">Portal for realtors and loan officers to brand calculators with their logo and collect lead forms directly.</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. PROGRAMMATIC SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Programmatic SEO Strategy</h2>
                <p className="text-slate-500 text-xs">Capturing thousands of low-competition long-tail search terms on autopilot.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 font-mono">Dynamic JSON-LD Schema Generator Snippet</h3>
              <pre className="p-4 rounded-xl bg-slate-950 text-indigo-300 text-xs font-mono overflow-x-auto">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Mortgage Refinance Savings Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>`}
              </pre>
            </div>
          </div>
        )}

        {/* 6. BRANDING */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Brand Identity & Style Tokens</h2>
                <p className="text-slate-500 text-xs">Sophisticated, accessible visual design system crafted for high user trust.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 mb-2" />
                <span className="text-xs font-bold block">Slate Black (#0F172A)</span>
                <span className="text-[10px] text-slate-400">Primary Typography & Dark Canvas</span>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-600 text-white">
                <div className="w-8 h-8 rounded-full bg-indigo-600 mb-2" />
                <span className="text-xs font-bold block">Electric Indigo (#4F46E5)</span>
                <span className="text-[10px] text-indigo-200">Primary CTA & Brand Accent</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500 text-slate-950">
                <div className="w-8 h-8 rounded-full bg-emerald-500 mb-2" />
                <span className="text-xs font-bold block">Emerald Cash (#10B981)</span>
                <span className="text-[10px] text-slate-900">Success Indicators & Profit Badges</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-400 text-slate-950">
                <div className="w-8 h-8 rounded-full bg-amber-400 mb-2" />
                <span className="text-xs font-bold block">Amber Highlight (#F59E0B)</span>
                <span className="text-[10px] text-slate-900">Featured #1 Rankings & Pro Badges</span>
              </div>
            </div>
          </div>
        )}

        {/* 7. MONETIZATION */}
        {activeTab === 'monetization' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Multi-Tier Revenue Model</h2>
                <p className="text-slate-500 text-xs">Diversified income channels maximizing Average Revenue Per User (ARPU).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-extrabold text-[10px]">TIER 1</span>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Programmatic Ads (AdSense / Ezoic)</h3>
                <p className="text-xs text-slate-500">$12 – $28 RPM in finance and construction niches with high viewability ad layouts.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">TIER 2</span>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">High-Ticket Affiliate Lead Gen</h3>
                <p className="text-xs text-slate-500">$30 – $80 per lead payout for mortgage, refinance, personal loan, and insurance quotes.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-extrabold text-[10px]">TIER 3</span>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Pro Subscriptions & White-Label</h3>
                <p className="text-xs text-slate-500">$19/mo for users wanting PDF reports, white-label client quotes, and API access.</p>
              </div>
            </div>
          </div>
        )}

        {/* 8. MARKETING */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Growth & Distribution Playbook</h2>
                <p className="text-slate-500 text-xs">Inbound organic search + social automation flywheel.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block mb-1">1. Programmatic Pinterest Ingestion</strong>
                Auto-generate visual infographics of fitness & budget calculators for viral Pinterest pins linking back to Calcora tools.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block mb-1">2. Reddit & Quora Answer Marketing</strong>
                Target queries like "how to calculate loan amortization" or "body fat percentage formula" with automated informative answers embedding Calcora.
              </div>
            </div>
          </div>
        )}

        {/* 9. AI */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Gemini 1.5 Flash AI Features</h2>
                <p className="text-slate-500 text-xs">Transforming raw numbers into actionable, intelligent insights.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <h3 className="font-bold text-sky-400 text-sm">AI Financial & Health Advisor Integration</h3>
              <p className="text-xs text-slate-300">
                When a user completes a calculation (e.g. Mortgage Refinance), Gemini 1.5 Flash generates a 3-bullet personalized financial optimization strategy explaining exact breakeven timelines and risk considerations.
              </p>
            </div>
          </div>
        )}

        {/* 10. SAAS */}
        {activeTab === 'saas' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Future B2B SaaS Extension</h2>
                <p className="text-slate-500 text-xs">White-label embeddable widget engine for mortgage brokers and contractors.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Embeddable Widget iFrame & React SDK</h3>
              <p className="text-xs text-slate-500">
                Brokers and realtors pay $29/mo to embed branded calculators directly on their websites to capture homebuyer leads into their CRM.
              </p>
            </div>
          </div>
        )}

        {/* 11. EXIT */}
        {activeTab === 'exit' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Acquisition Exit Strategy (Acquire.com & Flippa)</h2>
                <p className="text-slate-500 text-xs">Maximum valuation dossier prepared for strategic buyers.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-6 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase">Target Exit Valuation</span>
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400">$145,000 USD</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Calculated based on $3,800/mo net profit from ads and affiliates at a conservative 38x monthly net revenue multiple. Buyer receives full codebase, domain, Cloudflare setup, Google Search Console account, and automated Pinterest growth bot.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
