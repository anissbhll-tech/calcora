import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Layers, 
  Cpu, 
  Search, 
  ChevronRight,
  Shield,
  Activity,
  Code2,
  Send
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AgentDefinition, AgentRole } from '../../types';

export const AgentCommandCenter: React.FC = () => {
  const { agents, messages, dispatchAgentAction, isDispatching, activeProduct } = useWorkspace();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<AgentDefinition | null>(agents[0]);
  const [customPromptText, setCustomPromptText] = useState<string>('');

  const categories = ['All', 'Orchestration', 'Product & Valuation', 'Lead Generation & CRM', 'Marketing & Outreach', 'Closing & Operations'];

  const filteredAgents = agents.filter(a => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDispatchSelectedAgent = async () => {
    if (!selectedAgent) return;
    await dispatchAgentAction(
      selectedAgent.role,
      `Action: ${selectedAgent.title}`,
      customPromptText || `Execute high-value analysis for active product ${activeProduct ? activeProduct.name : 'Asset Portfolio'}.`
    );
    setCustomPromptText('');
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Autonomous AI Fleet
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">20 Specialized Roles Operational</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Multi-Agent Command Center & Orchestration
          </h1>
          <p className="text-xs text-slate-400">
            Inspect, tune, and dispatch individual specialized AI agents or trigger autonomous multi-agent pipelines.
          </p>
        </div>

        {/* Filter Search */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter agents by name, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid & Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Agents Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[720px] overflow-y-auto custom-scrollbar pr-1">
          {filteredAgents.map((agent) => {
            const isSelected = selectedAgent?.id === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-slate-850 border-cyan-500 shadow-xl shadow-cyan-500/10' 
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${agent.avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white leading-tight">{agent.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono leading-tight">{agent.role}</div>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full border ${
                      agent.status === 'analyzing'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-snug">
                    {agent.description}
                  </p>
                </div>

                {/* Agent Stats & Capabilities */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 2).map((cap, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-950 text-slate-400 text-[9px] rounded font-medium truncate max-w-[140px]">
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Executions: {agent.executionsCount}</span>
                    <span>Accuracy: {agent.accuracyRating}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (5 cols): Selected Agent Detail Inspector & Dispatch Console */}
        {selectedAgent && (
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-2xl flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* Agent Title Header */}
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${selectedAgent.avatarColor} flex items-center justify-center text-white text-base font-extrabold shadow-lg`}>
                  {selectedAgent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedAgent.name}</h3>
                  <div className="text-xs text-cyan-400 font-medium">{selectedAgent.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{selectedAgent.category}</div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Core Capabilities</div>
                <div className="space-y-1">
                  {selectedAgent.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Prompt Inspector */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">System Instruction Prompt</div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 text-[11px] font-mono leading-relaxed max-h-36 overflow-y-auto custom-scrollbar">
                  {selectedAgent.systemPrompt}
                </div>
              </div>

              {/* Custom Prompt Input */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Custom Task Instructions</div>
                <textarea
                  rows={3}
                  placeholder={`Instruct ${selectedAgent.name} for active product ${activeProduct ? activeProduct.name : 'portfolio'}...`}
                  value={customPromptText}
                  onChange={(e) => setCustomPromptText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans resize-none"
                />
              </div>
            </div>

            {/* Action Dispatch Button */}
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={handleDispatchSelectedAgent}
                disabled={isDispatching}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/25 active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Play className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
                <span>{isDispatching ? `Dispatching ${selectedAgent.name}...` : `Dispatch ${selectedAgent.name}`}</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
