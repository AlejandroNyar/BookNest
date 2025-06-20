import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, dto: CreateReportDto) {
    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.prisma.report.create({
      data: {
        ...dto,
        userId
      }
    });
  }
}
