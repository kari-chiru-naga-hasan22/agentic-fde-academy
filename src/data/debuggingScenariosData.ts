import { DebuggingIncident } from '../types';

export const DEBUGGING_INCIDENTS: DebuggingIncident[] = [
  {
    id: 'inc-latency-spike',
    title: 'AI Assistant P99 Latency Spiking to 18.4 Seconds',
    severity: 'P1 - Critical',
    description: 'During 11:00 AM peak traffic, enterprise users report chat queries hanging for 15-20 seconds before failing with HTTP 504 Gateway Timeout. System CPU is only at 18%, but memory and active socket counts are continuously climbing.',
    symptoms: [
      'P99 response time increased from 420ms to 18,400ms.',
      'Uvicorn access logs show HTTP 504 Gateway Timeouts from AWS ALB.',
      'API worker CPU utilization is exceptionally low (16-18%).',
      'FastAPI /healthz endpoints fail to respond within ALB 3-second threshold.'
    ],
    logs: [
      '2026-10-02 11:04:12 [WARNING] [uvicorn.error] ASGI event loop stalled: slow callback took 14.821s',
      '2026-10-02 11:04:13 [INFO] [httpx] HTTP Request: POST https://api.openai.com/v1/chat/completions "HTTP/1.1 200 OK"',
      '2026-10-02 11:04:14 [ERROR] [alb.ingress] Target.ResponseTime > 15.000s, returning HTTP 504 to client 192.168.1.42',
      '2026-10-02 11:04:15 [DEBUG] [app.middleware] correlation_id=trace-8891 awaiting response.body() buffer...',
      '2026-10-02 11:04:16 [WARNING] [pg_pool] Acquired connection held for 17.92s without query execution'
    ],
    metrics: [
      { name: 'Active HTTP Sockets', value: '4,892 (Limit 5,000)', status: 'alert' },
      { name: 'Event Loop Lag', value: '14,800 ms', status: 'alert' },
      { name: 'Host CPU Utilization', value: '17.8%', status: 'normal' },
      { name: 'PostgreSQL Active Connections', value: '48 / 100', status: 'normal' }
    ],
    traceSpans: [
      {
        id: 'span-root',
        name: 'POST /v1/chat/completions',
        service: 'api-gateway',
        durationMs: 18400,
        startTimeMs: 0,
        status: 'error',
        metadata: { client_ip: '10.0.4.12', status_code: 504 }
      },
      {
        id: 'span-middleware',
        name: 'AuditLoggingMiddleware.dispatch',
        service: 'api-gateway',
        durationMs: 14850,
        startTimeMs: 12,
        status: 'error',
        metadata: { issue: 'Synchronous blocking disk write during request body read' }
      },
      {
        id: 'span-llm',
        name: 'OpenAI.chat.completions.create',
        service: 'external-llm',
        durationMs: 420,
        startTimeMs: 14870,
        status: 'ok',
        metadata: { model: 'gpt-4o', prompt_tokens: 380, completion_tokens: 65 }
      }
    ],
    options: [
      {
        id: 'h1',
        hypothesis: 'OpenAI API rate limits are throttling requests and forcing exponential backoff sleeps.',
        isCorrect: false,
        explanation: 'Incorrect. Notice the trace waterfall shows the OpenAI call took only 420ms with HTTP 200 OK. The delay happened before the LLM was even reached.'
      },
      {
        id: 'h2',
        hypothesis: 'Synchronous blocking I/O inside custom ASGI middleware is starving the single-threaded AsyncIO event loop.',
        isCorrect: true,
        explanation: 'Correct! The log shows "ASGI event loop stalled: slow callback took 14.821s". The AuditLoggingMiddleware was executing synchronous file writes or unawaited requests. In single-threaded AsyncIO, blocking the event loop stops all concurrent request processing, causing connection backlogs and ALB 504 timeouts despite low CPU.',
        remediationCode: `# Fix: Use asyncio.to_thread for any disk or legacy sync I/O in ASGI middleware
import asyncio
from starlette.middleware.base import BaseHTTPMiddleware

class AsyncAuditMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        body = await request.body()
        # Offload blocking audit log serialization to worker thread pool
        await asyncio.to_thread(self.sync_write_audit_log, body)
        return await call_next(request)`
      },
      {
        id: 'h3',
        hypothesis: 'PostgreSQL database deadlock is blocking query execution in shared buffer pools.',
        isCorrect: false,
        explanation: 'Incorrect. The metric shows only 48/100 DB connections active and no lock wait warnings in PostgreSQL.'
      }
    ]
  },
  {
    id: 'inc-hallucination-drift',
    title: 'RAG Pipeline Hallucinating Outdated HR Benefit Policies',
    severity: 'P2 - High',
    description: 'Employees report that the internal HR AI assistant states the parental leave policy is "6 weeks unpaid", whereas the official company handbook was updated last month to "16 weeks fully paid".',
    symptoms: [
      'Model outputs outdated 2023 policy despite 2026 handbook being in the vector store.',
      'Reranker assigns high score to retrieved chunks.',
      'Vector similarity search returns 8 chunks from older policy revisions.'
    ],
    logs: [
      '2026-10-02 14:22:01 [INFO] [rag_retriever] Query: "What is our parental leave policy?"',
      '2026-10-02 14:22:02 [DEBUG] [qdrant] Retrieved 8 chunks. Top similarity: 0.941 for doc_id=hr_handbook_2023_v1.pdf',
      '2026-10-02 14:22:02 [DEBUG] [qdrant] Chunk 7 similarity: 0.938 for doc_id=hr_handbook_2026_final.pdf',
      '2026-10-02 14:22:03 [WARNING] [reranker] Cross-encoder selected chunk 1 (2023 version) due to exact keyword density'
    ],
    metrics: [
      { name: 'Document Chunks in Vector DB', value: '45,210', status: 'normal' },
      { name: 'Stale/Superseded Chunks', value: '18,400', status: 'alert' },
      { name: 'Retrieval Relevance Score', value: '0.94', status: 'normal' }
    ],
    traceSpans: [
      {
        id: 'span-retrieval',
        name: 'vector_search_and_rerank',
        service: 'rag-engine',
        durationMs: 85,
        startTimeMs: 0,
        status: 'warning',
        metadata: { top_chunk_date: '2023-01-15', superseded: true }
      }
    ],
    options: [
      {
        id: 'h1',
        hypothesis: 'The embedding model (text-embedding-3-small) is too small to understand the word "paid".',
        isCorrect: false,
        explanation: 'Incorrect. Embeddings understand semantic nuance well, but both the 2023 and 2026 documents share nearly identical semantic phrasing about "parental leave".'
      },
      {
        id: 'h2',
        hypothesis: 'Lack of Document Version Invalidation and Metadata Filtering; outdated revisions were never purged or tagged as deprecated.',
        isCorrect: true,
        explanation: 'Correct! The vector store holds both hr_handbook_2023_v1 and hr_handbook_2026_final. Because both talk about parental leave, the older document had slightly higher keyword overlap and was fed to the LLM. Production RAG requires either: 1) Hard invalidation of superseded documents on update, or 2) Strict metadata filtering (WHERE is_active = true AND effective_year = 2026).',
        remediationCode: `-- Fix: Add versioning and active flag in pgvector / Qdrant metadata
SELECT content FROM document_embeddings 
WHERE tenant_id = 'org_internal' 
  AND metadata->>'status' = 'CURRENT_APPROVED'
  AND (metadata->>'effective_date')::date <= NOW()
ORDER BY embedding <=> query_vector ASC 
LIMIT 5;`
      },
      {
        id: 'h3',
        hypothesis: 'The LLM temperature was set to 0.7 instead of 0.0.',
        isCorrect: false,
        explanation: 'Incorrect. Changing temperature does not fix the fact that the retrieved context provided to the LLM contained the outdated 2023 document.'
      }
    ]
  }
];
