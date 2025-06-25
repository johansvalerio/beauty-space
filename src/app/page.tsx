import BookingForm from "@/components/BookingForm";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ParticlesLayer from "@/components/Particles";
//import Place from "@/components/Place";

function HomePage() {
  return (
    <>
      <ParticlesLayer />
      <div className="relative z-10">
        <Hero />
        <ServiceCard />
        {/* <Place /> */}
        <BookingForm />
      </div>
    </>
  );
}

export default HomePage;
