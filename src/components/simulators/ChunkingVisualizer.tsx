import React, { useState } from 'react';
import { Layers, Sliders, Scissors, AlertCircle, CheckCircle } from 'lucide-react';

export const ChunkingVisualizer: React.FC = () => {
  const [strategy, setStrategy] = useState<'fixed' | 'recursive' | 'semantic' | 'parent-child'>('recursive');
  const [chunkSize, setChunkSize] = useState(250);
  const [overlap, setOverlap] = useState(40);

  const sampleDoc = `Enterprise Parental Leave Policy (2026 Revision).
Section 1: Eligibility and Scope.
All full-time permanent employees who have completed at least 90 continuous days of service are eligible for primary caregiver leave. Contract workers and temporary staff are governed under third-party vendor agreements.

Section 2: Benefit Duration and Compensation.
Eligible employees receive 16 weeks of fully paid leave at 100% of their base salary. Benefits may be taken continuously or in two separate blocks within 12 months of the qualifying event (birth, adoption, or foster placement). Health and retirement benefits continue without interruption during this period.

Section 3: Coordination with State and Federal Leave.
This policy runs concurrently with the Family and Medical Leave Act (FMLA). Employees must submit notice to People Operations at least 30 days prior to anticipated leave commencement.`;

  const chunksMap = {
    fixed: [
      { id: 1, text: "Enterprise Parental Leave Policy (2026 Revision). Section 1: Eligibility and Scope. All full-time permanent employees who have completed at least 90 continuous days of service are eligible for primary care" },
      { id: 2, text: "primary caregiver leave. Contract workers and temporary staff are governed under third-party vendor agreements. Section 2: Benefit Duration and Compensation. Eligible employees receive 16 weeks of fully" },
      { id: 3, text: "of fully paid leave at 100% of their base salary. Benefits may be taken continuously or in two separate blocks within 12 months of the qualifying event. Section 3: Coordination with State and Federal Leave." }
    ],
    recursive: [
      { id: 1, text: "Enterprise Parental Leave Policy (2026 Revision).\nSection 1: Eligibility and Scope.\nAll full-time permanent employees who have completed at least 90 continuous days of service are eligible for primary caregiver leave. Contract workers and temporary staff are governed under third-party vendor agreements." },
      { id: 2, text: "Section 2: Benefit Duration and Compensation.\nEligible employees receive 16 weeks of fully paid leave at 100% of their base salary. Benefits may be taken continuously or in two separate blocks within 12 months of the qualifying event (birth, adoption, or foster placement). Health and retirement benefits continue without interruption during this period." },
      { id: 3, text: "Section 3: Coordination with State and Federal Leave.\nThis policy runs concurrently with the Family and Medical Leave Act (FMLA). Employees must submit notice to People Operations at least 30 days prior to anticipated leave commencement." }
    ],
    semantic: [
      { id: 1, text: "[Topic: Employee Eligibility] All full-time permanent employees who have completed at least 90 continuous days of service are eligible for primary caregiver leave. Contract workers and temporary staff are excluded." },
      { id: 2, text: "[Topic: Financial Compensation & Duration] Eligible employees receive 16 weeks of fully paid leave at 100% base salary. Health and retirement benefits continue without interruption." },
      { id: 3, text: "[Topic: Legal Compliance & FMLA] Runs concurrently with FMLA. Requires 30 days advance notice to People Operations." }
    ],
    'parent-child': [
      { id: 'parent-1', text: "PARENT CONTEXT: Section 2: Benefit Duration and Compensation (Complete 1000-token section)", isParent: true },
      { id: 'child-1a', text: "Child Chunk 1: Eligible employees receive 16 weeks of fully paid leave at 100% base salary." },
      { id: 'child-1b', text: "Child Chunk 2: Benefits may be taken continuously or in two separate blocks within 12 months." }
    ]
  };

  const activeChunks = chunksMap[strategy];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-xs font-bold text-white">
              <Scissors className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              Document Chunking Strategy & Boundary Visualizer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare Fixed Character vs Recursive Character vs Semantic vs Parent-Child hierarchical chunking.
          </p>
        </div>

        {/* Strategy Buttons */}
        <div className="flex flex-wrap gap-2">
          {(['fixed', 'recursive', 'semantic', 'parent-child'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStrategy(s)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                strategy === s
                  ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Strategy Evaluation Note */}
      <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
        strategy === 'fixed'
          ? 'border-rose-500/30 bg-rose-950/20 text-rose-300'
          : strategy === 'recursive'
          ? 'border-indigo-500/30 bg-indigo-950/20 text-indigo-200'
          : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
      }`}>
        <span className="font-bold">Strategy Analysis: </span>
        {strategy === 'fixed' && "Fixed character splitting cuts words and sentences in half mid-thought (e.g. 'primary care- / -giver'). This corrupts dense embeddings and damages retrieval recall."}
        {strategy === 'recursive' && "Recursive character splitting respects natural paragraph and sentence delimiters (\\n\\n, \\n, period, space). Keeps semantic units whole."}
        {strategy === 'semantic' && "Semantic chunking computes sentence-by-sentence embedding similarity deltas. Chunks break dynamically when the subject matter pivots."}
        {strategy === 'parent-child' && "Parent-Child retrieval: Small child chunks (~150 tokens) are indexed for fine-grained vector similarity, but the large parent section (~1000 tokens) is fed to the LLM to preserve complete context."}
      </div>

      {/* Visual Chunks Display */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-white uppercase tracking-wider">
          Resulting Chunks ({activeChunks.length} chunks generated):
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeChunks.map((chunk, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-4 space-y-2 ${
                (chunk as any).isParent
                  ? 'border-purple-500/40 bg-purple-950/20'
                  : 'border-white/10 bg-[#111827]/70'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                <span className="text-cyan-400">Chunk #{idx + 1}</span>
                <span className="text-slate-500">~{Math.round(chunk.text.length / 4)} tokens</span>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed bg-[#070B14] p-3 rounded-xl border border-white/5">
                {chunk.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
