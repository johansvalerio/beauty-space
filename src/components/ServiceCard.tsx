"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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

  //servicios sin poestañas ni maquillaje
  const servicesWithOut = services.filter(
    (service) =>
      service.title !== "Peluqueria" && service.title !== "Maquillaje"
  );

  return (
    <section
      ref={ref}
      id="services"
      className="scroll-mt-28 mb-20 mt-20 px-4 md:mx-16 space-y-8 min-h-screen flex flex-col md:items-start items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: "linear" }}
      >
        <h2 className="dark:text-white text-center md:text-left text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-black bg-clip-text text-transparent">
          Nuestros servicios
        </h2>
      </motion.div>

      <article className="grid grid-cols-1 lg:grid-cols-3 w-full md:justify-items-center gap-8">
        {servicesWithOut?.map((service: ServiceProps, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "linear", delay: index * 0.3 }}
            className="w-full"
          >
            <Card className="group w-full h-[360px] overflow-hidden flex flex-col transition-all duration-300 cursor-pointer relative hover:bg-black/70 bg-card">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-300 z-10 pointer-events-none" />
              <div className="relative z-20 group-hover:opacity-0 group-hover:translate-y-[-100%] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    {service.title === "Pestanas" ? "Pestañas" : service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-1">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="relative w-full bg-secondary/30 rounded-md">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-[250px] object-cover"
                    />
                  </div>
                </CardContent>
              </div>
              {/* Hover Info */}
              <div className="absolute inset-0 flex flex-col items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-white  ">
                <div className="w-full flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 pl-4 text-foreground">
                    {service.title === "Pestanas" ? "Pestañas" : service.title}
                  </h3>
                  <ul className="space-y-2 text-center w-full list-disc list-inside">
                    {service.info?.slice(0, 4).map((info) => (
                      <li
                        key={info.title}
                        className="font-medium text-sm py-1 text-left pl-4 text-foreground"
                      >
                        {info.title}
                      </li>
                    ))}
                    {service.info && service.info.length > 4 && (
                      <li className="text-rose-200 dark:text-rose-300 text-sm mt-1 list-none text-left pl-4">
                        +{service.info.length - 4} servicios más
                      </li>
                    )}
                  </ul>
                </div>
                <div className="w-full mt-4">
                  <Link
                    href={`/servicios/${service.title.toLocaleLowerCase()}`}
                    className={`${buttonVariants()} w-full font-semibold bg-rose-300 hover:bg-rose-400`}
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </article>
    </section>
  );
}
