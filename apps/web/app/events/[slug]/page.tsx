import Link from 'next/link';
import { api } from '../../../lib/api';

type Event = {
  slug: string;
  title: string;
  description: string;
  venue: string;
  category: string;
  feeInPaise: number;
  startsAt: string;
  endsAt?: string | null;
  capacity?: number | null;
  registrationStartsAt?: string | null;
  registrationEndsAt?: string | null;
  department?: { name: string } | null;
  rules?: string | null;
};

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let event: Event | undefined;

  try {
    event = await api<Event>(`/events/${slug}`, { cache: 'no-store' });
  } catch {
    event = undefined;
  }

  if (!event) {
    return <main className="p-8 text-xl font-semibold">Event not found.</main>;
  }

  const registerDisabled = false;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-black tracking-tight">Lakshya<span className="text-[#ff5b47]">OS</span></Link>
        <div className="flex gap-3 text-sm font-semibold">
          <Link href="/events" className="rounded-full border px-4 py-2">Back to events</Link>
          <Link href="/login" className="rounded-full bg-[#1f1730] px-4 py-2 text-white">Login</Link>
        </div>
      </nav>

      <div className="overflow-hidden rounded-[32px] border border-[#1f1730]/10 bg-white shadow-sm">
        <div className="h-40 bg-[linear-gradient(135deg,#ff5b47,#7046db)]" />
        <div className="p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7046db]">{event.category}</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-6xl">{event.title}</h1>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[#f4ecff] px-3 py-1.5 font-semibold text-[#4a2c9b]">{event.department?.name ?? 'Open to all'}</span>
            <span className="rounded-full border border-[#1f1730]/10 px-3 py-1.5 font-semibold">{new Date(event.startsAt).toLocaleString()}</span>
            <span className="rounded-full border border-[#1f1730]/10 px-3 py-1.5 font-semibold">{event.venue}</span>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <h2 className="text-xl font-black">About the event</h2>
              <p className="mt-3 text-lg leading-8 text-[#514864]">{event.description}</p>

              {event.rules && (
                <div className="mt-8">
                  <h3 className="text-xl font-black">Rules</h3>
                  <p className="mt-3 whitespace-pre-line text-[#514864]">{event.rules}</p>
                </div>
              )}
            </div>

            <aside className="rounded-3xl border border-[#1f1730]/10 bg-[#fffaf4] p-5">
              <div className="text-sm text-[#514864]">
                <p><span className="font-semibold text-[#1f1730]">Entry fee:</span> ₹{event.feeInPaise / 100}</p>
                <p className="mt-3"><span className="font-semibold text-[#1f1730]">Capacity:</span> {event.capacity ?? 'Open'} seats</p>
                <p className="mt-3"><span className="font-semibold text-[#1f1730]">Registration window:</span> {event.registrationStartsAt ? new Date(event.registrationStartsAt).toLocaleDateString() : 'Open now'} - {event.registrationEndsAt ? new Date(event.registrationEndsAt).toLocaleDateString() : 'TBA'}</p>
              </div>

              <form action={`/api/registrations/register?eventSlug=${event.slug}`} method="post" className="mt-5">
                <button type="submit" disabled={registerDisabled} className="w-full rounded-full bg-[#ff5b47] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60">
                  Register for event
                </button>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
