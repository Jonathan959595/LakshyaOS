'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { getDemoSessionToken } from '../../lib/demo-store';
import { FestivalFooter, FestivalNav } from '../../components/festival-ui';

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
    <main>
      <FestivalNav />
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">

      {error && <p className="mb-5 rounded-2xl border border-rose-300/30 bg-rose-400/10 p-4 text-rose-200">{error}</p>}
      {status && <p className="mb-5 rounded-2xl border border-cyan-300/30 bg-cyan-400/10 p-4 text-cyan-100">{status}</p>}

      <div className="neon-panel rounded-2xl p-6 md:p-8">
        <p className="neon-kicker text-xs font-bold tracking-[0.2em]">YOUR FESTIVAL ACCOUNT</p>
        <h1 className="neon-heading mt-2 text-4xl font-black uppercase tracking-[0.03em] md:text-5xl">{profile?.name ?? 'Loading…'}</h1>

        <form action={saveProfile} className="mt-8 grid gap-4 md:grid-cols-2">
          <input defaultValue={profile?.name ?? ''} name="name" placeholder="Full name" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 text-white placeholder:text-white/35" />
          <input defaultValue={profile?.email ?? ''} name="email" type="email" placeholder="Email" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 text-white placeholder:text-white/35" />
          <input defaultValue={profile?.phone ?? ''} name="phone" placeholder="Phone" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 text-white placeholder:text-white/35" />
          <input defaultValue={profile?.college ?? ''} name="college" placeholder="College" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 text-white placeholder:text-white/35" />
          <input defaultValue={profile?.studentId ?? ''} name="studentId" placeholder="Student ID" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 text-white placeholder:text-white/35" />
          <input defaultValue={profile?.departmentName ?? ''} name="departmentName" placeholder="Department" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 text-white placeholder:text-white/35" />
          <input defaultValue={profile?.year ?? 1} name="year" type="number" min={1} max={8} placeholder="Year" className="neon-focus rounded-xl border border-white/10 bg-[#080817] p-3 text-white placeholder:text-white/35" />
          <div className="md:col-span-2 mt-2">
            <button type="submit" className="rounded-full border border-cyan-200/45 bg-cyan-300/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-cyan-100 transition hover:bg-cyan-300/20">Save profile</button>
          </div>
        </form>
      </div>
      </section>
      <FestivalFooter />
    </main>
  );
}
