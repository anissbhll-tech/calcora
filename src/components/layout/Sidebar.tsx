import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Package, 
  PlusCircle, 
  Calculator, 
  Users, 
  Send, 
  Handshake, 
  BarChart3, 
  Settings,
  Sparkles,
  ChevronRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { NavigationTab } from '../../types';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  category?: string;
}

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, agents, products } = useWorkspace();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Executive Command',
      icon: LayoutDashboard,
      category: 'Overview'
    },
    {
      id: 'agent-command',
      label: 'Agent Suite (20 AI)',
      icon: Bot,
      badge: `${agents.filter(a => a.status !== 'idle').length || 20} Active`,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      category: 'Overview'
    },
    {
      id: 'product-portfolio',
      label: 'Product Portfolio',
      icon: Package,
      badge: `${products.length}`,
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      category: 'Assets'
    },
    {
      id: 'onboarding-wizard',
      label: 'Onboarding Wizard',
      icon: PlusCircle,
      badge: 'Step 1 of 4',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      category: 'Assets'
    },
    {
      id: 'valuation-engine',
      label: 'Valuation Engine',
      icon: Calculator,
      badge: 'AI DCF',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      category: 'Valuation & Strategy'
    },
    {
      id: 'lead-scout',
      label: 'Lead Scout & CRM',
      icon: Users,
      badge: 'BANT Qualified',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      category: 'Execution'
    },
    {
      id: 'campaign-studio',
      label: 'Campaign Studio',
      icon: Send,
      category: 'Execution'
    },
    {
      id: 'negotiation-hub',
      label: 'Negotiation Hub',
      icon: Handshake,
      badge: 'LOI Review',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      category: 'Execution'
    },
    {
      id: 'analytics',
      label: 'Analytics & Telemetry',
      icon: BarChart3,
      category: 'System'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      category: 'System'
    }
  ];

  // Group items by category
  const categories = ['Overview', 'Assets', 'Valuation & Strategy', 'Execution', 'System'];

  return (
    <aside id="nexus-sidebar" className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between select-none shrink-0 h-[calc(100vh-4rem)] sticky top-16 hidden md:flex">
      
      {/* Scrollable Nav List */}
      <div className="p-3 space-y-5 overflow-y-auto custom-scrollbar">
        {categories.map((cat) => {
          const items = navItems.filter(i => i.category === cat);
          if (items.length === 0) return null;

          return (
            <div key={cat} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                {cat}
              </div>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => setCurrentTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 font-semibold shadow-sm' 
                        : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    ) : (
                      isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer: System Status */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px] font-medium">Gemini AI Model</span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
              2.5-FLASH
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[94%]" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Quota Usage</span>
            <span className="font-mono text-slate-300 font-semibold">1.42M Tokens</span>
          </div>
        </div>
      </div>

    </aside>
  );
};
