'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { KnowledgeBaseItem } from '@/types/domain';

type Props = {
  items: KnowledgeBaseItem[];
};

export function KnowledgeBaseTable({ items }: Props) {
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<KnowledgeBaseItem | null>(items[0] ?? null);

  const filtered = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => [item.title, item.summary, item.category, item.scenario].join(' ').toLowerCase().includes(query));
  }, [items, keyword]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-8">
        <Card
          title="Knowledge Base"
          description="시나리오, 래더 로직 요약, 운영 설명을 검색합니다."
          action={<input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="검색" className="input w-52" />}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left">제목</th>
                  <th className="px-4 py-3 text-left">시나리오</th>
                  <th className="px-4 py-3 text-left">분류</th>
                  <th className="px-4 py-3 text-left">상태</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} onClick={() => setSelected(item)} className="cursor-pointer border-t border-slate-800 bg-slate-900/40 hover:bg-slate-800/60">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.summary}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{item.scenario}</td>
                    <td className="px-4 py-3 text-slate-300">{item.category}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.status === 'deployed' ? 'deployed' : item.status === 'review' ? 'warning' : 'draft'} label={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div className="xl:col-span-4">
        <Card title="선택 항목 상세" description="테이블 행을 클릭하면 세부 정보가 표시됩니다.">
          {selected ? (
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <div className="text-xs text-slate-500">제목</div>
                <div className="mt-1 text-white">{selected.title}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">시나리오</div>
                <div className="mt-1">{selected.scenario}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">요약</div>
                <div className="mt-1 leading-6">{selected.summary}</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-xs text-slate-400">
                수정자: {selected.updatedBy} · 수정일: {selected.updatedAt}
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
