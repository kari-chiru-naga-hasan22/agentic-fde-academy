import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { RightInspector } from './components/layout/RightInspector';
import { HeroBanner } from './components/common/HeroBanner';
import { ActionButtons } from './components/common/ActionButtons';
import { CodeInspector } from './components/common/CodeInspector';
import { HandsOnPlayground } from './components/common/HandsOnPlayground';
import { RealWorldApps } from './components/common/RealWorldApps';
import { RAGSimulator } from './components/simulators/RAGSimulator';
import { AgentSimulator } from './components/simulators/AgentSimulator';
import { DistributedSystemsSimulator } from './components/simulators/DistributedSystemsSimulator';
import { EmbeddingVisualizer } from './components/simulators/EmbeddingVisualizer';
import { ObservabilityLab } from './components/simulators/ObservabilityLab';
import { SecurityLab } from './components/simulators/SecurityLab';
import { PostgresVisualizer } from './components/simulators/PostgresVisualizer';
import { ChunkingVisualizer } from './components/simulators/ChunkingVisualizer';
import { CostLatencyLab } from './components/simulators/CostLatencyLab';
import { SystemDesignCanvas } from './components/simulators/SystemDesignCanvas';
import { FDESimulator } from './components/simulators/FDESimulator';
import { DebuggingLab } from './components/simulators/DebuggingLab';
import { SprintRoadmap } from './components/simulators/SprintRoadmap';
import { InternshipReadiness } from './components/simulators/InternshipReadiness';
import { BlankRepoChallengeView } from './components/simulators/BlankRepoChallengeView';
import { KnowledgeGraphView } from './components/simulators/KnowledgeGraphView';
import { TOPICS, READINESS_CHECKLIST } from './data/curriculumData';
import { LearningMode, TopicItem } from './types';
import { Clock, Cpu, Layers, Sparkles, Network, Eye, Scissors, DollarSign, Database, ShieldAlert } from 'lucide-react';

export function App() {
  const [currentMode, setCurrentMode] = useState<LearningMode>('overview');
  const [currentTopicId, setCurrentTopicId] = useState<string>('rag-pipeline');
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<
    'rag' | 'agent' | 'distributed' | 'embeddings' | 'observability' | 'security' | 'postgres' | 'chunking' | 'cost'
  >('rag');
  const [injectedFailure, setInjectedFailure] = useState<string | null>(null);

  const activeTopic: TopicItem = TOPICS.find(t => t.id === currentTopicId) || TOPICS[0];

  const handleBreakIt = (failureTitle: string) => {
    setInjectedFailure(failureTitle);
    setCurrentMode('visualize');
    setActiveSimulatorTab('rag');
  };

  const handleDesignIt = () => {
    setCurrentMode('system-design');
  };

  const handleBuildIt = () => {
    setCurrentMode('blank-repo');
  };

  const completedCount = READINESS_CHECKLIST.filter(r => r.completed).length;

  const simulatorTabs = [
    { id: 'rag', label: 'RAG Pipeline', icon: Layers },
    { id: 'agent', label: 'ReAct Agent', icon: Cpu },
    { id: 'distributed', label: 'Distributed Systems', icon: Network },
    { id: 'embeddings', label: '2D Vector Space', icon: Eye },
    { id: 'chunking', label: 'Chunking Lab', icon: Scissors },
    { id: 'observability', label: 'Observability & Tracing', icon: Eye },
    { id: 'security', label: 'AI Security Lab', icon: ShieldAlert },
    { id: 'postgres', label: 'PostgreSQL & SQL', icon: Database },
    { id: 'cost', label: 'Cost & Latency Lab', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header */}
      <Header 
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
      />

      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentMode={currentMode}
          onSelectMode={(mode) => setCurrentMode(mode)}
          completedTasksCount={completedCount}
          totalTasksCount={READINESS_CHECKLIST.length}
        />

        {/* Center Main Stage Content */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 space-y-8 overflow-y-auto">
          {/* Top Hero Banner */}
          <HeroBanner 
            onSelectTopic={(topicId) => {
              setCurrentTopicId(topicId);
              setCurrentMode('visualize');
            }}
          />

          {/* DYNAMIC MODE SWITCHER */}
          {currentMode === 'system-design' && (
            <SystemDesignCanvas />
          )}

          {currentMode === 'fde-sim' && (
            <FDESimulator />
          )}

          {currentMode === 'debugging' && (
            <DebuggingLab />
          )}

          {currentMode === 'sprint' && (
            <SprintRoadmap />
          )}

          {currentMode === 'readiness' && (
            <InternshipReadiness />
          )}

          {currentMode === 'blank-repo' && (
            <BlankRepoChallengeView />
          )}

          {currentMode === 'knowledge-graph' && (
            <KnowledgeGraphView />
          )}

          {(currentMode === 'overview' || currentMode === 'visualize') && (
            <div className="space-y-8">
              {/* STEP 1: CONCEPT OVERVIEW (Matching reference #1 Concept Overview) */}
              <section className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                        1
                      </span>
                      <h2 className="font-heading text-lg font-bold text-white">
                        Concept Overview & Intuition Layer
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      A clear, visual architecture explanation to build your mental model before touching code.
                    </p>
                  </div>

                  {/* Topic Badge */}
                  <span className="self-start sm:self-auto rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
                    Level {activeTopic.level} · {activeTopic.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Summary & Metadata Badges */}
                  <div className="lg:col-span-2 space-y-4">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {activeTopic.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeTopic.summary}
                    </p>

                    {/* Metadata Badges matching reference */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="rounded-2xl border border-white/5 bg-[#111827] p-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Latency Target</div>
                          <div className="text-xs font-mono font-bold text-white">{activeTopic.latencyExpectation || 'Sub-second'}</div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-[#111827] p-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                          <Cpu className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Memory / Graph</div>
                          <div className="text-xs font-mono font-bold text-white">HNSW m=16</div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-[#111827] p-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Works On</div>
                          <div className="text-xs font-bold text-white truncate max-w-[120px]">{activeTopic.worksOn}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Triggers: WHY, WHAT IF, BUILD IT, BREAK IT, DESIGN IT, EXPLAIN IT */}
                    <ActionButtons
                      topic={activeTopic}
                      onBreakIt={handleBreakIt}
                      onDesignIt={handleDesignIt}
                      onBuildIt={handleBuildIt}
                    />
                  </div>

                  {/* Right: Key Idea Callout Box matching reference */}
                  <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-[#111827] to-[#070B14] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>Key Idea</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed italic">
                      "{activeTopic.keyIdea}"
                    </p>

                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Physical Intuition Analogy:
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeTopic.intuitionAnalogy}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SIMULATOR SELECTOR TABS */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {simulatorTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeSimulatorTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSimulatorTab(tab.id as any)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                        isActive
                          ? 'border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'border-white/10 bg-[#0B0F1A] text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* STEP 2: INTERACTIVE VISUALIZATION / SIMULATOR (Matching reference #2) */}
              <section>
                {activeSimulatorTab === 'rag' && (
                  <RAGSimulator
                    injectedFailure={injectedFailure}
                    onClearFailure={() => setInjectedFailure(null)}
                  />
                )}
                {activeSimulatorTab === 'agent' && (
                  <AgentSimulator />
                )}
                {activeSimulatorTab === 'distributed' && (
                  <DistributedSystemsSimulator />
                )}
                {activeSimulatorTab === 'embeddings' && (
                  <EmbeddingVisualizer />
                )}
                {activeSimulatorTab === 'chunking' && (
                  <ChunkingVisualizer />
                )}
                {activeSimulatorTab === 'observability' && (
                  <ObservabilityLab />
                )}
                {activeSimulatorTab === 'security' && (
                  <SecurityLab />
                )}
                {activeSimulatorTab === 'postgres' && (
                  <PostgresVisualizer />
                )}
                {activeSimulatorTab === 'cost' && (
                  <CostLatencyLab />
                )}
              </section>

              {/* STEP 3: PRODUCTION CODE & LINE-BY-LINE INSPECTOR (Matching reference #3) */}
              <section>
                <CodeInspector topic={activeTopic} />
              </section>

              {/* STEP 4: HANDS-ON PLAYGROUND (Matching reference #4) */}
              <section>
                <HandsOnPlayground topic={activeTopic} />
              </section>

              {/* STEP 5: REAL-WORLD APPLICATIONS (Matching reference #5) */}
              <section>
                <RealWorldApps topic={activeTopic} />
              </section>
            </div>
          )}
        </main>

        {/* Right Inspector Panel matching reference image */}
        <RightInspector
          currentTopic={activeTopic}
          onSelectTopic={(id) => setCurrentTopicId(id)}
          onRunSimulation={(inputVal) => {
            alert(`Running simulation test with query: "${inputVal}"`);
          }}
        />
      </div>
    </div>
  );
}

export default App;
