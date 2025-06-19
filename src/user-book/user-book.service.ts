import { Injectable } from '@nestjs/common';
import { AddBookToUserDto } from './dto/add-book-to-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserBookService {
  constructor(private prisma: PrismaService) {}

  addBookToUser(userId: number, dto: AddBookToUserDto) {
    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.prisma.userBook.create({
      data: {
        userId,
        bookId: dto.bookId,
        status: dto.status || 'to_read'
      }
    });
  }

  getUserBooks(userId: number) {
    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.prisma.userBook.findMany({
      where: { userId },
      include: { book: true }
    });
  }
}
