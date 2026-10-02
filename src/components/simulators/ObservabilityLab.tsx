import React, { useState } from 'react';
import { Eye, Clock, DollarSign, Cpu, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { TraceSpan } from '../../types';

export const ObservabilityLab: React.FC = () => {
  const [selectedSpanId, setSelectedSpanId] = useState<string>('llm-inference');

  const traceSpans: TraceSpan[] = [
    {
      id: 'gateway-root',
      name: 'POST /v1/chat/completions',
      service: 'api-gateway',
      durationMs: 465,
      startTimeMs: 0,
      status: 'ok',
      metadata: { client: 'Web UI', ip: '10.0.8.2', status_code: 200 }
    },
    {
      id: 'jwt-auth',
      name: 'AuthMiddleware.verify_jwt',
      service: 'api-gateway',
      durationMs: 8,
      startTimeMs: 2,
      status: 'ok',
      metadata: { tenant_id: 'org_apex', user_id: 'usr_8921', algorithm: 'RS256' }
    },
    {
      id: 'semantic-cache',
      name: 'Redis.semantic_cache_lookup',
      service: 'caching-service',
      durationMs: 4,
      startTimeMs: 12,
      status: 'ok',
      metadata: { cache_hit: false, similarity_threshold: 0.96 }
    },
    {
      id: 'vector-retrieval',
      name: 'Qdrant.similarity_search (HNSW)',
      service: 'vector-db',
      durationMs: 28,
      startTimeMs: 18,
      status: 'ok',
      metadata: { ef_search: 64, candidates_found: 20, collection: 'policies' }
    },
    {
      id: 'cross-encoder',
      name: 'CrossEncoder.predict (MiniLM)',
      service: 'reranker-service',
      durationMs: 65,
      startTimeMs: 48,
      status: 'ok',
      metadata: { model: 'cross-encoder/ms-marco', top_k_retained: 3 }
    },
    {
      id: 'llm-inference',
      name: 'OpenAI.chat.completions (GPT-4o)',
      service: 'external-provider',
      durationMs: 340,
      startTimeMs: 115,
      status: 'ok',
      tokens: { prompt: 1420, completion: 95, total: 1515 },
      cost: 0.0084,
      metadata: { model: 'gpt-4o', ttft_ms: 185, tokens_per_sec: 72 }
    }
  ];

  const totalDuration = 465;
  const activeSpan = traceSpans.find(s => s.id === selectedSpanId) || traceSpans[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              <Eye className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              OpenTelemetry Distributed Tracing & Cost Telemetry Lab
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full distributed trace waterfall for an agentic RAG request. Click each span to inspect per-service execution latency, token costs, and metadata.
          </p>
        </div>

        {/* Global Summary Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-slate-400">Total Latency: <span className="font-bold text-white">{totalDuration}ms</span></div>
          <div className="text-slate-400">Total Tokens: <span className="font-bold text-indigo-400">1,515</span></div>
          <div className="text-slate-400">Query Cost: <span className="font-bold text-emerald-400">$0.0084</span></div>
        </div>
      </div>

      {/* Waterfall & Span Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Waterfall Spans (Left 2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#070B14] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2 font-mono">
            <span>SPAN / SERVICE</span>
            <span>TIMELINE (0ms → 465ms)</span>
          </div>

          <div className="space-y-2">
            {traceSpans.map((span) => {
              const isSelected = selectedSpanId === span.id;
              const leftPercent = (span.startTimeMs / totalDuration) * 100;
              const widthPercent = Math.max(3, (span.durationMs / totalDuration) * 100);

              return (
                <div
                  key={span.id}
                  onClick={() => setSelectedSpanId(span.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/30 shadow-md ring-1 ring-indigo-400'
                      : 'border-white/5 bg-[#111827]/60 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`font-mono font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {span.name}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      {span.durationMs}ms
                    </span>
                  </div>

                  {/* Relative Waterfall Bar */}
                  <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 bottom-0 rounded-full ${
                        span.service === 'external-provider'
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                          : span.service === 'reranker-service'
                          ? 'bg-amber-500'
                          : span.service === 'vector-db'
                          ? 'bg-cyan-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Span Metadata Inspector (Right Col) */}
        <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-5 space-y-4">
          <div className="border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Span Inspector
            </span>
            <div className="text-xs font-bold text-white mt-0.5 truncate">{activeSpan.name}</div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Service:</span>
              <span className="font-mono text-cyan-300 font-semibold">{activeSpan.service}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Duration:</span>
              <span className="font-mono text-emerald-400 font-bold">{activeSpan.durationMs} ms</span>
            </div>
            {activeSpan.tokens && (
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Prompt / Output Tokens:</span>
                <span className="font-mono text-indigo-300 font-bold">{activeSpan.tokens.prompt} / {activeSpan.tokens.completion}</span>
              </div>
            )}
            {activeSpan.cost && (
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Incurred Cost:</span>
                <span className="font-mono text-amber-400 font-bold">${activeSpan.cost}</span>
              </div>
            )}

            <div>
              <span className="text-slate-400 block mb-1 text-[11px] uppercase font-semibold">
                Span Attributes & Metadata:
              </span>
              <pre className="rounded-xl bg-[#070B14] p-3 text-[11px] font-mono text-slate-300 border border-white/5 overflow-x-auto">
                {JSON.stringify(activeSpan.metadata, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
