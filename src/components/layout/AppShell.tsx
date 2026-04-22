import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { UserRole } from '@/types/domain';

type Props = {
  children: ReactNode;
  role?: UserRole;
};

export function AppShell({ children, role = 'admin' }: Props) {
  return (
    <div className="flex min-h-screen bg-canvas text-white">
      <Sidebar currentRole={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
