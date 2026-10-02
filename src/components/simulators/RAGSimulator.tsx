import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  Check, 
  AlertCircle,
  FileText,
  Layers,
  Database,
  Search,
  Filter,
  Bot,
  Zap
} from 'lucide-react';

interface RAGSimulatorProps {
  injectedFailure?: string | null;
  onClearFailure?: () => void;
}

export const RAGSimulator: React.FC<RAGSimulatorProps> = ({ 
  injectedFailure,
  onClearFailure 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chunkSize, setChunkSize] = useState(250);
  const [topK, setTopK] = useState(3);
  const [useReranker, setUseReranker] = useState(true);
  const [userQuery, setUserQuery] = useState('What are the parental leave benefits for full-time employees?');

  const totalSteps = 6;

  const stepsInfo = [
    {
      step: 1,
      title: 'Document Ingestion & Hierarchy Parsing',
      icon: FileText,
      desc: 'Raw enterprise PDFs, Notion exports, and Confluence docs are ingested. Header levels, tables, and metadata tags (author, department, year) are extracted.',
      detail: 'Parsed 120-page Employee Handbook PDF. Extracted 42 tables and 15 metadata tags without losing structural headings.'
    },
    {
      step: 2,
      title: 'Recursive Semantic Chunking',
      icon: Layers,
      desc: `Splits text into chunks of ~${chunkSize} tokens with 15% overlap. Preserves sentence and paragraph boundaries to prevent context fragmentation.`,
      detail: `Generated ${Math.round(4800 / chunkSize)} discrete chunks. Overlap ensures sentences spanning boundaries are not severed.`
    },
    {
      step: 3,
      title: 'Embedding Generation & HNSW Indexing',
      icon: Database,
      desc: 'Chunks are converted into 1536-dimensional floating point vectors via text-embedding-3-small and stored in PostgreSQL pgvector / Qdrant with an HNSW index.',
      detail: 'HNSW graph built with m=16, ef_construction=128. Multi-tenant isolation verified with tenant_id metadata filter.'
    },
    {
      step: 4,
      title: 'Hybrid Retrieval: Dense Vector + Sparse BM25',
      icon: Search,
      desc: `User query is embedded. The system runs dual queries: Dense Cosine Similarity for conceptual meaning + BM25 for exact keyword matching, merged via RRF (k=60).`,
      detail: `Retrieved top 15 candidate chunks across both algorithms. RRF assigns consensus scores without needing score normalization.`
    },
    {
      step: 5,
      title: 'Cross-Encoder Neural Reranking',
      icon: Filter,
      desc: useReranker 
        ? 'Cross-Encoder (ms-marco-MiniLM) reads (Query, Chunk) pairs with full cross-attention to score semantic relevance, selecting the top ' + topK + ' chunks.'
        : 'Reranker bypassed! Naive top-' + topK + ' vector chunks passed directly to LLM context.',
      detail: useReranker 
        ? `Cross-encoder eliminated 12 false-positive vector chunks. Only the ${topK} most precise context passages survive.` 
        : 'Warning: Vector noise may introduce irrelevant or contradictory paragraphs into LLM context window.'
    },
    {
      step: 6,
      title: 'Context Assembly & Grounded LLM Generation',
      icon: Bot,
      desc: `Top ${topK} verified chunks are injected into a strict system prompt with citation requirements. The LLM generates the answer with source references.`,
      detail: 'Prompt: 1,420 tokens. TTFT: 240ms. Generation speed: 85 tokens/sec. Citations verified against chunk IDs [doc_42_c3, doc_42_c4].'
    }
  ];

  // Auto-play loop
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStepData = stepsInfo[currentStep - 1];

  // Calculate live metrics
  const estimatedLatency = useReranker ? 280 + topK * 15 : 190 + topK * 10;
  const contextTokens = Math.round(chunkSize * topK * 1.15);
  const estimatedCost = (contextTokens * 0.000005 + 0.00001).toFixed(5);
  const precisionScore = useReranker ? 97.4 : 73.8;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Failure Banner if injected */}
      {injectedFailure && (
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-rose-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-rose-300">ACTIVE OUTAGE INJECTION: {injectedFailure}</div>
              <div className="text-[11px] text-rose-400/80">Observe how the pipeline steps and output metrics degrade below.</div>
            </div>
          </div>
          <button
            onClick={onClearFailure}
            className="rounded-lg bg-rose-600/30 px-2.5 py-1 text-xs font-medium hover:bg-rose-600/50 text-white"
          >
            Clear Outage
          </button>
        </div>
      )}

      {/* Header & Controls matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              2
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              Interactive RAG Pipeline Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            See how it works, step by step. Change inputs, chunk sizes, and rerankers in real-time.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              isPlaying 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20'
            }`}
          >
            <Play className={`h-3 w-3 ${isPlaying ? 'fill-slate-950' : 'fill-white'}`} />
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(1);
            }}
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Flow Canvas */}
      <div className="my-6">
        {/* Step Progression Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {stepsInfo.map((s) => {
            const Icon = s.icon;
            const isCurrent = currentStep === s.step;
            const isPast = currentStep > s.step;
            return (
              <button
                key={s.step}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(s.step);
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-600/20 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                    : isPast
                    ? 'border-emerald-500/30 bg-emerald-950/15 text-slate-300'
                    : 'border-white/5 bg-[#111827]/60 text-slate-500 hover:border-white/20'
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl mb-1.5 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white'
                    : isPast
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-white/5 text-slate-400'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-[10px] font-semibold leading-tight ${isCurrent ? 'text-white' : isPast ? 'text-emerald-300' : 'text-slate-400'}`}>
                  Step {s.step}
                </span>
                <span className="text-[10px] truncate max-w-[90px] text-slate-400">
                  {s.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Step Explanation Card matching reference step card */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-[#111827] to-[#0D1322] p-5 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/30">
                  Step {currentStep} of {totalSteps}
                </span>
                <h3 className="font-heading text-base font-bold text-white">
                  {activeStepData.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStepData.desc}
              </p>
              <div className="rounded-xl bg-[#070B14]/80 p-2.5 border border-white/5 text-xs font-mono text-emerald-300">
                <span className="text-slate-500 select-none">$ </span>
                {activeStepData.detail}
              </div>
            </div>

            {/* Step Navigation Arrows */}
            <div className="flex items-center gap-2 self-end lg:self-center">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={currentStep === totalSteps}
                onClick={() => setCurrentStep((p) => Math.min(totalSteps, p + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none shadow-md shadow-indigo-600/30 transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Parameter Sliders */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-3">
          <Sliders className="h-3.5 w-3.5 text-indigo-400" />
          <span>Interactive Architectural Parameters (Change & Observe Tradeoffs)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Chunk Size */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Chunk Size:</span>
              <span className="font-mono font-bold text-indigo-300">{chunkSize} tokens</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>100 (Fine-grained)</span>
              <span>1000 (Broad context)</span>
            </div>
          </div>

          {/* Top-K */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>Retrieval Top-K:</span>
              <span className="font-mono font-bold text-cyan-300">{topK} chunks</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>1 (Minimal context)</span>
              <span>8 (Risk context overflow)</span>
            </div>
          </div>

          {/* Reranker Toggle */}
          <div className="flex flex-col justify-between">
            <span className="text-xs text-slate-300 mb-1">Cross-Encoder Reranker:</span>
            <button
              onClick={() => setUseReranker(!useReranker)}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold border transition-all ${
                useReranker
                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                  : 'border-white/10 bg-white/5 text-slate-400'
              }`}
            >
              <span>{useReranker ? 'Active (Precision Mode)' : 'Disabled (Fast Naive)'}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${useReranker ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
            </button>
            <div className="text-[10px] text-slate-500 mt-1">
              {useReranker ? '+80ms latency for +24% accuracy' : 'Fastest TTFT, higher hallucination risk'}
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/5 pt-3">
          <div className="rounded-xl bg-[#070B14] p-2.5 border border-white/5">
            <div className="text-[10px] text-slate-400">Context Window Size</div>
            <div className="text-xs font-mono font-bold text-white mt-0.5">{contextTokens} tokens</div>
          </div>
          <div className="rounded-xl bg-[#070B14] p-2.5 border border-white/5">
            <div className="text-[10px] text-slate-400">Estimated Latency</div>
            <div className="text-xs font-mono font-bold text-indigo-400 mt-0.5">~{estimatedLatency} ms</div>
          </div>
          <div className="rounded-xl bg-[#070B14] p-2.5 border border-white/5">
            <div className="text-[10px] text-slate-400">Cost per 1k Queries</div>
            <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">${(Number(estimatedCost) * 1000).toFixed(2)}</div>
          </div>
          <div className="rounded-xl bg-[#070B14] p-2.5 border border-white/5">
            <div className="text-[10px] text-slate-400">Retrieval Precision</div>
            <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">{precisionScore}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
