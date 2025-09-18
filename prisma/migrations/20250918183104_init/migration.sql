-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('ESTUDIANTE', 'DOCENTE', 'BIBLIOTECARIO');

-- CreateEnum
CREATE TYPE "public"."Estados" AS ENUM ('PRESTADO', 'RESERVADO', 'DISPONIBLE');

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."Roles" NOT NULL DEFAULT 'ESTUDIANTE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."prestamo" (
    "prestamo_id" SERIAL NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "prestamo_pkey" PRIMARY KEY ("prestamo_id")
);

-- CreateTable
CREATE TABLE "public"."book" (
    "book_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "estado" "public"."Estados" NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("book_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."prestamo" ADD CONSTRAINT "prestamo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prestamo" ADD CONSTRAINT "prestamo_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;
