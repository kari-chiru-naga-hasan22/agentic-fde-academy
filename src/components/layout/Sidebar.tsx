import React from 'react';
import { 
  Home, 
  Layers, 
  Eye, 
  Play, 
  Bookmark, 
  FileText, 
  BarChart2, 
  Settings, 
  Cpu, 
  Network, 
  Workflow, 
  ShieldCheck, 
  CheckCircle, 
  Briefcase, 
  Bug, 
  Code
} from 'lucide-react';
import { LearningMode } from '../../types';

interface SidebarProps {
  currentMode: LearningMode;
  onSelectMode: (mode: LearningMode) => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMode,
  onSelectMode,
  completedTasksCount,
  totalTasksCount
}) => {
  const primaryNav = [
    { mode: 'overview', label: 'Home', icon: Home },
    { mode: 'visualize', label: 'Visual Simulators', icon: Eye, badge: 'Interactive' },
    { mode: 'system-design', label: 'System Design Lab', icon: Network, badge: 'Tier S' },
    { mode: 'fde-sim', label: 'FDE Customer Lab', icon: Briefcase, badge: 'Real Scenarios' },
    { mode: 'debugging', label: 'Debug Simulator', icon: Bug, badge: 'Break & Fix' },
    { mode: 'sprint', label: '12-Week Sprint', icon: Layers, badge: '3-1 to 3-2' },
    { mode: 'readiness', label: 'Internship Ready?', icon: CheckCircle, badge: '18 Checks' },
    { mode: 'blank-repo', label: 'Blank Repo Test', icon: Code, badge: 'No Tutorials' },
    { mode: 'knowledge-graph', label: 'Knowledge Graph', icon: Workflow }
  ];

  const secondaryNav = [
    { label: 'Playground', icon: Play },
    { label: 'Bookmarks', icon: Bookmark },
    { label: 'My Notes', icon: FileText },
    { label: 'Progress Metrics', icon: BarChart2 },
    { label: 'Settings', icon: Settings }
  ];

  const progressPercent = Math.round((completedTasksCount / Math.max(1, totalTasksCount)) * 100);

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#0B0F1A]/95 p-4 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Navigation Category */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Academy Core
          </div>
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentMode === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => onSelectMode(item.mode as LearningMode)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className={isActive ? 'font-semibold' : ''}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white/5 text-indigo-300 border border-indigo-500/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary Category */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Workspace
          </div>
          <div className="space-y-1">
            {secondaryNav.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 cursor-pointer transition-all"
                >
                  <Icon className="h-4 w-4 text-slate-500" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* "Small Steps Big Progress" Widget Matching Reference */}
      <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 to-slate-950 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Small Steps</div>
            <div className="text-[11px] text-slate-400">Big Progress</div>
          </div>
        </div>

        <div className="mt-3.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 mb-1.5">
            <span>Internship Ready</span>
            <span className="font-mono text-emerald-400 font-semibold">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-[10px] text-slate-400">
            {completedTasksCount} of {totalTasksCount} capabilities verified
          </p>
        </div>
      </div>
    </aside>
  );
};
