'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ChatAnswer, ChatMessage, EvidenceSignal, ScenarioSummary } from '@/types/domain';

type Props = {
  title?: string;
  messages: ChatMessage[];
  answer: ChatAnswer;
  relatedSignals: EvidenceSignal[];
  relatedScenarios: ScenarioSummary[];
  suggestedQuestions: string[];
  onSend?: (question: string) => void;
};

export function ChatPanel({
  title = '질의응답',
  messages,
  answer,
  relatedSignals,
  relatedScenarios,
  suggestedQuestions,
  onSend,
}: Props) {
  const [question, setQuestion] = useState('');
  const canSend = useMemo(() => question.trim().length > 1, [question]);

  const submit = () => {
    if (!canSend) return;
    onSend?.(question.trim());
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <section className="xl:col-span-7">
        <Card title={title} description="질문을 입력하면 원인, 조치, 관련 신호를 함께 보여줍니다.">
          <div className="scrollbar-thin mb-4 max-h-[440px] space-y-3 overflow-y-auto rounded-2xl bg-slate-950/50 p-3">
            {messages.length === 0 ? (
              <EmptyState title="아직 대화가 없습니다" description="예: 펌프가 왜 시작되지 않는지 알려줘" />
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={msg.role === 'user'
                    ? 'ml-auto max-w-[85%] rounded-2xl bg-brand px-4 py-3 text-sm text-white'
                    : 'mr-auto max-w-[90%] rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100'}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className="mt-2 text-[11px] opacity-70">{msg.createdAt}</div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuestion(item)}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-brand hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="input min-h-[100px] flex-1"
                placeholder="예: 펌프가 작동하지 않는 원인이 무엇인가요?"
              />
              <button onClick={submit} disabled={!canSend} className="btn-primary disabled:cursor-not-allowed disabled:bg-slate-700">
                질문 전송
              </button>
            </div>
          </div>
        </Card>
      </section>

      <aside className="space-y-6 xl:col-span-5">
        <Card title="답변 요약" description="Mock RAG 결과">
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-200">
              {answer.summary}
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold text-slate-400">가능성 높은 원인</div>
              <ul className="space-y-2">
                {answer.probableCauses.map((cause) => (
                  <li key={cause} className="rounded-xl bg-slate-950/50 px-3 py-2 text-sm text-slate-200">
                    {cause}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold text-slate-400">추천 조치</div>
              <ul className="space-y-2">
                {answer.recommendedActions.map((action) => (
                  <li key={action} className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200">
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">신뢰도</span>
              <StatusBadge
                status={answer.confidence >= 0.85 ? 'normal' : answer.confidence >= 0.6 ? 'warning' : 'critical'}
                label={`${Math.round(answer.confidence * 100)}%`}
              />
            </div>
          </div>
        </Card>

        <Card title="관련 I/O">
          <div className="space-y-2">
            {relatedSignals.map((signal) => (
              <div key={signal.signalId} className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-3">
                <div>
                  <div className="text-sm text-white">{signal.label}</div>
                  <div className="font-mono text-xs text-slate-400">{signal.address}</div>
                </div>
                <div className="text-sm text-slate-200">{String(signal.currentValue)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="관련 시나리오">
          <div className="space-y-2">
            {relatedScenarios.map((scenario) => (
              <Link
                key={scenario.id}
                href={`/chat?scenario=${scenario.id}`}
                className="block rounded-xl border border-slate-800 px-3 py-3 hover:bg-slate-800"
              >
                <div className="text-sm font-medium text-white">{scenario.title}</div>
                <div className="mt-1 text-xs text-slate-400">{scenario.description}</div>
              </Link>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}
