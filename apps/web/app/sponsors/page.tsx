import Link from 'next/link';
import { demoSponsors } from '../../lib/mock-data';
import { FestivalFooter, FestivalNav } from '../../components/festival-ui';

const tierStyles: Record<string, string> = { Platinum: 'border-cyan-300/35 shadow-[0_0_35px_rgba(0,229,255,0.08)]', Gold: 'border-amber-300/25', Silver: 'border-violet-300/20' };

export default function SponsorsPage() {
  return (
    <main>
      <FestivalNav />
      <section className="relative overflow-hidden border-b border-fuchsia-300/15 bg-[#080817] px-6 py-16 text-white md:px-8 md:py-24"><div className="absolute -right-24 -top-40 size-120 rounded-full border border-cyan-200/15 shadow-[0_0_100px_rgba(0,229,255,0.08)]" /><div className="relative mx-auto max-w-7xl"><p className="neon-kicker text-xs font-bold uppercase tracking-[0.2em]">Good people. Big nights.</p><h1 className="neon-heading mt-3 text-5xl font-black uppercase tracking-[0.03em] md:text-7xl">Powering the fest.</h1><p className="mt-5 max-w-xl leading-7 text-[#aaa9c4]">The partners bringing every stage, spark, and shared memory to life.</p></div></section>
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20"><div className="mb-8 flex items-center gap-4"><span className="h-px flex-1 bg-linear-to-r from-transparent via-violet-300/40 to-transparent" /><p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-200">Our festival partners</p><span className="h-px flex-1 bg-linear-to-r from-transparent via-violet-300/40 to-transparent" /></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{demoSponsors.map((sponsor) => <article key={sponsor.name} className={`neon-panel flex min-h-56 flex-col justify-between rounded-2xl border p-6 ${tierStyles[sponsor.tier] ?? 'border-violet-300/20'}`}><span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/55">{sponsor.tier} partner</span><div><p className="neon-heading text-2xl font-black uppercase tracking-[0.04em]">{sponsor.name}</p><Link href={sponsor.website} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-bold uppercase tracking-[0.12em] text-cyan-200 hover:text-white">Visit partner ↗</Link></div></article>)}</div><p className="mt-12 text-center text-sm text-[#aaa9c4]">Interested in joining the celebration? <a href="mailto:hello@lakshya2026.in" className="font-bold text-fuchsia-200 hover:text-white">Talk to our festival team</a>.</p></section>
      <FestivalFooter />
    </main>
  );
}