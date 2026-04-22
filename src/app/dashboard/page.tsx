import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { dashboardMetrics, scenarioList, scenarios } from '@/data/mockData';

export default function DashboardPage() {
  return (
    <AppShell role="admin">
      <PageHeader
        title="대시보드"
        description="가상의 PLC 운영 시나리오 기반 KPI, 알람, 빠른 질문 진입점을 제공합니다."
        actions={<Link href="/chat" className="btn-primary">질문하러 가기</Link>}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-slate-400">{metric.title}</div>
                <div className="mt-2 text-3xl font-bold text-white">{metric.value}</div>
              </div>
              <StatusBadge status={metric.status} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Card title="대표 시나리오" description="카드를 클릭하면 바로 질의응답 화면으로 이동합니다.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {scenarioList.map((scenario) => (
                <Link key={scenario.id} href={`/chat?scenario=${scenario.id}`} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 hover:bg-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{scenario.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{scenario.description}</div>
                    </div>
                    <StatusBadge status={scenario.id === 'emergency-stop' ? 'critical' : scenario.id === 'tank-high-level' ? 'warning' : 'normal'} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        <div className="xl:col-span-4">
          <Card title="빠른 질의" description="현장에서 바로 자주 쓰는 질문 템플릿입니다.">
            <div className="space-y-2">
              {Object.values(scenarios).map((scenario) => (
                <Link key={scenario.id} href={`/chat?scenario=${scenario.id}`} className="block rounded-xl border border-slate-800 px-3 py-3 text-sm text-slate-200 hover:bg-slate-800">
                  {scenario.suggestedQuestions[0]}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
