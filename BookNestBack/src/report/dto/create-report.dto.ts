import { IsEnum, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { ReportType } from 'generated/prisma';

export class CreateReportDto {
  //TODO: fix
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @IsEnum(ReportType)
  type: ReportType;

  @IsString()
  @MinLength(5)
  description: string;

  @IsOptional()
  @IsInt()
  bookId?: number;

  @IsOptional()
  @IsInt()
  authorId?: number;
}
