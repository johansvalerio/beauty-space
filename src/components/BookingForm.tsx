"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup } from "./ui/select";
import { services } from "@/app/const/Services";
export default function BookingForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    function formatDate(dateString: string): string {
        // Convertir la cadena de fecha a un objeto Date en UTC
        const date = new Date(dateString + 'T00:00:00Z');

        // Crear arrays para nombres de días y meses
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        // Obtener el nombre del día, el número del día, el mes y el año
        const dayName = days[date.getUTCDay()];
        const dayNumber = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();

        // Retornar la fecha en el formato deseado
        return `${dayName} ${dayNumber}/${month}/${year}`;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (speciality === "" && service !== "Quiropodia") {
            setError("Por favor, selecciona una especialidad.");
            return;
        }

        const formatedDate = formatDate(date);
        console.log({ name, email, service, speciality, formatedDate });
        // Número de teléfono de destino (con código de país)
        const phoneNumber = "+50688015998"; // Reemplázalo por el número de teléfono que deseas

        if (service === "Quiropodia") {
            // Mensaje de WhatsApp
            const message = `*Reservación para Servicio de ${service}*\nNombre: ${name}\nEmail: ${email}\nServicio: ${service}\nFecha: ${formatedDate}`;
            // Construir la URL para enviar el mensaje por WhatsApp
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

            // Redirigir a la URL de WhatsApp
            window.open(whatsappUrl, "_blank");
        }

        // Mensaje de WhatsApp
        const message = `*Reservación para Servicio de ${service}*\nNombre: ${name}\nEmail: ${email}\nServicio: ${service}\nEspecialidad: ${speciality}\nFecha: ${formatedDate}`;
        // Construir la URL para enviar el mensaje por WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        // Redirigir a la URL de WhatsApp
        window.open(whatsappUrl, "_blank");
    }

    // Al cambiar de servicio, reseteamos la especialidad
    const handleServiceChange = (newService: string) => {
        setService(newService);
        setSpeciality(""); // Resetea el campo de especialidad al cambiar el servicio
    };

    const selectedService = services.find((s) => s.title === service);


    return (
        <section id="contact" className="m-4 md:m-16 scroll-mt-20">
            <article className="grid grid-cols-1 md:grid-cols-1 md:justify-items-center gap-8">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Reservaciones</CardTitle>
                        <CardDescription>Selecciona el servicio y la fecha de tu preferencia</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input id="name" placeholder="María López ..." required
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="ejemplo@domain.com" required
                                            value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="service">Servicio</Label>
                                    <Select onValueChange={handleServiceChange} required>
                                        <SelectTrigger id="service">
                                            <SelectValue placeholder="Selecciona un servicio" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Servicios</SelectLabel>
                                                {services && services.length > 0 && (
                                                    services.map((service) => (
                                                        <SelectItem key={service.id} value={service.title}>{service.title}</SelectItem>
                                                    ))
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {selectedService && selectedService.title !== "Quiropodia" && (
                                    <div>
                                        <Label htmlFor="service-type">Especialidad</Label>
                                        <Select onValueChange={setSpeciality} value={speciality}>
                                            <SelectTrigger id="service-type">
                                                <SelectValue placeholder="Selecciona una especialidad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Especialidad</SelectLabel>
                                                    {selectedService?.info?.map((info, index) => (
                                                        <SelectItem key={index} value={info.title}>{info.title}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {error && <p className="text-red-500 text-sm">{error}</p>}
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="date">Fecha</Label>
                                    <Input id="date" type="date" required
                                        value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <Button type="submit" className="font-medium text-lg bg-rose-300 hover:bg-rose-400">Agendar cita</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </article>

        </section>
    )
}