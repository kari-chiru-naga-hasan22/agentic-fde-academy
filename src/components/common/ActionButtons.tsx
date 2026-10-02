import React, { useState } from 'react';
import { 
  HelpCircle, 
  AlertTriangle, 
  Hammer, 
  Flame, 
  Network, 
  MessageSquare,
  X,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { TopicItem } from '../../types';

interface ActionButtonsProps {
  topic: TopicItem;
  onDesignIt?: () => void;
  onBreakIt?: (failureTitle: string) => void;
  onBuildIt?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  topic,
  onDesignIt,
  onBreakIt,
  onBuildIt
}) => {
  const [activeModal, setActiveModal] = useState<'why' | 'whatif' | 'explain' | 'break' | null>(null);
  const [userExplanation, setUserExplanation] = useState('');
  const [explanationFeedback, setExplanationFeedback] = useState<string | null>(null);

  const handleExplainSubmit = () => {
    if (userExplanation.trim().length < 20) {
      setExplanationFeedback('Explanation is too brief. Be specific about the engineering mechanism, data flow, and why this design choice was made.');
      return;
    }
    setExplanationFeedback('Excellent synthesis! You demonstrated understanding of the underlying architectural mechanism, data transformations, and production failure modes.');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      {/* 1. WHY? Button */}
      <button
        onClick={() => setActiveModal('why')}
        className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 transition-all shadow-sm"
      >
        <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
        <span>WHY?</span>
      </button>

      {/* 2. WHAT IF? Button */}
      <button
        onClick={() => setActiveModal('whatif')}
        className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all shadow-sm"
      >
        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
        <span>WHAT IF?</span>
      </button>

      {/* 3. BUILD IT Button */}
      <button
        onClick={onBuildIt}
        className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all shadow-sm"
      >
        <Hammer className="h-3.5 w-3.5 text-emerald-400" />
        <span>BUILD IT</span>
      </button>

      {/* 4. BREAK IT Button */}
      <button
        onClick={() => setActiveModal('break')}
        className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:border-rose-400 transition-all shadow-sm"
      >
        <Flame className="h-3.5 w-3.5 text-rose-400" />
        <span>BREAK IT</span>
      </button>

      {/* 5. DESIGN IT Button */}
      <button
        onClick={onDesignIt}
        className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-sm"
      >
        <Network className="h-3.5 w-3.5 text-cyan-400" />
        <span>DESIGN IT</span>
      </button>

      {/* 6. EXPLAIN IT Button */}
      <button
        onClick={() => setActiveModal('explain')}
        className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all shadow-sm"
      >
        <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
        <span>EXPLAIN IT</span>
      </button>

      {/* MODAL SYSTEM */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setActiveModal(null);
                setExplanationFeedback(null);
              }}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* WHY? CONTENT */}
            {activeModal === 'why' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Why Does This Architecture Component Exist?
                    </h3>
                    <p className="text-xs text-slate-400">
                      Understanding architectural first principles over cargo-cult framework adoption.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {topic.whyQuestions.map((q, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/5 bg-[#111827]/70 p-4">
                      <div className="text-xs font-bold text-indigo-300 mb-1.5">{q.question}</div>
                      <div className="text-xs text-slate-300 leading-relaxed">{q.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHAT IF? CONTENT */}
            {activeModal === 'whatif' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      What If Scenarios & Chaos Engineering
                    </h3>
                    <p className="text-xs text-slate-400">
                      Engineering judgment is tested when things fail at scale.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {topic.whatIfScenarios.map((s, idx) => (
                    <div key={idx} className="rounded-2xl border border-amber-500/20 bg-[#111827]/70 p-4 space-y-2">
                      <div className="text-xs font-bold text-amber-300">{s.scenario}</div>
                      <div className="text-xs text-rose-300">
                        <span className="font-semibold text-rose-400">Impact: </span>
                        {s.impact}
                      </div>
                      <div className="text-xs text-emerald-300">
                        <span className="font-semibold text-emerald-400">Production Remediation: </span>
                        {s.remediation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BREAK IT CONTENT */}
            {activeModal === 'break' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Inject Production Failure Simulation
                    </h3>
                    <p className="text-xs text-slate-400">
                      Select a failure mode to inject into the live simulator and observe system degradation.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Bad Chunking: Mid-Sentence Split',
                    'Vector DB Connection Timeout (504)',
                    'Indirect Prompt Injection in Retrieved Doc',
                    'Stale Cache Invalidation Drift',
                    'LLM Rate Limit (HTTP 429)',
                    'Tool Unhandled 500 Internal Error'
                  ].map((failure, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onBreakIt?.(failure);
                        setActiveModal(null);
                      }}
                      className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-left hover:bg-rose-900/30 hover:border-rose-400 transition-all"
                    >
                      <div className="text-xs font-semibold text-rose-300">{failure}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Click to trigger outage in simulator →</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* EXPLAIN IT CONTENT */}
            {activeModal === 'explain' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Explain-Back Assessment
                    </h3>
                    <p className="text-xs text-slate-400">
                      Explain this concept in your own words. Explain the mechanism, data flow, and tradeoffs.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-purple-300 mb-2">
                    Prompt: "Explain why RAG is not simply 'putting documents into an LLM context window'. What are the 3 major failure points?"
                  </div>
                  <textarea
                    rows={4}
                    value={userExplanation}
                    onChange={(e) => setUserExplanation(e.target.value)}
                    placeholder="Type your architectural explanation here..."
                    className="w-full rounded-2xl border border-white/10 bg-[#070B14] p-3 text-xs text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleExplainSubmit}
                    className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500 shadow-md shadow-purple-600/30"
                  >
                    Submit Explanation for Review
                  </button>
                </div>

                {explanationFeedback && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-200 leading-relaxed">
                      {explanationFeedback}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
