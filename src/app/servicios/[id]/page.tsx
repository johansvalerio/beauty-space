"use client";
import { type Params } from "@/types/Params";
import { services } from "@/const/Services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ParticlesLayer from "@/components/Particles";
import { useEffect } from "react";
import "../servicios.css";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ServiceDetailsPage({ params }: Params) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza el scroll a la parte superior
  }, []);
  // const serviceData = services.filter(service => service.title === params.id)
  // para acceder al valor usando filter {serviceData[0].title}
  //si uso find en vés de filter no se necesita el index del array [0]
  const serviceData = services.find(
    (service) => service.title.toLocaleLowerCase() === params.id
  );
  if (!serviceData) return <div>Service not found</div>;

  //renderiza esto si es peluqueria o maquillaje

  if (
    serviceData.title.toLocaleLowerCase() === "peluqueria" ||
    serviceData.title.toLocaleLowerCase() === "maquillaje"
  ) {
    return (
      <div ref={ref}>
        <ParticlesLayer /> {/* efecto bubbles  */}
        <section className="mx-4 my-10 md:m-16 text-center space-y-12">
          <article>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Servicios de {""}
              <span className=" bg-gradient-to-r from-primary via-pink-700 to-pink-700 bg-clip-text text-transparent">
                {serviceData.title}
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "linear" }}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <img
                src={serviceData.img}
                alt={serviceData.description}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-pink-600 bg-opacity-20 flex items-center justify-center">
                {/* Agrega contenido extra o descripción aquí si es necesario */}
              </div>
            </motion.div>
          </article>
        </section>
        <section ref={ref} className="mx-4 my-10 md:m-16 space-y-12">
          {serviceData.info?.map(
            (info, index) =>
              (info.id ?? 0) < 5 && (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.7,
                    ease: "linear",
                    delay: index * 0.3,
                  }}
                  className="w-full"
                >
                  <div key={info.title}>
                    <h2 className="text-4xl font-bold text-primary/70 mb-4 uppercase">
                      {info.title}
                    </h2>
                    {!info.subinfo && (
                      <article className="grid grid-cols-1 md:grid-cols-3 w-full md:justify-items-center gap-8">
                        <Card
                          key={info.title}
                          className="w-full text-center flex flex-col h-full"
                        >
                          <CardHeader>
                            <CardTitle>{info.title}</CardTitle>
                            {/* Si tiene description se renderiza */}
                            {info.description && (
                              <CardDescription>
                                <span className="font-semibold">
                                  {info.description}
                                </span>
                              </CardDescription>
                            )}
                          </CardHeader>
                          {/* Si es bodas o graduaciones, renderiza el botón */}
                          {(info.title === "Bodas" ||
                            info.title === "Graduaciones") && (
                            <CardContent className="mt-auto">
                              <Button
                                asChild
                                className="font-semibold bg-gradient-to-r from-rose-400 to-purple-400"
                              >
                                <a href="https://wa.me/50688015998">
                                  Solicitar
                                </a>
                              </Button>
                            </CardContent>
                          )}
                          {/* Si tiene precio se renderiza  */}
                          {info.price && (
                            <CardFooter className="mx-auto mt-auto">
                              <h2
                                id="price"
                                className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-3xl font-bold"
                              >
                                Precio: {info.price}
                              </h2>
                            </CardFooter>
                          )}
                        </Card>
                      </article>
                    )}
                    <article className="grid grid-cols-1 md:grid-cols-3 w-full md:justify-items-center gap-8">
                      {info.subinfo?.map((subinfo, index) => (
                        <motion.div
                          key={subinfo.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            inView
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          exit={{ opacity: 0, y: 20 }}
                          transition={{
                            duration: 0.7,
                            ease: "linear",
                            delay: index * 0.3,
                          }}
                          className="w-full"
                        >
                          <Card
                            key={subinfo.title}
                            className="w-full text-center flex flex-col h-full"
                          >
                            <CardHeader>
                              <CardTitle>{subinfo.title}</CardTitle>
                            </CardHeader>
                            {/* Si tiene description se renderiza */}
                            {subinfo.description && (
                              <CardDescription className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 text-justify font-semibold text-sm sm:text-base leading-relaxed">
                                <span>{subinfo.description}</span>
                              </CardDescription>
                            )}
                            {/* Si tiene imagen se renderiza */}
                            {subinfo.img && (
                              <CardContent className="mt-auto">
                                <img
                                  src={subinfo.img}
                                  alt={subinfo.title}
                                  className="w-full h-full object-cover rounded-md mb-4 "
                                />
                              </CardContent>
                            )}

                            {/* Si tiene precio se renderiza  */}
                            {subinfo.price && (
                              <CardFooter className="mt-auto mx-auto">
                                <h2
                                  id="price"
                                  className="bg-gradient-to-r from-primary/80 via-primary/80 to-pink-700 inline-block text-transparent bg-clip-text text-3xl font-bold"
                                >
                                  Precio: {subinfo.price}
                                </h2>
                              </CardFooter>
                            )}
                          </Card>
                        </motion.div>
                      ))}
                    </article>
                  </div>
                </motion.div>
              )
          )}
        </section>
      </div>
    );
  }

  //renderiza esto si  NO es peluqueria o maquillaje
  return (
    <div ref={ref}>
      <ParticlesLayer /> {/* efecto bubbles  */}
      <section className="mx-4 py-10 md:m-16 text-center space-y-12">
        <article className="py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0, ease: "linear" }}
            className="text-4xl font-bold mb-8 uppercase"
          >
            <div className="dark:text-white text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-black bg-clip-text text-transparent">
              {serviceData.title.toLocaleLowerCase() === "pestanas"
                ? "Servicio de Pestañas"
                : "Servicio de " + serviceData.title}
            </div>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "linear" }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            <img
              src={serviceData.img}
              alt={serviceData.description}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-pink-600 bg-opacity-20 flex items-center justify-center">
              {/* Agrega contenido extra o descripción aquí si es necesario */}
            </div>
          </motion.div>
        </article>

        <article
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 w-full md:justify-items-center gap-8"
        >
          {serviceData.info?.map((info, index) => (
            <motion.div
              key={info.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: "linear", delay: index * 0.3 }}
              className="w-full"
            >
              <Card
                key={info.title}
                className="w-full text-center flex flex-col h-full"
              >
                <CardHeader>
                  <CardTitle>{info.title}</CardTitle>
                  <CardDescription>
                    <span className="font-semibold">{info.description}</span>
                  </CardDescription>
                </CardHeader>
                {/* Verificamos si el servicio tiene un precio extra antes de renderizarlo */}
                {info.extra && (
                  <CardContent className="mx-auto ">
                    <span
                      id="price"
                      className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-xl font-bold"
                    >
                      Adicional: {info.extra}
                    </span>
                  </CardContent>
                )}

                {/* Verificamos si el servicio tienes imagen antes de renderizarla */}
                {info.img && (
                  <CardContent className="max-auto mt-auto">
                    <img
                      src={info.img}
                      alt={info.title}
                      className="w-full h-72 object-cover rounded-md mb-4 "
                    />
                  </CardContent>
                )}

                {/* Si el servicio es quiropodia mostramos el precio total del servicio */}
                {serviceData.title.toLocaleLowerCase() !== "quiropodia" && (
                  <CardFooter className="mt-auto mx-auto">
                    <h2
                      id="price"
                      className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-3xl font-bold"
                    >
                      Precio: {info.price}
                    </h2>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}

          {serviceData.price && (
            <Card className="w-full flex flex-col h-full">
              <CardHeader>
                <CardTitle>Costo total del servicio</CardTitle>
                <CardDescription className="">
                  <span
                    id="price"
                    className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-5xl font-bold"
                  >
                    {serviceData.price}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </article>
      </section>
    </div>
  );
}
