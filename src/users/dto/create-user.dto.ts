import { Roles } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

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

  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;
}
