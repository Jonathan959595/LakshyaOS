import { demoGallery } from '../../lib/mock-data';
import { FestivalFooter, FestivalNav } from '../../components/festival-ui';

export default function GalleryPage() {
  return (
    <main>
      <FestivalNav />
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20"><p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">The festival photo wall</p><h1 className="neon-heading mt-3 text-5xl font-black uppercase tracking-[0.03em] md:text-7xl">Campus, in full color.</h1><p className="mt-4 max-w-xl leading-7 text-[#aaa9c4]">The lights, the noise, the people you came with, and the ones you met along the way.</p></section>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 pb-16 sm:grid-cols-2 md:grid-cols-4 md:px-8 md:pb-20">
        {demoGallery.map((item, index) => <figure key={item.id} className={`group relative overflow-hidden rounded-2xl border border-violet-300/20 bg-[#0d0b1f] shadow-[0_18px_60px_-40px_rgba(168,85,247,0.3)] ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : index === 3 ? 'md:translate-y-8' : ''}`}><img src={item.imageUrl} alt={item.alt} className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index === 0 ? 'h-80 sm:h-full sm:min-h-[500px]' : 'h-64'}`} /><div className="absolute inset-0 bg-linear-to-t from-[#050510]/85 via-[#080817]/5 to-transparent opacity-85 transition group-hover:opacity-100" /><div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 group-hover:shadow-[inset_0_0_0_1px_rgba(0,229,255,0.38)]" /><figcaption className="absolute bottom-0 p-5 text-white"><span className="block text-lg font-black uppercase tracking-[0.04em]">{item.caption}</span><span className="neon-kicker mt-1 block text-[9px] font-bold uppercase tracking-[0.18em]">LAKSHYA '26</span></figcaption></figure>)}
      </section>
      <FestivalFooter />
    </main>
  );
}