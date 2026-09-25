'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function FestivalShell({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('lakshyaos_token'));
  }, []);

  return (
    <div>
      <nav className="sticky top-0 z-20 border-b border-[#1f1730]/10 bg-[#fffaf4]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Lakshya<span className="text-[#ff5b47]">OS</span>
          </Link>
          <div className="hidden items-center gap-3 text-sm font-semibold md:flex">
            <Link href="/" className="rounded-full px-3 py-2 hover:bg-[#f4ecff]">Home</Link>
            <Link href="/events" className="rounded-full px-3 py-2 hover:bg-[#f4ecff]">Events</Link>
            <Link href="/registrations" className="rounded-full px-3 py-2 hover:bg-[#f4ecff]">My Registrations</Link>
            <Link href="/profile" className="rounded-full px-3 py-2 hover:bg-[#f4ecff]">Profile</Link>
            {!token ? (
              <Link href="/login" className="rounded-full bg-[#1f1730] px-4 py-2 text-white">Login</Link>
            ) : (
              <button
                type="button"
                onClick={() => { localStorage.removeItem('lakshyaos_token'); window.location.href = '/'; }}
                className="rounded-full border border-[#1f1730]/15 px-4 py-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
