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
    <>
      <section id="contact" className="scroll-mt-28 m-4 py-16 md:m-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
            {/* Columna Izquierda - Mensaje */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="dark:text-white text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-black bg-clip-text text-transparent">
                Reserva tu cita
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Encuentra el momento perfecto para consentirte y realzar tu
                belleza natural.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-pink-600 dark:text-pink-400"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Horario flexible
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Elige el horario que mejor te convenga
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-pink-600 dark:text-pink-400"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Atención personalizada
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Cada servicio se adapta a tus necesidades
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Formulario */}
            <div className="relative overflow-hidden rounded-lg">
              <Card
                className={`bg-white dark:bg-background/20 shadow-xl 
  dark:shadow-gray-900/0 border border-gray-100 dark:border-gray-700
  group rounded-lg overflow-hidden`}
              >
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    Reservaciones
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Selecciona el servicio y la fecha de tu preferencia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="dark:text-gray-200">
                            Nombre
                          </Label>
                          <Input
                            id="name"
                            placeholder="María López ..."
                            required
                            disabled={!!session?.user.name}
                            defaultValue={name || ""}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="dark:text-gray-200">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="ejemplo@domain.com"
                            required
                            disabled={!!session?.user.name}
                            defaultValue={email || ""}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="service" className="dark:text-gray-200">
                          Servicio
                        </Label>
                        <Select
                          onValueChange={handleServiceChange}
                          value={service}
                          required
                        >
                          <SelectTrigger
                            id="service"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                          >
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                            <SelectGroup>
                              <SelectLabel>Servicios</SelectLabel>
                              {services.map((service) => (
                                <SelectItem
                                  key={service.id}
                                  value={service.title}
                                >
                                  {service.title === "Pestanas"
                                    ? "Pestañas"
                                    : service.title}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {selectedService &&
                        selectedService.title !== "Quiropodia" && (
                          <div>
                            <Label
                              htmlFor="service-type"
                              className="dark:text-gray-200"
                            >
                              Tipo de servicio
                            </Label>
                            <Select
                              onValueChange={setSpeciality}
                              value={speciality}
                              required
                            >
                              <SelectTrigger
                                id="service-type"
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                              >
                                <SelectValue placeholder="Selecciona una especialidad" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                <SelectGroup>
                                  <SelectLabel>Tipo de servicio</SelectLabel>
                                  {selectedService?.info?.map(
                                    (info, index) =>
                                      info.title && (
                                        <SelectItem
                                          key={index}
                                          value={info.title}
                                        >
                                          {info.title}
                                        </SelectItem>
                                      )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {error && (
                              <p className="text-red-500 text-sm">{error}</p>
                            )}
                          </div>
                        )}
                      <div>
                        <Label htmlFor="date" className="dark:text-gray-200">
                          Fecha
                        </Label>
                        <Input
                          id="date"
                          type="datetime-local"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="font-medium text-lg bg-rose-300 hover:bg-rose-400 dark:bg-pink-500 dark:hover:bg-pink-400 dark:text-white transition-colors duration-300 w-full"
                      >
                        Agendar cita
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              {!session && (
                <>
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 z-20" />
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <Link
                      href="/auth/signin"
                      className="flex px-6 py-3 bg-white hover:bg-gray-50 dark:bg-pink-700 dark:hover:bg-pink-600 text-pink-600 dark:text-white font-medium rounded-full 
                         border-2 border-white dark:border-pink-600 shadow-lg hover:shadow-xl dark:shadow-pink-900/30
                         transition-all duration-300 hover:scale-105 items-center justify-center gap-2 text-center"
                    >
                      <span>Inicia sesión para agendar tu cita</span>
                      <LogIn className="h-5 w-5" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
