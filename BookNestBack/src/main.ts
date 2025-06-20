import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { AllExceptionsFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  app.useGlobalFilters(new AllExceptionsFilter(prismaService));
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
