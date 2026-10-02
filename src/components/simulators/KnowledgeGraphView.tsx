import React, { useState } from 'react';
import { Workflow, CheckCircle, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface LevelNode {
  level: number;
  title: string;
  category: 'Systems' | 'AI';
  prereqs: string[];
  keyBuild: string;
  masteryCriteria: string;
}

export const KnowledgeGraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<LevelNode | null>(null);

  const levels: LevelNode[] = [
    { level: 0, title: 'Absolute Beginner', category: 'Systems', prereqs: ['None'], keyBuild: 'Terminal navigation & Bash scripts', masteryCriteria: 'Can navigate Unix file systems and configure environment variables' },
    { level: 1, title: 'Python Systems & Typing', category: 'Systems', prereqs: ['Level 0'], keyBuild: 'CLI Async Worker Pool', masteryCriteria: 'Understand GIL, AsyncIO, and Mypy strict type hinting' },
    { level: 2, title: 'Backend & High-Throughput HTTP', category: 'Systems', prereqs: ['Level 1'], keyBuild: 'FastAPI Microservice (1500+ QPS)', masteryCriteria: 'Uvicorn ASGI, Pydantic v2 rust core, and distributed rate limiting' },
    { level: 3, title: 'Databases & PostgreSQL Engine', category: 'Systems', prereqs: ['Level 2'], keyBuild: 'Postgres + Redis Mutex Ledger', masteryCriteria: 'WAL, MVCC, B-Trees, and EXPLAIN ANALYZE query planning' },
    { level: 4, title: 'Cloud & Containerization', category: 'Systems', prereqs: ['Level 3'], keyBuild: 'Multi-stage Docker + GitHub Actions CI', masteryCriteria: 'Distroless containers, PID 1 dumb-init, and image CVE auditing' },
    { level: 5, title: 'LLM Engineering & Structured Output', category: 'AI', prereqs: ['Level 2'], keyBuild: 'Grammar-Constrained LLM Gateway', masteryCriteria: 'Tokenization, TTFT vs ITL, BNF grammar output, and SSE streaming' },
    { level: 6, title: 'Embeddings & Vector Spaces', category: 'AI', prereqs: ['Level 5'], keyBuild: 'pgvector HNSW Cosine Search', masteryCriteria: 'Cosine/Dot/L2 math, HNSW ef_construction/ef_search tuning' },
    { level: 7, title: 'Production RAG Systems', category: 'AI', prereqs: ['Level 6'], keyBuild: 'Hybrid RAG with RRF & Cross-Encoder', masteryCriteria: 'Dense + BM25 fusion, reciprocal rank fusion, and neural rerankers' },
    { level: 8, title: 'Advanced RAG & Evaluation', category: 'AI', prereqs: ['Level 7'], keyBuild: 'Automated RAGAS CI Benchmark Suite', masteryCriteria: 'Faithfulness, Answer Relevance, and Synthetic test generation' },
    { level: 9, title: 'Autonomous Agents & ReAct Loop', category: 'AI', prereqs: ['Level 5', 'Level 2'], keyBuild: 'From-Scratch Python ReAct Agent', masteryCriteria: 'State machine loop, tool schema validation, and error recovery' },
    { level: 10, title: 'Agentic RAG & LangGraph', category: 'AI', prereqs: ['Level 7', 'Level 9'], keyBuild: 'Multi-Agent Research System', masteryCriteria: 'Stateful directed graphs, conditional edges, and human-in-the-loop' },
    { level: 11, title: 'Production AI Observability & Security', category: 'Systems', prereqs: ['Level 8', 'Level 10'], keyBuild: 'OpenTelemetry Trace Suite + Guardrails', masteryCriteria: 'Distributed spans, token cost auditing, and prompt injection defense' },
    { level: 12, title: 'Distributed AI Infrastructure', category: 'Systems', prereqs: ['Level 11'], keyBuild: 'Kafka Ingestion + Redis Semantic Cache', masteryCriteria: 'Partitioned event streams, backpressure, and cache stampede prevention' },
    { level: 13, title: 'System Design for AI (100k Users)', category: 'Systems', prereqs: ['Level 12'], keyBuild: 'Enterprise Architecture Canvas', masteryCriteria: 'Capacity math, bottleneck isolation, and failure mode mitigation' },
    { level: 14, title: 'Forward Deployed Engineering', category: 'Systems', prereqs: ['Level 13'], keyBuild: 'Enterprise Client Discovery & Deployment', masteryCriteria: 'Client discovery interviews, compliance firewalls, and MVP delivery' },
    { level: 15, title: 'Internship Ready Tier', category: 'Systems', prereqs: ['Level 1-14'], keyBuild: '3 Production Repos + CI + Live Demos', masteryCriteria: 'Verified 18-point capability checklist and passing technical screens' },
    { level: 16, title: 'Full-Time Ready Tier', category: 'Systems', prereqs: ['Level 15'], keyBuild: 'Multi-Tenant Air-Gapped Platform', masteryCriteria: 'Designing mission-critical distributed AI systems at scale' },
    { level: 17, title: 'Advanced AI Systems Engineer', category: 'AI', prereqs: ['Level 16'], keyBuild: 'Custom Serving Engine (vLLM PagedAttention)', masteryCriteria: 'Kernel optimization, tensor parallelism, and continuous batching' }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
            <Workflow className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-heading text-xl font-bold text-white">
              The 18-Level Knowledge Graph & Architectural Dependency Map
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any level to view prerequisites, non-negotiable build deliverables, and verifiable mastery criteria.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {levels.map((node) => {
            const isSelected = selectedNode?.level === node.level;
            return (
              <div
                key={node.level}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600/20 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                    : 'border-white/5 bg-[#111827]/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-indigo-400">
                    LEVEL {node.level}
                  </span>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    node.category === 'AI' ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300'
                  }`}>
                    {node.category}
                  </span>
                </div>
                <div className="text-xs font-bold text-white mb-2">{node.title}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  Build: <span className="text-slate-200">{node.keyBuild}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-[#111827] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">Level {selectedNode.level}</span>
                <span className="text-sm font-bold text-white">{selectedNode.title}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Track: {selectedNode.category}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-[#070B14] p-3 border border-white/5">
                <div className="text-slate-500 font-semibold mb-1">Prerequisites:</div>
                <div className="text-slate-200">{selectedNode.prereqs.join(', ')}</div>
              </div>
              <div className="rounded-xl bg-[#070B14] p-3 border border-white/5">
                <div className="text-indigo-400 font-semibold mb-1">Weekly Build Deliverable:</div>
                <div className="text-slate-200">{selectedNode.keyBuild}</div>
              </div>
              <div className="rounded-xl bg-[#070B14] p-3 border border-white/5">
                <div className="text-emerald-400 font-semibold mb-1">Mastery Verification:</div>
                <div className="text-slate-200">{selectedNode.masteryCriteria}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
