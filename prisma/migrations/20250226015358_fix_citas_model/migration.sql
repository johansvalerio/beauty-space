/*
  Warnings:

  - Added the required column `cita_fecha` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "cita_fecha" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "cita_servicio" SET DATA TYPE TEXT;
