import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { KnowledgeBaseTable } from '@/components/admin/KnowledgeBaseTable';
import { knowledgeBaseItems } from '@/data/mockData';

export default function KnowledgeBasePage() {
  return (
    <AppShell role="admin">
      <PageHeader title="지식 베이스" description="래더 논리 해석 결과, 시나리오 설명, 운영 설명 데이터를 관리합니다." />
      <KnowledgeBaseTable items={knowledgeBaseItems} />
    </AppShell>
  );
}
