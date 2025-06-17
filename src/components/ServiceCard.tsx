"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { buttonVariants } from "./ui/button";
import { services } from "../const/Services";
import Link from "next/link";
import { ServiceProps } from "@/types/Services";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ServiceCard() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      id="services"
      className="scroll-mt-28 m-8 md:m-16 space-y-8"
    >
      <motion.h2
        className="text-3xl text-white font-bold text-start"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: "linear" }}
      >
        Servicios
      </motion.h2>

      <article className="grid grid-cols-1 lg:grid-cols-3 w-full md:justify-items-center gap-8">
        {services?.map((service: ServiceProps, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "linear", delay: index * 0.3 }}
            className="w-full"
          >
            <Card className="group w-full h-[360px] hover:h-full overflow-hidden flex flex-col transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle>
                  {service.title === "Pestanas" ? "Pestañas" : service.title}
                </CardTitle>
                <CardDescription className="line-clamp-1 group-hover:line-clamp-none">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="relative w-full bg-gray-100 rounded-md">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-[250px] object-cover"
                  />
                  {(service.title === "Pestanas" ||
                    service.title === "Cejas") && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <p className="text-white text-center font-bold text-2xl">
                        Próximamente
                      </p>
                    </div>
                  )}
                </div>

                <ul className="list-disc list-inside mt-4 text-gray-600">
                  {service.info?.map((info) => (
                    <li
                      key={info.title}
                      className="text-gray-500 font-semibold"
                    >
                      {info.title}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link
                  href={`/servicios/${service.title.toLocaleLowerCase()}`}
                  className={`${buttonVariants()} w-full font-semibold bg-rose-300 hover:bg-rose-400`}
                >
                  Ver más
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </article>
    </section>
  );
}
