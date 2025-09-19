import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
  exports: [BooksService],
})
export class BooksModule {}
