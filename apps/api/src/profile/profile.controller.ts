import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, type AuthenticatedRequest } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}
  @Get() get(@Req() request: AuthenticatedRequest) { return this.profile.get(request.user.id); }
  @Patch() update(@Req() request: AuthenticatedRequest, @Body() dto: UpdateProfileDto) { return this.profile.update(request.user.id, dto); }
}
