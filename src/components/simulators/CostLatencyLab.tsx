import React, { useState } from 'react';
import { DollarSign, TrendingUp, Sliders, CheckCircle, Zap } from 'lucide-react';

export const CostLatencyLab: React.FC = () => {
  const [users, setUsers] = useState(10000);
  const [requestsPerUser, setRequestsPerUser] = useState(30);
  const [promptTokens, setPromptTokens] = useState(1200);
  const [outputTokens, setOutputTokens] = useState(250);
  const [selectedModel, setSelectedModel] = useState<'gpt-4o' | 'claude-3-5-sonnet' | 'gpt-4o-mini' | 'llama-3-70b'>('gpt-4o');
  
  // Optimization toggles
  const [enableCache, setEnableCache] = useState(true);
  const [enableTieredRouting, setEnableTieredRouting] = useState(true);

  const modelRates: Record<string, { promptPerMillion: number; completionPerMillion: number; baseLatencyMs: number }> = {
    'gpt-4o': { promptPerMillion: 2.50, completionPerMillion: 10.00, baseLatencyMs: 380 },
    'claude-3-5-sonnet': { promptPerMillion: 3.00, completionPerMillion: 15.00, baseLatencyMs: 420 },
    'gpt-4o-mini': { promptPerMillion: 0.15, completionPerMillion: 0.60, baseLatencyMs: 140 },
    'llama-3-70b': { promptPerMillion: 0.80, completionPerMillion: 0.80, baseLatencyMs: 250 }
  };

  const rates = modelRates[selectedModel];
  const totalMonthlyRequests = users * requestsPerUser;

  // Base raw cost calculation
  const rawPromptTokensM = (totalMonthlyRequests * promptTokens) / 1000000;
  const rawOutputTokensM = (totalMonthlyRequests * outputTokens) / 1000000;
  let rawMonthlyCost = (rawPromptTokensM * rates.promptPerMillion) + (rawOutputTokensM * rates.completionPerMillion);

  // Apply optimizations
  let costReductionFactor = 1.0;
  let latencyReductionFactor = 1.0;

  if (enableCache) {
    costReductionFactor *= 0.60; // 40% cache hit rate
    latencyReductionFactor *= 0.65;
  }
  if (enableTieredRouting) {
    costReductionFactor *= 0.55; // 45% simple queries routed to mini model
  }

  const optimizedMonthlyCost = Math.round(rawMonthlyCost * costReductionFactor);
  const costPerRequest = (optimizedMonthlyCost / Math.max(1, totalMonthlyRequests)).toFixed(4);
  const costPerUser = (optimizedMonthlyCost / Math.max(1, users)).toFixed(2);

  const p50 = Math.round(rates.baseLatencyMs * latencyReductionFactor);
  const p95 = Math.round(p50 * 1.8);
  const p99 = Math.round(p50 * 2.6);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
              <DollarSign className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              Monthly AI Cost & Latency Performance Laboratory
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Model billing costs and p50/p95/p99 latency projections under enterprise workloads.
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex flex-wrap gap-2">
          {(['gpt-4o', 'claude-3-5-sonnet', 'gpt-4o-mini', 'llama-3-70b'] as const).map(m => (
            <button
              key={m}
              onClick={() => setSelectedModel(m)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                selectedModel === m
                  ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span>Monthly Active Users:</span>
            <span className="font-mono font-bold text-amber-300">{users.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span>Requests / User / Month:</span>
            <span className="font-mono font-bold text-amber-300">{requestsPerUser}</span>
          </div>
          <input
            type="range"
            min="5"
            max="200"
            step="5"
            value={requestsPerUser}
            onChange={(e) => setRequestsPerUser(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span>Input Prompt Tokens:</span>
            <span className="font-mono font-bold text-cyan-300">{promptTokens}</span>
          </div>
          <input
            type="range"
            min="200"
            max="8000"
            step="100"
            value={promptTokens}
            onChange={(e) => setPromptTokens(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span>Output Completion Tokens:</span>
            <span className="font-mono font-bold text-cyan-300">{outputTokens}</span>
          </div>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={outputTokens}
            onChange={(e) => setOutputTokens(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Production Cost Optimizations */}
      <div className="rounded-2xl border border-white/10 bg-[#070B14] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs font-bold text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" />
          <span>Active Cost Optimization Strategies:</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setEnableCache(!enableCache)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
              enableCache ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300' : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            {enableCache ? '✓ Redis Semantic Cache (-40%)' : '+ Add Semantic Cache'}
          </button>
          <button
            onClick={() => setEnableTieredRouting(!enableTieredRouting)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
              enableTieredRouting ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300' : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            {enableTieredRouting ? '✓ Tiered Model Routing (-45%)' : '+ Add Model Router'}
          </button>
        </div>
      </div>

      {/* Financial & Latency Output Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-amber-500/30 bg-[#111827] p-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Monthly Cost</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            ${optimizedMonthlyCost.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Raw without optimization: ${Math.round(rawMonthlyCost).toLocaleString()}
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Cost per Request</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
            ${costPerRequest}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Based on {totalMonthlyRequests.toLocaleString()} requests
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Cost per User / Month</div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
            ${costPerUser}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Acceptable for enterprise SaaS tiers
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">p50 / p95 / p99 Latency</div>
          <div className="text-lg font-bold font-mono text-indigo-300 mt-1">
            {p50} / {p95} / {p99} ms
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            P99 tail latency protected
          </div>
        </div>
      </div>
    </div>
  );
};
