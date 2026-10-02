import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Lock, 
  Code, 
  GitBranch, 
  BookOpen, 
  Briefcase, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SPRINT_WEEKS } from '../../data/curriculumData';
import { SprintWeek } from '../../types';

export const SprintRoadmap: React.FC = () => {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(4);

  const activeWeek: SprintWeek = SPRINT_WEEKS.find(w => w.week === selectedWeekNum) || SPRINT_WEEKS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
                <Calendar className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xl font-bold text-white">
                12-Week Internship Sprint (3-1 B.Tech → 3-2 Internship)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Intensive, builder-first weekly progression. Every week ends with a measurable GitHub project, DSA milestone, and application timeline action.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 px-3.5 py-1.5 text-xs font-mono text-indigo-300">
            Hard Deadline: <span className="font-bold text-white">Internship Offer by Start of 3-2</span>
          </div>
        </div>

        {/* 12-Week Interactive Timeline Scroller */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {SPRINT_WEEKS.map((w) => {
            const isSelected = selectedWeekNum === w.week;
            return (
              <button
                key={w.week}
                onClick={() => setSelectedWeekNum(w.week)}
                className={`flex-shrink-0 w-28 p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600/20 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                    : w.status === 'completed'
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-slate-300'
                    : 'border-white/5 bg-[#111827]/60 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span>WEEK {w.week}</span>
                  {w.status === 'completed' ? (
                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                  ) : w.status === 'active' ? (
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
                  ) : (
                    <Lock className="h-2.5 w-2.5 text-slate-600" />
                  )}
                </div>
                <div className={`mt-1 text-[11px] font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {w.title.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Week Deep-Dive Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Learn & Weekly Build Project */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Build Requirement */}
          <div className="rounded-3xl border border-indigo-500/30 bg-[#0B0F1A] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-indigo-400" />
                <h3 className="font-heading text-base font-bold text-white">
                  Week {activeWeek.week} Build Deliverable: {activeWeek.weeklyBuild.name}
                </h3>
              </div>
              <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                Non-Negotiable Build
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeWeek.weeklyBuild.description}
            </p>

            <div className="rounded-2xl border border-white/5 bg-[#111827] p-4 space-y-2">
              <div className="text-[11px] font-semibold uppercase text-emerald-400">
                Verified Deliverable Output:
              </div>
              <p className="text-xs text-slate-200">
                {activeWeek.weeklyBuild.deliverable}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[11px] text-slate-400 font-medium">Stack:</span>
                {activeWeek.weeklyBuild.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-[#070B14] px-2.5 py-1 text-[10px] font-mono font-semibold text-indigo-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5 font-mono text-slate-300">
                <GitBranch className="h-3.5 w-3.5" />
                <span>Repo: {activeWeek.weeklyBuild.githubRepoSuggestion}</span>
              </span>
              <span className="text-emerald-400 font-semibold">Includes CI & Live Demo</span>
            </div>

          </div>

          {/* Core Technical Curriculum */}
          <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Core Technical Competencies Mastered This Week:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeWeek.primaryLearn.map((concept, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-[#111827] p-3 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: DSA, System Design, Interview & Timeline Action */}
        <div className="space-y-4">
          {/* Timeline Action (Hard Deadline Mode) */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-[#0B0F1A] to-[#070B14] p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Briefcase className="h-4 w-4 text-amber-400" />
              <span>Application Timeline Action</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {activeWeek.applicationTimelineAction}
            </p>
          </div>

          {/* DSA Goal */}
          <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              DSA Target (Internship Screen):
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {activeWeek.dsaMilestone}
            </p>
          </div>

          {/* System Design Topic */}
          <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              System Design Topic:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeWeek.systemDesignTopic}
            </p>
          </div>

          {/* Interview Question */}
          <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-2">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Weekly Technical Interview Prep:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{activeWeek.interviewPrep}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
