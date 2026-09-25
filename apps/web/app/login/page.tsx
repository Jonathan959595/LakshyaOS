'use client';

import Link from 'next/link';
import { useState } from 'react';
import { api } from '../../lib/api';
import { setDemoSessionToken } from '../../lib/demo-store';

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
    <main className="mx-auto max-w-md p-8">
      <Link href="/" className="text-2xl font-black tracking-tight">Lakshya<span className="text-[#ff5b47]">OS</span></Link>
      <h1 className="mt-6 text-4xl font-black">Welcome back</h1>
      <p className="mt-3 text-sm text-[#514864]">Demo mode is enabled. Use your created student account to continue.</p>
      <form action={submit} className="mt-8 grid gap-4">
        <input required name="email" type="email" placeholder="Email" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <input required name="password" type="password" placeholder="Password" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <button className="rounded-xl bg-[#1f1730] p-3 font-bold text-white">Sign in</button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
      <p className="mt-6 text-sm text-[#514864]">
        New here? <Link href="/signup" className="font-bold text-[#7046db]">Create an account</Link>
      </p>
    </main>
  );
}
