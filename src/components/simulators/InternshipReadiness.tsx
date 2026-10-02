import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  ArrowRight,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { READINESS_CHECKLIST } from '../../data/curriculumData';
import { ReadinessItem } from '../../types';

export const InternshipReadiness: React.FC = () => {
  const [items, setItems] = useState<ReadinessItem[]>(READINESS_CHECKLIST);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Backend', 'AI & LLM', 'RAG', 'Agents', 'System Design', 'Git & DevOps', 'Interview & FDE'];

  const toggleItem = (id: string) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
        return { ...item, completed: nextState };
      }
      return item;
    });
    setItems(updated);
  };

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(i => i.category === selectedCategory);

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);
  const isReady = completedCount >= 14;

  return (
    <div className="space-y-6">
      {/* Header & Scorecard */}
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xl font-bold text-white">
                Am I Ready for an Internship? (3-1 to 3-2 Evaluation Rubric)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              No fake progress bars based on reading text. Progress here requires verified engineering capabilities and passed code challenges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-medium text-slate-400">Internship Readiness Score</div>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {completedCount} / {items.length} ({progressPercent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar & Status Alert */}
        <div className="mt-5 space-y-2">
          <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Threshold for Aggressive Applications: 14 Capabilities (78%)</span>
            <span className={isReady ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {isReady ? '★ QUALIFIED: START APPLYING TO INTERNSHIPS NOW' : 'Focus on core RAG & Agent capabilities'}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Capabilities Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-3xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              item.completed
                ? 'border-emerald-500/40 bg-emerald-950/20 shadow-md shadow-emerald-500/5'
                : 'border-white/10 bg-[#0B0F1A] hover:border-white/20'
            }`}
          >
            <button className="mt-0.5 flex-shrink-0 text-slate-400">
              {item.completed ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              ) : (
                <Circle className="h-5 w-5 text-slate-600 hover:text-slate-400" />
              )}
            </button>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${item.completed ? 'text-white' : 'text-slate-200'}`}>
                  {item.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                  {item.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.description}
              </p>
              <div className="rounded-xl bg-[#070B14] p-2.5 border border-white/5 text-[11px] font-mono text-indigo-300">
                <span className="text-slate-500 select-none">Verify Challenge: </span>
                {item.verificationChallenge}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
