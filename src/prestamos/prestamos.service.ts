import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrestamosService {
  constructor(private prisma: PrismaService) {}

  async getAllPrestamos() {
    try {
      const prestamos = await this.prisma.prestamo.findMany({
        include: {
          book: true,
          user: true,
        },
      });
      return prestamos.map((p) => ({
        id: p.prestamo_id,
        prestamo_id: p.prestamo_id,
        estado: p.estado ? 'activo' : 'devuelto',
        fechaInicio: p.fechaInicio ? p.fechaInicio.toISOString().split('T')[0] : null,
        fecha_inicio: p.fechaInicio ? p.fechaInicio.toISOString().split('T')[0] : null,
        fechaFin: p.fechaFin ? p.fechaFin.toISOString().split('T')[0] : null,
        fecha_fin: p.fechaFin ? p.fechaFin.toISOString().split('T')[0] : null,
        fechaDevolucion: !p.estado && p.fechaFin ? p.fechaFin.toISOString().split('T')[0] : null,
        fecha_devolucion: !p.estado && p.fechaFin ? p.fechaFin.toISOString().split('T')[0] : null,
        titulo: p.book?.title ?? '',
        libro: { titulo: p.book?.title ?? '', categoria: p.book?.category ?? '' },
        categoria: p.book?.category ?? '',
        nombre: p.user?.name ?? '',
        usuario: { nombre: p.user?.name ?? '' },
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async reservarLibro(userId: number, bookId: number) {
    // Cambia estado del libro a RESERVADO y crea prestamo
    try {
      await this.prisma.book.update({
        where: { book_id: bookId },
        data: { estado: 'RESERVADO' },
      });
      return this.prisma.prestamo.create({
        data: {
          user: { connect: { user_id: userId } },
          book: { connect: { book_id: bookId } },
          estado: true,
          fechaFin: new Date(),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async prestarLibro(userId: number, bookId: number) {
    // Cambia estado del libro a PRESTADO y crea prestamo
    try {
      await this.prisma.book.update({
        where: { book_id: bookId },
        data: { estado: 'PRESTADO' },
      });
      return this.prisma.prestamo.create({
        data: {
          user: { connect: { user_id: userId } },
          book: { connect: { book_id: bookId } },
          estado: true,
          fechaFin: new Date(),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async devolverLibro(prestamoId: number) {
    // Cambia estado del libro a DISPONIBLE y actualiza prestamo
    const prestamo = await this.prisma.prestamo.findUnique({
      where: { prestamo_id: prestamoId },
    });
    if (!prestamo) throw new Error('Préstamo no encontrado');
    try {
      await this.prisma.book.update({
        where: { book_id: (prestamo as any).book_id },
        data: { estado: 'DISPONIBLE' },
      });
      return this.prisma.prestamo.update({
        where: { prestamo_id: prestamoId },
        data: { estado: false, fechaFin: new Date() },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
