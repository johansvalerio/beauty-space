"use client";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup } from "./ui/select";
import { services } from "@/app/const/Services";

export default function BookingForm({ serviceName }: { serviceName: string }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [service, setService] = useState(serviceName || "");
    const [speciality, setSpeciality] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    // Actualiza el estado del servicio cuando cambia el nombre del servicio desde ServiceCard
    useEffect(() => {
        if (serviceName) {
            setService(serviceName); // Actualiza el servicio cuando cambia en ServiceCard
            setSpeciality(""); // Limpia la especialidad cuando cambia el servicio
        }
    }, [serviceName]);

    const selectedService = services.find((s) => s.title === service);

    function formatDate(dateString: string): string {
        const date = new Date(dateString + 'T00:00:00Z');
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const dayName = days[date.getUTCDay()];
        const dayNumber = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        return `${dayName} ${dayNumber}/${month}/${year}`;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (speciality === "" && service !== "Quiropodia") {
            setError("Por favor, selecciona una especialidad.");
            return;
        }
        const formatedDate = formatDate(date);
        const phoneNumber = "+50688015998";
        const message = service === "Quiropodia"
            ? `*Reservación para Servicio de ${service}*\nNombre: ${name}\nEmail: ${email}\nServicio: ${service}\nFecha: ${formatedDate}`
            : `*Reservación para Servicio de ${service}*\nNombre: ${name}\nEmail: ${email}\nServicio: ${service}\nEspecialidad: ${speciality}\nFecha: ${formatedDate}`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    }

    const handleServiceChange = (newService: string) => {
        setService(newService);
        setSpeciality(""); // Resetea la especialidad cuando se cambia el servicio
    };

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
                                    <Select onValueChange={handleServiceChange} value={service} required>
                                        <SelectTrigger id="service">
                                            <SelectValue placeholder="Selecciona un servicio" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Servicios</SelectLabel>
                                                {services.map((service) => (
                                                    <SelectItem key={service.id} value={service.title}>
                                                        {service.title}
                                                    </SelectItem>
                                                ))}
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
    );
}
