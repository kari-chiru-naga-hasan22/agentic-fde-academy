import React, { useState } from 'react';
import { Code, CheckCircle, Eye, EyeOff, Terminal, Award } from 'lucide-react';

export const BlankRepoChallengeView: React.FC = () => {
  const [showSolution, setShowSolution] = useState(false);
  const [userDesignNotes, setUserDesignNotes] = useState('');

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-600 text-xs font-bold text-white">
                <Code className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xl font-bold text-white">
                The Blank Repository Challenge (No Tutorial Mode)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real engineers build without hand-holding. Here are raw requirements and constraints. Design and implement your architecture before revealing the reference solution.
            </p>
          </div>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all self-start lg:self-center"
          >
            {showSolution ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showSolution ? 'Hide Reference Architecture' : 'Review Reference Architecture'}</span>
          </button>
        </div>

        {/* The Problem Specification */}
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5 space-y-3">
            <div className="text-xs font-bold uppercase text-purple-400 tracking-wider">
              Project Specification: Autonomous Returns & Fraud Triage Agent
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Build a production microservice with FastAPI and Python 3.12 that takes an incoming customer return request:
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">1.</span>
                <span>Extracts Order ID and Return Reason from customer query with Pydantic v2 strict typing.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">2.</span>
                <span>Queries a mock SQLite or PostgreSQL database for past order status and return eligibility window (&lt; 30 days).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">3.</span>
                <span>RAG lookup over return policy PDF to verify condition requirements (e.g. unopened electronics).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">4.</span>
                <span>If return velocity &gt; 3 returns in 7 days, flag as suspicious fraud and escalate to human supervisor.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">5.</span>
                <span>Idempotent tool execution for refund trigger (never double-refund on network retries).</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
              <span className="bg-[#070B14] px-2.5 py-1 rounded-lg border border-white/5">Constraints: Python 3.12+</span>
              <span className="bg-[#070B14] px-2.5 py-1 rounded-lg border border-white/5">FastAPI</span>
              <span className="bg-[#070B14] px-2.5 py-1 rounded-lg border border-white/5">Pydantic v2</span>
              <span className="bg-[#070B14] px-2.5 py-1 rounded-lg border border-white/5">Dockerized &lt; 150MB</span>
            </div>
          </div>
        </div>

        {/* Your Working Scratchpad */}
        <div className="mt-5 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Draft Your Architecture & File Structure Here:
          </label>
          <textarea
            rows={5}
            value={userDesignNotes}
            onChange={(e) => setUserDesignNotes(e.target.value)}
            placeholder="e.g. src/api/routes.py, src/agent/react_loop.py, src/tools/refund_tool.py..."
            className="w-full rounded-2xl border border-white/10 bg-[#070B14] p-3 text-xs font-mono text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none"
          />
        </div>

        {/* Reference Solution Unveiled */}
        {showSolution && (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-[#070B14] p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Award className="h-4 w-4" />
              <span>Reference Architecture & Implementation Blueprint</span>
            </div>
            <pre className="text-xs font-mono text-emerald-200/90 bg-[#0B0F1A] p-4 rounded-xl border border-white/5 overflow-x-auto">
{`# Directory Structure
fde-returns-agent/
├── Dockerfile              # Distroless multi-stage build (<110MB)
├── pyproject.toml          # Strict dependencies & Ruff/Mypy configs
├── src/
│   ├── main.py             # FastAPI lifespan & route handlers
│   ├── agent/
│   │   ├── react_core.py   # Bound ReAct state machine (max_iter=4)
│   │   └── memory.py       # Redis session buffer
│   ├── tools/
│   │   ├── db_query.py     # asyncpg Order status lookup
│   │   ├── policy_rag.py   # pgvector semantic policy search
│   │   └── refund_api.py   # Idempotent Stripe refund caller
│   └── guardrails/
│       └── pii_masker.py   # Sanitizes customer card info
└── tests/
    └── test_idempotent_refund.py # 500 concurrent retries = exactly 1 refund`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
