import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ProfileModule } from './profile/profile.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, HealthModule, AuthModule, EventsModule, ProfileModule, RegistrationsModule] })
export class AppModule {}
