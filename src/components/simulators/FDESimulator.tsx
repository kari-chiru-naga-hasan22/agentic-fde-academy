import React, { useState } from 'react';
import { 
  Briefcase, 
  MessageSquare, 
  ShieldAlert, 
  Award, 
  CheckCircle, 
  HelpCircle, 
  Send,
  Building,
  Lock,
  ChevronRight
} from 'lucide-react';
import { FDE_PERSONAS } from '../../data/fdeScenariosData';
import { FDEPersona } from '../../types';

export const FDESimulator: React.FC = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('fde-banking-vp');
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [conversation, setConversation] = useState<Array<{ sender: 'fde' | 'customer'; text: string }>>([
    {
      sender: 'customer',
      text: "Look, our executive committee wants 'AI everywhere', but my neck is on the line if this thing hallucinates a stock price or leaks client portfolio data to a third-party server. Why shouldn't I just build an Elasticsearch index and call it a day?"
    }
  ]);
  const [customQuestion, setCustomQuestion] = useState('');

  const activePersona = FDE_PERSONAS.find(p => p.id === selectedPersonaId) || FDE_PERSONAS[0];

  const suggestedQuestions = [
    {
      text: "What are your regulatory and data residency boundaries? Can data leave your private VPC to public cloud LLM endpoints?",
      revealsConstraintId: 'c1',
      response: "Absolutely not. Under FINRA rule 4511 and bank compliance, customer portfolio data cannot transit the public internet or enter multi-tenant cloud APIs. Any model must run air-gapped in our AWS VPC on private endpoints."
    },
    {
      text: "What is the acceptable latency SLA for traders querying this assistant during market open?",
      revealsConstraintId: 'c2',
      response: "Our bond and equity traders look at dozens of screens simultaneously. If an answer takes longer than 400ms, they will abandon the tool and call an analyst. 5-second multi-turn agent loops are out of the question."
    },
    {
      text: "How do compliance auditors verify trading decisions made using this assistant?",
      revealsConstraintId: 'c3',
      response: "Regulators require full non-repudiation. Every output must link to the exact paragraph, timestamp, and immutable SHA-256 hash of the regulatory filing. If the model generates an unbacked claim, we face seven-figure fines."
    },
    {
      text: "Are there strict information firewalls (Chinese Walls) between divisions regarding who can read which documents?",
      revealsConstraintId: 'c4',
      response: "Yes! Division A (Investment Banking) and Division B (Public Trading) are legally forbidden from seeing each other's research. The vector database must filter strictly on employee clearance metadata at query time."
    }
  ];

  const handleAskQuestion = (q: { text: string; revealsConstraintId: string; response: string }) => {
    setConversation(prev => [
      ...prev,
      { sender: 'fde', text: q.text },
      { sender: 'customer', text: q.response }
    ]);
    if (!discoveredIds.includes(q.revealsConstraintId)) {
      setDiscoveredIds(prev => [...prev, q.revealsConstraintId]);
    }
  };

  const discoveryScore = Math.round((discoveredIds.length / activePersona.hiddenConstraints.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-600 text-xs font-bold text-white">
                <Briefcase className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xl font-bold text-white">
                Forward Deployed Engineering: Customer Discovery Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Interview simulated enterprise stakeholders, discover unstated constraints, and defend an architecture that satisfies real-world production requirements.
            </p>
          </div>

          {/* Persona Switcher */}
          <div className="flex items-center gap-2">
            {FDE_PERSONAS.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPersonaId(p.id);
                  setDiscoveredIds([]);
                  setConversation([
                    { sender: 'customer', text: p.dialogueHistory[0].message }
                  ]);
                }}
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                  selectedPersonaId === p.id
                    ? 'border-purple-500 bg-purple-950/40 text-purple-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span>{p.type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stakeholder Profile Card */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-[#111827]/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={activePersona.avatar} 
              alt={activePersona.name} 
              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-purple-500/40"
            />
            <div>
              <div className="text-sm font-bold text-white">{activePersona.name}</div>
              <div className="text-xs text-purple-300 font-medium">{activePersona.title} · {activePersona.company}</div>
              <div className="text-[11px] text-slate-400 mt-0.5 max-w-xl">{activePersona.personality}</div>
            </div>
          </div>

          <div className="rounded-xl bg-[#070B14] p-3 border border-white/5 text-center min-w-[140px]">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Discovery Score</div>
            <div className="text-lg font-bold font-mono text-purple-400">{discoveryScore}%</div>
            <div className="text-[10px] text-slate-500">{discoveredIds.length} of {activePersona.hiddenConstraints.length} constraints</div>
          </div>
        </div>
      </div>

      {/* Main Interview Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Dialogue Transcript & Interactive Question Prompts */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 flex flex-col justify-between min-h-[500px]">
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
              Stakeholder Interview Transcript
            </div>

            {/* Conversation Messages */}
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'fde' ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] text-slate-400 mb-1 font-semibold">
                    {msg.sender === 'fde' ? 'You (Forward Deployed Engineer)' : activePersona.name}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'fde'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-[#111827] text-slate-200 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discovery Question Selector */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs font-semibold text-purple-300 mb-2">
              Choose Discovery Question to Uncover Hidden Architectural Constraints:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(q)}
                  className="rounded-xl border border-white/10 bg-[#111827] p-2.5 text-left text-xs text-slate-300 hover:border-purple-500/50 hover:bg-purple-950/20 hover:text-white transition-all flex items-start justify-between gap-2"
                >
                  <span className="leading-snug">{q.text}</span>
                  <ChevronRight className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Uncovered Constraints Tracker */}
        <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-5 space-y-4">
          <div className="border-b border-white/10 pb-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Discovered Constraints ({discoveredIds.length}/{activePersona.hiddenConstraints.length})
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Requirements discovered through targeted discovery inquiry.
            </p>
          </div>

          <div className="space-y-3">
            {activePersona.hiddenConstraints.map((c) => {
              const isDiscovered = discoveredIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    isDiscovered
                      ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                      : 'border-white/5 bg-[#111827]/40 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isDiscovered ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Lock className="h-4 w-4 text-slate-600 flex-shrink-0" />
                    )}
                    <span className="text-xs font-bold text-white">{c.topic}</span>
                  </div>
                  <div className="mt-1 text-xs">
                    {isDiscovered ? c.description : `[Undiscovered Constraint: ${c.clue}]`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Defense Pitch Unlocked when 100% discovered */}
          {discoveryScore === 100 && (
            <div className="rounded-2xl border border-purple-500/40 bg-purple-950/30 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
                <Award className="h-4 w-4 text-purple-400" />
                <span>Discovery Complete: Ready for Defense Pitch</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Recommended Solution: Deploy self-hosted quantized Llama-3-70B via vLLM on private AWS EC2 g5.12xlarge instances with pgvector HNSW in their VPC. Enforce row-level tenant security and deterministic paragraph hashes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
