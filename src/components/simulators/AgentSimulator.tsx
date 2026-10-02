import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward, 
  AlertTriangle, 
  CheckCircle, 
  Cpu, 
  Terminal, 
  Wrench, 
  Eye, 
  ArrowRight,
  Database
} from 'lucide-react';

interface AgentStepState {
  iteration: number;
  phase: 'THOUGHT' | 'ACTION' | 'OBSERVATION' | 'TERMINATE';
  thought: string;
  toolCall?: { name: string; args: Record<string, any> };
  observation?: string;
  isError?: boolean;
}

export const AgentSimulator: React.FC = () => {
  const [iteration, setIteration] = useState(1);
  const [maxIterations, setMaxIterations] = useState(5);
  const [isSimulatingToolFail, setIsSimulatingToolFail] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const scenarioTrajectory: AgentStepState[] = [
    {
      iteration: 1,
      phase: 'THOUGHT',
      thought: "The user is asking: 'What was our total cloud spend in Q3 and why did it spike?'. I need to first query the billing database for Q3 totals.",
    },
    {
      iteration: 1,
      phase: 'ACTION',
      thought: 'Calling sql_query_tool to fetch total spend for Q3 grouped by service.',
      toolCall: {
        name: 'sql_query_tool',
        args: { query: 'SELECT service, SUM(cost) FROM cloud_billing WHERE quarter = "Q3" GROUP BY service;' }
      }
    },
    {
      iteration: 1,
      phase: 'OBSERVATION',
      thought: 'Received SQL query results.',
      observation: isSimulatingToolFail 
        ? 'Error 500: Database connection timeout. Unable to reach Snowflake endpoint.'
        : 'Result: [{"service": "AWS Bedrock", "cost": "$42,500"}, {"service": "EC2 / RDS", "cost": "$18,200"}]',
      isError: isSimulatingToolFail
    },
    {
      iteration: 2,
      phase: 'THOUGHT',
      thought: isSimulatingToolFail
        ? 'The direct SQL query failed with a connection timeout. Let me switch to the cached daily metrics API as an alternative data source.'
        : 'AWS Bedrock jumped to $42.5k. Now I need to search our incident log or git commit history to find what triggered this spike in Bedrock usage.',
    },
    {
      iteration: 2,
      phase: 'ACTION',
      thought: 'Calling internal_audit_search_tool to identify Bedrock deployment changes in Q3.',
      toolCall: {
        name: 'internal_audit_search_tool',
        args: { service: 'AWS Bedrock', keyword: 'spike migration rollout' }
      }
    },
    {
      iteration: 2,
      phase: 'OBSERVATION',
      thought: 'Audit logs retrieved.',
      observation: 'Log Found: PR #402 deployed on Aug 14th enabled un-cached Claude 3.5 Sonnet queries on high-frequency document ingestion.'
    },
    {
      iteration: 3,
      phase: 'TERMINATE',
      thought: 'I now have both the financial spend data and the exact root cause commit. I can construct the final answer for the user.',
      observation: 'FINAL ANSWER: Q3 cloud spend totaled $60,700, driven by a 230% increase in AWS Bedrock ($42,500). Root cause was PR #402 deployed Aug 14 which accidentally disabled prompt caching on high-frequency ingestion workers.'
    }
  ];

  const currentStep = scenarioTrajectory[activeStepIndex];

  const handleNextStep = () => {
    if (activeStepIndex < scenarioTrajectory.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-10 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
              2
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              The ReAct Agent Simulator & Trajectory Inspector
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Step through the cyclic state machine: Thought → Action → Observation → State Update → Terminate.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSimulatingToolFail(!isSimulatingToolFail)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              isSimulatingToolFail
                ? 'border-rose-500 bg-rose-950/40 text-rose-300'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
            <span>{isSimulatingToolFail ? 'Tool Failure Active' : 'Inject Tool 500'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/10"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            disabled={activeStepIndex === scenarioTrajectory.length - 1}
            onClick={handleNextStep}
            className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-500 shadow-md shadow-purple-600/30 disabled:opacity-40"
          >
            <span>Step Forward</span>
            <StepForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Cyclic Visual Loop Graph */}
      <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { name: '1. THOUGHT', desc: 'LLM Reasoning & Strategy', phase: 'THOUGHT', icon: Cpu, color: 'text-indigo-400', border: 'border-indigo-500' },
          { name: '2. ACTION', desc: 'Tool Call & Schema Args', phase: 'ACTION', icon: Wrench, color: 'text-purple-400', border: 'border-purple-500' },
          { name: '3. OBSERVATION', desc: 'Sanitized Tool Output', phase: 'OBSERVATION', icon: Eye, color: 'text-cyan-400', border: 'border-cyan-500' },
          { name: '4. STATE UPDATE', desc: 'Memory & Next Loop', phase: 'TERMINATE', icon: Database, color: 'text-emerald-400', border: 'border-emerald-500' }
        ].map((node) => {
          const Icon = node.icon;
          const isActive = currentStep.phase === node.phase;
          return (
            <div
              key={node.name}
              className={`rounded-2xl border p-4 transition-all ${
                isActive
                  ? `${node.border} bg-white/10 shadow-lg shadow-purple-500/20 ring-1 ring-purple-400 scale-[1.02]`
                  : 'border-white/5 bg-[#111827]/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`h-4 w-4 ${node.color}`} />
                <span className="text-xs font-bold text-white">{node.name}</span>
              </div>
              <p className="text-[11px] text-slate-400">{node.desc}</p>
              {isActive && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-purple-300 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                  <span>Currently Executing</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active State Details Box */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-xs font-mono font-bold text-purple-300 border border-purple-500/30">
              Trajectory Step {activeStepIndex + 1} of {scenarioTrajectory.length}
            </span>
            <span className="text-xs font-semibold text-slate-300">
              Iteration {currentStep.iteration} / {maxIterations}
            </span>
          </div>

          <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${
            currentStep.phase === 'TERMINATE'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : currentStep.isError
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-indigo-500/20 text-indigo-300'
          }`}>
            Phase: {currentStep.phase}
          </span>
        </div>

        {/* Thought Display */}
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Internal Agent Thought:
          </div>
          <div className="text-xs text-slate-200 bg-[#070B14] p-3 rounded-xl border border-white/5 leading-relaxed font-mono">
            {currentStep.thought}
          </div>
        </div>

        {/* Tool Call details if present */}
        {currentStep.toolCall && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Wrench className="h-3 w-3" />
              <span>Tool Call Dispatched:</span>
              <span className="text-white font-mono">{currentStep.toolCall.name}</span>
            </div>
            <pre className="text-xs text-purple-200 bg-[#070B14] p-3 rounded-xl border border-purple-500/20 overflow-x-auto font-mono">
              {JSON.stringify(currentStep.toolCall.args, null, 2)}
            </pre>
          </div>
        )}

        {/* Observation details if present */}
        {currentStep.observation && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Eye className="h-3 w-3" />
              <span>Tool Output Observation:</span>
            </div>
            <div className={`text-xs p-3 rounded-xl border font-mono ${
              currentStep.isError
                ? 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                : 'bg-[#070B14] border-cyan-500/20 text-cyan-200'
            }`}>
              {currentStep.observation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
