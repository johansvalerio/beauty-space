"use client"
import { type Params } from "@/app/types/Params"
import { services } from "@/app/const/Services"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ParticlesLayer from "@/components/Particles"
import { useEffect } from 'react';
import "../servicios.css"

export default function ServiceDetailsPage({ params }: Params) {

    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza el scroll a la parte superior
    }, []);
    // const serviceData = services.filter(service => service.title === params.id)
    // para acceder al valor usando filter {serviceData[0].title}
    //si uso find en vés de filter no se necesita el index del array [0]
    const serviceData = services.find(service => service.title.toLocaleLowerCase() === params.id)
    if (!serviceData) return (<div>Service not found</div>)

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
                                    <CardDescription>{info.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* <img src={info.img} alt={info.title} className="w-full h-60 object-cover rounded-md mb-4" /> */}

                                </CardContent>
                            </Card>
                        ))
                    }
                    {
                        serviceData.price && (
                            <Card className="w-full flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle>Costo total del servicio</CardTitle>
                                    <CardDescription className="">
                                        <h2 id="price" className="bg-gradient-to-r from-rose-400 to-purple-400 inline-block text-transparent bg-clip-text text-5xl font-bold">
                                            {serviceData.price}
                                        </h2>
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
