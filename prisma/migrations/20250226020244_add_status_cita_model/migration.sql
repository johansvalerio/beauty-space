/*
  Warnings:

  - Added the required column `cita_status` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "cita_status" TEXT NOT NULL;
