import { ChatPageClient } from '@/components/chat/ChatPageClient';
import { scenarios } from '@/data/mockData';
import { ScenarioId } from '@/types/domain';

const defaultScenarioId: ScenarioId = 'pump-start-failure';

type ChatPageProps = {
  searchParams: Promise<{ scenario?: string }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;
  const candidate = params.scenario as ScenarioId | undefined;
  const scenarioId = candidate && candidate in scenarios ? candidate : defaultScenarioId;

  return <ChatPageClient initialScenarioId={scenarioId} />;
}
