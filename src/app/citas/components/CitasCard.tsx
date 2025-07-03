"use client";
import { useState } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Citas } from "@/types/CitaUser";
import { Cita } from "@prisma/client";
import { formatDate } from "@/hooks/formatDate";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

function CitasCard({ citas }: { citas: Citas }) {
  const { data: session } = useSession();
  const [status, setStatus] = useState("");
  const [updStatus, setUpdStatus] = useState(false);
  const [id, setId] = useState(0);
  const router = useRouter();

  const handleEditButton = (citas: Cita) => {
    setUpdStatus(true);
    if (updStatus === true && id === citas.cita_id) {
      setUpdStatus(false);
    }
    if (updStatus === true && id !== citas.cita_id) {
      setUpdStatus(true);
    }
  };

  const handlePatchStatus = async (cita_id: number) => {
    if (status === "") {
      alert("Por favor, selecciona un estado para la cita.");
      return;
    }
    console.log(status);
    console.log(cita_id);
    const res = await fetch(`/api/citas`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviar el ID de la cita y el nuevo estado
      body: JSON.stringify({
        cita_id: cita_id,
        cita_status: status,
      }),
    });
    const newStatus = await res.json();
    console.log(newStatus);
    setUpdStatus(false);
    router.refresh();
  };

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

  const userCitas = citas.filter(
    (cita) =>
      cita?.user?.user_email === session?.user.email || session?.user.role === 1
  );

  if (!userCitas) {
    return (
      <div className="mx-auto mt-20">
        <p className="text-lg font-bold text-white">No hay citas</p>
      </div>
    );
  }

  return (
    <div className="md:px-6 lg:px-8 py-10 mx-auto">
      <div className="grid grid-cols-1 place-items-center lg:grid-cols-3 gap-4 lg:gap-12">
        {userCitas
          .map((cita) => {
            const statusShadow = getStatusShadow(cita.cita_status);
            const statusDiagonal = getStatusDiagonal(cita.cita_status);
            // Verifica si la cita pertenece al usuario actual o si el usuario es un administrador

            return (
              <Card
                key={cita.cita_id}
                className={`w-full h-full min-h-[400px] flex flex-col mt-4 lg:mt-0 bg-white ${statusShadow} relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 transform skew-y-[-18deg] origin-top-right ${statusDiagonal}`}
                ></div>
                <CardHeader className="relative flex">
                  <div className="flex  items-center justify-center gap-4">
                    <Avatar className="h-20 w-20 cursor-pointer border border-border hover:opacity-80 transition-opacity">
                      <AvatarImage
                        src={cita?.user?.user_image}
                        alt={cita?.user?.user_name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {cita?.user?.user_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg capitalize text-black">
                      {cita?.user?.user_name}{" "}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-black text-center">
                    Cita #{cita?.cita_id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative flex-grow">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-md text-black">
                        Correo:
                        <span className="text-md text-gray-600">
                          {" "}
                          {cita?.user?.user_email}
                        </span>
                      </p>
                      {cita?.user?.user_phone ? (
                        <p className="text-md text-black">
                          Tel: {cita?.user?.user_phone?.slice(0, 4)}-
                          {cita?.user?.user_phone?.slice(4, 9)}
                        </p>
                      ) : null}
                      <p className="text-md text-black">
                        Fecha: {formatDate(cita?.cita_fecha?.toString())}
                      </p>
                      <p className="text-md text-black">
                        Servicio: {cita?.cita_servicio}
                      </p>
                      <p className="text-md text-black">
                        Tipo de servicio: {cita?.cita_tiposervicio}
                      </p>
                      {updStatus === false || id !== cita.cita_id ? (
                        <p
                          className={` font-bold
                                    ${
                                      (cita.cita_status === "En proceso" &&
                                        "text-blue-500") ||
                                      (cita.cita_status === "Finalizado" &&
                                        "text-green-500") ||
                                      (cita.cita_status === "Declinado" &&
                                        "text-red-500") ||
                                      (cita.cita_status === "Pendiente" &&
                                        "text-amber-500")
                                    }`}
                        >
                          Status: {cita.cita_status}
                        </p>
                      ) : (
                        <p className="flex items-center text-black">
                          Status:
                          <select
                            className="mx-1 bg-zinc-100 p-1 rounded text-black border border-gray-300"
                            onChange={(e) => setStatus(e.target.value)}
                            defaultValue={cita.cita_status}
                            name="status"
                          >
                            <option value="" disabled>
                              --Estado de la orden--
                            </option>
                            <option
                              className=" text-blue-500 font-medium"
                              value="En proceso"
                            >
                              En proceso
                            </option>
                            <option
                              className="text-green-500 font-medium"
                              value="Finalizado"
                            >
                              Finalizado
                            </option>
                            <option
                              className="text-red-500 font-medium"
                              value="Declinado"
                            >
                              Declinado
                            </option>
                            <option
                              className="text-amber-500 font-medium"
                              value="Pendiente"
                            >
                              Pendiente
                            </option>
                          </select>
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                {session?.user.role === 1 && (
                  <CardFooter className="relative">
                    <div className="flex gap-2 ">
                      <Button
                        className={` text-white font-semibold border-white p-2  rounded ${updStatus === true && id === cita.cita_id ? "bg-red-600 hover:bg-red-500" : "bg-black "}`}
                        onClick={() => {
                          handleEditButton(cita), setId(cita.cita_id);
                        }}
                      >
                        {updStatus === true && id === cita.cita_id
                          ? "Cancelar"
                          : "Actualizar cita"}
                      </Button>
                      {updStatus === true && id === cita.cita_id && (
                        <Button
                          className="bg-green-600 hover:bg-green-500 text-white font-bold p-1  rounded"
                          onClick={() => handlePatchStatus(cita.cita_id)}
                        >
                          Guardar
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                )}
              </Card>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default CitasCard;
