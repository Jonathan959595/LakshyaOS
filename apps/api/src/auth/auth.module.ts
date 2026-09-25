import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import type { StringValue } from 'ms';

@Module({
  imports: [JwtModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (config: ConfigService) => ({ secret: config.getOrThrow<string>('JWT_SECRET'), signOptions: { expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '1h') as StringValue } }) })],
  controllers: [AuthController], providers: [AuthService, JwtAuthGuard, RolesGuard], exports: [AuthService, JwtAuthGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
