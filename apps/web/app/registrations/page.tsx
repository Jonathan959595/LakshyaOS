'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';

type RegistrationItem = {
  id: string;
  passCode: string;
  status: string;
  createdAt: string;
  paymentStatus?: string;
  event: {
    id: string;
    slug: string;
    title: string;
    category: string;
    venue: string;
    startsAt: string;
    endsAt?: string | null;
    feeInPaise: number;
    capacity?: number | null;
  };
};

export default function MyRegistrationsPage() {
  const [items, setItems] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('lakshyaos_token');
    if (!token) {
      location.href = '/login';
      return;
    }

    api<RegistrationItem[]>('/registrations/me', { cache: 'no-store' }, token)
      .then((result) => setItems(result))
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load registrations'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-black tracking-tight">
          Lakshya<span className="text-[#ff5b47]">OS</span>
        </Link>
        <div className="flex gap-3 text-sm font-semibold">
          <Link href="/events" className="rounded-full border px-4 py-2">Events</Link>
          <Link href="/registrations" className="rounded-full bg-[#1f1730] px-4 py-2 text-white">My Registrations</Link>
          <Link href="/profile" className="rounded-full border px-4 py-2">Profile</Link>
        </div>
      </nav>

      <header className="mb-8">
        <p className="text-sm font-bold tracking-[0.2em] text-[#ff5b47]">MY PASS</p>
        <h1 className="mt-2 text-5xl font-black tracking-[-0.05em]">Your registrations</h1>
      </header>

      {loading && <p className="rounded-2xl bg-white p-6 shadow-sm">Loading your festival entries…</p>}
      {error && <p className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</p>}

      {!loading && items.length === 0 && (
        <div className="rounded-3xl border border-dashed border-[#1f1730]/15 bg-white p-8 shadow-sm">
          <p className="text-xl font-bold">No registrations yet</p>
          <p className="mt-2 text-[#514864]">Reserve your first slot from the event calendar.</p>
          <Link href="/events" className="mt-5 inline-flex rounded-full bg-[#ff5b47] px-5 py-3 font-semibold text-white">
            Browse events
          </Link>
        </div>
      )}

      <div className="grid gap-5">
        {items.map((registration) => (
          <article key={registration.id} className="rounded-3xl border border-[#1f1730]/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7046db]">{registration.event.category}</p>
                <h2 className="mt-2 text-3xl font-black">{registration.event.title}</h2>
                <p className="mt-2 text-[#514864]">{registration.event.venue}</p>
              </div>

              <div className="text-left md:text-right">
                <div className="inline-flex rounded-full bg-[#f4ecff] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#4a2c9b]">
                  {registration.status}
                </div>
                <p className="mt-2 text-sm text-[#514864]">Reg ID: {registration.id.slice(0, 8).toUpperCase()}</p>
                <p className="text-sm text-[#514864]">Pass: {registration.passCode.slice(0, 10).toUpperCase()}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-[#514864] md:grid-cols-3">
              <div><span className="font-semibold text-[#1f1730]">Registered:</span> {new Date(registration.createdAt).toLocaleDateString()}</div>
              <div><span className="font-semibold text-[#1f1730]">Starts:</span> {new Date(registration.event.startsAt).toLocaleString()}</div>
              <div><span className="font-semibold text-[#1f1730]">Payment:</span> {registration.paymentStatus ?? 'N/A'}</div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/events/${registration.event.slug}`} className="rounded-full border border-[#1f1730]/10 bg-[#fffaf4] px-4 py-2 font-semibold">
                View event
              </Link>
              <button
                type="button"
                onClick={() => alert(`Registration pass: ${registration.passCode}`)}
                className="rounded-full bg-[#1f1730] px-4 py-2 font-semibold text-white"
              >
                Show pass
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
