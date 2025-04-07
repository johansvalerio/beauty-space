import useSession from "@/app/hooks/useSession";
import BookingForm from "@/components/BookingForm";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ParticlesLayer from "@/components/Particles";
import Place from "@/components/Place";

async function HomePage() {

  const session = await useSession();


  return (
    <>
      <ParticlesLayer />
      <div className="relative z-10">
        <Hero />
        <ServiceCard />
        {/* <Place /> */}
        <BookingForm session={session} />
      </div>
    </>
  );
}

export default HomePage;
