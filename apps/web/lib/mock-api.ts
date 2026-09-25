import { demoAnnouncements, demoEvents, demoGallery, demoSponsors, getEventPrice } from './mock-data';
import {
  addDemoRegistration,
  createDemoToken,
  DemoRegistration,
  ensureDemoUser,
  getDemoRegistrations,
  getDemoSessionToken,
  getDemoUser,
  saveDemoUser,
  setDemoSessionToken,
  updateDemoUser,
} from './demo-store';

const defaultUser = ensureDemoUser();

function getDemoData<T>(value: T): T {
  return value;
}

function parseBody<T>(body?: BodyInit | null): T | null {
  if (!body) return null;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as T;
    } catch {
      return null;
    }
  }
  return null;
}

export async function mockApiRequest<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();

  if (path === '/events') {
    return { items: demoEvents, pagination: { page: 1, limit: 20, total: demoEvents.length } } as T;
  }

  if (path.startsWith('/events/')) {
    const slug = path.replace('/events/', '');
    const event = demoEvents.find((item) => item.slug === slug);
    if (!event) throw new Error('Event not found');
    return event as T;
  }

  if (path === '/auth/login') {
    const body = parseBody<{ email?: string; password?: string }>(init?.body);
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password ?? '';
    const user = getDemoUser() ?? defaultUser;

    if (email === (user.email || '').toLowerCase() && password === user.password) {
      const tokenValue = createDemoToken(user);
      setDemoSessionToken(tokenValue);
      return { user: { ...user, password: undefined }, accessToken: tokenValue } as T;
    }

    throw new Error('Invalid email or password');
  }

  if (path === '/auth/signup') {
    const body = parseBody<{ name?: string; email?: string; password?: string; studentId?: string; department?: string; year?: number }>(init?.body);
    const email = (body?.email ?? '').trim().toLowerCase();
    const password = body?.password ?? '';
    if (!body?.name || !email || password.length < 8) {
      throw new Error('Please provide your name, email, and a valid password');
    }

    const createdUser = {
      id: `user-${Date.now()}`,
      name: body.name,
      email,
      password,
      studentId: body.studentId ?? `STU-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      departmentName: body.department ?? 'Computer Science',
      year: body.year ?? 1,
      phone: null,
      college: 'Lakshya Institute of Technology',
      role: 'STUDENT' as const,
    };

    saveDemoUser(createdUser);
    const accessToken = createDemoToken(createdUser);
    setDemoSessionToken(accessToken);
    return { user: { ...createdUser, password: undefined }, accessToken } as T;
  }

  if (path === '/profile') {
    const currentUser = getDemoUser() ?? defaultUser;
    if (method === 'PATCH') {
      const body = parseBody<{ name?: string; email?: string; phone?: string; college?: string; studentId?: string; departmentName?: string; year?: number }>(init?.body);
      const updated = updateDemoUser({
        ...currentUser,
        ...body,
        email: body?.email ? body.email.trim().toLowerCase() : currentUser.email,
      }) ?? currentUser;
      return updated as T;
    }
    return currentUser as T;
  }

  if (path === '/registrations/me') {
    const items = getDemoRegistrations();
    return items as T;
  }

  if (path === '/registrations/register') {
    const currentToken = token ?? getDemoSessionToken();
    if (!currentToken) throw new Error('Authentication required');
    const body = parseBody<{ eventSlug?: string }>(init?.body);
    const event = demoEvents.find((item) => item.slug === body?.eventSlug);
    if (!event) throw new Error('Event not found');
    if (getEventPrice(event) > 0) throw new Error('Paid events must be completed through demo checkout.');
    if (getDemoRegistrations().some((item) => item.eventId === event.id)) {
      throw new Error('You are already registered for this event');
    }

    const registration: DemoRegistration = {
      id: `REG-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
      eventId: event.id,
      eventSlug: event.slug,
      eventTitle: event.title,
      eventCategory: event.category,
      venue: event.venue,
      startsAt: event.startsAt,
      status: 'CONFIRMED' as const,
      passCode: `PASS-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      paymentStatus: 'FREE',
      transactionId: null,
      amount: 0,
    };

    addDemoRegistration(registration);
    return registration as T;
  }

  if (path === '/home/announcements') {
    return demoAnnouncements as T;
  }

  if (path === '/home/sponsors') {
    return demoSponsors as T;
  }

  if (path === '/home/gallery') {
    return demoGallery as T;
  }

  if (path === '/auth/me') {
    return (getDemoUser() ?? defaultUser) as T;
  }

  return getDemoData({ success: true } as T);
}
