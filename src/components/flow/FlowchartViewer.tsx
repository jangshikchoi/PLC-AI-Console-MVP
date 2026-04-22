'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/cn';
import { FlowchartData } from '@/types/domain';

type Props = {
  data: FlowchartData;
};

export function FlowchartViewer({ data }: Props) {
  const defaultNode = useMemo(
    () => data.nodes.find((node) => node.id === data.activeNodeId) ?? data.nodes[0],
    [data.activeNodeId, data.nodes]
  );
  const [selectedNodeId, setSelectedNodeId] = useState(defaultNode?.id);
  const selected = data.nodes.find((node) => node.id === selectedNodeId) ?? defaultNode;

  return (
    <Card title={data.title} description="플로우 노드를 클릭하면 상세 설명이 변경됩니다.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-3 xl:col-span-7">
          {data.nodes.map((node, index) => {
            const isActive = node.id === selected?.id;
            return (
              <div key={node.id}>
                <button
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    'w-full rounded-2xl border px-4 py-4 text-left transition',
                    isActive ? 'border-brand bg-blue-500/10' : 'border-slate-800 bg-slate-950/50 hover:bg-slate-900'
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{node.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{node.description}</div>
                    </div>
                    <span
                      className={cn(
                        'h-3 w-3 rounded-full',
                        node.status === 'critical' ? 'bg-red-400' : node.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                      )}
                    />
                  </div>
                </button>
                {index < data.nodes.length - 1 && <div className="mx-auto h-6 w-px bg-slate-700" />}
              </div>
            );
          })}
        </div>
        <div className="xl:col-span-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500">Selected Node</div>
            <div className="mt-2 text-lg font-semibold text-white">{selected?.title}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{selected?.description}</p>
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-slate-400">
              운영자용 해설: 현재 선택된 단계는 시스템이 실제로 상태 변화를 추론할 때 가장 중요한 분기 지점입니다.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
