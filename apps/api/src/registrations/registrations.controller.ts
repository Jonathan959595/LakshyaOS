import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, type AuthenticatedRequest } from '../auth/jwt-auth.guard';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrations: RegistrationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  register(@Req() request: AuthenticatedRequest, @Body() body: { eventSlug: string }) {
    return this.registrations.register({ userId: request.user.id, eventSlug: body.eventSlug });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  listMine(@Req() request: AuthenticatedRequest) {
    return this.registrations.listMine(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/:registrationId')
  getMineById(@Req() request: AuthenticatedRequest, @Param('registrationId') registrationId: string) {
    return this.registrations.getMineById(request.user.id, registrationId);
  }
}
