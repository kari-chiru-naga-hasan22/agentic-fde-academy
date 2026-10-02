import { FDEPersona } from '../types';

export const FDE_PERSONAS: FDEPersona[] = [
  {
    id: 'fde-banking-vp',
    name: 'Marcus Vance',
    title: 'VP of Core Engineering & Security',
    company: 'Apex Global Financial (Tier-1 Investment Bank)',
    type: 'Skeptical VP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    personality: 'Highly skeptical of AI hype. Deeply protective of bank regulatory standing (FINRA/SEC). Demands concrete latency numbers, strict data residency, and zero hallucinations on client portfolio values.',
    discoveryScore: 0,
    hiddenConstraints: [
      {
        id: 'c1',
        topic: 'Data Residency & Air-Gapped Network',
        revealed: false,
        clue: 'Ask about where customer data is legally allowed to travel.',
        description: 'Customer financial data cannot leave their private AWS VPC. No multi-tenant cloud APIs (OpenAI/Anthropic SaaS) are permitted by bank InfoSec.'
      },
      {
        id: 'c2',
        topic: 'Sub-400ms SLA for Trader Lookups',
        revealed: false,
        clue: 'Ask what latency is required by the end-users during market trading hours.',
        description: 'Bond traders need answers in under 400ms. A 5-second agent loop will be rejected instantly by trading desks.'
      },
      {
        id: 'c3',
        topic: 'Deterministic Citations & Audit Trail',
        revealed: false,
        clue: 'Ask how compliance regulators audit trading decisions and recommendations.',
        description: 'Every answer must cite the exact paragraph, timestamp, and document hash. If an answer cannot be verified with 100% precision, the bank faces seven-figure regulatory fines.'
      },
      {
        id: 'c4',
        topic: 'Role-Based Access Control (RBAC) at Retrieval Time',
        revealed: false,
        clue: 'Ask who has permission to view which documents.',
        description: 'Traders in Division A must never retrieve research documents from Division B due to insider-trading firewalls (Chinese Wall regulations).'
      }
    ],
    dialogueHistory: [
      {
        speaker: 'customer',
        message: "Look, our executive committee wants 'AI everywhere', but my neck is on the line if this thing hallucinates a stock price or leaks client portfolio data to a third-party server. Why shouldn't I just build an Elasticsearch index and call it a day?",
        timestamp: '10:00 AM'
      }
    ]
  },
  {
    id: 'fde-healthtech-cto',
    name: 'Dr. Elena Rostova',
    title: 'Chief Technology Officer',
    company: 'Vitalis Health Systems (Clinical AI Platform)',
    type: 'HealthTech CTO',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    personality: 'Pragmatic, technically brilliant, laser-focused on clinical safety and HIPAA compliance. Wants multimodal processing for clinical charts + DICOM imaging.',
    discoveryScore: 0,
    hiddenConstraints: [
      {
        id: 'h1',
        topic: 'HIPAA & BAA Execution',
        revealed: false,
        clue: 'Ask about regulatory compliance frameworks and patient data handling.',
        description: 'Requires signed Business Associate Agreements (BAA) with all cloud vendors. Zero data retention policies for inference.'
      },
      {
        id: 'h2',
        topic: 'Multi-Modal Context (DICOM + Clinical Notes)',
        revealed: false,
        clue: 'Ask what formats patient records arrive in.',
        description: 'Patient charts include scanned handwritten clinician notes and 100MB DICOM MRI scans. Text-only RAG will miss 40% of critical diagnostic facts.'
      },
      {
        id: 'h3',
        topic: 'Zero-Tolerance for False Negatives on Drug Allergies',
        revealed: false,
        clue: 'Ask what is the single worst failure mode for this application.',
        description: 'Missing a penicillin allergy before recommending an antibiotic causes anaphylactic shock. Retrieval recall on contraindications must be 100%.'
      }
    ],
    dialogueHistory: [
      {
        speaker: 'customer',
        message: "Our ER physicians are drowning in EHR paperwork. We need an assistant that digests clinical notes and flags drug interactions instantly. But if it hallucinates an allergy dosage, a patient could die. How does your architecture guarantee clinical reliability?",
        timestamp: '11:15 AM'
      }
    ]
  },
  {
    id: 'fde-ecommerce-vp',
    name: 'Tariq Al-Mansoor',
    title: 'VP of Global Operations',
    company: 'OmniCart Logistics (10M Active SKUs)',
    type: 'E-commerce VP of Ops',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    personality: 'Numbers-driven, impatient with technical jargon, focused on return logistics cost and customer churn. Wants autonomous return processing with tool execution.',
    discoveryScore: 0,
    hiddenConstraints: [
      {
        id: 'e1',
        topic: 'Real-Time Inventory Consistency (10M SKUs)',
        revealed: false,
        clue: 'Ask about the scale and update frequency of product catalog and warehouse stock.',
        description: 'Inventory levels change 5,000 times per second across 24 global fulfillment centers. A vector database with stale hourly embeddings will recommend out-of-stock items.'
      },
      {
        id: 'e2',
        topic: 'Idempotent Refund Tool Execution',
        revealed: false,
        clue: 'Ask how automated return agents interact with financial refund APIs.',
        description: 'If a network retry occurs during return processing, the Stripe refund webhook must never double-refund a customer.'
      },
      {
        id: 'e3',
        topic: 'Fraud Prevention & Return Abuse Detection',
        revealed: false,
        clue: 'Ask about policy exceptions and edge cases in returns.',
        description: 'Wardrobing fraud (buying luxury items, wearing once, returning) costs them $12M annually. The agent must cross-reference serial numbers and user return velocity.'
      }
    ],
    dialogueHistory: [
      {
        speaker: 'customer',
        message: "Every holiday season our support ticket backlog explodes by 400%. 60% of tickets are simple returns and tracking inquiries. We want an AI agent to handle returns automatically, but I can't have it issuing refunds to fraudulent buyers. How do you design tool safety here?",
        timestamp: '02:30 PM'
      }
    ]
  }
];
