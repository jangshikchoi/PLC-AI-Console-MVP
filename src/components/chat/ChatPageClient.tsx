'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { FlowchartViewer } from '@/components/flow/FlowchartViewer';
import { scenarioList, scenarios } from '@/data/mockData';
import { ChatMessage, ScenarioId } from '@/types/domain';

type Props = {
  initialScenarioId: ScenarioId;
};

export function ChatPageClient({ initialScenarioId }: Props) {
  const scenario = scenarios[initialScenarioId];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'user',
      content: scenario.suggestedQuestions[0],
      createdAt: '2026-04-22 09:12',
    },
    {
      id: 'm2',
      role: 'assistant',
      content: scenario.answer.summary,
      createdAt: '2026-04-22 09:12',
    },
  ]);

  const relatedScenarios = useMemo(() => scenarioList.filter((item) => item.id !== scenario.id).slice(0, 3), [scenario.id]);

  const handleSend = (question: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${prev.length + 1}`,
        role: 'user',
        content: question,
        createdAt: '2026-04-22 09:13',
      },
      {
        id: `a-${prev.length + 2}`,
        role: 'assistant',
        content: `${scenario.title} 기준으로 분석하면, ${scenario.answer.summary}`,
        createdAt: '2026-04-22 09:13',
      },
    ]);
  };

  return (
    <AppShell role="operator">
      <PageHeader title="질의응답" description="가상의 시나리오 데이터를 사용한 클릭형 데모입니다." />
      <div className="space-y-6">
        <ChatPanel
          messages={messages}
          answer={scenario.answer}
          relatedSignals={scenario.signals}
          relatedScenarios={relatedScenarios}
          suggestedQuestions={scenario.suggestedQuestions}
          onSend={handleSend}
        />
        <FlowchartViewer data={scenario.flowchart} />
      </div>
    </AppShell>
  );
}
