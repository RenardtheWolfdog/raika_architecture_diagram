export type NodeCategory =
  | 'frontend'
  | 'backend'
  | 'service'
  | 'data'
  | 'external'
  | 'infrastructure';

export interface Cluster {
  id: string;
  title: string;
  description?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Node {
  id: string;
  title: string;
  subtitle?: string;
  category: NodeCategory;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
  stroke?: string;
  labelOffset?: { x?: number; y?: number };
}

export const CATEGORIES: Record<NodeCategory, { label: string; color: string }> = {
  frontend: { label: '클라이언트', color: '#6C8BFF' },
  backend: { label: '백엔드 API', color: '#8E6CFF' },
  service: { label: 'AI 서비스', color: '#4BD6C4' },
  data: { label: '데이터 계층', color: '#FFB95E' },
  external: { label: '외부 연동', color: '#FF7B88' },
  infrastructure: { label: '인프라스트럭처', color: '#A1ADF9' },
};

export const CLUSTERS: Cluster[] = [
  {
    id: 'client-layer',
    title: 'Client Layer',
    description: 'React UI · socket.io-client · Live2D',
    x: 50,
    y: 100,
    width: 280,
    height: 500,
  },
  {
    id: 'api-layer',
    title: 'API & Orchestration',
    description: 'FastAPI 게이트웨이 & 멀티프로세스 런처',
    x: 420,
    y: 80,
    width: 300,
    height: 1000,
  },
  {
    id: 'ai-layer',
    title: 'AI / RAG Services',
    description: 'LangChain · LangGraph · LLM toolchain',
    x: 820,
    y: 160,
    width: 750,
    height: 1000,
  },
  {
    id: 'data-layer',
    title: 'Data & Integrations',
    description: '스토리지 · 외부 API · 보조 모델',
    x: 1670,
    y: 160,
    width: 350,
    height: 1000,
  },
];

export const NODES: Node[] = [
  {
    id: 'client-ui',
    title: 'React Client',
    subtitle: 'TypeScript · Chat · 파일 업로드',
    category: 'frontend',
    x: 190,
    y: 280,
    width: 220,
    height: 100,
  },
  {
    id: 'live2d',
    title: 'Live2D Viewer',
    subtitle: 'pixi.js · 실시간 립싱크',
    category: 'frontend',
    x: 190,
    y: 470,
    width: 220,
    height: 100,
  },
  {
    id: 'orchestrator',
    title: 'run_servers_FastAPI.py',
    subtitle: '멀티프로세스 런처',
    category: 'infrastructure',
    x: 570,
    y: 230,
    width: 240,
    height: 92,
  },
  {
    id: 'main-api',
    title: 'Main API',
    subtitle: 'Raika_Gemma_FastAPI.py · Socket.IO · REST',
    category: 'backend',
    x: 570,
    y: 440,
    width: 240,
    height: 110,
  },
  {
    id: 'mongo-api',
    title: 'MongoDB API',
    subtitle: 'Raika_MongoDB_FastAPI.py',
    category: 'backend',
    x: 570,
    y: 670,
    width: 240,
    height: 92,
  },
  {
    id: 'tts-server',
    title: 'TTS Server',
    subtitle: 'Raika_TTS_Server.py · WebSocket 스트림',
    category: 'backend',
    x: 570,
    y: 900,
    width: 240,
    height: 92,
  },
  {
    id: 'deepseek-ocr',
    title: 'DeepSeek OCR Service',
    subtitle: 'deepseek_ocr_server.py · pdf_pipeline',
    category: 'service',
    x: 1020,
    y: 1000,
    width: 300,
    height: 110,
  },
  {
    id: 'rag-orchestrator',
    title: 'LangChain / LangGraph Agents',
    subtitle: '의도 분류 · 도구 실행',
    category: 'service',
    x: 1020,
    y: 340,
    width: 300,
    height: 110,
  },
  {
    id: 'llm-engine',
    title: 'Gemma-3 12B + LoRA',
    subtitle: '4-bit 로딩 · Lazy init',
    category: 'service',
    x: 1020,
    y: 570,
    width: 300,
    height: 110,
  },
  {
    id: 'context-memory',
    title: 'Context & ShortTermMemory',
    subtitle: '페르소나 인젝션 · 요약',
    category: 'service',
    x: 1020,
    y: 800,
    width: 300,
    height: 110,
  },
  {
    id: 'doc-pipeline',
    title: 'Document Analyzer',
    subtitle: 'DeepSeek OCR 텍스트 · LangGraph QA',
    category: 'service',
    x: 1420,
    y: 380,
    width: 260,
    height: 100,
  },
  {
    id: 'google-agent',
    title: 'Google Search Agent',
    subtitle: 'GoogleSearch_Gemma.py',
    category: 'service',
    x: 1420,
    y: 590,
    width: 260,
    height: 100,
  },
  {
    id: 'weather-time',
    title: 'MCP Utilities',
    subtitle: 'weather_mcp.py · time_mcp.py',
    category: 'service',
    x: 1420,
    y: 800,
    width: 260,
    height: 100,
  },
  {
    id: 'openrouter',
    title: 'OpenRouter / GPT-OSS-20B',
    subtitle: '특화 작업용 외부 LLM',
    category: 'external',
    x: 1850,
    y: 310,
    width: 240,
    height: 92,
  },
  {
    id: 'google-api',
    title: 'Google Custom Search',
    subtitle: '실시간 웹 검색',
    category: 'external',
    x: 1850,
    y: 490,
    width: 240,
    height: 92,
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    subtitle: '대화 세션 · 로그',
    category: 'data',
    x: 1850,
    y: 670,
    width: 240,
    height: 92,
  },
  {
    id: 'redis',
    title: 'Redis',
    subtitle: '세션 캐시 · 연속 응답',
    category: 'data',
    x: 1850,
    y: 850,
    width: 240,
    height: 92,
  },
  {
    id: 's3',
    title: 'AWS S3',
    subtitle: '업로드 파일 · 미디어',
    category: 'data',
    x: 1850,
    y: 1030,
    width: 240,
    height: 92,
  },
];

export const EDGES: Edge[] = [
  {
    id: 'client-main-api',
    source: 'client-ui',
    target: 'main-api',
    label: 'Socket.IO 양방향 · axios 업로드',
    stroke: 'rgba(108, 139, 255, 0.85)',
  },
  {
    id: 'main-api-client-stream',
    source: 'main-api',
    target: 'client-ui',
    label: '스트리밍 응답 · 상태 브로드캐스트',
    stroke: 'rgba(108, 139, 255, 0.65)',
  },
  {
    id: 'tts-to-live2d',
    source: 'tts-server',
    target: 'live2d',
    label: 'TTS 오디오 + 립싱크 에너지',
    stroke: 'rgba(255, 185, 94, 0.85)',
  },
  {
    id: 'orchestrator-main-api',
    source: 'orchestrator',
    target: 'main-api',
    label: '프로세스 스폰',
    stroke: 'rgba(161, 173, 249, 0.7)',
  },
  {
    id: 'orchestrator-mongo',
    source: 'orchestrator',
    target: 'mongo-api',
    label: '프로세스 스폰',
    stroke: 'rgba(161, 173, 249, 0.5)',
  },
  {
    id: 'orchestrator-tts',
    source: 'orchestrator',
    target: 'tts-server',
    label: '프로세스 스폰',
    stroke: 'rgba(161, 173, 249, 0.5)',
  },
  {
    id: 'main-api-rag',
    source: 'main-api',
    target: 'rag-orchestrator',
    label: '의도 분류 · 도구 호출',
    stroke: 'rgba(75, 214, 196, 0.8)',
  },
  {
    id: 'rag-llm',
    source: 'rag-orchestrator',
    target: 'llm-engine',
    label: '프롬프트 · 스트리밍 토큰',
    stroke: 'rgba(75, 214, 196, 0.8)',
  },
  {
    id: 'main-api-deepseek-ocr',
    source: 'main-api',
    target: 'deepseek-ocr',
    label: 'PDF 업로드 · deepseek_ocr_client',
    stroke: 'rgba(75, 214, 196, 0.9)',
  },
  {
    id: 'deepseek-ocr-doc',
    source: 'deepseek-ocr',
    target: 'doc-pipeline',
    label: '정제 OCR 텍스트 공급',
    stroke: 'rgba(75, 214, 196, 0.75)',
  },
  {
    id: 'deepseek-ocr-redis',
    source: 'deepseek-ocr',
    target: 'redis',
    label: 'OCR 결과 캐싱',
    stroke: 'rgba(255, 185, 94, 0.65)',
  },
  {
    id: 'llm-context',
    source: 'llm-engine',
    target: 'context-memory',
    label: '컨텍스트 관리',
    stroke: 'rgba(75, 214, 196, 0.6)',
    labelOffset: { y: -15 },
  },
  {
    id: 'context-llm-feedback',
    source: 'context-memory',
    target: 'llm-engine',
    label: '요약 · 페르소나 주입',
    stroke: 'rgba(75, 214, 196, 0.6)',
    labelOffset: { y: 15 },
  },
  {
    id: 'rag-doc',
    source: 'rag-orchestrator',
    target: 'doc-pipeline',
    label: '업로드 문서 RAG',
    stroke: 'rgba(75, 214, 196, 0.75)',
  },
  {
    id: 'rag-google',
    source: 'rag-orchestrator',
    target: 'google-agent',
    label: '실시간 검색',
    stroke: 'rgba(75, 214, 196, 0.75)',
  },
  {
    id: 'rag-mcp',
    source: 'rag-orchestrator',
    target: 'weather-time',
    label: 'MCP 툴 호출',
    stroke: 'rgba(75, 214, 196, 0.75)',
  },
  {
    id: 'mongo-service-db',
    source: 'mongo-api',
    target: 'mongodb',
    label: 'async motor CRUD',
    stroke: 'rgba(255, 185, 94, 0.7)',
  },
  {
    id: 'main-api-redis',
    source: 'main-api',
    target: 'redis',
    label: '세션 캐싱 · continue',
    stroke: 'rgba(255, 185, 94, 0.7)',
  },
  {
    id: 'main-api-s3',
    source: 'main-api',
    target: 's3',
    label: '파일 저장 · 메타데이터',
    stroke: 'rgba(255, 185, 94, 0.7)',
  },
  {
    id: 'doc-s3',
    source: 'doc-pipeline',
    target: 's3',
    label: '문서 임베딩 로딩',
    stroke: 'rgba(255, 185, 94, 0.55)',
  },
  {
    id: 'rag-openrouter',
    source: 'rag-orchestrator',
    target: 'openrouter',
    label: '특화 LLM 위임',
    stroke: 'rgba(255, 123, 136, 0.8)',
  },
  {
    id: 'google-agent-api',
    source: 'google-agent',
    target: 'google-api',
    label: 'Google CSE 호출',
    stroke: 'rgba(255, 123, 136, 0.75)',
  },
];


