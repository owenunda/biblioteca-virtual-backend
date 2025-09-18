import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }


  createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          lastname: createUserDto.lastname,
          password: createUserDto.password,
          role: createUserDto.role,
          prestamos: {
            connect: createUserDto.prestamos?.map((prestamoId) => ({
              prestamo_id: prestamoId,
            })) ?? [],
          },
  
        },
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getAllUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getUserById(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: { user_id: id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
