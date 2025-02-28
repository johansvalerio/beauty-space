/*
  Warnings:

  - You are about to drop the column `user_img` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_img",
ADD COLUMN     "user_image" TEXT;
