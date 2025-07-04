"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div className="w-full">
      <section
        ref={ref}
        id="hero"
        className="w-full min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center px-4 text-center scroll-mt-40"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="uppercase bg-gradient-to-r from-primary dark:from-white via-primary dark:via-white to-pink-700 dark:to-pink-700 bg-clip-text text-transparent">
            Estudio de belleza integral
          </span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="inline-flex flex-col items-center space-y-2"
        >
          <div className="text-center">
            <p className="text-xl md:text-2xl font-light">
              <span className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 dark:text-white bg-clip-text text-transparent">
                Servicios de quiropodía, manicura, pedicura, cejas y pestañas.
              </span>
            </p>
            <div className="w-24 md:w-96 mt-6 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full" />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
