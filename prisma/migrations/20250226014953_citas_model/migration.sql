-- CreateTable
CREATE TABLE "Cita" (
    "cita_id" SERIAL NOT NULL,
    "cita_servicio" TIMESTAMP(3) NOT NULL,
    "cita_tiposervicio" TEXT NOT NULL,
    "cita_created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("cita_id")
);

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
