import React, { useState } from 'react';
import { Search, Moon, Sun, Sparkles, Terminal, Bell } from 'lucide-react';
import { LearningMode } from '../../types';

interface HeaderProps {
  currentMode: LearningMode;
  onSelectMode: (mode: LearningMode) => void;
  onSearchQuery?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentMode, onSelectMode }) => {
  const [isDark, setIsDark] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navItems: { mode: LearningMode; label: string }[] = [
    { mode: 'overview', label: 'Learn' },
    { mode: 'visualize', label: 'Visualize' },
    { mode: 'system-design', label: 'System Design Lab' },
    { mode: 'fde-sim', label: 'FDE Discovery' },
    { mode: 'debugging', label: 'Debug Lab' },
    { mode: 'sprint', label: '12-Week Sprint' },
    { mode: 'readiness', label: 'Internship Ready?' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070B14]/85 backdrop-blur-xl transition-all">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0B0F1A]">
              <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                NEXUS<span className="text-indigo-400">.ACADEMY</span>
              </span>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                AI + FDE
              </span>
            </div>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              3-1 B.Tech → Production AI & Forward Deployed Engineer
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => onSelectMode(item.mode)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111827]/80 px-3 py-1.5 text-xs text-slate-400 hover:border-indigo-500/40 hover:text-slate-200 transition-all"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search topics, labs, code...</span>
            <kbd className="hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300 sm:inline">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#111827] text-slate-400 hover:text-white hover:border-white/20 transition-all"
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* User Profile Avatar with 3-1 B.Tech badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
                <div className="h-full w-full rounded-full bg-[#0D111F] flex items-center justify-center text-xs font-bold text-indigo-300">
                  3-1
                </div>
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#070B14]" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-200">Engineer Track</div>
              <div className="text-[10px] text-emerald-400 font-medium">Sprint Active (Wk 4)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Command Palette Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-20 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl border border-indigo-500/30 bg-[#0B0F1A] p-4 shadow-2xl shadow-indigo-500/20">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Search className="h-5 w-5 text-indigo-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search across RAG, ReAct Agents, System Design, SQL, Docker..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded bg-white/10 px-2 py-0.5 text-xs text-slate-400 hover:text-white"
              >
                ESC
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                Quick Jump
              </div>
              {[
                { title: 'Production Hybrid RAG & Cross-Encoder', mode: 'visualize' },
                { title: 'ReAct Agent Loop & Tool Calling', mode: 'visualize' },
                { title: 'Interactive System Design Canvas (10k QPS)', mode: 'system-design' },
                { title: 'FDE Customer Discovery Interview', mode: 'fde-sim' },
                { title: 'Debugging Production Incidents', mode: 'debugging' },
                { title: '12-Week Internship Sprint Calendar', mode: 'sprint' },
                { title: 'Am I Ready for an Internship? Checklist', mode: 'readiness' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectMode(item.mode as LearningMode);
                    setSearchOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-indigo-600/20 hover:text-white transition-all text-left"
                >
                  <span>{item.title}</span>
                  <span className="text-[10px] text-indigo-400 font-mono">Jump →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
