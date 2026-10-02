import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Check, 
  BookOpen, 
  Info, 
  AlertTriangle, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { TopicItem, LineExplanation } from '../../types';

interface CodeInspectorProps {
  topic: TopicItem;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ topic }) => {
  const [activeTab, setActiveTab] = useState<'production' | 'fromScratch' | 'withFramework'>('production');
  const [copied, setCopied] = useState(false);
  const [selectedLine, setSelectedLine] = useState<number>(5);

  const snippet = topic.codeSnippets.production;
  const lines = snippet.code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeExplanation = snippet.explanations.find(e => e.line === selectedLine) || snippet.explanations[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
      {/* Header matching Section 3 of reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              3
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              Production Code Architecture & Line-by-Line Inspector
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any line number to inspect its data flow, failure modes, and architectural connection.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-[#111827] p-1 border border-white/5">
            <button
              onClick={() => setActiveTab('production')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                activeTab === 'production'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Python (Production)
            </button>
            <button
              onClick={() => setActiveTab('fromScratch')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                activeTab === 'fromScratch'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              From Scratch
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor + Side Line Explanation Grid */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Code Editor */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#070B14] p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
          <div className="space-y-0.5">
            {lines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const hasAnnotation = snippet.explanations.some(e => e.line === lineNum);
              const isSelected = selectedLine === lineNum;
              return (
                <div
                  key={lineNum}
                  onClick={() => hasAnnotation && setSelectedLine(lineNum)}
                  className={`flex items-start group rounded px-2 py-0.5 transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white'
                      : hasAnnotation
                      ? 'hover:bg-white/5 cursor-pointer text-slate-300'
                      : 'text-slate-400'
                  }`}
                >
                  <span className={`w-8 select-none text-right pr-4 font-semibold ${
                    isSelected ? 'text-indigo-400 font-bold' : hasAnnotation ? 'text-indigo-300/80 group-hover:text-indigo-300' : 'text-slate-600'
                  }`}>
                    {lineNum}
                  </span>
                  <span className="flex-1 whitespace-pre leading-relaxed font-mono">
                    {lineText}
                  </span>
                  {hasAnnotation && (
                    <span className="ml-2 flex h-2 w-2 rounded-full bg-indigo-400 my-auto flex-shrink-0" title="Click to inspect this line" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Line Deep Explanation Panel matching reference */}
        <div className="rounded-2xl border border-indigo-500/20 bg-[#111827]/70 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 border-b border-white/10 pb-2">
            <BookOpen className="h-4 w-4" />
            <span>Line {selectedLine} Deep Architectural Inspection</span>
          </div>

          {activeExplanation ? (
            <div className="space-y-3.5 text-xs">
              <div>
                <div className="font-semibold text-slate-400 text-[11px] uppercase">What this line does:</div>
                <div className="text-slate-200 mt-0.5 leading-relaxed">
                  {activeExplanation.whatItDoes}
                </div>
              </div>

              <div>
                <div className="font-semibold text-indigo-400 text-[11px] uppercase">Why it exists:</div>
                <div className="text-slate-200 mt-0.5 leading-relaxed">
                  {activeExplanation.whyItExists}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="rounded-xl bg-[#070B14] p-2 border border-white/5">
                  <span className="text-slate-500 block mb-0.5 font-sans">Data Entering:</span>
                  <span className="text-cyan-300">{activeExplanation.dataEntering}</span>
                </div>
                <div className="rounded-xl bg-[#070B14] p-2 border border-white/5">
                  <span className="text-slate-500 block mb-0.5 font-sans">Data Leaving:</span>
                  <span className="text-emerald-300">{activeExplanation.dataLeaving}</span>
                </div>
              </div>

              <div>
                <div className="font-semibold text-rose-400 text-[11px] uppercase flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Potential Failures:</span>
                </div>
                <div className="text-rose-200/90 mt-0.5 leading-relaxed text-[11px]">
                  {activeExplanation.potentialFailures}
                </div>
              </div>

              <div>
                <div className="font-semibold text-purple-400 text-[11px] uppercase flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  <span>Architecture Link:</span>
                </div>
                <div className="text-purple-200/90 mt-0.5 leading-relaxed text-[11px]">
                  {activeExplanation.architectureLink}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic">
              Click any line with a blue marker to inspect its execution internals.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
