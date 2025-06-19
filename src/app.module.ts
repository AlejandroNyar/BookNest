import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserBookModule } from './user-book/user-book.module';
import { AuthorModule } from './author/author.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ReviewsModule,
    UserModule,
    BookModule,
    AuthModule,
    PrismaModule,
    UserBookModule,
    AuthorModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
