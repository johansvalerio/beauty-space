"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export default function Place() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  return (
    <section
      ref={ref}
      id="place"
      className="scroll-mt-20 py-20 mx-4 md:mx-16 text-left flex flex-col md:items-start items-center justify-center"
    >
      <h2 className="dark:text-white text-center md:text-left text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-black bg-clip-text text-transparent">
        Encuentranos en
      </h2>
      <article className="grid grid-cols-1 md:grid-cols-[2fr_2fr] w-full h-96 gap-1 md:gap-0 mt-6">
        <motion.div
          className=" h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "linear" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.8431601672337!2d-85.07941672595257!3d10.434017789694687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9ffbac30c9a0a3%3A0xfa902e689a31d539!2sBeauty%20Space!5e0!3m2!1ses-419!2scr!4v1754777752203!5m2!1ses-419!2scr"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
        <motion.div
          className="overflow-hidden relative h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "linear" }}
        >
          <img
            src="/img/lugar.jpeg"
            className="w-full h-full object-cover rounded-lg md:rounded-tl-none md:rounded-bl-none max-w-full max-h-full"
            alt="Lugar de trabajo"
          />
          <div className="absolute inset-0 bg-pink-400 bg-opacity-20 flex items-center justify-center">
            {/* Agrega contenido extra o descripción aquí si es necesario */}
          </div>
        </motion.div>
      </article>
    </section>
  );
}
