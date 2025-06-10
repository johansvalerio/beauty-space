import Particles from "@/components/Particles"
import CitasCard from "@/app/citas/components/CitasCard"
import { GET } from "@/app/api/citas/route"
import { Citas } from "@/types/CitaUser"
import useSession from "@/hooks/useSession"
import Link from "next/link"

async function getCitas() {
    const response = await GET();
    const citas: Citas = await response.json();
    return citas;
}

async function CitasPageContent({ citas }: { citas: Citas }) {
    const session = await useSession();

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
            <CitasCard citas={citas} session={session} />
        </div>
    );
}

export default async function page() {
    const citas = await getCitas();
    console.log(citas)
    return <CitasPageContent citas={citas} />;
}
