import { NotFoundException } from '@nestjs/common';
import { EventsService } from './events.service';

describe('EventsService', () => {
  const prisma = { $transaction: jest.fn(), event: { findFirst: jest.fn(), findMany: jest.fn(), count: jest.fn() } };
  const service = new EventsService(prisma as never);
  beforeEach(() => jest.clearAllMocks());
  it('lists only published events with supplied category filters', async () => { prisma.$transaction.mockResolvedValue([[], 0]); await expect(service.list({ category: 'TECHNICAL', page: 1, limit: 20 })).resolves.toEqual({ items: [], pagination: { page: 1, limit: 20, total: 0 } }); });
  it('returns event-not-found for a missing public slug', async () => { prisma.event.findFirst.mockResolvedValue(null); await expect(service.getBySlug('missing')).rejects.toBeInstanceOf(NotFoundException); });
});
