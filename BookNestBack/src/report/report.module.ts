import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [ReportController],
  providers: [ReportService, JwtStrategy],
  exports: [ReportService, JwtStrategy]
})
export class ReportModule {}
