export type UserRole = 'operator' | 'admin' | 'viewer';

export type StatusType =
  | 'normal'
  | 'warning'
  | 'critical'
  | 'inactive'
  | 'draft'
  | 'deployed';

export type NavItem = {
  label: string;
  href: string;
  roles: UserRole[];
};

export type ScenarioId =
  | 'pump-start-failure'
  | 'emergency-stop'
  | 'tank-high-level'
  | 'conveyor-interlock';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export type EvidenceSignal = {
  signalId: string;
  address: string;
  label: string;
  currentValue: string | number | boolean;
  quality?: 'good' | 'stale' | 'invalid';
  updatedAt: string;
};

export type ScenarioSummary = {
  id: ScenarioId;
  title: string;
  description: string;
};

export type FlowNode = {
  id: string;
  title: string;
  description: string;
  status?: 'normal' | 'warning' | 'critical';
};

export type FlowchartData = {
  title: string;
  nodes: FlowNode[];
  activeNodeId?: string;
};

export type ChatAnswer = {
  summary: string;
  probableCauses: string[];
  recommendedActions: string[];
  confidence: number;
};

export type ScenarioRecord = {
  id: ScenarioId;
  title: string;
  category: string;
  description: string;
  suggestedQuestions: string[];
  answer: ChatAnswer;
  signals: EvidenceSignal[];
  flowchart: FlowchartData;
};

export type KnowledgeBaseItem = {
  id: string;
  title: string;
  scenario: string;
  category: string;
  summary: string;
  status: 'draft' | 'review' | 'deployed' | 'archived';
  updatedAt: string;
  updatedBy: string;
};

export type LogicRule = {
  id: string;
  name: string;
  category: string;
  scenarioId: string;
  conditionSummary: string;
  outputSignals: string[];
  description?: string;
  status: 'draft' | 'review' | 'deployed' | 'archived';
  version: number;
  updatedAt: string;
  updatedBy: string;
};

export type SignalMapping = {
  id: string;
  address: string;
  name: string;
  label: string;
  type: 'DI' | 'DO' | 'AI' | 'AO' | 'MEM';
  equipment: string;
  description?: string;
  unit?: string;
  invertLogic?: boolean;
  active: boolean;
};
