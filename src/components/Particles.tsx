// components/Particles.tsx

"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Container, ISourceOptions } from "@tsparticles/engine";

function ParticlesLayer() {
  const [init, setInit] = useState(false);

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
          onClick: { enable: true, mode: "none" },
          onHover: { enable: true, mode: "none" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: { enable: false },
        move: {
          direction: "none",
          enable: true,

          outModes: { default: "bounce" },
          speed: 6,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 80,
        },
        opacity: {
          value: 0.8,
          random: false,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 10 },
          random: true,
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 0.3,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      {init && (
        <Particles
          className="absolute inset-0 -z-20"
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </>
  );
}

export default ParticlesLayer;
