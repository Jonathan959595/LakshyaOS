import { Injectable, NotFoundException } from '@nestjs/common';
import { EventStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ListEventsDto } from './dto/list-events.dto';
@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly select = { id: true, slug: true, title: true, shortDescription: true, description: true, category: true, venue: true, startsAt: true, endsAt: true, registrationStartsAt: true, registrationEndsAt: true, feeInPaise: true, capacity: true, isFlagship: true, imageUrl: true, theme: true, department: { select: { name: true, slug: true } } } as const;
  async list(query: ListEventsDto) {
    const where: Prisma.EventWhereInput = { status: EventStatus.PUBLISHED, ...(query.category && { category: query.category }), ...(query.flagship !== undefined && { isFlagship: query.flagship }), ...(query.department && { department: { slug: query.department } }), ...(query.upcoming && { startsAt: { gte: new Date() } }), ...(query.search && { OR: [{ title: { contains: query.search, mode: 'insensitive' } }, { description: { contains: query.search, mode: 'insensitive' } }] }) };
    const [items, total] = await this.prisma.$transaction([this.prisma.event.findMany({ where, select: this.select, orderBy: { startsAt: 'asc' }, skip: (query.page - 1) * query.limit, take: query.limit }), this.prisma.event.count({ where })]);
    return { items, pagination: { page: query.page, limit: query.limit, total } };
  }
  async getBySlug(slug: string) {
    const event = await this.prisma.event.findFirst({ where: { slug, status: EventStatus.PUBLISHED }, select: { ...this.select, rules: true } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }
}
