import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Key, 
  ShieldCheck, 
  CheckCircle2, 
  Bot, 
  Building2, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const SettingsView: React.FC = () => {
  const { activeWorkspace, products, agents } = useWorkspace();
  const [apiStatus, setApiStatus] = useState<{ hasApiKey: boolean; status: string } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setApiStatus({ hasApiKey: data.hasApiKey, status: data.status });
      })
      .catch(() => setApiStatus({ hasApiKey: false, status: 'offline' }));
  }, []);

  const handleExportState = () => {
    const exportData = {
      workspace: activeWorkspace,
      products,
      agentsCount: agents.length,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-sales-os-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
              System Configuration
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Nexus System & AI Model Settings
          </h1>
          <p className="text-xs text-slate-400">
            Configure Gemini AI backend settings, workspace environment variables, and export system state.
          </p>
        </div>

        <button
          onClick={handleExportState}
          className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 shrink-0 transition-colors"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export System State JSON</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        
        {/* Gemini API Key Status Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
            <Key className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-sm">Gemini AI API Configuration</h3>
              <p className="text-xs text-slate-400">Server-side environment key status</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
                <span>GEMINI_API_KEY</span>
                {apiStatus?.hasApiKey ? (
                  <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded font-bold">
                    Configured & Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded font-bold">
                    Using Smart Heuristic Fallback
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                API keys are managed via AI Studio Secrets menu and injected server-side to process AI agent dispatches.
              </p>
            </div>
            
            <CheckCircle2 className={`w-6 h-6 shrink-0 ${apiStatus?.hasApiKey ? 'text-emerald-400' : 'text-amber-400'}`} />
          </div>
        </div>

        {/* Active Workspace Settings */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-white text-sm">Workspace Information</h3>
              <p className="text-xs text-slate-400">Current active tenant parameters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Workspace Name:</span>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-bold text-white">
                {activeWorkspace.name}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400">Industry Sector:</span>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-bold text-slate-200">
                {activeWorkspace.industry}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
