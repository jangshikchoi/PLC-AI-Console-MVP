import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({ title, description, action, children, className }: CardProps) {
  return (
    <section className={cn('rounded-2xl border border-slate-800 bg-panel p-4 shadow-card', className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
            {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
