import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async signup(dto: AuthDto) {
    const hashed: string = await bcrypt.hash(dto.password, 10);
    //TODO: Fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user: User = await this.prisma.user.create({
      data: { ...dto, password: hashed }
    });

    return this.signToken(user.id, user.email);
  }

  async login(dto: AuthDto) {
    //TODO: Fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user: User = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const pwMatch = await bcrypt.compare(dto.password, user.password);
    if (!pwMatch) throw new ForbiddenException('Invalid credentials');

    return this.signToken(user.id, user.email);
  }

  private async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET
    });

    return { access_token: token };
  }
}
