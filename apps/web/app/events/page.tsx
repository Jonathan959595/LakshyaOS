import { EventExplorer, FestivalFooter, FestivalNav } from '../../components/festival-ui';
import { demoEvents } from '../../lib/mock-data';

export default function EventsPage() {
  return (
    <main>
      <FestivalNav />
      <section className="relative overflow-hidden border-b border-violet-300/15 bg-[#080817] px-6 py-14 text-white md:px-8 md:py-20">
        <div className="absolute -right-20 -top-36 size-96 rounded-full border border-fuchsia-300/20 shadow-[0_0_100px_rgba(168,85,247,0.12)]" />
        <div className="relative mx-auto max-w-7xl"><p className="neon-kicker text-xs font-bold uppercase tracking-[0.2em]">The festival starts here</p><h1 className="neon-heading mt-3 text-5xl font-black uppercase tracking-[0.03em] md:text-7xl">Pick your moment.</h1><p className="mt-4 max-w-xl text-[#aaa9c4]">Big-stage energy, friendly rivalries, bright ideas, and everything in between.</p></div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16"><EventExplorer events={demoEvents} /></section>
      <FestivalFooter />
    </main>
  );
}
