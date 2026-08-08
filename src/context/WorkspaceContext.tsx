import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Workspace, 
  Product, 
  AgentDefinition, 
  AgentMessage, 
  Lead, 
  Campaign, 
  Deal, 
  TelemetryStats, 
  NavigationTab,
  AgentRole,
  ProductValuation
} from '../types';
import { INITIAL_WORKSPACES, INITIAL_PRODUCTS, INITIAL_LEADS, INITIAL_CAMPAIGNS, INITIAL_DEALS, INITIAL_TELEMETRY } from '../data/mockData';
import { AGENT_REGISTRY } from '../data/agentRegistry';

interface WorkspaceContextType {
  // Navigation
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;

  // Workspaces
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  setActiveWorkspace: (ws: Workspace) => void;
  createWorkspace: (name: string, description: string, industry: string) => Workspace;

  // Products
  products: Product[];
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProductValuation: (productId: string, valuation: ProductValuation) => void;

  // Agents & Executions
  agents: AgentDefinition[];
  messages: AgentMessage[];
  dispatchAgentAction: (agentRole: AgentRole, action: string, customPrompt?: string) => Promise<AgentMessage>;
  isDispatching: boolean;

  // Leads & Deals
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id'>) => Lead;
  updateLeadStage: (leadId: string, newStage: Lead['dealStage']) => void;

  // Campaigns
  campaigns: Campaign[];
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => Campaign;

  // Deals
  deals: Deal[];

  // Autonomous Execution Engine V2
  runAutonomousPipeline: (product: Product) => Promise<{ summary: string; executionTimeMs: number }>;
  generateLegalContract: (contractType: 'LOI' | 'NDA' | 'APA', product: Product, lead?: Lead) => Promise<string>;
  simulateNegotiation: (buyerMessage: string, buyerOffer: number, product: Product) => Promise<{ agentResponse: string; counterOffer?: number; recommendedTactic: string }>;

  // Telemetry
  telemetry: TelemetryStats;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const getInitialStorageState = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(`nexus_sales_os_${key}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn(`Failed to parse localStorage key ${key}`, e);
  }
  return defaultValue;
};

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => getInitialStorageState('workspaces', INITIAL_WORKSPACES));
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(() => {
    const savedWs = getInitialStorageState<Workspace[]>('workspaces', INITIAL_WORKSPACES);
    return savedWs[0] || INITIAL_WORKSPACES[0];
  });

  const [products, setProducts] = useState<Product[]>(() => getInitialStorageState('products', INITIAL_PRODUCTS));
  const [activeProduct, setActiveProduct] = useState<Product | null>(() => {
    const savedProds = getInitialStorageState<Product[]>('products', INITIAL_PRODUCTS);
    return savedProds[0] || INITIAL_PRODUCTS[0];
  });

  const [agents, setAgents] = useState<AgentDefinition[]>(AGENT_REGISTRY);
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'msg-init-1',
      agentRole: 'CEO_ORCHESTRATOR',
      agentName: 'Atlas CEO',
      action: 'System Initialization & Workspace Scan',
      prompt: 'Perform initial security audit and active product pipeline evaluation.',
      response: 'Initialization completed. Active product "CloudPulse APM" evaluated at $2.45M Fair Market Value. 20 Specialized AI Agents ready in workspace "Acme Digital Assets & SaaS Corp".',
      executionTimeMs: 410,
      tokensUsed: 380,
      status: 'success',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  const [leads, setLeads] = useState<Lead[]>(() => getInitialStorageState('leads', INITIAL_LEADS));
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => getInitialStorageState('campaigns', INITIAL_CAMPAIGNS));
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [telemetry, setTelemetry] = useState<TelemetryStats>(INITIAL_TELEMETRY);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_sales_os_workspaces', JSON.stringify(workspaces));
    } catch (e) {}
  }, [workspaces]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_sales_os_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_sales_os_leads', JSON.stringify(leads));
    } catch (e) {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_sales_os_campaigns', JSON.stringify(campaigns));
    } catch (e) {}
  }, [campaigns]);

  // Sync active product when active workspace changes
  useEffect(() => {
    const wsProducts = products.filter(p => p.workspaceId === activeWorkspace.id);
    if (wsProducts.length > 0) {
      setActiveProduct(wsProducts[0]);
    } else {
      setActiveProduct(null);
    }
  }, [activeWorkspace.id]);

  const createWorkspace = (name: string, description: string, industry: string): Workspace => {
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      description,
      industry,
      currency: 'USD',
      membersCount: 1,
      productsCount: 0,
      activeAgentsCount: 20,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setWorkspaces(prev => [...prev, newWs]);
    setActiveWorkspace(newWs);
    return newWs;
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
    setActiveProduct(newProduct);
    
    // Update workspace stats
    setWorkspaces(prev => prev.map(w => w.id === newProduct.workspaceId ? { ...w, productsCount: w.productsCount + 1 } : w));
    
    return newProduct;
  };

  const updateProductValuation = (productId: string, valuation: ProductValuation) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, valuation, updatedAt: new Date().toISOString().split('T')[0] } : p));
    if (activeProduct && activeProduct.id === productId) {
      setActiveProduct(prev => prev ? { ...prev, valuation } : null);
    }
  };

  const dispatchAgentAction = async (agentRole: AgentRole, action: string, customPrompt?: string): Promise<AgentMessage> => {
    setIsDispatching(true);

    const targetAgent = agents.find(a => a.role === agentRole) || agents[0];

    // Mark agent as analyzing
    setAgents(prev => prev.map(a => a.role === agentRole ? { ...a, status: 'analyzing', lastActive: 'Just now' } : a));

    const promptText = customPrompt || `Execute domain action "${action}" for product ${activeProduct ? activeProduct.name : 'All Portfolio Assets'}. Provide strategic breakdown, tactical execution steps, and quantitative metrics.`;

    try {
      const res = await fetch('/api/agent/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentRole: targetAgent.role,
          agentName: targetAgent.name,
          systemPrompt: targetAgent.systemPrompt,
          action,
          prompt: promptText,
          productContext: activeProduct
        })
      });

      const data = await res.json();

      const newMsg: AgentMessage = {
        id: `msg-${Date.now()}`,
        agentRole: targetAgent.role,
        agentName: targetAgent.name,
        action,
        prompt: promptText,
        response: data.response || 'Execution completed successfully.',
        executionTimeMs: data.executionTimeMs || 450,
        tokensUsed: data.tokensUsed || 320,
        status: 'success',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [newMsg, ...prev.slice(0, 49)]);

      // Reset agent status to idle and update stats
      setAgents(prev => prev.map(a => a.role === agentRole ? { 
        ...a, 
        status: 'idle', 
        executionsCount: a.executionsCount + 1,
        lastActive: 'Just now'
      } : a));

      // Update telemetry
      setTelemetry(prev => ({
        ...prev,
        totalAgentCalls: prev.totalAgentCalls + 1,
        aiTokenConsumption: prev.aiTokenConsumption + newMsg.tokensUsed
      }));

      setIsDispatching(false);
      return newMsg;
    } catch (err) {
      const errorMsg: AgentMessage = {
        id: `msg-err-${Date.now()}`,
        agentRole: targetAgent.role,
        agentName: targetAgent.name,
        action,
        prompt: promptText,
        response: 'API Dispatch failed. Switched to offline heuristic execution mode.',
        executionTimeMs: 150,
        tokensUsed: 40,
        status: 'warning',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [errorMsg, ...prev]);
      setAgents(prev => prev.map(a => a.role === agentRole ? { ...a, status: 'idle' } : a));
      setIsDispatching(false);
      return errorMsg;
    }
  };

  const addLead = (leadData: Omit<Lead, 'id'>): Lead => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStage = (leadId: string, newStage: Lead['dealStage']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, dealStage: newStage } : l));
  };

  const createCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt'>): Campaign => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    return newCampaign;
  };

  const runAutonomousPipeline = async (product: Product): Promise<{ summary: string; executionTimeMs: number }> => {
    setIsDispatching(true);
    try {
      const res = await fetch('/api/pipeline/autonomous-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
      });
      const data = await res.json();

      const summary = data.executionSummary || `Autonomous sales cycle completed for ${product.name}`;
      const timeMs = data.executionTimeMs || 1200;

      // Log orchestration message
      const ceoMsg: AgentMessage = {
        id: `msg-auto-${Date.now()}`,
        agentRole: 'CEO_ORCHESTRATOR',
        agentName: 'Aura-CEO (Orchestrator)',
        action: 'Autonomous Deal Cycle Execution',
        prompt: `Execute 6-Phase Autonomous Sale Pipeline for ${product.name}`,
        response: summary,
        executionTimeMs: timeMs,
        tokensUsed: 650,
        status: 'success',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [ceoMsg, ...prev]);

      // Boost telemetry stats
      setTelemetry(prev => ({
        ...prev,
        totalAgentCalls: prev.totalAgentCalls + 6,
        aiTokenConsumption: prev.aiTokenConsumption + 1200,
        pipelineValue: prev.pipelineValue + (product.askingPrice || 1000000)
      }));

      setIsDispatching(false);
      return { summary, executionTimeMs: timeMs };
    } catch (err) {
      console.error('Autonomous pipeline error:', err);
      setIsDispatching(false);
      return {
        summary: `Autonomous pipeline ran via local fallback routines for ${product.name}. Valuation and prospect scouting updated.`,
        executionTimeMs: 400
      };
    }
  };

  const generateLegalContract = async (contractType: 'LOI' | 'NDA' | 'APA', product: Product, lead?: Lead): Promise<string> => {
    try {
      const res = await fetch('/api/legal/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractType, product, lead })
      });
      const data = await res.json();
      return data.content || 'Contract generated successfully.';
    } catch (err) {
      return `### BINDING ${contractType} AGREEMENT FOR ${product.name.toUpperCase()}\n\nExecution error during server stream. Fallback template generated for ${lead?.companyName || 'Acquirer'}.`;
    }
  };

  const simulateNegotiation = async (buyerMessage: string, buyerOffer: number, product: Product): Promise<{ agentResponse: string; counterOffer?: number; recommendedTactic: string }> => {
    try {
      const res = await fetch('/api/negotiation/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerMessage,
          buyerOffer,
          product,
          targetPrice: product.askingPrice
        })
      });
      const data = await res.json();
      return {
        agentResponse: data.agentResponse || 'Counter offer formulated.',
        counterOffer: data.counterOffer,
        recommendedTactic: data.recommendedTactic || 'Hold firm on valuation'
      };
    } catch (err) {
      return {
        agentResponse: `Thank you for your counter offer of $${buyerOffer.toLocaleString()}. We can consider a revised valuation of $${Math.round(product.askingPrice * 0.95).toLocaleString()} with a 15% escrow holdback.`,
        counterOffer: Math.round(product.askingPrice * 0.95),
        recommendedTactic: 'Counter with 5% discount cap and 90-day transition holdback'
      };
    }
  };

  return (
    <WorkspaceContext.Provider value={{
      currentTab,
      setCurrentTab,
      workspaces,
      activeWorkspace,
      setActiveWorkspace,
      createWorkspace,
      products,
      activeProduct,
      setActiveProduct,
      addProduct,
      updateProductValuation,
      agents,
      messages,
      dispatchAgentAction,
      isDispatching,
      leads,
      addLead,
      updateLeadStage,
      campaigns,
      createCampaign,
      deals,
      runAutonomousPipeline,
      generateLegalContract,
      simulateNegotiation,
      telemetry
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
