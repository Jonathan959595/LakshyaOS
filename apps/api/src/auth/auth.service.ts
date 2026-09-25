import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

type SafeUser = { id: string; name: string; email: string; phone: string | null; college: string | null; studentId: string | null; departmentName: string | null; year: number | null; role: 'STUDENT' | 'ADMIN' | 'COORDINATOR' };

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
  async signup(dto: SignupDto): Promise<{ user: SafeUser; accessToken: string }> {
    const email = dto.email.trim().toLowerCase();
    if (await this.prisma.user.findUnique({ where: { email }, select: { id: true } })) throw new ConflictException('An account with this email already exists');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({ data: { ...dto, email, passwordHash, role: 'STUDENT' }, select: this.safeUserSelect });
    return { user, accessToken: await this.issueToken(user.id, user.role) };
  }
  async login(dto: LoginDto): Promise<{ user: SafeUser; accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.trim().toLowerCase() } });
    if (!user?.passwordHash || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException('Invalid email or password');
    const safeUser = await this.prisma.user.findUniqueOrThrow({ where: { id: user.id }, select: this.safeUserSelect });
    return { user: safeUser, accessToken: await this.issueToken(user.id, user.role) };
  }
  async getMe(id: string): Promise<SafeUser> { return this.prisma.user.findUniqueOrThrow({ where: { id }, select: this.safeUserSelect }); }
  private async issueToken(sub: string, role: SafeUser['role']): Promise<string> { return this.jwt.signAsync({ sub, role }); }
  private readonly safeUserSelect = { id: true, name: true, email: true, phone: true, college: true, studentId: true, departmentName: true, year: true, role: true } as const;
}
