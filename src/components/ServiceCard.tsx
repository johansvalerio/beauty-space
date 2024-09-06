import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { services } from "../app/const/Services";

export default function ServiceCard() {
    return (
        <section id="services" className="scroll-mt-20 m-16 space-y-8">
            <h2 className="text-3xl text-white font-bold text-start">Servicios</h2>
            <article className="grid grid-cols-1 md:grid-cols-3 w-full md:justify-items-center gap-8">
                {
                    services && services.length > 0 ? (
                        services.map((service) => (
                            <Card key={service.id} className="w-full flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription>{service.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src={service.img} alt={service.title} className="w-full h-60 object-cover rounded-md mb-4" />
                                    <ul className="list-disc list-inside text-gray-600">
                                        {service.info?.map((info) => (
                                            <li key={info.title} className="text-gray-500 font-semibold">{info.title}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button className="w-full hover:bg-rose-400 bg-rose-300 font-bold">Reservar servicio de {service.title}</Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p>No hay servicios disponibles en este momento.</p>
                    )
                }
            </article>
        </section>
    );
}
