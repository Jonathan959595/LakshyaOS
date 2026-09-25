'use client';

import Link from 'next/link';
import { useState } from 'react';
import { api } from '../../lib/api';
import { setDemoSessionToken } from '../../lib/demo-store';
import { FestivalFooter, FestivalNav } from '../../components/festival-ui';

export default function SignupPage() {
  const [error, setError] = useState('');

  async function submit(form: FormData) {
    try {
      const payload = {
        name: String(form.get('name') ?? '').trim(),
        email: String(form.get('email') ?? '').trim(),
        password: String(form.get('password') ?? ''),
        studentId: String(form.get('studentId') ?? '').trim(),
        department: String(form.get('department') ?? '').trim(),
        year: Number(form.get('year') ?? 1),
      };
      const result = await api<{ accessToken: string }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setDemoSessionToken(result.accessToken);
      window.location.href = '/profile';
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to create account');
    }
  }

  return (
    <main>
      <FestivalNav />
      <section className="mx-auto max-w-2xl px-6 py-12 md:py-20">
        <div className="neon-panel rounded-2xl p-7 md:p-10">
          <p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">Enter the fest</p><h1 className="neon-heading mt-3 text-4xl font-black uppercase">Create your Lakshya profile.</h1><p className="mt-3 text-sm leading-6 text-[#aaa9c4]">Create your student account, then start collecting festival moments.</p>
          <form action={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-white/85 sm:col-span-2" htmlFor="signup-name">Full name<input id="signup-name" required name="name" placeholder="Your name" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <label className="grid gap-2 text-sm font-bold text-white/85 sm:col-span-2" htmlFor="signup-email">Email<input id="signup-email" required name="email" type="email" placeholder="you@example.com" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <label className="grid gap-2 text-sm font-bold text-white/85 sm:col-span-2" htmlFor="signup-password">Password<input id="signup-password" required name="password" type="password" minLength={8} placeholder="At least 8 characters" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <label className="grid gap-2 text-sm font-bold text-white/85" htmlFor="signup-student-id">Student ID<input id="signup-student-id" required name="studentId" placeholder="Student ID" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <label className="grid gap-2 text-sm font-bold text-white/85" htmlFor="signup-department">Department<input id="signup-department" required name="department" placeholder="Department" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <label className="grid gap-2 text-sm font-bold text-white/85" htmlFor="signup-year">Year<input id="signup-year" required name="year" type="number" min={1} max={8} placeholder="Year" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <button className="self-end rounded-full border border-fuchsia-200/50 bg-fuchsia-400/15 p-3 text-xs font-black uppercase tracking-widest text-fuchsia-100 shadow-[0_0_22px_rgba(255,43,214,0.1)] transition hover:bg-fuchsia-400/25">Create account</button>
            {error && <p role="alert" className="text-sm font-semibold text-rose-300 sm:col-span-2">{error}</p>}
          </form>
          <p className="mt-6 text-sm text-white/55">Already registered? <Link href="/login" className="font-bold text-cyan-200">Sign in</Link></p>
        </div>
      </section>
      <FestivalFooter />
    </main>
  );
}
