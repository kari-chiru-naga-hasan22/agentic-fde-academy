import React from 'react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onSelectTopic: (topicId: string) => void;
  onOpenSearch?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTopic }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] via-[#0B0F1A] to-[#070B14] p-6 lg:p-10 shadow-2xl">
      {/* Background Decorative Glows and Stars */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-6 right-16 hidden lg:block opacity-70 pointer-events-none">
        {/* Stylized Glowing Moon & Mountain Horizon Silhouette */}
        <div className="relative h-44 w-72">
          {/* Moon */}
          <div className="absolute top-2 right-28 h-16 w-16 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-indigo-200 blur-[1px] shadow-[0_0_50px_rgba(251,191,36,0.5)]" />
          {/* Layered Mountains SVG */}
          <svg className="absolute bottom-0 right-0 w-full h-32" viewBox="0 0 300 120" fill="none">
            <path d="M0 120 L80 40 L160 120 Z" fill="#1E1B4B" fillOpacity="0.8" />
            <path d="M110 120 L190 20 L280 120 Z" fill="#312E81" fillOpacity="0.7" />
            <path d="M190 120 L250 50 L300 120 Z" fill="#4338CA" fillOpacity="0.5" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* Top Tagline */}
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-indigo-400 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>EXPLORE · VISUALIZE · UNDERSTAND · DEPLOY</span>
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Turn Curiosity into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Production Mastery
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
          Interactive visuals, live system architecture labs, and real enterprise engineering scenarios to take you from a 3-1 B.Tech student to an exceptional Agentic AI + Forward Deployed Engineer with an internship by 3-2.
        </p>

        {/* Search Bar matching reference */}
        <div className="mt-6 flex max-w-lg items-center rounded-2xl border border-indigo-500/30 bg-[#0B0F1A]/90 p-1.5 shadow-lg shadow-indigo-950/50 backdrop-blur-md">
          <div className="flex items-center pl-3 pr-2 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            readOnly
            placeholder="What AI system or concept do you want to master today?"
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none cursor-pointer"
            onClick={() => onSelectTopic('rag-pipeline')}
          />
          <button 
            onClick={() => onSelectTopic('rag-pipeline')}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/40 hover:bg-indigo-500 transition-all"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Filter Pill Chips matching reference */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {[
            { label: 'RAG Pipeline', id: 'rag-pipeline' },
            { label: 'ReAct Agent Loop', id: 'agent-react-loop' },
            { label: 'System Design (10k QPS)', id: 'system-design-ai' },
            { label: 'FDE Discovery', id: 'fde-discovery-scenarios' },
            { label: 'Distributed Systems', id: 'system-design-ai' }
          ].map((pill, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTopic(pill.id)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300 hover:border-indigo-400/50 hover:bg-indigo-600/20 hover:text-white transition-all"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
