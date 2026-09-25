import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LakshyaOS | Festival platform',
  description: 'Your college festival, all in one place.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#fffaf4] text-[#1f1730] antialiased">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
