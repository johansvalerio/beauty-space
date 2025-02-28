"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { services } from "../app/const/Services";
import Link from "next/link";
import { ServiceProps } from "@/app/types/Services";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

// interface ServiceCardProps {
//     setServiceName: React.Dispatch<React.SetStateAction<string>>;
// }
//export default function ServiceCard({ setServiceName }: ServiceCardProps) {

export default function ServiceCard() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    return (
        <section ref={ref} id="services" className="scroll-mt-28 m-8 md:m-16 space-y-8">
            <motion.h2
                className="text-3xl text-white font-bold text-start"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7, ease: 'linear' }}
            >
                Servicios
            </motion.h2>

            <article className="grid grid-cols-1 lg:grid-cols-3 w-full md:justify-items-center gap-8">
                {services && services.length > 0 ? (
                    services.map((service: ServiceProps, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.7, ease: 'linear', delay: index * 0.3 }}
                            className="w-full"
                        >
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
                                    <Link
                                        //onClick={() => setServiceName(service.title)}
                                        // href="#contact"
                                        href={`/servicios/${service.title.toLocaleLowerCase()}`}
                                        className={`${buttonVariants()} w-full font-semibold bg-rose-300 hover:bg-rose-400 `}>
                                        Ver más {/* Agendar cita de {service.title} */}
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <p>No hay servicios disponibles en este momento.</p>
                )}

            </article>

        </section>
    );
}

