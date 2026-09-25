import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LAKSHYA 2026 | College Festival',
  description: 'Where ideas, competition and culture come alive. Explore events and register for LAKSHYA 2026.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#050510] text-white antialiased">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
