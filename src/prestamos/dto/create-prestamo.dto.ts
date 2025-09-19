import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePrestamoDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  book_id: number;
}
