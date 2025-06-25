"use client";
import React, { useState, FormEvent } from "react";
import { formatDate } from "@/hooks/formatDate";
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
      const phoneNumber = ["+50688015998", "+50663417731"];

      const message =
        service === "Quiropodia"
          ? `🗓 *Reservación Pendiente*\n\n💅 *Servicio:* ${service}\n👤 *Nombre:* _${name}_\n📧 *Email:* _${email}_\n🕒 *Fecha:* ${formatedDate}\n\n¡Gracias por tu reserva! 💖✨`
          : `🗓 *Reservación Pendiente*\n\n💅 *Servicio:* ${service}\n💆‍♀️ *Tipo de servicio:* ${speciality}\n👤 *Nombre:* _${name}_\n📧 *Email:* _${email}_\n🕒 *Fecha:* ${formatedDate}\n\n¡Gracias por tu reserva! 💖✨`;

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
          <div className="absolute rounded-lg inset-0 bg-rose-300/60 bg-opacity-20 flex items-center justify-center">
            <Link
              href="/auth/signin"
              className="text-xl bg-gray-700 rounded hover:bg-gray-800 text-white m-4 p-4"
            >
              Inicia sesión para agendar tu cita
            </Link>
          </div>
        )}
      </article>
    </section>
  );
}
