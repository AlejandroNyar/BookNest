import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

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
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashed
        }
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    //TODO: Fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = await this.prisma.user.findUnique({
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
      expiresIn: '30m',
      secret: process.env.JWT_SECRET
    });

    return { access_token: token };
  }
}
