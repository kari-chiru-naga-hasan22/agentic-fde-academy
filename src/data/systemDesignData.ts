import { SystemComponent } from '../types';

export const SYSTEM_COMPONENTS: SystemComponent[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway (Kong / Envoy)',
    category: 'ingress',
    icon: 'Shield',
    description: 'Reverse proxy managing TLS termination, authentication tokens (JWT), tenant routing, and token-bucket rate limiting.',
    baseLatencyMs: 4,
    costPerMillion: 1.5,
    failureRisk: 'Single point of ingress failure if not deployed in multi-AZ active-active mode.',
    whyUse: 'Stops malicious traffic, DDoS attacks, and unauthorized requests before hitting expensive backend compute.'
  },
  {
    id: 'load-balancer',
    name: 'Application Load Balancer (ALB)',
    category: 'ingress',
    icon: 'GitPullRequest',
    description: 'Distributes incoming HTTP/2 and WebSocket connections across auto-scaled container pods using Least Outstanding Requests.',
    baseLatencyMs: 3,
    costPerMillion: 0.8,
    failureRisk: 'TCP connection saturation under burst traffic if keep-alive timeouts are misconfigured.',
    whyUse: 'Enables horizontal pod autoscaling and zero-downtime rolling deployments.'
  },
  {
    id: 'fastapi-backend',
    name: 'FastAPI Microservice (uvicorn + uvloop)',
    category: 'compute',
    icon: 'Cpu',
    description: 'High-throughput async Python service orchestrating request validation, context assembly, and streaming SSE responses.',
    baseLatencyMs: 8,
    costPerMillion: 4.0,
    failureRisk: 'Event loop starvation if blocking synchronous calls are executed on the main thread.',
    whyUse: 'Native async/await ergonomics, Pydantic v2 validation throughput, and rapid development speed.'
  },
  {
    id: 'redis-cache',
    name: 'Redis Cluster (Semantic & Exact Cache)',
    category: 'storage',
    icon: 'Database',
    description: 'In-memory key-value store for user sessions, distributed rate limits, distributed locks, and prompt semantic caching.',
    baseLatencyMs: 2,
    costPerMillion: 2.0,
    failureRisk: 'Cache stampede (thundering herd) on key expiration if probabilistic early expiration (XFetch) is omitted.',
    whyUse: 'Cuts repetitive LLM query costs by 35-50% and reduces p50 latency from 1,200ms to 4ms.'
  },
  {
    id: 'postgres-db',
    name: 'PostgreSQL 16 (Relational Metadata & WAL)',
    category: 'storage',
    icon: 'Server',
    description: 'ACID transactional database storing user profiles, chat history, tenant permissions, and audit logs.',
    baseLatencyMs: 12,
    costPerMillion: 5.0,
    failureRisk: 'Connection pool exhaustion if application containers connect directly without PgBouncer.',
    whyUse: 'Uncompromising ACID guarantees, row-level security (RLS), and complex relational queries.'
  },
  {
    id: 'kafka-queue',
    name: 'Apache Kafka / RabbitMQ Event Stream',
    category: 'messaging',
    icon: 'Layers',
    description: 'Distributed append-only message log for asynchronous document ingestion pipelines, analytics, and audit events.',
    baseLatencyMs: 5,
    costPerMillion: 3.5,
    failureRisk: 'Consumer lag buildup when embedding worker generation speeds fall behind upload ingestion volume.',
    whyUse: 'Decouples heavy background ingestion from synchronous user query paths with replayability.'
  },
  {
    id: 'vector-db',
    name: 'Dedicated Vector DB (Qdrant / pgvector)',
    category: 'storage',
    icon: 'Compass',
    description: 'HNSW-indexed vector store executing approximate nearest neighbor (ANN) search over dense document embeddings.',
    baseLatencyMs: 25,
    costPerMillion: 15.0,
    failureRisk: 'Out-of-memory crash if HNSW graph exceeds RAM without scalar/product quantization.',
    whyUse: 'Sub-30ms semantic similarity retrieval over millions of unstructured documents.'
  },
  {
    id: 'reranker-service',
    name: 'Cross-Encoder Reranker (ms-marco)',
    category: 'ai',
    icon: 'Zap',
    description: 'Deep neural network computing cross-attention between user query and top 20 candidate chunks to filter false positives.',
    baseLatencyMs: 75,
    costPerMillion: 25.0,
    failureRisk: 'High GPU/CPU load during peak traffic spikes.',
    whyUse: 'Increases retrieval precision from 72% to 96% by capturing fine-grained semantic dependencies.'
  },
  {
    id: 'llm-inference',
    name: 'Hosted LLM API (OpenAI / Anthropic / Bedrock)',
    category: 'ai',
    icon: 'Bot',
    description: 'Frontier foundation model generating structured answers, reasoning, and tool call schemas.',
    baseLatencyMs: 650,
    costPerMillion: 180.0,
    failureRisk: 'Third-party 429 Rate Limits, network timeouts, and model provider outages.',
    whyUse: 'State-of-the-art reasoning, code synthesis, and multi-turn conversational intelligence.'
  },
  {
    id: 'agent-worker',
    name: 'Stateful Agent Worker (Temporal / LangGraph)',
    category: 'compute',
    icon: 'Workflow',
    description: 'Persistent worker executing multi-step ReAct loops with state checkpoints and human-in-the-loop approvals.',
    baseLatencyMs: 1200,
    costPerMillion: 240.0,
    failureRisk: 'Runaway token consumption if loop max_iterations and timeout limits are not strictly enforced.',
    whyUse: 'Solves complex, dynamic tasks requiring external API lookups and iterative validation.'
  },
  {
    id: 'tool-sandbox',
    name: 'Isolated Tool Execution Sandbox (gVisor)',
    category: 'compute',
    icon: 'Box',
    description: 'Containerized microVM executing arbitrary Python, SQL, or Bash code generated by the agent without host access.',
    baseLatencyMs: 40,
    costPerMillion: 10.0,
    failureRisk: 'Container spin-up cold start delays if pools of warm microVMs are not maintained.',
    whyUse: 'Essential defense against Remote Code Execution (RCE) and server compromise.'
  },
  {
    id: 'guardrails',
    name: 'AI Safety & Input Guardrails (NeMo / LlamaGuard)',
    category: 'ingress',
    icon: 'Lock',
    description: 'Pre-flight and post-flight classifier filtering prompt injection attacks, PII leaks, and toxic outputs.',
    baseLatencyMs: 35,
    costPerMillion: 8.0,
    failureRisk: 'False positive classification blocking legitimate user queries with domain-specific jargon.',
    whyUse: 'Protects enterprise data, brand safety, and regulatory compliance.'
  },
  {
    id: 'opentelemetry',
    name: 'OpenTelemetry Observability (Phoenix / Datadog)',
    category: 'observability',
    icon: 'Eye',
    description: 'Distributed tracing collector capturing per-span latencies, token consumption, cost, and retrieval evaluations.',
    baseLatencyMs: 2,
    costPerMillion: 3.0,
    failureRisk: 'Collector buffer overflow under high traffic if head-based trace sampling is omitted.',
    whyUse: 'Indispensable for diagnosing slow queries, tracking token costs, and debugging hallucination incidents.'
  }
];

export interface ArchitectureEvaluation {
  scalabilityScore: number; // 0-100
  reliabilityScore: number;
  securityScore: number;
  estimatedLatencyMs: number;
  estimatedMonthlyCostUSD: number;
  verdict: 'Production Ready' | 'Risky Architecture' | 'Critical Flaws Detected';
  critiques: { type: 'positive' | 'warning' | 'danger'; text: string }[];
}

export function evaluateArchitecture(selectedIds: string[]): ArchitectureEvaluation {
  const hasGateway = selectedIds.includes('api-gateway');
  const hasLB = selectedIds.includes('load-balancer');
  const hasBackend = selectedIds.includes('fastapi-backend');
  const hasRedis = selectedIds.includes('redis-cache');
  const hasPostgres = selectedIds.includes('postgres-db');
  const hasVectorDB = selectedIds.includes('vector-db');
  const hasReranker = selectedIds.includes('reranker-service');
  const hasLLM = selectedIds.includes('llm-inference');
  const hasQueue = selectedIds.includes('kafka-queue');
  const hasGuardrails = selectedIds.includes('guardrails');
  const hasOTel = selectedIds.includes('opentelemetry');
  const hasToolSandbox = selectedIds.includes('tool-sandbox');
  const hasAgent = selectedIds.includes('agent-worker');

  const critiques: { type: 'positive' | 'warning' | 'danger'; text: string }[] = [];
  let latency = 0;
  let costPerMillion = 0;

  selectedIds.forEach(id => {
    const comp = SYSTEM_COMPONENTS.find(c => c.id === id);
    if (comp) {
      latency += comp.baseLatencyMs;
      costPerMillion += comp.costPerMillion;
    }
  });

  // Base checks
  if (!hasBackend) {
    critiques.push({ type: 'danger', text: 'Missing API Compute layer. Client requests cannot be handled.' });
  }
  if (!hasLLM && !hasAgent) {
    critiques.push({ type: 'danger', text: 'No AI model or Agent selected. System cannot perform natural language reasoning.' });
  }

  // Caching
  if (hasRedis) {
    critiques.push({ type: 'positive', text: 'Redis caching enabled. Cuts redundant LLM calls by up to 40% and drastically lowers p50 latency.' });
    latency = Math.max(15, latency * 0.7); // Average latency reduction
  } else {
    critiques.push({ type: 'warning', text: 'No Caching layer detected! Every query will hit the LLM and database directly, multiplying cost and latency.' });
  }

  // Security
  let securityScore = 50;
  if (hasGateway) securityScore += 15;
  if (hasGuardrails) {
    securityScore += 20;
    critiques.push({ type: 'positive', text: 'AI Guardrails active: Prompt injection attacks and toxic jailbreaks are sanitized.' });
  } else {
    critiques.push({ type: 'danger', text: 'Missing Guardrails! Vulnerable to direct and indirect prompt injection attacks from untrusted data.' });
  }
  if (hasAgent && !hasToolSandbox) {
    securityScore -= 25;
    critiques.push({ type: 'danger', text: 'CRITICAL SECURITY VULNERABILITY: Agent worker can execute code without a Sandbox (gVisor). Host server can be compromised via RCE.' });
  }

  // Reliability & Scalability
  let reliabilityScore = 50;
  let scalabilityScore = 50;
  if (hasLB) { reliabilityScore += 15; scalabilityScore += 15; }
  if (hasQueue) {
    scalabilityScore += 20;
    critiques.push({ type: 'positive', text: 'Asynchronous Event Queue (Kafka) protects the system against burst traffic spikes and decoupling ingestion.' });
  } else if (hasVectorDB) {
    critiques.push({ type: 'warning', text: 'Document ingestion runs synchronously on the web server without an event queue. High document upload volume will block user chat queries.' });
  }

  // Reranking impact
  if (hasVectorDB && hasReranker) {
    critiques.push({ type: 'positive', text: 'Two-stage retrieval (Vector Search + Cross-Encoder Reranker) delivers enterprise-grade retrieval precision.' });
  }

  // Observability
  if (hasOTel) {
    reliabilityScore += 15;
    critiques.push({ type: 'positive', text: 'OpenTelemetry instrumentation enabled. Full trace visibility across all microservices.' });
  } else {
    critiques.push({ type: 'warning', text: 'Observability gap: Without distributed tracing, diagnosing latency spikes or hallucination incidents in production will be blind guessing.' });
  }

  // Estimated monthly cost for 1M requests
  const estimatedMonthlyCostUSD = Math.round(costPerMillion * 1.8);

  let verdict: 'Production Ready' | 'Risky Architecture' | 'Critical Flaws Detected' = 'Production Ready';
  if (securityScore < 60 || reliabilityScore < 60 || critiques.some(c => c.type === 'danger')) {
    verdict = 'Critical Flaws Detected';
  } else if (critiques.some(c => c.type === 'warning')) {
    verdict = 'Risky Architecture';
  }

  return {
    scalabilityScore: Math.min(100, Math.max(10, scalabilityScore)),
    reliabilityScore: Math.min(100, Math.max(10, reliabilityScore)),
    securityScore: Math.min(100, Math.max(10, securityScore)),
    estimatedLatencyMs: Math.round(latency),
    estimatedMonthlyCostUSD,
    verdict,
    critiques
  };
}
