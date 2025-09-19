# Biblioteca Virtual Backend

URL desplegada: https://biblioteca-virtual-backend-production-25d1.up.railway.app

## Endpoints principales

### Usuarios

**Registrar usuario (estudiante/docente)**
- **POST** `/users`
- **Body:**
```json
{
  "name": "Nombre",
  "lastname": "Apellido",
  "email": "correo@ejemplo.com",
  "password": "contraseña",
  "role": "ESTUDIANTE" // o "DOCENTE"
}
```

---

### Autenticación

**Login**
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "correo@ejemplo.com",
  "password": "contraseña"
}
```
- **Respuesta:**
```json
{
  "access_token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Nombre",
    "email": "correo@ejemplo.com",
    "role": "ESTUDIANTE"
  }
}
```

---

### Libros

**Consultar catálogo de libros**
- **GET** `/books?title=algo&category=algo`
- **Query params opcionales:** `title`, `category`

**Crear libro**
- **POST** `/books`
- **Body:**
```json
{
  "title": "Título del libro",
  "category": "Categoría",
  "estado": "DISPONIBLE" // Opcional: DISPONIBLE, RESERVADO, PRESTADO
}
```

---

### Préstamos

**Reservar libro**
- **POST** `/prestamos/reservar`
- **Body:**
```json
{
  "user_id": 1,
  "book_id": 2
}
```

**Prestar libro**
- **POST** `/prestamos/prestar`
- **Body:**
```json
{
  "user_id": 1,
  "book_id": 2
}
```

**Devolver libro**
- **PUT** `/prestamos/devolver/:id`
- **Parámetro:** `id` es el `prestamo_id` del préstamo a devolver

---

## Notas
- Todos los endpoints devuelven datos en formato JSON.
- Para endpoints protegidos, usa el token JWT en el header `Authorization: Bearer <token>`.
- Los roles permitidos son: `ESTUDIANTE`, `DOCENTE`, `BIBLIOTECARIO`.

---

¿Dudas o necesitas ejemplos de respuesta? ¡Consulta este README o pregunta! 
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

