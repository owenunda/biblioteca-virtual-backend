import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { PrestamosModule } from './prestamos/prestamos.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, BooksModule, PrestamosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
