import { NextResponse } from "next/server";
import db from "@/lib/db";
import { type Cita } from "@prisma/client";
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    const data = await request.json();

    console.log(data);

    if (data.cita_servicio === "Quiropodia") {
        const newCita: Cita = await db.cita.create({
            data: {
                cita_fecha: new Date(data.cita_fecha),
                cita_servicio: data.cita_servicio,
                cita_tiposervicio: "Quiropodia",
                userId: data.userId,
            }
        })

        console.log("Cita created: " + JSON.stringify(newCita));
        return NextResponse.json(newCita);
    }

    const newCita: Cita = await db.cita.create({
        data: {
            cita_fecha: new Date(data.cita_fecha),
            cita_servicio: data.cita_servicio,
            cita_tiposervicio: data.cita_tiposervicio,
            userId: data.userId,
        }
    })

    console.log("Cita created: " + JSON.stringify(newCita));
    return NextResponse.json(newCita);
}

export async function GET() {
    const citas = await db.cita.findMany({
        orderBy: { cita_id: 'desc' },
        include: {
            user: true
        }
    })
    return NextResponse.json(citas);
}

export async function PATCH(request: Request) {

    const data = await request.json()

    const newCitaStatus = await db.cita.update({
        where: {
            cita_id: Number(data.cita_id)
        },
        data: {
            cita_status: data.cita_status
        }
    })
    revalidatePath('/citas');
    return NextResponse.json(newCitaStatus)

}