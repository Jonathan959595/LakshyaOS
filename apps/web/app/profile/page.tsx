'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { getDemoSessionToken } from '../../lib/demo-store';

type Profile = {
  name: string;
  email: string;
  college: string | null;
  departmentName: string | null;
  year: number | null;
  phone: string | null;
  studentId: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = getDemoSessionToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    api<Profile>('/profile', { cache: 'no-store' }, token)
      .then(setProfile)
      .catch(() => setError('Unable to load your profile. Please log in again.'));
  }, []);

  async function saveProfile(form: FormData) {
    const token = getDemoSessionToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      college: String(form.get('college') ?? ''),
      departmentName: String(form.get('departmentName') ?? ''),
      studentId: String(form.get('studentId') ?? ''),
      year: Number(form.get('year') ?? 1),
    };

    try {
      const updated = await api<Profile>('/profile', { method: 'PATCH', body: JSON.stringify(payload) }, token);
      setProfile(updated);
      setStatus('Profile saved in demo mode.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save profile');
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-black tracking-tight">Lakshya<span className="text-[#ff5b47]">OS</span></Link>
        <div className="flex gap-3 text-sm font-semibold">
          <Link href="/events" className="rounded-full border px-4 py-2">Events</Link>
          <Link href="/registrations" className="rounded-full border px-4 py-2">My Registrations</Link>
          <Link href="/profile" className="rounded-full bg-[#1f1730] px-4 py-2 text-white">Profile</Link>
        </div>
      </nav>

      {error && <p className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
      {status && <p className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">{status}</p>}

      <section className="rounded-4xl border border-[#1f1730]/10 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold tracking-[0.2em] text-[#ff5b47]">MY FESTIVAL</p>
        <h1 className="mt-2 text-5xl font-black tracking-tighter">{profile?.name ?? 'Loading…'}</h1>

        <form action={saveProfile} className="mt-8 grid gap-4 md:grid-cols-2">
          <input defaultValue={profile?.name ?? ''} name="name" placeholder="Full name" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
          <input defaultValue={profile?.email ?? ''} name="email" type="email" placeholder="Email" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
          <input defaultValue={profile?.phone ?? ''} name="phone" placeholder="Phone" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
          <input defaultValue={profile?.college ?? ''} name="college" placeholder="College" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
          <input defaultValue={profile?.studentId ?? ''} name="studentId" placeholder="Student ID" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
          <input defaultValue={profile?.departmentName ?? ''} name="departmentName" placeholder="Department" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
          <input defaultValue={profile?.year ?? 1} name="year" type="number" min={1} max={8} placeholder="Year" className="rounded-xl border border-[#1f1730]/10 bg-white p-3" />
          <div className="md:col-span-2 mt-2">
            <button type="submit" className="rounded-full bg-[#1f1730] px-5 py-3 font-bold text-white">Save profile</button>
          </div>
        </form>
      </section>
    </main>
  );
}
