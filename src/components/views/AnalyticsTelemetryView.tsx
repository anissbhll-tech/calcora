import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Bot, 
  Cpu, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Award,
  DollarSign
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid 
} from 'recharts';
import { useWorkspace } from '../../context/WorkspaceContext';

export const AnalyticsTelemetryView: React.FC = () => {
  const { telemetry, agents } = useWorkspace();

  const pipelineData = [
    { month: 'Jan', pipeline: 1.8, revenue: 0.4 },
    { month: 'Feb', pipeline: 2.4, revenue: 0.8 },
    { month: 'Mar', pipeline: 3.1, revenue: 1.1 },
    { month: 'Apr', pipeline: 3.9, revenue: 1.3 },
    { month: 'May', pipeline: 4.6, revenue: 1.5 },
    { month: 'Jun', pipeline: 5.2, revenue: 1.7 },
    { month: 'Jul', pipeline: 5.57, revenue: 1.85 },
  ];

  const agentExecutionData = agents.slice(0, 8).map(a => ({
    name: a.name.split(' ')[0],
    executions: a.executionsCount,
    latency: a.avgResponseMs
  }));

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Metricus Analytics
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">Real-Time Telemetry</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Sales Funnel Telemetry & AI Token Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Pipeline growth velocity, win rates, AI agent execution latency, and token consumption statistics.
          </p>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Pipeline Growth</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">$5.57M</div>
          <div className="text-[10px] text-slate-400">Across 4 active product assets</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Deal Win Rate</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">34.8%</div>
          <div className="text-[10px] text-emerald-400 font-semibold">+6.2% vs industry average</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Avg AI Agent Latency</div>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono">{telemetry.avgAgentLatencyMs}ms</div>
          <div className="text-[10px] text-slate-400">Gemini 2.5-Flash backend</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">AI Token Usage</div>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">1.42M</div>
          <div className="text-[10px] text-purple-400 font-semibold">{telemetry.totalAgentCalls} AI API calls</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Revenue & Pipeline Trend */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <h3 className="font-bold text-white text-sm">Pipeline Value vs Closed Revenue ($ Millions)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pipelineData}>
                <defs>
                  <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="pipeline" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPipeline)" name="Pipeline ($M)" />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" name="Closed ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Agent Execution Latency */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <h3 className="font-bold text-white text-sm">AI Agent Execution Count Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentExecutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="executions" fill="#6366f1" radius={[6, 6, 0, 0]} name="Total Executions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
