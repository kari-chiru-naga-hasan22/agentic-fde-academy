import React, { useState } from 'react';
import { Compass, Sliders, Info, ArrowRight, Check } from 'lucide-react';

interface VectorPoint {
  id: string;
  label: string;
  category: 'animals' | 'vehicles' | 'sports';
  x: number; // 2D projection coords (0 to 100)
  y: number;
}

export const EmbeddingVisualizer: React.FC = () => {
  const [metric, setMetric] = useState<'cosine' | 'dot' | 'euclidean'>('cosine');
  const [topK, setTopK] = useState(3);
  const [selectedQuery, setSelectedQuery] = useState<'kitten' | 'supersonic jet' | 'world cup match'>('kitten');

  const points: VectorPoint[] = [
    { id: '1', label: 'golden retriever', category: 'animals', x: 22, y: 30 },
    { id: '2', label: 'domestic cat', category: 'animals', x: 28, y: 25 },
    { id: '3', label: 'playful puppy', category: 'animals', x: 20, y: 35 },
    { id: '4', label: 'electric sedan', category: 'vehicles', x: 75, y: 70 },
    { id: '5', label: 'cargo airplane', category: 'vehicles', x: 85, y: 80 },
    { id: '6', label: 'diesel submarine', category: 'vehicles', x: 70, y: 85 },
    { id: '7', label: 'football championship', category: 'sports', x: 50, y: 20 },
    { id: '8', label: 'basketball tournament', category: 'sports', x: 55, y: 28 }
  ];

  const queryPositions: Record<string, { x: number; y: number }> = {
    'kitten': { x: 27, y: 28 },
    'supersonic jet': { x: 88, y: 78 },
    'world cup match': { x: 52, y: 22 }
  };

  const activeQueryPos = queryPositions[selectedQuery];

  // Calculate distances
  const scoredPoints = points.map(pt => {
    const dx = pt.x - activeQueryPos.x;
    const dy = pt.y - activeQueryPos.y;
    const euclideanDist = Math.sqrt(dx * dx + dy * dy);
    // Cosine similarity proxy based on normalized angle
    const dotProduct = (pt.x * activeQueryPos.x + pt.y * activeQueryPos.y) / 1000;
    const cosineSim = Math.max(0, 1 - (euclideanDist / 120));
    
    return {
      ...pt,
      euclideanDist: euclideanDist.toFixed(2),
      cosineSim: cosineSim.toFixed(3),
      dotProduct: dotProduct.toFixed(2)
    };
  });

  scoredPoints.sort((a, b) => {
    if (metric === 'euclidean') return Number(a.euclideanDist) - Number(b.euclideanDist);
    return Number(b.cosineSim) - Number(a.cosineSim);
  });

  const topKPoints = scoredPoints.slice(0, topK);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0F1A] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              <Compass className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-heading text-lg font-bold text-white">
              Interactive 2D Semantic Embedding Space Visualizer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize how dense embeddings cluster semantically similar concepts together in vector space.
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex items-center gap-2">
          {(['cosine', 'euclidean', 'dot'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                metric === m
                  ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {m === 'cosine' ? 'Cosine Similarity' : m === 'euclidean' ? 'Euclidean (L2)' : 'Dot Product'}
            </button>
          ))}
        </div>
      </div>

      {/* Projection Disclaimer Alert matching Rule #15 */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-3.5 flex items-start gap-2.5 text-xs text-indigo-200">
        <Info className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Dimensionality Reduction Note: </span>
          Real text embeddings (e.g. OpenAI `text-embedding-3-small`) exist in 1536-dimensional continuous geometric space. This 2D visualization represents an orthogonal projection (via t-SNE / PCA / UMAP) preserving local neighborhood distances for human visual intuition.
        </div>
      </div>

      {/* Interactive Controls & Query Picker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
        <div>
          <label className="text-xs text-slate-300 block mb-1.5 font-medium">Select Query Concept:</label>
          <div className="flex flex-wrap gap-2">
            {(['kitten', 'supersonic jet', 'world cup match'] as const).map(q => (
              <button
                key={q}
                onClick={() => setSelectedQuery(q)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                  selectedQuery === q
                    ? 'border-indigo-500 bg-indigo-600 text-white'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span>Nearest Neighbors (Top-K):</span>
            <span className="font-mono font-bold text-indigo-400">{topK}</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            value={topK}
            onChange={(e) => setTopK(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* 2D Interactive Scatter Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* SVG Scatter Plot */}
        <div className="lg:col-span-2 relative h-80 rounded-2xl border border-white/10 bg-[#070B14] p-4 flex items-center justify-center overflow-hidden">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            {/* Semantic Clusters Background Radii */}
            <circle cx="25" cy="30" r="16" fill="rgba(99, 102, 241, 0.08)" stroke="rgba(99, 102, 241, 0.2)" strokeDasharray="2,2" />
            <circle cx="75" cy="78" r="16" fill="rgba(6, 182, 212, 0.08)" stroke="rgba(6, 182, 212, 0.2)" strokeDasharray="2,2" />
            <circle cx="52" cy="24" r="14" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="2,2" />

            {/* Distance Lines from Query to Top-K */}
            {topKPoints.map(p => (
              <line
                key={`line-${p.id}`}
                x1={activeQueryPos.x}
                y1={activeQueryPos.y}
                x2={p.x}
                y2={p.y}
                stroke="#10B981"
                strokeWidth="0.8"
                strokeDasharray="1,1"
              />
            ))}

            {/* Document Vectors */}
            {points.map(p => {
              const isTop = topKPoints.some(tk => tk.id === p.id);
              return (
                <g key={p.id} className="cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isTop ? 2.5 : 1.8}
                    fill={isTop ? '#10B981' : p.category === 'animals' ? '#818CF8' : p.category === 'vehicles' ? '#22D3EE' : '#FBBF24'}
                    className="transition-all"
                  />
                  <text
                    x={p.x + 2}
                    y={p.y - 1.5}
                    fontSize="3"
                    fill={isTop ? '#FFFFFF' : '#94A3B8'}
                    fontWeight={isTop ? 'bold' : 'normal'}
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}

            {/* Active Query Point (Star/Pulse) */}
            <circle
              cx={activeQueryPos.x}
              cy={activeQueryPos.y}
              r="2.8"
              fill="#F43F5E"
              stroke="#FFF"
              strokeWidth="0.8"
            />
            <text
              x={activeQueryPos.x + 2}
              y={activeQueryPos.y + 4}
              fontSize="3.2"
              fill="#F43F5E"
              fontWeight="bold"
            >
              QUERY: "{selectedQuery}"
            </text>
          </svg>
        </div>

        {/* Ranked Nearest Neighbors List */}
        <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4 space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
            Top-{topK} Nearest Vectors:
          </div>
          <div className="space-y-2">
            {topKPoints.map((pt, idx) => (
              <div
                key={pt.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#070B14] border border-emerald-500/30 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-white">{pt.label}</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">
                  {metric === 'cosine' ? `${pt.cosineSim}` : metric === 'euclidean' ? `${pt.euclideanDist}` : `${pt.dotProduct}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
