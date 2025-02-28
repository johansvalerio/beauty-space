"use client"
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <motion.div className="w-full">
            <section ref={ref} id="hero" className="scroll-mt-40 mx-4 my-10 md:m-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0, ease: "linear" }}
                    className="text-4xl font-bold text-white mb-4 uppercase"
                >
                    Descubre tu belleza
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "linear" }}
                    className="text-xl text-white mb-8"
                >
                    Servicios de quiropodia, peluquería, maquillaje, manicura y pedicura.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: "linear" }}
                    className="relative h-96 rounded-lg overflow-hidden"
                >
                    <img src="/img/beauty.jpg" alt="Beauty Space CR" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-pink-600 bg-opacity-30 flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-white">Experimenta Beauty Space CR</h3>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
}