import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Get()
  getAll() {
    return this.prestamosService.getAllPrestamos();
  }

  @Post('reservar')
  reservar(@Body() dto: CreatePrestamoDto) {
    return this.prestamosService.reservarLibro(dto.user_id, dto.book_id);
  }

  @Post('prestar')
  prestar(@Body() dto: CreatePrestamoDto) {
    return this.prestamosService.prestarLibro(dto.user_id, dto.book_id);
  }

  @Put('devolver/:id')
  devolver(@Param('id') id: number) {
    return this.prestamosService.devolverLibro(Number(id));
  }
}
