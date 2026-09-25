'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { FestivalFooter, FestivalNav } from '../../../components/festival-ui';
import { getEventPrice } from '../../../lib/mock-data';
import {
  addDemoRegistration,
  addDemoTransaction,
  DemoRegistration,
  DemoTransaction,
  getDemoRegistrations,
  getDemoSessionToken,
  getDemoTransactions,
  hasRegisteredEvent,
} from '../../../lib/demo-store';

type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  venue: string;
  category: string;
  feeInPaise: number;
  price?: number;
  startsAt: string;
  endsAt?: string | null;
  capacity?: number | null;
  registrationStartsAt?: string | null;
  registrationEndsAt?: string | null;
  department?: { name: string; slug: string } | null;
  rules?: string | null;
};

function createCode(length: number): string {
  return Math.random().toString(36).slice(2, 2 + length).toUpperCase().padEnd(length, '0');
}

function DemoCheckout({
  event,
  onClose,
  onSuccess,
}: {
  event: Event;
  onClose: () => void;
  onSuccess: (registration: DemoRegistration, transaction: DemoTransaction) => void;
}) {
  const amount = getEventPrice(event);
  const [method, setMethod] = useState<'UPI' | 'CARD' | 'BANK'>('UPI');
  const [phase, setPhase] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [transaction, setTransaction] = useState<DemoTransaction | null>(null);
  const [registration, setRegistration] = useState<DemoRegistration | null>(null);
  const [error, setError] = useState('');

  function pay(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (phase !== 'checkout') return;

    setError('');
    setPhase('processing');
    window.setTimeout(() => {
      const existing = getDemoRegistrations().find((item) => item.eventId === event.id);
      if (existing) {
        setError('A registration for this event already exists.');
        setPhase('checkout');
        return;
      }

      const createdAt = new Date().toISOString();
      const transactionId = `TXN-LAK-${createCode(6)}`;
      const registrationId = `REG-LAK-2026-${createCode(5)}`;
      const passCode = `PASS-LAK-2026-${createCode(5)}`;
      const nextRegistration: DemoRegistration = {
        id: registrationId,
        eventId: event.id,
        eventSlug: event.slug,
        eventTitle: event.title,
        eventCategory: event.category,
        venue: event.venue,
        startsAt: event.startsAt,
        status: 'CONFIRMED',
        passCode,
        createdAt,
        paymentStatus: 'PAID',
        transactionId,
        amount,
      };
      const nextTransaction: DemoTransaction = {
        transactionId,
        registrationId,
        eventId: event.id,
        eventName: event.title,
        amount,
        status: 'paid',
        createdAt,
      };

      addDemoRegistration(nextRegistration);
      addDemoTransaction(nextTransaction);
      setRegistration(nextRegistration);
      setTransaction(nextTransaction);
      onSuccess(nextRegistration, nextTransaction);
      setPhase('success');
    }, 1000);
  }

  return (
    <div className="fixed inset-0 z-60 grid place-items-center overflow-y-auto bg-[#03030b]/85 p-4 backdrop-blur-md" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="neon-panel relative my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-violet-300/30 p-5 shadow-[0_0_80px_rgba(124,58,237,0.2)] sm:p-7">
        {phase !== 'processing' && <button type="button" onClick={onClose} aria-label="Close checkout" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/10 text-lg text-white/65 transition hover:border-fuchsia-200/50 hover:text-white">×</button>}
        {phase === 'success' && transaction && registration ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full border border-cyan-200/50 bg-cyan-300/10 text-3xl text-cyan-100 shadow-[0_0_30px_rgba(0,229,255,0.2)]">✓</div>
            <p className="neon-kicker mt-5 text-xs font-black uppercase tracking-[0.2em]">Payment successful</p>
            <h2 id="checkout-title" className="neon-heading mt-2 text-3xl font-black uppercase">You&apos;re registered</h2>
            <p className="mt-2 text-white/65">{event.title}</p>
            <div className="mt-6 rounded-2xl border border-cyan-200/20 bg-[#080817]/80 p-5 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-sm text-white/55">Amount paid</span><span className="text-xl font-black text-cyan-100">₹{transaction.amount}</span></div>
              <dl className="mt-4 grid gap-4 text-xs sm:grid-cols-2"><div><dt className="text-white/40">Transaction ID</dt><dd className="mt-1 break-all font-mono font-bold text-white">{transaction.transactionId}</dd></div><div><dt className="text-white/40">Registration ID</dt><dd className="mt-1 break-all font-mono font-bold text-white">{transaction.registrationId}</dd></div><div><dt className="text-white/40">Pass ID</dt><dd className="mt-1 break-all font-mono font-bold text-fuchsia-100">{registration.passCode}</dd></div><div><dt className="text-white/40">Date</dt><dd className="mt-1 font-semibold text-white/80">{new Date(transaction.createdAt).toLocaleString()}</dd></div></dl>
            </div>
            <p className="mt-4 text-[11px] text-white/40">Demo checkout — no real payment was processed.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><Link href="/registrations" onClick={onClose} className="rounded-full border border-cyan-200/50 bg-cyan-300/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-cyan-100 transition hover:bg-cyan-300/25">View My Registration</Link><Link href="/events" onClick={onClose} className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white/70 transition hover:border-fuchsia-200/40 hover:text-white">Back to Events</Link></div>
          </div>
        ) : phase === 'processing' ? (
          <div className="grid min-h-72 place-items-center py-10 text-center"><div><span className="mx-auto block size-12 animate-spin rounded-full border-2 border-violet-200/20 border-t-cyan-200" /><p id="checkout-title" className="neon-kicker mt-6 text-sm font-black uppercase tracking-[0.2em]">Processing payment...</p><p className="mt-2 text-xs text-white/45">Completing your demo registration</p></div></div>
        ) : (
          <>
            <p className="neon-kicker text-[10px] font-black uppercase tracking-[0.2em]">Secure demo checkout</p>
            <h2 id="checkout-title" className="neon-heading mt-2 pr-8 text-2xl font-black uppercase">LAKSHYA 2026</h2>
            <p className="mt-1 text-xs text-white/45">Demo payment only · No gateway connected</p>
            <div className="mt-5 rounded-2xl border border-violet-300/20 bg-[#080817]/80 p-4">
              <p className="font-bold text-white">{event.title}</p>
              <p className="mt-1 text-xs text-white/50">{new Date(event.startsAt).toLocaleString()} · {event.venue}</p>
              <dl className="mt-4 space-y-2 border-t border-white/10 pt-3 text-xs"><div className="flex justify-between"><dt className="text-white/55">Registration Fee</dt><dd className="font-bold text-white">₹{amount}</dd></div><div className="flex justify-between"><dt className="text-white/55">Platform Fee</dt><dd className="font-bold text-white">₹0</dd></div><div className="flex justify-between border-t border-white/10 pt-2 text-sm"><dt className="font-bold text-white">Total</dt><dd className="font-black text-cyan-100">₹{amount}</dd></div></dl>
            </div>
            <form onSubmit={pay} className="mt-5">
              <fieldset><legend className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">Choose demo payment method</legend><div className="mt-2 grid grid-cols-3 gap-2">
                {(['UPI', 'CARD', 'BANK'] as const).map((item) => <label key={item} className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-2 py-3 text-[10px] font-black uppercase tracking-[0.08em] transition ${method === item ? 'border-cyan-200/55 bg-cyan-300/10 text-cyan-100 shadow-[0_0_18px_rgba(0,229,255,0.1)]' : 'border-white/10 bg-white/2 text-white/45 hover:border-violet-200/30 hover:text-white/75'}`}><input type="radio" name="paymentMethod" value={item} checked={method === item} onChange={() => setMethod(item)} className="accent-cyan-300" />{item === 'BANK' ? 'Net Banking' : item}</label>)}
              </div></fieldset>
              <div className="mt-4 grid gap-3">
                {method === 'UPI' && <label className="grid gap-2 text-xs font-bold text-white/75">UPI ID<input name="upiId" required autoComplete="off" placeholder="yourname@upi" className="neon-focus rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-sm text-white placeholder:text-white/30" /></label>}
                {method === 'CARD' && <><label className="grid gap-2 text-xs font-bold text-white/75">Card Number<input name="cardNumber" required autoComplete="off" inputMode="numeric" maxLength={23} placeholder="0000 0000 0000 0000" className="neon-focus rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-sm text-white placeholder:text-white/30" /></label><label className="grid gap-2 text-xs font-bold text-white/75">Name on Card<input name="cardName" required autoComplete="off" placeholder="Name on card" className="neon-focus rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-sm text-white placeholder:text-white/30" /></label><div className="grid grid-cols-2 gap-3"><label className="grid gap-2 text-xs font-bold text-white/75">Expiry<input name="expiry" required autoComplete="off" type="month" className="neon-focus min-w-0 rounded-xl border border-white/10 bg-[#080817] px-3 py-3 text-sm text-white" /></label><label className="grid gap-2 text-xs font-bold text-white/75">CVV<input name="cvv" required autoComplete="off" inputMode="numeric" maxLength={4} type="password" placeholder="•••" className="neon-focus min-w-0 rounded-xl border border-white/10 bg-[#080817] px-3 py-3 text-sm text-white placeholder:text-white/30" /></label></div></>}
                {method === 'BANK' && <label className="grid gap-2 text-xs font-bold text-white/75">Select Bank<select name="bank" required defaultValue="" className="neon-focus rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-sm text-white"><option value="" disabled>Choose a demo bank</option><option>Campus Cooperative Bank</option><option>National Student Bank</option><option>Festival Demo Bank</option></select></label>}
              </div>
              <p className="mt-4 rounded-xl border border-fuchsia-200/15 bg-fuchsia-400/5 px-3 py-2 text-[10px] leading-5 text-white/55">Demo payment — no real money will be charged.<br />Demo checkout — no real payment is processed. Payment details are not saved or sent.</p>
              {error && <p role="alert" className="mt-3 text-xs font-semibold text-rose-300">{error}</p>}
              <button type="submit" className="mt-4 w-full rounded-full border border-cyan-100/55 bg-cyan-300/15 px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-100 shadow-[0_0_24px_rgba(0,229,255,0.12)] transition hover:bg-cyan-300/25 hover:shadow-[0_0_34px_rgba(0,229,255,0.23)]">Pay ₹{amount} &amp; Register</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registration, setRegistration] = useState<DemoRegistration | null>(null);
  const [registerError, setRegisterError] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<DemoTransaction | null>(null);

  useEffect(() => {
    async function load() {
      const { slug } = await params;
      try {
        const result = await api<Event>(`/events/${slug}`, { cache: 'no-store' });
        setEvent(result);
        const existingRegistration = getDemoRegistrations().find((item) => item.eventId === result.id) ?? null;
        setRegistration(existingRegistration);
        setPaymentSuccess(getDemoTransactions().find((item) => item.eventId === result.id) ?? null);
      } catch {
        setError('Event not found.');
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [params]);

  async function register() {
    const token = getDemoSessionToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    if (!event) return;

    if (hasRegisteredEvent(event.id)) {
      setRegistration(getDemoRegistrations().find((item) => item.eventId === event.id) ?? null);
      return;
    }

    if (getEventPrice(event) > 0) {
      setCheckoutOpen(true);
      return;
    }

    try {
      const result = await api<DemoRegistration>(
        '/registrations/register',
        { method: 'POST', body: JSON.stringify({ eventSlug: event.slug }) },
        token,
      );
      setRegistration(result);
      setPaymentSuccess(null);
      setRegisterError('');
    } catch (e) {
      setRegisterError(e instanceof Error ? e.message : 'Unable to register for this event');
    }
  }

  if (loading) return <main className="min-h-screen bg-[#050510] p-8 text-white">Loading event…</main>;
  if (!event) return <main className="min-h-screen bg-[#050510] p-8 text-xl font-semibold text-white">{error || 'Event not found.'}</main>;

  const heroImage = event.category === 'CULTURAL'
    ? 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=90'
    : event.category === 'SPORTS'
      ? 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2000&q=90'
      : event.category === 'MANAGEMENT'
        ? 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=90'
        : 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=90';

  return (
    <main>
      <FestivalNav />
      <section className="relative isolate flex min-h-107.5 items-end overflow-hidden bg-[#050510] md:min-h-140">
        <img src={heroImage} alt={`${event.title} event poster`} className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#050510] via-[#080817]/60 to-[#080817]/10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_40%,rgba(124,58,237,0.32),transparent_45%)]" />
        <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-24 text-white md:px-8 md:pb-14">
          <Link href="/events" className="mb-8 inline-flex text-xs font-bold uppercase tracking-[0.12em] text-white/65 hover:text-cyan-100">← All events</Link>
          <p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">{event.category} {event.department ? `· ${event.department.name}` : ''}</p>
          <h1 className="neon-heading mt-3 max-w-4xl text-5xl font-black uppercase leading-[1.02] tracking-[0.03em] md:text-7xl">{event.title}</h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.08em] text-white/80"><span>{new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(event.startsAt))}</span><span>{new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date(event.startsAt))}{event.endsAt ? ` – ${new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date(event.endsAt))}` : ''}</span><span>{event.venue}</span></div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1fr_360px] md:px-8 md:py-16">
        <div>
          <p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">About the event</p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-[#d8d8ea]">{event.description}</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="neon-panel rounded-2xl p-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200/70">Who can join</p><p className="mt-2 font-bold text-white">{event.department ? `${event.department.name} and all curious minds` : 'Open to all students'}</p></div>
            <div className="neon-panel rounded-2xl p-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-fuchsia-200/70">Entry</p><p className="mt-2 font-bold text-white">{getEventPrice(event) === 0 ? 'FREE' : `₹${getEventPrice(event)}`}</p></div>
          </div>
          {event.rules && <div className="mt-9"><h2 className="text-xl font-black text-white">Participation details</h2><p className="mt-3 whitespace-pre-line leading-7 text-[#aaa9c4]">{event.rules}</p></div>}
        </div>
        <aside className="neon-panel h-fit rounded-2xl p-6 md:sticky md:top-24">
          {registration ? <div className="relative overflow-hidden rounded-xl border border-cyan-200/35 bg-[linear-gradient(145deg,rgba(0,229,255,0.1),rgba(168,85,247,0.09))] p-5 shadow-[0_0_32px_rgba(0,229,255,0.1)]"><span className="absolute right-3 top-2 text-4xl text-cyan-100/20">✓</span><p className="neon-kicker text-xs font-black uppercase tracking-[0.16em]">✓ Registration confirmed</p><p className="mt-2 text-sm text-white/65">Your place is reserved. See you there.</p><dl className="mt-5 space-y-3 border-t border-white/10 pt-4 text-xs">{paymentSuccess && <div><dt className="text-white/45">Payment successful · ₹{paymentSuccess.amount}</dt><dd className="mt-1 break-all font-mono font-bold text-fuchsia-100">{paymentSuccess.transactionId}</dd></div>}<div><dt className="text-white/45">Registration ID</dt><dd className="mt-1 break-all font-mono font-bold text-white">{registration.id}</dd></div><div><dt className="text-white/45">Pass ID</dt><dd className="mt-1 break-all font-mono font-bold text-cyan-100">{registration.passCode}</dd></div></dl><Link href="/registrations" className="mt-5 inline-block text-xs font-bold uppercase tracking-widest text-fuchsia-200 hover:text-white">Open my festival passes ↗</Link></div> : <><p className="text-xs font-black uppercase tracking-[0.16em] text-fuchsia-200">Find your spot</p><h2 className="neon-heading mt-2 text-2xl font-black uppercase">See you there.</h2><div className="mt-5 space-y-3 border-y border-white/10 py-5 text-sm"><p><span className="font-bold text-white">Capacity</span><span className="float-right text-white/55">{event.capacity ? `${event.capacity} spots` : 'Open'}</span></p><p><span className="font-bold text-white">Registration</span><span className="float-right text-cyan-200">Open</span></p><p><span className="font-bold text-white">Entry fee</span><span className="float-right text-white/55">{getEventPrice(event) === 0 ? 'FREE' : `₹${getEventPrice(event)}`}</span></p></div><button type="button" onClick={register} className="mt-5 w-full rounded-full border border-cyan-200/55 bg-cyan-300/15 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_24px_rgba(0,229,255,0.15)] transition hover:bg-cyan-300/25 hover:shadow-[0_0_34px_rgba(0,229,255,0.25)]">{getEventPrice(event) === 0 ? 'Register Now →' : `Register Now · ₹${getEventPrice(event)}`}</button><p className="mt-3 text-center text-xs text-white/40">{getEventPrice(event) === 0 ? 'Free registration · No payment needed' : 'Demo checkout · No real payment processed'}</p>{registerError && <p role="alert" className="mt-3 text-sm font-semibold text-rose-300">{registerError}</p>}</>}
        </aside>
      </section>
      {checkoutOpen && <DemoCheckout event={event} onClose={() => setCheckoutOpen(false)} onSuccess={(nextRegistration, transaction) => { setRegistration(nextRegistration); setPaymentSuccess(transaction); }} />}
      <FestivalFooter />
    </main>
  );
}
