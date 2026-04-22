'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/common/Card';
import { SignalMapping } from '@/types/domain';

type Props = {
  items: SignalMapping[];
};

export function IoMappingPanel({ items }: Props) {
  const [rows, setRows] = useState(items);
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');

  const filtered = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) => [row.address, row.name, row.label, row.type, row.equipment].join(' ').toLowerCase().includes(query));
  }, [rows, keyword]);

  const update = (id: string, patch: Partial<SignalMapping>) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  const validate = () => {
    const duplicated = rows.filter((row, index) => rows.findIndex((item) => item.address === row.address) !== index);
    setMessage(duplicated.length > 0 ? `주소 중복 ${duplicated.length}건이 감지되었습니다.` : '검증 완료: 중복 주소가 없습니다.');
  };

  return (
    <Card
      title="I/O Mapping"
      description="가상의 주소 체계를 직접 수정하고 저장할 수 있습니다."
      action={
        <div className="flex flex-col gap-2 md:flex-row">
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="검색" className="input w-full md:w-56" />
          <button className="btn-secondary" onClick={validate}>검증</button>
          <button className="btn-primary" onClick={() => setMessage('가상 저장이 완료되었습니다.')}>저장</button>
        </div>
      }
    >
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="px-3 py-3 text-left">주소</th>
              <th className="px-3 py-3 text-left">이름</th>
              <th className="px-3 py-3 text-left">라벨</th>
              <th className="px-3 py-3 text-left">타입</th>
              <th className="px-3 py-3 text-left">설비</th>
              <th className="px-3 py-3 text-left">활성</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-slate-800 bg-slate-900/40">
                <td className="px-3 py-2"><input className="input font-mono" value={row.address} onChange={(e) => update(row.id, { address: e.target.value })} /></td>
                <td className="px-3 py-2"><input className="input" value={row.name} onChange={(e) => update(row.id, { name: e.target.value })} /></td>
                <td className="px-3 py-2"><input className="input" value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} /></td>
                <td className="px-3 py-2">
                  <select className="input" value={row.type} onChange={(e) => update(row.id, { type: e.target.value as SignalMapping['type'] })}>
                    <option value="DI">DI</option>
                    <option value="DO">DO</option>
                    <option value="AI">AI</option>
                    <option value="AO">AO</option>
                    <option value="MEM">MEM</option>
                  </select>
                </td>
                <td className="px-3 py-2"><input className="input" value={row.equipment} onChange={(e) => update(row.id, { equipment: e.target.value })} /></td>
                <td className="px-3 py-2">
                  <input type="checkbox" checked={row.active} onChange={(e) => update(row.id, { active: e.target.checked })} className="h-4 w-4 accent-brand" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">{message}</div>}
    </Card>
  );
}
