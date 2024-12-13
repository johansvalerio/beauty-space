"use client"
import { type Params } from "@/app/types/Params"
import { services } from "@/app/const/Services"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ParticlesLayer from "@/components/Particles"
import { useEffect } from 'react';
import "../servicios.css"
import { Button } from "@/components/ui/button"

export default function ServiceDetailsPage({ params }: Params) {

    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza el scroll a la parte superior
    }, []);
    // const serviceData = services.filter(service => service.title === params.id)
    // para acceder al valor usando filter {serviceData[0].title}
    //si uso find en vés de filter no se necesita el index del array [0]
    const serviceData = services.find(service => service.title.toLocaleLowerCase() === params.id)
    if (!serviceData) return (<div>Service not found</div>)

    if (serviceData.title.toLocaleLowerCase() === "peluqueria" || serviceData.title.toLocaleLowerCase() === "maquillaje") {
        return (
            <>
                <ParticlesLayer />  {/* efecto bubbles  */}

                <section className="mx-4 my-10 md:m-16 text-center space-y-12">
                    <article>
                        <h1 className="text-4xl font-bold text-white mb-4 uppercase">Servicios de {serviceData.title}</h1>
                        <div className="relative h-96 rounded-lg overflow-hidden">
                            <img src={serviceData.img} alt={serviceData.description} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-pink-600 bg-opacity-20 flex items-center justify-center">
                            </div>
                        </div>
                    </article>
                </section>
                <section className="mx-4 my-10 md:m-16 space-y-12">
                    {serviceData.info?.map((info) => (
                        (info.id ?? 0) < 5 &&
                        <div key={info.title}>
                            <h2 className="text-4xl font-bold text-white mb-4 uppercase">{info.title}</h2>
                            {
                                !info.subinfo &&
                                <article className="grid grid-cols-1 md:grid-cols-3 w-full md:justify-items-center gap-8">
                                    <Card key={info.title} className="w-full text-center flex flex-col h-full">
                                        <CardHeader>
                                            <CardTitle>{info.title}</CardTitle>
                                            {/* Si tiene description se renderiza */}
                                            {
                                                info.description &&
                                                <CardDescription>
                                                    <span className="font-semibold">{info.description}</span>
                                                </CardDescription>
                                            }
                                        </CardHeader>
                                        {/* Si es bodas renderiza el botón */}
                                        {
                                            info.title === "Bodas" &&
                                            <CardContent className="mt-auto">
                                                <Button asChild className="font-semibold bg-gradient-to-r from-rose-400 to-purple-400"><a href="https://wa.me/50688015998">Pedir PDF</a></Button>
                                            </CardContent>
                                        }
                                        {/* Si tiene precio se renderiza  */}
                                        {
                                            info.price &&
                                            <CardFooter className="mx-auto mt-auto">
                                                <h2 id="price" className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-3xl font-bold">
                                                    Precio: {info.price}
                                                </h2>
                                            </CardFooter>
                                        }
                                    </Card>
                                </article>
                            }
                            <article className="grid grid-cols-1 md:grid-cols-3 w-full md:justify-items-center gap-8">
                                {info.subinfo?.map((subinfo) => (
                                    <Card key={subinfo.title} className="w-full text-center flex flex-col h-full">
                                        <CardHeader>
                                            <CardTitle>{subinfo.title}</CardTitle>
                                        </CardHeader>
                                        {/* Si tiene description se renderiza */}
                                        {subinfo.description &&
                                            <CardDescription className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 text-justify font-semibold text-sm sm:text-base leading-relaxed">
                                                <span>
                                                    {subinfo.description}
                                                </span>
                                            </CardDescription>

                                        }
                                        {/* Si tiene imagen se renderiza */}
                                        {
                                            subinfo.img &&
                                            <CardContent className="mt-auto">
                                                <img src={subinfo.img} alt={subinfo.title} className="w-full h-full object-cover rounded-md mb-4 " />
                                            </CardContent>
                                        }

                                        {/* Si tiene precio se renderiza  */}
                                        {
                                            subinfo.price &&
                                            <CardFooter className="mt-auto mx-auto">
                                                <h2 id="price" className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-3xl font-bold">
                                                    Precio: {subinfo.price}
                                                </h2>
                                            </CardFooter>
                                        }

                                    </Card>
                                ))}
                            </article>
                        </div>
                    ))}
                </section>
            </>
        )
    }

    return (
        <>
            <ParticlesLayer />  {/* efecto bubbles  */}

            <section className="mx-4 my-10 md:m-16 text-center space-y-12">
                <article>
                    <h1 className="text-4xl font-bold text-white mb-4 uppercase">Servicios de {serviceData.title}</h1>
                    <div className="relative h-96 rounded-lg overflow-hidden">
                        <img src={serviceData.img} alt={serviceData.description} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-pink-600 bg-opacity-20 flex items-center justify-center">
                        </div>
                    </div>
                </article>

                <article className="grid grid-cols-1 md:grid-cols-3 w-full md:justify-items-center gap-8">
                    {
                        serviceData.info?.map((info) => (
                            <Card key={info.title} className="w-full flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle>{info.title}</CardTitle>
                                    <CardDescription>
                                        <span className="font-semibold">{info.description}</span>
                                    </CardDescription>
                                </CardHeader>
                                {/* Verificamos si el servicio tiene un precio extra antes de renderizarlo */}
                                {
                                    info.extra &&
                                    <CardContent className="mx-auto ">
                                        <span id="price" className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-xl font-bold">
                                            Adicional: {info.extra}
                                        </span>
                                    </CardContent>
                                }

                                {/* Verificamos si el servicio tienes imagen antes de renderizarla */}
                                {
                                    info.img &&
                                    <CardContent>
                                        <img src={info.img} alt={info.title} className="w-full h-60 object-cover rounded-md mb-4" />
                                    </CardContent>
                                }

                                {/* Si el servicio es quiropodia mostramos el precio total del servicio */}
                                {
                                    serviceData.title.toLocaleLowerCase() !== "quiropodia" &&
                                    <CardFooter className="mt-auto mx-auto">
                                        <h2 id="price" className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-3xl font-bold">
                                            Precio: {info.price}
                                        </h2>
                                    </CardFooter>
                                }
                            </Card>
                        ))
                    }

                    {
                        serviceData.price && (
                            <Card className="w-full flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle>Costo total del servicio</CardTitle>
                                    <CardDescription className="">
                                        <span id="price" className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-5xl font-bold">
                                            {serviceData.price}
                                        </span>
                                    </CardDescription>
                                </CardHeader>

                            </Card>
                        )
                    }
                </article>
            </section>

        </>

    )
}
