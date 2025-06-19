import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  createBook(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        author: {
          connect: { id: dto.authorId }
        }
      }
    });
  }

  getBooks() {
    return this.prisma.book.findMany({
      include: {
        author: true
      }
    });
  }
}
