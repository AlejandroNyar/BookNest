import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddBookToUserDto {
  @IsInt()
  bookId: number;

  @IsString()
  @IsOptional()
  status?: string; // to_read, reading, etc.
}
