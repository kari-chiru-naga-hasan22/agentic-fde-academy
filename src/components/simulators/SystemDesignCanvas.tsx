import React, { useState } from 'react';
import { 
  Network, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SYSTEM_COMPONENTS, evaluateArchitecture, ArchitectureEvaluation } from '../../data/systemDesignData';

export const SystemDesignCanvas: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'api-gateway',
    'fastapi-backend',
    'postgres-db',
    'llm-inference'
  ]);
  const [selectedPreset, setSelectedPreset] = useState<'naive' | 'production' | 'agentic'>('naive');

  const presets = {
    naive: ['api-gateway', 'fastapi-backend', 'postgres-db', 'llm-inference'],
    production: [
      'api-gateway',
      'load-balancer',
      'fastapi-backend',
      'redis-cache',
      'postgres-db',
      'kafka-queue',
      'vector-db',
      'reranker-service',
      'llm-inference',
      'guardrails',
      'opentelemetry'
    ],
    agentic: [
      'api-gateway',
      'load-balancer',
      'fastapi-backend',
      'redis-cache',
      'postgres-db',
      'agent-worker',
      'tool-sandbox',
      'vector-db',
      'guardrails',
      'opentelemetry'
    ]
  };

  const handleApplyPreset = (key: 'naive' | 'production' | 'agentic') => {
    setSelectedPreset(key);
    setSelectedIds(presets[key]);
  };

  const toggleComponent = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const evalResult: ArchitectureEvaluation = evaluateArchitecture(selectedIds);

  return (
    <div className="space-y-6">
      {/* Header & Scenario */}
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-600 text-xs font-bold text-white">
                <Network className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xl font-bold text-white">
                Interactive System Design Lab & Architecture Evaluator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Problem: <span className="text-cyan-300 font-semibold">"Design an enterprise AI assistant for 100,000 employees handling 10k requests/min."</span>
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Presets:</span>
            <button
              onClick={() => handleApplyPreset('naive')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                selectedPreset === 'naive'
                  ? 'border-rose-500 bg-rose-950/40 text-rose-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Naive AI (Flawed)
            </button>
            <button
              onClick={() => handleApplyPreset('production')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                selectedPreset === 'production'
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Production RAG (Tier-1)
            </button>
            <button
              onClick={() => handleApplyPreset('agentic')}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                selectedPreset === 'agentic'
                  ? 'border-purple-500 bg-purple-950/40 text-purple-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Autonomous Agentic
            </button>
          </div>
        </div>

        {/* Live Architecture Scorecard */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="rounded-2xl border border-white/5 bg-[#111827]/80 p-3.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Scalability</span>
              <TrendingUp className="h-3 w-3 text-cyan-400" />
            </div>
            <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
              {evalResult.scalabilityScore} / 100
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111827]/80 p-3.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Reliability</span>
              <Activity className="h-3 w-3 text-indigo-400" />
            </div>
            <div className="text-lg font-bold font-mono text-indigo-400 mt-1">
              {evalResult.reliabilityScore} / 100
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111827]/80 p-3.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Security</span>
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
            </div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
              {evalResult.securityScore} / 100
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111827]/80 p-3.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Est. Latency</span>
              <span className="text-[10px] text-slate-500">p95</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              ~{evalResult.estimatedLatencyMs} ms
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#111827]/80 p-3.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Monthly Cost</span>
              <DollarSign className="h-3 w-3 text-amber-400" />
            </div>
            <div className="text-lg font-bold font-mono text-amber-400 mt-1">
              ${evalResult.estimatedMonthlyCostUSD.toLocaleString()}
            </div>
          </div>
        </div>

        {/* System Verdict Banner */}
        <div className={`mt-4 flex items-center gap-3 rounded-2xl border p-4 ${
          evalResult.verdict === 'Production Ready'
            ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
            : evalResult.verdict === 'Risky Architecture'
            ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
            : 'border-rose-500/40 bg-rose-950/20 text-rose-300'
        }`}>
          {evalResult.verdict === 'Production Ready' ? (
            <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0" />
          )}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">
              Architecture Verdict: {evalResult.verdict}
            </div>
            <div className="text-xs mt-0.5 opacity-90">
              {evalResult.verdict === 'Production Ready'
                ? 'Balanced architecture with decoupled asynchronous pipelines, caching, safety guardrails, and full observability.'
                : 'Contains bottlenecks or security vulnerabilities that would fail a high-scale enterprise review.'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Component Palette and Selected Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Component Palette */}
        <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Component Palette ({SYSTEM_COMPONENTS.length})
            </div>
            <span className="text-[10px] text-slate-400">Click to toggle</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {SYSTEM_COMPONENTS.map((comp) => {
              const isSelected = selectedIds.includes(comp.id);
              return (
                <div
                  key={comp.id}
                  onClick={() => toggleComponent(comp.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500/50 bg-indigo-950/30 shadow-md shadow-indigo-500/10'
                      : 'border-white/5 bg-[#111827]/40 opacity-70 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{comp.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400'
                    }`}>
                      {isSelected ? 'Active' : 'Add +'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {comp.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                    <span>+{comp.baseLatencyMs}ms</span>
                    <span>${comp.costPerMillion}/1M reqs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Architecture Critiques & Deep Explanation */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-5">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-heading text-base font-bold text-white">
              Architectural Analysis & Tradeoff Diagnostics
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed system design evaluation explaining WHY specific components succeed or create failure modes.
            </p>
          </div>

          {/* Critiques list */}
          <div className="space-y-3">
            {evalResult.critiques.map((c, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  c.type === 'positive'
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                    : c.type === 'warning'
                    ? 'border-amber-500/30 bg-amber-950/20 text-amber-200'
                    : 'border-rose-500/30 bg-rose-950/20 text-rose-200'
                }`}
              >
                {c.type === 'positive' ? (
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : c.type === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Trash2 className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="text-xs leading-relaxed">
                  {c.text}
                </div>
              </div>
            ))}
          </div>

          {/* Active Flow Diagram Layout */}
          <div className="rounded-2xl border border-white/10 bg-[#070B14] p-4">
            <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              <span>Current Architecture Pipeline Flow:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedIds.map((id, index) => {
                const comp = SYSTEM_COMPONENTS.find(c => c.id === id);
                return (
                  <React.Fragment key={id}>
                    <div className="rounded-xl border border-indigo-500/30 bg-[#111827] px-3 py-2 text-xs font-mono text-indigo-200">
                      {comp?.name.split('(')[0].trim()}
                    </div>
                    {index < selectedIds.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
