import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Search, 
  Filter, 
  Building2, 
  Mail, 
  Linkedin, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { DealStage } from '../../types';

export const LeadScoutCrmView: React.FC = () => {
  const { leads, activeProduct, dispatchAgentAction, isDispatching, updateLeadStage, addLead } = useWorkspace();

  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const stages: DealStage[] = ['prospect', 'outreach', 'discovery', 'proposal', 'negotiation', 'closing', 'won'];

  const filteredLeads = leads.filter(l => {
    const matchesProduct = !activeProduct || l.productId === activeProduct.id;
    const matchesStage = selectedStage === 'all' || l.dealStage === selectedStage;
    const matchesSearch = l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProduct && matchesStage && matchesSearch;
  });

  const handleDiscoverBuyers = async () => {
    try {
      const res = await fetch('/api/buyers/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: activeProduct,
          targetSector: activeProduct?.tagline || 'SaaS & Enterprise Technology'
        })
      });
      const data = await res.json();
      
      // Dispatch agent action for workspace log visibility
      await dispatchAgentAction(
        'BUYER_DISCOVERY',
        'Target Enterprise Acquirer Scout',
        `Discovered strategic buyers for ${activeProduct?.name || 'Asset'}. ${data.buyers ? 'Generated deep acquirer profile analysis.' : ''}`
      );

      // Add newly discovered lead
      addLead({
        productId: activeProduct?.id || 'prod-saas-101',
        companyName: 'CloudScale Infrastructure Corp',
        contactName: 'David Thorne (VP Corporate Development)',
        email: 'david.thorne@cloudscale-corp.com',
        linkedinUrl: 'https://linkedin.com/in/david-thorne-m-a',
        leadScore: 96,
        budget: 3200000,
        dealStage: 'outreach',
        buyingIntentScore: 95,
        fitAnalysis: data.buyers ? 'Strategic BANT Match Score: 96/100. High budget alignment with zero legacy technical debt.' : 'Tier-1 Strategic Acquirer looking to bundle sub-millisecond Kubernetes telemetry into existing enterprise cloud suite.',
        suggestedAngle: 'Highlight 88% gross margin, 118% NRR, and sub-millisecond query performance.',
        lastContacted: new Date().toISOString().split('T')[0],
        notes: ['Discovered by Autonomous Buyer Discovery Agent.']
      });
    } catch (e) {
      console.error('Discover buyers API error:', e);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30">
              Scout & BANT Qualifier
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">{activeProduct ? activeProduct.name : 'All Products'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Buyer Discovery & Lead Qualification CRM
          </h1>
          <p className="text-xs text-slate-400">
            Autonomous discovery of corporate acquirers, strategic buyers, and B2B leads qualified by BANT frameworks.
          </p>
        </div>

        <button
          onClick={handleDiscoverBuyers}
          disabled={isDispatching}
          className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/20 active:scale-95 transition-all disabled:opacity-50 shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
          <span>{isDispatching ? 'Scouting Acquirers...' : 'Discover Buyer Leads'}</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Stage Filter Buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 custom-scrollbar">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStage === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Deals ({leads.length})
          </button>
          {stages.map(stg => (
            <button
              key={stg}
              onClick={() => setSelectedStage(stg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                selectedStage === stg
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 w-60"
          />
        </div>
      </div>

      {/* Leads List Cards */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 hover:border-slate-700 transition-colors shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-extrabold text-base text-white">{lead.companyName}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded">
                    Score: {lead.leadScore}/100
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold capitalize bg-slate-800 text-slate-300 rounded border border-slate-700">
                    {lead.dealStage}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{lead.contactName}</span>
                  <a href={`mailto:${lead.email}`} className="flex items-center space-x-1 hover:text-cyan-400">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{lead.email}</span>
                  </a>
                </div>
              </div>

              {/* Budget & Intent */}
              <div className="flex items-center space-x-4 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Acquisition Budget</div>
                  <div className="text-sm font-extrabold text-emerald-400 font-mono">
                    ${(lead.budget / 1000000).toFixed(2)}M
                  </div>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Intent Rating</div>
                  <div className="text-xs font-bold text-cyan-400 font-mono">
                    {lead.buyingIntentScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* AI Fit Analysis & Suggested Pitch Angle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <div className="font-bold text-purple-400">BANT Strategic Fit Analysis</div>
                <p className="text-slate-300 leading-relaxed">{lead.fitAnalysis}</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <div className="font-bold text-cyan-400">Recommended Pitch Strategy</div>
                <p className="text-slate-300 leading-relaxed">{lead.suggestedAngle}</p>
              </div>
            </div>

            {/* Advance Stage Control */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400 text-[11px]">Last Contacted: {lead.lastContacted}</span>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400">Advance Stage:</span>
                {stages.map(stg => (
                  <button
                    key={stg}
                    onClick={() => updateLeadStage(lead.id, stg)}
                    className={`px-2 py-0.5 text-[10px] font-bold capitalize rounded transition-colors ${
                      lead.dealStage === stg
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
