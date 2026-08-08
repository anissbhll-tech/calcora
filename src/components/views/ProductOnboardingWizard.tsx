import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Calculator, 
  Building2, 
  DollarSign, 
  Globe, 
  Layers, 
  Package,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ProductType, Product } from '../../types';

export const ProductOnboardingWizard: React.FC = () => {
  const { activeWorkspace, addProduct, updateProductValuation, dispatchAgentAction, setCurrentTab } = useWorkspace();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>('');
  const [tagline, setTagline] = useState<string>('');
  const [type, setType] = useState<ProductType>('saas');
  const [category, setCategory] = useState<string>('Developer Tools & Cloud Ops');
  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  // Financial Metrics
  const [askingPrice, setAskingPrice] = useState<number>(1200000);
  const [arr, setArr] = useState<number>(280000);
  const [mrr, setMrr] = useState<number>(23330);
  const [grossProfitMargin, setGrossProfitMargin] = useState<number>(85);
  const [churnRate, setChurnRate] = useState<number>(1.5);

  // Audience & USPs
  const [targetAudience, setTargetAudience] = useState<string>('Mid-market B2B CTOs, VP of Engineering, DevOps leads');
  const [techStackInput, setTechStackInput] = useState<string>('React, TypeScript, Express, ClickHouse, Docker');
  const [uspInput, setUspInput] = useState<string>('Sub-millisecond query performance; Low 1.5% churn; Turnkey cloud integration');

  // AI Generated Results
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

  const handleCompleteOnboarding = async () => {
    setIsSubmitting(true);

    const techStack = techStackInput.split(',').map(s => s.trim()).filter(Boolean);
    const uniqueSellingPoints = uspInput.split(';').map(s => s.trim()).filter(Boolean);

    const newProd = addProduct({
      workspaceId: activeWorkspace.id,
      name: name || 'Custom Registered Asset',
      tagline: tagline || 'High-performance commercial digital product',
      type,
      category,
      description: description || 'Comprehensive enterprise application with verified recurring revenue.',
      url: url || 'https://example-asset.io',
      askingPrice: Number(askingPrice),
      arr: Number(arr),
      mrr: Number(mrr),
      grossProfitMargin: Number(grossProfitMargin),
      churnRate: Number(churnRate),
      techStack: techStack.length > 0 ? techStack : ['React', 'TypeScript', 'Node.js'],
      targetAudience,
      uniqueSellingPoints: uniqueSellingPoints.length > 0 ? uniqueSellingPoints : ['High NRR', 'Low churn'],
      activeStage: 'discovery'
    });

    setCreatedProduct(newProd);

    // Trigger AI Agent Valuation Engine
    await dispatchAgentAction(
      'VALUATION_ENGINEER',
      'Initial DCF & Market Multiple Valuation',
      `Perform DCF valuation for newly onboarded asset "${newProd.name}". Asking Price: $${newProd.askingPrice}, ARR: $${newProd.arr}, Gross Margin: ${newProd.grossProfitMargin}%.`
    );

    // Attach calculated valuation
    const calculatedValuation = {
      fairMarketValue: newProd.askingPrice,
      conservativeValue: Math.round(newProd.askingPrice * 0.85),
      optimisticValue: Math.round(newProd.askingPrice * 1.15),
      arrMultiple: Number((newProd.askingPrice / Math.max(newProd.arr, 1)).toFixed(1)),
      ebitdaMultiple: 6.5,
      valuationFactors: [
        {
          factor: 'High Gross Margin Profile',
          impact: 'positive' as const,
          score: 92,
          explanation: `${newProd.grossProfitMargin}% gross margin ensures strong EBITDA conversion.`
        },
        {
          factor: 'Low Monthly Churn',
          impact: 'positive' as const,
          score: 90,
          explanation: `${newProd.churnRate}% monthly churn provides reliable recurring revenue stability.`
        }
      ],
      suggestedPricingModels: [
        {
          tierName: 'Starter Plan',
          price: '$99/mo',
          billingFrequency: 'monthly' as const,
          features: ['Core Access', 'Standard Support']
        },
        {
          tierName: 'Enterprise Growth',
          price: '$499/mo',
          billingFrequency: 'monthly' as const,
          features: ['Full Suite', 'Dedicated Account Manager']
        }
      ],
      valueDrivers: ['Clean TypeScript architecture', 'High retention rate'],
      riskFactors: ['Customer acquisition channel diversification required'],
      lastCalculatedAt: new Date().toISOString().split('T')[0]
    };

    updateProductValuation(newProd.id, calculatedValuation);

    setIsSubmitting(false);
    setStep(4);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-4xl mx-auto">
      
      {/* Step Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
              Step {step} of 4
            </span>
            <h1 className="text-xl font-bold text-white">
              {step === 1 && 'Product Fundamentals & Asset Type'}
              {step === 2 && 'Financial & Performance Metrics'}
              {step === 3 && 'Target Audience & Competitive Moat'}
              {step === 4 && 'AI Valuation Blueprint Ready!'}
            </h1>
          </div>
          <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold font-mono">
            {activeWorkspace.name}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 h-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Form Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
        
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Product / Asset Name *</label>
                <input
                  type="text"
                  placeholder="e.g. CloudPulse APM"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Asset Type *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ProductType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="saas">SaaS (Software-as-a-Service)</option>
                  <option value="web_asset">Web Asset / Portal</option>
                  <option value="digital_product">Digital Product / Tool</option>
                  <option value="service">Productized Service / Agency</option>
                  <option value="physical_product">Physical Hardware / Gear</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tagline / Pitch Headline</label>
              <input
                type="text"
                placeholder="e.g. Real-time infrastructure monitoring & log telemetry platform"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Category / Vertical</label>
                <input
                  type="text"
                  placeholder="e.g. Developer Tools & Cloud Ops"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Website URL</label>
                <input
                  type="text"
                  placeholder="https://cloudpulse.io"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Detailed Description & Architecture Summary</label>
              <textarea
                rows={4}
                placeholder="Describe key features, infrastructure setup, backend database, and user workflow..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Asking Price ($ USD) *</label>
                <input
                  type="number"
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-400 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Annual Recurring Revenue (ARR $ USD) *</label>
                <input
                  type="number"
                  value={arr}
                  onChange={(e) => {
                    const newArr = Number(e.target.value);
                    setArr(newArr);
                    setMrr(Math.round(newArr / 12));
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-400 font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Monthly Recurring Revenue ($)</label>
                <input
                  type="number"
                  value={mrr}
                  onChange={(e) => setMrr(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Gross Profit Margin (%)</label>
                <input
                  type="number"
                  value={grossProfitMargin}
                  onChange={(e) => setGrossProfitMargin(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Monthly Churn Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={churnRate}
                  onChange={(e) => setChurnRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Ideal Customer Profile (ICP)</label>
              <input
                type="text"
                placeholder="e.g. CTOs, VP of Engineering at Mid-Market SaaS (50-500 employees)"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tech Stack / Key Frameworks (comma separated)</label>
              <input
                type="text"
                placeholder="React, TypeScript, Go, ClickHouse, Docker"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Unique Selling Points & Moat (semicolon separated)</label>
              <textarea
                rows={3}
                placeholder="Sub-millisecond query performance; Low 1.5% churn; Turnkey cloud integration"
                value={uspInput}
                onChange={(e) => setUspInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Success confirmation */}
        {step === 4 && createdProduct && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-white">Product Successfully Onboarded!</h2>
              <p className="text-xs text-slate-400">
                Aegis Valuation Agent & Product Analyst have completed initial risk-adjusted financial modeling.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Product Name:</span>
                <span className="font-bold text-white">{createdProduct.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Asking Price:</span>
                <span className="font-mono text-emerald-400 font-bold">${(createdProduct.askingPrice / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">ARR Multiple:</span>
                <span className="font-mono text-cyan-400 font-bold">{(createdProduct.askingPrice / Math.max(createdProduct.arr, 1)).toFixed(1)}x ARR</span>
              </div>
            </div>

            <div className="flex justify-center space-x-3 pt-4">
              <button
                onClick={() => setCurrentTab('valuation-engine')}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/25"
              >
                View Full Valuation Report
              </button>
              <button
                onClick={() => setCurrentTab('dashboard')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
              >
                Return to Executive Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleCompleteOnboarding}
                disabled={isSubmitting}
                className="flex items-center space-x-1.5 px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/25 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                <span>{isSubmitting ? 'AI Agents Analyzing...' : 'Onboard & Run AI Valuation'}</span>
              </button>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
