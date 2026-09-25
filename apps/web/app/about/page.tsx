import { FestivalFooter, FestivalNav } from '../../components/festival-ui';

export default function AboutPage() {
  return (
    <main>
      <FestivalNav />
      <section className="relative isolate overflow-hidden border-b border-violet-300/15 bg-[#080817] px-6 py-24 text-white md:px-8 md:py-32">
        <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=2000&q=85" alt="Students coming together on campus" className="absolute inset-0 -z-20 size-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#050510] via-[#080817]/80 to-[#080817]/25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgba(0,229,255,0.12),transparent_35%)]" />
        <div className="mx-auto max-w-7xl"><p className="neon-kicker text-xs font-bold uppercase tracking-[0.2em]">Campus Comes Alive · 16—30 October</p><h1 className="neon-heading mt-4 max-w-3xl text-5xl font-black uppercase leading-[1.02] tracking-[0.03em] md:text-7xl">About Lakshya</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">A campus turned all the way up. Lakshya brings makers, performers, athletes, curious minds, and the whole student community together for one electric celebration.</p></div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="mb-8 max-w-2xl"><p className="neon-kicker text-xs font-black uppercase tracking-[0.18em]">Four sides of the fest</p><h2 className="neon-heading mt-3 text-3xl font-black uppercase md:text-4xl">Find your kind of energy.</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['01 / TECH', 'Build the impossible.', 'Hack, prototype, experiment, and put your ideas to the test.', 'border-cyan-300/25 text-cyan-200'],
            ['02 / CULTURE', 'Take the stage.', 'Music, dance, theatre, art, and the people who make it magic.', 'border-fuchsia-300/25 text-fuchsia-200'],
            ['03 / COMPETITION', 'Bring your game.', 'Fast rounds, close finishes, and the joy of giving it your all.', 'border-violet-300/30 text-violet-200'],
            ['04 / COMMUNITY', 'Make it ours.', 'Show up for your friends and leave with a few new ones.', 'border-sky-300/25 text-sky-200'],
          ].map(([label, title, description, accent]) => <article key={label} className={`neon-panel rounded-2xl border p-6 ${accent}`}><p className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</p><h3 className="mt-6 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{description}</p></article>)}
        </div>
      </section>
      <section className="border-y border-violet-300/10 bg-[#080817] px-6 py-12 md:px-8"><div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">{[['30+', 'events and experiences'], ['8', 'departments in the mix'], ['1', 'campus, all together']].map(([number, label]) => <div key={label} className="border-l-2 border-cyan-300/70 px-5 py-3"><p className="neon-heading text-4xl font-black">{number}</p><p className="mt-1 text-sm text-white/55">{label}</p></div>)}</div></section>
      <FestivalFooter />
    </main>
  );
}