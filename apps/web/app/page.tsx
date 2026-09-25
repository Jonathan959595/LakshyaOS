import Link from 'next/link';
import { EventCard, EventExplorer, FestivalFooter, FestivalNav } from '../components/festival-ui';
import { demoEvents } from '../lib/mock-data';

export default function HomePage() {
  const featuredEvents = demoEvents.filter((event) => event.isFlagship);

  return (
    <main>
      <FestivalNav />
      <section className="relative isolate flex min-h-170 items-end overflow-hidden bg-[#050510] md:min-h-190">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=90" alt="A festival crowd gathered beneath a glowing concert stage" className="absolute inset-0 -z-20 size-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,5,16,0.94)_0%,rgba(8,8,23,0.72)_48%,rgba(8,8,23,0.22)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_48%,rgba(124,58,237,0.34),transparent_35%),radial-gradient(ellipse_at_20%_80%,rgba(0,229,255,0.12),transparent_32%)]" />
        <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full bg-linear-to-t from-[#050510] to-transparent" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-size-[70px_70px] mask-[linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="mx-auto grid w-full max-w-7xl items-end gap-8 px-6 pb-14 pt-28 text-white md:px-8 md:pb-20 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-[#09091b]/70 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-md"><span className="size-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_#00e5ff]" /> The campus comes alive · October 2026</p>
          <h1 className="neon-heading mt-7 max-w-4xl text-6xl font-black leading-[0.84] tracking-[0.02em] md:text-8xl lg:text-9xl"><span className="block">LAKSHYA</span><span className="mt-2 block bg-linear-to-r from-cyan-200 via-white to-fuchsia-300 bg-clip-text text-transparent">2026</span></h1>
          <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-white md:text-2xl">Where ideas collide.<br className="hidden sm:block" /> Where talent takes the stage.</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 md:text-base">One campus. Countless ways to make your mark. Find your arena and bring your people.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="#find-events" className="rounded-full border border-cyan-100/70 bg-cyan-300/90 px-6 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-[#07101b] shadow-[0_0_26px_rgba(0,229,255,0.28)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_38px_rgba(0,229,255,0.42)]">Explore Events <span aria-hidden="true">↘</span></Link><Link href="/signup" className="rounded-full border border-fuchsia-200/55 bg-fuchsia-400/10 px-6 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-fuchsia-100 backdrop-blur transition hover:bg-fuchsia-400/20 hover:shadow-[0_0_24px_rgba(255,43,214,0.16)]">Register Now</Link></div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/65"><span className="text-cyan-200">30+ Events</span><span>Tech · Culture · Sports · Quiz · Business</span></div>
          </div>
          <div className="relative hidden min-h-105 items-center justify-center lg:flex" aria-hidden="true">
            <div className="neon-orbit absolute size-97.5 rounded-full border border-fuchsia-300/30 shadow-[0_0_75px_rgba(168,85,247,0.2),inset_0_0_70px_rgba(168,85,247,0.1)]" />
            <div className="neon-orbit-reverse absolute size-77.5 rounded-full border border-cyan-200/30 shadow-[0_0_45px_rgba(0,229,255,0.14)]" />
            <div className="absolute size-56.25 rounded-full border border-fuchsia-300/25" />
            <div className="absolute h-107.5 w-0.5 rotate-35 bg-linear-to-b from-transparent via-cyan-200/70 to-transparent blur-[1px]" />
            <div className="absolute h-107.5 w-0.5 -rotate-35 bg-linear-to-b from-transparent via-fuchsia-300/70 to-transparent blur-[1px]" />
            <div className="relative text-center"><span className="block text-[10px] font-black uppercase tracking-[0.4em] text-cyan-200">Campus Comes Alive</span><span className="neon-heading block text-[190px] font-black leading-none">'26</span><span className="mx-auto mt-2 block h-px w-28 bg-linear-to-r from-transparent via-cyan-200 to-transparent" /><span className="mt-3 block text-xs font-bold uppercase tracking-[0.22em] text-white/70">The night is yours</span></div>
            <div className="absolute right-0 top-12 rotate-6 rounded-xl border border-fuchsia-300/35 bg-[#09091b]/75 px-4 py-3 shadow-[0_0_30px_rgba(255,43,214,0.14)] backdrop-blur"><span className="block text-[9px] font-black uppercase tracking-widest text-fuchsia-200">Main stage</span><span className="mt-1 block text-sm font-black text-white">16—30 OCT</span></div>
            <div className="absolute bottom-8 left-0 -rotate-6 rounded-xl border border-cyan-200/35 bg-[#09091b]/75 px-4 py-3 shadow-[0_0_30px_rgba(0,229,255,0.12)] backdrop-blur"><span className="block text-[9px] font-black uppercase tracking-widest text-cyan-200">Find your arena</span><span className="mt-1 block text-sm font-black text-white">30+ EXPERIENCES</span></div>
          </div>
        </div>
      </section>
      <section className="border-y border-violet-300/10 bg-[#080817] px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">The big moments</p><h2 className="neon-heading mt-2 text-3xl font-black uppercase tracking-[0.06em] md:text-4xl">Featured Events</h2></div><Link href="/events" className="text-xs font-extrabold uppercase tracking-[0.12em] text-fuchsia-200 hover:text-white">See all events ↗</Link></div>
        <div className="grid gap-5 lg:grid-cols-3">{featuredEvents.map((event) => <EventCard key={event.id} event={event} featured />)}</div>
        </div>
      </section>
      <section className="border-b border-violet-300/10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.12),transparent_55%)] px-6 py-16 md:px-8 md:py-20"><div className="mx-auto max-w-7xl"><EventExplorer events={demoEvents} /></div></section>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8 md:py-20">
        <div><p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">More than a festival</p><h2 className="neon-heading mt-3 text-4xl font-black leading-tight">Make room for the unexpected.</h2><p className="mt-4 max-w-lg leading-7 text-[#aaa9c4]">From a robot in the arena to your first song on stage, Lakshya brings the whole campus together to try something new.</p><Link href="/about" className="mt-6 inline-flex rounded-full border border-cyan-200/40 bg-cyan-300/10 px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-cyan-100 transition hover:bg-cyan-300/20">Get to know the festival</Link></div>
        <div className="grid grid-cols-2 gap-3"><img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=85" alt="Friends sharing a festival meal" className="h-48 w-full rounded-2xl object-cover md:h-64" /><img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85" alt="Live performance under bright lights" className="mt-8 h-48 w-full rounded-2xl object-cover md:h-64" /></div>
      </section>
      <FestivalFooter />
    </main>
  );
}
