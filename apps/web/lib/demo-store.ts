export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  college: string | null;
  studentId: string | null;
  departmentName: string | null;
  year: number | null;
  role: 'STUDENT';
};

export type DemoRegistration = {
  id: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  eventCategory: string;
  venue: string;
  startsAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'WAITLISTED' | 'CANCELLED';
  passCode: string;
  createdAt: string;
  paymentStatus: 'PAID' | 'PENDING';
};

const USER_KEY = 'lakshyaos_demo_user';
const TOKEN_KEY = 'lakshyaos_demo_token';
const REG_KEY = 'lakshyaos_demo_registrations';

const browser = () => typeof window !== 'undefined';

function readJson<T>(key: string, fallback: T): T {
  if (!browser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (!browser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDemoSessionToken(): string | null {
  if (!browser()) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setDemoSessionToken(token: string): void {
  if (!browser()) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearDemoSession(): void {
  if (!browser()) return;
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getDemoUser(): DemoUser | null {
  return readJson<DemoUser | null>(USER_KEY, null);
}

export function saveDemoUser(user: DemoUser): void {
  writeJson(USER_KEY, user);
}

export function updateDemoUser(patch: Partial<DemoUser>): DemoUser | null {
  const current = getDemoUser();
  if (!current) return null;
  const next = { ...current, ...patch };
  saveDemoUser(next);
  return next;
}

export function getDemoRegistrations(): DemoRegistration[] {
  return readJson<DemoRegistration[]>(REG_KEY, []);
}

export function addDemoRegistration(registration: DemoRegistration): DemoRegistration[] {
  const current = getDemoRegistrations();
  const exists = current.some((item) => item.eventId === registration.eventId);
  if (exists) {
    return current;
  }
  const next = [registration, ...current];
  writeJson(REG_KEY, next);
  return next;
}

export function hasRegisteredEvent(eventId: string): boolean {
  return getDemoRegistrations().some((item) => item.eventId === eventId);
}

export function createDemoToken(user: Pick<DemoUser, 'email' | 'id'>): string {
  return `demo-token-${user.id}-${user.email}`;
}

export function ensureDemoUser(seedUser?: Partial<DemoUser>): DemoUser {
  const current = getDemoUser();
  if (current) return current;

  const fallback: DemoUser = {
    id: 'demo-user-1',
    name: 'Lakshya Demo Student',
    email: 'demo@lakshyaos.test',
    password: 'demo1234',
    phone: '+919999999999',
    college: 'Lakshya Institute of Technology',
    studentId: 'LIT-2026-101',
    departmentName: 'Computer Science',
    year: 2,
    role: 'STUDENT',
    ...seedUser,
  };

  saveDemoUser(fallback);
  setDemoSessionToken(createDemoToken(fallback));
  return fallback;
}
