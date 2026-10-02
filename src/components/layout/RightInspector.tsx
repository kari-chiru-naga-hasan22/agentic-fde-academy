import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Lightbulb, 
  ArrowRight, 
  Play, 
  TrendingUp, 
  Edit3,
  Sliders
} from 'lucide-react';
import { TopicItem } from '../../types';

interface RightInspectorProps {
  currentTopic: TopicItem;
  onSelectTopic: (topicId: string) => void;
  onRunSimulation?: (inputVal: string) => void;
}

export const RightInspector: React.FC<RightInspectorProps> = ({
  currentTopic,
  onSelectTopic,
  onRunSimulation
}) => {
  const [note, setNote] = useState('');
  const [customInput, setCustomInput] = useState('23');
  const [customArray, setCustomArray] = useState('2, 5, 8, 12, 16, 23, 38, 56, 72');

  useEffect(() => {
    const saved = localStorage.getItem(`nexus_note_${currentTopic.id}`);
    if (saved) setNote(saved);
    else setNote('');
  }, [currentTopic.id]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem(`nexus_note_${currentTopic.id}`, e.target.value);
  };

  return (
    <aside className="w-80 flex-shrink-0 border-l border-white/10 bg-[#0B0F1A]/95 p-4 space-y-5 hidden xl:block min-h-[calc(100vh-4rem)] overflow-y-auto">
      {/* 1. Quick Notes Panel */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-200">
          <Edit3 className="h-3.5 w-3.5 text-indigo-400" />
          <span>Quick Notes</span>
        </div>
        <textarea
          rows={3}
          value={note}
          onChange={handleNoteChange}
          placeholder="Jot down architectural insights or interview takeaways..."
          className="w-full resize-none rounded-xl border border-white/5 bg-[#070B14] p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none"
        />
        <div className="mt-1 text-[10px] text-slate-500 text-right">
          Auto-saved to local disk
        </div>
      </div>

      {/* 2. Key Takeaways */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-amber-300">
          <span>★</span>
          <span>Key Takeaways</span>
        </div>
        <div className="space-y-2.5">
          {currentTopic.takeaways.map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Check className="h-2.5 w-2.5" />
              </div>
              <span className="text-xs text-slate-300 leading-relaxed">{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Try Different Inputs */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-cyan-400">
          <Sliders className="h-3.5 w-3.5" />
          <span>Try Different Inputs</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Sample Context / Array:
            </label>
            <input
              type="text"
              value={customArray}
              onChange={(e) => setCustomArray(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#070B14] px-3 py-1.5 text-xs text-slate-200 font-mono focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Target Value / Query:
            </label>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#070B14] px-3 py-1.5 text-xs text-slate-200 font-mono focus:border-indigo-500/50 focus:outline-none"
            />
          </div>
          <button
            onClick={() => onRunSimulation?.(customInput)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-purple-500 transition-all"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Run Visualization</span>
          </button>
        </div>
      </div>

      {/* 4. Time / Latency Complexity Visual SVG */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Latency / Complexity</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">p95 Bounded</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-2">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span>Naive: O(N)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Optimized: O(log N)</span>
          </div>
        </div>

        {/* Mini SVG Curve Graph */}
        <div className="relative h-28 w-full rounded-xl bg-[#070B14] p-2 border border-white/5 flex items-center justify-center">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 200 80">
            {/* Grid lines */}
            <line x1="20" y1="70" x2="190" y2="70" stroke="#334155" strokeWidth="0.8" />
            <line x1="20" y1="10" x2="20" y2="70" stroke="#334155" strokeWidth="0.8" />

            {/* Linear O(N) naive curve (Rose) */}
            <path
              d="M 20 68 Q 100 45 180 15"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* O(log N) optimized curve (Emerald) */}
            <path
              d="M 20 68 Q 60 55 180 50"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Points */}
            <circle cx="180" cy="15" r="3.5" fill="#F43F5E" />
            <circle cx="180" cy="50" r="3.5" fill="#10B981" />
          </svg>
          <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500">
            Input Scale (N) →
          </div>
        </div>
      </div>

      {/* 5. Related Concepts Links */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div className="text-xs font-semibold text-slate-200 mb-2">
          Related Architecture Concepts
        </div>
        <div className="space-y-1">
          {currentTopic.relatedTopics.map((relId, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTopic(relId)}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-indigo-300 transition-all text-left"
            >
              <span className="capitalize">{relId.replace(/-/g, ' ')}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>

      {/* 6. Visual Learning Tip */}
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-slate-900 to-[#070B14] p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1.5">
          <Lightbulb className="h-4 w-4" />
          <span>Visual Learning Tip</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed italic">
          "Try changing the input variables and observe how the search space or queue bottlenecks shrink. Building intuition beats memorizing formulas."
        </p>
      </div>
    </aside>
  );
};
