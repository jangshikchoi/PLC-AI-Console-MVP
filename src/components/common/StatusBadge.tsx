import { StatusType } from '@/types/domain';
import { cn } from '@/lib/cn';

const statusMap: Record<StatusType, string> = {
  normal: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300',
  warning: 'border-amber-500/30 bg-amber-500/15 text-amber-300',
  critical: 'border-red-500/30 bg-red-500/15 text-red-300',
  inactive: 'border-slate-500/30 bg-slate-500/15 text-slate-300',
  draft: 'border-sky-500/30 bg-sky-500/15 text-sky-300',
  deployed: 'border-blue-500/30 bg-blue-500/15 text-blue-300',
};

type Props = {
  status: StatusType;
  label?: string;
};

export function StatusBadge({ status, label }: Props) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', statusMap[status])}>
      {label ?? status}
    </span>
  );
}
