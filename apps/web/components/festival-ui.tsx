'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getEventPrice, type DemoEvent } from '../lib/mock-data';
import { getDemoSessionToken } from '../lib/demo-store';

const eventImages: Record<string, string> = {
  TECHNICAL: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
  CULTURAL: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
  SPORTS: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85',
  MANAGEMENT: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
  OTHER: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85',
};

const categoryColors: Record<string, string> = {
  TECHNICAL: 'border border-cyan-300/35 bg-cyan-300/10 text-cyan-200',
  CULTURAL: 'border border-fuchsia-300/35 bg-fuchsia-300/10 text-fuchsia-200',
  SPORTS: 'border border-lime-300/35 bg-lime-300/10 text-lime-200',
  MANAGEMENT: 'border border-amber-300/35 bg-amber-300/10 text-amber-200',
  OTHER: 'border border-violet-300/35 bg-violet-300/10 text-violet-200',
};

export function FestivalNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => setSignedIn(Boolean(getDemoSessionToken())), []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/sponsors', label: 'Sponsors' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070713]/80 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3.5 md:px-8" aria-label="Main navigation">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Lakshya 2026 home">
          <span className="grid size-10 place-items-center rounded-xl border border-cyan-300/50 bg-cyan-300/10 text-xs font-black text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.16)]">L'26</span>
          <span className="leading-none"><span className="block text-base font-black tracking-[0.08em]">LAKSHYA <span className="text-fuchsia-300">'26</span></span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">Campus Comes Alive</span></span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-cyan-200">{link.label}</Link>)}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Link href="/registrations" className="rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white/65 transition hover:text-fuchsia-200">My Registrations</Link>
          <Link href={signedIn ? '/profile' : '/login'} className="rounded-full border border-fuchsia-300/55 bg-fuchsia-400/10 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-fuchsia-200 hover:bg-fuchsia-400/20 hover:shadow-[0_0_20px_rgba(255,43,214,0.18)]">{signedIn ? 'Profile' : 'Login'}</Link>
        </div>

        <button type="button" className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-lg text-cyan-100 lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? '×' : '☰'}
        </button>
      </nav>
      {menuOpen && <div className="border-t border-white/10 bg-[#080817] px-5 py-4 lg:hidden">
        <div className="mx-auto grid max-w-7xl gap-1">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-white/70 hover:bg-white/5 hover:text-cyan-200">{link.label}</Link>)}
          <Link href="/registrations" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-white/70 hover:bg-white/5">My Registrations</Link>
          <Link href={signedIn ? '/profile' : '/login'} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-xs font-extrabold uppercase tracking-widest text-fuchsia-200">{signedIn ? 'Profile' : 'Login'}</Link>
        </div>
      </div>}
    </header>
  );
}

export function FestivalFooter() {
  return (
    <footer className="border-t border-violet-300/15 bg-[#070713] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="text-3xl font-black tracking-[0.08em]">LAKSHYA <span className="text-cyan-200">'26</span></p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#aaa9c4]">Three days of ideas, competition, culture, and campus memories. See you at the festival.</p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.14em] text-white/35">Powered by LakshyaOS</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-200/75">Quick links</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/65">
            <Link href="/events" className="hover:text-cyan-100">Events</Link><Link href="/about" className="hover:text-cyan-100">About</Link>
            <Link href="/gallery" className="hover:text-cyan-100">Gallery</Link><Link href="/sponsors" className="hover:text-cyan-100">Sponsors</Link>
            <Link href="/registrations" className="hover:text-cyan-100">My registrations</Link><Link href="/login" className="hover:text-cyan-100">Login</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-200/75">Contact</h2>
          <a href="mailto:hello@lakshya2026.in" className="mt-4 inline-block text-sm text-white/65 hover:text-white">hello@lakshya2026.in</a>
          <p className="mt-2 text-sm text-white/45">Lakshya Institute of Technology</p>
        </div>
      </div>
      <div className="border-t border-violet-300/10 px-6 py-4 text-center text-xs text-white/35">© 2026 Lakshya Festival · Made for campus, made together</div>
    </footer>
  );
}

export function EventCard({ event, featured = false }: { event: DemoEvent; featured?: boolean }) {
  return (
    <motion.article whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="group overflow-hidden rounded-2xl border border-violet-300/15 bg-[#0d0b1f] shadow-[0_18px_55px_-38px_rgba(0,229,255,0.28)] transition-colors hover:border-cyan-300/55 hover:shadow-[0_0_35px_rgba(0,229,255,0.13)]">
      <Link href={`/events/${event.slug}`} className="block">
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-52'}`}>
          <img src={event.imageUrl || eventImages[event.category] || eventImages.OTHER} alt={`${event.title} event`} className="size-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-linear-to-t from-[#080817]/90 via-[#080817]/10 to-transparent" />
          {event.isFlagship && <span className="absolute left-4 top-4 rounded-full border border-fuchsia-300/50 bg-[#100b24]/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-fuchsia-200 shadow-[0_0_18px_rgba(255,43,214,0.2)]">Flagship</span>}
          <span className="absolute right-4 top-4 rounded-full border border-cyan-200/35 bg-[#080817]/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-100 backdrop-blur">{getEventPrice(event) === 0 ? 'FREE' : `₹${getEventPrice(event)}`}</span>
          <span className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${categoryColors[event.category] ?? categoryColors.OTHER}`}>{event.category}</span>
          <p className="absolute bottom-4 right-4 text-xs font-extrabold uppercase tracking-[0.08em] text-white">{new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date(event.startsAt))}</p>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-black uppercase tracking-[0.04em] text-white group-hover:text-cyan-100">{event.title}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-[#aaa9c4]">{event.shortDescription}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/50">
            <span>{new Intl.DateTimeFormat('en-IN', { weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(event.startsAt))}</span>
            <span className="max-w-[58%] truncate">{event.venue}</span>
          </div>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-cyan-200">{getEventPrice(event) === 0 ? 'FREE · REGISTER' : `₹${getEventPrice(event)} · REGISTER`} <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </motion.article>
  );
}

export function EventExplorer({ events }: { events: DemoEvent[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [department, setDepartment] = useState('All departments');
  const [flagshipsOnly, setFlagshipsOnly] = useState(false);
  const departments = [...new Set(events.map((event) => event.department?.name).filter((name): name is string => Boolean(name)))];
  const categoryFilters = [
    { label: 'All', value: 'ALL' },
    { label: 'Tech', value: 'TECHNICAL' },
    { label: 'Cultural', value: 'CULTURAL' },
    { label: 'Quiz', value: 'QUIZ' },
    { label: 'Business', value: 'MANAGEMENT' },
    { label: 'Sports', value: 'SPORTS' },
  ];
  const filtered = events.filter((event) => {
    const matchesText = `${event.title} ${event.shortDescription} ${event.venue}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'ALL' || event.category === category || (category === 'QUIZ' && event.title.toLowerCase().includes('quiz'));
    return matchesText && matchesCategory && (department === 'All departments' || event.department?.name === department) && (!flagshipsOnly || event.isFlagship);
  });

  return (
    <section id="find-events" className="scroll-mt-24">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div><p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">EXPLORE THE FEST</p><h2 className="neon-heading mt-2 text-3xl font-black uppercase tracking-[0.04em] md:text-4xl">Find your arena.</h2></div>
        <p className="text-sm text-white/50">{events.length} events · Campus Comes Alive</p>
      </div>
      <div className="mt-6 grid gap-3 rounded-2xl border border-violet-300/15 bg-[#0d0b1f] p-4 shadow-[0_16px_55px_-40px_rgba(168,85,247,0.5)] md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center">
        <label className="sr-only" htmlFor="event-search">Search events</label>
        <input id="event-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, venues, and more" className="neon-focus min-w-0 rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-sm text-white placeholder:text-white/35" />
        <label className="sr-only" htmlFor="event-department">Department</label>
        <select id="event-department" value={department} onChange={(event) => setDepartment(event.target.value)} className="neon-focus rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-sm text-white">
          <option>All departments</option>{departments.map((item) => <option key={item}>{item}</option>)}
        </select>
        <label className="flex cursor-pointer items-center gap-2 px-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white/70"><input type="checkbox" checked={flagshipsOnly} onChange={(event) => setFlagshipsOnly(event.target.checked)} className="size-4 accent-fuchsia-400" />Flagships</label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter events by category">
        {categoryFilters.map((filter) => <button key={filter.value} type="button" aria-pressed={category === filter.value} onClick={() => setCategory(filter.value)} className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] transition ${category === filter.value ? 'border-cyan-200/65 bg-cyan-300/15 text-cyan-100 shadow-[0_0_20px_rgba(0,229,255,0.12)]' : 'border-white/10 bg-white/3 text-white/55 hover:border-violet-200/40 hover:text-white/85'}`}>{filter.label}</button>)}
      </div>
      {filtered.length ? <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((event) => <EventCard key={event.id} event={event} />)}</div> : <div className="neon-panel mt-7 rounded-2xl border-dashed px-6 py-12 text-center"><p className="text-lg font-bold text-white">No events match those filters</p><button type="button" onClick={() => { setQuery(''); setCategory('ALL'); setDepartment('All departments'); setFlagshipsOnly(false); }} className="mt-3 text-sm font-bold text-cyan-200">Clear filters</button></div>}
    </section>
  );
}