export type LearningMode = 
  | 'overview' 
  | 'visualize' 
  | 'code' 
  | 'playground' 
  | 'system-design' 
  | 'fde-sim' 
  | 'debugging' 
  | 'sprint' 
  | 'readiness' 
  | 'knowledge-graph' 
  | 'blank-repo';

export interface LineExplanation {
  line: number;
  whatItDoes: string;
  whyItExists: string;
  dataEntering: string;
  dataLeaving: string;
  potentialFailures: string;
  architectureLink: string;
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  explanations: LineExplanation[];
}

export interface TopicItem {
  id: string;
  level: number;
  title: string;
  category: 'Fundamentals' | 'Backend' | 'Databases' | 'LLM & Embeddings' | 'RAG' | 'Agents' | 'Distributed Systems' | 'Observability & Security' | 'System Design' | 'FDE';
  timeComplexity?: string;
  spaceComplexity?: string;
  latencyExpectation?: string;
  worksOn: string;
  badge: string;
  summary: string;
  keyIdea: string;
  takeaways: string[];
  intuitionAnalogy: string;
  productionLayer: {
    scaling: string;
    security: string;
    latency: string;
    cost: string;
    failureModes: string[];
    tradeoffs: string;
  };
  whyQuestions: { question: string; answer: string }[];
  whatIfScenarios: { scenario: string; impact: string; remediation: string }[];
  codeSnippets: {
    production: CodeSnippet;
    fromScratch?: CodeSnippet;
    withFramework?: CodeSnippet;
  };
  realWorldApps: {
    title: string;
    description: string;
    icon: string;
    systemImpact: string;
  }[];
  relatedTopics: string[];
  simulatorType: 'rag' | 'agent' | 'memory' | 'multi-agent' | 'mcp' | 'system-design' | 'distributed' | 'http' | 'postgres' | 'embeddings' | 'chunking' | 'security' | 'observability' | 'cost' | 'fde' | 'debugging' | 'none';
}

export interface SprintWeek {
  week: number;
  title: string;
  subtitle: string;
  primaryLearn: string[];
  weeklyBuild: {
    name: string;
    description: string;
    techStack: string[];
    deliverable: string;
    githubRepoSuggestion: string;
  };
  dsaMilestone: string;
  systemDesignTopic: string;
  interviewPrep: string;
  applicationTimelineAction: string;
  status: 'locked' | 'active' | 'completed';
}

export interface ReadinessItem {
  id: string;
  category: 'Backend' | 'AI & LLM' | 'RAG' | 'Agents' | 'System Design' | 'Git & DevOps' | 'Interview & FDE';
  title: string;
  description: string;
  verificationChallenge: string;
  completed: boolean;
  requiredForInternship: boolean;
}

export interface SystemComponent {
  id: string;
  name: string;
  category: 'ingress' | 'compute' | 'storage' | 'ai' | 'messaging' | 'observability';
  icon: string;
  description: string;
  baseLatencyMs: number;
  costPerMillion: number;
  failureRisk: string;
  whyUse: string;
}

export interface TraceSpan {
  id: string;
  name: string;
  service: string;
  durationMs: number;
  startTimeMs: number;
  status: 'ok' | 'warning' | 'error';
  tokens?: { prompt: number; completion: number; total: number };
  cost?: number;
  metadata: Record<string, any>;
  children?: TraceSpan[];
}

export interface FDEPersona {
  id: string;
  name: string;
  title: string;
  company: string;
  type: 'Skeptical VP' | 'HealthTech CTO' | 'E-commerce VP of Ops' | 'Security Auditor';
  avatar: string;
  personality: string;
  hiddenConstraints: {
    id: string;
    topic: string;
    revealed: boolean;
    clue: string;
    description: string;
  }[];
  dialogueHistory: { speaker: 'customer' | 'fde'; message: string; timestamp: string }[];
  discoveryScore: number;
  architectureVerdict?: string;
}

export interface DebuggingIncident {
  id: string;
  title: string;
  severity: 'P1 - Critical' | 'P2 - High' | 'P3 - Medium';
  description: string;
  symptoms: string[];
  logs: string[];
  metrics: { name: string; value: string; status: 'normal' | 'alert' }[];
  traceSpans: TraceSpan[];
  options: {
    id: string;
    hypothesis: string;
    isCorrect: boolean;
    explanation: string;
    remediationCode?: string;
  }[];
}
