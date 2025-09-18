// prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <-- Hace disponible PrismaService globalmente (opcional)
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <-- exporta el servicio
})
export class PrismaModule {}
