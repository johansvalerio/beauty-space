"use client";
import BookingForm from "@/components/BookingForm";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { useState } from "react";
import ParticlesLayer from "@/components/Particles";
import Place from "@/components/Place";

function HomePage() {

  const [serviceName, setServiceName] = useState("");

  return (
    <>
      <ParticlesLayer />
      <div className="relative z-10">
        <Hero />
        <ServiceCard setServiceName={setServiceName} />
        <Place />
        <BookingForm serviceName={serviceName} />
      </div>
    </>
  );
}

export default HomePage;
