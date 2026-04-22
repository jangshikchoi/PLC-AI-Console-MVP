import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { RuleEditor } from '@/components/admin/RuleEditor';
import { logicRules } from '@/data/mockData';

export default function RulesPage() {
  return (
    <AppShell role="admin">
      <PageHeader title="룰 편집" description="운영 규칙 초안 저장, 리뷰 요청, diff 미리보기를 수행합니다." />
      <RuleEditor rules={logicRules} />
    </AppShell>
  );
}
