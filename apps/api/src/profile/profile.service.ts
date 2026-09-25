import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly select = { id: true, name: true, email: true, phone: true, college: true, studentId: true, departmentName: true, year: true, role: true } as const;
  get(id: string) { return this.prisma.user.findUniqueOrThrow({ where: { id }, select: this.select }); }
  update(id: string, dto: UpdateProfileDto) { return this.prisma.user.update({ where: { id }, data: dto, select: this.select }); }
}
