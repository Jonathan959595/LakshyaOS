import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard, type AuthenticatedRequest } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('signup') signup(@Body() dto: SignupDto) { return this.auth.signup(dto); }
  @HttpCode(200) @Post('login') login(@Body() dto: LoginDto) { return this.auth.login(dto); }
  @UseGuards(JwtAuthGuard) @Get('me') me(@Req() request: AuthenticatedRequest) { return this.auth.getMe(request.user.id); }
  @HttpCode(204) @Post('logout') logout(): void { /* Stateless JWT logout: client discards its token; token deny-listing is a future decision. */ }
}
