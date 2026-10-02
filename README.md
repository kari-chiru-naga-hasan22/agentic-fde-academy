# Nexus AI Academy: Agentic AI + Forward Deployed Engineering (FDE)

[![Vercel Live Demo](https://img.shields.io/badge/Vercel-Live%20Platform-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://agentic-fde-academy.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kari-chiru-naga-hasan22/agentic-fde-academy)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Live Production Platform**: [https://agentic-fde-academy.vercel.app](https://agentic-fde-academy.vercel.app)

---

## 🎯 The Mission

Designed specifically for a **3-1 B.Tech student** aiming to land a top-tier **Agentic AI Engineer / Forward Deployed Engineer (FDE) internship by the start of 3-2**, and grow into an exceptional **Production AI Systems Engineer**.

This platform is **NOT** a static textbook or documentation site. It is an **interactive engineering simulator + system design laboratory + customer discovery simulator + interview readiness platform**.

```
Understand → See → Interact → Implement → Build → Break → Debug → Deploy → Measure → Explain → Design
```

---

## 🚀 Key Features & Interactive Simulators

### 1. Production Hybrid RAG Pipeline
* **Visual Pipeline**: Ingestion → Recursive Chunking → HNSW Indexing → Hybrid Search (Dense Cosine + Sparse BM25) → Reciprocal Rank Fusion (RRF $k=60$) → Cross-Encoder Neural Reranking → Context Assembly → LLM.
* **Interactive Parameters**: Dynamic sliders for Chunk Size (100–1000 tokens), Retrieval Top-K (1–8), and Cross-Encoder Reranker toggles.
* **Live Telemetry**: Real-time calculations for Context Window Size, p95 Latency, Cost per 1k queries, and Retrieval Precision.

### 2. The ReAct Agent Loop Simulator
* **State Machine Trajectory**: Step-by-step execution through **Thought → Action → Observation → State Update → Terminate**.
* **Failure Injection**: Test agent self-healing when tools return HTTP 500 errors, database timeouts, or malformed outputs.
* **Schema Validation**: Inspect structured tool arguments and sanitized execution outputs.

### 3. Interactive System Design Canvas (100k Users / 10k QPS)
* **Component Palette**: API Gateways, Load Balancers, FastAPI Microservices, Redis Semantic Caches, PostgreSQL, Kafka Event Streams, Qdrant/pgvector, Cross-Encoder Rerankers, Guardrails, and OpenTelemetry.
* **Real-Time Architecture Evaluator**: Calculates Scalability (0–100), Reliability (0–100), Security (0–100), p95 Latency, and Monthly Cost with detailed architectural critique explaining *WHY*.

### 4. Distributed Systems & Chaos Simulator
* **Load Balancing Algorithms**: Round Robin, Least Connections, and IP Hash.
* **"KILL SERVER 2" Button**: Trigger real-time worker crashes, observe automatic traffic redistribution, queue backpressure, and latency spikes.

### 5. Forward Deployed Engineering (FDE) Customer Lab
* **Simulated Stakeholder Personas**:
  * *Marcus Vance* (Skeptical VP of Core Engineering at Tier-1 Investment Bank)
  * *Dr. Elena Rostova* (HealthTech CTO with HIPAA / Sub-800ms constraints)
  * *Tariq Al-Mansoor* (E-Commerce VP of Ops with 10M SKUs & Idempotent Refunds)
* **Discovery Interview Engine**: Ask targeted questions, uncover hidden regulatory constraints, and achieve a 100% discovery score before pitching architecture.

### 6. Production Outage & Debugging Simulator
* **Incident Post-Mortems**: Inspect realistic server logs, system metrics, and OpenTelemetry trace waterfalls to identify root causes and apply production code patches.

### 7. 12-Week Internship Sprint Roadmap
* Complete builder-centric curriculum from Week 1 to Week 12:
  * Non-negotiable weekly build deliverables and suggested GitHub repositories
  * LeetCode Medium DSA progression
  * System design topics and technical interview questions
  * Application timeline actions (when to network, apply, and interview)

### 8. "Am I Ready for an Internship?" Checklist
* 18-point capability checklist with verification challenges covering Backend, AI/LLM, RAG, Agents, DevOps, and FDE.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 19, TypeScript, Tailwind CSS v4, `@tailwindcss/vite`
* **Icons**: `lucide-react`
* **Interactive Effects**: `canvas-confetti`
* **Build System**: Vite 8
* **Deployment**: GitHub (`kari-chiru-naga-hasan22/agentic-fde-academy`) + Vercel Production

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/kari-chiru-naga-hasan22/agentic-fde-academy.git
cd agentic-fde-academy

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 License

MIT © 2026 Nexus AI Academy
