-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_userId_fkey";

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
