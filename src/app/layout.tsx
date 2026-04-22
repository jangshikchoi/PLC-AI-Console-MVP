import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PLC AI Console MVP',
  description: 'Mock PLC ladder logic knowledge system demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
