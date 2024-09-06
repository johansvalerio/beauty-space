
export default function Hero() {
    return (
        <section className="m-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase">Descubre tu belleza</h2>
            <p className="text-xl text-white mb-8">Servicios de quiropodia, peluquería, maquillaje, manicura y pedicura.</p>
            <div className="relative h-96 rounded-lg overflow-hidden">
                <img src="/img/beauty.jpg" alt="Beauty Space CR" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-pink-600 bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">Experimenta Beauty Space CR</h3>
                </div>
            </div>
        </section>
    )
} 