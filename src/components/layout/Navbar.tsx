import React, { useState } from 'react';
import { 
  Bot, 
  Layers, 
  Building2, 
  ChevronDown, 
  PlusCircle, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Activity,
  Package,
  ArrowUpRight,
  Menu,
  X,
  LayoutDashboard,
  Calculator,
  Users,
  Send,
  Handshake,
  BarChart3,
  Settings
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { NavigationTab } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    workspaces, 
    activeWorkspace, 
    setActiveWorkspace,
    products, 
    activeProduct, 
    setActiveProduct, 
    currentTab,
    setCurrentTab,
    dispatchAgentAction,
    isDispatching,
    telemetry
  } = useWorkspace();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDispatchCEO = () => {
    dispatchAgentAction(
      'CEO_ORCHESTRATOR',
      'Autonomous Portfolio Diagnostics',
      'Scan current product pipeline, evaluate valuation metrics, and trigger high-priority buyer discovery.'
    );
  };

  const navLinks: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Executive Command', icon: LayoutDashboard },
    { id: 'agent-command', label: 'Agent Suite (20 AI)', icon: Bot },
    { id: 'product-portfolio', label: 'Product Portfolio', icon: Package },
    { id: 'onboarding-wizard', label: 'Onboarding Wizard', icon: PlusCircle },
    { id: 'valuation-engine', label: 'Valuation Engine', icon: Calculator },
    { id: 'lead-scout', label: 'Lead Scout & CRM', icon: Users },
    { id: 'campaign-studio', label: 'Campaign Studio', icon: Send },
    { id: 'negotiation-hub', label: 'Negotiation Hub', icon: Handshake },
    { id: 'analytics', label: 'Analytics Telemetry', icon: BarChart3 },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <header id="nexus-navbar" className="h-16 bg-slate-900 border-b border-slate-800 text-white px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xl select-none">
      
      {/* Brand & Workspace Controls */}
      <div className="flex items-center space-x-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('dashboard')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">NEXUS</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">AI OS</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight">Enterprise Sales OS</p>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 hidden md:block" />

        {/* Workspace Switcher */}
        <div className="relative hidden md:block">
          <button
            id="workspace-switcher-btn"
            onClick={() => {
              setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen);
              setIsProductMenuOpen(false);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[140px] truncate">{activeWorkspace.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isWorkspaceMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Workspace</div>
              {workspaces.map(ws => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws);
                    setIsWorkspaceMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${ws.id === activeWorkspace.id ? 'bg-slate-800/90 font-semibold text-cyan-400' : 'text-slate-300'}`}
                >
                  <span className="truncate">{ws.name}</span>
                  {ws.id === activeWorkspace.id && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              ))}
              <div className="border-t border-slate-800 mt-1 pt-1 px-2">
                <button
                  onClick={() => {
                    setIsWorkspaceMenuOpen(false);
                    setCurrentTab('onboarding-wizard');
                  }}
                  className="w-full flex items-center space-x-2 px-2 py-1.5 text-xs text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors font-medium"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Onboard New Asset</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Selector */}
        <div className="relative hidden lg:block">
          <button
            id="product-selector-btn"
            onClick={() => {
              setIsProductMenuOpen(!isProductMenuOpen);
              setIsWorkspaceMenuOpen(false);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-xs font-medium text-slate-300 transition-colors"
          >
            <Package className="w-3.5 h-3.5 text-indigo-400" />
            <span className="max-w-[160px] truncate">{activeProduct ? activeProduct.name : 'Select Product'}</span>
            {activeProduct && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                ${(activeProduct.askingPrice / 1000).toFixed(0)}k
              </span>
            )}
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isProductMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Product Under Management</div>
              {products.filter(p => p.workspaceId === activeWorkspace.id).map(prod => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setActiveProduct(prod);
                    setIsProductMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-xs hover:bg-slate-800 transition-colors ${activeProduct?.id === prod.id ? 'bg-slate-800 font-semibold text-indigo-400' : 'text-slate-300'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate">{prod.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">${(prod.askingPrice / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{prod.tagline}</div>
                </button>
              ))}
              <div className="border-t border-slate-800 mt-1 pt-1 px-2">
                <button
                  onClick={() => {
                    setIsProductMenuOpen(false);
                    setCurrentTab('onboarding-wizard');
                  }}
                  className="w-full flex items-center space-x-2 px-2 py-1.5 text-xs text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors font-medium"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Register New Product</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center AI Status & Telemetry Pill */}
      <div className="hidden xl:flex items-center space-x-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800/80 text-xs">
        <div className="flex items-center space-x-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold text-[11px]">20 AI Agents Active</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="text-slate-400 text-[11px]">
          Latency: <span className="font-mono text-slate-200">{telemetry.avgAgentLatencyMs}ms</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="text-slate-400 text-[11px]">
          Reliability: <span className="font-mono text-cyan-300 font-bold">{telemetry.agentReliabilityScore}%</span>
        </div>
      </div>

      {/* Right Controls & Quick Actions */}
      <div className="flex items-center space-x-3">
        {/* CEO Dispatch Button */}
        <button
          id="dispatch-ceo-btn"
          onClick={handleDispatchCEO}
          disabled={isDispatching}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold shadow-md shadow-cyan-600/20 active:scale-95 transition-all disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isDispatching ? 'animate-spin' : ''}`} />
          <span>{isDispatching ? 'Orchestrating...' : 'Dispatch CEO Agent'}</span>
        </button>

        {/* Onboard Wizard CTA */}
        <button
          onClick={() => setCurrentTab('onboarding-wizard')}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700/80 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>+ Onboard Product</span>
        </button>

        {/* User Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
            AS
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">Founder Admin</div>
            <div className="text-[10px] text-slate-400 leading-tight">anissbhll@gmail.com</div>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-2xl p-4 md:hidden z-50 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation Menu</div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentTab(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </header>
  );
};
