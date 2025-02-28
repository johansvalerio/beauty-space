/*
  Warnings:

  - You are about to drop the column `user_image` on the `User` table. All the data in the column will be lost.
  - Made the column `user_phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_image",
ALTER COLUMN "user_phone" SET NOT NULL;
