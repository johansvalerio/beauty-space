"use client";
import React, { useState, FormEvent } from "react";
import { formatDate } from "@/hooks/formatDate";
import { LogIn } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "./ui/select";
import { services } from "@/const/Services";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function BookingForm() {
  const { data: session } = useSession();
  console.log(session?.user?.id);
  const name = session?.user.name as string;
  const email = session?.user.email as string;
  const [service, setService] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const selectedService = services.find((s) => s.title === service);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (speciality === "" && service !== "Quiropodia") {
      setError("Por favor, selecciona una especialidad.");
      return;
    }

    console.log(service, speciality, date, session?.user?.id);
    const userId = session?.user?.id;

    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      setError("ID de usuario inválido.");
      return;
    }

    const res = await fetch("/api/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cita_servicio: service,
        cita_tiposervicio: speciality,
        cita_fecha: date,
        userId: userIdNumber,
      }),
    });

    if (res.ok) {
      const formatedDate = formatDate(date);
      const phoneNumber = ["+50688015998"];

      const message =
        service === "Quiropodia"
          ? `🗓 *Reservación Pendiente*\n *Nombre:* ${name}\n *Servicio:* _${service}_\n🕒 *Fecha:* ${formatedDate}\n`
          : `🗓 *Reservación Pendiente*\n *Nombre:* ${name}\n *Servicio:* ${service}\n *Tipo de servicio:* _${speciality}_\n🕒 *Fecha:* ${formatedDate}\n`;

      // Abre WhatsApp con el mensaje predefinido
      // Para agregar más números de teléfono si es necesario
      phoneNumber.forEach((phoneNumber) => {
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      });
    } else {
      setError("Hubo un error al reservar la cita.");
    }
  }

  const handleServiceChange = (newService: string) => {
    setService(newService);
    setSpeciality(""); // Resetea la especialidad cuando se cambia el servicio
  };

  return (
    <section id="contact" className="scroll-mt-28 m-4 md:m-16">
      <article className="grid grid-cols-1 md:grid-cols-1 md:justify-items-center gap-8 relative">
        <Card className="w-full bg-white shadow-md">
          <CardHeader>
            <CardTitle>Reservaciones</CardTitle>
            <CardDescription>
              Selecciona el servicio y la fecha de tu preferencia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      placeholder="María López ..."
                      required
                      disabled={!!session?.user.name}
                      defaultValue={name || ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ejemplo@domain.com"
                      required
                      disabled={!!session?.user.name}
                      defaultValue={email || ""}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="service">Servicio</Label>
                  <Select
                    onValueChange={handleServiceChange}
                    value={service}
                    required
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Servicios</SelectLabel>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title === "Pestanas"
                              ? "Pestañas"
                              : service.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {selectedService && selectedService.title !== "Quiropodia" && (
                  <div>
                    <Label htmlFor="service-type">Tipo de servicio</Label>
                    <Select
                      onValueChange={setSpeciality}
                      value={speciality}
                      required
                    >
                      <SelectTrigger id="service-type">
                        <SelectValue placeholder="Selecciona una especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo de servicio</SelectLabel>
                          {selectedService?.info?.map(
                            (info, index) =>
                              info.title && (
                                <SelectItem key={index} value={info.title}>
                                  {info.title}
                                </SelectItem>
                              )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>
                )}
                <div>
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="font-medium text-lg bg-rose-300 hover:bg-rose-400"
                >
                  Agendar cita
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {!session && (
          <div className="absolute z-20 inset-0 bg-pink-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-pink-500/30">
            <Link
              href="/auth/signin"
              className="px-6 py-3 bg-white/90 hover:bg-white text-pink-600 font-medium rounded-full 
                       border-2 border-white/50 hover:border-white/80 shadow-lg hover:shadow-xl 
                       transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>Inicia sesión para agendar tu cita</span>
              <LogIn className="h-5 w-5" />
            </Link>
          </div>
        )}
      </article>
    </section>
  );
}
