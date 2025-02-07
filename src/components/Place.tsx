
export default function Place() {
    return (
        <section className="mx-4 my-10 md:m-16 text-left space-y-8">
            <p className="text-white font-semibold text-3xl">Encuentranos en</p>
            <article className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full h-96 gap-1 md:gap-0">
                <div className="h-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.9078499666307!2d-85.09767792595267!3d10.428886989699533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9ffac616015113%3A0xe8dbc7f653106b6a!2sFetesa!5e0!3m2!1ses-419!2scr!4v1738902048076!5m2!1ses-419!2scr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Beauty Space CR Location"
                    />
                </div>
                <div className="overflow-hidden h-full relative">
                    <img
                        src="/img/place.jpg"
                        className="w-full h-full object-cover rounded-md max-w-full max-h-full"
                        alt="Lugar de trabajo"
                    />
                    <div className="absolute inset-0 bg-pink-400 bg-opacity-20 flex items-center justify-center">
                        {/* Agrega contenido extra o descripción aquí si es necesario */}
                    </div>
                </div>
            </article>
        </section>
    )
}
