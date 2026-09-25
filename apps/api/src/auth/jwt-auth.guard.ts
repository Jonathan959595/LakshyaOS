import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
export type AuthenticatedRequest = Request & { user: { id: string; role: string } };
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.headers.authorization?.startsWith('Bearer ') ? request.headers.authorization.slice(7) : undefined;
    if (!token) throw new UnauthorizedException('Authentication token is required');
    try { const payload = await this.jwt.verifyAsync<{ sub: string; role: string }>(token); request.user = { id: payload.sub, role: payload.role }; return true; }
    catch { throw new UnauthorizedException('Invalid or expired authentication token'); }
  }
}
