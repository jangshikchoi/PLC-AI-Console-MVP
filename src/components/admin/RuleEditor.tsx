'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/common/Card';
import { LogicRule } from '@/types/domain';

type Props = {
  rules: LogicRule[];
};

const emptyRule: LogicRule = {
  id: 'new-rule',
  name: '',
  category: '',
  scenarioId: '',
  conditionSummary: '',
  outputSignals: [],
  description: '',
  status: 'draft',
  version: 1,
  updatedAt: '2026-04-22',
  updatedBy: 'admin',
};

export function RuleEditor({ rules }: Props) {
  const [selectedRuleId, setSelectedRuleId] = useState(rules[0]?.id ?? emptyRule.id);
  const selectedRule = useMemo(() => rules.find((rule) => rule.id === selectedRuleId) ?? emptyRule, [rules, selectedRuleId]);
  const [form, setForm] = useState<LogicRule>(selectedRule);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(selectedRule);
    setMessage('');
  }, [selectedRule]);

  const update = <K extends keyof LogicRule>(key: K, value: LogicRule[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const outputSignalText = form.outputSignals.join(', ');

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-4">
        <Card title="룰 목록" description="룰을 선택하면 우측 편집기에서 상세 수정이 가능합니다.">
          <div className="space-y-2">
            {rules.map((rule) => (
              <button
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className={selectedRuleId === rule.id
                  ? 'w-full rounded-xl border border-brand bg-blue-500/10 px-4 py-3 text-left'
                  : 'w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-left hover:bg-slate-900'}
              >
                <div className="text-sm font-medium text-white">{rule.name}</div>
                <div className="mt-1 text-xs text-slate-400">{rule.conditionSummary}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="xl:col-span-8">
        <Card
          title="Rule Editor"
          description="변경 내용을 가상의 draft 상태로 저장합니다."
          action={
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => setMessage('초안이 저장되었습니다.')}>
                초안 저장
              </button>
              <button className="btn-primary" onClick={() => setMessage('리뷰 요청이 생성되었습니다.')}>
                리뷰 요청
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="규칙명">
              <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} />
            </Field>
            <Field label="카테고리">
              <input className="input" value={form.category} onChange={(e) => update('category', e.target.value)} />
            </Field>
            <Field label="시나리오 ID">
              <input className="input" value={form.scenarioId} onChange={(e) => update('scenarioId', e.target.value)} />
            </Field>
            <Field label="상태">
              <select className="input" value={form.status} onChange={(e) => update('status', e.target.value as LogicRule['status'])}>
                <option value="draft">draft</option>
                <option value="review">review</option>
                <option value="deployed">deployed</option>
                <option value="archived">archived</option>
              </select>
            </Field>
            <Field label="조건 요약" className="md:col-span-2">
              <textarea className="input min-h-[110px]" value={form.conditionSummary} onChange={(e) => update('conditionSummary', e.target.value)} />
            </Field>
            <Field label="출력 신호 목록" className="md:col-span-2">
              <input
                className="input"
                value={outputSignalText}
                onChange={(e) => update('outputSignals', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
              />
            </Field>
            <Field label="설명" className="md:col-span-2">
              <textarea className="input min-h-[140px]" value={form.description ?? ''} onChange={(e) => update('description', e.target.value)} />
            </Field>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="text-xs text-slate-500">Diff Preview</div>
            <div className="mt-2 text-sm text-slate-300">
              <span className="text-white">{selectedRule.name}</span> → <span className="text-brand">{form.name || '(미입력)'}</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">출력 신호: {form.outputSignals.join(', ') || '없음'}</div>
          </div>

          {message && <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{message}</div>}
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={className}>
      <div className="mb-2 text-xs font-semibold text-slate-400">{label}</div>
      {children}
    </label>
  );
}
