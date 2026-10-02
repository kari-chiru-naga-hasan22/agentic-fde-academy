import React, { useState } from 'react';
import { Play, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { TopicItem } from '../../types';

interface HandsOnPlaygroundProps {
  topic: TopicItem;
}

export const HandsOnPlayground: React.FC<HandsOnPlaygroundProps> = ({ topic }) => {
  const [inputVal, setInputVal] = useState('What are our parental leave benefits?');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    title: string;
    details: string;
    metrics: string;
  }>({
    found: true,
    title: 'Relevant Chunks Retrieved & Verified!',
    details: 'Matched Document: "HR_Handbook_2026.pdf" [Section 4.2: Parental & Family Leave]',
    metrics: 'Latency: 28ms · Context Precision: 98.4% · Grounded LLM Response'
  });

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setResult({
        found: true,
        title: `Retrieved Verified Grounded Context for: "${inputVal}"`,
        details: `Top-ranked semantic match: HR_Handbook_2026.pdf (Similarity: 0.941) + BM25 keyword consensus.`,
        metrics: `Retrieval: 18ms · Reranker: 45ms · Total Latency: 63ms · Tokens: 385`
      });
    }, 600);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
      {/* Header matching Section 4 of reference */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
          4
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-white">
            Hands-on Playground
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Modify the query or document context and see pipeline outputs instantly.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Input Controls */}
        <div className="lg:col-span-2 space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Test Query / Instruction:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-[#070B14] px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none"
              />
              <button
                disabled={isRunning}
                onClick={handleRun}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 fill-white" />
                )}
                <span>Run</span>
              </button>
            </div>
          </div>
          <div className="text-[11px] text-slate-500">
            Example Queries: "What is our 401k match?", "How do I request PTO?", "What is the security policy on USB drives?"
          </div>
        </div>

        {/* Live Output Badge matching reference */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-300">{result.title}</div>
              <div className="text-xs text-slate-300 leading-relaxed">{result.details}</div>
              <div className="text-[10px] font-mono text-emerald-400/80 pt-1 border-t border-emerald-500/20">
                {result.metrics}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
