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
            className="rounded-lg md:rounded-tr-none md:rounded-br-none w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d715.8600787941859!2d-85.09240460147117!3d10.428103540416473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9ffac2d63aba7f%3A0x163f813b2ed2ae40!2sbarberia%20y%20u%C3%B1as%20carl%20Dixon!5e0!3m2!1sen!2sus!4v1751525621343!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Beauty Space CR Location"
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
