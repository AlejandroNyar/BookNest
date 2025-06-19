import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  providers: [UserService, JwtStrategy],
  exports: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
