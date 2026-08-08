import { Workspace, Product, Lead, Campaign, Deal, TelemetryStats } from '../types';

export const INITIAL_WORKSPACES: Workspace[] = [
  {
    id: 'ws-enterprise-01',
    name: 'Acme Digital Assets & SaaS Corp',
    slug: 'acme-digital',
    description: 'Primary corporate workspace managing digital SaaS platforms, web assets, and high-margin B2B services.',
    industry: 'Enterprise B2B SaaS & Tech',
    currency: 'USD',
    membersCount: 14,
    productsCount: 4,
    activeAgentsCount: 20,
    createdAt: '2026-01-15'
  },
  {
    id: 'ws-venture-02',
    name: 'Nexus Ventures Portfolio',
    slug: 'nexus-ventures',
    description: 'Venture studio workspace evaluating micro-SaaS acquisitions, digital product flips, and physical gear brands.',
    industry: 'Private Equity & Venture Studio',
    currency: 'USD',
    membersCount: 6,
    productsCount: 2,
    activeAgentsCount: 18,
    createdAt: '2026-03-01'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-saas-101',
    workspaceId: 'ws-enterprise-01',
    name: 'CloudPulse APM',
    tagline: 'Real-time infrastructure monitoring & log analytics platform for Kubernetes cluster management',
    type: 'saas',
    category: 'Developer Tools & Cloud Ops',
    description: 'High-growth B2B SaaS providing sub-millisecond observability, automated root cause analysis, and serverless log ingestion. Features 99.99% uptime with zero maintenance overhead.',
    url: 'https://cloudpulse-apm.io',
    askingPrice: 2450000,
    arr: 520000,
    mrr: 43330,
    grossProfitMargin: 88,
    churnRate: 1.2,
    techStack: ['React', 'TypeScript', 'Go', 'ClickHouse', 'Kubernetes', 'GraphQL', 'Tailwind CSS'],
    targetAudience: 'DevOps Directors, CTOs, VP of Engineering at Mid-Market SaaS (50-500 employees)',
    uniqueSellingPoints: [
      'Sub-millisecond query speed on billion-row ClickHouse clusters',
      'AI-driven root-cause telemetry diagnosis built directly into alerts',
      'Zero-agent auto-instrumentation for Node, Python, and Go microservices',
      'High net retention rate of 118%'
    ],
    valuation: {
      fairMarketValue: 2450000,
      conservativeValue: 2080000,
      optimisticValue: 2860000,
      arrMultiple: 4.7,
      ebitdaMultiple: 7.2,
      valuationFactors: [
        {
          factor: 'Low Monthly Churn (1.2%)',
          impact: 'positive',
          score: 94,
          explanation: 'Sub-1.5% monthly churn indicates strong product-market fit and high switching costs.'
        },
        {
          factor: '88% Gross Margin Profile',
          impact: 'positive',
          score: 92,
          explanation: 'Exceptional gross margins due to efficient ClickHouse log compression and serverless routing.'
        },
        {
          factor: 'Concentrated Lead Source',
          impact: 'negative',
          score: 65,
          explanation: '42% of inbound leads currently come from organic tech blog traffic, requiring paid ad diversification.'
        }
      ],
      suggestedPricingModels: [
        {
          tierName: 'Starter Dev',
          price: '$149/mo',
          billingFrequency: 'monthly',
          features: ['5 Node agents', '100GB Log storage', '30-day retention', 'Email alerts']
        },
        {
          tierName: 'Scale Team',
          price: '$499/mo',
          billingFrequency: 'monthly',
          features: ['25 Node agents', '1TB Log storage', '90-day retention', 'Slack & PagerDuty integration']
        },
        {
          tierName: 'Enterprise Core',
          price: '$1,999/mo',
          billingFrequency: 'annually',
          features: ['Unlimited agents', 'Custom retention', 'SOC2 Compliance docs', 'Dedicated Solutions Engineer']
        }
      ],
      valueDrivers: [
        'Proprietary AI telemetry engine',
        'Proven 118% Net Revenue Retention (NRR)',
        'Turnkey cloud deployment on AWS & GCP marketplace'
      ],
      riskFactors: [
        'Founder key-man dependency for sales engineering calls',
        'Need for SOC2 Type II audit completion'
      ],
      lastCalculatedAt: '2026-07-28'
    },
    activeStage: 'negotiation',
    createdAt: '2026-02-10',
    updatedAt: '2026-07-29'
  },
  {
    id: 'prod-asset-102',
    workspaceId: 'ws-enterprise-01',
    name: 'DevFlow Pro Asset',
    tagline: 'Premium developer documentation generator & API playground web application asset',
    type: 'web_asset',
    category: 'Developer Media & Tools',
    description: 'Monetized web asset generating passive affiliate revenue, developer tool sponsorships, and API subscriptions through automated OpenAPI doc rendering.',
    url: 'https://devflowpro.dev',
    askingPrice: 420000,
    arr: 110000,
    mrr: 9160,
    grossProfitMargin: 94,
    churnRate: 2.1,
    techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'Stripe', 'Algolia'],
    targetAudience: 'Developer Relations teams, API providers, SaaS startups',
    uniqueSellingPoints: [
      'Top 3 ranking on Google for "OpenAPI interactive docs generator"',
      '140,000 monthly active developer visitors',
      'Automated Stripe billing with zero overhead'
    ],
    valuation: {
      fairMarketValue: 420000,
      conservativeValue: 350000,
      optimisticValue: 495000,
      arrMultiple: 3.8,
      ebitdaMultiple: 4.5,
      valuationFactors: [
        {
          factor: 'Organic SEO Dominance',
          impact: 'positive',
          score: 96,
          explanation: 'Ranks #1-#3 for 85 high-intent developer keywords, driving 140k monthly sessions.'
        },
        {
          factor: 'Near-Zero Infrastructure Cost',
          impact: 'positive',
          score: 95,
          explanation: 'Monthly server cost under $180 via Vercel edge runtime and static generation.'
        }
      ],
      suggestedPricingModels: [
        {
          tierName: 'Single API Site',
          price: '$29/mo',
          billingFrequency: 'monthly',
          features: ['1 API spec', 'Custom domain', 'Basic themes']
        },
        {
          tierName: 'Pro API Suite',
          price: '$99/mo',
          billingFrequency: 'monthly',
          features: ['10 API specs', 'Interactive Sandbox', 'Analytics']
        }
      ],
      valueDrivers: ['Domain authority 64', 'Turnkey automated SaaS backend'],
      riskFactors: ['Dependence on organic search algorithm updates'],
      lastCalculatedAt: '2026-07-25'
    },
    activeStage: 'proposal',
    createdAt: '2026-03-12',
    updatedAt: '2026-07-29'
  },
  {
    id: 'prod-service-103',
    workspaceId: 'ws-enterprise-01',
    name: 'Nexus Copywriting Agency',
    tagline: 'AI-assisted B2B SaaS copywriting & conversion funnel optimization service',
    type: 'service',
    category: 'Productized Marketing Agency',
    description: 'Productized agency model offering monthly recurring retainers for B2B SaaS landing page rewrites, cold email sequences, and ad copy execution.',
    askingPrice: 650000,
    arr: 280000,
    mrr: 23330,
    grossProfitMargin: 72,
    churnRate: 3.5,
    techStack: ['Gemini AI Studio', 'Notion OS', 'Stripe', 'Webflow'],
    targetAudience: 'Series A & Series B SaaS founders looking for turnkey conversion copy',
    uniqueSellingPoints: [
      'Standardized SOPs allowing sub-contractor delivery in under 48 hours',
      'Long-term client retainers averaging 9 months',
      'Guaranteed 15%+ conversion uplift framework'
    ],
    activeStage: 'discovery',
    createdAt: '2026-04-05',
    updatedAt: '2026-07-28'
  },
  {
    id: 'prod-physical-104',
    workspaceId: 'ws-enterprise-01',
    name: 'AeroDesk Smart Workstation',
    tagline: 'Ergonomic smart standing desk with integrated wireless power & focus telemetry',
    type: 'physical_product',
    category: 'Consumer Hardware & Workspace',
    description: 'D2C & B2B workplace hardware brand featuring custom-milled hardwood standing desks with embedded wireless charging and companion mobile app analytics.',
    askingPrice: 1850000,
    arr: 680000,
    mrr: 56660,
    grossProfitMargin: 54,
    churnRate: 0.5,
    techStack: ['Shopify Plus', 'Klaviyo', 'Bluetooth Low Energy', 'React Native App'],
    targetAudience: 'Remote tech professionals, enterprise IT procurement teams, modern co-working spaces',
    uniqueSellingPoints: [
      'Patented wireless power desk surface',
      'Existing distribution agreements with 3 national office furniture resellers',
      '4.9-star average rating across 1,400+ verified customer reviews'
    ],
    activeStage: 'outreach',
    createdAt: '2026-05-01',
    updatedAt: '2026-07-26'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    productId: 'prod-saas-101',
    companyName: 'Dataview Systems Inc',
    contactName: 'Marcus Vance',
    email: 'marcus.vance@dataview-sys.com',
    linkedinUrl: 'https://linkedin.com/in/marcus-vance-cto',
    leadScore: 94,
    budget: 2500000,
    dealStage: 'negotiation',
    buyingIntentScore: 96,
    fitAnalysis: 'Strategic acquirer seeking to expand cloud observability portfolio. Perfect synergy with Dataview existing enterprise monitoring clients.',
    suggestedAngle: 'Highlight sub-millisecond ClickHouse engine performance and instant 118% Net Revenue Retention boost.',
    lastContacted: '2026-07-29',
    notes: [
      'Submitted preliminary counter-offer at $2.3M cash + $200k earnout.',
      'Requested technical audit of ClickHouse query engine and SOC2 roadmap.'
    ]
  },
  {
    id: 'lead-102',
    productId: 'prod-saas-101',
    companyName: 'Apex Cloud Holdings',
    contactName: 'Elena Rostova',
    email: 'elena.rostova@apexcloud.io',
    linkedinUrl: 'https://linkedin.com/in/elena-rostova-vp-m-a',
    leadScore: 89,
    budget: 2200000,
    dealStage: 'proposal',
    buyingIntentScore: 90,
    fitAnalysis: 'Private equity backed dev tools aggregator. High capacity to close quickly with standard APA terms.',
    suggestedAngle: 'Emphasize low monthly churn (1.2%) and automated recurring billing stability.',
    lastContacted: '2026-07-27',
    notes: [
      'Reviewed valuation report and requested 3-year P&L breakdown.',
      'Offered cash buyout at 4.2x ARR multiple.'
    ]
  },
  {
    id: 'lead-103',
    productId: 'prod-asset-102',
    companyName: 'MediaFlow Ventures',
    contactName: 'Julian Sterling',
    email: 'j.sterling@mediaflow.vc',
    leadScore: 87,
    budget: 450000,
    dealStage: 'proposal',
    buyingIntentScore: 88,
    fitAnalysis: 'Digital media holding company looking for high-DR developer portals to cross-promote developer tools.',
    suggestedAngle: 'Focus on 140k monthly organic developer visits and #1 Google rankings.',
    lastContacted: '2026-07-28',
    notes: ['Inquired about domain transfer timeline and Vercel hosting migration.']
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-201',
    productId: 'prod-saas-101',
    name: 'Enterprise Acquirer Cold Outreach Q3',
    channel: 'Email',
    status: 'active',
    agentRoles: ['BUYER_DISCOVERY', 'LEAD_QUALIFIER', 'EMAIL_OUTREACH', 'SALES_COPYWRITER'],
    leadsTargeted: 140,
    openRate: 64.2,
    clickRate: 28.5,
    replyRate: 18.9,
    convertedDeals: 3,
    budgetSpent: 1200,
    pipelineGenerated: 4650000,
    copyVariant: 'Pain-Point Angle: "Sub-millisecond K8s Observability for your Cloud Suite"',
    createdAt: '2026-07-01'
  },
  {
    id: 'camp-202',
    productId: 'prod-asset-102',
    name: 'Dev Media Buyers LinkedIn Sequence',
    channel: 'LinkedIn',
    status: 'active',
    agentRoles: ['SOCIAL_MARKETER', 'LEAD_QUALIFIER', 'SALES_COPYWRITER'],
    leadsTargeted: 85,
    openRate: 82.0,
    clickRate: 41.0,
    replyRate: 24.5,
    convertedDeals: 2,
    budgetSpent: 850,
    pipelineGenerated: 870000,
    copyVariant: 'Asset Flip Angle: "140k Monthly Organic Developers | Turnkey $9k MRR Web Asset"',
    createdAt: '2026-07-10'
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-301',
    productId: 'prod-saas-101',
    leadId: 'lead-101',
    title: 'CloudPulse Full Acquisition - Dataview Systems',
    value: 2450000,
    stage: 'negotiation',
    probability: 85,
    assignedAgent: 'NEGOTIATOR',
    expectedCloseDate: '2026-08-15',
    negotiationLog: [
      {
        timestamp: '2026-07-28 14:20',
        speaker: 'Buyer',
        message: 'We like the asset but can only anchor at $2.1M cash upfront.',
        counterOffer: 2100000,
        recommendedTactic: 'Counter at $2.4M with 6-month founder advisory retainer included.'
      },
      {
        timestamp: '2026-07-28 16:45',
        speaker: 'Nexus Agent',
        message: 'Based on 88% gross margin and 118% NRR, $2.1M underestimates the 1.2% churn retention. We can agree to $2.38M with 10% held in 90-day escrow.',
        counterOffer: 2380000,
        recommendedTactic: 'Protect price floor at $2.35M.'
      }
    ]
  }
];

export const INITIAL_TELEMETRY: TelemetryStats = {
  totalRevenueTarget: 10000000,
  pipelineValue: 5570000,
  closedRevenue: 1850000,
  activeLeadsCount: 42,
  winRate: 34.8,
  totalAgentCalls: 4890,
  avgAgentLatencyMs: 445,
  aiTokenConsumption: 1420500,
  agentReliabilityScore: 99.4
};
