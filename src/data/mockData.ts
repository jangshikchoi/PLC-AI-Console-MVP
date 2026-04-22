import {
  KnowledgeBaseItem,
  LogicRule,
  NavItem,
  ScenarioId,
  ScenarioRecord,
  SignalMapping,
  UserRole,
} from '@/types/domain';

export const navItems: NavItem[] = [
  { label: '대시보드', href: '/dashboard', roles: ['operator', 'admin', 'viewer'] },
  { label: '질의응답', href: '/chat', roles: ['operator', 'admin', 'viewer'] },
  { label: '지식 베이스', href: '/admin/knowledge-base', roles: ['admin', 'viewer'] },
  { label: '룰 편집', href: '/admin/rules', roles: ['admin'] },
  { label: 'I/O 매핑', href: '/admin/io-mapping', roles: ['admin'] },
];

export const userRole: UserRole = 'admin';

export const scenarios: Record<ScenarioId, ScenarioRecord> = {
  'pump-start-failure': {
    id: 'pump-start-failure',
    title: '펌프 기동 실패',
    category: 'Alarm',
    description: '운전 명령이 내려갔지만 인터록 미충족으로 모터 출력이 차단된 상황입니다.',
    suggestedQuestions: [
      '펌프가 작동하지 않는 원인이 무엇인가요?',
      '펌프 기동 인터록 흐름을 보여줘',
      '관련 I/O 상태를 요약해줘',
    ],
    answer: {
      summary:
        '가장 가능성 높은 원인은 Pump_Enable 메모리 비트가 OFF 상태여서 Motor_Run_Command가 차단된 것입니다.',
      probableCauses: ['운전 허가 비트 OFF', '비상정지 회로 활성화 가능성', '보호 계전기 트립 잔류'],
      recommendedActions: ['운전 허가 비트 점검', 'E-Stop 복귀 상태 확인', '보호 계전기 리셋 상태 확인'],
      confidence: 0.91,
    },
    signals: [
      {
        signalId: 'sig-1',
        address: 'M100',
        label: 'Pump_Enable',
        currentValue: false,
        quality: 'good',
        updatedAt: '2026-04-22 09:12',
      },
      {
        signalId: 'sig-2',
        address: 'X0.1',
        label: 'E_Stop',
        currentValue: false,
        quality: 'good',
        updatedAt: '2026-04-22 09:12',
      },
      {
        signalId: 'sig-3',
        address: 'Y1.0',
        label: 'Motor_Run_Command',
        currentValue: false,
        quality: 'good',
        updatedAt: '2026-04-22 09:12',
      },
    ],
    flowchart: {
      title: '펌프 기동 인터록 플로우',
      activeNodeId: 'n2',
      nodes: [
        { id: 'n1', title: 'Start', description: '운전 명령 수신', status: 'normal' },
        { id: 'n2', title: 'Pump Enable 확인', description: 'M100 = OFF', status: 'critical' },
        { id: 'n3', title: 'E-Stop 확인', description: '정상 상태', status: 'normal' },
        { id: 'n4', title: 'Protection Relay 확인', description: '이상 없음', status: 'normal' },
        { id: 'n5', title: 'Motor Run 허가', description: '차단됨', status: 'warning' },
      ],
    },
  },
  'emergency-stop': {
    id: 'emergency-stop',
    title: '비상 정지 회로 동작',
    category: 'Emergency',
    description: 'E-Stop 회로가 감지되어 주요 출력이 즉시 차단된 상황입니다.',
    suggestedQuestions: ['비상 정지가 걸린 이유가 뭐야?', '복구 절차를 알려줘', '순서도를 보여줘'],
    answer: {
      summary: 'E_Stop 입력이 ON으로 전환되어 전체 설비 출력 차단 루틴이 동작했습니다.',
      probableCauses: ['현장 비상정지 버튼 작동', '안전 릴레이 루프 단선', '유지보수 강제 정지 상태'],
      recommendedActions: ['비상정지 버튼 물리 상태 확인', '안전 릴레이 루프 복구', 'Reset 승인 후 재기동'],
      confidence: 0.96,
    },
    signals: [
      {
        signalId: 'sig-4',
        address: 'X0.1',
        label: 'E_Stop',
        currentValue: true,
        quality: 'good',
        updatedAt: '2026-04-22 10:03',
      },
      {
        signalId: 'sig-5',
        address: 'Y2.1',
        label: 'Main_Output_Enable',
        currentValue: false,
        quality: 'good',
        updatedAt: '2026-04-22 10:03',
      },
    ],
    flowchart: {
      title: '비상 정지 복구 플로우',
      activeNodeId: 'e2',
      nodes: [
        { id: 'e1', title: 'E-Stop 감지', description: 'X0.1 = ON', status: 'critical' },
        { id: 'e2', title: '출력 즉시 차단', description: '메인 출력 비활성화', status: 'critical' },
        { id: 'e3', title: '현장 확인', description: '버튼 및 안전회로 확인', status: 'warning' },
        { id: 'e4', title: 'Reset 승인', description: '관리자 확인 필요', status: 'warning' },
        { id: 'e5', title: '재기동', description: '정상 운전 복귀', status: 'normal' },
      ],
    },
  },
  'tank-high-level': {
    id: 'tank-high-level',
    title: '탱크 고수위 알람',
    category: 'Process Alarm',
    description: '탱크 레벨이 상한치를 초과해 유입 밸브 차단이 필요한 상황입니다.',
    suggestedQuestions: ['탱크 고수위 알람 원인을 설명해줘', '현재 레벨 관련 신호를 보여줘'],
    answer: {
      summary: '레벨 센서 값이 92%까지 상승하여 HH 알람이 발생했고 유입 밸브 차단이 필요합니다.',
      probableCauses: ['배출 밸브 닫힘', '레벨 센서 보정 오차', '상위 공정 유입 과다'],
      recommendedActions: ['유출 경로 확인', '레벨 트랜스미터 캘리브레이션 점검', '상위 유입량 일시 제한'],
      confidence: 0.87,
    },
    signals: [
      {
        signalId: 'sig-6',
        address: 'AI0',
        label: 'Tank_Level',
        currentValue: '92%',
        quality: 'good',
        updatedAt: '2026-04-22 08:45',
      },
      {
        signalId: 'sig-7',
        address: 'Y4.2',
        label: 'Inlet_Valve_Close',
        currentValue: true,
        quality: 'good',
        updatedAt: '2026-04-22 08:45',
      },
    ],
    flowchart: {
      title: '탱크 고수위 대응 플로우',
      activeNodeId: 't2',
      nodes: [
        { id: 't1', title: '레벨 측정', description: 'AI0 실시간 수집', status: 'normal' },
        { id: 't2', title: 'HH 임계 비교', description: '90% 초과', status: 'critical' },
        { id: 't3', title: '유입 밸브 차단', description: 'Y4.2 = ON', status: 'warning' },
        { id: 't4', title: '운영자 확인', description: '배출 경로 점검', status: 'warning' },
      ],
    },
  },
  'conveyor-interlock': {
    id: 'conveyor-interlock',
    title: '컨베이어 인터록 미충족',
    category: 'Interlock',
    description: '전단 설비 준비 신호 부재로 컨베이어 구동이 차단된 상황입니다.',
    suggestedQuestions: ['컨베이어가 왜 시작되지 않지?', '전단 설비 준비 상태를 보여줘'],
    answer: {
      summary: 'Upstream_Ready 신호가 OFF이므로 컨베이어 시작 조건이 충족되지 않았습니다.',
      probableCauses: ['전단 설비 정지', '센서 미감지', '자동/수동 모드 불일치'],
      recommendedActions: ['전단 설비 운전 상태 확인', '제품 감지 센서 점검', '모드 스위치 상태 확인'],
      confidence: 0.89,
    },
    signals: [
      {
        signalId: 'sig-8',
        address: 'X2.3',
        label: 'Upstream_Ready',
        currentValue: false,
        quality: 'good',
        updatedAt: '2026-04-22 11:20',
      },
      {
        signalId: 'sig-9',
        address: 'Y6.0',
        label: 'Conveyor_Run_Command',
        currentValue: false,
        quality: 'good',
        updatedAt: '2026-04-22 11:20',
      },
    ],
    flowchart: {
      title: '컨베이어 시작 인터록 플로우',
      activeNodeId: 'c2',
      nodes: [
        { id: 'c1', title: 'Start 요청', description: '운전 버튼 입력', status: 'normal' },
        { id: 'c2', title: 'Upstream Ready 확인', description: 'OFF 상태', status: 'critical' },
        { id: 'c3', title: '센서 제품 감지', description: '미감지', status: 'warning' },
        { id: 'c4', title: 'Run 허가', description: '차단됨', status: 'warning' },
      ],
    },
  },
};

export const scenarioList = Object.values(scenarios).map((scenario) => ({
  id: scenario.id,
  title: scenario.title,
  description: scenario.description,
}));

export const dashboardMetrics = [
  { title: '활성 알람', value: '12', status: 'critical' },
  { title: '정상 설비 비율', value: '92%', status: 'normal' },
  { title: '오늘 질의 수', value: '37', status: 'deployed' },
  { title: '지식 베이스 동기화', value: '정상', status: 'normal' },
] as const;

export const knowledgeBaseItems: KnowledgeBaseItem[] = [
  {
    id: 'kb-1',
    title: '펌프 기동 실패 시나리오',
    scenario: 'Pump Start Failure',
    category: 'Alarm',
    summary: '운전 허가 비트, E-Stop, 보호계전기 상태를 검토하는 대표 규칙입니다.',
    status: 'deployed',
    updatedAt: '2026-04-21',
    updatedBy: 'admin',
  },
  {
    id: 'kb-2',
    title: '비상 정지 복구 절차',
    scenario: 'Emergency Stop',
    category: 'Emergency',
    summary: '안전회로 복귀 후 관리자 승인 기반 재기동 규칙입니다.',
    status: 'review',
    updatedAt: '2026-04-20',
    updatedBy: 'safety_manager',
  },
  {
    id: 'kb-3',
    title: '탱크 고수위 알람 대응',
    scenario: 'Tank High Level',
    category: 'Process Alarm',
    summary: '레벨 상한 초과 시 유입 차단과 운영자 조치 가이드를 포함합니다.',
    status: 'deployed',
    updatedAt: '2026-04-19',
    updatedBy: 'process_eng',
  },
  {
    id: 'kb-4',
    title: '컨베이어 인터록 미충족',
    scenario: 'Conveyor Interlock',
    category: 'Interlock',
    summary: '전단 설비 준비 상태와 제품 감지 조건을 확인합니다.',
    status: 'draft',
    updatedAt: '2026-04-22',
    updatedBy: 'automation_eng',
  },
];

export const logicRules: LogicRule[] = [
  {
    id: 'rule-1',
    name: 'Pump Stop Interlock',
    category: 'Interlock',
    scenarioId: 'SCN-001',
    conditionSummary: 'Pump_Enable = OFF OR E_Stop = ON OR Protection_Trip = ON',
    outputSignals: ['Motor_Run_Command', 'Alarm_Pump_Stop'],
    description: '펌프 기동 차단 원인을 설명하는 대표 인터록 규칙입니다.',
    status: 'draft',
    version: 3,
    updatedAt: '2026-04-22',
    updatedBy: 'admin',
  },
  {
    id: 'rule-2',
    name: 'Emergency Output Cutoff',
    category: 'Emergency',
    scenarioId: 'SCN-002',
    conditionSummary: 'E_Stop = ON => Main_Output_Enable = OFF',
    outputSignals: ['Main_Output_Enable'],
    description: '비상 정지 입력 시 전체 출력 차단을 수행합니다.',
    status: 'review',
    version: 7,
    updatedAt: '2026-04-21',
    updatedBy: 'safety_manager',
  },
];

export const signalMappings: SignalMapping[] = [
  { id: 'io-1', address: 'X0.1', name: 'E_Stop', label: '비상정지 입력', type: 'DI', equipment: 'Main Panel', active: true },
  { id: 'io-2', address: 'M100', name: 'Pump_Enable', label: '펌프 운전 허가', type: 'MEM', equipment: 'Pump A', active: true },
  { id: 'io-3', address: 'Y1.0', name: 'Motor_Run_Command', label: '모터 운전 출력', type: 'DO', equipment: 'Pump A', active: true },
  { id: 'io-4', address: 'AI0', name: 'Tank_Level', label: '탱크 레벨', type: 'AI', equipment: 'Tank-101', active: true, unit: '%' },
  { id: 'io-5', address: 'X2.3', name: 'Upstream_Ready', label: '전단 설비 준비', type: 'DI', equipment: 'Conveyor-01', active: true },
  { id: 'io-6', address: 'Y6.0', name: 'Conveyor_Run_Command', label: '컨베이어 운전 명령', type: 'DO', equipment: 'Conveyor-01', active: true },
];
