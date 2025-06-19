import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { AddBookToUserDto } from './dto/add-book-to-user.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user-books')
export class UserBookController {
  constructor(private service: UserBookService) {}

  @Post()
  add(@CurrentUser('id') userId: number, @Body() dto: AddBookToUserDto) {
    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.service.addBookToUser(userId, dto);
  }

  @Get()
  getMyBooks(@CurrentUser('id') userId: number) {
    //TODO: fix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.service.getUserBooks(userId);
  }
}
