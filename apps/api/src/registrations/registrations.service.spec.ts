import { ConflictException, ForbiddenException } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

describe('RegistrationsService', () => {
  const prisma = {
    $transaction: jest.fn(),
    registration: { count: jest.fn(), findMany: jest.fn(), findFirst: jest.fn(), create: jest.fn() },
    event: { findUnique: jest.fn() },
  };

  const service = new RegistrationsService(prisma as never);

  beforeEach(() => jest.clearAllMocks());

  it('blocks duplicate registration for the same user and event', async () => {
    prisma.event.findUnique.mockResolvedValue({
      id: 'evt-1',
      slug: 'hackathon',
      title: 'Hackathon',
      description: 'A cool challenge',
      category: 'TECHNICAL',
      venue: 'Innovation Lab',
      startsAt: new Date('2030-02-01T10:00:00Z'),
      endsAt: new Date('2030-02-01T18:00:00Z'),
      feeInPaise: 0,
      capacity: 50,
      registrationStartsAt: new Date('2025-01-01T00:00:00Z'),
      registrationEndsAt: new Date('2030-02-20T00:00:00Z'),
      status: 'PUBLISHED',
      department: { name: 'CSE', slug: 'cse' },
    });
    prisma.registration.count.mockResolvedValue(1);
    prisma.$transaction.mockImplementation(async (callback) => callback({
      event: { findUnique: prisma.event.findUnique },
      registration: { count: prisma.registration.count, findFirst: jest.fn().mockResolvedValue({ id: 'reg-1' }), create: jest.fn() },
    }));

    await expect(service.register({ userId: 'user-1', eventSlug: 'hackathon' })).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects registration outside the allowed window', async () => {
    prisma.event.findUnique.mockResolvedValue({
      id: 'evt-2',
      slug: 'quiz',
      title: 'Quiz Night',
      description: 'A test of wit',
      category: 'TECHNICAL',
      venue: 'Auditorium',
      startsAt: new Date('2030-03-01T10:00:00Z'),
      endsAt: new Date('2030-03-01T12:00:00Z'),
      feeInPaise: 0,
      capacity: null,
      registrationStartsAt: new Date('2030-02-01T00:00:00Z'),
      registrationEndsAt: new Date('2030-02-10T00:00:00Z'),
      status: 'PUBLISHED',
      department: { name: 'CSE', slug: 'cse' },
    });
    prisma.registration.count.mockResolvedValue(0);
    prisma.$transaction.mockImplementation(async (callback) => callback({
      event: { findUnique: prisma.event.findUnique },
      registration: { count: prisma.registration.count, findFirst: jest.fn().mockResolvedValue(null), create: jest.fn() },
    }));

    await expect(service.register({ userId: 'user-2', eventSlug: 'quiz' })).rejects.toBeInstanceOf(ForbiddenException);
  });
});
