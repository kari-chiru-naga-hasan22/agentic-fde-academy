import React, { useState } from 'react';
import { Database, Zap, Table, Play, CheckCircle, ArrowRight, Layers } from 'lucide-react';

export const PostgresVisualizer: React.FC = () => {
  const [hasIndex, setHasIndex] = useState(true);
  const [selectedTable, setSelectedTable] = useState<'documents' | 'conversations' | 'tool_calls'>('documents');
  const [queryInput, setQueryInput] = useState(
    "SELECT * FROM documents WHERE tenant_id = 'org_apex' AND status = 'ACTIVE' LIMIT 10;"
  );

  const tables = {
    documents: [
      { id: 'doc_01', tenant_id: 'org_apex', title: 'HR Handbook 2026', status: 'ACTIVE', rows: '450,000' },
      { id: 'doc_02', tenant_id: 'org_apex', title: 'Q3 Financial 10-Q', status: 'ACTIVE', rows: '120,000' },
      { id: 'doc_03', tenant_id: 'org_beta', title: 'HIPAA Protocols', status: 'PENDING', rows: '38,000' }
    ],
    conversations: [
      { id: 'conv_11', tenant_id: 'org_apex', user_id: 'usr_81', turns: 6, created_at: '2026-10-02' },
      { id: 'conv_12', tenant_id: 'org_apex', user_id: 'usr_94', turns: 2, created_at: '2026-10-02' }
    ],
    tool_calls: [
      { id: 'call_91', conv_id: 'conv_11', tool_name: 'sql_query_tool', duration_ms: 18, status: 'SUCCESS' },
      { id: 'call_92', conv_id: 'conv_11', tool_name: 'vector_search', duration_ms: 32, status: 'SUCCESS' }
    ]
  };

  // Metrics comparison
  const rowsScanned = hasIndex ? 12 : 500000;
  const executionTimeMs = hasIndex ? 2.4 : 1420.0;
  const queryPlanType = hasIndex 
    ? 'Index Scan using idx_documents_tenant_status on documents'
    : 'Seq Scan on documents (Cost: 0.00..14820.00)';

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              <Database className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              PostgreSQL Engine Visualizer & SQL Query Planner
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare B-Tree Index Scans vs Full Table Sequential Scans. Observe row buffer pages read and execution timings.
          </p>
        </div>

        {/* Index Toggle */}
        <button
          onClick={() => setHasIndex(!hasIndex)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${
            hasIndex
              ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/30'
              : 'border-rose-500/40 bg-rose-950/30 text-rose-300'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>{hasIndex ? 'B-Tree Index ACTIVE (O(log N))' : 'WITHOUT INDEX (Sequential Scan O(N))'}</span>
        </button>
      </div>

      {/* SQL Playground Bar */}
      <div className="rounded-2xl border border-white/10 bg-[#070B14] p-4 space-y-2">
        <label className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
          PostgreSQL Query Editor:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none"
          />
          <button className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30">
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>EXPLAIN ANALYZE</span>
          </button>
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Rows Scanned in Heap</div>
          <div className={`text-xl font-bold font-mono mt-1 ${hasIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
            {rowsScanned.toLocaleString()} rows
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {hasIndex ? 'Bounded by B-Tree leaf pointers' : 'Every single disk page fetched into RAM'}
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Execution Time</div>
          <div className={`text-xl font-bold font-mono mt-1 ${hasIndex ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
            {executionTimeMs} ms
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {hasIndex ? '590x faster than Sequential Scan' : 'Severe bottleneck under 100 QPS concurrency'}
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Query Planner Operation</div>
          <div className="text-xs font-bold font-mono text-cyan-300 mt-1 truncate">
            {hasIndex ? 'Index Scan (B-Tree)' : 'Sequential Scan'}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 truncate">
            {queryPlanType}
          </div>
        </div>
      </div>

      {/* Table Rows Explorer */}
      <div className="rounded-2xl border border-white/10 bg-[#070B14] p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase">
            <Table className="h-4 w-4 text-indigo-400" />
            <span>Active Enterprise Schema Tables:</span>
          </div>
          <div className="flex gap-2">
            {(['documents', 'conversations', 'tool_calls'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTable(tab)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all ${
                  selectedTable === tab
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mock Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                {Object.keys(tables[selectedTable][0]).map(key => (
                  <th key={key} className="py-2 px-3">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tables[selectedTable].map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 text-slate-300">
                  {Object.values(row).map((val: any, vIdx) => (
                    <td key={vIdx} className="py-2.5 px-3">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
