"use client"
import { useState, useEffect } from "react";
import { Card, CardTitle, CardHeader, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Citas } from '@/app/types/CitaUser'
import { formatDate } from '@/app/hooks/formatDate'
import { Session } from 'next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function CitasCard({ citas, session }: { citas: Citas, session: Session }) {
    // Estado local para las citas
    const [citasState, setCitasState] = useState(citas);

    // Efecto para actualizar el estado local si las props cambian (por ejemplo, desde el servidor)
    useEffect(() => {
        const interval = setInterval(async () => {
            // URL de la API para obtener las citas
            const res = await fetch("/api/citas");
            if (res.ok) {
                const nuevasCitas = await res.json();
                setCitasState(nuevasCitas);
            }
        }, 5000); // cada 5 segundos

        return () => clearInterval(interval);
    }, []);


    const getStatusShadow = (status: string) => {
        switch (status) {
            case "Pendiente":
                return "shadow-inner-orange";
            case "Declinado":
                return "shadow-inner-red";
            case "En proceso":
                return "shadow-inner-blue";
            case "Finalizado":
                return "shadow-inner-green";
            default:
                return "shadow-inner-gray";
        }
    };

    const getStatusDiagonal = (status: string) => {
        switch (status) {
            case "Pendiente":
                return "bg-amber-500/20";
            case "Declinado":
                return "bg-red-500/20";
            case "En proceso":
                return "bg-blue-500/20";
            case "Finalizado":
                return "bg-green-500/20";
            default:
                return "bg-gray-500/20";
        }
    };

    if (citasState.length === 0) {
        return (
            <div className="mx-auto mt-20">
                <p className='text-lg font-bold text-white'>No hay citas</p>
            </div>
        )
    }

    return (
        <div className="md:px-6 lg:px-8 px-6 mx-auto">
            <div className="grid grid-cols-1 place-items-center lg:grid-cols-3 lg:gap-12">
                {citasState.map((cita) => {
                    const statusShadow = getStatusShadow(cita.cita_status);
                    const statusDiagonal = getStatusDiagonal(cita.cita_status);
                    if (cita?.user?.user_email === session.user.email || session.user.role === 1) {
                        return (
                            <Card key={cita.cita_id} className={`w-full mt-4 lg:mt-0 bg-white ${statusShadow} relative overflow-hidden`}>
                                <div className={`absolute inset-0 transform skew-y-[-18deg] origin-top-right ${statusDiagonal}`}></div>
                                <CardHeader className="relative flex">
                                    <div className='flex  items-center justify-center gap-4'>
                                        <Avatar className="h-20 w-20 cursor-pointer border border-border hover:opacity-80 transition-opacity">
                                            <AvatarImage src={cita?.user?.user_image} alt={cita?.user?.user_name} />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {cita?.user?.user_name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <CardTitle className='text-lg capitalize'>{cita?.user?.user_name} </CardTitle>
                                    </div>
                                    <CardDescription className='text-black text-center'>Cita #{cita?.cita_id}</CardDescription>
                                </CardHeader>
                                <CardContent className="relative">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex flex-col space-y-2">
                                            <p className='text-md text-muted-foreground'>Correo:
                                                <span className='text-md text-muted-foreground'> {cita?.user?.user_email}
                                                </span>
                                            </p>
                                            <p className="text-md text-muted-foreground">
                                                Tel: {cita?.user?.user_phone.slice(0, 4)}-{cita?.user?.user_phone.slice(4, 9)}
                                            </p>
                                            <p className="text-md text-muted-foreground">Fecha: {formatDate(cita?.cita_fecha?.toString())}</p>
                                            <p className="text-md text-muted-foreground">Servicio: {cita?.cita_servicio}</p>
                                            <p className="text-md text-muted-foreground">Tipo de servicio: {cita?.cita_tiposervicio}</p>
                                            <p className='text-md text-muted-foreground'>Estado: {cita?.cita_status} </p>
                                        </div>
                                    </div>
                                </CardContent>
                                {
                                    session.user.role === 1
                                    && <CardFooter className="relative">
                                        <Button>Modificar</Button>
                                    </CardFooter>
                                }
                            </Card>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default CitasCard