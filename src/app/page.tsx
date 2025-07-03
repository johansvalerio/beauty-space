import BookingForm from "@/components/BookingForm";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Place from "@/components/Place";

function HomePage() {
  return (
    <div className="relative z-10">
      <Hero />
      <ServiceCard />
      <Place />
      <BookingForm />
    </div>
  );
}
export default HomePage;
