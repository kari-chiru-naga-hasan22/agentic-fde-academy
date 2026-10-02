import React from 'react';
import { Database, Search, Activity, FileText, Headphones, Award } from 'lucide-react';
import { TopicItem } from '../../types';

interface RealWorldAppsProps {
  topic: TopicItem;
}

export const RealWorldApps: React.FC<RealWorldAppsProps> = ({ topic }) => {
  const iconMap: Record<string, any> = {
    Search,
    Activity,
    FileText,
    Headphones,
    Database,
    Award
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
      {/* Header matching Section 5 of reference */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
          5
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-white">
            Real-world Applications & Enterprise Deployments
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            See where this architecture is deployed in mission-critical production environments.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topic.realWorldApps.map((app, idx) => {
          const Icon = iconMap[app.icon] || Database;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/5 bg-[#111827]/70 p-4 space-y-2 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-all">
                {app.title}
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {app.description}
              </p>
              <div className="pt-2 border-t border-white/5 text-[10px] text-emerald-400 font-medium">
                {app.systemImpact}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
