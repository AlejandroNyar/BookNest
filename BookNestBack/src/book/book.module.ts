import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  providers: [BookService, JwtStrategy],
  exports: [BookService, JwtStrategy],
  controllers: [BookController]
})
export class BookModule {}
