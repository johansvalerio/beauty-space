"use client";
import BookingForm from "@/components/BookingForm";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";

function HomePage() {

  const [init, setInit] = useState(false);
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse", // Al hacer clic, se añaden más partículas con push
          },
          onHover: {
            enable: true,
            mode: "repulse", // Al pasar el mouse, las partículas se repulsan
          },
        },
        modes: {
          push: {
            quantity: 4, // Al hacer clic, añade 4 partículas
          },
          repulse: {
            distance: 200,
            duration: 0.4, // Repulsión suave al pasar el mouse
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Color de las partículas (blanco)
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false, // Deshabilitamos las líneas entre partículas
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce", // Rebote al llegar al borde
          },
          random: false,
          speed: 6, // Velocidad de movimiento de las partículas
          straight: false, // No se mueven en línea recta
        },
        number: {
          density: {
            enable: true,
            area: 800, // Controla la densidad de las partículas
          },
          value: 80, // Cantidad de partículas
        },
        opacity: {
          value: 0.8, // Transparencia de las partículas
          random: false,
        },
        shape: {
          type: "circle", // Forma de burbuja (círculo)
        },
        size: {
          value: { min: 1, max: 10 }, // Tamaño de las partículas (burbujas)
          random: true, // Tamaño aleatorio para hacerlas parecer burbujas
          animation: {
            enable: true,
            speed: 3, // Animación de cambio de tamaño
            minimumValue: 0.3,
            sync: false, // Animación de tamaño no sincronizada
          },
        },
      },
      detectRetina: true, // Para pantallas Retina
    }),
    [],
  );



  return (
    <>
      {init && (
        <Particles
          className="absolute top-0 left-0 w-full h-full -z-10"
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}

      <div className="relative z-10">
        <Hero />
        <ServiceCard setServiceName={setServiceName} />
        <BookingForm serviceName={serviceName} />
      </div>
    </>
  );
}

export default HomePage;
