import Particles from "@/components/Particles";
import CitasCard from "@/app/citas/components/CitasCard";
import { Citas } from "@/types/CitaUser";
import useSession from "@/hooks/useSession";
import Link from "next/link";

async function getCitas() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/citas`, {
    cache: "no-store",
  });
  const citas: Citas = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener las citas");
  }
  console.log("Citas obtenidas:", citas);
  return citas;
}

export default async function CitasPage() {
  const session = await useSession();
  const citas = await getCitas();

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Particles />
        <Link
          href="/auth/signin"
          className="text-xl bg-gray-700 rounded hover:bg-gray-800 text-white p-4"
        >
          Inicia sesión para agendar tu cita
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen m-8 flex flex-col">
      <Particles />
      <CitasCard citas={citas} />
    </div>
  );
}
