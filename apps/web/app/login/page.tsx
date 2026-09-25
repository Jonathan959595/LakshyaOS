'use client';

import Link from 'next/link';
import { useState } from 'react';
import { api } from '../../lib/api';
import { setDemoSessionToken } from '../../lib/demo-store';
import { FestivalFooter, FestivalNav } from '../../components/festival-ui';

export default function LoginPage() {
  const [error, setError] = useState('');

  async function submit(form: FormData) {
    try {
      const email = String(form.get('email') ?? '').trim();
      const password = String(form.get('password') ?? '');
      const result = await api<{ accessToken: string; user?: { email?: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setDemoSessionToken(result.accessToken);
      window.location.href = '/profile';
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to sign in');
    }
  }

  return (
    <main className="min-h-[70vh]">
      <FestivalNav />
      <section className="mx-auto max-w-xl px-6 py-12 md:py-20">
        <div className="neon-panel rounded-2xl p-7 md:p-10">
          <p className="neon-kicker text-xs font-black uppercase tracking-[0.2em]">Enter the fest</p><h1 className="neon-heading mt-3 text-4xl font-black uppercase">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-[#aaa9c4]">Sign in to find your saved events and festival passes.</p>
          <form action={submit} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-white/85" htmlFor="login-email">Email<input id="login-email" required name="email" type="email" placeholder="you@example.com" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <label className="grid gap-2 text-sm font-bold text-white/85" htmlFor="login-password">Password<input id="login-password" required name="password" type="password" placeholder="Your password" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 font-normal text-white placeholder:text-white/30" /></label>
            <button className="mt-2 rounded-full border border-cyan-200/50 bg-cyan-300/15 p-3 text-xs font-black uppercase tracking-widest text-cyan-100 shadow-[0_0_22px_rgba(0,229,255,0.12)] transition hover:bg-cyan-300/25 hover:shadow-[0_0_32px_rgba(0,229,255,0.2)]">Sign in</button>
            {error && <p role="alert" className="text-sm font-semibold text-rose-300">{error}</p>}
          </form>
          <p className="mt-6 text-sm text-white/55">New to Lakshya? <Link href="/signup" className="font-bold text-fuchsia-200">Create your festival account</Link></p>
        </div>
      </section>
      <FestivalFooter />
    </main>
  );
}
