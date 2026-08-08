import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award, 
  Sparkles, 
  Bot, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Play, 
  ShieldCheck, 
  ChevronRight,
  Calculator,
  Target,
  Send,
  Building2
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const DashboardShell: React.FC = () => {
  const { 
    activeWorkspace, 
    activeProduct, 
    products, 
    agents, 
    messages, 
    telemetry, 
    setCurrentTab,
    dispatchAgentAction,
    runAutonomousPipeline,
    isDispatching
  } = useWorkspace();

  const [pipelineSummary, setPipelineSummary] = React.useState<string | null>(null);

  const handleRunFullPipeline = async () => {
    if (!activeProduct) return;
    setPipelineSummary(null);
    const result = await runAutonomousPipeline(activeProduct);
    setPipelineSummary(result.summary);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1 z-10">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Enterprise Autonomous OS
            </span>
            <span className="text-slate-400 text-xs">|</span>
            <span className="text-slate-400 text-xs font-mono">{activeWorkspace.name}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Executive AI Sales Command Center
          </h1>
          <p className="text-xs lg:text-sm text-slate-400 max-w-2xl">
            20 Autonomous Specialized Agents orchestrating valuation, buyer discovery, lead scoring, copy generation, and high-margin deal closing.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10 shrink-0">
          <button
            id="run-pipeline-btn"
            onClick={handleRunFullPipeline}
            disabled={isDispatching}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/25 active:scale-95 transition-all disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
            <span>{isDispatching ? 'Orchestrating 6-Phase Pipeline...' : 'Run Full AI Sales Cycle'}</span>
          </button>
        </div>
      </div>

      {/* Autonomous Pipeline Summary Modal/Card */}
      {pipelineSummary && (
        <div className="bg-slate-900 border border-cyan-500/30 p-6 rounded-2xl space-y-4 shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Autonomous 6-Phase Execution Output ({activeProduct?.name})
              </h3>
            </div>
            <button 
              onClick={() => setPipelineSummary(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Dismiss
            </button>
          </div>
          <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-800">
            {pipelineSummary}
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={() => setCurrentTab('lead-scout')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-lg border border-slate-700 flex items-center space-x-1"
            >
              <span>View Discovered Buyers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('negotiation-hub')}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1"
            >
              <span>Review Draft Legal Terms</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Pipeline Value</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            ${(telemetry.pipelineValue / 1000000).toFixed(2)}M
          </div>
          <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% this quarter</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Closed Revenue</span>
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            ${(telemetry.closedRevenue / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate-400">
            Target: <span className="text-slate-200 font-mono">${(telemetry.totalRevenueTarget / 1000000).toFixed(0)}M</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Qualified Leads</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {telemetry.activeLeadsCount} Acquirers
          </div>
          <div className="text-[11px] text-purple-400 font-semibold">
            BANT Qualified Score &gt; 85
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-slate-700 transition-colors shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">AI Agent Fleet</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            20 Agents
          </div>
          <div className="text-[11px] text-indigo-400 font-semibold">
            {telemetry.totalAgentCalls} Executions Completed
          </div>
        </div>

      </div>

      {/* Primary Active Product Banner & Valuation Teardown */}
      {activeProduct && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded">
                  {activeProduct.type.replace('_', ' ')}
                </span>
                <span className="text-slate-400 text-xs">|</span>
                <span className="text-xs text-slate-400 font-medium">{activeProduct.category}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{activeProduct.name}</h2>
              <p className="text-xs text-slate-400">{activeProduct.tagline}</p>
            </div>

            <div className="flex items-center space-x-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Asking Price</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono">
                  ${(activeProduct.askingPrice / 1000).toFixed(0)}k
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">ARR / MRR</div>
                <div className="text-sm font-bold text-white font-mono">
                  ${(activeProduct.arr / 1000).toFixed(0)}k <span className="text-xs text-slate-400 font-normal">(${(activeProduct.mrr / 1000).toFixed(1)}k/mo)</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:block">
                <div className="text-[10px] uppercase font-bold text-slate-400">Gross Margin</div>
                <div className="text-sm font-bold text-cyan-400 font-mono">
                  {activeProduct.grossProfitMargin}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Shortcuts for Active Product */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('valuation-engine')}
              className="p-3 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center space-x-3 transition-colors text-left group"
            >
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:bg-emerald-500/20">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Valuation Engine</div>
                <div className="text-[10px] text-slate-400">Aegis AI DCF Model</div>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('lead-scout')}
              className="p-3 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center space-x-3 transition-colors text-left group"
            >
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg group-hover:bg-purple-500/20">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Lead Scout & CRM</div>
                <div className="text-[10px] text-slate-400">Scout & BANT Qualifier</div>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('campaign-studio')}
              className="p-3 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center space-x-3 transition-colors text-left group"
            >
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg group-hover:bg-amber-500/20">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Campaign Pitch</div>
                <div className="text-[10px] text-slate-400">Copycraft & Outreach</div>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('negotiation-hub')}
              className="p-3 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/60 flex items-center space-x-3 transition-colors text-left group"
            >
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg group-hover:bg-rose-500/20">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Negotiation Hub</div>
                <div className="text-[10px] text-slate-400">Vanguard & Lexis Legal</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Two Column Layout: Recent Agent Executions Feed & Product Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Real-Time Multi-Agent Execution Feed */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-sm">Real-Time Agent Execution Stream</h3>
            </div>
            <button
              onClick={() => setCurrentTab('agent-command')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
            >
              <span>View All 20 Agents</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-cyan-400">{msg.agentName}</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-slate-800 text-slate-300 rounded">
                      {msg.agentRole}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{msg.timestamp}</span>
                    <span>•</span>
                    <span>{msg.executionTimeMs}ms</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-200">
                  Action: <span className="text-slate-100">{msg.action}</span>
                </div>

                <div className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800/60 font-sans leading-relaxed whitespace-pre-wrap">
                  {msg.response}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Managed Products Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Products Portfolio</h3>
              </div>
              <button
                onClick={() => setCurrentTab('product-portfolio')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
              >
                <span>Manage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {products.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setCurrentTab('valuation-engine')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeProduct?.id === p.id
                      ? 'bg-slate-800 border-indigo-500/50 shadow-md'
                      : 'bg-slate-950 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white truncate">{p.name}</span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">
                      ${(p.askingPrice / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="capitalize">{p.type.replace('_', ' ')}</span>
                    <span>ARR: ${(p.arr / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => setCurrentTab('onboarding-wizard')}
              className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Add Product to Portfolio</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
