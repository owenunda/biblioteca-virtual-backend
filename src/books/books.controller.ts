import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findBooks(@Query('title') title?: string, @Query('category') category?: string) {
    return this.booksService.findBooks({ title, category });
  }

  @Post()
  createBook(@Body() body: { title: string; category: string; estado?: string }) {
    return this.booksService.createBook(body);
  }
}
