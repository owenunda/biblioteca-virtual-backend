import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  async findBooks(filters: { title?: string; category?: string }) {
    try {
      return this.prisma.book.findMany({
      where: {
        title: filters.title ? { contains: filters.title, mode: 'insensitive' } : undefined,
        category: filters.category ? { contains: filters.category, mode: 'insensitive' } : undefined,
      },
    });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createBook(data: { title: string; category: string; estado?: string }) {
    try {
      const newBook = await this.prisma.book.create({
        data: {
          title: data.title,
          category: data.category,
          estado: (data.estado ?? 'DISPONIBLE') as any,
        },
      });
      return newBook;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
