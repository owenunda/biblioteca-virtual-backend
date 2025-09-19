import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrestamosService {
  async getStats() {
    try {
      const totalLibros = await this.prisma.book.count();
      const totalPrestamosActivos = await this.prisma.prestamo.count({ where: { estado: true } });
      const totalPrestamosDevueltos = await this.prisma.prestamo.count({ where: { estado: false } });

      const librosMasPrestadosRaw = await this.prisma.prestamo.groupBy({
        by: ['book_id'],
        _count: { book_id: true },
        orderBy: { _count: { book_id: 'desc' } },
        take: 5,
      });
      const librosMasPrestados = await Promise.all(
        librosMasPrestadosRaw.map(async (l) => {
          const book = await this.prisma.book.findUnique({ where: { book_id: l.book_id } });
          return { titulo: book?.title ?? '', vecesPrestado: l._count.book_id };
        })
      );

      const usuariosTopRaw = await this.prisma.prestamo.groupBy({
        by: ['user_id'],
        _count: { user_id: true },
        orderBy: { _count: { user_id: 'desc' } },
        take: 5,
      });
      const usuariosTop = await Promise.all(
        usuariosTopRaw.map(async (u) => {
          const user = await this.prisma.user.findUnique({ where: { user_id: u.user_id } });
          return { nombre: user?.name ?? '', prestamos: u._count.user_id };
        })
      );

      const prestamosPorMesRaw = await this.prisma.prestamo.findMany({
        select: { fechaInicio: true },
      });
      const prestamosPorMesMap = {};
      prestamosPorMesRaw.forEach((p) => {
        const mes = p.fechaInicio.toISOString().slice(0, 7);
        prestamosPorMesMap[mes] = (prestamosPorMesMap[mes] || 0) + 1;
      });
      const prestamosPorMes = Object.entries(prestamosPorMesMap).map(([mes, cantidad]) => ({ mes, cantidad }));

      return {
        totalLibros,
        totalPrestamosActivos,
        totalPrestamosDevueltos,
        librosMasPrestados,
        usuariosTop,
        prestamosPorMes,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
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
