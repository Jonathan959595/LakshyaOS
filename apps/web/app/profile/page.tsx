'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

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
  const [profile, setProfile] = useState<Profile>();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('lakshyaos_token');
    if (!token) {
      location.href = '/login';
      return;
    }

    api<Profile>('/profile', { cache: 'no-store' }, token)
      .then(setProfile)
      .catch(() => setError('Unable to load your profile. Please log in again.'));
  }, []);

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

      <section className="rounded-[32px] border border-[#1f1730]/10 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold tracking-[0.2em] text-[#ff5b47]">MY FESTIVAL</p>
        <h1 className="mt-2 text-5xl font-black tracking-[-0.05em]">{profile?.name ?? 'Loading…'}</h1>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#fffaf4] p-4"><p className="text-sm text-[#514864]">Email</p><p className="mt-1 font-semibold">{profile?.email ?? '—'}</p></div>
          <div className="rounded-2xl bg-[#fffaf4] p-4"><p className="text-sm text-[#514864]">Phone</p><p className="mt-1 font-semibold">{profile?.phone ?? '—'}</p></div>
          <div className="rounded-2xl bg-[#fffaf4] p-4"><p className="text-sm text-[#514864]">College</p><p className="mt-1 font-semibold">{profile?.college ?? 'Add your college'}</p></div>
          <div className="rounded-2xl bg-[#fffaf4] p-4"><p className="text-sm text-[#514864]">Department</p><p className="mt-1 font-semibold">{profile?.departmentName ?? '—'}</p></div>
          <div className="rounded-2xl bg-[#fffaf4] p-4"><p className="text-sm text-[#514864]">Student ID</p><p className="mt-1 font-semibold">{profile?.studentId ?? '—'}</p></div>
          <div className="rounded-2xl bg-[#fffaf4] p-4"><p className="text-sm text-[#514864]">Year</p><p className="mt-1 font-semibold">{profile?.year ?? '—'}</p></div>
        </div>
      </section>
    </main>
  );
}
