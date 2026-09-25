import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EventStatus, PaymentStatus, Prisma, RegistrationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export type RegisterEventInput = {
  userId: string;
  eventSlug: string;
};

@Injectable()
export class RegistrationsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly eventSelect = {
    id: true,
    slug: true,
    title: true,
    description: true,
    category: true,
    venue: true,
    startsAt: true,
    endsAt: true,
    feeInPaise: true,
    capacity: true,
    status: true,
    registrationStartsAt: true,
    registrationEndsAt: true,
    department: { select: { name: true, slug: true } },
  } as const;

  async register({ userId, eventSlug }: RegisterEventInput) {
    const event = await this.prisma.event.findUnique({
      where: { slug: eventSlug },
      select: this.eventSelect,
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.status !== EventStatus.PUBLISHED) {
      throw new ForbiddenException('This event is not open for registration');
    }

    const now = new Date();
    if (
      (event.registrationStartsAt && now < event.registrationStartsAt) ||
      (event.registrationEndsAt && now > event.registrationEndsAt)
    ) {
      throw new ForbiddenException('Registration for this event is currently closed');
    }

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.registration.findFirst({
        where: { userId, eventId: event.id },
        select: { id: true },
      });

      if (existing) {
        throw new ConflictException('You are already registered for this event');
      }

      const taken = await tx.registration.count({ where: { eventId: event.id, status: { not: RegistrationStatus.CANCELLED } } });
      if (event.capacity && taken >= event.capacity) {
        throw new ForbiddenException('This event is at capacity');
      }

      const created = await tx.registration.create({
        data: {
          userId,
          eventId: event.id,
          status: event.feeInPaise > 0 ? RegistrationStatus.PENDING : RegistrationStatus.CONFIRMED,
        },
        include: {
          event: { select: { ...this.eventSelect, imageUrl: true, shortDescription: true } },
          payment: true,
        },
      });

      if (event.feeInPaise > 0) {
        await tx.payment.create({
          data: {
            registrationId: created.id,
            provider: 'FREE',
            amountInPaise: 0,
            status: PaymentStatus.PAID,
          },
        });
      }

      return {
        id: created.id,
        passCode: created.passCode,
        status: created.status,
        createdAt: created.createdAt,
        event: {
          id: created.event.id,
          slug: created.event.slug,
          title: created.event.title,
          description: created.event.description,
          category: created.event.category,
          venue: created.event.venue,
          startsAt: created.event.startsAt,
          endsAt: created.event.endsAt,
          feeInPaise: created.event.feeInPaise,
          capacity: created.event.capacity,
        },
        paymentStatus: event.feeInPaise > 0 ? 'PENDING' : 'PAID',
      };
    });
  }

  async listMine(userId: string) {
    const registrations = await this.prisma.registration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        event: { select: this.eventSelect },
        payment: true,
      },
    });

    return registrations.map((registration) => ({
      id: registration.id,
      passCode: registration.passCode,
      status: registration.status,
      createdAt: registration.createdAt,
      event: registration.event,
      paymentStatus: registration.payment?.status ?? (registration.event.feeInPaise > 0 ? 'PENDING' : 'PAID'),
    }));
  }

  async getMineById(userId: string, registrationId: string) {
    const registration = await this.prisma.registration.findFirst({
      where: { id: registrationId, userId },
      include: {
        event: { select: this.eventSelect },
        payment: true,
        attendance: true,
      },
    });

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    return {
      id: registration.id,
      passCode: registration.passCode,
      status: registration.status,
      createdAt: registration.createdAt,
      event: registration.event,
      payment: registration.payment,
      attendance: registration.attendance,
    };
  }
}
