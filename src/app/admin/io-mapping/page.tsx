import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { IoMappingPanel } from '@/components/admin/IoMappingPanel';
import { signalMappings } from '@/data/mockData';

export default function IoMappingPage() {
  return (
    <AppShell role="admin">
      <PageHeader title="I/O 매핑" description="PLC 주소와 운영 의미를 수정하고 검증합니다." />
      <IoMappingPanel items={signalMappings} />
    </AppShell>
  );
}
