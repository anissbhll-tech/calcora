import React, { useState, useMemo } from 'react';
import { StartupArchitectBlueprint } from './StartupArchitectBlueprint';
import {
  TrendingUp,
  DollarSign,
  Award,
  Clock,
  Search,
  CheckCircle2,
  Sparkles,
  Layers,
  BarChart3,
  Globe,
  Zap,
  ShieldCheck,
  Target,
  FileText,
  Building2,
  Cpu,
  Calculator as CalcIcon,
  Code2,
  Download,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  ArrowUpRight,
  Filter,
  Check
} from 'lucide-react';

export interface DigitalOpportunity {
  rank: number;
  name: string;
  category: 'Calculator Web Suites' | 'AI Micro-SaaS' | 'Dev & Tech Tools' | 'PDF & Doc Tools' | 'Finance & Real Estate' | 'E-Commerce & Marketing';
  description: string;
  targetMarket: string;
  keyFeatures: string[];
  seoPotential: 'Extremely High' | 'Very High' | 'High' | 'Medium-High' | 'Medium' | 'Extremely High (Seasonal Traffic)';
  monetization: string;
  devTimeWeeks: number;
  pagesCount: number;
  revenueModel: string;
  valuationBeforeLaunch: number; // e.g. $8,000
  valuationAfterLaunch: number;  // e.g. $120,000
  score: number; // 1-100
  scoreBreakdown: {
    demand: number;
    competition: number; // higher means less competitive / easier to win
    seo: number;
    monetization: number;
    devEase: number;
    scalability: number;
    exitValue: number;
  };
  whyBest?: string;
}

export const OPPORTUNITIES: DigitalOpportunity[] = [
  {
    rank: 1,
    name: "Multi-Niche Programmatic Calculator Suite (Calcora)",
    category: "Calculator Web Suites",
    description: "A high-density programmatic SEO platform hosting 100+ hyper-targeted financial, health, construction, and math calculators with structured schemas and zero API server costs.",
    targetMarket: "Everyday consumers, realtors, contractors, students, investors searching long-tail queries globally.",
    keyFeatures: [
      "100+ interactive specialized calculators",
      "Programmatic JSON-LD Schema integration for Google rich snippets",
      "Client-side execution with zero cloud infrastructure cost",
      "AdSense & Ezoic layout optimization slots",
      "White-label PDF report exporter for user lead generation",
      "Multi-language i18n support"
    ],
    seoPotential: "Extremely High",
    monetization: "Google AdSense / Mediavine ads + Lead generation affiliates (Mortgage/Insurance) + Premium PDF export reports ($19/mo)",
    devTimeWeeks: 3,
    pagesCount: 150,
    revenueModel: "Programmatic Display Ads + Lead Gen Affiliate Commissions + Pro PDF Reports",
    valuationBeforeLaunch: 8500,
    valuationAfterLaunch: 145000,
    score: 97,
    scoreBreakdown: {
      demand: 98,
      competition: 92,
      seo: 99,
      monetization: 95,
      devEase: 94,
      scalability: 100,
      exitValue: 99
    },
    whyBest: "Combines zero server hosting costs, immediate organic traffic via 100+ long-tail keywords, multi-channel monetization (Ads + Affiliates), and high marketplace liquidity on Flippa/Acquire.com where buyers love passive content/utility assets with high profit margins (95%+)."
  },
  {
    rank: 2,
    name: "AI Resume & ATS Cover Letter Optimizer (CVify)",
    category: "AI Micro-SaaS",
    description: "Lightweight AI micro-SaaS analyzing job descriptions against user resumes to optimize ATS matching scores and generate tailored cover letters using Gemini Flash.",
    targetMarket: "Job seekers, career changers, fresh graduates, tech professionals globally.",
    keyFeatures: [
      "Instant ATS resume compatibility match score",
      "Keyword gap analysis with missing technical skill detection",
      "AI section rewriter powered by Gemini 1.5 Flash",
      "WASM client-side PDF resume generator",
      "Target job description scraper"
    ],
    seoPotential: "High",
    monetization: "Freemium (3 free scans/mo, $9.99/mo or $4.99 per single export)",
    devTimeWeeks: 3,
    pagesCount: 25,
    revenueModel: "SaaS Monthly Subscription + One-Time Export Pass",
    valuationBeforeLaunch: 6500,
    valuationAfterLaunch: 110000,
    score: 94,
    scoreBreakdown: {
      demand: 96,
      competition: 88,
      seo: 92,
      monetization: 96,
      devEase: 90,
      scalability: 96,
      exitValue: 95
    }
  },
  {
    rank: 3,
    name: "B2B Cold Email & Sequence Spintax Generator (InboxCraft)",
    category: "Dev & Tech Tools",
    description: "Browser-based B2B copy tool generating high-converting email sequences, spintax variations, and spam-trigger keyword checks for sales outreach agencies.",
    targetMarket: "Agency owners, SDRs, freelance recruiters, B2B SaaS founders.",
    keyFeatures: [
      "Spintax syntax checker & nested variation generator",
      "AI tone variator & spam trigger score analyzer",
      "Outreach sequence previewer with delay timers",
      "CSV & Instantly/Smartlead format export"
    ],
    seoPotential: "High",
    monetization: "SaaS Subscription ($15/mo Pro, $39/mo Team) + AppSumo Lifetime Deal",
    devTimeWeeks: 2,
    pagesCount: 16,
    revenueModel: "Monthly Recurring Revenue (MRR) + LTD campaign",
    valuationBeforeLaunch: 5500,
    valuationAfterLaunch: 95000,
    score: 92,
    scoreBreakdown: {
      demand: 91,
      competition: 89,
      seo: 90,
      monetization: 95,
      devEase: 95,
      scalability: 94,
      exitValue: 93
    }
  },
  {
    rank: 4,
    name: "Private PDF Engine & WebAssembly Document Converter (DocLite)",
    category: "PDF & Doc Tools",
    description: "Client-side web assembly PDF tools for merging, splitting, compressing, watermarking, and converting PDFs with 100% privacy compliance and zero server storage.",
    targetMarket: "Office workers, students, legal admins, small business owners hesitant to upload sensitive files online.",
    keyFeatures: [
      "Zero-server upload PDF processing via pdf-lib & WASM",
      "Batch PDF compression & page re-ordering",
      "PDF to JPG/PNG image extraction",
      "Digital e-signature drawer & watermark overlay"
    ],
    seoPotential: "Extremely High",
    monetization: "Display Ads (AdSense/Ezoic) + Pro tier for unlimited file sizes ($6/mo)",
    devTimeWeeks: 4,
    pagesCount: 45,
    revenueModel: "Display Ads + Pro Subscription Pass",
    valuationBeforeLaunch: 7500,
    valuationAfterLaunch: 125000,
    score: 91,
    scoreBreakdown: {
      demand: 99,
      competition: 82,
      seo: 98,
      monetization: 88,
      devEase: 88,
      scalability: 99,
      exitValue: 92
    }
  },
  {
    rank: 5,
    name: "SaaS Churn & LTV Calculator + Cohort Analyzer (MetricPulse)",
    category: "Finance & Real Estate",
    description: "Financial analytics tool for bootstrapped founders to calculate net revenue retention, LTV:CAC ratios, payback periods, and cohort retention charts without API integrations.",
    targetMarket: "Solopreneurs, indie hackers, micro-VCs, angel investors evaluating acquisition deals.",
    keyFeatures: [
      "Stripe CSV export auto-parser",
      "Cohort retention heatmap generator",
      "Benchmark comparison against industry standards",
      "Shareable investor pitch deck graphics & PDF exports"
    ],
    seoPotential: "High",
    monetization: "Freemium + Pro pitch deck report export ($19 one-time or $12/mo)",
    devTimeWeeks: 2,
    pagesCount: 14,
    revenueModel: "One-Time Export Pass + SaaS Subscription",
    valuationBeforeLaunch: 5000,
    valuationAfterLaunch: 85000,
    score: 90,
    scoreBreakdown: {
      demand: 88,
      competition: 91,
      seo: 89,
      monetization: 91,
      devEase: 96,
      scalability: 95,
      exitValue: 90
    }
  },
  {
    rank: 6,
    name: "DevTool: JSON Schema & API Mock Generator (MockAPI Studio)",
    category: "Dev & Tech Tools",
    description: "Instant mock REST API endpoint generator from JSON/TypeScript interfaces with configurable latency, dynamic fake data, and shareable URLs.",
    targetMarket: "Frontend developers, QA engineers, mobile app developers, coding bootcamp students.",
    keyFeatures: [
      "Instant client-side mock endpoint builder",
      "Faker.js integration for real names, addresses, UUIDs",
      "JSON-to-TypeScript interface converter",
      "OpenAPI 3.0 spec importer/exporter"
    ],
    seoPotential: "High",
    monetization: "Freemium (5 endpoints free, $9/mo for persistent mock endpoints & custom headers)",
    devTimeWeeks: 2,
    pagesCount: 18,
    revenueModel: "Freemium SaaS MRR",
    valuationBeforeLaunch: 4500,
    valuationAfterLaunch: 75000,
    score: 89,
    scoreBreakdown: {
      demand: 90,
      competition: 87,
      seo: 91,
      monetization: 86,
      devEase: 94,
      scalability: 96,
      exitValue: 88
    }
  },
  {
    rank: 7,
    name: "Programmatic Real Estate ROI & Cap Rate Suite (PropCalc Studio)",
    category: "Finance & Real Estate",
    description: "Interactive real estate investment calculator suite evaluating cash-on-cash return, 1031 exchange tax savings, BRRRR strategy, and rental cash flow with downloadable client reports.",
    targetMarket: "Rental property investors, mortgage brokers, real estate agents, wholesalers.",
    keyFeatures: [
      "Multi-property cash flow & equity projection graph",
      "Amortization breakdown with extra principal sliders",
      "BRRRR (Buy, Rehab, Rent, Refinance, Repeat) modeler",
      "White-label branded PDF report exporter"
    ],
    seoPotential: "Very High",
    monetization: "Mortgage lender / broker lead generation ($30-$80/lead) + White-label PDF exports ($19/mo)",
    devTimeWeeks: 3,
    pagesCount: 35,
    revenueModel: "High-Ticket Lead Gen + Pro SaaS Subscription",
    valuationBeforeLaunch: 6000,
    valuationAfterLaunch: 115000,
    score: 88,
    scoreBreakdown: {
      demand: 93,
      competition: 84,
      seo: 94,
      monetization: 96,
      devEase: 89,
      scalability: 92,
      exitValue: 91
    }
  },
  {
    rank: 8,
    name: "AI UGC Ad Script & Hook Generator (HookFuel AI)",
    category: "AI Micro-SaaS",
    description: "AI marketing tool generating viral TikTok/Reels UGC video scripts, scroll-stopping hooks, and visual storyboard ideas for DTC e-commerce brands.",
    targetMarket: "E-commerce store owners, TikTok creators, media buyers, agency marketers.",
    keyFeatures: [
      "50+ proven scroll-stopping hook formulas",
      "AI script generator from product page URL input",
      "Marketing angle selector (Problem-Solution, Unboxing, Negative Hook)",
      "Teleprompter-ready text exporter"
    ],
    seoPotential: "High",
    monetization: "Token packs / monthly subscription ($19/mo for unlimited scripts)",
    devTimeWeeks: 3,
    pagesCount: 20,
    revenueModel: "Credit Packs + Monthly SaaS Subscription",
    valuationBeforeLaunch: 5000,
    valuationAfterLaunch: 90000,
    score: 87,
    scoreBreakdown: {
      demand: 92,
      competition: 80,
      seo: 86,
      monetization: 94,
      devEase: 88,
      scalability: 93,
      exitValue: 90
    }
  },
  {
    rank: 9,
    name: "Subnet CIDR & Cloud VPC Visualizer (NetCidr Pro)",
    category: "Dev & Tech Tools",
    description: "Network utility suite for visual IPv4/IPv6 CIDR subnetting, IP range splitting, cloud VPC subnet planning (AWS/GCP/Azure), and wildcard mask conversion.",
    targetMarket: "DevOps engineers, cloud architects, CCNA/AWS students, sysadmins.",
    keyFeatures: [
      "Binary/decimal IP & CIDR mask visualizer",
      "Cloud VPC multi-subnet allocation matrix",
      "Downloadable architecture diagram builder",
      "CIDR cheat sheets and cheat-table export"
    ],
    seoPotential: "High",
    monetization: "Google AdSense + Cloud hosting affiliate banners (AWS/DigitalOcean/Linode credits) + Pro exports",
    devTimeWeeks: 2,
    pagesCount: 25,
    revenueModel: "Display Ads + Cloud Affiliate Marketing",
    valuationBeforeLaunch: 4000,
    valuationAfterLaunch: 65000,
    score: 86,
    scoreBreakdown: {
      demand: 87,
      competition: 90,
      seo: 92,
      monetization: 82,
      devEase: 96,
      scalability: 96,
      exitValue: 84
    }
  },
  {
    rank: 10,
    name: "Nutritional Macro & Recipe Scaling Hub (FitMacro Pro)",
    category: "Calculator Web Suites",
    description: "Fitness web app combining IIFYM (If It Fits Your Macros) calculation, custom calorie target adjustments, and automatic recipe portion scaling.",
    targetMarket: "Fitness coaches, bodybuilders, keto dieters, meal prep enthusiasts.",
    keyFeatures: [
      "TDEE & macro ratio calculator (Keto, High Protein, Balanced)",
      "Recipe ingredient scaler with unit conversion",
      "Printable weekly meal prep planner",
      "Grocery item shopping list generator"
    ],
    seoPotential: "High",
    monetization: "Affiliate links for supplement brands, fitness app referral commissions, AdSense",
    devTimeWeeks: 2,
    pagesCount: 30,
    revenueModel: "Affiliate Commissions + Display Advertising",
    valuationBeforeLaunch: 4200,
    valuationAfterLaunch: 70000,
    score: 85,
    scoreBreakdown: {
      demand: 94,
      competition: 81,
      seo: 93,
      monetization: 85,
      devEase: 93,
      scalability: 92,
      exitValue: 84
    }
  },
  {
    rank: 11,
    name: "Freelance Rate & Invoice Tax Estimator (SoloTax & Rate)",
    category: "Finance & Real Estate",
    description: "Global freelancer rate calculator factoring in target take-home pay, self-employment taxes, non-billable hours, and overhead, generating professional quotes.",
    targetMarket: "Freelancers, contractors, digital nomads, agency owners.",
    keyFeatures: [
      "Minimum hourly & day rate calculator",
      "Quarterly estimated tax calculator by country/state",
      "Customizable client proposal quote generator",
      "Downloadable PDF rate sheet"
    ],
    seoPotential: "High",
    monetization: "Affiliate links to bookkeeping tools (FreshBooks, QuickBooks), banking sponsorships, ads",
    devTimeWeeks: 2,
    pagesCount: 20,
    revenueModel: "Affiliate Sponsorships + Display Ads",
    valuationBeforeLaunch: 3800,
    valuationAfterLaunch: 60000,
    score: 84,
    scoreBreakdown: {
      demand: 86,
      competition: 88,
      seo: 89,
      monetization: 84,
      devEase: 94,
      scalability: 91,
      exitValue: 82
    }
  },
  {
    rank: 12,
    name: "AI Micro-SaaS: Terms of Service & Privacy Generator (PolicyCraft AI)",
    category: "AI Micro-SaaS",
    description: "GDPR/CCPA compliant legal document generator tailored for SaaS, e-commerce stores, mobile apps, and newsletters with automated compliance wizard.",
    targetMarket: "Startup founders, app developers, e-commerce store owners, web agencies.",
    keyFeatures: [
      "Multi-jurisdiction compliance wizard",
      "Dynamic cookie policy generator",
      "Embeddable script for live policy updates",
      "App Store & Google Play privacy nutrition label helper"
    ],
    seoPotential: "High",
    monetization: "Pay-per-document ($14.99) or annual hosting plan ($29/yr)",
    devTimeWeeks: 3,
    pagesCount: 22,
    revenueModel: "One-Time Document Purchase + Annual SaaS Hosting",
    valuationBeforeLaunch: 5000,
    valuationAfterLaunch: 85000,
    score: 83,
    scoreBreakdown: {
      demand: 89,
      competition: 78,
      seo: 88,
      monetization: 91,
      devEase: 88,
      scalability: 90,
      exitValue: 84
    }
  },
  {
    rank: 13,
    name: "Student GPA & Final Grade Target Predictor (Gradely)",
    category: "Calculator Web Suites",
    description: "High school and college academic planner featuring weighted/unweighted GPA calculation, final exam grade target calculator, and semester GPA tracking.",
    targetMarket: "High school students, university students, parents, college prep advisors.",
    keyFeatures: [
      "Weighted vs Unweighted GPA converter",
      "Final exam score needed calculator",
      "Semester grade goal simulator",
      "Exportable transcript PDF summary"
    ],
    seoPotential: "Extremely High (Seasonal Traffic)",
    monetization: "Student loan / test prep (Princeton Review, Kaplan) affiliate programs + AdSense",
    devTimeWeeks: 2,
    pagesCount: 28,
    revenueModel: "Test Prep Affiliates + Display Ads",
    valuationBeforeLaunch: 3500,
    valuationAfterLaunch: 55000,
    score: 82,
    scoreBreakdown: {
      demand: 95,
      competition: 76,
      seo: 96,
      monetization: 79,
      devEase: 95,
      scalability: 92,
      exitValue: 79
    }
  },
  {
    rank: 14,
    name: "Contractor Construction Material & Cost Estimator (BuildExact)",
    category: "Calculator Web Suites",
    description: "Specialized material quantity estimator for trade contractors calculating concrete yardage, drywall sheets, roof shingles, framing studs, and lumber costs.",
    targetMarket: "DIY home renovators, general contractors, carpenters, landscapers.",
    keyFeatures: [
      "Multi-trade material estimation tabs",
      "Waste percentage factor slider",
      "Local material price multiplier",
      "Job site material quote PDF exporter"
    ],
    seoPotential: "Very High",
    monetization: "Home Improvement Lead Gen (Angi, HomeAdvisor APIs), display ads, hardware store affiliate links",
    devTimeWeeks: 3,
    pagesCount: 40,
    revenueModel: "Lead Gen Commissions + Hardware Affiliate Ads",
    valuationBeforeLaunch: 4500,
    valuationAfterLaunch: 80000,
    score: 81,
    scoreBreakdown: {
      demand: 91,
      competition: 82,
      seo: 92,
      monetization: 87,
      devEase: 89,
      scalability: 88,
      exitValue: 82
    }
  },
  {
    rank: 15,
    name: "SEO Schema Markup & Rich Snippet Generator (SchemaCraft)",
    category: "Dev & Tech Tools",
    description: "Visual JSON-LD schema builder supporting FAQ, HowTo, Product, Organization, Article, LocalBusiness, and Event schemas with live Google Rich Results validation preview.",
    targetMarket: "SEO specialists, web developers, content marketers, agency owners.",
    keyFeatures: [
      "12+ JSON-LD schema generators",
      "Live Google syntax preview & copy to clipboard",
      "Bulk URL schema validator",
      "Site audit snippet downloader"
    ],
    seoPotential: "High",
    monetization: "Free single generator + Pro Unlimited & API access ($15/mo), display ads",
    devTimeWeeks: 2,
    pagesCount: 20,
    revenueModel: "Freemium SaaS + Display Ads",
    valuationBeforeLaunch: 3500,
    valuationAfterLaunch: 58000,
    score: 80,
    scoreBreakdown: {
      demand: 85,
      competition: 84,
      seo: 88,
      monetization: 82,
      devEase: 95,
      scalability: 92,
      exitValue: 80
    }
  },
  {
    rank: 16,
    name: "AI Speech-to-Text & Subtitle Formatter (SubScribe AI)",
    category: "AI Micro-SaaS",
    description: "Client-side Whisper WASM audio transcription tool auto-generating SRT/VTT subtitle files with custom timing offsets and word highlights.",
    targetMarket: "Video editors, podcasters, YouTubers, online educators.",
    keyFeatures: [
      "Local browser transcription with zero server costs via Whisper.cpp",
      "SRT and VTT subtitle exporter",
      "Timeline subtitle editor with timestamp sync",
      "Multi-language translation option"
    ],
    seoPotential: "High",
    monetization: "Freemium (Free up to 10 min audio, $7/mo or $29 lifetime for batch export)",
    devTimeWeeks: 3,
    pagesCount: 16,
    revenueModel: "Freemium SaaS MRR + Lifetime License",
    valuationBeforeLaunch: 4800,
    valuationAfterLaunch: 72000,
    score: 79,
    scoreBreakdown: {
      demand: 88,
      competition: 77,
      seo: 85,
      monetization: 84,
      devEase: 84,
      scalability: 94,
      exitValue: 80
    }
  },
  {
    rank: 17,
    name: "Solar Power & Battery Storage Payback Estimator (SolarPayback)",
    category: "Finance & Real Estate",
    description: "Residential solar panel ROI calculator evaluating federal tax credits (ITC), utility rate hikes, net metering rates, battery backup sizing, and payback period.",
    targetMarket: "Homeowners considering solar, solar sales reps, green tech bloggers.",
    keyFeatures: [
      "Zip-code solar radiance estimator model",
      "25-year cumulative cash flow graph",
      "Battery backup ROI calculator",
      "Downloadable homeowner quote summary"
    ],
    seoPotential: "Medium-High",
    monetization: "Solar installer lead generation ($50 - $150 per verified homeowner quote lead)",
    devTimeWeeks: 3,
    pagesCount: 25,
    revenueModel: "High-Ticket Lead Generation",
    valuationBeforeLaunch: 4500,
    valuationAfterLaunch: 90000,
    score: 78,
    scoreBreakdown: {
      demand: 86,
      competition: 80,
      seo: 84,
      monetization: 95,
      devEase: 86,
      scalability: 84,
      exitValue: 85
    }
  },
  {
    rank: 18,
    name: "Ecommerce Break-Even & Ad Spend Calculator (ROASMetrics)",
    category: "E-Commerce & Marketing",
    description: "E-commerce unit economics tool calculating target ROAS, break-even ad cost per acquisition (CPA), gross profit margin after shipping & payment fees.",
    targetMarket: "Shopify store owners, Amazon FBA sellers, Meta/TikTok ad agency managers.",
    keyFeatures: [
      "Break-even ROAS matrix calculator",
      "COGS & landed cost estimator",
      "Ad budget scenario simulator",
      "PDF summary share link generator"
    ],
    seoPotential: "Medium",
    monetization: "Affiliate links to Shopify, SaaS tool sponsorships, display ads",
    devTimeWeeks: 2,
    pagesCount: 15,
    revenueModel: "Affiliate Sponsorships + Display Ads",
    valuationBeforeLaunch: 3200,
    valuationAfterLaunch: 50000,
    score: 77,
    scoreBreakdown: {
      demand: 82,
      competition: 85,
      seo: 80,
      monetization: 83,
      devEase: 95,
      scalability: 90,
      exitValue: 77
    }
  },
  {
    rank: 19,
    name: "Audio Noise Remover & Voice Enhancer (CleanVoice Web)",
    category: "Dev & Tech Tools",
    description: "Browser-based audio cleanup utility removing background hums, fan noise, and clicks using WebAudio DSP directly in the client browser.",
    targetMarket: "Podcasters, voiceover artists, remote workers, webinar hosts.",
    keyFeatures: [
      "Real-time audio spectral cleaning preview",
      "Noise reduction threshold & high-pass filter",
      "WAV and MP3 download exporter",
      "Zero audio file uploads (100% private)"
    ],
    seoPotential: "High",
    monetization: "Display Ads + Pro high-bitrate export subscription ($8/mo)",
    devTimeWeeks: 3,
    pagesCount: 14,
    revenueModel: "Display Ads + Pro Subscription Pass",
    valuationBeforeLaunch: 3800,
    valuationAfterLaunch: 58000,
    score: 76,
    scoreBreakdown: {
      demand: 85,
      competition: 78,
      seo: 86,
      monetization: 79,
      devEase: 82,
      scalability: 94,
      exitValue: 77
    }
  },
  {
    rank: 20,
    name: "Time Zone Meeting Planner & World Clock Matrix (ZoneSync)",
    category: "E-Commerce & Marketing",
    description: "Visual overlap finder for global distributed teams, calculating overlapping working hours, daylight savings shifts, and shareable calendar invitation links.",
    targetMarket: "Remote team leads, international freelancers, digital nomads, sales reps.",
    keyFeatures: [
      "Multi-city time zone overlap slider",
      "Golden working hours highlight",
      "Instant Google Calendar event link generator",
      "Team custom permalink saver"
    ],
    seoPotential: "Very High",
    monetization: "Display ads + Calendar integrations + Enterprise team workspace ($5/user/mo)",
    devTimeWeeks: 1,
    pagesCount: 18,
    revenueModel: "Display Ads + SaaS Subscriptions",
    valuationBeforeLaunch: 2800,
    valuationAfterLaunch: 45000,
    score: 75,
    scoreBreakdown: {
      demand: 90,
      competition: 72,
      seo: 92,
      monetization: 74,
      devEase: 97,
      scalability: 91,
      exitValue: 72
    }
  }
];

export const OpportunityScout: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'valuation' | 'devTime'>('score');
  const [selectedOpportunity, setSelectedOpportunity] = useState<DigitalOpportunity | null>(OPPORTUNITIES[0]);
  const [viewMode, setViewMode] = useState<'rankings' | 'blueprint'>('rankings');

  // Flip Valuation Estimator State
  const [calcMonthlyRevenue, setCalcMonthlyRevenue] = useState<number>(3500);
  const [calcProfitMargin, setCalcProfitMargin] = useState<number>(92);
  const [calcMultiple, setCalcMultiple] = useState<number>(36);

  const estimatedMonthlyNetProfit = (calcMonthlyRevenue * (calcProfitMargin / 100));
  const estimatedExitPrice = estimatedMonthlyNetProfit * calcMultiple;

  const categories = ['All', 'Calculator Web Suites', 'AI Micro-SaaS', 'Dev & Tech Tools', 'PDF & Doc Tools', 'Finance & Real Estate', 'E-Commerce & Marketing'];

  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES.filter(opp => {
      const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
      const matchesSearch = opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            opp.targetMarket.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'valuation') return b.valuationAfterLaunch - a.valuationAfterLaunch;
      if (sortBy === 'devTime') return a.devTimeWeeks - b.devTimeWeeks;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="relative bg-slate-900 rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-2xl mb-10 border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-emerald-500/20 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Micro-SaaS & Flip Opportunity Scout 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Top 20 Build-to-Flip Digital Businesses
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
            Ranked market analysis of 2-8 week build projects ready for monetization and high-multiple exit sales on <span className="text-sky-400 font-semibold">Acquire.com</span>, <span className="text-emerald-400 font-semibold">Flippa</span>, and <span className="text-indigo-400 font-semibold">SideProjectors</span>.
          </p>

          {/* 7 Strict Feasibility Guardrails Banner */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                100% Vetted: The 7 Non-Negotiable Acquisition Audit Guardrails
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[11px] font-medium text-slate-300">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1. Solo Founder (No Big Team)</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>2. Bootstrap ($0–$100 Infra)</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>3. Predictable Organic Traffic</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>4. 0 Legal Liability Risk</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>5. High-Margin Monetization</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>6. ≤ 8 Weeks Build Time</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>7. High Marketplace Resale</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Top Opportunity</div>
              <div className="text-lg font-bold text-amber-400">Multi-Niche Calc Suite</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Avg Build Window</div>
              <div className="text-lg font-bold text-indigo-300">2 – 4 Weeks</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Avg Post-Launch Exit</div>
              <div className="text-lg font-bold text-emerald-400">$45,000 – $145,000+</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Target Multiple</div>
              <div className="text-lg font-bold text-sky-400">28x – 42x Monthly MRR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher Bar */}
      <div className="flex items-center gap-3 mb-8 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setViewMode('rankings')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            viewMode === 'rankings'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-indigo-500" />
          <span>Top 20 Opportunity Rankings</span>
        </button>
        <button
          onClick={() => setViewMode('blueprint')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            viewMode === 'blueprint'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>#1 Calcora Startup Architecture Blueprint</span>
        </button>
      </div>

      {viewMode === 'blueprint' ? (
        <StartupArchitectBlueprint />
      ) : (
        <>
          {/* Interactive Controls & Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search opportunity, tech, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-800"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="score">Overall Opportunity Score</option>
              <option value="valuation">Post-Launch Exit Price</option>
              <option value="devTime">Fastest Build Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Opportunities List & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {filteredOpportunities.length} Digital Assets
            </span>
            <span className="text-xs text-indigo-600 font-semibold">
              Click any project for deep-dive analysis
            </span>
          </div>

          {filteredOpportunities.map((opp) => {
            const isSelected = selectedOpportunity?.rank === opp.rank;
            return (
              <div
                key={opp.rank}
                onClick={() => setSelectedOpportunity(opp)}
                className={`cursor-pointer bg-white rounded-2xl p-5 border transition-all duration-200 shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-indigo-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-sm ${
                      opp.rank === 1 ? 'bg-amber-400 text-slate-900' :
                      opp.rank <= 3 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      #{opp.rank}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        {opp.name}
                        {opp.rank === 1 && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                            #1 BEST FLIP
                          </span>
                        )}
                      </h3>
                      <span className="text-xs font-medium text-slate-500">{opp.category}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900 flex items-center justify-end gap-1">
                      <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                      {opp.score}<span className="text-xs font-normal text-slate-400">/100</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Post-Exit: ${opp.valuationAfterLaunch.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                  {opp.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Build Time</span>
                    <span className="font-bold text-slate-700">{opp.devTimeWeeks} Weeks</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pre-Launch Value</span>
                    <span className="font-bold text-slate-700">${opp.valuationBeforeLaunch.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">SEO Potential</span>
                    <span className="font-bold text-indigo-600">{opp.seoPotential}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane (5 Cols) */}
        <div className="lg:col-span-5">
          {selectedOpportunity ? (
            <div className="sticky top-6 bg-white rounded-3xl p-6 shadow-lg border border-slate-200 space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                    {selectedOpportunity.category}
                  </span>
                  <div className="text-xs font-bold text-slate-500">
                    Rank #{selectedOpportunity.rank} of 20
                  </div>
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-2">
                  {selectedOpportunity.name}
                </h2>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {selectedOpportunity.description}
                </p>
              </div>

              {/* Score breakdown metrics */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Investment Rating Matrix
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">Market Demand</span>
                    <div className="text-sm font-extrabold text-slate-800">{selectedOpportunity.scoreBreakdown.demand}/100</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">SEO Dominance</span>
                    <div className="text-sm font-extrabold text-slate-800">{selectedOpportunity.scoreBreakdown.seo}/100</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">Monetization Ease</span>
                    <div className="text-sm font-extrabold text-slate-800">{selectedOpportunity.scoreBreakdown.monetization}/100</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">Exit Liquidity</span>
                    <div className="text-sm font-extrabold text-slate-800">{selectedOpportunity.scoreBreakdown.exitValue}/100</div>
                  </div>
                </div>
              </div>

              {/* Valuation & ROI Highlights */}
              <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-4 rounded-2xl border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Estimated Marketplace Exit Valuation
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Codebase Only (Turnkey)</span>
                    <span className="text-base font-extrabold text-slate-700">${selectedOpportunity.valuationBeforeLaunch.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Post-Launch (6-12 Months MRR)</span>
                    <span className="text-xl font-black text-emerald-600">${selectedOpportunity.valuationAfterLaunch.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-[11px] text-emerald-700 leading-tight">
                  Calculated based on 30x–36x average ARR/MRR multiples on Acquire.com & Flippa.
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Scope & Capabilities
                </h4>
                <ul className="space-y-1.5">
                  {selectedOpportunity.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Revenue & Target Audience */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Target Audience</span>
                  <p className="text-slate-600">{selectedOpportunity.targetMarket}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Revenue Model</span>
                  <p className="text-slate-600">{selectedOpportunity.revenueModel}</p>
                </div>
                {selectedOpportunity.whyBest && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs leading-relaxed">
                    <strong className="block mb-1 text-amber-950 font-bold flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-600" />
                      Why This Is The #1 Opportunity:
                    </strong>
                    {selectedOpportunity.whyBest}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center text-slate-400">
              Select an opportunity on the left to inspect detailed financial projections and specs.
            </div>
          )}
        </div>
      </div>

      {/* Interactive Micro-SaaS Flip Valuation Calculator */}
      <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <BarChart3 className="w-4 h-4" />
            Marketplace Acquisition Valuation Calculator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            Estimate Your Digital Asset Flip Valuation
          </h2>
          <p className="text-slate-600 text-sm">
            Adjust monthly revenue, profit margin, and marketplace multiple to estimate your potential listing exit price on Acquire.com or Flippa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Target Monthly Revenue ($)
            </label>
            <input
              type="number"
              value={calcMonthlyRevenue}
              onChange={(e) => setCalcMonthlyRevenue(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-400">e.g. $3,500/mo from ads + affiliates</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Net Profit Margin (%)
            </label>
            <input
              type="number"
              value={calcProfitMargin}
              onChange={(e) => setCalcProfitMargin(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-400">Calculators & WASM tools typically achieve 90-95% net margins</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Valuation Multiple (Months MRR)
            </label>
            <input
              type="number"
              value={calcMultiple}
              onChange={(e) => setCalcMultiple(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
            />
            <span className="text-[11px] text-slate-400">Standard range is 30x – 42x monthly net profit</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-1">
              Estimated Marketplace Sale Price (Acquire / Flippa)
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">
              ${Math.round(estimatedExitPrice).toLocaleString()}
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              Based on ${Math.round(estimatedMonthlyNetProfit).toLocaleString()}/mo net profit at a {calcMultiple}x multiple.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#opportunity-list"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Explore Top Opportunities Above
            </a>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
