"use client";
import { useState, useEffect, useCallback } from "react";
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

    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString);
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        const dayName = days[date.getDay()];
        const dayNumber = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");

        // Convertir a formato de 12 horas
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convierte el 0 (medianoche) a 12

        return `${dayName} ${dayNumber}/${month}/${year} \nA las ${hours}:${minutes} ${ampm}`;
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (speciality === "" && service !== "Quiropodia") {
            setError("Por favor, selecciona una especialidad.");
            return;
        }
        const formatedDate = formatDate(date);
        const phoneNumber = "+50688015998";

        const message = service === "Quiropodia"
            ? `🗓 *Reservación Confirmada*\n\n💅 *Servicio:* ${service}\n👤 *Nombre:* _${name}_\n📧 *Email:* _${email}_\n🕒 *Fecha:* ${formatedDate}\n\n¡Gracias por tu reserva! 💖✨`
            : `🗓 *Reservación Confirmada*\n\n💅 *Servicio:* ${service}\n💆‍♀️ *Tipo de servicio:* ${speciality}\n👤 *Nombre:* _${name}_\n📧 *Email:* _${email}_\n🕒 *Fecha:* ${formatedDate}\n\n¡Gracias por tu reserva! 💖✨`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    }

    const handleServiceChange = (newService: string) => {
        setService(newService);
        setSpeciality(""); // Resetea la especialidad cuando se cambia el servicio
    };

    return (
        <section id="contact" className="scroll-mt-28 m-4 md:m-16">
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
                                        <Label htmlFor="service-type">Tipo de servicio</Label>
                                        <Select onValueChange={setSpeciality} value={speciality} required>
                                            <SelectTrigger id="service-type">
                                                <SelectValue placeholder="Selecciona una especialidad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Tipo de servicio</SelectLabel>
                                                    {selectedService?.info?.map((info, index) => (
                                                        info.title &&
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
                                    <Input id="date" type="datetime-local" required
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
