import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private prisma: PrismaService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const message =
      exception instanceof HttpException ? exception.message : 'Internal server error';

    const stack = exception instanceof Error ? exception.stack : undefined;

    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await this.prisma.appError.create({
      data: {
        message: message.toString(),
        stackTrace: stack,
        context: `${req.method} ${req.url}`
      }
    });

    res.status(exception instanceof HttpException ? exception.getStatus() : 500).json({
      statusCode: exception instanceof HttpException ? exception.getStatus() : 500,
      message
    });
  }
}
