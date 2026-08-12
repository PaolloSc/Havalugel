import { HeroFloating } from "@/components/home/HeroFloating";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedMotos } from "@/components/home/FeaturedMotos";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <HeroFloating />
      <HowItWorks />
      <FeaturedMotos />
      <Testimonials />
    </>
  );
}
