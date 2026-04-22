'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/mockData';
import { cn } from '@/lib/cn';
import { UserRole } from '@/types/domain';

type Props = {
  currentRole: UserRole;
};

export function Sidebar({ currentRole }: Props) {
  const pathname = usePathname();
  const menus = navItems.filter((item) => item.roles.includes(currentRole));

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-5 py-4">
        <div className="text-sm font-semibold text-white">PLC AI Console</div>
        <div className="mt-1 text-xs text-slate-400">Ladder Logic · RAG · Flowchart</div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {menus.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block rounded-xl px-3 py-2.5 text-sm transition',
                active ? 'bg-blue-500/15 text-blue-300' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
