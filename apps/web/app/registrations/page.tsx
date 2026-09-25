'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { getDemoSessionToken } from '../../lib/demo-store';
import { FestivalFooter, FestivalNav } from '../../components/festival-ui';

type RegistrationItem = {
  id: string;
  passCode: string;
  status: string;
  createdAt: string;
  paymentStatus?: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  eventCategory: string;
  venue: string;
  startsAt: string;
  transactionId?: string | null;
  amount?: number;
};

export default function MyRegistrationsPage() {
  const [items, setItems] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getDemoSessionToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    api<RegistrationItem[]>('/registrations/me', { cache: 'no-store' }, token)
      .then((result) => setItems(result))
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load registrations'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <FestivalNav />
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
      <header className="mb-8"><p className="neon-kicker text-xs font-bold tracking-[0.2em]">YOUR FESTIVAL PASS</p><h1 className="neon-heading mt-2 text-4xl font-black uppercase tracking-[0.03em] md:text-5xl">My Festival</h1><p className="mt-3 text-[#aaa9c4]">Every event you saved, all in one place.</p></header>

      {loading && <p className="neon-panel rounded-2xl p-6 text-white/65">Loading your festival entries…</p>}
      {error && <p className="rounded-2xl border border-rose-300/25 bg-rose-400/10 p-6 text-rose-200">{error}</p>}

      {!loading && items.length === 0 && (
        <div className="neon-panel rounded-2xl border-dashed p-8 text-center">
          <p className="neon-heading text-xl font-bold uppercase">Your festival story starts here</p>
          <p className="mt-2 text-[#aaa9c4]">You have no registrations yet. Find an event and save your spot.</p>
          <Link href="/events" className="mt-5 inline-flex rounded-full border border-cyan-200/45 bg-cyan-300/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-cyan-100">Browse events</Link>
        </div>
      )}

      <div className="grid gap-5">
        {items.map((registration) => {
          const amount = registration.amount ?? 0;
          const isPaid = amount > 0;
          return (
          <article key={registration.id} className="overflow-hidden rounded-2xl border border-violet-300/20 bg-[#0d0b1f] shadow-[0_18px_55px_-40px_rgba(0,229,255,0.3)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-300/20 bg-[linear-gradient(100deg,rgba(124,58,237,0.2),rgba(0,229,255,0.07),transparent)] px-6 py-3 text-white"><span className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">LAKSHYA '26 · {registration.eventCategory}</span><span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${isPaid ? 'border-fuchsia-200/35 bg-fuchsia-300/10 text-fuchsia-100' : 'border-cyan-200/35 bg-cyan-300/10 text-cyan-100'}`}>{isPaid ? 'PAID' : 'FREE'}</span></div>
            <div className="p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-200">{registration.eventCategory}</p>
                <h2 className="neon-heading mt-2 text-2xl font-black uppercase tracking-[0.04em] md:text-3xl">{registration.eventTitle}</h2>
                <p className="mt-2 text-sm text-white/55">{registration.venue}</p>
              </div>

              <div className="text-left md:text-right">
                {isPaid && <p className="mt-2 text-xs text-white/50">Transaction ID: <span className="font-mono font-bold text-fuchsia-100">{registration.transactionId}</span></p>}
                {isPaid && <p className="text-xs text-white/50">Amount: <span className="font-bold text-white">₹{amount}</span></p>}
                <p className="mt-2 text-xs text-white/50">Pass ID: <span className="font-mono font-bold text-cyan-100">{registration.passCode}</span></p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 text-xs text-white/50 md:grid-cols-3">
              <div><span className="font-semibold text-white/80">Registered:</span> {new Date(registration.createdAt).toLocaleDateString()}</div>
              <div><span className="font-semibold text-white/80">Starts:</span> {new Date(registration.startsAt).toLocaleString()}</div>
              <div><span className="font-semibold text-white/80">Status:</span> {registration.status}</div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/events/${registration.eventSlug}`} className="rounded-full border border-violet-200/30 bg-violet-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-100">View event</Link>
              <button type="button" onClick={() => window.print()} className="rounded-full border border-cyan-200/35 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-100">Print pass</button>
            </div>
            </div>
          </article>
          );
        })}
      </div>
      </section>
      <FestivalFooter />
    </main>
  );
}
