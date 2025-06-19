import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { User } from 'generated/prisma';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('me')
  getMe(@CurrentUser() user) {
    const userWrap: User = user as User;
    return userWrap;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  //   @Delete(':id')
  //   deleteUser(@Param('id') id: string) {
  //     return this.userService.remove(+id);
  //   }
}
