# Sistema de Gestión de Biblioteca Virtual

Backend para un sistema de gestión de biblioteca virtual.

## Funcionalidades

- **Gestión de Usuarios:**
  - Registro de nuevos usuarios (estudiantes y docentes).
  - Inicio de sesión con validación de credenciales.
- **Gestión de Libros:**
  - Consulta del catálogo de libros por título, autor o categoría.
- **Gestión de Préstamos:**
  - Reservar un libro que se encuentre disponible.
  - Prestar un libro a un usuario.
  - Registrar la devolución de un libro.
- **Reportes:**
  - Generar reportes de los préstamos que se encuentren activos.

## Tecnologías Utilizadas

- **Framework - [NestJS](https://nestjs.com/):** Un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes, confiables y escalables. Se utiliza como la base principal de la arquitectura del backend, permitiendo un desarrollo modular y organizado.

- **Lenguaje - [TypeScript](https://www.typescriptlang.org/):** Un superconjunto de JavaScript que añade tipado estático opcional. TypeScript permite construir aplicaciones más robustas y mantenibles, facilitando la detección de errores en tiempo de desarrollo y mejorando la legibilidad del código.

- **ORM - [Prisma](https.prisma.io/):** Un ORM (Object-Relational Mapping) de próxima generación para Node.js y TypeScript. Prisma facilita la interacción con la base de datos de una manera segura y eficiente, permitiendo definir el esquema de la base de datos en un archivo y generando un cliente de base de datos totalmente tipado.

- **Base de Datos:** El proyecto está configurado para ser agnóstico a la base de datos gracias a Prisma. Puede ser configurado para trabajar con diferentes bases de datos SQL como **PostgreSQL**, **MySQL**, **SQLite** o **SQL Server**.

## Entidades (Modelo de Datos)

- **Usuario:**
  - `id`: Identificador único
  - `nombre`: Nombre del usuario
  - `correo`: Correo electrónico
  - `contraseña`: Contraseña (almacenada de forma segura)
- **Libro:**
  - `id`: Identificador único
  - `titulo`: Título del libro
  - `autor`: Autor del libro
  - `categoria`: Categoría del libro
  - `estado`: Estado del libro (disponible, prestado, reservado)
- **Prestamo:**
  - `id`: Identificador único
  - `fechaInicio`: Fecha de inicio del préstamo
  - `fechaFin`: Fecha de finalización del préstamo
  - `estado`: Estado del préstamo (activo, devuelto)
  - `usuarioId`: Relación con el usuario
  - `libroId`: Relación con el libro

