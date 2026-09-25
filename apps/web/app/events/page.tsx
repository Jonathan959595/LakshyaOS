import Link from 'next/link';
import { api } from '../../lib/api';

type Event = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  category: string;
  venue: string;
  startsAt: string;
  feeInPaise: number;
  isFlagship: boolean;
};

export default async function EventsPage() {
  let items: Event[] = [];

  try {
    items = (await api<{ items: Event[] }>('/events', { cache: 'no-store' })).items;
  } catch {
    items = [];
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-black tracking-tight">Lakshya<span className="text-[#ff5b47]">OS</span></Link>
        <div className="flex gap-3 text-sm font-semibold">
          <Link href="/events" className="rounded-full bg-[#1f1730] px-4 py-2 text-white">Events</Link>
          <Link href="/registrations" className="rounded-full border px-4 py-2">My Registrations</Link>
          <Link href="/profile" className="rounded-full border px-4 py-2">Profile</Link>
        </div>
      </nav>

      <header className="mb-8">
        <p className="text-sm font-bold tracking-[0.2em] text-[#ff5b47]">EXPLORE</p>
        <h1 className="mt-2 text-5xl font-black tracking-[-0.05em]">Festival events</h1>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((event) => (
          <Link key={event.id} href={`/events/${event.slug}`} className="block overflow-hidden rounded-3xl border border-[#1f1730]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#7046db]">{event.category}</span>
              {event.isFlagship && <span className="rounded-full bg-[#ffefee] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff5b47]">Flagship</span>}
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">{event.title}</h2>
            <p className="mt-3 text-[#514864]">{event.shortDescription ?? 'A vibrant festival experience waiting to be discovered.'}</p>
            <div className="mt-5 grid gap-2 text-sm text-[#514864]">
              <p><span className="font-semibold text-[#1f1730]">Venue:</span> {event.venue}</p>
              <p><span className="font-semibold text-[#1f1730]">Starts:</span> {new Date(event.startsAt).toLocaleString()}</p>
              <p><span className="font-semibold text-[#1f1730]">Fee:</span> ₹{event.feeInPaise / 100}</p>
            </div>
          </Link>
        ))}

        {items.length === 0 && (
          <div className="md:col-span-2 rounded-3xl border border-dashed border-[#1f1730]/15 bg-white p-8 text-[#514864] shadow-sm">
            Events will appear here once published.
          </div>
        )}
      </div>
    </main>
  );
}
