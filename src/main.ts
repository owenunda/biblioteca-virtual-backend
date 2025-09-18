import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan campos extra
      transform: true, // transforma payloads (ej: strings a números)
    }),
  );
  app.enableCors({
    // aca podemos configurar que dominios pueden acceder a nuestra API
    origin: '*'
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
