import React, { useState } from 'react';
import { 
  Bug, 
  Terminal, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw,
  Search,
  Code
} from 'lucide-react';
import { DEBUGGING_INCIDENTS } from '../../data/debuggingScenariosData';
import { DebuggingIncident } from '../../types';

export const DebuggingLab: React.FC = () => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('inc-latency-spike');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string; code?: string } | null>(null);

  const activeIncident: DebuggingIncident = DEBUGGING_INCIDENTS.find(i => i.id === selectedIncidentId) || DEBUGGING_INCIDENTS[0];

  const handleDiagnose = (optionId: string) => {
    setSelectedOptionId(optionId);
    const chosen = activeIncident.options.find(o => o.id === optionId);
    if (chosen) {
      setFeedback({
        isCorrect: chosen.isCorrect,
        explanation: chosen.explanation,
        code: chosen.remediationCode
      });
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-600 text-xs font-bold text-white">
                <Bug className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xl font-bold text-white">
                Production Outage & Debugging Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real incident post-mortems: Inspect logs, distributed traces, and system metrics to identify the true root cause and apply the production patch.
            </p>
          </div>

          {/* Incident Selector */}
          <div className="flex items-center gap-2">
            {DEBUGGING_INCIDENTS.map((inc) => (
              <button
                key={inc.id}
                onClick={() => {
                  setSelectedIncidentId(inc.id);
                  handleReset();
                }}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                  selectedIncidentId === inc.id
                    ? 'border-rose-500 bg-rose-950/40 text-rose-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span>{inc.title.split(':')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Incident Severity & Description */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-400 border border-rose-500/30">
              {activeIncident.severity}
            </span>
            <span className="text-sm font-bold text-white">{activeIncident.title}</span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Diagnosis</span>
          </button>
        </div>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          {activeIncident.description}
        </p>
      </div>

      {/* Diagnostics Evidence Grid: Metrics, Logs & Traces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1: System Metrics & Symptoms */}
        <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-white/5 pb-2">
            <Activity className="h-4 w-4 text-rose-400" />
            <span>Live Telemetry & Symptoms</span>
          </div>

          {/* Metrics */}
          <div className="space-y-2">
            {activeIncident.metrics.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl bg-[#111827] p-2.5 border border-white/5"
              >
                <span className="text-xs text-slate-400">{m.name}</span>
                <span className={`text-xs font-mono font-bold ${
                  m.status === 'alert' ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                }`}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Symptoms List */}
          <div className="mt-3">
            <div className="text-[11px] font-semibold text-slate-400 mb-2">Reported Symptoms:</div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeIncident.symptoms.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 2 & 3: Logs Stream & Trace Waterfall */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-white/5 pb-2">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span>Production Server Logs & Trace Spans</span>
          </div>

          {/* Log Console */}
          <div className="rounded-2xl border border-white/10 bg-[#070B14] p-3 font-mono text-xs text-slate-300 space-y-1 max-h-48 overflow-y-auto">
            {activeIncident.logs.map((log, idx) => (
              <div key={idx} className={log.includes('[ERROR]') ? 'text-rose-400' : log.includes('[WARNING]') ? 'text-amber-300' : 'text-slate-300'}>
                {log}
              </div>
            ))}
          </div>

          {/* Distributed Trace Waterfall */}
          <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4 space-y-2">
            <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider mb-2">
              Distributed Trace Waterfall Breakdown:
            </div>
            {activeIncident.traceSpans.map((span) => (
              <div key={span.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-white">{span.name}</span>
                  <span className={`font-mono font-bold ${span.status === 'error' ? 'text-rose-400' : 'text-indigo-300'}`}>
                    {span.durationMs} ms
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${span.status === 'error' ? 'bg-rose-500' : 'bg-indigo-500'}`}
                    style={{ width: `${Math.min(100, (span.durationMs / 18400) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Root Cause Hypothesis Selection */}
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 space-y-4">
        <div className="border-b border-white/10 pb-2">
          <h3 className="font-heading text-base font-bold text-white">
            Root Cause Diagnosis: Select Your Engineering Verdict
          </h3>
          <p className="text-xs text-slate-400">
            Based on the logs, metrics, and trace waterfall, what is the single root cause?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeIncident.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleDiagnose(opt.id)}
                className={`p-4 rounded-2xl border text-left text-xs transition-all ${
                  isSelected
                    ? opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-950/30 text-emerald-200 ring-1 ring-emerald-400'
                      : 'border-rose-500 bg-rose-950/30 text-rose-200 ring-1 ring-rose-400'
                    : 'border-white/10 bg-[#111827]/70 text-slate-300 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="font-semibold leading-relaxed mb-2">{opt.hypothesis}</div>
                <span className="text-[10px] text-slate-400 font-mono">Click to test hypothesis →</span>
              </button>
            );
          })}
        </div>

        {/* Feedback & Remediation Patch Code */}
        {feedback && (
          <div className={`mt-4 rounded-2xl border p-5 space-y-3 ${
            feedback.isCorrect
              ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200'
              : 'border-rose-500/40 bg-rose-950/20 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 text-sm font-bold">
              {feedback.isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-300">INCIDENT ROOT CAUSE CONFIRMED!</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <span className="text-rose-300">INCORRECT HYPOTHESIS</span>
                </>
              )}
            </div>

            <p className="text-xs leading-relaxed">
              {feedback.explanation}
            </p>

            {feedback.code && (
              <div className="mt-3">
                <div className="text-[11px] font-mono font-semibold uppercase text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5" />
                  <span>Production Fix Code:</span>
                </div>
                <pre className="rounded-xl bg-[#070B14] p-3 text-xs font-mono text-emerald-200 border border-emerald-500/20 overflow-x-auto">
                  {feedback.code}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
