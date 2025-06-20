import { Module } from '@nestjs/common';
import { UserBookController } from './user-book.controller';
import { UserBookService } from './user-book.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [UserBookController],
  providers: [UserBookService, JwtStrategy],
  exports: [UserBookService, JwtStrategy]
})
export class UserBookModule {}
