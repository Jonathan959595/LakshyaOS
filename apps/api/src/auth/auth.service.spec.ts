import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const prisma = { user: { findUnique: jest.fn(), create: jest.fn(), findUniqueOrThrow: jest.fn() } };
  const jwt = { signAsync: jest.fn().mockResolvedValue('token') };
  const service = new AuthService(prisma as never, jwt as never);
  beforeEach(() => jest.clearAllMocks());
  it('rejects duplicate signup', async () => { prisma.user.findUnique.mockResolvedValue({ id: 'existing' }); await expect(service.signup({ name: 'A User', email: 'a@example.com', password: 'a-long-password' })).rejects.toBeInstanceOf(ConflictException); });
  it('rejects an invalid login', async () => { prisma.user.findUnique.mockResolvedValue(null); await expect(service.login({ email: 'a@example.com', password: 'bad' })).rejects.toBeInstanceOf(UnauthorizedException); });
});
