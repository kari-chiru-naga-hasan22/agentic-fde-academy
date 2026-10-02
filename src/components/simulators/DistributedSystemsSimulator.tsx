import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Server, 
  Flame, 
  RotateCcw, 
  Activity, 
  Sliders, 
  ShieldCheck, 
  AlertTriangle,
  Zap,
  ArrowRight
} from 'lucide-react';

export const DistributedSystemsSimulator: React.FC = () => {
  const [trafficRps, setTrafficRps] = useState(1200);
  const [lbAlgorithm, setLbAlgorithm] = useState<'round-robin' | 'least-connections' | 'ip-hash'>('least-connections');
  const [server2Killed, setServer2Killed] = useState(false);
  const [simulationTick, setSimulationTick] = useState(0);

  // Live simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSimulationTick(p => p + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Server loads calculation
  const activeServersCount = server2Killed ? 2 : 3;
  const loadPerServer = Math.round(trafficRps / activeServersCount);
  
  const server1Util = Math.min(100, Math.round((loadPerServer / 600) * 100));
  const server2Util = server2Killed ? 0 : Math.min(100, Math.round((loadPerServer / 600) * 100));
  const server3Util = Math.min(100, Math.round((loadPerServer / 600) * 100));

  const p95Latency = server2Killed 
    ? trafficRps > 1500 ? 1450 : 380 
    : 45;
  const errorRate = server2Killed && trafficRps > 1500 ? '4.8%' : '0.00%';

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-xs font-bold text-white">
              <Network className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              Distributed Systems Simulator: Load Balancing & Failover
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test traffic redistribution, queue backpressure, and trigger catastrophic server failures.
          </p>
        </div>

        {/* Algorithm selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 mr-1 hidden sm:inline">LB Algorithm:</span>
          {(['round-robin', 'least-connections', 'ip-hash'] as const).map(alg => (
            <button
              key={alg}
              onClick={() => setLbAlgorithm(alg)}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold border transition-all ${
                lbAlgorithm === alg
                  ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {alg.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Control Sliders & Kill Switch */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span>Incoming Traffic:</span>
            <span className="font-mono font-bold text-cyan-400">{trafficRps} reqs/sec</span>
          </div>
          <input
            type="range"
            min="200"
            max="2400"
            step="100"
            value={trafficRps}
            onChange={(e) => setTrafficRps(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
            <span>200 RPS (Idle)</span>
            <span>2400 RPS (Overload)</span>
          </div>
        </div>

        {/* Chaos Engineering: Kill Server Button */}
        <div className="flex flex-col justify-between">
          <span className="text-xs text-slate-300 mb-1">Chaos Engineering Injection:</span>
          <button
            onClick={() => setServer2Killed(!server2Killed)}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md ${
              server2Killed
                ? 'bg-rose-600 text-white shadow-rose-600/30 ring-2 ring-rose-400'
                : 'bg-rose-950/40 text-rose-300 border border-rose-500/40 hover:bg-rose-900/40'
            }`}
          >
            <Flame className="h-4 w-4" />
            <span>{server2Killed ? 'Server 2 DEAD (Click to Recover)' : 'KILL SERVER 2'}</span>
          </button>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-col justify-between">
          <span className="text-xs text-slate-300 mb-1">System Health Status:</span>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#070B14] p-2 border border-white/5 flex-1 text-center">
              <div className="text-[10px] text-slate-400">P95 Latency</div>
              <div className={`text-xs font-mono font-bold ${p95Latency > 300 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {p95Latency} ms
              </div>
            </div>
            <div className="rounded-xl bg-[#070B14] p-2 border border-white/5 flex-1 text-center">
              <div className="text-[10px] text-slate-400">Error Rate</div>
              <div className={`text-xs font-mono font-bold ${errorRate !== '0.00%' ? 'text-rose-400' : 'text-emerald-400'}`}>
                {errorRate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Distributed Topology */}
      <div className="rounded-2xl border border-white/10 bg-[#070B14] p-6 relative overflow-hidden">
        {/* Load Balancer Node */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="rounded-2xl border border-cyan-500/40 bg-cyan-950/30 px-6 py-3 text-center shadow-lg shadow-cyan-500/10">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Network className="h-4 w-4 text-cyan-400" />
              <span>Application Load Balancer</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-300 mt-0.5">
              Distributing {trafficRps} RPS via {lbAlgorithm}
            </div>
          </div>
        </div>

        {/* 3 Backend Servers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Server 1 */}
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">Worker Node 1</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Healthy
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>CPU / Memory:</span>
                <span className="font-mono text-indigo-300">{server1Util}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${server1Util > 85 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                  style={{ width: `${server1Util}%` }}
                />
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Inflight Queue: {Math.round(loadPerServer / 25)} tasks
            </div>
          </div>

          {/* Server 2 (Subject to kill) */}
          <div className={`rounded-2xl border p-4 space-y-3 transition-all ${
            server2Killed
              ? 'border-rose-500/50 bg-rose-950/20 opacity-70'
              : 'border-white/10 bg-[#111827]'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className={`h-4 w-4 ${server2Killed ? 'text-rose-500' : 'text-indigo-400'}`} />
                <span className="text-xs font-bold text-white">Worker Node 2</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                server2Killed
                  ? 'bg-rose-500/20 text-rose-400 font-bold animate-pulse'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {server2Killed ? 'CRASHED (503)' : 'Healthy'}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>CPU / Memory:</span>
                <span className="font-mono text-indigo-300">{server2Util}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${server2Util}%` }}
                />
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {server2Killed ? 'Traffic rerouted to Nodes 1 & 3' : `Inflight Queue: ${Math.round(loadPerServer / 25)} tasks`}
            </div>
          </div>

          {/* Server 3 */}
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">Worker Node 3</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Healthy
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>CPU / Memory:</span>
                <span className="font-mono text-indigo-300">{server3Util}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${server3Util > 85 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                  style={{ width: `${server3Util}%` }}
                />
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Inflight Queue: {Math.round(loadPerServer / 25)} tasks
            </div>
          </div>
        </div>

        {/* Architectural Insight */}
        {server2Killed && (
          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">What Just Happened: </span>
              Health checks detected Node 2 failure. The Load Balancer removed Node 2 from the active target group and redistributed load equally to Nodes 1 & 3. Because capacity was reduced by 33%, per-node utilization increased from 66% to {server1Util}%.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
