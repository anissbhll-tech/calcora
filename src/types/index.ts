// ==========================================
// NEXUS AI SALES OS - DOMAIN TYPE DEFINITIONS
// ==========================================

export type NavigationTab = 
  | 'dashboard'
  | 'agent-command'
  | 'product-portfolio'
  | 'onboarding-wizard'
  | 'valuation-engine'
  | 'lead-scout'
  | 'campaign-studio'
  | 'negotiation-hub'
  | 'analytics'
  | 'settings';

export type UserRole = 'SUPER_ADMIN' | 'WORKSPACE_ADMIN' | 'SALES_DIRECTOR' | 'AGENT_OPERATOR' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  currency: string;
  membersCount: number;
  productsCount: number;
  activeAgentsCount: number;
  createdAt: string;
}

export type ProductType = 'saas' | 'web_asset' | 'digital_product' | 'service' | 'physical_product';

export type DealStage = 'prospect' | 'outreach' | 'discovery' | 'proposal' | 'negotiation' | 'closing' | 'won' | 'lost';

export interface ProductValuation {
  fairMarketValue: number;
  conservativeValue: number;
  optimisticValue: number;
  arrMultiple: number;
  ebitdaMultiple: number;
  valuationFactors: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    score: number; // 1-100
    explanation: string;
  }[];
  suggestedPricingModels: {
    tierName: string;
    price: string;
    billingFrequency: 'monthly' | 'annually' | 'one-time';
    features: string[];
  }[];
  valueDrivers: string[];
  riskFactors: string[];
  lastCalculatedAt: string;
}

export interface Product {
  id: string;
  workspaceId: string;
  name: string;
  tagline: string;
  type: ProductType;
  category: string;
  description: string;
  url?: string;
  askingPrice: number;
  arr: number; // Annual Recurring Revenue
  mrr: number; // Monthly Recurring Revenue
  grossProfitMargin: number; // percentage
  churnRate: number; // percentage
  techStack: string[];
  targetAudience: string;
  uniqueSellingPoints: string[];
  valuation?: ProductValuation;
  activeStage: DealStage;
  createdAt: string;
  updatedAt: string;
}

export type AgentRole = 
  | 'CEO_ORCHESTRATOR'
  | 'PRODUCT_ANALYST'
  | 'MARKET_RESEARCH'
  | 'COMPETITOR_INTEL'
  | 'VALUATION_ENGINEER'
  | 'PRICING_STRATEGIST'
  | 'BUYER_DISCOVERY'
  | 'LEAD_QUALIFIER'
  | 'CRM_MANAGER'
  | 'SALES_COPYWRITER'
  | 'LANDING_PAGE_DESIGNER'
  | 'SEO_OPTIMIZER'
  | 'EMAIL_OUTREACH'
  | 'SOCIAL_MARKETER'
  | 'ADVERTISING_STRATEGIST'
  | 'NEGOTIATOR'
  | 'CONTRACT_ASSISTANT'
  | 'ANALYTICS_ENGINEER'
  | 'REPORTING_OFFICER'
  | 'AUTOMATION_DISPATCHER';

export type AgentStatus = 'idle' | 'analyzing' | 'executing' | 'reviewing' | 'completed' | 'error';

export interface AgentDefinition {
  id: string;
  role: AgentRole;
  name: string;
  title: string;
  category: 'Orchestration' | 'Product & Valuation' | 'Lead Generation & CRM' | 'Marketing & Outreach' | 'Closing & Operations';
  avatarColor: string;
  description: string;
  systemPrompt: string;
  capabilities: string[];
  status: AgentStatus;
  executionsCount: number;
  avgResponseMs: number;
  accuracyRating: number;
  lastActive: string;
}

export interface AgentArtifact {
  id: string;
  title: string;
  type: 'text' | 'markdown' | 'json' | 'code' | 'table';
  content: string;
  createdTime: string;
}

export interface AgentMessage {
  id: string;
  agentRole: AgentRole;
  agentName: string;
  targetRole?: AgentRole;
  action: string;
  prompt: string;
  response: string;
  artifacts?: AgentArtifact[];
  executionTimeMs: number;
  tokensUsed: number;
  status: 'success' | 'warning' | 'error';
  timestamp: string;
}

export interface Lead {
  id: string;
  productId: string;
  companyName: string;
  contactName: string;
  email: string;
  linkedinUrl?: string;
  leadScore: number; // 0-100
  budget: number;
  dealStage: DealStage;
  buyingIntentScore: number;
  fitAnalysis: string;
  suggestedAngle: string;
  lastContacted: string;
  notes: string[];
}

export interface Campaign {
  id: string;
  productId: string;
  name: string;
  channel: 'Email' | 'LinkedIn' | 'SEO' | 'Social' | 'PPC' | 'Multi-Channel';
  status: 'draft' | 'active' | 'paused' | 'completed';
  agentRoles: AgentRole[];
  leadsTargeted: number;
  openRate: number; // %
  clickRate: number; // %
  replyRate: number; // %
  convertedDeals: number;
  budgetSpent: number;
  pipelineGenerated: number;
  copyVariant: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  productId: string;
  leadId: string;
  title: string;
  value: number;
  stage: DealStage;
  probability: number; // %
  assignedAgent: AgentRole;
  expectedCloseDate: string;
  negotiationLog: {
    timestamp: string;
    speaker: 'Buyer' | 'Nexus Agent' | 'Human Founder';
    message: string;
    counterOffer?: number;
    recommendedTactic?: string;
  }[];
}

export interface TelemetryStats {
  totalRevenueTarget: number;
  pipelineValue: number;
  closedRevenue: number;
  activeLeadsCount: number;
  winRate: number;
  totalAgentCalls: number;
  avgAgentLatencyMs: number;
  aiTokenConsumption: number;
  agentReliabilityScore: number;
}
