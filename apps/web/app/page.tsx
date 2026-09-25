'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_8%_4%,#ffd79b,transparent_25%),radial-gradient(circle_at_88%_18%,#d5b8ff,transparent_30%),#fffaf4] px-6 py-8 text-[#1f1730] md:px-12">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="text-xl font-black tracking-tight">Lakshya<span className="text-[#ff5b47]">OS</span></span>
        <span className="rounded-full border border-[#1f1730]/10 bg-white/60 px-4 py-2 text-sm font-medium">Festival platform · Foundation</span>
      </nav>
      <section className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center py-20">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-5 text-sm font-bold tracking-[0.2em] text-[#ff5b47]">COMING INTO FOCUS</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-4xl text-6xl font-black leading-[0.95] tracking-[-0.06em] md:text-8xl">One festival.<br /><span className="text-[#7046db]">Every possibility.</span></motion.h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-[#514864]">LakshyaOS is being built as one joyful, dependable place to discover events, register, and make your festival count.</p>
        <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold"><span className="rounded-full bg-[#1f1730] px-5 py-3 text-white">Public festival experience</span><span className="rounded-full border border-[#1f1730]/10 bg-white px-5 py-3">Student registrations</span><span className="rounded-full border border-[#1f1730]/10 bg-white px-5 py-3">Coordinator tools</span></div>
      </section>
      <footer className="mx-auto max-w-6xl border-t border-[#1f1730]/10 pt-5 text-sm text-[#514864]">The product foundation is live. Event discovery is next.</footer>
    </main>
  );
}
