import React, { useState } from 'react';
import { 
  Handshake, 
  Sparkles, 
  ShieldAlert, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  Download,
  Copy,
  PenTool
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const NegotiationHubView: React.FC = () => {
  const { 
    activeProduct, 
    dispatchAgentAction, 
    generateLegalContract,
    simulateNegotiation,
    isDispatching 
  } = useWorkspace();

  const [buyerOfferPrice, setBuyerOfferPrice] = useState<number>(2100000);
  const [buyerObjectionText, setBuyerObjectionText] = useState<string>('Buyer considers 4.7x ARR multiple high; offers $2.1M with 20% held in 12-month escrow.');
  const [loiClauseText, setLoiClauseText] = useState<string>('Seller agrees to indemnify Buyer against all potential IP claims with zero liability cap for 36 months post-closing.');

  const [counterStrategyOutput, setCounterStrategyOutput] = useState<string>('');
  const [recommendedTactic, setRecommendedTactic] = useState<string>('');
  const [legalReviewOutput, setLegalReviewOutput] = useState<string>('');

  // Legal Generator State
  const [selectedContractType, setSelectedContractType] = useState<'LOI' | 'NDA' | 'APA'>('APA');
  const [generatedContractContent, setGeneratedContractContent] = useState<string>('');
  const [isGeneratingContract, setIsGeneratingContract] = useState<boolean>(false);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [copiedContract, setCopiedContract] = useState<boolean>(false);

  const handleRunNegotiationSimulation = async () => {
    if (!activeProduct) return;
    const simResult = await simulateNegotiation(buyerObjectionText, buyerOfferPrice, activeProduct);
    setCounterStrategyOutput(simResult.agentResponse);
    setRecommendedTactic(simResult.recommendedTactic);
  };

  const handleRunLegalReview = async () => {
    const result = await dispatchAgentAction(
      'CONTRACT_ASSISTANT',
      'Term Sheet & APA Redline Audit',
      `Audit LOI/APA contract clause: "${loiClauseText}". Identify indemnification red flags and escrow risks for seller.`
    );
    setLegalReviewOutput(result.response);
  };

  const handleGenerateContract = async () => {
    if (!activeProduct) return;
    setIsGeneratingContract(true);
    setIsSigned(false);
    const contract = await generateLegalContract(selectedContractType, activeProduct);
    setGeneratedContractContent(contract);
    setIsGeneratingContract(false);
  };

  const handleCopyContract = () => {
    navigator.clipboard.writeText(generatedContractContent);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
              Vanguard & Lexis Legal V2
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-mono">{activeProduct ? activeProduct.name : 'All Products'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Deal Negotiation & Autonomous Contract Studio
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Real-time AI counter-offer simulator, valuation margin defense, automated LOI/NDA/APA drafting, and contract clause redline audits.
          </p>
        </div>
      </div>

      {/* Two Column Grid: Counter-Offer Simulator & Contract Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Counter-Offer Simulator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <Handshake className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-white text-sm">Vanguard Autonomous Deal Counter-Offer Simulator</h3>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Target Asking Price</label>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-emerald-400">
                  ${( (activeProduct?.askingPrice || 2450000) / 1000 ).toFixed(0)}k
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Buyer Counter Offer ($)</label>
                <input
                  type="number"
                  value={buyerOfferPrice}
                  onChange={(e) => setBuyerOfferPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono font-bold text-rose-400 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Buyer Objection / Proposed Terms</label>
              <textarea
                rows={3}
                value={buyerObjectionText}
                onChange={(e) => setBuyerObjectionText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            <button
              onClick={handleRunNegotiationSimulation}
              disabled={isDispatching}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Sparkles className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
              <span>Generate AI Counter-Proposal & Tactic</span>
            </button>

            {recommendedTactic && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-300 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Tactical Advice: {recommendedTactic}</span>
              </div>
            )}

            {counterStrategyOutput && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs font-sans text-slate-200 leading-relaxed max-h-56 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                {counterStrategyOutput}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Legal Term Sheet Reviewer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-sm">Lexis Legal Contract Clause Auditor</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">LOI / APA Term Sheet Clause text</label>
              <textarea
                rows={4}
                value={loiClauseText}
                onChange={(e) => setLoiClauseText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              onClick={handleRunLegalReview}
              disabled={isDispatching}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Sparkles className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
              <span>Audit Clause Risks</span>
            </button>

            {legalReviewOutput && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs font-sans text-slate-200 leading-relaxed max-h-56 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                {legalReviewOutput}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Autonomous Contract Generator Studio */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-sm">Autonomous M&A Legal Contract Studio</h3>
              <p className="text-xs text-slate-400">Generate, customize, and digitally sign binding acquisition contracts.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {(['LOI', 'NDA', 'APA'] as const).map(type => (
              <button
                key={type}
                onClick={() => setSelectedContractType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  selectedContractType === type
                    ? 'bg-cyan-500 text-white border-cyan-400'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {type === 'LOI' ? 'Letter of Intent' : type === 'NDA' ? 'Non-Disclosure' : 'Asset Purchase (APA)'}
              </button>
            ))}

            <button
              onClick={handleGenerateContract}
              disabled={isGeneratingContract}
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg text-xs font-bold shadow-md disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingContract ? 'animate-spin' : ''}`} />
              <span>{isGeneratingContract ? 'Drafting Contract...' : `Generate ${selectedContractType}`}</span>
            </button>
          </div>
        </div>

        {generatedContractContent ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Document: {selectedContractType}_Contract_{activeProduct?.name.replace(/\s+/g, '_')}.md</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyContract}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedContract ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => setIsSigned(true)}
                  disabled={isSigned}
                  className={`px-3 py-1 rounded text-xs font-bold flex items-center space-x-1 ${
                    isSigned 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{isSigned ? 'Digitally Signed ✓' : 'Digital Execute & Sign'}</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto custom-scrollbar">
              {generatedContractContent}
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 border border-dashed border-slate-800 rounded-xl p-8 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">No contract draft generated yet.</p>
            <p className="text-[11px] text-slate-500">Click "Generate {selectedContractType}" above to produce a tailored agreement for {activeProduct?.name || 'your digital asset'}.</p>
          </div>
        )}
      </div>

    </div>
  );
};

