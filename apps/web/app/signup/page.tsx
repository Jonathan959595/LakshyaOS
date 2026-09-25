'use client';

import Link from 'next/link';
import { useState } from 'react';
import { api } from '../../lib/api';
import { setDemoSessionToken } from '../../lib/demo-store';

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
    <main className="mx-auto max-w-lg p-8">
      <Link href="/" className="text-2xl font-black tracking-tight">Lakshya<span className="text-[#ff5b47]">OS</span></Link>
      <h1 className="mt-6 text-4xl font-black">Join LakshyaOS</h1>
      <form action={submit} className="mt-8 grid gap-4">
        <input required name="name" placeholder="Full name" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <input required name="email" type="email" placeholder="Email" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <input required name="password" type="password" minLength={8} placeholder="Password (8+ characters)" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <input required name="studentId" placeholder="Student ID" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <input required name="department" placeholder="Department" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <input required name="year" type="number" min={1} max={8} placeholder="Year" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
        <button className="rounded-xl bg-[#ff5b47] p-3 font-bold text-white">Create account</button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
      <p className="mt-6 text-sm text-[#514864]">
        Already have an account? <Link href="/login" className="font-bold text-[#7046db]">Log in</Link>
      </p>
    </main>
  );
}
