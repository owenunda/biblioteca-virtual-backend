import { Type } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname?: string; 

  @IsString()
  @MinLength(4)
  password: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true }) // valida que cada elemento sea un número
  @Type(() => Number)
  prestamos?: number[];

}
